import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isFilled = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('galsa_user_email', email.trim() || 'cliente@galsa.com');
      sessionStorage.setItem('galsa_first_login', 'true');
      sessionStorage.setItem('galsa_logged_in', 'true');
    }
    // Redirige a la cuenta donde se despliega el menú flotante para completar el perfil
    onNavigate('/cuenta?completar=1');
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 py-8 sm:py-14 px-4 sm:px-6 flex flex-col justify-center items-center">
      
      {/* Contenedor blanco principal sin sombra */}
      <div className="w-full max-w-[1020px] bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 lg:p-8 border-0 shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          
          {/* Columna Izquierda: Imagen full bleed en contenedor redondeado */}
          <div className="hidden md:block relative rounded-[22px] overflow-hidden min-h-[480px]">
            <img
              src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605709248-0-gemini_generated_image_vkzt4nvkzt4nvkzt.webp"
              alt="Registro GALSA Rent"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Columna Derecha: Logo, Pill, Título, Inputs y Acciones */}
          <div className="flex flex-col justify-center p-2 sm:p-5 lg:p-7">
            
            {/* Field selector Iniciar sesión / Crear cuenta (homologado con borde de botones rounded-[8px]) */}
            <div className="bg-slate-100 p-1 rounded-[10px] inline-flex items-center mb-6 w-full max-w-[280px]">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="flex-1 py-2 px-3 rounded-[8px] text-xs sm:text-sm font-heading font-medium text-slate-600 hover:text-slate-900 transition-all"
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                className="flex-1 py-2 px-3 rounded-[8px] text-xs sm:text-sm font-heading font-semibold bg-white text-slate-900 shadow-xs transition-all"
              >
                Crear cuenta
              </button>
            </div>

            {/* Título y Subtítulo */}
            <div className="text-left mb-6">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                Crea tu cuenta en GALSA
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                Ingresa tus datos de acceso rápido. Podrás completar tu información de conductor al iniciar sesión.
              </p>
            </div>

            {/* Formulario minimalista con lo mínimo (Correo y Contraseña) */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Correo electrónico */}
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

              {/* Contraseña */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-heading font-semibold text-slate-800">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-3 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
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

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-[8px] text-sm font-heading font-semibold transition-all shadow-none cursor-pointer active:scale-[0.99] ${
                    isFilled
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-500'
                  }`}
                >
                  Crear cuenta
                </button>
              </div>
            </form>

            {/* Pie con switch a login */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs font-sans text-slate-500">
                ¿Ya tienes una cuenta registrada?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/login')}
                  className="font-heading font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
