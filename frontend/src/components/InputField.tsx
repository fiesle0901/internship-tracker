interface InputProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  name,
  value,
  type = "text",
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div
      className={`flex flex-col gap-2 ${
        name === "task" ? "md:col-span-2" : ""
      }`}
    >
      <label className="text-gray-700 text-xs">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-2 flex-1 py-1 px-2 text-sm rounded-sm"
      />
    </div>
  );
}
