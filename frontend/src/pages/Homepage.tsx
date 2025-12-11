import { useEffect, useState } from "react";
import AddRowForm from "../components/AddRowForm";
import Header from "../components/Header";
import ReportTable from "../components/ReportTable";
import { getReportEntries } from "../api/entries";
import { useAuth } from "../context/AuthContext";

type Entry = {
  id: number;
  date: string;
  task: string;
  givenBy: string;
  hours: number;
  remarks?: string | null;
};

export default function Homepage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isGuest } = useAuth();

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      const data = await getReportEntries(isGuest);
      setEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, [isGuest]);

  const handleEntryAdded = (entry: Entry) => {
    setEntries((prev) => [...prev, entry]);
  };

  return (
    <div className="min-h-screen flex justify-center pb-12 ">
      <div className="w-full pt-6  px-6 md:px-12 lg:px-32">
        <Header />
        <div className="flex flex-col gap-10 ">
          <AddRowForm onEntryAdded={handleEntryAdded} />
          <ReportTable entries={entries} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
