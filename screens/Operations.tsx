import React from 'react';
import { Screen } from '../types';
import { Header, Button } from '../components/UI';
import { ArrowRightLeft, CreditCard, RefreshCw, Landmark, Receipt, PiggyBank, FileText, ChevronRight } from 'lucide-react';

interface OpsProps {
  navigate: (screen: Screen) => void;
}

export const OperationsScreen: React.FC<OpsProps> = ({ navigate }) => {
  const sections = [
    {
      title: 'Transferencias',
      items: [
        { icon: <ArrowRightLeft />, label: 'Realizar Transferencia', screen: Screen.TRANSFER_SELECT },
        { icon: <RefreshCw />, label: 'Cambiar soles y dólares', screen: Screen.EXCHANGE },
      ]
    },
    {
      title: 'Pagos',
      items: [
        { icon: <Receipt />, label: 'Pago de servicios', screen: Screen.SERVICES_SELECT },
        { icon: <CreditCard />, label: 'Pago de tarjetas', screen: Screen.CARD_PAYMENT_SELECT },
      ]
    },
    {
      title: 'Gestión',
      items: [
        { icon: <Landmark />, label: 'Solicitar préstamo', screen: Screen.LOAN_SIMULATOR },
        { icon: <PiggyBank />, label: 'Metas de ahorro', screen: Screen.GOALS_LIST },
        { icon: <FileText />, label: 'Estado de cuenta', screen: Screen.STATEMENT_SELECT_PRODUCT },
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Operaciones</h1>
      </div>

      <div className="p-6 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <button 
                  key={itemIdx} 
                  onClick={() => navigate(item.screen)}
                  className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${itemIdx !== section.items.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                      {React.cloneElement(item.icon as React.ReactElement<{ size: number }>, { size: 20 })}
                    </div>
                    <span className="font-semibold text-slate-900">{item.label}</span>
                  </div>
                  <ChevronRight className="text-gray-300" size={20} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
