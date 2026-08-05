import { useState } from "react";
import { Briefcase, FileText, Layers, Search, Settings, ShieldCheck, Users } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const sidebarItems = [
  { label: "Overview", href: "/dashboard", icon: <Briefcase />, active: true },
  { label: "Workspace", href: "/workspace", icon: <Layers /> },
  { label: "Documents", href: "/dashboard", icon: <FileText /> },
  { label: "Knowledge", href: "/dashboard", icon: <Search /> },
  { label: "AI Assistant", href: "/workspace", icon: <Users /> },
  { label: "Team", href: "/dashboard", icon: <ShieldCheck /> },
  { label: "Settings", href: "/settings", icon: <Settings /> },
];

const stats = [
  { label: "Workspaces", value: "12", delta: "+18%", description: "Active this month" },
  { label: "Documents", value: "3.2K", delta: "+24%", description: "Indexed in the system" },
  { label: "Knowledge items", value: "1.4K", delta: "+12%", description: "Search-ready assets" },
  { label: "AI requests", value: "4.8K", delta: "+32%", description: "Assisted answers generated" },
];

const recentDocuments = [
  { title: "Q3 product strategy", type: "Deck", updated: "2 hours ago" },
  { title: "Sales playbook", type: "Doc", updated: "Yesterday" },
  { title: "Compliance review", type: "Report", updated: "3 days ago" },
];

const activity = [
  { title: "AI summary generated for client brief", time: "10m ago" },
  { title: "New knowledge source synced", time: "1h ago" },
  { title: "Workspace access updated for design team", time: "Yesterday" },
];

export default function DashboardPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
          <main className="space-y-8 px-6 py-6 lg:px-8 lg:py-8">
            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-sm shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Overview</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-100">Enterprise workspace dashboard</h1>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Monitor document health, AI usage, and team activity from one central command center.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button variant="secondary">Review governance</Button>
                    <Button>Create a workspace</Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                  ))}
                </div>
              </div>

              <Card className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI Usage</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-100">78% adoption</p>
                  </div>
                  <Badge tone="accent">Healthy</Badge>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-slate-950/80 p-4">
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                      <span>Model comparisons</span>
                      <span>4 providers</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-3/4 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-950/80 p-4">
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                      <span>Search coverage</span>
                      <span>92%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-11/12 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recent documents</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-100">Latest indexed content</h2>
                  </div>
                  <Button variant="secondary">View all documents</Button>
                </div>

                <div className="mt-6 space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-100">{doc.title}</p>
                          <p className="mt-1 text-sm text-slate-400">{doc.type}</p>
                        </div>
                        <span className="text-sm text-slate-500">{doc.updated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recent activity</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-100">Team updates</h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {activity.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                      <p className="font-medium text-slate-100">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-400">{item.time}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
              <Card>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Quick actions</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-100">Keep your workspace moving</h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Upload document",
                    "Ask AI",
                    "Create workspace",
                    "Search knowledge",
                  ].map((action) => (
                    <button key={action} className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-left text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-slate-900/90">
                      {action}
                    </button>
                  ))}
                </div>
              </Card>
              <Card>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Governance snapshot</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-100">Secure workspace status</h2>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-slate-400">Workspace isolation enabled</p>
                        <Badge tone="success">Active</Badge>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-slate-400">Audit logging configured</p>
                        <Badge tone="accent">Ready</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
