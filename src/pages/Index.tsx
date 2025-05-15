
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80')",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Building a Climate-Resilient Ghana Together
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover Ghana's Climate Information, Adaptation Strategies, and Leadership for a Sustainable Future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ghana-green hover:bg-ghana-green/90 text-white">
              <Link to="/climate-information">Learn More</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/call-to-action">Take Action Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Climate Information Centre - Ghana</h2>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg mb-4">
              The Climate Information Centre - Ghana serves as a central hub for information on Ghana's climate challenges, adaptation strategies, and leadership in climate resilience. We aim to inform, engage, and inspire action among individuals, communities, policymakers, and youth.
            </p>
            <p className="text-lg">
              Driven by the Youth Path Organisation (YPO), we are committed to building a sustainable future for Ghana through knowledge sharing, capacity building, and advocacy.
            </p>
          </div>
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Explore Our Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-ghana-forest-light/20">
                <CardTitle>Climate Information</CardTitle>
                <CardDescription>Ghana's climate challenges and policies</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Understand Ghana's rising temperatures, erratic rainfall, and sea level rise. Learn about our NDCs, NAP, and other climate policies.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/climate-information" className="flex items-center justify-center gap-2">
                    <span>Explore</span> <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-ghana-water-light/20">
                <CardTitle>Adaptation Campaigns</CardTitle>
                <CardDescription>Initiatives and success stories</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Discover Ghana's proactive adaptation projects like REACH, Greater Accra Resilient Development, and community-based initiatives.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/adaptation-campaigns" className="flex items-center justify-center gap-2">
                    <span>Learn More</span> <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-ghana-earth-light/20">
                <CardTitle>Resilient Leadership</CardTitle>
                <CardDescription>Driving climate adaptation in Ghana</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Explore how proactive, inclusive, and innovative leadership is driving Ghana's climate adaptation efforts at all levels.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/resilient-leadership" className="flex items-center justify-center gap-2">
                    <span>Discover</span> <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonial/Quote Section */}
      <section className="py-16 bg-ghana-green text-white">
        <div className="container mx-auto px-4">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl italic mb-6">
              "Climate change is not just an environmental issue, but a development challenge. Our response must be inclusive, innovative, and driven by youth leadership to secure a sustainable future for Ghana."
            </p>
            <footer className="font-medium">
              — Ghanaian Youth Climate Advocate
            </footer>
          </blockquote>
        </div>
      </section>
    </Layout>
  );
}

export default Index;
