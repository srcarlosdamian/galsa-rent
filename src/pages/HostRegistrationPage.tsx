import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  Landmark,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { CustomDropdown, DropdownOption } from '../components/CustomDropdown';

interface HostRegistrationPageProps {
  onNavigate?: (path: string) => void;
  onBack?: () => void;
}

const CITY_DROPDOWN_OPTIONS: DropdownOption[] = [
  {
    value: 'Durango, Dgo.',
    label: 'Durango, Dgo.',
    subtitle: 'Durango · Sucursal Plaza 450',
    icon: MapPin,
  },
  {
    value: 'Ciudad de México',
    label: 'Ciudad de México',
    subtitle: 'CDMX · Zona Metropolitana',
    icon: MapPin,
  },
  {
    value: 'Guadalajara, Jal.',
    label: 'Guadalajara, Jal.',
    subtitle: 'Jalisco · Área Metropolitana',
    icon: MapPin,
  },
  {
    value: 'Monterrey, N.L.',
    label: 'Monterrey, N.L.',
    subtitle: 'Nuevo León · Área Metropolitana',
    icon: MapPin,
  },
  {
    value: 'Mazatlán, Sin.',
    label: 'Mazatlán, Sin.',
    subtitle: 'Sinaloa · Zona Turística',
    icon: MapPin,
  },
  {
    value: 'Torreón, Coah.',
    label: 'Torreón, Coah.',
    subtitle: 'Coahuila · Comarca Lagunera',
    icon: MapPin,
  },
  {
    value: 'Querétaro, Qro.',
    label: 'Querétaro, Qro.',
    subtitle: 'Querétaro · Centro',
    icon: MapPin,
  },
  {
    value: 'Puebla, Pue.',
    label: 'Puebla, Pue.',
    subtitle: 'Puebla · Área Metropolitana',
    icon: MapPin,
  },
  {
    value: 'Cancún, Q.R.',
    label: 'Cancún, Q.R.',
    subtitle: 'Quintana Roo · Riviera Maya',
    icon: MapPin,
  },
  {
    value: 'Otra ciudad',
    label: 'Otra ciudad en México',
    subtitle: 'Cobertura nacional en expansión',
    icon: MapPin,
  },
];

export const HostRegistrationPage: React.FC<HostRegistrationPageProps> = ({
  onNavigate,
  onBack,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const folioCode = useMemo(
    () => `ANF-${Math.floor(100000 + Math.random() * 900000)}`,
    []
  );

  const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate('/anfitriones');
    }
  };

  // Prototipo: siempre permite continuar aunque los campos no estén llenos
  const handleSubmit = () => {
    setIsSubmitted(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full py-8 md:py-12 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-left space-y-6">
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Editar mi solicitud</span>
          </button>

          {/* Encabezado minimalista de confirmación */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              ¡Solicitud enviada!
            </h1>
            <p className="text-sm sm:text-base font-sans text-slate-600 leading-relaxed">
              Recibimos tus datos de anfitrión y validaremos tu solicitud en 24-48 horas. Te enviaremos las instrucciones a{' '}
              <span className="font-semibold text-slate-900">
                {email.trim() || 'tu correo electrónico'}
              </span>
              .
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-[#3D63FF] text-xs font-heading font-semibold">
                Folio: {folioCode}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-heading font-semibold">
                En revisión · 24-48 hrs
              </span>
            </div>
          </div>

          {/* Contenedor único minimalista con resumen y siguientes pasos */}
          <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
            <div className="p-5 sm:p-6 space-y-3">
              <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500">
                Resumen de tu solicitud
              </h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Titular</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {fullName || 'Carlos Medina Robles'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Correo</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {email.trim() || 'tucorreo@ejemplo.com'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Teléfono</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {phone.trim() || '+52 55 0000 0000'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Ciudad</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {city || 'Durango, Dgo.'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Comisión GALSA</span>
                  <span className="font-heading font-semibold text-[#3D63FF] text-right">
                    33% pagada por el cliente
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3.5">
              <h2 className="text-base font-heading font-bold text-slate-900">
                Siguientes pasos
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#3D63FF] font-heading font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Validamos tu solicitud en un plazo de 24 a 48 horas y te notificamos por correo.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#3D63FF] font-heading font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Completa la carga de tu documentación (INE, factura y fotos de tu vehículo) directamente desde la app de GALSA.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#3D63FF] font-heading font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Registra tu cuenta bancaria en la app para recibir tus depósitos tras cada renta aprobada.
                  </span>
                </li>
              </ul>
            </div>

            <div className="px-5 py-4 sm:px-6 bg-slate-50/50 rounded-b-2xl flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-heading font-bold text-slate-800">
                  Verificación de identidad y vehículo protegida
                </p>
                <p className="text-xs font-sans text-slate-500 mt-0.5 leading-relaxed">
                  GALSA valida la identidad del propietario y la documentación oficial de cada unidad antes de hacerla visible en el catálogo.
                </p>
              </div>
            </div>
          </div>

          {/* Botones finales planos de navegación */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-colors cursor-pointer"
            >
              Volver a anfitriones
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('/')}
              className="px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 font-heading font-semibold text-sm transition-colors cursor-pointer"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 md:py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra superior de navegación idéntica a Completa tu reserva */}
        <div className="mb-8 flex items-center justify-between text-left">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>

          <span className="text-xs font-heading font-medium text-slate-400">
            Registro de anfitriones · 2 min
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* COLUMNA IZQUIERDA: FORMULARIO LINEAL ESTILO COMPLETA TU RESERVA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
                Registro de Anfitriones
              </h1>
              <p className="text-sm font-sans text-slate-500 max-w-2xl leading-relaxed">
                Déjanos tus datos y validamos tu solicitud en 24-48 horas. La carga de documentos y de tu vehículo se completa después desde la app.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              {/* CONTENEDOR LINEAL 1: Datos personales y ciudad */}
              <div className="relative z-20 rounded-2xl border border-slate-200 bg-white overflow-visible">
                <div className="flex items-center gap-3.5 px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                      Datos del anfitrión
                    </h2>
                    <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                      Información personal y ciudad donde publicarás tu vehículo
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Nombre(s)
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ej. Carlos"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Apellidos
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Ej. Medina Robles"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tucorreo@ejemplo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+52 55 0000 0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Ciudad
                      </label>
                      <CustomDropdown
                        options={CITY_DROPDOWN_OPTIONS}
                        value={city}
                        onChange={setCity}
                        placeholder="Selecciona tu ciudad"
                        triggerIcon={MapPin}
                        menuWidthClass="w-full min-w-[260px]"
                        buttonClassName="border-slate-200 hover:border-slate-300 font-sans font-normal"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTENEDOR LINEAL 2: Validación, pagos, términos y envío */}
              <div className="relative z-10 rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3.5 px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                      Validación, pagos y condiciones
                    </h2>
                    <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                      Cómo protegemos tu vehículo y depositamos tus ingresos
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  {/* Bloque informativo lineal */}
                  <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
                    <div className="p-4 flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                        GALSA verifica la identidad y la propiedad de cada vehículo antes de publicarlo. La carga de documentos (INE, factura, fotos) se realiza en el onboarding desde la app.
                      </p>
                    </div>
                    <div className="p-4 flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                        <Landmark className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                        Tu parte de cada renta se deposita en la cuenta bancaria que registres desde la app, con tu cuenta, cuando aprobemos tu registro.
                      </p>
                    </div>
                  </div>

                  {/* Aceptación de términos */}
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#3D63FF] focus:ring-[#3D63FF] accent-[#3D63FF] cursor-pointer shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                      Acepto los{' '}
                      <a
                        href="/terminos"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onNavigate?.('/terminos');
                        }}
                        className="underline font-semibold text-slate-900 hover:text-[#3D63FF] transition-colors"
                      >
                        términos
                      </a>{' '}
                      del programa de anfitriones y el{' '}
                      <a
                        href="/privacidad"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onNavigate?.('/privacidad');
                        }}
                        className="underline font-semibold text-slate-900 hover:text-[#3D63FF] transition-colors"
                      >
                        aviso de privacidad
                      </a>
                      . GALSA suma a cada renta una tarifa de servicio del 33% que paga el cliente.
                    </span>
                  </label>

                  {/* CTA Enviar solicitud alineado a la izquierda (sin sombra, siempre activo en prototipo) */}
                  <div className="pt-1 space-y-2 flex flex-col items-start">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-colors active:scale-[0.98] cursor-pointer"
                    >
                      <span>Enviar solicitud</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs font-sans text-slate-500">
                      El registro toma menos de 2 minutos.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* COLUMNA DERECHA: RESUMEN LATERAL STICKY ESTILO COMPLETA TU RESERVA */}
          <div className="lg:col-span-5 w-full">
            <div className="sticky top-24 bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-7 space-y-5 text-left">
              {/* Cabecera del programa */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#3D63FF] flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-bold text-slate-900 text-base leading-snug">
                    Programa de Anfitriones
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <span className="text-xs font-sans text-slate-500">
                      Marketplace GALSA
                    </span>
                    <span className="text-[11px] font-heading font-semibold text-[#3D63FF] bg-blue-50 px-2 py-0.5 rounded-md">
                      Revisión 24-48 hrs
                    </span>
                  </div>
                </div>
              </div>

              {/* Resumen en vivo de la solicitud */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-800">
                    Resumen de tu solicitud
                  </span>
                  <span className="text-xs font-heading font-semibold text-[#3D63FF]">
                    En vivo
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 font-sans">Titular</span>
                  <span
                    className={`font-heading font-semibold text-right ${
                      fullName ? 'text-slate-900' : 'text-slate-400 font-normal'
                    }`}
                  >
                    {fullName || 'Por completar'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 font-sans">Correo</span>
                  <span
                    className={`font-heading font-semibold text-right truncate max-w-[200px] ${
                      email.trim() ? 'text-slate-900' : 'text-slate-400 font-normal'
                    }`}
                  >
                    {email.trim() || 'Por completar'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 font-sans">Teléfono</span>
                  <span
                    className={`font-heading font-semibold text-right ${
                      phone.trim() ? 'text-slate-900' : 'text-slate-400 font-normal'
                    }`}
                  >
                    {phone.trim() || 'Por completar'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 font-sans">Ciudad</span>
                  <span
                    className={`font-heading font-semibold text-right ${
                      city ? 'text-slate-900' : 'text-slate-400 font-normal'
                    }`}
                  >
                    {city || 'Por completar'}
                  </span>
                </div>
              </div>

              {/* Condiciones del programa */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 space-y-2.5 text-xs sm:text-sm">
                <div className="pb-2 border-b border-slate-100">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-800">
                    Condiciones del programa
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-sans">
                    <Check className="w-3.5 h-3.5 text-[#3D63FF] shrink-0" strokeWidth={2.5} />
                    <span>Tu ingreso por renta</span>
                  </span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    100% de tu tarifa
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-sans">
                    <Check className="w-3.5 h-3.5 text-[#3D63FF] shrink-0" strokeWidth={2.5} />
                    <span>Tarifa de servicio GALSA</span>
                  </span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    33% (la paga el cliente)
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-sans">
                    <Check className="w-3.5 h-3.5 text-[#3D63FF] shrink-0" strokeWidth={2.5} />
                    <span>Tiempo de validación</span>
                  </span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    24 a 48 horas
                  </span>
                </div>
              </div>

              {/* Pie de confianza */}
              <div className="flex items-center justify-center gap-2 pt-1 text-xs font-sans text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Registro protegido por GALSA · Sin costo de alta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
