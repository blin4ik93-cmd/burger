import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, OrderCheckoutData } from '../types';
import { VALID_PROMO_CODES } from '../data/promos';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  finalTotal: number;
  freeDeliveryThreshold: number;
  remainingForFreeDelivery: number;
  promoCode: string;
  appliedPromo: { code: string; discountPercent: number; description: string } | null;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  orderMode: 'delivery' | 'pickup';
  setOrderMode: (mode: 'delivery' | 'pickup') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  previewProduct: Product | null;
  setPreviewProduct: (product: Product | null) => void;
  toast: { show: boolean; message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  lastOrder: { orderId: string; data: OrderCheckoutData; total: number; items: CartItem[] } | null;
  submitOrder: (data: OrderCheckoutData) => string;
}

const CART_STORAGE_KEY = 'bk_cart_items_v1';
const FREE_DELIVERY_THRESHOLD = 800;
const STANDARD_DELIVERY_FEE = 149;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  const [orderMode, setOrderMode] = useState<'delivery' | 'pickup'>('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; description: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [lastOrder, setLastOrder] = useState<{ orderId: string; data: OrderCheckoutData; total: number; items: CartItem[] } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`«${product.name}» добавлен в корзину 🔥`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoCode('');
  };

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const deliveryFee = orderMode === 'pickup' || subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;

  const discount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  const applyPromoCode = (inputCode: string): boolean => {
    const cleaned = inputCode.trim().toUpperCase();
    setPromoCode(cleaned);
    const promo = VALID_PROMO_CODES[cleaned];

    if (!promo) {
      setPromoError('Неверный промокод. Попробуйте KING2026 или OGON');
      return false;
    }

    if (subtotal < promo.minOrder) {
      setPromoError(`Минимальная сумма заказа для кода ${cleaned} — ${promo.minOrder} ₽`);
      return false;
    }

    setAppliedPromo({
      code: cleaned,
      discountPercent: promo.discountPercent,
      description: promo.description
    });
    setPromoError(null);
    showToast(`Промокод ${cleaned} применен: -${promo.discountPercent}% 🎉`);
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError(null);
  };

  const submitOrder = (data: OrderCheckoutData): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BK-${randomNum}`;
    
    setLastOrder({
      orderId,
      data,
      total: finalTotal,
      items: [...cart]
    });

    clearCart();
    setIsCartOpen(false);
    return orderId;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        discount,
        deliveryFee,
        finalTotal,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        remainingForFreeDelivery,
        promoCode,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        orderMode,
        setOrderMode,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        previewProduct,
        setPreviewProduct,
        toast,
        showToast,
        lastOrder,
        submitOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
