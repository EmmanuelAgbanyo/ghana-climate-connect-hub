
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// Removed the duplicate ChatbotButton import

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {/* Removed duplicate ChatbotButton */}
      <Footer />
    </div>
  );
};

export default Layout;
