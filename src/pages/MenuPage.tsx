import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Flame, Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES_LIST } from '../data/products';
import { ProductCategory } from '../types';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedTag, setSelectedTag] = useState<'all' | 'hit' | 'new' | 'spicy' | 'beef' | 'chicken'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'calories'>('default');

  // Sync category param with state if user clicked link in header
  React.useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  React.useEffect(() => {
    if (searchParams.get('search') !== null) {
      setSearchQuery(searchParams.get('search') || '');
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', catId);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedTag('all');
    setSortBy('default');
    setSearchParams({});
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        (p.ingredients && p.ingredients.some(i => i.toLowerCase().includes(q)))
      );
    }

    // Fast tags
    if (selectedTag === 'hit') {
      result = result.filter(p => p.isHit);
    } else if (selectedTag === 'new') {
      result = result.filter(p => p.isNew);
    } else if (selectedTag === 'spicy') {
      result = result.filter(p => p.isSpicy);
    } else if (selectedTag === 'beef') {
      result = result.filter(p => p.isBeef);
    } else if (selectedTag === 'chicken') {
      result = result.filter(p => p.isChicken);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'calories') {
      result.sort((a, b) => b.calories - a.calories);
    }

    return result;
  }, [activeCategory, searchQuery, selectedTag, sortBy]);

  return (
    <div className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      
      {/* Page Title & Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <div>
          <span className="badge-flame" style={{ marginBottom: '6px' }}>
            <Flame size={14} /> Полное меню
          </span>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--bk-brown)' }}>
            Наше меню на огне
          </h1>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '280px', flexGrow: 1, maxWidth: '420px' }}>
          <input
            type="text"
            placeholder="Найти Воппер, Кинг Фри, соус..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--bk-gray-border)',
              backgroundColor: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
          <Search size={18} color="var(--bk-gray)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--bk-gray)' }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Sticky Category Tabs */}
      <div style={{
        position: 'sticky',
        top: '76px',
        zIndex: 50,
        backgroundColor: 'var(--bk-cream-light)',
        padding: '12px 0',
        marginBottom: '20px',
        borderBottom: '1px solid var(--bk-gray-border)'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: '4px'
        }}>
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                backgroundColor: activeCategory === cat.id ? 'var(--bk-red)' : '#fff',
                color: activeCategory === cat.id ? '#fff' : 'var(--bk-brown)',
                border: activeCategory === cat.id ? '2px solid var(--bk-red)' : '1.5px solid var(--bk-gray-border)',
                boxShadow: activeCategory === cat.id ? '0 4px 12px rgba(214, 35, 0, 0.3)' : 'var(--shadow-sm)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags & Sorter Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '30px'
      }}>
        {/* Fast filter pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Все позиции' },
            { id: 'hit', label: '🔥 Хиты' },
            { id: 'new', label: '✨ Новинки' },
            { id: 'spicy', label: '🌶️ Острое' },
            { id: 'beef', label: '🥩 100% Говядина' },
            { id: 'chicken', label: '🍗 Курица' },
          ].map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => setSelectedTag(tag.id as any)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 700,
                backgroundColor: selectedTag === tag.id ? 'var(--bk-brown)' : '#fff',
                color: selectedTag === tag.id ? 'var(--bk-cream)' : 'var(--bk-brown)',
                border: '1px solid var(--bk-gray-border)'
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={16} color="var(--bk-gray)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--bk-gray)' }}>Сортировка:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--bk-gray-border)',
              backgroundColor: '#fff',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--bk-brown)',
              cursor: 'pointer'
            }}
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Сначала недорогие</option>
            <option value="price-desc">Сначала премиальные</option>
            <option value="calories">По калорийности</option>
          </select>
        </div>
      </div>

      {/* Search results summary if applied */}
      {(searchQuery || selectedTag !== 'all' || activeCategory !== 'all') && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          padding: '10px 16px',
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--bk-gray-border)',
          fontSize: '0.88rem'
        }}>
          <div>
            Найдено блюд: <strong>{filteredProducts.length}</strong>
            {searchQuery && ` по запросу «${searchQuery}»`}
          </div>
          <button
            type="button"
            onClick={handleClearFilters}
            style={{ color: 'var(--bk-red)', fontWeight: 700, textDecoration: 'underline' }}
          >
            Сбросить все фильтры
          </button>
        </div>
      )}

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--bk-gray-border)'
        }}>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--bk-brown)', marginBottom: '8px' }}>
            Ничего не найдено
          </h3>
          <p style={{ color: 'var(--bk-gray)', marginBottom: '20px' }}>
            Попробуйте изменить поисковый запрос или выбрать другую категорию меню.
          </p>
          <button
            type="button"
            className="btn-bk-primary"
            onClick={handleClearFilters}
          >
            Показать всё меню
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
