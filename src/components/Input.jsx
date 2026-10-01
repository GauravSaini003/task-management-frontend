import { useState } from 'react'

function EyeIcon({ hidden }) {
  return hidden ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5"><path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9.3 5.1 10 8-0.3 1.2-1.1 2.6-2.3 3.8M6.6 6.6C4.5 8.1 3.2 10.4 2 12c0.9 3.3 4.5 8 10 8 1.2 0 2.3-0.2 3.3-0.6" /></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5"><path d="M2 12s3.6-8 10-8 10 8 10 8-3.6 8-10 8S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
}

export default function Input({ label, error, className = '', type = 'text', ...props }) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  return <label className="block text-sm font-medium text-slate-700">{label}<span className="relative mt-1.5 block"><input type={isPassword && visible ? 'text' : type} className={`block w-full rounded-lg border px-3 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${isPassword ? 'pr-11' : ''} ${error ? 'border-rose-400' : 'border-slate-300'} ${className}`} {...props} />{isPassword && <button type="button" onClick={() => setVisible((current) => !current)} className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-indigo-600 focus:outline-none focus:text-indigo-600" aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}><EyeIcon hidden={visible} /></button>}</span>{error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}</label>
}
