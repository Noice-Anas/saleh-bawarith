/* ============================================================
   Salih Bawarith — Portfolio data
   Single source of truth. Edit here to update the whole site.
   Dates are "YYYY-MM". end:null + present:true = ongoing role.
   ============================================================ */

window.APP_DATA = {
  person: {
    name_en: "Salih Bawarith",
    name_ar: "صالح باوارث",
    suffix: "OPMP",
    opmp_en: "Operations &amp; Performance Management",
    opmp_ar: "إدارة العمليات والأداء",
    headline_en: "Senior F&amp;B Operations Manager · Specialty Coffee Expert · Licensed Arabic Calligrapher",
    location_en: "Riyadh, Saudi Arabia",
    location_ar: "الرياض، المملكة العربية السعودية",
    linkedin: "https://www.linkedin.com/in/saleh-bawarith/"
  },

  // Career range used to position everything on the timeline axis.
  timeline: { startYear: 2009, endYear: 2027 },

  stats: [
    { value: "7+",  en: "Years in F&amp;B Management",      ar: "سنوات في إدارة الأغذية والمشروبات" },
    { value: "12+", en: "Years in Event Management",     ar: "سنة في إدارة الفعاليات" },
    { value: "8+",  en: "Brands Managed at Once",         ar: "علامات تجارية أُديرت معاً" },
    { value: "60+", en: "Art &amp; Calligraphy Events",      ar: "فعالية فنية وخطّية" },
    { value: "3",   en: "International Exhibitions",       ar: "معارض دولية" },
    { value: "17",  en: "Years as a Practicing Artist",   ar: "عاماً كفنان ممارس" }
  ],

  // Cleared for public use, NO brand attribution (per client instruction).
  achievements: [
    { metric: "250K → 610K", unit: "SAR", en: "Revenue grown in two months",  ar: "نمو الإيرادات خلال شهرين" },
    { metric: "35%",         unit: "",    en: "Production costs reduced",       ar: "خفض تكاليف الإنتاج" },
    { metric: "15",          unit: "",    en: "New product lines launched",     ar: "خطوط إنتاج جديدة أُطلقت" }
  ],

  tracks: [
    { id: "ops",     en: "Operations & Leadership", ar: "العمليات والقيادة", var: "--espresso" },
    { id: "coffee",  en: "Coffee & Roasting",       ar: "القهوة والتحميص",   var: "--copper" },
    { id: "founder", en: "Founder & Ownership",     ar: "التأسيس والملكية",  var: "--brass" },
    { id: "art",     en: "Art & Calligraphy",       ar: "الفن والخط",        var: "--ink-blue" }
  ],

  roles: [
    {
      id: "monarch", track: "art", start: "2009-03", end: null, present: true, anchor: true,
      title_en: "Artist Freelancer", title_ar: "فنان مستقل", org: "Monarch.s",
      type_en: "Freelance", type_ar: "عمل حر", loc: "Jeddah · Makkah",
      desc_en: "The 17-year creative spine of his career — logo design, Arabic calligraphy & graffiti, paintings, wedding designs, handwriting analysis. 60+ local events, 3 international exhibitions.",
      desc_ar: "العمود الفقري الإبداعي لمسيرته عبر ١٧ عاماً — تصميم الشعارات، الخط العربي والجرافيتي، اللوحات، تصاميم الأعراس، وتحليل الخط. أكثر من ٦٠ فعالية محلية و٣ معارض دولية.",
      tags: ["Arabic Calligraphy", "Logo Design", "Handwriting Analysis", "3D Design", "Painting"]
    },
    {
      id: "senior-ops", track: "ops", start: "2022-08", end: null, present: true,
      title_en: "Senior Manager, Business Operations", title_ar: "مدير أول للعمليات",
      org: "Multi-Brand Consulting", type_en: "Freelance", type_ar: "عمل حر", loc: "Riyadh",
      desc_en: "Multi-brand F&B consulting — quality audits, seasonal beverage development, weekly cupping, SWOT analysis and campaign management across several Riyadh cafés.",
      desc_ar: "استشارات متعددة العلامات في الأغذية والمشروبات — تدقيق الجودة، تطوير مشروبات موسمية، جلسات تذوّق أسبوعية، وتحليل SWOT وإدارة الحملات لعدة مقاهٍ في الرياض.",
      clients: ["INCA Cafe", "Liich Cafe", "Yucca Palm", "Bunatetusa"],
      tags: ["Sensory Evaluation", "F&B Auditing", "Creative Problem Solving", "Marketing"]
    },
    {
      id: "leading-heights", track: "ops", start: "2024-10", end: "2025-09", present: false,
      title_en: "Operations Manager", title_ar: "مدير العمليات", org: "The Leading Heights Est.",
      type_en: "Full-time", type_ar: "دوام كامل", loc: "Riyadh",
      desc_en: "Ran coffee branches and directed VVIP catering & event logistics at national scale. Staff management, purchasing and inventory.",
      desc_ar: "أدار فروع القهوة وقاد لوجستيات الضيافة والفعاليات لكبار الشخصيات على نطاق وطني. إدارة الفرق والمشتريات والمخزون.",
      highlights: ["PIF Summer Event 2025", "Retal Real Estate", "Alreem Compound NYE"],
      tags: ["Quality Control", "HR Training", "Event Logistics"]
    },
    {
      id: "nozwa", track: "founder", start: "2025-02", end: null, present: true,
      title_en: "Founder & Business Owner", title_ar: "المؤسس والمالك", org: "Nozwa Roastery",
      type_en: "Founder", type_ar: "مؤسس", loc: "Riyadh",
      desc_en: "His own specialty coffee roastery venture.",
      desc_ar: "مشروعه الخاص لتحميص القهوة المختصة.",
      tags: ["Coffee Roasting", "Brand Building", "Entrepreneurship"]
    },
    {
      id: "turjaman", track: "coffee", start: "2025-09", end: "2025-12", present: false,
      title_en: "Executive Coffee Roaster", title_ar: "محمّص قهوة تنفيذي", org: "Turjaman Coffee",
      type_en: "Part-time", type_ar: "دوام جزئي", loc: "Riyadh",
      desc_en: "Selected single-origin crops, matched roast profiles to each origin, and mass-produced large batches. Managed supplier shipments.",
      desc_ar: "اختيار محاصيل أحادية المنشأ، ومطابقة منحنيات التحميص لكل منشأ، وإنتاج دفعات كبيرة. إدارة شحنات المورّدين.",
      tags: ["Coffee Roasting", "Single-Origin Sourcing", "Sampling", "CRM"]
    },
    {
      id: "bourbon", track: "coffee", start: "2025-12", end: "2026-03", present: false,
      title_en: "Operations Manager", title_ar: "مدير العمليات", org: "Bourbon Roastery",
      type_en: "Full-time", type_ar: "دوام كامل", loc: "Riyadh",
      desc_en: "B2B & B2C sales, profile roasting, R&D, menu engineering, recruitment, training and marketing.",
      desc_ar: "مبيعات B2B وB2C، تحميص وفق منحنيات محددة، بحث وتطوير، هندسة القوائم، توظيف وتدريب وتسويق.",
      tags: ["Budget Management", "Barista Training", "Menu Engineering", "R&D"]
    },
    {
      id: "confidential-calligraphy", track: "art", start: "2025-10", end: "2025-10", present: false,
      title_en: "Calligrapher", title_ar: "خطّاط", org: "Coffee National Day",
      type_en: "Event", type_ar: "فعالية", loc: "Riyadh",
      desc_en: "Live cup-calligraphy — writing staff names on coffee cups for Coffee National Day.",
      desc_ar: "خط مباشر على الأكواب — كتابة أسماء الطاقم على أكواب القهوة في اليوم الوطني للقهوة.",
      tags: ["Arabic Calligraphy"]
    },
    {
      id: "local-coffee", track: "art", start: "2025-09", end: "2025-09", present: false,
      title_en: "Calligrapher", title_ar: "خطّاط", org: "Local Coffee (قهوة لوكال)",
      type_en: "Event", type_ar: "فعالية", loc: "Riyadh",
      desc_en: "National Day live calligraphy activation.",
      desc_ar: "فعالية خط مباشر في اليوم الوطني.",
      tags: ["Arabic Calligraphy"]
    },
    {
      id: "cubd", track: "founder", start: "2026-01", end: null, present: true,
      title_en: "Co-Owner & Operations", title_ar: "شريك مالك والعمليات", org: "Cubd.sa",
      type_en: "Co-Owner", type_ar: "شريك مالك", loc: "Riyadh",
      desc_en: "Specialty pastry-cubes brand founded in Riyadh.",
      desc_ar: "علامة متخصصة في مكعبات المعجّنات تأسست في الرياض.",
      tags: ["Business Analysis", "Business Management"]
    },
    {
      id: "namozaj", track: "ops", start: "2026-02", end: null, present: true,
      title_en: "Operations Manager", title_ar: "مدير العمليات", org: "Namozaj Hawamesh Co.",
      type_en: "Full-time", type_ar: "دوام كامل", loc: "Riyadh",
      desc_en: "Product-design innovation, cross-discipline SOPs (marketing, branding, app dev, 3D printing, investor relations), business strategy and entrepreneurship development.",
      desc_ar: "ابتكار تصاميم المنتجات، وإجراءات تشغيل معيارية عبر التخصصات (تسويق، هوية، تطوير تطبيقات، طباعة ثلاثية الأبعاد، علاقات المستثمرين)، واستراتيجية الأعمال وتطوير ريادة الأعمال.",
      tags: ["Operations Management", "Crisis Management", "Business Strategy", "SOP Design"]
    }
  ],

  // Cross-cultural narrative thread. Unconfirmed → shown as story, never dated on timeline.
  origins: [
    { id: "saudi", en: "Saudi", ar: "سعودي", altitude_en: "Home ground", altitude_ar: "الأرض الأم",
      process_en: "Riyadh · Jeddah · Makkah", process_ar: "الرياض · جدة · مكة",
      notes_en: "Hospitality, calligraphy heritage, the specialty-coffee scene.",
      notes_ar: "الضيافة، وإرث الخط، ومشهد القهوة المختصة." },
    { id: "american", en: "American", ar: "أمريكي", altitude_en: "Second root", altitude_ar: "الجذر الثاني",
      process_en: "Cross-cultural fluency", process_ar: "طلاقة بين الثقافات",
      notes_en: "An operator's pragmatism and an entrepreneur's appetite for building.",
      notes_ar: "براغماتية المشغّل وشغف رائد الأعمال بالبناء." },
    { id: "japanese", en: "Japanese", ar: "ياباني", altitude_en: "Family thread", altitude_ar: "خيط العائلة",
      process_en: "Craft & precision", process_ar: "الحِرفة والدقة",
      notes_en: "A quiet discipline — the reverence for detail behind every roast and every stroke.",
      notes_ar: "انضباط هادئ — تقدير التفاصيل خلف كل تحميصة وكل ضربة قلم." }
  ],

  skillGroups: [
    { en: "Operations & Growth", ar: "العمليات والنمو",
      skills: ["Operations Management", "SOP Design", "Budget & Inventory", "Business Strategy", "Crisis Management", "P&L / Revenue Growth"] },
    { en: "Specialty Coffee", ar: "القهوة المختصة",
      skills: ["Coffee Roasting", "Single-Origin Sourcing", "Cupping & Sensory Evaluation", "Menu Engineering", "Barista Training"] },
    { en: "Events & Hospitality", ar: "الفعاليات والضيافة",
      skills: ["VVIP Event Logistics", "Catering", "Customer Experience", "Team Building"] },
    { en: "Creative & Craft", ar: "الإبداع والحِرفة",
      skills: ["Arabic Calligraphy (licensed)", "Logo & Brand Design", "Handwriting Analysis", "3D Design"] }
  ],

  credentials: [
    { en: "Craftsman License — Arabic Calligraphy", ar: "رخصة حِرفي — الخط العربي",
      issuer_en: "Heritage Commission", issuer_ar: "هيئة التراث", date: "Feb 2023", star: true },
    { en: "Barista Preparation Training", ar: "تدريب إعداد الباريستا",
      issuer_en: "Subul Innovative Development", issuer_ar: "سُبل الابتكارية", date: "Jan 2021" },
    { en: "Attracting Investors to Your Startup", ar: "جذب المستثمرين لمشروعك",
      issuer_en: "Doroob", issuer_ar: "دروب", date: "May 2025" },
    { en: "Intellectual Property Rights", ar: "حقوق الملكية الفكرية",
      issuer_en: "National Entrepreneurship Institute", issuer_ar: "معهد ريادة الأعمال الوطني", date: "Aug 2022" },
    { en: "Professional in Maintaining Customers", ar: "الاحتراف في الحفاظ على العملاء",
      issuer_en: "Doroob", issuer_ar: "دروب", date: "May 2025" },
    { en: "Quality & Safety for Recreational Events", ar: "الجودة والسلامة للفعاليات الترفيهية",
      issuer_en: "Doroob", issuer_ar: "دروب", date: "Feb 2021" }
  ],

  education: {
    school_en: "Yanbu Industrial College", school_ar: "الكلية الصناعية بينبع",
    degree_en: "Associate's — Manufacturing Engineering Technology",
    degree_ar: "دبلوم — تقنية هندسة التصنيع", years: "2010 – 2015"
  }
};
