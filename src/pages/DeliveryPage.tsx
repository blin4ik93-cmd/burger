import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Clock, ShieldCheck, CreditCard, Thermometer, MapPin, PackageCheck } from 'lucide-react';

export const DeliveryPage: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '50px' }}>
      
      {/* Title Header */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
        <span className="badge-flame" style={{ marginBottom: '8px' }}>
          <Bike size={16} /> Доставка Burger King
        </span>
        <h1 style={{ fontSize: '2.6rem', color: 'var(--bk-brown)', marginBottom: '12px' }}>
          Горячие бургеры у вашей двери
        </h1>
        <p style={{ color: 'var(--bk-gray)', fontSize: '1.05rem', lineHeight: '1.5' }}>
          Доставляем заказы прямо с огня в специальных термосумках за 30-35 минут. Без потери хрустящей корочки картошки и нежности расплавленного чеддера!
        </p>
      </div>

      {/* Conditions Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px'
      }}>
        {[
          {
            icon: <Clock size={32} color="var(--bk-red)" />,
            title: 'Скорость: 30-35 минут',
            desc: 'Наши курьеры на электровелосипедах и скутерах объезжают любые пробки, доставляя блюда горячими.'
          },
          {
            icon: <PackageCheck size={32} color="var(--bk-green)" />,
            title: 'Бесплатно от 800 ₽',
            desc: 'При сумме заказа от 800 ₽ доставка абсолютно бесплатна. При заказе до 800 ₽ — всего 149 ₽.'
          },
          {
            icon: <Thermometer size={32} color="var(--bk-orange)" />,
            title: 'Термосумки 70°C',
            desc: 'Специальная изоляция и раздельные отсеки для горячего и холодных напитков.'
          },
          {
            icon: <CreditCard size={32} color="var(--bk-brown)" />,
            title: 'Любые способы оплаты',
            desc: 'Оплата картой курьеру при получении, онлайн через СБП или наличными с выдачей сдачи.'
          }
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#fff',
              padding: '30px 24px',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--bk-gray-border)',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--bk-cream-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--bk-brown)', marginBottom: '8px' }}>
              {item.title}
            </h3>
            <p style={{ color: 'var(--bk-gray)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Delivery Zone Card */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-lg)',
        border: '2px solid var(--bk-gray-border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
      }}>
        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="badge-flame" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
            Зона обслуживания
          </span>
          <h2 style={{ fontSize: '2rem', color: 'var(--bk-brown)', marginBottom: '16px' }}>
            Доставка по всей Москве и МО
          </h2>
          <p style={{ color: 'var(--bk-gray)', lineHeight: '1.6', marginBottom: '24px' }}>
            Более 120 ресторанов в Москве обеспечивают плотное покрытие. Мы автоматически отправляем ваш заказ в ближайший ресторан с открытым грилем для максимально быстрой выдачи курьеру.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/menu" className="btn-bk-primary">
              Собрать заказ в меню
            </Link>
            <Link to="/restaurants" className="btn-bk-outline">
              Найти ближайший ресторан
            </Link>
          </div>
        </div>

        <div style={{ minHeight: '320px', backgroundColor: 'var(--bk-cream)', position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80"
            alt="Курьер Бургер Кинг"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};
