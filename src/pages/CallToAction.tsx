
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CallToAction = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally send the email to a backend
    toast({
      title: "Thank you for joining!",
      description: "We'll be in touch with updates and opportunities.",
    });
    setEmail("");
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-12 pb-6 bg-ghana-pattern">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Take Action</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Join our collective efforts to build a climate-resilient Ghana through concrete steps and meaningful engagement.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Why Your Action Matters</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6">
              Climate change affects all Ghanaians, but our collective response can determine how we navigate these challenges. Whether you're an individual, community member, youth leader, or policymaker, your actions contribute to building Ghana's climate resilience.
            </p>
            <p className="text-lg mb-6">
              By taking action today, you help protect vulnerable communities, preserve essential ecosystems, and create a more sustainable future for generations to come.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-ghana-green hover:bg-ghana-green/90">
                <a href="#actions">See How You Can Help</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Actionable Steps Section */}
      <section id="actions" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Actionable Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <Card>
              <CardHeader className="bg-ghana-forest-light/20 border-b">
                <CardTitle>For Individuals</CardTitle>
                <CardDescription>Climate-smart practices for everyday life</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold">Water Conservation</h3>
                  <p className="text-sm">Install rainwater harvesting systems, fix leaks promptly, and reuse greywater for gardens.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Tree Planting</h3>
                  <p className="text-sm">Plant native trees in your community to enhance biodiversity and reduce heat stress.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Energy Efficiency</h3>
                  <p className="text-sm">Use energy-efficient appliances and consider solar options where possible.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Waste Reduction</h3>
                  <p className="text-sm">Minimize plastic use, compost organic waste, and properly dispose of electronics.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">
                  <a href="#join" className="flex items-center justify-center">Get Involved</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-ghana-water-light/20 border-b">
                <CardTitle>For Communities</CardTitle>
                <CardDescription>Collective action for local resilience</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold">Community Action Plans (CAPs)</h3>
                  <p className="text-sm">Develop locally-led adaptation plans that address specific vulnerabilities and leverage community strengths.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Early Warning Systems</h3>
                  <p className="text-sm">Establish community-based monitoring and communication systems for floods, droughts, or other hazards.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Knowledge Sharing</h3>
                  <p className="text-sm">Create platforms to exchange traditional and new adaptation practices within and between communities.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Community Gardens</h3>
                  <p className="text-sm">Establish climate-smart food gardens that enhance food security during extreme weather events.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">
                  <a href="#join" className="flex items-center justify-center">Partner With Us</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-ghana-gold/20 border-b">
                <CardTitle>For Youth</CardTitle>
                <CardDescription>Leading the future of climate action</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold">Join YPO Programs</h3>
                  <p className="text-sm">Participate in YPO's training, mentorship, and leadership development initiatives.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Campus Initiatives</h3>
                  <p className="text-sm">Start or join climate clubs in schools and universities to promote awareness and action.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Digital Advocacy</h3>
                  <p className="text-sm">Use social media platforms to amplify climate messages and mobilize peers.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Innovation Challenges</h3>
                  <p className="text-sm">Develop climate solutions through hackathons, competitions, and entrepreneurship programs.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">
                  <a href="#join" className="flex items-center justify-center">Join Youth Network</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-ghana-red/20 border-b">
                <CardTitle>For Policymakers</CardTitle>
                <CardDescription>Supporting systemic climate resilience</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold">Support NDC Funding</h3>
                  <p className="text-sm">Advocate for increased budget allocations to implement Ghana's climate commitments.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Mainstream Adaptation</h3>
                  <p className="text-sm">Integrate climate adaptation considerations into all sectoral policies and planning processes.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Enable Local Action</h3>
                  <p className="text-sm">Develop frameworks that empower district-level climate planning and implementation.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Evidence-Based Policy</h3>
                  <p className="text-sm">Support climate research and monitoring systems to inform effective adaptation strategies.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">
                  <a href="#join" className="flex items-center justify-center">Policy Resources</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="join" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Get Involved</h2>
          
          <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-center">Join Our Network</h3>
            <p className="mb-6 text-center">
              Sign up to receive updates about climate initiatives, volunteer opportunities, and upcoming events.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="your.email@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-ghana-green hover:bg-ghana-green/90">
                Subscribe
              </Button>
            </form>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Volunteer</h3>
              <p className="mb-4">
                Join our team of dedicated volunteers supporting climate adaptation initiatives across Ghana.
              </p>
              <Button asChild variant="outline">
                <a href="/contact">Learn More</a>
              </Button>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Partner</h3>
              <p className="mb-4">
                Explore collaboration opportunities for organizations, businesses, and institutions.
              </p>
              <Button asChild variant="outline">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Donate</h3>
              <p className="mb-4">
                Support our work financially to help expand climate adaptation efforts throughout Ghana.
              </p>
              <Button asChild variant="outline">
                <a href="/contact">Support Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">Spread the Word</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Help amplify our message by sharing information about Ghana's climate challenges and adaptation efforts on your social networks.
          </p>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-ghana-green transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-ghana-green transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-ghana-green transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-ghana-green transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          
          <div className="mt-8 max-w-xl mx-auto">
            <p className="text-sm text-gray-500 italic">
              "Share how you're adapting to climate change using #GhanaClimatAction #AdaptGhana"
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CallToAction;
