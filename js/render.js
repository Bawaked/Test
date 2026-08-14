const SOCIAL_ICONS = {
  call: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.7 3.8 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1L6.6 10.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  },
  email: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  website: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" stroke="currentColor" stroke-width="1.4"/></svg>',
  },
  whatsapp: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.2 14.2c-.22.62-1.28 1.2-1.77 1.24-.45.05-1.02.07-1.65-.1-.38-.11-.87-.28-1.5-.55-2.63-1.14-4.35-3.8-4.48-3.98-.13-.18-1.07-1.42-1.07-2.71s.68-1.92.92-2.18c.24-.26.53-.32.7-.32h.5c.16 0 .38-.06.6.45.22.53.75 1.82.82 1.95.07.13.11.29.02.47-.09.18-.13.29-.26.44-.13.15-.28.34-.4.46-.13.13-.27.27-.12.53.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.16 1.34.26.13.42.11.57-.07.16-.18.66-.77.84-1.03.18-.26.35-.22.58-.13.24.09 1.5.71 1.76.84.26.13.44.2.5.31.07.11.07.63-.15 1.25Z" stroke="currentColor" stroke-width="0.6" fill="none"/></svg>',
  },
  instagram: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>',
  },
  maps: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="9" r="2.4" stroke="currentColor" stroke-width="1.5"/></svg>',
  },
  linkedin: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><circle cx="7.2" cy="8.2" r="1" fill="currentColor"/><path d="M7.2 11v6M11 11v6M11 13.5c0-1.5 1-2.5 2.3-2.5 1.2 0 1.9.9 1.9 2.5V17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  },
  youtube: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="6" width="19" height="12" rx="4" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  },
  tiktok: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M14.2 3.3v9.9a2.7 2.7 0 1 1-2.3-2.67" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14.2 5.1c.15 1.1.7 2.2 1.6 2.9.8.65 1.8 1 2.9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  },
  facebook: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M13.5 21v-7.2h2.4l.36-2.8h-2.76V9.2c0-.8.22-1.36 1.38-1.36h1.48V5.34C15.9 5.24 15.03 5.16 14 5.16c-2.15 0-3.62 1.31-3.62 3.72v2.12H8v2.8h2.38V21" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" fill="none"/></svg>',
  },
  twitter: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 5.5 11 12l-5.3 6.5h1.9L12.1 13l3.7 5.5H19l-5.2-7.1L18.7 5.5h-1.9l-4 4.9-3.4-4.9H6Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" fill="none"/></svg>',
  },
  snapchat: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5c2.3 0 3.7 1.7 3.7 4v1.7c0 .3.4.6 1 .8.7.3 1.5.2 1.9.1.3-.1.6.2.5.5-.2.6-.8 1-1.4 1.3.2.3.5.4.9.6-.2.5-1 .8-1.7 1 0 .5-.1 1-.6 1.1-.6.2-1.3.1-1.8.4-.5.3-1 1.2-2.5 1.2s-2-.9-2.5-1.2c-.5-.3-1.2-.2-1.8-.4-.5-.1-.6-.6-.6-1.1-.7-.2-1.5-.5-1.7-1 .4-.2.7-.3.9-.6-.6-.3-1.2-.7-1.4-1.3-.1-.3.2-.6.5-.5.4.1 1.2.2 1.9-.1.6-.2 1-.5 1-.8V7.5c0-2.3 1.4-4 3.7-4Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  },
  telegram: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="m7 12.3 9-4-2.6 8.7-2.8-2.2-2 1.9-.2-2.6-1.4-1.8Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  },
  threads: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5c4.5 0 6.8 3 6.8 8.5s-2.3 8.5-6.8 8.5-6.8-3-6.8-8.5m9.6-2.7c-.4-.6-1.1-1-2.1-1-1.7 0-2.9 1.2-2.9 2.6 0 1.3 1 2 2.4 2.3 1.9.4 3.3 1 3.3 2.7 0 1.7-1.5 2.8-3.5 2.8-1.5 0-2.6-.6-3.1-1.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  },
  pinterest: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 18c.5-1.5 1.6-6 1.6-6m0 0c-.4-.7-.5-2.4.4-3.3.9-.9 2.5-.4 2.6 1 .1 1-.6 2.6-1 3.6-.3 1 .3 1.9 1.3 1.9 1.7 0 2.9-2.1 2.9-4.2 0-1.9-1.4-3.6-3.9-3.6-2.8 0-4.5 2-4.5 4.2 0 .8.3 1.4.7 1.9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  behance: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 7h5.2c1.9 0 3 .9 3 2.5 0 1.1-.6 1.8-1.5 2.1 1.2.3 2 1.2 2 2.6 0 1.8-1.4 2.8-3.4 2.8H3V7Zm2 3.7h2.7c.9 0 1.5-.4 1.5-1.2s-.6-1.2-1.5-1.2H5v2.4Zm0 4.9h2.9c1 0 1.7-.5 1.7-1.4s-.7-1.4-1.7-1.4H5v2.8Z" stroke="currentColor" stroke-width="0.5" fill="none"/><path d="M14 8.5h5M13.3 14c0-2.3 1.5-3.8 3.6-3.8 2.3 0 3.6 1.7 3.4 4.2h-5c.1 1.2.9 1.9 2 1.9.8 0 1.4-.3 1.7-.9h1.2c-.4 1.3-1.6 2.1-3 2.1-2.1 0-3.9-1.4-3.9-3.5Zm1.9-.9h3.1c-.1-1-.7-1.6-1.6-1.6-.8 0-1.4.6-1.5 1.6Z" stroke="currentColor" stroke-width="0.5" fill="none"/></svg>',
  },
  discord: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M8 6.5c2.6-.7 5.4-.7 8 0M7 15.3c-2-.8-3-1.9-3-1.9.3-3.6 1.4-6.4 3-7.4M17 15.3c2-.8 3-1.9 3-1.9-.3-3.6-1.4-6.4-3-7.4M7 15.3c1.5.7 3.2 1.1 5 1.1s3.5-.4 5-1.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><ellipse cx="9.3" cy="12.3" rx="1.1" ry="1.3" fill="currentColor"/><ellipse cx="14.7" cy="12.3" rx="1.1" ry="1.3" fill="currentColor"/></svg>',
  },
  twitch: {
    stroke: 'var(--color-accent-light)',
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 4h15v9.5l-3.5 3.5H13l-2.5 2.5H8V17H5V4Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M13 7.5v4M17 7.5v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  },
};

/* أيقونة عامة احتياطية (رابط) لأي منصة غير موجودة بالمكتبة أعلاه —
   تُستخدم تلقائيًا للروابط المخصصة (custom1, custom2...) */
const GENERIC_LINK_ICON = {
  stroke: 'var(--color-accent-light)',
  svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M9.5 14.5 14.5 9.5M11 8l.7-.7a3 3 0 0 1 4.2 4.2l-.7.7M13 16l-.7.7a3 3 0 0 1-4.2-4.2l.7-.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const CARD_PALETTES = {
  dark: {
    bg: '#17100A',
    text: '#F2E4C6',
    textSecondary: '#B79E74',
    surfaceRgb: '40, 26, 14',
    pillBorder: 'rgba(205, 159, 78, 0.45)',
  },
};

/* كل ثيم يحمل خلفيته الفريدة الخاصة فيه (بدرجتين داكنة وفاتحة) — لو
   config.bgDark / config.bgLight موجودين يُستخدمان بدل الأسود/الكريمي
   العام، عشان يبان فرق حقيقي بالخلفية نفسها بين ثيم وثيم، مو بس بلون
   الأزرار والتوهج. */
function resolveBg(config, mode) {
  if (mode === 'light' && config.bgLight) return config.bgLight;
  if (mode === 'dark' && config.bgDark) return config.bgDark;
  return CARD_PALETTES[mode].bg;
}

function renderConnectCard() {
  const config = window.CARD_CONFIG;
  if (!config) return;

  const lang = document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
  const t = config[lang];
  if (!t) return;

  if (config.accentColor) {
    document.documentElement.style.setProperty('--color-accent', config.accentColor);
  }

  // الوضع الداكن/الفاتح (الافتراضي: داكن، توافقًا مع البطاقات السابقة
  // اللي أُنشئت قبل إضافة هذا الخيار)
  const mode = config.mode === 'light' ? 'light' : 'dark';
  const palette = CARD_PALETTES[mode];
  const bg = resolveBg(config, mode);
  const root = document.documentElement.style;
  root.setProperty('--color-bg', bg);
  root.setProperty('--color-text', palette.text);
  root.setProperty('--color-text-secondary', palette.textSecondary);
  root.setProperty('--color-surface-rgb', palette.surfaceRgb);
  root.setProperty('--color-pill-border', palette.pillBorder);

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) themeColorMeta.setAttribute('content', bg);

  document.title = t.pageTitle || config.siteName || 'Digital Card';

  const el = (id) => document.getElementById(id);

  if (el('firstName')) el('firstName').textContent = t.firstName || '';
  if (el('lastName')) el('lastName').textContent = t.lastName || '';
  if (el('jobTitle')) el('jobTitle').textContent = t.jobTitle || '';
  if (el('langSwitchLabel')) el('langSwitchLabel').textContent = t.languageSwitchLabel || '';

  // أي سطر ياخذ لون البراند (الافتراضي: الأخير)
  const highlight = config.highlightLine === 'first' ? 'first' : 'last';
  const firstEl = el('firstName');
  const lastEl = el('lastName');
  if (firstEl && lastEl) {
    firstEl.classList.toggle('name--accent', highlight === 'first');
    lastEl.classList.toggle('name--accent', highlight === 'last');
  }

  const langLink = el('langSwitchLink');
  if (langLink) langLink.setAttribute('href', lang === 'ar' ? 'en.html' : 'ar.html');

  const avatarImg = document.querySelector('.avatar-wrapper img');
  if (avatarImg) avatarImg.setAttribute('alt', config.siteName || '');

  const list = el('socialList');
  if (list && Array.isArray(config.socials)) {
    list.innerHTML = '';

    // توافق خلفي: ملفات config.js قديمة (قبل ما يصير زر الحفظ عنصرًا
    // بالقائمة) ما فيها مفتاح "saveContact" صراحة — نضيفه تلقائيًا
    // بأول القائمة حتى الزر يستمر يبين بدل ما يختفي فجأة.
    let socials = config.socials;
    const hasSaveContact = socials.some((s) => s && s.key === 'saveContact');
    if (!hasSaveContact && config.vcard) {
      socials = [{ key: 'saveContact' }, ...socials];
    }

    socials.forEach((item) => {
      if (!item || !item.key) return;

      // زر "حفظ جهة الاتصال" — عنصر خاص داخل نفس القائمة، بشكل مختلف
      // (الزر البرتقالي الرئيسي) لكن يخضع لنفس الحذف/الترتيب مثل أي رابط ثاني
      if (item.key === 'saveContact') {
        if (!config.vcard) return;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'btn-save';
        a.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/>
            <path d="M19 8v6M22 11h-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span>${t.saveContactLabel || 'Save Contact'}</span>
        `;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          downloadVCard(config, t);
        });
        li.appendChild(a);
        list.appendChild(li);
        return;
      }

      let href = item.url;
      if (!href && item.key === 'call') href = `tel:${config.phone || ''}`;
      if (!href && item.key === 'email') href = `mailto:${config.email || ''}`;
      if (!href && item.key === 'whatsapp') {
        const digitsOnly = (config.phone || '').replace(/\D/g, '');
        href = digitsOnly ? `https://wa.me/${digitsOnly}` : '';
      }
      if (!href) return;

      const icon = SOCIAL_ICONS[item.key] || GENERIC_LINK_ICON;
      const label = (t.socialLabels && t.socialLabels[item.key]) || item.label || item.key;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'social-pill';
      a.href = href;
      if (item.key !== 'call' && item.key !== 'email') {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = `
        <span class="social-pill__icon" style="border-color:${icon.stroke}">${icon.svg}</span>
        <span class="social-pill__label">${label}</span>
        <svg class="social-pill__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      li.appendChild(a);
      list.appendChild(li);
    });
  }
}

function downloadVCard(config, t) {
  const v = config.vcard || {};
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${v.familyName || ''};${v.givenName || ''};;;`,
    `FN:${v.formattedName || config.siteName || ''}`,
    t.jobTitle ? `TITLE:${t.jobTitle}` : '',
    config.phone ? `TEL;TYPE=CELL:${config.phone}` : '',
    config.email ? `EMAIL:${config.email}` : '',
    'END:VCARD',
  ].filter(Boolean);
  const blob = new Blob([lines.join('\n')], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(config.siteName || 'contact').replace(/\s+/g, '-')}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', renderConnectCard);
