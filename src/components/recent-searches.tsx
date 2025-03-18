import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RecentSearchesProps {
  recentSearches: string[];
  fetchWeather: (location: string) => void;
  removeSearch: (location: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ recentSearches, fetchWeather, removeSearch }) => {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {recentSearches.map((city) => (
        <div key={city} className="flex items-center bg-gray-200 px-3 py-1 rounded-lg">
          <Button onClick={() => fetchWeather(city)} variant="ghost" className="text-gray-700 hover:bg-gray-300">
            {city}
          </Button>
          <Button onClick={() => removeSearch(city)} variant="ghost" size="icon">
            <X className="text-gray-500 hover:text-red-500" size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default RecentSearches;
