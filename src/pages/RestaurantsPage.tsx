import React, { useState } from 'react';
import { MapPin, Clock, Phone, Car, Baby, CheckCircle, Navigation } from 'lucide-react';
import { RESTAURANTS } from '../data/restaurants';

export const RestaurantsPage: React.FC = () => {
  const [filterDrive, setFilterDrive] = useState(false);
  const [filter24h, setFilter24h] = useState(false);
  const [selectedRestId, setSelectedRestId] = useState<string>(RESTAURANTS[0].id);

  const filtered = RESTAURANTS.filter(r => {
    if (filterDrive && !r.hasDriveThru) return false;
    if (filter24h && !r.is24Hours) return false;
    return true;
  });

  const selectedRest = RESTAURANTS.find(r => r.id === selectedRestId) || RESTAURANTS[0];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '32px' }}>
        <span className="badge-flame" style={{ marginBottom: '8px' }}>
          <MapPin size={14} /> Карта вкуса
        </span>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--bk-brown)', marginBottom: '8px' }}>
          Рестораны Бургер Кинг
        </h1>
        <p style={{ color: 'var(--bk-gray)', fontSize: '1rem' }}>
          Найдите ближайший ресторан, узнайте часы работы, наличие автораздачи и детской игровой зоны.
        </p>
      </div>

      {/* Filter checkboxes */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '24px'
      }}>
        <button
          type="button"
          onClick={() => setFilter24h(!filter24h)}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.88rem',
            backgroundColor: filter24h ? 'var(--bk-red)' : '#fff',
            color: filter24h ? '#fff' : 'var(--bk-brown)',
            border: '1.5px solid var(--bk-gray-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Clock size={16} />
          <span>Круглосуточно (24/7)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterDrive(!filterDrive)}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.88rem',
            backgroundColor: filterDrive ? 'var(--bk-red)' : '#fff',
            color: filterDrive ? '#fff' : 'var(--bk-brown)',
            border: '1.5px solid var(--bk-gray-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Car size={16} />
          <span>Автораздача (Кинг Авто)</span>
        </button>
      </div>

      {/* Main Layout: List + Interactive Detail Map View */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map((rest) => (
            <div
              key={rest.id}
              onClick={() => setSelectedRestId(rest.id)}
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: selectedRestId === rest.id ? '2px solid var(--bk-red)' : '1.5px solid var(--bk-gray-border)',
                boxShadow: selectedRestId === rest.id ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--bk-brown)' }}>
                  {rest.name}
                </h3>
                {rest.is24Hours && (
                  <span className="badge-new" style={{ backgroundColor: 'var(--bk-green)' }}>
                    24ч
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--bk-gray)', fontSize: '0.9rem', marginBottom: '6px' }}>
                <MapPin size={16} color="var(--bk-red)" />
                <span>{rest.address} {rest.metro && `(${rest.metro})`}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--bk-gray)', fontSize: '0.88rem', marginBottom: '12px' }}>
                <Clock size={16} />
                <span>{rest.hours}</span>
              </div>

              {/* Badges for features */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {rest.hasDriveThru && (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--bk-cream-light)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Car size={13} color="var(--bk-orange)" /> Автораздача
                  </span>
                )}
                {rest.hasPlayground && (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--bk-cream-light)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Baby size={13} color="var(--bk-red)" /> Детская площадка
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Detail Card / Mock Map */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--bk-gray-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          position: 'sticky',
          top: '100px'
        }}>
          {/* Simulated Map Visual */}
          <div style={{
            height: '240px',
            backgroundColor: 'var(--bk-cream)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              backgroundImage: 'radial-gradient(circle, var(--bk-brown) 1.5px, transparent 1.5px)',
              backgroundSize: '18px 18px'
            }} />

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
              animation: 'flamePulse 2.5s infinite ease-in-out'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'var(--bk-red)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(214, 35, 0, 0.4)'
              }}>
                <MapPin size={28} />
              </div>
              <div style={{
                backgroundColor: 'var(--bk-dark-brown)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 800,
                marginTop: '6px'
              }}>
                {selectedRest.name}
              </div>
            </div>
          </div>

          {/* Details below map */}
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--bk-brown)', marginBottom: '8px' }}>
              {selectedRest.name}
            </h3>
            <p style={{ color: 'var(--bk-gray)', fontSize: '0.95rem', marginBottom: '16px' }}>
              {selectedRest.address} {selectedRest.metro && `• ${selectedRest.metro}`}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={18} color="var(--bk-orange)" />
                <span>Режим работы: <strong>{selectedRest.hours}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--bk-green)" />
                <span>Телефон зала: <strong>{selectedRest.phone}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Navigation size={18} color="var(--bk-red)" />
                <span>Координаты: <strong>{selectedRest.coordinates.join(', ')}</strong></span>
              </div>
            </div>

            <a
              href={`https://yandex.ru/maps/?text=${encodeURIComponent(selectedRest.name + ' ' + selectedRest.address)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-bk-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              Проложить маршрут в Яндекс Картах
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
