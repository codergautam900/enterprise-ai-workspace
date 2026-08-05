export default function CTA() {
  return (
    <section id="cta" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/20 lg:p-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Ready to move forward?
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          Launch your team’s secure AI workspace with confidence.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Get started with a tailored workspace that brings documents, knowledge, and AI collaboration together in one place.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="mailto:hello@enterpriseaiworkspace.com"
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Schedule a demo
          </a>
          <a
            href="#overview"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            Back to home
          </a>
        </div>
      </div>
    </section>
  );
}
