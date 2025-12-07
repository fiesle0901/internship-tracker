type Entry = {
  id: number;
  date: string;
  task: string;
  givenBy: string;
  hours: number;
  remarks?: string | null;
};

export default function ReportTable({
  entries,
  isLoading,
}: {
  entries: Entry[];
  isLoading: boolean;
}) {
  if (isLoading) return <p>Loading entries...</p>;
  if (entries.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="font-mono text-muted-foreground">
          No entries yet. Add one to get started!
        </p>
      </div>
    );
  }
  return (
    <table className="w-full text-left">
      <thead className="bg-[#540000] text-white text-sm ">
        <tr>
          <th className="px-4 py-3 ">DATE</th>
          <th className="px-4 py-3">TASK</th>
          <th className="px-4 py-3">GIVEN BY</th>
          <th className="px-4 py-3">HOURS</th>
          <th className="px-4 py-3">REMARKS</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr
            key={entry.id}
            className="odd:bg-gray-100 border font-light hover:bg-cyan-50 transition-colors border-gray-200"
          >
            <td className="text-sm px-4 py-3">
              {entry.date?.split("T")[0] ?? entry.date}
            </td>
            <td className="text-sm px-4 py-3">{entry.task}</td>
            <td className="text-sm px-4 py-3">{entry.givenBy}</td>
            <td className="text-sm px-4 py-3 text-center">{entry.hours}</td>
            <td className="text-sm px-4 py-3">{entry.remarks || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
