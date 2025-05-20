
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  image_url?: string;
  category: string;
  created_at: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        
        // Use the specific type casting to work with our table even though it's not in the TypeScript definitions
        const { data, error } = await supabase
          .from('blog_posts' as any)
          .select('*')
          .order('created_at' as any, { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // Cast the data to our BlogPost type
        setPosts(data as BlogPost[] || []);
      } catch (error: any) {
        console.error('Error fetching blog posts:', error);
        setError(error.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);

  // Function to format date nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-ghana-green">
          Climate Action Blog
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-gray-500">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                {post.image_url && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-1">
                    {post.category}
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>
                    By {post.author} • {formatDate(post.created_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="line-clamp-4">
                    {post.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <a 
                    href={`/blog/${post.id}`} 
                    className="text-ghana-green hover:underline inline-flex items-center"
                  >
                    Read more
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
