import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bk-brown)',
      color: 'var(--bk-cream)',
      paddingTop: '60px',
      paddingBottom: '30px',
      marginTop: '80px',
      borderTop: '5px solid var(--bk-red)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Brand Col */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--bk-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              color: '#fff',
              lineHeight: 1,
              textAlign: 'center'
            }}>
              BURGER<br/>KING
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
              BURGER KING
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#E0D4C5', lineHeight: '1.6', marginBottom: '16px' }}>
            Вкус правит с 1954 года. Готовим бургеры только на открытом огне из 100% натуральной говядины без консервантов и сои.
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="badge-flame">
              <Flame size={14} /> 100% Flame Grilled
            </span>
          </div>
        </div>

        {/* Navigation Col */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--bk-yellow)', marginBottom: '18px' }}>
            Наше Меню
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><Link to="/menu?cat=burgers" style={{ opacity: 0.85 }}>Вопперы и бургеры</Link></li>
            <li><Link to="/menu?cat=rolls" style={{ opacity: 0.85 }}>Роллы из печи</Link></li>
            <li><Link to="/menu?cat=snacks" style={{ opacity: 0.85 }}>Кинг Фри и луковые кольца</Link></li>
            <li><Link to="/menu?cat=chicken" style={{ opacity: 0.85 }}>Наггетсы и куриные крылья</Link></li>
            <li><Link to="/menu?cat=combos" style={{ opacity: 0.85 }}>Кинг Боксы и комбо-обеды</Link></li>
            <li><Link to="/menu?cat=drinks" style={{ opacity: 0.85 }}>Молочные коктейли и напитки</Link></li>
          </ul>
        </div>

        {/* Info & Promotions */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--bk-yellow)', marginBottom: '18px' }}>
            Информация
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><Link to="/promos" style={{ opacity: 0.85 }}>Акции и скидки</Link></li>
            <li><Link to="/delivery" style={{ opacity: 0.85 }}>Условия доставки и оплаты</Link></li>
            <li><Link to="/restaurants" style={{ opacity: 0.85 }}>Адреса ресторанов и Автораздача</Link></li>
            <li><Link to="/about" style={{ opacity: 0.85 }}>О бренде и стандарты качества</Link></li>
            <li><span style={{ opacity: 0.85 }}>Калорийность и аллергены</span></li>
            <li><span style={{ opacity: 0.85 }}>Работа в Бургер Кинг</span></li>
          </ul>
        </div>

        {/* Contact info & App */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--bk-yellow)', marginBottom: '18px' }}>
            Поддержка гостей
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} color="var(--bk-orange)" />
              <div>
                <a href="tel:88007003232" style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>
                  8 (800) 700-32-32
                </a>
                <div style={{ fontSize: '0.75rem', opacity: 0.75 }}>Бесплатно по РФ, круглосуточно</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="var(--bk-orange)" />
              <div>Доставка 24/7 во все районы</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="var(--bk-green)" />
              <div>Гарантия свежести и тепла</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div style={{
        borderTop: '1px solid rgba(245, 235, 220, 0.15)',
        paddingTop: '24px'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          opacity: 0.75
        }}>
          <div>
            © 2026 Burger King Corporation. Все товарные знаки защищены.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Сделано с любовью к сочным бургерам на открытом огне</span>
            <Flame size={14} color="var(--bk-orange)" />
          </div>
        </div>
      </div>
    </footer>
  );
};
