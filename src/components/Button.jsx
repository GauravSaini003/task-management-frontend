export default function Button({ children, className = '', loading = false, type = 'button', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100 focus:ring-rose-400',
  }
  return <button type={type} disabled={loading || props.disabled} className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`} {...props}>{loading ? 'Please wait…' : children}</button>
}
