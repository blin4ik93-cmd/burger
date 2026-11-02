export interface Promotion {
  id: string;
  title: string;
  badge: string;
  description: string;
  couponCode?: string;
  discountNote: string;
  imageUrl: string;
  validUntil: string;
  buttonText: string;
  linkCategory?: string;
  featured?: boolean;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'king-box-deal',
    title: 'Кинг Бокс 5 в 1 всего за 399 ₽!',
    badge: 'СУПЕР ХИТ',
    description: 'Настоящее комбо-спасение для голодных: Воппер Джуниор + горячая порция Кинг Фри + 4 наггетса + прохладный напиток + горячий пирожок с вишней. Экономия свыше 30%!',
    couponCode: 'KING5BOX',
    discountNote: 'Экономия 151 ₽ по сравнению с отдельным заказом',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    validUntil: 'Бессрочно',
    buttonText: 'Взять Кинг Бокс',
    linkCategory: 'combos',
    featured: true
  },
  {
    id: 'promo-code-2026',
    title: 'Скидка 15% на первый онлайн-заказ',
    badge: 'ПРОМОКОД',
    description: 'Введи промокод KING2026 в корзине при оформлении заказа на сумму от 600 ₽ и получи мгновенную скидку 15% на всё меню.',
    couponCode: 'KING2026',
    discountNote: '-15% на весь чек',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    validUntil: 'До конца месяца',
    buttonText: 'Скопировать промокод',
    featured: true
  },
  {
    id: 'whopper-fest',
    title: 'Два Воппера по цене одного!',
    badge: '1 + 1 = 1',
    description: 'Огненная щедрость: закажи любой Воппер в приложении или на сайте с промокодом OGON и получи второй такой же в подарок.',
    couponCode: 'OGON',
    discountNote: 'Второй Воппер бесплатно',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    validUntil: 'По вторникам и четвергам',
    buttonText: 'Применить купон',
    linkCategory: 'burgers'
  },
  {
    id: 'free-delivery-deal',
    title: 'Бесплатная доставка от 800 ₽',
    badge: 'ДОСТАВКА',
    description: 'Заказывайте любимые бургеры, закуски и десерты прямо домой или в офис. Доставим горячими в термосумках за 30-35 минут без доплаты за доставку!',
    discountNote: 'Доставка 0 ₽ от 800 ₽',
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    validUntil: 'Каждый день',
    buttonText: 'Собрать корзину',
    linkCategory: 'all'
  },
  {
    id: 'nuggets-party',
    title: 'Кинг Наггетсы: 15 штук всего за 259 ₽',
    badge: 'ВЫГОДА',
    description: 'Хрустящие наггетсы из белого куриного филе для большой компании. Два фирменных соуса (кисло-сладкий и барбекю) уже включены в набор.',
    couponCode: 'NUGGETS15',
    discountNote: 'Скидка 25%',
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    validUntil: 'До конца недели',
    buttonText: 'Заказать с соусом',
    linkCategory: 'chicken'
  }
];

export const VALID_PROMO_CODES: Record<string, { discountPercent: number; minOrder: number; description: string }> = {
  'KING2026': { discountPercent: 15, minOrder: 500, description: 'Скидка 15% на весь заказ' },
  'OGON': { discountPercent: 20, minOrder: 700, description: 'Огненная скидка 20% от 700 ₽' },
  'WHOPPER100': { discountPercent: 10, minOrder: 300, description: 'Скидка 10% на легендарный вкус' },
};
