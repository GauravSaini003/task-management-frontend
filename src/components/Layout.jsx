import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-lg font-bold text-indigo-600">ProjectHub</p>
            <p className="text-xs text-slate-500">Internal project workspace</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-600 sm:block">
              {user?.name || user?.email}
            </span>
            <Button variant="secondary" className="px-3 py-2" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}