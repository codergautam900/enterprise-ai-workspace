import SectionHeading from "./SectionHeading";

const steps = [
  {
    title: "Upload knowledge",
    description: "Bring documents, wikis, and cloud content into one searchable workspace with intelligent ingestion.",
  },
  {
    title: "Process and organize",
    description: "Classify, tag, and connect content so every answer is backed by relevant knowledge and context.",
  },
  {
    title: "Ask AI",
    description: "Query your workspace with natural language and get answers from the most relevant sources.",
  },
  {
    title: "Get contextual answers",
    description: "Review AI responses with citations and insights drawn directly from your own documents.",
  },
  {
    title: "Collaborate and act",
    description: "Share findings, assign follow-ups, and keep teams aligned on decisions and next steps.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 lg:p-12">
        <SectionHeading
          eyebrow="How it works"
          title="Move from knowledge to action in five clear steps."
          description="A structured workflow keeps documents, AI, and collaboration aligned so teams can trust AI outputs and stay productive."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-lg font-semibold text-cyan-300">
                {index + 1}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-100">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
