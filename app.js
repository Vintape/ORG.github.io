/* ==========================================================================
   КРАСНЫЙ ЗВОНОК: ВЕЛИКАЯ ЭПОХА СОВЕТСКОГО ОБРАЗОВАНИЯ (1917–1991)
   Interactive Engine: Audio Synthesizer, Timeline, Uniforms, Calculator,
   Backpack & Quiz with Attestat Zrelosti Generator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAudioBell();
  initTimeline();
  initUniforms();
  initBackpack();
  initPriceCalculator();
  initPocketsAndMaterials();
  initArchivalInspectorAndGlossary();
  initQuiz();
  initNavigation();
  initScrollProgress();
  initChalkDustCanvas();
  initHero3DArtifact();
  init3DDesk();
  init3DCardFlips();
  init3DTilt();
  initScrollReveal();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. SOUND SYNTHESIZER: MECHANICAL SOVIET SCHOOL BELL (Web Audio API)
   -------------------------------------------------------------------------- */
let audioCtx = null;

function initAudioBell() {
  const bellBtns = [
    document.getElementById('bell-btn'),
    document.getElementById('footer-bell-btn')
  ].filter(Boolean);

  bellBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSovietSchoolBell();
      triggerBellAnimation(btn);
    });
  });
}

function playSovietSchoolBell() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const now = audioCtx.currentTime;
  const duration = 2.4;

  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.35, now + 0.05);
  masterGain.gain.setValueAtTime(0.35, now + duration - 0.4);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  masterGain.connect(audioCtx.destination);

  // Tremolo (hammer vibration at 18 Hz)
  const tremoloOsc = audioCtx.createOscillator();
  const tremoloGain = audioCtx.createGain();
  tremoloOsc.frequency.setValueAtTime(18, now);
  tremoloGain.gain.setValueAtTime(0.4, now);
  tremoloOsc.connect(tremoloGain.gain);

  // Metallic bell harmonics
  const freqs = [860, 1190, 1580, 2260];
  const weights = [0.4, 0.35, 0.2, 0.05];

  freqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.linearRampToValueAtTime(freq * 1.004, now + duration);
    gain.gain.setValueAtTime(weights[i], now);

    osc.connect(gain);
    gain.connect(tremoloGain);
    osc.start(now);
    osc.stop(now + duration);
  });

  tremoloGain.connect(masterGain);
  tremoloOsc.start(now);
  tremoloOsc.stop(now + duration);
}

function triggerBellAnimation(btn) {
  if (!btn) return;
  btn.style.transform = 'scale(1.1) rotate(6deg)';
  setTimeout(() => {
    btn.style.transform = '';
  }, 280);
}

/* --------------------------------------------------------------------------
   2. TIMELINE: 6 HISTORICAL ERAS (1917–1991)
   -------------------------------------------------------------------------- */
const ERA_DATA = {
  "1917": {
    period: "1917 — 1929 гг.",
    status: "Педагогический авангард и ликбез",
    heading: "Ликвидация безграмотности и слом старой гимназии",
    svg: `
      <svg viewBox="0 0 320 180" class="era-art-svg">
        <rect width="320" height="180" rx="8" fill="#7F0000"/>
        <circle cx="160" cy="90" r="65" fill="#B71C1C" stroke="#FFD54F" stroke-width="2"/>
        <polygon points="160,35 170,70 205,70 178,90 188,125 160,105 132,125 142,90 115,70 150,70" fill="#FFCA28"/>
        <path d="M110,135 Q160,120 210,135" stroke="#FFE082" stroke-width="3" fill="none"/>
        <text x="160" y="160" fill="#FFF8E7" font-size="13" font-family="'Fira Sans Extra Condensed', sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="1">«НЕГРАМОТНЫЙ — ТОТ ЖЕ СЛЕПОЙ»</text>
      </svg>
    `,
    caption: "Плакат Общества «Долой неграмотность!»",
    year: "1920 год",
    quote: "«Мы не рабы, рабы не мы» — первая фраза, которую выводили взрослые рабочие и крестьянки при свете керосиновых ламп в избах-читальнях.",
    author: "— Лозунг первого советского букваря",
    body: `
      <p><strong>Декрет 1918 года</strong> уничтожил сословные привилегии, отделил школу от церкви и провозгласил всеобщее, бесплатное и совместное обучение для мальчиков и девочек. А 26 декабря 1919 года Совнарком подписал исторический декрет: <em>все граждане от 8 до 50 лет были обязаны обучиться грамоте</em>. Для обучающихся рабочий день сокращался на 2 часа с сохранением зарплаты!</p>
      <p>1920-е годы стали временем дерзких педагогических экспериментов: традиционные уроки, оценки, экзамены и учебники отменили! Классы делились на бригады («бригадно-лабораторный метод»), где отвечал один бригадир, а оценку «удовлетворительно» получали все хором. Школами управляли советы учеников. Эксперимент привел к падению фундаментальных знаний, и в 1930-е школу вернули к строгому академическому порядку.</p>
    `,
    facts: [
      { icon: "📜", title: "Общество «Долой неграмотность»", text: "Возглавлял М. И. Калинин. Культармейцы несли книги в самые глухие деревни." },
      { icon: "🛠️", title: "Срок обучения", text: "4 года — начальная школа, 7 лет — ШКМ (крестьянская молодежь), 9 лет — средняя." }
    ],
    archiveTitle: "Декрет СНК РСФСР (26 декабря 1919 г.)",
    archiveList: [
      "★ Ликвидация неграмотности среди 80% населения страны.",
      "★ Создано свыше 40 000 пунктов ликбеза по всему СССР.",
      "★ Достижение 89% грамотности уже к переписи 1939 года."
    ]
  },

  "1930": {
    period: "1930 — 1940 гг.",
    status: "Возврат академического канона",
    heading: "Постановление ЦК 1931 года и великие учебники",
    svg: `
      <svg viewBox="0 0 320 180" class="era-art-svg">
        <rect width="320" height="180" rx="8" fill="#3E2723"/>
        <rect x="70" y="40" width="180" height="100" rx="4" fill="#5D4037" stroke="#8D6E63" stroke-width="3"/>
        <polygon points="90,60 230,60 210,120 70,120" fill="#A1887F"/>
        <circle cx="150" cy="90" r="14" fill="#FFE082"/>
        <text x="160" y="152" fill="#FFE082" font-size="12" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">СТАБИЛЬНЫЙ КАНОН: ПЁРЫШКИН И КИСЕЛЕВ</text>
      </svg>
    `,
    caption: "Классический урок за партами Эрисмана",
    year: "1930-е годы",
    quote: "«Школа должна вооружить учащихся твердыми, систематическими основами наук: математики, физики, химии и родного языка».",
    author: "— Постановление ЦК ВКП(б) от 25 августа 1931 года",
    body: `
      <p>Индустриализации и строительству гигантских заводов срочно требовались миллионы квалифицированных инженеров. Постановлениями 1931–1932 гг. советскую школу вернули к <strong>классно-урочной системе, твердому расписанию, звонкам и стабильным учебникам</strong> (геометрия Киселева, физика Пёрышкина).</p>
      <p>Утверждена трехступенчатая структура: начальная (4 года), неполная средняя (7 лет) и полная средняя (10 лет). В октябре 1940 года временно была введена плата за обучение в 8–10 классах (150–200 рублей в год), чтобы стимулировать молодежь поступать в бесплатные ремесленные училища трудовых резервов (ФЗО) перед надвигающейся войной.</p>
    `,
    facts: [
      { icon: "📚", title: "Золотые учебники", text: "Геометрия Киселева переиздавалась более 40 лет без единой правки." },
      { icon: "⚙️", title: "Училища ФЗО", text: "Бесплатная подготовка токарей и слесарей на полном гособеспечении." }
    ],
    archiveTitle: "Постановление ЦК ВКП(б) от 1931 года",
    archiveList: [
      "★ Окончательный запрет педологических экспериментов.",
      "★ Введение единого классного журнала, расписания и оценок.",
      "★ Формирование фундамента советского инженерного триумфа."
    ]
  },

  "1941": {
    period: "1941 — 1953 гг.",
    status: "Военное время и сталинский ампир",
    heading: "Раздельные школы, золотые медали и пятибалльная шкала",
    svg: `
      <svg viewBox="0 0 320 180" class="era-art-svg">
        <rect width="320" height="180" rx="8" fill="#1B263B"/>
        <circle cx="160" cy="85" r="50" fill="#B71C1C" stroke="#FFD54F" stroke-width="3"/>
        <polygon points="160,45 168,72 196,72 174,88 182,115 160,98 138,115 146,88 124,72 152,72" fill="#FFD54F"/>
        <text x="160" y="156" fill="#FFF8E7" font-size="12" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">ЗОЛОТАЯ МЕДАЛЬ 583 ПРОБЫ (1945 Г.)</text>
      </svg>
    `,
    caption: "Аттестат зрелости и военная закалка",
    year: "1943–1945 гг.",
    quote: "«Победу в Великой Отечественной войне одержал советский школьный учитель».",
    author: "— Исторический афоризм о мужестве выпускников",
    body: `
      <p>В 1943 году в 146 крупных городах СССР ввели <strong>раздельное обучение мальчиков и девочек</strong>. Юношей углубленно готовили к воинской службе, тактике и технике, девушек — к медицине, санитарной помощи и педагогике. Раздельное обучение отменили лишь в 1954 году.</p>
      <p>В 1944 году были утверждены <strong>«Правила для учащихся»</strong> (вставать по стойке смирно при входе учителя, носить форму), введена <strong>цифровая пятибалльная система</strong> (5, 4, 3, 2, 1) и учреждены <strong>золотые медали 583-й пробы</strong> весом 15,6 грамма за окончание школы с отличием.</p>
    `,
    facts: [
      { icon: "🎖️", title: "Золотые медали", text: "Чеканились из чистого золота 583 пробы (до 1954 года)." },
      { icon: "🧠", title: "Логика и Психология", text: "Обязательные предметы в 9–10 классах для культуры научного спора." }
    ],
    archiveTitle: "Постановление СНК СССР (1943–1944 гг.)",
    archiveList: [
      "★ Утверждение обязательного входа учителя под грохот парт.",
      "★ Введение школьного билета с правилами поведения.",
      "★ Комендантский час для учащихся после 20:00 (зимой) и 22:00 (летом)."
    ]
  },

  "1954": {
    period: "1954 — 1964 гг.",
    status: "Оттепель и политехнизация",
    heading: "Отмена платы, совместное обучение и заводская 11-летка",
    svg: `
      <svg viewBox="0 0 320 180" class="era-art-svg">
        <rect width="320" height="180" rx="8" fill="#004D40"/>
        <circle cx="160" cy="80" r="45" fill="#00796B" stroke="#80CBC4" stroke-width="2"/>
        <circle cx="160" cy="80" r="16" fill="#E0F2F1"/>
        <!-- Sputnik orbit -->
        <ellipse cx="160" cy="80" rx="85" ry="32" fill="none" stroke="#FFD54F" stroke-width="2" transform="rotate(-25 160 80)"/>
        <circle cx="230" cy="50" r="5" fill="#FFD54F"/>
        <text x="160" y="152" fill="#E0F2F1" font-size="12" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">ПОЛИТЕХНИКА, КОСМОС И ФИЗМАТЫ</text>
      </svg>
    `,
    caption: "Эра первого Спутника и Гагарина",
    year: "1958 год",
    quote: "«Школа должна готовить не просто к студенческой скамье, а к созидательному труду на заводах и полях Родины!»",
    author: "— Н. С. Хрущев (1958 г.)",
    body: `
      <p>В мае 1956 года постановлением Совета Министров СССР была <strong>полностью и навсегда отменена плата за обучение</strong> в старших классах и вузах. А в декабре 1958 года начался масштабный эксперимент: ввели обязательную <strong>8-летку</strong>, а средняя школа стала <strong>11-летней трудовой политехнической</strong>.</p>
      <p>Старшеклассники 2 дня в неделю проводили на заводах, фабриках и стройках, получая рабочий разряд. Из-за колоссальной физической и умственной перегрузки детей в 1964–1966 годах 11-летку свернули, вернув классическую 10-летку. В этот же период академики Лаврентьев и Колмогоров создали легендарные <strong>физико-математические школы-интернаты (ФМШ)</strong> в Москве и Новосибирске для одаренных детей со всей страны.</p>
    `,
    facts: [
      { icon: "🏭", title: "Заводская практика", text: "Школьники водили тракторы и осваивали фрезерные станки." },
      { icon: "🚀", title: "ФМШ Колмогорова", text: "Специализированные школы для юных гениев физики и математики." }
    ],
    archiveTitle: "Закон СССР от 24 декабря 1958 года",
    archiveList: [
      "★ Переход к обязательному всеобщему 8-летнему образованию.",
      "★ Привилегии при поступлении в ВУЗы абитуриентам со стажем работы от 2 лет.",
      "★ Бурное развитие вечерних школ рабочей молодежи (ШРМ)."
    ]
  },

  "1965": {
    period: "1965 — 1983 гг.",
    status: "Золотой век 10-летки",
    heading: "Стабильная 10-летка, бесплатные учебники и УПК",
    svg: `
      <svg viewBox="0 0 320 180" class="era-art-svg">
        <rect width="320" height="180" rx="8" fill="#780016"/>
        <path d="M120,40 L200,40 L180,130 L140,130 Z" fill="#D32F2F" stroke="#FFD54F" stroke-width="2"/>
        <circle cx="160" cy="80" r="22" fill="#FFCA28"/>
        <text x="160" y="85" fill="#780016" font-size="11" font-weight="900" font-family="'Fira Sans Extra Condensed', sans-serif" text-anchor="middle">АРТЕК</text>
        <text x="160" y="154" fill="#FFE082" font-size="12" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">СТАТЬЯ 45 КОНСТИТУЦИИ СССР (1977 Г.)</text>
      </svg>
    `,
    caption: "Всесоюзная пионерия и золотой стандарт школы",
    year: "1970-е годы",
    quote: "«В СССР осуществляется переход ко всеобщему обязательному среднему образованию молодежи».",
    author: "— Статья 45 Конституции СССР 1977 года",
    body: `
      <p>Брежневская эпоха — вершина стабильности и признания советского образования лучшим в мире. Каждый гражданин по Конституции 1977 года обязан был окончить 10 классов (или 8 классов + техникум / СПТУ).</p>
      <p>Школы перешли на <strong>кабинетную систему</strong>: профильные кабинеты физики со щитками электропитания на каждой парте, химии с вытяжными шкафами, лингафонные залы. С 1978 года все школьные учебники стали выдавать в школьных библиотеках <strong>абсолютно бесплатно</strong>! В 1974 году родился УПК (учебно-производственный комбинат) — один день в неделю старшеклассники осваивали профессию водителя, швеи, токаря или оператора ЭВМ.</p>
    `,
    facts: [
      { icon: "🏛️", title: "Дворцы пионеров", text: "Сотни бесплатных кружков: ракетомоделирование, радиотехника, шахматы." },
      { icon: "🚗", title: "Права со школы", text: "Выпускники УПК выходили с настоящими водительскими правами категории «С»." }
    ],
    archiveTitle: "Конституция СССР 1977 года",
    archiveList: [
      "★ Бесплатное среднее, специальное и высшее образование.",
      "★ 100% гарантия первого рабочего места после выпуска.",
      "★ Массовый охват детей пионерскими лагерями («Артек», «Орлёнок»)."
    ]
  },

  "1984": {
    period: "1984 — 1991 гг.",
    status: "Эра ЭВМ и перестройка",
    heading: "Реформа 1984 года, школа с 6 лет и компьютеры",
    svg: `
      <svg viewBox="0 0 320 180" class="era-art-svg">
        <rect width="320" height="180" rx="8" fill="#14213D"/>
        <!-- PC monitor -->
        <rect x="90" y="30" width="140" height="95" rx="6" fill="#37474F" stroke="#90A4AE" stroke-width="3"/>
        <rect x="102" y="42" width="116" height="70" rx="3" fill="#000000"/>
        <text x="110" y="62" fill="#00E676" font-size="11" font-family="'JetBrains Mono', monospace">10 PRINT "СССР"</text>
        <text x="110" y="78" fill="#00E676" font-size="11" font-family="'JetBrains Mono', monospace">20 GOTO 10</text>
        <rect x="135" y="125" width="50" height="15" fill="#78909C"/>
        <text x="160" y="158" fill="#FFF8E7" font-size="12" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">КУВТ «КОРВЕТ» И АКАДЕМИК ЕРШОВ</text>
      </svg>
    `,
    caption: "Первые советские школьные компьютеры",
    year: "1985 год",
    quote: "«Программирование — это вторая грамотность!»",
    author: "— Академик Андрей Петрович Ершов (1985 г.)",
    body: `
      <p>В апреле 1984 года ЦК КПСС утвердил реформу школы: переход на <strong>11-летку</strong> и начало приема детей в школу <strong>с 6 лет</strong> (нулевой / 1-й класс). В 1989 году синхронизировали сетку: все 3-и классы перескочили сразу в 5-й, и 4-й класс на время исчез!</p>
      <p>С 1 сентября 1985 года во всех 9–10 классах страны ввели революционный предмет <strong>«Основы информатики и вычислительной техники» (ОИВТ)</strong>. Началась массовая поставка отечественных ПК «Агат», «Корвет», «БК-0010» и знаменитых японских компьютерных классов Yamaha КУВТ MSX.</p>
    `,
    facts: [
      { icon: "💻", title: "Школьные ПК", text: "Программы загружали с магнитофонных аудиокассет." },
      { icon: "🕊️", title: "Педагогика сотрудничества", text: "Новаторы Амонашвили, Шаталов (опорные конспекты) и Лысенкова." }
    ],
    archiveTitle: "Постановление ЦК КПСС от 12 апреля 1984 года",
    archiveList: [
      "★ Снижение возраста приема в школу до 6 лет.",
      "★ Повсеместное внедрение школьной информатики.",
      "★ Демократизация учебного процесса перед распадом Союза."
    ]
  }
};

function initTimeline() {
  const tabs = document.querySelectorAll('.era-tab');
  const display = document.getElementById('era-display');
  if (!tabs.length || !display) return;

  renderEra('1917');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      renderEra(tab.dataset.era);
    });
  });
}

function renderEra(key) {
  const data = ERA_DATA[key];
  const display = document.getElementById('era-display');
  if (!data || !display) return;

  display.style.opacity = '0';
  display.style.transform = 'translateY(6px)';

  setTimeout(() => {
    display.innerHTML = `
      <div class="era-grid">
        <div class="era-text-col">
          <div class="era-meta">
            <span class="era-period-badge">${data.period}</span>
            <span class="era-status-badge">${data.status}</span>
          </div>
          <h3 class="era-heading">${data.heading}</h3>
          
          <div class="quote-box">
            <p>${data.quote}</p>
            <span class="quote-author">${data.author}</span>
          </div>

          <div class="era-body">
            ${data.body}
          </div>

          <div class="era-facts">
            ${data.facts.map(f => `
              <div class="fact-item">
                <span class="fact-icon">${f.icon}</span>
                <div>
                  <strong>${f.title}</strong>
                  <p>${f.text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="era-visual-col">
          <div class="era-art-frame">
            ${data.svg}
            <div class="era-art-caption">${data.caption}</div>
            <span class="era-art-year">${data.year}</span>
          </div>

          <div class="historical-frame">
            <h4 class="frame-title">${data.archiveTitle}</h4>
            <ul class="frame-list">
              ${data.archiveList.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    display.style.opacity = '1';
    display.style.transform = 'translateY(0)';
  }, 180);
}

/* --------------------------------------------------------------------------
   3. UNIFORMS SHOWCASE
   -------------------------------------------------------------------------- */
const UNIFORM_DATA = {
  "1948": {
    badge: "1948 — 1962 годы",
    boy: "Серая полушерстяная гимнастерка с воротником-стойкой на пуговицах, широкий кожаный ремень с массивной латунной бляхой со штампом «Ш» и форменная фуражка с кокардой. Брюки со стрелками.",
    girl: "Коричневое шерстяное платье ниже колен со складками. В будни — черный сатиновый фартук, по праздникам — белоснежный шелковый фартук с кружевными крылышками. В косы вплетались атласные ленты (черные/коричневые в будни, белые на линейку).",
    secret: "Каждую субботу белые кружевные воротнички и манжеты аккуратно отпарывали, стирали хозяйственным мылом, крахмалили, гладили и в воскресенье вечером пришивали заново мелкими стежками! Если в понедельник завуч видел несвежий воротничок — отправляли домой."
  },
  "1962": {
    badge: "1962 — 1973 годы",
    boy: "Серый шерстяной однобортный пиджак на трех пуговицах и прямые брюки. Отказ от военной гимнастерки сталинского периода в пользу гражданского городского силуэта хрущевской оттепели.",
    girl: "Классическое коричневое платье и фартуки. Длина подола поднялась чуть выше — строго по колено. Запрет на макияж и украшения соблюдался неукоснительно.",
    secret: "Мальчиков строго стригли под полубокс. Модные длинные прически «под Битлз» вызывали ярость дежурного завуча, который лично отправлял учеников в парикмахерскую прямо посреди учебного дня."
  },
  "1973": {
    badge: "1973 — 1988 годы",
    boy: "Культовая темно-синяя куртка полушерстяного джинсового покроя с металлическими алюминиевыми пуговицами со звездой и пластиковым шевроном на левом рукаве (открытая книга на фоне восходящего солнца). Синие прямые брюки.",
    girl: "Традиционное коричневое платье с фартуками. С 1984 года для старшеклассниц ввели долгожданную альтернативу: темно-синий костюм-тройку (юбка-плиссе, жилет и жакет).",
    secret: "Школьники обожали аккуратно бритвой срезать прозрачную полиэтиленовую пленку с нарукавного пластикового шеврона, чтобы рельефная книга и солнце стали благородно-матовыми!"
  },
  "1988": {
    badge: "1988 — 1991 годы",
    boy: "Синий костюм. К концу 80-х жесткий надзор ослаб: стали надевать водолазки, турецкие свитера «Boys», кроссовки и дефицитные джинсы-варёнки.",
    girl: "Синие костюмы-тройки, яркие блузки, пышные начесы с лаком для волос «Прелесть». Весной 1992 года обязательная школьная форма в России была официально отменена указом президента.",
    secret: "В актовых залах начались дискотеки под песни групп «Кино», «Ласковый май» и «Мираж», где школьная форма демонстративно сменялась самой яркой неформальной одеждой."
  }
};

function initUniforms() {
  const tabs = document.querySelectorAll('.u-tab');
  const showcase = document.getElementById('uniform-showcase');
  if (!tabs.length || !showcase) return;

  renderUniform('1948');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderUniform(tab.dataset.uniform);
    });
  });
}

function renderUniform(key) {
  const data = UNIFORM_DATA[key];
  const showcase = document.getElementById('uniform-showcase');
  if (!data || !showcase) return;

  showcase.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="era-period-badge">${data.badge}</span>
    </div>
    <div class="uniform-cards-grid">
      <div class="uniform-card boy-card">
        <span class="u-gender-badge">👦 Форма для мальчиков</span>
        <p class="u-gender-text">${data.boy}</p>
      </div>
      <div class="uniform-card girl-card">
        <span class="u-gender-badge">👧 Форма для девочек</span>
        <p class="u-gender-text">${data.girl}</p>
      </div>
    </div>
    <div class="uniform-secret-box">
      <div class="u-secret-icon">💡</div>
      <div>
        <h4 class="u-secret-title">Особенность и ритуал эпохи</h4>
        <p class="u-secret-desc">${data.secret}</p>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   4. BACKPACK EXPLORER
   -------------------------------------------------------------------------- */
const BACKPACK_ITEMS = {
  penal: {
    emoji: "✏️",
    title: "Деревянный пенал с выдвижной крышкой",
    price: "35 копеек",
    body: "Культовый березовый пенал со скользящей крышкой. Внутри два отделения: длинное под перьевые ручки и карандаши «Конструктор» и короткое — под ластик и запасные стальные перья № 86.",
    specs: [
      { label: "Материал", value: "Береза, мебельный лак ГОСТ 5228-76" },
      { label: "Особенность", value: "На крышке часто выцарапывали инициалы или таблицу умножения" }
    ]
  },
  inkpot: {
    emoji: "🧪",
    title: "Чернильница-непроливайка & Перья «Звёздочка»",
    price: "12 копеек",
    body: "Инженерное чудо: внутренний керамический конус не давал чернилам вылиться при опрокидывании. Чернила готовили из сухого фиолетового порошка «Радуга».",
    specs: [
      { label: "Цвет чернил", value: "Фиолетовый или насыщенно-синий" },
      { label: "Главный страх", value: "Посадить жирную кляксу в чистовой тетради" }
    ]
  },
  notebook: {
    emoji: "📓",
    title: "Школьная тетрадка за 2 копейки",
    price: "2 копейки",
    body: "Тетрадь 12 листов в серо-зеленой обложке. На обороте — таблица умножения или текст Торжественного обещания юного пионера. Поля чертили вручную простым карандашом строго на 4 клетки.",
    specs: [
      { label: "Объем", value: "12 листов (для экзаменационных контрольных — 18 листов)" },
      { label: "Промокашка", value: "Обязательный впитывающий лист в середине каждой тетради" }
    ]
  },
  ruler: {
    emoji: "📐",
    title: "Логарифмическая счетная линейка",
    price: "1 рубль 80 копеек",
    body: "Аналоговый карманный суперкомпьютер! Позволяла за считанные секунды умножать многозначные числа, делить, извлекать квадратные корни и вычислять тригонометрию без единой батарейки.",
    specs: [
      { label: "Материал", value: "Дерево, покрытое белым целлулоидом, бегунок из стекла" },
      { label: "Изучение", value: "Обязательно изучалась всеми в 8–10 классах" }
    ]
  },
  snack: {
    emoji: "🥐",
    title: "Городская булочка и яблочный сок",
    price: "13 копеек",
    body: "Классический советский школьный перекус в буфете на большой перемене: пышная ароматная городская булочка с хрустящим гребешком (3 коп.) и граненый стакан яблочного сока с мякотью (10 коп.).",
    specs: [
      { label: "Цена булочки", value: "3 копейки" },
      { label: "Стакан сока", value: "10 копеек (томатный со сбитой солью — 10 коп.)" }
    ]
  },
  eraser: {
    emoji: "🧼",
    title: "Двухцветный ластик «Архитектор»",
    price: "5 копеек",
    body: "Легендарная стирательная резинка: мягкая красная сторона стирала графитовый карандаш, а жесткая серая сторона с добавлением микропеска оттирала чернила... нередко прямо до дырки в тетради!",
    specs: [
      { label: "Производство", value: "Завод РТИ «Красный Треугольник»" },
      { label: "Опасность", value: "Протереть бумагу насквозь перед сдачей тетради" }
    ]
  },
  compass: {
    emoji: "📏",
    title: "Готовальня чертежная «НЧК-14»",
    price: "4 рубля 50 копеек",
    body: "Бархатный футляр с латунными никелированными циркулями, кронциркулями, рейсфедерами и удлинителями для уроков черчения в 7–10 классах. Мечта каждого будущего советского инженера.",
    specs: [
      { label: "Комплектация", value: "14 прецизионных инструментов" },
      { label: "Применение", value: "Черчение деталей, разрезов и тушевая графика" }
    ]
  }
};

function initBackpack() {
  const buttons = document.querySelectorAll('.bp-btn');
  const viewCard = document.getElementById('backpack-view');
  if (!buttons.length || !viewCard) return;

  renderBackpackItem('penal');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBackpackItem(btn.dataset.item);
    });
  });
}

function renderBackpackItem(key) {
  const item = BACKPACK_ITEMS[key];
  const viewCard = document.getElementById('backpack-view');
  if (!item || !viewCard) return;

  viewCard.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
      <span style="font-size: 2.8rem;">${item.emoji}</span>
      <span class="bp-price" style="font-size: 1rem; padding: 6px 14px;">Цена в СССР: ${item.price}</span>
    </div>
    <h3 style="font-family: var(--font-display); font-size: 1.85rem; color: var(--navy-ink); margin-bottom: 10px;">${item.title}</h3>
    <p style="font-size: 0.96rem; color: var(--text-main); line-height: 1.6; margin-bottom: 22px;">${item.body}</p>
    <div style="background: var(--bg-ivory); border-radius: var(--radius-sm); padding: 16px;">
      <strong style="display: block; font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Технические данные:</strong>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        ${item.specs.map(s => `
          <div>
            <span style="font-size: 0.78rem; color: var(--text-muted); display: block;">${s.label}:</span>
            <strong style="font-size: 0.88rem; color: var(--navy-ink);">${s.value}</strong>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   5. UPGRADED SOVIET PRICE CALCULATOR & GASTONOM RECEIPT
   -------------------------------------------------------------------------- */
const SOVIET_GOODS = [
  { name: "Школьных тетрадок (12 л.)", price: 0.02, icon: "📓" },
  { name: "Булочек городских («жулик»)", price: 0.03, icon: "🥐" },
  { name: "Стаканов газировки с сиропом", price: 0.03, icon: "🥤" },
  { name: "Поездок на трамвае", price: 0.03, icon: "🚋" },
  { name: "Пирожков с повидлом", price: 0.05, icon: "🥟" },
  { name: "Поездок на метро", price: 0.05, icon: "🚇" },
  { name: "Билетов в кино (детский сеанс)", price: 0.10, icon: "🎟️" },
  { name: "Стаканов томатного/яблочного сока", price: 0.10, icon: "🧃" },
  { name: "Порций пломбира в вафельном стаканчике", price: 0.20, icon: "🍦" },
  { name: "Деревянных пеналов с выдвижной крышкой", price: 0.35, icon: "✏️" },
  { name: "Пионерских шелковых галстуков", price: 0.75, icon: "🧣" },
  { name: "Логарифмических счетных линеек", price: 1.80, icon: "📐" },
  { name: "Готовален чертежных «НЧК-14»", price: 4.50, icon: "📏" }
];

function initPriceCalculator() {
  const presets = document.querySelectorAll('.preset-btn');
  const input = document.getElementById('custom-kopeks');
  const grid = document.getElementById('calc-results-grid');
  const coinBtns = document.querySelectorAll('.coin-btn');
  const btnClearCoins = document.getElementById('btn-clear-coins');
  const btnPrintReceipt = document.getElementById('btn-print-receipt');
  const receiptWrapper = document.getElementById('soviet-receipt-wrapper');
  const receiptItemsList = document.getElementById('receipt-items-list');
  const receiptTotalSum = document.getElementById('receipt-total-sum');

  if (!grid || !input) return;

  let currentAmount = 0.20;

  // Synthesize realistic metal coin clink sound
  function playCoinClinkSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    const freqs = [1800, 2400, 3100, 4200];
    const f = freqs[Math.floor(Math.random() * freqs.length)];
    osc.frequency.setValueAtTime(f, now);
    osc.frequency.exponentialRampToValueAtTime(f * 0.85, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  function updateCalc(rubles) {
    let val = parseFloat(rubles);
    if (isNaN(val) || val < 0) val = 0;
    currentAmount = parseFloat(val.toFixed(2));

    grid.innerHTML = SOVIET_GOODS.map(item => {
      const count = Math.floor(currentAmount / item.price);
      return `
        <div class="calc-result-card ${count > 0 ? 'is-affordable' : 'not-affordable'}">
          <span class="calc-res-icon">${item.icon}</span>
          <div class="calc-res-count">${count} шт.</div>
          <div class="calc-res-label">${item.name}</div>
          <span class="calc-res-price">по ${(item.price >= 1 ? item.price.toFixed(2) + ' руб.' : (item.price * 100).toFixed(0) + ' коп.')}</span>
        </div>
      `;
    }).join('');

    renderReceiptContent(currentAmount);
  }

  function renderReceiptContent(amount) {
    if (!receiptItemsList || !receiptTotalSum) return;

    // Find affordable items for receipt
    const items = [];
    let remainder = amount;

    // Pick a realistic basket
    for (const g of SOVIET_GOODS) {
      if (remainder >= g.price) {
        const qty = Math.min(Math.floor(remainder / g.price), 2);
        if (qty > 0) {
          items.push({ name: g.name.substring(0, 20), qty: qty, price: g.price, total: (qty * g.price).toFixed(2) });
          remainder -= qty * g.price;
        }
      }
      if (items.length >= 4) break;
    }

    if (items.length === 0) {
      receiptItemsList.innerHTML = `<div style="text-align:center;padding:10px 0;opacity:0.7;">НЕТ ПОКУПОК (СУММА: 0 РУБ.)</div>`;
    } else {
      receiptItemsList.innerHTML = items.map(it => `
        <div style="display:flex;justify-content:space-between;margin:3px 0;">
          <span>${it.name} x${it.qty}</span>
          <span>${it.total}</span>
        </div>
      `).join('');
    }

    const rublesPart = Math.floor(amount);
    const kopeksPart = Math.round((amount - rublesPart) * 100);
    receiptTotalSum.textContent = `${rublesPart}-${kopeksPart < 10 ? '0' + kopeksPart : kopeksPart} РУБ.`;
  }

  // Coin Buttons (Increment purse)
  coinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.dataset.val) || 0;
      currentAmount = parseFloat((currentAmount + val).toFixed(2));
      input.value = currentAmount.toFixed(2);
      presets.forEach(b => b.classList.remove('active'));
      playCoinClinkSound();
      updateCalc(currentAmount);
    });
  });

  // Clear coins
  if (btnClearCoins) {
    btnClearCoins.addEventListener('click', () => {
      currentAmount = 0;
      input.value = '0.00';
      presets.forEach(b => b.classList.remove('active'));
      updateCalc(0);
    });
  }

  // Presets
  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      presets.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const amt = parseFloat(btn.dataset.amount);
      input.value = amt.toFixed(2);
      playCoinClinkSound();
      updateCalc(amt);
    });
  });

  input.addEventListener('input', (e) => {
    presets.forEach(b => b.classList.remove('active'));
    updateCalc(e.target.value);
  });

  // Print Receipt Button
  if (btnPrintReceipt && receiptWrapper) {
    btnPrintReceipt.addEventListener('click', () => {
      const isVisible = receiptWrapper.style.display !== 'none';
      if (isVisible) {
        receiptWrapper.style.display = 'none';
        btnPrintReceipt.textContent = '🧾 Выбить кассовый чек Гастронома № 1 (Аппарат «Ока»)';
      } else {
        receiptWrapper.style.display = 'flex';
        btnPrintReceipt.textContent = '▲ Свернуть чек Гастронома № 1';
        receiptWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  updateCalc(0.20);
}

/* --------------------------------------------------------------------------
   6. QUIZ: ВСЕСОЮЗНАЯ АТТЕСТАЦИЯ 1980 ГОДА
   -------------------------------------------------------------------------- */
const QUIZ_QUESTIONS = [
  {
    subject: "Октябрята & Традиции",
    question: "Какое количество человек входило в первичную группу октябрят в младших классах, называвшуюся «звёздочкой»?",
    options: [
      "Ровно 5 человек — по числу лучей у рубиновой звезды",
      "7 человек — по числу дней недели",
      "10 человек — половина пионерского отряда",
      "Количество определялось случайным жребием"
    ],
    correct: 0,
    explanation: "Класс октябрят делился строго на звёздочки по 5 ребят. У каждого была своя постоянная должность: командир, санитар, цветовод, библиотекарь и хозяин."
  },
  {
    subject: "Уроки & Чистописание",
    question: "Каким инструментом писали ученики начальной школы СССР до конца 1960-х годов на уроках чистописания?",
    options: [
      "Капиллярными фломастерами",
      "Стальными перьями № 86 («звёздочка») с чернильницей-непроливайкой",
      "Шариковыми автоматическими ручками",
      "Грифельными дощечками"
    ],
    correct: 1,
    explanation: "Писали стальными перьями № 86. Шариковые ручки до конца 60-х были под запретом, так как советские педагоги считали, что они портят почерк и мелкую моторику пальцев."
  },
  {
    subject: "Анатомия парты",
    question: "Под каким углом располагалась откидная столешница знаменитой парты Эрисмана?",
    options: [
      "Строго горизонтально (0°)",
      "Ровно 15 градусов к лучу зрения",
      "30 градусов, как на мольберте",
      "45 градусов для удобства черчения"
    ],
    correct: 1,
    explanation: "Наклон ровно 15° гарантировал, что плоскость книги или тетради оставалась перпендикулярной взгляду ребенка, защищая осанку от сколиоза и глаза от близорукости."
  },
  {
    subject: "Выпускные экзамены",
    question: "Сколько часов длилось обязательное выпускное сочинение по литературе в 10 классе средней школы?",
    options: [
      "Ровно 2 академических часа",
      "4 часа с перерывом на обед",
      "Ровно 6 астрономических часов",
      "Экзамен шел два дня подряд"
    ],
    correct: 2,
    explanation: "Выпускное сочинение писали ровно 6 часов! В 9:00 темы передавали по Всесоюзному радио, после чего пакет со штампом РОНО вскрывали в классе."
  },
  {
    subject: "Школьная иерархия",
    question: "В какую организацию торжественно принимали советских школьников с 14 лет после пионерии?",
    options: [
      "В ДОСААФ СССР",
      "В ВЛКСМ (Ленинский Комсомол)",
      "В профсоюз работников просвещения",
      "В стройотрядовцы"
    ],
    correct: 1,
    explanation: "С 14 лет вступали в ряды ВЛКСМ (Всесоюзный Ленинский Коммунистический Союз Молодежи), сдавая экзамен по уставу в райкоме партии."
  },
  {
    subject: "Высшее образование",
    question: "Какое обязательное государственное правило ждало каждого выпускника советского ВУЗа?",
    options: [
      "Выплата кредита за годы учебы",
      "Государственное персональное распределение на работу на 3 года",
      "Сдача норм ГТО высшей ступени",
      "Обязательная служба в милиции"
    ],
    correct: 1,
    explanation: "Все выпускники ВУЗов проходили обязательное Государственное распределение на 3 года. Государство гарантировало рабочее место, подъемные средства и жилье."
  },
  {
    subject: "Школьный быт",
    question: "Что насыпали дежурные школьники на деревянный пол класса перед тем, как подмести его веником?",
    options: [
      "Сухой речной песок",
      "Влажные древесные опилки",
      "Хлорную известь",
      "Древесную золу"
    ],
    correct: 1,
    explanation: "Дежурные посыпали дощатый пол влажными опилками. Они связывали меловую пыль и грязь, не позволяя им подниматься в воздух при подметании."
  }
];

let currentQuizIndex = 0;
let quizScore = 0;

function initQuiz() {
  const card = document.getElementById('quiz-card');
  const resultCard = document.getElementById('quiz-result-card');
  const restartBtn = document.getElementById('restart-quiz-btn');
  if (!card || !resultCard) return;

  renderQuizQuestion();

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentQuizIndex = 0;
      quizScore = 0;
      resultCard.style.display = 'none';
      card.style.display = 'block';
      renderQuizQuestion();
    });
  }
}

function renderQuizQuestion() {
  const q = QUIZ_QUESTIONS[currentQuizIndex];
  const stepEl = document.getElementById('quiz-step');
  const subjEl = document.getElementById('quiz-subject');
  const qEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const expEl = document.getElementById('quiz-explanation');
  const nextBtn = document.getElementById('quiz-next-btn');
  const barEl = document.getElementById('quiz-progress-bar');

  if (!q) {
    showQuizResult();
    return;
  }

  stepEl.textContent = `Вопрос ${currentQuizIndex + 1} из ${QUIZ_QUESTIONS.length}`;
  subjEl.textContent = q.subject;
  qEl.textContent = q.question;
  expEl.style.display = 'none';
  nextBtn.style.display = 'none';
  barEl.style.width = `${((currentQuizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;

  optionsEl.innerHTML = q.options.map((opt, i) => `
    <button class="quiz-option-btn" data-index="${i}">
      <span>${opt}</span>
      <span class="opt-status"></span>
    </button>
  `).join('');

  const optionBtns = optionsEl.querySelectorAll('.quiz-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedIndex = parseInt(btn.dataset.index, 10);
      const isCorrect = selectedIndex === q.correct;

      optionBtns.forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.correct) {
          b.classList.add('correct');
          b.querySelector('.opt-status').textContent = '✓';
        } else if (idx === selectedIndex) {
          b.classList.add('wrong');
          b.querySelector('.opt-status').textContent = '✕';
        }
      });

      if (isCorrect) quizScore++;

      expEl.textContent = q.explanation;
      expEl.style.display = 'block';
      nextBtn.style.display = 'inline-flex';
    });
  });

  nextBtn.onclick = () => {
    currentQuizIndex++;
    renderQuizQuestion();
  };
}

function showQuizResult() {
  const card = document.getElementById('quiz-card');
  const resultCard = document.getElementById('quiz-result-card');
  const gradeDigit = document.getElementById('final-grade-digit');
  const verdictTitle = document.getElementById('final-verdict-title');
  const scoreText = document.getElementById('final-score-text');
  const decisionText = document.getElementById('final-decision-text');

  card.style.display = 'none';
  resultCard.style.display = 'block';

  scoreText.textContent = `Правильных ответов: ${quizScore} из ${QUIZ_QUESTIONS.length}`;

  if (quizScore === 7) {
    gradeDigit.textContent = "5+";
    verdictTitle.textContent = "ЗОЛОТАЯ МЕДАЛЬ! КРУГЛЫЙ ОТЛИЧНИК!";
    decisionText.textContent = "Решением Государственной экзаменационной комиссии зачислен в МГУ им. Ломоносова без экзаменов!";
  } else if (quizScore >= 5) {
    gradeDigit.textContent = "4";
    verdictTitle.textContent = "АТТЕСТАТ С ОТЛИЧИЕМ (ХОРОШИСТ)";
    decisionText.textContent = "Решением педсовета рекомендован к поступлению в политехнический институт.";
  } else if (quizScore >= 3) {
    gradeDigit.textContent = "3";
    verdictTitle.textContent = "УДОВЛЕТВОРИТЕЛЬНО (ТВЁРДЫЙ ТРОЕЧНИК)";
    decisionText.textContent = "Направлен на учебу в среднее профессионально-техническое училище (СПТУ № 4).";
  } else {
    gradeDigit.textContent = "2";
    verdictTitle.textContent = "НЕ АТТЕСТОВАН (ДВОЕЧНИК)";
    decisionText.textContent = "Оставлен на осень для пересдачи экзаменов. Назначено дежурство по мытью парт.";
  }
}

/* --------------------------------------------------------------------------
   7. NAVIGATION & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
    });

    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   9. SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

/* --------------------------------------------------------------------------
   10. AMBIENT CHALK DUST CANVAS (HERO ATMOSPHERE)
   -------------------------------------------------------------------------- */
function initChalkDustCanvas() {
  const canvas = document.getElementById('hero-dust-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particleCount = 38;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: -Math.random() * 0.35 - 0.15,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI,
      isGold: Math.random() > 0.6
    });
  }

  let animationFrameId = null;
  let isVisible = true;

  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible && !animationFrameId) {
      render();
    }
  }, { threshold: 0.05 });

  const heroSec = document.getElementById('hero');
  if (heroSec) observer.observe(heroSec);

  function render() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += 0.02;

      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.isGold
        ? `rgba(255, 215, 100, ${alpha * 0.9})`
        : `rgba(255, 250, 240, ${alpha})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = p.isGold ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   11. HERO 3D ARTIFACT SHOWCASE: THREE.JS WEBGL GOLD MEDAL & PIONEER BADGE
   -------------------------------------------------------------------------- */
const ARTIFACT_DATA = {
  medal: {
    stamp: "ГОЗНАК СССР • 1945",
    tag: "ЭТАЛОН ДОБЛЕСТИ",
    title: "Золотая Медаль Выпускника СССР",
    desc: "Учреждена СНК СССР 30 мая 1945 года, в победный май. Вручалась выпускникам средней школы, имевшим полугодовые, годовые и экзаменационные отметки «5» (отлично) по всем предметам. До 1954 года чеканилась из чистого золота 583 пробы (вес 15,6 г), позже — из томпака с гальваническим золочением высокой стойкости. Давала право поступления в любой университет и институт СССР без экзаменов либо при сдаче всего одного профильного предмета на «отлично».",
    specs: [
      { label: "Диаметр", val: "32 мм" },
      { label: "Материал", val: "Золото 583°" },
      { label: "Льгота", val: "ВУЗ без конкурса" },
      { label: "Тираж/год", val: "~1.5% выпускников" }
    ]
  },
  badge: {
    stamp: "ЦК ВЛКСМ • МОСКВА",
    tag: "СИМВОЛ ЮНОСТИ",
    title: "Всесоюзный Пионерский Значок",
    desc: "Утвержден Бюро ЦК ВЛКСМ. Три языка пламени над пятиконечной звездой олицетворяют великое триединство поколений: коммунистов, комсомольцев и пионеров. В центре звезды — барельефный золоченый профиль В. И. Ленина и боевой девиз «Всегда готов!». Изготавливался методом горячей штамповки на московском заводе «Победа» из латуни с рубиновой горячей эмалью.",
    specs: [
      { label: "Материал", val: "Латунь / Эмаль" },
      { label: "Крепление", val: "Булавка с фиксатором" },
      { label: "Цена в СССР", val: "15 копеек" },
      { label: "Охват", val: "Более 20 млн пионеров" }
    ]
  }
};

function initHero3DArtifact() {
  const canvas = document.getElementById('artifact-canvas');
  const stage = document.getElementById('artifact-stage');
  const tabMedal = document.getElementById('tab-medal');
  const tabBadge = document.getElementById('tab-badge');

  const btnSpin = document.getElementById('btn-spin-artifact');
  const btnFlip = document.getElementById('btn-flip-artifact');
  const btnReset = document.getElementById('btn-reset-artifact');

  const dossierStamp = document.getElementById('dossier-stamp');
  const dossierTag = document.getElementById('dossier-tag');
  const dossierTitle = document.getElementById('dossier-title');
  const dossierDesc = document.getElementById('dossier-desc');
  const dossierSpecs = document.getElementById('dossier-specs');

  if (!canvas || !stage || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();

  const width = canvas.clientWidth || 320;
  const height = canvas.clientHeight || 340;
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
  camera.position.set(0, 0, 3.4);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 2.0;
  controls.maxDistance = 5.5;
  controls.enablePan = false;
  controls.rotateSpeed = 0.8;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 3.5;

  // Lighting
  const ambLight = new THREE.AmbientLight(0xfff5ea, 1.2);
  scene.add(ambLight);

  const keyLight = new THREE.DirectionalLight(0xfffaec, 2.2);
  keyLight.position.set(3, 4, 3.5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x90caf9, 0.7);
  fillLight.position.set(-3, -2, 2.5);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffd54f, 1.5);
  rimLight.position.set(0, 4, -3);
  scene.add(rimLight);

  const backLight = new THREE.DirectionalLight(0xff8f00, 1.0);
  backLight.position.set(-2, -3, -2.5);
  scene.add(backLight);

  // Group wrappers
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  const medalGroup = new THREE.Group();
  const badgeGroup = new THREE.Group();
  badgeGroup.visible = false;
  mainGroup.add(medalGroup);
  mainGroup.add(badgeGroup);

  // --- PROCEDURAL TEXTURES FOR GOLD MEDAL ---
  function createMedalObverseTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');

    // Base Gold background
    const bgGrad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
    bgGrad.addColorStop(0, '#FFE89E');
    bgGrad.addColorStop(0.4, '#F7C644');
    bgGrad.addColorStop(0.8, '#D89312');
    bgGrad.addColorStop(1, '#9C6202');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle brushed metal concentric rings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    for (let r = 80; r < 500; r += 6) {
      ctx.beginPath();
      ctx.arc(512, 512, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Outer rim border
    ctx.lineWidth = 26;
    ctx.strokeStyle = '#FDE49E';
    ctx.beginPath();
    ctx.arc(512, 512, 492, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 6;
    ctx.strokeStyle = '#7D4700';
    ctx.beginPath();
    ctx.arc(512, 512, 478, 0, Math.PI * 2);
    ctx.stroke();

    // Beaded ring (точечный ободок)
    const numDots = 96;
    for (let i = 0; i < numDots; i++) {
      const angle = (i / numDots) * Math.PI * 2;
      const x = 512 + Math.cos(angle) * 464;
      const y = 512 + Math.sin(angle) * 464;
      ctx.fillStyle = '#FFF2B2';
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6D3C00';
      ctx.beginPath();
      ctx.arc(x + 1, y + 1, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sunburst rays from center
    ctx.save();
    ctx.translate(512, 512);
    ctx.strokeStyle = 'rgba(255, 245, 180, 0.45)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 48; i++) {
      ctx.rotate((Math.PI * 2) / 48);
      ctx.beginPath();
      ctx.moveTo(110, 0);
      ctx.lineTo(390, 0);
      ctx.stroke();
    }
    ctx.restore();

    // Curved Text: «ЗА ОТЛИЧНЫЕ УСПЕХИ» (top arch)
    ctx.save();
    ctx.translate(512, 512);
    ctx.font = '900 46px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const topText = 'ЗА ОТЛИЧНЫЕ УСПЕХИ';
    const topRadius = 390;
    const startAngle = -Math.PI * 0.72;
    const endAngle = -Math.PI * 0.28;
    const stepAngle = (endAngle - startAngle) / (topText.length - 1);

    for (let i = 0; i < topText.length; i++) {
      const charAngle = startAngle + i * stepAngle;
      ctx.save();
      ctx.rotate(charAngle + Math.PI / 2);
      ctx.translate(0, -topRadius);
      // Emboss shadow & highlight
      ctx.fillStyle = '#5A3100';
      ctx.fillText(topText[i], 2, 2);
      ctx.fillStyle = '#FFF8D1';
      ctx.fillText(topText[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // Bottom motto arch: «В УЧЕНИИ, ТРУДЕ И ЗА ПРИМЕРНОЕ ПОВЕДЕНИЕ»
    ctx.save();
    ctx.translate(512, 512);
    ctx.font = '800 28px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const botText = 'В УЧЕНИИ, ТРУДЕ И ЗА ПРИМЕРНОЕ ПОВЕДЕНИЕ';
    const botRadius = 410;
    const bStartAngle = Math.PI * 0.74;
    const bEndAngle = Math.PI * 0.26;
    const bStepAngle = (bEndAngle - bStartAngle) / (botText.length - 1);

    for (let i = 0; i < botText.length; i++) {
      const charAngle = bStartAngle + i * bStepAngle;
      ctx.save();
      ctx.rotate(charAngle - Math.PI / 2);
      ctx.translate(0, botRadius);
      ctx.fillStyle = '#5A3100';
      ctx.fillText(botText[i], 1.5, 1.5);
      ctx.fillStyle = '#FFF8D1';
      ctx.fillText(botText[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // Laurel Branches (левая и правая лавровые ветви)
    ctx.save();
    ctx.strokeStyle = '#FFE082';
    ctx.fillStyle = '#D98200';
    ctx.lineWidth = 4;
    for (let angle = 0.55 * Math.PI; angle < 0.95 * Math.PI; angle += 0.08) {
      const lx = 512 + Math.cos(angle) * 310;
      const ly = 512 + Math.sin(angle) * 310;
      ctx.beginPath();
      ctx.ellipse(lx, ly, 22, 10, angle + 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    for (let angle = 0.05 * Math.PI; angle < 0.45 * Math.PI; angle += 0.08) {
      const rx = 512 + Math.cos(angle) * 310;
      const ry = 512 + Math.sin(angle) * 310;
      ctx.beginPath();
      ctx.ellipse(rx, ry, 22, 10, angle - 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();

    // Open Book at Center
    ctx.save();
    ctx.translate(512, 590);
    // Shadow
    ctx.fillStyle = 'rgba(70, 38, 0, 0.4)';
    ctx.fillRect(-122, -48, 244, 96);
    // Pages
    ctx.fillStyle = '#FFF8DC';
    ctx.strokeStyle = '#7D4700';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.quadraticCurveTo(-65, -55, -125, -42);
    ctx.lineTo(-125, 45);
    ctx.quadraticCurveTo(-65, 30, 0, 48);
    ctx.quadraticCurveTo(65, 30, 125, 45);
    ctx.lineTo(125, -42);
    ctx.quadraticCurveTo(65, -55, 0, -40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Spine
    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.lineTo(0, 48);
    ctx.lineWidth = 5;
    ctx.stroke();
    // Ruled lines in book
    ctx.strokeStyle = 'rgba(100, 60, 10, 0.4)';
    ctx.lineWidth = 2.5;
    for (let y = -26; y <= 26; y += 13) {
      ctx.beginPath();
      ctx.moveTo(-110, y);
      ctx.lineTo(-15, y);
      ctx.moveTo(15, y);
      ctx.lineTo(110, y);
      ctx.stroke();
    }
    ctx.restore();

    // Center Red Enamel Star above book
    ctx.save();
    ctx.translate(512, 420);
    function drawStar(radius, inset, n = 5) {
      ctx.beginPath();
      for (let i = 0; i < n * 2; i++) {
        const r = i % 2 === 0 ? radius : inset;
        const a = (i * Math.PI) / n - Math.PI / 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    // Outer star gold trim
    ctx.fillStyle = '#FFE082';
    drawStar(112, 48);
    ctx.fill();

    // Inner ruby star
    const rubyGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 100);
    rubyGrad.addColorStop(0, '#FF1744');
    rubyGrad.addColorStop(0.65, '#D50000');
    rubyGrad.addColorStop(1, '#8B0000');
    ctx.fillStyle = rubyGrad;
    drawStar(98, 42);
    ctx.fill();
    ctx.strokeStyle = '#FFE082';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Facet lines on star
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * 98, Math.sin(a) * 98);
      ctx.stroke();
    }
    ctx.restore();

    // Hallmark at bottom: «ГОСЗНАК СССР»
    ctx.font = '900 20px "JetBrains Mono", sans-serif';
    ctx.fillStyle = '#7A4302';
    ctx.textAlign = 'center';
    ctx.fillText('ГОЗНАК СССР', 512, 920);

    return new THREE.CanvasTexture(c);
  }

  function createMedalReverseTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');

    // Base Gold background
    const bgGrad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
    bgGrad.addColorStop(0, '#FFE89E');
    bgGrad.addColorStop(0.4, '#F7C644');
    bgGrad.addColorStop(0.8, '#D89312');
    bgGrad.addColorStop(1, '#9C6202');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Milled border
    ctx.lineWidth = 26;
    ctx.strokeStyle = '#FDE49E';
    ctx.beginPath();
    ctx.arc(512, 512, 492, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 6;
    ctx.strokeStyle = '#7D4700';
    ctx.beginPath();
    ctx.arc(512, 512, 478, 0, Math.PI * 2);
    ctx.stroke();

    // Circular USSR Motto: «СОЮЗ СОВЕТСКИХ СОЦИАЛИСТИЧЕСКИХ РЕСПУБЛИК»
    ctx.save();
    ctx.translate(512, 512);
    ctx.font = '900 36px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const ussrText = 'СОЮЗ СОВЕТСКИХ СОЦИАЛИСТИЧЕСКИХ РЕСПУБЛИК';
    const ussrRadius = 410;
    const startAngle = -Math.PI * 0.88;
    const endAngle = -Math.PI * 0.12;
    const stepAngle = (endAngle - startAngle) / (ussrText.length - 1);

    for (let i = 0; i < ussrText.length; i++) {
      const charAngle = startAngle + i * stepAngle;
      ctx.save();
      ctx.rotate(charAngle + Math.PI / 2);
      ctx.translate(0, -ussrRadius);
      ctx.fillStyle = '#5A3100';
      ctx.fillText(ussrText[i], 2, 2);
      ctx.fillStyle = '#FFF8D1';
      ctx.fillText(ussrText[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // STATE EMBLEM OF THE USSR (Герб СССР)
    ctx.save();
    ctx.translate(512, 470);

    // Globe
    ctx.strokeStyle = '#FFE082';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 160, 0, Math.PI * 2);
    ctx.stroke();

    // Globe grid lines
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 85, 160, 0, 0, Math.PI * 2);
    ctx.moveTo(-160, 0);
    ctx.lineTo(160, 0);
    ctx.moveTo(-138, -80);
    ctx.lineTo(138, -80);
    ctx.moveTo(-138, 80);
    ctx.lineTo(138, 80);
    ctx.stroke();

    // Rising Sun at bottom
    ctx.fillStyle = '#FFF176';
    ctx.beginPath();
    ctx.arc(0, 160, 75, Math.PI, 0, false);
    ctx.fill();

    // Wheat Sheaves tied with ribbons
    ctx.strokeStyle = '#FFD54F';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(0, 30, 205, Math.PI * 0.78, Math.PI * 1.25);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 30, 205, -Math.PI * 0.25, Math.PI * 0.22);
    ctx.stroke();

    // Ribbons
    ctx.strokeStyle = '#C62828';
    ctx.lineWidth = 10;
    for (let dy = -80; dy <= 120; dy += 45) {
      ctx.beginPath();
      ctx.moveTo(-218, dy);
      ctx.lineTo(-192, dy + 18);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(218, dy);
      ctx.lineTo(192, dy + 18);
      ctx.stroke();
    }

    // Crossed Hammer and Sickle
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#FFE57F';
    ctx.fillStyle = '#FFE57F';
    ctx.beginPath();
    ctx.moveTo(-45, 60);
    ctx.lineTo(55, -40);
    ctx.stroke();
    ctx.fillRect(40, -55, 30, 18);
    ctx.beginPath();
    ctx.arc(5, -10, 68, Math.PI * 0.25, Math.PI * 1.35, false);
    ctx.lineWidth = 16;
    ctx.stroke();
    ctx.fillStyle = '#795548';
    ctx.fillRect(-52, 45, 14, 30);

    // Top Soviet Star
    ctx.fillStyle = '#D50000';
    ctx.strokeStyle = '#FFE082';
    ctx.lineWidth = 3;
    ctx.save();
    ctx.translate(0, -220);
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 32 : 14;
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();

    // Mintmark plaque at bottom
    ctx.save();
    ctx.translate(512, 850);
    ctx.strokeStyle = '#7D4700';
    ctx.lineWidth = 3;
    ctx.strokeRect(-250, -40, 500, 80);
    ctx.fillStyle = 'rgba(255, 245, 180, 0.2)';
    ctx.fillRect(-250, -40, 500, 80);

    ctx.font = '900 24px "JetBrains Mono", sans-serif';
    ctx.fillStyle = '#5A3100';
    ctx.textAlign = 'center';
    ctx.fillText('МОНЕТНЫЙ ДВОР • ЛМД', 0, -8);
    ctx.font = '800 22px "JetBrains Mono", sans-serif';
    ctx.fillText('ЗОЛОТО 583° • ВЕС 15.6 г', 0, 22);
    ctx.restore();

    return new THREE.CanvasTexture(c);
  }

  function createMilledEdgeTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#D89312';
    ctx.fillRect(0, 0, 512, 64);

    for (let x = 0; x < 512; x += 4) {
      ctx.fillStyle = x % 8 === 0 ? '#FFE89E' : '#7D4700';
      ctx.fillRect(x, 0, 2.5, 64);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(16, 1);
    return t;
  }

  // Build Gold Medal 3D Mesh
  const obverseTex = createMedalObverseTexture();
  obverseTex.center.set(0.5, 0.5);
  obverseTex.rotation = -Math.PI / 2;

  const reverseTex = createMedalReverseTexture();
  reverseTex.center.set(0.5, 0.5);
  reverseTex.rotation = -Math.PI / 2;

  const edgeTex = createMilledEdgeTexture();

  const goldRimMat = new THREE.MeshStandardMaterial({
    color: 0xE5A93C,
    metalness: 0.92,
    roughness: 0.26,
    bumpMap: edgeTex,
    bumpScale: 0.04
  });

  const goldObverseMat = new THREE.MeshStandardMaterial({
    color: 0xF7BF44,
    metalness: 0.88,
    roughness: 0.22,
    map: obverseTex,
    bumpMap: obverseTex,
    bumpScale: 0.04
  });

  const goldReverseMat = new THREE.MeshStandardMaterial({
    color: 0xF7BF44,
    metalness: 0.88,
    roughness: 0.22,
    map: reverseTex,
    bumpMap: reverseTex,
    bumpScale: 0.04
  });

  const medalGeo = new THREE.CylinderGeometry(1.24, 1.24, 0.13, 64);
  const medalMesh = new THREE.Mesh(medalGeo, [goldRimMat, goldObverseMat, goldReverseMat]);
  medalMesh.rotation.x = Math.PI / 2;
  medalMesh.rotation.y = 0;
  medalGroup.add(medalMesh);

  // --- BUILD 3D PIONEER BADGE ---
  function buildPioneerBadge() {
    const badge = new THREE.Group();

    // 1. Faceted Ruby Star Geometry
    const starGeo = new THREE.BufferGeometry();
    const vertices = [];
    const uvs = [];

    const outerR = 1.05;
    const innerR = 0.44;
    const zApex = 0.16;
    const zBase = 0;

    for (let i = 0; i < 5; i++) {
      const tipAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const valley1Angle = tipAngle - Math.PI / 5;
      const valley2Angle = tipAngle + Math.PI / 5;

      const tipX = Math.cos(tipAngle) * outerR;
      const tipY = Math.sin(tipAngle) * outerR;

      const v1X = Math.cos(valley1Angle) * innerR;
      const v1Y = Math.sin(valley1Angle) * innerR;

      const v2X = Math.cos(valley2Angle) * innerR;
      const v2Y = Math.sin(valley2Angle) * innerR;

      vertices.push(0, 0, zApex,  v1X, v1Y, zBase,  tipX, tipY, zBase);
      uvs.push(0.5, 0.5,  0.5 + (v1X / outerR) * 0.5, 0.5 + (v1Y / outerR) * 0.5,  0.5 + (tipX / outerR) * 0.5, 0.5 + (tipY / outerR) * 0.5);

      vertices.push(0, 0, zApex,  tipX, tipY, zBase,  v2X, v2Y, zBase);
      uvs.push(0.5, 0.5,  0.5 + (tipX / outerR) * 0.5, 0.5 + (tipY / outerR) * 0.5,  0.5 + (v2X / outerR) * 0.5, 0.5 + (v2Y / outerR) * 0.5);
    }

    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    starGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    starGeo.computeVertexNormals();

    const rubyEnamelMat = new THREE.MeshStandardMaterial({
      color: 0xB71C1C,
      roughness: 0.12,
      metalness: 0.18,
      emissive: 0x240000
    });

    const starMesh = new THREE.Mesh(starGeo, rubyEnamelMat);
    badge.add(starMesh);

    // Star Gold Edge Border
    const starBackplateGeo = new THREE.CylinderGeometry(1.06, 1.06, 0.04, 5);
    const goldPlateMat = new THREE.MeshStandardMaterial({
      color: 0xE5A93C,
      metalness: 0.88,
      roughness: 0.28
    });
    const starBackplate = new THREE.Mesh(starBackplateGeo, goldPlateMat);
    starBackplate.rotation.x = Math.PI / 2;
    starBackplate.rotation.y = -Math.PI / 10;
    starBackplate.position.z = -0.02;
    badge.add(starBackplate);

    // 2. Three Tongues of Fire
    const flameShape = new THREE.Shape();
    flameShape.moveTo(-0.48, 0.65);
    flameShape.bezierCurveTo(-0.62, 0.95, -0.42, 1.35, -0.28, 1.45);
    flameShape.bezierCurveTo(-0.24, 1.32, -0.26, 1.15, -0.16, 1.05);
    flameShape.bezierCurveTo(-0.12, 1.45, 0.0, 1.68, 0.0, 1.72);
    flameShape.bezierCurveTo(0.0, 1.68, 0.12, 1.45, 0.16, 1.05);
    flameShape.bezierCurveTo(0.26, 1.15, 0.24, 1.32, 0.28, 1.45);
    flameShape.bezierCurveTo(0.42, 1.35, 0.62, 0.95, 0.48, 0.65);
    flameShape.closePath();

    const flameExtrudeSettings = {
      depth: 0.07,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025
    };

    const flameGeo = new THREE.ExtrudeGeometry(flameShape, flameExtrudeSettings);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xE65100,
      metalness: 0.65,
      roughness: 0.25,
      emissive: 0x4a1200
    });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.z = 0.04;
    badge.add(flameMesh);

    // Inner gold flame core
    const innerFlameShape = new THREE.Shape();
    innerFlameShape.moveTo(-0.25, 0.72);
    innerFlameShape.bezierCurveTo(-0.35, 0.95, -0.20, 1.25, -0.14, 1.30);
    innerFlameShape.bezierCurveTo(-0.10, 1.15, 0, 1.50, 0, 1.52);
    innerFlameShape.bezierCurveTo(0, 1.50, 0.10, 1.15, 0.14, 1.30);
    innerFlameShape.bezierCurveTo(0.20, 1.25, 0.35, 0.95, 0.25, 0.72);
    innerFlameShape.closePath();

    const innerFlameGeo = new THREE.ExtrudeGeometry(innerFlameShape, { depth: 0.04, bevelEnabled: false });
    const innerFlameMat = new THREE.MeshStandardMaterial({
      color: 0xFFB300,
      metalness: 0.8,
      roughness: 0.2
    });
    const innerFlameMesh = new THREE.Mesh(innerFlameGeo, innerFlameMat);
    innerFlameMesh.position.z = 0.11;
    badge.add(innerFlameMesh);

    // 3. Central Lenin Medallion (Vector-precise historical relief)
    const leninCanvas = document.createElement('canvas');
    leninCanvas.width = 512;
    leninCanvas.height = 512;
    const lctx = leninCanvas.getContext('2d');

    const lgrad = lctx.createRadialGradient(256, 256, 20, 256, 256, 256);
    lgrad.addColorStop(0, '#FFF2B2');
    lgrad.addColorStop(0.5, '#F7BF44');
    lgrad.addColorStop(1, '#8D5200');
    lctx.fillStyle = lgrad;
    lctx.beginPath();
    lctx.arc(256, 256, 250, 0, Math.PI * 2);
    lctx.fill();

    // Concentric milled border on medallion
    lctx.lineWidth = 8;
    lctx.strokeStyle = '#6D3600';
    lctx.stroke();

    // Sharp Soviet profile silhouette of V. I. Lenin
    lctx.save();
    lctx.translate(260, 260);
    lctx.scale(1.45, 1.45);
    lctx.shadowColor = '#5A3100';
    lctx.shadowBlur = 6;
    lctx.shadowOffsetX = 2;
    lctx.shadowOffsetY = 2;
    lctx.fillStyle = '#FFFDE7';
    lctx.beginPath();
    lctx.moveTo(15, -95);
    lctx.bezierCurveTo(45, -95, 75, -75, 75, -35);
    lctx.bezierCurveTo(75, 5, 60, 45, 45, 75);
    lctx.lineTo(55, 95);
    lctx.lineTo(-45, 95);
    lctx.lineTo(-35, 70);
    lctx.bezierCurveTo(-20, 50, -10, 40, -15, 30);
    lctx.bezierCurveTo(-28, 38, -45, 35, -45, 20);
    lctx.bezierCurveTo(-45, 12, -35, 5, -28, 2);
    lctx.bezierCurveTo(-38, 0, -42, -5, -38, -10);
    lctx.bezierCurveTo(-32, -12, -25, -10, -22, -12);
    lctx.lineTo(-24, -18);
    lctx.bezierCurveTo(-38, -20, -48, -25, -46, -32);
    lctx.bezierCurveTo(-44, -36, -32, -36, -26, -38);
    lctx.bezierCurveTo(-24, -46, -28, -52, -26, -60);
    lctx.bezierCurveTo(-22, -75, -5, -95, 15, -95);
    lctx.closePath();
    lctx.fill();

    lctx.strokeStyle = '#5A3100';
    lctx.lineWidth = 2.5;
    lctx.beginPath();
    lctx.ellipse(20, -15, 8, 14, 0.1, 0, Math.PI * 2);
    lctx.moveTo(-15, -50);
    lctx.quadraticCurveTo(-5, -52, 5, -46);
    lctx.moveTo(-18, -10);
    lctx.quadraticCurveTo(-28, -8, -38, -10);
    lctx.stroke();
    lctx.restore();

    const leninTex = new THREE.CanvasTexture(leninCanvas);
    leninTex.center.set(0.5, 0.5);
    leninTex.rotation = -Math.PI / 2;
    const medallionGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.05, 32);
    const medallionMat = new THREE.MeshStandardMaterial({
      color: 0xF7BF44,
      metalness: 0.90,
      roughness: 0.22,
      map: leninTex,
      bumpMap: leninTex,
      bumpScale: 0.04
    });
    const medallionMesh = new THREE.Mesh(medallionGeo, [goldRimMat, medallionMat, goldRimMat]);
    medallionMesh.rotation.x = Math.PI / 2;
    medallionMesh.position.z = 0.17;
    badge.add(medallionMesh);

    // 4. Ribbon Bar at Bottom with «ВСЕГДА ГОТОВ!»
    const ribbonCanvas = document.createElement('canvas');
    ribbonCanvas.width = 512;
    ribbonCanvas.height = 128;
    const rctx = ribbonCanvas.getContext('2d');
    rctx.fillStyle = '#B71C1C';
    rctx.fillRect(0, 0, 512, 128);
    rctx.lineWidth = 10;
    rctx.strokeStyle = '#FFE082';
    rctx.strokeRect(5, 5, 502, 118);

    rctx.font = '900 58px "JetBrains Mono", sans-serif';
    rctx.fillStyle = '#FFFDE7';
    rctx.textAlign = 'center';
    rctx.textBaseline = 'middle';
    rctx.fillText('ВСЕГДА ГОТОВ!', 256, 64);

    const ribbonTex = new THREE.CanvasTexture(ribbonCanvas);
    const ribbonGeo = new THREE.BoxGeometry(1.22, 0.28, 0.06);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: ribbonTex,
      metalness: 0.4,
      roughness: 0.3
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbonMesh.position.set(0, -0.66, 0.12);
    badge.add(ribbonMesh);

    // 5. Reverse Assembly: Brass Backplate, Pin & Needle
    const backplateMat = new THREE.MeshStandardMaterial({
      color: 0x8D6E63,
      metalness: 0.72,
      roughness: 0.38
    });
    const needleMat = new THREE.MeshStandardMaterial({
      color: 0xCFD8DC,
      metalness: 0.95,
      roughness: 0.15
    });

    const needleGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.25, 12);
    const needleMesh = new THREE.Mesh(needleGeo, needleMat);
    needleMesh.rotation.z = Math.PI / 2;
    needleMesh.position.set(0, 0.1, -0.06);
    badge.add(needleMesh);

    const hingeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 12);
    const hingeMesh = new THREE.Mesh(hingeGeo, backplateMat);
    hingeMesh.position.set(-0.55, 0.1, -0.06);
    badge.add(hingeMesh);

    const claspGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const claspMesh = new THREE.Mesh(claspGeo, backplateMat);
    claspMesh.position.set(0.55, 0.1, -0.06);
    badge.add(claspMesh);

    return badge;
  }

  const badge3D = buildPioneerBadge();
  badgeGroup.add(badge3D);

  mainGroup.position.set(0, 0, 0);

  // Hide hint on interaction
  controls.addEventListener('start', () => {
    const hint = document.querySelector('.artifact-stage-hint');
    if (hint) hint.style.opacity = '0';
  });

  // Animation Loop with IntersectionObserver
  let isVisible = true;
  let targetRotY = 0;
  let currentRotY = 0;
  let isFlipping = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.1 });
  observer.observe(stage);

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    controls.update();

    if (isFlipping) {
      currentRotY += (targetRotY - currentRotY) * 0.1;
      mainGroup.rotation.y = currentRotY;
      if (Math.abs(targetRotY - currentRotY) < 0.01) {
        currentRotY = targetRotY;
        mainGroup.rotation.y = currentRotY;
        isFlipping = false;
      }
    }

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  function handleResize() {
    if (!canvas || !canvas.parentElement) return;
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight || 340;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', handleResize);

  // Button: Spin 360°
  if (btnSpin) {
    btnSpin.addEventListener('click', () => {
      controls.autoRotate = !controls.autoRotate;
      btnSpin.classList.toggle('active', controls.autoRotate);
    });
  }

  // Button: Flip 180° (Obverse / Reverse)
  if (btnFlip) {
    btnFlip.addEventListener('click', () => {
      controls.autoRotate = false;
      if (btnSpin) btnSpin.classList.remove('active');
      targetRotY += Math.PI;
      isFlipping = true;
    });
  }

  // Button: Reset view
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      controls.autoRotate = false;
      if (btnSpin) btnSpin.classList.remove('active');
      controls.reset();
      camera.position.set(0, 0, 3.4);
      controls.target.set(0, 0, 0);
      targetRotY = 0;
      currentRotY = 0;
      mainGroup.rotation.set(0, 0, 0);
      isFlipping = false;
    });
  }

  // Artifact Tab switching (2 artifacts: Medal, Pioneer)
  function switchArtifact(type) {
    controls.autoRotate = false;
    if (btnSpin) btnSpin.classList.remove('active');
    targetRotY = 0;
    currentRotY = 0;
    mainGroup.rotation.set(0, 0, 0);
    isFlipping = false;

    medalGroup.visible = (type === 'medal');
    badgeGroup.visible = (type === 'badge');

    if (tabMedal) {
      tabMedal.classList.toggle('active', type === 'medal');
      tabMedal.setAttribute('aria-selected', type === 'medal');
    }
    if (tabBadge) {
      tabBadge.classList.toggle('active', type === 'badge');
      tabBadge.setAttribute('aria-selected', type === 'badge');
    }

    const data = ARTIFACT_DATA[type];
    if (data && dossierStamp && dossierTitle) {
      dossierStamp.textContent = data.stamp;
      dossierTag.textContent = data.tag;
      dossierTitle.textContent = data.title;
      dossierDesc.textContent = data.desc;

      if (dossierSpecs) {
        dossierSpecs.innerHTML = data.specs.map(s => `
          <div class="spec-card">
            <span class="spec-label">${s.label}</span>
            <strong class="spec-value">${s.val}</strong>
          </div>
        `).join('');
      }
    }
  }

  if (tabMedal) tabMedal.addEventListener('click', () => switchArtifact('medal'));
  if (tabBadge) tabBadge.addEventListener('click', () => switchArtifact('badge'));
}

/* --------------------------------------------------------------------------
   12. THREE.JS WEBGL ERISMAN DESK SIMULATOR (ГОСТ 11015-77)
   -------------------------------------------------------------------------- */
function init3DDesk() {
  const canvas = document.getElementById('desk-webgl-canvas');
  const container = document.getElementById('desk-webgl-container');
  const btnToggleLid = document.getElementById('btn-toggle-lid');
  const lidText = document.getElementById('lid-btn-text');
  const hotspotTitle = document.getElementById('hotspot-title');
  const hotspotDesc = document.getElementById('hotspot-desc');
  const btnReset = document.getElementById('btn-desk-reset');

  const btnMode3d = document.getElementById('btn-mode-3d');
  const btnMode2d = document.getElementById('btn-mode-2d');
  const stage3d = document.getElementById('desk-3d-stage');
  const stage2d = document.getElementById('desk-2d-stage');

  if (!canvas || !container) return;

  // Verify THREE is available
  if (typeof THREE === 'undefined') {
    container.innerHTML = '<div style="color:#e5a93c;padding:40px;text-align:center;">Библиотека Three.js загружается...</div>';
    return;
  }

  // Audio synthesizer for wooden desk lid acoustic resonance
  function playDeskLidSound(opening) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    const baseFreq = opening ? 160 : 120;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.16);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  // --- 1. Scene & Camera Setup ---
  const scene = new THREE.Scene();
  scene.background = null; // Transparent, CSS radial gradient behind

  const width = container.clientWidth || 700;
  const height = container.clientHeight || 480;

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(3.8, 2.6, 3.8);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // --- 2. Orbit Controls ---
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 2.2;
  controls.maxDistance = 8.5;
  controls.minPolarAngle = 0.1;
  controls.maxPolarAngle = Math.PI / 2 + 0.08;
  controls.target.set(0, 0.4, 0);

  // --- 3. Lighting ---
  const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
  dirLight.position.set(4, 7, 5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.bias = -0.001;
  scene.add(dirLight);

  const rimLight = new THREE.DirectionalLight(0xe5a93c, 0.8);
  rimLight.position.set(-5, 3, -4);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0x8fa3bf, 0.5);
  fillLight.position.set(0, -3, 3);
  scene.add(fillLight);

  // --- 4. Procedural Canvas Textures (Zero CORS, 100% Offline) ---
  function makeWoodTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');

    // Rich warm golden honey-amber varnish
    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0, '#B37032');
    grad.addColorStop(0.3, '#C9823B');
    grad.addColorStop(0.7, '#A5632A');
    grad.addColorStop(1, '#B37032');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Fine grain fibers
    for (let y = 0; y < 1024; y++) {
      const alpha = 0.04 + Math.random() * 0.06;
      ctx.fillStyle = `rgba(60, 32, 10, ${alpha})`;
      ctx.fillRect(0, y, 1024, 1);
    }

    // Natural wood growth rings and gentle waves
    ctx.strokeStyle = 'rgba(75, 40, 15, 0.12)';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 40; i++) {
      const baseY = i * 26 + (Math.random() * 8);
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= 1024; x += 32) {
        const wave = Math.sin(x * 0.008 + i) * 12 + Math.cos(x * 0.02) * 4;
        ctx.lineTo(x, baseY + wave);
      }
      ctx.stroke();
    }

    // Authentic wood knots with concentric resin halos
    for (let k = 0; k < 6; k++) {
      const kx = 120 + k * 160 + (Math.random() * 40 - 20);
      const ky = 100 + (k % 3) * 320 + (Math.random() * 60 - 30);
      const rgrad = ctx.createRadialGradient(kx, ky, 2, kx, ky, 26);
      rgrad.addColorStop(0, 'rgba(45, 20, 8, 0.7)');
      rgrad.addColorStop(0.4, 'rgba(90, 42, 16, 0.35)');
      rgrad.addColorStop(1, 'transparent');
      ctx.fillStyle = rgrad;
      ctx.beginPath();
      ctx.ellipse(kx, ky, 28, 14, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    const t = new THREE.CanvasTexture(c);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return t;
  }

  function makeIronTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#212529';
    ctx.fillRect(0, 0, 512, 512);

    // Cast iron pebble roughness
    const idata = ctx.getImageData(0, 0, 512, 512);
    const d = idata.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 32;
      d[i] = Math.min(255, Math.max(0, 36 + n));
      d[i + 1] = Math.min(255, Math.max(0, 40 + n));
      d[i + 2] = Math.min(255, Math.max(0, 46 + n));
    }
    ctx.putImageData(idata, 0, 0);

    // Embossed Soviet standard stamp: «ГОСТ 11015-77»
    ctx.save();
    ctx.font = '900 24px "JetBrains Mono", sans-serif';
    ctx.fillStyle = 'rgba(15, 18, 22, 0.85)';
    ctx.fillText('ГОСТ 11015-77', 158, 248);
    ctx.fillStyle = 'rgba(75, 85, 95, 0.75)';
    ctx.fillText('ГОСТ 11015-77', 156, 246);

    ctx.font = '700 16px "JetBrains Mono", sans-serif';
    ctx.fillStyle = 'rgba(75, 85, 95, 0.65)';
    ctx.fillText('З-Д ШКОЛЬНОЙ МЕБЕЛИ №3', 130, 276);
    ctx.restore();

    return new THREE.CanvasTexture(c);
  }

  function makeNotebookTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');

    // Authentic cream school notebook paper
    ctx.fillStyle = '#FBF8EE';
    ctx.fillRect(0, 0, 512, 512);

    // Vignette shadow on paper edges
    const vgrad = ctx.createRadialGradient(256, 256, 200, 256, 256, 260);
    vgrad.addColorStop(0, 'transparent');
    vgrad.addColorStop(1, 'rgba(120, 100, 80, 0.12)');
    ctx.fillStyle = vgrad;
    ctx.fillRect(0, 0, 512, 512);

    // Red Left Margin Line (Поля)
    ctx.strokeStyle = '#E53935';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(90, 0);
    ctx.lineTo(90, 512);
    ctx.stroke();

    // Pale Blue Slanted Guide Lines (Косая линейка)
    ctx.strokeStyle = 'rgba(92, 138, 196, 0.35)';
    ctx.lineWidth = 1;

    for (let y = 60; y < 490; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();

      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(92, 138, 196, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, y - 8);
      ctx.lineTo(512, y - 8);
      ctx.stroke();
      ctx.restore();
    }

    // 45-degree slanted guidelines
    ctx.strokeStyle = 'rgba(92, 138, 196, 0.22)';
    for (let x = -300; x < 700; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 360, 512);
      ctx.stroke();
    }

    // Calligraphic handwritten text in purple/violet ink
    ctx.font = 'italic 700 24px "Times New Roman", serif';
    ctx.fillStyle = '#311B92';

    ctx.save();
    ctx.fillText('12 сентября', 180, 56);
    ctx.fillText('Классная работа', 140, 100);

    ctx.font = 'italic 600 22px "Times New Roman", serif';
    ctx.fillText('Мы не рабы, рабы не мы.', 105, 144);
    ctx.fillText('Мама мыла раму с мылом.', 105, 188);
    ctx.fillText('В лесу родилась ёлочка.', 105, 232);
    ctx.fillText('2 + 2 = 4      5 × 5 = 25', 105, 276);
    ctx.restore();

    // Red Teacher Grade «5 (отл)» with checkmark
    ctx.save();
    ctx.font = 'bold 36px "Brush Script MT", cursive, sans-serif';
    ctx.fillStyle = '#C62828';
    ctx.fillText('✓ 5 (отл)', 340, 130);
    ctx.fillText('Молодец!', 340, 168);
    ctx.restore();

    // Top Header: «ТЕТРАДЬ • 12 ЛИСТОВ • ЦЕНА 2 КОП.»
    ctx.save();
    ctx.font = '800 12px "JetBrains Mono", sans-serif';
    ctx.fillStyle = 'rgba(60, 60, 60, 0.45)';
    ctx.fillText('ТЕТРАДЬ ДЛЯ 1 КЛАССА • МИНПРОСВЕЩЕНИЯ СССР • ЦЕНА 2 КОП.', 20, 24);
    ctx.restore();

    return new THREE.CanvasTexture(c);
  }

  const woodTexture = makeWoodTexture();
  const ironTexture = makeIronTexture();

  const woodMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.32,
    metalness: 0.03,
    color: 0xaa733e
  });

  const ironMaterial = new THREE.MeshStandardMaterial({
    map: ironTexture,
    roughness: 0.68,
    metalness: 0.70,
    color: 0x22262a
  });

  const porcelainMaterial = new THREE.MeshStandardMaterial({
    color: 0xfcfcfa,
    roughness: 0.08,
    metalness: 0.05
  });

  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.32,
    metalness: 0.82
  });

  // --- 5. Assemble Realistic Erisman Desk (ГОСТ 11015-77) ---
  const deskGroup = new THREE.Group();
  scene.add(deskGroup);

  // A. Cast-Iron Side Frames (Left & Right) with Bolt Heads
  const ironSideGeo = new THREE.BoxGeometry(0.08, 0.85, 0.08);
  const ironBaseGeo = new THREE.BoxGeometry(0.1, 0.06, 1.6);
  const tieBarGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.1, 16);
  tieBarGeo.rotateZ(Math.PI / 2);

  const boltGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.02, 6);
  boltGeo.rotateZ(Math.PI / 2);
  const boltMat = new THREE.MeshStandardMaterial({ color: 0x8D6E63, metalness: 0.85, roughness: 0.3 });

  [-1.0, 1.0].forEach(x => {
    // Front table upright
    const legFront = new THREE.Mesh(ironSideGeo, ironMaterial);
    legFront.position.set(x, 0.425, -0.45);
    legFront.castShadow = true;
    deskGroup.add(legFront);

    // Rear bench upright
    const legBack = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), ironMaterial);
    legBack.position.set(x, 0.25, 0.55);
    legBack.castShadow = true;
    deskGroup.add(legBack);

    // Rigid bottom runner (connecting desk and bench)
    const baseRunner = new THREE.Mesh(ironBaseGeo, ironMaterial);
    baseRunner.position.set(x, 0.03, 0.05);
    baseRunner.castShadow = true;
    deskGroup.add(baseRunner);

    // Diagonal stiffener strut with openwork truss
    const strutGeo = new THREE.BoxGeometry(0.06, 0.05, 1.15);
    const strut = new THREE.Mesh(strutGeo, ironMaterial);
    strut.position.set(x, 0.38, 0.05);
    strut.rotation.x = 0.22;
    deskGroup.add(strut);

    // Authentic hexagonal bolt heads on cast iron
    [0.15, 0.45, 0.75].forEach(by => {
      const bolt = new THREE.Mesh(boltGeo, boltMat);
      bolt.position.set(x > 0 ? x + 0.045 : x - 0.045, by, -0.45);
      deskGroup.add(bolt);
    });
  });

  // Tie Bar (Стяжка)
  const tieBar = new THREE.Mesh(tieBarGeo, ironMaterial);
  tieBar.position.set(0, 0.15, 0.05);
  tieBar.castShadow = true;
  deskGroup.add(tieBar);

  // Elevated Footrest Plank (Подножка для упора ног)
  const footrestGeo = new THREE.BoxGeometry(2.0, 0.04, 0.16);
  const footrest = new THREE.Mesh(footrestGeo, woodMaterial);
  footrest.position.set(0, 0.18, 0.02);
  footrest.castShadow = true;
  deskGroup.add(footrest);

  // B. Wooden Bench (Скамья)
  // Contoured Bench Plank
  const benchPlankGeo = new THREE.BoxGeometry(2.1, 0.045, 0.34);
  const benchPlank = new THREE.Mesh(benchPlankGeo, woodMaterial);
  benchPlank.position.set(0, 0.48, 0.55);
  benchPlank.castShadow = true;
  deskGroup.add(benchPlank);

  // Lumbar Backrest (Поясничный анатомический упор)
  const backrestGeo = new THREE.BoxGeometry(2.1, 0.16, 0.035);
  const backrest = new THREE.Mesh(backrestGeo, woodMaterial);
  backrest.position.set(0, 0.72, 0.73);
  backrest.rotation.x = -0.08;
  backrest.castShadow = true;
  deskGroup.add(backrest);

  // C. Main Desk Table Body
  // Side wooden aprons
  [-0.96, 0.96].forEach(x => {
    const sideApronGeo = new THREE.BoxGeometry(0.04, 0.26, 0.72);
    const sideApron = new THREE.Mesh(sideApronGeo, woodMaterial);
    sideApron.position.set(x, 0.74, -0.45);
    sideApron.rotation.x = -0.26; // 15 degrees tilt
    deskGroup.add(sideApron);
  });

  // Under-desk Cubby Bottom Shelf (Подстолье для книг)
  const cubbyShelfGeo = new THREE.BoxGeometry(1.92, 0.03, 0.68);
  const cubbyShelf = new THREE.Mesh(cubbyShelfGeo, woodMaterial);
  cubbyShelf.position.set(0, 0.65, -0.45);
  cubbyShelf.rotation.x = -0.26;
  cubbyShelf.receiveShadow = true;
  deskGroup.add(cubbyShelf);

  // Textbook inside cubby ("Арифметика 1958")
  const bookGeo = new THREE.BoxGeometry(0.35, 0.04, 0.48);
  const bookMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.5 });
  const bookMesh = new THREE.Mesh(bookGeo, bookMat);
  bookMesh.position.set(-0.35, 0.68, -0.45);
  bookMesh.rotation.x = -0.26;
  bookMesh.rotation.y = 0.05;
  deskGroup.add(bookMesh);

  // D. Fixed Rear Shelf (Горизонтальная задняя полка с чернильницей)
  const fixedShelfGeo = new THREE.BoxGeometry(2.1, 0.045, 0.22);
  const fixedShelf = new THREE.Mesh(fixedShelfGeo, woodMaterial);
  fixedShelf.position.set(0, 0.88, -0.76);
  fixedShelf.castShadow = true;
  deskGroup.add(fixedShelf);

  // Dual Porcelain Inkwell Socket & Porcelain Inkwell (Чернильница-непроливайка)
  const inkwellOuterGeo = new THREE.CylinderGeometry(0.062, 0.050, 0.072, 28);
  const inkwellOuter = new THREE.Mesh(inkwellOuterGeo, porcelainMaterial);
  inkwellOuter.position.set(0, 0.92, -0.76);
  inkwellOuter.castShadow = true;
  deskGroup.add(inkwellOuter);

  // Deep Violet Ink inside with mirror meniscus
  const inkInnerGeo = new THREE.CylinderGeometry(0.044, 0.02, 0.045, 24);
  const inkInnerMat = new THREE.MeshStandardMaterial({
    color: 0x1A0933,
    roughness: 0.04,
    metalness: 0.3
  });
  const inkInner = new THREE.Mesh(inkInnerGeo, inkInnerMat);
  inkInner.position.set(0, 0.945, -0.76);
  deskGroup.add(inkInner);

  // Pen Groove & Wooden Dip Pen with Steel Nib №86
  const penGeo = new THREE.CylinderGeometry(0.009, 0.007, 0.44, 16);
  penGeo.rotateZ(Math.PI / 2);
  const penMat = new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.3 });
  const pen = new THREE.Mesh(penGeo, penMat);
  pen.position.set(0.45, 0.915, -0.76);
  deskGroup.add(pen);

  const nibGeo = new THREE.ConeGeometry(0.012, 0.042, 8);
  nibGeo.rotateZ(-Math.PI / 2);
  const steelNibMat = new THREE.MeshStandardMaterial({ color: 0xE0E0E0, metalness: 0.95, roughness: 0.15 });
  const nib = new THREE.Mesh(nibGeo, steelNibMat);
  nib.position.set(0.68, 0.915, -0.76);
  deskGroup.add(nib);

  // E. Hinged Lid Assembly (Откидная створка парты)
  // Pivot placed right at the seam between fixed shelf and slope
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, 0.87, -0.65);
  deskGroup.add(lidPivot);

  // Lid mesh (centered forward relative to pivot)
  const lidPlankGeo = new THREE.BoxGeometry(2.1, 0.04, 0.52);
  const lidMesh = new THREE.Mesh(lidPlankGeo, woodMaterial);
  lidMesh.position.set(0, 0, 0.26);
  lidMesh.castShadow = true;
  lidMesh.receiveShadow = true;
  lidPivot.add(lidMesh);

  // Brass Hinges (Латунные петли)
  [-0.65, 0.65].forEach(hx => {
    const hingeGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.08, 12);
    hingeGeo.rotateZ(Math.PI / 2);
    const hinge = new THREE.Mesh(hingeGeo, brassMaterial);
    hinge.position.set(hx, 0.018, 0.01);
    lidPivot.add(hinge);
  });

  // Authentic Soviet School Notebook on the Lid
  const notebookTex = makeNotebookTexture();
  const notebookGeo = new THREE.PlaneGeometry(0.48, 0.38);
  const notebookMat = new THREE.MeshStandardMaterial({
    map: notebookTex,
    roughness: 0.85,
    metalness: 0.05,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1
  });
  const notebookMesh = new THREE.Mesh(notebookGeo, notebookMat);
  notebookMesh.rotation.x = -Math.PI / 2;
  notebookMesh.position.set(-0.52, 0.024, 0.28);
  notebookMesh.receiveShadow = true;
  lidPivot.add(notebookMesh);

  // Wooden Student Ruler on the Lid (20 см по ГОСТу)
  const rulerGeo = new THREE.BoxGeometry(0.38, 0.008, 0.038);
  const rulerMat = new THREE.MeshStandardMaterial({ color: 0xD7CCC8, roughness: 0.55 });
  const rulerMesh = new THREE.Mesh(rulerGeo, rulerMat);
  rulerMesh.position.set(0.55, 0.024, 0.40);
  rulerMesh.rotation.y = 0.08;
  lidPivot.add(rulerMesh);

  // Soft Contact Ground Shadow
  const shadowGeo = new THREE.PlaneGeometry(3.2, 2.2);
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sctx = shadowCanvas.getContext('2d');
  const sgrad = sctx.createRadialGradient(128, 128, 20, 128, 128, 120);
  sgrad.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
  sgrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.25)');
  sgrad.addColorStop(1, 'transparent');
  sctx.fillStyle = sgrad;
  sctx.fillRect(0, 0, 256, 256);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.7,
    depthWrite: false
  });
  const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.005;
  scene.add(shadowPlane);

  // --- 6. Lid Animation & State ---
  let isLidOpen = false;
  let currentLidAngle = -0.26; // Resting 15 degrees tilt
  let targetLidAngle = -0.26;

  function setLidState(open) {
    isLidOpen = open;
    targetLidAngle = isLidOpen ? 0.95 : -0.26; // 0.95 rad ≈ 55 deg open
    playDeskLidSound(isLidOpen);

    if (btnToggleLid && lidText) {
      lidText.textContent = isLidOpen ? 'Опустить крышку парты' : 'Поднять крышку парты';
    }

    if (hotspotTitle && hotspotDesc) {
      if (isLidOpen) {
        hotspotTitle.textContent = '🪑 Крышка парты поднята:';
        hotspotDesc.textContent = 'Обратите внимание на открывшуюся внутреннюю нишу (подстолье) для хранения учебников и тетрадей. Откидная створка позволяла вставать без малейшего шума.';
      } else {
        hotspotTitle.textContent = '📐 Наклон 15° активен:';
        hotspotDesc.textContent = 'Крышка опущена в рабочее положение под углом 15 градусов, гарантируя строго перпендикулярное падение взгляда на строки тетради.';
      }
    }
  }

  function toggleLid() {
    setLidState(!isLidOpen);
  }

  if (btnToggleLid) btnToggleLid.addEventListener('click', toggleLid);

  // Raycaster for clicking directly on lid
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([lidMesh, fixedShelf, inkwellOuter], true);
    if (intersects.length > 0) {
      toggleLid();
    }
  });

  // --- 7. Camera Presets Smooth Tweening ---
  let targetCamPos = new THREE.Vector3(3.8, 2.6, 3.8);
  let targetControlsTarget = new THREE.Vector3(0, 0.45, 0);

  const PRESETS = {
    iso: { pos: new THREE.Vector3(3.8, 2.6, 3.8), target: new THREE.Vector3(0, 0.45, 0) },
    student: { pos: new THREE.Vector3(0, 1.45, 1.55), target: new THREE.Vector3(0, 0.72, -0.45) },
    profile: { pos: new THREE.Vector3(4.8, 0.65, 0.05), target: new THREE.Vector3(0, 0.5, 0) },
    front: { pos: new THREE.Vector3(0.01, 1.4, 4.4), target: new THREE.Vector3(0, 0.55, 0) },
    top: { pos: new THREE.Vector3(0.05, 5.2, 0.05), target: new THREE.Vector3(0, 0.45, 0) }
  };

  const presetBtns = document.querySelectorAll('.btn-preset');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const p = PRESETS[btn.dataset.preset];
      if (p) {
        targetCamPos.copy(p.pos);
        targetControlsTarget.copy(p.target);
      }
    });
  });

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      const isoBtn = document.querySelector('.btn-preset[data-preset="iso"]');
      if (isoBtn) isoBtn.classList.add('active');
      targetCamPos.copy(PRESETS.iso.pos);
      targetControlsTarget.copy(PRESETS.iso.target);
    });
  }

  // --- 8. Anatomy Hotspot Buttons ---
  const HOTSPOT_EXPLANATIONS = {
    lid: {
      title: "Откидная деревянная створка:",
      desc: "Крепилась на латунных шарнирах. Позволяла ученику мгновенно встать по стойке «смирно» при входе учителя без сдвигания мебели и грохота.",
      cam: new THREE.Vector3(2.8, 2.4, 2.8)
    },
    angle: {
      title: "Наклон столешницы 15° (ГОСТ 11015-77):",
      desc: "Обеспечивает строго перпендикулярное направление оптической оси глаз к тексту, полностью устраняя необходимость нагибать шею и предотвращая школьную близорукость.",
      cam: new THREE.Vector3(4.6, 0.7, 0.2)
    },
    distance: {
      title: "Отрицательная дистанция 4 см:",
      desc: "Передний край скамьи заходит под столешницу на 4 см. При такой геометрии ученик физически не может развалиться или сесть боком — грудная клетка и поясница поддерживаются анатомически верно.",
      cam: new THREE.Vector3(4.2, 0.9, 0.3)
    },
    ink: {
      title: "Чернильница-непроливайка и желобок:",
      desc: "Фарфоровая или эбонитовая ёмкость с внутренним конусом. Даже при падении чернила не выливались на тетрадь. Рядом — желобок для перьевой ручки с пером № 86 («звёздочка»).",
      cam: new THREE.Vector3(1.2, 2.0, -1.2)
    },
    footrest: {
      title: "Подножка и поясничный упор:",
      desc: "Широкая наклонная подставка для ног обеспечивала разгрузку подколенных кровеносных сосудов, а спинка на уровне поясницы удерживала позвоночный столб в естественном S-образном изгибе.",
      cam: new THREE.Vector3(3.2, 1.2, 1.5)
    }
  };

  const hotspotBtns = document.querySelectorAll('.dhb-btn');
  hotspotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hotspotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pin = btn.dataset.pin;
      const data = HOTSPOT_EXPLANATIONS[pin];
      if (data && hotspotTitle && hotspotDesc) {
        hotspotTitle.textContent = data.title;
        hotspotDesc.textContent = data.desc;
        if (data.cam) {
          targetCamPos.copy(data.cam);
        }
        if (pin === 'lid') {
          setLidState(true);
        }
      }
    });
  });

  // Switcher between 3D Model and 2D Blueprint
  if (btnMode3d && btnMode2d) {
    btnMode3d.addEventListener('click', () => {
      btnMode3d.classList.add('active');
      btnMode2d.classList.remove('active');
      if (stage3d) stage3d.style.display = 'block';
      if (stage2d) stage2d.style.display = 'none';
    });

    btnMode2d.addEventListener('click', () => {
      btnMode2d.classList.add('active');
      btnMode3d.classList.remove('active');
      if (stage3d) stage3d.style.display = 'none';
      if (stage2d) stage2d.style.display = 'block';
    });
  }

  // --- 9. Resize & Render Loop with Intersection Observer ---
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.1 });
  observer.observe(container);

  function onWindowResize() {
    const w = container.clientWidth || 700;
    const h = container.clientHeight || 480;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onWindowResize);

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return; // Pause rendering when off-screen

    // Animate lid smooth swing
    currentLidAngle += (targetLidAngle - currentLidAngle) * 0.14;
    lidPivot.rotation.x = currentLidAngle;

    // Smooth camera tween
    camera.position.lerp(targetCamPos, 0.08);
    controls.target.lerp(targetControlsTarget, 0.08);

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

/* --------------------------------------------------------------------------
   13. 3D FLIP CARDS FOR GENERATIONS SECTION
   -------------------------------------------------------------------------- */
function init3DCardFlips() {
  document.querySelectorAll('.btn-card-flip').forEach(btn => {
    btn.addEventListener('click', () => {
      const card3d = btn.closest('.gen-card-3d');
      if (card3d) {
        const front = card3d.querySelector('.gen-card-front');
        if (front) {
          front.style.transform = '';
          const glare = front.querySelector('.tilt-glare');
          if (glare) glare.style.background = 'transparent';
        }
        card3d.classList.add('is-flipped');
      }
    });
  });

  document.querySelectorAll('.btn-card-flip-back').forEach(btn => {
    btn.addEventListener('click', () => {
      const card3d = btn.closest('.gen-card-3d');
      if (card3d) {
        card3d.classList.remove('is-flipped');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   14. UNIVERSAL 3D TILT EFFECT & SPECULAR SHEEN
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const tiltElements = document.querySelectorAll('[data-tilt]');

  tiltElements.forEach(el => {
    let glare = el.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare';
      el.appendChild(glare);
    }

    el.addEventListener('mousemove', (e) => {
      const card3d = el.closest('.gen-card-3d');
      if (card3d && card3d.classList.contains('is-flipped')) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((centerY - y) / centerY) * 7.5;
      const rotateY = ((x - centerX) / centerX) * 7.5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28) 0%, transparent 65%)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.1s ease-out';
    });
  });
}

/* --------------------------------------------------------------------------
   15. SMOOTH SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.content-section, .stat-card, .routine-card, .subject-card, .stage-card, .hero-3d-showcase'
  );

  elements.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   16. FLOATING BACK TO TOP BUTTON WITH SCROLL RING
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btt = document.getElementById('back-to-top');
  const circle = document.getElementById('progress-ring-circle');
  if (!btt) return;

  const circumference = 2 * Math.PI * 20; // 125.66

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = height > 0 ? winScroll / height : 0;

    if (winScroll > 380) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }

    if (circle) {
      const offset = circumference - progress * circumference;
      circle.style.strokeDashoffset = offset;
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}



/* ==========================================================================
   17. POCKET RELICS & MATERIALS SCIENCE INTERACTION
   ========================================================================== */
const POCKET_RELICS = {
  coin15: {
    emoji: "🪙",
    title: "15 копеек (Медно-никелевый сплав 1961 г.)",
    badge: "ВАЛЮТА ДЕТСТВА",
    desc: "Главная монета советского школьника. Если в кармане звенели 15 копеек, день удался: можно было выпить 5 стаканов газировки с сиропом (по 3 коп.), сходить на утренний киносеанс (10 коп.) и купить булочку за 5 коп. Либо добавить 4 копейки и купить заветный пломбир за 19 коп.",
    specs: [
      { label: "Диаметр и вес", val: "19,56 мм • 2,5 грамма" },
      { label: "Материал", val: "Медно-никелевый сплав (мельхиор)" },
      { label: "Покупательная способность", val: "5 стаканов лимонада / 7 поездок на трамвае" },
      { label: "Звук в кармане", val: "Звонкий чистый металлический тембр" }
    ],
    secret: "Именно 15-копеечная монета опускалась в монетоприёмники первых советских игровых автоматов («Морской бой», «Магистраль», «Снайпер»)."
  },
  knife: {
    emoji: "🐿️",
    title: "Складной перочинный ножик «Белка»",
    badge: "МЕЧТА МАЛЬЧИШЕК",
    desc: "Культовый складной нож производства завода «Складные ножи» (г. Ворсма, Горьковская область). На черных или коричневых пластмассовых накладках красовалось рельефное изображение белки. Стоил ровно 1 рубль 60 копеек.",
    specs: [
      { label: "Цена в СССР", val: "1 руб. 60 коп. (выбито на рукояти)" },
      { label: "Сталь клинка", val: "Инструментальная сталь У8 / 65Г" },
      { label: "Длина клинка", val: "85 мм (разрешен ГОСТом)" },
      { label: "Игры на переменках", val: "«Ножички», «Земля», «Города»" }
    ],
    secret: "Этим ножом затачивали карандаши на уроках черчения, вырезали рогатки из веток сирени и свистульки из ивы весной."
  },
  slingshot: {
    emoji: "🪃",
    title: "Классическая рогатка из аптечного жгута",
    badge: "ОРУЖИЕ ДВОРА",
    desc: "Самодельное оружие советского детства. Срезалась прочная V-образная развилка из ясеня или сирени, шлифовалась стеклом. В аптеке покупался серый резиновый бинт (жгут) за 11 копеек. «Кожетком» служил язычок от старого кожаного ботинка.",
    specs: [
      { label: "Дальность стрельбы", val: "До 40–50 метров" },
      { label: "Боеприпасы", val: "Гравий, шарики от подшипников, рябина" },
      { label: "Цена материалов", val: "11 копеек (аптечный жгут)" },
      { label: "Школьный статус", val: "Конфисковывалась завучем мгновенно" }
    ],
    secret: "Опытный стрелок мог с 15 метров сбить консервную банку с забора или попасть в спичечный коробок."
  },
  beetle: {
    emoji: "🪲",
    title: "Спичечный коробок с майским жуком",
    badge: "ТАЙНЫЙ ПИТОМЕЦ",
    desc: "В мае каждый уважающий себя советский школьник носил в кармане коробок спичек фабрики «Балабаново» (1 копейка) с проделанными иголкой дырочками для воздуха. Внутри сидел живой хрущ (майский жук) на свежих березовых листьях.",
    specs: [
      { label: "Вместимость", val: "1–2 отборных майских жука" },
      { label: "Корм", val: "Молодые клейкие листья берёзы" },
      { label: "Особый звук", val: "Характерное шуршание лапками на уроке" },
      { label: "Степень риска", val: "Побег жука посреди контрольной работы" }
    ],
    secret: "Иногда к лапке жука привязывали длинную тонкую нитку от катушки № 40 и запускали летать по школьному коридору, как живой вертолёт."
  },
  "tram-ticket": {
    emoji: "🎫",
    title: "Счастливый трамвайный билетик (3 коп.)",
    badge: "МАГИЯ ЦИФР",
    desc: "Абонементный талон на проезд в городском трамвае за 3 копейки. В салоне стоял механический компостер — пассажир сам вставлял билет и нажимал рычаг, пробивая индивидуальный узор отверстий. Билет считался счастливым, если сумма первых трёх цифр шестизначного номера совпадала с суммой последних трёх!",
    specs: [
      { label: "Стоимость", val: "Трамвай — 3 коп., Троллейбус — 4 коп., Автобус — 5 коп." },
      { label: "Ритуал", val: "Счастливый билет полагалось... съесть!" },
      { label: "Контроль", val: "Штраф за безбилетный проезд — 1 рубль" },
      { label: "Компостер", val: "Механический чугунный перфоратор" }
    ],
    secret: "Коллекции прокомпостированных счастливых билетиков бережно хранили между страницами школьного словаря или под обложкой дневника."
  },
  "button-pin": {
    emoji: "📌",
    title: "Канцелярская медная кнопка",
    badge: "ПАРТИЗАНСКИЙ ШАЛОСТНИК",
    desc: "Штампованная круглая металлическая кнопка с острым отогнутым треугольным шипом. Официально использовалась для прикалывания стенгазеты «Молния» к фанерному щиту. Неофициально — подкладывалась на учительский стул или на стул соседа по парте.",
    specs: [
      { label: "Цена за коробку (100 шт.)", val: "12 копеек" },
      { label: "Материал", val: "Омеднённая сталь" },
      { label: "Последствия шалости", val: "Вызов родителей и двойка по поведению" },
      { label: "Легендарность", val: "Главный сюжет детского киножурнала «Ералаш»" }
    ],
    secret: "Опытный учитель перед тем, как сесть на деревянный стул, всегда незаметно проводил ладонью по сиденью."
  }
};

function initPocketsAndMaterials() {
  const pocketItems = document.querySelectorAll('.pocket-item');
  const dossierCard = document.getElementById('pocket-dossier-card');

  function renderRelic(relicKey) {
    const relic = POCKET_RELICS[relicKey];
    if (!relic || !dossierCard) return;

    dossierCard.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <span style="font-size:2.8rem;">${relic.emoji}</span>
        <span class="ih-badge">${relic.badge}</span>
      </div>
      <h3 style="font-family:var(--font-display);font-size:1.6rem;color:var(--navy-ink);margin-bottom:10px;">${relic.title}</h3>
      <p style="font-size:0.96rem;line-height:1.6;color:var(--text-main);margin-bottom:18px;">${relic.desc}</p>
      
      <table class="inspector-specs-table">
        <tbody>
          ${relic.specs.map(s => `<tr><th>${s.label}</th><td>${s.val}</td></tr>`).join('')}
        </tbody>
      </table>

      <div class="inspector-fact-quote">
        <strong>💡 Исторический секрет:</strong> ${relic.secret}
      </div>
    `;
  }

  pocketItems.forEach(item => {
    item.addEventListener('click', () => {
      pocketItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      renderRelic(item.dataset.relic);
    });
  });

  // Render initial relic
  renderRelic('coin15');
}

/* ==========================================================================
   18. ARCHIVAL INSPECTOR & COMPREHENSIVE SOVIET GLOSSARY
   ========================================================================== */
const GLOSSARY_DATA = {
  likbez: {
    title: "Ликбез (Ликвидация безграмотности)",
    category: "study",
    catLabel: "Обучение & Реформы",
    epoch: "1919–1940 гг.",
    badge: "ДЕКРЕТ СОВНАРКОМА",
    desc: "Государственная кампания по обучению грамоте всего взрослого населения страны. 26 декабря 1919 года В. И. Ленин подписал декрет: все граждане от 8 до 50 лет, не умевшие читать или писать, обязаны были учиться грамоте на родном или русском языке. За 20 лет уровень грамотности в СССР поднялся с 21% до 89% — невиданный в истории скачок!",
    specs: [
      { label: "Нормативный документ", val: "Декрет СНК РСФСР от 26.12.1919" },
      { label: "Охвачено обучением", val: "Свыше 50 миллионов взрослых людей" },
      { label: "Формат занятий", val: "Избы-читальни, вечерние школы, ликпункты" },
      { label: "Главный лозунг", val: "«Грамотный, обучи неграмотного!»" }
    ],
    quote: "«Безграмотный человек стоит вне политики, его сначала надо научить азбуке» — В. И. Ленин."
  },
  rabfak: {
    title: "Рабфак (Рабочий факультет)",
    category: "study",
    catLabel: "Обучение & ВУЗы",
    epoch: "1919–1940 гг.",
    badge: "СОЦИАЛЬНЫЙ ЛИФТ",
    desc: "Специальные общеобразовательные отделения при университетах и институтах для подготовки рабочей и крестьянской молодежи к высшему образованию. Выпускник рабфака получал аттестат зрелости и право внеконкурсного поступления в любой ВУЗ СССР.",
    specs: [
      { label: "Срок обучения", val: "3 года (вечерний) / 4 года (заочный)" },
      { label: "Состав учащихся", val: "Рабочие от станка и крестьяне от сохи" },
      { label: "Стипендия", val: "100% государственное обеспечение" },
      { label: "Результат", val: "Формирование новой советской научно-технической элиты" }
    ],
    quote: "Рабфаки окончили будущие академики, конструкторы ракетных систем и министры тяжелой промышленности СССР."
  },
  "erisman-desk": {
    title: "Школьная парта Эрисмана (ГОСТ 11015-77)",
    category: "study",
    catLabel: "Предметы & Мебель",
    epoch: "1870–1980-е гг.",
    badge: "ЗОЛОТОЙ СТАНДАРТ ЗДОРОВЬЯ",
    desc: "Конструкция школьной мебели, созданная выдающимся гигиенистом Фёдором Эрисманом и доработанная ссыльным революционером Петром Коротковым (который добавил откидную крышку и желобок для чернильницы). Жесткая связь стола со скамьей и наклон столешницы 15° гарантировали ровную осанку и сохранение детского зрения.",
    specs: [
      { label: "Угол наклона крышки", val: "Ровно 15 градусов" },
      { label: "Дистанция сиденья", val: "Отрицательная (-4 см, край стола нависает над скамьей)" },
      { label: "Материал", val: "Чугунный литой каркас, массив дуба и сосны" },
      { label: "Срок службы", val: "40–50 лет непрерывной эксплуатации" }
    ],
    quote: "Парта Эрисмана не позволяла ребенку сидеть криво, опираться грудью на стол или сутулиться — физика конструкции принуждала держать спину прямо."
  },
  inkwell: {
    title: "Чернильница-непроливайка & Перо № 86",
    category: "relics",
    catLabel: "Школьные реликвии",
    epoch: "До конца 1960-х гг.",
    badge: "ИНСТРУМЕНТ КАЛЛИГРАФИИ",
    desc: "Фарфоровый или эбонитовый стаканчик с конусообразной воронкой внутри. Даже при переворачивании чернила не выливались наружу. В нее макали стальное перо № 86 («звёздочка» или «рондо»), вставленное в деревянную ручку. Уроки чистописания воспитывали филигранную моторику и концентрацию.",
    specs: [
      { label: "Чернила", val: "Фиолетовые на анилиновой основе (заправка 2 коп.)" },
      { label: "Тетрадь", val: "В косую линейку с промокашкой (2 коп.)" },
      { label: "Запрет", val: "Шариковые ручки были строго запрещены до 1968 г." },
      { label: "Цена пера", val: "1 копейка за штуку" }
    ],
    quote: "Нажим — волосная линия, отпуск — тончайшая нить. Почерк советского выпускника 1950-х годов выглядел как типографская гравюра."
  },
  upk: {
    title: "УПК (Учебно-производственный комбинат)",
    category: "life",
    catLabel: "Труд & Профессия",
    epoch: "1974–1991 гг.",
    badge: "ПЕРВАЯ ПРОФЕССИЯ",
    desc: "Один день в неделю (обычно четверг) ученики 9–10 классов проводили не за партами, а на реальных заводах, в автопарках и вычислительных центрах. К выпуску из школы вместе с аттестатом школьник получал настоящее государственное свидетельство с рабочим разрядом!",
    specs: [
      { label: "Частота занятий", val: "1 полный рабочий день в неделю (6 часов)" },
      { label: "Профессии юношей", val: "Автослесарь, токарь, фрезеровщик, водитель категории «С»" },
      { label: "Профессии девушек", val: "Оператор ЭВМ (перфораторщица), медсестра, швея-мотористка" },
      { label: "Итог", val: "Присвоение 2–3 квалификационного разряда" }
    ],
    quote: "В 17 лет советский десятиклассник умел полностью перебрать карбюратор грузовика ГАЗ-53 или написать программу на перфокартах."
  },
  sptu: {
    title: "СПТУ / ПТУ (Профтехучилища)",
    category: "study",
    catLabel: "Образование & Карьера",
    epoch: "1940–1991 гг.",
    badge: "РАБОЧАЯ ГВАРДИЯ",
    desc: "Средние профессионально-технические училища, куда поступали после 8 класса. ПТУ давали полное среднее образование плюс высококвалифицированную рабочую специальность. Учащиеся находились на полном государственном обеспечении: бесплатная форма, 3-разовое питание, общежитие и стипендия.",
    specs: [
      { label: "Срок обучения", val: "3 года (на базе 8 классов)" },
      { label: "Гособеспечение", val: "Бесплатная одежда, питание, проезд" },
      { label: "Стипендия", val: "15–40 рублей + 50% оплаты за практику" },
      { label: "Зарплата на старте", val: "180–300 рублей (больше молодого инженера!)" }
    ],
    quote: "Рабочий класс в СССР обладал колоссальным престижем и социальной защищенностью: путевки в санатории, квартиры от завода и почет на Доске почета."
  },
  "gold-medal": {
    title: "Золотая медаль выпускника школы",
    category: "study",
    catLabel: "Награды & Экзамены",
    epoch: "С 1945 года",
    badge: "ВЫСШАЯ ДОБЛЕСТЬ",
    desc: "Награда, учрежденная СНК СССР в мае 1945 года для поощрения выдающихся успехов в учебе и примерного поведения. До 1954 года чеканилась из золота 583 пробы (вес 15,6 г чистого золота). Медалист имел законное право поступить в любой ВУЗ СССР, сдав всего один профильный экзамен на «отлично».",
    specs: [
      { label: "Критерий", val: "Оценка «5» (отлично) по всем предметам и поведению" },
      { label: "Материал до 1954 г.", val: "Золото 583 пробы (15,6 г)" },
      { label: "Материал после 1960 г.", val: "Томпак с гальваническим золочением" },
      { label: "Льгота", val: "Зачисление в ВУЗ по результатам одного экзамена" }
    ],
    quote: "Золотая медаль открывала двери Московского государственного университета и Бауманки без изнурительного многоступенчатого конкурса."
  },
  nvp: {
    title: "НВП (Начальная военная подготовка)",
    category: "study",
    catLabel: "Обучение & Предметы",
    epoch: "1968–1990 гг.",
    badge: "ГОТОВ К ЗАЩИТЕ РОДИНЫ",
    desc: "Обязательный предмет для учащихся 9–10 классов. Преподавался кадровыми офицерами запаса («военруками»). Включал изучение устройства автомата Калашникова АК-47/АК-74, тактическую подготовку, метание учебных гранат, защиту от ОМП (надевание противогаза ГП-5 за 7 секунд) и основы первой помощи.",
    specs: [
      { label: "Норматив разборки АК", val: "15 секунд (отлично)" },
      { label: "Норматив сборки АК", val: "25 секунд (отлично)" },
      { label: "Одевание противогаза", val: "7 секунд по команде «Газы!»" },
      { label: "Полевые сборы", val: "Войсковые стрельбища боевыми патронами" }
    ],
    quote: "Каждый советский юноша к моменту призыва в армию уже уверенно владел стрелковым оружием и знал воинский устав наизусть."
  },
  "slide-rule": {
    title: "Логарифмическая линейка",
    category: "relics",
    catLabel: "Инженерные реликвии",
    epoch: "До эпохи микрокалькуляторов",
    badge: "АНАЛОГОВЫЙ КОМПЬЮТЕР",
    desc: "Счетный инструмент советских инженеров и старшеклассников. С помощью подвижного движка и прозрачного визира позволяла мгновенно умножать, делить, возводить в степень, извлекать квадратные и кубические корни, вычислять тригонометрические функции и логарифмы.",
    specs: [
      { label: "Точность", val: "3–4 значащие цифры" },
      { label: "Материал", val: "Берёзовый шпон, целлулоид, винипласт" },
      { label: "Цена", val: "1 рубль 80 копеек" },
      { label: "Исторический факт", val: "На логарифмических линейках рассчитали ракету Гагарина!" }
    ],
    quote: "Сергей Королёв и Игорь Курчатов создавали ракетно-ядерный щит сверхдержавы с помощью обычной деревянной счетной линейки."
  },
  "drafting-set": {
    title: "Готовальня чертежная завода «Готовальня»",
    category: "relics",
    catLabel: "Школьные реликвии",
    epoch: "1950–1980-е гг.",
    badge: "ИНСТРУМЕНТ ТОЧНОСТИ",
    desc: "Бархатный футляр с набором профессиональных чертежных инструментов: кронциркуль, разметочный циркуль, рейсфедеры, удлинитель и баночка с графитовыми грифелями. Изготавливалась из высококачественной латуни с никелированием и инструментальной стали 65Г.",
    specs: [
      { label: "Самый массовый набор", val: "«НЧК-14» (14 предметов)" },
      { label: "Цена в магазине", val: "4 рубля 50 копеек" },
      { label: "Футляр", val: "Дерево, обтянутое ледерином, с синим бархатом" },
      { label: "Срок службы", val: "Передавалась от деда к внуку" }
    ],
    quote: "Черчение было обязательным школьным предметом с 7 по 8 класс. Без идеального чертежа гайки в разрезе получить аттестат было невозможно."
  },
  lto: {
    title: "ЛТО (Лагерь труда и отдыха) & «На картошку»",
    category: "life",
    catLabel: "Быт & Труд",
    epoch: "1960–1980-е гг.",
    badge: "ТРУДОВОЙ ДЕСАНТ",
    desc: "Трудовая четверть советских школьников и студентов. В сентябре или летом классы выезжали в подшефные колхозы и совхозы на сбор урожая: картофеля, моркови, яблок или сахарной свёклы. Сочетание реального физического труда, полевой кухни, вечерних костров и песен под гитару.",
    specs: [
      { label: "Продолжительность", val: "От 2 до 4 недель" },
      { label: "Оплата труда", val: "Заработанные деньги шли на классные экскурсии" },
      { label: "Быт", val: "Сельские школы, деревянные домики, котел с кашей" },
      { label: "Фольклор", val: "«Ты помнишь, товарищ, как вместе картошку копали...»" }
    ],
    quote: "«На картошке» формировалась настоящая дружба, закалялся характер и исчезали любые городские предрассудки."
  },
  subbotnik: {
    title: "Ленинский коммунистический субботник",
    category: "life",
    catLabel: "Быт & Традиции",
    epoch: "Ежегодно 22 апреля",
    badge: "ТРУД НА БЛАГО ОБЩЕСТВА",
    desc: "Традиция добровольного бесплатного труда, зародившаяся весной 1919 года на станции Москва-Сортировочная. 22 апреля вся советская школа дружно выходила на благоустройство: белили стволы деревьев известью, мыли окна, красили заборы, высаживали кусты сирени под звуки маршей школьного радиоузла.",
    specs: [
      { label: "Дата проведения", val: "Суббота, ближайшая к 22 апреля (день рождения Ленина)" },
      { label: "Инвентарь", val: "Мётлы, грабли, ведра, гашеная известь, газеты" },
      { label: "Особенность", val: "Директор и первоклассник трудились плечом к плечу" },
      { label: "Атмосфера", val: "Всесоюзный весенний праздник чистоты" }
    ],
    quote: "«Великий почин» — субботники воспитывали бережное отношение к школе и городу: сломать посаженное своими руками дерево считалось позором."
  },
  "pioneer-tie": {
    title: "Пионерский галстук",
    category: "org",
    catLabel: "Организации & Идеология",
    epoch: "1922–1991 гг.",
    badge: "ЧАСТИЦА ЗНАМЕНИ",
    desc: "Алая треугольная косынка, символ принадлежности к Всесоюзной пионерской организации им. В. И. Ленина. Три конца галстука символизировали нерушимую связь трех поколений советских людей: коммунистов, комсомольцев и пионеров. Завязывался специальным прямым узлом.",
    specs: [
      { label: "Материал", val: "Ацетатный шёлк (55 коп.) или шерстяной креп (75 коп.)" },
      { label: "Утренний ритуал", val: "Ежедневная глажка горячим утюгом через мокрую марлю" },
      { label: "Особый статус", val: "Забыть галстук дома приравнивалось к ЧП" },
      { label: "Девиз пионера", val: "«Будь готов! — Всегда готов!»" }
    ],
    quote: "«Как повяжешь галстук, береги его: он ведь с красным знаменем цвета одного!» — Степан Щипачёв."
  },
  "oktyabryata-star": {
    title: "Октябрятская звёздочка и значок",
    category: "org",
    catLabel: "Организации & Идеология",
    epoch: "1923–1991 гг.",
    badge: "ПЕРВАЯ СТУПЕНЬ (1–3 КЛАСС)",
    desc: "Первая ступень советской детской организации. Октябрятами становились все ученики 1-го класса в канун 7 ноября. На груди носили рубиновую пятиконечную звездочку с золотым барельефом юного кудрявого Володи Ульянова. Класс делился на микрогруппы («звёздочки») ровно по 5 человек.",
    specs: [
      { label: "Возраст", val: "7–9 лет (1–3 классы)" },
      { label: "Структура звёздочки", val: "Командир, санитар, цветовод, библиотекарь, хозяин" },
      { label: "Материал значка", val: "Рубиновый пластик или эмалированный металл (15 коп.)" },
      { label: "Правило", val: "«Октябрята — дружные ребята, читают и рисуют, играют и поют!»" }
    ],
    quote: "Звёздочка учила 7-летних детей взаимовыручке: если один заболел, санитар и командир обязательно навещали его дома с уроками."
  },
  zarnitsa: {
    title: "Военно-спортивная игра «Зарница»",
    category: "org",
    catLabel: "Организации & Спорт",
    epoch: "С 1967 года",
    badge: "ГЛАВНОЕ ПРИКЛЮЧЕНИЕ ГОДА",
    desc: "Всесоюзная военно-спортивная игра для пионеров, в которой участвовали до 20 миллионов подростков по всей стране. Финал игры проводился на настоящих военных полигонах с привлечением бронетранспортеров БТР, холостой стрельбы и армейской авиации. Главная задача — сорвать бумажный погон с плеча «противника».",
    specs: [
      { label: "Организаторы", val: "ЦК ВЛКСМ, Министерство обороны СССР, ДОСААФ" },
      { label: "Дисциплины", val: "Ориентирование по компасу, марш-бросок, полоса препятствий" },
      { label: "Правило поражения", val: "Сорванный погон означал «убит» или «ранен»" },
      { label: "Обед", val: "Солдатская гречневая каша с тушенкой из полевой кухни" }
    ],
    quote: "«Зарница» воспитывала хладнокровие, командную слаженность и умение ориентироваться в лесу без гаджетов."
  },
  raspredelenie: {
    title: "Государственное персональное распределение",
    category: "study",
    catLabel: "ВУЗы & Карьера",
    epoch: "1930–1991 гг.",
    badge: "ГАРАНТИЯ ТРУДОУСТРОЙСТВА",
    desc: "Государственная система планового распределения выпускников ВУЗов и техникумов. Государство оплачивало учебу студента и платило стипендию, взамен выпускник обязан был отработать ровно 3 года по выданной путевке. Предприятие обязано было обеспечить молодого специалиста жильем и «подъемными» средствами.",
    specs: [
      { label: "Срок отработки", val: "Ровно 3 года" },
      { label: "Привилегия медалистов", val: "Отличники («краснодипломники») выбирали город первыми" },
      { label: "Гарантии", val: "Запрет на увольнение в течение 3 лет, бронь на жилье" },
      { label: "География", val: "От закрытых НИИ Подмосковья до БАМа и Чукотки" }
    ],
    quote: "В СССР выпускник института не знал страха безработицы: в день получения диплома рабочее место и заработная плата были гарантированы законом."
  },
  diafilm: {
    title: "Диафильмы & Проектор «ФД-2»",
    category: "relics",
    catLabel: "Школьные реликвии",
    epoch: "1950–1980-е гг.",
    badge: "ДОМАШНИЙ КИНОТЕАТР",
    desc: "Студийная 35-миллиметровая пленка с позитивными цветными или черно-белыми кадрами и титрами внизу. Диафильмы производились студией «Диафильм» Госкино СССР миллионными тиражами: сказки, экранизации классики, учебные пособия по физике, астрономии и географии.",
    specs: [
      { label: "Цена пленки в тубусе", val: "30 копеек" },
      { label: "Экран", val: "Белая простыня, приколотая кнопками к обоям" },
      { label: "Проекторы", val: "«ФД-2», «Сказка», «Дэфи» (цена от 9 до 14 руб.)" },
      { label: "Атмосфера", val: "Темная комната, запах нагретой лампы и щелчки кадропротяжки" }
    ],
    quote: "Уроки географии и биологии с диафильмами на школьном экране ждали с таким же трепетом, как мультфильмы в кинотеатре."
  },
  timur: {
    title: "Тимуровское движение",
    category: "org",
    catLabel: "Организации & Волонтёрство",
    epoch: "С 1940 года",
    badge: "ТАЙНОЕ ДОБРО",
    desc: "Массовое пионерское патриотическое движение, возникшее под влиянием повести Аркадия Гайдара «Тимур и его команда». Группы ребят тайно брали шефство над семьями фронтовиков, ветеранов и одинокими пожилыми людьми: кололи дрова, носили воду из колодца, пропалывали огороды, оставляя на калитке знак красной пятиконечной звезды.",
    specs: [
      { label: "Основатель образа", val: "Писатель Аркадий Гайдар (1940 г.)" },
      { label: "Принцип", val: "Помогать бескорыстно и тайно, не требуя похвалы" },
      { label: "Опознавательный знак", val: "Красная звезда на заборе подшефного дома" },
      { label: "Масштаб", val: "Миллионы школьников в каждом городе и деревне" }
    ],
    quote: "Тимуровцы стали прообразом современного добровольчества задолго до появления слова «волонтёр»."
  },
  makulatura: {
    title: "Сбор макулатуры и металлолома («Миллион — Родине!»)",
    category: "life",
    catLabel: "Быт & Труд",
    epoch: "Ежегодно весной и осенью",
    badge: "ВСЕНАРОДНАЯ ОПЕРАЦИЯ",
    desc: "Массовые кампании пионерской организации по вторичной переработке сырья. Школьники обходили квартиры микрорайона, собирая старые газеты («Правда», «Известия») и журналы. Металлолом собирали на стройках и пустырях: старые трубы, рельсы, батареи. Спасенные тонны бумаги берегли советские леса, а металл шел на трактора и тепловозы.",
    specs: [
      { label: "Норматив на ученика", val: "15–20 кг макулатуры" },
      { label: "Главный приз", val: "Путевка в пионерлагерь «Артек» или «Орлёнок»" },
      { label: "Экологический эффект", val: "Каждые 60 кг макулатуры спасали одно дерево" },
      { label: "Тара", val: "Связки бечевкой, взвешивание ручным пружинным безменом" }
    ],
    quote: "Советский школьник с 3-го класса понимал ценность ресурсов: бумага и металл не выбрасывались на помойку, а возвращались в экономику."
  },
  stewards: {
    title: "Институт старост, санитарные тройки & Дежурство",
    category: "life",
    catLabel: "Самоуправление & Быт",
    epoch: "Вся советская эпоха",
    badge: "ШКОЛЬНОЕ САМОУПРАВЛЕНИЕ",
    desc: "Развитая система детского коллективного управления классом. Староста — избираемый или назначаемый лидер, отвечавший за дисциплину, журнал и связь с учителями. Санитары проверяли чистоту рук, ногтей и ушей перед уроками. Дежурные после уроков мыли доску, посыпали пол влажными опилками и мыли класс швабрами.",
    specs: [
      { label: "Роли в классе", val: "Староста, физорг, культорг, санитар, редактор стенгазеты" },
      { label: "Знак отличия", val: "Красная нарукавная повязка «ДЕЖУРНЫЙ»" },
      { label: "Стенгазета", val: "«Колючка» или «Молния» (критика прогульщиков и двоечников)" },
      { label: "Педагогика", val: "Система воспитания в коллективе А. С. Макаренко" }
    ],
    quote: "Уборщицы в советской школе мыли только общие коридоры. Свой класс ученики убирали сами, поэтому сорить на пол никому даже в голову не приходило."
  }
};

function initArchivalInspectorAndGlossary() {
  const inspectorModal = document.getElementById('inspector-modal');
  const inspectorCloseBtn = document.getElementById('inspector-close-btn');
  const inspectorContent = document.getElementById('inspector-card-content');

  const glossaryBtn = document.getElementById('glossary-btn');
  const glossaryModal = document.getElementById('glossary-modal');
  const glossaryCloseBtn = document.getElementById('glossary-close-btn');
  const glossarySearchInput = document.getElementById('glossary-search-input');
  const glossaryFilterChips = document.querySelectorAll('.gf-chip');
  const glossaryGrid = document.getElementById('glossary-cards-grid');

  if (!inspectorModal || !inspectorContent) return;

  // Open Inspector
  function openInspector(termKey) {
    const data = GLOSSARY_DATA[termKey];
    if (!data) return;

    const fromGlossary = glossaryModal && glossaryModal.classList.contains('is-active');
    const backBtnHtml = fromGlossary
      ? `<button class="inspector-back-btn" id="inspector-back-btn">← Назад в словарь терминов</button>`
      : '';

    inspectorContent.innerHTML = `
      ${backBtnHtml}
      <div class="inspector-header">
        <span class="ih-badge">${data.badge}</span>
        <h3>${data.title}</h3>
        <div class="ih-meta">Категория: ${data.catLabel} • Период: ${data.epoch}</div>
      </div>
      <div class="inspector-body">
        <p>${data.desc}</p>
        <table class="inspector-specs-table">
          <tbody>
            ${data.specs.map(s => `<tr><th>${s.label}</th><td>${s.val}</td></tr>`).join('')}
          </tbody>
        </table>
        <div class="inspector-fact-quote">
          <strong>Цитата эпохи:</strong> ${data.quote}
        </div>
      </div>
    `;

    const backBtn = document.getElementById('inspector-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        closeInspector();
      });
    }

    inspectorModal.classList.add('is-active');
    inspectorModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeInspector() {
    inspectorModal.classList.remove('is-active');
    inspectorModal.setAttribute('aria-hidden', 'true');
    // If glossary modal is still active, keep body overflow hidden so user can continue browsing glossary
    if (!glossaryModal || !glossaryModal.classList.contains('is-active')) {
      document.body.style.overflow = '';
    }
  }

  if (inspectorCloseBtn) inspectorCloseBtn.addEventListener('click', closeInspector);

  inspectorModal.addEventListener('click', (e) => {
    if (e.target === inspectorModal) closeInspector();
  });

  // Global delegation for term chips and term links
  document.addEventListener('click', (e) => {
    const termTarget = e.target.closest('.term-chip, .term-link, [data-term]');
    if (termTarget) {
      const termKey = termTarget.dataset.term;
      if (termKey && GLOSSARY_DATA[termKey]) {
        e.preventDefault();
        openInspector(termKey);
      }
    }
  });

  // --- Glossary Modal Logic ---
  let activeCategory = 'all';
  let searchTerm = '';

  function renderGlossaryCards() {
    if (!glossaryGrid) return;

    const keys = Object.keys(GLOSSARY_DATA).filter(k => {
      const item = GLOSSARY_DATA[k];
      const matchCat = (activeCategory === 'all' || item.category === activeCategory);
      const query = searchTerm.toLowerCase().trim();
      const matchSearch = !query || 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) ||
        item.catLabel.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    if (keys.length === 0) {
      glossaryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          По запросу «${searchTerm}» ничего не найдено в советских архивах.
        </div>
      `;
      return;
    }

    glossaryGrid.innerHTML = keys.map(k => {
      const item = GLOSSARY_DATA[k];
      return `
        <div class="glossary-term-card" data-term="${k}">
          <span class="gtc-cat">${item.catLabel}</span>
          <h4 class="gtc-title">${item.title}</h4>
          <p class="gtc-desc">${item.desc}</p>
        </div>
      `;
    }).join('');
  }

  function openGlossary() {
    if (!glossaryModal) return;
    renderGlossaryCards();
    glossaryModal.classList.add('is-active');
    glossaryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (glossarySearchInput) {
      setTimeout(() => glossarySearchInput.focus(), 100);
    }
  }

  function closeGlossary() {
    if (!glossaryModal) return;
    glossaryModal.classList.remove('is-active');
    glossaryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (glossaryBtn) glossaryBtn.addEventListener('click', openGlossary);
  if (glossaryCloseBtn) glossaryCloseBtn.addEventListener('click', closeGlossary);

  if (glossaryModal) {
    glossaryModal.addEventListener('click', (e) => {
      if (e.target === glossaryModal) closeGlossary();
    });
  }

  if (glossarySearchInput) {
    glossarySearchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderGlossaryCards();
    });
  }

  glossaryFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      glossaryFilterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.cat;
      renderGlossaryCards();
    });
  });

  // ESC key listener for both modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (inspectorModal && inspectorModal.classList.contains('is-active')) {
        closeInspector();
      } else if (glossaryModal && glossaryModal.classList.contains('is-active')) {
        closeGlossary();
      }
    }
  });
}
