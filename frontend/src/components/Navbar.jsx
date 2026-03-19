import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
        .navbar-custom {
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s ease;
          padding: ${scrolled ? '10px 0' : '18px 0'};
          background: ${scrolled ? 'rgba(250,248,245,0.97)' : 'rgba(250,248,245,0.85)'} !important;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${scrolled ? 'rgba(201,169,110,0.25)' : 'transparent'};
        }
        .brand-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 300;
          letter-spacing: 0.15em; color: #1a1a1a !important;
          text-transform: uppercase;
        }
        .nav-link-custom {
          font-size: 12px; letter-spacing: 0.12em;
          color: #1a1a1a !important; text-transform: uppercase;
          position: relative; padding-bottom: 4px !important;
        }
        .nav-link-custom::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: #c9a96e;
          transition: width 0.3s ease;
        }
        .nav-link-custom:hover::after { width: 100%; }
        .nav-link-custom.active::after { width: 100%; }
      `}</style>

      <nav className={`navbar navbar-expand-md fixed-top navbar-custom`}>
        <div className="container">
          <Link className="navbar-brand brand-text" to="/">Maison</Link>

          <button className="navbar-toggler border-0" onClick={() => setMenuOpen(!menuOpen)}
            style={{ boxShadow: 'none' }}>
            <span style={{ fontSize: '20px' }}>{menuOpen ? '✕' : '☰'}</span>
          </button>

          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto gap-md-4">
              <li className="nav-item">
                <Link className={`nav-link nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
                  to="/" onClick={() => setMenuOpen(false)}>商品</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link nav-link-custom ${location.pathname === '/cart' ? 'active' : ''}`}
                  to="/cart" onClick={() => setMenuOpen(false)}>購物車</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}