type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export default function PageHeader({ eyebrow, title, description, className = "" }: PageHeaderProps) {
  return (
    <div className={`space-y-4 ${className}`.trim()}>
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-slate-100 sm:text-4xl">{title}</h2>
      <p className="max-w-3xl text-base leading-7 text-slate-400">{description}</p>
    </div>
  );
}
