const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Models", href: "#models" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#overview" className="flex items-center gap-3 text-sm font-semibold text-slate-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
            EA
          </span>
          <span className="text-lg tracking-tight">Enterprise AI Workspace</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
        >
          Request demo
        </a>
      </div>
    </header>
  );
}
