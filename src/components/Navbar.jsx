import { useEffect, useState } from 'react';
import webLogo from '../assets/web-logo.webp';

const navLinks = ['Home', 'Listings', "Let's Move", 'About Marci'];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close drawer on resize back to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={mounted ? 'anim-fade-down' : 'anim-hidden'}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#fff',
        borderBottom: '1px solid #e8e8e8',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Main bar */}
      <div className="navbar-inner">
        <img src={webLogo} alt="Marci Metzger Logo" style={styles.logo} />

        {/* Desktop nav */}
        <nav className="navbar-nav" aria-label="Main navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link}>
                <a href="#" className="nav-link-animated" style={styles.navLink}>{link}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <a
          href="tel:7756195886"
          className="navbar-cta btn-press btn-glow"
          style={styles.ctaBtn}
          aria-label="Call us"
        >
          Call (775) 619-5886
        </a>

        {/* Hamburger — visible on mobile only via CSS */}
        <button
          className="navbar-hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </div>

      {/* Mobile drawer */}
      <nav className={`navbar-drawer${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <a key={link} href="#" onClick={() => setMenuOpen(false)}>{link}</a>
        ))}
        <a
          href="tel:7756195886"
          style={{ color: '#1a56db', fontWeight: 700 }}
          onClick={() => setMenuOpen(false)}
        >
          Call (775) 619-5886
        </a>
      </nav>
    </header>
  );
}

const styles = {
  logo: { height: 36, width: 'auto', objectFit: 'contain', flexShrink: 0 },
  navLink: { fontSize: 13, fontWeight: 500, color: '#333', textDecoration: 'none' },
  ctaBtn: {
    background: '#1a56db',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '8px 16px',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    flexShrink: 0,
  },
};
