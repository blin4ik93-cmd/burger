import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  if (!toast || !toast.show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'var(--bk-dark-brown)',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.92rem',
        fontWeight: 700,
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1.5px solid var(--bk-orange)'
      }}
    >
      {toast.type === 'success' && <CheckCircle size={18} color="var(--bk-orange)" />}
      {toast.type === 'error' && <AlertCircle size={18} color="var(--bk-red)" />}
      {toast.type === 'info' && <Info size={18} color="var(--bk-yellow)" />}
      <span>{toast.message}</span>
    </div>
  );
};
