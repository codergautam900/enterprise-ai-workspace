import SectionHeading from "./SectionHeading";

const models = [
  {
    name: "GPT-4.1",
    description: "Best for high-quality reasoning, structured analysis, and complex knowledge work.",
    capabilities: ["Reasoning", "Code generation", "Summaries"],
  },
  {
    name: "Claude 3.5",
    description: "Ideal for long-form drafting, policy-aware communication, and multi-step planning.",
    capabilities: ["Writing", "Planning", "Research"],
  },
  {
    name: "Gemini 1.5",
    description: "Great for multimodal experiences, contextual search, and cross-team collaboration.",
    capabilities: ["Multimodal", "Search", "Workflow automation"],
  },
  {
    name: "Custom enterprise models",
    description: "Bring your own model strategy, deployment patterns, and evaluation criteria into the platform.",
    capabilities: ["Private hosting", "Fine-tuning", "Model governance"],
  },
];

export default function AIModels() {
  return (
    <section id="models" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Model ecosystem"
          title="Compare, orchestrate, and scale the right AI models for every mission."
          description="Connect multiple providers under a single operating model so teams can move quickly without sacrificing control."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {models.map((model) => (
            <article key={model.name} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold text-slate-100">{model.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{model.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {model.capabilities.map((capability) => (
                  <li key={capability} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    {capability}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
