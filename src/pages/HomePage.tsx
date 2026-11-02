import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Clock, ShieldCheck, Award, HeartHandshake, Sparkles, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { POPULAR_ITEMS, CATEGORIES_LIST } from '../data/products';
import { PROMOTIONS } from '../data/promos';
import { useCart } from '../context/CartContext';

export const HomePage: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const whopper = POPULAR_ITEMS.find(p => p.id === 'whopper');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        backgroundColor: 'var(--bk-cream)',
        overflow: 'hidden',
        padding: '60px 0 80px',
        borderBottom: '4px solid var(--bk-brown)'
      }}>
        {/* Decorative background radial flame gradient */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237, 119, 0, 0.22) 0%, rgba(214, 35, 0, 0.08) 60%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '40px',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-flame" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                <Flame size={16} /> Настоящий огонь с 1954 года
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--bk-red)' }}>
                100% Говядина
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              color: 'var(--bk-brown)',
              lineHeight: 1.05
            }}>
              ЛЕГЕНДАРНЫЙ <br />
              <span style={{ color: 'var(--bk-red)' }}>ВОППЕР®</span> НА ОГНЕ
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--bk-gray)',
              maxWidth: '520px',
              lineHeight: 1.5
            }}>
              Бифштекс из 100% натуральной говядины, приготовленный на открытом огне при температуре 300°C. Сочные томаты, хрустящий салат и фирменный майонез на горячей булочке с кунжутом.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button
                type="button"
                className="btn-bk-primary"
                onClick={() => {
                  if (whopper) addToCart(whopper);
                  setIsCartOpen(true);
                }}
              >
                <span>Заказать Воппер — 349 ₽</span>
                <ArrowRight size={18} />
              </button>

              <Link to="/menu" className="btn-bk-outline">
                Смотреть меню
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '10px',
              paddingTop: '20px',
              borderTop: '1px solid var(--bk-gray-border)'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--bk-red)' }}>30 мин</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--bk-gray)', fontWeight: 700 }}>Быстрая доставка</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--bk-orange)' }}>300°C</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--bk-gray)', fontWeight: 700 }}>Жар пламени гриля</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--bk-green)' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--bk-gray)', fontWeight: 700 }}>Без сои и ГМО</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Burger */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '4px solid var(--bk-white)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
                alt="Воппер на огне Бургер Кинг"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backgroundColor: 'rgba(44, 20, 12, 0.85)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Flame size={28} color="var(--bk-orange)" className="animate-pulse-flame" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Только на живом огне</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>Не жарим на масле, обжигаем на решетке</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY QUICK JUMP PILLS */}
      <section className="container">
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '10px',
          scrollbarWidth: 'none'
        }}>
          {CATEGORIES_LIST.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'all' ? '/menu' : `/menu?cat=${cat.id}`}
              style={{
                backgroundColor: '#fff',
                padding: '12px 22px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.92rem',
                color: 'var(--bk-brown)',
                boxShadow: 'var(--shadow-sm)',
                border: '1.5px solid var(--bk-gray-border)',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              className="cat-pill"
            >
              <span>{cat.label}</span>
              <ChevronRight size={14} color="var(--bk-orange)" />
            </Link>
          ))}
        </div>
        <style>{`
          .cat-pill:hover {
            border-color: var(--bk-red);
            background-color: var(--bk-cream);
            transform: translateY(-2px);
          }
        `}</style>
      </section>

      {/* 3. POPULAR HIT ITEMS */}
      <section className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span className="badge-flame" style={{ marginBottom: '8px' }}>
              <Sparkles size={14} /> Выбор гостей
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--bk-brown)' }}>
              Популярные хиты на огне
            </h2>
          </div>
          <Link to="/menu" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--bk-red)',
            fontWeight: 800,
            fontSize: '1rem'
          }}>
            <span>Всё меню ресторанов</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {POPULAR_ITEMS.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. PROMOTIONS & COMBOS BANNER */}
      <section style={{ backgroundColor: 'var(--bk-brown)', padding: '60px 0', color: 'var(--bk-cream)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span className="badge-flame" style={{ backgroundColor: 'var(--bk-red)' }}>
                Огненная выгода
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', marginTop: '6px' }}>
                Горячие акции и комбо-наборы
              </h2>
            </div>
            <Link to="/promos" className="btn-bk-outline" style={{ borderColor: 'var(--bk-cream)', color: 'var(--bk-cream)' }}>
              Все 5 акций
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {PROMOTIONS.slice(0, 3).map((promo) => (
              <div
                key={promo.id}
                style={{
                  backgroundColor: 'var(--bk-cream)',
                  color: 'var(--bk-brown)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span className="badge-flame" style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
                    {promo.badge}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>
                    {promo.title}
                  </h3>
                  <p style={{ color: 'var(--bk-gray)', fontSize: '0.9rem', lineHeight: '1.45', marginBottom: '18px', flexGrow: 1 }}>
                    {promo.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--bk-gray-border)'
                  }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--bk-red)' }}>
                      {promo.discountNote}
                    </span>
                    <Link
                      to={promo.linkCategory ? `/menu?cat=${promo.linkCategory}` : '/menu'}
                      className="btn-bk-primary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      {promo.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ADVANTAGES SECTION */}
      <section className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span className="badge-flame" style={{ marginBottom: '8px' }}>
            Стандарты Бургер Кинг
          </span>
          <h2 style={{ fontSize: '2.3rem', color: 'var(--bk-brown)' }}>
            Почему наши бургеры особенные
          </h2>
          <p style={{ color: 'var(--bk-gray)', marginTop: '8px' }}>
            С 1954 года мы не изменяем своим принципам качества, отбору ингредиентов и технологии обжарки на огне.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              icon: <Flame size={32} color="var(--bk-red)" />,
              title: 'Обжарка на огне 300°C',
              desc: 'Наши бифштексы готовятся на настоящем гриле с открытым пламенем, а не варятся в жиру на сковороде.'
            },
            {
              icon: <Award size={32} color="var(--bk-orange)" />,
              title: '100% Отборная говядина',
              desc: 'Никакой сои, искусственных красителей и усилителей. Только натуральное мясо со специями.'
            },
            {
              icon: <ShieldCheck size={32} color="var(--bk-green)" />,
              title: 'Свежие хрустящие овощи',
              desc: 'Помидоры, салат и маринованные огурцы нарезаются прямо на ресторанной кухне каждый день.'
            },
            {
              icon: <Clock size={32} color="var(--bk-brown)" />,
              title: 'Доставка за 30-35 минут',
              desc: 'Термосумки сохраняют бургеры обжигающе горячими, а Кинг Фри — сочной и хрустящей.'
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
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--bk-cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--bk-brown)', marginBottom: '10px' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--bk-gray)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="container">
        <div style={{
          background: 'linear-gradient(135deg, var(--bk-red) 0%, var(--bk-orange) 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '50px 40px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ maxWidth: '580px' }}>
            <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '12px' }}>
              Голодны? Закажите прямо сейчас!
            </h2>
            <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: '1.5' }}>
              Примените промокод <strong>KING2026</strong> при заказе от 500 ₽ и получите скидку 15% на всё меню.
            </p>
          </div>
          <Link
            to="/menu"
            className="btn-bk-secondary"
            style={{
              backgroundColor: 'var(--bk-brown)',
              color: 'var(--bk-cream)',
              padding: '16px 36px',
              fontSize: '1.1rem'
            }}
          >
            Перейти в меню
          </Link>
        </div>
      </section>

    </div>
  );
};
