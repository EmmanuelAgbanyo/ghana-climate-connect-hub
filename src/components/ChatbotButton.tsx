
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MessageSquareText, Send } from 'lucide-react';
import { Input } from "@/components/ui/input";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{type: 'user' | 'bot', text: string}[]>([
    { type: 'bot', text: "Hello! I'm ClimateWise, your guide to Ghana's climate action. Ask me about NDCs, adaptation strategies, or how you can get involved!" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { type: 'user', text: message }]);
    
    // Simulate bot response (this would be replaced with actual AI functionality)
    setTimeout(() => {
      let response;
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('ndc') || lowerMsg.includes('nationally determined')) {
        response = "Ghana's updated NDCs (2021) include 47 adaptation and mitigation programs, aiming to reduce emissions by 64 MtCO2e and build resilience for 38 million people by 2030. Key sectors include energy, agriculture, and health.";
      } else if (lowerMsg.includes('flood') || lowerMsg.includes('flooding')) {
        response = "Ghana's adaptation strategies for flooding include resilient infrastructure development, early warning systems, and community planning. The Greater Accra Resilient Integrated Development Project ($200M) focuses on flood and waste management.";
      } else if (lowerMsg.includes('drought')) {
        response = "To combat droughts, Ghana implements climate-smart agriculture, water conservation techniques, and solar-powered irrigation systems, particularly in the Northern regions.";
      } else if (lowerMsg.includes('involved') || lowerMsg.includes('help') || lowerMsg.includes('action')) {
        response = "You can get involved by: 1) Adopting climate-smart practices like water conservation and tree planting, 2) Supporting community action plans, 3) Joining YPO's programs, or 4) Advocating for climate policies.";
      } else {
        response = "I'm still learning about Ghana's climate initiatives. Could you rephrase your question about climate policies, adaptation strategies, or how to get involved?";
      }
      
      setConversation(prev => [...prev, { type: 'bot', text: response }]);
    }, 1000);
    
    setMessage('');
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-ghana-gold text-black hover:bg-ghana-gold/90 h-14 w-14 p-0"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquareText size={24} />
      </Button>
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-md p-0 flex flex-col">
          <SheetHeader className="p-4 border-b bg-ghana-green text-white">
            <SheetTitle>ClimateWise</SheetTitle>
            <SheetDescription className="text-white/80">
              Your AI assistant for Ghana's climate information
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.type === 'user' 
                      ? 'bg-ghana-gold text-black' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <SheetFooter className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about Ghana's climate initiatives..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!message.trim()}>
                <Send size={18} />
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatbotButton;
