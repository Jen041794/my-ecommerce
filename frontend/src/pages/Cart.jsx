import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(saved);
    }, []);

    const updateQty = (id, delta) => {
        const updated = cart.map(item => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
        setCart(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const remove = id => {
        const updated = cart.filter(item => item.id !== id);
        setCart(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div style={styles.container}>
            <h1>購物車</h1>
            {cart.length === 0 ? (
                <div style={styles.empty}>
                    <p>購物車是空的</p>
                    <Link to='/' style={styles.link}>
                        去逛逛商品
                    </Link>
                </div>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.id} style={styles.row}>
                            <div style={styles.imgBox}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} style={styles.img} />
                                ) : (
                                    <span style={{ fontSize: '32px' }}>🛍️</span>
                                )}
                            </div>
                            <div style={styles.info}>
                                <p style={styles.name}>{item.name}</p>
                                <p style={styles.price}>NT$ {item.price}</p>
                            </div>
                            <div style={styles.qty}>
                                <button onClick={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
                                    −
                                </button>
                                <span style={styles.qtyNum}>{item.qty}</span>
                                <button onClick={() => updateQty(item.id, +1)} style={styles.qtyBtn}>
                                    ＋
                                </button>
                            </div>
                            <p style={styles.subtotal}>NT$ {item.price * item.qty}</p>
                            <button onClick={() => remove(item.id)} style={styles.removeBtn}>
                                ✕
                            </button>
                        </div>
                    ))}
                    <div style={styles.footer}>
                        <p style={styles.total}>總計：NT$ {total}</p>
                        <button style={styles.checkoutBtn}>前往結帳</button>
                    </div>
                </>
            )}
        </div>
    );
}

const styles = {
    container: { padding: '32px', maxWidth: '800px', margin: '0 auto' },
    empty: { textAlign: 'center', padding: '64px', color: '#888' },
    link: { color: '#e74c3c', fontSize: '16px' },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    },
    imgBox: {
        width: '64px',
        height: '64px',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    info: { flex: 1 },
    name: { margin: '0 0 4px', fontWeight: 'bold' },
    price: { margin: 0, color: '#888', fontSize: '14px' },
    qty: { display: 'flex', alignItems: 'center', gap: '12px' },
    qtyBtn: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '1px solid #ddd',
        background: 'white',
        cursor: 'pointer',
        fontSize: '16px',
    },
    qtyNum: { fontSize: '16px', minWidth: '20px', textAlign: 'center' },
    subtotal: { fontWeight: 'bold', minWidth: '80px', textAlign: 'right' },
    removeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '16px' },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '24px',
        padding: '24px',
        background: 'white',
        borderRadius: '12px',
    },
    total: { fontSize: '20px', fontWeight: 'bold', margin: 0 },
    checkoutBtn: {
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '14px 32px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};
