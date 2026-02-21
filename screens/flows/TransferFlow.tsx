import React from 'react';
import { Screen, Account, Transaction } from '../../types';
import { Header, Button, NumberPad, SelectionCard } from '../../components/UI';
import { FAVORITE_CONTACTS, ACCOUNTS } from '../../constants';
import { Search, ChevronDown, Check, Share, Home, Star, X, MessageCircle, Mail, MessageSquare, Copy } from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
  amount?: string;
  setAmount?: (val: string) => void;
  recipient?: any;
  setRecipient?: (val: any) => void;
  sourceAccount?: Account;
  setSourceAccount?: (val: Account) => void;
  addTransaction?: (tx: Transaction) => void;
}

export const TransferSelect: React.FC<FlowProps> = ({ navigate, setRecipient, setAmount }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [contacts, setContacts] = React.useState([
    { id: 1, name: 'Juan Perez', initials: 'JP', bank: 'BCP Soles • *4521', color: 'bg-green-100 text-green-700', isFavorite: false },
    { id: 2, name: 'Maria Garcia', initials: 'MG', bank: 'Interbank Soles • *8823', color: 'bg-blue-100 text-blue-700', isFavorite: false },
    { id: 3, name: 'Carlos Rodriguez', initials: 'CR', bank: 'BBVA Soles • *1092', color: 'bg-purple-100 text-purple-700', isFavorite: false },
    { id: 4, name: 'Ana Martinez', initials: 'AM', bank: 'Scotiabank Soles • *3341', color: 'bg-red-100 text-red-700', isFavorite: false },
    { id: 5, name: 'Luis Lopez', initials: 'LL', bank: 'BCP Dólares • *5562', color: 'bg-orange-100 text-orange-700', isFavorite: false },
    { id: 6, name: 'Elena Sanchez', initials: 'ES', bank: 'Banco de la Nación • *7710', color: 'bg-teal-100 text-teal-700', isFavorite: false },
    { id: 7, name: 'Roberto Diaz', initials: 'RD', bank: 'BCP Soles • *1234', color: 'bg-indigo-100 text-indigo-700', isFavorite: false },
    { id: 8, name: 'Patricia Ruiz', initials: 'PR', bank: 'Interbank Soles • *5678', color: 'bg-pink-100 text-pink-700', isFavorite: false },
    { id: 9, name: 'Jorge Castro', initials: 'JC', bank: 'BBVA Dólares • *9012', color: 'bg-yellow-100 text-yellow-700', isFavorite: false },
    { id: 10, name: 'Sofia Torres', initials: 'ST', bank: 'Scotiabank Soles • *3456', color: 'bg-cyan-100 text-cyan-700', isFavorite: false },
    { id: 11, name: 'Miguel Angel', initials: 'MA', bank: 'BCP Soles • *7890', color: 'bg-lime-100 text-lime-700', isFavorite: false },
    { id: 12, name: 'Lucia Mendez', initials: 'LM', bank: 'Interbank Dólares • *2345', color: 'bg-rose-100 text-rose-700', isFavorite: false }
  ]);

  const handleSearch = () => {
    setError('');
    
    if (!searchValue) {
      setError('Por favor, ingresa un número de cuenta o CCI');
      return;
    }

    if (!/^\d+$/.test(searchValue)) {
      setError('Solo se permiten números');
      return;
    }

    if (searchValue.length !== 20) {
      setError('El CCI debe tener exactamente 20 cifras');
      return;
    }

    if (searchValue !== '24242525109075644521') {
      setError('CCI no válido');
      return;
    }

    if (setRecipient) {
      setRecipient({
        name: 'Juan Perez',
        initials: 'JP',
        bank: 'BCP Soles • *4521',
        color: 'bg-green-100 text-green-700',
        isSearch: true
      });
    }
    if (setAmount) setAmount('0');
    navigate(Screen.TRANSFER_AMOUNT);
  };

  const handleSelectContact = (contact: any) => {
    if (setRecipient) setRecipient(contact);
    if (setAmount) setAmount('0');
    navigate(Screen.TRANSFER_AMOUNT);
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setContacts(prev => prev.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) return 0;
    return a.isFavorite ? -1 : 1;
  });

  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <Header title="Selección de Destinatario" onBack={() => navigate(Screen.HOME)} />
      
      <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
          <h2 className="text-2xl font-bold mb-6">¿A quién deseas transferir?</h2>
          
          <div className="relative mb-8">
              <button 
                onClick={handleSearch}
                className="absolute left-4 top-3.5 text-gray-400 hover:text-blue-600 transition-colors z-10"
                aria-label="Buscar"
              >
                <Search size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Ingresa número de cuenta o CCI" 
                className={`w-full bg-gray-50 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 ${error ? 'focus:ring-red-100 border border-red-300' : 'focus:ring-blue-100'}`} 
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {error && <p className="text-red-500 text-xs mt-2 ml-2 font-medium">{error}</p>}
          </div>

          <div className="mt-4 mb-4">
            <h3 className="font-bold text-lg">Destinatarios Frecuentes</h3>
            <p className="text-sm text-gray-500">Seleccione un destinatario para transferir nuevamente</p>
          </div>
          <div className="space-y-4 pb-20">
              {sortedContacts.map((contact) => (
                  <div key={contact.id} onClick={() => handleSelectContact(contact)} className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded-lg group">
                      <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${contact.color}`}>
                              {contact.initials}
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900">{contact.name}</h4>
                              <p className="text-xs text-gray-500">{contact.bank}</p>
                          </div>
                      </div>
                      <button 
                        onClick={(e) => toggleFavorite(e, contact.id)}
                        className={`p-2 rounded-full transition-colors ${contact.isFavorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
                      >
                        <Star size={20} fill={contact.isFavorite ? "currentColor" : "none"} />
                      </button>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export const TransferAmount: React.FC<FlowProps> = ({ navigate, amount = '0', setAmount, sourceAccount, setSourceAccount }) => {
    const [showAccountSelector, setShowAccountSelector] = React.useState(false);
    const [error, setError] = React.useState('');
    
    const handlePress = (val: string) => {
        if (!setAmount) return;
        setError('');
        if (amount === '0' && val !== '.') setAmount(val);
        else if (amount.includes('.') && val === '.') return;
        else if (amount.includes('.') && amount.split('.')[1].length >= 2) return;
        else setAmount(amount + val);
    };

    const handleDelete = () => {
        if (!setAmount) return;
        setError('');
        setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
    };

    const handleContinue = () => {
        const numAmount = Number(amount);
        if (numAmount <= 0) {
            setError('Ingresa un monto válido');
            return;
        }
        if (sourceAccount && numAmount > sourceAccount.balance) {
            setError('Saldo insuficiente en la cuenta seleccionada');
            return;
        }
        navigate(Screen.TRANSFER_CONFIRM);
    };

    const formattedDisplayAmount = amount === '0' ? '0.00' : Number(amount).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="bg-white min-h-screen flex flex-col relative">
            <Header title="Transferir" onBack={() => navigate(Screen.TRANSFER_SELECT)} />
            <div className="flex-1 flex flex-col px-6">
                <h2 className="text-xl font-bold mt-4 mb-8">¿Cuánto deseas transferir?</h2>
                
                <div className="flex flex-col justify-center items-center gap-2 mb-8">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-blue-600">S/</span>
                        <span className={`text-6xl font-bold ${error ? 'text-red-500' : 'text-slate-900'}`}>{formattedDisplayAmount}</span>
                    </div>
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 animate-shake">
                            <X size={16} className="text-red-500" />
                            <p className="text-xs text-red-600 font-bold">{error}</p>
                        </div>
                    )}
                </div>

                <div 
                    onClick={() => setShowAccountSelector(true)}
                    className={`bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-4 cursor-pointer hover:bg-gray-100 transition-colors border ${error.includes('Saldo') ? 'border-red-200' : 'border-transparent'}`}
                >
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Desde</p>
                        <p className="font-bold text-slate-900">{sourceAccount?.name || 'Cuenta Simple Soles'}</p>
                        <p className={`text-xs ${error.includes('Saldo') ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                            S/ {sourceAccount?.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })} disponibles
                        </p>
                    </div>
                    <ChevronDown className={`text-gray-400 transition-transform ${showAccountSelector ? 'rotate-180' : ''}`} />
                </div>

                <div className="flex-1"></div>
                <NumberPad onPress={handlePress} onDelete={handleDelete} />
                <div className="mt-8 mb-6">
                     <Button onClick={handleContinue}>Continuar</Button>
                </div>
            </div>

            {/* Account Selector Modal */}
            {showAccountSelector && (
                <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end">
                    <div className="bg-white rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Selecciona una cuenta</h3>
                            <button onClick={() => setShowAccountSelector(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {ACCOUNTS.filter(acc => acc.type === 'DEBIT').map(acc => (
                                <div 
                                    key={acc.id}
                                    onClick={() => {
                                        if (setSourceAccount) setSourceAccount(acc);
                                        setShowAccountSelector(false);
                                    }}
                                    className={`p-4 rounded-xl border-2 transition-all ${sourceAccount?.id === acc.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-slate-900">{acc.name}</p>
                                            <p className="text-sm text-gray-500">{acc.number}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-blue-600">{acc.currency === 'PEN' ? 'S/' : '$'} {acc.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
                                            <p className="text-xs text-gray-400">Saldo disponible</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const TransferConfirm: React.FC<FlowProps> = ({ navigate, amount = '0', recipient, sourceAccount, addTransaction }) => {
    const formattedAmount = Number(amount).toFixed(2);
    const commission = (Number(amount) * 0.005).toFixed(2); // 0.5% commission

    const handleConfirm = () => {
        if (addTransaction) {
            addTransaction({
                id: `t-${Date.now()}`,
                title: recipient?.name || 'Transferencia',
                subtitle: 'Transferencia enviada',
                amount: -Number(amount),
                currency: 'PEN',
                date: 'Hoy',
                type: 'expense',
                icon: 'user'
            });
        }
        navigate(Screen.TRANSFER_SUCCESS);
    };

    return (
        <div className="bg-gray-50 h-screen flex flex-col">
            <Header title="Transferencia" onBack={() => navigate(Screen.TRANSFER_AMOUNT)} onClose={() => navigate(Screen.HOME)} />
            
            <div className="flex-1 px-6 pt-4 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2">Confirma tu transferencia</h2>
                <p className="text-gray-500 mb-8">Revisa los detalles antes de confirmar.</p>

                <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 text-center">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Monto a enviar</p>
                    <h3 className="text-4xl font-bold text-blue-600">S/ {formattedAmount}</h3>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        {recipient?.initials === '#' ? (
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">#</div>
                        ) : (
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${recipient?.color || 'bg-blue-100 text-blue-700'}`}>
                                {recipient?.initials || 'JP'}
                            </div>
                        )}
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Destinatario</p>
                            <h4 className="font-bold text-lg">{recipient?.name || 'Juan Perez'}</h4>
                            <p className="text-sm text-gray-500">{recipient?.bank || 'BCP Soles • *4521'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"><Home className="text-gray-600" size={20} /></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Desde mi cuenta</p>
                            <h4 className="font-bold text-lg">{sourceAccount?.name || 'Cuenta Premium Soles'}</h4>
                            <p className="text-sm text-gray-500">Saldo: S/ {sourceAccount?.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500 mb-4 px-2">
                    <span>Comisión de transferencia (0.5%)</span>
                    <span className="text-green-600 font-bold">S/ {commission}</span>
                </div>
                <Button onClick={handleConfirm}>Confirmar transferencia</Button>
            </div>
        </div>
    );
};

export const TransferSuccess: React.FC<FlowProps> = ({ navigate, amount = '0', recipient, sourceAccount }) => {
    const formattedAmount = Number(amount).toFixed(2);
    const [showShareSheet, setShowShareSheet] = React.useState(false);

    const apps = [
        { name: 'WhatsApp', icon: <MessageCircle size={24} className="text-green-500" /> },
        { name: 'Gmail', icon: <Mail size={24} className="text-red-500" /> },
        { name: 'Messenger', icon: <MessageSquare size={24} className="text-blue-500" /> },
        { name: 'Copiar', icon: <Copy size={24} className="text-gray-500" /> },
    ];
    
    return (
        <div className="bg-white min-h-screen flex flex-col p-6 items-center pt-20 relative overflow-hidden">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                    <Check className="text-white w-8 h-8" strokeWidth={3} />
                </div>
            </div>

            <h2 className="text-xl text-gray-600 mb-2">¡Transferencia enviada!</h2>
            <h1 className="text-4xl font-bold text-slate-900 mb-10">S/ {formattedAmount}</h1>

            <div className="w-full bg-gray-50 rounded-3xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">DESTINATARIO</p>
                        <h3 className="font-bold">{recipient?.name || 'Juan Perez'}</h3>
                        <p className="text-xs text-gray-500">{recipient?.bank || 'BCP • *4521'}</p>
                    </div>
                    {recipient?.initials === '#' ? (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">#</div>
                    ) : (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${recipient?.color || 'bg-blue-100 text-blue-700'}`}>
                            {recipient?.initials || 'JP'}
                        </div>
                    )}
                </div>

                <div className="flex justify-between mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">FECHA</p>
                        <p className="font-bold text-sm">20 Feb, 2026</p>
                        <p className="text-xs text-gray-400">21:21 PM</p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-gray-500 mb-1">OPERACIÓN</p>
                         <p className="font-bold text-sm">#98234105</p>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 w-full px-4 mb-8">
                <div className="mt-0.5"><div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"><Check className="text-white w-2.5 h-2.5" /></div></div>
                <p className="text-xs text-gray-500 leading-relaxed">Tu transferencia está protegida y ha sido procesada de forma segura.</p>
            </div>

            <div className="w-full space-y-4">
                <Button 
                    onClick={() => setShowShareSheet(true)}
                    icon={<Share size={20} />} 
                    className="flex items-center justify-center gap-2"
                >
                    Compartir constancia
                </Button>
                <Button variant="ghost" onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
            </div>

            {/* Share Sheet */}
            {showShareSheet && (
                <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end">
                    <div className="bg-white rounded-t-3xl p-8 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold">Compartir vía</h3>
                            <button onClick={() => setShowShareSheet(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {apps.map((app, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => setShowShareSheet(false)}
                                    className="flex flex-col items-center gap-2 cursor-pointer group"
                                >
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                        {app.icon}
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">{app.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
