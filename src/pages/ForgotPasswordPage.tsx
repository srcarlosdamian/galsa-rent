import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthCardLayout } from '../components/AuthCardLayout';

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  const isFilled = email.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('galsa_recovery_email', email.trim() || 'cliente@galsa.com');
    }
    // Permite avanzar a la siguiente pantalla incluso si no se llena (prototipo interactivo)
    onNavigate('/recuperar-password/enviado');
  };

  return (
    <AuthCardLayout imageAlt="Recuperación de contraseña GALSA Rent" imageMinHeightClass="min-h-[460px]">
      <div className="text-left">
        {/* Botón Volver con fondo claro sólo icono sin texto (sin breadcrumb) */}
        <div className="mb-4">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                title="Volver"
                aria-label="Volver"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
              </button>
            </div>

            {/* Título y Subtítulo */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                Ingresa tu correo y te enviaremos un enlace seguro para restablecerla al instante.
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-heading font-semibold text-slate-800">
                  Correo electrónico registrado
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-4 py-3 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-cta focus:ring-1 focus:ring-cta focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-[8px] text-sm font-heading font-semibold transition-all shadow-none cursor-pointer active:scale-[0.99] ${
                    isFilled
                      ? 'bg-cta hover:bg-cta-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-500'
                  }`}
                >
                  Enviar instrucciones
                </button>
              </div>
            </form>

            {/* Pie con switch a login */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs font-sans text-slate-500">
                ¿Recordaste tu contraseña?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/login')}
                  className="font-heading font-semibold text-slate-900 hover:text-cta hover:underline"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
      </div>
    </AuthCardLayout>
  );
};
