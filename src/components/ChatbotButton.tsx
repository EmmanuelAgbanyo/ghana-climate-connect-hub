
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MessageSquareText, Send, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { toast } from '@/components/ui/sonner';

// Updated API key for Google AI Studio
const API_KEY = "AIzaSyD0EKos8Z5a5lQyvt_Tg85j_7D_ZTI5sc4";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{type: 'user' | 'bot', text: string}[]>([
    { type: 'bot', text: "Hello! I'm ClimateWise, your guide to Ghana's climate action. Ask me about NDCs, adaptation strategies, or how you can get involved!" }
  ]);

  const generatePrompt = (userMessage: string) => {
    return {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are ClimateWise, an AI assistant specializing in Ghana's climate information, policies and adaptation strategies.
                    
Background knowledge:
- Ghana's updated NDCs (2021) include 47 adaptation and mitigation programs
- Ghana aims to reduce emissions by 64 MtCO2e by 2030
- Key climate sectors include energy, agriculture, health, and water
- Major initiatives include the Greater Accra Resilient Integrated Development Project ($200M)
- Ghana implements climate-smart agriculture and water conservation techniques
- Ghana experiences flooding in coastal regions and droughts in northern regions

Answer the following question about Ghana's climate situation, policies, or actions. Keep your response informative but concise (under 200 words). If you don't know the specific answer about Ghana, say so and provide general climate information that might be relevant.

User question: ${userMessage}`
            }
          ]
        }
      ]
    };
  };

  const callGoogleAI = async (userMessage: string) => {
    try {
      // Using the correct API endpoint for the model
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(generatePrompt(userMessage)),
        }
      );

      if (!response.ok) {
        console.error(`API request failed with status ${response.status}`);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return extractResponseText(data);
    } catch (error) {
      console.error("Error calling Google AI API:", error);
      // Provide a more helpful error message with fallback information
      return "I'm currently experiencing technical difficulties connecting to my knowledge base. While I'm getting fixed, here are some key facts about Ghana's climate action: Ghana aims to reduce emissions by 64 MtCO2e by 2030 through 47 adaptation and mitigation programs focusing on energy, agriculture, health, and water sectors.";
    }
  };

  // Helper function to extract text from the v1beta response format
  const extractResponseText = (data: any) => {
    try {
      if (data && 
          data.candidates && 
          data.candidates[0] && 
          data.candidates[0].content && 
          data.candidates[0].content.parts) {
        
        for (const part of data.candidates[0].content.parts) {
          if (part.text) return part.text;
        }
      }
      
      console.error("Unexpected API response structure:", JSON.stringify(data));
      throw new Error("Unexpected API response structure");
    } catch (error) {
      console.error("Error extracting response:", error, JSON.stringify(data));
      return "I couldn't process that response correctly. Please try asking something else about Ghana's climate initiatives.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { type: 'user', text: message }]);
    setIsLoading(true);
    
    try {
      // Get response from Google AI
      const aiResponse = await callGoogleAI(message);
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { type: 'bot', text: aiResponse }]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to get a response. Please try again.");
      setConversation(prev => [...prev, { 
        type: 'bot', 
        text: "I'm having trouble connecting to my knowledge base right now. Please try again in a few moments." 
      }]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
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
            {isLoading && (
              <div className="flex justify-center items-center py-2">
                <Loader2 className="h-6 w-6 text-ghana-green animate-spin" />
                <span className="ml-2 text-sm text-gray-500">ClimateWise is thinking...</span>
              </div>
            )}
          </div>
          
          <SheetFooter className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about Ghana's climate initiatives..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatbotButton;
