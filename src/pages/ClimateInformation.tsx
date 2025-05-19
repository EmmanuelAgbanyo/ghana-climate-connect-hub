
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ClimateInformation = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-ghana-green">Climate Information</h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-600">
            Access comprehensive information about climate change impacts, adaptation strategies, 
            and resilience initiatives in Ghana.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Climate Change in Ghana</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Ghana is experiencing rising temperatures, changing rainfall patterns, and more 
                frequent extreme weather events due to climate change.
              </p>
              <p>
                Average temperatures have increased by 1°C since 1960, with projections indicating 
                a further rise of 1.5-3°C by 2050.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Coastal Impacts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Ghana's 550km coastline is highly vulnerable to sea-level rise, with projections 
                indicating a rise of 13-21cm by 2050.
              </p>
              <p>
                Coastal erosion already affects 80% of Ghana's shoreline, threatening communities, 
                infrastructure, and ecosystems.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Agriculture & Food Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Climate change threatens agricultural productivity, with yield reductions of up to 40% 
                projected for major crops like maize and rice.
              </p>
              <p>
                Smallholder farmers, who make up 80% of Ghana's agricultural sector, are particularly 
                vulnerable due to limited adaptive capacity.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Water Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                River systems including the Volta, Pra, and Ankobra are experiencing changing flow 
                patterns and increased sedimentation due to climate change.
              </p>
              <p>
                Projections indicate a 20-30% reduction in water availability in some regions by 2050, 
                affecting drinking water access and hydropower generation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ClimateInformation;
