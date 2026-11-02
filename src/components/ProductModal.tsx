import React from 'react';
import { X, Flame, ShieldAlert, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal: React.FC = () => {
  const { previewProduct, setPreviewProduct, addToCart } = useCart();

  if (!previewProduct) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(44, 20, 12, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={() => setPreviewProduct(null)}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '640px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setPreviewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: 'var(--shadow-sm)'
          }}
          aria-label="Закрыть"
        >
          <X size={20} color="var(--bk-brown)" />
        </button>

        {/* Hero image in modal */}
        <div style={{ position: 'relative', height: '260px', backgroundColor: 'var(--bk-cream)' }}>
          <img
            src={previewProduct.imageUrl}
            alt={previewProduct.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {previewProduct.isFlameGrilled && (
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              backgroundColor: 'var(--bk-red)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}>
              <Flame size={16} /> Обжарено на живом огне с 1954 г.
            </div>
          )}
        </div>

        {/* Scrollable details */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--bk-brown)' }}>
              {previewProduct.name}
            </h2>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--bk-red)' }}>
                {previewProduct.price} ₽
              </div>
              {previewProduct.oldPrice && (
                <div style={{ textDecoration: 'line-through', color: 'var(--bk-gray)', fontSize: '0.9rem' }}>
                  {previewProduct.oldPrice} ₽
                </div>
              )}
            </div>
          </div>

          <p style={{ color: 'var(--bk-gray)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>
            {previewProduct.description}
          </p>

          {/* Nutrition info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            backgroundColor: 'var(--bk-cream-light)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--bk-gray)', textTransform: 'uppercase', fontWeight: 700 }}>Вес блюда</span>
              <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{previewProduct.weightGrams} грамм</p>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--bk-gray)', textTransform: 'uppercase', fontWeight: 700 }}>Энерг. ценность</span>
              <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{previewProduct.calories} ккал</p>
            </div>
          </div>

          {/* Ingredients list */}
          {previewProduct.ingredients && previewProduct.ingredients.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--bk-brown)', marginBottom: '8px', fontWeight: 800 }}>
                Ингредиенты рецептуры:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {previewProduct.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid var(--bk-gray-border)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Check size={12} color="var(--bk-green)" /> {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens warning */}
          {previewProduct.allergens && previewProduct.allergens.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--bk-gray)',
              fontSize: '0.82rem',
              backgroundColor: 'var(--bk-gray-light)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)'
            }}>
              <ShieldAlert size={16} color="var(--bk-orange)" />
              <span>Содержит аллергены: {previewProduct.allergens.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--bk-gray-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--bk-gray)' }}>Итого за 1 порцию</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--bk-brown)' }}>
              {previewProduct.price} ₽
            </div>
          </div>
          <button
            type="button"
            className="btn-bk-primary"
            onClick={() => {
              addToCart(previewProduct);
              setPreviewProduct(null);
            }}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};
