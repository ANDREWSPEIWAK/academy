export interface LocalText { ru: string; en: string }
export interface Recipe {
  id: string
  name: string
  category: string
  recipe: LocalText
  taste: LocalText
  method: LocalText
  steps: { ru: string[]; en: string[] }
}
export interface TtkCategory { id: string; title: string; kicker: string }
export const ttkCategories: TtkCategory[] = [
 {
  "id": "espresso",
  "title": "Эспрессо",
  "kicker": "Шот и молоко"
 },
 {
  "id": "filter",
  "title": "Фильтр",
  "kicker": "Альтернатива"
 },
 {
  "id": "special",
  "title": "Спецкофе",
  "kicker": "Авторские"
 },
 {
  "id": "matcha",
  "title": "Матча",
  "kicker": "Чай"
 },
 {
  "id": "smoothie",
  "title": "Смузи",
  "kicker": "Блендер"
 },
 {
  "id": "lemonade",
  "title": "Лимонады",
  "kicker": "Холодные"
 },
 {
  "id": "icetea",
  "title": "Айс-ти",
  "kicker": "Чай"
 },
 {
  "id": "shake",
  "title": "Шейки",
  "kicker": "Фраппе"
 },
 {
  "id": "chocolate",
  "title": "Какао",
  "kicker": "Шоколад"
 },
 {
  "id": "cocktail",
  "title": "Коктейли",
  "kicker": "Бар"
 },
 {
  "id": "juice",
  "title": "Фреш",
  "kicker": "Соки"
 },
 {
  "id": "wine",
  "title": "Вино",
  "kicker": "Бокал"
 },
 {
  "id": "other",
  "title": "Другое",
  "kicker": "Меню"
 },
 {
  "id": "icecream",
  "title": "Мороженое",
  "kicker": "Сервис"
 }
]
export const recipes: Recipe[] = [
 {
  "id": "americano",
  "name": "Americano",
  "category": "espresso",
  "recipe": {
   "ru": "18 г кофе + 140 мл воды",
   "en": "18 g coffee + 140 ml water"
  },
  "taste": {
   "ru": "Насыщенный кофейный напиток с сохранением плотности эспрессо.",
   "en": "A rich coffee drink that preserves the intensity of espresso."
  },
  "method": {
   "ru": "Long Black: сначала горячая вода в чашку, затем эспрессо сверху. Подавать сразу.",
   "en": "Long Black method: pour hot water into the cup first, then espresso on top. Serve immediately; adding the water before the espresso preserves the crema."
  },
  "steps": {
   "ru": [
    "Горячая вода 140 мл в чашку.",
    "Эспрессо 18 г сверху (Long Black) — так держится пенка.",
    "Подавать сразу."
   ],
   "en": [
    "Hot water 140 ml into the cup.",
    "Espresso 18 g on top (Long Black) — this keeps the crema.",
    "Serve immediately."
   ]
  }
 },
 {
  "id": "cappuccino-s",
  "name": "Cappuccino (S)",
  "category": "espresso",
  "recipe": {
   "ru": "20 мл single + 160 мл молока",
   "en": "20 ml single shot + 160 ml milk"
  },
  "taste": {
   "ru": "Плотная текстура и выраженная пена; вкус концентрированнее, баланс смещён к кофе.",
   "en": "Dense texture with pronounced foam; flavor is more concentrated, with the balance shifted toward the coffee."
  },
  "method": {
   "ru": "Взбить молоко до плотной стабильной пены, более выраженной, чем у Flat White. Латте-арт.",
   "en": "Steam the milk to a dense, stable foam, more pronounced than for a Flat White; finish with latte art. Served with latte art."
  },
  "steps": {
   "ru": [
    "Single 20 мл в чашку.",
    "Молоко 160 мл: плотная стабильная пена, гуще чем у Flat White.",
    "Влить и закрыть латте-артом."
   ],
   "en": [
    "Single 20 ml into the cup.",
    "Milk 160 ml: dense, stable foam, thicker than a Flat White.",
    "Pour and finish with latte art."
   ]
  }
 },
 {
  "id": "cappuccino-l",
  "name": "Cappuccino (L)",
  "category": "espresso",
  "recipe": {
   "ru": "18 г + 240 мл молока",
   "en": "18 g + 240 ml milk"
  },
  "taste": {
   "ru": "Более мягкий и молочный; пены визуально больше.",
   "en": "A softer, milkier version; visibly more foam."
  },
  "method": {
   "ru": "Взбить молоко до плотной стабильной пены. Подача с латте-артом.",
   "en": "Steam the milk to a dense, stable foam; finish with latte art. Served with latte art."
  },
  "steps": {
   "ru": [
    "Эспрессо 18 г.",
    "Молоко 240 мл до плотной стабильной пены.",
    "Латте-арт. Сразу гостю."
   ],
   "en": [
    "Espresso 18 g.",
    "Milk 240 ml to a dense, stable foam.",
    "Latte art. Serve at once."
   ]
  }
 },
 {
  "id": "cortado",
  "name": "Cortado",
  "category": "espresso",
  "recipe": {
   "ru": "18 г; эспрессо 34–36 мл + молоко 35–40 мл; 1:1",
   "en": "18 g; espresso 34–36 ml + milk 35–40 ml; ratio 1:1"
  },
  "taste": {
   "ru": "Равные части эспрессо и тёплого вспененного молока; молоко смягчает горечь и кислотность.",
   "en": "Equal parts espresso and warm frothed milk; the milk softens the bitterness and acidity."
  },
  "method": {
   "ru": "Эспрессо, молоко до глянцевой текстуры, аккуратно в стакан. Пропорция 1:1.",
   "en": "Pull the espresso, froth the milk to a glossy texture, and gently add it to the glass. Served in a glass; 1:1 ratio."
  },
  "steps": {
   "ru": [
    "Эспрессо 18 г → 34–36 мл.",
    "Молоко 35–40 мл до глянцевой микропены.",
    "В стакан, 1:1. Без большой шапки пены."
   ],
   "en": [
    "Espresso 18 g → 34–36 ml.",
    "Milk 35–40 ml to a glossy microfoam.",
    "Into a glass, 1:1. No tall foam cap."
   ]
  }
 },
 {
  "id": "espresso",
  "name": "Espresso",
  "category": "espresso",
  "recipe": {
   "ru": "18 г → 34–36 мл; 1:2; 25–30 с",
   "en": "18 g → 34–36 ml; 1:2; 25–30 sec"
  },
  "taste": {
   "ru": "Сбалансированный, с заметной горчинкой и лёгкой кислинкой.",
   "en": "Balanced, with a noticeable bitterness and a light acidity."
  },
  "method": {
   "ru": "Экстракция 25–30 с. Обязательно ложка и стакан воды перед отправкой.",
   "en": "Espresso extraction time: 25–30 sec. Always serve with a spoon and a glass of water."
  },
  "steps": {
   "ru": [
    "18 г → 34–36 мл, 1:2, 25–30 с.",
    "Ложка и стакан воды на поднос.",
    "Подавать сразу."
   ],
   "en": [
    "18 g → 34–36 ml, 1:2, 25–30 sec.",
    "Spoon and a glass of water on the tray.",
    "Serve immediately."
   ]
  }
 },
 {
  "id": "flat-white",
  "name": "Flat White",
  "category": "espresso",
  "recipe": {
   "ru": "18 г; эспрессо/ристретто 18–25 мл + молоко 140 мл; микропена ~0,5 см",
   "en": "18 g; espresso/ristretto 18–25 ml + milk 140 ml; microfoam approx. 0.5 cm"
  },
  "taste": {
   "ru": "Двойной эспрессо/ристретто и горячее молоко с тонким слоем бархатистой микропены.",
   "en": "Double espresso/ristretto with hot milk and a thin layer of velvety microfoam."
  },
  "method": {
   "ru": "Микропена, аккуратно влить, латте-арт. Акцент на тонкий слой, не на шапку.",
   "en": "Steam the milk to a microfoam and gently pour into the coffee; finish with latte art. Focus on a thin microfoam layer and latte art."
  },
  "steps": {
   "ru": [
    "Эспрессо или ристретто 18 г, выход 18–25 мл.",
    "Молоко 140 мл до микропены ~0,5 см.",
    "Влить, латте-арт. Не капучино: пены меньше."
   ],
   "en": [
    "Espresso or ristretto 18 g, yield 18–25 ml.",
    "Milk 140 ml to microfoam ~0.5 cm.",
    "Pour, latte art. Not a cappuccino: less foam."
   ]
  }
 },
 {
  "id": "latte",
  "name": "Latte",
  "category": "espresso",
  "recipe": {
   "ru": "20 мл single + 240 мл молока",
   "en": "20 ml single shot + 240 ml milk"
  },
  "taste": {
   "ru": "Мягкий молочно-кофейный; гладкая текстура, тонкий слой микропены.",
   "en": "A mild, milky coffee drink; smooth texture with a thin layer of microfoam."
  },
  "method": {
   "ru": "Молоко до шелковистой текстуры, выровнять в питчере, плавно влить, латте-арт.",
   "en": "Steam the milk to a smooth, silky texture, level it in the pitcher, and pour gently into the espresso; finish with latte art. Served with latte art."
  },
  "steps": {
   "ru": [
    "Single 20 мл.",
    "Молоко 240 мл: гладкая шелковистая текстура, выровнять в питчере.",
    "Плавно влить. Латте-арт."
   ],
   "en": [
    "Single 20 ml.",
    "Milk 240 ml: smooth silky texture, level in the pitcher.",
    "Pour gently. Latte art."
   ]
  }
 },
 {
  "id": "mocha",
  "name": "Mocha",
  "category": "espresso",
  "recipe": {
   "ru": "18 г кофе + 30 г тёмного шоколада 72% + 120 мл молока + 20 мл сливок 10%",
   "en": "18 g coffee + 30 g dark chocolate (72%) + 120 ml milk + 20 ml cream (10%)"
  },
  "taste": {
   "ru": "Сладкий, выраженно шоколадный, мягкий кофейный; кремовая текстура, ближе к латте.",
   "en": "Sweet and distinctly chocolatey, with a mild coffee character; creamy texture, closer to a latte."
  },
  "method": {
   "ru": "Растворить шоколад в части горячего молока, добавить остальное молоко, затем эспрессо; сверху взбитые сливки.",
   "en": "Dissolve the chocolate base in part of the hot milk, add the remaining milk, then the espresso; top with whipped cream. Served with whipped cream."
  },
  "steps": {
   "ru": [
    "30 г шоколада 72% растворить в части горячего молока.",
    "Остальное молоко 120 мл + эспрессо 18 г.",
    "Сверху 20 мл сливок 10%, взбитых. Сразу."
   ],
   "en": [
    "Dissolve 30 g 72% chocolate in part of the hot milk.",
    "Remaining milk 120 ml + espresso 18 g.",
    "Top with 20 ml whipped 10% cream. Serve at once."
   ]
  }
 },
 {
  "id": "raf",
  "name": "Raf Coffee",
  "category": "espresso",
  "recipe": {
   "ru": "18 г кофе + сироп 15 мл + 220 мл сливок 10%",
   "en": "18 g coffee + syrup 15 ml + 220 ml cream (10%)"
  },
  "taste": {
   "ru": "Сладкий кофейно-сливочный; однородная плотная текстура, десертный вкус.",
   "en": "A sweet coffee-and-cream drink; smooth, dense texture with a dessert-like flavor."
  },
  "method": {
   "ru": "Эспрессо, сливки и сироп прогреть паром и взбить вместе до однородной кремовой текстуры без расслоения. Перелить и сразу подавать.",
   "en": "Combine espresso, cream, and syrup; steam and froth together until smooth and creamy with no separation. Pour into a cup and serve immediately."
  },
  "steps": {
   "ru": [
    "Эспрессо 18 г + сироп 15 мл + сливки 10% 220 мл в питчер.",
    "Прогреть паром и взбить вместе, без расслоения.",
    "Перелить в чашку. Сразу."
   ],
   "en": [
    "Espresso 18 g + syrup 15 ml + 10% cream 220 ml in the pitcher.",
    "Steam and froth together, no separation.",
    "Pour into the cup. Serve at once."
   ]
  }
 },
 {
  "id": "aeropress",
  "name": "Aeropress",
  "category": "filter",
  "recipe": {
   "ru": "18 г кофе + 2 фильтра Aeropress",
   "en": "18 g coffee + 2 AeroPress filters"
  },
  "taste": {
   "ru": "Плотный концентрированный фильтр; ближе к эспрессо по телу, но чище.",
   "en": "A dense, concentrated filter coffee; closer to espresso in body, but cleaner."
  },
  "method": {
   "ru": "Обычная ориентация (не inverted); перемешать 10–15 с; прессовать медленно 40–50 с.",
   "en": "Inverted or classic method; stir for 10–15 sec; press slowly over 40–50 sec. The method is flexible and geared toward a consistent, quick result."
  },
  "steps": {
   "ru": [
    "18 г, два фильтра.",
    "Залить, перемешать 10–15 с.",
    "Прессовать медленно 40–50 с. На станции — обычная ориентация, не inverted."
   ],
   "en": [
    "18 g, two filters.",
    "Add water, stir 10–15 sec.",
    "Press slowly 40–50 sec. On station — classic orientation, not inverted."
   ]
  }
 },
 {
  "id": "batch-s",
  "name": "Batch Brew (S)",
  "category": "filter",
  "recipe": {
   "ru": "Порция 0,25 л · 70 г кофе на 1 л воды",
   "en": "Portion 0.25 L · 70 g coffee per 1 L water"
  },
  "taste": {
   "ru": "Стабильный фильтр партии. Один рецепт на весь батч.",
   "en": "Stable batch filter. One recipe for the whole brew."
  },
  "method": {
   "ru": "Заваривать 70 г/л. Порция 0,25 л.",
   "en": "70 g coffee per liter of water."
  },
  "steps": {
   "ru": [
    "Рецепт батча: 70 г на литр.",
    "Налить 0,25 л. Подавать свежим."
   ],
   "en": [
    "Batch recipe: 70 g per litre.",
    "Pour 0.25 L. Serve fresh."
   ]
  }
 },
 {
  "id": "batch-l",
  "name": "Batch Brew (L)",
  "category": "filter",
  "recipe": {
   "ru": "Порция 0,32 л · 70 г кофе на 1 л воды",
   "en": "Portion 0.32 L · 70 g coffee per 1 L water"
  },
  "taste": {
   "ru": "Та же партия, большая порция.",
   "en": "Same brew, larger pour."
  },
  "method": {
   "ru": "Заваривать 70 г/л. Порция 0,32 л.",
   "en": "70 g coffee per liter of water."
  },
  "steps": {
   "ru": [
    "Рецепт батча: 70 г на литр.",
    "Налить 0,32 л."
   ],
   "en": [
    "Batch recipe: 70 g per litre.",
    "Pour 0.32 L."
   ]
  }
 },
 {
  "id": "cold-brew",
  "name": "Cold Brew",
  "category": "filter",
  "recipe": {
   "ru": "90 г на 1 л · заготовка 1:12,5; выход ~1:10 после удержания воды жмыхом · порция 150–180 мл",
   "en": "90 g per liter. Brew ratio 1:12.5; target yield approximately 1:10 after the grounds absorb some water. Portion: 150–180 ml"
  },
  "taste": {
   "ru": "Мягкий, чистый, без горечи; пониженная кислотность и натуральная сладость.",
   "en": "Smooth, clean, light flavor with no bitterness; lower acidity and natural sweetness."
  },
  "method": {
   "ru": "Крупный помол; холодная фильтрованная вода; 17–24 ч в холодильнике; отфильтровать. Хранение до 5 дней.",
   "en": "Coarse grind; pour cold filtered water over the grounds; steep in the refrigerator for 17–24 hours; strain. Refrigerate for up to 5 days; served cold."
  },
  "steps": {
   "ru": [
    "Крупный помол, 90 г на литр холодной фильтрованной воды (1:12,5).",
    "Настаивать 17–24 ч в холодильнике, отфильтровать (выход ~1:10).",
    "Порция 150–180 мл, холодным. Хранить до 5 дней."
   ],
   "en": [
    "Coarse grind, 90 g per litre of cold filtered water (1:12.5).",
    "Steep 17–24 h in the fridge, strain (yield ~1:10).",
    "Portion 150–180 ml, cold. Keep up to 5 days."
   ]
  }
 },
 {
  "id": "kalita",
  "name": "Kalita Wave",
  "category": "filter",
  "recipe": {
   "ru": "21 г + 1 фильтр Kalita · выход 320 мл",
   "en": "21 g + 1 Kalita filter · 320 ml"
  },
  "taste": {
   "ru": "Плотный, сбалансированный, округлый фильтр; сладость и десертные ноты.",
   "en": "A rich, balanced, round-bodied filter coffee that brings out sweetness and dessert-like notes."
  },
  "method": {
   "ru": "Блум 30–40 г; два пролива: 120 мл, затем 150–160 мл до 320 мл. Ровный пролив, контроль времени.",
   "en": "Bloom with 30–40 g water; then pour evenly in 2 stages: 120 ml, then 150–160 ml, up to 320 ml total. Monitor pour consistency and total brew time."
  },
  "steps": {
   "ru": [
    "21 г, фильтр Kalita Wave 185.",
    "Блум 30–40 г воды.",
    "Пролив 120 мл, затем 150–160 мл до 320 мл. Не лить на стены волны."
   ],
   "en": [
    "21 g, Kalita Wave 185 filter.",
    "Bloom 30–40 g water.",
    "Pour 120 ml, then 150–160 ml to 320 ml. Do not pour on the wave walls."
   ]
  }
 },
 {
  "id": "nitro",
  "name": "Nitro",
  "category": "filter",
  "recipe": {
   "ru": "150 мл Cold Brew · 1 баллон N₂",
   "en": "150 ml Cold Brew · 1 N₂ cartridge"
  },
  "taste": {
   "ru": "Густая кремовая текстура и каскад; мягкий сладковатый вкус без горечи.",
   "en": "A dense, creamy texture with a cascading effect; a mild, slightly sweet flavor with no bitterness."
  },
  "method": {
   "ru": "Cold Brew в сифон, закрыть, зарядить одним баллоном N₂. Хранить в холодильнике до 5 дней.",
   "en": "Pour Cold Brew into a siphon, seal, and charge with one N₂ cartridge. Refrigerate for up to 5 days."
  },
  "steps": {
   "ru": [
    "Залить Cold Brew в сифон, закрыть.",
    "Один баллон N₂.",
    "Порция 150 мл. Холодильник до 5 дней."
   ],
   "en": [
    "Fill the siphon with Cold Brew, seal.",
    "One N₂ cartridge.",
    "Portion 150 ml. Fridge up to 5 days."
   ]
  }
 },
 {
  "id": "v60",
  "name": "V60",
  "category": "filter",
  "recipe": {
   "ru": "18 г + 1 фильтр V60 · выход ~300 мл · 2:45–3:00",
   "en": "18 g + 1 V60 filter · ~300 ml · 2:45–3:00"
  },
  "taste": {
   "ru": "Чистый и яркий фильтр: выше кислотность, прозрачность, ароматика.",
   "en": "A clean, vibrant filter coffee with higher acidity, clarity, and aromatic intensity."
  },
  "method": {
   "ru": "Блум 30–40 г; второй пролив 100 мл; третий 150–160 мл; ~300 мл за 2:45–3:00.",
   "en": "Bloom with 30–40 g water; second pour 100 ml; third pour 150–160 ml; total yield approx. 300 ml over 2:45–3:00. Serve as a pour-over filter coffee."
  },
  "steps": {
   "ru": [
    "18 г, фильтр V60, спираль.",
    "Блум 30–40 г.",
    "Второй пролив 100 мл, третий 150–160 мл. Выход ~300 мл за 2:45–3:00."
   ],
   "en": [
    "18 g, V60 filter, spiral.",
    "Bloom 30–40 g.",
    "Second pour 100 ml, third 150–160 ml. Yield ~300 ml in 2:45–3:00."
   ]
  }
 },
 {
  "id": "blueberry-aero-cloud",
  "name": "Blueberry Aero Cloud",
  "category": "special",
  "recipe": {
   "ru": "Эспрессо 18 г → 54–72 мл (1:3) + лёд 200 г + сироп голубики 20 мл + сливки 10% 20 мл + сливки 26% 30 мл + сахарный сироп 10 мл",
   "en": "Espresso 18 g → 54–72 ml (1:3) + ice 200 g + blueberry syrup 20 ml + cream (10%) 20 ml + cream (26%) 30 ml + sugar syrup 10 ml"
  },
  "taste": {
   "ru": "Холодный кофе с голубикой и воздушным сливочным Cloud.",
   "en": "A cold coffee drink with blueberry and an airy cream Cloud topping."
  },
  "method": {
   "ru": "Эспрессо 1:3 в питчер со 100 г льда + сироп голубики, взбивать до таяния. В стакан со 100 г льда. Cloud: сливки 10% + 26% + сироп, взбить, выложить сверху.",
   "en": "Pour the espresso (1:3) into a pitcher with 100 g of ice, add 20 ml blueberry syrup. Shake until the ice melts. Pour into a glass with 100 g of ice. Cloud: combine cream (10%) 20 ml, cream (26%) 30 ml, and sugar syrup 10 ml; whip and spoon on top."
  },
  "steps": {
   "ru": [
    "Эспрессо 18 г → 54–72 мл (1:3) в питчер со 100 г льда + 20 мл сиропа голубики. Взбивать до таяния.",
    "Перелить в стакан со 100 г льда.",
    "Cloud: 20 мл сливок 10% + 30 мл 26% + 10 мл сахарного сиропа. Взбить, выложить сверху."
   ],
   "en": [
    "Espresso 18 g → 54–72 ml (1:3) into a pitcher with 100 g ice + 20 ml blueberry syrup. Shake until the ice melts.",
    "Pour into a glass with 100 g ice.",
    "Cloud: 20 ml 10% cream + 30 ml 26% + 10 ml sugar syrup. Whip and spoon on top."
   ]
  }
 },
 {
  "id": "espresso-tonic",
  "name": "Espresso Tonic",
  "category": "special",
  "recipe": {
   "ru": "18 г кофе + 1 тоник",
   "en": "18 g coffee + tonic water 1 pc"
  },
  "taste": {
   "ru": "Холодный: кислота тоника и плотность эспрессо, без молока.",
   "en": "Cold: tonic acidity and espresso body, no milk."
  },
  "method": {
   "ru": "Хайбол со льдом → тоник → эспрессо сверху. Сразу.",
   "en": "Highball with ice → tonic → espresso on top. Serve immediately."
  },
  "steps": {
   "ru": [
    "Лёд в хайбол.",
    "Тоник.",
    "Эспрессо 18 г сверху. Сразу, пока слой читается."
   ],
   "en": [
    "Ice in a highball.",
    "Tonic water.",
    "Espresso 18 g on top. Serve at once, while the layer reads."
   ]
  }
 },
 {
  "id": "affogato-latte",
  "name": "Affogato Latte",
  "category": "special",
  "recipe": {
   "ru": "18 г кофе + шоколадное мороженое 80 г + молоко 130 мл",
   "en": "18 g coffee + chocolate ice cream 80 g + milk 130 ml"
  },
  "taste": {
   "ru": "Авторский кофейно-молочный с мороженым. Холодный, слоистый.",
   "en": "A signature coffee-and-milk drink with ice cream."
  },
  "method": {
   "ru": "Лёд и молоко в стакан. В шейкере взбить мороженое с кофе; вылить сверху на молоко.",
   "en": "Ice and milk into the glass. In a shaker, blend the ice cream with the coffee; pour on top of the milk. Served cold, layered."
  },
  "steps": {
   "ru": [
    "Лёд + молоко 130 мл в стакан.",
    "Шейкер: мороженое 80 г + эспрессо 18 г.",
    "Вылить сверху. Слоистая подача."
   ],
   "en": [
    "Ice + milk 130 ml in the glass.",
    "Shaker: ice cream 80 g + espresso 18 g.",
    "Pour on top. Layered serve."
   ]
  }
 },
 {
  "id": "dirty-earl",
  "name": "Dirty Earl",
  "category": "special",
  "recipe": {
   "ru": "Двойной эспрессо + молоко 100 мл + сироп Earl Grey 20 мл + сливки 27% 50 мл + сироп Earl Grey 5 мл",
   "en": "Double espresso + milk 100 ml + Earl Grey syrup 20 ml + cream (27%) 50 ml + Earl Grey syrup 5 ml"
  },
  "taste": {
   "ru": "Авторский кофе: цитрус, кремовая текстура, лёгкая горчинка.",
   "en": "A signature coffee with a citrus note, creamy texture, and light bitterness."
  },
  "method": {
   "ru": "Сироп: 1,5 г Earl Grey / 250 мл воды 5 мин + 200 г сахара. Напиток: лёд + молоко; эспрессо с 20 мл сиропа; сливки взбить с 5 мл сиропа, слоями. Шоколадный порошок.",
   "en": "For the syrup: steep 1.5 g Earl Grey in 250 ml hot water for 5 min, then add 200 g sugar. Drink: ice + milk; mix the espresso with the syrup; whip the cream with 5 ml of syrup; layer together. Garnish with chocolate powder."
  },
  "steps": {
   "ru": [
    "Лёд + молоко 100 мл в стакан.",
    "Эспрессо смешать с 20 мл сиропа Earl Grey, вылить.",
    "Сливки 27% 50 мл взбить с 5 мл сиропа, выложить слоем. Шоколадный порошок."
   ],
   "en": [
    "Ice + milk 100 ml in the glass.",
    "Mix espresso with 20 ml Earl Grey syrup, pour.",
    "Whip 50 ml 27% cream with 5 ml syrup, layer on top. Chocolate powder."
   ]
  }
 },
 {
  "id": "mont-macchiato",
  "name": "Mont Macchiato",
  "category": "special",
  "recipe": {
   "ru": "Cold Brew 50 мл + карамельный сироп 5 г + сливки 10% 20 мл + сливки 27% 20 мл + апельсиновый сок 20 мл",
   "en": "Cold Brew 50 ml + caramel syrup 5 g + cream (10%) 20 ml + cream (27%) 20 ml + orange juice 20 ml"
  },
  "taste": {
   "ru": "Авторский: цитрусовая кислотность, карамельная сладость и кофе.",
   "en": "A signature coffee with citrus acidity, caramel sweetness, and coffee flavor."
  },
  "method": {
   "ru": "Лёд в стакан. Сливки взбить с сиропом и апельсиновым соком; аккуратно на кофе слоем. Цедра.",
   "en": "Ice into the glass. Whip the cream with the syrup and orange juice; pour gently over the coffee as a layer. Garnish with zest. Served layered."
  },
  "steps": {
   "ru": [
    "Лёд + Cold Brew 50 мл в стакан.",
    "Сливки 10% 20 мл + 27% 20 мл взбить с карамельным сиропом 5 г и апельсиновым соком 20 мл.",
    "Вылить слоем. Цедра."
   ],
   "en": [
    "Ice + Cold Brew 50 ml in the glass.",
    "Whip 20 ml 10% cream + 20 ml 27% with 5 g caramel syrup and 20 ml orange juice.",
    "Pour as a layer. Zest."
   ]
  }
 },
 {
  "id": "banana-cloud-matcha",
  "name": "Banana Cloud Matcha",
  "category": "matcha",
  "recipe": {
   "ru": "Банановое пюре 30 г + овсяное молоко 180 мл + Cloud п/ф 40 мл + зелёная матча 2 г",
   "en": "Banana purée 30 g + oat milk 180 ml + Cloud premix 40 ml + green matcha 2 g"
  },
  "taste": {
   "ru": "Сливочная матча, мягкая банановая сладость, воздушная текстура.",
   "en": "A delicate, creamy drink with rich matcha flavor, gentle banana sweetness, and an airy texture. A harmonious blend of matcha's light grassy character and dessert-like banana notes."
  },
  "method": {
   "ru": "Пюре, овсяное молоко и Cloud смешать. Матча отдельно с водой до однородности, аккуратно сверху. Охлаждённым.",
   "en": "Combine the banana purée, oat milk, and Cloud premix in the glass and mix thoroughly. Separately, whisk the matcha with a small amount of water until smooth, and gently add it on top. Serve chilled."
  },
  "steps": {
   "ru": [
    "Банановое пюре 30 г + овсяное 180 мл + Cloud 40 мл. Смешать.",
    "Матча 2 г с малым количеством воды до однородности.",
    "Аккуратно сверху. Подать охлаждённым."
   ],
   "en": [
    "Banana purée 30 g + oat milk 180 ml + Cloud 40 ml. Mix.",
    "Matcha 2 g with a little water until smooth.",
    "Gently on top. Serve chilled."
   ]
  }
 },
 {
  "id": "berry-matcha-latte",
  "name": "Berry Matcha Latte",
  "category": "matcha",
  "recipe": {
   "ru": "Клубничное пюре 20 г + малиновое пюре 20 г + матча 1,5 г + кокосовое молоко 120 мл + лёд 130 г",
   "en": "Strawberry purée 20 g + raspberry purée 20 g + matcha 1.5 g + coconut milk 120 ml + ice 130 g"
  },
  "taste": {
   "ru": "Матча, кокос и ягодная сладость. Только холодный, стандартный размер.",
   "en": "A refreshing drink with matcha, coconut milk, and berry sweetness."
  },
  "method": {
   "ru": "Ягодное пюре → лёд → молоко → готовая матча.",
   "en": "Berry purée → ice → milk → prepared matcha. Cold only, standard size."
  },
  "steps": {
   "ru": [
    "Клубника 20 г + малина 20 г на дно.",
    "Лёд 130 г, кокосовое молоко 120 мл.",
    "Матча 1,5 г сверху. Только холодный."
   ],
   "en": [
    "Strawberry 20 g + raspberry 20 g on the bottom.",
    "Ice 130 g, coconut milk 120 ml.",
    "Matcha 1.5 g on top. Cold only."
   ]
  }
 },
 {
  "id": "bumble-matcha-s",
  "name": "Bumble matcha (S)",
  "category": "matcha",
  "recipe": {
   "ru": "Blue Matcha 1,5 г + вишнёвый сок 160 мл + лёд 180 г",
   "en": "Blue Matcha 1.5 g + cherry juice 160 ml + ice 180 g"
  },
  "taste": {
   "ru": "Горчинка матчи против сладко-кислого сока.",
   "en": "A cold drink: the bitterness of the matcha is balanced by the sweet-and-sour juice."
  },
  "method": {
   "ru": "Матча по базе, соединить с соком. Холодная подача.",
   "en": "Prepare the matcha using the standard method; combine with the juice. Served cold; two sizes available."
  },
  "steps": {
   "ru": [
    "Лёд 180 г.",
    "Вишнёвый сок 160 мл.",
    "Blue Matcha 1,5 г по базе, сверху или смешать."
   ],
   "en": [
    "Ice 180 g.",
    "Cherry juice 160 ml.",
    "Blue Matcha 1.5 g by the house method, on top or mixed."
   ]
  }
 },
 {
  "id": "bumble-matcha-l",
  "name": "Bumble matcha (L)",
  "category": "matcha",
  "recipe": {
   "ru": "Blue Matcha 2 г + вишнёвый сок 240 мл + лёд 180 г",
   "en": "Blue Matcha 2 g + cherry juice 240 ml + ice 180 g"
  },
  "taste": {
   "ru": "Та же логика, больше сока и матчи.",
   "en": "A cold drink: the bitterness of the matcha is balanced by the sweet-and-sour juice."
  },
  "method": {
   "ru": "Матча по базе, соединить с соком. Холодная подача.",
   "en": "Prepare the matcha using the standard method; combine with the juice. Served cold; two sizes available."
  },
  "steps": {
   "ru": [
    "Лёд 180 г.",
    "Вишнёвый сок 240 мл.",
    "Blue Matcha 2 г."
   ],
   "en": [
    "Ice 180 g.",
    "Cherry juice 240 ml.",
    "Blue Matcha 2 g."
   ]
  }
 },
 {
  "id": "coconut-matcha-cloud",
  "name": "Coconut Matcha Cloud",
  "category": "matcha",
  "recipe": {
   "ru": "Матча 2 г + молоко 15 мл + сливки 27% 30 мл + кокосовое молоко 140 мл",
   "en": "Matcha 2 g + regular milk 15 ml + cream (27%) 30 ml + coconut milk 140 ml"
  },
  "taste": {
   "ru": "Холодный cloud: матча-крем на кокосовом молоке.",
   "en": "A cold Cloud drink with matcha cream and coconut milk."
  },
  "method": {
   "ru": "Матча на кокосовом; сливки до плотного крема; смешать матчу с кремом. Стакан со льдом + кокосовое, сверху cloud.",
   "en": "Dilute the matcha with coconut milk; whip the cream to a thick consistency; combine the matcha with the cream. Fill the glass with ice and coconut milk, then top with the Cloud. Served cold."
  },
  "steps": {
   "ru": [
    "Стакан: лёд + кокосовое молоко 140 мл.",
    "Матча 2 г + 15 мл молока, смешать со взбитыми сливками 27% 30 мл.",
    "Cloud сверху."
   ],
   "en": [
    "Glass: ice + coconut milk 140 ml.",
    "Matcha 2 g + 15 ml milk, fold into whipped 27% cream 30 ml.",
    "Cloud on top."
   ]
  }
 },
 {
  "id": "matcha-affogato",
  "name": "Matcha Affogato",
  "category": "matcha",
  "recipe": {
   "ru": "Matcha Green 2 г + шоколадное мороженое 80 г",
   "en": "Matcha Green 2 g + chocolate ice cream 80 g"
  },
  "taste": {
   "ru": "Аффогато: матча вместо эспрессо.",
   "en": "An affogato variation with matcha instead of espresso."
  },
  "method": {
   "ru": "Шар мороженого в чашу, сверху двойная матча. С ложкой.",
   "en": "Place a 100 g scoop of ice cream in the bowl and pour a double portion of matcha on top. Serve with a spoon."
  },
  "steps": {
   "ru": [
    "Мороженое 80–100 г в чашу.",
    "Матча Green 2 г, двойная порция, сверху.",
    "Ложка."
   ],
   "en": [
    "Ice cream 80–100 g in the bowl.",
    "Matcha Green 2 g, double portion, on top.",
    "Spoon."
   ]
  }
 },
 {
  "id": "matcha-latte",
  "name": "Matcha Latte",
  "category": "matcha",
  "recipe": {
   "ru": "Matcha Green 2 г + молоко 240 мл",
   "en": "Matcha Green 2 g + milk 240 ml"
  },
  "taste": {
   "ru": "Мягкий кремовый; горчинка матчи закрыта молоком.",
   "en": "A smooth, creamy flavor; the bitterness of the matcha is balanced by the milk."
  },
  "method": {
   "ru": "Двойная матча по базе, соединить с молоком. Горячая молочная подача.",
   "en": "Prepare a double portion of matcha using the standard method and combine with the milk. Served hot, with milk."
  },
  "steps": {
   "ru": [
    "Матча Green 2 г по базе.",
    "Молоко 240 мл.",
    "Соединить. Горячая подача."
   ],
   "en": [
    "Matcha Green 2 g by the house method.",
    "Milk 240 ml.",
    "Combine. Serve hot."
   ]
  }
 },
 {
  "id": "matcha-tonic",
  "name": "Matcha Tonic",
  "category": "matcha",
  "recipe": {
   "ru": "Matcha Green 2 г + 1 тоник",
   "en": "Matcha Green 2 g + tonic water 1 pc"
  },
  "taste": {
   "ru": "Газированный, нежный, лёгкая горчинка. Только холодный, большой размер.",
   "en": "A sparkling drink with a delicate matcha flavor and a light bitter aftertaste."
  },
  "method": {
   "ru": "Лёд → тоник → матча сверху.",
   "en": "Ice → tonic water → matcha on top. Cold only, large size."
  },
  "steps": {
   "ru": [
    "Лёд.",
    "Тоник.",
    "Матча Green 2 г сверху. Только L, холодный."
   ],
   "en": [
    "Ice.",
    "Tonic water.",
    "Matcha Green 2 g on top. Large, cold only."
   ]
  }
 },
 {
  "id": "berry-mix",
  "name": "Berry Mix",
  "category": "smoothie",
  "recipe": {
   "ru": "Клубника 100 г + малина 40 г + черника 60 г + кокосовое молоко 140 г",
   "en": "Strawberry 100 g + raspberry 40 g + blueberry 60 g + coconut milk 140 g"
  },
  "taste": {
   "ru": "Яркий сладкий ягодный. Холодный.",
   "en": "Bold, sweet berry flavor; a cold berry drink."
  },
  "method": {
   "ru": "Все ягоды замороженные. Блендер до однородности. Большой стакан.",
   "en": "All berries used frozen; blend until smooth. Large glass."
  },
  "steps": {
   "ru": [
    "Замороженные ягоды + кокосовое молоко 140 г.",
    "Блендер до однородности.",
    "Большой стакан."
   ],
   "en": [
    "Frozen berries + coconut milk 140 g.",
    "Blend until smooth.",
    "Large glass."
   ]
  }
 },
 {
  "id": "green-glow",
  "name": "Green Glow",
  "category": "smoothie",
  "recipe": {
   "ru": "Киви 80 г + яблоко 100 г + шпинат 20 г + кокосовая вода 180 г + лайм 20 г",
   "en": "Kiwi 80 g + apple 100 g + spinach 20 g + coconut water 180 g + lime 20 g"
  },
  "taste": {
   "ru": "Кисло-сладкий фруктово-зелёный профиль.",
   "en": "A refreshing, tangy-sweet fruit-and-greens profile."
  },
  "method": {
   "ru": "Киви и яблоко заморозить. Блендер до однородности. Большой стакан.",
   "en": "Freeze the kiwi and apple; blend all ingredients until smooth. Large glass."
  },
  "steps": {
   "ru": [
    "Замороженные киви и яблоко + шпинат + кокосовая вода + лайм.",
    "Блендер.",
    "Большой стакан."
   ],
   "en": [
    "Frozen kiwi and apple + spinach + coconut water + lime.",
    "Blend.",
    "Large glass."
   ]
  }
 },
 {
  "id": "tropic-rise",
  "name": "Tropic Rise",
  "category": "smoothie",
  "recipe": {
   "ru": "Банан 50 г + апельсин 1 шт. + ананас 150 г + молоко 120 мл",
   "en": "Banana 50 g + orange 1 pc. + pineapple 150 g + milk 120 ml"
  },
  "taste": {
   "ru": "Густой холодный фруктовый. Для жары.",
   "en": "A thick, cold fruit drink; cooling and well suited to hot weather."
  },
  "method": {
   "ru": "Фрукты заморозить. Блендер до однородности. Большой стакан.",
   "en": "Freeze the fruit; blend all ingredients until smooth. Large glass."
  },
  "steps": {
   "ru": [
    "Замороженные фрукты + молоко 120 мл.",
    "Блендер до однородности.",
    "Большой стакан."
   ],
   "en": [
    "Frozen fruit + milk 120 ml.",
    "Blend until smooth.",
    "Large glass."
   ]
  }
 },
 {
  "id": "pineapple-lime",
  "name": "Pineapple Lime Lemonade",
  "category": "lemonade",
  "recipe": {
   "ru": "Лаймовый сироп 20 г + ананасовое пюре 30 г + лимон бар п/ф 15 мл + лёд 180 г + Shoonch 0,5 шт.",
   "en": "Lime syrup 20 g + pineapple purée 30 g + lemon bar premix 15 ml + ice 180 g + Shoonch 0.5 pc"
  },
  "taste": {
   "ru": "Тропический лимонад: ананас, лайм, лёгкая цитрусовая кислота.",
   "en": "A vibrant tropical lemonade with juicy pineapple, fresh lime, and a light citrus tang. Refreshing, fruity, and well balanced."
  },
  "method": {
   "ru": "Сироп, пюре, лимонный п/ф и Shoonch в стакане, смешать, добавить лёд, ещё раз.",
   "en": "Combine the lime syrup, pineapple purée, lemon bar premix, and Shoonch in the glass; stir until smooth, add ice, and stir again."
  },
  "steps": {
   "ru": [
    "Сироп 20 г + пюре 30 г + лимон 15 мл + Shoonch 0,5. Смешать.",
    "Лёд 180 г, перемешать ещё раз.",
    "Холодная подача."
   ],
   "en": [
    "Syrup 20 g + purée 30 g + lemon premix 15 ml + Shoonch 0.5. Mix.",
    "Ice 180 g, stir again.",
    "Serve cold."
   ]
  }
 },
 {
  "id": "grapefruit-basil",
  "name": "Grapefruit basil",
  "category": "lemonade",
  "recipe": {
   "ru": "Cordial grapefruit basil 60 мл + Shoonch 0,5 шт. + лимон бар п/ф 15 мл",
   "en": "Grapefruit basil cordial 60 ml + Shoonch 0.5 pc. + lemon bar premix 15 ml"
  },
  "taste": {
   "ru": "Цитрус, лёгкая горчинка грейпфрута, базилик.",
   "en": "A refreshing citrus lemonade with the characteristic light bitterness of grapefruit and fragrant herbal basil notes. Bright, fresh, and balanced."
  },
  "method": {
   "ru": "Cordial, лимонный п/ф и Shoonch смешать, лёд, аккуратно перемешать.",
   "en": "Combine the grapefruit basil cordial, lemon bar premix, and Shoonch in the glass; stir, add ice, and stir gently again."
  },
  "steps": {
   "ru": [
    "Cordial 60 мл + лимон 15 мл + Shoonch 0,5.",
    "Смешать, добавить лёд.",
    "Аккуратно ещё раз."
   ],
   "en": [
    "Cordial 60 ml + lemon premix 15 ml + Shoonch 0.5.",
    "Stir, add ice.",
    "Stir gently again."
   ]
  }
 },
 {
  "id": "lavender-lychee",
  "name": "Lavender Lychee",
  "category": "lemonade",
  "recipe": {
   "ru": "Cordial lychee lavender 60 мл + лимон бар п/ф 15 мл + Shoonch 0,5 шт.",
   "en": "Lychee lavender cordial 60 ml + lemon bar premix 15 ml + Shoonch 0.5 pc"
  },
  "taste": {
   "ru": "Личи и тонкая лаванда. Лёгкий, элегантный.",
   "en": "A delicate, fragrant lemonade with the soft sweetness of lychee and subtle floral lavender notes. Light, refreshing, and elegant."
  },
  "method": {
   "ru": "Cordial, лимонный п/ф и Shoonch смешать, лёд, аккуратно.",
   "en": "Combine the lychee lavender cordial, lemon bar premix, and Shoonch in the glass; stir, add ice, and stir gently again."
  },
  "steps": {
   "ru": [
    "Cordial 60 мл + лимон 15 мл + Shoonch 0,5.",
    "Смешать, лёд.",
    "Аккуратно перемешать."
   ],
   "en": [
    "Cordial 60 ml + lemon premix 15 ml + Shoonch 0.5.",
    "Stir, add ice.",
    "Stir gently."
   ]
  }
 },
 {
  "id": "strawberry-lime",
  "name": "Strawberry Lime",
  "category": "lemonade",
  "recipe": {
   "ru": "Cordial strawberry mint 60 мл + лимон бар п/ф 15 мл + Shoonch 0,5 шт.",
   "en": "Strawberry mint cordial 60 ml + lemon bar premix 15 ml + Shoonch 0.5 pc"
  },
  "taste": {
   "ru": "Клубника, мята, яркая цитрусовая кислота.",
   "en": "A juicy, fruity lemonade with rich strawberry flavor, fresh mint notes, and bright citrus tang. Refreshing and aromatic."
  },
  "method": {
   "ru": "Cordial, лимонный п/ф и Shoonch смешать, лёд, аккуратно.",
   "en": "Combine the strawberry mint cordial, lemon bar premix, and Shoonch in the glass; stir, add ice, and stir gently again."
  },
  "steps": {
   "ru": [
    "Cordial 60 мл + лимон 15 мл + Shoonch 0,5.",
    "Смешать, лёд.",
    "Аккуратно перемешать."
   ],
   "en": [
    "Cordial 60 ml + lemon premix 15 ml + Shoonch 0.5.",
    "Stir, add ice.",
    "Stir gently."
   ]
  }
 },
 {
  "id": "berry-mix-lemonade",
  "name": "Berry Mix Lemonade",
  "category": "lemonade",
  "recipe": {
   "ru": "Сироп клубника 10 г + малина 10 г + голубика 20 г + лимонный сок 15 г + лёд 150 г + газированная вода",
   "en": "Strawberry syrup 10 g + raspberry syrup 10 g + blueberry syrup 20 g + lemon juice 15 g + ice 150 g + sparkling water"
  },
  "taste": {
   "ru": "Ягодный лимонад, сбалансированный микс.",
   "en": "A balanced berry lemonade for fans of mixed-berry flavors."
  },
  "method": {
   "ru": "Собрать со льдом и газированной водой. Холодная подача.",
   "en": "Combine the ingredients with ice and sparkling water. Served cold."
  },
  "steps": {
   "ru": [
    "Ягоды и сиропы + лимон 15 г.",
    "Лёд 150 г.",
    "Долить газированную воду."
   ],
   "en": [
    "Berry syrups + lemon 15 g.",
    "Ice 150 g.",
    "Top with sparkling water."
   ]
  }
 },
 {
  "id": "citrus-mix-lemonade",
  "name": "Citrus Mix Lemonade",
  "category": "lemonade",
  "recipe": {
   "ru": "Цитрусовое пюре 40 г + гренадин 10 г + лимонный сок 15 г + лёд 150 г + газированная вода",
   "en": "Citrus purée 40 g + grenadine 10 g + lemon juice 15 g + ice 150 g + sparkling water"
  },
  "taste": {
   "ru": "Цитрусовый лимонад: кислота и сладость.",
   "en": "A citrus lemonade with fruity acidity and sweetness."
  },
  "method": {
   "ru": "Собрать со льдом и газированной водой.",
   "en": "Combine the ingredients with ice and sparkling water. Served cold."
  },
  "steps": {
   "ru": [
    "Пюре 40 г + гренадин 10 г + лимон 15 г.",
    "Лёд 150 г.",
    "Газированная вода."
   ],
   "en": [
    "Purée 40 g + grenadine 10 g + lemon 15 g.",
    "Ice 150 g.",
    "Sparkling water."
   ]
  }
 },
 {
  "id": "lime-mint-refresher",
  "name": "Lime Mint Refresher",
  "category": "lemonade",
  "recipe": {
   "ru": "Лайм с кожурой 30 г + мята 10 г + лимонный сок 35 г + сахарный сироп 20 мл + вода 150 мл",
   "en": "Lime with peel 30 g + mint 10 g + lemon juice 35 g + sugar syrup 20 ml + water 150 ml"
  },
  "taste": {
   "ru": "Кисло-сладкий авторский. Только малая порция.",
   "en": "A refreshing, sweet-and-sour signature drink."
  },
  "method": {
   "ru": "Взбить 1–2 мин; лёд; ещё венчиком; перелить. Только S.",
   "en": "Blend all ingredients for 1–2 min; add ice; whisk again; pour into the glass. Small size only."
  },
  "steps": {
   "ru": [
    "Лайм 30 г, мята 10 г, лимон 35 г, сироп 20 мл, вода 150 мл. Взбить 1–2 мин.",
    "Добавить лёд, ещё раз венчиком.",
    "Перелить. Только малая порция."
   ],
   "en": [
    "Lime 30 g, mint 10 g, lemon 35 g, syrup 20 ml, water 150 ml. Blend 1–2 min.",
    "Add ice, whisk again.",
    "Pour. Small size only."
   ]
  }
 },
 {
  "id": "mango-passion-lemonade",
  "name": "Mango passion fruit lemonade",
  "category": "lemonade",
  "recipe": {
   "ru": "Пюре маракуйи 30 г + сироп манго 20 г + лимонный сок 15 г + лёд 150 г + газированная вода",
   "en": "Passion fruit purée 30 g + mango syrup 20 g + lemon juice 15 g + ice 150 g; sparkling water"
  },
  "taste": {
   "ru": "Фруктовый освежающий лимонад.",
   "en": "A refreshing fruit lemonade."
  },
  "method": {
   "ru": "Собрать со льдом и газированной водой в стакане.",
   "en": "Combine the ingredients with ice and sparkling water in the glass. Served cold."
  },
  "steps": {
   "ru": [
    "Маракуйя 30 г + манго 20 г + лимон 15 г.",
    "Лёд 150 г.",
    "Газированная вода."
   ],
   "en": [
    "Passion fruit 30 g + mango 20 g + lemon 15 g.",
    "Ice 150 g.",
    "Sparkling water."
   ]
  }
 },
 {
  "id": "pear-lemonade",
  "name": "Pear Lemonade",
  "category": "lemonade",
  "recipe": {
   "ru": "Сироп груша 40 г + лимонный сок 15 г + лёд 150 г + газированная вода",
   "en": "Pear syrup 40 g + lemon juice 15 g + ice 150 g + sparkling water"
  },
  "taste": {
   "ru": "Груша и лимонная кислота.",
   "en": "A pear lemonade with lemon acidity."
  },
  "method": {
   "ru": "Собрать со льдом и газированной водой.",
   "en": "Combine the ingredients with ice and sparkling water. Served cold."
  },
  "steps": {
   "ru": [
    "Сироп груша 40 г + лимон 15 г.",
    "Лёд 150 г.",
    "Газированная вода."
   ],
   "en": [
    "Pear syrup 40 g + lemon 15 g.",
    "Ice 150 g.",
    "Sparkling water."
   ]
  }
 },
 {
  "id": "mango-jasmine-ice-tea",
  "name": "Mango Jasmine Ice Tea",
  "category": "icetea",
  "recipe": {
   "ru": "Жасминовый чай 150–180 мл + сироп манго 30 г + лимонный сок 15 г + лёд 150 г",
   "en": "Chilled jasmine tea 150–180 ml + mango syrup 30 g + lemon juice 15 g + ice 150 g"
  },
  "taste": {
   "ru": "Жасмин, манго, лёгкая цитрусовая кислота.",
   "en": "A refreshing iced tea with jasmine aroma, mango, and a light citrus tang."
  },
  "method": {
   "ru": "Лёд, охлаждённый жасминовый чай, сироп манго, лимон. Перемешать.",
   "en": "Add ice, pour in the chilled jasmine tea, mango syrup, and lemon juice. Stir. Served cold."
  },
  "steps": {
   "ru": [
    "Лёд 150 г.",
    "Жасминовый чай 150–180 мл, охлаждённый.",
    "Сироп манго 30 г + лимон 15 г. Перемешать."
   ],
   "en": [
    "Ice 150 g.",
    "Chilled jasmine tea 150–180 ml.",
    "Mango syrup 30 g + lemon 15 g. Stir."
   ]
  }
 },
 {
  "id": "peach-ice-tea",
  "name": "Peach Ice Tea",
  "category": "icetea",
  "recipe": {
   "ru": "Персиковое пюре 20 г + сахарный сироп 15 г + лимонный сок 15 г + Assam 150–180 мл + лёд 150 г",
   "en": "Peach purée 20 g + sugar syrup 15 g + lemon juice 15 g + chilled Assam tea 150–180 ml + ice 150 g"
  },
  "taste": {
   "ru": "Персик и лимон на ассаме.",
   "en": "A refreshing iced tea with peach flavor and a light lemon tang."
  },
  "method": {
   "ru": "Пюре, сироп, лимон, затем охлаждённый Assam и лёд. Перемешать.",
   "en": "Add the peach purée, sugar syrup, and lemon juice, then pour in the chilled Assam tea and add ice. Stir. Served cold."
  },
  "steps": {
   "ru": [
    "Персик 20 г + сахарный сироп 15 г + лимон 15 г.",
    "Охлаждённый Assam 150–180 мл.",
    "Лёд 150 г. Перемешать."
   ],
   "en": [
    "Peach 20 g + sugar syrup 15 g + lemon 15 g.",
    "Chilled Assam 150–180 ml.",
    "Ice 150 g. Stir."
   ]
  }
 },
 {
  "id": "salted-caramel-frappe",
  "name": "Salted Caramel Frappe",
  "category": "shake",
  "recipe": {
   "ru": "Карамельный соус 60 г + эспрессо 19 г + молоко 120 мл + лёд 180 г",
   "en": "Caramel sauce 60 g + espresso 19 g + milk 120 ml + ice 180 g"
  },
  "taste": {
   "ru": "Холодный сливочный фраппе: солёная карамель, кофе, лёгкая сладость.",
   "en": "A cold, creamy frappe with rich salted caramel flavor, coffee, and light sweetness."
  },
  "method": {
   "ru": "В блендер: соус, эспрессо, молоко, лёд. До плотной текстуры без кристаллов. В охлаждённый стакан.",
   "en": "Add the caramel sauce, espresso, milk, and ice to the blender. Blend until smooth and thick, with no large ice crystals remaining. Pour into a chilled glass and serve immediately."
  },
  "steps": {
   "ru": [
    "Блендер: карамель 60 г, эспрессо 19 г, молоко 120 мл, лёд 180 г.",
    "До однородной плотной текстуры, без кристаллов льда.",
    "Охлаждённый стакан. Сразу."
   ],
   "en": [
    "Blender: caramel 60 g, espresso 19 g, milk 120 ml, ice 180 g.",
    "Until smooth and thick, no ice crystals.",
    "Chilled glass. Serve at once."
   ]
  }
 },
 {
  "id": "banana-peanut-caramel",
  "name": "Banana Peanut Caramel",
  "category": "shake",
  "recipe": {
   "ru": "Арахисовая паста 20 г + карамельная паста 30 г + шоколадное мороженое 80 г + молоко 180 мл + банан 1 шт. + лёд 3 кубика",
   "en": "Peanut paste 20 g + caramel paste 30 g + chocolate ice cream 80 g + milk 180 ml + frozen banana 1 pc. + ice 3 cubes"
  },
  "taste": {
   "ru": "Сытный шейк: арахис и банан.",
   "en": "A hearty, refreshing shake with peanut and banana."
  },
  "method": {
   "ru": "Всё в блендер до однородности. Большой стакан.",
   "en": "Blend all ingredients until smooth. Large glass."
  },
  "steps": {
   "ru": [
    "Все ингредиенты в блендер.",
    "До однородности.",
    "Большой стакан."
   ],
   "en": [
    "All ingredients into the blender.",
    "Until smooth.",
    "Large glass."
   ]
  }
 },
 {
  "id": "chocolate-shake",
  "name": "Chocolate shake",
  "category": "shake",
  "recipe": {
   "ru": "Шоколадное мороженое 140 г + молоко 180 мл + лёд 3–6 кубиков",
   "en": "Chocolate ice cream 140 g + milk 180 ml + ice 3–6 cubes"
  },
  "taste": {
   "ru": "Насыщенный шоколад, кремовая текстура.",
   "en": "Rich chocolate flavor and a creamy texture."
  },
  "method": {
   "ru": "Блендер до однородности. Большой стакан.",
   "en": "Blend all ingredients until smooth. Large glass."
  },
  "steps": {
   "ru": [
    "Мороженое 140 г + молоко 180 мл + лёд.",
    "Блендер.",
    "Большой стакан."
   ],
   "en": [
    "Ice cream 140 g + milk 180 ml + ice.",
    "Blend.",
    "Large glass."
   ]
  }
 },
 {
  "id": "vanilla-shake",
  "name": "Vanilla shake",
  "category": "shake",
  "recipe": {
   "ru": "Ванильное мороженое 140 г + молоко 180 мл + лёд 3–6 куб. + ваниль 1 г",
   "en": "Vanilla ice cream 140 g + milk 180 ml + ice 3–6 cubes + vanilla 1 g"
  },
  "taste": {
   "ru": "Сливочный ванильный милкшейк.",
   "en": "A creamy vanilla milkshake with a soft, dessert-like texture."
  },
  "method": {
   "ru": "Взбить до кремовой консистенции. Сразу.",
   "en": "Blend the vanilla ice cream, milk, vanilla, and ice until smooth and creamy. Serve immediately."
  },
  "steps": {
   "ru": [
    "Мороженое 140 г + молоко 180 мл + ваниль 1 г + лёд.",
    "Блендер до крема.",
    "Сразу."
   ],
   "en": [
    "Ice cream 140 g + milk 180 ml + vanilla 1 g + ice.",
    "Blend to a cream.",
    "Serve at once."
   ]
  }
 },
 {
  "id": "coconut-cacao-cloud",
  "name": "Coconut Cacao Cloud",
  "category": "chocolate",
  "recipe": {
   "ru": "Какао 8 г + сливки 26% 40 мл + вода 20 мл + сахарная пудра 10 г + соль 0,5 г + кокосовая вода 140 мл + лёд 130 г",
   "en": "Cocoa 8 g + cream (26%) 40 ml + water 20 ml + powdered sugar 10 g + salt 0.5 g + coconut water 140 ml + ice 130 g"
  },
  "taste": {
   "ru": "Холодный: шоколадный крем на кокосовой воде. Только стандарт.",
   "en": "A cold drink with a generous amount of cream; chocolate cream plus coconut water."
  },
  "method": {
   "ru": "Какао, пудра, соль + 20 мл кипятка. Сливки отдельно. Стакан: лёд + кокосовая вода, сверху cloud.",
   "en": "Mix the cocoa, powdered sugar, and salt; add 20 ml boiling water. Separately, whip the cream. Fill the glass with ice and coconut water, then top with the cloud. Standard size only."
  },
  "steps": {
   "ru": [
    "Какао 8 г + пудра 10 г + соль 0,5 г заварить 20 мл кипятка.",
    "Сливки 26% 40 мл взбить. Смешать с какао — cloud.",
    "Стакан: лёд 130 г + кокосовая вода 140 мл, cloud сверху. Только стандарт."
   ],
   "en": [
    "Cocoa 8 g + powdered sugar 10 g + salt 0.5 g with 20 ml boiling water.",
    "Whip 40 ml 26% cream. Fold into the cocoa — cloud.",
    "Glass: ice 130 g + coconut water 140 ml, cloud on top. Standard only."
   ]
  }
 },
 {
  "id": "hot-chocolate",
  "name": "Hot Chocolate",
  "category": "chocolate",
  "recipe": {
   "ru": "Шоколад 54% 50 г + 120 мл сливок 10%",
   "en": "Chocolate (54%) 50 g + cream (10%) 120 ml"
  },
  "taste": {
   "ru": "Тёплый согревающий шоколад.",
   "en": "A warm, comforting chocolate drink."
  },
  "method": {
   "ru": "Растворить шоколад. Сливки взбить до ~20% крема и вылить движениями латте-арта. Горячая подача.",
   "en": "Melt the chocolate in boiling water, add salt. Steam the milk to about 20% foam and pour over the chocolate using latte-art movements. Served hot."
  },
  "steps": {
   "ru": [
    "Шоколад 54% 50 г растворить.",
    "Сливки 10% 120 мл взбить до ~20% крема.",
    "Вылить латте-артом. Горячим."
   ],
   "en": [
    "Melt 50 g 54% chocolate.",
    "Steam 120 ml 10% cream to ~20% foam.",
    "Pour with latte-art motion. Serve hot."
   ]
  }
 },
 {
  "id": "aperol-spritz",
  "name": "Aperol Spritz",
  "category": "cocktail",
  "recipe": {
   "ru": "Aperol 70 мл + газированная вода 20 мл + Prosecco 120 мл + сахарный сироп 5 мл + апельсин",
   "en": "Aperol 70 ml + sparkling water 20 ml + Prosecco 120 ml + sugar syrup 5 ml + orange"
  },
  "taste": {
   "ru": "Итальянский аперитив: сладко-горький апельсин и пузырьки.",
   "en": "An Italian aperitivo with a sweet-bitter orange profile and Prosecco bubbles."
  },
  "method": {
   "ru": "Build: лёд → Aperol → вода → сироп → Prosecco; два раза снизу вверх. Долька апельсина.",
   "en": "Build: ice → Aperol → water → syrup → Prosecco; stir gently, 2 turns from bottom to top. Garnish with an orange slice."
  },
  "steps": {
   "ru": [
    "Лёд в бокал.",
    "Aperol 70 мл → вода 20 мл → сироп 5 мл → Prosecco 120 мл.",
    "Два раза снизу вверх. Долька апельсина."
   ],
   "en": [
    "Ice in the glass.",
    "Aperol 70 ml → water 20 ml → syrup 5 ml → Prosecco 120 ml.",
    "Two turns bottom to top. Orange slice."
   ]
  }
 },
 {
  "id": "buzzy-americano",
  "name": "Buzzy Americano",
  "category": "cocktail",
  "recipe": {
   "ru": "Двойной эспрессо + вода 40 мл + Ararat Coffee 20 мл + ванильный сироп 5 мл",
   "en": "Double espresso + water 40 ml + Ararat Coffee 20 ml + vanilla syrup 5 ml"
  },
  "taste": {
   "ru": "Лёгкий алкогольный: мягкий кремовый кофе.",
   "en": "A light signature alcoholic cocktail with a smooth, creamy coffee flavor."
  },
  "method": {
   "ru": "Всё в кувшине со 100 г льда взбить до кремовой массы; влить в rocks с 4 кубиками.",
   "en": "Combine all ingredients in a pitcher with 100 g of ice and whip until creamy; pour into a rocks glass with 4 ice cubes. Served cold."
  },
  "steps": {
   "ru": [
    "Эспрессо, вода 40 мл, Ararat Coffee 20 мл, ваниль 5 мл + 100 г льда. Взбить.",
    "Rocks, 4 кубика льда.",
    "Влить. Холодная подача."
   ],
   "en": [
    "Espresso, water 40 ml, Ararat Coffee 20 ml, vanilla 5 ml + 100 g ice. Whip.",
    "Rocks glass, 4 ice cubes.",
    "Pour. Serve cold."
   ]
  }
 },
 {
  "id": "espresso-beer",
  "name": "Espresso Beer",
  "category": "cocktail",
  "recipe": {
   "ru": "Двойной эспрессо + грейпфрутовое пиво 150 мл",
   "en": "Double espresso + grapefruit beer 150 ml"
  },
  "taste": {
   "ru": "Кофейная горчинка и горько-кислый пивной напиток.",
   "en": "A light alcoholic cocktail with coffee bitterness and the bitter-sour flavor of the beer."
  },
  "method": {
   "ru": "Build: лёд в хайбол, пиво, сверху двойной эспрессо.",
   "en": "Build: ice in a highball glass, the beer, then double espresso on top. Served cold."
  },
  "steps": {
   "ru": [
    "Лёд в хайбол.",
    "Грейпфрутовое пиво 150 мл.",
    "Двойной эспрессо сверху."
   ],
   "en": [
    "Ice in a highball.",
    "Grapefruit beer 150 ml.",
    "Double espresso on top."
   ]
  }
 },
 {
  "id": "espresso-martini",
  "name": "Espresso Martini",
  "category": "cocktail",
  "recipe": {
   "ru": "Двойной эспрессо + водка 40 мл + Kahlua 30 мл + ванильный сироп 5 мл",
   "en": "Double espresso + vodka 40 ml + Kahlúa 30 ml + vanilla syrup 5 ml"
  },
  "taste": {
   "ru": "Классика: густая шелковистая пена.",
   "en": "A classic coffee cocktail with a thick, silky foam."
  },
  "method": {
   "ru": "Шейк: лёд 80% шейкера; 1–2 мин, двойной фильтр; охлаждённый бокал. Три зерна.",
   "en": "Shake: fill the shaker 80% with ice, add the ingredients; shake for 1–2 min, double-strain; pour into a chilled cocktail glass. Garnish with 3 coffee beans."
  },
  "steps": {
   "ru": [
    "Шейкер на 80% льда: эспрессо, водка 40 мл, Kahlua 30 мл, ваниль 5 мл.",
    "Бить 1–2 мин, двойной стрейнер.",
    "Охлаждённый бокал. Три зерна."
   ],
   "en": [
    "Shaker 80% ice: espresso, vodka 40 ml, Kahlúa 30 ml, vanilla 5 ml.",
    "Shake 1–2 min, double-strain.",
    "Chilled cocktail glass. Three coffee beans."
   ]
  }
 },
 {
  "id": "gin-tonic",
  "name": "Gin Tonic",
  "category": "cocktail",
  "recipe": {
   "ru": "London Dry Gin 50 мл + тоник 200 мл + лайм 1/8",
   "en": "London Dry Gin 50 ml + tonic water 200 ml + lime 1/8 wedge"
  },
  "taste": {
   "ru": "Чистый освежающий: ботаника и цитрус.",
   "en": "A classic, clean, refreshing cocktail with botanical and citrus notes."
  },
  "method": {
   "ru": "Easy mix: лёд в rocks, джин, доверху тоник, долька лайма.",
   "en": "Easy mix: ice in a rocks glass, gin, top with tonic water, garnish with a lime wedge. Served in a rocks glass."
  },
  "steps": {
   "ru": [
    "Лёд в rocks.",
    "Джин 50 мл, тоник доверху (~200 мл).",
    "Лайм 1/8."
   ],
   "en": [
    "Ice in a rocks glass.",
    "Gin 50 ml, top with tonic (~200 ml).",
    "Lime 1/8 wedge."
   ]
  }
 },
 {
  "id": "irish-coffee",
  "name": "Irish Coffee",
  "category": "cocktail",
  "recipe": {
   "ru": "Виски 40 мл + коричневый сахар 10 г + двойной эспрессо + сливки 27% 80 мл + сахарный сироп 5 мл",
   "en": "Whisky 40 ml + brown sugar 10 g + double espresso + cream (27%) 80 ml + sugar syrup 5 ml"
  },
  "taste": {
   "ru": "Тёплый: виски, карамельная сладость, кремовый слой.",
   "en": "A warm coffee cocktail with whisky, caramel sweetness, and a creamy texture."
  },
  "method": {
   "ru": "Rocks: виски + сахар + горячий эспрессо. Сливки со сиропом взбить, слой сверху. Холодная версия — хайбол со льдом.",
   "en": "In a rocks glass: whisky + sugar + hot espresso. Whip the cream with the syrup and pour gently on top as a layer. For a cold version, use a highball glass with ice. Cream layer on top."
  },
  "steps": {
   "ru": [
    "Виски 40 мл + коричневый сахар 10 г + горячий двойной эспрессо.",
    "Сливки 27% 80 мл взбить с 5 мл сиропа.",
    "Аккуратно слой сверху. Не мешать."
   ],
   "en": [
    "Whisky 40 ml + brown sugar 10 g + hot double espresso.",
    "Whip 80 ml 27% cream with 5 ml syrup.",
    "Gently layer on top. Do not stir."
   ]
  }
 },
 {
  "id": "red-wine-bumble",
  "name": "Red Wine Bumble",
  "category": "cocktail",
  "recipe": {
   "ru": "Двойной эспрессо + красное вино 60 мл + гранатовый сок 90 мл",
   "en": "Double espresso + red wine 60 ml + pomegranate juice 90 ml"
  },
  "taste": {
   "ru": "Лёгкий Bumble: вино и гранат, слой кофе.",
   "en": "A light alcoholic Bumble with a new wine-based variation."
  },
  "method": {
   "ru": "Хайбол: лёд + вино + сок. Эспрессо взбить с 3 кубиками льда до крема, вылить слоями.",
   "en": "In a highball glass: ice + wine + juice. Separately, shake the espresso with 3 ice cubes until creamy and pour on top as a layer. Coffee layer on top."
  },
  "steps": {
   "ru": [
    "Лёд + красное вино 60 мл + гранатовый сок 90 мл.",
    "Эспрессо взбить с 3 кубиками льда до крема.",
    "Вылить слоем сверху."
   ],
   "en": [
    "Ice + red wine 60 ml + pomegranate juice 90 ml.",
    "Shake espresso with 3 ice cubes until creamy.",
    "Pour as a layer on top."
   ]
  }
 },
 {
  "id": "white-wine-bumble",
  "name": "White Wine Bumble",
  "category": "cocktail",
  "recipe": {
   "ru": "Двойной эспрессо + белое вино 60 мл + апельсиновый сок 90 мл",
   "en": "Double espresso + white wine 60 ml + orange juice 90 ml"
  },
  "taste": {
   "ru": "Bumble на белом вине и апельсине.",
   "en": "A light alcoholic Bumble with white wine and orange juice."
  },
  "method": {
   "ru": "Хайбол: лёд + вино + сок. Эспрессо взбить с 3 кубиками, слоями.",
   "en": "In a highball glass: ice + wine + juice. Separately, shake the espresso with 3 ice cubes and pour gently on top as a layer. Coffee layer on top."
  },
  "steps": {
   "ru": [
    "Лёд + белое вино 60 мл + апельсиновый сок 90 мл.",
    "Эспрессо взбить с 3 кубиками льда.",
    "Слой сверху."
   ],
   "en": [
    "Ice + white wine 60 ml + orange juice 90 ml.",
    "Shake espresso with 3 ice cubes.",
    "Layer on top."
   ]
  }
 },
 {
  "id": "grapefruit-s",
  "name": "Grapefruit (S)",
  "category": "juice",
  "recipe": {
   "ru": "200 мл",
   "en": "200 ml"
  },
  "taste": {
   "ru": "Свежевыжатый цитрус.",
   "en": "A refreshing, natural, freshly squeezed citrus drink."
  },
  "method": {
   "ru": "Свежий сок. Спросить про лёд. Стакан до края.",
   "en": "Prepare freshly squeezed juice; offer with or without ice; fill the glass to the rim. Ask the guest for their ice preference."
  },
  "steps": {
   "ru": [
    "Спросить: со льдом или без.",
    "Выжать.",
    "200 мл, до края стакана."
   ],
   "en": [
    "Ask: with ice or without.",
    "Juice.",
    "200 ml, fill to the rim."
   ]
  }
 },
 {
  "id": "grapefruit-l",
  "name": "Grapefruit (L)",
  "category": "juice",
  "recipe": {
   "ru": "280 мл",
   "en": "280 ml"
  },
  "taste": {
   "ru": "Свежевыжатый цитрус, большая порция.",
   "en": "A refreshing, natural, freshly squeezed citrus drink."
  },
  "method": {
   "ru": "Свежий сок. Спросить про лёд. Стакан до края.",
   "en": "Prepare freshly squeezed juice; offer with or without ice; fill the glass to the rim. Ask the guest for their ice preference."
  },
  "steps": {
   "ru": [
    "Спросить про лёд.",
    "Выжать.",
    "280 мл, до края."
   ],
   "en": [
    "Ask about ice.",
    "Juice.",
    "280 ml, fill to the rim."
   ]
  }
 },
 {
  "id": "orange-s",
  "name": "Orange (S)",
  "category": "juice",
  "recipe": {
   "ru": "200 мл",
   "en": "200 ml"
  },
  "taste": {
   "ru": "Свежевыжатый апельсин.",
   "en": "A refreshing, natural, freshly squeezed citrus drink."
  },
  "method": {
   "ru": "До приготовления спросить про лёд. Стакан до края.",
   "en": "Prepare freshly squeezed juice; before preparing, ask the guest whether they would like it with or without ice. Fill the glass to the rim. Ask the guest for their ice preference."
  },
  "steps": {
   "ru": [
    "Спросить про лёд до отжима.",
    "Выжать.",
    "200 мл, до края."
   ],
   "en": [
    "Ask about ice before juicing.",
    "Juice.",
    "200 ml, fill to the rim."
   ]
  }
 },
 {
  "id": "orange-l",
  "name": "Orange (L)",
  "category": "juice",
  "recipe": {
   "ru": "280 мл",
   "en": "280 ml"
  },
  "taste": {
   "ru": "Свежевыжатый апельсин, большая порция.",
   "en": "A refreshing, natural, freshly squeezed citrus drink."
  },
  "method": {
   "ru": "До приготовления спросить про лёд. Стакан до края.",
   "en": "Prepare freshly squeezed juice; before preparing, ask the guest whether they would like it with or without ice. Fill the glass to the rim. Ask the guest for their ice preference."
  },
  "steps": {
   "ru": [
    "Спросить про лёд до отжима.",
    "Выжать.",
    "280 мл, до края."
   ],
   "en": [
    "Ask about ice before juicing.",
    "Juice.",
    "280 ml, fill to the rim."
   ]
  }
 },
 {
  "id": "bolla-chiaretto",
  "name": "Bolla Chiaretto di Bardolino",
  "category": "wine",
  "recipe": {
   "ru": "Порция 0,15 л",
   "en": "Portion: 0.15 L"
  },
  "taste": {
   "ru": "Розе, бокал.",
   "en": "Rosé, by the glass."
  },
  "method": {
   "ru": "Налить 0,15 л.",
   "en": "Pour 0.15 L."
  },
  "steps": {
   "ru": [
    "Бокал.",
    "0,15 л."
   ],
   "en": [
    "Glass.",
    "0.15 L."
   ]
  }
 },
 {
  "id": "bolla-prosecco",
  "name": "Bolla Prosecco",
  "category": "wine",
  "recipe": {
   "ru": "Порция 0,15 л",
   "en": "Portion: 0.15 L"
  },
  "taste": {
   "ru": "Игристое.",
   "en": "Sparkling."
  },
  "method": {
   "ru": "Налить 0,15 л, охлаждённым.",
   "en": "Pour 0.15 L, chilled."
  },
  "steps": {
   "ru": [
    "Охлаждённый бокал.",
    "0,15 л."
   ],
   "en": [
    "Chilled glass.",
    "0.15 L."
   ]
  }
 },
 {
  "id": "bolla-prosecco-rose",
  "name": "Bolla Prosecco Rose",
  "category": "wine",
  "recipe": {
   "ru": "Порция 0,15 л",
   "en": "Portion: 0.15 L"
  },
  "taste": {
   "ru": "Игристое розе.",
   "en": "Sparkling rosé."
  },
  "method": {
   "ru": "Налить 0,15 л, охлаждённым.",
   "en": "Pour 0.15 L, chilled."
  },
  "steps": {
   "ru": [
    "Охлаждённый бокал.",
    "0,15 л."
   ],
   "en": [
    "Chilled glass.",
    "0.15 L."
   ]
  }
 },
 {
  "id": "cantina-white",
  "name": "Cantina di Negrar white",
  "category": "wine",
  "recipe": {
   "ru": "Порция 0,15 л",
   "en": "Portion: 0.15 L"
  },
  "taste": {
   "ru": "Белое.",
   "en": "White, by the glass."
  },
  "method": {
   "ru": "Налить 0,15 л.",
   "en": "Pour 0.15 L."
  },
  "steps": {
   "ru": [
    "Бокал.",
    "0,15 л."
   ],
   "en": [
    "Glass.",
    "0.15 L."
   ]
  }
 },
 {
  "id": "red-wine-bolla",
  "name": "Red Wine Bolla",
  "category": "wine",
  "recipe": {
   "ru": "Порция 0,15 л",
   "en": "Portion: 0.15 L"
  },
  "taste": {
   "ru": "Красное.",
   "en": "Red, by the glass."
  },
  "method": {
   "ru": "Налить 0,15 л.",
   "en": "Pour 0.15 L."
  },
  "steps": {
   "ru": [
    "Бокал.",
    "0,15 л."
   ],
   "en": [
    "Glass.",
    "0.15 L."
   ]
  }
 },
 {
  "id": "toscana-orvieto",
  "name": "Toscana White Orvieto",
  "category": "wine",
  "recipe": {
   "ru": "Порция 0,15 л",
   "en": "Portion: 0.15 L"
  },
  "taste": {
   "ru": "Белое Тоскана / Orvieto.",
   "en": "White Toscana / Orvieto."
  },
  "method": {
   "ru": "Налить 0,15 л.",
   "en": "Pour 0.15 L."
  },
  "steps": {
   "ru": [
    "Бокал.",
    "0,15 л."
   ],
   "en": [
    "Glass.",
    "0.15 L."
   ]
  }
 },
 {
  "id": "tus-white",
  "name": "Tus white",
  "category": "wine",
  "recipe": {
   "ru": "Порция 0,15 л",
   "en": "Portion: 0.15 L"
  },
  "taste": {
   "ru": "Белое.",
   "en": "White, by the glass."
  },
  "method": {
   "ru": "Налить 0,15 л.",
   "en": "Pour 0.15 L."
  },
  "steps": {
   "ru": [
    "Бокал.",
    "0,15 л."
   ],
   "en": [
    "Glass.",
    "0.15 L."
   ]
  }
 },
 {
  "id": "domini-veneti",
  "name": "White Wine Domini Veneti",
  "category": "wine",
  "recipe": {
   "ru": "Порция 0,15 л",
   "en": "Portion: 0.15 L"
  },
  "taste": {
   "ru": "Белое Veneti.",
   "en": "White Veneti."
  },
  "method": {
   "ru": "Налить 0,15 л.",
   "en": "Pour 0.15 L."
  },
  "steps": {
   "ru": [
    "Бокал.",
    "0,15 л."
   ],
   "en": [
    "Glass.",
    "0.15 L."
   ]
  }
 },
 {
  "id": "bumble-s",
  "name": "Bumble (S)",
  "category": "other",
  "recipe": {
   "ru": "20 мл single + сок 160 мл",
   "en": "20 ml single shot coffee + juice 160 ml"
  },
  "taste": {
   "ru": "Эспрессо и фруктовый сок: кислота, сладость, кофе.",
   "en": "A refreshing coffee drink made with espresso and fruit juice. It combines the juice's bright acidity and sweetness with a rich coffee flavor."
  },
  "method": {
   "ru": "Лёд, сок 160 мл, single 20 мл сверху.",
   "en": "Ice, 160 ml chilled juice, 20 ml single on top. Serve immediately."
  },
  "steps": {
   "ru": [
    "Лёд в стакан.",
    "Сок 160 мл, охлаждённый.",
    "Single 20 мл сверху. Сразу."
   ],
   "en": [
    "Ice in the glass.",
    "Juice 160 ml, chilled.",
    "Single 20 ml on top. Serve at once."
   ]
  }
 },
 {
  "id": "bumble-l",
  "name": "Bumble (L)",
  "category": "other",
  "recipe": {
   "ru": "18 г → 36 мл + 240 мл сока",
   "en": "18 g / 36 ml coffee + 240 ml juice"
  },
  "taste": {
   "ru": "Больший Bumble: двойной эспрессо, больше сока.",
   "en": "A larger version of the Bumble with a more pronounced coffee flavor. Cold fruit juice is complemented by double espresso, creating a balance of sweetness and coffee acidity."
  },
  "method": {
   "ru": "Лёд, 240 мл охлаждённого сока, эспрессо 18 г → 36 мл сверху.",
   "en": "Fill the glass with ice, add 240 ml chilled juice, pull an espresso (18 g → 36 ml), and pour it gently over the juice. Serve immediately."
  },
  "steps": {
   "ru": [
    "Лёд.",
    "Сок 240 мл, охлаждённый.",
    "Эспрессо 18 г → 36 мл сверху. Сразу."
   ],
   "en": [
    "Ice.",
    "Juice 240 ml, chilled.",
    "Espresso 18 g → 36 ml on top. Serve at once."
   ]
  }
 },
 {
  "id": "blue-butterfly-latte",
  "name": "Blue Butterfly Latte",
  "category": "other",
  "recipe": {
   "ru": "Blue matcha 2 г + лёд 180 г + молоко 240 мл",
   "en": "Blue matcha 2 g + ice 180 g + milk 240 ml"
  },
  "taste": {
   "ru": "Голубая матча и молоко. Только большой размер.",
   "en": "Blue matcha and milk. Large size only."
  },
  "method": {
   "ru": "Горячий: матча в стакан, молоко до ~20% крема, латте-арт. Холодный: лёд → молоко → голубая матча.",
   "en": "Prepare the blue matcha; pour into the glass; steam the milk to about 20% foam and pour it in using latte-art technique. For the cold version: ice → milk → blue matcha. Large size only."
  },
  "steps": {
   "ru": [
    "Только большой размер.",
    "Холодный: лёд 180 г → молоко 240 мл → Blue matcha 2 г.",
    "Горячий: матча, молоко взбить до ~20% крема, латте-арт."
   ],
   "en": [
    "Large size only.",
    "Cold: ice 180 g → milk 240 ml → Blue matcha 2 g.",
    "Hot: matcha, steam milk to ~20% foam, latte art."
   ]
  }
 },
 {
  "id": "ice-vanilla",
  "name": "Vanilla ice cream",
  "category": "icecream",
  "recipe": {
   "ru": "80 г",
   "en": "80 g"
  },
  "taste": {
   "ru": "Ваниль.",
   "en": "Vanilla."
  },
  "method": {
   "ru": "Один шарик в металлической креманке.",
   "en": "One scoop of ice cream, served in a metal dish."
  },
  "steps": {
   "ru": [
    "Шарик 80 г.",
    "Металлическая креманка."
   ],
   "en": [
    "Scoop 80 g.",
    "Metal dish."
   ]
  }
 },
 {
  "id": "ice-strawberry",
  "name": "Strawberry ice cream",
  "category": "icecream",
  "recipe": {
   "ru": "80 г",
   "en": "80 g"
  },
  "taste": {
   "ru": "Клубника.",
   "en": "Strawberry."
  },
  "method": {
   "ru": "Один шарик в металлической креманке.",
   "en": "One scoop of ice cream, served in a metal dish."
  },
  "steps": {
   "ru": [
    "Шарик 80 г.",
    "Металлическая креманка."
   ],
   "en": [
    "Scoop 80 g.",
    "Metal dish."
   ]
  }
 },
 {
  "id": "ice-chocolate",
  "name": "Chocolate ice cream",
  "category": "icecream",
  "recipe": {
   "ru": "80 г",
   "en": "80 g"
  },
  "taste": {
   "ru": "Шоколад.",
   "en": "Chocolate."
  },
  "method": {
   "ru": "Один шарик в металлической креманке.",
   "en": "One scoop of ice cream, served in a metal dish."
  },
  "steps": {
   "ru": [
    "Шарик 80 г.",
    "Металлическая креманка."
   ],
   "en": [
    "Scoop 80 g.",
    "Metal dish."
   ]
  }
 },
 {
  "id": "ice-pistachio",
  "name": "Pistachio ice cream",
  "category": "icecream",
  "recipe": {
   "ru": "80 г",
   "en": "80 g"
  },
  "taste": {
   "ru": "Фисташка.",
   "en": "Pistachio."
  },
  "method": {
   "ru": "Один шарик в металлической креманке.",
   "en": "One scoop of ice cream, served in a metal dish."
  },
  "steps": {
   "ru": [
    "Шарик 80 г.",
    "Металлическая креманка."
   ],
   "en": [
    "Scoop 80 g.",
    "Metal dish."
   ]
  }
 },
 {
  "id": "ice-cherry-sorbet",
  "name": "Cherry sorbet",
  "category": "icecream",
  "recipe": {
   "ru": "80 г",
   "en": "80 g"
  },
  "taste": {
   "ru": "Вишнёвый сорбет.",
   "en": "Cherry sorbet."
  },
  "method": {
   "ru": "Один шарик в металлической креманке.",
   "en": "One scoop of ice cream, served in a metal dish."
  },
  "steps": {
   "ru": [
    "Шарик 80 г.",
    "Металлическая креманка."
   ],
   "en": [
    "Scoop 80 g.",
    "Metal dish."
   ]
  }
 },
 {
  "id": "ice-lemon-sorbet",
  "name": "Lemon sorbet",
  "category": "icecream",
  "recipe": {
   "ru": "80 г",
   "en": "80 g"
  },
  "taste": {
   "ru": "Лимонный сорбет.",
   "en": "Lemon sorbet."
  },
  "method": {
   "ru": "Один шарик в металлической креманке.",
   "en": "One scoop of ice cream, served in a metal dish."
  },
  "steps": {
   "ru": [
    "Шарик 80 г.",
    "Металлическая креманка."
   ],
   "en": [
    "Scoop 80 g.",
    "Metal dish."
   ]
  }
 },
 {
  "id": "ice-mango-sorbet",
  "name": "Mango sorbet",
  "category": "icecream",
  "recipe": {
   "ru": "80 г",
   "en": "80 g"
  },
  "taste": {
   "ru": "Манго сорбет.",
   "en": "Mango sorbet."
  },
  "method": {
   "ru": "Один шарик в металлической креманке.",
   "en": "One scoop of ice cream, served in a metal dish."
  },
  "steps": {
   "ru": [
    "Шарик 80 г.",
    "Металлическая креманка."
   ],
   "en": [
    "Scoop 80 g.",
    "Metal dish."
   ]
  }
 }
]
