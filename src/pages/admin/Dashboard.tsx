
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [contentCount, setContentCount] = useState<number>(0);
  const [dataSourcesCount, setDataSourcesCount] = useState<number>(0);
  const [categoryCounts, setCategoryCounts] = useState<{category: string, count: number}[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get content count
        const { count: contentCountData, error: contentError } = await supabase
          .from('climate_content')
          .select('*', { count: 'exact', head: true });

        if (contentError) throw contentError;

        // Get data sources count
        const { count: dataSourcesCountData, error: dataSourcesError } = await supabase
          .from('data_sources')
          .select('*', { count: 'exact', head: true });

        if (dataSourcesError) throw dataSourcesError;

        // Get content by category
        const { data: categoryData, error: categoryError } = await supabase
          .from('climate_content')
          .select('category');

        if (categoryError) throw categoryError;

        // Process category data
        const categories: Record<string, number> = {};
        categoryData.forEach(item => {
          categories[item.category] = (categories[item.category] || 0) + 1;
        });

        const categoryCountsData = Object.entries(categories).map(([category, count]) => ({
          category,
          count
        }));

        setContentCount(contentCountData || 0);
        setDataSourcesCount(dataSourcesCountData || 0);
        setCategoryCounts(categoryCountsData);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading dashboard data...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-ghana-green">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Content Items</CardTitle>
              <CardDescription>Total content in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{contentCount}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Data Sources</CardTitle>
              <CardDescription>External data integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{dataSourcesCount}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Categories</CardTitle>
              <CardDescription>Content categories</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{categoryCounts.length}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Categories Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Content by Category</CardTitle>
            <CardDescription>Distribution of content across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {categoryCounts.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryCounts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#006B3F" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">No content categories available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
