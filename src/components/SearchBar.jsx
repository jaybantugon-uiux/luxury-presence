import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const locations = [
  { value: '', label: 'Any' },
  { value: 'alamo', label: 'Alamo' },
  { value: 'alton', label: 'Alton' },
  { value: 'amargosa-valley', label: 'Amargosa Valley' },
  { value: 'beatty', label: 'Beatty' },
  { value: 'beryl', label: 'Beryl' },
  { value: 'blue-diamond', label: 'Blue Diamond' },
  { value: 'boulder-city', label: 'Boulder City' },
  { value: 'brian-head', label: 'Brian Head' },
  { value: 'cal-nev-ari', label: 'Cal Nev Ari' },
  { value: 'caliente', label: 'Caliente' },
  { value: 'cedar-city', label: 'Cedar City' },
  { value: 'cold-creek', label: 'Cold Creek' },
  { value: 'crystal', label: 'Crystal' },
  { value: 'duck-creek-village', label: 'Duck Creek Village' },
  { value: 'dyer', label: 'Dyer' },
  { value: 'elko', label: 'Elko' },
  { value: 'ely', label: 'Ely' },
  { value: 'goldfield', label: 'Goldfield' },
  { value: 'goodsprings', label: 'Goodsprings' },
  { value: 'hatch', label: 'Hatch' },
  { value: 'henderson', label: 'Henderson' },
  { value: 'indian-springs', label: 'Indian Springs' },
  { value: 'jean', label: 'Jean' },
  { value: 'las-vegas', label: 'Las Vegas' },
  { value: 'laughlin', label: 'Laughlin' },
  { value: 'logandale', label: 'Logandale' },
  { value: 'mc-gill', label: 'Mc Gill' },
  { value: 'mesquite', label: 'Mesquite' },
  { value: 'moapa', label: 'Moapa' },
  { value: 'mount-charleston', label: 'Mount Charleston' },
  { value: 'mountain-springs', label: 'Mountain Springs' },
  { value: 'nelson', label: 'Nelson' },
  { value: 'north-las-vegas', label: 'North Las Vegas' },
  { value: 'overton', label: 'Overton' },
  { value: 'pahrump', label: 'Pahrump' },
  { value: 'palm-gardens', label: 'Palm Gardens' },
  { value: 'panaca', label: 'Panaca' },
  { value: 'parowan', label: 'Parowan' },
  { value: 'pioche', label: 'Pioche' },
  { value: 'ruth', label: 'Ruth' },
  { value: 'sandy-valley', label: 'Sandy Valley' },
  { value: 'searchlight', label: 'Searchlight' },
  { value: 'tonopah', label: 'Tonopah' },
];

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [beds, setBeds] = useState('');
  const [budget, setBudget] = useState('');
  const [ref, visible] = useInView(0.2);

  const handleSearch = (e) => { e.preventDefault(); };

  return (
    <section
      id="search"
      ref={ref}
      className={visible ? 'anim-fade-up' : 'anim-hidden'}
      style={styles.section}
      aria-label="Property search"
    >
      <div style={styles.inner}>
        <form className="search-form" onSubmit={handleSearch} role="search">

          <div className="search-field" style={styles.field}>
            <label htmlFor="location" style={styles.label}>Location</label>
            <select id="location" value={location} onChange={(e) => setLocation(e.target.value)} style={styles.select}>
              {locations.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="search-divider" style={styles.divider} aria-hidden="true" />

          <div className="search-field" style={styles.field}>
            <label htmlFor="type" style={styles.label}>Type</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)} style={styles.select}>
              <option value="">Any</option>
              <option value="land">Land</option>
              <option value="residential-lease">Residential Lease</option>
              <option value="highrise">High Rise</option>
              <option value="residential">Residential</option>
            </select>
          </div>

          <div className="search-divider" style={styles.divider} aria-hidden="true" />

          <div className="search-field" style={styles.field}>
            <label htmlFor="beds" style={styles.label}>Beds</label>
            <select id="beds" value={beds} onChange={(e) => setBeds(e.target.value)} style={styles.select}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div className="search-divider" style={styles.divider} aria-hidden="true" />

          <div className="search-field" style={styles.field}>
            <label htmlFor="budget" style={styles.label}>Budget</label>
            <select id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} style={styles.select}>
              <option value="">Select...</option>
              <option value="200k">Under $200K</option>
              <option value="300k">Under $300K</option>
              <option value="400k">Under $400K</option>
              <option value="500k">Under $500K</option>
              <option value="750k">Under $750K</option>
              <option value="1m">Under $1M</option>
            </select>
          </div>

          <button type="submit" className="btn-press search-btn" style={styles.searchBtn} aria-label="Search properties">
            Search
          </button>

        </form>
      </div>
    </section>
  );
}

const styles = {
  section: { background: '#fff', padding: '24px 0', borderBottom: '1px solid #eee' },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },
  field: {
    flex: 1,
    padding: '10px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },
  label: {
    fontSize: 10,
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  select: {
    border: 'none',
    outline: 'none',
    fontSize: 13,
    color: '#333',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'inherit',
    fontWeight: 500,
    appearance: 'none',
    WebkitAppearance: 'none',
    width: '100%',
  },
  divider: {
    width: 1,
    height: 36,
    background: '#d0d5dd',
    flexShrink: 0,
    alignSelf: 'center',
  },
  searchBtn: {
    background: '#1a56db',
    color: '#fff',
    border: 'none',
    padding: '0 28px',
    height: 56,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background 0.2s',
  },
};
