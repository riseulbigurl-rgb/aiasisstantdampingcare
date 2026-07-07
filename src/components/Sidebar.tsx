import type { ChatSession } from '../lib/supabase'

type Props = {
  sessions: ChatSession[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
  open: boolean
  onClose: () => void
}

export function Sidebar({ sessions, activeId, onSelect, onNew, onDelete, open, onClose }: Props) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] max-w-[85vw] flex-col border-r border-brand-200 bg-white transition-transform duration-300 lg:static lg:w-72 lg:translate-x-0 lg:max-w-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="font-display text-sm font-700 text-ink">Riwayat Sesi</span>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-50 lg:hidden">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="px-3">
          <button
            onClick={onNew}
            className="flex w-full items-center gap-2 rounded-xl bg-brand-400 px-4 py-2.5 text-sm font-600 text-white shadow-sm transition hover:bg-brand-500 active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>
            Sesi Baru
          </button>
        </div>
        <div className="mt-3 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {sessions.length === 0 && (
            <p className="px-2 py-8 text-center text-xs text-ink-soft">Belum ada sesi. Mulai percakapan baru.</p>
          )}
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition cursor-pointer ${
                activeId === s.id ? 'bg-brand-50 text-ink' : 'text-ink-soft hover:bg-brand-50/60'
              }`}
              onClick={() => onSelect(s.id)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-50"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="flex-1 truncate font-500">{s.title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(s.id) }}
                className="rounded p-1 text-brand-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                aria-label="Hapus sesi"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" strokeLinecap="round"/></svg>
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-brand-200 px-4 py-3">
          <p className="text-[11px] leading-relaxed text-ink-soft">
            AI Assistant Dampingcare. Bukan tenaga medis. Tidak memberikan diagnosis atau pengobatan.
          </p>
        </div>
      </aside>
    </>
  )
}
