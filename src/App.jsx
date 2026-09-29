import React, { useState, useEffect } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Award,
  Heart,
  ChevronUp,
  Menu,
  X,
  CheckCircle2,
  Send,
  ExternalLink,
  MessageCircle,
  Users,
  Compass,
  Smile,
  ArrowRight,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Booking Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: 'MASSAGE BODY',
    date: '',
    time: '09:00',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Handle Scroll events for sticky header & back to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);
      setShowBackToTop(scrollPos > 350);

      // Section spy
      const sections = ['hero', 'gioi-thieu', 'dich-vu', 'trai-nghiem', 'khach-hang', 'dat-lich', 'lien-he'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceSelect = (serviceName) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
    scrollToSection('dat-lich');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Vui lòng điền đầy đủ Họ và tên và Số điện thoại.');
      return;
    }

    setFormLoading(true);

    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      
      // Trigger celebratory luxury confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#8A2E38', '#EAD5B8', '#FAF7F2']
        });
      } catch (err) {
        console.log(err);
      }
    }, 600);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      service: 'MASSAGE BODY',
      date: '',
      time: '09:00',
      notes: ''
    });
    setFormSubmitted(false);
  };

  return (
    <div className="landing-page-wrapper">
      {/* =========================================================================
          HEADER / NAVIGATION
          ========================================================================= */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#hero" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
            <img src="/images/logo.jpg" alt="Logo OMI SPA Bảo Dưỡng Sức Khỏe" className="brand-logo-img" />
            <div className="brand-name-group">
              <span className="brand-name">OMI SPA</span>
              <span className="brand-slogan">Bảo dưỡng sức khỏe</span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-menu">
              <li>
                <a
                  href="#hero"
                  className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#gioi-thieu"
                  className={`nav-link ${activeSection === 'gioi-thieu' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('gioi-thieu'); }}
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="#dich-vu"
                  className={`nav-link ${activeSection === 'dich-vu' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('dich-vu'); }}
                >
                  Dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="#dat-lich"
                  className={`nav-link ${activeSection === 'dat-lich' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('dat-lich'); }}
                >
                  Đặt lịch
                </a>
              </li>
              <li>
                <a
                  href="#lien-he"
                  className={`nav-link ${activeSection === 'lien-he' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('lien-he'); }}
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="header-cta-btn"
            onClick={() => scrollToSection('dat-lich')}
            aria-label="Đặt lịch hẹn tại OMI SPA"
          >
            ĐẶT LỊCH
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="brand-name-group" style={{ marginBottom: '16px' }}>
          <span className="brand-name" style={{ fontSize: '1.4rem' }}>OMI SPA</span>
          <span className="brand-slogan">Bảo dưỡng sức khỏe</span>
        </div>
        <a href="#hero" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          Trang chủ
        </a>
        <a href="#gioi-thieu" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('gioi-thieu'); }}>
          Giới thiệu
        </a>
        <a href="#dich-vu" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('dich-vu'); }}>
          Dịch vụ
        </a>
        <a href="#trai-nghiem" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('trai-nghiem'); }}>
          Không gian
        </a>
        <a href="#dat-lich" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('dat-lich'); }}>
          Đặt lịch
        </a>
        <a href="#lien-he" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('lien-he'); }}>
          Liên hệ
        </a>
        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '16px' }}
          onClick={() => scrollToSection('dat-lich')}
        >
          ĐẶT LỊCH NGAY
        </button>
      </div>

      <main>
        {/* =========================================================================
            SECTION 1 – HERO
            ========================================================================= */}
        <section id="hero" className="hero-section">
          <div className="hero-bg-wrapper">
            <img
              src="/images/501053524_122131407488785371_8398657580165171493_n.jpg"
              alt="OMI SPA Bảo Dưỡng Sức Khỏe"
              className="hero-bg-img"
            />
          </div>

          {/* Quick Mobile Action Bar */}
          <div className="hero-mobile-actions">
            <button
              className="btn-primary hero-mobile-btn"
              onClick={() => scrollToSection('dat-lich')}
            >
              <Calendar size={16} />
              <span>ĐẶT LỊCH NGAY</span>
            </button>
            <a href="tel:0938974424" className="cta-phone-btn hero-mobile-phone">
              <PhoneCall size={16} />
              <span>0938 974 424</span>
            </a>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2 – GIỚI THIỆU OMI SPA
            ========================================================================= */}
        <section id="gioi-thieu" className="about-section spa-decorated-section">
          {/* Evenly Distributed Leaves: Top-Left, Ambient Center, Bottom-Right */}
          <div className="spa-decor spa-top-left leaf-sway" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent.png" alt="" />
          </div>
          <div className="spa-decor spa-ambient-center leaf-float-2" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent_light.png" alt="" />
          </div>
          <div className="spa-decor spa-bottom-right leaf-float-1" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent.png" alt="" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="about-grid">
              <div className="about-content">
                <span className="section-tag">Về OMI SPA</span>
                <h2 className="section-title">
                  Chăm sóc cơ thể – Cân bằng sức khỏe
                </h2>
                <p className="about-lead-text">
                  Không gian an yên cùng liệu trình trị liệu chuyên sâu, giúp giải tỏa căng thẳng và phục hồi trọn vẹn năng lượng cho cơ thể.
                </p>

                {/* 4 Feature Cards */}
                <div className="features-grid">
                  <div className="feature-pill-card">
                    <div className="feature-icon-box">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <h4 className="feature-pill-title">Không gian yên tĩnh</h4>
                    </div>
                  </div>

                  <div className="feature-pill-card">
                    <div className="feature-icon-box">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h4 className="feature-pill-title">Sạch sẽ, thư giãn</h4>
                    </div>
                  </div>

                  <div className="feature-pill-card">
                    <div className="feature-icon-box">
                      <Award size={22} />
                    </div>
                    <div>
                      <h4 className="feature-pill-title">Kỹ thuật viên tay nghề cao</h4>
                    </div>
                  </div>

                  <div className="feature-pill-card">
                    <div className="feature-icon-box">
                      <Heart size={22} />
                    </div>
                    <div>
                      <h4 className="feature-pill-title">Bảo dưỡng sức khỏe</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-image-wrapper">
                <img
                  src="/images/725574221_122184499022785371_7617779709801537855_n.jpg"
                  alt="Không gian phòng trị liệu và đội ngũ kỹ thuật viên OMI SPA"
                  className="about-main-image"
                />
                <div className="about-decor-badge">
                  <Heart size={26} color="#E5C388" />
                  <div>
                    <div className="decor-badge-text-primary">Bảo Dưỡng Sức Khỏe</div>
                    <div className="decor-badge-text-sub">Khoảnh khắc an yên</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3 – DỊCH VỤ CHĂM SÓC SỨC KHỎE TẠI OMI SPA (ĐÚNG 4 DỊCH VỤ)
            ========================================================================= */}
        <section id="dich-vu" className="services-section spa-decorated-section">
          {/* Evenly Distributed Leaves: Top-Right, Ambient Center, Bottom-Left (Gold Theme) */}
          <div className="spa-decor spa-top-right dark-theme-decor leaf-float-2" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent_gold.png" alt="" />
          </div>
          <div className="spa-decor spa-ambient-center dark-theme-decor leaf-sway" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent_gold.png" alt="" />
          </div>
          <div className="spa-decor spa-bottom-left dark-theme-decor leaf-float-1" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent_wine.png" alt="" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-header-center">
              <span className="section-tag light">Dịch vụ</span>
              <h2 className="section-title light">Dịch vụ chăm sóc sức khỏe</h2>
              <p className="section-desc light" style={{ margin: '0 auto' }}>
                Liệu pháp thư giãn và phục hồi chuyên sâu cho cơ thể.
              </p>
            </div>

            <div className="services-grid">
              {/* Card 1: MASSAGE BODY */}
              <article className="service-card">
                <div className="service-img-wrap">
                  <img
                    src="/images/625037411_122168445176785371_1184980736165442084_n.jpg"
                    alt="Dịch vụ Massage Body tại OMI SPA"
                    className="service-img"
                  />
                  <span className="service-tag-badge">Chuyên sâu</span>
                </div>
                <div className="service-body">
                  <h3 className="service-title">MASSAGE BODY</h3>
                  <p className="service-desc">
                    Thư giãn toàn thân & phục hồi năng lượng.
                  </p>
                  <button
                    className="service-btn"
                    onClick={() => handleServiceSelect('MASSAGE BODY')}
                    aria-label="Đặt lịch dịch vụ MASSAGE BODY"
                  >
                    <span>Đặt lịch</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>

              {/* Card 2: Massage Cổ Vai Gáy */}
              <article className="service-card">
                <div className="service-img-wrap">
                  <img
                    src="/images/623536051_122167943204785371_2723329061492646379_n.jpg"
                    alt="Dịch vụ Massage Cổ Vai Gáy tại OMI SPA"
                    className="service-img"
                  />
                  <span className="service-tag-badge">Trị liệu</span>
                </div>
                <div className="service-body">
                  <h3 className="service-title">Massage Cổ Vai Gáy</h3>
                  <p className="service-desc">
                    Giải tỏa đau nhức cổ, vai và gáy.
                  </p>
                  <button
                    className="service-btn"
                    onClick={() => handleServiceSelect('Massage Cổ Vai Gáy')}
                    aria-label="Đặt lịch dịch vụ Massage Cổ Vai Gáy"
                  >
                    <span>Đặt lịch</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>

              {/* Card 3: Gội đầu dưỡng sinh */}
              <article className="service-card">
                <div className="service-img-wrap">
                  <img
                    src="/images/719302491_122183310098785371_2723963798450983583_n.jpg"
                    alt="Dịch vụ Gội đầu dưỡng sinh tại OMI SPA"
                    className="service-img"
                  />
                  <span className="service-tag-badge">Thư giãn</span>
                </div>
                <div className="service-body">
                  <h3 className="service-title">Gội đầu dưỡng sinh</h3>
                  <p className="service-desc">
                    Làm sạch sâu & chăm sóc tóc, da đầu.
                  </p>
                  <button
                    className="service-btn"
                    onClick={() => handleServiceSelect('Gội đầu dưỡng sinh')}
                    aria-label="Đặt lịch dịch vụ Gội đầu dưỡng sinh"
                  >
                    <span>Đặt lịch</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>

              {/* Card 4: MASSAGE CHÂN */}
              <article className="service-card">
                <div className="service-img-wrap">
                  <img
                    src="/images/758830600_122188470038785371_1289240293771936246_n.jpg"
                    alt="Dịch vụ MASSAGE CHÂN tại OMI SPA"
                    className="service-img"
                  />
                  <span className="service-tag-badge">Phục hồi</span>
                </div>
                <div className="service-body">
                  <h3 className="service-title">MASSAGE CHÂN</h3>
                  <p className="service-desc">
                    Xoa dịu mệt mỏi đôi chân sau ngày dài.
                  </p>
                  <button
                    className="service-btn"
                    onClick={() => handleServiceSelect('MASSAGE CHÂN')}
                    aria-label="Đặt lịch dịch vụ MASSAGE CHÂN"
                  >
                    <span>Đặt lịch</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 – TRẢI NGHIỆM KHÁCH HÀNG & KHÔNG GIAN
            ========================================================================= */}
        <section id="trai-nghiem" className="experience-section spa-decorated-section">
          {/* Evenly Distributed Leaves: Top-Left, Ambient Center, Bottom-Right */}
          <div className="spa-decor spa-top-left leaf-float-1" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent.png" alt="" />
          </div>
          <div className="spa-decor spa-ambient-center leaf-float-2" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent_light.png" alt="" />
          </div>
          <div className="spa-decor spa-bottom-right leaf-sway" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent.png" alt="" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="experience-grid">
              {/* Asymmetric Gallery */}
              <div className="experience-gallery-grid">
                <div className="gallery-card tall">
                  <img
                    src="/images/670750849_122176585688785371_9170752015363945888_n.jpg"
                    alt="Kỹ thuật viên massage nhẹ nhàng trong ánh nến ấm áp"
                  />
                  <span className="gallery-overlay-badge">Thư thái tinh thần</span>
                </div>
                <div className="gallery-card normal">
                  <img
                    src="/images/604658511_122163391136785371_2001081074462441975_n.jpg"
                    alt="Đá nóng trị liệu giải tỏa nhức mỏi"
                  />
                  <span className="gallery-overlay-badge">Đá nóng trị liệu</span>
                </div>
                <div className="gallery-card normal">
                  <img
                    src="/images/743146284_122186557952785371_5979941040521232426_n.jpg"
                    alt="Gội đầu thảo dược dưỡng sinh êm dịu"
                  />
                  <span className="gallery-overlay-badge">Dưỡng sinh thảo mộc</span>
                </div>
              </div>

              <div className="experience-content">
                <span className="section-tag">Không gian</span>
                <h2 className="section-title">Không gian thư giãn an yên</h2>
                <p className="section-desc">
                  Nơi bạn thả lỏng tâm trí và chăm sóc cơ thể nhẹ nhàng.
                </p>

                <div className="experience-quote-box">
                  <p className="experience-quote-text">
                    "Nơi thân tâm được nâng niu và xoa dịu trọn vẹn từng khoảnh khắc."
                  </p>
                </div>

                <div style={{ marginTop: '30px' }}>
                  <button
                    className="btn-wine-solid"
                    onClick={() => scrollToSection('dat-lich')}
                  >
                    <span>TRẢI NGHIỆM NGAY</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5 – KHÁCH HÀNG MỤC TIÊU (3 NHÓM)
            ========================================================================= */}
        <section id="khach-hang" className="audience-section spa-decorated-section">
          {/* Evenly Distributed Leaves: Top-Right, Ambient Center, Bottom-Left */}
          <div className="spa-decor spa-top-right leaf-float-2" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent.png" alt="" />
          </div>
          <div className="spa-decor spa-ambient-center leaf-sway" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent_light.png" alt="" />
          </div>
          <div className="spa-decor spa-bottom-left leaf-float-1" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent.png" alt="" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-header-center">
              <span className="section-tag">Phù hợp với ai</span>
              <h2 className="section-title">Dành cho bạn</h2>
              <p className="section-desc" style={{ margin: '0 auto' }}>
                Lựa chọn lý tưởng cho mọi nhu cầu nghỉ ngơi & phục hồi sức khỏe.
              </p>
            </div>

            <div className="audience-grid">
              {/* Target 1: Nhân viên văn phòng */}
              <div className="audience-card">
                <div className="audience-img-wrap">
                  <img
                    src="/images/audience_office.jpg"
                    alt="Nhân viên văn phòng thường bị mỏi cơ, cổ vai gáy"
                    className="audience-img"
                  />
                </div>
                <div className="audience-body">
                  <h3 className="audience-card-title">Nhân viên văn phòng</h3>
                  <p className="audience-card-desc">
                    Giảm đau mỏi cổ vai gáy do ngồi làm việc nhiều.
                  </p>
                </div>
              </div>

              {/* Target 2: Người làm việc căng thẳng */}
              <div className="audience-card">
                <div className="audience-img-wrap">
                  <img
                    src="/images/audience_stress.jpg"
                    alt="Người làm việc căng thẳng cần thư giãn tinh thần"
                    className="audience-img"
                  />
                </div>
                <div className="audience-body">
                  <h3 className="audience-card-title">Người làm việc căng thẳng</h3>
                  <p className="audience-card-desc">
                    Giải tỏa áp lực, thư giãn tinh thần sau ngày dài.
                  </p>
                </div>
              </div>

              {/* Target 3: Người quan tâm sức khỏe */}
              <div className="audience-card">
                <div className="audience-img-wrap">
                  <img
                    src="/images/audience_health.jpg"
                    alt="Người trưởng thành duy trì lối sống bảo dưỡng sức khỏe"
                    className="audience-img"
                  />
                </div>
                <div className="audience-body">
                  <h3 className="audience-card-title">Người quan tâm sức khỏe</h3>
                  <p className="audience-card-desc">
                    Dưỡng sinh, phục hồi và chăm sóc cơ thể định kỳ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6 & 7 – CTA ĐẶT LỊCH & FORM ĐẶT LỊCH
            ========================================================================= */}
        <section id="dat-lich" className="booking-section spa-decorated-section">
          {/* Evenly Distributed Leaves: Top-Left, Ambient Center, Bottom-Right (Gold Theme) */}
          <div className="spa-decor spa-top-left dark-theme-decor leaf-float-1" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent_gold.png" alt="" />
          </div>
          <div className="spa-decor spa-ambient-center dark-theme-decor leaf-float-2" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent_wine.png" alt="" />
          </div>
          <div className="spa-decor spa-bottom-right dark-theme-decor leaf-sway" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent_gold.png" alt="" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="booking-split-grid">
              {/* Left Column: Section 6 CTA Content */}
              <div className="cta-promo-content">
                <span className="section-tag light">Đặt lịch hẹn</span>
                <h2 className="cta-promo-title">
                  Dành thời gian chăm sóc chính bạn
                </h2>
                <p className="cta-promo-desc">
                  Đặt lịch trước để được OMI SPA phục vụ chu đáo nhất.
                </p>

                <div className="cta-buttons-group">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      const input = document.getElementById('form-fullname');
                      if (input) input.focus();
                    }}
                  >
                    <Calendar size={18} />
                    <span>ĐẶT LỊCH NGAY</span>
                  </button>

                  <a href="tel:0938974424" className="cta-phone-btn">
                    <Phone size={18} />
                    <span>GỌI 0938974424</span>
                  </a>
                </div>

                <div className="cta-quick-contacts">
                  <div className="quick-contact-item">
                    <MapPin size={17} color="#E5C388" />
                    <span>159 Ba Vân, P.14, Q. Tân Bình, TP. HCM</span>
                  </div>
                  <div className="quick-contact-item">
                    <Clock size={17} color="#E5C388" />
                    <span>09:00 – 20:00 (Thứ 2 – Chủ nhật)</span>
                  </div>
                  <div className="quick-contact-item">
                    <User size={17} color="#E5C388" />
                    <span>Liên hệ: <strong>Ngoc Han</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Section 7 Booking Form */}
              <div className="booking-form-card">
                <div className="booking-form-header">
                  <h3 className="booking-form-title">Đặt Lịch Hẹn</h3>
                  <p className="booking-form-subtitle">Điền thông tin nhận tư vấn nhanh</p>
                </div>

                {formSubmitted ? (
                  <div className="booking-success-alert">
                    <div className="success-icon-circle">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="success-title">Đặt lịch thành công!</h4>
                    <p className="success-desc">
                      OMI SPA sẽ liên hệ xác nhận lịch hẹn trong ít phút.
                    </p>
                    <button
                      className="btn-wine-outline"
                      style={{ marginTop: '12px' }}
                      onClick={resetForm}
                    >
                      Đặt thêm lịch khác
                    </button>
                  </div>
                ) : (
                  <form className="booking-form" onSubmit={handleFormSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="form-fullname">
                          Họ và tên *
                        </label>
                        <input
                          id="form-fullname"
                          name="fullName"
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Văn A"
                          className="form-input"
                          value={formData.fullName}
                          onChange={handleFormChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="form-phone">
                          Số điện thoại *
                        </label>
                        <input
                          id="form-phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="Ví dụ: 0938 974 424"
                          className="form-input"
                          value={formData.phone}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="form-service">
                        Dịch vụ quan tâm
                      </label>
                      <select
                        id="form-service"
                        name="service"
                        className="form-select"
                        value={formData.service}
                        onChange={handleFormChange}
                      >
                        <option value="MASSAGE BODY">MASSAGE BODY</option>
                        <option value="Massage Cổ Vai Gáy">Massage Cổ Vai Gáy</option>
                        <option value="Gội đầu dưỡng sinh">Gội đầu dưỡng sinh</option>
                        <option value="MASSAGE CHÂN">MASSAGE CHÂN</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="form-date">
                          Ngày mong muốn
                        </label>
                        <input
                          id="form-date"
                          name="date"
                          type="date"
                          className="form-input"
                          value={formData.date}
                          onChange={handleFormChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="form-time">
                          Giờ mong muốn
                        </label>
                        <select
                          id="form-time"
                          name="time"
                          className="form-select"
                          value={formData.time}
                          onChange={handleFormChange}
                        >
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="13:30">13:30</option>
                          <option value="15:00">15:00</option>
                          <option value="16:30">16:30</option>
                          <option value="18:00">18:00</option>
                          <option value="19:00">19:00</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="form-notes">
                        Ghi chú (nếu có)
                      </label>
                      <textarea
                        id="form-notes"
                        name="notes"
                        placeholder="Yêu cầu đặc biệt..."
                        className="form-textarea"
                        value={formData.notes}
                        onChange={handleFormChange}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="booking-submit-btn"
                      disabled={formLoading}
                    >
                      {formLoading ? (
                        <span>Đang xử lý...</span>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>XÁC NHẬN ĐẶT LỊCH</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8 – ĐỊA CHỈ & LIÊN HỆ
            ========================================================================= */}
        <section id="lien-he" className="contact-section spa-decorated-section">
          {/* Evenly Distributed Leaves: Top-Right, Ambient Center, Bottom-Left */}
          <div className="spa-decor spa-top-right leaf-float-1" aria-hidden="true">
            <img src="/images/leaves/leaf_green_transparent.png" alt="" />
          </div>
          <div className="spa-decor spa-ambient-center leaf-sway" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent_light.png" alt="" />
          </div>
          <div className="spa-decor spa-bottom-left leaf-float-2" aria-hidden="true">
            <img src="/images/leaves/leaf_olive_transparent.png" alt="" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-header-center" style={{ marginBottom: '40px' }}>
              <span className="section-tag">Liên hệ</span>
              <h2 className="section-title">Thông Tin Liên Hệ</h2>
            </div>

            <div className="contact-grid">
              <div className="contact-info-card">
                <div>
                  <h3 className="contact-brand-title">OMI SPA – BẢO DƯỠNG SỨC KHỎE</h3>
                  
                  <div className="contact-details-list">
                    <div className="contact-detail-row">
                      <div className="contact-detail-icon">
                        <MapPin size={20} />
                      </div>
                      <div className="contact-detail-text">
                        <strong>Địa chỉ</strong>
                        <span>159 Ba Vân, P.14, Q. Tân Bình, TP. HCM</span>
                      </div>
                    </div>

                    <div className="contact-detail-row">
                      <div className="contact-detail-icon">
                        <Clock size={20} />
                      </div>
                      <div className="contact-detail-text">
                        <strong>Thời gian phục vụ</strong>
                        <span>09:00 – 20:00 (Thứ 2 – Chủ nhật)</span>
                      </div>
                    </div>

                    <div className="contact-detail-row">
                      <div className="contact-detail-icon">
                        <Phone size={20} />
                      </div>
                      <div className="contact-detail-text">
                        <strong>Điện thoại / Zalo</strong>
                        <a href="tel:0938974424" style={{ fontWeight: 600, color: 'var(--color-wine-primary)' }}>
                          0938 974 424 (Ngoc Han)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-quick-buttons">
                  <a href="tel:0938974424" className="contact-btn-call">
                    <Phone size={16} />
                    <span>Gọi Ngay</span>
                  </a>

                  <a
                    href="https://zalo.me/0938974424"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn-zalo"
                  >
                    <MessageCircle size={16} />
                    <span>Nhắn Zalo</span>
                  </a>

                  <a
                    href="https://www.facebook.com/omispabaoduongsuckhoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn-fb"
                  >
                    <ExternalLink size={16} />
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://maps.app.goo.gl/ST5UqEudtVH58eRt5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn-maps"
                  >
                    <Compass size={16} />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Google Maps Interactive Card */}
              <div className="contact-map-wrapper">
                <iframe
                  title="Bản đồ chỉ đường OMI SPA 159 Ba Vân, Tân Bình"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2612711833446!2d106.63852037583852!3d10.79129095891461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eb91b979515%3A0x6a2dfb4ef3f750b!2zMTU5IEJhVsOibiBQLjE0LCBRLiBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
                  className="map-iframe"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          SECTION 9 – FOOTER
          ========================================================================= */}
      <footer className="site-footer spa-decorated-section">
        {/* Shimmering Gold Leaves on Footer */}
        <div className="spa-decor spa-bottom-left dark-theme-decor leaf-float-1" aria-hidden="true">
          <img src="/images/leaves/leaf_olive_transparent_gold.png" alt="" />
        </div>
        <div className="spa-decor spa-bottom-right dark-theme-decor leaf-sway" aria-hidden="true">
          <img src="/images/leaves/leaf_green_transparent_gold.png" alt="" />
        </div>
        <div className="container">
          <div className="footer-top-grid">
            <div className="footer-brand-col">
              <div className="brand-logo">
                <img src="/images/logo.jpg" alt="OMI SPA Logo" className="brand-logo-img" />
                <div className="brand-name-group">
                  <span className="brand-name" style={{ color: '#FFFFFF' }}>OMI SPA</span>
                  <span className="brand-slogan">Bảo dưỡng sức khỏe</span>
                </div>
              </div>
              <p className="footer-brand-desc">
                Trị liệu dưỡng sinh & chăm sóc sức khỏe toàn diện.
              </p>
              <div className="footer-social-links">
                <a
                  href="https://www.facebook.com/omispabaoduongsuckhoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Facebook OMI SPA"
                >
                  <ExternalLink size={18} />
                </a>
                <a
                  href="https://maps.app.goo.gl/ST5UqEudtVH58eRt5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Google Maps OMI SPA"
                >
                  <MapPin size={18} />
                </a>
                <a
                  href="tel:0938974424"
                  className="footer-social-icon"
                  aria-label="Hotline OMI SPA"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-col-title">Dịch Vụ</h4>
              <ul className="footer-nav-list">
                <li><a href="#dich-vu" onClick={(e) => { e.preventDefault(); handleServiceSelect('MASSAGE BODY'); }}>MASSAGE BODY</a></li>
                <li><a href="#dich-vu" onClick={(e) => { e.preventDefault(); handleServiceSelect('Massage Cổ Vai Gáy'); }}>Massage Cổ Vai Gáy</a></li>
                <li><a href="#dich-vu" onClick={(e) => { e.preventDefault(); handleServiceSelect('Gội đầu dưỡng sinh'); }}>Gội đầu dưỡng sinh</a></li>
                <li><a href="#dich-vu" onClick={(e) => { e.preventDefault(); handleServiceSelect('MASSAGE CHÂN'); }}>MASSAGE CHÂN</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Liên Hệ</h4>
              <div className="footer-contact-items">
                <div>159 Ba Vân, P.14, Q. Tân Bình, TP. HCM</div>
                <div>09:00 – 20:00 (Thứ 2 – CN)</div>
                <div>Hotline/Zalo: 0938 974 424 (Ngoc Han)</div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} OMI SPA – BẢO DƯỠNG SỨC KHỎE. All rights reserved.</p>
            <p>159 Ba Vân, Phường 14, Quận Tân Bình, TP. Hồ Chí Minh</p>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          FLOATING ACTION BUTTONS (CALL, ZALO, BACK TO TOP)
          ========================================================================= */}
      <div className="floating-actions" aria-label="Quick Actions">
        {/* Call Button */}
        <a
          href="tel:0938974424"
          className="floating-btn floating-btn-call"
          aria-label="Gọi điện thoại cho OMI SPA"
        >
          <Phone size={22} />
          <span className="floating-tooltip">Gọi: 0938974424</span>
        </a>

        {/* Zalo Button */}
        <a
          href="https://zalo.me/0938974424"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-btn-zalo"
          aria-label="Nhắn tin Zalo OMI SPA"
        >
          <MessageCircle size={22} />
          <span className="floating-tooltip">Nhắn Zalo OMI SPA</span>
        </a>

        {/* Back to Top */}
        {showBackToTop && (
          <button
            className="floating-btn floating-btn-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Cuộn lên đầu trang"
          >
            <ChevronUp size={22} />
            <span className="floating-tooltip">Lên đầu trang</span>
          </button>
        )}
      </div>
    </div>
  );
}
