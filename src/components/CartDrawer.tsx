import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Bike, Store, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    finalTotal,
    remainingForFreeDelivery,
    freeDeliveryThreshold,
    promoCode,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    orderMode,
    setOrderMode,
    setIsCheckoutOpen
  } = useCart();

  const [inputCode, setInputCode] = useState(promoCode);

  if (!isCartOpen) return null;

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(44, 20, 12, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          backgroundColor: 'var(--bk-cream)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '2px solid var(--bk-gray-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="var(--bk-red)" />
            <h2 style={{ fontSize: '1.4rem', color: 'var(--bk-brown)' }}>
              Ваш заказ
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            style={{ padding: '6px', color: 'var(--bk-brown)' }}
            aria-label="Закрыть корзину"
          >
            <X size={24} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {orderMode === 'delivery' && (
          <div style={{
            padding: '12px 20px',
            backgroundColor: 'var(--bk-cream-light)',
            borderBottom: '1px solid var(--bk-gray-border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
              <span>
                {remainingForFreeDelivery > 0
                  ? `До бесплатной доставки ещё ${remainingForFreeDelivery} ₽`
                  : '🔥 Бесплатная доставка активна!'}
              </span>
              <span>{freeDeliveryProgress}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--bk-gray-border)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${freeDeliveryProgress}%`,
                height: '100%',
                backgroundColor: remainingForFreeDelivery === 0 ? 'var(--bk-green)' : 'var(--bk-orange)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {/* Cart items list or empty state */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
          {cart.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: 'var(--bk-gray)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--bk-cream-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <ShoppingBag size={40} color="var(--bk-brown)" opacity={0.5} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--bk-brown)', marginBottom: '8px' }}>
                В корзине пока пусто
              </h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '280px', marginBottom: '20px' }}>
                Добавьте легендарный Воппер, хрустящую Кинг Фри или аппетитное комбо!
              </p>
              <button
                type="button"
                className="btn-bk-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Перейти в меню
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#fff',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--bk-gray-border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: '0.95rem',
                      color: 'var(--bk-brown)',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.product.name}
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--bk-red)', fontWeight: 800 }}>
                      {item.product.price} ₽
                    </div>

                    {/* Quantity controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '6px'
                    }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--bk-cream-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--bk-gray-border)'
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--bk-cream-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--bk-gray-border)'
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 900, fontSize: '1rem', color: 'var(--bk-brown)' }}>
                      {item.product.price * item.quantity} ₽
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      style={{ color: 'var(--bk-gray)', marginTop: '6px', padding: '4px' }}
                      title="Удалить позицию"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                style={{
                  alignSelf: 'flex-start',
                  fontSize: '0.82rem',
                  color: 'var(--bk-gray)',
                  textDecoration: 'underline',
                  marginTop: '8px'
                }}
              >
                Очистить всю корзину
              </button>
            </div>
          )}
        </div>

        {/* Footer breakdown & checkout trigger */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px',
            backgroundColor: '#fff',
            borderTop: '2px solid var(--bk-gray-border)'
          }}>
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Промокод (KING2026, OGON)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  style={{
                    flexGrow: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--bk-gray-border)',
                    fontSize: '0.88rem',
                    textTransform: 'uppercase',
                    fontWeight: 700
                  }}
                />
                <button
                  type="submit"
                  className="btn-bk-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Ввести
                </button>
              </div>

              {promoError && (
                <div style={{ color: 'var(--bk-red)', fontSize: '0.78rem', marginTop: '6px' }}>
                  {promoError}
                </div>
              )}

              {appliedPromo && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(0, 135, 61, 0.1)',
                  color: 'var(--bk-green)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  marginTop: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={14} />
                    <span>Промокод {appliedPromo.code} (-{appliedPromo.discountPercent}%)</span>
                  </div>
                  <button type="button" onClick={removePromoCode} style={{ color: 'var(--bk-red)', fontWeight: 800 }}>
                    ×
                  </button>
                </div>
              )}
            </form>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--bk-gray)' }}>Сумма товаров:</span>
                <span style={{ fontWeight: 700 }}>{subtotal} ₽</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--bk-green)' }}>
                  <span>Скидка по купону:</span>
                  <span style={{ fontWeight: 700 }}>-{discount} ₽</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--bk-gray)' }}>Доставка:</span>
                <span style={{ fontWeight: 700 }}>
                  {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 900,
                color: 'var(--bk-brown)',
                borderTop: '1px dashed var(--bk-gray-border)',
                paddingTop: '8px'
              }}>
                <span>Итого к оплате:</span>
                <span style={{ color: 'var(--bk-red)' }}>{finalTotal} ₽</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-bk-primary"
              style={{ width: '100%', padding: '16px' }}
              onClick={handleProceedToCheckout}
            >
              <span>Оформить заказ</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
