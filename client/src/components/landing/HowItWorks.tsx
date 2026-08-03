import SectionHeading from "./SectionHeading";

const steps = [
  {
    title: "Shape the workflow",
    description: "Define goals, prompts, and review checkpoints in a structured operating model.",
  },
  {
    title: "Connect your stack",
    description: "Link your team’s preferred models, tools, and knowledge sources with secure integrations.",
  },
  {
    title: "Deploy with confidence",
    description: "Launch governed experiences that are measurable, auditable, and easy to improve.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 lg:p-12">
        <SectionHeading
          eyebrow="How it works"
          title="Go from idea to production with a clear operating rhythm."
          description="Every step is designed to keep teams aligned, reduce friction, and accelerate delivery."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-300">
                0{index + 1}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-100">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-400">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
