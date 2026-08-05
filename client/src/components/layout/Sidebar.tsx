import { Link } from "react-router-dom";

type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
  footer?: React.ReactNode;
  mobile?: boolean;
  className?: string;
};

export default function Sidebar({ title, items, footer, mobile = false, className = "" }: SidebarProps) {
  return (
    <aside
      className={`${mobile ? "flex" : "hidden lg:flex"} ${mobile ? "w-full" : "w-72"} shrink-0 flex-col gap-6 border-r border-white/10 bg-slate-950/95 p-6 ${className}`.trim()}
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{title}</p>
      </div>
      <nav className="flex flex-col gap-1" aria-label="Primary">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${item.active ? "bg-cyan-500/10 text-cyan-300" : "text-slate-300 hover:bg-white/5 hover:text-slate-100"}`.trim()}
          >
            <span className="text-base text-slate-400 group-hover:text-cyan-300">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      {footer ? <div className="mt-auto">{footer}</div> : null}
    </aside>
  );
}
