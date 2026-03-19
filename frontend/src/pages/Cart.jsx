import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const updateQty = (id, delta) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const remove = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');
        body { background: #faf8f5 !important; }
        .label-text { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.3em; color: #c9a96e; text-transform: uppercase; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; color: #1a1a1a; }
        .qty-btn {
          width: 34px; height: 34px; background: #fff; border: 1px solid #e0dbd3;
          font-size: 16px; cursor: pointer; color: #1a1a1a; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .qty-btn:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .remove-btn { background: none; border: none; cursor: pointer; color: #ccc; font-size: 20px; line-height: 1; transition: color 0.2s; padding: 0; }
        .remove-btn:hover { color: #1a1a1a; }
        .checkout-btn {
          background: #1a1a1a; color: #fff; border: none; width: 100%;
          padding: 15px; font-family: 'DM Sans', sans-serif;
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          transition: background 0.3s; cursor: pointer;
        }
        .checkout-btn:hover { background: #c9a96e; }
        .cart-item { border-bottom: 1px solid #e8e4de; transition: background 0.2s; }
        .cart-item:hover { background: rgba(201,169,110,0.03); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; opacity: 0; }
      `}</style>

      <div style={{ background: '#faf8f5', minHeight: '100vh', paddingTop: '80px' }}>
        <div className="container py-5">

          {/* Header */}
          <div className="pb-4 mb-5" style={{ borderBottom: '1px solid rgba(201,169,110,0.3)' }}>
            <p className="label-text mb-2">Your Selection</p>
            <h1 className="page-title" style={{ fontSize: 'clamp(40px, 6vw, 60px)' }}>
              購物車
              {cart.length > 0 && (
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#aaa', marginLeft: '16px', fontWeight: 300 }}>
                  {totalQty} 件
                </span>
              )}
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-5">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#bbb', fontStyle: 'italic', marginBottom: '24px' }}>
                購物車是空的
              </p>
              <Link to="/" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                letterSpacing: '0.2em', color: '#1a1a1a', textTransform: 'uppercase',
                borderBottom: '1px solid #1a1a1a', paddingBottom: '2px', textDecoration: 'none',
              }}>繼續選購</Link>
            </div>
          ) : (
            <div className="row g-5">

              {/* Cart Items */}
              <div className="col-lg-7">
                {cart.map((item, i) => (
                  <div key={item.id} className="cart-item fade-up d-flex gap-3 py-4"
                    style={{ animationDelay: `${i * 0.08}s` }}>
                    {/* Image */}
                    <div style={{
                      width: '90px', height: '110px', background: '#f0ece6',
                      flexShrink: 0, overflow: 'hidden',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.image
                        ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ opacity: 0.2, fontSize: '28px' }}>◻</span>
                      }
                    </div>

                    {/* Info */}
                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '19px', fontWeight: 400, color: '#1a1a1a', marginBottom: '4px' }}>
                          {item.name}
                        </h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#aaa', margin: 0 }}>
                          NT$ {Number(item.price).toLocaleString()}
                        </p>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                          <div style={{
                            width: '40px', textAlign: 'center',
                            fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                            borderTop: '1px solid #e0dbd3', borderBottom: '1px solid #e0dbd3',
                            height: '34px', lineHeight: '34px',
                          }}>{item.qty}</div>
                          <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500, color: '#1a1a1a' }}>
                            NT$ {(Number(item.price) * item.qty).toLocaleString()}
                          </span>
                          <button className="remove-btn" onClick={() => remove(item.id)}>×</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="col-lg-4 offset-lg-1">
                <div className="p-4" style={{ background: '#fff', border: '1px solid #e8e4de', position: 'sticky', top: '100px' }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, color: '#1a1a1a', marginBottom: '24px' }}>
                    訂單摘要
                  </h2>

                  <div style={{ borderTop: '1px solid #e8e4de', paddingTop: '20px' }}>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888' }}>
                        小計（{totalQty} 件）
                      </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#1a1a1a' }}>
                        NT$ {total.toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888' }}>運費</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#c9a96e' }}>免費</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-baseline mb-4"
                      style={{ borderTop: '1px solid #e8e4de', paddingTop: '20px' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: '#1a1a1a' }}>總計</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a' }}>
                        NT$ {total.toLocaleString()}
                      </span>
                    </div>

                    <button className="checkout-btn mb-3">前往結帳</button>

                    <Link to="/" style={{
                      display: 'block', textAlign: 'center',
                      fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                      letterSpacing: '0.15em', color: '#888', textTransform: 'uppercase', textDecoration: 'none',
                    }}>← 繼續選購</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}