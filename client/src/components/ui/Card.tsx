type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-sm shadow-slate-950/20 ${className}`.trim()}>
      {children}
    </div>
  );
}
