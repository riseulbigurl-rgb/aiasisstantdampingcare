import { useEffect, useRef } from 'react'
import type { ChatMessage } from '../lib/supabase'
import { CAPABILITIES, STYLES, type CapabilityId, type StyleId } from '../lib/brand'
import { Welcome } from './Welcome'

type Props = {
  messages: ChatMessage[]
  loading: boolean
  capability: CapabilityId
  style: StyleId
}

export function ChatArea({ messages, loading, capability, style }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  if (messages.length === 0 && !loading) {
    return <Welcome capability={capability} style={style} />
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={endRef} />
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  const cap = message.capability ? CAPABILITIES.find((c) => c.id === message.capability) : null
  const stl = message.style ? STYLES.find((s) => s.id === message.style) : null

  return (
    <div className={`flex gap-2.5 animate-slide-up sm:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-700 sm:h-8 sm:w-8 sm:text-xs ${
        isUser ? 'bg-brand-300 text-white' : 'bg-brand-400 text-white'
      }`}>
        {isUser ? 'You' : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z"/><path d="M5 22h14M7 22v-3a5 5 0 0 1 10 0v3" strokeLinecap="round"/></svg>
        )}
      </div>
      <div className={`group max-w-[80%] sm:max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (cap || stl) && (
          <div className="mb-1 flex gap-1.5">
            {cap && <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-600 text-brand-700">{cap.label}</span>}
            {stl && <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-600 text-brand-700">{stl.label}</span>}
          </div>
        )}
        <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:px-4 sm:py-3 ${
          isUser
            ? 'rounded-tr-sm bg-brand-300 text-ink'
            : 'rounded-tl-sm bg-white text-ink shadow-sm ring-1 ring-brand-200'
        }`}>
          <div className="prose-chat whitespace-pre-wrap">{message.content}</div>
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-400 text-white sm:h-8 sm:w-8">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z"/><path d="M5 22h14M7 22v-3a5 5 0 0 1 10 0v3" strokeLinecap="round"/></svg>
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm ring-1 ring-brand-200 sm:px-4 sm:py-3.5">
        <span className="h-2 w-2 rounded-full bg-brand-300 animate-pulse-soft" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse-soft" style={{ animationDelay: '200ms' }} />
        <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse-soft" style={{ animationDelay: '400ms' }} />
      </div>
    </div>
  )
}
