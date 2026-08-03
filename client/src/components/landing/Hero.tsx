import Button from "../ui/Button";

export default function Hero() {
  return (
    <section id="overview" className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_45%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
            AI operations for modern teams
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
            Bring strategy, execution, and governance into one intelligent workspace.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Enterprise AI Workspace helps your team design prompts, compare models, and ship reliable AI experiences with confidence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button>Start building</Button>
            <a
              href="#models"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              Explore models
            </a>
          </div>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["4x", "faster iteration"],
              ["99.9%", "workflow uptime"],
              ["24/7", "governed copilots"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-2xl font-semibold text-slate-100">{value}</dt>
                <dd className="mt-1 text-sm text-slate-400">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/30">
          <div className="rounded-2xl border border-cyan-400/20 bg-slate-950 p-6">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Workspace health</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-300">
                Stable
              </span>
            </div>
            <div className="mt-8 space-y-4">
              {[
                ["Prompt library", "120 reusable flows"],
                ["Model review", "7 providers connected"],
                ["Governance", "Policy checks enabled"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-slate-100">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
