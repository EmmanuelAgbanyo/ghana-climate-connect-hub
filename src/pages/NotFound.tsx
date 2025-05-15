
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
          Oops! The page you're looking for can't be found. It might have been moved or doesn't exist.
        </p>
        <div className="space-x-4">
          <Button asChild className="bg-ghana-green hover:bg-ghana-green/90">
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
