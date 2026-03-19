import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}/`)
            .then(res => setProduct(res.data))
            .catch(() => navigate('/'));
    }, [id, navigate]);

    if (!product) return <p style={{ padding: 32 }}>載入中...</p>;

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find(i => i.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`已加入購物車：${product.name}`);
    };

    return (
        <div style={styles.container}>
            <button onClick={() => navigate(-1)} style={styles.back}>
                ← 返回
            </button>
            <div style={styles.card}>
                <div style={styles.imgBox}>
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <span style={{ fontSize: '80px' }}>🛍️</span>
                    )}
                </div>
                <div style={styles.info}>
                    <p style={styles.category}>{product.category_name}</p>
                    <h1 style={styles.name}>{product.name}</h1>
                    <p style={styles.price}>NT$ {product.price}</p>
                    <p style={styles.stock}>庫存剩 {product.stock} 件</p>
                    <button onClick={addToCart} style={styles.btn}>
                        加入購物車
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '32px', maxWidth: '800px', margin: '0 auto' },
    back: {
        background: 'none',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '8px 16px',
        cursor: 'pointer',
        marginBottom: '24px',
    },
    card: {
        display: 'flex',
        gap: '32px',
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    },
    imgBox: {
        background: '#f0f0f0',
        width: '300px',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '80px',
        flexShrink: 0,
    },
    info: { padding: '32px', flex: 1 },
    category: { color: '#888', margin: '0 0 8px' },
    name: { margin: '0 0 16px', fontSize: '28px' },
    price: { color: '#e74c3c', fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px' },
    stock: { color: '#666', margin: '0 0 24px' },
    btn: {
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '14px 32px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
    },
};
