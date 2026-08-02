/* ==========================================================
   Y-CARD — config.js
   هذا هو الملف الوحيد الذي تحتاج تعديله لإنشاء بطاقة شخص جديد.
   الصيغة JSON صرفة عمدًا (بدون تعليقات JS داخل الكائن، بدون فواصل
   زائدة) حتى يقرأها كل من المتصفح (render.js) وسكربت بايثون
   (tools/generate_vcard.py) بنفس الملف دون ازدواجية.

   بعد التعديل، لا تحتاج لمس أي ملف HTML/CSS/JS آخر إطلاقًا.

   ⚠️ هذا الملف فاضٍ عمدًا (بيانات وهمية بالكامل) — هذا المستودع
   قالب/محرّك فقط، وليس بطاقة عميل فعلية. لا تنشر هذا الملف كما هو.
   ========================================================== */
window.CARD_CONFIG = {
  "siteName": "اسم العميل",
  "theme": {
    "primary": "#3B82F6",
    "mode": "dark",
    "cardFrame": "none",
    "background": {
      "type": "solid",
      "dim": 0.55
    },
    "motionEffect": {
      "type": "aurora",
      "intensity": "medium"
    }
  },
  "phone": "+966500000000",
  "email": "name@example.com",
  "socials": {
    "whatsapp": "",
    "facebook": "",
    "instagram": "",
    "tiktok": "",
    "snapchat": "",
    "linkedin": ""
  },
  "customLinks": [],
  "vcard": {
    "familyName": "العائلة",
    "givenName": "الاسم",
    "formattedName": "Client Name"
  },
  "ar": {
    "pageTitle": "اسم العميل | Client Name",
    "metaDescription": "اسم العميل - المسمى الوظيفي - بطاقة أعمال رقمية",
    "name": "اسم العميل بالعربي",
    "jobTitle": "المسمى الوظيفي",
    "profileAlt": "الصورة الشخصية لاسم العميل",
    "addToContacts": "إضافة إلى جهات الاتصال",
    "languageSwitchLabel": "English",
    "navAriaLabel": "روابط التواصل",
    "cards": {
      "call": { "title": "اتصال", "desc": "اتصال مباشر" },
      "whatsapp": { "title": "واتساب", "desc": "دردشة فورية" },
      "email": { "title": "البريد الإلكتروني", "desc": "أرسل رسالة عبر البريد" },
      "facebook": { "title": "فيسبوك", "desc": "الملف الشخصي" },
      "instagram": { "title": "انستقرام", "desc": "أحدث المنشورات" },
      "tiktok": { "title": "تيك توك", "desc": "شاهد الفيديوهات" },
      "snapchat": { "title": "سناب شات", "desc": "تابعني على سناب" },
      "linkedin": { "title": "لينكدإن", "desc": "الملف المهني" }
    },
    "copyToastMessage": "تم نسخ البريد الإلكتروني"
  },
  "en": {
    "pageTitle": "Client Name",
    "metaDescription": "Client Name - Job Title - Digital Business Card",
    "name": "Client Name",
    "jobTitle": "Job Title",
    "profileAlt": "Client Name profile photo",
    "addToContacts": "Add to Contacts",
    "languageSwitchLabel": "العربية",
    "navAriaLabel": "Contact and social links",
    "cards": {
      "call": { "title": "Call", "desc": "Direct call" },
      "whatsapp": { "title": "WhatsApp", "desc": "Chat instantly" },
      "email": { "title": "Email", "desc": "Send me a message" },
      "facebook": { "title": "Facebook", "desc": "Personal Profile" },
      "instagram": { "title": "Instagram", "desc": "Latest Posts" },
      "tiktok": { "title": "TikTok", "desc": "Watch my videos" },
      "snapchat": { "title": "Snapchat", "desc": "Add me on Snap" },
      "linkedin": { "title": "LinkedIn", "desc": "Professional Profile" }
    },
    "copyToastMessage": "Email address copied"
  }
};
