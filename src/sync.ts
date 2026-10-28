/**
 * Sync layer for 202f Academy — Barista OS.
 *
 * The app keeps working fully offline: localStorage is always the source of
 * truth for instant reads. When a progress API is reachable (VITE_API_URL, or
 * same-origin `/api` when the bundled server serves dist/), the local snapshot
 * is pushed with debounce and merged back on start.
 */

export type SyncStatus = 'local' | 'syncing' | 'synced' | 'error'

const RAW_BASE = (import.meta.env.VITE_API_URL ?? '').trim()
const API_BASE = RAW_BASE.replace(/\/+$/, '')
const DEVICE_KEY = 'barista-os-device-id'
const ID_RE = /^[A-Za-z0-9_-]{4,64}$/

let status: SyncStatus = 'local'
const listeners = new Set<() => void>()

function setStatus(s: SyncStatus) {
  if (status === s) return
  status = s
  listeners.forEach((l) => l())
}

export function useSyncStatus(): SyncStatus {
  return useSyncExternalStoreSafe(listeners, () => status)
}

// tiny local shim so this module has no react import order issues
import { useSyncExternalStore } from 'react'
function useSyncExternalStoreSafe(set: Set<() => void>, get: () => SyncStatus) {
  return useSyncExternalStore(
    (cb) => {
      set.add(cb)
      return () => set.delete(cb)
    },
    get,
  )
}

export function deviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY)
    if (!id || !ID_RE.test(id)) {
      id = makeId()
      localStorage.setItem(DEVICE_KEY, id)
    }
    return id
  } catch {
    return 'anonymous'
  }
}

function makeId(): string {
  const c = globalThis.crypto as Crypto | undefined
  if (c?.randomUUID) return c.randomUUID().replace(/-/g, '').slice(0, 24)
  return `dev${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

export function isValidDeviceId(id: string): boolean {
  return ID_RE.test(id)
}

export function setDeviceId(id: string): void {
  try {
    localStorage.setItem(DEVICE_KEY, id)
  } catch {
    /* ignore */
  }
}

export function apiBase(): string {
  return API_BASE || '(same origin)'
}

async function call(path: string, init?: RequestInit): Promise<any> {
  const ctl = new AbortController()
  const t = setTimeout(() => ctl.abort(), 6000)
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: ctl.signal,
      headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}

/* ------------------------------------------------------------------ *
 * Merge rules: monotonic fields win with max(), progress maps are unioned
 * (local OR remote), score maps keep the best, streak keeps the newer day,
 * daily quests keep the richer snapshot for the same date.
 * ------------------------------------------------------------------ */

const NUM_MAX = ['xp', 'quizBest', 'blitzBest', 'rushBest'] as const
const BOOL_MAPS = ['known', 'lessonsRead', 'modulesDone', 'examKnown'] as const
const NUM_MAPS = ['casesScore'] as const
const DATE_LIST_MAPS = ['checklistsDone'] as const

export function mergeRemote<S extends Record<string, any>>(local: S, remote: Partial<S>): S {
  const out: any = { ...local }
  for (const k of NUM_MAX) {
    const a = Number((local as any)[k] ?? 0)
    const b = Number((remote as any)?.[k] ?? 0)
    if (Number.isFinite(b)) out[k] = Math.max(a, b)
  }
  for (const k of BOOL_MAPS) {
    const a = (local as any)[k] ?? {}
    const b = (remote as any)?.[k] ?? {}
    const merged: Record<string, boolean> = { ...a }
    for (const key of Object.keys(b)) merged[key] = !!a[key] || !!b[key]
    out[k] = merged
  }
  for (const k of NUM_MAPS) {
    const a = (local as any)[k] ?? {}
    const b = (remote as any)?.[k] ?? {}
    const merged: Record<string, number> = { ...a }
    for (const key of Object.keys(b)) merged[key] = Math.max(Number(a[key] ?? -1), Number(b[key] ?? -1))
    out[k] = merged
  }
  for (const k of DATE_LIST_MAPS) {
    const a = (local as any)[k] ?? {}
    const b = (remote as any)?.[k] ?? {}
    const merged: Record<string, string[]> = { ...a }
    for (const key of Object.keys(b)) {
      merged[key] = Array.from(new Set([...(a[key] ?? []), ...(b[key] ?? [])])).sort()
    }
    out[k] = merged
  }
  // days / badges: union
  const daysR: string[] = (remote as any)?.days ?? []
  out.days = Array.from(new Set([...(local.days ?? []), ...daysR])).sort()
  const badgesR: string[] = (remote as any)?.earnedBadges ?? []
  out.earnedBadges = Array.from(new Set([...(local.earnedBadges ?? []), ...badgesR]))

  // streak: newer day wins
  const ls = local.streak ?? { count: 0, last: '' }
  const rs = (remote as any)?.streak ?? { count: 0, last: '' }
  out.streak = (rs.last ?? '') > (ls.last ?? '') ? rs : ls

  // quests: same date → bigger total progress; otherwise keep the later date
  const lq = local.quests ?? { date: '', items: [] }
  const rq = (remote as any)?.quests ?? { date: '', items: [] }
  const sum = (q: any) => (q?.items ?? []).reduce((n: number, i: any) => n + (i?.progress ?? 0), 0)
  if (rq.date === lq.date) out.quests = sum(rq) > sum(lq) ? rq : lq
  else out.quests = (rq.date ?? '') > (lq.date ?? '') ? rq : lq
  return out as S
}

/* ------------------------------------------------------------------ */

class Engine {
  private timer: ReturnType<typeof setTimeout> | null = null
  private inflight: Promise<unknown> | null = null
  private pending: Record<string, unknown> | null = null
  private lastPushed = 0

  status(): SyncStatus {
    return status
  }

  id(): string {
    return deviceId()
  }

  /** Pull the server snapshot for this device (null when offline / no data). */
  async pull(): Promise<Record<string, any> | null> {
    try {
      setStatus('syncing')
      const data = await call(`/api/progress/${encodeURIComponent(deviceId())}`)
      if (data?.ok && data.state) {
        this.lastPushed = Date.now()
        setStatus('synced')
        return data.state as Record<string, any>
      }
      setStatus('synced')
      return null
    } catch {
      setStatus('error')
      return null
    }
  }

  /** Load a snapshot stored under another device/account code. */
  async claim(id: string): Promise<boolean> {
    if (!isValidDeviceId(id)) return false
    try {
      setStatus('syncing')
      const data = await call(`/api/progress/${encodeURIComponent(id)}`)
      if (!data?.ok || !data.state) {
        setStatus('error')
        return false
      }
      setDeviceId(id)
      this.pending = data.state
      setStatus('synced')
      return true
    } catch {
      setStatus('error')
      return false
    }
  }

  /** Debounced push; the newest snapshot always wins. */
  queuePush(state: Record<string, unknown>) {
    if (status === 'error') {
      // keep retrying occasionally, one retry per 30s at most
      if (Date.now() - this.lastPushed < 30000) return
    }
    this.pending = state
    if (this.timer) return
    this.timer = setTimeout(() => {
      this.timer = null
      void this.flush()
    }, 1200)
  }

  async flush(): Promise<void> {
    if (this.inflight || !this.pending) return
    const body = JSON.stringify({ state: this.pending })
    this.pending = null
    this.inflight = (async () => {
      try {
        setStatus('syncing')
        await call(`/api/progress/${encodeURIComponent(deviceId())}`, { method: 'PUT', body })
        this.lastPushed = Date.now()
        setStatus('synced')
      } catch {
        setStatus('error')
      } finally {
        this.inflight = null
        if (this.pending) void this.flush()
      }
    })()
    await this.inflight
  }

  async resetRemote(): Promise<void> {
    try {
      await call(`/api/progress/${encodeURIComponent(deviceId())}`, { method: 'DELETE' })
      setStatus('synced')
    } catch {
      setStatus('error')
    }
  }
}

export const engine = new Engine()
