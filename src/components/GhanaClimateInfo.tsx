
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GhanaClimateInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ghana Climate Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Ghana's climate is tropical with two main seasons: wet and dry. The climate varies from 
          humid and wet in the south to dry in the north, with significant regional differences 
          in temperature and precipitation patterns.
        </p>
      </CardContent>
    </Card>
  );
};

export default GhanaClimateInfo;
