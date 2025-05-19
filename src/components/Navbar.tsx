
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Climate Information", path: "/climate-information" },
    { label: "Adaptation Campaigns", path: "/adaptation-campaigns" },
    { label: "Resilient Leadership", path: "/resilient-leadership" },
    { label: "Take Action", path: "/call-to-action" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-ghana-green">
                <span className="text-white font-bold text-lg">CIC</span>
              </div>
              <div>
                <span className="font-bold text-ghana-green text-lg">Climate Information Centre</span>
                <span className="block text-xs text-gray-600">Ghana</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.path
                    ? "text-ghana-green font-semibold border-b-2 border-ghana-green"
                    : "text-gray-600 hover:text-ghana-green hover:bg-green-50"
                )}
              >
                {item.label}
              </Link>
            ))}

            {isAdmin ? (
              <div className="flex items-center ml-4 space-x-2">
                <Link to="/admin">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-ghana-green text-ghana-green hover:bg-ghana-green/10"
                  >
                    Admin Panel
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-red-600"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 border-ghana-green text-ghana-green hover:bg-ghana-green/10"
                >
                  <UserCircle className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
            )}

            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 border-ghana-gold text-ghana-gold hover:bg-ghana-gold/10"
              onClick={() => console.log("Open chatbot")}
            >
              Ask ClimateWise
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on state */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.path
                    ? "text-ghana-green bg-green-50 font-semibold"
                    : "text-gray-600 hover:text-ghana-green hover:bg-green-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isAdmin ? (
              <>
                <Link 
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-ghana-green hover:bg-green-50"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 rounded-md text-base font-medium text-ghana-green hover:bg-green-50"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            )}
            
            <Button 
              variant="outline"
              size="sm"
              className="w-full mt-2 border-ghana-gold text-ghana-gold hover:bg-ghana-gold/10"
              onClick={() => {
                console.log("Open chatbot");
                setIsOpen(false);
              }}
            >
              Ask ClimateWise
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
