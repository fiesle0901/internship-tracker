import { useMemo } from "react";
import type { ReportEntry } from "../types/types";

type HoursProps = {
  entries: ReportEntry[];
  otherStyles?: string;
  hours: string;
  onChange: (value: string) => void;
};

export default function HoursRendered({
  entries,
  otherStyles = "",
  onChange,
  hours,
}: HoursProps) {
  const hoursNumber = Number(hours) || 0;

  const totalHours = useMemo(() => {
    const total = entries.reduce((sum, entry) => sum + entry.hours, 0);
    return total;
  }, [entries, hours]);

  const progress = useMemo(() => {
    if (hoursNumber === 0) return 0;

    return Math.min(100, Math.round((totalHours / hoursNumber) * 100));
  }, [totalHours, hours]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      onChange("");
      return;
    }

    const value = Number(raw);

    if (value > 700) {
      onChange("700");
      return;
    }

    if (value < totalHours) {
      onChange(raw);
      return;
    }

    onChange(raw);
  };

  return (
    <div
      className={`${otherStyles} flex flex-row justify-between items-center bg-white p-4 `}
    >
      <div>
        <span className="text-gray-400 text-sm">TOTAL HOURS RENDERED</span>
        <p className="text-4xl font-bold">{totalHours} hrs</p>
      </div>
      <div className="flex flex-col ">
        <span className="text-gray-400 text-sm">HOURS TO RENDER</span>
        <input
          type="number"
          min={totalHours}
          max={600}
          placeholder="0"
          value={hours}
          onChange={handleInputChange}
          className="
  bg-blue-50 px-2 py-1 rounded-md"
        />
      </div>
      <div className="  ">
        <span className="text-gray-400 text-sm">PROGRESS</span>
        <p className="text-4xl font-bold">{progress} %</p>
      </div>
    </div>
  );
}
