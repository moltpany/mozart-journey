(function () {
  "use strict";

  const DATA_URL = "data/mozart-journey.json";
  const MOZART_BIRTH_YEAR = 1756;
  const THEME_STORAGE_KEY = "mozart-journey-theme";
  const LANG_STORAGE_KEY = "mozart-journey-lang";
  const SUPPORTED_LANGS = ["zh", "en"];
  const COLLECTIONS = [
    {
      id: "salzburg-trilogy",
      title: "萨尔茨堡三部曲",
      description: "1775 年萨尔茨堡时期的三首小提琴协奏曲，明亮、优雅，也带着青年莫扎特的舞台感。",
      titleEn: "Salzburg Trilogy",
      descriptionEn: "Three violin concertos from the 1775 Salzburg period — bright, elegant, and already full of the young Mozart's sense of the stage.",
    },
    {
      id: "pressure-relief",
      title: "压力大的时候会听",
      description: "两首小调作品：不是简单安慰，而是把紧张情绪放进清晰结构里。",
      titleEn: "For Stressful Days",
      descriptionEn: "Two minor-key works: not easy comfort, but tension organised into clear structure.",
    },
    {
      id: "love",
      title: "关于爱情",
      description: "莫扎特歌剧里的爱情：《费加罗》里的嫉妒与宽恕，《魔笛》终于配对的 Papageno，《女人心》对忠诚的试探。",
      titleEn: "About Love",
      descriptionEn: "Love in Mozart's operas: jealousy and forgiveness in Figaro, Papageno finally finding his match in The Magic Flute, and a test of fidelity in Così fan tutte.",
    },
    {
      id: "job-search",
      title: "Mozart 找工作",
      description: "曼海姆、巴黎和早期维也纳阶段的作品，听见才华、委约、求职和不确定性并行。",
      titleEn: "Mozart Job-Hunting",
      descriptionEn: "Works from the Mannheim, Paris and early Vienna years, where talent, commissions, job-seeking and uncertainty all run side by side.",
    },
    {
      id: "favorite-playing",
      title: "我自己最喜欢弹的",
      description: "放在琴上会反复回来的作品，先记录曲目，后续再补到地图节点。",
      titleEn: "My Favourites to Play",
      descriptionEn: "Pieces I keep coming back to at the keyboard — logged first, to be tied to map nodes later.",
    },
    {
      id: "heard-live",
      title: "我听过现场的",
      description: "和现场经验绑定的作品，优先保留听过的具体曲目。",
      titleEn: "Heard Live",
      descriptionEn: "Works tied to a live experience, keeping the specific pieces I actually heard in concert.",
    },
    {
      id: "personal-favorites",
      title: "我喜欢的",
      description: "不是单一情绪标签，而是长期会回来的旋律、慢乐章和音色记忆。",
      titleEn: "Personal Favourites",
      descriptionEn: "Not a single mood tag, but the melodies, slow movements and timbres I return to over time.",
    },
    {
      id: "favorite-album",
      title: "我喜欢的专辑",
      description: "按专辑记忆整理的钢琴作品组，后续可逐步补足地图节点。",
      titleEn: "Favourite Album",
      descriptionEn: "A group of piano works organised by album memory, to be linked to map nodes step by step.",
    },
    {
      id: "coffee-playlist",
      title: "Mozart Coffee Playlist",
      description: "适合清晨、咖啡和轻快启动状态的莫扎特。",
      titleEn: "Mozart Coffee Playlist",
      descriptionEn: "Mozart for mornings, coffee and an easy, upbeat start to the day.",
    },
    {
      id: "sleep-playlist",
      title: "Mozart Sleep Playlist",
      description: "多取第二乐章：放松、飞行、黄昏和睡前听感。",
      titleEn: "Mozart Sleep Playlist",
      descriptionEn: "Mostly slow movements: relaxed, weightless, dusk-and-bedtime listening.",
    },
  ];

  const I18N = {
    zh: {
      "doc.title": "莫扎特足迹互动地图",
      "nav.aria": "页面导航",
      "nav.backHome": "← Moltpany",
      "nav.backHomeAria": "返回 Moltpany 主站",
      "nav.collections": "收藏",
      "nav.timeline": "时间线",
      "nav.detail": "作品详情",
      "nav.sources": "来源",
      "hero.eyebrow": "1756-1791 · 欧洲城市与作品",
      "hero.title": "莫扎特的足迹",
      "hero.copy": "沿着地图与年份时间线，查看莫扎特在伦敦、维也纳、米兰、萨尔茨堡、巴黎、慕尼黑与布拉格等地留下的代表作品。",
      "filters.kicker": "筛选",
      "filters.title": "按城市、时期和类型探索",
      "filters.formAria": "足迹筛选",
      "filter.clearAll": "清除筛选",
      "filter.search": "搜索",
      "filter.searchPlaceholder": "K. 488 / 协奏曲 / Vienna",
      "filter.city": "城市",
      "filter.period": "时期",
      "filter.genre": "类型",
      "period.all": "全部时期",
      "period.p1": "1756-1772 童年与旅行",
      "period.p2": "1773-1781 萨尔茨堡与求职",
      "period.p3": "1782-1791 维也纳成熟期",
      "select.allCities": "全部城市",
      "select.allGenres": "全部类型",
      "explorer.aria": "莫扎特足迹地图与时间线",
      "map.kicker": "地图",
      "map.title": "欧洲足迹",
      "map.appAria": "莫扎特旅行城市互动地图",
      "map.warning": "地图底图需要联网加载；下方时间线和作品详情仍可正常阅读。",
      "timeline.kicker": "时间线",
      "timeline.title": "年份与作品",
      "action.viewDetail": "查看作品详情",
      "detail.kicker": "作品详情",
      "detail.workPlaceholder": "选择一个地点或年份",
      "detail.metaPlaceholder": "点击地图点位或时间线节点后，这里会显示作品背景与意义。",
      "detail.context": "创作背景",
      "detail.meaning": "含义",
      "detail.waiting": "等待选择。",
      "detail.placeSource": "查看地点来源",
      "detail.imageSource": "图片来源",
      "detail.mapLink": "查看地图位置",
      "detail.source": "查看参考来源",
      "detail.noMatchWork": "没有匹配的足迹",
      "detail.adjustFilters": "请调整筛选条件。",
      "detail.noResult": "当前筛选没有结果。",
      "collections.kicker": "我的收藏",
      "collections.title": "按你的听感场景整理",
      "collections.navAria": "收藏分组快速导航",
      "sources.kicker": "资料说明",
      "sources.title": "保守表述，便于后续扩展",
      "sources.intro": "第一版选取少量关键节点，来源字段保存在 JSON 数据中。对委约、首演或用途不确定的作品，页面采用“通常认为”“具体场合不清楚”等保守表达。",
      "footer.text": "静态网页原型 · Leaflet + OpenStreetMap · 内容可在 <code>data/mozart-journey.json</code> 中维护",
      "footer.sister": "姊妹作品：<a href=\"https://moltpany.github.io/beethoven-journey/\">Beethoven Journey</a> · 音乐枢纽：<a href=\"https://moltpany.github.io/music-diary/\">Music Diary</a> · 回到 <a href=\"https://moltpany.github.io/\">Moltpany</a>",
      "theme.toLight": "白天",
      "theme.toDark": "黑夜",
      "theme.ariaToLight": "切换到白天模式",
      "theme.ariaToDark": "切换到黑夜模式",
      "lang.label": "EN",
      "lang.aria": "切换到英文界面",
      "listening.targetPrefix": "播放目标：",
      "listening.noteFallback": "听这首作品",
      "place.imageError": "地点图片暂时无法加载，可查看图片来源。",
      "error.noData": "数据未加载",
      "error.loadFailWork": "数据加载失败",
      "error.loadFailMeta": "请通过本地静态服务器打开本页面，例如 python -m http.server 8000。",
      "error.loadFailContext": "浏览器直接打开 file:// 页面时，可能会禁止读取 data/mozart-journey.json。",
      "error.loadFailMeaning": "启动本地服务器后再访问 http://localhost:8000 即可完整查看地图与时间线。",
    },
    en: {
      "doc.title": "Mozart Journey · Interactive Map",
      "nav.aria": "Page navigation",
      "nav.backHome": "← Moltpany",
      "nav.backHomeAria": "Back to Moltpany",
      "nav.collections": "Collections",
      "nav.timeline": "Timeline",
      "nav.detail": "Work detail",
      "nav.sources": "Sources",
      "hero.eyebrow": "1756-1791 · European cities & works",
      "hero.title": "Mozart's Journey",
      "hero.copy": "Follow the map and the year-by-year timeline to see the works Mozart left in London, Vienna, Milan, Salzburg, Paris, Munich, Prague and beyond.",
      "filters.kicker": "Filter",
      "filters.title": "Explore by city, period and genre",
      "filters.formAria": "Journey filters",
      "filter.clearAll": "Clear filters",
      "filter.search": "Search",
      "filter.searchPlaceholder": "K. 488 / Concerto / Vienna",
      "filter.city": "City",
      "filter.period": "Period",
      "filter.genre": "Genre",
      "period.all": "All periods",
      "period.p1": "1756-1772 Childhood & travels",
      "period.p2": "1773-1781 Salzburg & job-seeking",
      "period.p3": "1782-1791 Vienna maturity",
      "select.allCities": "All cities",
      "select.allGenres": "All genres",
      "explorer.aria": "Mozart journey map and timeline",
      "map.kicker": "Map",
      "map.title": "European journey",
      "map.appAria": "Interactive map of cities Mozart travelled to",
      "map.warning": "The base map needs an internet connection to load; the timeline and work details below remain fully readable.",
      "timeline.kicker": "Timeline",
      "timeline.title": "Years & works",
      "action.viewDetail": "View work detail",
      "detail.kicker": "Work detail",
      "detail.workPlaceholder": "Select a place or a year",
      "detail.metaPlaceholder": "Click a map marker or a timeline node to see the work's background and meaning here.",
      "detail.context": "Background",
      "detail.meaning": "Meaning",
      "detail.waiting": "Waiting for a selection.",
      "detail.placeSource": "View place source",
      "detail.imageSource": "Image source",
      "detail.mapLink": "Show on map",
      "detail.source": "View reference source",
      "detail.noMatchWork": "No matching stops",
      "detail.adjustFilters": "Try adjusting the filters.",
      "detail.noResult": "No results for the current filters.",
      "collections.kicker": "My collections",
      "collections.title": "Grouped by listening mood",
      "collections.navAria": "Quick navigation for collection groups",
      "sources.kicker": "About the sources",
      "sources.title": "Cautious wording, easy to extend later",
      "sources.intro": "This first version picks a small set of key nodes, with source fields kept in the JSON data. For works whose commission, premiere or purpose is uncertain, the page uses cautious wording such as “generally thought” or “the exact occasion is unclear”.",
      "footer.text": "Static web prototype · Leaflet + OpenStreetMap · content lives in <code>data/mozart-journey.json</code>",
      "footer.sister": "Sister project: <a href=\"https://moltpany.github.io/beethoven-journey/\">Beethoven Journey</a> · music hub: <a href=\"https://moltpany.github.io/music-diary/\">Music Diary</a> · back to <a href=\"https://moltpany.github.io/\">Moltpany</a>",
      "theme.toLight": "Light",
      "theme.toDark": "Dark",
      "theme.ariaToLight": "Switch to light mode",
      "theme.ariaToDark": "Switch to dark mode",
      "lang.label": "中文",
      "lang.aria": "Switch to Chinese interface",
      "listening.targetPrefix": "Now playing: ",
      "listening.noteFallback": "Listen to this work",
      "place.imageError": "The place image can't load right now — see the image source.",
      "error.noData": "Data not loaded",
      "error.loadFailWork": "Failed to load data",
      "error.loadFailMeta": "Please open this page via a local static server, e.g. python -m http.server 8000.",
      "error.loadFailContext": "Opening the page directly as a file:// URL may block reading data/mozart-journey.json.",
      "error.loadFailMeaning": "Start a local server and visit http://localhost:8000 to see the full map and timeline.",
    },
  };
  const state = {
    entries: [],
    filtered: [],
    selectedId: null,
    map: null,
    markers: new Map(),
    clusterGroup: null,
    lang: "zh",
    enById: new Map(),
  };

  function normalizeLang(lang) {
    return SUPPORTED_LANGS.includes(lang) ? lang : "zh";
  }

  // Merge the English per-entry overlay (data/mozart-journey.en.*) on top of the
  // base Chinese entry when the page is in English. The base data stays the
  // single source of truth; the overlay only carries translated prose.
  function localize(entry) {
    if (!entry || normalizeLang(state.lang) !== "en") {
      return entry;
    }
    const overlay = state.enById.get(entry.id);
    if (!overlay) {
      return entry;
    }
    const merged = { ...entry };
    if (overlay.context) merged.context = overlay.context;
    if (overlay.meaning) merged.meaning = overlay.meaning;
    if (overlay.source) merged.source = { ...entry.source, ...overlay.source };
    if (overlay.listening && entry.listening) merged.listening = { ...entry.listening, ...overlay.listening };
    if (overlay.place && entry.place) merged.place = { ...entry.place, ...overlay.place };
    return merged;
  }

  async function loadEnglishOverlay() {
    try {
      const response = await fetch("data/mozart-journey.en.json");
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      // fall through to the inline fallback below
    }
    if (Array.isArray(window.MOZART_JOURNEY_DATA_EN)) {
      return window.MOZART_JOURNEY_DATA_EN;
    }
    return [];
  }

  function t(key) {
    const lang = normalizeLang(state.lang);
    const dict = I18N[lang] || I18N.zh;
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    return I18N.zh[key] !== undefined ? I18N.zh[key] : key;
  }

  function sep() {
    return normalizeLang(state.lang) === "en" ? ": " : "：";
  }

  function collectionTitle(collection) {
    return normalizeLang(state.lang) === "en" && collection.titleEn ? collection.titleEn : collection.title;
  }

  function collectionDescription(collection) {
    return normalizeLang(state.lang) === "en" && collection.descriptionEn
      ? collection.descriptionEn
      : collection.description;
  }

  function parsePeriod(period) {
    if (!period || period === "all") {
      return null;
    }
    const parts = period.split("-").map((part) => Number.parseInt(part, 10));
    if (parts.length !== 2 || parts.some(Number.isNaN)) {
      return null;
    }
    return { start: parts[0], end: parts[1] };
  }

  function filterEntries(entries, filters) {
    const period = parsePeriod(filters.period);
    const query = normalizeSearchQuery(filters.query);
    return entries.filter((entry) => {
      const cityMatches = !filters.city || filters.city === "all" || entry.city === filters.city;
      const genreMatches = !filters.genre || filters.genre === "all" || entry.genre === filters.genre;
      const periodMatches = !period || (entry.year >= period.start && entry.year <= period.end);
      const queryMatches = !query || getEntrySearchText(entry).includes(query);
      return cityMatches && genreMatches && periodMatches && queryMatches;
    });
  }

  function normalizeSearchQuery(query) {
    return String(query || "").trim().toLowerCase();
  }

  function getEntrySearchText(entry) {
    return [
      entry.work,
      entry.catalogue,
      entry.city,
      entry.country,
      entry.genre,
      entry.year,
    ].filter(Boolean).join(" ").toLowerCase();
  }

  function getFilterOptions(entries, key) {
    return [...new Set(entries.map((entry) => entry[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function parseKNumber(catalogue) {
    const m = catalogue.match(/K\.\s*(\d+)([a-z]*)/i);
    if (!m) return Infinity;
    return parseInt(m[1], 10) + (m[2] ? m[2].charCodeAt(0) / 1000 : 0);
  }

  function byYearThenCity(a, b) {
    return a.year - b.year || parseKNumber(a.catalogue) - parseKNumber(b.catalogue) || a.city.localeCompare(b.city);
  }

  function getEntryCoordinates(entry) {
    if (entry.place && typeof entry.place.lat === "number" && typeof entry.place.lng === "number") {
      return [entry.place.lat, entry.place.lng];
    }
    return [entry.lat, entry.lng];
  }

  function getAge(year) {
    return year - MOZART_BIRTH_YEAR;
  }

  function formatAge(year) {
    const age = getAge(year);
    return normalizeLang(state.lang) === "en" ? `age ${age}` : `${age} 岁`;
  }

  function getCollectionGroups(entries) {
    return COLLECTIONS.map((collection) => ({
      ...collection,
      entries: entries
        .filter((entry) => Array.isArray(entry.collections) && entry.collections.includes(collection.id))
        .sort(byYearThenCity),
    })).filter((collection) => collection.entries.length > 0);
  }

  function getEntryCollections(entry) {
    if (!entry || !Array.isArray(entry.collections)) {
      return [];
    }
    return COLLECTIONS.filter((collection) => entry.collections.includes(collection.id));
  }

  function $(id) {
    return document.getElementById(id);
  }

  function setText(id, text) {
    const element = $(id);
    if (element) {
      element.textContent = text;
    }
  }

  function getStoredTheme() {
    try {
      return window.localStorage ? window.localStorage.getItem(THEME_STORAGE_KEY) : null;
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    } catch (error) {
      // localStorage can be unavailable for file:// or privacy-restricted contexts.
    }
  }

  function normalizeTheme(theme) {
    return theme === "dark" ? "dark" : "light";
  }

  function applyTheme(theme, persist) {
    const normalized = normalizeTheme(theme);
    document.documentElement.dataset.theme = normalized;
    const button = $("theme-toggle");
    if (button) {
      const isDark = normalized === "dark";
      button.textContent = isDark ? t("theme.toLight") : t("theme.toDark");
      button.setAttribute("aria-pressed", isDark ? "true" : "false");
      button.setAttribute("aria-label", isDark ? t("theme.ariaToLight") : t("theme.ariaToDark"));
    }
    if (persist) {
      saveTheme(normalized);
    }
    return normalized;
  }

  function getInitialTheme() {
    const stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function toggleTheme() {
    const current = normalizeTheme(document.documentElement.dataset.theme);
    return applyTheme(current === "dark" ? "light" : "dark", true);
  }

  function initTheme() {
    applyTheme(getInitialTheme(), false);
    const button = $("theme-toggle");
    if (button) {
      button.addEventListener("click", toggleTheme);
    }
  }

  function getStoredLang() {
    try {
      return window.localStorage ? window.localStorage.getItem(LANG_STORAGE_KEY) : null;
    } catch (error) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(LANG_STORAGE_KEY, lang);
      }
    } catch (error) {
      // localStorage can be unavailable for file:// or privacy-restricted contexts.
    }
  }

  function getInitialLang() {
    const stored = getStoredLang();
    if (SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }
    const docLang = document.documentElement.dataset.lang;
    if (SUPPORTED_LANGS.includes(docLang)) {
      return docLang;
    }
    return "zh";
  }

  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
  }

  function applyLang(lang, persist) {
    const normalized = normalizeLang(lang);
    state.lang = normalized;
    document.documentElement.dataset.lang = normalized;
    document.documentElement.lang = normalized === "en" ? "en" : "zh-CN";

    applyStaticI18n();

    const langButton = $("lang-toggle");
    if (langButton) {
      langButton.textContent = t("lang.label");
      langButton.setAttribute("aria-label", t("lang.aria"));
    }
    // Re-apply theme so the toggle label follows the new language.
    applyTheme(normalizeTheme(document.documentElement.dataset.theme), false);

    if (persist) {
      saveLang(normalized);
    }
    return normalized;
  }

  function refreshDynamicLang() {
    // "All" option labels live inside data-driven selects, so update them in place.
    const cityAll = document.querySelector("#city-filter option[value='all']");
    if (cityAll) {
      cityAll.textContent = t("select.allCities");
    }
    const genreAll = document.querySelector("#genre-filter option[value='all']");
    if (genreAll) {
      genreAll.textContent = t("select.allGenres");
    }
    if (Array.isArray(state.entries) && state.entries.length) {
      renderCollections(state.entries);
      applyFilters();
    }
  }

  function toggleLang() {
    const next = normalizeLang(state.lang) === "en" ? "zh" : "en";
    applyLang(next, true);
    refreshDynamicLang();
    return next;
  }

  function initLang() {
    applyLang(getInitialLang(), false);
    const button = $("lang-toggle");
    if (button) {
      button.addEventListener("click", toggleLang);
    }
  }

  async function loadEntries() {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) {
        throw new Error(`无法加载 ${DATA_URL}`);
      }
      return response.json();
    } catch (error) {
      if (Array.isArray(window.MOZART_JOURNEY_DATA)) {
        return window.MOZART_JOURNEY_DATA;
      }
      throw error;
    }
  }

  function buildSelect(select, options, allLabel) {
    select.innerHTML = "";
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = allLabel;
    select.appendChild(all);

    for (const optionValue of options) {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionValue;
      select.appendChild(option);
    }
  }

  function currentFilters() {
    const search = $("search-filter");
    return {
      city: $("city-filter").value,
      genre: $("genre-filter").value,
      period: $("period-filter").value,
      query: search ? search.value : "",
    };
  }

  function isFiltered(filters) {
    return (
      (filters.city && filters.city !== "all") ||
      (filters.genre && filters.genre !== "all") ||
      (filters.period && filters.period !== "all") ||
      filters.query.trim() !== ""
    );
  }

  function updateClearButton(filters) {
    const btn = $("clear-filters");
    if (btn) {
      btn.hidden = !isFiltered(filters);
    }
  }

  function clearFilters() {
    const cityFilter = $("city-filter");
    const genreFilter = $("genre-filter");
    const periodFilter = $("period-filter");
    const searchFilter = $("search-filter");
    if (cityFilter) cityFilter.value = "all";
    if (genreFilter) genreFilter.value = "all";
    if (periodFilter) periodFilter.value = "all";
    if (searchFilter) searchFilter.value = "";
    applyFilters();
  }

  function initFilters(entries) {
    buildSelect($("city-filter"), getFilterOptions(entries, "city"), t("select.allCities"));
    buildSelect($("genre-filter"), getFilterOptions(entries, "genre"), t("select.allGenres"));
    for (const id of ["city-filter", "genre-filter", "period-filter"]) {
      $(id).addEventListener("change", applyFilters);
    }
    const search = $("search-filter");
    if (search) {
      search.addEventListener("input", applyFilters);
    }
    const clearBtn = $("clear-filters");
    if (clearBtn) {
      clearBtn.addEventListener("click", clearFilters);
    }
  }

  function initMap() {
    const warning = $("map-warning");
    if (!window.L) {
      warning.hidden = false;
      return;
    }

    state.map = L.map("map", {
      scrollWheelZoom: true,
      worldCopyJump: true,
    }).setView([48.7, 9.2], 5);

    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    tiles.on("tileerror", () => {
      warning.hidden = false;
    });
    tiles.addTo(state.map);

    // Cluster overlapping markers (e.g. several works in the same city).
    // Falls back gracefully to plain markers if the plugin failed to load.
    if (typeof L.markerClusterGroup === "function") {
      state.clusterGroup = L.markerClusterGroup({
        maxClusterRadius: 45,
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
      });
      state.map.addLayer(state.clusterGroup);
    }
  }

  function renderMarkers(entries) {
    if (!state.map) {
      return;
    }

    state.map.closePopup();
    if (state.clusterGroup) {
      state.clusterGroup.clearLayers();
    } else {
      for (const marker of state.markers.values()) {
        marker.closePopup();
        state.map.removeLayer(marker);
      }
    }
    state.map.closePopup();
    document.querySelectorAll(".leaflet-popup").forEach((popup) => popup.remove());
    state.markers.clear();

    for (const entry of entries) {
      const coords = getEntryCoordinates(entry);
      const placeLine = entry.place ? `<br><span>${entry.place.name}</span>` : "";
      const marker = L.marker(coords);
      if (state.clusterGroup) {
        state.clusterGroup.addLayer(marker);
      } else {
        marker.addTo(state.map);
      }
      const popupDetailAria = state.lang === "en"
        ? `View work detail for ${entry.work} ${entry.catalogue}`
        : `查看 ${entry.work} ${entry.catalogue} 的作品详情`;
      marker.bindPopup(`
        <strong>${entry.city}, ${entry.year}</strong><br>
        ${entry.work} ${entry.catalogue}${placeLine}
        <br><button type="button" class="popup-detail-link" data-id="${entry.id}" aria-label="${popupDetailAria}">${t("action.viewDetail")}</button>
      `);
      marker.on("click", () => selectEntry(entry.id, false, false));
      marker.on("popupopen", () => {
        const popup = marker.getPopup && marker.getPopup().getElement ? marker.getPopup().getElement() : null;
        const detailLink = popup ? popup.querySelector(".popup-detail-link") : null;
        if (detailLink) {
          detailLink.addEventListener("click", () => selectEntry(entry.id, false, true), { once: true });
        }
      });
      state.markers.set(entry.id, marker);
    }

    if (entries.length > 1) {
      const bounds = L.latLngBounds(entries.map(getEntryCoordinates));
      state.map.fitBounds(bounds, { padding: [36, 36] });
    } else if (entries.length === 1) {
      state.map.setView(getEntryCoordinates(entries[0]), 7);
    }
  }

  function renderTimeline(entries) {
    const list = $("timeline-list");
    list.innerHTML = "";

    for (const entry of entries.slice().sort(byYearThenCity)) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "timeline-item";
      button.dataset.id = entry.id;
      button.innerHTML = `
        <span class="timeline-year">${entry.year}<small>${formatAge(entry.year)}</small></span>
        <span class="timeline-body">
          <strong>${entry.city}</strong>
          <span>${entry.work} · ${entry.catalogue}</span>
        </span>
      `;
      button.addEventListener("click", () => selectEntry(entry.id, true, false));
      list.appendChild(button);
    }
  }

  function renderSources(entries) {
    const container = $("source-list");
    container.innerHTML = "";
    for (const entry of entries.slice().sort(byYearThenCity)) {
      const link = document.createElement("a");
      link.href = entry.source.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = `${entry.year} ${entry.city}: ${entry.source.label}`;
      container.appendChild(link);
    }
  }

  function renderCollections(entries) {
    const container = $("collection-list");
    if (!container) {
      return;
    }

    const groups = getCollectionGroups(entries);
    container.innerHTML = "";
    renderCollectionNav(groups);
    for (const collection of groups) {
      const section = document.createElement("article");
      section.className = "collection-card";
      section.id = `collection-${collection.id}`;

      const items = collection.entries.map((entry) => `
        <button type="button" class="collection-item" data-id="${entry.id}" aria-pressed="false">
          <span>${entry.year} · ${formatAge(entry.year)}</span>
          <strong>${entry.work}</strong>
          <small>${entry.catalogue} · ${entry.city}</small>
        </button>
      `).join("");

      section.innerHTML = `
        <div class="collection-card-head">
          <h3>${collectionTitle(collection)}</h3>
          <p>${collectionDescription(collection)}</p>
        </div>
        <div class="collection-items">${items}</div>
      `;

      section.querySelectorAll(".collection-item").forEach((button) => {
        button.addEventListener("click", () => selectEntry(button.dataset.id, true, true));
      });
      container.appendChild(section);
    }
    highlightSelected();
  }

  function renderCollectionNav(collections) {
    const nav = $("collection-nav");
    if (!nav) {
      return;
    }

    nav.replaceChildren();
    for (const collection of collections) {
      const link = document.createElement("a");
      link.href = `#collection-${collection.id}`;
      link.textContent = `${collectionTitle(collection)} (${collection.entries.length})`;
      nav.appendChild(link);
    }
  }

  function highlightSelected() {
    document.querySelectorAll(".timeline-item").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.id === state.selectedId);
    });
    document.querySelectorAll(".collection-item").forEach((item) => {
      const selected = item.dataset.id === state.selectedId;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function updateTimelineSelection(entry) {
    const container = $("timeline-selection");
    const text = $("timeline-selection-text");
    if (!container || !text) {
      return;
    }
    if (!entry) {
      text.textContent = "";
      container.hidden = true;
      return;
    }
    const selectedPrefix = state.lang === "en" ? "Selected: " : "已选中：";
    text.textContent = `${selectedPrefix}${entry.year} · ${entry.work} ${entry.catalogue}`;
    container.hidden = false;
  }

  function renderDetail(entry) {
    if (!entry) {
      setText("detail-work", t("detail.noMatchWork"));
      setText("detail-meta", t("detail.adjustFilters"));
      setText("detail-context", t("detail.noResult"));
      setText("detail-meaning", t("detail.noResult"));
      renderDetailCollections(null);
      renderListening(null);
      const mapLink = $("detail-map-link");
      if (mapLink) {
        mapLink.hidden = true;
      }
      $("detail-source").hidden = true;
      return;
    }

    const localized = localize(entry);
    setText("detail-work", `${localized.work} ${localized.catalogue}`);
    setText("detail-meta", `${entry.year} · ${formatAge(entry.year)} · ${entry.city}, ${entry.country} · ${entry.genre}`);
    setText("detail-context", localized.context);
    setText("detail-meaning", localized.meaning);
    renderDetailCollections(entry);
    renderListening(localized);
    renderPlace(localized.place);
    const mapLink = $("detail-map-link");
    if (mapLink) {
      mapLink.hidden = false;
    }
    const source = $("detail-source");
    source.href = localized.source.url;
    source.textContent = `${t("detail.source")}${sep()}${localized.source.label}`;
    source.hidden = false;
  }

  function renderDetailCollections(entry) {
    const container = $("detail-collections");
    if (!container) {
      return;
    }

    const collections = getEntryCollections(entry);
    container.replaceChildren();
    if (collections.length === 0) {
      container.hidden = true;
      return;
    }

    for (const collection of collections) {
      const item = document.createElement("a");
      item.className = "detail-collection-link";
      item.href = `#collection-${collection.id}`;
      item.textContent = collectionTitle(collection);
      container.appendChild(item);
    }
    container.hidden = false;
  }

  function renderListening(entry) {
    const container = $("detail-listening");
    const links = $("detail-listening-links");
    const target = $("detail-listening-target");
    const note = $("detail-listening-note");
    if (!container || !links || !entry || !entry.listening) {
      if (links) {
        links.replaceChildren();
      }
      if (target) {
        target.textContent = "";
      }
      if (note) {
        note.textContent = "";
      }
      if (container) {
        container.hidden = true;
      }
      return;
    }

    links.replaceChildren();
    if (target) {
      target.textContent = `${t("listening.targetPrefix")}${entry.listening.target || `${entry.work} ${entry.catalogue}`}`;
    }
    if (note) {
      note.textContent = entry.listening.note || t("listening.noteFallback");
    }

    const actions = [
      ["Bilibili", entry.listening.bilibiliSearch],
      ["YouTube", entry.listening.youtubeSearch],
      ["Apple Music", entry.listening.appleMusic || entry.listening.appleMusicSearch],
      ["Spotify", entry.listening.spotifySearch],
    ].filter((item) => item[1]);

    if (actions.length === 0) {
      container.hidden = true;
      return;
    }

    const listeningTargetText = entry.listening.target || `${entry.work} ${entry.catalogue}`;
    for (const [label, url] of actions) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = label;
      const listenAria = state.lang === "en"
        ? `Listen to ${listeningTargetText} on ${label}`
        : `在 ${label} 试听 ${listeningTargetText}`;
      link.setAttribute("aria-label", listenAria);
      links.appendChild(link);
    }
    container.hidden = false;
  }

  function renderPlace(place) {
    const container = $("detail-place");
    if (!container || !place) {
      if (container) {
        container.classList.remove("has-image");
        container.hidden = true;
      }
      renderPlaceImage(null);
      return;
    }

    setText("detail-place-kind", `${place.kind} · ${place.certainty}`);
    setText("detail-place-name", place.name);
    setText("detail-place-address", place.address);
    setText("detail-place-note", place.note);
    const source = $("detail-place-source");
    source.href = place.source.url;
    source.textContent = `${t("detail.placeSource")}${sep()}${place.source.label}`;
    renderPlaceImage(place.image);
    container.classList.toggle("has-image", Boolean(place.image));
    container.hidden = false;
  }

  function renderPlaceImage(image) {
    const figure = $("detail-place-image");
    const img = $("detail-place-image-img");
    const caption = $("detail-place-image-caption");
    const source = $("detail-place-image-source");
    if (!figure || !img || !caption || !source || !image) {
      if (img) {
        img.removeAttribute("src");
        img.alt = "";
        img.hidden = false;
        img.onload = null;
        img.onerror = null;
      }
      if (caption) {
        caption.textContent = "";
      }
      if (source) {
        source.href = "#";
      }
      if (figure) {
        figure.hidden = true;
      }
      return;
    }

    img.alt = image.alt;
    img.hidden = false;
    img.onload = () => {
      img.hidden = false;
      caption.textContent = image.caption;
    };
    img.onerror = () => {
      img.hidden = true;
      caption.textContent = t("place.imageError");
    };
    caption.textContent = image.caption;
    source.href = image.sourceUrl;
    source.textContent = `${t("detail.imageSource")}${sep()}${image.sourceLabel}`;
    img.src = image.url;
    figure.hidden = false;
  }

  function focusEntryOnMap(entry, scrollToMap) {
    const mapElement = $("map");
    if (scrollToMap && mapElement && typeof mapElement.scrollIntoView === "function") {
      mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (!state.map) {
      return;
    }
    const marker = state.markers.get(entry.id);
    // When clustered, expand the enclosing cluster before opening the popup,
    // otherwise openPopup() targets a marker hidden inside a cluster icon.
    if (state.clusterGroup && marker && typeof state.clusterGroup.zoomToShowLayer === "function") {
      state.clusterGroup.zoomToShowLayer(marker, () => marker.openPopup());
      return;
    }
    state.map.setView(getEntryCoordinates(entry), Math.max(state.map.getZoom(), 6), { animate: true });
    if (marker) {
      marker.openPopup();
    }
  }

  function selectEntry(id, focusMap, scrollToDetail) {
    const entry = state.filtered.find((item) => item.id === id) || state.entries.find((item) => item.id === id);
    if (!entry) {
      return;
    }
    state.selectedId = entry.id;
    renderDetail(entry);
    highlightSelected();
    updateTimelineSelection(entry);

    if (scrollToDetail) {
      const detail = $("detail");
      if (detail && typeof detail.scrollIntoView === "function") {
        detail.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    if (focusMap) {
      focusEntryOnMap(entry, false);
    }
  }

  function initDetailActions() {
    const mapLink = $("detail-map-link");
    if (!mapLink) {
      return;
    }
    mapLink.addEventListener("click", () => {
      const entry = state.entries.find((item) => item.id === state.selectedId);
      if (entry) {
        focusEntryOnMap(entry, true);
      }
    });
  }

  function initTimelineActions() {
    const detailLink = $("timeline-detail-link");
    if (!detailLink) {
      return;
    }
    detailLink.addEventListener("click", () => {
      if (state.selectedId) {
        selectEntry(state.selectedId, false, true);
      }
    });
  }

  function applyFilters() {
    const filters = currentFilters();
    updateClearButton(filters);
    state.filtered = filterEntries(state.entries, filters).sort(byYearThenCity);
    const count = state.filtered.length;
    setText("result-count", state.lang === "en" ? `${count} ${count === 1 ? "stop" : "stops"}` : `${count} 处足迹`);
    renderMarkers(state.filtered);
    renderTimeline(state.filtered);
    const stillVisible = state.filtered.some((entry) => entry.id === state.selectedId);
    const nextEntry = stillVisible ? state.filtered.find((entry) => entry.id === state.selectedId) : state.filtered[0];
    state.selectedId = nextEntry ? nextEntry.id : null;
    renderDetail(nextEntry);
    highlightSelected();
    updateTimelineSelection(nextEntry);
  }

  async function init() {
    try {
      initLang();
      initTheme();
      const [entries, overlay] = await Promise.all([loadEntries(), loadEnglishOverlay()]);
      state.entries = entries.sort(byYearThenCity);
      state.enById = new Map((overlay || []).map((item) => [item.id, item]));
      initFilters(state.entries);
      initMap();
      initDetailActions();
      initTimelineActions();
      renderCollections(state.entries);
      renderSources(state.entries);
      applyFilters();
    } catch (error) {
      console.error(error);
      setText("result-count", t("error.noData"));
      setText("detail-work", t("error.loadFailWork"));
      setText("detail-meta", t("error.loadFailMeta"));
      setText("detail-context", t("error.loadFailContext"));
      setText("detail-meaning", t("error.loadFailMeaning"));
      $("map-warning").hidden = false;
    }
  }

  window.MozartJourney = {
    filterEntries,
    getFilterOptions,
    getEntryCoordinates,
    getAge,
    formatAge,
    getCollectionGroups,
    getEntryCollections,
    applyTheme,
    getInitialTheme,
    toggleTheme,
    applyLang,
    getInitialLang,
    toggleLang,
    t,
    loadEntries,
    parsePeriod,
  };

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
