type NumberInputProps = {
  label?: string;
  value: number | "";
  onChange: (value: number | "") => void;
  placeholder?: string;
};

export function NumberInput({
  label,
  value,
  onChange,
  placeholder,
}: NumberInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="number"
        className="border rounded px-3 py-2 text-sm"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "" ? "" : Number(val));
        }}
      />
    </div>
  );
}
