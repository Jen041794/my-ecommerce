import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🛒 我的商店</Link>
      <div>
        <Link to="/" style={styles.link}>商品</Link>
        <Link to="/cart" style={styles.link}>購物車</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 32px', background: '#1a1a2e', color: 'white',
  },
  brand: { color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' },
  link: { color: 'white', textDecoration: 'none', marginLeft: '24px', fontSize: '16px' },
};