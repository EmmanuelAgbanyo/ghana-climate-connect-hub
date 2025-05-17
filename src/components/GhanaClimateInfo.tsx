
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';

type WeatherData = {
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    precip_mm: number;
    feelslike_c: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
    }>;
  };
};

const cities = [
  { id: 'accra', name: 'Accra' },
  { id: 'kumasi', name: 'Kumasi' },
  { id: 'tamale', name: 'Tamale' },
  { id: 'takoradi', name: 'Takoradi' },
];

const GhanaClimateInfo = () => {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData | null>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState('accra');

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const weatherPromises = cities.map(city => 
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=70fa0b9365a643789de160747242504&q=${city.name},Ghana&days=3&aqi=no&alerts=no`)
            .then(response => {
              if (!response.ok) throw new Error(`Failed to fetch data for ${city.name}`);
              return response.json();
            })
        );
        
        const results = await Promise.all(weatherPromises);
        
        const weatherObj: Record<string, WeatherData> = {};
        cities.forEach((city, index) => {
          weatherObj[city.id] = results[index];
        });
        
        setWeatherData(weatherObj);
      } catch (err: any) {
        console.error('Error fetching weather data:', err);
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
    
    // Refresh every 30 minutes
    const refreshInterval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ghana Climate Information</CardTitle>
          <CardDescription>Real-time weather updates across major cities</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Spinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ghana Climate Information</CardTitle>
          <CardDescription>Unable to load climate data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
          <p className="mt-2">Please try again later or check your connection.</p>
        </CardContent>
      </Card>
    );
  }

  const currentCityData = weatherData[activeCity];

  if (!currentCityData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ghana Climate Information</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Weather information is currently unavailable.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Ghana Climate Information</CardTitle>
        <CardDescription>Up-to-date weather conditions across major cities</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeCity} onValueChange={setActiveCity}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
            {cities.map((city) => (
              <TabsTrigger key={city.id} value={city.id}>{city.name}</TabsTrigger>
            ))}
          </TabsList>
          
          {cities.map((city) => {
            const cityData = weatherData[city.id];
            
            if (!cityData) return null;
            
            return (
              <TabsContent key={city.id} value={city.id} className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    {cityData.current.condition.icon && (
                      <img 
                        src={`https:${cityData.current.condition.icon}`}
                        alt={cityData.current.condition.text}
                        className="w-16 h-16"
                      />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold">{cityData.current.temp_c}°C</h3>
                      <p className="text-sm text-muted-foreground">Feels like {cityData.current.feelslike_c}°C</p>
                      <p>{cityData.current.condition.text}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Humidity:</span>
                      <span>{cityData.current.humidity}%</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Wind:</span>
                      <span>{cityData.current.wind_kph} km/h</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Precipitation:</span>
                      <span>{cityData.current.precip_mm} mm</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Updated:</span>
                      <span>{new Date(cityData.location.localtime).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                
                {cityData.forecast?.forecastday && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">3-Day Forecast</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {cityData.forecast.forecastday.map((day) => (
                        <div 
                          key={day.date}
                          className="p-3 border rounded-md flex flex-col items-center"
                        >
                          <p className="font-medium">{formatDate(day.date)}</p>
                          {day.day.condition.icon && (
                            <img 
                              src={`https:${day.day.condition.icon}`}
                              alt={day.day.condition.text}
                              className="w-10 h-10 my-1"
                            />
                          )}
                          <div className="flex gap-2 text-sm">
                            <span>{day.day.mintemp_c}°C</span>
                            <span>-</span>
                            <span>{day.day.maxtemp_c}°C</span>
                          </div>
                          <p className="text-xs text-center mt-1">{day.day.condition.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Rain: {day.day.daily_chance_of_rain}%
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Data provided by WeatherAPI.com - Last updated: {new Date().toLocaleString()}
      </CardFooter>
    </Card>
  );
};

export default GhanaClimateInfo;
