
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Image as ImageIcon, Grid2x2, List } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import GalleryItem from '@/components/admin/gallery/GalleryItem';
import ImageEditor from '@/components/admin/gallery/ImageEditor';
import GalleryAlbums from '@/components/admin/gallery/GalleryAlbums';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
  album_id?: string | null;
};

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<GalleryItem>>({});
  const [uploadProgress, setUploadProgress] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryItems();
  }, [selectedAlbumId]);

  const fetchGalleryItems = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      // If an album is selected, filter by it (this is a placeholder for future implementation)
      if (selectedAlbumId) {
        // This would be implemented when album functionality is added to the database
        // query = query.eq('album_id', selectedAlbumId);
      }
        
      const { data, error } = await query;

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error: any) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: 'Error',
        description: 'Failed to load gallery items.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    setUploadProgress(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setUploadProgress(false);
    }
  };

  const handleAdd = async (formData: { title: string; description: string; image: File | null; imagePreview: string | null }) => {
    try {
      if (!formData.title) {
        toast({
          title: 'Missing fields',
          description: 'Please provide a title for the gallery item.',
          variant: 'destructive',
        });
        return;
      }

      let imageUrl = '';
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      } else {
        toast({
          title: 'Missing image',
          description: 'Please upload an image for the gallery item.',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('gallery')
        .insert([
          {
            title: formData.title,
            description: formData.description || null,
            image_url: imageUrl,
            // When album functionality is added: album_id: selectedAlbumId
          }
        ]);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Gallery item added successfully.',
      });
      
      setIsAddDialogOpen(false);
      fetchGalleryItems();
    } catch (error: any) {
      console.error('Error adding gallery item:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add gallery item.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = async (formData: { title: string; description: string; image: File | null; imagePreview: string | null }) => {
    try {
      if (!currentItem.id || !formData.title) {
        toast({
          title: 'Missing fields',
          description: 'Please provide a title for the gallery item.',
          variant: 'destructive',
        });
        return;
      }

      let imageUrl = currentItem.image_url;
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      const { error } = await supabase
        .from('gallery')
        .update({
          title: formData.title,
          description: formData.description || null,
          image_url: imageUrl,
          // When album functionality is added: album_id: selectedAlbumId
        })
        .eq('id', currentItem.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Gallery item updated successfully.',
      });
      
      setIsEditDialogOpen(false);
      setCurrentItem({});
      fetchGalleryItems();
    } catch (error: any) {
      console.error('Error updating gallery item:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update gallery item.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (!currentItem.id) return;

      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', currentItem.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Gallery item deleted successfully.',
      });
      
      setIsDeleteDialogOpen(false);
      setCurrentItem({});
      fetchGalleryItems();
    } catch (error: any) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete gallery item.',
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleOpenImageEditor = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsEditingImage(true);
  };

  const handleSaveEditedImage = async (blob: Blob) => {
    try {
      if (!currentItem.id) return;
      
      // Create a File object from Blob to upload
      const file = new File([blob], 'edited-image.jpg', { type: 'image/jpeg' });
      const imageUrl = await uploadImage(file);
      
      const { error } = await supabase
        .from('gallery')
        .update({
          image_url: imageUrl
        })
        .eq('id', currentItem.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Image updated successfully.',
      });
      
      setIsEditingImage(false);
      setCurrentItem({});
      fetchGalleryItems();
    } catch (error: any) {
      console.error('Error saving edited image:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save edited image.',
        variant: 'destructive',
      });
    }
  };

  const renderGalleryList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Added on</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {galleryItems.map((item) => (
          <GalleryItem
            key={item.id}
            item={item}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
            onViewDetail={handleOpenImageEditor}
          />
        ))}
      </TableBody>
    </Table>
  );

  const renderGalleryGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {galleryItems.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="aspect-square relative">
            {item.image_url ? (
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/90 backdrop-blur-sm w-8 h-8"
                onClick={() => openEditDialog(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/90 backdrop-blur-sm w-8 h-8 text-red-500"
                onClick={() => openDeleteDialog(item)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium truncate">{item.title}</CardTitle>
            {item.description && (
              <CardDescription className="text-xs truncate">{item.description}</CardDescription>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-ghana-green">Gallery Management</h1>
          <div className="flex items-center space-x-2">
            <div className="border rounded-md p-1 flex">
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm" 
                className={viewMode === 'list' ? 'bg-ghana-green hover:bg-ghana-green/90' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="sm" 
                className={viewMode === 'grid' ? 'bg-ghana-green hover:bg-ghana-green/90' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid2x2 className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-ghana-green hover:bg-ghana-green/90">
              <Plus className="h-4 w-4 mr-2" /> Add Image
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <GalleryAlbums 
              selectedAlbumId={selectedAlbumId} 
              onSelectAlbum={setSelectedAlbumId} 
            />
          </div>
          <div className="w-full md:w-3/4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Gallery Images</CardTitle>
                <CardDescription>
                  {selectedAlbumId ? 'Showing images from selected album' : 'Showing all gallery images'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <Spinner size="lg" />
                  </div>
                ) : galleryItems.length > 0 ? (
                  <div className="border rounded-md">
                    {viewMode === 'list' ? renderGalleryList() : renderGalleryGrid()}
                  </div>
                ) : (
                  <div className="text-center p-8 border rounded-md bg-muted/50">
                    {selectedAlbumId 
                      ? "No images found in this album. Add some images to get started."
                      : "No gallery items found. Add some images to get started."}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Gallery Item</DialogTitle>
            <DialogDescription>
              Upload images for the gallery section.
            </DialogDescription>
          </DialogHeader>
          <GalleryForm
            onSubmit={handleAdd}
            isSubmitting={uploadProgress}
            submitLabel="Add Image"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
            <DialogDescription>
              Update the gallery item information.
            </DialogDescription>
          </DialogHeader>
          <GalleryForm
            initialData={{
              id: currentItem.id,
              title: currentItem.title || '',
              description: currentItem.description || '',
              image_url: currentItem.image_url
            }}
            onSubmit={handleEdit}
            onCancel={() => setIsEditDialogOpen(false)}
            isSubmitting={uploadProgress}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentItem.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Editor Dialog */}
      <Dialog open={isEditingImage} onOpenChange={setIsEditingImage}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Make adjustments to your gallery image.
            </DialogDescription>
          </DialogHeader>
          {currentItem.image_url && (
            <ImageEditor
              imageUrl={currentItem.image_url}
              onSave={handleSaveEditedImage}
              onCancel={() => setIsEditingImage(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Gallery;
