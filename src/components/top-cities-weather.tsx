import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const topCities = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Nagpur"];

interface CityWeather {
  city: string;
  condition: string;
  temperature: string;
}

const TopCitiesWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const weatherPromises = topCities.map(async (city) => {
          const response = await fetch(`https://wttr.in/${city}?format=%C|%t`);
          const data = await response.text();
          const [condition, temperature] = data.split("|");
          return { city, condition, temperature };
        });

        const results = await Promise.all(weatherPromises);
        setWeatherData(results);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="mt-6 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Weather in Top Cities of India</h2>
      {loading ? (
        <Loader2 className="animate-spin mx-auto text-gray-900" size={40} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {weatherData.map(({ city, condition, temperature }) => (
            <Card key={city} className="bg-white shadow-md rounded-lg p-4 text-center">
              <CardContent className="p-2">
                <h3 className="text-lg font-semibold">{city}</h3>
                <p className="text-gray-700">{condition}</p>
                <p className="text-xl font-bold">{temperature}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCitiesWeather;