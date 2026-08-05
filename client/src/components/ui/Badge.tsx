type BadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "success";
  className?: string;
};

const toneStyles = {
  neutral: "bg-slate-800/90 text-slate-200",
  accent: "bg-cyan-500/15 text-cyan-300",
  success: "bg-emerald-500/10 text-emerald-300",
};

export default function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${toneStyles[tone]} ${className}`.trim()}>
      {children}
    </span>
  );
}
