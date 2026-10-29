import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useWindowWidth } from '../hooks/useWindowWidth';
import aboutImg from '../assets/about-marci-img.webp';

/** Animates a number from 0 to `target` over `duration` ms */
function useCountUp(target, duration = 1200, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function StatItem({ stat, visible, delay }) {
  // Only numeric stats get counted up
  const numericTarget = parseFloat(stat.numericValue) || 0;
  const counted = useCountUp(numericTarget, 1400, visible);

  const displayValue = stat.prefix
    ? `${stat.prefix}${counted}${stat.suffix}`
    : stat.value; // non-numeric stays as-is, but still fades in

  return (
    <div
      className={visible ? `anim-fade-up ${delay}` : 'anim-hidden'}
      style={styles.statItem}
    >
      <p style={styles.statValue}>{stat.numericValue ? displayValue : stat.value}</p>
      <p style={styles.statLabel}>{stat.label}</p>
      <p style={styles.statSub}>{stat.sub}</p>
    </div>
  );
}

const stats = [
  { value: 'Nearly 3', numericValue: null,  prefix: '',  suffix: '', label: 'Decades in Real Estate', sub: 'Years of Experience' },
  { value: '20+',      numericValue: 20,    prefix: '',  suffix: '+', label: 'Listings Per Year',     sub: 'Homes Sold Annually' },
  { value: '$2M',      numericValue: 2,     prefix: '$', suffix: 'M', label: 'Avg. Sales Volume',     sub: 'Moving Per Year' },
];

const delayClass = ['anim-delay-1', 'anim-delay-2', 'anim-delay-3'];

export default function About() {
  const width = useWindowWidth();
  const isMobile = width <= 768;

  const [statsRef, statsVisible] = useInView(0.2);
  const [imageRef, imageVisible] = useInView(0.15);
  const [bioRef, bioVisible] = useInView(0.15);

  return (
    <section style={styles.section} aria-labelledby="about-heading">
      {/* Stats bar */}
      <div
        ref={statsRef}
        style={{
          ...styles.statsBar,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: isMobile ? 28 : 48,
          padding: isMobile ? '32px 20px 24px' : '40px 24px 32px',
        }}
      >
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} visible={statsVisible} delay={delayClass[i]} />
        ))}
      </div>

      {/* Bio section */}
      <div style={styles.bioSection}>
        <div style={styles.inner}>
          <div style={{ ...styles.bioLayout, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 28 : 48 }}>
            {/* Image slides in from left */}
            <div
              ref={imageRef}
              className={`img-zoom ${imageVisible ? 'anim-fade-left' : 'anim-hidden'}`}
              style={{
                ...styles.imageWrap,
                width: isMobile ? '100%' : 220,
                flexShrink: isMobile ? undefined : 0,
              }}
            >
              <img
                src={aboutImg}
                alt="Marci Metzger, Real Estate Broker"
                style={{
                  ...styles.brokerImage,
                  width: '100%',
                  height: isMobile ? 260 : 280,
                  objectPosition: 'center top',
                }}
                loading="lazy"
              />
            </div>

            {/* Bio slides in from right */}
            <div
              ref={bioRef}
              className={bioVisible ? 'anim-fade-right' : 'anim-hidden'}
              style={styles.bioContent}
            >
              <p style={styles.eyebrow}>About Marci</p>
              <h2 style={styles.heading} id="about-heading">
                A broker's experience,<br />
                a neighbor's care.
              </h2>
              <p style={styles.bio}>
                Marci spent years as a licensed broker in Seattle before bringing her expertise to Southern Nevada, 
                where she now serves Pahrump and the surrounding valley. She and her team live, work, and play in 
                this community.
              </p>
              <p style={styles.bio}>
                "I love that small-town feeling that our community offers. Spectacular golf courses, parks, pool, 
                and easy access to Las Vegas make Pahrump a great place to call home. Working or retired, fast-paced 
                or looking to relax... there's a place for you here!”
              </p>
              <a href="#contact" className="btn-press" style={styles.btn}>
                Work with Marci
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { background: '#0f1a3d' },
  statsBar: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '40px 24px 32px',
    display: 'flex',
    gap: 48,
  },
  statItem: { color: '#fff' },
  statValue: { fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 2 },
  statLabel: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 2 },
  statSub: { fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.5 },
  bioSection: { borderTop: '1px solid rgba(255,255,255,0.1)', paddingBottom: 56 },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },
  bioLayout: {
    display: 'flex',
    flexDirection: 'column', // overridden to row on desktop via JS
    alignItems: 'flex-start',
    gap: 32,
    paddingTop: 40,
  },
  imageWrap: { flexShrink: 0, width: 220, borderRadius: 8, overflow: 'hidden' },
  brokerImage: { width: 220, height: 280, objectFit: 'cover', objectPosition: 'center top', display: 'block' },
  bioContent: { flex: 1, color: '#fff' },
  eyebrow: {
    fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  heading: { fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 20 },
  bio: { fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 14 },
  btn: {
    display: 'inline-block',
    marginTop: 8,
    background: '#fff',
    color: '#0f1a3d',
    fontWeight: 700,
    fontSize: 13,
    padding: '10px 22px',
    borderRadius: 4,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },
};
