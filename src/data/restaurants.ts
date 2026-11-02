import { Restaurant } from '../types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Бургер Кинг на Арбате',
    address: 'ул. Новый Арбат, 15',
    metro: 'м. Арбатская (3 мин пешком)',
    hours: 'Круглосуточно (24/7)',
    hasDriveThru: false,
    hasPlayground: true,
    is24Hours: true,
    coordinates: [55.7522, 37.5925],
    phone: '+7 (495) 782-82-82'
  },
  {
    id: 'rest-2',
    name: 'Бургер Кинг Тверская',
    address: 'ул. Тверская, 23/12',
    metro: 'м. Пушкинская / Тверская',
    hours: '08:00 – 00:00',
    hasDriveThru: false,
    hasPlayground: false,
    is24Hours: false,
    coordinates: [55.7661, 37.6041],
    phone: '+7 (495) 782-82-83'
  },
  {
    id: 'rest-3',
    name: 'Бургер Кинг Автозаводская Авто',
    address: 'ул. Мастеркова, 4',
    metro: 'м. Автозаводская',
    hours: 'Круглосуточно (Автораздача 24/7)',
    hasDriveThru: true,
    hasPlayground: true,
    is24Hours: true,
    coordinates: [55.7075, 37.6575],
    phone: '+7 (495) 782-82-84'
  },
  {
    id: 'rest-4',
    name: 'Бургер Кинг ТЦ «Авиапарк»',
    address: 'Ходынский бульвар, 4 (4 этаж, фудкорт)',
    metro: 'м. ЦСКА',
    hours: '10:00 – 23:00',
    hasDriveThru: false,
    hasPlayground: true,
    is24Hours: false,
    coordinates: [55.7904, 37.5312],
    phone: '+7 (495) 782-82-85'
  },
  {
    id: 'rest-5',
    name: 'Бургер Кинг Ленинградское шоссе Авто',
    address: 'Ленинградское шоссе, 64к1',
    metro: 'м. Водный стадион',
    hours: 'Круглосуточно (24/7)',
    hasDriveThru: true,
    hasPlayground: false,
    is24Hours: true,
    coordinates: [55.8451, 37.4876],
    phone: '+7 (495) 782-82-86'
  }
];
