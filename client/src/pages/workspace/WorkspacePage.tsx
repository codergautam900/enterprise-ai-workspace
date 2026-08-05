import { useState } from "react";
import { MessageSquare, FileText, BookOpen, Layers, Link2, Send, Settings, Search } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import Badge from "../../components/ui/Badge";

const sidebarItems = [
  { label: "Workspace", href: "/workspace", icon: <Layers />, active: true },
  { label: "Conversations", href: "/workspace", icon: <MessageSquare /> },
  { label: "Documents", href: "/workspace", icon: <FileText /> },
  { label: "Knowledge sources", href: "/workspace", icon: <BookOpen /> },
  { label: "Models", href: "/dashboard", icon: <Search /> },
  { label: "Settings", href: "/settings", icon: <Settings /> },
];

const messages = [
  {
    role: "assistant",
    title: "AI Assistant",
    content:
      "Enterprise AI Workspace has matched your query with the latest product launch plan, existing requirements, and related compliance docs.",
    time: "Now",
  },
  {
    role: "user",
    title: "You",
    content: "What are the top risks for the new compliance plan?",
    time: "2 min ago",
  },
  {
    role: "assistant",
    title: "GPT-4.1",
    content:
      "The key risks are unclear document versioning, missing ownership for review tasks, and inconsistent access controls across the workspace.",
    time: "4 min ago",
  },
];

const sources = [
  { title: "Compliance report Q4", detail: "Document • 24 pages" },
  { title: "Launch readiness checklist", detail: "Workspace note • 12 items" },
  { title: "Product strategy memo", detail: "FAQ • Updated today" },
];

const models = [
  { value: "gpt", label: "GPT" },
  { value: "claude", label: "Claude" },
  { value: "gemini", label: "Gemini" },
  { value: "local", label: "Local model" },
];

export default function WorkspacePage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="lg:flex">
        <Sidebar title="Workspace" items={sidebarItems} className="lg:min-h-screen" />
        {isMobileNavOpen ? (
          <div className="lg:hidden">
            <Sidebar title="Workspace" items={sidebarItems} mobile className="fixed inset-x-0 top-0 z-40 h-full overflow-auto" />
          </div>
        ) : null}
        <div className="flex-1 lg:min-h-screen lg:border-l lg:border-white/10">
          <Topbar userName="Avery" onToggleMenu={() => setIsMobileNavOpen((current) => !current)} />
          <main className="grid gap-6 px-6 py-6 lg:grid-cols-[0.95fr_0.55fr] lg:px-8 lg:py-8">
            <section className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-sm shadow-slate-950/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">AI workspace</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-100">Collaborate with AI across documents and knowledge.</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                      A dedicated workspace that keeps your conversations, sources, and model controls aligned.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">Create document</Button>
                    <Button>Upload source</Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.95fr_0.5fr]">
                <Card className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Conversation</p>
                      <h2 className="mt-2 text-xl font-semibold text-slate-100">Launch planning review</h2>
                    </div>
                    <Select
                      id="model"
                      label="Model"
                      value={selectedModel}
                      options={models}
                      onChange={(event) => setSelectedModel(event.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    {messages.map((item) => (
                      <div key={item.time} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.role}</p>
                          </div>
                          <span className="text-xs text-slate-500">{item.time}</span>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-300">{item.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
                        aria-label="Attach file"
                      >
                        <Link2 className="h-5 w-5" />
                      </button>
                      <input
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Ask the workspace assistant…"
                        className="flex-1 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        aria-label="Chat input"
                      />
                      <button
                        type="button"
                        className="inline-flex h-12 items-center justify-center rounded-3xl bg-cyan-500 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>

                <Card className="space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Workspace info</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-100">Current session</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                      <p className="text-sm text-slate-400">Active collaborators</p>
                      <p className="mt-3 font-semibold text-slate-100">8 team members currently online</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                      <p className="text-sm text-slate-400">Priority workflow</p>
                      <p className="mt-3 font-semibold text-slate-100">Launch readiness assessment</p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Reference sources</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-100">Selected documents</h2>
                </div>
                <Badge tone="accent">4 sources</Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {sources.map((source) => (
                  <div key={source.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-100">{source.title}</p>
                      <Badge tone="neutral">Source</Badge>
                    </div>
                    <p className="mt-3 text-sm text-slate-400">{source.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
