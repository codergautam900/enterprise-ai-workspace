import SectionHeading from "./SectionHeading";

const features = [
  {
    title: "Unified orchestration",
    description:
      "Coordinate prompts, agents, and approvals from a single workspace built for enterprise collaboration.",
  },
  {
    title: "Trusted governance",
    description:
      "Apply role-based access, policy checks, and audit trails without slowing your delivery teams down.",
  },
  {
    title: "Measurable impact",
    description:
      "Track performance, adoption, and cost with dashboards that turn AI work into operational insight.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why teams choose us"
          title="A platform built for execution, not experimentation."
          description="Enterprise AI Workspace combines the tools your teams need to move from concept to production with clarity and control."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-lg text-cyan-300">
                •
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-100">{feature.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-400">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
