
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
import { Edit, Trash2, Plus, Image as ImageIcon, Video } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<GalleryItem>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [filterTab, setFilterTab] = useState<string>("all");
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
      
      // Determine media types based on URL extensions
      const processedData = (data || []).map(item => ({
        ...item,
        media_type: getMediaType(item.image_url)
      }));
      
      setGalleryItems(processedData);
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

  const getMediaType = (url: string): string => {
    if (!url) return 'image';
    const extension = url.split('.').pop()?.toLowerCase();
    if (['mp4', 'webm', 'ogg', 'mov'].includes(extension || '')) {
      return 'video';
    }
    return 'image';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFile(file);
    
    // Determine the type of file
    const fileType = file.type.split('/')[0];
    setMediaType(fileType === 'video' ? 'video' : 'image');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadFile = async (file: File): Promise<string> => {
    setUploadProgress(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const folderName = file.type.startsWith('video') ? 'videos' : 'images';
      const filePath = `gallery/${folderName}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file.',
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

      let fileUrl = '';
      if (uploadedFile) {
        fileUrl = await uploadFile(uploadedFile);
      } else {
        toast({
          title: 'Missing file',
          description: 'Please upload a file for the gallery item.',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('gallery')
        .insert([{
          title: currentItem.title,
          description: currentItem.description || '',
          image_url: fileUrl
        }]);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Gallery item added successfully.',
      });
      
      setIsAddDialogOpen(false);
      setCurrentItem({});
      setUploadedFile(null);
      setFilePreview(null);
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

      let fileUrl = currentItem.image_url;
      if (uploadedFile) {
        fileUrl = await uploadFile(uploadedFile);
      }

      const { error } = await supabase
        .from('gallery')
        .update({
          title: currentItem.title,
          description: currentItem.description || '',
          image_url: fileUrl
        })
        .eq('id', currentItem.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Gallery item updated successfully.',
      });
      
      setIsEditDialogOpen(false);
      setCurrentItem({});
      setUploadedFile(null);
      setFilePreview(null);
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
    setFilePreview(item.image_url);
    setMediaType(getMediaType(item.image_url) as 'image' | 'video');
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const filteredItems = filterTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.media_type === filterTab);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-ghana-green">Gallery Management</h1>
          <Button onClick={() => {
            setCurrentItem({});
            setFilePreview(null);
            setUploadedFile(null);
            setMediaType('image');
            setIsAddDialogOpen(true);
          }} className="bg-ghana-green hover:bg-ghana-green/90">
            <Plus className="h-4 w-4 mr-2" /> Add Media
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={filterTab} onValueChange={setFilterTab}>
          <TabsList>
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Spinner size="lg" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Media</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Added on</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-16 w-20 rounded overflow-hidden">
                        {item.media_type === 'video' ? (
                          <video 
                            src={item.image_url} 
                            className="h-full w-full object-cover" 
                          />
                        ) : item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            {item.media_type === 'video' ? (
                              <Video className="h-6 w-6 text-muted-foreground" />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {item.description || "-"}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.media_type === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {item.media_type}
                      </span>
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
            <p>No {filterTab === 'all' ? 'gallery items' : `${filterTab}s`} found. Add some media to get started.</p>
          </div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Gallery Item</DialogTitle>
            <DialogDescription>
              Upload images or videos for the gallery section.
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
                placeholder="Enter media title"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
              <Textarea
                id="description"
                name="description"
                value={currentItem.description || ''}
                onChange={handleInputChange}
                placeholder="Enter media description"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="media" className="text-sm font-medium">Media File</label>
              <div className="flex flex-col items-center gap-4">
                <Input
                  id="media"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
                {filePreview && (
                  <div className="mt-2 rounded-md overflow-hidden w-full max-h-[200px] flex items-center justify-center">
                    {mediaType === 'video' ? (
                      <video 
                        src={filePreview} 
                        controls
                        className="max-w-full max-h-[200px]" 
                      />
                    ) : (
                      <img 
                        src={filePreview} 
                        alt="Preview" 
                        className="max-w-full max-h-[200px] object-contain" 
                      />
                    )}
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
              Add Media
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
              <label htmlFor="edit-media" className="text-sm font-medium">Media File (optional)</label>
              <div className="flex flex-col items-center gap-4">
                <Input
                  id="edit-media"
                  type="file"
                  accept={mediaType === 'video' ? 'video/*' : 'image/*'}
                  onChange={handleFileChange}
                />
                {filePreview && (
                  <div className="mt-2 rounded-md overflow-hidden w-full max-h-[200px] flex items-center justify-center">
                    {mediaType === 'video' ? (
                      <video 
                        src={filePreview} 
                        controls
                        className="max-w-full max-h-[200px]" 
                      />
                    ) : (
                      <img 
                        src={filePreview} 
                        alt="Preview" 
                        className="max-w-full max-h-[200px] object-contain" 
                      />
                    )}
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
