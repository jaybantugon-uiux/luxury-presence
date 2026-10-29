import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const services = [
  {
    id: 'buyers',
    title: 'For buyers',
    description:
      'Find market analysis, expert local tour and construction on-site truth so every property you consider from inspecting to the point your offer sign shows.',
    cta: 'Start your search →',
  },
  {
    id: 'sellers',
    title: 'For sellers',
    description:
      "Don't just list a price and pray. Our proven frame is front of every potential buyer to you getting done.",
    cta: 'Request a valuation →',
  },
  {
    id: 'investors',
    title: 'For investors',
    description:
      'Our connect and market-led edge to small, from regular to luxury gets that lets you find who and put in your own contact location.',
    cta: 'Talk investments →',
  },
];

const delayClass = ['anim-delay-1', 'anim-delay-2', 'anim-delay-3'];

function ServiceCard({ service, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={visible ? `anim-fade-up ${delayClass[index]}` : 'anim-hidden'}
      style={{
        ...styles.card,
        background: hovered ? '#fff' : 'transparent',
        boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.07)' : 'none',
        borderColor: hovered ? '#c7d9fc' : 'transparent',
        transition: 'background 0.25s, box-shadow 0.25s, border-color 0.25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 style={styles.cardTitle}>{service.title}</h3>
      <p style={styles.cardText}>{service.description}</p>
      <a
        href="#contact"
        className="btn-press"
        style={{
          ...styles.link,
          background: hovered ? '#1a56db' : 'transparent',
          color: hovered ? '#fff' : '#1a56db',
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        {service.cta}
      </a>
    </div>
  );
}

export default function Services() {
  const [headingRef, headingVisible] = useInView();
  const [gridRef, gridVisible] = useInView(0.1);

  return (
    <section style={styles.section} aria-labelledby="services-heading">
      <div style={styles.inner}>
        <div
          ref={headingRef}
          className={headingVisible ? 'anim-fade-up' : 'anim-hidden'}
        >
          <p style={styles.eyebrow}>Services</p>
          <h2 style={styles.heading} id="services-heading">Real estate, done right.</h2>
        </div>
        <div ref={gridRef} className="services-grid" style={styles.grid}>
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} visible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '56px 0', background: '#f9fafb', borderTop: '1px solid #eee' },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },
  eyebrow: {
    fontSize: 11, fontWeight: 700, color: '#1a56db',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
  },
  heading: { fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 32 },
  grid: { gap: 32 }, /* columns handled by .services-grid CSS class */
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: '24px 20px',
    borderRadius: 10,
    border: '1.5px solid transparent',
  },
  cardTitle: { fontSize: 16, fontWeight: 700, color: '#111' },
  cardText: { fontSize: 13, color: '#555', lineHeight: 1.7, flex: 1 },
  link: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1a56db',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 16px',
    border: '1.5px solid #1a56db',
    borderRadius: 4,
    alignSelf: 'flex-start',
    textDecoration: 'none',
  },
};
