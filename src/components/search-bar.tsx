import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  fetchWeather: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, fetchWeather }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchWeather(city);
    }
  };

  return (
    <div className="flex gap-2 mb-4 w-full">
      <Input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city"
        className="flex-1 p-3 border border-gray-300 rounded-lg text-black bg-white"
      />
      <Button
        onClick={() => fetchWeather(city)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
