import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  image_url?: string;
  category: string;
  created_at: string;
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          throw new Error('Blog post not found');
        }
        
        // Type assertion after validating data exists
        setPost(data as BlogPost);
      } catch (error: any) {
        console.error('Error fetching blog post:', error);
        setError(error.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [id]);

  // Function to format date nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <p className="text-xl text-gray-500">Loading post...</p>
        </div>
      </Layout>
    );
  }
  
  if (error || !post) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog Post</h1>
                <p className="mb-6">{error || "The blog post could not be found"}</p>
                <Button asChild>
                  <Link to="/blog">Back to Blog</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-ghana-green hover:underline mb-6">
          ← Back to all posts
        </Link>
        
        <Card className="overflow-hidden">
          {post.image_url && (
            <div className="w-full aspect-video overflow-hidden">
              <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
          )}
          
          <CardHeader>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <span>{post.category}</span>
                <span>•</span>
                <span>{formatDate(post.created_at)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
              <div className="text-muted-foreground">By {post.author}</div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BlogPost;
