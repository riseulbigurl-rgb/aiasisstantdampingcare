import { buildSystemPrompt } from './systemPrompt'
import type { CapabilityId, StyleId } from './brand'

export type AIMessage = { role: 'user' | 'assistant'; content: string }

export async function generateAIResponse(
  messages: AIMessage[],
  capability: CapabilityId,
  style: StyleId,
): Promise<string> {
  const system = buildSystemPrompt(capability, style)
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system, messages, max_tokens: 2048 }),
  })
  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`AI gagal merespons (${res.status}). ${errText.slice(0, 200)}`)
  }
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  const text = data.content?.[0]?.text
  if (!text) throw new Error('Respon AI kosong.')
  return text
}
