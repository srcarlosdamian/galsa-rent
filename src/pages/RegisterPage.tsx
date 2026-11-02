import React, { useState } from 'react';
import { User, Mail, Phone, Lock, CheckCircle2 } from 'lucide-react';
import { GalsaLogo } from '../components/GalsaLogo';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 py-8 sm:py-14 px-4 sm:px-6 flex flex-col justify-center items-center">
      
      {/* Contenedor blanco principal sin sombra */}
      <div className="w-full max-w-[1020px] bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 lg:p-8 border-0 shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          
          {/* Columna Izquierda: Imagen full bleed en contenedor redondeado */}
          <div className="hidden md:block relative rounded-[22px] overflow-hidden min-h-[520px]">
            <img
              src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605709248-0-gemini_generated_image_vkzt4nvkzt4nvkzt.webp"
              alt="Registro GALSA Rent"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Columna Derecha: Logo, Pill, Título, Inputs y Acciones */}
          <div className="flex flex-col justify-center p-2 sm:p-5 lg:p-7">
            
            {!isSuccess ? (
              <>
                {/* Logo GALSA */}
                <div className="mb-5 flex items-center">
                  <GalsaLogo className="h-6 w-auto text-blue-500" />
                </div>

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
                    Con tu cuenta de GALSA reservas en línea en segundos, guardas tus documentos y firmas tu contrato digital.
                  </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Nombre completo */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-slate-800">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Edgar Sierra"
                        className="w-full px-4 py-2.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                      />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
                    </div>
                  </div>

                  {/* Correo electrónico */}
                  <div className="space-y-1 text-left">
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
                        className="w-full px-4 py-2.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-slate-800">
                      Teléfono
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+52 55 0000 0000"
                        className="w-full px-4 py-2.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                      />
                      <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-slate-800">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 8 caracteres"
                        className="w-full px-4 py-2.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
                    </div>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-slate-800">
                      Confirma tu contraseña
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña"
                        className="w-full px-4 py-2.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-[14px] font-heading text-slate-900 placeholder-slate-400 transition-colors pr-11"
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-700 pointer-events-none" strokeWidth={1.4} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-[8px] bg-blue-500 hover:bg-blue-600 active:scale-[0.99] text-white text-sm font-heading font-semibold transition-all shadow-none"
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
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.4} />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  ¡Cuenta creada exitosamente!
                </h2>
                <p className="text-sm font-sans text-slate-600 max-w-sm mx-auto">
                  Bienvenido a GALSA Rent, <strong>{fullName}</strong>. Hemos registrado tu cuenta y tu perfil está listo para reservar.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => onNavigate('/catalogo')}
                    className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-heading font-semibold text-sm transition-all"
                  >
                    Ver autos disponibles
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/login')}
                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-800 font-heading font-semibold text-sm hover:bg-slate-50 transition-all"
                  >
                    Ir a Iniciar sesión
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
