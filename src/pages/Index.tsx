import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const NAV_LINKS = [
  { id: 'hero', label: 'Главная' },
  { id: 'about', label: 'Биография' },
  { id: 'achievements', label: 'Достижения' },
  { id: 'directions', label: 'Деятельность' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'documents', label: 'Документы' },
  { id: 'contact', label: 'Контакты' },
];

const ACHIEVEMENTS = [
  {
    date: '30 октября 2025',
    title: 'Грамота участника шахматной партии «Единства»',
    desc: 'На базе Региональной общественной приёмной Председателя партии «Единая Россия» Д.А. Медведева в Брянской области.',
    icon: 'Trophy',
  },
  {
    date: '12 декабря 2025',
    title: 'Сертификат «Большого правового диктанта»',
    desc: 'Брянской областной Думы ко Дню Конституции Российской Федерации.',
    icon: 'FileText',
  },
  {
    date: '2 апреля 2026',
    title: 'Благодарственное письмо депутата Государственной Думы',
    desc: 'От депутата и председателя Комитета по физической культуре и спорту Олега Васильевича Матыцина за личный вклад в развитие социально значимых проектов Брянской области.',
    icon: 'Award',
  },
];

const DIRECTIONS = [
  { icon: 'Leaf', title: 'Экология', desc: 'Реализация экологических инициатив и проектов в рамках «Юных натуралистов».' },
  { icon: 'Users', title: 'Молодёжная политика', desc: 'Работа с молодёжью и развитие общественных инициатив Брянской области.' },
  { icon: 'Heart', title: 'Волонтёрство', desc: 'Участие в общественно полезных мероприятиях и акциях.' },
  { icon: 'BookOpen', title: 'Гражданское просвещение', desc: 'Популяризация правовых знаний и гражданской ответственности.' },
];

const GALLERY_ITEMS = [
  { id: 1, label: 'Движение Первых', color: '#0f2444', span: true },
  { id: 2, label: 'Молодая Гвардия', color: '#7c1d2d', span: false },
  { id: 3, label: 'Экологические проекты', color: '#2c2f36', span: false },
  { id: 4, label: 'Общественная деятельность', color: '#1a3a6b', span: false },
  { id: 5, label: 'Брянская область', color: '#4a4f5a', span: false },
  { id: 6, label: 'Правовой диктант', color: '#9e2a3f', span: false },
];

const DOCUMENTS = [
  { title: 'Грамота участника шахматной партии «Единства»', date: '30.10.2025', type: 'Грамота', icon: 'Trophy' },
  { title: 'Сертификат «Большого правового диктанта»', date: '12.12.2025', type: 'Сертификат', icon: 'FileText' },
  { title: 'Благодарственное письмо депутата Госдумы О.В. Матыцина', date: '02.04.2026', type: 'Благодарственное письмо', icon: 'Award' },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const Index = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map((l) => l.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-white font-body">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navScrolled ? 'bg-white/96 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={() => handleNav('hero')} className="flex flex-col leading-tight text-left">
              <span className="font-display font-semibold text-base lg:text-lg text-navy">Слюнченко Данила</span>
              <span className="text-xs text-burgundy font-body tracking-widest uppercase">Общественный деятель</span>
            </button>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`nav-link text-sm font-medium tracking-wide transition-colors duration-200 ${activeSection === link.id ? 'text-burgundy active' : 'text-graphite hover:text-navy'}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button className="lg:hidden p-2 text-navy" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 mobile-menu-enter">
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-left py-3 text-base font-medium border-b border-gray-50 transition-colors ${activeSection === link.id ? 'text-burgundy' : 'text-graphite'}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-cream">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #0f2444 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #0f2444 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-burgundy opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-burgundy/30 bg-burgundy/5 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" />
                <span className="text-xs font-medium text-burgundy tracking-widest uppercase font-body">Официальный сайт</span>
              </div>

              <h1
                className="font-display font-bold text-navy leading-[1.05] mb-5 opacity-0 animate-fade-in-up"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', animationDelay: '0.25s', animationFillMode: 'forwards' }}
              >
                Слюнченко<br />
                <span className="text-burgundy">Данила</span><br />
                Александрович
              </h1>

              <p className="text-graphite/60 text-lg font-body tracking-wide mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Общественный деятель&nbsp;•&nbsp;Молодёжный лидер&nbsp;•&nbsp;Активист
              </p>

              <div className="flex flex-wrap gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
                <button onClick={() => handleNav('about')} className="px-7 py-3 bg-navy text-white text-sm font-semibold tracking-wide rounded-sm hover:bg-navy-light transition-colors duration-200">Биография</button>
                <button onClick={() => handleNav('achievements')} className="px-7 py-3 border border-navy text-navy text-sm font-semibold tracking-wide rounded-sm hover:bg-navy hover:text-white transition-colors duration-200">Достижения</button>
                <button onClick={() => handleNav('gallery')} className="px-7 py-3 border border-navy text-navy text-sm font-semibold tracking-wide rounded-sm hover:bg-navy hover:text-white transition-colors duration-200">Галерея</button>
                <button onClick={() => handleNav('contact')} className="px-7 py-3 bg-burgundy text-white text-sm font-semibold tracking-wide rounded-sm hover:bg-burgundy-light transition-colors duration-200">Связаться</button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="relative">
                <div
                  className="w-72 h-80 lg:w-96 lg:h-[480px] rounded-sm overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0f2444 0%, #1a3a6b 50%, #2c2f36 100%)', boxShadow: '24px 24px 64px rgba(15,36,68,0.16)' }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                    <Icon name="User" size={80} />
                    <p className="mt-4 text-xs font-body tracking-widest uppercase">Добавить фото</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-burgundy/30 rounded-sm pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-16 h-16 border border-navy/20 rounded-sm pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs text-navy tracking-widest uppercase font-body">Прокрутить</span>
          <div className="w-px h-8 bg-navy animate-pulse" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-2 reveal">
              <p className="text-xs text-burgundy tracking-widest uppercase font-semibold mb-4 font-body">О личности</p>
              <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl leading-tight mb-6">Биография</h2>
              <div className="w-12 h-0.5 bg-burgundy mb-8" />
              <div className="flex flex-col gap-4">
                {[
                  { icon: 'MapPin', text: 'Брянск, Россия' },
                  { icon: 'Calendar', text: '17 июля 2011 года' },
                  { icon: 'GraduationCap', text: 'МБОУ СОШ №41' },
                  { icon: 'Users', text: 'Движение Первых' },
                  { icon: 'Shield', text: 'Молодая Гвардия Единой России' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-navy/5 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={15} className="text-navy" />
                    </div>
                    <span className="text-graphite text-sm font-body">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="space-y-5 text-graphite leading-relaxed font-body">
                <p>Слюнченко Данила Александрович родился <span className="font-semibold text-navy">17 июля 2011 года</span> в городе Брянске.</p>
                <p>Проходил курс дошкольного образования в Губернаторском дворце имени Юрия Алексеевича Гагарина. В настоящее время обучается в Муниципальном бюджетном общеобразовательном учреждении <span className="font-semibold text-navy">СОШ №41 города Брянска</span>.</p>
                <p>С <span className="font-semibold text-navy">20 февраля 2024 года</span> является <span className="font-semibold text-burgundy">председателем объединения «Юные натуралисты»</span> на базе первичного отделения Движения Первых МБОУ СОШ №41 города Брянска по экологическому направлению. Входит в состав Движения Первых Брянской области.</p>
                <p>С <span className="font-semibold text-navy">9 сентября 2025 года</span> состоит во <span className="font-semibold text-burgundy">Всероссийской общественно-политической организации «Молодая Гвардия Единой России»</span>.</p>
                <div className="mt-8 p-6 bg-cream rounded-sm border-l-4 border-burgundy">
                  <p className="font-display italic text-navy text-xl leading-relaxed">«Молодёжное лидерство — это не просто слова, это ежедневный труд на благо общества и региона.»</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <p className="text-xs text-burgundy tracking-widest uppercase font-semibold mb-4 font-body">Признание</p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl leading-tight">Достижения</h2>
            <div className="w-12 h-0.5 bg-burgundy mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {ACHIEVEMENTS.map((item, i) => (
              <div key={i} className="card-hover reveal bg-white rounded-sm p-8 border border-gray-100" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f2444, #1a3a6b)' }}>
                    <Icon name={item.icon} size={22} className="text-white" />
                  </div>
                  <span className="text-xs text-burgundy font-semibold tracking-wide font-body">{item.date}</span>
                </div>
                <h3 className="font-display font-semibold text-navy text-xl leading-snug mb-3">{item.title}</h3>
                <p className="text-graphite/60 text-sm leading-relaxed font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section id="directions" className="py-24 lg:py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <p className="text-xs tracking-widest uppercase font-semibold mb-4 font-body" style={{ color: '#c97080' }}>Сферы работы</p>
            <h2 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight">Направления деятельности</h2>
            <div className="w-12 h-0.5 mx-auto mt-6" style={{ background: '#7c1d2d' }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIRECTIONS.map((dir, i) => (
              <div key={i} className="reveal group p-8 rounded-sm border border-white/10 hover:border-burgundy/50 transition-all duration-300 hover:bg-white/5" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: 'rgba(124, 29, 45, 0.3)', border: '1px solid rgba(124,29,45,0.4)' }}>
                  <Icon name={dir.icon} size={22} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-white text-xl mb-3">{dir.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed font-body">{dir.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <p className="text-xs text-burgundy tracking-widest uppercase font-semibold mb-4 font-body">Фотоархив</p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl leading-tight">Галерея</h2>
            <div className="w-12 h-0.5 bg-burgundy mx-auto mt-6" />
            <p className="text-graphite/50 mt-4 text-sm font-body">Нажмите на фото для увеличения</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setLightbox(i)}
                className={`reveal group relative overflow-hidden rounded-sm cursor-pointer ${i === 0 ? 'md:col-span-2' : ''}`}
                style={{ aspectRatio: '4/3', transitionDelay: `${i * 0.07}s` }}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-105" style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)` }}>
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Icon name="Image" size={28} className="text-white/25" />
                    <span className="text-white/35 text-xs mt-2 font-body">{item.label}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/35 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon name="ZoomIn" size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 lightbox-backdrop flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={() => setLightbox(null)}>
            <Icon name="X" size={20} />
          </button>
          <div
            className="w-full max-w-2xl rounded-sm animate-scale-in"
            style={{ aspectRatio: '4/3', background: `linear-gradient(135deg, ${GALLERY_ITEMS[lightbox].color} 0%, ${GALLERY_ITEMS[lightbox].color}cc 100%)` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Icon name="Image" size={48} className="text-white/25" />
              <span className="text-white/45 text-sm mt-3 font-body">{GALLERY_ITEMS[lightbox].label}</span>
            </div>
          </div>
          <button className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! > 0 ? l! - 1 : GALLERY_ITEMS.length - 1)); }}>
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! < GALLERY_ITEMS.length - 1 ? l! + 1 : 0)); }}>
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      )}

      {/* DOCUMENTS */}
      <section id="documents" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <p className="text-xs text-burgundy tracking-widest uppercase font-semibold mb-4 font-body">Официальные бумаги</p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl leading-tight">Документы и награды</h2>
            <div className="w-12 h-0.5 bg-burgundy mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DOCUMENTS.map((doc, i) => (
              <div key={i} className="reveal card-hover bg-white rounded-sm border border-gray-100 overflow-hidden" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f8f6f2 0%, #eee9e0 100%)' }}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-sm flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f2444, #1a3a6b)' }}>
                      <Icon name={doc.icon} size={24} className="text-white" />
                    </div>
                    <span className="text-xs text-graphite/40 tracking-widest uppercase font-body">{doc.type}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-burgundy font-semibold tracking-wide mb-2 font-body">{doc.date}</p>
                  <h3 className="font-display font-semibold text-navy text-lg leading-snug mb-4">{doc.title}</h3>
                  <button className="flex items-center gap-2 text-xs text-navy font-semibold tracking-wide hover:text-burgundy transition-colors group font-body">
                    <Icon name="Eye" size={14} />
                    <span>Просмотреть</span>
                    <Icon name="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="reveal">
              <p className="text-xs text-burgundy tracking-widest uppercase font-semibold mb-4 font-body">Связь</p>
              <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl leading-tight mb-6">Контакты</h2>
              <div className="w-12 h-0.5 bg-burgundy mb-8" />
              <p className="text-graphite/70 leading-relaxed mb-10 font-body">Для предложений о сотрудничестве, участия в мероприятиях и общественных инициативах — свяжитесь через форму или в социальных сетях.</p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: 'MapPin', label: 'Брянск, Россия' },
                  { icon: 'Mail', label: 'Электронная почта' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-navy flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-white" />
                    </div>
                    <span className="text-graphite font-body">{item.label}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-graphite/40 tracking-widest uppercase font-semibold mb-4 font-body">Социальные сети</p>
                <div className="flex gap-3">
                  {[{ icon: 'MessageCircle', label: 'ВКонтакте' }, { icon: 'Send', label: 'Telegram' }].map((s) => (
                    <button key={s.label} className="flex items-center gap-2 px-4 py-2.5 border border-navy/20 rounded-sm text-navy text-sm font-medium hover:bg-navy hover:text-white transition-colors duration-200 font-body">
                      <Icon name={s.icon} size={15} />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              {formSent ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-6">
                    <Icon name="Check" size={28} className="text-white" />
                  </div>
                  <h3 className="font-display text-navy text-2xl font-semibold mb-2">Сообщение отправлено</h3>
                  <p className="text-graphite/60 text-sm font-body">Мы свяжемся с вами в ближайшее время.</p>
                  <button onClick={() => setFormSent(false)} className="mt-6 text-xs text-burgundy hover:underline font-body">Отправить ещё</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {[
                    { name: 'name', label: 'Имя', type: 'text', placeholder: 'Иван Иванов' },
                    { name: 'phone', label: 'Телефон', type: 'tel', placeholder: '+7 (999) 000-00-00' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'mail@example.com' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs text-graphite/50 font-semibold tracking-widest uppercase mb-2 font-body">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm text-graphite placeholder:text-gray-300 focus:outline-none focus:border-navy transition-colors text-sm font-body"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-graphite/50 font-semibold tracking-widest uppercase mb-2 font-body">Сообщение</label>
                    <textarea
                      rows={4}
                      placeholder="Ваше сообщение..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm text-graphite placeholder:text-gray-300 focus:outline-none focus:border-navy transition-colors text-sm font-body resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-4 bg-navy text-white text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-navy-light transition-colors duration-200 flex items-center justify-center gap-3 font-body">
                    <span>Отправить сообщение</span>
                    <Icon name="Send" size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-graphite text-white py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-semibold text-xl text-white mb-1">Слюнченко Данила Александрович</p>
              <p className="text-white/40 text-xs tracking-wide font-body">Общественный деятель · Брянская область</p>
            </div>
            <div className="flex gap-3">
              {[{ icon: 'MessageCircle', label: 'ВК' }, { icon: 'Send', label: 'TG' }].map((s) => (
                <button key={s.label} className="w-9 h-9 rounded-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon name={s.icon} size={15} className="text-white/70" />
                </button>
              ))}
            </div>
            <p className="text-white/30 text-xs font-body">© {new Date().getFullYear()} Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
