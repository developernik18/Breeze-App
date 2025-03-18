import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiFog, WiStrongWind, WiBarometer, WiSunrise, WiSunset, WiMoonNew,
  WiMoonWaxingCrescent3, WiMoonFirstQuarter, WiMoonWaxingGibbous3, WiMoonFull, WiMoonWaningGibbous3,
  WiMoonThirdQuarter, WiMoonWaningCrescent3, WiDayHaze
} from "react-icons/wi";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  WbSunny, DeviceThermostat, WaterDrop, Visibility, AccessTime,
  Explore, CloudQueue, Waves
} from "@mui/icons-material";  // MUI colorful icons

interface WeatherData {
  field: string;
  value: string;
}

interface WeatherDisplayProps {
  weather: WeatherData[] | null;
}

// Format Time Function
const formatTime = (rawTime: string) => {
  try {
    const timePart = rawTime.substring(0, 8); // Extract time "20:32:47"
    const timeZoneOffset = rawTime.substring(8); // Extract timezone "+0530"

    const [hours, minutes, seconds] = timePart.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds);

    // Convert to 12-hour format
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const formattedOffset = `GMT${timeZoneOffset.substring(0, 3)}:${timeZoneOffset.substring(3)}`;

    return `${formattedTime} (${formattedOffset})`;
  } catch (error) {
    console.log(error);
    return "Invalid time format";
  }
};

// Function to dynamically assign icons based on weather data
const getWeatherIcon = (field: string, value: string) => {
  switch (field) {
    case "Condition":
      if (value.toLowerCase().includes("rain")) return <WiRain className="text-blue-500" size={40} />;
      if (value.toLowerCase().includes("cloud")) return <CloudQueue className="text-gray-500" fontSize="large" />;
      if (value.toLowerCase().includes("sun")) return <WiDaySunny className="text-yellow-500" size={40} />;
      if (value.toLowerCase().includes("snow")) return <WiSnow className="text-blue-400" size={40} />;
      if (value.toLowerCase().includes("storm")) return <WiThunderstorm className="text-red-500" size={40} />;
      if (value.toLowerCase().includes("haze")) return <WiDayHaze className="text-gray-600" size={40} />;
      return <WiFog className="text-gray-700" size={40} />;

    case "Temperature":
      return <DeviceThermostat className="text-red-500" fontSize="large" />;

    case "Feels Like":
      return <WbSunny className="text-orange-500" fontSize="large" />;

    case "Humidity":
      return <WaterDrop className="text-blue-500" fontSize="large" />;

    case "Wind Speed":
      return <WiStrongWind className="text-green-500" size={40} />;

    case "Wind Direction":
      return <Explore className="text-gray-600" fontSize="large" />;

    case "Pressure":
      return <WiBarometer className="text-gray-500" size={40} />;

    case "Visibility":
      return <Visibility className="text-indigo-500" fontSize="large" />;

    case "Precipitation":
      return <Waves className="text-blue-400" fontSize="large" />;

    case "Sunrise":
      return <WiSunrise className="text-yellow-500" size={40} />;

    case "Sunset":
      return <WiSunset className="text-orange-500" size={40} />;

    case "Moon Phase":
      if (value.includes("New")) return <WiMoonNew className="text-gray-500" size={40} />;
      if (value.includes("Waxing Crescent")) return <WiMoonWaxingCrescent3 className="text-gray-500" size={40} />;
      if (value.includes("First Quarter")) return <WiMoonFirstQuarter className="text-gray-500" size={40} />;
      if (value.includes("Waxing Gibbous")) return <WiMoonWaxingGibbous3 className="text-gray-500" size={40} />;
      if (value.includes("Full")) return <WiMoonFull className="text-gray-500" size={40} />;
      if (value.includes("Waning Gibbous")) return <WiMoonWaningGibbous3 className="text-gray-500" size={40} />;
      if (value.includes("Last Quarter")) return <WiMoonThirdQuarter className="text-gray-500" size={40} />;
      if (value.includes("Waning Crescent")) return <WiMoonWaningCrescent3 className="text-gray-500" size={40} />;
      return <WiMoonNew className="text-gray-500" size={40} />;

    case "Current Time":
      return <AccessTime className="text-blue-600" fontSize="large" />;

    case "Location":
      return <FaMapMarkerAlt className="text-red-600" size={40} />;

    default:
      return <WbSunny className="text-gray-500" fontSize="large" />;
  }
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <Card className="w-full bg-white rounded-lg shadow-md p-6 text-gray-900">
      <CardContent className="p-4 text-center">
        {/* Location Field - Separate */}
        <div className="mb-6 text-2xl font-bold flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="text-red-600" size={40} />
          {weather.find(item => item.field === "Location")?.value}
        </div>

        {/* All Other Fields Including Time */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-lg">
          {weather.filter(item => item.field !== "Location").map((item, index) => (
            <div key={index} className="flex flex-col items-center p-3 bg-gray-100 rounded-lg shadow-sm">
              {getWeatherIcon(item.field, item.value)}
              <span className="font-semibold mt-2">{item.field}</span>
              <span className="text-lg">
                {item.field === "Current Time" ? formatTime(item.value) : item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
