import { useMemo, useState } from 'react'
import { actions, useStore } from './store'
import { levels, modules, attestations, type TheoryBlock } from './data/curriculum'
import { rankFor, badges } from './data/gamification'
import { ProgressRing, Bar, Pill } from './app-ui'
import { recipes } from './data/recipes'

function TheoryView({ blocks }: { blocks: TheoryBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.type === 'h')
          return <h4 key={i} className="font-display mt-6 text-sm font-bold uppercase tracking-wide" style={{ color: '#4FBBBC' }}>{b.text}</h4>
        if (b.type === 'p')
          return <p key={i} className="text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>{b.text}</p>
        if (b.type === 'ul')
          return (
            <ul key={i} className="space-y-2">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-2 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#F39120' }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          )
        if (b.type === 'ol')
          return (
            <ol key={i} className="space-y-2">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>
                  <span className="font-mono2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: '#1a2121', color: '#4FBBBC' }}>{j + 1}</span>
                  <span>{it}</span>
                </li>
              ))}
            </ol>
          )
        if (b.type === 'callout')
          return (
            <div key={i} className="rounded-xl p-4 text-sm leading-relaxed"
              style={{ background: '#4FBBBC14', border: '1px solid #4FBBBC44', color: '#c9c0a6' }}>
              {b.text}
            </div>
          )
        return (
          <div key={i} className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: '#1a2121' }}>
                  {b.headers.map((h, j) => (
                    <th key={j} className="px-3 py-2 text-left font-mono2 uppercase tracking-wider" style={{ color: '#4FBBBC' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, j) => (
                  <tr key={j} className="border-t border-border">
                    {row.map((cell, k) => (
                      <td key={k} className="px-3 py-2" style={{ color: '#c9c0a6' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

function ModuleModal({ moduleId, onClose }: { moduleId: string; onClose: () => void }) {
  const mod = modules.find((m) => m.id === moduleId)!
  const { modulesDone } = useStore()
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const done = !!modulesDone[moduleId]
  const allChecked = mod.checklist.every((c) => checked[c.id])
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" style={{ background: 'rgba(10,14,14,.8)' }} onClick={onClose}>
      <div
        className="anim-rise max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl"
        style={{ background: '#222a2a', border: '1px solid #33403f' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="kicker">{mod.duration}</p>
            <h2 className="font-display mt-1 text-xl font-bold">{mod.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{mod.subtitle}</p>
          </div>
          <button onClick={onClose} className="btn-ghost-ind px-3 py-1.5 text-sm">Закрыть</button>
        </div>

        <div className="mt-6">
          <TheoryView blocks={mod.theory} />
        </div>

        <div className="mt-8 rounded-2xl p-4" style={{ background: '#1a2121' }}>
          <p className="kicker mb-3">Практика — отметь выполненное</p>
          <div className="space-y-2">
            {mod.checklist.map((c) => (
              <label key={c.id} className="flex cursor-pointer items-start gap-3 rounded-xl p-2 transition-colors hover:bg-white/5">
                <input
                  type="checkbox"
                  checked={!!checked[c.id] || done}
                  disabled={done}
                  onChange={() => setChecked((s) => ({ ...s, [c.id]: !s[c.id] }))}
                  className="mt-0.5 h-5 w-5 accent-[#4FBBBC]"
                />
                <span className="text-sm" style={{ color: '#c9c0a6' }}>{c.text}</span>
              </label>
            ))}
          </div>
          {!done && (
            <button
              disabled={!allChecked}
              onClick={() => { actions.completeModule(mod.id); onClose() }}
              className="btn-aqua mt-4 w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-30"
            >
              Модуль освоен · +40 XP
            </button>
          )}
          {done && <p className="mt-3 text-center text-sm font-bold" style={{ color: '#4FBBBC' }}>Модуль закрыт ✓</p>}
        </div>
      </div>
    </div>
  )
}

export default function Path() {
  const s = useStore()
  const [openModule, setOpenModule] = useState<string | null>(null)
  const [openAtt, setOpenAtt] = useState<string | null>(null)
  const r = rankFor(s.xp)
  const knownCount = Object.values(s.known).filter(Boolean).length
  const quests = s.quests.items
  const questsDone = quests.filter((q) => q.done).length

  const greeting = useMemo(() => {
    const h = new Date().getHours()
    if (h < 6) return 'Ночная смена? Уважаю'
    if (h < 12) return 'Утренний пик ждёт'
    if (h < 18) return 'Дневной поток'
    return 'Вечерний сервис'
  }, [])

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4 anim-rise">
        <div>
          <p className="kicker">{greeting}</p>
          <h1 className="font-display mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            Твой путь <span style={{ color: '#4FBBBC' }}>бариста</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ProgressRing value={r.next ? (r.into / r.span) * 100 : 100} size={72} color="#F39120">
            <span className="font-mono2 text-sm font-bold tnum">{s.xp}</span>
          </ProgressRing>
          <div>
            <p className="font-display text-lg font-bold" style={{ color: '#F39120' }}>{r.current.title}</p>
            {r.next && <p className="text-xs text-muted-foreground">до «{r.next.title}» ещё {r.next.xp - s.xp} XP</p>}
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 anim-rise">
        {[
          { label: 'Стрик', value: `${s.streak.count} дн`, color: '#EC4624' },
          { label: 'Рецепты ТТК', value: `${knownCount}/79`, color: '#4FBBBC' },
          { label: 'Бейджи', value: `${s.earnedBadges.length}/${badges.length}`, color: '#F39120' },
          { label: 'Квесты дня', value: `${questsDone}/${quests.length || 3}`, color: '#4FBBBC' },
        ].map((it) => (
          <div key={it.label} className="card-ind p-4">
            <p className="kicker">{it.label}</p>
            <p className="font-display mt-2 text-xl font-bold tnum" style={{ color: it.color }}>{it.value}</p>
          </div>
        ))}
      </div>

      {/* daily quests */}
      <div className="card-ind p-5 anim-rise">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold">Квесты дня</h2>
          <Pill color="#F39120">обновятся завтра</Pill>
        </div>
        <div className="mt-4 space-y-3">
          {quests.map((q) => (
            <div key={q.id} className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-semibold ${q.done ? 'line-through opacity-50' : ''}`}>{q.title}</p>
                  <span className="font-mono2 text-xs tnum" style={{ color: q.done ? '#4FBBBC' : '#8a8a76' }}>
                    {q.progress}/{q.target} · +{q.xp} XP
                  </span>
                </div>
                <Bar value={(q.progress / q.target) * 100} color={q.done ? '#4FBBBC' : '#F39120'} h={5} />
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: q.done ? '#4FBBBC' : '#1a2121', color: q.done ? '#161c1c' : '#8a8a76' }}>
                {q.done ? '✓' : '·'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* levels */}
      {levels.map((lv) => {
        const mods = modules.filter((m) => m.levelId === lv.id)
        const doneCount = mods.filter((m) => s.modulesDone[m.id]).length
        const pct = mods.length ? (doneCount / mods.length) * 100 : 0
        const locked =
          (lv.id === 'skilled' && s.xp < 200) || (lv.id === 'pro' && s.xp < 600)
        return (
          <div key={lv.id} className="card-ind overflow-hidden anim-rise">
            <div className="p-5" style={{ background: 'linear-gradient(120deg,#263030,#1e2727)' }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="kicker">Уровень {lv.n} · {lv.duration}</p>
                  <h2 className="font-display mt-1 text-xl font-bold">
                    {lv.title} <span className="text-sm font-medium text-muted-foreground">/ {lv.en}</span>
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: '#4FBBBC' }}>{lv.tagline}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{lv.focus}</p>
                </div>
                <div className="flex items-center gap-3">
                  {locked && <Pill color="#EC4624">откроется на {lv.id === 'skilled' ? 200 : 600} XP</Pill>}
                  <ProgressRing value={pct} size={60} color={pct === 100 ? '#4FBBBC' : '#F39120'}>
                    <span className="font-mono2 text-xs font-bold tnum">{Math.round(pct)}%</span>
                  </ProgressRing>
                </div>
              </div>
              <div className="mt-3"><Bar value={pct} color="#4FBBBC" /></div>
            </div>
            {!locked && (
              <div className="divide-y divide-border">
                {mods.map((m) => {
                  const done = !!s.modulesDone[m.id]
                  return (
                    <button key={m.id} onClick={() => setOpenModule(m.id)}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono2 text-xs font-bold"
                        style={{ background: done ? '#4FBBBC' : '#1a2121', color: done ? '#161c1c' : '#F39120' }}>
                        {done ? '✓' : '+'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{m.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{m.subtitle} · {m.duration}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">→</span>
                    </button>
                  )
                })}
                <button onClick={() => setOpenAtt(openAtt === lv.id ? null : lv.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono2 text-xs font-bold"
                    style={{ background: '#1a2121', color: '#EC4624' }}>!</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{attestations[lv.id]?.title}</p>
                    <p className="text-xs text-muted-foreground">Проверяет: {attestations[lv.id]?.examiner}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{openAtt === lv.id ? '↑' : '↓'}</span>
                </button>
                {openAtt === lv.id && attestations[lv.id] && (
                  <div className="space-y-2 px-5 py-4" style={{ background: '#1a2121' }}>
                    {attestations[lv.id].items.map((it, i) => (
                      <div key={it.id} className="flex gap-3 text-sm" style={{ color: '#c9c0a6' }}>
                        <span className="font-mono2 text-xs font-bold" style={{ color: '#F39120' }}>{String(i + 1).padStart(2, '0')}</span>
                        <span>{it.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* quick fact */}
      <div className="card-ind p-5 anim-rise" style={{ borderColor: '#F3912055' }}>
        <p className="kicker">Метрика дня</p>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>
          В топовых спешелти-барах Австралии молочный напиток уходит гостю за <b style={{ color: '#F39120' }}>90 секунд</b>,
          а полная очередь — за <b style={{ color: '#F39120' }}>4 минуты</b>. Проверь себя в Rush-симуляторе во вкладке «Смена».
        </p>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        В меню сейчас {recipes.length} позиций ТТК · прогресс сохраняется в этом браузере
      </div>

      {openModule && <ModuleModal moduleId={openModule} onClose={() => setOpenModule(null)} />}
    </div>
  )
}
