import { useEffect, useState } from "react";
import AddRowForm from "../components/AddRowForm";
import Header from "../components/Header";
import ReportTable from "../components/ReportTable";
import { getReportEntries } from "../api/entries";

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

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      const data = await getReportEntries();
      setEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleEntryAdded = (entry: Entry) => {
    setEntries((prev) => [entry, ...prev]);
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
