import { useEffect, useState } from 'react'
import { useStore } from '../store'

export function ProgressRing({ value, size = 56, stroke = 4, color = '#4FBBBC', track = '#33403f', children }: {
  value: number; size?: number; stroke?: number; color?: string; track?: string; children?: React.ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (Math.min(100, Math.max(0, value)) / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

export function Bar({ value, color = '#4FBBBC', h = 6 }: { value: number; color?: string; h?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ height: h, background: '#1a2121' }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  )
}

export function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed left-1/2 top-[calc(4.25rem+env(safe-area-inset-top))] z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4 lg:top-4">
      {toasts.map((t) => {
        const [, msg] = t.split('|')
        return (
          <div key={t} className="anim-slide-down rounded-full px-4 py-2 text-sm font-bold shadow-xl"
            style={{ background: '#F39120', color: '#161c1c' }}>
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export function useTicker(active: boolean, intervalMs = 1000): number {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setN((x) => x + 1), intervalMs)
    return () => clearInterval(id)
  }, [active, intervalMs])
  return n
}

export function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="anim-rise">
      <p className="kicker">{kicker}</p>
      <h1 className="font-display mt-2 text-2xl font-bold leading-tight sm:text-3xl">{title}</h1>
      {sub && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function Pill({ children, color = '#4FBBBC' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
      style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}>
      {children}
    </span>
  )
}

export function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="text-sm italic text-muted-foreground">{children}</p>
}
