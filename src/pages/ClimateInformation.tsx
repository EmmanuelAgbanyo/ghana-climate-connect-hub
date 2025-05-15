
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ClimateInformation = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-12 pb-6 bg-ghana-pattern">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Climate Information</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Understanding Ghana's climate challenges, policies, and frameworks for a resilient future.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Ghana's Climate Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-lg">
                Ghana faces multiple climate challenges that affect its environment, economy, and communities. Over the past four decades, the country has experienced a temperature rise of approximately 1°C, with projections indicating a further rise of 1-3°C by the 2060s.
              </p>
              <p className="mb-4 text-lg">
                Erratic rainfall patterns, increased frequency of extreme weather events, and rising sea levels along the coastal areas are creating significant challenges for agriculture, water resources, and infrastructure.
              </p>
              <p className="text-lg">
                These changes are particularly concerning as they impact food security, health outcomes (including increased malaria and malnutrition), and economic development across various sectors.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Temperature Rise</span>
                  <span>1°C over past 40 years</span>
                </div>
                <Progress value={25} className="h-2 bg-gray-200" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Projected Temperature Increase</span>
                  <span>Up to 3°C by 2060s</span>
                </div>
                <Progress value={75} className="h-2 bg-gray-200" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Annual Rainfall Variability</span>
                  <span>Increasingly erratic</span>
                </div>
                <Progress value={60} className="h-2 bg-gray-200" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Sea Level Rise</span>
                  <span>Coastal erosion increasing</span>
                </div>
                <Progress value={40} className="h-2 bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies and Frameworks */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Key Climate Policies and Frameworks</h2>
          
          <Tabs defaultValue="ndcs" className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="ndcs">NDCs</TabsTrigger>
                <TabsTrigger value="nap">NAP</TabsTrigger>
                <TabsTrigger value="master-plan">Master Plan</TabsTrigger>
                <TabsTrigger value="nccp">NCCP</TabsTrigger>
                <TabsTrigger value="nccas">NCCAS</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="ndcs">
              <Card>
                <CardHeader>
                  <CardTitle>Nationally Determined Contributions (NDCs)</CardTitle>
                  <CardDescription>Updated in 2021</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Ghana's updated NDCs include 47 adaptation and mitigation programs that aim to reduce emissions by 64 MtCO2e by 2030, while building resilience for approximately 38 million people.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Key Sectors</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Energy</li>
                        <li>Agriculture</li>
                        <li>Health</li>
                        <li>Transport</li>
                        <li>Forest & Land Use</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Implementation Challenges</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Funding gaps ($22.6B needed)</li>
                        <li>Technology transfer limitations</li>
                        <li>Capacity constraints</li>
                        <li>Coordination between stakeholders</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nap">
              <Card>
                <CardHeader>
                  <CardTitle>National Adaptation Plan (NAP)</CardTitle>
                  <CardDescription>Building long-term resilience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Ghana's NAP focuses on building resilience using long-term climate projections (up to 2080). It emphasizes cross-sectoral coordination and is designed to support post-COVID recovery while addressing climate vulnerabilities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Key Focus Areas</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Multi-sectoral approach to adaptation</li>
                        <li>Community-level implementation</li>
                        <li>Long-term planning horizons</li>
                        <li>Green recovery integration</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Anticipated Outcomes</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Enhanced adaptive capacity</li>
                        <li>Reduced vulnerability in key sectors</li>
                        <li>Improved cross-sectoral coordination</li>
                        <li>Strengthened local adaptation planning</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="master-plan">
              <Card>
                <CardHeader>
                  <CardTitle>National Climate Change Master Plan (2015-2020)</CardTitle>
                  <CardDescription>Strategic infrastructure investments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The Master Plan outlined key infrastructure and capacity-building actions, including significant investments in sea defense projects ($670M) and resilient infrastructure in Greater Accra ($200M).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Major Projects</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Sea defense projects ($670M)</li>
                        <li>Greater Accra resilient infrastructure ($200M)</li>
                        <li>Climate-resilient agriculture initiatives</li>
                        <li>Early warning systems development</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Achievements</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Protection of coastal communities</li>
                        <li>Reduced flood impacts in urban areas</li>
                        <li>Strengthened agricultural resilience</li>
                        <li>Enhanced disaster preparedness</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nccp">
              <Card>
                <CardHeader>
                  <CardTitle>National Climate Change Policy (NCCP, 2013)</CardTitle>
                  <CardDescription>Comprehensive policy framework</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The NCCP outlines 10 focus areas for addressing climate change across multiple sectors. It encompasses both mitigation and adaptation strategies with particular attention to gender considerations and vulnerable groups.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">10 Focus Areas</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Climate-resilient agriculture</li>
                        <li>Disaster preparedness and response</li>
                        <li>Natural resource management</li>
                        <li>Equitable social development</li>
                        <li>Energy and infrastructure</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Key Principles</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Gender sensitivity</li>
                        <li>Intergenerational equity</li>
                        <li>Polluter pays principle</li>
                        <li>Multi-sectoral approach</li>
                        <li>Subsidiarity (local implementation)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nccas">
              <Card>
                <CardHeader>
                  <CardTitle>National Climate Change Adaptation Strategy (NCCAS, 2012)</CardTitle>
                  <CardDescription>Building resilience and reducing vulnerability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The NCCAS was developed to increase climate resilience and decrease vulnerability across Ghana's socioeconomic sectors. It provides a framework for coordinated adaptation efforts nationwide.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Strategic Goals</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Improve societal awareness</li>
                        <li>Enhance research and knowledge management</li>
                        <li>Build capacity for adaptation</li>
                        <li>Reduce vulnerability in key sectors</li>
                        <li>Develop early warning systems</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-bold mb-2">Priority Sectors</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Water resources</li>
                        <li>Agriculture and food security</li>
                        <li>Health</li>
                        <li>Coastal zone management</li>
                        <li>Biodiversity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Implementation Challenges</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-red-700">Key Barriers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                  <span><strong>Weak Coordination:</strong> Limited coordination between national and local governments hampers effective implementation of climate policies.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                  <span><strong>Funding Gaps:</strong> Ghana needs approximately $22.6 billion to implement its NDCs, with significant resource constraints.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                  <span><strong>Technical Capacity:</strong> Limited technical expertise, particularly at district levels, impacts adaptation planning and implementation.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
                  <span><strong>Data Limitations:</strong> Insufficient climate data and monitoring systems affect evidence-based decision-making.</span>
                </li>
              </ul>
            </div>
            
            <p className="text-center text-lg">
              Despite these challenges, Ghana continues to make progress through innovative partnerships, increased youth engagement, and growing political commitment to climate action.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClimateInformation;
