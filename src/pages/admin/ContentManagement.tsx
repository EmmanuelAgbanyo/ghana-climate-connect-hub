
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Trash2, Plus } from 'lucide-react';

type ClimateContent = {
  id: string;
  title: string;
  content: string;
  category: string;
  source_url: string | null;
  last_updated: string;
  created_at: string;
};

const ContentManagement = () => {
  const [contentList, setContentList] = useState<ClimateContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<Partial<ClimateContent>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('climate_content')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      setContentList(data || []);
    } catch (error: any) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Error',
        description: 'Failed to load content.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setCurrentContent(prev => ({ ...prev, category: value }));
  };

  const handleAdd = async () => {
    try {
      if (!currentContent.title || !currentContent.content || !currentContent.category) {
        toast({
          title: 'Missing fields',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('climate_content')
        .insert([
          {
            title: currentContent.title,
            content: currentContent.content,
            category: currentContent.category,
            source_url: currentContent.source_url || null
          }
        ]);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Content added successfully.',
      });
      
      setIsAddDialogOpen(false);
      setCurrentContent({});
      fetchContent();
    } catch (error: any) {
      console.error('Error adding content:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add content.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = async () => {
    try {
      if (!currentContent.id || !currentContent.title || !currentContent.content || !currentContent.category) {
        toast({
          title: 'Missing fields',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('climate_content')
        .update({
          title: currentContent.title,
          content: currentContent.content,
          category: currentContent.category,
          source_url: currentContent.source_url || null,
          last_updated: new Date().toISOString()
        })
        .eq('id', currentContent.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Content updated successfully.',
      });
      
      setIsEditDialogOpen(false);
      setCurrentContent({});
      fetchContent();
    } catch (error: any) {
      console.error('Error updating content:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update content.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (!currentContent.id) {
        return;
      }

      const { error } = await supabase
        .from('climate_content')
        .delete()
        .eq('id', currentContent.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Content deleted successfully.',
      });
      
      setIsDeleteDialogOpen(false);
      setCurrentContent({});
      fetchContent();
    } catch (error: any) {
      console.error('Error deleting content:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete content.',
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (content: ClimateContent) => {
    setCurrentContent(content);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (content: ClimateContent) => {
    setCurrentContent(content);
    setIsDeleteDialogOpen(true);
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-ghana-green">Content Management</h1>
          <Button onClick={() => {
            setCurrentContent({});
            setIsAddDialogOpen(true);
          }} className="bg-ghana-green hover:bg-ghana-green/90">
            <Plus className="h-4 w-4 mr-2" /> Add Content
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <p>Loading content...</p>
          </div>
        ) : contentList.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentList.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell className="font-medium">{content.title}</TableCell>
                    <TableCell>{content.category}</TableCell>
                    <TableCell>
                      {new Date(content.last_updated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openEditDialog(content)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openDeleteDialog(content)}
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
            <p>No content found. Add some content to get started.</p>
          </div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
            <DialogDescription>
              Add new climate information content to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                name="title"
                value={currentContent.title || ''}
                onChange={handleInputChange}
                placeholder="Enter content title"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select value={currentContent.category} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="content" className="text-sm font-medium">Content</label>
              <Textarea
                id="content"
                name="content"
                value={currentContent.content || ''}
                onChange={handleInputChange}
                placeholder="Enter content details"
                className="min-h-[200px]"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="source_url" className="text-sm font-medium">Source URL (optional)</label>
              <Input
                id="source_url"
                name="source_url"
                value={currentContent.source_url || ''}
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} className="bg-ghana-green hover:bg-ghana-green/90">
              Add Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Update climate information content.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
              <Input
                id="edit-title"
                name="title"
                value={currentContent.title || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-category" className="text-sm font-medium">Category</label>
              <Select value={currentContent.category} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-content" className="text-sm font-medium">Content</label>
              <Textarea
                id="edit-content"
                name="content"
                value={currentContent.content || ''}
                onChange={handleInputChange}
                className="min-h-[200px]"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-source" className="text-sm font-medium">Source URL (optional)</label>
              <Input
                id="edit-source"
                name="source_url"
                value={currentContent.source_url || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} className="bg-ghana-green hover:bg-ghana-green/90">
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
              Are you sure you want to delete "{currentContent.title}"? This action cannot be undone.
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

export default ContentManagement;
