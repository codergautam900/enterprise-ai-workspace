export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Enterprise AI Workspace. Built for modern teams.</p>
        <div className="flex gap-6">
          <a href="#overview" className="transition hover:text-cyan-300">
            Overview
          </a>
          <a href="#features" className="transition hover:text-cyan-300">
            Features
          </a>
          <a href="#models" className="transition hover:text-cyan-300">
            Models
          </a>
        </div>
      </div>
    </footer>
  );
}
