
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
import { Edit, Trash2, Plus, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DataSource = {
  id: string;
  name: string;
  url: string;
  api_endpoint: string | null;
  description: string | null;
  category: string;
  last_fetched: string | null;
  created_at: string;
};

const DataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSource, setCurrentSource] = useState<Partial<DataSource>>({});
  const [refreshing, setRefreshing] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDataSources(data || []);
    } catch (error: any) {
      console.error('Error fetching data sources:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data sources.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentSource(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setCurrentSource(prev => ({ ...prev, category: value }));
  };

  const handleAdd = async () => {
    try {
      if (!currentSource.name || !currentSource.url || !currentSource.category) {
        toast({
          title: 'Missing fields',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('data_sources')
        .insert([
          {
            name: currentSource.name,
            url: currentSource.url,
            api_endpoint: currentSource.api_endpoint || null,
            description: currentSource.description || null,
            category: currentSource.category
          }
        ]);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Data source added successfully.',
      });
      
      setIsAddDialogOpen(false);
      setCurrentSource({});
      fetchDataSources();
    } catch (error: any) {
      console.error('Error adding data source:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add data source.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = async () => {
    try {
      if (!currentSource.id || !currentSource.name || !currentSource.url || !currentSource.category) {
        toast({
          title: 'Missing fields',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('data_sources')
        .update({
          name: currentSource.name,
          url: currentSource.url,
          api_endpoint: currentSource.api_endpoint || null,
          description: currentSource.description || null,
          category: currentSource.category
        })
        .eq('id', currentSource.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Data source updated successfully.',
      });
      
      setIsEditDialogOpen(false);
      setCurrentSource({});
      fetchDataSources();
    } catch (error: any) {
      console.error('Error updating data source:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update data source.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (!currentSource.id) {
        return;
      }

      const { error } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', currentSource.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Data source deleted successfully.',
      });
      
      setIsDeleteDialogOpen(false);
      setCurrentSource({});
      fetchDataSources();
    } catch (error: any) {
      console.error('Error deleting data source:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete data source.',
        variant: 'destructive',
      });
    }
  };

  const simulateRefresh = async (id: string) => {
    setRefreshing(id);
    try {
      // Here you would typically fetch data from the API endpoint
      // For now, we'll just update the last_fetched timestamp
      const { error } = await supabase
        .from('data_sources')
        .update({ last_fetched: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Data refreshed successfully.',
      });
      
      fetchDataSources();
    } catch (error: any) {
      console.error('Error refreshing data:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to refresh data.',
        variant: 'destructive',
      });
    } finally {
      setRefreshing('');
    }
  };

  const openEditDialog = (source: DataSource) => {
    setCurrentSource(source);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (source: DataSource) => {
    setCurrentSource(source);
    setIsDeleteDialogOpen(true);
  };

  const categories = [
    'Weather',
    'NDCs',
    'Adaptation',
    'Mitigation',
    'Funding',
    'Research',
    'Other'
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-ghana-green">Data Sources</h1>
          <Button onClick={() => {
            setCurrentSource({});
            setIsAddDialogOpen(true);
          }} className="bg-ghana-green hover:bg-ghana-green/90">
            <Plus className="h-4 w-4 mr-2" /> Add Source
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>External Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <p>Loading data sources...</p>
              </div>
            ) : dataSources.length > 0 ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Last Fetched</TableHead>
                      <TableHead className="w-[180px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataSources.map((source) => (
                      <TableRow key={source.id}>
                        <TableCell className="font-medium">
                          {source.name}
                          {source.description && (
                            <p className="text-xs text-muted-foreground mt-1 truncate max-w-[300px]">
                              {source.description}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>{source.category}</TableCell>
                        <TableCell>
                          {source.last_fetched 
                            ? new Date(source.last_fetched).toLocaleString() 
                            : "Never"}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {source.api_endpoint && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => simulateRefresh(source.id)}
                                disabled={refreshing === source.id}
                              >
                                <RefreshCw className={`h-4 w-4 ${refreshing === source.id ? 'animate-spin' : ''}`} />
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => openEditDialog(source)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => openDeleteDialog(source)}
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
                <p>No data sources found. Add some external data sources to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Data Source</DialogTitle>
            <DialogDescription>
              Add a new external data source to fetch climate information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input
                id="name"
                name="name"
                value={currentSource.name || ''}
                onChange={handleInputChange}
                placeholder="Enter source name"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select value={currentSource.category} onValueChange={handleSelectChange}>
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
              <label htmlFor="url" className="text-sm font-medium">URL</label>
              <Input
                id="url"
                name="url"
                value={currentSource.url || ''}
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="api_endpoint" className="text-sm font-medium">API Endpoint (optional)</label>
              <Input
                id="api_endpoint"
                name="api_endpoint"
                value={currentSource.api_endpoint || ''}
                onChange={handleInputChange}
                placeholder="https://api.example.com/data"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
              <Textarea
                id="description"
                name="description"
                value={currentSource.description || ''}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} className="bg-ghana-green hover:bg-ghana-green/90">
              Add Source
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Data Source</DialogTitle>
            <DialogDescription>
              Update the external data source information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-name" className="text-sm font-medium">Name</label>
              <Input
                id="edit-name"
                name="name"
                value={currentSource.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-category" className="text-sm font-medium">Category</label>
              <Select value={currentSource.category} onValueChange={handleSelectChange}>
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
              <label htmlFor="edit-url" className="text-sm font-medium">URL</label>
              <Input
                id="edit-url"
                name="url"
                value={currentSource.url || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-api" className="text-sm font-medium">API Endpoint (optional)</label>
              <Input
                id="edit-api"
                name="api_endpoint"
                value={currentSource.api_endpoint || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <label htmlFor="edit-description" className="text-sm font-medium">Description (optional)</label>
              <Textarea
                id="edit-description"
                name="description"
                value={currentSource.description || ''}
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
              Are you sure you want to delete "{currentSource.name}"? This action cannot be undone.
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

export default DataSources;
