import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

type ValidationErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<FormState>({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

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

    if (!form.email) {
      nextErrors.email = "Enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Enter your password.";
    }

    setErrors(nextErrors);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/30 sm:p-12">
          <div className="mb-10 flex flex-col gap-2 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Enterprise AI Workspace</p>
            <h1 className="text-4xl font-semibold text-slate-100">Sign in to your workspace</h1>
            <p className="mx-auto max-w-2xl text-sm text-slate-400">
              Access your documents, AI assistant, and team knowledge from one secure workspace.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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

            <div className="space-y-3">
              <Input
                id="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                error={errors.password}
              />
              <button
                type="button"
                className="text-sm text-cyan-300 transition hover:text-cyan-200"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-white/10 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-slate-400 transition hover:text-cyan-300">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full">Sign in</Button>
          </form>

          <div className="my-8 flex items-center gap-3 text-sm text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            <span>or continue with</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google logo" className="h-4 w-4" />
            Continue with Google
          </button>

          <div className="mt-8 text-center text-sm text-slate-400">
            <span>New to the platform? </span>
            <Link to="/register" className="font-medium text-cyan-300 transition hover:text-cyan-200">
              Create an account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
