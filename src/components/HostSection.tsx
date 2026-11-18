import React, { useState } from 'react';
import { 
  Check, ShieldCheck, Clock, Award, Sliders, ArrowRight,
  UserPlus, Car, CheckCircle2, CalendarCheck, Wallet
} from 'lucide-react';

interface HostSectionProps {
  isFullPage?: boolean;
}

export const HostSection: React.FC<HostSectionProps> = ({ isFullPage = true }) => {
  // Calculadora interactiva (SIN selector de tipo de vehículo por requerimiento)
  const [dailyRate, setDailyRate] = useState(1200);
  const [daysPerMonth, setDaysPerMonth] = useState(15);

  const hostEarnings = dailyRate * daysPerMonth;
  const galsaFee = Math.round(hostEarnings * 0.33);
  const clientTotal = hostEarnings + galsaFee;
  const annualProjection = hostEarnings * 12;

  const BENEFITS = [
    {
      title: 'Control total',
      description: 'Tú defines precios, disponibilidad y qué reservas aceptas.',
      image: '/images/step-img-1.webp',
      icon: Sliders,
    },
    {
      title: 'Pagos a tu cuenta',
      description: 'Cobramos al cliente y te depositamos tu parte en la cuenta que registres.',
      image: '/images/step-img-2.webp',
      icon: Award,
    },
    {
      title: 'Seguro y verificación',
      description: 'Cobertura durante la renta y clientes con identidad verificada.',
      image: '/images/step-img-3.webp',
      icon: ShieldCheck,
    },
    {
      title: 'Soporte 24/7',
      description: 'Equipo dedicado para anfitriones y asistencia en carretera.',
      image: '/images/step-img-4.webp',
      icon: Clock,
    },
    {
      title: 'Tarifa transparente',
      description: 'El 33% de servicio lo paga el cliente. Sin cargos ocultos.',
      image: '/images/step-img-1.webp',
      icon: Check,
    },
    {
      title: 'Más ocupación',
      description: 'Recomendaciones de precio dinámico según la demanda de tu ciudad.',
      image: '/images/step-img-2.webp',
      icon: ArrowRight,
    },
  ];

  const STEPS = [
    {
      num: 1,
      title: 'Regístrate',
      description: 'Crea tu cuenta de anfitrión con tus datos.',
      image: '/images/step-img-1.webp',
      icon: UserPlus,
    },
    {
      num: 2,
      title: 'Valida tu identidad',
      description: 'Verificamos tu identidad y documentación.',
      image: '/images/step-img-2.webp',
      icon: ShieldCheck,
    },
    {
      num: 3,
      title: 'Carga tu vehículo',
      description: 'Sube fotos, documentos y datos del auto.',
      image: '/images/step-img-3.webp',
      icon: Car,
    },
    {
      num: 4,
      title: 'Recibe aprobación',
      description: 'GALSA revisa tu vehículo en 24-48 horas.',
      image: '/images/step-img-4.webp',
      icon: CheckCircle2,
    },
    {
      num: 5,
      title: 'Recibe reservas',
      description: 'Tu auto aparece en el catálogo y empieza a recibir solicitudes.',
      image: '/images/trust-safety.webp',
      icon: CalendarCheck,
    },
    {
      num: 6,
      title: 'Cobra',
      description: 'Recibes tu parte de cada renta en la cuenta que registraste.',
      image: '/images/renta-galsa.webp',
      icon: Wallet,
    },
  ];

  const HOW_IT_WORKS_CARDS = [
    {
      img: '/images/host-step-1.jpg',
      title: 'Publica tu auto',
      description: 'Registra tu vehículo, define tu disponibilidad y elige tu precio con ayuda de nuestro motor de tarifas.',
    },
    {
      img: '/images/host-step-2.jpg',
      title: 'Aprueba reservas',
      description: 'Clientes verificados solicitan tu auto y tú decides a quién le dices que sí.',
    },
    {
      img: '/images/host-step-3.jpg',
      title: 'Cobra tu tarifa',
      description: 'GALSA cobra al cliente la renta más su tarifa de servicio y te deposita tu parte en la cuenta que registres.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* SECCIÓN 1: HERO & CALCULADORA A LA DERECHA */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow de cabecera con programa y simulador interactivo con línea divisora */}
          <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-slate-200 mb-8 sm:mb-10 text-left">
            <span className="text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider text-slate-400">
              PROGRAMA DE AFILIACIONES GALSA
            </span>
            <span className="text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider text-slate-400">
              SIMULADOR INTERACTIVO
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* LADO IZQUIERDO: Título, Descripción, Checks destacados y Botón CTA */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                Convierte tu auto en ingresos
              </h1>
              <p className="text-sm sm:text-base font-sans text-slate-600 leading-relaxed">
                Tú fijas precio y disponibilidad, y apruebas cada reserva. GALSA se encarga de verificar clientes, firmar contratos y cobrar. Recibes el 100% de tu tarifa fijada.
              </p>

              {/* 3 Checks destacados */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-blue-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-slate-900">
                      33% comisión al cliente
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                      Tú recibes el 100% de la tarifa que fijas, el cliente cubre la comisión de servicio.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-blue-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-slate-900">
                      100% de la tarifa para ti
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                      Sin descuentos, sin retenciones. Recibes íntegro lo que estableces por día.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-blue-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-slate-900">
                      24–48h revisión de solicitud
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                      Respuesta rápida en la plataforma. Tú apruebas cada reserva con total control.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón CTA oficial */}
              <div className="pt-4">
                <a
                  href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20quiero%20publicar%20mi%20auto%20como%20anfitri%C3%B3n%20en%20Durango"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-white text-sm font-heading font-semibold px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all active:scale-[0.98]"
                >
                  <span>Publicar mi auto en GALSA</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* LADO DERECHO: SIMULADOR DE INGRESOS A LA DERECHA (Con fondo 50 gris neutral y sin selector de vehículo) */}
            <div className="lg:col-span-6 w-full text-left">
              <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-none space-y-6">
                
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-slate-900">
                    Calcula cuánto recibirás al mes
                  </h3>
                  <p className="text-xs font-sans text-slate-500 mt-0.5">
                    Ajusta tu tarifa y días de disponibilidad para proyectar tus ingresos netos.
                  </p>
                </div>

                {/* Control 1: Tarifa diaria (SIN selector de tipo de vehículo) */}
                <div>
                  <div className="flex justify-between items-center text-xs sm:text-sm mb-2.5">
                    <span className="font-heading font-medium text-slate-700">Tu tarifa fijada por día</span>
                    <span className="font-heading font-bold text-slate-900 text-base">
                      ${dailyRate.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                  <input
                    type="range"
                    min={600}
                    max={3000}
                    step={50}
                    value={dailyRate}
                    onChange={(e) => setDailyRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-sans text-slate-400 mt-1.5">
                    <span>$600 (Económico)</span>
                    <span>$1,400 (Medio)</span>
                    <span>$3,000 (Ejecutivo)</span>
                  </div>
                </div>

                {/* Control 2: Días al mes */}
                <div>
                  <div className="flex justify-between items-center text-xs sm:text-sm mb-2.5">
                    <span className="font-heading font-medium text-slate-700">Días que decides rentarlo al mes</span>
                    <span className="font-heading font-bold text-slate-900 text-base">
                      {daysPerMonth} días
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    step={1}
                    value={daysPerMonth}
                    onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-sans text-slate-400 mt-1.5">
                    <span>3 días (Fines de semana)</span>
                    <span>15 días (Medio mes)</span>
                    <span>30 días (Mes completo)</span>
                  </div>
                </div>

                {/* Tarjeta de estimación con fondo gris 50 y diseño neutral */}
                <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50 space-y-4">
                  <span className="text-[11px] font-heading font-bold tracking-wider text-slate-500 uppercase block">
                    TU INGRESO NETO MENSUAL ESTIMADO
                  </span>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
                      ${hostEarnings.toLocaleString('es-MX')}
                    </span>
                    <span className="text-xs font-heading font-bold text-slate-500 uppercase">
                      MXN
                    </span>
                  </div>

                  <div className="border-t border-slate-200/80 pt-3 space-y-2 text-xs sm:text-sm font-sans text-slate-600">
                    <div className="flex justify-between items-center">
                      <span>Tus rentas del mes</span>
                      <span className="font-heading font-bold text-slate-900">
                        ${hostEarnings.toLocaleString('es-MX')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Tarifa GALSA (33%)</span>
                      <span className="font-heading font-bold text-slate-900">
                        ${galsaFee.toLocaleString('es-MX')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Lo que pagan clientes</span>
                      <span className="font-heading font-bold text-slate-900">
                        ${clientTotal.toLocaleString('es-MX')}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200/80 pt-3">
                    <span className="text-[11px] font-heading font-bold tracking-wider text-slate-500 uppercase block mb-1">
                      PROYECCIÓN ANUAL
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
                        ${annualProjection.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs font-heading font-bold text-slate-500">
                        MXN / año
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200/80 pt-3">
                    <p className="text-[11px] font-sans text-slate-400 text-center leading-relaxed">
                      *Estimado sujeto a demanda y ocupación.
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20quiero%20publicar%20mi%20auto%20como%20anfitri%C3%B3n%20en%20Durango"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-heading font-semibold text-xs transition-colors"
                >
                  Consultar evaluación de mi vehículo
                </a>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECCIÓN 2: CÓMO GANAR DINERO (Sin textito 'CÓMO FUNCIONA' y con imágenes cuadradas con bordes redondeados) */}
      <section className="py-16 sm:py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight">
              Cómo ganar dinero con tu auto en GALSA
            </h2>
            <p className="text-sm sm:text-base font-sans text-slate-500 mt-2">
              Tú pones el auto. GALSA pone la tecnología, los clientes y la operación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {HOW_IT_WORKS_CARDS.map((card, idx) => (
              <div key={idx} className="space-y-4">
                {/* Imagen Cuadrada con Bordes Redondeados */}
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100/80 border border-slate-200/80 flex items-center justify-center p-3">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: BENEFICIOS (Sin el textito 'BENEFICIOS' arriba, con imágenes cuadradas con bordes redondeados al lado del texto) */}
      <section className="py-16 sm:py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight">
              Beneficios de ser anfitrión GALSA
            </h2>
            <p className="text-sm sm:text-base font-sans text-slate-500 mt-2">
              Más ingresos, menos complicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {BENEFITS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {/* Imagen Cuadrada con Bordes Redondeados */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 shadow-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: PROCESO EN 6 PASOS (Sin el textito 'PROCESO' arriba) */}
      <section className="py-16 sm:py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight">
              Publica tu auto en 6 pasos
            </h2>
            <p className="text-sm sm:text-base font-sans text-slate-500 mt-2">
              Diseñamos un flujo simple y transparente para que no pierdas tiempo en filas ni papeleo tradicional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-start">
                  {/* Contenedor de Imagen con badge flotante idéntico al Home */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-visible bg-slate-100 mb-6">
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Badge cuadrado flotante en esquina inferior izquierda con margen */}
                    <div className="absolute -bottom-3 left-3 w-12 h-12 bg-blue-300 rounded-xl flex items-center justify-center z-10 shadow-xs">
                      <Icon className="w-5 h-5 text-blue-900" strokeWidth={1.4} />
                    </div>
                  </div>

                  {/* Textos del paso */}
                  <div className="pt-2 flex flex-col items-start text-left">
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 mb-1.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: BANNER FINAL */}
      <section className="py-14 sm:py-16" style={{ backgroundColor: '#8EB5FF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
            Empieza a ganar con tu auto hoy
          </h2>
          <p className="text-sm sm:text-base font-sans text-white/90 max-w-xl mx-auto">
            Registrarte toma menos de 10 minutos y revisamos tu solicitud en 24-48 horas.
          </p>
          <div className="pt-3">
            <a
              href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20quiero%20publicar%20mi%20auto%20como%20anfitri%C3%B3n%20en%20Durango"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-all shadow-sm active:scale-95"
            >
              Quiero publicar mi auto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
