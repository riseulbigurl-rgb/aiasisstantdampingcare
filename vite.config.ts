import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL || 'http://localhost:9091/proxy/anthropic'
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''
const ANTHROPIC_MODEL = process.env.ANTHROPIC_SMALL_FAST_MODEL || 'claude-haiku-4-5-20251001'
const ANTHROPIC_HEADERS = process.env.ANTHROPIC_CUSTOM_HEADERS || ''

const aiProxyPlugin = {
  name: 'ai-proxy',
  configureServer(server) {
    server.middlewares.use('/api/ai', async (req, res) => {
      if (req.method === 'OPTIONS') {
        res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' })
        return res.end()
      }
      if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'Method not allowed' }))
      }
      try {
        const chunks = []
        for await (const c of req) chunks.push(c)
        const body = JSON.parse(Buffer.concat(chunks).toString())
        const headers = {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        }
        if (ANTHROPIC_HEADERS) {
          ANTHROPIC_HEADERS.split(',').forEach((h) => {
            const [k, v] = h.split(':').map((s) => s.trim())
            if (k && v) headers[k] = v
          })
        }
        const upstream = await fetch(`${ANTHROPIC_BASE_URL}/v1/messages`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: ANTHROPIC_MODEL,
            max_tokens: body.max_tokens ?? 2048,
            system: body.system,
            messages: body.messages,
          }),
        })
        const text = await upstream.text()
        res.writeHead(upstream.status, { 'Content-Type': 'application/json' })
        res.end(text)
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
      }
    })
  },
}

export default defineConfig({
  plugins: [react(), aiProxyPlugin],
  server: { host: true, port: 5173 },
})
