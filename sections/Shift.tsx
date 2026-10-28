import { useEffect, useRef, useState } from 'react'
import { actions, useStore } from '../store'
import { barPositions, serviceFlow, timeStandards, sequenceRules, rushDrinks, rushStepsLegend, ausPrinciples, type RushDrink } from '../data/service'
import { guideStandards } from '../data/guide'
import { Bar, Pill } from '../app-ui'

/* ---------------- Rush simulator ---------------- */
interface ActiveOrder {
  key: number
  drink: RushDrink
  progress: number
  patience: number
}

function Rush({ onExit }: { onExit: () => void }) {
  const DURATION = 60
  const [left, setLeft] = useState(DURATION)
  const [orders, setOrders] = useState<ActiveOrder[]>([])
  const [served, setServed] = useState(0)
  const [lost, setLost] = useState(0)
  const [flash, setFlash] = useState<'ok' | 'bad' | null>(null)
  const keyRef = useRef(0)
  const over = left <= 0

  useEffect(() => {
    if (over) return
    const id = setInterval(() => {
      setLeft((x) => x - 1)
      setOrders((os) => {
        const next = os.map((o) => ({ ...o, patience: o.patience - 1 }))
        const expired = next.filter((o) => o.patience <= 0).length
        if (expired > 0) setLost((l) => l + expired)
        return next.filter((o) => o.patience > 0)
      })
      // spawn
      if (Math.random() < 0.55) {
        setOrders((os) => {
          if (os.length >= 3) return os
          const drink = rushDrinks[Math.floor(Math.random() * rushDrinks.length)]
          keyRef.current += 1
          return [...os, { key: keyRef.current, drink, progress: 0, patience: drink.patience }]
        })
      }
    }, 1000)
    return () => clearInterval(id)
  }, [over])

  useEffect(() => {
    if (over) {
      actions.recordRush(served)
      actions.addXp(served * 5, 'Rush-симулятор')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over])

  const tap = (step: string) => {
    if (over) return
    setOrders((os) => {
      // apply to the most urgent order that expects this step
      const idx = os.findIndex((o) => o.drink.steps[o.progress] === step)
      if (idx === -1) {
        setFlash('bad')
        setTimeout(() => setFlash(null), 300)
        return os.map((o) => (o.patience > 2 ? { ...o, patience: o.patience - 2 } : o))
      }
      const next = [...os]
      const o = { ...next[idx], progress: next[idx].progress + 1 }
      setFlash('ok')
      setTimeout(() => setFlash(null), 200)
      if (o.progress >= o.drink.steps.length) {
        setServed((s) => s + 1)
        next.splice(idx, 1)
        return next
      }
      next[idx] = o
      return next
    })
  }

  if (over) {
    return (
      <div className="card-ind p-8 text-center anim-pop">
        <p className="kicker">Смена окончена</p>
        <p className="font-display mt-3 text-5xl font-bold tnum" style={{ color: '#4FBBBC' }}>{served}</p>
        <p className="mt-1 text-sm text-muted-foreground">гостей обслужено · потеряно: {lost}</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>
          {served >= 6
            ? 'Уровень топового спешелти-бара: поток не остановить. Так держат утро в Сиднее.'
            : served >= 4
              ? 'Хороший темп. Следи за приоритетом — обслуживай самый «горячий» заказ первым.'
              : 'Начинай с самого нетерпеливого гостя и помни порядок сборки из ТТК.'}
        </p>
        <button onClick={onExit} className="btn-aqua mt-6 px-8 py-3 text-sm">К Shift OS</button>
      </div>
    )
  }

  return (
    <div className="anim-rise">
      <div className="flex items-center justify-between">
        <span className="font-mono2 text-2xl font-bold tnum" style={{ color: left <= 10 ? '#EC4624' : '#F39120' }}>0:{String(left).padStart(2, '0')}</span>
        <div className="flex gap-2">
          <Pill color="#4FBBBC">обслужено {served}</Pill>
          <Pill color="#EC4624">ушло {lost}</Pill>
        </div>
      </div>
      <div className="mt-2"><Bar value={(left / DURATION) * 100} color={left <= 10 ? '#EC4624' : '#F39120'} /></div>

      <div className="mt-4 space-y-2">
        {orders.length === 0 && (
          <div className="card-ind p-6 text-center text-sm text-muted-foreground">
            Гости подходят к стойке…
          </div>
        )}
        {[...orders].sort((a, b) => a.patience - b.patience).map((o) => {
          const pct = (o.patience / o.drink.patience) * 100
          const color = pct > 50 ? '#4FBBBC' : pct > 25 ? '#F39120' : '#EC4624'
          return (
            <div key={o.key} className="card-ind p-4" style={{ borderColor: `${color}66` }}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{o.drink.name}</p>
                <span className="font-mono2 text-[10px] tnum text-muted-foreground">{o.progress}/{o.drink.steps.length}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {o.drink.steps.map((st, i) => (
                  <span key={i} className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      background: i < o.progress ? '#4FBBBC' : i === o.progress ? '#F39120' : '#1a2121',
                      color: i <= o.progress ? '#161c1c' : '#8a8a76',
                    }}>
                    {st}
                  </span>
                ))}
              </div>
              <div className="mt-2"><Bar value={pct} color={color} h={4} /></div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {rushStepsLegend.map((st) => (
          <button key={st} onClick={() => tap(st)}
            className="rounded-2xl py-3 text-xs font-bold transition-transform active:scale-95"
            style={{
              background: flash === 'bad' ? '#EC462433' : '#263030',
              border: '1px solid #33403f',
              color: '#e2dac2',
            }}>
            {st}
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Нажимай шаги в порядке сборки. Ошибка = −2 сек терпения гостя. Обслуживай самый горячий заказ!
      </p>
    </div>
  )
}

/* ---------------- main section ---------------- */
export default function Shift() {
  const s = useStore()
  const [tab, setTab] = useState<'model' | 'standards' | 'rush'>('model')
  const [rushOn, setRushOn] = useState(false)

  return (
    <div className="space-y-6">
      <div className="anim-rise">
        <p className="kicker">Shift OS · сервис и тайминг</p>
        <h1 className="font-display mt-2 text-3xl font-bold">Смена как система</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Модель высокопоточного спешелти-бара: позиции, поток, секвенсинг и стандарты времени — как в топовых кофейнях Австралии.
        </p>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto anim-rise">
        {([
          ['model', 'Модель бара'],
          ['standards', 'Стандарты времени'],
          ['rush', 'Rush-симулятор'],
        ] as const).map(([id, label]) => (
          <button key={id} onClick={() => { setTab(id); setRushOn(false) }}
            className={`chip-ind shrink-0 px-4 py-2 text-xs ${tab === id ? 'on' : ''}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'model' && (
        <div className="space-y-6">
          {/* principles */}
          <div className="card-ind p-5 anim-rise">
            <h2 className="font-display text-base font-bold">5 принципов потока</h2>
            <div className="mt-4 space-y-4">
              {ausPrinciples.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <span className="font-display text-lg font-bold" style={{ color: '#F39120' }}>{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* flow */}
          <div className="anim-rise">
            <h2 className="font-display text-base font-bold">Схема потока заказа</h2>
            <div className="mt-3 space-y-0">
              {serviceFlow.map((f, i) => (
                <div key={f.n} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="font-mono2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                      style={{ background: '#4FBBBC', color: '#161c1c' }}>{f.n}</span>
                    {i < serviceFlow.length - 1 && <span className="w-px flex-1" style={{ background: '#33403f' }} />}
                  </div>
                  <div className="pb-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold">{f.title}</p>
                      <span className="font-mono2 text-[10px] tnum" style={{ color: '#F39120' }}>{f.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* positions */}
          <div className="anim-rise">
            <h2 className="font-display text-base font-bold">Позиции в пике</h2>
            <p className="mt-1 text-xs text-muted-foreground">В малой смене один человек совмещает позиции — но логика потока та же.</p>
            <div className="mt-3 space-y-3">
              {barPositions.map((p) => (
                <details key={p.id} className="card-ind group overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-bold">{p.title} <span className="font-mono2 text-[10px] uppercase text-muted-foreground">· {p.en}</span></p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{p.mission}</p>
                    </div>
                    <span className="text-muted-foreground transition-transform group-open:rotate-90">→</span>
                  </summary>
                  <div className="border-t border-border p-4" style={{ background: '#1a2121' }}>
                    <ul className="space-y-2">
                      {p.duties.map((d, i) => (
                        <li key={i} className="flex gap-2 text-sm" style={{ color: '#c9c0a6' }}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#4FBBBC' }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 rounded-xl p-3 text-xs font-semibold" style={{ background: '#EC46241c', color: '#EC4624' }}>
                      {p.rule}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* sequencing */}
          <div className="card-ind p-5 anim-rise">
            <h2 className="font-display text-base font-bold">Секвенсинг: порядок запуска</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {sequenceRules.map((r, i) => (
                <div key={i} className="rounded-2xl p-4" style={{ background: '#1a2121' }}>
                  <p className="text-sm font-bold" style={{ color: '#4FBBBC' }}>{r.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'standards' && (
        <div className="space-y-6">
          <div className="card-ind overflow-x-auto anim-rise">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr style={{ background: '#1a2121' }}>
                  {['Напиток / метрика', 'Цель', 'Лимит', 'Ключ'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-mono2 text-[10px] uppercase tracking-widest" style={{ color: '#4FBBBC' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeStandards.map((t, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3 font-bold">{t.drink}</td>
                    <td className="px-4 py-3 font-mono2 tnum" style={{ color: '#F39120' }}>{t.target}</td>
                    <td className="px-4 py-3 font-mono2 tnum" style={{ color: '#EC4624' }}>{t.limit}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="anim-rise">
            <h2 className="font-display text-base font-bold">Отраслевые ориентиры</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {guideStandards.map((g) => (
                <div key={g.id} className="card-ind p-4">
                  <p className="kicker" style={{ color: '#F39120' }}>{g.kicker}</p>
                  <h3 className="font-display mt-1 text-base font-bold">{g.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.body}</p>
                  <div className="mt-3 overflow-hidden rounded-xl border border-border">
                    <table className="w-full text-xs">
                      <tbody>
                        {g.table.rows.map((row, j) => (
                          <tr key={j} className={j > 0 ? 'border-t border-border' : ''}>
                            <td className="px-3 py-2 text-muted-foreground">{row[0]}</td>
                            <td className="px-3 py-2 text-right font-mono2 tnum" style={{ color: '#e2dac2' }}>{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'rush' && (
        <div>
          {rushOn ? (
            <>
              <button onClick={() => setRushOn(false)} className="btn-ghost-ind mb-5 px-4 py-2 text-xs">← Назад</button>
              <Rush onExit={() => setRushOn(false)} />
            </>
          ) : (
            <div className="card-ind p-8 text-center anim-rise" style={{ borderColor: '#EC462455' }}>
              <p className="kicker" style={{ color: '#EC4624' }}>Тренажёр потока</p>
              <h2 className="font-display mt-2 text-2xl font-bold">Rush-симулятор</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                60 секунд утреннего пика. Гости приходят с заказами, терпение тает.
                Собирай напитки по шагам из ТТК, обслуживай самые горячие заказы первыми.
              </p>
              <p className="font-mono2 mt-4 text-sm tnum" style={{ color: '#4FBBBC' }}>Рекорд: {s.rushBest} гостей</p>
              <button onClick={() => setRushOn(true)} className="btn-rust anim-pulse-rust mt-6 px-10 py-4 text-sm">
                Начать смену
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
