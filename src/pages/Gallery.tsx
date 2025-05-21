
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Spinner } from '@/components/ui/spinner';
import { Image, Search, Grid2x2, Grid3x3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
};

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [gridSize, setGridSize] = useState<'2x2' | '3x3' | '4x4'>('3x3');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    // Filter and sort items whenever gallery items, search query, or sort order changes
    let items = [...galleryItems];
    
    // Filter based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item => item.title.toLowerCase().includes(query) || 
                (item.description && item.description.toLowerCase().includes(query))
      );
    }
    
    // Sort items based on selected order
    switch (sortOrder) {
      case 'newest':
        items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        items.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'alphabetical':
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    setFilteredItems(items);
  }, [galleryItems, searchQuery, sortOrder]);

  const fetchGalleryItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error: any) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGridClass = () => {
    switch (gridSize) {
      case '2x2': return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2';
      case '3x3': return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3';
      case '4x4': return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-ghana-green mb-4">
            Climate Impact Photo Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of visuals documenting climate impacts, adaptation efforts,
            and community resilience initiatives in Ghana.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search"
              placeholder="Search gallery..." 
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Select 
              defaultValue={sortOrder}
              onValueChange={(value) => setSortOrder(value as any)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="border rounded-md p-1 flex">
              <Button 
                variant={gridSize === '2x2' ? 'default' : 'ghost'} 
                size="sm" 
                className={gridSize === '2x2' ? 'bg-ghana-green hover:bg-ghana-green/90' : ''}
                onClick={() => setGridSize('2x2')}
                aria-label="2x2 grid"
              >
                <Grid2x2 className="h-4 w-4" />
              </Button>
              <Button 
                variant={gridSize === '3x3' ? 'default' : 'ghost'} 
                size="sm" 
                className={gridSize === '3x3' ? 'bg-ghana-green hover:bg-ghana-green/90' : ''}
                onClick={() => setGridSize('3x3')}
                aria-label="3x3 grid"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className={`grid ${getGridClass()} gap-6 animate-fade-in`}>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-square relative overflow-hidden">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Image className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-md bg-muted/50">
            <Image className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="mt-4 text-xl font-medium">No images found</p>
            {searchQuery ? (
              <p className="mt-2 text-muted-foreground">
                No results match your search. Try different keywords.
              </p>
            ) : (
              <p className="mt-2 text-muted-foreground">Our gallery will be updated soon with imagery.</p>
            )}
          </div>
        )}

        {/* Image Preview Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="sm:max-w-3xl">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedItem.title}</DialogTitle>
                  <DialogDescription>
                    {selectedItem.description || 'No description available'}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-2 relative rounded-md overflow-hidden">
                  <img 
                    src={selectedItem.image_url} 
                    alt={selectedItem.title} 
                    className="w-full max-h-[70vh] object-contain"
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                  <span>
                    Added on: {new Date(selectedItem.created_at).toLocaleDateString()}
                  </span>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Gallery;
