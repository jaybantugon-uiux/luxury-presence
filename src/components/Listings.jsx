import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import mrkt1 from '../assets/crrnt-mrkt-1.webp';
import mrkt2 from '../assets/crrnt-mrkt-2.webp';
import mrkt3 from '../assets/crrnt-mrkt-3.webp';

const listings = [
  {
    id: 1,
    image: mrkt1,
    price: '$334,000',
    address: '4510 S Birch Ct, Pahrump, NV 89061',
    badges: ['Active', 'Single Family'],
    beds: 3,
    baths: 2,
    sqft: '1,644',
    garage: '2 Car Garage',
    lot: '5,967 sqft Lot',
    dom: '14 Days on Market',
    status: 'Price Reduced',
  },
  {
    id: 2,
    image: mrkt2,
    price: '$460,000',
    address: '4829 E Beacon Ridge Dr, Pahrump, NV 89061',
    badges: ['Active', 'Single Family'],
    beds: 3,
    baths: 3,
    sqft: '2,338',
    garage: '3 Car Garage',
    lot: '8,015 sqft Lot',
    dom: '8 Days on Market',
    status: '$25K Below Market',
  },
  {
    id: 3,
    image: mrkt3,
    price: '$487,000',
    address: '3121 Deacon Ct, Pahrump, NV 89048',
    badges: ['Active', 'Single Family'],
    beds: 4,
    baths: 4,
    sqft: '2,530',
    garage: '2 Car Garage',
    lot: '1.01 acres Lot',
    dom: '22 Days on Market',
    status: 'New Listing',
  },
];

// Delay class map
const delayClass = ['anim-delay-1', 'anim-delay-2', 'anim-delay-3'];

function PropertyCard({ listing, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`hover-lift img-zoom ${visible ? `anim-fade-up ${delayClass[index]}` : 'anim-hidden'}`}
      style={{
        ...cardStyles.card,
        border: hovered ? '1px solid #c7d9fc' : '1px solid #e8e8e8',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={cardStyles.imageWrap}>
        <img
          src={listing.image}
          alt={`Property at ${listing.address}`}
          style={cardStyles.image}
          loading="lazy"
        />
        <div style={cardStyles.statusBadge}>{listing.status}</div>
      </div>
      <div style={cardStyles.body}>
        <p style={cardStyles.price}>{listing.price}</p>
        <p style={cardStyles.address}>{listing.address}</p>
        <div style={cardStyles.badges}>
          {listing.badges.map((b) => (
            <span key={b} style={cardStyles.badge}>{b}</span>
          ))}
        </div>
        <div style={cardStyles.details}>
          <span style={cardStyles.detail}><span style={cardStyles.icon}>🛏</span> {listing.beds} Beds</span>
          <span style={cardStyles.detail}><span style={cardStyles.icon}>🛁</span> {listing.baths} Baths</span>
          <span style={cardStyles.detail}><span style={cardStyles.icon}>📐</span> {listing.sqft} sqft</span>
        </div>
        <div style={cardStyles.metaRow}>
          <span style={cardStyles.meta}>{listing.garage}</span>
          <span style={cardStyles.meta}>{listing.lot}</span>
          <span style={cardStyles.meta}>{listing.dom}</span>
        </div>
      </div>
    </article>
  );
}

export default function Listings() {
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView(0.1);

  return (
    <section style={styles.section} aria-labelledby="listings-heading">
      <div style={styles.inner}>
        <div
          ref={headerRef}
          className={headerVisible ? 'anim-fade-up' : 'anim-hidden'}
          style={styles.header}
        >
          <div>
            <p style={styles.eyebrow}>For Sale</p>
            <h2 style={styles.heading} id="listings-heading">Currently on the market</h2>
          </div>
          <a href="#" style={styles.viewAll}>View all listings &rarr;</a>
        </div>
        <div ref={gridRef} className="listings-grid" style={styles.grid}>
          {listings.map((listing, i) => (
            <PropertyCard key={listing.id} listing={listing} index={i} visible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '48px 0', background: '#fff' },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 28,
  },
  eyebrow: {
    fontSize: 11, fontWeight: 700, color: '#1a56db',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
  },
  heading: { fontSize: 26, fontWeight: 700, color: '#111' },
  viewAll: { fontSize: 13, fontWeight: 600, color: '#1a56db', display: 'flex', alignItems: 'center', gap: 4 },
  grid: { gap: 24 }, /* columns handled by .listings-grid CSS class */
};

const cardStyles = {
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },
  imageWrap: { position: 'relative', height: 190, overflow: 'hidden' },
  image: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  statusBadge: {
    position: 'absolute', top: 10, left: 10,
    background: '#1a56db', color: '#fff',
    fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 4,
  },
  body: { padding: '14px 16px 16px' },
  price: { fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 4 },
  address: { fontSize: 12, color: '#666', marginBottom: 10, lineHeight: 1.4 },
  badges: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 },
  badge: {
    fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3,
    background: '#e8f0fe', color: '#1a56db', border: '1px solid #c7d9fc',
  },
  details: { display: 'flex', gap: 14, marginBottom: 10, flexWrap: 'wrap' },
  detail: { fontSize: 12, fontWeight: 600, color: '#333', display: 'flex', alignItems: 'center', gap: 4 },
  icon: { fontSize: 13 },
  metaRow: { display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid #f0f0f0', paddingTop: 10 },
  meta: { fontSize: 11, color: '#888', background: '#f5f5f5', padding: '2px 7px', borderRadius: 3 },
};
