import SectionHeading from "./SectionHeading";

const securityHighlights = [
  {
    title: "Role-based access",
    description: "Control document and workspace permissions at scale with team-level policies and workspace isolation.",
  },
  {
    title: "Secure document handling",
    description: "Keep sensitive data protected with encrypted storage and access auditing across every knowledge source.",
  },
  {
    title: "Audit-ready architecture",
    description: "Track activity, model usage, and workspace changes for compliance and secure operations.",
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Security first"
          title="Enterprise-grade controls keep knowledge protected without slowing teams down."
          description="The platform is designed to support secure collaboration across documents, AI, and workspaces with visibility for governance teams."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {securityHighlights.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-8">
              <h3 className="text-xl font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-4 text-slate-400 leading-7">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
