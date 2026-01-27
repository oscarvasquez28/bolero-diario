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
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="paper fade-up max-w-md w-full px-10 py-12 text-center space-y-7">

        {/* Intimate header */}
        <p className="text-whisper tracking-[0.3em] uppercase">
          Para ti, mi vida
        </p>

        {/* Date */}
        <p className="text-soft capitalize">
          {today}
        </p>

        {/* Decorative top detail */}
        <div className="flex justify-center">
          <span className="w-1 h-1 rounded-full bg-gray-300" />
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
        <div className="flex justify-center py-4">
          <span className="block w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        {/* Romantic note */}
        <p className="text-gray-700 text-[1.1rem] leading-relaxed px-2">
          “{bolero.note}”
        </p>

        {/* Subtext (rotates daily) */}
        <p className="text-sm text-soft italic">{subtext}</p>


        {/* Bottom detail */}
        <div className="pt-8 flex justify-center gap-2 opacity-60">
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="w-1 h-1 rounded-full bg-gray-300" />
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
