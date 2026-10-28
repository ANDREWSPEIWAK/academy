import { useMemo, useState } from 'react'
import { actions, useStore } from '../store'
import { libraryTopics, libraryItems, type LibraryItem } from '../data/library'
import { Pill } from '../components/app-ui'

function ItemModal({ item, onClose }: { item: LibraryItem; onClose: () => void }) {
  const s = useStore()
  const read = !!s.lessonsRead[item.id]
  const topic = libraryTopics.find((t) => t.id === item.topicId)
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" style={{ background: 'rgba(10,14,14,.8)' }} onClick={onClose}>
      <div className="anim-rise max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl"
        style={{ background: '#222a2a', border: '1px solid #33403f' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="kicker">{topic?.title} · {item.duration}</p>
            <h2 className="font-display mt-1 text-xl font-bold">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
          </div>
          <button onClick={onClose} className="btn-ghost-ind px-3 py-1.5 text-sm">Закрыть</button>
        </div>

        {item.youtube && (
          <a href={`https://www.youtube.com/watch?v=${item.youtube.id}`} target="_blank" rel="noreferrer"
            className="mt-5 flex items-center gap-4 rounded-2xl p-4 transition-transform hover:scale-[1.01]"
            style={{ background: '#1a2121', border: '1px solid #EC462455' }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full text-lg" style={{ background: '#EC4624', color: '#fff' }}>▶</span>
            <div>
              <p className="kicker" style={{ color: '#EC4624' }}>Видео-методика</p>
              <p className="mt-0.5 text-sm font-bold">{item.youtube.title}</p>
            </div>
          </a>
        )}

        {item.recipe && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-xs">
              <tbody>
                {item.recipe.rows.map((row, i) => (
                  <tr key={i} className={i > 0 ? 'border-t border-border' : ''}>
                    <td className="px-3 py-2 text-muted-foreground">{row[0]}</td>
                    <td className="px-3 py-2 text-right font-mono2 tnum" style={{ color: '#4FBBBC' }}>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-5 space-y-4">
          {item.sections.map((sec, i) => (
            <div key={i}>
              <p className="kicker" style={{ color: '#F39120' }}>{sec.title}</p>
              {sec.steps && (
                <ol className="mt-2 space-y-2">
                  {sec.steps.map((st, j) => (
                    <li key={j} className="flex gap-3 text-sm" style={{ color: '#c9c0a6' }}>
                      <span className="font-mono2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                        style={{ background: '#1a2121', color: '#4FBBBC' }}>{j + 1}</span>
                      {st}
                    </li>
                  ))}
                </ol>
              )}
              {sec.body && <p className="mt-2 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>{sec.body}</p>}
            </div>
          ))}
        </div>

        <button
          onClick={() => { actions.readLesson(item.id); onClose() }}
          disabled={read}
          className="btn-aqua mt-6 w-full px-4 py-3 text-sm disabled:opacity-40">
          {read ? 'Изучено ✓' : 'Изучил методику · +10 XP'}
        </button>
      </div>
    </div>
  )
}

export default function Library() {
  const s = useStore()
  const [topic, setTopic] = useState('all')
  const [open, setOpen] = useState<LibraryItem | null>(null)

  const filtered = useMemo(
    () => (topic === 'all' ? libraryItems : libraryItems.filter((i) => i.topicId === topic)),
    [topic],
  )
  const readCount = Object.values(s.lessonsRead).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="anim-rise">
        <p className="kicker">Методики и видео</p>
        <h1 className="font-display mt-2 text-3xl font-bold">Библиотека</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Рабочие методики станции: текстура молока, латте-арт, фильтр, диалин. Изучено {readCount}/{libraryItems.length}.
        </p>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto anim-rise">
        <button onClick={() => setTopic('all')} className={`chip-ind shrink-0 px-4 py-2 text-xs ${topic === 'all' ? 'on' : ''}`}>Все</button>
        {libraryTopics.map((t) => (
          <button key={t.id} onClick={() => setTopic(t.id)} className={`chip-ind shrink-0 px-4 py-2 text-xs ${topic === t.id ? 'on' : ''}`}>
            {t.title}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((item, i) => {
          const read = !!s.lessonsRead[item.id]
          const t = libraryTopics.find((x) => x.id === item.topicId)
          return (
            <button key={item.id} onClick={() => setOpen(item)}
              className="card-ind card-ind-hover p-5 text-left anim-rise" style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}>
              <div className="flex items-center justify-between">
                <p className="kicker" style={{ color: '#4FBBBC' }}>{t?.title}</p>
                <div className="flex items-center gap-2">
                  {item.youtube && <span className="text-xs" style={{ color: '#EC4624' }}>▶ видео</span>}
                  {read && <Pill color="#4FBBBC">✓</Pill>}
                </div>
              </div>
              <h3 className="font-display mt-2 text-base font-bold">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.summary}</p>
              <p className="font-mono2 mt-3 text-[10px] tnum text-muted-foreground">{item.duration}</p>
            </button>
          )
        })}
      </div>

      {open && <ItemModal item={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
