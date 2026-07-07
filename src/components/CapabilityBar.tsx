import { CAPABILITIES, type CapabilityId } from '../lib/brand'

const ICONS: Record<string, string> = {
  photo: 'M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M8 11l2.5 3 3.5-4.5L20 18H8z',
  bulb: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z',
  chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  comment: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-5 4z',
  pen: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  video: 'M23 7l-7 5 7 5zM1 5h15v14H1z',
  calendar: 'M3 4h18v18H3zM3 10h18M8 2v4M16 2v4',
  help: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01',
  tag: 'M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8zM7 7h.01',
  doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h6',
  sparkle: 'M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z',
}

function Icon({ name }: { name: string }) {
  const d = ICONS[name] || ICONS.sparkle
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d.split(' M').map((p, i) => <path key={i} d={i === 0 ? p : 'M' + p} />)}
    </svg>
  )
}

type Props = {
  value: CapabilityId
  onChange: (id: CapabilityId) => void
}

export function CapabilityBar({ value, onChange }: Props) {
  return (
    <div className="border-b border-brand-200 bg-white/70 px-2.5 py-2 sm:px-4">
      <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2">
        {CAPABILITIES.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-600 transition active:scale-95 sm:px-3.5 ${
              value === c.id
                ? 'bg-brand-400 text-white shadow-sm'
                : 'bg-brand-50 text-ink-soft hover:bg-brand-100'
            }`}
            title={c.desc}
          >
            <Icon name={c.icon} />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
