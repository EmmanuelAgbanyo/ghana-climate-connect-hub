
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ClimateInformation from "./pages/ClimateInformation";
import AdaptationCampaigns from "./pages/AdaptationCampaigns";
import ResilientLeadership from "./pages/ResilientLeadership";
import CallToAction from "./pages/CallToAction";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import ContentManagement from "./pages/admin/ContentManagement";
import GalleryAdmin from "./pages/admin/Gallery";
import DataSources from "./pages/admin/DataSources";
import ChatbotConfig from "./pages/admin/ChatbotConfig";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/admin/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/climate-information" element={<ClimateInformation />} />
            <Route path="/adaptation-campaigns" element={<AdaptationCampaigns />} />
            <Route path="/resilient-leadership" element={<ResilientLeadership />} />
            <Route path="/call-to-action" element={<CallToAction />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/blog" element={<BlogAdmin />} />
            <Route path="/admin/gallery" element={<GalleryAdmin />} />
            <Route path="/admin/data-sources" element={<DataSources />} />
            <Route path="/admin/chatbot" element={<ChatbotConfig />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
