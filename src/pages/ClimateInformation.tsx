
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhanaClimateInfo from '@/components/GhanaClimateInfo';
import { Spinner } from '@/components/ui/spinner';

type ClimateContent = {
  id: string;
  title: string;
  content: string;
  category: string;
  source_url: string | null;
};

const ClimateInformation = () => {
  const [climateContent, setClimateContent] = useState<ClimateContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClimateContent();
  }, []);

  const fetchClimateContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('climate_content')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      setClimateContent(data || []);
    } catch (error) {
      console.error('Error fetching climate content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-ghana-green">Climate Information</h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-600">
            Access comprehensive information about climate change impacts, adaptation strategies, 
            and resilience initiatives in Ghana.
          </p>
        </div>
        
        <div className="mb-10">
          <GhanaClimateInfo />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : climateContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {climateContent.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{item.content}</p>
                  {item.source_url && (
                    <a 
                      href={item.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ghana-green hover:underline mt-4 block text-sm"
                    >
                      Source: Learn more
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border rounded-md bg-muted/50 max-w-3xl mx-auto">
            <p className="text-lg font-medium">No climate information available yet.</p>
            <p className="text-muted-foreground mt-2">
              Stay tuned for updates on climate change impacts and adaptation strategies in Ghana.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClimateInformation;
