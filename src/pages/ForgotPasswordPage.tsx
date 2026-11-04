import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('galsa_recovery_email', email);
    }
    onNavigate('/recuperar-password/enviado');
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 py-8 sm:py-14 px-4 sm:px-6 flex flex-col justify-center items-center">
      
      {/* Contenedor blanco principal */}
      <div className="w-full max-w-[1020px] bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 lg:p-8 border-0 shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          
          {/* Columna Izquierda: Imagen 3D en contenedor redondeado */}
          <div className="hidden md:block relative rounded-[22px] overflow-hidden min-h-[460px] bg-slate-50">
            <img
              src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605709248-0-gemini_generated_image_vkzt4nvkzt4nvkzt.webp"
              alt="Recuperación de contraseña GALSA Rent"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="flex flex-col justify-center p-2 sm:p-5 lg:p-7 text-left">
            
            {/* Botón Volver con fondo claro sólo icono sin texto (sin breadcrumb) */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-4 py-3 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[8px] bg-blue-500 hover:bg-blue-600 active:scale-[0.99] text-white text-sm font-heading font-semibold transition-all shadow-none"
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
                  className="font-heading font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                >
                  Inicia sesión
                </button>
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
