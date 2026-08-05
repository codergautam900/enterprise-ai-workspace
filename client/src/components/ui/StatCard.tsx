type StatCardProps = {
  label: string;
  value: string;
  delta?: string;
  description?: string;
  className?: string;
};

export default function StatCard({ label, value, delta, description, className = "" }: StatCardProps) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-slate-900/80 p-6 ${className}`.trim()}>
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <div className="mt-4 flex items-end gap-3">
        <p className="text-3xl font-semibold tracking-tight text-slate-100">{value}</p>
        {delta ? <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">{delta}</span> : null}
      </div>
      {description ? <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p> : null}
    </div>
  );
}
