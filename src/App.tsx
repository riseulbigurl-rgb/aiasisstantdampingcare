import { useEffect, useState } from 'react'
import { supabase, type ChatSession, type ChatMessage } from './lib/supabase'
import { generateAIResponse, type AIMessage } from './lib/ai'
import { CAPABILITIES, STYLES, type CapabilityId, type StyleId } from './lib/brand'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { Composer } from './components/Composer'
import { CapabilityBar } from './components/CapabilityBar'
import { StyleMenu } from './components/StyleMenu'

export default function App() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [capability, setCapability] = useState<CapabilityId>('general')
  const [style, setStyle] = useState<StyleId>('ramah')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => { loadSessions() }, [])

  async function loadSessions() {
    const { data } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false })
    if (data) setSessions(data as ChatSession[])
  }

  useEffect(() => {
    if (activeId) loadMessages(activeId)
    else setMessages([])
  }, [activeId])

  async function loadMessages(sid: string) {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sid)
      .order('created_at', { ascending: true })
    if (data) setMessages(data as ChatMessage[])
  }

  async function newSession(): Promise<string> {
    const { data } = await supabase
      .from('chat_sessions')
      .insert({ title: 'Sesi Baru' })
      .select()
      .single()
    if (data) {
      const s = data as ChatSession
      setSessions((p) => [s, ...p])
      setActiveId(s.id)
      return s.id
    }
    throw new Error('Gagal membuat sesi baru.')
  }

  async function handleSend(text: string) {
    if (!text.trim() || loading) return
    let sid = activeId
    if (!sid) sid = await newSession()

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(), session_id: sid, role: 'user',
      content: text, capability, style, created_at: new Date().toISOString(),
    }
    setMessages((p) => [...p, userMsg])
    setLoading(true)

    try {
      const history: AIMessage[] = [...messages, { role: 'user' as const, content: text }]
        .filter((m) => m.content.trim())
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

      const reply = await generateAIResponse(history, capability, style)

      const { data: saved } = await supabase
        .from('chat_messages')
        .insert([
          { session_id: sid, role: 'user', content: text, capability, style },
          { session_id: sid, role: 'assistant', content: reply, capability, style },
        ])
        .select()

      if (saved) {
        setMessages((p) => {
          const withoutTemp = p.filter((m) => m.id !== userMsg.id)
          return [...withoutTemp, ...(saved as ChatMessage[])]
        })
        if (messages.length === 0) {
          const title = text.slice(0, 40) + (text.length > 40 ? '…' : '')
          await supabase.from('chat_sessions').update({ title }).eq('id', sid)
        }
        loadSessions()
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Terjadi kesalahan.'
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(), session_id: sid, role: 'assistant',
        content: `Maaf, terjadi kendala: ${errMsg}`, capability, style,
        created_at: new Date().toISOString(),
      }
      setMessages((p) => [...p, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  async function deleteSession(sid: string) {
    await supabase.from('chat_sessions').delete().eq('id', sid)
    setSessions((p) => p.filter((s) => s.id !== sid))
    if (activeId === sid) { setActiveId(null); setMessages([]) }
  }

  function startNew() {
    setActiveId(null)
    setMessages([])
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-brand-50">
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        onSelect={(id) => { setActiveId(id); setSidebarOpen(false) }}
        onNew={startNew}
        onDelete={deleteSession}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex items-center gap-2 border-b border-brand-200 bg-white/90 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:gap-3 sm:py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-ink hover:bg-brand-50 lg:hidden"
            aria-label="Buka menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round"/></svg>
          </button>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-400 text-white shadow-sm sm:h-9 sm:w-9">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z"/><path d="M5 22h14M7 22v-3a5 5 0 0 1 10 0v3" strokeLinecap="round"/></svg>
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-sm font-700 leading-tight text-ink sm:text-base">Dampingcare AI</h1>
              <p className="hidden text-xs text-ink-soft sm:block">Asisten virtual untuk konten & komunikasi</p>
            </div>
          </div>
          <div className="ml-auto">
            <StyleMenu value={style} onChange={setStyle} />
          </div>
        </header>

        <CapabilityBar value={capability} onChange={setCapability} />

        <ChatArea messages={messages} loading={loading} capability={capability} style={style} />

        <Composer onSend={handleSend} disabled={loading} />
      </div>
    </div>
  )
}
