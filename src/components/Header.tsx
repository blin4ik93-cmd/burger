import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Flame, Search, MapPin, Bike, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { totalCount, finalTotal, setIsCartOpen, orderMode, setOrderMode } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Flame Promo Bar */}
      <div style={{
        backgroundColor: 'var(--bk-brown)',
        color: 'var(--bk-cream)',
        fontSize: '0.85rem',
        padding: '8px 16px',
        fontWeight: '600'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={16} color="var(--bk-orange)" className="animate-pulse-flame" />
            <span>Готовим на открытом огне с 1954 года. <strong>Промокод KING2026</strong> — скидка 15%!</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/restaurants" style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
              <MapPin size={14} />
              <span>Рестораны Москвы (5)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        backgroundColor: 'var(--bk-cream)',
        borderBottom: '2px solid var(--bk-gray-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          gap: '20px'
        }}>
          
          {/* Brand Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--bk-red)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(214,35,0,0.3)',
                position: 'relative'
              }}>
                <span style={{
                  width: '32px',
                  height: '6px',
                  backgroundColor: 'var(--bk-cream)',
                  borderRadius: '10px 10px 0 0',
                  marginBottom: '2px'
                }}></span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--bk-cream)',
                  fontSize: '9px',
                  lineHeight: '1',
                  textAlign: 'center',
                  fontWeight: '900',
                  letterSpacing: '0.5px'
                }}>
                  BURGER<br/><span style={{ color: 'var(--bk-yellow)' }}>KING</span>
                </span>
                <span style={{
                  width: '32px',
                  height: '6px',
                  backgroundColor: 'var(--bk-cream)',
                  borderRadius: '0 0 10px 10px',
                  marginTop: '2px'
                }}></span>
              </div>
              <div className="brand-text" style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--bk-brown)', lineHeight: 1 }}>
                  BURGER KING
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--bk-red)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Вкус правит
                </span>
              </div>
            </Link>

            {/* Delivery / Pickup Switcher */}
            <div style={{
              display: 'flex',
              backgroundColor: 'rgba(80, 35, 20, 0.08)',
              borderRadius: 'var(--radius-full)',
              padding: '3px',
              marginLeft: '10px'
            }}>
              <button
                type="button"
                onClick={() => setOrderMode('delivery')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: orderMode === 'delivery' ? 'var(--bk-red)' : 'transparent',
                  color: orderMode === 'delivery' ? '#fff' : 'var(--bk-brown)'
                }}
              >
                <Bike size={15} />
                <span>Доставка</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderMode('pickup')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: orderMode === 'pickup' ? 'var(--bk-brown)' : 'transparent',
                  color: orderMode === 'pickup' ? '#fff' : 'var(--bk-brown)'
                }}
              >
                <Store size={15} />
                <span>С собой</span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '22px', fontWeight: 700 }}>
            <NavLink
              to="/menu"
              style={({ isActive }) => ({
                color: isActive ? 'var(--bk-red)' : 'var(--bk-brown)',
                position: 'relative',
                padding: '6px 0',
                borderBottom: isActive ? '3px solid var(--bk-red)' : '3px solid transparent'
              })}
            >
              Меню
            </NavLink>
            <NavLink
              to="/promos"
              style={({ isActive }) => ({
                color: isActive ? 'var(--bk-red)' : 'var(--bk-brown)',
                position: 'relative',
                padding: '6px 0',
                borderBottom: isActive ? '3px solid var(--bk-red)' : '3px solid transparent'
              })}
            >
              Акции
            </NavLink>
            <NavLink
              to="/delivery"
              style={({ isActive }) => ({
                color: isActive ? 'var(--bk-red)' : 'var(--bk-brown)',
                position: 'relative',
                padding: '6px 0',
                borderBottom: isActive ? '3px solid var(--bk-red)' : '3px solid transparent'
              })}
            >
              Доставка
            </NavLink>
            <NavLink
              to="/restaurants"
              style={({ isActive }) => ({
                color: isActive ? 'var(--bk-red)' : 'var(--bk-brown)',
                position: 'relative',
                padding: '6px 0',
                borderBottom: isActive ? '3px solid var(--bk-red)' : '3px solid transparent'
              })}
            >
              Рестораны
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? 'var(--bk-red)' : 'var(--bk-brown)',
                position: 'relative',
                padding: '6px 0',
                borderBottom: isActive ? '3px solid var(--bk-red)' : '3px solid transparent'
              })}
            >
              О компании
            </NavLink>
          </nav>

          {/* Search & Cart CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <form onSubmit={handleSearchSubmit} className="desktop-search" style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Поиск по меню..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '9px 16px 9px 36px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--bk-gray-border)',
                  backgroundColor: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  width: '180px',
                  transition: 'width 0.2s ease, border-color 0.2s ease'
                }}
                onFocus={(e) => (e.target.style.width = '230px')}
                onBlur={(e) => (e.target.style.width = '180px')}
              />
              <Search size={16} color="var(--bk-gray)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </form>

            <Link to="/menu" className="btn-bk-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              Заказать
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              style={{
                backgroundColor: 'var(--bk-brown)',
                color: '#fff',
                borderRadius: 'var(--radius-full)',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
                fontWeight: 800,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <ShoppingBag size={18} />
              <span style={{ fontSize: '0.95rem' }}>{finalTotal} ₽</span>
              {totalCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: 'var(--bk-red)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  border: '2px solid var(--bk-cream)'
                }}>
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '8px',
                color: 'var(--bk-brown)'
              }}
              aria-label="Переключить меню"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(44, 20, 12, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: 'var(--bk-cream)',
            padding: '24px',
            maxWidth: '320px',
            width: '85%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--bk-brown)' }}>
                BURGER KING
              </span>
              <button type="button" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} color="var(--bk-brown)" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Поиск по меню..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 36px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--bk-gray-border)',
                  backgroundColor: '#fff',
                  fontSize: '0.9rem'
                }}
              />
              <Search size={16} color="var(--bk-gray)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </form>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.1rem', fontWeight: 700 }}>
              <Link to="/menu" onClick={() => setMobileMenuOpen(false)}>🍔 Меню</Link>
              <Link to="/promos" onClick={() => setMobileMenuOpen(false)}>🔥 Акции и купоны</Link>
              <Link to="/delivery" onClick={() => setMobileMenuOpen(false)}>🚀 Доставка</Link>
              <Link to="/restaurants" onClick={() => setMobileMenuOpen(false)}>📍 Рестораны</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>👑 О компании</Link>
            </nav>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                type="button"
                className="btn-bk-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
              >
                Открыть корзину ({finalTotal} ₽)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Style overrides for media queries */}
      <style>{`
        @media (max-width: 960px) {
          .desktop-nav, .desktop-search {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
