import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (event) =>
    setForm({ ...form, [field]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email || !form.password)
      return setError("Name, email, and password are required.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match.");

    try {
      setLoading(true);
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-5">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
        <div className="mb-7">
          <p className="text-sm font-semibold text-indigo-600">PROJECTHUB</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Start organizing your projects and tasks.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {error && <Alert>{error}</Alert>}

          <Input
            label="Full name"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
          />
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={form.password}
            onChange={update("password")}
          />
          <Input
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
          />

          <Button type="submit" loading={loading} className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}