export interface Rank {
  id: string
  title: string
  xp: number
  perk: string
}

export const ranks: Rank[] = [
  { id: 'trainee', title: 'Стажёр', xp: 0, perk: 'Доступ к пути Junior' },
  { id: 'barista', title: 'Бариста', xp: 200, perk: 'Открыт уровень Skilled' },
  { id: 'senior', title: 'Старший бариста', xp: 600, perk: 'Доступ к экзамену PRO' },
  { id: 'head', title: 'Шеф-бариста', xp: 1400, perk: 'Право проводить аттестацию' },
  { id: 'legend', title: 'Легенда смены', xp: 3000, perk: 'Зал славы 202f' },
]

export interface Badge {
  id: string
  title: string
  desc: string
  icon: string
}

export const badges: Badge[] = [
  { id: 'first-steps', title: 'Первый шот', desc: 'Заверши первый день в приложении', icon: '◉' },
  { id: 'ttk-10', title: 'Десятка в голове', desc: 'Отметь «знаю» 10 рецептов ТТК', icon: '▤' },
  { id: 'ttk-40', title: 'Половина меню', desc: 'Отметь «знаю» 40 рецептов ТТК', icon: '▦' },
  { id: 'ttk-all', title: 'Меню в руках', desc: 'Выучи все 79 рецептов', icon: '★' },
  { id: 'quiz-80', title: 'Точный как весы', desc: 'Набери 80%+ в квизе ТТК', icon: '◎' },
  { id: 'blitz-hero', title: 'Блиц-гроза', desc: '8+ верных ответов в «Час пик»', icon: '⚡' },
  { id: 'exam-service', title: 'Гость доволен', desc: 'Закрой блок экзамена «Сервис»', icon: '☺' },
  { id: 'exam-full', title: 'Аттестован', desc: 'Пройди все 4 блока экзамена', icon: '✦' },
  { id: 'streak-3', title: 'Три смены подряд', desc: 'Стрик 3 дня', icon: '≋' },
  { id: 'streak-7', title: 'Неделя на баре', desc: 'Стрик 7 дней', icon: '♨' },
  { id: 'rush-6', title: 'Машина потока', desc: 'Обслужи 6+ гостей в Rush-симуляторе', icon: '➤' },
  { id: 'clean-station', title: 'Чистая группа', desc: 'Закрой чек-лист гигиены полностью', icon: '✳' },
  { id: 'shift-open', title: 'Открыл смену', desc: 'Выполни чек-лист открытия', icon: '☀' },
  { id: 'quest-day', title: 'План выполнен', desc: 'Закрой все квесты дня', icon: '✔' },
]

export interface QuestTemplate {
  id: string
  title: string
  target: number
  xp: number
  metric: 'known' | 'quiz' | 'blitz' | 'checklist' | 'rush' | 'lesson'
}

export const questPool: QuestTemplate[] = [
  { id: 'q-known-3', title: 'Выучи 3 рецепта ТТК', target: 3, xp: 40, metric: 'known' },
  { id: 'q-quiz-1', title: 'Пройди квиз по ТТК', target: 1, xp: 30, metric: 'quiz' },
  { id: 'q-blitz-6', title: '6 верных ответов в блице', target: 6, xp: 50, metric: 'blitz' },
  { id: 'q-check-1', title: 'Закрой один чек-лист дисциплины', target: 1, xp: 35, metric: 'checklist' },
  { id: 'q-rush-4', title: 'Обслужи 4 гостей в Rush', target: 4, xp: 45, metric: 'rush' },
  { id: 'q-lesson-1', title: 'Изучи методику из библиотеки', target: 1, xp: 25, metric: 'lesson' },
]

export function rankFor(xp: number): { current: Rank; next: Rank | null; into: number; span: number } {
  let current = ranks[0]
  let next: Rank | null = null
  for (let i = 0; i < ranks.length; i++) {
    if (xp >= ranks[i].xp) current = ranks[i]
    else {
      next = ranks[i]
      break
    }
  }
  const span = next ? next.xp - current.xp : 1
  const into = next ? xp - current.xp : 1
  return { current, next, into, span }
}
