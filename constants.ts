import { Account, Transaction, User } from './types';
import { CreditCard, ShoppingBag, Utensils, Zap, Monitor } from 'lucide-react';

export const CURRENT_USER: User = {
  name: 'Alejandro',
  email: 'alejandro@bancopremium.pe',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export const ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Cuenta Sueldo',
    number: '**** 4521',
    balance: 12450.80,
    currency: 'PEN',
    type: 'DEBIT'
  },
  {
    id: '2',
    name: 'Visa Signature',
    number: '**** 8890',
    balance: 35000.00, // Linea disponible
    currency: 'USD',
    type: 'CREDIT',
    network: 'VISA'
  }
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    title: 'Netflix',
    subtitle: 'Suscripción',
    amount: -45.90,
    currency: 'PEN',
    date: 'Hoy',
    type: 'expense',
    icon: 'monitor'
  },
  {
    id: 't2',
    title: 'Juan Pérez',
    subtitle: 'Transferencia recibida',
    amount: 200.00,
    currency: 'PEN',
    date: 'Ayer',
    type: 'income',
    icon: 'user'
  },
  {
    id: 't3',
    title: 'Starbucks',
    subtitle: 'Consumo',
    amount: -18.50,
    currency: 'PEN',
    date: 'Ayer',
    type: 'expense',
    icon: 'coffee'
  },
  {
    id: 't4',
    title: 'Supermercados Wong',
    subtitle: 'Compras',
    amount: -340.20,
    currency: 'PEN',
    date: '09 Jan',
    type: 'expense',
    icon: 'shopping'
  }
];

export const FAVORITE_CONTACTS = [
  { id: 1, name: 'Maria', image: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Carlos', image: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Juan', image: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Sofía', image: 'https://i.pravatar.cc/150?u=4' },
];
