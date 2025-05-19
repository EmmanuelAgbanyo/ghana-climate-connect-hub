
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Image, Video } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  media_type?: string;
};

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Determine media types based on URL extensions
      const processedData = (data || []).map(item => ({
        ...item,
        media_type: getMediaType(item.image_url)
      }));
      
      setGalleryItems(processedData);
    } catch (error: any) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMediaType = (url: string): string => {
    if (!url) return 'image';
    const extension = url.split('.').pop()?.toLowerCase();
    if (['mp4', 'webm', 'ogg', 'mov'].includes(extension || '')) {
      return 'video';
    }
    return 'image';
  };

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.media_type === activeTab);

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-ghana-green mb-4">Media Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of visuals documenting climate impacts, adaptation efforts,
            and community resilience initiatives in Ghana.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Media</TabsTrigger>
              <TabsTrigger value="image">Images</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square relative overflow-hidden">
                  {item.media_type === 'video' ? (
                    <video 
                      src={item.image_url} 
                      className="w-full h-full object-cover" 
                      controls
                    />
                  ) : item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      {item.media_type === 'video' ? (
                        <Video className="h-12 w-12 text-muted-foreground" />
                      ) : (
                        <Image className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                </CardContent>
                {item.description && (
                  <CardFooter className="px-4 pb-4 pt-0 text-sm text-gray-600">
                    <p className="line-clamp-2">{item.description}</p>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md bg-muted/50">
            <Image className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-xl font-medium">No {activeTab === 'all' ? 'gallery items' : `${activeTab}s`} found</p>
            <p className="mt-2 text-muted-foreground">Our gallery will be updated soon with imagery.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
