import { useState } from "react";
import { Moon, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Toggle from "../../components/ui/Toggle";

const tabs = [
  "Profile",
  "Workspace",
  "Appearance",
  "Notifications",
  "Security",
  "AI Preferences",
  "Integrations",
] as const;

type Tab = (typeof tabs)[number];

const appearanceOptions = [
  { value: "auto", label: "System default" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const aiOptions = [
  { value: "smart", label: "Smart default" },
  { value: "balanced", label: "Balanced" },
  { value: "fast", label: "Priority speed" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const [appearance, setAppearance] = useState("auto");
  const [aiPreference, setAiPreference] = useState("smart");
  const [receiveAlerts, setReceiveAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [allowNotifications, setAllowNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[0.3fr_1fr] lg:px-8">
        <aside className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Settings</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-100">Workspace controls</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Manage profile, workspace behavior, appearance, notifications, security, and AI preferences.
          </p>
          <div className="mt-8 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-3xl px-4 py-3 text-left text-sm transition ${activeTab === tab ? "bg-cyan-500/10 text-cyan-300" : "text-slate-300 hover:bg-white/5"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-sm shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{activeTab}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100">Configure your experience</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Adjust settings to fit your team’s workflow and governance needs.
            </p>
          </div>

          {activeTab === "Profile" ? (
            <Card className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input id="profileName" label="Full name" value="Avery Morgan" onChange={() => {}} />
                <Input id="profileEmail" label="Work email" value="avery@enterpriseai.com" onChange={() => {}} />
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <Input id="profileTitle" label="Job title" value="AI Program Lead" onChange={() => {}} />
                <Input id="profileTeam" label="Team" value="Product Operations" onChange={() => {}} />
              </div>
              <Button>Save profile</Button>
            </Card>
          ) : null}

          {activeTab === "Workspace" ? (
            <Card className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input id="workspaceName" label="Workspace name" value="Enterprise AI Workspace" onChange={() => {}} />
                <Input id="workspaceDomain" label="Workspace domain" value="enterpriseai.app" onChange={() => {}} />
              </div>
              <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <p className="text-sm text-slate-400">Workspace isolation</p>
                <p className="text-sm leading-6 text-slate-300">
                  Configure which teams can access this workspace and enforce document-level restrictions.
                </p>
              </div>
              <Button>Save workspace settings</Button>
            </Card>
          ) : null}

          {activeTab === "Appearance" ? (
            <Card className="space-y-6">
              <Select id="appearance" label="Theme" value={appearance} options={appearanceOptions} onChange={(event) => setAppearance(event.target.value)} />
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-cyan-300" />
                  <p className="text-sm text-slate-200">Dark mode is available across the workspace and AI chat panels.</p>
                </div>
              </div>
              <Button>Save appearance</Button>
            </Card>
          ) : null}

          {activeTab === "Notifications" ? (
            <Card className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-slate-100">Email alerts</p>
                <Toggle label="Receive alerts" checked={receiveAlerts} onChange={setReceiveAlerts} />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-slate-100">Weekly summary</p>
                <Toggle label="Send summary" checked={weeklySummary} onChange={setWeeklySummary} />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-slate-100">Browser notifications</p>
                <Toggle label="Allow notifications" checked={allowNotifications} onChange={setAllowNotifications} />
              </div>
              <Button>Save notification preferences</Button>
            </Card>
          ) : null}

          {activeTab === "Security" ? (
            <Card className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input id="mfa" label="Multi-factor authentication" value="Enabled" onChange={() => {}} />
                <Input id="sso" label="Single sign-on" value="Configured" onChange={() => {}} />
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-cyan-300" />
                  <p className="text-sm text-slate-200">Your workspace is audit-ready with role-based controls and secure document access.</p>
                </div>
              </div>
              <Button>Review security</Button>
            </Card>
          ) : null}

          {activeTab === "AI Preferences" ? (
            <Card className="space-y-6">
              <Select id="aiPreference" label="AI default mode" value={aiPreference} options={aiOptions} onChange={(event) => setAiPreference(event.target.value)} />
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                  <p className="text-sm text-slate-200">Choose how AI responses balance speed, depth, and context.</p>
                </div>
              </div>
              <Button>Save AI settings</Button>
            </Card>
          ) : null}

          {activeTab === "Integrations" ? (
            <Card className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-cyan-300" />
                    <div>
                      <p className="font-semibold text-slate-100">AI providers</p>
                      <p className="text-sm text-slate-400">Manage connected model providers and API keys.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-cyan-300" />
                    <div>
                      <p className="font-semibold text-slate-100">Collaboration tools</p>
                      <p className="text-sm text-slate-400">Connect docs, chat platforms, and workflow systems.</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button>Browse integrations</Button>
            </Card>
          ) : null}
        </section>
      </main>
    </div>
  );
}
