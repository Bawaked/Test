/* ==========================================================
   Y-CARD — render.js
   يقرأ window.CARD_CONFIG (من config.js) ويملأ الصفحة بالكامل:
   النصوص، الروابط، ولون الهوية (مع حساب تلقائي لدرجة أغمق تضمن
   تباينًا كافيًا لنص أبيض فوق زر Primary — معيار WCAG AA 4.5:1).

   يجب تحميل هذا الملف (وconfig.js قبله) قبل ripple.js/main.js
   حتى تكون كل العناصر جاهزة بمحتواها الصحيح قبل أي حركة تفاعلية.
   ========================================================== */

/* ---------- أدوات حساب تباين الألوان (WCAG) ---------- */
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]) {
  const toHex = (c) => Math.max(0, Math.min(255, Math.round(c)))
    .toString(16)
    .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function relativeLuminance([r, g, b]) {
  const linearize = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [lr, lg, lb] = [linearize(r), linearize(g), linearize(b)];
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrastRatio(rgb1, rgb2) {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/* يُغمّق اللون تدريجيًا حتى يحقق تباينًا 4.5:1 مع الأبيض
   (نفس الفحص الذي طُبِّق يدويًا على اللون الأزرق الأصلي، لكن
   معمَّم الآن ليعمل تلقائيًا لأي لون يُختار لأي شخص) */
function deriveAccessibleShade(hex, targetContrast = 4.5) {
  const white = [255, 255, 255];
  const original = hexToRgb(hex);
  let factor = 1;

  let current = original;
  while (contrastRatio(white, current) < targetContrast && factor > 0.25) {
    factor -= 0.04;
    current = original.map((c) => c * factor);
  }

  return rgbToHex(current);
}

/* ---------- اشتقاق درجات متناسقة (نفس اللون، إضاءة مختلفة) ----------
   تُستخدم لتوليد نسخة أفتح ونسخة أغمق من نفس لون الهوية بالضبط
   (نفس Hue)، بدل ألوان عشوائية غير مرتبطة، حتى تبدو كل المؤثرات
   والأزرار وحلقة الصورة متناسقة معًا كعائلة لونية واحدة. */
function hexToHsl(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function derivePrimaryVariants(hex) {
  const [h, s, l] = hexToHsl(hex);
  const tint = hslToRgb(h, Math.max(s - 6, 0), Math.min(l + 20, 88));
  const shade = hslToRgb(h, Math.min(s + 6, 100), Math.max(l - 16, 10));
  return { tint, shade };
}

/* ---------- نظاما الألوان الكاملان (داكن/فاتح) ---------- */
const CARD_PALETTES = {
  dark: {
    bg: '#09090B',
    card: '#18181B',
    cardHover: '#1F1F23',
    text: '#FAFAFA',
    textSecondary: '#A1A1AA',
    border: 'rgba(255, 255, 255, 0.08)',
    borderStrong: 'rgba(255, 255, 255, 0.14)',
  },
  light: {
    bg: '#FAF7F0',
    card: '#FFFFFF',
    cardHover: '#F3EEE2',
    text: '#1C1917',
    textSecondary: '#6B6459',
    border: 'rgba(28, 25, 23, 0.08)',
    borderStrong: 'rgba(28, 25, 23, 0.16)',
  },
};

/* ---------- طبقات الخلفية الإضافية ---------- */
const BG_PATTERN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1.4' fill='currentColor'/%3E%3C/svg%3E";

const BG_TEXTURE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

function applyBackgroundLayers(config, palette) {
  const imageLayer = document.querySelector('.bg-image-layer');
  const gradientLayer = document.querySelector('.bg-gradient-layer');
  const patternLayer = document.querySelector('.bg-pattern-layer');
  const textureLayer = document.querySelector('.bg-texture-layer');

  [imageLayer, gradientLayer, patternLayer, textureLayer]
    .filter(Boolean)
    .forEach((el) => el.classList.remove('is-active'));

  const bg = (config.theme && config.theme.background) || {};
  const type = bg.type || 'solid';

  if (type === 'gradient' && gradientLayer) {
    gradientLayer.style.background =
      'linear-gradient(160deg, var(--color-bg) 0%, rgba(var(--color-primary-rgb), 0.18) 55%, var(--color-bg) 100%)';
    gradientLayer.classList.add('is-active');
  } else if (type === 'pattern' && patternLayer) {
    patternLayer.style.backgroundImage = `url("${BG_PATTERN_SVG}")`;
    patternLayer.classList.add('is-active');
  } else if (type === 'texture' && textureLayer) {
    textureLayer.style.backgroundImage = `url("${BG_TEXTURE_SVG}")`;
    textureLayer.classList.add('is-active');
  } else if (type === 'image' && imageLayer) {
    const dim = typeof bg.dim === 'number' ? bg.dim : 0.55;
    const [r, g, b] = hexToRgb(palette.bg);
    imageLayer.style.backgroundImage =
      `linear-gradient(rgba(${r}, ${g}, ${b}, ${dim}), rgba(${r}, ${g}, ${b}, ${dim})), url('images/background.jpg')`;
    imageLayer.classList.add('is-active');
  }
  // type === 'solid' (الافتراضي): لا طبقة إضافية، فقط --color-bg الصلب
}

/* ==========================================================
   نظام المؤثرات الحركية (13 خيارًا) — motion-fx-layer / card-fx-front
   ========================================================== */

function buildAuroraFx(layer) {
  layer.innerHTML =
    '<span class="aurora-blob aurora-blob--1"></span>' +
    '<span class="aurora-blob aurora-blob--2"></span>' +
    '<span class="aurora-blob aurora-blob--3"></span>';
}

function buildParticlesFx(layer) {
  let html = '';
  for (let i = 0; i < 18; i++) {
    const left = (Math.random() * 100).toFixed(1);
    const size = (2 + Math.random() * 3).toFixed(1);
    const duration = (14 + Math.random() * 12).toFixed(1);
    const delay = (-Math.random() * duration).toFixed(1);
    const drift = (Math.random() * 40 - 20).toFixed(0);
    html += `<span class="fx-particle" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;--drift:${drift}px;"></span>`;
  }
  layer.innerHTML = html;
}

function buildTwinkleFx(layer) {
  let html = '';
  for (let i = 0; i < 24; i++) {
    const top = (Math.random() * 100).toFixed(1);
    const left = (Math.random() * 100).toFixed(1);
    const size = (2 + Math.random() * 2.5).toFixed(1);
    const duration = (2 + Math.random() * 3).toFixed(1);
    const delay = (-Math.random() * duration).toFixed(1);
    html += `<span class="fx-twinkle-dot" style="top:${top}%;left:${left}%;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;"></span>`;
  }
  layer.innerHTML = html;
}

function buildRippleFx(layer) {
  layer.innerHTML =
    '<span class="fx-ripple-ring" style="animation-delay:0s;"></span>' +
    '<span class="fx-ripple-ring" style="animation-delay:2s;"></span>' +
    '<span class="fx-ripple-ring" style="animation-delay:4s;"></span>';
}

function buildMeshFx(layer) {
  const blobs = [
    { rgb: 'var(--color-primary-rgb)', size: 50, top: 8, left: 8, duration: 42 },
    { rgb: 'var(--color-primary-shade-rgb)', size: 58, top: 55, left: 60, duration: 52 },
    { rgb: 'var(--color-primary-tint-rgb)', size: 46, top: 32, left: 50, duration: 46 },
    { rgb: 'var(--color-primary-shade-rgb)', size: 40, top: 62, left: 12, duration: 60 },
  ];
  let html = '';
  blobs.forEach((b) => {
    html += `<span class="fx-mesh-blob" style="width:${b.size}vmax;height:${b.size}vmax;top:${b.top}%;left:${b.left}%;background:radial-gradient(circle, rgba(${b.rgb}, 0.28), transparent 70%);animation-duration:${b.duration}s;"></span>`;
  });
  layer.innerHTML = html;
}

function applyMotionEffect(config) {
  const layer = document.getElementById('motionFxLayer');
  const frontLayer = document.getElementById('cardFxFront');
  const conicRing = document.getElementById('profileConicRing');
  const conicRingCard = document.getElementById('cardConicRing');

  if (layer) layer.innerHTML = '';
  if (frontLayer) frontLayer.innerHTML = '';
  if (conicRing) conicRing.classList.remove('is-active');
  if (conicRingCard) conicRingCard.classList.remove('is-active');

  // توافق خلفي: إعدادات قديمة كانت تستخدم theme.aurora بدل theme.motionEffect
  let fx = config.theme && config.theme.motionEffect;
  if (!fx && config.theme && config.theme.aurora) {
    fx = { type: 'aurora', intensity: config.theme.aurora.intensity };
  }
  const type = (fx && fx.type) || 'aurora';
  const intensity = (fx && fx.intensity) || 'medium';

  if (layer) layer.setAttribute('data-intensity', intensity);

  if (type === 'none') return;

  if (layer) {
    switch (type) {
      case 'aurora': buildAuroraFx(layer); break;
      case 'particles': buildParticlesFx(layer); break;
      case 'twinkle': buildTwinkleFx(layer); break;
      case 'rippleRings': buildRippleFx(layer); break;
      case 'meshGradient': buildMeshFx(layer); break;
      case 'pulseGrid':
        layer.innerHTML = `<span class="fx-pulse-grid" style="background-image:url('${BG_PATTERN_SVG}')"></span>`;
        break;
      case 'liquidWaves':
        layer.innerHTML = '<span class="fx-liquid-blob"></span>';
        break;
      case 'gradientFlow':
        layer.innerHTML = '<span class="fx-gradient-flow"></span>';
        break;
      case 'lightRays':
        layer.innerHTML = '<span class="fx-light-rays"></span>';
        break;
      case 'frostedGlass':
        layer.innerHTML = '<span class="fx-frosted-pane"></span>';
        break;
      default: break; // shimmer / conicBorder تُعالَجان في طبقات أخرى بالأسفل
    }
  }

  if (type === 'shimmer' && frontLayer) {
    frontLayer.innerHTML = '<span class="fx-shimmer-sweep"></span>';
  }

  if (type === 'conicBorder') {
    const isBoxed = config.theme && config.theme.cardFrame === 'boxed';
    if (isBoxed && conicRingCard) {
      conicRingCard.classList.add('is-active');
    } else if (conicRing) {
      conicRing.classList.add('is-active');
    }
  }
}

function applyCardFrame(config) {
  const card = document.querySelector('.card');
  if (!card) return;
  const isBoxed = config.theme && config.theme.cardFrame === 'boxed';
  card.classList.toggle('is-boxed', isBoxed);
}

/* ---------- تعبئة الصفحة من الإعدادات ---------- */
function renderCard() {
  const config = window.CARD_CONFIG;
  if (!config) return;

  // عنوان أساسي عام (يعمل حتى على index.html التي لا تملك محتوى لغة محدد)
  if (config.siteName) document.title = config.siteName;

  const lang = document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
  const t = config[lang];
  if (!t) return; // index.html: نكتفي بالعنوان العام فقط، لا محتوى بطاقة هنا

  // العنوان والوصف
  document.title = t.pageTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t.metaDescription);

  // الاسم، المسمى، الصورة
  const nameEl = document.querySelector('.name');
  if (nameEl) nameEl.textContent = t.name;

  const jobTitleEl = document.querySelector('.job-title');
  if (jobTitleEl) jobTitleEl.textContent = t.jobTitle;

  const profileImg = document.querySelector('.profile-image');
  if (profileImg) profileImg.setAttribute('alt', t.profileAlt);

  // زر Add to Contacts
  const addToContactsText = document.querySelector('.btn--add-contact span');
  if (addToContactsText) addToContactsText.textContent = t.addToContacts;

  // زر تبديل اللغة (الرابط ثابت ar.html/en.html، فقط النص يتغيّر)
  const langBtn = document.querySelector('.lang-btn');
  if (langBtn) langBtn.textContent = t.languageSwitchLabel;

  // nav aria-label
  const nav = document.querySelector('.contact-cards');
  if (nav) nav.setAttribute('aria-label', t.navAriaLabel);

  // بطاقات التواصل: كل بطاقة تحمل data-card يطابق مفتاحًا في config
  // إن لم تتوفر بيانات لوسيلة تواصل معينة (رقم/بريد/رابط فارغ)، تُحذف
  // بطاقتها بالكامل من الصفحة بدل تركها بدون رابط فعّال.
  document.querySelectorAll('[data-card]').forEach((card) => {
    const key = card.getAttribute('data-card');
    const cardText = t.cards[key];
    if (!cardText) return;

    if (key === 'call') {
      if (!config.phone) { card.remove(); return; }
      card.setAttribute('href', `tel:${config.phone}`);
    } else if (key === 'email') {
      if (!config.email) { card.remove(); return; }
      card.setAttribute('href', `mailto:${config.email}`);
      card.setAttribute('data-email', config.email);
    } else if (config.socials && config.socials[key]) {
      card.setAttribute('href', config.socials[key]);
    } else {
      card.remove();
      return;
    }

    const titleEl = card.querySelector('.contact-card__title');
    const descEl = card.querySelector('.contact-card__desc');
    if (titleEl) titleEl.textContent = cardText.title;
    if (descEl) descEl.textContent = cardText.desc;
  });

  // روابط تواصل مخصصة (منصات غير موجودة أصلاً في القالب): تُضاف ديناميكيًا
  // كل عنصر في config.customLinks = { title, desc, url }
  if (Array.isArray(config.customLinks)) {
    const nav = document.querySelector('.contact-cards');
    if (nav) {
      config.customLinks.forEach((link, index) => {
        if (!link || !link.url || !link.title) return;

        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'contact-card contact-card--custom';
        a.setAttribute('data-card', `custom-${index}`);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');

        a.innerHTML = `
          <img src="icons/link.svg" alt="" class="contact-card__icon" aria-hidden="true">
          <span class="contact-card__text">
            <span class="contact-card__title"></span>
            <span class="contact-card__desc"></span>
          </span>
          <span class="contact-card__arrow" aria-hidden="true">&larr;</span>
        `;

        a.querySelector('.contact-card__title').textContent = link.title;
        a.querySelector('.contact-card__desc').textContent = link.desc || '';

        nav.appendChild(a);
      });
    }
  }

  // رسالة تأكيد نسخ البريد (تُقرأ لاحقًا من main.js)
  window.CARD_COPY_TOAST_MESSAGE = t.copyToastMessage;

  // تطبيق نظام الألوان الكامل (داكن/فاتح) — الوضع الافتراضي "داكن" إن لم
  // يُحدَّد في config.js (توافقًا مع البطاقات القديمة قبل إضافة هذه الميزة)
  const mode = (config.theme && config.theme.mode === 'light') ? 'light' : 'dark';
  const palette = CARD_PALETTES[mode];
  const root = document.documentElement.style;
  root.setProperty('--color-bg', palette.bg);
  root.setProperty('--color-card', palette.card);
  root.setProperty('--color-card-hover', palette.cardHover);
  root.setProperty('--color-text', palette.text);
  root.setProperty('--color-text-secondary', palette.textSecondary);
  root.setProperty('--color-border', palette.border);
  root.setProperty('--color-border-strong', palette.borderStrong);

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) themeColorMeta.setAttribute('content', palette.bg);

  applyBackgroundLayers(config, palette);
  applyCardFrame(config);
  applyMotionEffect(config);

  // تطبيق لون الهوية + اشتقاق الدرجة الغامقة تلقائيًا لضمان وضوح النص
  if (config.theme && config.theme.primary) {
    const primary = config.theme.primary;
    const pressed = deriveAccessibleShade(primary);
    document.documentElement.style.setProperty('--color-primary', primary);
    document.documentElement.style.setProperty('--color-primary-pressed', pressed);
    // نُصدّر مكوّنات R,G,B خام (بدون rgba()) حتى تقدر ملفات CSS تستخدم
    // rgba(var(--color-primary-rgb), X) بأي درجة شفافية تحتاجها — بهذا
    // ينتشر لون الهوية فعليًا على كل عناصر البطاقة (الحلقة حول الصورة،
    // توهج الخلفية، حدود التمرير...) وليس فقط زر Add to Contacts.
    document.documentElement.style.setProperty('--color-primary-rgb', hexToRgb(primary).join(', '));

    // درجتان متناسقتان (نفس اللون، إضاءة مختلفة) تُستخدمان بدل الألوان
    // العشوائية بمؤثرات مثل Aurora وشبكة التدرّج الفاخرة وتأثير الضغط،
    // حتى تبقى كل عناصر الصفحة بنفس عائلة اللون المختار تمامًا.
    const variants = derivePrimaryVariants(primary);
    document.documentElement.style.setProperty('--color-primary-tint-rgb', variants.tint.join(', '));
    document.documentElement.style.setProperty('--color-primary-shade-rgb', variants.shade.join(', '));
  }
}

renderCard();
