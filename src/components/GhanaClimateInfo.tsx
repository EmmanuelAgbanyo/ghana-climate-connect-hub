
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GhanaClimateInfo = () => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-ghana-green/10">
        <CardTitle className="text-ghana-green">Ghana Climate Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-600 mb-3">
          Ghana's climate is tropical with two main seasons: wet and dry. The climate varies from 
          humid and wet in the south to dry in the north, with significant regional differences 
          in temperature and precipitation patterns.
        </p>
        <p className="text-gray-600 mb-3">
          Average annual temperatures range from 26°C to 29°C, with coastal areas experiencing more 
          moderate temperatures due to sea breezes. Rainfall patterns vary considerably, with the south 
          receiving up to 2,000mm annually, while the north receives around 1,000mm.
        </p>
        <p className="text-gray-600">
          Climate change is already impacting Ghana through rising temperatures, changing rainfall patterns, 
          and more frequent extreme weather events like floods and droughts, affecting agriculture, water 
          resources, and coastal communities.
        </p>
      </CardContent>
    </Card>
  );
};

export default GhanaClimateInfo;
