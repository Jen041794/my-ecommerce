import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/products/?status=on')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        body { background: #faf8f5 !important; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; color: #1a1a1a; }
        .label-text { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.3em; color: #c9a96e; text-transform: uppercase; }
        .search-input {
          border: 1px solid #e0dbd3; border-radius: 0;
          background: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 13px; padding: 10px 16px;
        }
        .search-input:focus { border-color: #c9a96e; box-shadow: none; outline: none; }
        .product-card {
          border: none; border-radius: 0; overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          background: #fff; cursor: pointer;
        }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.09); }
        .product-img-wrap { overflow: hidden; background: #f0ece6; aspect-ratio: 3/4; }
        .product-img-wrap img { transition: transform 0.5s ease; width: 100%; height: 100%; object-fit: cover; }
        .product-card:hover .product-img-wrap img { transform: scale(1.04); }
        .card-category { font-family: 'DM Sans', sans-serif; font-size: 10px; letter-spacing: 0.2em; color: #c9a96e; text-transform: uppercase; }
        .card-title { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 400; color: #1a1a1a; }
        .card-price { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #1a1a1a; }
        .card-stock { font-family: 'DM Sans', sans-serif; font-size: 11px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.55s ease forwards; opacity: 0; }
      `}</style>

      <div style={{ background: '#faf8f5', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Hero */}
        <div className="border-bottom py-5 mb-4" style={{ borderColor: 'rgba(201,169,110,0.2) !important' }}>
          <div className="container py-3">
            <p className="label-text mb-3">New Collection</p>
            <div className="row align-items-end">
              <div className="col-md-6">
                <h1 className="hero-title" style={{ fontSize: 'clamp(42px, 6vw, 72px)', lineHeight: 1.1 }}>
                  精選商品
                </h1>
              </div>
              <div className="col-md-4 ms-auto mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="搜尋商品或分類..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="container pb-5">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
              <div className="spinner-border" style={{ color: '#c9a96e', width: '28px', height: '28px', borderWidth: '2px' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#999', fontStyle: 'italic' }}>
                找不到相關商品
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map((product, i) => (
                <div key={product.id} className="col-6 col-md-4 col-lg-3 fade-up"
                  style={{ animationDelay: `${i * 0.07}s` }}>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="product-card h-100">
                      <div className="product-img-wrap">
                        {product.image
                          ? <img src={product.image} alt={product.name} />
                          : <div className="d-flex align-items-center justify-content-center h-100">
                              <span style={{ fontSize: '48px', opacity: 0.2 }}>◻</span>
                            </div>
                        }
                      </div>
                      <div className="p-3">
                        <p className="card-category mb-1">{product.category_name}</p>
                        <h3 className="card-title mb-2">{product.name}</h3>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="card-price">NT$ {Number(product.price).toLocaleString()}</span>
                          <span className="card-stock" style={{ color: product.stock > 0 ? '#aaa' : '#e74c3c' }}>
                            {product.stock > 0 ? `剩 ${product.stock}` : '售完'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}