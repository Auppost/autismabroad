# Тренды UI/UX 2026 — рабочая выжимка

Собрано в августе 2026. Только то, что применимо, с пометкой применимости к этому проекту.
Источники — в конце.

## Главный сдвиг: от аттракциона к спокойствию

Доминирующая линия 2026 — **calm interfaces**: интерфейс, снижающий когнитивную
нагрузку. Движение объясняет, а не развлекает. Типографика дышит. ИИ спрашивает,
прежде чем ответить. «Визуальная театральность» (параллаксы ради параллаксов,
бесконечные скролл-эффекты) читается как признак нулевых годов индустрии.

→ Для autismabroad это не тренд, а требование. Совпадение полное.

## Второй, встречный полюс: tactile brutalism

Одновременно растёт противоположное — сырая геометрия, агрессивный контраст,
имитация физических текстур (бумага, зерно, печать). Смысл движения —
**доказать человеческое авторство** в мире, где всё выглядит сгенерированным.
Сюда же: возврат выразительных дисплейных засечных (Denton и подобные),
кинетическая типографика, рисунки/скетчи от руки.

→ Применимо дозированно: текстура и живая иллюстрация — да, агрессивный
контраст и «шум» — нет, аудитория сенсорно чувствительна.

## Типографика

- Определяющий тренд года — **возвращение засечных**: не тихих книжных,
  а громких, выразительных, местами абсурдных дисплейных.
- **Вариативные шрифты** стали нормой: один файл, непрерывные оси
  (weight 100–900, width, slant, optical size). Позволяют точно настраивать
  начертание под брейкпоинт вместо прыжков между статическими весами.
- Замена Inter — самый быстрый способ уйти от генерик-вида.
  Ходовые альтернативы: **Source Sans 3** (теплее Inter, для длинных текстов),
  **Plus Jakarta Sans** (чуть характерные формы, хорош в заголовках),
  **DM Sans** (округлее, теплее). Классическая пара «гротеск + засечная»
  (например текстовый гротеск + Lora/Fraunces в заголовках) по-прежнему работает.

## Доверие вместо тёмных паттернов

Тёмные паттерны уходят из мейнстрима — частично из-за регуляторики, частично
потому что перестали работать. Trust-based UX: явное согласие, честные цены,
отсутствие ложной срочности, понятный отказ. ИИ в интерфейсе — «копилот»,
который виден, опционален и объясняет источник, а не «автопилот».

## Доступность как инфраструктура

European Accessibility Act действует с 28 июня 2025; 2026 — первый полный год
надзора во всех 27 странах ЕС. Первые иски поданы во Франции в ноябре 2025,
штрафы по странам от ~60 тыс. € (Ирландия) до ~900 тыс. € (Швеция).
Действующая планка гармонизированного стандарта EN 301 549 — **WCAG 2.1 AA**;
версия с WCAG 2.2 готовится к публикации, поэтому целиться разумно сразу в 2.2.

Реальность: по анализу миллиона главных страниц (WebAIM, 2026) средняя
домашняя страница содержит **56 детектируемых ошибок доступности**; чаще всего —
низкий контраст текста и отсутствующие label у полей ввода.

### Когнитивная доступность / нейроотличия
Ядро рекомендаций одинаково для аутизма, СДВГ, дислексии и сенсорной
чувствительности:
- постоянное меню, одинаковое везде;
- информация нарезана на куски, минимум анимации;
- пользователь управляет отображением (размер, контраст, раскрытие блоков);
- показывать только то, что нужно для текущей задачи;
- видео и аудио **выключены по умолчанию** — неожиданный звук или движение
  физически болезненны при сенсорной чувствительности;
- прямой, буквальный язык; явная визуальная иерархия.
Прямо поддерживающие критерии WCAG 2.2: 2.4.6 (Headings and Labels),
3.2.3 (Consistent Navigation), 3.3.2 (Labels or Instructions).

## Технологическая база

**Готово к продакшену (baseline, без полифилов):** `:has()`, container queries,
нативный нестинг, `@layer`, `oklch()`, `text-wrap: balance/pretty`.
На практике заменяет сотни строк: container queries вместо каскада медиазапросов,
`:has()` вместо JS, переключающего классы на родителе, нестинг вместо Sass.

**Прогрессивное улучшение (деградирует само, можно включать сейчас):**
same-document и **MPA view transitions** (`@view-transition { navigation: auto }`),
скролл-анимации (`animation-timeline: scroll() / view()`) — в 2026 Firefox и
Safari довезли поддержку, префиксы не нужны.

## Движение

Тренд — минималистичная функциональная анимация. Ориентир: **3–5 микроанимаций
на страницу** воспринимаются как «дорого», 20 конкурирующих — как хаос.
Каждая анимация служит ровно одной цели. `ease-out` на появление, `ease-in`
на уход, кастомные `cubic-bezier` для характера; пружинная физика
(типовые параметры stiffness ≈ 450, damping ≈ 30) для отклика кнопок.
`prefers-reduced-motion` — стандарт де-факто, не опция.

## Производительность

Пороги Core Web Vitals неизменны: **LCP < 2.5 с, INP < 200 мс, CLS < 0.1**,
все три на 75-м перцентиле. INP — самая проваливаемая метрика 2026:
43% сайтов не укладываются в 200 мс. Порог LCP проходят лишь ~62% мобильных
сайтов. Четыре самых результативных исправления LCP: preload изображений,
инлайн критического CSS, preload шрифтов с `display: swap`, серверный рендеринг.
Скорость дополнительно важна как фактор и для SEO, и для цитируемости в LLM.

## Что считается AI-слопом

Кластер дефолтов, к которым ИИ-инструменты приходят без указаний:
фиолетово-синие градиенты, Inter/Roboto, центрированный hero с тремя карточками,
нетронутые компоненты shadcn, `rounded-2xl shadow-lg` на всём, глассморфизм
по рефлексу, иконка в скруглённом квадрате, равномерный `gap-4`/`p-6`,
`fade-in-up` на каждом элементе, затёртые иконки lucide (`Sparkles`, `Zap`,
`ArrowRight`), эмодзи-буллеты, градиентные заглушки, DiceBear-аватарки,
трёхуровневые тарифы, футер в четыре колонки, нулевая асимметрия.

**Причина слопа — не плохой промпт, а отсутствие решения.** Когда никто не задал
направление, модель уходит в статистическую середину. Лечится не уговорами,
а зафиксированной дизайн-системой: типографика, палитра (ограниченная),
спейсинг и радиусы, соглашения по компонентам, правила раскладки, явный
раздел «не использовать», и описание характера с референсами.

---

## Источники

- [UX/UI design trends for 2026: calm interfaces, transparent AI and the end of visual theatrics — Envato](https://elements.envato.com/learn/ux-ui-design-trends)
- [The Top UX/UI Trends in 2026 — WebFX](https://www.webfx.com/blog/web-design/ux-ui-trends/)
- [Web Design Trends 2026: Brutalist UX & Invisible Logic — Fireart Studio](https://fireart.studio/blog/the-best-web-design-trends/)
- [What's Next: 7 UI Design Trends of 2026 — Tubik Studio](https://tubikstudio.com/blog/ui-design-trends-2026/)
- [avoid-ai-design — Claude Code skill, GitHub](https://github.com/funboy322/avoid-ai-design)
- [How to Avoid AI Slop When Using Claude Design — MindStudio](https://www.mindstudio.ai/blog/claude-design-avoid-ai-slop-design-system)
- [AI Slop Web Design: Complete Guide — 925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [How to design without generic AI slop — Varun Choraria](https://www.varunchoraria.com/how-to-design-without-ai-slop/)
- [Breaking rules and bringing joy: top typography trends for 2026 — Creative Bloq](https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026)
- [Why variable fonts are winning in 2026 — Kittl](https://www.kittl.com/blogs/why-variable-fonts-are-winning-fnt/)
- [Best Fonts for Web Design in 2026 — LaunchNow](https://launchnow.design/blog/best-fonts-for-web-design-in-2026)
- [The State of CSS in 2026 — CoderCops](https://www.codercops.com/blog/state-of-css-2026)
- [The Interop 2026 Update: features finally safe to use — DualMedia](https://www.dualmedia.com/interop-2026-features/)
- [The Modern CSS Toolkit: What Actually Matters in 2026 — Nick Paolini](https://www.nickpaolini.com/blog/modern-css-toolkit-2026)
- [EAA Compliance Guide 2026 — Accessibility Checker](https://www.accessibilitychecker.org/guides/eaa-compliance/)
- [European Accessibility Act 2026 — Level Access](https://www.levelaccess.com/compliance-overview/european-accessibility-act-eaa/)
- [Digital Accessibility in 2026 — Internet Pros](https://internet-pros.com/blog/digital-accessibility-wcag-european-accessibility-act-2026/)
- [The Principles of Neurodivergent UX Design — Accessibility Checker](https://www.accessibilitychecker.org/blog/neurodivergent-ux-design/)
- [Neurodiversity and UX: Essential Resources for Cognitive Accessibility — Stéphanie Walter](https://stephaniewalter.design/blog/neurodiversity-and-ux-essential-resources-for-cognitive-accessibility/)
- [Designing for Neurodivergent Users: 8 Practical Tips — accessiBe](https://accessibe.com/blog/knowledgebase/how-to-design-digital-environments-for-people-with-neuro-divergency)
- [CSS Micro Animations & Micro-Interactions: Complete Guide 2026 — SkillValix](https://www.skillvalix.com/blog/css-animations-micro-interactions-guide)
- [UI Micro-Animations in 2026 — Sohel Malek](https://sohelmalek.com/blog/ui-micro-animations-high-converting-websites-2026/)
- [Core Web Vitals 2026: INP, LCP & CLS Optimization — Digital Applied](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)
- [What Are the Core Web Vitals? (2026) — corewebvitals.io](https://www.corewebvitals.io/core-web-vitals)
