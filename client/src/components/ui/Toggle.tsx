type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
};

export default function Toggle({ label, checked, onChange, name }: ToggleProps) {
  return (
    <label className="group inline-flex cursor-pointer items-center gap-3 text-sm text-slate-200">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full border border-white/10 bg-slate-800 transition ${checked ? "bg-cyan-500" : "bg-slate-700"}`.trim()}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-1"}`.trim()}
        />
      </button>
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
    </label>
  );
}
