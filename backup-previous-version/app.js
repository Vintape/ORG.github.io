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
  initQuiz();
  initNavigation();
  initScrollProgress();
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
   5. SOVIET PRICE CALCULATOR
   -------------------------------------------------------------------------- */
const SOVIET_GOODS = [
  { name: "Школьных тетрадок (12 л.)", price: 0.02, icon: "📓" },
  { name: "Булочек городских", price: 0.03, icon: "🥐" },
  { name: "Стаканов газировки с сиропом", price: 0.03, icon: "🥤" },
  { name: "Поездок на трамвае", price: 0.03, icon: "🚋" },
  { name: "Пирожков с повидлом", price: 0.05, icon: "🥟" },
  { name: "Билетов в кино (детский сеанс)", price: 0.10, icon: "🎟️" },
  { name: "Стаканов яблочного сока", price: 0.10, icon: "🧃" },
  { name: "Пломбиров в вафельном стаканчике", price: 0.20, icon: "🍦" },
  { name: "Деревянных пеналов", price: 0.35, icon: "✏️" },
  { name: "Пионерских шелковых галстуков", price: 0.75, icon: "🧣" },
  { name: "Школьных линеек счетных", price: 1.80, icon: "📐" }
];

function initPriceCalculator() {
  const presets = document.querySelectorAll('.preset-btn');
  const input = document.getElementById('custom-kopeks');
  const grid = document.getElementById('calc-results-grid');
  if (!grid || !input) return;

  function updateCalc(rubles) {
    const val = parseFloat(rubles) || 0;
    grid.innerHTML = SOVIET_GOODS.map(item => {
      const count = Math.floor(val / item.price);
      return `
        <div class="calc-result-card">
          <span class="calc-res-icon">${item.icon}</span>
          <div class="calc-res-count">${count} шт.</div>
          <div class="calc-res-label">${item.name}</div>
          <span class="calc-res-price">по ${(item.price >= 1 ? item.price + ' руб.' : (item.price * 100).toFixed(0) + ' коп.')}</span>
        </div>
      `;
    }).join('');
  }

  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      presets.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const amt = btn.dataset.amount;
      input.value = amt;
      updateCalc(amt);
    });
  });

  input.addEventListener('input', (e) => {
    presets.forEach(b => b.classList.remove('active'));
    updateCalc(e.target.value);
  });

  updateCalc('0.20');
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
