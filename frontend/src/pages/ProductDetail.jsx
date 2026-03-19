import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.qty += qty;
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', background: '#faf8f5' }}>
      <div className="spinner-border" style={{ color: '#c9a96e', borderWidth: '2px' }} />
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        body { background: #faf8f5 !important; }
        .label-text { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.3em; color: #c9a96e; text-transform: uppercase; }
        .product-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; color: #1a1a1a; }
        .product-price { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: #1a1a1a; }
        .qty-btn {
          width: 40px; height: 40px; background: #fff;
          border: 1px solid #ddd; cursor: pointer; font-size: 18px;
          color: #1a1a1a; transition: all 0.2s; display: flex; align-items: center; justify-content: center;
        }
        .qty-btn:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .add-btn {
          background: #1a1a1a; color: #fff; border: none;
          padding: 15px; width: 100%; font-family: 'DM Sans', sans-serif;
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          transition: background 0.3s ease; cursor: pointer;
        }
        .add-btn:hover { background: #c9a96e; }
        .add-btn.success { background: #c9a96e; }
        .back-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          letter-spacing: 0.12em; color: #888; text-transform: uppercase; padding: 0;
        }
        .back-btn:hover { color: #1a1a1a; }
      `}</style>

      <div style={{ background: '#faf8f5', minHeight: '100vh', paddingTop: '80px' }}>
        <div className="container py-5">
          <button className="back-btn mb-5" onClick={() => navigate(-1)}>← 返回</button>

          <div className="row g-5 align-items-start">
            {/* Image */}
            <div className="col-md-6">
              <div style={{
                aspectRatio: '3/4', background: '#f0ece6', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {product.image
                  ? <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: '80px', opacity: 0.2 }}>◻</span>
                }
              </div>
            </div>

            {/* Info */}
            <div className="col-md-6 pt-md-4">
              <p className="label-text mb-3">{product.category_name}</p>
              <h1 className="product-title mb-3" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.2 }}>
                {product.name}
              </h1>
              <p className="product-price mb-2">NT$ {Number(product.price).toLocaleString()}</p>
              <p className="mb-4" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                color: product.stock > 0 ? '#aaa' : '#e74c3c', letterSpacing: '0.05em',
              }}>
                {product.stock > 0 ? `庫存剩 ${product.stock} 件` : '目前售完'}
              </p>

              <hr style={{ borderColor: '#e8e4de', margin: '28px 0' }} />

              {/* Qty */}
              <p className="label-text mb-2">數量</p>
              <div className="d-flex align-items-center mb-4" style={{ gap: 0 }}>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <div style={{
                  width: '48px', textAlign: 'center',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '15px',
                  borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd',
                  height: '40px', lineHeight: '40px',
                }}>{qty}</div>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>

              <button
                className={`add-btn ${added ? 'success' : ''}`}
                onClick={addToCart}
                disabled={product.stock === 0}
              >
                {added ? '✓ 已加入購物車' : '加入購物車'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}