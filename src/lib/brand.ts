export const BRAND = {
  name: 'Dampingcare',
  description:
    'Dampingcare merupakan penyedia layanan pendampingan non-medis yang membantu masyarakat dalam berbagai kebutuhan pendampingan sehari-hari.',
  areas: [
    'Surakarta (Solo)',
    'Sukoharjo',
    'Karanganyar',
    'Boyolali',
    'Sragen',
    'Klaten',
    'Daerah Istimewa Yogyakarta',
  ],
  services: [
    'Pendampingan pasien rawat inap',
    'Pendampingan pasien rawat jalan',
    'Pendamping Medical Check Up (MCU)',
    'Pendamping lansia',
    'Pendamping ibu hamil',
    'Pendamping anak',
    'Antar jemput pasien',
    'Personal assistant',
    'Pendamping aktivitas',
    'Solo Trip Companion',
    'Errand service (belanja, ambil obat, administrasi, dll.)',
    'Jastip',
    'Homecare non-medis',
  ],
  voice: [
    'Ramah',
    'Profesional',
    'Empati',
    'Mudah dipahami',
    'Tidak berlebihan',
    'Tidak menggurui',
    'Memberikan rasa tenang',
    'Fokus pada membantu kebutuhan pelanggan',
  ],
}

export const CAPABILITIES = [
  { id: 'caption', label: 'Caption Generator', icon: 'photo', desc: 'Caption untuk Instagram, TikTok, Threads, X, Facebook, WhatsApp, YouTube Shorts.' },
  { id: 'content-ideas', label: 'Ide Konten', icon: 'bulb', desc: '10, 30, atau 100 ide konten lengkap dengan judul, tujuan, platform, hook, CTA, dan visual.' },
  { id: 'chat-reply', label: 'Balas Chat Pelanggan', icon: 'chat', desc: 'Balasan profesional untuk pertanyaan soal harga, jadwal, booking, reschedule, refund, area, pembayaran.' },
  { id: 'comment-reply', label: 'Balas Komentar Sosmed', icon: 'comment', desc: 'Variasi balasan: ramah, profesional, singkat, persuasif, hangat.' },
  { id: 'copywriting', label: 'Copywriting', icon: 'pen', desc: 'Headline, tagline, slogan, deskripsi layanan, bio sosmed, teks promosi, poster, banner, brosur.' },
  { id: 'video-script', label: 'Script Video', icon: 'video', desc: 'Hook, opening, isi, closing, voice over, subtitle.' },
  { id: 'content-calendar', label: 'Kalender Konten', icon: 'calendar', desc: 'Kalender konten 7, 14, 30, atau 90 hari.' },
  { id: 'faq', label: 'FAQ', icon: 'help', desc: 'Menyusun pertanyaan dan jawaban jelas mengenai layanan Dampingcare.' },
  { id: 'promo-ideas', label: 'Ide Promosi', icon: 'tag', desc: 'Ide promosi yang relevan dengan layanan dan target pelanggan.' },
  { id: 'document', label: 'Penyusunan Dokumen', icon: 'doc', desc: 'Pengumuman, SOP sederhana, template pesan, informasi layanan, surat administrasi non-hukum.' },
  { id: 'general', label: 'Tanya Jawab Umum', icon: 'sparkle', desc: 'Pertanyaan umum seputar Dampingcare dan layanan pendampingan.' },
] as const

export const STYLES = [
  { id: 'profesional', label: 'Profesional' },
  { id: 'formal', label: 'Formal' },
  { id: 'semi-formal', label: 'Semi Formal' },
  { id: 'ramah', label: 'Ramah' },
  { id: 'hangat', label: 'Hangat' },
  { id: 'santai', label: 'Santai' },
  { id: 'gen-z', label: 'Gen Z' },
  { id: 'persuasif', label: 'Persuasif' },
  { id: 'informatif', label: 'Informatif' },
] as const

export const PLATFORMS = [
  'Instagram', 'TikTok', 'Threads', 'Twitter (X)', 'Facebook',
  'WhatsApp Channel', 'Status WhatsApp', 'YouTube Shorts',
] as const

export type CapabilityId = typeof CAPABILITIES[number]['id']
export type StyleId = typeof STYLES[number]['id']
