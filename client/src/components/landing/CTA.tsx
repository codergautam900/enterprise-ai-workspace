export default function CTA() {
  return (
    <section id="cta" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-slate-950 p-10 text-center shadow-2xl shadow-cyan-950/20 lg:p-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Ready to transform work?
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          Give your team a secure, scalable AI workspace they can actually rely on.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Book a guided walkthrough and see how Enterprise AI Workspace can streamline operations across your organization.
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
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}
