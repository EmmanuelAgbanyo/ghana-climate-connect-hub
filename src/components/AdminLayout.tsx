
import { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronDown, 
  FileText, 
  Globe, 
  LogOut, 
  Menu, 
  MessageSquare, 
  X,
  Image,
  Shield,
  Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Protection logic to prevent unauthorized access
  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("No user found, redirecting to auth page");
        toast({
          title: "Access Denied",
          description: "You must be logged in to access this area.",
          variant: "destructive"
        });
        navigate('/auth');
      } else if (!isAdmin) {
        console.log("User is not admin, redirecting to auth page");
        toast({
          title: "Access Denied",
          description: "You must be an administrator to access this area.",
          variant: "destructive"
        });
        navigate('/auth');
      }
    }
  }, [loading, user, isAdmin, navigate, toast]);
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  // Only render the admin layout if we have a user and they're an admin
  if (!user || !isAdmin) {
    return null;
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Globe },
    { name: "Content Management", href: "/admin/content", icon: FileText },
    { name: "Blog Posts", href: "/admin/blog", icon: Edit },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Data Sources", href: "/admin/data-sources", icon: Globe },
    { name: "Chatbot Configuration", href: "/admin/chatbot", icon: MessageSquare },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-ghana-green text-white shadow-lg md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-white/10">
            <Shield className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-bold">Admin Portal</h2>
          </div>

          <ScrollArea className="flex-grow">
            <nav className="p-4 space-y-1">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left",
                    location.pathname === item.href
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                  onClick={() => {
                    setSidebarOpen(false);
                    navigate(item.href);
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              ))}
            </nav>
          </ScrollArea>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Shield className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-white/70 truncate">
                    Administrator
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut()}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="w-full text-white border-white/20 hover:bg-white/10"
            >
              Back to Website
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
