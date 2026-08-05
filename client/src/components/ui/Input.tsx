type InputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  hint?: string;
  className?: string;
};

export default function Input({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  autoComplete,
  error,
  hint,
  className = "",
}: InputProps) {
  return (
    <label className={`block text-sm ${className}`.trim()} htmlFor={id}>
      <span className="mb-2 inline-block font-medium text-slate-200">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 ${error ? "border-rose-400 text-rose-100 placeholder:text-rose-300" : "placeholder:text-slate-500"}`.trim()}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {hint ? <p className="mt-2 text-xs text-slate-400">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-rose-300">
          {error}
        </p>
      ) : null}
    </label>
  );
}
