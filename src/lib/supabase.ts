import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
})

export type ChatSession = {
  id: string
  title: string
  created_at: string
  updated_at: string
}

export type ChatMessage = {
  id: string
  session_id: string
  role: 'user' | 'assistant'
  content: string
  capability: string | null
  style: string | null
  created_at: string
}
