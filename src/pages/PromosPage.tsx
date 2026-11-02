import React from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Flame, Ticket, Tag } from 'lucide-react';
import { PROMOTIONS } from '../data/promos';
import { useCart } from '../context/CartContext';

export const PromosPage: React.FC = () => {
  const { applyPromoCode, setIsCartOpen, showToast } = useCart();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Купон ${code} скопирован в буфер! 🎟️`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleApplyAndOpenCart = (code: string) => {
    applyPromoCode(code);
    setIsCartOpen(true);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
        <span className="badge-flame" style={{ marginBottom: '8px' }}>
          <Flame size={14} /> Выгода на огне
        </span>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--bk-brown)', marginBottom: '10px' }}>
          Акции, купоны и скидки
        </h1>
        <p style={{ color: 'var(--bk-gray)', fontSize: '1rem' }}>
          Экономьте на любимых Вопперах, комбо-боксах и наггетсах. Скопируйте промокод или используйте в корзине в один клик.
        </p>
      </div>

      {/* Promos Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '30px'
      }}>
        {PROMOTIONS.map((promo) => (
          <div
            key={promo.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              border: '2px solid var(--bk-gray-border)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={promo.imageUrl}
                alt={promo.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge-flame" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                {promo.badge}
              </span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--bk-gray)', fontWeight: 700, marginBottom: '6px' }}>
                Действует: {promo.validUntil}
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--bk-brown)', marginBottom: '10px', lineHeight: '1.2' }}>
                {promo.title}
              </h3>
              <p style={{ color: 'var(--bk-gray)', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 }}>
                {promo.description}
              </p>

              {/* Coupon Code Block if present */}
              {promo.couponCode && (
                <div style={{
                  backgroundColor: 'var(--bk-cream-light)',
                  border: '2px dashed var(--bk-orange)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--bk-gray)' }}>
                      Код купона
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--bk-red)' }}>
                      {promo.couponCode}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(promo.couponCode!)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#fff',
                        border: '1px solid var(--bk-gray-border)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--bk-brown)'
                      }}
                    >
                      {copiedCode === promo.couponCode ? <Check size={14} color="var(--bk-green)" /> : <Copy size={14} />}
                      <span>{copiedCode === promo.couponCode ? 'Скопирован' : 'Копировать'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {promo.couponCode ? (
                  <button
                    type="button"
                    className="btn-bk-primary"
                    style={{ flexGrow: 1, padding: '12px', fontSize: '0.9rem' }}
                    onClick={() => handleApplyAndOpenCart(promo.couponCode!)}
                  >
                    Применить в корзине
                  </button>
                ) : (
                  <Link
                    to={promo.linkCategory ? `/menu?cat=${promo.linkCategory}` : '/menu'}
                    className="btn-bk-primary"
                    style={{ flexGrow: 1, padding: '12px', fontSize: '0.9rem' }}
                  >
                    {promo.buttonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
