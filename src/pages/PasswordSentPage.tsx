import React, { useState, useEffect } from 'react';

interface PasswordSentPageProps {
  onNavigate: (path: string) => void;
}

export const PasswordSentPage: React.FC<PasswordSentPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('tu correo registrado');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('galsa_recovery_email');
      if (stored) {
        setEmail(stored);
      }
    }
  }, []);

  return (
    <div className="min-h-[78vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-white">
      {/* Contenido centrado sin contenedor de tarjeta, sin sombra y sin línea de borde */}
      <div className="w-full max-w-[440px] text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Ilustración hasta arriba */}
        <div className="mb-6 flex justify-center">
          <img
            src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793776961458-0-454545.webp"
            alt="Ilustración de correo enviado"
            className="w-48 sm:w-56 h-auto object-contain mx-auto"
          />
        </div>

        {/* Título */}
        <h1 className="text-2xl sm:text-[28px] font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
          ¡Correo enviado!
        </h1>

        {/* Descripción */}
        <p className="mt-3 text-sm font-sans text-slate-600 leading-relaxed max-w-sm mx-auto">
          Revisa tu bandeja de entrada en <strong className="text-slate-900 font-semibold">{email}</strong> con los pasos para restablecer tu contraseña.
        </p>

        {/* Botón de acción */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="w-full py-3.5 px-6 rounded-[10px] bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-heading font-semibold transition-all shadow-xs"
          >
            Volver a iniciar sesión
          </button>

          <p className="text-xs font-sans text-slate-500 pt-2">
            ¿No recibiste el correo?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/recuperar-password')}
              className="text-blue-600 font-heading font-semibold hover:underline"
            >
              Reintentar con otro correo
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
