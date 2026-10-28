import { useMemo, useState } from 'react'
import { actions, useStore } from '../store'
import { recipes, ttkCategories, type Recipe } from '../data/recipes'
import { Bar, Pill } from '../app-ui'

function RecipeModal({ recipe, onClose, onTrain }: { recipe: Recipe; onClose: () => void; onTrain: () => void }) {
  const s = useStore()
  const known = !!s.known[recipe.id]
  const cat = ttkCategories.find((c) => c.id === recipe.category)
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" style={{ background: 'rgba(10,14,14,.8)' }} onClick={onClose}>
      <div className="anim-rise max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl"
        style={{ background: '#222a2a', border: '1px solid #33403f' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="kicker">{cat?.title}</p>
            <h2 className="font-display mt-1 text-2xl font-bold">{recipe.name}</h2>
          </div>
          <button onClick={onClose} className="btn-ghost-ind px-3 py-1.5 text-sm">Закрыть</button>
        </div>

        <div className="mt-5 rounded-2xl p-4" style={{ background: '#1a2121', border: '1px solid #4FBBBC33' }}>
          <p className="kicker" style={{ color: '#4FBBBC' }}>Рецепт</p>
          <p className="font-mono2 mt-2 text-sm font-bold leading-relaxed">{recipe.recipe.ru}</p>
        </div>

        <div className="mt-4">
          <p className="kicker" style={{ color: '#F39120' }}>Вкус</p>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>{recipe.taste.ru}</p>
        </div>

        <div className="mt-4">
          <p className="kicker" style={{ color: '#EC4624' }}>Метод</p>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>{recipe.method.ru}</p>
        </div>

        <div className="mt-4">
          <p className="kicker">Сборка по шагам</p>
          <div className="mt-2 space-y-2">
            {recipe.steps.ru.map((st, i) => (
              <div key={i} className="flex gap-3 text-sm" style={{ color: '#c9c0a6' }}>
                <span className="font-mono2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{ background: '#1a2121', color: '#4FBBBC' }}>{i + 1}</span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => actions.markKnown(recipe.id, !known)}
            className={`flex-1 px-4 py-3 text-sm ${known ? 'btn-ghost-ind' : 'btn-aqua'}`}
          >
            {known ? 'Знаю ✓ (снять отметку)' : 'Я знаю этот рецепт · +6 XP'}
          </button>
          <button onClick={onTrain} className="btn-rust px-4 py-3 text-sm">Тренировать</button>
        </div>
      </div>
    </div>
  )
}

function BuildTrainer({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const correct = recipe.steps.ru
  const [pool] = useState(() => [...correct].sort(() => Math.random() - 0.5))
  const [picked, setPicked] = useState<string[]>([])
  const [result, setResult] = useState<null | boolean>(null)

  const check = (next: string[]) => {
    if (next.length !== correct.length) return
    const ok = next.every((s, i) => s === correct[i])
    setResult(ok)
    if (ok) {
      actions.addXp(10, 'сборка верна')
      actions.markKnown(recipe.id, true)
    }
  }

  const pick = (step: string) => {
    if (result !== null) return
    const next = [...picked, step]
    setPicked(next)
    check(next)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" style={{ background: 'rgba(10,14,14,.85)' }} onClick={onClose}>
      <div className="anim-pop max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl"
        style={{ background: '#222a2a', border: '1px solid #F3912066' }} onClick={(e) => e.stopPropagation()}>
        <p className="kicker" style={{ color: '#F39120' }}>Build-тренажёр</p>
        <h2 className="font-display mt-1 text-xl font-bold">{recipe.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Собери напиток: нажимай шаги в правильном порядке.</p>

        <div className="mt-4 min-h-[64px] rounded-2xl p-3" style={{ background: '#1a2121' }}>
          {picked.length === 0 && <p className="text-sm italic text-muted-foreground">Здесь появится твоя сборка…</p>}
          <div className="space-y-2">
            {picked.map((p, i) => {
              const okStep = result === null || correct[i] === p
              return (
                <div key={i} className="flex gap-2 rounded-lg px-2 py-1.5 text-sm"
                  style={{ background: result === null ? '#263030' : okStep ? '#4FBBBC22' : '#EC462422', color: '#e2dac2' }}>
                  <span className="font-mono2 text-xs font-bold" style={{ color: okStep ? '#4FBBBC' : '#EC4624' }}>{i + 1}</span>
                  {p}
                </div>
              )
            })}
          </div>
        </div>

        {result === null && (
          <div className="mt-4 flex flex-wrap gap-2">
            {pool.filter((p) => !picked.includes(p)).map((p, i) => (
              <button key={i} onClick={() => pick(p)} className="chip-ind px-3 py-2 text-sm">{p}</button>
            ))}
          </div>
        )}

        {result !== null && (
          <div className="mt-4 rounded-2xl p-4 text-center" style={{ background: result ? '#4FBBBC1e' : '#EC46241e' }}>
            <p className="font-display text-lg font-bold" style={{ color: result ? '#4FBBBC' : '#EC4624' }}>
              {result ? 'Сборка идеальна · +10 XP' : 'Порядок нарушен'}
            </p>
            {!result && (
              <p className="mt-2 text-sm" style={{ color: '#c9c0a6' }}>
                Верно: {correct.join(' → ')}
              </p>
            )}
            <button onClick={onClose} className="btn-aqua mt-4 px-6 py-2.5 text-sm">Готово</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Ttk() {
  const s = useStore()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [open, setOpen] = useState<Recipe | null>(null)
  const [train, setTrain] = useState<Recipe | null>(null)

  const knownCount = Object.values(s.known).filter(Boolean).length

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return recipes.filter((r) => {
      if (cat !== 'all' && r.category !== cat) return false
      if (!q) return true
      return [r.name, r.recipe.ru, r.taste.ru, r.method.ru, ...r.steps.ru].join(' ').toLowerCase().includes(q)
    })
  }, [query, cat])

  return (
    <div className="space-y-6">
      <div className="anim-rise">
        <p className="kicker">ТТК · техкарты станции</p>
        <h1 className="font-display mt-2 text-3xl font-bold">Рецепты и сборка</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Карточки: рецепт, вкус, метод, шаги. Отмечай «знаю» и тренируй сборку, пока меню не сядет в руки.
        </p>
      </div>

      <div className="card-ind p-4 anim-rise">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Знаю рецептов</span>
          <span className="font-mono2 tnum" style={{ color: '#4FBBBC' }}>{knownCount}/79</span>
        </div>
        <div className="mt-2"><Bar value={(knownCount / 79) * 100} color="#4FBBBC" /></div>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск: flat white, раф, V60, мартини…"
        className="w-full rounded-full px-5 py-3 text-sm outline-none anim-rise"
        style={{ background: '#263030', border: '1px solid #33403f', color: '#e2dac2' }}
      />

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 anim-rise">
        <button onClick={() => setCat('all')} className={`chip-ind shrink-0 px-4 py-2 text-xs ${cat === 'all' ? 'on' : ''}`}>
          Все
        </button>
        {ttkCategories.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)} className={`chip-ind shrink-0 px-4 py-2 text-xs ${cat === c.id ? 'on' : ''}`}>
            {c.title}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((r, i) => {
          const known = !!s.known[r.id]
          return (
            <button key={r.id} onClick={() => setOpen(r)}
              className="card-ind card-ind-hover flex w-full items-center gap-3 p-4 text-left anim-rise"
              style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: known ? '#4FBBBC' : '#3a4a4a' }} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.name}</p>
                <p className="truncate text-xs text-muted-foreground">{r.recipe.ru}</p>
              </div>
              <Pill color={known ? '#4FBBBC' : '#8a8a76'}>{ttkCategories.find((c) => c.id === r.category)?.title}</Pill>
            </button>
          )
        })}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">Ничего не найдено. Попробуй другой запрос.</p>
        )}
      </div>

      {open && !train && (
        <RecipeModal recipe={open} onClose={() => setOpen(null)} onTrain={() => setTrain(open)} />
      )}
      {train && <BuildTrainer recipe={train} onClose={() => { setTrain(null); setOpen(null) }} />}
    </div>
  )
}
