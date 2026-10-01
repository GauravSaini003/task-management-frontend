export default function Button({
  children,
  className = "",
  loading = false,
  type = "button",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary:
      "border border-indigo-500 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-[0_10px_24px_-12px_rgba(79,70,229,0.9)] hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-12px_rgba(79,70,229,0.95)] focus:ring-indigo-500",
    secondary:
      "border border-slate-200 bg-white/85 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md focus:ring-indigo-400",
    danger:
      "border border-rose-100 bg-rose-50 text-rose-700 shadow-sm hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-100 hover:shadow-md focus:ring-rose-400",
  };

  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}