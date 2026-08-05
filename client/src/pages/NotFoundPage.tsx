import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
          <p className="mt-4 text-slate-400 leading-7">
            The route you’re looking for isn’t available. Return to your workspace or head back to the homepage.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Back to dashboard
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/90 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
