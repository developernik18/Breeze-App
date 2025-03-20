import React, { useState, useEffect } from "react";
import SearchBar from "./components/search-bar";
import RecentSearches from "./components/recent-searches";
import WeatherDisplay from "./components/weather-display";
import TopCitiesWeather from "./components/top-cities-weather";
// import WeatherForecast from "./components/weather-forecast";
import { Loader2 } from "lucide-react";

interface WeatherData {
  field: string;
  value: string;
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(`${latitude},${longitude}`);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const fetchWeather = async (location: string) => {
    if (!location) return;
    setLoading(true);
    try {
      const response = await fetch(`https://wttr.in/${location}?format=%l|%C|%t|%f|%h|%w|%p|%P|%u|%S|%s|%m|%T`);
      const data = await response.text();
      const fields = [
        "Location", "Condition", "Temperature", "Feels Like", "Humidity",
        "Wind Speed", "Precipitation", "Pressure", "UV Index",
        "Sunrise", "Sunset", "Moon Phase", "Current Time"
      ];
      const values = data.split("|");
      const weatherData = fields.map((field, index) => ({ field, value: values[index] || "N/A" }));
      setWeather(weatherData);
      updateRecentSearches(location);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (location: string) => {
    setRecentSearches((prev) => {
      const updatedSearches = [location, ...prev.filter((c) => c !== location)].slice(0, 10);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  const removeSearch = (location: string) => {
    setRecentSearches((prev) => {
      const updatedSearches = prev.filter((c) => c !== location);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };


  return (
    <div className="max-w-3xl mx-auto p-8 min-h-screen flex flex-col items-center rounded-lg text-gray-900 bg-gray-100">
      <h2 className="text-4xl font-bold mb-6 text-center">Breeze App</h2>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      <RecentSearches recentSearches={recentSearches} fetchWeather={fetchWeather} removeSearch={removeSearch} />
      {loading ? <Loader2 className="animate-spin mx-auto text-gray-900" size={40} /> : <WeatherDisplay weather={weather} />}
      {/* <WeatherForecast city={city} days={5} /> */}
      <TopCitiesWeather />
    </div>
  );
};

export default WeatherApp;