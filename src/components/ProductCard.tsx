import React from 'react';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setPreviewProduct } = useCart();

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1.5px solid var(--bk-gray-border)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
        position: 'relative'
      }}
      className="product-card"
    >
      {/* Product Badges */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        zIndex: 2
      }}>
        {product.isFlameGrilled && (
          <span className="badge-flame">
            <Flame size={12} /> На огне
          </span>
        )}
        {product.isHit && !product.isFlameGrilled && (
          <span className="badge-yellow">
            <Sparkles size={12} /> Хит
          </span>
        )}
        {product.isNew && (
          <span className="badge-new">
            Новинка
          </span>
        )}
      </div>

      {/* Product Image Clickable to Preview */}
      <div
        onClick={() => setPreviewProduct(product)}
        style={{
          width: '100%',
          height: '210px',
          overflow: 'hidden',
          backgroundColor: 'var(--bk-cream)',
          position: 'relative',
          cursor: 'pointer'
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.35s ease'
          }}
          className="product-img"
        />
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: 'rgba(44, 20, 12, 0.75)',
          color: '#fff',
          fontSize: '0.72rem',
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)'
        }}>
          {product.weightGrams} г · {product.calories} ккал
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3
          onClick={() => setPreviewProduct(product)}
          style={{
            fontSize: '1.2rem',
            color: 'var(--bk-brown)',
            marginBottom: '6px',
            cursor: 'pointer',
            lineHeight: 1.2
          }}
        >
          {product.name}
        </h3>
        
        <p style={{
          color: 'var(--bk-gray)',
          fontSize: '0.85rem',
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.35',
          flexGrow: 1
        }}>
          {product.description}
        </p>

        {/* Price & Action Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid var(--bk-gray-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              color: 'var(--bk-brown)',
              fontWeight: 900
            }}>
              {product.price} ₽
            </span>
            {product.oldPrice && (
              <span style={{
                fontSize: '0.88rem',
                color: 'var(--bk-gray)',
                textDecoration: 'line-through'
              }}>
                {product.oldPrice} ₽
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="btn-bk-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-full)'
            }}
            aria-label={`Добавить ${product.name} в корзину`}
          >
            <Plus size={16} />
            <span>В корзину</span>
          </button>
        </div>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--bk-orange);
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
