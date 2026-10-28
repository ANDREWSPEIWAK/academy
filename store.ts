import { useSyncExternalStore } from 'react'
import { badges as allBadges, questPool, rankFor, type QuestTemplate } from './data/gamification'
import { engine, mergeRemote } from './lib/sync'

export interface QuestState {
  id: string
  title: string
  target: number
  xp: number
  metric: QuestTemplate['metric']
  progress: number
  done: boolean
}

export interface AppState {
  xp: number
  known: Record<string, boolean>
  lessonsRead: Record<string, boolean>
  modulesDone: Record<string, boolean>
  quizBest: number
  blitzBest: number
  examKnown: Record<string, boolean>
  casesScore: Record<string, number>
  checklistsDone: Record<string, string[]> // checklistId -> date strings
  rushBest: number
  streak: { count: number; last: string }
  days: string[]
  earnedBadges: string[]
  quests: { date: string; items: QuestState[] }
  toasts: string[]
}

const KEY = 'barista-os-v1'

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function freshQuests(date: string): QuestState[] {
  const pool = [...questPool]
  // deterministic-ish pick of 3 based on date
  const seed = date.split('-').reduce((a, b) => a + Number(b), 0)
  const picked: QuestState[] = []
  let i = seed % pool.length
  while (picked.length < 3 && pool.length > 0) {
    const q = pool.splice(i % pool.length, 1)[0]
    picked.push({ ...q, progress: 0, done: false })
    i += 2
  }
  return picked
}

const initial: AppState = {
  xp: 0,
  known: {},
  lessonsRead: {},
  modulesDone: {},
  quizBest: 0,
  blitzBest: 0,
  examKnown: {},
  casesScore: {},
  checklistsDone: {},
  rushBest: 0,
  streak: { count: 0, last: '' },
  days: [],
  earnedBadges: [],
  quests: { date: '', items: [] },
  toasts: [],
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initial, ...JSON.parse(raw), toasts: [] }
  } catch {
    /* ignore */
  }
  return { ...initial }
}

let state: AppState = load()
const listeners = new Set<() => void>()

function persist() {
  let snapshot: Record<string, unknown> | null = null
  try {
    const { toasts, ...rest } = state
    localStorage.setItem(KEY, JSON.stringify(rest))
    snapshot = rest
  } catch {
    /* localStorage can be unavailable (private mode) — sync still works */
  }
  if (snapshot) engine.queuePush(snapshot)
}

function setState(patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)) {
  const p = typeof patch === 'function' ? patch(state) : patch
  state = { ...state, ...p }
  persist()
  listeners.forEach((l) => l())
}

export function useStore(): AppState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )
}

function pushToast(msg: string) {
  const id = Date.now() + msg
  setState((s) => ({ toasts: [...s.toasts, `${id}|${msg}`] }))
  setTimeout(() => {
    setState((s) => ({ toasts: s.toasts.filter((t) => !t.startsWith(String(id))) }))
  }, 3400)
}

function touchDay(s: AppState): Pick<AppState, 'streak' | 'days'> {
  const t = today()
  const days = s.days.includes(t) ? s.days : [...s.days, t]
  let count = s.streak.count
  if (s.streak.last !== t) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    count = s.streak.last === yesterday ? count + 1 : 1
  }
  return { streak: { count, last: t }, days }
}

function bumpQuest(metric: QuestTemplate['metric'], amount: number) {
  setState((s) => {
    const t = today()
    let items = s.quests.date === t ? s.quests.items : freshQuests(t)
    items = items.map((q) => {
      if (q.metric !== metric || q.done) return q
      const progress = Math.min(q.target, q.progress + amount)
      return { ...q, progress, done: progress >= q.target }
    })
    return { quests: { date: t, items } }
  })
}

function checkBadges() {
  const s = state
  const newly: string[] = []
  const has = (id: string) => s.earnedBadges.includes(id)
  const knownCount = Object.values(s.known).filter(Boolean).length
  if (!has('first-steps') && s.days.length >= 1) newly.push('first-steps')
  if (!has('ttk-10') && knownCount >= 10) newly.push('ttk-10')
  if (!has('ttk-40') && knownCount >= 40) newly.push('ttk-40')
  if (!has('ttk-all') && knownCount >= 79) newly.push('ttk-all')
  if (!has('quiz-80') && s.quizBest >= 80) newly.push('quiz-80')
  if (!has('blitz-hero') && s.blitzBest >= 8) newly.push('blitz-hero')
  if (!has('streak-3') && s.streak.count >= 3) newly.push('streak-3')
  if (!has('streak-7') && s.streak.count >= 7) newly.push('streak-7')
  if (!has('rush-6') && s.rushBest >= 6) newly.push('rush-6')
  if (!has('shift-open') && (s.checklistsDone['open'] || []).includes(today())) newly.push('shift-open')
  if (!has('clean-station') && (s.checklistsDone['hygiene'] || []).includes(today())) newly.push('clean-station')
  const examIds = Object.keys(s.examKnown).filter((k) => s.examKnown[k])
  if (!has('exam-service') && examIds.filter((id) => ['e1','e2','e3','e4','e5','e6','e7','e8','e9','e10'].includes(id)).length >= 8) newly.push('exam-service')
  if (!has('exam-full') && examIds.length >= 32) newly.push('exam-full')
  if (!has('quest-day') && s.quests.items.length > 0 && s.quests.items.every((q) => q.done)) newly.push('quest-day')
  if (newly.length) {
    setState((prev) => ({ earnedBadges: [...prev.earnedBadges, ...newly] }))
    newly.forEach((id) => {
      const b = allBadges.find((x) => x.id === id)
      if (b) pushToast(`Бейдж: ${b.title}`)
    })
  }
}

export const actions = {
  dayOpened() {
    setState((s) => ({ ...touchDay(s) }))
    const t = today()
    if (state.quests.date !== t) setState({ quests: { date: t, items: freshQuests(t) } })
    checkBadges()
  },
  addXp(amount: number, reason?: string) {
    const before = rankFor(state.xp).current
    setState((s) => ({ xp: s.xp + amount }))
    const after = rankFor(state.xp).current
    if (reason) pushToast(`+${amount} XP · ${reason}`)
    if (after.id !== before.id) pushToast(`Новый ранг: ${after.title}`)
    checkBadges()
  },
  markKnown(id: string, value: boolean) {
    const wasKnown = !!state.known[id]
    setState((s) => ({ known: { ...s.known, [id]: value } }))
    if (value && !wasKnown) {
      bumpQuest('known', 1)
      actions.addXp(6, 'рецепт ТТК')
    }
    checkBadges()
  },
  readLesson(id: string) {
    if (state.lessonsRead[id]) return
    setState((s) => ({ lessonsRead: { ...s.lessonsRead, [id]: true } }))
    bumpQuest('lesson', 1)
    actions.addXp(10, 'методика изучена')
  },
  completeModule(id: string) {
    if (state.modulesDone[id]) return
    setState((s) => ({ modulesDone: { ...s.modulesDone, [id]: true } }))
    actions.addXp(40, 'модуль закрыт')
  },
  recordQuiz(scorePct: number) {
    if (scorePct > state.quizBest) setState({ quizBest: scorePct })
    bumpQuest('quiz', 1)
    checkBadges()
  },
  recordBlitz(correct: number) {
    if (correct > state.blitzBest) setState({ blitzBest: correct })
    bumpQuest('blitz', correct)
    checkBadges()
  },
  recordExam(id: string, known: boolean) {
    setState((s) => ({ examKnown: { ...s.examKnown, [id]: known } }))
    if (known) actions.addXp(8, 'экзамен')
    checkBadges()
  },
  recordCase(id: string, score: number) {
    const prev = state.casesScore[id] ?? -1
    if (score > prev) {
      setState((s) => ({ casesScore: { ...s.casesScore, [id]: score } }))
      if (score === 2 && prev < 2) actions.addXp(12, 'кейс решён')
    }
  },
  completeChecklist(id: string) {
    const t = today()
    const done = state.checklistsDone[id] || []
    if (done.includes(t)) return
    setState((s) => ({ checklistsDone: { ...s.checklistsDone, [id]: [...(s.checklistsDone[id] || []), t] } }))
    bumpQuest('checklist', 1)
    actions.addXp(30, 'чек-лист закрыт')
    checkBadges()
  },
  recordRush(served: number) {
    if (served > state.rushBest) setState({ rushBest: served })
    bumpQuest('rush', served)
    checkBadges()
  },
  resetAll() {
    localStorage.removeItem(KEY)
    state = { ...initial }
    void engine.resetRemote()
    listeners.forEach((l) => l())
  },
  /** Hand-off: adopt the snapshot stored under another device code. */
  async claimCode(code: string): Promise<boolean> {
    const ok = await engine.claim(code)
    if (ok) await pullRemote()
    return ok
  },
  /** Manual "sync now": pull the server snapshot, merge, then push the result. */
  async syncNow(): Promise<void> {
    await pullRemote()
    await engine.flush()
  },
}

/* --------------------------- remote bootstrap --------------------------- */

function applyRemote(remote: Record<string, unknown>) {
  state = mergeRemote(state, remote) as AppState
  persist()
  listeners.forEach((l) => l())
  checkBadges()
}

async function pullRemote(): Promise<boolean> {
  const remote = await engine.pull()
  if (remote) {
    applyRemote(remote)
    return true
  }
  return false
}

function snapshotWithoutToasts(): Record<string, unknown> {
  const { toasts, ...rest } = state
  void toasts
  return rest
}

/**
 * Start-up sync. The app is already usable from localStorage at this point:
 * if the API answers, its snapshot is merged in; if not, the local copy is
 * pushed as soon as the server becomes reachable.
 */
void (async () => {
  const remote = await engine.pull()
  if (remote) applyRemote(remote)
  else engine.queuePush(snapshotWithoutToasts())
})()
