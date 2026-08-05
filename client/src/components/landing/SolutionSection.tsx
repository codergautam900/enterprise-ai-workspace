import Badge from "../ui/Badge";

const solutions = [
  {
    title: "Documents + Knowledge",
    description: "Import files, connect knowledge sources, and make every resource searchable in one secure workspace.",
  },
  {
    title: "AI-powered collaboration",
    description: "Ask questions, summarize discoveries, and share answers with teammates in a single workflow.",
  },
  {
    title: "Model choice and control",
    description: "Run prompts across trusted providers, compare results, and govern AI usage from a unified console.",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge>Unified experience</Badge>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
              One workspace that turns knowledge, AI, and collaboration into action.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              Enterprise AI Workspace bridges documents, search, and model orchestration with governance so your team can move faster with confidence.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {solutions.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-3 text-slate-400 leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
