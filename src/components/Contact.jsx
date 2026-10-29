import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useWindowWidth } from '../hooks/useWindowWidth';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', buyingSelling: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const width = useWindowWidth();
  const isMobile = width <= 768;

  const [infoRef, infoVisible] = useInView(0.15);
  const [formRef, formVisible] = useInView(0.15);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const inputStyle = (name) => ({
    ...styles.input,
    borderColor: focused === name ? '#1a56db' : 'rgba(255,255,255,0.15)',
    boxShadow: focused === name ? '0 0 0 3px rgba(26,86,219,0.25)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  return (
    <section id="contact" style={styles.section} aria-labelledby="contact-heading">
      <div style={{
        ...styles.inner,
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 40 : 64,
        padding: isMobile ? '0 20px' : '0 24px',
      }}>
        {/* Left — info */}
        <div
          ref={infoRef}
          className={infoVisible ? 'anim-fade-left' : 'anim-hidden'}
          style={styles.info}
        >
          <p style={styles.eyebrow}>Contact</p>
          <h2 style={styles.heading} id="contact-heading">Ready when you are.</h2>
          <p style={styles.subtext}>
            Tell us a little about your plans and we'll get back to you quickly.
            Prefer to call? We're available too.
          </p>
          <div style={styles.agentCard}>
            <p style={styles.agentName}>Marci Metzger · The Ridge Realty Group</p>
            <address style={styles.address}>
              3332 S. Lake Judith J.<br />
              Reno, Nevada 89520
            </address>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon} aria-hidden="true">📞</span>
            <a href="tel:7756195886" style={styles.contactLink}>(775) 619–5886</a>
          </div>
          <div style={styles.hoursBlock}>
            <p style={styles.hoursTitle}>Office Hours</p>
            <p style={styles.hoursText}>Open daily, 9:00 am–7:00 pm</p>
            <p style={styles.hoursText}>Appointments outside of hours available, just call.</p>
          </div>
          <a href="tel:7756195886" className="btn-press" style={styles.callBtn}>Call now →</a>
        </div>

        {/* Right — form */}
        <div
          ref={formRef}
          className={formVisible ? 'anim-fade-right' : 'anim-hidden'}
          style={styles.formWrap}
        >
          {submitted ? (
            <div style={styles.successMsg} role="alert">
              <p style={styles.successText}>✅ Thanks! We'll be in touch soon.</p>
            </div>
          ) : (
            <form style={styles.form} onSubmit={handleSubmit} aria-label="Contact form">
              {[
                { id: 'name',          label: 'Name',        type: 'text',  placeholder: 'Your full name',   autocomplete: 'name' },
                { id: 'email',         label: 'Email',       type: 'email', placeholder: 'your@email.com',   autocomplete: 'email' },
                { id: 'phone',         label: 'Phone',       type: 'tel',   placeholder: '(775) 000-0000',   autocomplete: 'tel' },
              ].map(({ id, label, type, placeholder, autocomplete }) => (
                <div key={id} style={styles.formField}>
                  <label htmlFor={id} style={styles.label}>{label}</label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required={id !== 'phone'}
                    value={form[id]}
                    onChange={handleChange}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    style={inputStyle(id)}
                    placeholder={placeholder}
                    autoComplete={autocomplete}
                  />
                </div>
              ))}

              <div style={styles.formField}>
                <label htmlFor="buyingSelling" style={styles.label}>I'm looking to…</label>
                <select
                  id="buyingSelling"
                  name="buyingSelling"
                  value={form.buyingSelling}
                  onChange={handleChange}
                  onFocus={() => setFocused('buyingSelling')}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputStyle('buyingSelling'),
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    // Solid background so native dropdown options are readable
                    background: '#1e2d5a',
                    color: form.buyingSelling === '' ? 'rgba(255,255,255,0.45)' : '#fff',
                  }}
                >
                  <option value=""    style={{ background: '#1e2d5a', color: '#fff' }}>Select an option</option>
                  <option value="buy" style={{ background: '#1e2d5a', color: '#fff' }}>Buy a home</option>
                  <option value="sell" style={{ background: '#1e2d5a', color: '#fff' }}>Sell a home</option>
                  <option value="invest" style={{ background: '#1e2d5a', color: '#fff' }}>Invest in real estate</option>
                  <option value="other" style={{ background: '#1e2d5a', color: '#fff' }}>Other</option>
                </select>
              </div>

              <div style={styles.formField}>
                <label htmlFor="message" style={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('message'), height: 100, resize: 'vertical' }}
                  placeholder="Tell us about your real estate goals…"
                  rows={4}
                />
              </div>

              <p style={styles.disclaimer}>
                By submitting you agree to our privacy policy and consent to be contacted by our team.
              </p>
              <button type="submit" className="btn-press" style={styles.submitBtn}>
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { background: '#0f1a3d', padding: '64px 0' },
  inner: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64,
    alignItems: 'flex-start',
  },
  info: { color: '#fff' },
  eyebrow: {
    fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  heading: { fontSize: 30, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.2 },
  subtext: { fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 28 },
  agentCard: { marginBottom: 20 },
  agentName: { fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 },
  address: { fontSize: 13, color: 'rgba(255,255,255,0.65)', fontStyle: 'normal', lineHeight: 1.7 },
  contactItem: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 },
  contactIcon: { fontSize: 16 },
  contactLink: { fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' },
  hoursBlock: { marginBottom: 24 },
  hoursTitle: { fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 },
  hoursText: { fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 },
  callBtn: {
    display: 'inline-block',
    background: 'transparent',
    color: '#fff',
    border: '1.5px solid rgba(255,255,255,0.5)',
    borderRadius: 4,
    padding: '9px 20px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  formWrap: {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '28px 28px 24px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  formField: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.2 },
  input: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 5,
    padding: '10px 12px',
    fontSize: 13,
    color: '#fff',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
  },
  disclaimer: { fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 },
  submitBtn: {
    background: '#1a56db',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    padding: '12px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.2s',
  },
  successMsg: { padding: '40px 0', textAlign: 'center' },
  successText: { fontSize: 16, color: '#fff', fontWeight: 600 },
};
