import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Crown, Heart, Award, ShieldCheck, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      
      {/* Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <span className="badge-flame" style={{ marginBottom: '10px' }}>
          <Crown size={15} /> Легенда с 1954 года
        </span>
        <h1 style={{ fontSize: '2.8rem', color: 'var(--bk-brown)', marginBottom: '16px' }}>
          Вкус правит. Огонь решает.
        </h1>
        <p style={{ color: 'var(--bk-gray)', fontSize: '1.1rem', lineHeight: '1.6' }}>
          История Бургер Кинг началась более 70 лет назад в Майами. С тех пор наша страсть к приготовлению сочных бургеров на открытом огне завоевала более 100 стран мира!
        </p>
      </div>

      {/* Story & Visual Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div>
          <span className="badge-flame" style={{ marginBottom: '10px' }}>
            <Flame size={14} /> Наше отличие
          </span>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--bk-brown)', marginBottom: '16px' }}>
            Почему Воппер не похож на обычные бургеры?
          </h2>
          <p style={{ color: 'var(--bk-gray)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '16px' }}>
            В отличие от большинства других сетей, мы не используем сковороды или фритюрницы для жарки котлет. Наши грили работают на живом открытом огне при температуре свыше 300°C.
          </p>
          <p style={{ color: 'var(--bk-gray)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Лишний жир стекает в процессе обжарки, а мясо мгновенно карамелизуется снаружи, оставаясь сочным и нежным внутри, приобретая фирменный аромат настоящего барбекю.
          </p>

          <Link to="/menu" className="btn-bk-primary">
            Попробовать бургеры на огне
          </Link>
        </div>

        <div style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '4px solid #fff'
        }}>
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
            alt="Бургеры на гриле Бургер Кинг"
            style={{ width: '100%', height: '380px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* 4 Pillars of BK Quality */}
      <div>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--bk-brown)', textAlign: 'center', marginBottom: '36px' }}>
          4 золотых правила Burger King
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              icon: <Flame size={32} color="var(--bk-red)" />,
              title: 'Живой огонь',
              text: 'Обжарка на открытом пламени делает котлеты ароматными и менее жирными.'
            },
            {
              icon: <Award size={32} color="var(--bk-orange)" />,
              title: '100% Говядина',
              text: 'Только натуральное мясо российских поставщиков без добавления сои и красителей.'
            },
            {
              icon: <ShieldCheck size={32} color="var(--bk-green)" />,
              title: 'Свежесть каждый день',
              text: 'Томаты, лук и свежий салат нарезаются вручную каждое утро в каждом ресторане.'
            },
            {
              icon: <Heart size={32} color="var(--bk-brown)" />,
              title: 'Сделай по-своему',
              text: 'Добавляйте бекон, дополнительный сыр, халапеньо или убирайте лук — по вашему вкусу.'
            }
          ].map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#fff',
                padding: '30px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--bk-gray-border)',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--bk-cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--bk-brown)', marginBottom: '8px' }}>
                {card.title}
              </h3>
              <p style={{ color: 'var(--bk-gray)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
