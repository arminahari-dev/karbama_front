import React, { useEffect, useState } from "react";

interface ProgressCircleProps {
  duration?: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const formatTime = (seconds: number): string => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  duration = 90,
  color = "#4caf50",
  size = 120,
  strokeWidth = 8,
}) => {
  const radius = (size - strokeWidth) / 2;
  const innerRadius = radius * 0.6;
  const circumference = 2 * Math.PI * radius;

  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const progress = (1 - timeLeft / duration) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>

        <circle
          stroke={color}
          strokeOpacity={0.2}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        <circle
          stroke="none"
          fill={color}
          fillOpacity={0.1}
          strokeWidth={0}
          r={innerRadius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 16,
          fontWeight: "bold",
          color: color,
        }}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default ProgressCircle;
