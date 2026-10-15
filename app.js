/* ==========================================================================
   КРАСНЫЙ ЗВОНОК: ВЕЛИКАЯ ЭПОХА СОВЕТСКОГО ОБРАЗОВАНИЯ
   Interactive Engine: Sound, Presentation Mode, Archival Photos, Quiz, Diary
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAudioBell();
  initTimeline();
  initUniforms();
  initBackpack();
  initQuiz();
  initNavigation();
  initScrollProgress();
  initPresentationDeck();
  initLightbox();
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
      triggerBellAnimation();
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
  masterGain.gain.linearRampToValueAtTime(0.4, now + 0.05);
  masterGain.gain.setValueAtTime(0.4, now + duration - 0.4);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  masterGain.connect(audioCtx.destination);

  const tremoloOsc = audioCtx.createOscillator();
  const tremoloGain = audioCtx.createGain();
  tremoloOsc.frequency.setValueAtTime(16, now);
  tremoloGain.gain.setValueAtTime(0.5, now);
  tremoloOsc.connect(tremoloGain.gain);

  const freqs = [840, 1180, 1560, 2240];
  const weights = [0.4, 0.35, 0.2, 0.05];

  freqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.linearRampToValueAtTime(freq * 1.005, now + duration);
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

function triggerBellAnimation() {
  const bellBtn = document.getElementById('bell-btn');
  if (!bellBtn) return;
  bellBtn.style.transform = 'scale(1.1) rotate(5deg)';
  setTimeout(() => {
    bellBtn.style.transform = '';
  }, 300);
}

/* --------------------------------------------------------------------------
   2. TIMELINE: 6 ERAS WITH ARCHIVAL PHOTOGRAPHY
   -------------------------------------------------------------------------- */
const ERA_DATA = {
  "1917": {
    period: "1917 — 1929 гг.",
    status: "Педагогический авангард и ликбез",
    heading: "Ликвидация безграмотности и слом старой школы",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Likbez.JPG",
    photoCaption: "Плакат Ликбеза «Неграмотный — тот же слепой» (Худ. А. Радаков, 1920 г.)",
    photoYear: "1920 год",
    quote: "«Мы не рабы, рабы не мы» — первый текст, который разбирали взрослые крестьяне при свете керосиновых ламп в избах-читальнях.",
    author: "— Лозунг первого советского букваря «Долой неграмотность!»",
    body: `
      <p><strong>Декрет 1918 года</strong> уничтожил сословную гимназию, отделил школу от церкви и объявил образование полностью бесплатным и совместным. А 26 декабря 1919 года Совнарком постановил: <em>все граждане от 8 до 50 лет обязаны были научиться читать и писать</em>.</p>
      <p>1920-е годы стали эпохой смелых экспериментов: оценки, экзамены и традиционные уроки отменили. Обучались группами по «бригадно-лабораторному методу», а школы подчинялись советам учеников. Однако это привело к падению академического уровня, и в 1930-е школу вернули к строгому предметному обучению.</p>
    `,
    facts: [
      { icon: "📜", title: "Общество «Долой неграмотность»", text: "Возглавлял М. И. Калинин. Культармейцы шли в самые глухие деревни." },
      { icon: "🛠️", title: "Срок обучения", text: "4 года — начальная школа, 7 лет — неполная средняя (ШКМ), 9 лет — средняя." }
    ],
    archiveTitle: "Декрет СНК РСФСР (26 декабря 1919 г.)",
    archiveList: [
      "★ Рабочий день для обучающихся грамоте сокращался на 2 часа с сохранением оплаты.",
      "★ Создано свыше 40 000 пунктов ликбеза по всей стране.",
      "★ Уровень грамотности к 1939 году достиг 89%."
    ]
  },

  "1930": {
    period: "1930 — 1940 гг.",
    status: "Возврат академического канона",
    heading: "Постановление ЦК 1931 года и стабилизация",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/RIAN_archive_795042_Soviet_schoolgirl_Katya_Lycheva.jpg/640px-RIAN_archive_795042_Soviet_schoolgirl_Katya_Lycheva.jpg",
    photoCaption: "Классический урок в советской школе за партами Эрисмана",
    photoYear: "1930-е годы",
    quote: "«Школа должна вооружить учащихся твердыми, систематическими основами наук: физики, химии, математики и родного языка».",
    author: "— Из постановления ЦК ВКП(б) от 25 августа 1931 года",
    body: `
      <p>Индустриализации требовались миллионы квалифицированных инженеров. Постановлениями ЦК 1931–1932 гг. советская школа вернулась к <strong>классно-урочной системе, звонкам, твердому расписанию и стабильным учебникам</strong> (Киселев, Пёрышкин).</p>
      <p>В 1934 году утверждена структура: 4-летка (начальная), 7-летка (неполная средняя) и 10-летка (средняя). В 1940 году временно была введена плата за старшие классы (150–200 руб./год) для стимулирования притока в бесплатные училища ФЗО перед войной.</p>
    `,
    facts: [
      { icon: "📚", title: "Золотые учебники", text: "Геометрия Киселева оставалась нерушимым стандартом более сорока лет." },
      { icon: "⚙️", title: "ФЗО (Трудовые резервы)", text: "Бесплатная подготовка токарей и слесарей на гособеспечении." }
    ],
    archiveTitle: "Постановление ЦК ВКП(б) от 1931 года",
    archiveList: [
      "★ Восстановление предметного преподавания физики, химии и алгебры.",
      "★ Введение стабильного классного журнала и дневников.",
      "★ Запрет педологических экспериментов."
    ]
  },

  "1941": {
    period: "1941 — 1953 гг.",
    status: "Военное время и сталинский ампир",
    heading: "Раздельные школы, медали и 5-балльная система",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/RIAN_archive_13594_Physical_training_lesson.jpg/640px-RIAN_archive_13594_Physical_training_lesson.jpg",
    photoCaption: "Урок физкультуры и спортивной подготовки",
    photoYear: "1940-50-е гг.",
    quote: "«Победу в Великой Отечественной войне одержал советский школьный учитель».",
    author: "— Исторический афоризм о мужестве советских выпускников",
    body: `
      <p>В 1943 году в 146 крупных городах СССР ввели <strong>раздельное обучение мальчиков и девочек</strong>! Юношей готовили к военной службе, девушек — к домоводству и медицине. Разделение отменили в 1954 году.</p>
      <p>В 1944 году были утверждены <strong>«Правила для учащихся»</strong> (вставать по стойке смирно при входе учителя), введена <strong>пятибалльная цифровая система</strong> и <strong>золотые медали 583-й пробы</strong> за отличную учебу.</p>
    `,
    facts: [
      { icon: "🎖️", title: "Золотые медали", text: "Чеканились из золота 583 пробы весом 15,6 грамма (до 1954 г.)." },
      { icon: "🧠", title: "Логика и Психология", text: "Введены в 9–10 классах для формирования культуры научного спора." }
    ],
    archiveTitle: "Правила для учащихся (1943 г.)",
    archiveList: [
      "★ Вставать при входе учителя и отвечать стоя.",
      "★ Беспрекословное подчинение педсовету.",
      "★ Комендантский час для школьников после 20:00 (младшие) и 22:00 (старшие)."
    ]
  },

  "1954": {
    period: "1954 — 1964 гг.",
    status: "Оттепель и политехнизация",
    heading: "Отмена платы, совместное обучение и завод",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pioneer_Summer_Camp_1972_Kiev.jpg/640px-Pioneer_Summer_Camp_1972_Kiev.jpg",
    photoCaption: "Пионерская линейка и дружина",
    photoYear: "1960-е годы",
    quote: "«Школа должна готовить не просто к институту, а к созидательному труду на заводах и полях Родины!»",
    author: "— Н. С. Хрущев (1958 г.)",
    body: `
      <p>В мае 1956 года правительство <strong>полностью отменило плату за обучение</strong>. А в декабре 1958 года начался эксперимент: ввели обязательную <strong>8-летку</strong>, а полная средняя школа стала <strong>11-летней</strong> с практикой на заводах по 2 дня в неделю.</p>
      <p>В 1964–1966 годах из-за чрезмерной нагрузки школьников вернули к классической 10-летке, заложив основу УПК.</p>
    `,
    facts: [
      { icon: "🏭", title: "Связь с производством", text: "Школьники водили тракторы, осваивали токарные станки." },
      { icon: "🚀", title: "Физмат-школы", text: "Лаврентьев и Колмогоров создали СУНЦ МГУ и НГУ для юных гениев." }
    ],
    archiveTitle: "Закон СССР от 24 декабря 1958 года",
    archiveList: [
      "★ Переход к обязательному 8-летнему образованию.",
      "★ Введение льгот для абитуриентов с 2-летним рабочим стажем.",
      "★ Развитие вечерних школ рабочей молодежи (ШРМ)."
    ]
  },

  "1965": {
    period: "1965 — 1983 гг.",
    status: "Золотой век и всеобщее среднее",
    heading: "Стабильная 10-летка, УПК и кабинетная система",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/RIAN_archive_872838_Children_at_the_Artek_Young_Pioneer_Camp.jpg/640px-RIAN_archive_872838_Children_at_the_Artek_Young_Pioneer_Camp.jpg",
    photoCaption: "Пионеры Всесоюзного лагеря «Артек»",
    photoYear: "1970-е годы",
    quote: "«В СССР осуществляется переход ко всеобщему обязательному среднему образованию молодежи».",
    author: "— Статья 45 Конституции СССР 1977 года",
    body: `
      <p>Эпоха Брежнева — вершина стабильности советской школы. Все граждане обязаны были получить полное среднее образование (10 классов или 8 классов + техникум/СПТУ).</p>
      <p>Школы перешли на <strong>кабинетную систему</strong>: кабинеты физики с щитками электропитания, химии с вытяжками, лингафонные залы. С 1978 года все учебники стали выдавать в библиотеке <strong>бесплатно</strong>!</p>
    `,
    facts: [
      { icon: "🏢", title: "Дворцы пионеров", text: "Сотни бесплатных кружков: ракетомоделирование, радиотехника, шахматы." },
      { icon: "🎖️", title: "УПК", text: "Раз в неделю — обучение на токарей, шоферов, медсестер." }
    ],
    archiveTitle: "Конституция СССР 1977 года",
    archiveList: [
      "★ Бесплатное среднее, высшее и профессиональное образование.",
      "★ Гарантированное трудоустройство после выпуска.",
      "★ Полный охват школьников учебниками и пионерлагерями."
    ]
  },

  "1984": {
    period: "1984 — 1991 гг.",
    status: "Эра ЭВМ и перестройка",
    heading: "Реформа 1984 года, первый класс с 6 лет и компьютеры",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Soviet_Young_Pioneers_in_1983_in_the_Zeravshan_Mountains_of_Tajik_SSR.jpg/640px-Soviet_Young_Pioneers_in_1983_in_the_Zeravshan_Mountains_of_Tajik_SSR.jpg",
    photoCaption: "Советские пионеры и школьники 1980-х",
    photoYear: "1985 год",
    quote: "«Программирование — это вторая грамотность!»",
    author: "— Академик Андрей Петрович Ершов (1985 г.)",
    body: `
      <p>В апреле 1984 года утверждена школьная реформа: <strong>обучение с 6 лет</strong> и переход на <strong>11-летку</strong> (с известным перескоком из 3-го класса сразу в 5-й).</p>
      <p>С 1 сентября 1985 года введен предмет <strong>«Основы информатики и вычислительной техники»</strong>. Началась компьютеризация школ машинами «Агат», «Корвет», «БК-0010» и японскими Yamaha MSX.</p>
    `,
    facts: [
      { icon: "💻", title: "Первые ПК", text: "Школьные компьютеры с загрузкой программ с магнитных кассет." },
      { icon: "🕊️", title: "Педагогика сотрудничества", text: "Идеи Амонашвили, Шаталова (опорные сигналы) и Лысенковой." }
    ],
    archiveTitle: "Постановление ЦК КПСС (12 апреля 1984 г.)",
    archiveList: [
      "★ Начало приема в школу с 6-летнего возраста.",
      "★ Введение информатики в 9–10 классах.",
      "★ Расширение прав старшеклассников."
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

      const eraKey = tab.dataset.era;
      renderEra(eraKey);
    });
  });
}

function renderEra(key) {
  const data = ERA_DATA[key];
  const display = document.getElementById('era-display');
  if (!data || !display) return;

  display.style.opacity = '0';
  display.style.transform = 'translateY(8px)';

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
          <div class="archival-photo-frame" onclick="openLightbox('${data.photo}', '${data.photoCaption}')">
            <div class="photo-container">
              <img src="${data.photo}" alt="${data.photoCaption}" class="archival-img" loading="lazy">
              <span class="photo-zoom-hint">🔍 Увеличить</span>
            </div>
            <div class="photo-caption">
              <span class="photo-title">${data.photoCaption}</span>
              <span class="photo-year">${data.photoYear}</span>
            </div>
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
  }, 200);
}

/* --------------------------------------------------------------------------
   3. UNIFORMS SHOWCASE
   -------------------------------------------------------------------------- */
const UNIFORM_DATA = {
  "1948": {
    badge: "1948 — 1962 годы",
    boy: "Серая полушерстяная гимнастерка с воротником-стойкой на пуговицах, широким ремнем с массивной латунной бляхой «Ш» и форменная фуражка с кокардой.",
    girl: "Коричневое шерстяное платье ниже колен со складками. В будни — черный фартук, по праздникам — белоснежный шелковый с крылышками. В косы вплетались атласные ленты.",
    secret: "Каждую субботу белые кружевные воротнички и манжеты отпарывали, стирали, крахмалили, гладили и в воскресенье вечером пришивали заново мелкими стежками!"
  },
  "1962": {
    badge: "1962 — 1973 годы",
    boy: "Серый шерстяной однобортный пиджак на трех пуговицах и прямые брюки. Отказ от военной гимнастерки в пользу гражданского европейского кроя.",
    girl: "Классическое коричневое платье и фартуки. Длина юбки стала чуть выше — строго по колено.",
    secret: "Мальчиков стригли под полубокс. Длинные прически в стиле «Битлз» вызывали негодование завуча, отправлявшего учеников стричься прямо с урока."
  },
  "1973": {
    badge: "1973 — 1988 годы",
    boy: "Культовая темно-синяя куртка джинсового покроя с металлическими пуговицами со звездой и пластиковым шевроном на левом рукаве (открытая книга и солнце).",
    girl: "Коричневое платье со складками, а с 1984 года для старшеклассниц ввели долгожданную альтернативу: синий костюм-тройку (юбка, жилет, жакет).",
    secret: "Мальчишки любили бритвой срезать прозрачную полиэтиленовую пленку с нарукавного шеврона, чтобы эмблема стала матовой!"
  },
  "1988": {
    badge: "1988 — 1991 годы",
    boy: "Синяя костюмная тройка. К концу 80-х строгий надзор ослаб: стали надевать водолазки, турецкие свитера и дефицитные джинсы-варёнки.",
    girl: "Синие костюмы, цветные блузки, пышные начесы с лаком «Прелесть». Весной 1992 года обязательная форма была официально отменена.",
    secret: "В актовых залах начались дискотеки под «Ласковый май» и «Кино», на которых форменная одежда демонстративно отвергалась."
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
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
      <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #1976D2;">
        <h4 style="font-family: var(--font-display); font-size: 1.4rem; color: var(--navy-ink); margin-bottom: 8px;">Мальчики</h4>
        <p style="font-size: 0.95rem; color: #444;">${data.boy}</p>
      </div>
      <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #8D6E63;">
        <h4 style="font-family: var(--font-display); font-size: 1.4rem; color: var(--navy-ink); margin-bottom: 8px;">Девочки</h4>
        <p style="font-size: 0.95rem; color: #444;">${data.girl}</p>
      </div>
    </div>
    <div style="background: #FFFDE7; border: 1px solid #FFE082; padding: 18px 24px; border-radius: 12px;">
      <strong style="color: #F57F17; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.85rem;">Главный секрет эпохи:</strong>
      <p style="font-size: 0.95rem; color: #5D4037;">${data.secret}</p>
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
    body: "Культовый березовый пенал со скользящей крышкой. Внутри два отделения: длинное для перьевых ручек и карандашей и короткое — для ластика и запасных стальных перьев.",
    specs: [
      { label: "Материал", value: "Береза, лак ГОСТ 5228-76" },
      { label: "Содержимое", value: "Карандаши «Пионер», «Конструктор» ТМ, перья №86" }
    ]
  },
  inkpot: {
    emoji: "🧪",
    title: "Чернильница-непроливайка & Перья «Звёздочка»",
    price: "12 копеек",
    body: "Гениальное изобретение: конусное горлышко внутрь сосуда не давало чернилам пролиться. Чернила разводили из сухого фиолетового порошка «Радуга».",
    specs: [
      { label: "Цвет чернил", value: "Фиолетовый или темно-синий" },
      { label: "Главный страх", value: "Посадить жирную кляксу на итоговой контрольной" }
    ]
  },
  notebook: {
    emoji: "📓",
    title: "Школьная тетрадка за 2 копейки",
    price: "2 копейки",
    body: "Тетрадь в серо-зеленой обложке (12 листов). На обороте — таблица умножения или текст Торжественного обещания пионера. Поля чертили вручную строго на 4 клетки.",
    specs: [
      { label: "Объем", value: "12 листов (для контрольных — 18 листов)" },
      { label: "Промокашка", value: "Обязательный впитывающий лист в каждой тетради" }
    ]
  },
  ruler: {
    emoji: "📐",
    title: "Логарифмическая линейка (счетная)",
    price: "1 руб. 80 коп.",
    body: "Аналоговый карманный компьютер! Позволяла мгновенно умножать, делить, извлекать корни и считать тригонометрию без единой батарейки.",
    specs: [
      { label: "Материал", value: "Дерево, покрытое целлулоидом" },
      { label: "Применение", value: "Обязательно изучалась в 8–10 классах" }
    ]
  },
  snack: {
    emoji: "🥐",
    title: "Булочка за 3 копейки и яблочный сок",
    price: "13 копеек за обед",
    body: "Хрустящая городская булочка (3 коп.), пирожок с повидлом (5 коп.) или молочный коржик (8 коп.) со стаканом натурального яблочного сока с мякотью.",
    specs: [
      { label: "Обед", value: "15–20 копеек хватало на сытный перекус" },
      { label: "Традиция", value: "Экономия на завтраках ради значка или билета в кино" }
    ]
  },
  eraser: {
    emoji: "🧼",
    title: "Ластик «Архитектор» и карандаш",
    price: "5 копеек",
    body: "Двухцветный ластик: белая сторона стирала карандаш, а серая жесткая сторона с абразивом — чернила (часто протирая бумагу до дырки).",
    specs: [
      { label: "Карандаши", value: "Маркировка Т, ТМ, М" },
      { label: "Заточка", value: "Складным перочинным ножиком" }
    ]
  }
};

function initBackpack() {
  const buttons = document.querySelectorAll('.bp-btn');
  if (!buttons.length) return;

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
  const data = BACKPACK_ITEMS[key];
  const view = document.getElementById('backpack-view');
  if (!data || !view) return;

  view.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid var(--border-subtle); padding-bottom: 14px;">
      <div>
        <span style="font-size: 2.2rem; display: block;">${data.emoji}</span>
        <h3 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--navy-ink);">${data.title}</h3>
      </div>
      <div style="background: var(--gold-accent); color: #fff; font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; padding: 4px 12px; border-radius: 4px;">${data.price}</div>
    </div>
    <p style="font-size: 1rem; color: #333; line-height: 1.6; margin-bottom: 20px;">${data.body}</p>
    <div style="background: #fff; padding: 18px; border-radius: 10px; border: 1px solid var(--border-subtle); display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      ${data.specs.map(s => `
        <div>
          <strong style="color: var(--primary-red); display: block; font-size: 0.85rem; text-transform: uppercase;">${s.label}:</strong>
          <span style="font-size: 0.95rem; color: #444;">${s.value}</span>
        </div>
      `).join('')}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   5. QUIZ ENGINE
   -------------------------------------------------------------------------- */
const QUIZ_QUESTIONS = [
  {
    step: "Вопрос 1 из 7",
    subject: "Октябрята",
    question: "Какое количество человек входило в «звёздочку» октябрят?",
    options: [
      { text: "3 человека", correct: false },
      { text: "5 человек (по числу лучей звезды)", correct: true },
      { text: "10 человек", correct: false },
      { text: "7 человек", correct: false }
    ],
    explanation: "Верно! Ровно 5 человек — командир, санитар, цветовод, библиотекарь и хозяин."
  },
  {
    step: "Вопрос 2 из 7",
    subject: "Редкие предметы",
    question: "Какой предмет преподавался в 1947–1959 годах и учил законам силлогизма и дедукции?",
    options: [
      { text: "Научный коммунизм", correct: false },
      { text: "Логика", correct: true },
      { text: "Риторика", correct: false },
      { text: "Политэкономия", correct: false }
    ],
    explanation: "Верно! Логика и Психология формировали доказательное мышление."
  },
  {
    step: "Вопрос 3 из 7",
    subject: "Чистописание",
    question: "Каким инструментом запрещалось писать младшеклассникам в 50–60-е годы?",
    options: [
      { text: "Химическим карандашом", correct: false },
      { text: "Шариковой ручкой (считалось, что портит почерк)", correct: true },
      { text: "Стальным пером", correct: false },
      { text: "Цветным мелком", correct: false }
    ],
    explanation: "Именно так! Шариковые ручки запрещались ради постановки почерка."
  },
  {
    step: "Вопрос 4 из 7",
    subject: "Реформы",
    question: "В каком году окончательно отменили раздельное обучение мальчиков и девочек?",
    options: [
      { text: "В 1945 году", correct: false },
      { text: "В 1954 году", correct: true },
      { text: "В 1968 году", correct: false },
      { text: "Оно никогда не отменялось", correct: false }
    ],
    explanation: "Правильно! Раздельное обучение в городах действовало с 1943 по 1954 год."
  },
  {
    step: "Вопрос 5 из 7",
    subject: "Школьный быт",
    question: "Какую деталь школьной формы девочки каждую субботу отпарывали, стирали и пришивали заново?",
    options: [
      { text: "Белые кружевные воротнички и манжеты", correct: true },
      { text: "Черный фартук", correct: false },
      { text: "Пояс от платья", correct: false },
      { text: "Пуговицы", correct: false }
    ],
    explanation: "Точно! Кружевные воротнички требовали еженедельной стирки и глажки."
  },
  {
    step: "Вопрос 6 из 7",
    subject: "Экзамены",
    question: "Сколько часов отводилось выпускникам 10 класса на итоговое сочинение по литературе?",
    options: [
      { text: "2 часа", correct: false },
      { text: "4 часа", correct: false },
      { text: "6 астрономических часов", correct: true },
      { text: "8 часов", correct: false }
    ],
    explanation: "Верно! Сочинение длилось ровно 6 часов, темы передавали по радио."
  },
  {
    step: "Вопрос 7 из 7",
    subject: "Судьба",
    question: "Что был обязан сделать каждый выпускник советского вуза после диплома?",
    options: [
      { text: "Отработать 3 года по государственному распределению", correct: true },
      { text: "Служить 5 лет офицером", correct: false },
      { text: "Выплатить 1000 рублей", correct: false },
      { text: "Сдать кандидатский минимум", correct: false }
    ],
    explanation: "Блестяще! Обязательное 3-летнее распределение гарантировало работу и подъемные."
  }
];

let currentQuestionIndex = 0;
let userScore = 0;
let quizAnswered = false;

function initQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  renderQuizQuestion();

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) nextBtn.addEventListener('click', handleNextQuestion);

  const restartBtn = document.getElementById('restart-quiz-btn');
  if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
}

function renderQuizQuestion() {
  quizAnswered = false;
  const q = QUIZ_QUESTIONS[currentQuestionIndex];

  const stepEl = document.getElementById('quiz-step');
  const subjEl = document.getElementById('quiz-subject');
  const qEl = document.getElementById('quiz-question');
  const optsEl = document.getElementById('quiz-options');
  const expEl = document.getElementById('quiz-explanation');
  const nextBtn = document.getElementById('quiz-next-btn');
  const progressBar = document.getElementById('quiz-progress-bar');

  if (!qEl || !optsEl) return;

  const progressPercent = Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100);
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  stepEl.textContent = q.step;
  subjEl.textContent = q.subject;
  qEl.textContent = q.question;
  expEl.style.display = 'none';
  nextBtn.style.display = 'none';

  optsEl.innerHTML = '';
  const letters = ['А', 'Б', 'В', 'Г'];

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.innerHTML = `
      <span class="quiz-opt-letter">${letters[idx]}.</span>
      <span class="quiz-opt-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => handleOptionClick(btn, opt, q));
    optsEl.appendChild(btn);
  });
}

function handleOptionClick(btn, opt, q) {
  if (quizAnswered) return;
  quizAnswered = true;

  const expEl = document.getElementById('quiz-explanation');
  const nextBtn = document.getElementById('quiz-next-btn');
  const allBtns = document.querySelectorAll('.quiz-opt-btn');

  if (opt.correct) {
    btn.classList.add('correct');
    userScore++;
  } else {
    btn.classList.add('wrong');
    allBtns.forEach((b, i) => {
      if (q.options[i].correct) b.classList.add('correct');
    });
  }

  expEl.textContent = q.explanation;
  expEl.style.display = 'block';

  if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
    nextBtn.querySelector('span').textContent = 'Следующий вопрос';
  } else {
    nextBtn.querySelector('span').textContent = 'Получить аттестат зрелости';
  }
  nextBtn.style.display = 'inline-flex';
}

function handleNextQuestion() {
  if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
    currentQuestionIndex++;
    renderQuizQuestion();
  } else {
    showAttestatResult();
  }
}

function showAttestatResult() {
  const quizCard = document.getElementById('quiz-card');
  const resultCard = document.getElementById('quiz-result-card');
  if (!quizCard || !resultCard) return;

  quizCard.style.display = 'none';
  resultCard.style.display = 'block';

  const gradeDigit = document.getElementById('final-grade-digit');
  const verdictTitle = document.getElementById('final-verdict-title');
  const scoreText = document.getElementById('final-score-text');
  const decisionText = document.getElementById('final-decision-text');

  scoreText.textContent = `Правильных ответов: ${userScore} из ${QUIZ_QUESTIONS.length}`;

  if (userScore === 7) {
    gradeDigit.textContent = "5";
    gradeDigit.style.color = "#2E7D32";
    verdictTitle.textContent = "КРУГЛЫЙ ОТЛИЧНИК! ЗОЛОТАЯ МЕДАЛЬ!";
    decisionText.textContent = "Зачислен в МГУ им. Ломоносова без вступительных испытаний!";
  } else if (userScore >= 5) {
    gradeDigit.textContent = "4";
    gradeDigit.style.color = "#1565C0";
    verdictTitle.textContent = "УДАРНИК УЧЕБЫ";
    decisionText.textContent = "Зачислен в Политехнический институт на специальность «Инженер-конструктор»!";
  } else if (userScore >= 3) {
    gradeDigit.textContent = "3";
    gradeDigit.style.color = "#E65100";
    verdictTitle.textContent = "ТРОЕЧНИК";
    decisionText.textContent = "Направлен в СПТУ для получения профессии «слесарь-механик 3 разряда».";
  } else {
    gradeDigit.textContent = "2";
    gradeDigit.style.color = "#C62828";
    verdictTitle.textContent = "ДВОЙКА! РОДИТЕЛЕЙ К ДИРЕКТОРУ!";
    decisionText.textContent = "Оставлен на второй год для повторного изучения программы.";
  }

  resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  quizAnswered = false;
  document.getElementById('quiz-card').style.display = 'block';
  document.getElementById('quiz-result-card').style.display = 'none';
  renderQuizQuestion();
}

/* --------------------------------------------------------------------------
   6. FULLSCREEN INTERACTIVE PRESENTATION DECK (9 SLIDES + SPEAKER NOTES)
   -------------------------------------------------------------------------- */
const PRESENTATION_SLIDES = [
  {
    number: "1 / 9",
    speaker: "Спикер 1: Историк команды",
    tag: "ВСТУПЛЕНИЕ & ВЕЛИКИЙ ЛИКБЕЗ",
    title: "Как страна преодолела 80% неграмотности",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Likbez.JPG",
    bullets: [
      "В 1917 году около 80% населения Российской империи не умело читать и писать.",
      "Декрет 1919 года обязал всё население от 8 до 50 лет обучиться грамоте под страхом трудовой повинности.",
      "Рабочий день обучающихся сокращался на 2 часа с сохранением заработной платы.",
      "«Мы не рабы, рабы не мы» — первые слова, выводимые шахтерами при керосиновых лампах."
    ],
    speakerScript: "Добрый день! Представьте 1917 год: 8 из 10 жителей страны не умели ни читать, ни писать. Декрет 1919 года совершил чудо: за два десятилетия миллионы крестьян сели за буквари. СССР совершил величайший рывок в истории просвещения!"
  },
  {
    number: "2 / 9",
    speaker: "Спикер 1: Историк команды",
    tag: "ЭВОЛЮЦИЯ РЕФОРМ",
    title: "От экспериментов к академическому канону",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/RIAN_archive_795042_Soviet_schoolgirl_Katya_Lycheva.jpg/640px-RIAN_archive_795042_Soviet_schoolgirl_Katya_Lycheva.jpg",
    bullets: [
      "1920-е: Бригадный метод, отмена оценок и уроков — эксперименты Крупской и Луначарского.",
      "1931–1932: Постановления ЦК ВКП(б) — возврат стабильных учебников Киселева и Пёрышкина.",
      "1943–1954: Раздельное обучение мальчиков и девочек в 146 городах СССР.",
      "1958: Хрущевская политехнизация с заводской практикой и рождение физмат-школ Лаврентьева."
    ],
    speakerScript: "В 1920-е школа пыталась жить без отметок и парт, но индустриализация потребовала инженеров. В 1931 году школа вернулась к железному академическому стандарту: звонкам, партам Эрисмана и фундаментальным учебникам."
  },
  {
    number: "3 / 9",
    speaker: "Спикер 2: Этнограф школьного быта",
    tag: "ИЕРАРХИЯ ВЗРОСЛЕНИЯ",
    title: "Октябрята, Пионеры, Комсомол",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/RIAN_archive_872838_Children_at_the_Artek_Young_Pioneer_Camp.jpg/640px-RIAN_archive_872838_Children_at_the_Artek_Young_Pioneer_Camp.jpg",
    bullets: [
      "Октябрята (1–3 классы): деление на «звёздочки» ровно по 5 человек (командир, санитар, цветовод).",
      "Пионеры (3–8 классы): алый шелковый галстук, узел-подушечка, горн, барабан и пионерский салют.",
      "Комсомол (ВЛКСМ, с 14 лет): строгий экзамен в райкоме по съездам и уставу.",
      "Без комсомольского билета путь в престижные вузы (МГУ, Бауманка) был практически закрыт."
    ],
    speakerScript: "Советский школьник рос внутри четкой навигации: октябренок носил рубиновую звездочку, пионер бережно гладил алый галстук через марлю каждое утро, а в 14 лет с трепетом сдавал экзамен на комсомольский билет."
  },
  {
    number: "4 / 9",
    speaker: "Спикер 2: Этнограф школьного быта",
    tag: "ШКОЛЬНЫЙ ДРЕСС-КОД",
    title: "Форма и подвиг с кружевными воротничками",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Soviet_Young_Pioneers_in_1983_in_the_Zeravshan_Mountains_of_Tajik_SSR.jpg/640px-Soviet_Young_Pioneers_in_1983_in_the_Zeravshan_Mountains_of_Tajik_SSR.jpg",
    bullets: [
      "1948: Гимнастерки с воротником-стойкой, ремни с бляхой «Ш» и фуражки с кокардой у мальчиков.",
      "Коричневые шерстяные платья с черным повседневным и белым праздничным фартуком у девочек.",
      "Подвиг субботы: воротнички отпарывали, стирали, крахмалили и заново пришивали мелкими стежками.",
      "1973: Синяя полушерстяная куртка джинсового покроя с пластиковым шевроном на рукаве."
    ],
    speakerScript: "Главный подвиг советских девочек — белые воротнички! Каждую субботу их отпарывали, стирали и пришивали заново. А мальчишки обожали синие куртки с шевроном солнца и раскрытой книги!"
  },
  {
    number: "5 / 9",
    speaker: "Спикер 3: Академик уроков",
    tag: "АНАТОМИЯ УРОКА",
    title: "Парта Эрисмана, перья и уникальные предметы",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/RIAN_archive_13594_Physical_training_lesson.jpg/640px-RIAN_archive_13594_Physical_training_lesson.jpg",
    bullets: [
      "Парта Эрисмана: наклон столешницы 15° спасал зрение и осанку; откидная крышка с грохотом.",
      "Чистописание: стальные перья №86 «звёздочка», чернильница-непроливайка, запрет шариковых ручек.",
      "Логика и Психология: законы силлогизма, индукции и доказательств в 1947–1959 гг.",
      "НВП: разборка автомата Калашникова за 18 секунд, метание гранат и стрельба из ТОЗ-8."
    ],
    speakerScript: "Парта Эрисмана была шедевром эргономики: сутулиться за ней невозможно! На чистописании перьями формировали железную моторику, а на НВП юноши собирали автомат Калашникова с закрытыми глазами."
  },
  {
    number: "6 / 9",
    speaker: "Спикер 3: Академик уроков",
    tag: "СОДЕРЖИМОЕ РАНЦА",
    title: "Логарифмическая линейка и булочка за 3 копейки",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pioneer_Summer_Camp_1972_Kiev.jpg/640px-Pioneer_Summer_Camp_1972_Kiev.jpg",
    bullets: [
      "Деревянный березовый пенал со скользящей крышкой за 35 копеек.",
      "Тетрадка за 2 копейки с таблицей умножения и промокашкой внутри.",
      "Логарифмическая линейка — аналоговый компьютер для расчетов без батареек.",
      "15 копеек на обед: хрустящая булочка (3 коп.) и яблочный сок с мякотью (10 коп.)."
    ],
    speakerScript: "В ранце советского школьника лежал весь арсенал инженера: деревянный пенал, тетрадь за 2 копейки и логарифмическая линейка, на которой рассчитывали турбины ГЭС и полет Гагарина!"
  },
  {
    number: "7 / 9",
    speaker: "Спикер 4: Социолог быта",
    tag: "ТРУД И САМОУПРАВЛЕНИЕ",
    title: "Красная повязка, субботники и поездки «на картошку»",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/RIAN_archive_795042_Soviet_schoolgirl_Katya_Lycheva.jpg/640px-RIAN_archive_795042_Soviet_schoolgirl_Katya_Lycheva.jpg",
    bullets: [
      "Дежурство: ученики сами мыли доску, проветривали класс и мыли полы со шваброй и опилками.",
      "Староста вел журнал, следил за тишиной и организовывал актив класса.",
      "Сбор макулатуры и металлолома: азартные соревнования дворов ради путевки в «Артек».",
      "Поездки «на картошку» в сентябре: романтика бараков, костры, гитара и трудовая дружба."
    ],
    speakerScript: "Школа воспитывала характер трудом: классы убирали сами ученики с красными повязками дежурных. А осенняя картошка и сбор макулатуры учили командной сплоченности!"
  },
  {
    number: "8 / 9",
    speaker: "Спикер 4: Социолог быта",
    tag: "ЭКЗАМЕНЫ & РАСПРЕДЕЛЕНИЕ",
    title: "6 часов сочинения, билеты у доски и путевка на 3 года",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/RIAN_archive_872838_Children_at_the_Artek_Young_Pioneer_Camp.jpg/640px-RIAN_archive_872838_Children_at_the_Artek_Young_Pioneer_Camp.jpg",
    bullets: [
      "Выпускные экзамены: 6-часовое сочинение по литературе и билеты с мелом у доски.",
      "СПТУ на гособеспечении vs Техникум vs ВУЗ (конкурс до 30 человек на место).",
      "Золотые медалисты сдавали всего один профильный экзамен на «отлично».",
      "Распределение: обязательная отработка ровно 3 года молодым специалистом по направлению."
    ],
    speakerScript: "В 10 классе писали 6-часовое сочинение, темы которого объявляли по радио в 9:00 утра. А платой за бесплатный университет было трехлетнее распределение в любой уголок страны с гарантированным жильем!"
  },
  {
    number: "9 / 9",
    speaker: "Все спикеры команды",
    tag: "ЗАКЛЮЧЕНИЕ & НАСЛЕДИЕ",
    title: "Феномен советской системы образования",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Soviet_Young_Pioneers_in_1983_in_the_Zeravshan_Mountains_of_Tajik_SSR.jpg/640px-Soviet_Young_Pioneers_in_1983_in_the_Zeravshan_Mountains_of_Tajik_SSR.jpg",
    bullets: [
      "100% грамотность и абсолютная доступность образования от детсада до аспирантуры.",
      "Сильнейшая в мире физико-математическая школа, давшая лауреатов Нобелевской премии.",
      "Культ книги, науки и инженерной мысли.",
      "Приглашаем всех полистать виртуальный дневник и пройти реальный экзамен 1980 года на нашем сайте!"
    ],
    speakerScript: "Советская школа дала миру покорителей атома и космоса. Спасибо за внимание! Приглашаем полистать дневник и проверить свои силы в экзамене на нашем интерактивном сайте!"
  }
];

let currentSlide = 0;
let showSpeakerNotes = true;

function initPresentationDeck() {
  const openBtns = [
    document.getElementById('open-presentation-btn'),
    document.getElementById('hero-presentation-btn'),
    document.getElementById('footer-pres-btn')
  ].filter(Boolean);

  const modal = document.getElementById('presentation-modal');
  const closeBtn = document.getElementById('pres-close-btn');
  const backdrop = document.getElementById('pres-backdrop');
  const prevBtn = document.getElementById('pres-prev-btn');
  const nextBtn = document.getElementById('pres-next-btn');
  const toggleNotesBtn = document.getElementById('toggle-speaker-notes-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openPresentation();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closePresentation);
  if (backdrop) backdrop.addEventListener('click', closePresentation);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide(currentSlide);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlide < PRESENTATION_SLIDES.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      }
    });
  }

  if (toggleNotesBtn) {
    toggleNotesBtn.addEventListener('click', () => {
      showSpeakerNotes = !showSpeakerNotes;
      const notesBox = document.querySelector('.speaker-script-box');
      if (notesBox) {
        notesBox.style.display = showSpeakerNotes ? 'block' : 'none';
      }
    });
  }

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      if (currentSlide < PRESENTATION_SLIDES.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide(currentSlide);
      }
    } else if (e.key === 'Escape') {
      closePresentation();
    }
  });
}

function openPresentation() {
  const modal = document.getElementById('presentation-modal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  currentSlide = 0;
  renderSlide(currentSlide);
}

function closePresentation() {
  const modal = document.getElementById('presentation-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function renderSlide(index) {
  const slide = PRESENTATION_SLIDES[index];
  const container = document.getElementById('pres-slide-container');
  const indicator = document.getElementById('pres-slide-indicator');
  const speakerBadge = document.getElementById('pres-speaker-badge');
  const prevBtn = document.getElementById('pres-prev-btn');
  const nextBtn = document.getElementById('pres-next-btn');
  const dotsContainer = document.getElementById('pres-dots');

  if (!container || !slide) return;

  if (indicator) indicator.textContent = `Слайд ${index + 1} из ${PRESENTATION_SLIDES.length}`;
  if (speakerBadge) speakerBadge.textContent = slide.speaker;

  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.querySelector('span').textContent = index === PRESENTATION_SLIDES.length - 1 ? 'Финал ✓' : 'Вперёд →';
  }

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    PRESENTATION_SLIDES.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `pres-dot ${i === index ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentSlide = i;
        renderSlide(currentSlide);
      });
      dotsContainer.appendChild(dot);
    });
  }

  container.innerHTML = `
    <div class="slide-content-grid">
      <div class="slide-photo-box" onclick="openLightbox('${slide.photo}', '${slide.title}')">
        <img src="${slide.photo}" alt="${slide.title}" class="slide-photo-img" loading="lazy">
      </div>
      <div class="slide-info-col">
        <div class="slide-tag">${slide.tag}</div>
        <h2 class="slide-title">${slide.title}</h2>
        <ul class="slide-bullets">
          ${slide.bullets.map(b => `<li><span class="bullet-star">★</span><span>${b}</span></li>`).join('')}
        </ul>
        <div class="speaker-script-box" style="display: ${showSpeakerNotes ? 'block' : 'none'};">
          <div class="speaker-script-header">
            <span>🎤 Текст для произнесения вслух (${slide.speaker.split(':')[0]})</span>
          </div>
          <p class="speaker-speech-text">«${slide.speakerScript}»</p>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   7. IMAGE LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(src, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (!modal || !img) return;

  img.src = src;
  if (cap) cap.textContent = caption || 'Архивное фото советской эпохи';
  modal.classList.add('open');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('open');
}

/* --------------------------------------------------------------------------
   8. NAVIGATION & SCROLL PROGRESS
   -------------------------------------------------------------------------- */
function initNavigation() {
  const toggleBtn = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', () => mainNav.classList.toggle('open'));
    mainNav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mainNav.classList.remove('open')));
  }
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = scrollHeight > 0 ? `${(scrollTop / scrollHeight) * 100}%` : '0%';
  });
}
