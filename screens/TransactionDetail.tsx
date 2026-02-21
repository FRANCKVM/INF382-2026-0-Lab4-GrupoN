import React from 'react';
import { Screen, Transaction } from '../types';
import { Header, Button } from '../components/UI';
import { Check, Share, ArrowDownCircle, ArrowUpCircle, Calendar, Hash, Landmark, FileText, X } from 'lucide-react';

interface Props {
  navigate: (screen: Screen) => void;
  transaction: Transaction | null;
  onBack?: () => void;
}

export const TransactionDetailScreen: React.FC<Props> = ({ navigate, transaction, onBack }) => {
  const [showShareSheet, setShowShareSheet] = React.useState(false);

  if (!transaction) {
    return (
      <div className="bg-white h-screen flex flex-col items-center justify-center p-6">
        <p className="text-gray-500 mb-4">No se encontró información del movimiento.</p>
        <Button onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
      </div>
    );
  }

  const isIncome = transaction.type === 'income';

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative">
      <Header 
        title="Detalle del Movimiento" 
        onBack={onBack || (() => navigate(Screen.HOME))} 
      />
      
      <div className="flex-1 px-6 pt-8 pb-10 overflow-y-auto">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                {isIncome ? <ArrowDownCircle size={32} /> : <ArrowUpCircle size={32} />}
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-1">{transaction.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{transaction.subtitle}</p>
            
            <h1 className={`text-4xl font-bold ${isIncome ? 'text-green-600' : 'text-slate-900'}`}>
                {isIncome ? '+' : '-'} {transaction.currency === 'PEN' ? 'S/' : '$'} {Math.abs(transaction.amount).toFixed(2)}
            </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <Calendar size={20} />
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Fecha y Hora</p>
                    <p className="text-sm font-semibold text-slate-900">{transaction.date}, 2026 • 22:04 PM</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <Hash size={20} />
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Número de Operación</p>
                    <p className="text-sm font-semibold text-slate-900">#00{Math.floor(Math.random() * 10000000)}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <Landmark size={20} />
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Cuenta de Origen</p>
                    <p className="text-sm font-semibold text-slate-900">Cuenta Sueldo **** 4521</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <FileText size={20} />
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Estado</p>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm font-semibold text-green-600">Completado</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-8 space-y-4">
            <Button 
              icon={<Share size={20} />} 
              className="flex items-center justify-center gap-2"
              onClick={() => setShowShareSheet(true)}
            >
              Compartir Constancia
            </Button>
            <Button variant="ghost" onClick={() => navigate(Screen.HOME)}>Volver al Inicio</Button>
        </div>
      </div>

      {/* Share Sheet Simulation */}
      {showShareSheet && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-end animate-in fade-in duration-300">
            <div className="w-full bg-white rounded-t-3xl p-6 pb-10 animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Compartir constancia</h3>
                    <button onClick={() => setShowShareSheet(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={24} />
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-6 mb-8">
                    {[
                        { name: 'WhatsApp', icon: <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600"><Check size={24} /></div> },
                        { name: 'Gmail', icon: <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500"><FileText size={24} /></div> },
                        { name: 'Messenger', icon: <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><Share size={24} /></div> },
                        { name: 'Copiar', icon: <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600"><Hash size={24} /></div> },
                    ].map((app, i) => (
                        <button key={i} onClick={() => setShowShareSheet(false)} className="flex flex-col items-center gap-2">
                            {app.icon}
                            <span className="text-xs text-gray-600">{app.name}</span>
                        </button>
                    ))}
                </div>
                <Button onClick={() => setShowShareSheet(false)}>Cerrar</Button>
            </div>
        </div>
      )}
    </div>
  );
};
