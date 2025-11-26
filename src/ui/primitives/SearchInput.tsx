type Props = {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
};

export function SearchInput({
  label,
  value,
  onChange,
  onSubmit,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        className="border rounded px-3 py-2 text-sm w-full"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
      />
    </div>
  );
}
