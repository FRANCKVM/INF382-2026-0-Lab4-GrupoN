import React, { useState } from 'react';
import { Screen, Account } from '../types';
import { CURRENT_USER } from '../constants';
import { Bell, ArrowRightLeft, CreditCard, ScanLine, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { Transaction } from '../types';

interface HomeProps {
  navigate: (screen: Screen) => void;
  onSelectAccount: (account: Account) => void;
  accounts: Account[];
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const HomeScreen: React.FC<HomeProps> = ({ navigate, onSelectAccount, accounts, transactions, onSelectTransaction }) => {
  const [hiddenBalances, setHiddenBalances] = useState<Record<string, boolean>>({});
  
  const handleCardClick = (account: Account) => {
    onSelectAccount(account);
    navigate(Screen.PRODUCT_DETAIL);
  };

  const toggleBalance = (e: React.MouseEvent, accountId: string) => {
    e.stopPropagation();
    setHiddenBalances(prev => ({
        ...prev,
        [accountId]: !prev[accountId]
    }));
  };

  const handleTransactionClick = (tx: Transaction) => {
    onSelectTransaction(tx);
    navigate(Screen.TRANSACTION_DETAIL);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="px-6 pt-12 pb-2 bg-white">
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => navigate(Screen.PROFILE)} className="flex items-center gap-3 text-left group">
                <img src={CURRENT_USER.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-green-400 p-0.5 group-active:scale-95 transition-transform" />
                <div>
                    <p className="text-xs text-gray-500">Buenos días,</p>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{CURRENT_USER.name}</h3>
                </div>
            </button>
            <button 
                onClick={() => navigate(Screen.NOTIFICATIONS)} 
                className="relative p-2 -mr-2 rounded-full hover:bg-gray-50 active:scale-95 transition-all"
            >
                <Bell className="text-gray-600" size={24} />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
        </div>

        {/* Carousel Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 gap-4 no-scrollbar">
            {accounts.map((account) => (
                <div 
                    key={account.id}
                    onClick={() => handleCardClick(account)}
                    className={`min-w-full snap-center rounded-2xl p-6 text-white shadow-lg relative overflow-hidden cursor-pointer transition-transform active:scale-[0.98] ${
                        account.type === 'CREDIT' 
                        ? 'bg-slate-900 shadow-slate-900/20' 
                        : 'bg-blue-600 shadow-blue-600/20'
                    }`}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                         <div className="w-32 h-32 rounded-full border-8 border-white"></div>
                    </div>
                    
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className={`text-sm font-medium ${account.type === 'CREDIT' ? 'text-gray-300' : 'text-blue-100'}`}>
                                {account.name}
                            </span>
                            <p className={`text-xs mt-1 ${account.type === 'CREDIT' ? 'text-gray-400' : 'text-blue-200'}`}>
                                {account.number}
                            </p>
                        </div>
                        {account.type === 'CREDIT' ? (
                             <span className="font-bold italic text-lg opacity-80">VISA</span>
                        ) : (
                             <span className="bg-blue-500/50 px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">Soles</span>
                        )}
                    </div>
                    
                    <div className="mb-2">
                        <p className={`text-xs mb-1 ${account.type === 'CREDIT' ? 'text-gray-400' : 'text-blue-200'}`}>
                            {account.type === 'CREDIT' ? 'Línea Disponible' : 'Saldo Disponible'}
                        </p>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">
                                {hiddenBalances[account.id] 
                                    ? (account.currency === 'PEN' ? 'S/ ••••••' : '$ ••••••')
                                    : `${account.currency === 'PEN' ? 'S/' : '$'} ${account.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`
                                }
                            </h1>
                            <button 
                                onClick={(e) => toggleBalance(e, account.id)}
                                className="p-1.5 rounded-full hover:bg-white/10 transition-colors z-20"
                            >
                                {hiddenBalances[account.id] ? <EyeOff size={22} className="text-white/70" /> : <Eye size={22} className="text-white/70" />}
                            </button>
                        </div>
                        {account.type === 'DEBIT' && (
                             <div className="flex items-center gap-2 mt-2 text-blue-100 text-sm">
                                <span className="bg-green-400 w-2 h-2 rounded-full"></span>
                                <span>+ S/ 1,200.00 este mes</span>
                            </div>
                        )}
                         {account.type === 'CREDIT' && (
                             <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                                <span>Deuda total: $ 450.00</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-6 gap-2">
                         {accounts.map(a => (
                             <div 
                                key={`dot-${a.id}`} 
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    a.id === account.id 
                                        ? 'bg-white' 
                                        : (account.type === 'CREDIT' ? 'bg-gray-700' : 'bg-blue-400')
                                }`}
                             ></div>
                         ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-4 gap-4">
             {[
                 { icon: <ArrowRightLeft size={24} />, label: 'Transferir', action: () => navigate(Screen.TRANSFER_SELECT) },
                 { icon: <CreditCard size={24} />, label: 'Pagar', action: () => navigate(Screen.SERVICES_SELECT) },
                 { icon: <ScanLine size={24} />, label: 'QR', action: () => navigate(Screen.QR_SCAN) },
                 { icon: <RefreshCw size={24} />, label: 'Cambiar $', action: () => navigate(Screen.EXCHANGE) },
             ].map((item, idx) => (
                 <button key={idx} onClick={item.action} className="flex flex-col items-center gap-2 group">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100 group-active:scale-95 transition-transform">
                         {item.icon}
                     </div>
                     <span className="text-xs font-medium text-slate-700 text-center leading-tight w-full">{item.label}</span>
                 </button>
             ))}
        </div>
      </div>

      {/* Recent Movements */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 py-8 shadow-inner">
         <div className="flex justify-between items-end mb-6">
             <h3 className="font-bold text-lg text-slate-900">Movimientos Recientes</h3>
             <button onClick={() => navigate(Screen.ALL_TRANSACTIONS)} className="text-blue-600 text-sm font-semibold">Ver todos</button>
         </div>

         <div className="space-y-4">
             {transactions.map((tx) => (
                 <div key={tx.id} onClick={() => handleTransactionClick(tx)} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                     <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                             {/* Simplified icon logic could go here */}
                             <div className="font-bold text-lg">{tx.title[0]}</div>
                         </div>
                         <div>
                             <h4 className="font-bold text-slate-900">{tx.title}</h4>
                             <p className="text-xs text-gray-500">{tx.subtitle}</p>
                         </div>
                     </div>
                     <div className="text-right">
                         <span className={`font-bold block ${tx.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
                            {tx.type === 'income' ? '+' : '-'} {tx.currency === 'PEN' ? 'S/' : '$'} {Math.abs(tx.amount).toFixed(2)}
                         </span>
                         <span className="text-xs text-gray-400">{tx.date}</span>
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
};
