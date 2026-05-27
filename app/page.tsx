import getBoleroDelDia from "@/lib/getBoleroDelDia"
import { subtexts } from "@/data/boleros"

// Force dynamic regeneration (do not cache)
export const dynamic = 'force-dynamic'

export default function Home() {
  const bolero = getBoleroDelDia()

  // Use Mexico City time for everything
  const mexicoNow = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }))
  
  const today = mexicoNow.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  // compute day-of-year to pick a rotating subtext
  const start = new Date(mexicoNow.getFullYear(), 0, 0)
  const diff = mexicoNow.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  const subtext = subtexts[dayOfYear % subtexts.length]

  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Floating hearts */}
      <div className="floating-heart" style={{ left: '10%', animationDelay: '0s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#e8a0a0">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="floating-heart" style={{ left: '30%', animationDelay: '2s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#e8a0a0">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="floating-heart" style={{ left: '70%', animationDelay: '4s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#e8a0a0">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="floating-heart" style={{ left: '85%', animationDelay: '6s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#e8a0a0">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      
      {/* Floating musical notes */}
      <span className="floating-note text-romantic-gold" style={{ left: '20%', animationDelay: '1s' }}>♪</span>
      <span className="floating-note text-romantic-gold" style={{ left: '50%', animationDelay: '3s' }}>♫</span>
      <span className="floating-note text-romantic-gold" style={{ left: '80%', animationDelay: '5s' }}>♪</span>

      <div className="paper fade-up max-w-md w-full px-10 py-12 text-center space-y-7 relative z-10">


        {/* Intimate header */}
        <p className="text-whisper tracking-[0.3em] uppercase">
          Para ti, mi vida
        </p>

        {/* Date */}
        <p className="text-soft capitalize">
          {today}
        </p>

        {/* Decorative top detail */}
        <div className="flex justify-center gap-2">
          <span className="text-romantic-pink">✦</span>
          <span className="w-1 h-1 rounded-full bg-romantic-pink" />
          <span className="text-romantic-pink">✦</span>
        </div>

        {/* Title */}
        <h1 className="text-[2.7rem] leading-tight font-[var(--font-playfair)] text-gray-900">
          {bolero.title}
        </h1>

        {/* Artist */}
        <p className="italic text-soft tracking-wide">
          {bolero.artist}
        </p>

        {/* Elegant separator */}
        <div className="flex justify-center py-4 items-center gap-3">
          <span className="text-romantic-gold text-sm">♫</span>
          <span className="block w-16 h-[1px] bg-gradient-to-r from-transparent via-romantic-pink to-transparent" />
          <span className="text-romantic-gold text-sm">♫</span>
        </div>

        {/* Romantic note */}
        <p className="text-gray-700 text-[1.1rem] leading-relaxed px-2">
          “{bolero.note}”
        </p>

        {/* Subtext (rotates daily) */}
        <p className="text-sm text-soft italic">{subtext}</p>


        {/* Bottom detail */}
        <div className="pt-8 flex justify-center gap-2 opacity-60">
          <span className="text-romantic-pink">✿</span>
          <span className="w-1 h-1 rounded-full bg-romantic-pink" />
          <span className="text-romantic-pink">✿</span>
        </div>

        {/* Emotional closing */}
        <p className="text-whisper mt-6">
          Te llevo en la melodía de cada día.<br />
          Hoy, mañana y siempre.
        </p>
      </div>
    </main>
  )
}
