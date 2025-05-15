
import Layout from "@/components/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ResilientLeadership = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-12 pb-6 bg-ghana-pattern">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Resilient Leadership</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Empowering champions of climate adaptation and sustainable development in Ghana.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">The Need for Resilient Leadership</h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              Addressing Ghana's climate challenges requires more than policies and frameworks—it demands resilient leadership at all levels of society. From national policymakers to community organizers and youth advocates, resilient leaders are driving Ghana's adaptation efforts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              <div className="bg-ghana-forest/5 p-6 rounded-lg border border-ghana-forest/20">
                <h3 className="font-bold text-xl mb-3 text-ghana-forest">Proactive</h3>
                <p>Anticipating challenges and implementing preventive measures rather than reactive responses</p>
              </div>
              <div className="bg-ghana-gold/5 p-6 rounded-lg border border-ghana-gold/20">
                <h3 className="font-bold text-xl mb-3 text-ghana-gold">Inclusive</h3>
                <p>Ensuring all voices—especially those of women, youth, and vulnerable communities—inform decision-making</p>
              </div>
              <div className="bg-ghana-red/5 p-6 rounded-lg border border-ghana-red/20">
                <h3 className="font-bold text-xl mb-3 text-ghana-red">Innovative</h3>
                <p>Finding creative solutions that combine traditional knowledge with new technologies and approaches</p>
              </div>
            </div>
            
            <p className="text-lg">
              Resilient leadership recognizes that climate adaptation is not solely an environmental issue but a comprehensive development challenge requiring coordinated action across sectors, jurisdictions, and generations.
            </p>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Examples of Resilient Leadership</h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>National Climate Change Committee (NCCC)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Ghana's NCCC demonstrates institutional leadership by coordinating climate action across government ministries, departments, and agencies. It ensures climate considerations are mainstreamed into national development planning.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2">Key Achievements</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cross-sectoral coordination mechanisms</li>
                      <li>Climate budget tagging system</li>
                      <li>Enhanced monitoring frameworks</li>
                      <li>Policy coherence across sectors</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2">Leadership Qualities</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Strategic vision development</li>
                      <li>Stakeholder engagement</li>
                      <li>Accountability mechanisms</li>
                      <li>Adaptive management approach</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Youth Leadership in Climate Advocacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Young Ghanaians are increasingly taking leadership roles in climate adaptation, bringing fresh perspectives and innovative approaches to addressing environmental challenges.
                </p>
                <div className="bg-white p-4 rounded-md shadow-sm mb-4">
                  <h4 className="font-bold mb-2">Toolkit for Youth on Adaptation and Leadership</h4>
                  <p>
                    Developed by CARE and the Global Center for Adaptation, this toolkit empowers Ghanaian youth with the knowledge and skills to lead climate adaptation initiatives in their communities.
                  </p>
                </div>
                <p>
                  Youth leaders are particularly effective at mobilizing peer networks, leveraging digital platforms, and connecting local adaptation actions to global climate movements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* YPO's Role Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">YPO's Role in Fostering Leadership</h2>
          
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-lg">
              Youth Path Organisation (YPO) has been instrumental in cultivating the next generation of climate leaders in Ghana through various programs focused on capacity building, mentorship, and practical experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3">Leadership Training</h3>
              <p className="mb-4">
                Workshops and bootcamps equipping young people with leadership skills, climate knowledge, and project management abilities.
              </p>
              <p className="text-sm text-ghana-green">
                300+ youth trained annually
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3">Mentorship Program</h3>
              <p className="mb-4">
                Connecting emerging youth leaders with established professionals in climate policy, science, and adaptation practice.
              </p>
              <p className="text-sm text-ghana-green">
                50 mentor-mentee pairs active
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3">Policy Fellowship</h3>
              <p className="mb-4">
                Placing talented young professionals in government agencies to contribute to climate policy development and implementation.
              </p>
              <p className="text-sm text-ghana-green">
                25 fellows placed since program inception
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Climate Leadership Profiles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-ghana-green text-white text-2xl">CL</AvatarFallback>
                </Avatar>
                <CardTitle>Community Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4">
                  "Through traditional knowledge and new adaptation techniques, our community has transformed how we respond to changing rainfall patterns."
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Location:</strong> Northern Ghana</p>
                  <p className="text-sm"><strong>Focus:</strong> Climate-smart agriculture</p>
                  <p className="text-sm"><strong>Impact:</strong> Resilient farming practices adopted by 15 communities</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-ghana-gold text-white text-2xl">YA</AvatarFallback>
                </Avatar>
                <CardTitle>Youth Advocate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4">
                  "Young people aren't just future leaders—we're leading climate action now, bringing innovative solutions to our communities."
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Location:</strong> Accra</p>
                  <p className="text-sm"><strong>Focus:</strong> Urban climate resilience</p>
                  <p className="text-sm"><strong>Impact:</strong> Youth-led initiatives in 5 urban districts</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-ghana-red text-white text-2xl">PE</AvatarFallback>
                </Avatar>
                <CardTitle>Policy Expert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4">
                  "Effective climate policies require both scientific evidence and community voices. Our approach bridges these worlds."
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Location:</strong> National level</p>
                  <p className="text-sm"><strong>Focus:</strong> Inclusive policy development</p>
                  <p className="text-sm"><strong>Impact:</strong> Climate considerations in 3 major national policies</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-ghana-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Share Your Climate Leadership Story</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Are you championing climate adaptation in your community? We want to hear from you! Share your story to inspire others and connect with like-minded leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-ghana-green hover:bg-white/90 h-10 px-4 py-2"
            >
              Share Your Story
            </a>
            <a 
              href="/call-to-action" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-white text-white hover:bg-white/10"
            >
              Join Leadership Programs
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResilientLeadership;
