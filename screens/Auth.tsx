import React, { useState, useEffect } from 'react';
import { Screen } from '../types';
import { CURRENT_USER } from '../constants';
import { Button, Header } from '../components/UI';
import { Building2, Lock, ShieldCheck, Camera, User, Eye, EyeOff, Pencil, Calendar, Info, Check, ChevronRight } from 'lucide-react';

interface AuthProps {
  navigate: (screen: Screen) => void;
}

export const LoginScreen: React.FC<AuthProps> = ({ navigate }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [dni, setDni] = useState(() => localStorage.getItem('bancoPeru_savedDni') || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    
    if (!dni || !password) {
      setError('Por favor, ingresa tu DNI y clave');
      return;
    }

    if (dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (dni === '77665544' && password === '123456') {
        localStorage.setItem('bancoPeru_savedDni', dni);
        navigate(Screen.HOME);
      } else if (dni !== '77665544') {
        setError('El DNI ingresado no está registrado');
        setLoading(false);
      } else {
        setError('La clave es incorrecta');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="p-6 flex flex-col h-full justify-between bg-white">
      <div className="mt-12">
        <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl">
                <Building2 className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold ml-3 self-center text-blue-900">BancoPerú</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Hola, bienvenido</h2>
        <p className="text-center text-gray-500 mb-10">Ingresa tus credenciales para continuar</p>

        <div className="space-y-6">
            <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">DNI</label>
                <div className="mt-2 relative">
                    <input 
                      type="number" 
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      className={`w-full bg-gray-50 border ${error.includes('DNI') ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all`} 
                      placeholder="Número de DNI" 
                    />
                    <User className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
                </div>
            </div>

            <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Clave</label>
                <div className="mt-2 relative">
                    <input 
                        type={showPwd ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full bg-gray-50 border ${error.includes('clave') ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all`} 
                        placeholder="Clave de 6 dígitos" 
                    />
                    <button onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-4 text-gray-400">
                        {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-shake">
            <Info className="text-red-500 w-5 h-5 flex-shrink-0" />
            <p className="text-xs text-red-600 font-medium">{error}</p>
          </div>
        )}

        <button className="w-full text-center text-blue-600 font-medium text-sm mt-6">Olvidé mi clave</button>
      </div>

      <div className="space-y-4 mb-4">
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? 'Validando...' : 'Continuar'}
        </Button>
        <div className="flex justify-center gap-1 text-sm">
            <span className="text-gray-500">¿No tienes cuenta?</span>
            <button onClick={() => navigate(Screen.VERIFY_IDENTITY)} className="text-blue-600 font-semibold">Regístrate</button>
        </div>
      </div>
    </div>
  );
};

export const VerifyIdentityScreen: React.FC<AuthProps> = ({ navigate }) => {
    return (
        <div className="p-6 flex flex-col h-full bg-white">
            <Header title="" onBack={() => navigate(Screen.LOGIN)} />
            
            <div className="flex-1 flex flex-col items-center pt-8">
                <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center relative mb-8">
                    <div className="bg-slate-900 w-32 h-32 rounded-lg flex items-center justify-center shadow-xl z-10">
                        <ShieldCheck className="text-blue-400 w-16 h-16" />
                    </div>
                    <div className="absolute bg-white p-2 rounded-full shadow-lg -bottom-2 -right-2 z-20">
                        <div className="bg-blue-600 p-1.5 rounded-full">
                            <ShieldCheck className="text-white w-4 h-4" />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-4">Verifica tu identidad</h2>
                <p className="text-center text-gray-500 px-4">Para activar tu cuenta Premium, necesitamos validar que eres tú. Ten tu DNI a la mano.</p>

                <div className="w-full space-y-4 mt-10">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <User className="text-blue-600 w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900">1. Foto de tu DNI</h4>
                            <p className="text-sm text-gray-500">Asegúrate que sea legible</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <Camera className="text-blue-600 w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900">2. Selfie de seguridad</h4>
                            <p className="text-sm text-gray-500">Sin lentes ni mascarilla</p>
                        </div>
                    </div>
                </div>
            </div>

            <Button onClick={() => navigate(Screen.SCAN_DNI)} className="mb-4">Empezar verificación</Button>
            <div className="text-center text-xs text-gray-400 pb-2 flex items-center justify-center gap-2">
                <Lock size={12} /> Tu información está protegida y encriptada
            </div>
        </div>
    );
};

export const ScanDNIScreen: React.FC<AuthProps> = ({ navigate }) => {
    const [step, setStep] = useState(0);

    // Simulate scanning
    useEffect(() => {
        if (step === 1) {
            const timer = setTimeout(() => {
                navigate(Screen.CONFIRM_DATA);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [step, navigate]);

    return (
        <div className="p-6 flex flex-col min-h-screen bg-slate-900 items-center justify-between text-white">
            <Header className="w-full text-white" title="" onBack={() => navigate(Screen.VERIFY_IDENTITY)} />
            
            <div className="w-full px-6 mt-2 mb-6">
                <div className="flex justify-between items-center text-sm font-medium mb-2">
                    <span className="text-white">Verificación de Identidad</span>
                    <span className="text-slate-400">Paso 1 de 4</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/4 rounded-full"></div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 w-full">
                <h2 className="text-2xl font-bold mb-2 text-center">{step === 0 ? "Escanea tu DNI" : "Procesando..."}</h2>
                <p className="text-center text-slate-400 mb-12 max-w-xs">
                    {step === 0 ? "Coloca la parte frontal de tu DNI dentro del recuadro." : "Por favor, no muevas el documento."}
                </p>
                
                <div className="relative w-full max-w-sm aspect-[1.6/1] mb-8">
                    {/* Camera Viewfinder Simulation */}
                    <div className={`absolute inset-0 border-2 ${step === 1 ? 'border-blue-500 bg-blue-500/10' : 'border-white/30'} rounded-2xl overflow-hidden flex items-center justify-center`}>
                        {step === 0 ? (
                            <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                                <User size={48} className="mb-2" />
                                <div className="w-3/4 h-2 bg-white rounded-full mb-2"></div>
                                <div className="w-1/2 h-2 bg-white rounded-full"></div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                    
                    {/* Corner Guides */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>
                    
                    {/* Scanning Line Animation */}
                    {step === 1 && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    )}
                </div>
            </div>

            {step === 0 && (
                <div className="w-full space-y-4 mb-4">
                     <Button onClick={() => setStep(1)} icon={<Camera size={20} />}>Tomar foto</Button>
                </div>
            )}
            
            <style>{`
                @keyframes scan {
                    0% { top: 0; }
                    50% { top: 100%; }
                    100% { top: 0; }
                }
            `}</style>
        </div>
    );
};

export const FaceIDSetup: React.FC<AuthProps> = ({ navigate }) => {
    const [step, setStep] = useState(0);

    // Simulate scanning
    useEffect(() => {
        if (step === 1) {
            const timer = setTimeout(() => {
                navigate(Screen.CREATE_PASSWORD);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [step, navigate]);

    return (
        <div className="p-6 flex flex-col min-h-screen bg-white items-center justify-between">
            <Header className="w-full" title="" onBack={() => navigate(Screen.CONFIRM_DATA)} />
            
            <div className="w-full px-6 mt-2 mb-6">
                <div className="flex justify-between items-center text-sm font-medium mb-2">
                    <span className="text-slate-900">Verificación de Identidad</span>
                    <span className="text-gray-400">Paso 3 de 4</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                </div>
            </div>

            <div className="flex flex-col items-center w-full flex-1 justify-center">
                <h2 className="text-2xl font-bold mb-8">{step === 0 ? "Verificación Facial" : "Escaneando..."}</h2>
                
                <div className="relative w-64 h-64">
                    <div className={`absolute inset-0 rounded-full border-4 ${step === 1 ? 'border-blue-600 animate-pulse' : 'border-gray-200'} z-10`}></div>
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-100">
                        <img src={CURRENT_USER.avatar} className="w-full h-full object-cover" alt="Selfie" />
                    </div>
                    {step === 1 && (
                         <div className="absolute inset-0 rounded-full border-t-4 border-blue-600 animate-spin z-20"></div>
                    )}
                </div>

                <p className="text-center text-gray-500 mt-8 max-w-xs">
                    {step === 0 ? "Aseguremos tu identidad con una selfie. Coloca tu rostro dentro del círculo." : "Mantén la posición..."}
                </p>
            </div>

            {step === 0 && (
                <div className="w-full space-y-4 mb-4">
                     <Button variant="secondary" onClick={() => setStep(1)} icon={<Camera size={20} />}>Tomar manualmente</Button>
                     <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                        <Lock size={12} /> Datos biométricos encriptados
                    </div>
                </div>
            )}
        </div>
    );
};

export const ConfirmDataScreen: React.FC<AuthProps> = ({ navigate }) => {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Confirmar Datos" onBack={() => navigate(Screen.SCAN_DNI)} />
            
            <div className="px-6 mt-2 mb-6">
                <div className="flex justify-between items-center text-sm font-medium mb-2">
                    <span className="text-slate-900">Verificación de Identidad</span>
                    <span className="text-gray-400">Paso 2 de 4</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-2/4 rounded-full"></div>
                </div>
            </div>

            <div className="flex-1 px-6 pb-6 overflow-y-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifica tus datos</h2>
                <p className="text-gray-500 mb-8">Hemos extraído esta información de tu DNI. Si hay algún error, por favor escanea tu documento nuevamente.</p>

                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">Nombres</label>
                        <div className="mt-1.5 relative">
                            <input type="text" readOnly defaultValue="Alejandro" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-slate-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">Apellidos</label>
                        <div className="mt-1.5 relative">
                            <input type="text" readOnly defaultValue="Pérez Quispe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-slate-500 outline-none" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">DNI</label>
                            <div className="mt-1.5 relative">
                                <input type="text" readOnly defaultValue="45892310" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-slate-500 outline-none" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Nacimiento</label>
                            <div className="mt-1.5 relative">
                                <input type="text" readOnly defaultValue="12/05/1990" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-slate-500 outline-none" />
                                <Calendar className="absolute right-4 top-4 text-gray-400 w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-2 border-t border-gray-50 bg-white space-y-3">
                <Button onClick={() => navigate(Screen.FACE_ID_SETUP)}>Confirmar y continuar</Button>
                <Button variant="secondary" onClick={() => navigate(Screen.SCAN_DNI)}>Volver a escanear DNI</Button>
            </div>
        </div>
    );
};

export const CreatePasswordScreen: React.FC<AuthProps> = ({ navigate }) => {
    const [showPwd1, setShowPwd1] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);
    const [pwd1, setPwd1] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [error, setError] = useState('');

    const handleFinalize = () => {
        if (!pwd1 || !pwd2) {
            setError('Por favor, completa ambos campos');
            return;
        }

        if (pwd1.length !== 6) {
            setError('La clave debe tener exactamente 6 dígitos');
            return;
        }

        if (!/^\d+$/.test(pwd1)) {
            setError('La clave debe contener solo números');
            return;
        }

        if (pwd1 !== pwd2) {
            setError('Las claves no coinciden');
            return;
        }

        // Check for consecutive numbers (e.g., 123456)
        const isConsecutive = (s: string) => {
            for (let i = 0; i < s.length - 1; i++) {
                if (Math.abs(parseInt(s[i]) - parseInt(s[i+1])) !== 1) return false;
            }
            return true;
        };

        if (isConsecutive(pwd1)) {
            setError('No uses números consecutivos');
            return;
        }

        // Check for repeated numbers (e.g., 111111)
        if (/^(\d)\1+$/.test(pwd1)) {
            setError('No uses números repetidos');
            return;
        }

        navigate(Screen.VERIFICATION_SUCCESS);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="Crear Clave" onBack={() => navigate(Screen.FACE_ID_SETUP)} rightElement={<span className="text-xs font-medium text-gray-500">Paso 4 de 4</span>} />
            
             <div className="px-6 mt-2 mb-2">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-full rounded-full"></div>
                </div>
            </div>

            <div className="flex-1 px-6 py-6 overflow-y-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Crea tu clave de 6 dígitos</h2>
                <p className="text-gray-500 mb-8">Esta será tu clave para ingresar a la app</p>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">Nueva clave</label>
                        <div className="mt-2 relative">
                            <input 
                                type={showPwd1 ? "text" : "password"} 
                                value={pwd1}
                                onChange={(e) => {
                                    setPwd1(e.target.value);
                                    setError('');
                                }}
                                maxLength={6}
                                className={`w-full bg-gray-50 border ${error && !pwd2 ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all tracking-widest`} 
                                placeholder="••••••" 
                            />
                            <button onClick={() => setShowPwd1(!showPwd1)} className="absolute right-4 top-4 text-gray-400">
                                {showPwd1 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">Confirmar clave</label>
                        <div className="mt-2 relative">
                            <input 
                                type={showPwd2 ? "text" : "password"} 
                                value={pwd2}
                                onChange={(e) => {
                                    setPwd2(e.target.value);
                                    setError('');
                                }}
                                maxLength={6}
                                className={`w-full bg-gray-50 border ${error && pwd1 !== pwd2 ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all tracking-widest`} 
                                placeholder="••••••" 
                            />
                            <button onClick={() => setShowPwd2(!showPwd2)} className="absolute right-4 top-4 text-gray-400">
                                {showPwd2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                            <Info size={16} />
                            {error}
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 pt-2 border-t border-gray-50 bg-white">
                <Button onClick={handleFinalize}>Finalizar</Button>
            </div>
        </div>
    );
};

export const VerificationSuccessScreen: React.FC<AuthProps> = ({ navigate }) => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col justify-between p-6">
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                     <div className="w-40 h-40 bg-blue-100/50 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                     <div className="w-32 h-32 bg-blue-200/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                     <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center relative z-10 shadow-xl shadow-blue-300">
                         <Check className="text-white w-12 h-12" strokeWidth={3} />
                     </div>
                     
                     <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                     <div className="absolute bottom-4 left-0 w-2 h-2 bg-blue-300 rounded-full"></div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">¡Identidad verificada!</h2>
                <p className="text-gray-500 text-center max-w-xs mb-10">
                    Ya puedes acceder a todos los beneficios de tu banca móvil
                </p>
            </div>

            <Button onClick={() => navigate(Screen.HOME)}>Ir a mi cuenta</Button>
        </div>
    );
};
