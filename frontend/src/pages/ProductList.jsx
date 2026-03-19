import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/products/?status=on')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p style={{ padding: 32 }}>載入中...</p>;

    return (
        <div style={styles.container}>
            <h1>所有商品</h1>
            <div style={styles.grid}>
                {products.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id} style={styles.cardLink}>
                        <div style={styles.card}>
                            <div style={styles.imgBox}>
                                {product.image ? (
                                    <img src={product.image} alt={product.name} style={styles.img} />
                                ) : (
                                    <span style={{ fontSize: '48px' }}>🛍️</span>
                                )}
                            </div>
                            <div style={styles.info}>
                                <h3 style={styles.name}>{product.name}</h3>
                                <p style={styles.category}>{product.category_name}</p>
                                <p style={styles.price}>NT$ {product.price}</p>
                                <p style={styles.stock}>庫存：{product.stock}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '32px' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '24px',
        marginTop: '24px',
    },
    cardLink: { textDecoration: 'none', color: 'inherit' },
    card: {
        border: '1px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
        background: 'white',
    },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    imgBox: {
        background: '#f0f0f0',
        height: '140px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
    },
    info: { padding: '16px' },
    name: { margin: '0 0 4px', fontSize: '16px' },
    category: { color: '#888', fontSize: '13px', margin: '0 0 8px' },
    price: { color: '#e74c3c', fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px' },
    stock: { color: '#666', fontSize: '13px', margin: 0 },
};
