const partners = ["FinOps", "Regula", "Nimbus", "Aegis"];

export default function TrustSection() {
  return (
    <section className="px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-8 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Trusted by modern teams</p>
          <p className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">
            Built for enterprise operations, compliance, and scale.
          </p>
        </div>
        <div className="grid w-full max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
          {partners.map((name) => (
            <span key={name} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
