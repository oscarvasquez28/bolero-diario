import { boleros } from "@/data/boleros"

// Get current date in Mexico timezone
function getMexicoDate() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }))
}

// Calculate day of year for a given date
function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export default function getBoleroDelDia() {
  const mexicoNow = getMexicoDate()
  const dayOfYear = getDayOfYear(mexicoNow)
  
  // Offset: launch day (Jan 26 = day 26)
  // So day 26 = index 0, day 27 = index 1, etc.
  const launchDay = 26
  const index = (dayOfYear - launchDay + boleros.length) % boleros.length
  
  return boleros[index]
}
