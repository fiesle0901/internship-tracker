import { useState } from "react";
import InputField from "./InputField";
import { addEntry } from "../api/entries";
import { useAuth } from "../context/AuthContext";

type FormData = {
  date: string;
  task: string;
  givenBy: string;
  hours: string;
  remarks: string;
};

export default function AddRowForm({ onEntryAdded }: any) {
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split("T")[0],
    task: "",
    givenBy: "",
    hours: "",
    remarks: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isGuest } = useAuth();

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting", formData);

    setError("");
    setIsLoading(true);

    if (
      !formData.date ||
      !formData.task ||
      !formData.givenBy ||
      !formData.hours
    ) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const newEntry = await addEntry(formData);

      onEntryAdded(newEntry);

      resetData();
    } catch (error) {
      console.error("Error submitting entry: ", error);
      setError("Something went wrong");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetData = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      task: "",
      givenBy: "",
      hours: "",
      remarks: "",
    });
  };

  return (
    <form
      onSubmit={handleAddEntry}
      className="w-full border border-gray-300 rounded  mx-auto p-6 bg-white"
    >
      <p className="text-lg font-semibold">ADD NEW ENTRY</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        <InputField
          label="DATE *"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
        <InputField
          label="TASK *"
          name="task"
          type="text"
          value={formData.task}
          placeholder="I edited some pictures in Canva..."
          onChange={handleChange}
        />
        <InputField
          label="GIVEN BY *"
          name="givenBy"
          type="text"
          value={formData.givenBy}
          placeholder="Sir Dan..."
          onChange={handleChange}
        />

        <InputField
          label="HOURS *"
          name="hours"
          type="number"
          value={formData.hours}
          placeholder="0"
          onChange={handleChange}
        />

        <InputField
          label="REMARKS"
          name="remarks"
          type="text"
          value={formData.remarks}
          placeholder="Finished"
          onChange={handleChange}
        />
      </div>
      <div>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {isLoading && (
          <p className="text-gray-700 text-sm mb-2">Task submitted!</p>
        )}

        <button
          type="submit"
          disabled={isLoading || isGuest}
          className={`min-w-[100px] bg-[#540000] h-10 px-8 py-2 font-bold rounded-sm  text-white text-sm ${
            isGuest ? " bg-gray-300" : "hover:bg-[#540000]/90 cursor-pointer"
          }  `}
        >
          ADD ENTRY
        </button>
      </div>
    </form>
  );
}
