import React, { useState } from 'react';
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

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
    <div className="min-h-[85vh] bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[500px]">
        
        {/* Pill selector Iniciar sesión / Crear cuenta */}
        <div className="bg-slate-200/80 p-1 rounded-full flex items-center mb-8 max-w-[320px] mx-auto">
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="flex-1 py-2 px-4 rounded-full text-xs sm:text-sm font-heading font-medium text-slate-600 hover:text-slate-900 transition-all"
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className="flex-1 py-2 px-4 rounded-full text-xs sm:text-sm font-heading font-semibold bg-white text-slate-900 shadow-xs transition-all"
          >
            Crear cuenta
          </button>
        </div>

        {/* Tarjeta de Registro */}
        <div className="bg-white rounded-[24px] border border-slate-200/80 p-7 sm:p-9 shadow-xs">
          
          {!isSuccess ? (
            <>
              {/* Header amigable */}
              <div className="text-left mb-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-heading font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={1.4} />
                  <span>En menos de 1 minuto</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                  Crea tu cuenta en GALSA
                </h1>
                <p className="mt-2 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                  Con tu cuenta de GALSA —la misma de la app— reservas en línea en segundos, guardas tus documentos y firmas tu contrato digital.
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Nombre completo */}
                <div className="space-y-1.5 text-left">
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
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <User className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.4} />
                  </div>
                </div>

                {/* Correo electrónico */}
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
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.4} />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="space-y-1.5 text-left">
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
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.4} />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="space-y-1.5 text-left">
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
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.4} />
                  </div>
                </div>

                {/* Confirmar Contraseña */}
                <div className="space-y-1.5 text-left">
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
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.4} />
                  </div>
                </div>

                {/* Botón CTA Crear mi cuenta */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-[0.99] text-white text-sm font-heading font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Crear mi cuenta</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.4} />
                  </button>
                </div>

                {/* Nota amigable sobre el código de confirmación */}
                <p className="text-center text-xs font-sans text-slate-500 pt-1 leading-relaxed">
                  Después te enviamos un código a tu correo para confirmar que es tuyo.
                </p>
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
            /* Pantalla de confirmación de código */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" strokeWidth={1.4} />
              </div>
              <h2 className="text-2xl font-heading font-bold text-slate-900">
                ¡Casi listo, {fullName.split(' ')[0]}!
              </h2>
              <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-sm mx-auto leading-relaxed">
                Te enviamos un código de 6 dígitos a <strong>{email}</strong> para confirmar que es tuyo.
              </p>

              <div className="pt-2 max-w-xs mx-auto">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  className="w-full text-center tracking-[0.5em] text-xl font-mono py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/catalogo')}
                  className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-heading font-semibold transition-all"
                >
                  Confirmar y explorar autos
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Garantía de Seguridad */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-sans">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.4} />
          <span>Tus datos están protegidos conforme a nuestro Aviso de Privacidad</span>
        </div>

      </div>
    </div>
  );
};
