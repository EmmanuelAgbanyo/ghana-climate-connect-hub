
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClimateInformation from "./pages/ClimateInformation";
import AdaptationCampaigns from "./pages/AdaptationCampaigns";
import ResilientLeadership from "./pages/ResilientLeadership";
import CallToAction from "./pages/CallToAction";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ChatbotButton from "./components/ChatbotButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/climate-information" element={<ClimateInformation />} />
          <Route path="/adaptation-campaigns" element={<AdaptationCampaigns />} />
          <Route path="/resilient-leadership" element={<ResilientLeadership />} />
          <Route path="/call-to-action" element={<CallToAction />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
