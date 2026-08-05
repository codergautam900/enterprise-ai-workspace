import SectionHeading from "./SectionHeading";

const features = [
  {
    title: "AI Knowledge Search",
    description: "Search your documents and knowledge sources with AI-ranked context, summaries, and recommended answers.",
  },
  {
    title: "Document Intelligence",
    description: "Extract meaning from files, automate metadata, and surface the most relevant information instantly.",
  },
  {
    title: "AI Workspace",
    description: "Collaborate in a shared workspace that combines chat, documents, sources, and model control.",
  },
  {
    title: "Multi-Model AI",
    description: "Compare GPT, Claude, Gemini, and private models in a single workflow with consistent prompts and reporting.",
  },
  {
    title: "Team Collaboration",
    description: "Assign tasks, share insights, and keep teams aligned on knowledge workflows and AI decisions.",
  },
  {
    title: "Secure Knowledge Management",
    description: "Protect sensitive data with workspace isolation, role-based access, and audit-ready controls.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Core capabilities"
          title="Everything your team needs to manage documents, knowledge, and AI in one trusted platform."
          description="Enterprise AI Workspace delivers a secure, collaborative environment for knowledge work and AI operations without tool sprawl."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 transition hover:border-cyan-400/20">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center text-lg font-semibold">
                •
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-100">{feature.title}</h3>
              <p className="mt-4 text-slate-400 leading-7">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
