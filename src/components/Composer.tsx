import { useState, useRef, useEffect } from 'react'

type Props = {
  onSend: (text: string) => void
  disabled: boolean
}

export function Composer({ onSend, disabled }: Props) {
  const [text, setText] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }, [text])

  function submit() {
    const t = text.trim()
    if (!t || disabled) return
    onSend(t)
    setText('')
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="border-t border-brand-200 bg-white/90 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:py-3">
      <div className="mx-auto flex max-w-3xl items-end gap-2 sm:gap-2.5">
        <div className="flex-1 rounded-2xl border border-brand-200 bg-white px-3 py-2 transition focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 sm:px-4 sm:py-2.5">
          <textarea
            ref={ref}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Ketik permintaan untuk AI Assistant…"
            className="w-full resize-none bg-transparent text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none"
          />
        </div>
        <button
          onClick={submit}
          disabled={disabled || !text.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-400 text-white shadow-sm transition hover:bg-brand-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
          aria-label="Kirim"
        >
          {disabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.2-8.6" strokeLinecap="round"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </button>
      </div>
      <p className="mx-auto mt-1.5 max-w-3xl text-center text-[10px] text-ink-soft sm:mt-2 sm:text-[11px]">
        AI Assistant tidak memberikan diagnosis medis. Tekan Enter untuk kirim, Shift+Enter untuk baris baru.
      </p>
    </div>
  )
}
