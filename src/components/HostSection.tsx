import React, { useState } from 'react';
import { 
  Check, ShieldCheck, Clock, Award, Sliders, ArrowRight,
  UserPlus, Car, CheckCircle2, CalendarCheck, Wallet
} from 'lucide-react';

interface HostSectionProps {
  isFullPage?: boolean;
  onNavigate?: (path: string) => void;
}

export const HostSection: React.FC<HostSectionProps> = ({ isFullPage = true, onNavigate }) => {
  const handlePublish = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/registro');
    }
  };

  // Calculadora interactiva (Valor del auto, Días rentados, Precio/día - SIN selector de tipo de vehículo)
  const [carValue, setCarValue] = useState(450000);
  const [daysRented, setDaysRented] = useState(15);
  const [pricePerDay, setPricePerDay] = useState(1200);

  const hostEarnings = pricePerDay * daysRented;
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
      image: '/images/step-img-3.webp',
      icon: Award,
    },
    {
      title: 'Seguro y verificación',
      description: 'Cobertura durante la renta y clientes con identidad verificada.',
      image: '/images/step-img-2.webp',
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
      image: '/images/trust-safety.webp',
      icon: Check,
    },
    {
      title: 'Más ocupación',
      description: 'Recomendaciones de precio dinámico según la demanda de tu ciudad.',
      image: '/images/renta-galsa.webp',
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* LADO IZQUIERDO: Título con subrayado, Descripción, Checks destacados y Botón CTA */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                Convierte tu auto<br />
                en{' '}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">ingresos</span>
                  <span className="absolute left-0 bottom-0 sm:bottom-0.5 w-full h-2 sm:h-2.5 bg-[#D8E8FF] rounded-none -z-0" />
                </span>
              </h1>

              <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed max-w-lg">
                Publica tu vehículo en el marketplace de GALSA y genera ingresos con la seguridad de una operación profesional: verificación, seguro y pagos automatizados.
              </p>

              {/* 3 Checks destacados con círculo azul claro */}
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
                      24-48h revisión de solicitud
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
                  href="/registro"
                  onClick={handlePublish}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm transition-all shadow-sm active:scale-95"
                >
                  Quiero publicar mi auto
                </a>
              </div>
            </div>

            {/* LADO DERECHO: SIMULADOR DE INGRESOS A LA DERECHA (3 sliders limpios + tarjeta neutral gris 50) */}
            <div className="lg:col-span-6 w-full text-left space-y-6">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                Calcula tus ingresos estimados
              </h2>

              {/* Controles de sliders horizontales exactos a la captura */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-4">
                  <span className="w-28 text-xs sm:text-sm font-semibold text-slate-800 shrink-0">
                    Valor del auto
                  </span>
                  <input
                    type="range"
                    min={150000}
                    max={1200000}
                    step={25000}
                    value={carValue}
                    onChange={(e) => setCarValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                  />
                  <span className="w-24 text-right text-xs sm:text-sm font-bold text-slate-900 shrink-0">
                    ${carValue.toLocaleString('es-MX')}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-28 text-xs sm:text-sm font-semibold text-slate-800 shrink-0">
                    Días rentados
                  </span>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    step={1}
                    value={daysRented}
                    onChange={(e) => setDaysRented(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                  />
                  <span className="w-24 text-right text-xs sm:text-sm font-bold text-slate-900 shrink-0">
                    {daysRented} d
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-28 text-xs sm:text-sm font-semibold text-slate-800 shrink-0">
                    Precio/día
                  </span>
                  <input
                    type="range"
                    min={600}
                    max={3000}
                    step={50}
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                  />
                  <span className="w-24 text-right text-xs sm:text-sm font-bold text-slate-900 shrink-0">
                    ${pricePerDay.toLocaleString('es-MX')}
                  </span>
                </div>
              </div>

              {/* Tarjeta de estimación con fondo gris 50 y diseño neutral sin borde exterior */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 space-y-4">
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

                <div className="pt-2">
                  <p className="text-[11px] font-sans text-slate-400 text-center leading-relaxed">
                    Estimación ilustrativa. Los ingresos reales dependen de la demanda, la temporada y la ocupación.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECCIÓN 2: CÓMO GANAR DINERO EN GALSA (Con imágenes apaisadas 16:9 con esquinas redondeadas) */}
      <section className="py-16 sm:py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Cómo ganar dinero con tu auto en<br />GALSA
            </h2>
            <p className="text-sm sm:text-base font-sans text-slate-500 mt-3">
              Tú pones el auto. GALSA pone la tecnología, los clientes y la operación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {HOW_IT_WORKS_CARDS.map((card, idx) => (
              <div key={idx} className="space-y-4">
                {/* Imagen Apaisada 16:9 con Bordes Redondeados limpia sin bordes ni padding extra */}
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-1.5 leading-relaxed">
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

      {/* SECCIÓN 4: PUBLICA TU AUTO EN 6 PASOS (Sin 'PROCESO' arriba, diseño exacto a la captura oficial) */}
      <section className="py-16 sm:py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl mb-12 sm:mb-16">
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

      {/* SECCIÓN 5: BANNER FINAL (Respeta estrictamente el max-width con contenedor redondeado) */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            style={{ backgroundColor: '#8EB5FF' }}
            className="rounded-[28px] sm:rounded-[36px] py-14 sm:py-16 px-6 sm:px-12 text-center space-y-4 shadow-none"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
              Empieza a ganar con tu auto hoy
            </h2>
            <p className="text-sm sm:text-base font-sans text-white/95 max-w-xl mx-auto">
              Registrarte toma menos de 10 minutos y revisamos tu solicitud en 24-48 horas.
            </p>
            <div className="pt-3">
              <a
                href="/registro"
                  onClick={handlePublish}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm transition-all shadow-sm active:scale-95"
              >
                Quiero publicar mi auto
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
