import { boleros } from "@/data/boleros"
import fs from "fs"
import path from "path"

type State = {
  used: number[]
  lastDate: string
  currentIndex?: number
}

const STATE_FILE = path.join(process.cwd(), ".bolero-state.json")

function readState(): State {
  try {
    const raw = fs.readFileSync(STATE_FILE, "utf-8")
    return JSON.parse(raw) as State
  } catch (e) {
    return { used: [], lastDate: "" }
  }
}

function writeState(state: State) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8")
  } catch (e) {
    // ignore write errors — fallback will still return a bolero
  }
}

export default function getBoleroDelDia() {
  const now = new Date()
  const today = now.toISOString().slice(0, 10) // YYYY-MM-DD

  try {
    const state = readState()

    // If we already picked for today, return same
    if (state.lastDate === today && typeof state.currentIndex === "number") {
      return boleros[state.currentIndex % boleros.length]
    }

    // Build list of remaining indices
    const all = boleros.map((_, i) => i)
    const usedSet = new Set(state.used)
    let remaining = all.filter((i) => !usedSet.has(i))

    // If none remaining, reset used
    if (remaining.length === 0) {
      state.used = []
      remaining = all
    }

    // Pick next index (random from remaining)
    const pick = remaining[Math.floor(Math.random() * remaining.length)]

    // Update state
    state.used.push(pick)
    state.lastDate = today
    state.currentIndex = pick
    writeState(state)

    return boleros[pick]
  } catch (e) {
    // Fallback deterministic behavior if fs fails
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)
    return boleros[dayOfYear % boleros.length]
  }
}
