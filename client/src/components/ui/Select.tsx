type SelectProps = {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({ id, label, value, options, onChange }: SelectProps) {
  return (
    <label className="block text-sm text-slate-200" htmlFor={id}>
      <span className="mb-2 inline-block font-medium">{label}</span>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-950 text-slate-100">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
