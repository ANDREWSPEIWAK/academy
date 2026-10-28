import { useState } from 'react'
import { wheelCategories } from '../data/wheel'
import { Pill } from '../app-ui'

const wheelColors = ['#F39120', '#4FBBBC', '#EC4624', '#E2DAC2', '#F39120', '#4FBBBC', '#EC4624', '#E2DAC2']

export default function Wheel() {
  const [active, setActive] = useState(wheelCategories[0].id)
  const cat = wheelCategories.find((c) => c.id === active)!

  return (
    <div className="space-y-6">
      <div className="anim-rise">
        <p className="kicker">Сенсорика</p>
        <h1 className="font-display mt-2 text-3xl font-bold">Колесо вкусов</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Язык описания кофе: от категории к нотам и регионам. Используй, когда рассказываешь гостю про лот.
        </p>
      </div>

      {/* visual wheel */}
      <div className="card-ind p-6 anim-rise">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
          {wheelCategories.map((c, i) => {
            const on = c.id === active
            const color = wheelColors[i % wheelColors.length]
            return (
              <button key={c.id} onClick={() => setActive(c.id)}
                className="flex aspect-square flex-col items-center justify-center rounded-2xl text-center transition-all"
                style={{
                  background: on ? color : '#1a2121',
                  color: on ? '#161c1c' : '#c9c0a6',
                  transform: on ? 'scale(1.05)' : 'scale(1)',
                  border: `1px solid ${on ? color : '#33403f'}`,
                }}>
                <span className="text-[11px] font-bold leading-tight">{c.short}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="card-ind p-6 anim-rise">
        <h2 className="font-display text-xl font-bold">{cat.title}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {cat.notes.map((n) => (
            <span key={n} className="rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{ background: '#1a2121', border: '1px solid #F3912044', color: '#F39120' }}>
              {n}
            </span>
          ))}
        </div>
        <p className="kicker mt-5">Где искать</p>
        <div className="mt-2 space-y-2">
          {cat.regions.map((r) => (
            <div key={r.name} className="flex flex-wrap items-baseline gap-2 rounded-xl p-3" style={{ background: '#1a2121' }}>
              <Pill color="#4FBBBC">{r.name}</Pill>
              <span className="text-xs leading-relaxed text-muted-foreground">{r.why}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl p-3 text-xs leading-relaxed" style={{ background: '#4FBBBC12', border: '1px solid #4FBBBC33', color: '#c9c0a6' }}>
          Как продавать языком гостя: не «фруктовая кислотность», а «как спелый {cat.notes[0] ?? 'фрукт'} — ярко, но сладко».
        </div>
      </div>
    </div>
  )
}
