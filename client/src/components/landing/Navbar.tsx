import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Product", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Solutions", href: "#solution" },
  { label: "Pricing", href: "#cta" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300 md:inline-flex"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            onClick={closeMenu}
          >
            Get started
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300 md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/10 bg-slate-950/95 transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-6 py-4 lg:px-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/login"
            className="mt-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
            onClick={closeMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="mt-2 rounded-full bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 text-center transition hover:bg-cyan-400"
            onClick={closeMenu}
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
