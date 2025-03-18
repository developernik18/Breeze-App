import React from "react";
import { AccessTime } from "@mui/icons-material";

interface CurrentTimeDisplayProps {
  currentTime: string;
}

const formatTime = (rawTime: string) => {
  try {
    // Extract time and timezone offset
    const timePart = rawTime.substring(0, 8); // "20:32:47"
    // const timeZoneOffset = rawTime.substring(8); // "+0530"

    // Convert time to Date object
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

    // Format timezone
    // const formattedOffset = `GMT${timeZoneOffset.substring(0, 3)}:${timeZoneOffset.substring(3)}`;

    return `${formattedTime}`;
  } catch (error) {
    console.log(error)
    return "Invalid time format";
  }
};

const CurrentTimeDisplay: React.FC<CurrentTimeDisplayProps> = ({ currentTime }) => {
  if (!currentTime) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-xl font-semibold">
      <AccessTime className="text-blue-600" fontSize="large" />
      <span>{formatTime(currentTime)}</span>
    </div>
  );
};

export default CurrentTimeDisplay;
