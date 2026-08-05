import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

type FormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization: string;
  agree: boolean;
};

type ValidationErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  organization?: string;
  agree?: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const passwordStrength = useMemo(() => {
    const score = [form.password.length >= 8, /[A-Z]/.test(form.password), /[0-9]/.test(form.password), /[^A-Za-z0-9]/.test(form.password)].filter(Boolean).length;
    if (score <= 1) return { label: "Weak", color: "text-rose-300" };
    if (score === 2) return { label: "Fair", color: "text-amber-300" };
    if (score === 3) return { label: "Strong", color: "text-cyan-300" };
    return { label: "Very strong", color: "text-emerald-300" };
  }, [form.password]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ValidationErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Enter your full name.";
    if (!form.organization.trim()) nextErrors.organization = "Enter your organization name.";
    if (!form.email) nextErrors.email = "Enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    if (!form.agree) nextErrors.agree = "You must agree to the terms.";

    setErrors(nextErrors);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16 lg:px-8">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 sm:p-12 lg:grid-cols-[0.9fr_0.7fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Create your workspace</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-100">Set up your team’s AI knowledge hub.</h1>
              <p className="mt-4 max-w-xl text-slate-400 leading-7">
                Start with a secure workspace that keeps documents, AI search, and collaboration aligned across your organization.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/90 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Why this matters</p>
              <ul className="space-y-3 text-slate-400">
                <li>Securely manage knowledge across documents and AI tools.</li>
                <li>Onboard teams faster with a shared workspace.</li>
                <li>Keep governance and collaboration in one place.</li>
              </ul>
            </div>
          </div>

          <div>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="fullName"
                  label="Full name"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Avery Morgan"
                  error={errors.fullName}
                />
                <Input
                  id="organization"
                  label="Organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Example Inc."
                  error={errors.organization}
                />
              </div>
              <Input
                id="email"
                label="Work email"
                value={form.email}
                onChange={handleChange}
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                error={errors.email}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <Input
                    id="password"
                    label="Password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    error={errors.password}
                  />
                  <button
                    type="button"
                    className="text-sm text-cyan-300 transition hover:text-cyan-200"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? "Hide password" : "Show password"}
                  </button>
                  <p className={`text-sm ${passwordStrength.color}`}>Strength: {passwordStrength.label}</p>
                </div>
                <Input
                  id="confirmPassword"
                  label="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  error={errors.confirmPassword}
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-white/10 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                />
                <label htmlFor="agree" className="text-sm text-slate-200">
                  I agree to the <span className="font-semibold text-slate-100">terms of service</span> and <span className="font-semibold text-slate-100">privacy policy</span>.
                </label>
              </div>
              {errors.agree ? <p className="text-sm text-rose-300">{errors.agree}</p> : null}
              <Button type="submit" className="w-full">Create workspace</Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-cyan-300 transition hover:text-cyan-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
