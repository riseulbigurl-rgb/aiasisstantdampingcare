import { CAPABILITIES, STYLES, type CapabilityId, type StyleId } from '../lib/brand'

type Props = {
  capability: CapabilityId
  style: StyleId
}

const SUGGESTIONS: Record<CapabilityId, string[]> = {
  caption: [
    'Buat caption Instagram untuk layanan pendampingan lansia di Solo',
    'Caption TikTok untuk promo antar jemput pasien',
    'Caption Threads tentang pentingnya pendamping saat MCU',
  ],
  'content-ideas': [
    'Berikan 10 ide konten edukasi tentang homecare non-medis',
    '30 ide konten untuk Instagram seputar pendampingan ibu hamil',
    '10 ide konten storytelling pasien rawat inap',
  ],
  'chat-reply': [
    'Pelanggan tanya harga pendampingan rawat jalan, balas ramah',
    'Pelanggan mau reschedule booking, balas profesional',
    'Pelanggan tanya apakah layanan jangkau Klaten, balas hangat',
  ],
  'comment-reply': [
    'Komentar: "Layanan ini aman nggak ya?" — buat 5 variasi balasan',
    'Komentar: "Area Jogja bisa?" — buat balasan singkat dan persuasif',
  ],
  copywriting: [
    'Buat tagline untuk Dampingcare',
    'Bio Instagram untuk akun Dampingcare',
    'Teks promosi untuk layanan Solo Trip Companion',
  ],
  'video-script': [
    'Script video 30 detik untuk TikTok tentang pendamping ibu hamil',
    'Script YouTube Shorts tentang errand service Dampingcare',
  ],
  'content-calendar': [
    'Buat kalender konten 7 hari untuk Instagram',
    'Kalender konten 14 hari lintas platform',
  ],
  faq: [
    'Susun FAQ tentang area layanan Dampingcare',
    'FAQ tentang cara booking dan reschedule',
  ],
  'promo-ideas': [
    'Ide promo untuk bulan Ramadhan',
    'Ide promo bundling pendampingan lansia + antar jemput',
  ],
  document: [
    'Buat SOP sederhana untuk pendampingan pasien rawat jalan',
    'Template pesan konfirmasi booking untuk pelanggan',
  ],
  general: [
    'Apa saja layanan Dampingcare?',
    'Area mana saja yang dilayani Dampingcare?',
    'Jelaskan apa itu Solo Trip Companion',
  ],
}

export function Welcome({ capability, style }: Props) {
  const cap = CAPABILITIES.find((c) => c.id === capability)
  const stl = STYLES.find((s) => s.id === style)
  const suggestions = SUGGESTIONS[capability] || []

  return (
    <div className="flex-1 overflow-y-auto px-3 py-6 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center animate-slide-up sm:mb-8">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-400 text-white shadow-lg shadow-brand-400/20 sm:h-16 sm:w-16 sm:mb-4">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z"/><path d="M5 22h14M7 22v-3a5 5 0 0 1 10 0v3" strokeLinecap="round"/></svg>
          </div>
          <h2 className="font-display text-xl font-700 text-ink sm:text-2xl">Halo, saya AI Assistant Dampingcare</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Saya siap membantu membuat konten, membalas pelanggan, menyusun dokumen, dan lainnya.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs">
            <span className="rounded-full bg-brand-50 px-3 py-1 font-600 text-brand-700">{cap?.label}</span>
            <span className="rounded-full bg-brand-50 px-3 py-1 font-600 text-brand-700">Gaya {stl?.label}</span>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="animate-slide-up rounded-xl border border-brand-200 bg-white p-3.5 text-sm text-ink shadow-sm transition hover:border-brand-300 hover:shadow-md sm:p-4"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="leading-relaxed">{s}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-ink-soft sm:mt-6">
          Pilih kemampuan di atas, atur gaya bahasa, lalu ketik permintaan Anda di bawah.
        </p>
      </div>
    </div>
  )
}
