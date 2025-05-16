
import { ReactNode, useState } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronDown, 
  FileText, 
  Globe, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Settings, 
  Users, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Globe },
    { name: "Content Management", href: "/admin/content", icon: FileText },
    { name: "Data Sources", href: "/admin/data-sources", icon: Globe },
    { name: "Chatbot Configuration", href: "/admin/chatbot", icon: MessageSquare },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
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
            <h2 className="text-xl font-bold">CIC Admin</h2>
          </div>

          <ScrollArea className="flex-grow">
            <nav className="p-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-white/70 truncate">
                  Admin User
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
