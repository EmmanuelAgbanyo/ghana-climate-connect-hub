
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus, Save } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define schema for blog post validation
const blogPostSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  author: z.string().min(3, { message: 'Author name must be at least 3 characters' }),
  image_url: z.string().optional(),
  category: z.string().min(2, { message: 'Category must be at least 2 characters' }),
});

type BlogPost = z.infer<typeof blogPostSchema> & { id: string, created_at: string };
type BlogPostInput = z.infer<typeof blogPostSchema>;

const BlogPostAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BlogPostInput>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
      image_url: '',
      category: 'General',
    },
  });

  // Fetch all blog posts with improved type safety
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      // Safely cast data to our BlogPost type after checking for errors
      setPosts((data as BlogPost[]) || []);
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blog posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form submission
  const onSubmit = async (values: BlogPostInput) => {
    // Ensure all required fields are present and not undefined
    const blogPostData = {
      title: values.title,
      content: values.content,
      author: values.author,
      category: values.category,
      image_url: values.image_url || null, // Handle optional field
    };
    
    setIsSubmitting(true);
    try {
      if (editing) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(blogPostData)
          .eq('id', editing);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog post updated successfully',
        });
      } else {
        // Create new post - now with proper typing
        const { error } = await supabase
          .from('blog_posts')
          .insert(blogPostData);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog post created successfully',
        });
      }

      // Reset form and fetch updated posts
      form.reset({
        title: '',
        content: '',
        author: '',
        image_url: '',
        category: 'General',
      });
      setEditing(null);
      fetchPosts();
    } catch (error: any) {
      console.error('Error submitting blog post:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save blog post',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle editing a post
  const handleEdit = (post: BlogPost) => {
    setEditing(post.id);
    form.reset({
      title: post.title,
      content: post.content,
      author: post.author,
      image_url: post.image_url || '',
      category: post.category,
    });
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle deleting a post
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });
      
      fetchPosts();
      
      // If we were editing this post, reset the form
      if (editing === id) {
        form.reset({
          title: '',
          content: '',
          author: '',
          image_url: '',
          category: 'General',
        });
        setEditing(null);
      }
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete blog post',
        variant: 'destructive',
      });
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditing(null);
    form.reset({
      title: '',
      content: '',
      author: '',
      image_url: '',
      category: 'General',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-ghana-green">Blog Management</h1>
        </div>

        {/* Blog Post Form */}
        <Card>
          <CardHeader>
            <CardTitle>{editing ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
            <CardDescription>
              {editing ? 'Make changes to the blog post' : 'Add a new blog post to your website'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write your blog post content here..." 
                          className="min-h-[200px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-2">
                  {editing && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" disabled={isSubmitting} className="bg-ghana-green hover:bg-ghana-green/90">
                    {isSubmitting ? (
                      'Saving...'
                    ) : editing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Post
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Post
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Blog Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Blog Posts</CardTitle>
            <CardDescription>Manage your published blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading blog posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No blog posts yet. Create your first post above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>
                          {new Date(post.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(post.id)}
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
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default BlogPostAdmin;
