import React, { useState, useEffect } from 'react';
import { Screen } from '../types';
import { Button, Header } from '../components/UI';
import { Building2, Lock, ShieldCheck, Camera, User, Eye, EyeOff, Pencil, Calendar, Info, Check, ChevronRight } from 'lucide-react';

interface AuthProps {
  navigate: (screen: Screen) => void;
}

export const LoginScreen: React.FC<AuthProps> = ({ navigate }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    
    if (!dni || !password) {
      setError('Por favor, ingresa tu DNI y contraseña');
      return;
    }

    if (dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (dni === '77665544' && password === 'eder123') {
        navigate(Screen.HOME);
      } else if (dni !== '77665544') {
        setError('El DNI ingresado no está registrado');
        setLoading(false);
      } else {
        setError('La contraseña es incorrecta');
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
                <label className="text-sm font-semibold text-slate-700 ml-1">Contraseña</label>
                <div className="mt-2 relative">
                    <input 
                        type={showPwd ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full bg-gray-50 border ${error.includes('contraseña') ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all`} 
                        placeholder="••••••••" 
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

        <button className="w-full text-center text-blue-600 font-medium text-sm mt-6">Olvidé mi contraseña</button>
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

            <Button onClick={() => navigate(Screen.FACE_ID_SETUP)} className="mb-4">Empezar verificación</Button>
            <div className="text-center text-xs text-gray-400 pb-2 flex items-center justify-center gap-2">
                <Lock size={12} /> Tu información está protegida y encriptada
            </div>
        </div>
    );
};

export const FaceIDSetup: React.FC<AuthProps> = ({ navigate }) => {
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
        <div className="p-6 flex flex-col h-full bg-white items-center justify-between">
            <Header className="w-full" title="" onBack={() => navigate(Screen.VERIFY_IDENTITY)} rightElement={<div className="bg-gray-100 p-2 rounded-full"><div className="text-xs font-bold text-gray-600">?</div></div>} />
            
            <div className="flex flex-col items-center w-full">
                <h2 className="text-2xl font-bold mb-8">{step === 0 ? "Verificación Facial" : "Escaneando..."}</h2>
                
                <div className="relative w-64 h-64">
                    <div className={`absolute inset-0 rounded-full border-4 ${step === 1 ? 'border-blue-600 animate-pulse' : 'border-gray-200'} z-10`}></div>
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-100">
                        <img src="https://i.pravatar.cc/300?u=a042581f4e29026704d" className="w-full h-full object-cover" alt="Selfie" />
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
            <Header title="Confirmar Datos" onBack={() => navigate(Screen.FACE_ID_SETUP)} />
            
            <div className="px-6 mt-2 mb-6">
                <div className="flex justify-between items-center text-sm font-medium mb-2">
                    <span className="text-slate-900">Verificación de Identidad</span>
                    <span className="text-gray-400">Paso 3 de 4</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                </div>
            </div>

            <div className="flex-1 px-6 pb-6 overflow-y-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifica tus datos</h2>
                <p className="text-gray-500 mb-8">Hemos extraído esta información de tu DNI. Edítala si encuentras algún error.</p>

                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">Nombres</label>
                        <div className="mt-1.5 relative">
                            <input type="text" defaultValue="Juan Alberto" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600" />
                            <Pencil className="absolute right-4 top-4 text-blue-600 w-4 h-4" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">Apellidos</label>
                        <div className="mt-1.5 relative">
                            <input type="text" defaultValue="Pérez Quispe" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600" />
                            <Pencil className="absolute right-4 top-4 text-blue-600 w-4 h-4" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">DNI</label>
                            <div className="mt-1.5 relative">
                                <input type="text" defaultValue="45892310" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600" />
                                <Pencil className="absolute right-4 top-4 text-blue-600 w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Nacimiento</label>
                            <div className="mt-1.5 relative">
                                <input type="text" defaultValue="12/05/1990" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600" />
                                <Calendar className="absolute right-4 top-4 text-blue-600 w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mt-6">
                        <Info className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Por favor, asegúrate que tus datos coincidan exactamente con tu documento físico para evitar problemas de verificación.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-2 border-t border-gray-50 bg-white">
                <Button onClick={() => navigate(Screen.CREATE_PASSWORD)}>Confirmar y continuar</Button>
            </div>
        </div>
    );
};

export const CreatePasswordScreen: React.FC<AuthProps> = ({ navigate }) => {
    const [showPwd1, setShowPwd1] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header title="" onBack={() => navigate(Screen.CONFIRM_DATA)} rightElement={<span className="text-xs font-medium text-gray-500">Paso 4 de 4</span>} />
            
             <div className="px-6 mt-2 mb-2">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-full rounded-full"></div>
                </div>
            </div>

            <div className="flex-1 px-6 py-6 overflow-y-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Crea tu contraseña</h2>
                <p className="text-gray-500 mb-8">Esta será tu clave para ingresar a la app</p>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">Nueva contraseña</label>
                        <div className="mt-2 relative">
                            <input 
                                type={showPwd1 ? "text" : "password"} 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all tracking-widest" 
                                placeholder="••••••" 
                            />
                            <button onClick={() => setShowPwd1(!showPwd1)} className="absolute right-4 top-4 text-gray-400">
                                {showPwd1 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">Confirmar contraseña</label>
                        <div className="mt-2 relative">
                            <input 
                                type={showPwd2 ? "text" : "password"} 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all tracking-widest" 
                                placeholder="••••••" 
                            />
                            <button onClick={() => setShowPwd2(!showPwd2)} className="absolute right-4 top-4 text-gray-400">
                                {showPwd2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-10 bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Requisitos de seguridad</h4>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-slate-700">
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="text-white w-3 h-3" strokeWidth={3} />
                            </div>
                            Exactamente 6 dígitos
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center"></div>
                            No usar números consecutivos (123...)
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center"></div>
                            No usar números repetidos (111...)
                        </li>
                         <li className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center"></div>
                            No usar tu fecha de nacimiento o DNI
                        </li>
                    </ul>
                </div>
            </div>

            <div className="p-6 pt-2 border-t border-gray-50 bg-white">
                <Button onClick={() => navigate(Screen.VERIFICATION_SUCCESS)}>Finalizar</Button>
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
                    Ya puedes disfrutar de todos los beneficios de tu cuenta
                </p>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <ShieldCheck className="text-green-600 w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-slate-900 text-sm">Cuenta Premium Activa</h4>
                            <p className="text-xs text-gray-500">Tu seguridad es nuestra prioridad</p>
                        </div>
                    </div>
                    <ChevronRight className="text-gray-300 w-5 h-5" />
                </div>
            </div>

            <Button onClick={() => navigate(Screen.HOME)}>Ir a mi cuenta</Button>
        </div>
    );
};
