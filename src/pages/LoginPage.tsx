import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { AuthCardLayout } from '../components/AuthCardLayout';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFilled = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      if (email.trim()) {
        sessionStorage.setItem('galsa_user_email', email.trim());
      }
      sessionStorage.setItem('galsa_logged_in', 'true');
      // Si no ha completado el perfil, activa el menú flotante de completar información
      const hasName = sessionStorage.getItem('galsa_user_name');
      if (!hasName) {
        sessionStorage.setItem('galsa_first_login', 'true');
      }
    }
    // Redirige a la cuenta con el menú flotante activo para primer inicio
    onNavigate('/cuenta?completar=1');
  };

  return (
    <AuthCardLayout imageAlt="Acceso GALSA Rent">
      {/* Field selector Iniciar sesión / Crear cuenta (homologado con borde de botones rounded-[8px]) */}
      <div className="bg-slate-100 p-1 rounded-[10px] inline-flex items-center mb-6 w-full max-w-[280px]">
        <button
          type="button"
          className="flex-1 py-2 px-3 rounded-[8px] text-xs sm:text-sm font-heading font-semibold bg-white text-slate-900 transition-all"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="w-full px-4 py-3 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-heading font-semibold text-slate-800">
              Contraseña
            </label>
            <button
              type="button"
              onClick={() => onNavigate('/recuperar-password')}
              className="text-xs font-heading font-medium text-slate-500 hover:text-slate-800 hover:underline transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className={`w-full py-3.5 rounded-[8px] text-sm font-heading font-semibold transition-all flex items-center justify-center shadow-none cursor-pointer active:scale-[0.99] ${
              isFilled
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-500'
            }`}
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
    </AuthCardLayout>
  );
};
