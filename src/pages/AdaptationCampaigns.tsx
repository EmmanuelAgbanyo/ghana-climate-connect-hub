
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdaptationCampaigns = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-12 pb-6 bg-ghana-pattern">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Adaptation Campaigns</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Proactive initiatives addressing Ghana's climate challenges and building resilience across communities.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Why Adaptation Matters</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6">
              In Ghana, climate adaptation campaigns represent proactive efforts to address the impacts of climate change that are already being experienced across the country. From coastal erosion to changing rainfall patterns and increasing temperatures, these campaigns help communities prepare for and respond to climate challenges.
            </p>
            <p className="text-lg">
              Through innovative approaches combining traditional knowledge with new technologies, Ghana is working to build resilience while reducing vulnerability among its most affected populations.
            </p>
          </div>
        </div>
      </section>

      {/* Key Campaigns Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Key Campaigns and Initiatives</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-ghana-forest-light to-ghana-forest/10">
                <CardTitle>Resilience Against Climate Change (REACH)</CardTitle>
                <CardDescription className="text-gray-700">EU-funded project in Northern Ghana</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li><strong>Focus:</strong> Training district planners for climate-smart development</li>
                  <li><strong>Location:</strong> Northern Ghana regions</li>
                  <li><strong>Key Activities:</strong>
                    <ul className="list-disc ml-6 mt-1">
                      <li>Climate-smart agriculture training</li>
                      <li>District development planning integration</li>
                      <li>Community Action Plans (CAPs) development</li>
                      <li>Value chain enhancement for resilience</li>
                    </ul>
                  </li>
                  <li><strong>Impact:</strong> Improved planning capacity and implementation of climate-resilient practices in northern regions</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-gradient-to-r from-ghana-water-light to-ghana-water/10">
                <CardTitle>Greater Accra Resilient Integrated Development Project</CardTitle>
                <CardDescription className="text-gray-700">$200M World Bank-funded initiative</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li><strong>Focus:</strong> Flood and waste management in urban areas</li>
                  <li><strong>Location:</strong> Greater Accra Metropolitan Area</li>
                  <li><strong>Key Activities:</strong>
                    <ul className="list-disc ml-6 mt-1">
                      <li>Drainage system improvements</li>
                      <li>Solid waste management enhancement</li>
                      <li>Flood early warning systems</li>
                      <li>Community-based flood adaptation planning</li>
                    </ul>
                  </li>
                  <li><strong>Impact:</strong> Reduced flooding incidents and improved urban resilience to extreme weather events</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-gradient-to-r from-ghana-earth-light to-ghana-earth/10">
                <CardTitle>Northern Drylands Investment</CardTitle>
                <CardDescription className="text-gray-700">$100M support for smallholder farmers since 2016</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li><strong>Focus:</strong> Supporting agriculture in drought-prone regions</li>
                  <li><strong>Location:</strong> Northern Ghana drylands</li>
                  <li><strong>Key Activities:</strong>
                    <ul className="list-disc ml-6 mt-1">
                      <li>Drought-resistant crop varieties introduction</li>
                      <li>Water harvesting techniques</li>
                      <li>Solar-powered irrigation systems</li>
                      <li>Sustainable land management practices</li>
                    </ul>
                  </li>
                  <li><strong>Impact:</strong> Enhanced agricultural productivity and reduced vulnerability to drought conditions</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-gradient-to-r from-ghana-gold/30 to-ghana-gold/10">
                <CardTitle>Ghana Climate Care Project</CardTitle>
                <CardDescription className="text-gray-700">Community-based adaptation in Accra-Ada</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li><strong>Focus:</strong> Local adaptation and disaster risk reduction</li>
                  <li><strong>Location:</strong> Coastal communities (Accra-Ada)</li>
                  <li><strong>Key Activities:</strong>
                    <ul className="list-disc ml-6 mt-1">
                      <li>Mangrove restoration</li>
                      <li>Women's economic empowerment</li>
                      <li>Disaster risk reduction training</li>
                      <li>Climate-resilient livelihoods development</li>
                    </ul>
                  </li>
                  <li><strong>Impact:</strong> Strengthened coastal defenses and improved community preparedness for extreme weather events</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Youth-Led Campaigns */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Youth-Led Adaptation Initiatives</h2>
          
          <div className="bg-ghana-green/5 border border-ghana-green/20 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-ghana-green">National Youth Climate Action Plan (NYCAP)</h3>
            <p className="mb-4">
              Led by Ghana's youth organizations, the NYCAP focuses on empowering young people to take leadership roles in climate adaptation efforts across the country. The plan integrates youth perspectives into national climate policies while supporting grassroots initiatives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold mb-2 text-ghana-green">Education</h4>
                <p>Climate literacy programs in schools and communities</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold mb-2 text-ghana-green">Innovation</h4>
                <p>Youth-led climate solution competitions and startups</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold mb-2 text-ghana-green">Advocacy</h4>
                <p>Representation in national and international climate forums</p>
              </div>
            </div>
            <p>
              Youth Path Organisation (YPO) plays a key role in NYCAP implementation, coordinating efforts between youth groups, government agencies, and international partners.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">YPO's Climate Campaigns</h3>
            <p className="max-w-3xl mx-auto mb-8">
              Youth Path Organisation leads several climate adaptation campaigns focused on youth empowerment, community resilience, and innovative solutions to Ghana's climate challenges.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="font-bold mb-2">Climate Education</h4>
                <p className="text-sm mb-2">School and community programs on climate change and adaptation</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="font-bold mb-2">Tree Planting</h4>
                <p className="text-sm mb-2">Urban and rural reforestation initiatives across Ghana</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="font-bold mb-2">Climate Policy</h4>
                <p className="text-sm mb-2">Youth advocacy for inclusive climate governance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="font-bold mb-2">Climate Innovation</h4>
                <p className="text-sm mb-2">Support for youth-led climate adaptation startups</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Dry-Season Gardening in Upper West Region</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Women farmers in Upper West Region have successfully implemented dry-season gardening techniques, allowing year-round production despite increasingly erratic rainfall patterns.
                </p>
                <p>
                  Using simple water harvesting methods, drought-resistant crop varieties, and efficient irrigation, these communities have increased their food security and income resilience during climate stressors.
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-600">Impact: 40% increase in household income during dry seasons</p>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Women's Agribusiness in Keta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  In coastal Keta, where sea level rise and erosion threaten traditional livelihoods, women's cooperatives have developed climate-resilient agribusinesses.
                </p>
                <p>
                  Focusing on salt-tolerant crops and value-added processing, these initiatives provide economic alternatives while promoting sustainable land management practices that help mitigate coastal erosion.
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-600">Impact: 200+ women with improved livelihoods</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-ghana-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Adaptation Efforts</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Support Ghana's climate adaptation campaigns through volunteering, donations, or advocacy. Together, we can build resilience for our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg" className="bg-white text-ghana-green hover:bg-white/90">
              <a href="/call-to-action">Volunteer</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdaptationCampaigns;
