import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
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
import { Edit, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
};

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<GalleryItem>>({});
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const { toast } = useToast();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
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

  const handleAdd = async () => {
    try {
      if (!currentItem.title) {
        toast({
          title: 'Missing fields',
          description: 'Please provide a title for the gallery item.',
          variant: 'destructive',
        });
        return;
      }

      let imageUrl = '';
      if (uploadedImage) {
        imageUrl = await uploadImage(uploadedImage);
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
            title: currentItem.title,
            description: currentItem.description || '',
            image_url: imageUrl
          }
        ]);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Gallery item added successfully.',
      });
      
      setIsAddDialogOpen(false);
      setCurrentItem({});
      setUploadedImage(null);
      setImagePreview(null);
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

  const handleEdit = async () => {
    try {
      if (!currentItem.id || !currentItem.title) {
        toast({
          title: 'Missing fields',
          description: 'Please provide a title for the gallery item.',
          variant: 'destructive',
        });
        return;
      }

      let imageUrl = currentItem.image_url;
      if (uploadedImage) {
        imageUrl = await uploadImage(uploadedImage);
      }

      const { error } = await supabase
        .from('gallery')
        .update({
          title: currentItem.title,
          description: currentItem.description || '',
          image_url: imageUrl
        })
        .eq('id', currentItem.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Gallery item updated successfully.',
      });
      
      setIsEditDialogOpen(false);
      setCurrentItem({});
      setUploadedImage(null);
      setImagePreview(null);
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
    setImagePreview(item.image_url);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-ghana-green">Gallery Management</h1>
          <Button onClick={() => {
            setCurrentItem({});
            setImagePreview(null);
            setUploadedImage(null);
            setIsAddDialogOpen(true);
          }} className="bg-ghana-green hover:bg-ghana-green/90">
            <Plus className="h-4 w-4 mr-2" /> Add Gallery Item
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Spinner size="lg" />
          </div>
        ) : galleryItems.length > 0 ? (
          <div className="border rounded-md">
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
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-16 w-20 rounded overflow-hidden">
                        {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {item.description || "-"}
                    </TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openEditDialog(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openDeleteDialog(item)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center p-8 border rounded-md bg-muted/50">
            <p>No gallery items found. Add some images to get started.</p>
          </div>
        )}
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
          <div className="space-y-4 py-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                name="title"
                value={currentItem.title || ''}
                onChange={handleInputChange}
                placeholder="Enter image title"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
              <Textarea
                id="description"
                name="description"
                value={currentItem.description || ''}
                onChange={handleInputChange}
                placeholder="Enter image description"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="image" className="text-sm font-medium">Image</label>
              <div className="flex flex-col items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-2 rounded-md overflow-hidden w-full max-h-[200px] flex items-center justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-full max-h-[200px] object-contain" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAdd} 
              className="bg-ghana-green hover:bg-ghana-green/90"
              disabled={uploadProgress}
            >
              {uploadProgress ? <Spinner size="sm" className="mr-2" /> : null}
              Add Image
            </Button>
          </DialogFooter>
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
          <div className="space-y-4 py-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
              <Input
                id="edit-title"
                name="title"
                value={currentItem.title || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-description" className="text-sm font-medium">Description (optional)</label>
              <Textarea
                id="edit-description"
                name="description"
                value={currentItem.description || ''}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-image" className="text-sm font-medium">Image (optional)</label>
              <div className="flex flex-col items-center gap-4">
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-2 rounded-md overflow-hidden w-full max-h-[200px] flex items-center justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-full max-h-[200px] object-contain" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEdit} 
              className="bg-ghana-green hover:bg-ghana-green/90"
              disabled={uploadProgress}
            >
              {uploadProgress ? <Spinner size="sm" className="mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
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
    </AdminLayout>
  );
};

export default Gallery;
