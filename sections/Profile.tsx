import { useState } from 'react'
import { actions, useStore } from '../store'
import { badges, ranks, rankFor } from '../data/gamification'
import { Bar, ProgressRing } from '../app-ui'
import { deviceId, useSyncStatus } from '../lib/sync'

export default function Profile() {
  const s = useStore()
  const [confirm, setConfirm] = useState(false)
  const sync = useSyncStatus()
  const dev = deviceId()
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [syncMsg, setSyncMsg] = useState('')
  const r = rankFor(s.xp)
  const syncLabel = sync === 'synced' ? 'на сервере' : sync === 'syncing' ? 'синхронизация' : 'автономно'
  const syncColor = sync === 'synced' ? '#4FBBBC' : sync === 'syncing' ? '#F39120' : '#8a8a76'
  const loadCode = async () => {
    if (!code.trim()) return
    const ok = await actions.claimCode(code.trim())
    setSyncMsg(ok ? 'Прогресс загружен с сервера' : 'Код не найден, сервер недоступен или код некорректен')
    if (ok) setCode('')
    setTimeout(() => setSyncMsg(''), 4500)
  }
  const knownCount = Object.values(s.known).filter(Boolean).length
  const lessonsCount = Object.values(s.lessonsRead).filter(Boolean).length
  const examTotal = Object.values(s.examKnown).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="anim-rise">
        <p className="kicker">Профиль и награды</p>
        <h1 className="font-display mt-2 text-3xl font-bold">Твоя карьера</h1>
      </div>

      {/* rank card */}
      <div className="card-ind p-6 anim-rise" style={{ borderColor: '#F3912055' }}>
        <div className="flex flex-wrap items-center gap-5">
          <ProgressRing value={r.next ? (r.into / r.span) * 100 : 100} size={96} stroke={6} color="#F39120">
            <div className="text-center">
              <p className="font-display text-xl font-bold tnum">{s.xp}</p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">XP</p>
            </div>
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl font-bold" style={{ color: '#F39120' }}>{r.current.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{r.current.perk}</p>
            {r.next && (
              <p className="font-mono2 mt-2 text-[11px] tnum text-muted-foreground">
                до «{r.next.title}»: {r.next.xp - s.xp} XP
              </p>
            )}
          </div>
        </div>
        <div className="mt-5 space-y-2">
          {ranks.map((rk) => (
            <div key={rk.id} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-xs font-bold" style={{ color: s.xp >= rk.xp ? '#4FBBBC' : '#6b6b5c' }}>
                {rk.title}
              </span>
              <div className="flex-1"><Bar value={Math.min(100, (s.xp / rk.xp) * 100)} color={s.xp >= rk.xp ? '#4FBBBC' : '#3a4a4a'} h={4} /></div>
              <span className="font-mono2 w-14 text-right text-[10px] tnum text-muted-foreground">{rk.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 anim-rise">
        {[
          { label: 'Стрик', value: `${s.streak.count} дн`, color: '#EC4624' },
          { label: 'ТТК в голове', value: `${knownCount}/79`, color: '#4FBBBC' },
          { label: 'Экзамен', value: `${examTotal}/40`, color: '#F39120' },
          { label: 'Методики', value: `${lessonsCount}/31`, color: '#4FBBBC' },
          { label: 'Квиз ТТК', value: `${s.quizBest}%`, color: '#4FBBBC' },
          { label: 'Блиц рекорд', value: `${s.blitzBest}`, color: '#EC4624' },
          { label: 'Rush рекорд', value: `${s.rushBest}`, color: '#F39120' },
          { label: 'Дней в строю', value: `${s.days.length}`, color: '#4FBBBC' },
        ].map((it) => (
          <div key={it.label} className="card-ind p-4">
            <p className="kicker">{it.label}</p>
            <p className="font-display mt-2 text-lg font-bold tnum" style={{ color: it.color }}>{it.value}</p>
          </div>
        ))}
      </div>

      {/* badges */}
      <div className="anim-rise">
        <h2 className="font-display text-base font-bold">Бейджи · {s.earnedBadges.length}/{badges.length}</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {badges.map((b) => {
            const earned = s.earnedBadges.includes(b.id)
            return (
              <div key={b.id} className="card-ind p-4 text-center"
                style={{ opacity: earned ? 1 : 0.45, borderColor: earned ? '#F3912066' : '#33403f' }}>
                <span className="font-display text-2xl" style={{ color: earned ? '#F39120' : '#6b6b5c' }}>{b.icon}</span>
                <p className="mt-2 text-xs font-bold">{b.title}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* sync */}
      <div className="card-ind p-5 anim-rise">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold">Синхронизация прогресса</p>
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${syncColor}22`, color: syncColor, border: `1px solid ${syncColor}55` }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: syncColor }} />
            {syncLabel}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Прогресс мгновенно пишется в этот браузер и работает без сети, а рядом уходит в облако под твоим кодом
          устройства. С этим кодом можно продолжить обучение на другом телефоне.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">код устройства</span>
          <button
            onClick={() => {
              void navigator.clipboard?.writeText(dev)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="font-mono2 tnum rounded-lg px-2.5 py-1 text-xs font-bold"
            style={{ background: '#4FBBBC22', color: '#4FBBBC', border: '1px solid #4FBBBC55' }}>
            {dev}
          </button>
          {copied && <span className="text-[10px] text-muted-foreground">скопировано</span>}
        </div>
        <div className="mt-3 flex flex-wrap items-stretch gap-2">
          <button onClick={() => void actions.syncNow()} className="btn-ghost-ind px-4 py-2 text-xs">
            Синхронизировать
          </button>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="код другого устройства"
            className="min-w-0 flex-1 rounded-full border px-4 py-2 text-xs"
            style={{ background: '#1a2121', borderColor: '#3a4a4a', color: '#e2dac2' }}
          />
          <button onClick={() => void loadCode()} className="btn-ghost-ind px-4 py-2 text-xs">
            Загрузить
          </button>
        </div>
        {syncMsg && (
          <p className="mt-2 text-[11px] leading-relaxed" style={{ color: '#4FBBBC' }}>
            {syncMsg}
          </p>
        )}
      </div>

      {/* reset */}
      <div className="card-ind p-5 anim-rise">
        <p className="text-sm font-bold">Сброс прогресса</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Сброс удалит XP, бейджи и историю в этом браузере и в облаке.
        </p>
        {!confirm ? (
          <button onClick={() => setConfirm(true)} className="btn-ghost-ind mt-3 px-4 py-2 text-xs" style={{ borderColor: '#EC462466', color: '#EC4624' }}>
            Сбросить всё
          </button>
        ) : (
          <div className="mt-3 flex gap-2">
            <button onClick={() => actions.resetAll()} className="btn-rust px-4 py-2 text-xs">Да, с нуля</button>
            <button onClick={() => setConfirm(false)} className="btn-ghost-ind px-4 py-2 text-xs">Отмена</button>
          </div>
        )}
      </div>
    </div>
  )
}
