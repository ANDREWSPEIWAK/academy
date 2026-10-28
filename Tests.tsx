import { useEffect, useMemo, useState } from 'react'
import { actions, useStore } from './store'
import { recipes, ttkCategories } from './data/recipes'
import { examBlocks, examQuestions } from './data/exam'
import { serviceCases } from './data/cases'
import { Bar, Pill, ProgressRing } from './app-ui'

type Mode = 'hub' | 'quiz' | 'exam' | 'cases' | 'blitz'

/* ---------- quiz generator ---------- */
interface QuizQ {
  prompt: string
  options: string[]
  correct: number
  note: string
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function genQuiz(count = 10): QuizQ[] {
  const pool = shuffle(recipes)
  const qs: QuizQ[] = []
  for (const r of pool) {
    if (qs.length >= count) break
    const kind = qs.length % 3
    if (kind === 0) {
      const others = shuffle(recipes.filter((x) => x.id !== r.id && x.category === r.category))
      if (others.length < 3) continue
      const opts = shuffle([r.recipe.ru, ...others.slice(0, 3).map((o) => o.recipe.ru)])
      qs.push({
        prompt: `ТТК напитка «${r.name}»?`,
        options: opts,
        correct: opts.indexOf(r.recipe.ru),
        note: r.method.ru,
      })
    } else if (kind === 1) {
      const cat = ttkCategories.find((c) => c.id === r.category)!
      const others = shuffle(ttkCategories.filter((c) => c.id !== r.category)).slice(0, 3)
      const opts = shuffle([cat.title, ...others.map((o) => o.title)])
      qs.push({
        prompt: `К какой категории относится «${r.name}»?`,
        options: opts,
        correct: opts.indexOf(cat.title),
        note: `${r.name} — категория «${cat.title}».`,
      })
    } else {
      if (r.steps.ru.length < 2) continue
      const first = r.steps.ru[0]
      const others = shuffle(recipes.filter((x) => x.id !== r.id && x.steps.ru[0] !== first)).slice(0, 3)
      const opts = shuffle([first, ...others.map((o) => o.steps.ru[0])])
      qs.push({
        prompt: `Первый шаг сборки «${r.name}»?`,
        options: opts,
        correct: opts.indexOf(first),
        note: `Полная сборка: ${r.steps.ru.join(' → ')}`,
      })
    }
  }
  return qs
}

/* ---------- shared option button ---------- */
function OptionBtn({ text, state, onClick }: { text: string; state: 'idle' | 'right' | 'wrong' | 'dim'; onClick: () => void }) {
  const colors = {
    idle: { bg: '#263030', border: '#33403f', fg: '#e2dac2' },
    right: { bg: '#4FBBBC22', border: '#4FBBBC', fg: '#4FBBBC' },
    wrong: { bg: '#EC462422', border: '#EC4624', fg: '#EC4624' },
    dim: { bg: '#222a2a', border: '#2b3434', fg: '#6b6b5c' },
  }[state]
  return (
    <button onClick={onClick}
      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all"
      style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.fg }}>
      {text}
    </button>
  )
}

/* ---------- Quiz ---------- */
function Quiz({ onExit }: { onExit: () => void }) {
  const [qs] = useState(() => genQuiz(10))
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const done = i >= qs.length

  const answer = (idx: number) => {
    if (picked !== null) return
    setPicked(idx)
    if (idx === qs[i].correct) setScore((s) => s + 1)
  }

  const next = () => {
    setPicked(null)
    setI((x) => x + 1)
  }

  useEffect(() => {
    if (done) {
      const pct = Math.round((score / qs.length) * 100)
      actions.recordQuiz(pct)
      actions.addXp(Math.round(pct / 5), 'квиз ТТК')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  if (done) {
    const pct = Math.round((score / qs.length) * 100)
    return (
      <div className="card-ind p-8 text-center anim-pop">
        <ProgressRing value={pct} size={110} color={pct >= 80 ? '#4FBBBC' : pct >= 50 ? '#F39120' : '#EC4624'} stroke={6}>
          <span className="font-display text-2xl font-bold tnum">{pct}%</span>
        </ProgressRing>
        <p className="font-display mt-4 text-xl font-bold">{score}/{qs.length} верно</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {pct >= 80 ? 'Меню сидит в руках. Так держать!' : pct >= 50 ? 'Неплохо. Слабые места — в карточках ТТК.' : 'Открой ТТК и пройди Build-тренажёр по ошибкам.'}
        </p>
        <button onClick={onExit} className="btn-aqua mt-6 px-8 py-3 text-sm">К тестам</button>
      </div>
    )
  }

  const q = qs[i]
  return (
    <div className="anim-rise">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono2 tnum">Вопрос {i + 1}/{qs.length}</span>
        <span className="font-mono2 tnum" style={{ color: '#4FBBBC' }}>верно: {score}</span>
      </div>
      <div className="mt-2"><Bar value={(i / qs.length) * 100} color="#4FBBBC" /></div>
      <div className="card-ind mt-5 p-6">
        <h3 className="font-display text-lg font-bold leading-snug">{q.prompt}</h3>
        <div className="mt-5 space-y-2">
          {q.options.map((o, idx) => (
            <OptionBtn key={idx} text={o}
              state={picked === null ? 'idle' : idx === q.correct ? 'right' : idx === picked ? 'wrong' : 'dim'}
              onClick={() => answer(idx)} />
          ))}
        </div>
        {picked !== null && (
          <div className="anim-rise mt-4 rounded-xl p-3 text-xs leading-relaxed" style={{ background: '#1a2121', color: '#c9c0a6' }}>
            {q.note}
          </div>
        )}
      </div>
      {picked !== null && (
        <button onClick={next} className="btn-aqua mt-4 w-full px-4 py-3 text-sm anim-pop">
          {i + 1 === qs.length ? 'Результат' : 'Дальше →'}
        </button>
      )}
    </div>
  )
}

/* ---------- Blitz ---------- */
function Blitz({ onExit }: { onExit: () => void }) {
  const DURATION = 60
  const [left, setLeft] = useState(DURATION)
  const [q, setQ] = useState<QuizQ | null>(null)
  const [correct, setCorrect] = useState(0)
  const [total, setTotal] = useState(0)
  const over = left <= 0

  const nextQ = () => setQ(genQuiz(1)[0])
  useEffect(() => { nextQ() }, [])
  useEffect(() => {
    if (over) return
    const id = setInterval(() => setLeft((x) => x - 1), 1000)
    return () => clearInterval(id)
  }, [over])
  useEffect(() => {
    if (over) {
      actions.recordBlitz(correct)
      actions.addXp(correct * 3, 'блиц «Час пик»')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over])

  const answer = (idx: number) => {
    if (!q || over) return
    setTotal((t) => t + 1)
    if (idx === q.correct) setCorrect((c) => c + 1)
    nextQ()
  }

  if (over) {
    return (
      <div className="card-ind p-8 text-center anim-pop">
        <p className="kicker">Время вышло</p>
        <p className="font-display mt-3 text-4xl font-bold tnum" style={{ color: '#EC4624' }}>{correct}</p>
        <p className="mt-1 text-sm text-muted-foreground">верных из {total} за минуту</p>
        <p className="mt-3 text-sm" style={{ color: '#c9c0a6' }}>
          {correct >= 8 ? 'Ты — машина потока. Утренний пик Мельбурна тебе по плечу.' : correct >= 5 ? 'Хороший темп. Ещё пара заходов — и будет 8+.' : 'В пике счёт на секунды. Подтяни ТТК и возвращайся.'}
        </p>
        <button onClick={onExit} className="btn-rust mt-6 px-8 py-3 text-sm">К тестам</button>
      </div>
    )
  }

  return (
    <div className="anim-rise">
      <div className="flex items-center justify-between">
        <span className="font-mono2 text-2xl font-bold tnum" style={{ color: left <= 10 ? '#EC4624' : '#F39120' }}>0:{String(left).padStart(2, '0')}</span>
        <Pill color="#EC4624">ЧАС ПИК</Pill>
        <span className="font-mono2 text-sm tnum" style={{ color: '#4FBBBC' }}>+{correct}</span>
      </div>
      <div className="mt-2"><Bar value={(left / DURATION) * 100} color={left <= 10 ? '#EC4624' : '#F39120'} /></div>
      {q && (
        <div className="card-ind mt-5 p-6" key={q.prompt}>
          <h3 className="font-display text-lg font-bold leading-snug">{q.prompt}</h3>
          <div className="mt-5 space-y-2">
            {q.options.map((o, idx) => (
              <OptionBtn key={idx} text={o} state="idle" onClick={() => answer(idx)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- Exam ---------- */
function Exam() {
  const s = useStore()
  const [block, setBlock] = useState(0)
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const blockQs = useMemo(() => examQuestions.filter((q) => q.block === examBlocks[block]), [block])
  const q = blockQs[idx]
  const knownInBlock = blockQs.filter((x) => s.examKnown[x.id]).length

  const mark = (known: boolean) => {
    actions.recordExam(q.id, known)
    setRevealed(false)
    if (idx + 1 < blockQs.length) setIdx(idx + 1)
    else if (block + 1 < examBlocks.length) { setBlock(block + 1); setIdx(0) }
  }

  const totalKnown = Object.values(s.examKnown).filter(Boolean).length

  return (
    <div className="anim-rise">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {examBlocks.map((b, i) => (
          <button key={b} onClick={() => { setBlock(i); setIdx(0); setRevealed(false) }}
            className={`chip-ind shrink-0 px-3 py-2 text-xs ${i === block ? 'on' : ''}`}>{b}</button>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono2 tnum">Вопрос {idx + 1}/{blockQs.length}</span>
        <span className="font-mono2 tnum" style={{ color: '#4FBBBC' }}>закрыто в блоке: {knownInBlock}/{blockQs.length} · всего {totalKnown}/40</span>
      </div>
      <div className="mt-2"><Bar value={(knownInBlock / blockQs.length) * 100} color="#4FBBBC" /></div>

      {q ? (
        <div className="card-ind mt-4 p-6">
          <p className="kicker">Ответь вслух или про себя, затем сверься</p>
          <h3 className="font-display mt-3 text-lg font-bold leading-snug">{q.prompt}</h3>
          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="btn-ghost-ind mt-6 w-full px-4 py-3 text-sm">
              Показать эталон ответа
            </button>
          ) : (
            <div className="anim-rise">
              <div className="mt-4 rounded-xl p-4 text-sm leading-relaxed" style={{ background: '#1a2121', color: '#c9c0a6', border: '1px solid #4FBBBC33' }}>
                {q.model}
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">Твой ответ был близок к эталону?</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button onClick={() => mark(true)} className="btn-aqua px-4 py-3 text-sm">Знал · +8 XP</button>
                <button onClick={() => mark(false)} className="btn-rust px-4 py-3 text-sm">Надо повторить</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card-ind mt-4 p-6 text-center text-sm text-muted-foreground">Блок закрыт.</div>
      )}
    </div>
  )
}

/* ---------- Cases ---------- */
function Cases() {
  const s = useStore()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const c = serviceCases[i]
  const solvedBest = s.casesScore[c.id] ?? -1

  const pick = (idx: number) => {
    if (picked !== null) return
    setPicked(idx)
    actions.recordCase(c.id, c.options[idx].score)
  }

  return (
    <div className="anim-rise">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono2 tnum">Кейс {i + 1}/{serviceCases.length}</span>
        <Pill color="#F39120">{c.block}</Pill>
      </div>
      <div className="mt-2"><Bar value={(i / serviceCases.length) * 100} color="#F39120" /></div>
      <div className="card-ind mt-4 p-6">
        <p className="text-sm leading-relaxed" style={{ color: '#c9c0a6' }}>{c.scene}</p>
        <div className="mt-5 space-y-2">
          {c.options.map((o, idx) => {
            let st: 'idle' | 'right' | 'wrong' | 'dim' = 'idle'
            if (picked !== null) {
              if (o.score === 2) st = 'right'
              else if (idx === picked) st = 'wrong'
              else st = 'dim'
            }
            return <OptionBtn key={idx} text={o.text} state={st} onClick={() => pick(idx)} />
          })}
        </div>
        {picked !== null && (
          <div className="anim-rise mt-4">
            <p className="font-mono2 text-xs font-bold" style={{ color: c.options[picked].score === 2 ? '#4FBBBC' : c.options[picked].score === 1 ? '#F39120' : '#EC4624' }}>
              {c.options[picked].score === 2 ? 'Профессиональное решение · +12 XP' : c.options[picked].score === 1 ? 'Терпимо, но есть лучше' : 'Ошибка'}
              {solvedBest === 2 && picked !== null && c.options[picked].score < 2 ? ' (ранее решён верно)' : ''}
            </p>
            <div className="mt-2 rounded-xl p-3 text-xs leading-relaxed" style={{ background: '#1a2121', color: '#c9c0a6' }}>
              {c.explain}
            </div>
          </div>
        )}
      </div>
      {picked !== null && (
        <button onClick={() => { setPicked(null); setI((x) => (x + 1) % serviceCases.length) }}
          className="btn-aqua mt-4 w-full px-4 py-3 text-sm anim-pop">
          {i + 1 === serviceCases.length ? 'Сначала ↺' : 'Следующий кейс →'}
        </button>
      )}
    </div>
  )
}

/* ---------- Hub ---------- */
export default function Tests() {
  const s = useStore()
  const [mode, setMode] = useState<Mode>('hub')

  if (mode === 'quiz') return <div><BackBtn onClick={() => setMode('hub')} /><Quiz onExit={() => setMode('hub')} /></div>
  if (mode === 'blitz') return <div><BackBtn onClick={() => setMode('hub')} /><Blitz onExit={() => setMode('hub')} /></div>
  if (mode === 'exam') return <div><BackBtn onClick={() => setMode('hub')} /><Exam /></div>
  if (mode === 'cases') return <div><BackBtn onClick={() => setMode('hub')} /><Cases /></div>

  const knownCount = Object.values(s.known).filter(Boolean).length
  const examTotal = Object.values(s.examKnown).filter(Boolean).length
  const casesPerfect = Object.values(s.casesScore).filter((v) => v === 2).length

  const cards = [
    {
      id: 'quiz' as Mode, kicker: 'Квиз · 10 вопросов', title: 'ТТК под контролем',
      desc: 'Рецепты, категории, первые шаги сборки. Вопросы генерируются из всех 79 ТТК.',
      stat: `лучший: ${s.quizBest}%`, color: '#4FBBBC',
    },
    {
      id: 'blitz' as Mode, kicker: '60 секунд', title: 'Блиц «Час пик»',
      desc: 'Минутный спринт на скорость вспоминания меню. Как утро в Мельбурне: без пауз.',
      stat: `рекорд: ${s.blitzBest}`, color: '#EC4624',
    },
    {
      id: 'exam' as Mode, kicker: '40 вопросов · 4 блока', title: 'Экзамен бариста',
      desc: 'Сервис, техника, фильтр, эспрессо. Открытые вопросы с эталоном ответа и самооценкой.',
      stat: `закрыто: ${examTotal}/40`, color: '#F39120',
    },
    {
      id: 'cases' as Mode, kicker: '12 ситуаций', title: 'Кейсы смены',
      desc: 'Реальные ситуации с гостями, очередью и станцией. Логика выбора, а не зубрёжка.',
      stat: `решено идеально: ${casesPerfect}/12`, color: '#4FBBBC',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="anim-rise">
        <p className="kicker">Проверка знаний</p>
        <h1 className="font-display mt-2 text-3xl font-bold">Тесты и экзамен</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Четыре формата: от быстрого блица до полной аттестации. ТТК выучено: {knownCount}/79 — квиз берёт вопросы из всего меню.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((c, i) => (
          <button key={c.id} onClick={() => setMode(c.id)}
            className="card-ind card-ind-hover p-5 text-left anim-rise" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between">
              <p className="kicker" style={{ color: c.color }}>{c.kicker}</p>
              <span className="font-mono2 text-[10px] tnum text-muted-foreground">{c.stat}</span>
            </div>
            <h3 className="font-display mt-2 text-lg font-bold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            <p className="mt-4 text-xs font-bold" style={{ color: c.color }}>Начать →</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="btn-ghost-ind mb-5 px-4 py-2 text-xs">← Все тесты</button>
  )
}
