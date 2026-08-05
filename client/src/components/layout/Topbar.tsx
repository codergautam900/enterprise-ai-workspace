import { Search, Bell, UserCircle2, Menu } from "lucide-react";

type TopbarProps = {
  userName: string;
  onToggleMenu?: () => void;
};

export default function Topbar({ userName, onToggleMenu }: TopbarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 bg-slate-950/80 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Welcome back</p>
          <h1 className="text-2xl font-semibold text-slate-100">Good afternoon, {userName}</h1>
        </div>
        {onToggleMenu ? (
          <button
            type="button"
            onClick={onToggleMenu}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="group relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="Search workspace, documents, AI prompts"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/90 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            aria-label="Search workspace"
          />
        </label>
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="inline-flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 px-3 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
          aria-label="User profile"
        >
          <UserCircle2 className="h-6 w-6 text-cyan-300" />
          <span className="hidden sm:inline">Avery</span>
        </button>
      </div>
    </div>
  );
}
