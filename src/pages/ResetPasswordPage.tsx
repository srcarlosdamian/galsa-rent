import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface ResetPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Verifícalas e intenta nuevamente.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[78vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-slate-50/50">
      <div className="w-full max-w-[460px] bg-white rounded-[24px] p-8 sm:p-10 shadow-sm border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
        
        {!submitted ? (
          <>
            {/* Encabezado */}
            <div className="text-left mb-6">
              <h1 className="text-2xl sm:text-[26px] font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                Crea tu nueva contraseña
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                Introduce tu nueva contraseña segura para acceder a tu cuenta de GALSA Rent.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-heading text-rose-700">
                {error}
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nueva contraseña */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-heading font-semibold text-slate-800">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-3 rounded-[10px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirmar nueva contraseña */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-heading font-semibold text-slate-800">
                  Confirmar nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    className="w-full px-4 py-3 rounded-[10px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-500 pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[10px] bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-heading font-semibold transition-all shadow-xs"
                >
                  Restablecer contraseña
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="text-xs font-heading font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cancelar y volver al inicio de sesión
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" strokeWidth={1.8} />
            </div>
            <h2 className="text-xl font-heading font-bold text-slate-900">
              ¡Contraseña restablecida!
            </h2>
            <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-sm mx-auto">
              Tu contraseña ha sido actualizada con éxito. Ahora puedes iniciar sesión con tus nuevas credenciales.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="w-full py-3.5 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-heading font-semibold transition-colors"
              >
                Iniciar sesión ahora
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
