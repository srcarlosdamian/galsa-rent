import React, { useState } from 'react';
import { Mail, Lock, KeyRound, CheckCircle2 } from 'lucide-react';
import { GalsaLogo } from '../components/GalsaLogo';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Iniciando sesión como ${email}...`);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 py-8 sm:py-14 px-4 sm:px-6 flex flex-col justify-center items-center">
      
      {/* Contenedor blanco principal sin sombra */}
      <div className="w-full max-w-[1020px] bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 lg:p-8 border-0 shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          
          {/* Columna Izquierda: Imagen en contenedor redondeado */}
          <div className="hidden md:flex flex-col justify-center items-center bg-[#F3F5F9] rounded-[22px] p-6 lg:p-8 min-h-[480px] overflow-hidden">
            <img
              src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605709248-0-gemini_generated_image_vkzt4nvkzt4nvkzt.webp"
              alt="Acceso GALSA Rent"
              className="w-full h-auto max-h-[420px] object-contain drop-shadow-sm"
            />
          </div>

          {/* Columna Derecha: Logo, Pill, Título, Inputs y Acciones */}
          <div className="flex flex-col justify-center p-2 sm:p-5 lg:p-7">
            
            {!showForgot ? (
              <>
                {/* Logo GALSA */}
                <div className="mb-5 flex items-center">
                  <GalsaLogo className="h-6 w-auto text-blue-500" />
                </div>

                {/* Field selector Iniciar sesión / Crear cuenta (homologado con borde de botones rounded-[8px]) */}
                <div className="bg-slate-100 p-1 rounded-[10px] inline-flex items-center mb-6 w-full max-w-[280px]">
                  <button
                    type="button"
                    className="flex-1 py-2 px-3 rounded-[8px] text-xs sm:text-sm font-heading font-semibold bg-white text-slate-900 shadow-xs transition-all"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/registro')}
                    className="flex-1 py-2 px-3 rounded-[8px] text-xs sm:text-sm font-heading font-medium text-slate-600 hover:text-slate-900 transition-all"
                  >
                    Crear cuenta
                  </button>
                </div>

                {/* Título y Subtítulo */}
                <div className="text-left mb-6">
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                    Inicia sesión
                  </h1>
                  <p className="mt-1.5 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                    Con tu cuenta de GALSA reservas en línea y firmas tu contrato digital al instante.
                  </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-heading font-semibold text-slate-800">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tucorreo@ejemplo.com"
                        className="w-full px-4 py-3 rounded-[8px] bg-slate-50/80 border border-slate-200 text-sm font-sans text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.4} />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-heading font-semibold text-slate-800">
                        Contraseña
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgot(true);
                          setForgotSent(false);
                        }}
                        className="text-xs font-heading font-medium text-slate-500 hover:text-slate-800 hover:underline transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-[8px] bg-slate-50/80 border border-slate-200 text-sm font-sans text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.4} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-[8px] bg-blue-500 hover:bg-blue-600 active:scale-[0.99] text-white text-sm font-heading font-semibold transition-all flex items-center justify-center shadow-none"
                    >
                      <span>Iniciar sesión</span>
                    </button>
                  </div>
                </form>

                {/* Pie con switch a registro */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                  <p className="text-xs font-sans text-slate-500">
                    ¿Todavía no tienes una cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('/registro')}
                      className="font-heading font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                    >
                      Créala en un minuto
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Recuperar contraseña */}
                <div className="text-left mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-heading font-semibold mb-3">
                    <KeyRound className="w-3.5 h-3.5" strokeWidth={1.4} />
                    <span>Recuperación de acceso</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                    ¿Olvidaste tu contraseña?
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                    Ingresa tu correo y te enviaremos un enlace seguro para restablecerla al instante.
                  </p>
                </div>

                {!forgotSent ? (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-heading font-semibold text-slate-800">
                        Correo electrónico registrado
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tucorreo@ejemplo.com"
                        className="w-full px-4 py-3 rounded-[8px] bg-slate-50/80 border border-slate-200 text-sm font-sans text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-[8px] bg-blue-500 hover:bg-blue-600 text-white text-sm font-heading font-semibold transition-all shadow-none"
                    >
                      Enviar instrucciones
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowForgot(false)}
                      className="w-full py-2.5 text-xs font-heading font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Regresar a Iniciar sesión
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" strokeWidth={1.4} />
                    </div>
                    <p className="text-sm font-heading font-semibold text-slate-900">
                      ¡Correo enviado!
                    </p>
                    <p className="text-xs font-sans text-slate-600 max-w-xs mx-auto">
                      Revisa tu bandeja de entrada en <strong>{email}</strong> con los pasos para restablecer tu contraseña.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(false);
                        setForgotSent(false);
                      }}
                      className="px-5 py-2.5 rounded-[8px] bg-blue-500 text-white text-xs font-heading font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Volver a iniciar sesión
                    </button>
                  </div>
                )}
              </>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
