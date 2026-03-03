import React, { useState } from 'react';
import { Screen, Account, Transaction } from '../../types';
import { Header, Button } from '../../components/UI';
import { ACCOUNTS } from '../../constants';
import { 
    Search, Lightbulb, Droplets, Wifi, GraduationCap, Shield, 
    ChevronRight, Zap, Check, HelpCircle, AlertCircle, Wallet, Share, X,
    FileText, Lock, Building2
} from 'lucide-react';

interface FlowProps {
  navigate: (screen: Screen) => void;
  onSelectService?: (service: any) => void;
  service?: any;
  supply?: string;
  setSupply?: (supply: string) => void;
  amount?: number;
  setAmount?: (amount: number) => void;
  sourceAccount?: Account;
  setSourceAccount?: (account: Account) => void;
  addTransaction?: (tx: Transaction) => void;
  favorites?: any[];
  addFavorite?: (service: any, supply: string) => void;
  paidServices?: string[];
  markServiceAsPaid?: (serviceId: string, supply: string) => void;
  previousScreen?: Screen;
}

// 1. Service Selection Screen
export const ServicesSelect: React.FC<FlowProps> = ({ navigate, onSelectService, favorites = [], setSupply, previousScreen = Screen.HOME }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 1, name: 'Luz', icon: <Lightbulb size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
        { id: 2, name: 'Agua', icon: <Droplets size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
        { id: 3, name: 'Internet y Telefonía', icon: <Wifi size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
        { id: 4, name: 'Educación', icon: <GraduationCap size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
    ];

    const companiesByCategory: Record<string, any[]> = {
        'Luz': [
            { id: 'l1', name: 'Luz del Sur', detail: 'Lima Sur', icon: 'L', color: 'bg-amber-400', type: 'Luz', inputLabel: 'Número de suministro', inputType: 'number', inputPlaceholder: 'Ej. 1234567' },
            { id: 'l2', name: 'Enel', detail: 'Lima Norte', icon: 'E', color: 'bg-orange-500', type: 'Luz', inputLabel: 'Número de cliente', inputType: 'number', inputPlaceholder: 'Ej. 9876543' },
            { id: 'l3', name: 'Electro Dunas', detail: 'Ica', icon: 'E', color: 'bg-yellow-500', type: 'Luz', inputLabel: 'Número de suministro', inputType: 'number', inputPlaceholder: 'Ej. 1234567' },
        ],
        'Agua': [
            { id: 'a1', name: 'Sedapal', detail: 'Lima y Callao', icon: 'S', color: 'bg-blue-500', type: 'Agua', inputLabel: 'Número de suministro', inputType: 'number', inputPlaceholder: 'Ej. 1234567' },
            { id: 'a2', name: 'Epsel', detail: 'Lambayeque', icon: 'E', color: 'bg-cyan-500', type: 'Agua', inputLabel: 'Número de suministro', inputType: 'number', inputPlaceholder: 'Ej. 1234567' },
            { id: 'a3', name: 'Sedapar', detail: 'Arequipa', icon: 'S', color: 'bg-blue-400', type: 'Agua', inputLabel: 'Número de conexión', inputType: 'number', inputPlaceholder: 'Ej. 1234567' },
        ],
        'Internet y Telefonía': [
            { id: 'i1', name: 'Claro', detail: 'Servicios Fijos', icon: 'C', color: 'bg-red-500', type: 'Internet', inputLabel: 'Número de teléfono o DNI', inputType: 'text', inputPlaceholder: 'Ej. 999888777' },
            { id: 'i2', name: 'Movistar', detail: 'Hogar', icon: 'M', color: 'bg-green-500', type: 'Internet', inputLabel: 'Número de teléfono o DNI', inputType: 'text', inputPlaceholder: 'Ej. 999888777' },
            { id: 'i3', name: 'Entel', detail: 'Internet Fijo', icon: 'E', color: 'bg-blue-600', type: 'Internet', inputLabel: 'Número de teléfono o DNI', inputType: 'text', inputPlaceholder: 'Ej. 999888777' },
            { id: 'i4', name: 'DirecTV', detail: 'Televisión', icon: 'D', color: 'bg-sky-500', type: 'Internet', inputLabel: 'DNI del titular', inputType: 'number', inputPlaceholder: 'Ej. 12345678' },
        ],
        'Educación': [
            { id: 'e1', name: 'PUCP', detail: 'Pensiones', icon: 'P', color: 'bg-indigo-600', type: 'Educación', inputLabel: 'Código de alumno', inputType: 'number', inputPlaceholder: 'Ej. 20231234' },
            { id: 'e2', name: 'UPC', detail: 'Pensiones', icon: 'U', color: 'bg-red-600', type: 'Educación', inputLabel: 'Código de alumno', inputType: 'text', inputPlaceholder: 'Ej. U20231234' },
            { id: 'e3', name: 'Universidad de Lima', detail: 'Pensiones', icon: 'U', color: 'bg-orange-600', type: 'Educación', inputLabel: 'Código de alumno', inputType: 'number', inputPlaceholder: 'Ej. 20231234' },
            { id: 'e4', name: 'Toulouse Lautrec', detail: 'Cuotas', icon: 'T', color: 'bg-pink-600', type: 'Educación', inputLabel: 'DNI del alumno', inputType: 'number', inputPlaceholder: 'Ej. 12345678' },
        ]
    };

    const handleSelect = (service: any) => {
        if (onSelectService) onSelectService(service);
        if (setSupply) {
            setSupply(service.savedSupply || '');
        }
        navigate(Screen.SERVICES_DETAILS);
    };

    // Filter companies based on search term
    const getFilteredCompanies = () => {
        if (!searchTerm) return [];
        
        const term = searchTerm.toLowerCase();
        let allCompanies: any[] = [];
        
        if (selectedCategory) {
            allCompanies = companiesByCategory[selectedCategory] || [];
        } else {
            Object.values(companiesByCategory).forEach(companies => {
                allCompanies = [...allCompanies, ...companies];
            });
        }
        
        return allCompanies.filter(company => 
            company.name.toLowerCase().includes(term) || 
            company.detail.toLowerCase().includes(term)
        );
    };

    const filteredCompanies = getFilteredCompanies();
    const isSearching = searchTerm.length > 0;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header 
                title={selectedCategory ? selectedCategory : "Pagar servicios"} 
                onBack={() => selectedCategory ? setSelectedCategory(null) : navigate(previousScreen)} 
            />
            
            <div className="px-6 py-4 flex-1 overflow-y-auto">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-3.5 text-blue-600" size={20} />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={selectedCategory ? `Busca en ${selectedCategory}` : "Busca una empresa o servicio"} 
                        className="w-full bg-white border border-gray-200 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-blue-600 text-sm shadow-sm" 
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {isSearching ? (
                    <>
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Resultados de búsqueda</h3>
                        <div className="space-y-4 pb-6">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company) => (
                                    <button 
                                        key={company.id}
                                        onClick={() => handleSelect(company)}
                                        className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl ${company.color} flex items-center justify-center text-white font-bold text-xl`}>
                                                {company.icon}
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-bold text-slate-900">{company.name}</h4>
                                                <p className="text-sm text-gray-500">{company.detail}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="text-gray-300" size={20} />
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-8">No se encontraron resultados para "{searchTerm}"</p>
                            )}
                        </div>
                    </>
                ) : !selectedCategory ? (
                    <>
                        {/* Categories Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {categories.map((cat) => (
                                <button 
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-3 hover:border-blue-200 active:scale-[0.98] transition-all"
                                >
                                    <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center`}>
                                        {cat.icon}
                                    </div>
                                    <span className="font-semibold text-slate-900">{cat.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Favorites List */}
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Favoritos</h3>
                        <div className="space-y-4 pb-6">
                            {favorites.map((fav) => (
                                <button 
                                    key={fav.id}
                                    onClick={() => handleSelect(fav)}
                                    className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl ${fav.color} flex items-center justify-center text-white font-bold text-xl`}>
                                            {fav.icon}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-slate-900">{fav.name}</h4>
                                            <p className="text-sm text-gray-500">{fav.detail}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-gray-300" size={20} />
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Empresas de {selectedCategory}</h3>
                        <div className="space-y-4 pb-6">
                            {companiesByCategory[selectedCategory]?.map((company) => (
                                <button 
                                    key={company.id}
                                    onClick={() => handleSelect(company)}
                                    className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl ${company.color} flex items-center justify-center text-white font-bold text-xl`}>
                                            {company.icon}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-slate-900">{company.name}</h4>
                                            <p className="text-sm text-gray-500">{company.detail}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-gray-300" size={20} />
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// 2. Service Details (Input Supply)
export const ServicesDetails: React.FC<FlowProps> = ({ navigate, service, supply, setSupply, addFavorite }) => {
    const [saveFavorite, setSaveFavorite] = useState(false);

    if (!service) return null;

    const handleContinue = () => {
        if (supply && supply.length > 3) {
            if (saveFavorite && addFavorite) {
                addFavorite(service, supply);
            }
            navigate(Screen.SERVICES_DEBT);
        } else {
            alert('Por favor ingresa un número válido.');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="" onBack={() => navigate(Screen.SERVICES_SELECT)} />
            
            <div className="px-6 flex-1 overflow-y-auto">
                 <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">PASO 2 DE 3</p>
                 <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-6">
                    <div className="bg-blue-600 w-2/3 h-full rounded-full"></div>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Detalles del servicio</h1>

                {/* Selected Company */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${service.color || 'bg-blue-500'} flex items-center justify-center text-white font-bold`}>
                            {service.icon || <Building2 size={20} />}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">EMPRESA</p>
                            <h4 className="font-bold text-slate-900 text-lg">{service.name}</h4>
                        </div>
                    </div>
                </div>

                {/* Input */}
                <label className="block text-slate-900 font-medium text-lg mb-3">{service.inputLabel || 'Número de suministro / código'}</label>
                <div className="relative mb-3">
                    <input 
                        type={service.inputType || 'text'} 
                        value={supply || ''}
                        onChange={(e) => setSupply && setSupply(e.target.value)}
                        placeholder={service.inputPlaceholder || "Ej. 1234567"}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Ingresa el dato solicitado para buscar tus recibos pendientes.
                </p>

                {/* Save Favorite */}
                <div className="flex items-center gap-3 mb-8">
                     <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            checked={saveFavorite}
                            onChange={(e) => setSaveFavorite(e.target.checked)}
                            className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-300 transition-all checked:border-blue-600 checked:bg-blue-600" 
                        />
                        <Check size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" strokeWidth={4} />
                    </div>
                    <div>
                        <p className="text-slate-900 font-medium">Guardar en mis favoritos</p>
                        <p className="text-xs text-gray-500">Para futuros pagos rápidos</p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
                <Button onClick={handleContinue} disabled={!supply || supply.length < 4}>Continuar</Button>
            </div>
        </div>
    );
};

// 3. Debt Selection (Pending Bills)
export const ServicesDebt: React.FC<FlowProps> = ({ navigate, service, supply, setAmount, paidServices = [] }) => {
    const isPaid = service && supply ? paidServices.includes(`${service.id}-${supply}`) : false;

    const bills = React.useMemo(() => {
        if (!service || isPaid) return [];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const getBillData = (monthsAgo: number) => {
            let m = currentMonth - monthsAgo;
            let y = currentYear;
            if (m < 0) {
                m += 12;
                y -= 1;
            }
            const dueDate = new Date(y, m, 15);
            dueDate.setHours(23, 59, 59, 999);
            const isOverdue = today > dueDate;
            
            return {
                month: m,
                year: y,
                status: `${isOverdue ? 'Vencido' : 'Vence'} 15 ${months[m].slice(0, 3)}`,
                color: isOverdue ? 'text-red-500' : 'text-orange-500'
            };
        };

        const bill1 = getBillData(2);
        const bill2 = getBillData(1);

        let baseAmount = 50;
        if (service.type === 'Luz') baseAmount = 125.40;
        else if (service.type === 'Agua') baseAmount = 42.80;
        else if (service.type === 'Internet') baseAmount = 109.90;
        else if (service.type === 'Educación') baseAmount = 950.00;

        // Personalize amount based on service ID
        const seed = String(service.id).split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        const getAmount = (base: number, offset: number) => base + (seed % 25) + (offset * 3.25);

        return [
            { 
                id: 0, 
                month: `${months[bill1.month]} ${bill1.year}`, 
                amount: getAmount(baseAmount, 0), 
                status: bill1.status, 
                color: bill1.color 
            },
            { 
                id: 1, 
                month: `${months[bill2.month]} ${bill2.year}`, 
                amount: getAmount(baseAmount, 1), 
                status: bill2.status, 
                color: bill2.color 
            }
        ];
    }, [service]);

    const [selected, setSelected] = useState(bills.map(() => true));
    
    if (!service) return null;

    const totalAmount = bills.reduce((acc, bill, index) => selected[index] ? acc + bill.amount : acc, 0);

    const handleContinue = () => {
        if (setAmount) setAmount(totalAmount);
        navigate(Screen.SERVICES_CONFIRM);
    };

    const selectAll = () => {
        const allSelected = selected.every(Boolean);
        setSelected(selected.map(() => !allSelected));
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Recibos pendientes" onBack={() => navigate(Screen.SERVICES_DETAILS)} />

            <div className="px-6 py-4 flex-1 flex flex-col">
                {/* Header Info */}
                <div className="flex items-center gap-4 mb-6">
                     <div className={`w-14 h-14 rounded-2xl ${service.color || 'bg-blue-500'} flex items-center justify-center shadow-lg text-white font-bold text-2xl`}>
                        {service.icon || <Building2 size={28} />}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{service.name}</h2>
                        <p className="text-sm text-gray-500">Suministro {supply}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">SELECCIONAR DEUDA</span>
                    {!isPaid && bills.length > 0 && (
                        <button onClick={selectAll} className="text-blue-600 font-bold text-sm">
                            {selected.every(Boolean) ? 'Deseleccionar todo' : 'Seleccionar todo'}
                        </button>
                    )}
                </div>

                {isPaid || bills.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                            <Check className="text-green-500 w-10 h-10" strokeWidth={3} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Estás al día</h3>
                        <p className="text-gray-500 max-w-xs">No tienes recibos pendientes de pago para este suministro.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bills.map((bill, index) => (
                            <div key={bill.id} className={`bg-white p-4 rounded-2xl border-2 transition-all ${selected[index] ? 'border-blue-600 shadow-md' : 'border-transparent shadow-sm'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{bill.month}</h4>
                                        <div className={`flex items-center gap-1 mt-1 ${bill.color}`}>
                                            {index < 2 && <AlertCircle size={12} />}
                                            <span className="text-xs font-bold">{bill.status}</span>
                                        </div>
                                    </div>
                                    <div 
                                        onClick={() => {
                                            const newSelected = [...selected];
                                            newSelected[index] = !newSelected[index];
                                            setSelected(newSelected);
                                        }}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${selected[index] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
                                    >
                                        {selected[index] && <Check size={14} className="text-white" strokeWidth={3} />}
                                    </div>
                                </div>
                                <p className="text-right text-lg font-bold text-slate-900">S/ {bill.amount.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex-1"></div>

                {/* Bottom Card Summary */}
                {!isPaid && bills.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-8 mb-4">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-4">
                            <span className="text-gray-500 font-medium">Total a pagar</span>
                            <div className="flex items-end gap-1">
                                <span className="text-sm font-bold text-gray-400 mb-1">S/</span>
                                <span className="text-3xl font-bold text-slate-900">{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button onClick={handleContinue} disabled={totalAmount === 0} icon={<ChevronRight className="order-last" />}>
                            Continuar
                        </Button>
                    </div>
                )}
                
                {(isPaid || bills.length === 0) && (
                    <div className="mt-8 mb-4">
                        <Button onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// 4. Payment Confirmation
export const ServicesConfirm: React.FC<FlowProps> = ({ navigate, service, supply, amount, sourceAccount, setSourceAccount, addTransaction, markServiceAsPaid }) => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    
    if (!service || !sourceAccount) return null;

    const handleConfirm = () => {
        if (addTransaction && amount) {
            addTransaction({
                id: Math.random().toString(),
                title: service.name,
                subtitle: `Pago de servicio - ${supply}`,
                amount: -amount,
                currency: 'PEN',
                date: 'Hoy',
                type: 'expense'
            });
        }
        if (markServiceAsPaid && supply) {
            markServiceAsPaid(service.id, supply);
        }
        navigate(Screen.SERVICES_SUCCESS);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header title="Confirma tu pago" onBack={() => navigate(Screen.SERVICES_DEBT)} />

            <div className="px-6 py-2 flex justify-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>
                <div className="w-8 h-1.5 bg-blue-600 rounded-full"></div>
            </div>

            <div className="px-6 flex-1 overflow-y-auto pb-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="text-center mb-8 border-b border-gray-50 pb-6">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">TOTAL A PAGAR</p>
                        <h1 className="text-4xl font-bold text-slate-900">S/ {amount?.toFixed(2)}</h1>
                    </div>

                    <div className="space-y-6">
                        {/* Service Item */}
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl ${service.color || 'bg-blue-500'} flex items-center justify-center shrink-0 text-white font-bold`}>
                                {service.icon || <Building2 size={20} />}
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Servicio</p>
                                <h4 className="font-bold text-slate-900">{service.name}</h4>
                            </div>
                        </div>

                         {/* Supply Item */}
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                                <FileText className="text-slate-600" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Suministro</p>
                                <h4 className="font-bold text-slate-900">{supply}</h4>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* From Account Dropdown */}
                        <div className="space-y-2">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Medio de pago</p>
                            <div 
                                onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${isSelectorOpen ? 'border-blue-600 bg-blue-50' : 'border-gray-50 bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sourceAccount.type === 'CREDIT' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                        <Wallet size={16} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{sourceAccount.name}</p>
                                        <p className="text-[10px] text-gray-500">
                                            **** {sourceAccount.number.slice(-4)}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className={`text-gray-400 transition-transform ${isSelectorOpen ? 'rotate-90' : ''}`} size={18} />
                            </div>

                            {isSelectorOpen && (
                                <div className="mt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                                    {ACCOUNTS.map((acc) => (
                                        <div 
                                            key={acc.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (setSourceAccount) setSourceAccount(acc);
                                                setIsSelectorOpen(false);
                                            }}
                                            className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${sourceAccount.id === acc.id ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-white'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${acc.type === 'CREDIT' ? 'bg-purple-50 text-purple-500' : 'bg-blue-50 text-blue-500'}`}>
                                                    <Wallet size={14} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-xs">{acc.name}</p>
                                                    <p className="text-[10px] text-gray-400">
                                                        {acc.currency === 'PEN' ? 'S/' : '$'} {acc.balance.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            {sourceAccount.id === acc.id && (
                                                <Check size={14} className="text-blue-600" strokeWidth={3} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                    <Lock size={14} />
                    <span className="text-xs font-medium">Pagos 100% seguros y encriptados</span>
                </div>
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
                <Button onClick={handleConfirm} icon={<Check size={18} className="order-last" />}>Confirmar pago</Button>
            </div>
        </div>
    );
};

// 5. Success Screen
export const ServicesSuccess: React.FC<FlowProps> = ({ navigate, service, amount, sourceAccount }) => {
    if (!service || !sourceAccount) return null;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col p-6 pt-12 items-center relative">
            <div className="w-full flex items-center justify-between mb-10">
                <span className="text-lg font-bold text-slate-900 mx-auto">Comprobante</span>
            </div>

            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                 <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-200">
                    <Check className="text-white w-10 h-10" strokeWidth={3} />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Pago exitoso!</h2>
            <h1 className="text-4xl font-bold text-slate-900 mb-10">S/ {amount?.toFixed(2)}</h1>

            <div className="w-full bg-white rounded-3xl p-6 shadow-sm mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${service.color || 'bg-blue-500'} flex items-center justify-center text-white font-bold`}>
                        {service.icon || <Building2 size={24} />}
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">SERVICIO</p>
                        <h3 className="font-bold text-lg text-slate-900">{service.name}</h3>
                    </div>
                </div>

                <div className="h-px bg-gray-100 border-t border-dashed border-gray-300 mb-6"></div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Nro. Operación</span>
                        <span className="font-bold text-slate-900">#{Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fecha</span>
                        <div className="text-right">
                             <p className="font-bold text-slate-900">
                                 {new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })} • {new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                             </p>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500">Medio de pago</span>
                        <div className="flex items-center gap-2">
                             <span className="font-bold text-slate-900">{sourceAccount.name} **** {sourceAccount.number.slice(-4)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mt-auto mb-6 space-y-4">
                <Button icon={<Share size={20} />} className="flex items-center justify-center gap-2">Compartir comprobante</Button>
                <Button variant="outline" onClick={() => navigate(Screen.HOME)}>Volver al inicio</Button>
            </div>
        </div>
    );
};
