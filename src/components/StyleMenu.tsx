import { useState, useRef, useEffect } from 'react'
import { STYLES, type StyleId } from '../lib/brand'

type Props = {
  value: StyleId
  onChange: (s: StyleId) => void
}

export function StyleMenu({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = STYLES.find((s) => s.id === value)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-2.5 py-1.5 text-xs font-600 text-ink transition hover:bg-brand-50 sm:px-3"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round"/></svg>
        <span className="hidden sm:inline">Gaya:</span>
        <span>{current?.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition ${open ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-brand-100 bg-white py-1 shadow-lg animate-fade-in">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => { onChange(s.id); setOpen(false) }}
              className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition ${
                value === s.id ? 'bg-brand-50 font-600 text-ink' : 'text-ink-soft hover:bg-brand-50/60'
              }`}
            >
              {s.label}
              {value === s.id && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
