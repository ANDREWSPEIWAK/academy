import { useState } from 'react'
import { actions, useStore } from './store'
import { disciplineChecklists, disciplineRules, levelLabels } from './data/discipline'
import { Bar, Pill } from './app-ui'

function ChecklistCard({ id }: { id: string }) {
  const s = useStore()
  const list = disciplineChecklists.find((c) => c.id === id)!
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [showTips, setShowTips] = useState<string | null>(null)
  const today = new Date().toISOString().slice(0, 10)
  const doneToday = (s.checklistsDone[id] || []).includes(today)
  const totalDone = (s.checklistsDone[id] || []).length

  const count = list.items.filter((it) => checked[it.id]).length
  const all = count === list.items.length

  return (
    <div className="card-ind overflow-hidden">
      <div className="p-5" style={{ background: 'linear-gradient(120deg,#263030,#1e2727)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">{list.kicker}</p>
            <h3 className="font-display mt-1 text-base font-bold">{list.title}</h3>
          </div>
          {doneToday
            ? <Pill color="#4FBBBC">сегодня ✓</Pill>
            : <Pill color="#F39120">{count}/{list.items.length}</Pill>}
        </div>
        <div className="mt-3"><Bar value={doneToday ? 100 : (count / list.items.length) * 100} color={doneToday ? '#4FBBBC' : '#F39120'} /></div>
        <p className="mt-2 font-mono2 text-[10px] tnum text-muted-foreground">выполнено раз: {totalDone}</p>
      </div>
      <div className="divide-y divide-border">
        {list.items.map((it) => {
          const on = doneToday || !!checked[it.id]
          return (
            <div key={it.id} className="px-4 py-3">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" disabled={doneToday} checked={on}
                  onChange={() => setChecked((prev) => ({ ...prev, [it.id]: !prev[it.id] }))}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#4FBBBC]" />
                <span className={`flex-1 text-sm ${on ? 'opacity-50 line-through' : ''}`} style={{ color: '#c9c0a6' }}>
                  {it.text}
                </span>
                <button type="button" onClick={() => setShowTips(showTips === it.id ? null : it.id)}
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: '#1a2121', color: '#F39120' }}>
                  как соблюдать
                </button>
              </label>
              {showTips === it.id && (
                <p className="anim-rise ml-8 mt-2 rounded-xl p-3 text-xs leading-relaxed"
                  style={{ background: '#1a2121', color: '#c9c0a6', border: '1px solid #F3912044' }}>
                  {it.tip}
                </p>
              )}
            </div>
          )
        })}
      </div>
      {!doneToday && (
        <div className="p-4">
          <button disabled={!all} onClick={() => actions.completeChecklist(id)}
            className="btn-aqua w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-30">
            {all ? 'Закрыть чек-лист · +30 XP' : `Осталось ${list.items.length - count} пунктов`}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Discipline() {
  const [tab, setTab] = useState<'checks' | 'rules'>('checks')
  return (
    <div className="space-y-6">
      <div className="anim-rise">
        <p className="kicker">Стандарты и дисциплина</p>
        <h1 className="font-display mt-2 text-3xl font-bold">Дисциплина станции</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Рабочие чек-листы смены и дисциплинарные требования — с конкретными рекомендациями, как их соблюдать без лишних нервов.
        </p>
      </div>

      <div className="flex gap-2 anim-rise">
        <button onClick={() => setTab('checks')} className={`chip-ind px-4 py-2 text-xs ${tab === 'checks' ? 'on' : ''}`}>Чек-листы</button>
        <button onClick={() => setTab('rules')} className={`chip-ind px-4 py-2 text-xs ${tab === 'rules' ? 'on' : ''}`}>Требования</button>
      </div>

      {tab === 'checks' && (
        <div className="space-y-4">
          {disciplineChecklists.map((c) => <ChecklistCard key={c.id} id={c.id} />)}
        </div>
      )}

      {tab === 'rules' && (
        <div className="space-y-3">
          {disciplineRules.map((r) => {
            const lv = levelLabels[r.level]
            return (
              <details key={r.id} className="card-ind group overflow-hidden anim-rise">
                <summary className="flex cursor-pointer items-center gap-3 p-4">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: lv.color }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{r.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.rule}</p>
                  </div>
                  <Pill color={lv.color}>{lv.label}</Pill>
                </summary>
                <div className="space-y-3 border-t border-border p-4" style={{ background: '#1a2121' }}>
                  <div>
                    <p className="kicker">Требование</p>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>{r.rule}</p>
                  </div>
                  <div>
                    <p className="kicker" style={{ color: '#EC4624' }}>Зачем это</p>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>{r.why}</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: '#4FBBBC14', border: '1px solid #4FBBBC44' }}>
                    <p className="kicker" style={{ color: '#4FBBBC' }}>Как соблюдать</p>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>{r.how}</p>
                  </div>
                </div>
              </details>
            )
          })}
        </div>
      )}
    </div>
  )
}
