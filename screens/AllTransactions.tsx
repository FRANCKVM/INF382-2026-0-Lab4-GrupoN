import React from 'react';
import { Screen, Transaction } from '../types';
import { Header } from '../components/UI';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface Props {
  navigate: (screen: Screen) => void;
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const AllTransactionsScreen: React.FC<Props> = ({ navigate, transactions, onSelectTransaction }) => {
  const [displayCount, setDisplayCount] = React.useState(10);
  const [loading, setLoading] = React.useState(false);

  const handleTransactionClick = (tx: Transaction) => {
    onSelectTransaction(tx);
    navigate(Screen.TRANSACTION_DETAIL);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 10);
      setLoading(false);
    }, 800);
  };

  // Grouping transactions by month
  const groupTransactionsByMonth = (txs: Transaction[]) => {
    const groups: { [key: string]: Transaction[] } = {};
    
    txs.slice(0, displayCount).forEach(tx => {
      let month = 'Otros';
      if (tx.date === 'Hoy' || tx.date === 'Ayer') {
        month = 'Febrero 2026'; // Current month based on metadata
      } else {
        // Assuming format like "09 Oct"
        const parts = tx.date.split(' ');
        if (parts.length === 2) {
          const monthMap: { [key: string]: string } = {
            'Jan': 'Enero', 'Feb': 'Febrero', 'Mar': 'Marzo', 'Apr': 'Abril',
            'May': 'Mayo', 'Jun': 'Junio', 'Jul': 'Julio', 'Aug': 'Agosto',
            'Sep': 'Septiembre', 'Oct': 'Octubre', 'Nov': 'Noviembre', 'Dec': 'Diciembre'
          };
          const monthName = monthMap[parts[1]] || parts[1];
          const year = (parts[1] === 'Jan' || parts[1] === 'Feb') ? '2026' : '2025';
          month = `${monthName} ${year}`;
        } else {
          month = tx.date;
        }
      }
      
      if (!groups[month]) groups[month] = [];
      groups[month].push(tx);
    });

    return Object.keys(groups).map(month => ({
      label: month,
      data: groups[month]
    }));
  };

  const history = groupTransactionsByMonth(transactions);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header title="Movimientos" onBack={() => navigate(Screen.HOME)} />
      
      <div className="flex-1 px-6 overflow-y-auto pt-4 pb-6">
        {history.map((section, idx) => (
            <div key={idx} className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{section.label}</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {section.data.map((tx, i) => (
                        <div key={`${idx}-${i}`} onClick={() => handleTransactionClick(tx)} className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer ${i !== section.data.length - 1 ? 'border-b border-gray-50' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-50'}`}>
                                    {tx.type === 'income' ? <ArrowDownCircle size={20} className="text-green-600" /> : <ArrowUpCircle size={20} className="text-red-500" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{tx.title}</h4>
                                    <p className="text-xs text-gray-500">{tx.subtitle}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`font-bold block text-sm ${tx.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
                                    {tx.type === 'income' ? '+' : '-'} {tx.currency === 'PEN' ? 'S/' : '$'} {Math.abs(tx.amount).toFixed(2)}
                                </span>
                                <span className="text-[10px] text-gray-400">{tx.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        
        {displayCount < transactions.length && (
          <div className="text-center mt-4">
              <button 
                onClick={handleLoadMore}
                disabled={loading}
                className="text-xs font-bold text-blue-600 bg-blue-50 px-6 py-3 rounded-full active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'Cargando...' : 'Cargar más movimientos'}
              </button>
          </div>
        )}
      </div>
    </div>
  );
};
