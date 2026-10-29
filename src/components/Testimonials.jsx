import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const testimonials = [
  {
    id: 1,
    quote:
      '"Marci made finding our first home feel effortless. Her guidance, attention to detail and genuine care made the entire experience feel personal and stress-free."',
    name: 'Emily Roberts',
    location: 'Buyer • Reno, NV',
    rating: 5,
  },
  {
    id: 2,
    quote:
      '"From our first conversation to the final closing, Marci handled every detail with grace and professionalism. We couldn\'t have asked for a smoother selling experience."',
    name: 'Jessica & Brian Vance',
    location: 'Seller • Sparks, NV',
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <span style={starStyles.wrap} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={starStyles.star} aria-hidden="true">★</span>
      ))}
    </span>
  );
}

const delayClass = ['anim-delay-1', 'anim-delay-3'];

function TestimonialCard({ t, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <blockquote
      className={`hover-lift ${visible ? `anim-fade-up ${delayClass[index]}` : 'anim-hidden'}`}
      style={{
        ...styles.card,
        borderColor: hovered ? '#c7d9fc' : '#e8e8e8',
        background: hovered ? '#f0f5ff' : '#fafafa',
        transition: 'border-color 0.25s, background 0.25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StarRating count={t.rating} />
      <p style={styles.quote}>{t.quote}</p>
      <footer style={styles.footer}>
        <p style={styles.name}>{t.name}</p>
        <p style={styles.location}>{t.location}</p>
      </footer>
    </blockquote>
  );
}

export default function Testimonials() {
  const [headingRef, headingVisible] = useInView();
  const [gridRef, gridVisible] = useInView(0.1);

  return (
    <section style={styles.section} aria-labelledby="testimonials-heading">
      <div style={styles.inner}>
        <div
          ref={headingRef}
          className={headingVisible ? 'anim-fade-up' : 'anim-hidden'}
        >
          <p style={styles.eyebrow}>Reviews</p>
          <h2 style={styles.heading} id="testimonials-heading">Kind words from clients</h2>
        </div>
        <div ref={gridRef} className="testimonials-grid" style={styles.grid}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} visible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '56px 0', background: '#fff', borderTop: '1px solid #eee' },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },
  eyebrow: {
    fontSize: 11, fontWeight: 700, color: '#1a56db',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
  },
  heading: { fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 32 },
  grid: { gap: 28 }, /* columns handled by .testimonials-grid CSS class */
  card: {
    border: '1px solid #e8e8e8',
    borderRadius: 10,
    padding: '28px 28px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    cursor: 'default',
  },
  quote: { fontSize: 14, color: '#333', lineHeight: 1.75, fontStyle: 'italic', flex: 1 },
  footer: { borderTop: '1px solid #eee', paddingTop: 14 },
  name: { fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 2 },
  location: { fontSize: 12, color: '#888' },
};

const starStyles = {
  wrap: { display: 'flex', gap: 2 },
  star: { color: '#f5a623', fontSize: 16 },
};
