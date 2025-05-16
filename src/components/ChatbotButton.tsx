
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MessageSquareText, Send } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { supabase } from '@/integrations/supabase/client';

// Google AI API key
const GOOGLE_AI_API_KEY = "AIzaSyDQhPWE_tvA2E0_uZskdCaLe-NUkHDP-PU";

type ChatMessage = {
  type: 'user' | 'bot';
  text: string;
};

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<ChatMessage[]>([
    { type: 'bot', text: "Hello! I'm ClimateWise, your guide to Ghana's climate action. Ask me about NDCs, adaptation strategies, or how you can get involved!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [climateContent, setClimateContent] = useState<any[]>([]);
  
  useEffect(() => {
    // Fetch climate content from Supabase to use as context
    const fetchClimateContent = async () => {
      try {
        const { data, error } = await supabase
          .from('climate_content')
          .select('title, content, category')
          .limit(10);
        
        if (error) throw error;
        setClimateContent(data || []);
      } catch (error) {
        console.error('Error fetching climate content:', error);
      }
    };
    
    fetchClimateContent();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    // Add user message to conversation
    const userMessage = message.trim();
    setConversation([...conversation, { type: 'user', text: userMessage }]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Prepare context from our climate content
      const contextFromDb = climateContent.map(item => 
        `${item.title}: ${item.content.substring(0, 200)}...`
      ).join('\n\n');
      
      // Prepare prompt with context
      const prompt = `
You are ClimateWise, an AI assistant specialized in Ghana's climate information. 
Use this context about Ghana's climate initiatives if relevant:
${contextFromDb}

User question: ${userMessage}
      `;
      
      // Call Google AI API
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GOOGLE_AI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
          }
        })
      });
      
      const data = await response.json();
      
      // Extract and process the response
      let botMessage = "I'm sorry, I couldn't generate a response at this time.";
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        botMessage = data.candidates[0].content.parts[0].text;
      }
      
      // Add bot message to conversation
      setConversation(prev => [...prev, { type: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error with AI chatbot:', error);
      setConversation(prev => [...prev, { 
        type: 'bot', 
        text: "I'm having trouble connecting right now. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
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
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-ghana-green rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-ghana-green rounded-full animate-pulse delay-150"></div>
                  <div className="w-3 h-3 bg-ghana-green rounded-full animate-pulse delay-300"></div>
                </div>
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
              <Button type="submit" size="icon" disabled={!message.trim() || isLoading}>
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
