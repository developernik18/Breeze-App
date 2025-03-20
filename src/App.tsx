import React, { useState, useEffect } from "react";
import SearchBar from "./components/search-bar";
import RecentSearches from "./components/recent-searches";
import WeatherDisplay from "./components/weather-display";
import TopCitiesWeather from "./components/top-cities-weather";
import { Loader2 } from "lucide-react";

// Define an interface for Weather Data
interface WeatherData {
  field: string;
  value: string;
}

const WeatherApp: React.FC = () => {
  // State for storing the city input
  const [city, setCity] = useState<string>("");
  // State for storing weather data
  const [weather, setWeather] = useState<WeatherData[] | null>(null);
  // State to track loading state
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage recent searches, initialized from localStorage
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  });

  // Fetch weather based on user's current location when the app loads
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(`${latitude},${longitude}`);
    });
  }, []);

  // Update localStorage whenever recentSearches state changes
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Function to fetch weather data for a given location
  const fetchWeather = async (location: string) => {
    if (!location) return;
    setLoading(true);
    try {
      const response = await fetch(`https://wttr.in/${location}?format=%l|%C|%t|%f|%h|%w|%p|%P|%u|%S|%s|%m|%T`);
      const data = await response.text();

      // Define the fields corresponding to the fetched data
      const fields = [
        "Location", "Condition", "Temperature", "Feels Like", "Humidity",
        "Wind Speed", "Precipitation", "Pressure", "UV Index",
        "Sunrise", "Sunset", "Moon Phase", "Current Time"
      ];

      // Split the response data and map it to an object format
      const values = data.split("|");
      const weatherData = fields.map((field, index) => ({ field, value: values[index] || "N/A" }));

      // Update the state with fetched weather data
      setWeather(weatherData);
      // Store the searched location in recent searches
      updateRecentSearches(location);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update recent searches list
  const updateRecentSearches = (location: string) => {
    setRecentSearches((prev) => {
      // Add new search to the top and limit to 10 items
      const updatedSearches = [location, ...prev.filter((c) => c !== location)].slice(0, 10);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  // Function to remove a search from recent searches
  const removeSearch = (location: string) => {
    setRecentSearches((prev) => {
      const updatedSearches = prev.filter((c) => c !== location);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 min-h-screen flex flex-col items-center rounded-lg shadow-lg text-gray-900 bg-gray-100">
      <h2 className="text-4xl font-bold mb-6 text-center">Breeze App</h2>
      {/* Search bar component for entering a city */}
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {/* Recent searches component */}
      <RecentSearches recentSearches={recentSearches} fetchWeather={fetchWeather} removeSearch={removeSearch} />
      {/* Show loader while fetching data, otherwise display weather */}
      {loading ? <Loader2 className="animate-spin mx-auto text-gray-900" size={40} /> : <WeatherDisplay weather={weather} />}
      {/* Component to display top cities' weather */}
      <TopCitiesWeather />
    </div>
  );
};

export default WeatherApp;
