import SectionHeading from "./SectionHeading";

const problems = [
  {
    title: "Knowledge scattered across teams",
    description: "Files, chat logs, and wikis are locked in different places, forcing teams to hunt for context and repeat work.",
  },
  {
    title: "Search results lack relevance",
    description: "Traditional search returns stale matches instead of the right answer in context with your business data.",
  },
  {
    title: "Multiple AI tools, fragmented workflows",
    description: "Every model, document source, and collaboration channel lives in a different app, slowing decisions and execution.",
  },
];

export default function ProblemSection() {
  return (
    <section id="challenge" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The challenge"
          title="Teams lose momentum when knowledge and AI work are fragmented."
          description="Enterprise teams need a single place to capture documents, search knowledge, and collaborate with AI without switching tools."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {problems.map((problem) => (
            <article key={problem.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 transition hover:border-cyan-400/20">
              <h3 className="text-xl font-semibold text-slate-100">{problem.title}</h3>
              <p className="mt-4 text-slate-400 leading-7">{problem.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
