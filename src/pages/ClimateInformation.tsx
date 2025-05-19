
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import GhanaClimateInfo from '@/components/GhanaClimateInfo';

type ClimateContent = {
  id: string;
  title: string;
  content: string;
  category: string;
  source_url: string | null;
};

const categories = [
  'Climate Change',
  'Adaptation Strategies',
  'Mitigation',
  'Policy',
  'Community Action',
  'Education',
  'Research',
  'Other'
];

const ClimateInformation = () => {
  const [contentList, setContentList] = useState<ClimateContent[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('climate_content')
        .select('*')
        .order('last_updated', { ascending: false });
      
      if (error) throw error;
      setContentList(data || []);
    } catch (error) {
      console.error('Error fetching climate content:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredContent = activeCategory === 'all' 
    ? contentList 
    : contentList.filter(item => item.category === activeCategory);

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-ghana-green text-center mb-6">Climate Information</h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-600">
            Access comprehensive information about climate change impacts, adaptation strategies, 
            and resilience initiatives in Ghana.
          </p>
        </div>
        
        <div className="mb-12">
          <GhanaClimateInfo />
        </div>
        
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-ghana-green">Knowledge Base</h2>
          
          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner size="lg" />
                </div>
              ) : filteredContent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredContent.map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription className="mt-2">
                              Category: {item.category}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose max-w-none">
                          <div className="whitespace-pre-line text-sm text-gray-600">
                            {item.content}
                          </div>
                          
                          {item.source_url && (
                            <div className="mt-4">
                              <a 
                                href={item.source_url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ghana-green hover:underline text-sm"
                              >
                                Source / Learn more
                              </a>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-muted/30 rounded-md">
                  <p className="text-muted-foreground">
                    {activeCategory === 'all' 
                      ? 'No climate information content found.' 
                      : `No content found for the ${activeCategory} category.`}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ClimateInformation;
