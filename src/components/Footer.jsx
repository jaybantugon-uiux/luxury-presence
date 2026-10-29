import { useInView } from '../hooks/useInView';

/* ── SVG icon components ───────────────────────────────────── */

function IconFacebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function IconYelp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.76-.8-1.176-1.63l2.905-4.164a1.073 1.073 0 011.744.044 9.062 9.062 0 011.674 3.733 1.074 1.074 0 01-.152.584zm-7.75 3.311l1.6 4.87a1.074 1.074 0 01-.779 1.37 9.053 9.053 0 01-4.06-.05 1.073 1.073 0 01-.747-1.38l1.655-4.85a1.073 1.073 0 012.331.04zm-5.417-2.004L2.6 15.479a1.073 1.073 0 01-1.24-1.263 9.07 9.07 0 011.733-3.7 1.073 1.073 0 011.737-.07l3.026 4.087c.593.8-.162 1.894-1.113 1.368zm.518-6.15L3.375 5.64a1.073 1.073 0 01.114-1.51 9.07 9.07 0 013.5-1.986 1.074 1.074 0 011.31.92l.733 5.155c.141.99-.999 1.636-1.72.932zm6.608-.06l.687-5.162a1.074 1.074 0 011.318-.908 9.074 9.074 0 013.476 2.02 1.073 1.073 0 01.09 1.512l-3.18 3.986c-.624.782-1.853.33-1.715-.68z"/>
    </svg>
  );
}

/* ── Social links data ─────────────────────────────────────── */

const socialLinks = [
  { name: 'Facebook',  href: '#', Icon: IconFacebook  },
  { name: 'LinkedIn',  href: '#', Icon: IconLinkedIn  },
  { name: 'Instagram', href: '#', Icon: IconInstagram },
  { name: 'Yelp',      href: '#', Icon: IconYelp      },
];

/* ── Component ─────────────────────────────────────────────── */

export default function Footer() {
  const [ref, visible] = useInView(0.2);

  return (
    <footer
      ref={ref}
      className={visible ? 'anim-fade-up' : 'anim-hidden'}
      style={styles.footer}
      role="contentinfo"
    >
      <div className="footer-inner">

        {/* Left — name + disclosure */}
        <div style={styles.left}>
          <p style={styles.name}>
            <strong>Marci Metzger</strong>
            <span style={styles.dot}>&nbsp;•&nbsp;</span>
            The Ridge Realty Group
          </p>
          <p style={styles.disclosure}>[License and other identification disclosure]</p>
        </div>

        {/* Center — social icons */}
        <nav aria-label="Social media links" style={styles.center}>
          <ul style={styles.socialList}>
            {socialLinks.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  style={styles.socialLink}
                  aria-label={name}
                  rel="noopener noreferrer"
                  className="btn-press"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right — copyright */}
        <div className="footer-right" style={styles.right}>
          <p className="footer-copyright" style={styles.copyright}>
            Copyright &copy; 2026 Marci METZGER – All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
}

/* ── Styles ────────────────────────────────────────────────── */

const styles = {
  footer: {
    background: '#1a56db',
    padding: '20px 0',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 32px',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: 24,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: 400,
    color: '#fff',
    margin: 0,
  },
  dot: {
    opacity: 0.75,
  },
  disclosure: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    margin: 0,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  socialList: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    margin: 0,
    padding: 0,
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    opacity: 0.9,
    textDecoration: 'none',
    transition: 'opacity 0.2s, transform 0.2s',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  copyright: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    margin: 0,
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
};
