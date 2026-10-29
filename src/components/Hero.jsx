import { useEffect, useState } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';
import heroImg from '../assets/Hero-img.webp';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const width = useWindowWidth();
  const isMobile = width <= 768;
  const isSmall  = width <= 480;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={styles.section} aria-label="Hero">
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 24px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 28 : 48,
        }}
      >
        {/* Text content */}
        <div
          className={mounted ? 'anim-fade-left' : 'anim-hidden'}
          style={{
            flex: isMobile ? 'none' : '0 0 420px',
            maxWidth: isMobile ? '100%' : 420,
            width: isMobile ? '100%' : undefined,
          }}
        >
          <p
            className={mounted ? 'anim-fade-up anim-delay-1' : 'anim-hidden'}
            style={{
              ...styles.tagline,
              flexWrap: isSmall ? 'wrap' : 'nowrap',
              gap: isSmall ? 4 : 8,
            }}
          >
            <span>Pahrump, Nevada</span>
            <span style={styles.taglineDot} aria-hidden="true">•</span>
            <span>Realtor for nearly three decades</span>
          </p>

          <h1
            className={mounted ? 'anim-fade-up anim-delay-2' : 'anim-hidden'}
            style={{
              ...styles.headline,
              fontSize: isSmall ? 28 : isMobile ? 32 : 38,
            }}
          >
            Helping you find a place that feels like{' '}
            <span style={styles.highlight}>Home</span>
          </h1>

          <p
            className={mounted ? 'anim-fade-up anim-delay-3' : 'anim-hidden'}
            style={styles.subtext}
          >
            Your trusted Northern Nevada Marci has a talent for connecting great buyers
            and sellers with proven advice, deep market knowledge, and a team that stays
            with you every step of the way.
          </p>

          <div
            className={mounted ? 'anim-fade-up anim-delay-4' : 'anim-hidden'}
            style={{
              ...styles.btnGroup,
              flexDirection: isSmall ? 'column' : 'row',
            }}
          >
            <a href="#search" className="btn-press btn-glow" style={styles.btnPrimary}>
              Search Homes
            </a>
            <a href="#contact" className="btn-press" style={styles.btnOutline}>
              Get a Home Valuation
            </a>
          </div>
        </div>

        {/* Image */}
        <div
          className={`img-zoom ${mounted ? 'anim-fade-right' : 'anim-hidden'}`}
          style={{
            flex: 1,
            width: isMobile ? '100%' : undefined,
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <img
            src={heroImg}
            alt="Modern home exterior"
            style={{
              width: '100%',
              height: isMobile ? 220 : 320,
              objectFit: 'cover',
              borderRadius: 12,
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: '#fff',
    padding: '40px 0 0',
  },
  tagline: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: '#1a56db',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 14,
  },
  taglineDot: {
    fontSize: 10,
    color: '#1a56db',
  },
  headline: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontWeight: 800,
    lineHeight: 1.12,
    color: '#111',
    marginBottom: 16,
    letterSpacing: -0.8,
  },
  highlight: { color: '#1a56db' },
  subtext: {
    fontSize: 14,
    color: '#555',
    lineHeight: 1.7,
    marginBottom: 28,
  },
  btnGroup: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#1a56db',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '10px 20px',
    fontSize: 13,
    fontWeight: 600,
    display: 'inline-block',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  },
  btnOutline: {
    background: 'transparent',
    color: '#1a56db',
    border: '1.5px solid #1a56db',
    borderRadius: 4,
    padding: '10px 20px',
    fontSize: 13,
    fontWeight: 600,
    display: 'inline-block',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s',
    textAlign: 'center',
  },
};
