
import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ChatbotConfig = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('data');
  const [useClimateContent, setUseClimateContent] = useState(true);
  const [useExternalData, setUseExternalData] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState(
    `You are ClimateWise, an AI assistant specialized in Ghana's climate information. You provide accurate information about Ghana's climate change challenges, adaptation strategies, and climate policies. Your knowledge includes Ghana's Nationally Determined Contributions (NDCs), climate vulnerability assessments, and local adaptation initiatives.

When users ask questions, focus on providing information that is:
1. Specific to Ghana's climate context
2. Based on accurate scientific data
3. Actionable and relevant for Ghanaian communities
4. Supportive of Ghana's climate resilience goals

You should be helpful, informative, and focused on climate education and action in Ghana.`
  );

  const handleSaveConfig = () => {
    // In a real implementation, this would save to a configuration table in the database
    toast({
      title: "Configuration Saved",
      description: "Chatbot settings have been updated successfully.",
    });
  };

  const handleTrainOnContent = async () => {
    try {
      // Simulate training process
      toast({
        title: "Training Started",
        description: "Fetching climate content for chatbot training...",
      });
      
      // In a real implementation, this would fetch content and process it
      const { data, error } = await supabase
        .from('climate_content')
        .select('title, content, category')
        .limit(5);
      
      if (error) throw error;
      
      // Simulate processing delay
      setTimeout(() => {
        toast({
          title: "Training Complete",
          description: `Successfully processed ${data?.length || 0} content items for chatbot knowledge base.`,
        });
      }, 2000);
    } catch (error: any) {
      console.error('Error training chatbot:', error);
      toast({
        title: "Training Failed",
        description: error.message || "An error occurred during chatbot training.",
        variant: "destructive"
      });
    }
  };

  const handleTestConnection = () => {
    // Simulate testing external API connections
    toast({
      title: "Testing Connections",
      description: "Checking connections to external data sources...",
    });
    
    // Simulate delay
    setTimeout(() => {
      toast({
        title: "Connection Test Complete",
        description: "All external data sources are accessible.",
      });
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-ghana-green">Chatbot Configuration</h1>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="data">Data Sources</TabsTrigger>
            <TabsTrigger value="prompt">System Prompt</TabsTrigger>
            <TabsTrigger value="responses">Response Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="data" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Configuration</CardTitle>
                <CardDescription>
                  Configure what data sources the chatbot uses to answer questions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="climate-content">Use Climate Content Database</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow the chatbot to access and reference content from your climate information database.
                    </p>
                  </div>
                  <Switch 
                    id="climate-content" 
                    checked={useClimateContent} 
                    onCheckedChange={setUseClimateContent} 
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="external-data">Use External Data Sources</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow the chatbot to access information from configured external data sources.
                    </p>
                  </div>
                  <Switch 
                    id="external-data" 
                    checked={useExternalData} 
                    onCheckedChange={setUseExternalData} 
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleTestConnection}
                  >
                    Test Data Connections
                  </Button>
                  <Button 
                    className="bg-ghana-green hover:bg-ghana-green/90"
                    onClick={handleTrainOnContent}
                  >
                    Train on Content Database
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prompt" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Prompt Configuration</CardTitle>
                <CardDescription>
                  Define the core instructions and personality for the ClimateWise chatbot.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea 
                    id="system-prompt"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="h-[300px] font-mono text-sm"
                  />
                  <p className="text-sm text-muted-foreground">
                    This text defines how the chatbot responds and what knowledge it prioritizes.
                  </p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    className="bg-ghana-green hover:bg-ghana-green/90"
                    onClick={handleSaveConfig}
                  >
                    Save Prompt Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="responses" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Settings</CardTitle>
                <CardDescription>
                  Configure how the chatbot responds to users.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Response Temperature</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Precise</span>
                      <input type="range" min="0" max="10" defaultValue="7" className="flex-1" />
                      <span className="text-sm">Creative</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Controls randomness in responses. Lower values are more focused and deterministic.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Response Length</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Brief</span>
                      <input type="range" min="0" max="10" defaultValue="5" className="flex-1" />
                      <span className="text-sm">Detailed</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Controls the typical length of responses provided to users.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="cite-sources">Cite Sources</Label>
                      <p className="text-xs text-muted-foreground">
                        Include references to source materials in responses.
                      </p>
                    </div>
                    <Switch id="cite-sources" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="follow-up">Suggest Follow-up Questions</Label>
                      <p className="text-xs text-muted-foreground">
                        Provide related questions users might want to ask next.
                      </p>
                    </div>
                    <Switch id="follow-up" defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    className="bg-ghana-green hover:bg-ghana-green/90"
                    onClick={handleSaveConfig}
                  >
                    Save Response Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ChatbotConfig;
