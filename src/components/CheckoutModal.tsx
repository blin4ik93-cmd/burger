import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Banknote, QrCode, Bike, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { OrderCheckoutData } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    finalTotal,
    cart,
    submitOrder,
    lastOrder,
    orderMode
  } = useCart();

  const [formData, setFormData] = useState<OrderCheckoutData>({
    name: '',
    phone: '',
    address: '',
    comment: '',
    paymentMethod: 'card_courier',
    cutleryNeeded: true
  });

  const [isSuccessView, setIsSuccessView] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || (!formData.address.trim() && orderMode === 'delivery')) {
      alert('Пожалуйста, заполните обязательные поля: имя, телефон и адрес');
      return;
    }

    const orderId = submitOrder(formData);
    setConfirmedOrderId(orderId);
    setIsSuccessView(true);

    // Blast celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D62300', '#ED7700', '#F5A623', '#502314']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccessView(false);
  };

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
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '560px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--bk-gray-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--bk-brown)' }}>
            {isSuccessView ? 'Заказ успешно принят!' : 'Оформление доставки'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            style={{ color: 'var(--bk-brown)', padding: '4px' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flexGrow: 1 }}>
          {isSuccessView ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 135, 61, 0.12)',
                color: 'var(--bk-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle2 size={48} />
              </div>

              <span className="badge-flame" style={{ marginBottom: '12px' }}>
                <Flame size={14} /> Гриль уже разжигается!
              </span>

              <h3 style={{ fontSize: '1.6rem', color: 'var(--bk-brown)', marginBottom: '8px' }}>
                Номер заказа: <span style={{ color: 'var(--bk-red)' }}>#{confirmedOrderId}</span>
              </h3>

              <p style={{ color: 'var(--bk-gray)', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '420px', margin: '0 auto 24px' }}>
                Спасибо за заказ! Мы уже отправляем котлеты из 100% говядины на открытый огонь. Курьер привезет заказ горячим примерно за 30-35 минут.
              </p>

              {lastOrder && (
                <div style={{
                  backgroundColor: 'var(--bk-cream)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  marginBottom: '24px'
                }}>
                  <div style={{ fontWeight: 800, marginBottom: '8px', color: 'var(--bk-brown)' }}>
                    Детали доставки:
                  </div>
                  <div><strong>Получатель:</strong> {lastOrder.data.name} ({lastOrder.data.phone})</div>
                  <div><strong>Адрес:</strong> {lastOrder.data.address || 'Самовывоз из ресторана'}</div>
                  <div><strong>Сумма к оплате:</strong> {lastOrder.total} ₽</div>
                  {lastOrder.data.comment && (
                    <div style={{ marginTop: '4px', fontStyle: 'italic', color: 'var(--bk-gray)' }}>
                      «{lastOrder.data.comment}»
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                className="btn-bk-primary"
                onClick={handleClose}
                style={{ width: '100%', padding: '14px' }}
              >
                Отлично, жду бургеры!
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Order total header banner */}
              <div style={{
                backgroundColor: 'var(--bk-cream)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Итоговый чек:</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--bk-red)' }}>
                  {finalTotal} ₽
                </span>
              </div>

              {/* Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например, Александр"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--bk-gray-border)',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--bk-gray-border)',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>
                  {orderMode === 'delivery' ? 'Адрес доставки (улица, дом, кв) *' : 'Адрес / комментарий к ресторану'}
                </label>
                <input
                  type="text"
                  required={orderMode === 'delivery'}
                  placeholder={orderMode === 'delivery' ? 'ул. Арбат, д. 15, кв. 42' : 'Укажите удобное время или ресторан'}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--bk-gray-border)',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              {/* Comment */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>
                  Комментарий к заказу (код домофона, этаж, пожелания)
                </label>
                <textarea
                  rows={2}
                  placeholder="Домофон 42, оставить у двери..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--bk-gray-border)',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Payment methods */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '8px' }}>
                  Способ оплаты
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {[
                    { id: 'card_courier', label: 'Картой курьеру', icon: <CreditCard size={16} /> },
                    { id: 'sbp', label: 'СБП / QR-код', icon: <QrCode size={16} /> },
                    { id: 'card_online', label: 'Онлайн оплата', icon: <CreditCard size={16} /> },
                    { id: 'cash', label: 'Наличными', icon: <Banknote size={16} /> },
                  ].map((method) => (
                    <label
                      key={method.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        border: formData.paymentMethod === method.id ? '2px solid var(--bk-red)' : '1px solid var(--bk-gray-border)',
                        backgroundColor: formData.paymentMethod === method.id ? 'rgba(214, 35, 0, 0.05)' : '#fff',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 700
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                      />
                      {method.icon}
                      <span>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cutlery checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.cutleryNeeded}
                  onChange={(e) => setFormData({ ...formData, cutleryNeeded: e.target.checked })}
                />
                <span>Положить бесплатные салфетки и приборы</span>
              </label>

              <button
                type="submit"
                className="btn-bk-primary"
                style={{ width: '100%', padding: '16px', marginTop: '10px' }}
              >
                Подтвердить и заказать ({finalTotal} ₽)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
