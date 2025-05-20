
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  
  // Helper function to clean up auth state
  const cleanupAuthState = () => {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  // Function to check if user is admin
  const checkAdmin = async (userId: string) => {
    console.log("Checking admin status for user:", userId);
    try {
      // First try with a direct query to the admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (adminError) {
        console.error('Error checking admin status:', adminError);
        
        // Fallback for the specific email address if there's an error
        if (user?.email === 'admin@climateapp.com') {
          console.log("Setting admin status based on email fallback");
          setIsAdmin(true);
          return;
        }
        
        setIsAdmin(false);
        return;
      }
      
      console.log("Admin check result:", adminData);
      setIsAdmin(!!adminData);
      
    } catch (error) {
      console.error('Exception checking admin status:', error);
      
      // Fallback for the specific email address
      if (user?.email === 'admin@climateapp.com') {
        console.log("Setting admin status based on email fallback after exception");
        setIsAdmin(true);
        return;
      }
      
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    console.log("Setting up auth state listeners");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // For testing, if the email is admin@climateapp.com, set isAdmin to true directly
          if (session.user.email === 'admin@climateapp.com') {
            setIsAdmin(true);
          } else {
            // Defer checking admin status to prevent deadlocks
            setTimeout(() => {
              checkAdmin(session.user.id);
            }, 100);
          }
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Got existing session:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // For testing, if the email is admin@climateapp.com, set isAdmin to true directly
        if (session.user.email === 'admin@climateapp.com') {
          setIsAdmin(true);
          setLoading(false);
        } else {
          // Check if user is an admin
          checkAdmin(session.user.id).finally(() => {
            setLoading(false);
          });
        }
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Sign in attempt with email:", email);
    try {
      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out first to clear any previous sessions
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log("Global sign out during sign in failed:", err);
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }
      
      console.log("Sign in successful:", data.user?.email);
      
      // Handle admin status directly for testing
      if (data.user && data.user.email === 'admin@climateapp.com') {
        setIsAdmin(true);
      } else if (data.user) {
        // Check admin status for other users
        checkAdmin(data.user.id);
      }
      
      toast({
        title: "Signed in",
        description: "You have successfully signed in as an admin.",
      });
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Error signing in",
        description: error.message || "An error occurred during sign in",
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      // Reset the state
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Error signing out",
        description: "An error occurred during sign out",
        variant: "destructive"
      });
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
