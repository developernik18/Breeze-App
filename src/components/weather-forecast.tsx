import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface WeatherForecastProps {
  city: string;
  days?: 3 | 5;
}

interface ForecastData {
  date: string;
  condition: string;
  temperature: string;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ city, days = 3 }) => {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return;
      setLoading(true);
      try {
        // const response = await fetch(`https://wttr.in/${city}?format=j1`);
        const response = await fetch(`https://wttr.in/Patna?format=j1`);
        const data = await response.text();
        console.log(data);
        const lines = data.split("\n").slice(0, days);

        const forecastData = lines.map((line) => {
          const [date, condition, temperature] = line.split(" ");
          return { date, condition, temperature };
        });

        setForecast(forecastData);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city, days]);

  return (
    <div className="mt-6 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">
        {days}-Day Weather Forecast for {city}
      </h2>
      {loading ? (
        <Loader2 className="animate-spin mx-auto text-gray-900" size={40} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forecast.map(({ date, condition, temperature }, index) => (
            <Card key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
              <CardContent className="p-2">
                <h3 className="text-lg font-semibold">{date}</h3>
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

export default WeatherForecast;
