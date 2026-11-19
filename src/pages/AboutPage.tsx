import React from 'react';
import {
  ShieldCheck,
  Car,
  HeartHandshake,
  Check,
  MapPin,
  FileCheck,
  Clock,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* 1. HERO NOSOTROS (Estilo sólido plano + subrayado cta-200 + tarjeta cta-50) */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Izquierda: Copy principal y CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-ink-900 leading-[1.08]">
                Transformando la{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">movilidad</span>
                  <span className="absolute left-0 bottom-1 w-full h-2.5 sm:h-3 bg-cta-200 -z-0" />
                </span>{' '}
                y renta de autos en México
              </h1>

              <p className="text-base sm:text-lg font-sans text-ink-600 leading-relaxed max-w-2xl">
                Nacimos en Durango para eliminar filas, burocracia y cargos ocultos: ofrecemos una experiencia 100% digital, transparente y respaldada con contrato electrónico.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="/catalogo"
                  onClick={(e) => handleLink(e, '/catalogo')}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-sm transition-colors active:scale-95"
                >
                  Explorar catálogo
                </a>
                <a
                  href="/contacto"
                  onClick={(e) => handleLink(e, '/contacto')}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-edge bg-surface hover:bg-subtle text-ink-900 font-heading font-semibold text-sm transition-colors"
                >
                  Ver sucursal Plaza 450
                </a>
              </div>
            </div>

            {/* Derecha: Bloque sólido cta-50 con ilustración y métricas clave */}
            <div className="lg:col-span-5">
              <div className="rounded-[28px] bg-cta-50 p-6 sm:p-8 space-y-6">
                <div className="aspect-[16/10] w-full flex items-center justify-center overflow-hidden rounded-2xl">
                  <img
                    src="/galsa-rent/images/nosotros/hero-familia-auto.png"
                    alt="GALSA Rent movilidad digital en Durango"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="grid grid-cols-3 divide-x divide-cta-200 pt-4 border-t border-cta-200 text-center">
                  <div className="px-2">
                    <div className="text-lg sm:text-xl font-heading font-extrabold text-ink-900 tabular-nums">
                      100%
                    </div>
                    <div className="text-[11px] font-sans text-ink-600 mt-0.5">
                      En línea
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="text-lg sm:text-xl font-heading font-extrabold text-ink-900">
                      Plaza 450
                    </div>
                    <div className="text-[11px] font-sans text-ink-600 mt-0.5">
                      Durango
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="text-lg sm:text-xl font-heading font-extrabold text-ink-900 tabular-nums">
                      0 filas
                    </div>
                    <div className="text-[11px] font-sans text-ink-600 mt-0.5">
                      Entrega express
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRES PILARES (Tarjetas lineales con badge cta-100 / cta-900 del Sistema de Diseño) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-left">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink-900 tracking-tight">
              Lo que define a GALSA Rent
            </h2>
            <p className="text-sm sm:text-base font-sans text-ink-600 mt-2">
              Tres compromisos claros en cada reserva y en cada vehículo publicado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-edge bg-surface p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cta-100 text-cta-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <h3 className="text-lg font-heading font-bold text-ink-900">
                Transparencia total
              </h3>
              <p className="text-xs sm:text-sm font-sans text-ink-600 leading-relaxed">
                Lo que ves es lo que pagas. Todas las tarifas incluyen kilometraje libre, seguro de cobertura amplia y el desglose exacto antes de firmar.
              </p>
            </div>

            <div className="rounded-2xl border border-edge bg-surface p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cta-100 text-cta-900 flex items-center justify-center">
                <Car className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <h3 className="text-lg font-heading font-bold text-ink-900">
                Calidad y control riguroso
              </h3>
              <p className="text-xs sm:text-sm font-sans text-ink-600 leading-relaxed">
                Cada vehículo, ya sea de flota propia o de anfitriones verificados, pasa por una inspección mecánica, documental y estética antes de entregarse.
              </p>
            </div>

            <div className="rounded-2xl border border-edge bg-surface p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cta-100 text-cta-900 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <h3 className="text-lg font-heading font-bold text-ink-900">
                Comunidad y economía local
              </h3>
              <p className="text-xs sm:text-sm font-sans text-ink-600 leading-relaxed">
                Conectamos a conductores que buscan viajar sin fricciones con propietarios locales que generan ingresos seguros con sus autos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BLOQUE AZUL OFICIAL bg-cta (Inspirado en VirtuoExperienceSection del Home) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="w-full p-6 sm:p-10 md:p-12 bg-cta rounded-[28px] sm:rounded-[36px] text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-cta-100 text-xs font-heading font-bold uppercase tracking-wider block">
                  Nuestra historia
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight tracking-tight">
                  De una necesidad local a una plataforma moderna
                </h2>
                <p className="text-cta-100 text-sm sm:text-base font-sans leading-relaxed">
                  En Durango, rentar un auto solía implicar requisitos excesivos, costos poco claros y procesos lentos en mostrador. Fundamos GALSA Rent para que cualquier persona con identificación oficial y licencia reserve en minutos desde su celular.
                </p>
                <p className="text-cta-100 text-sm sm:text-base font-sans leading-relaxed">
                  Hoy operamos tanto nuestra propia flota ejecutiva y todoterreno como un marketplace donde anfitriones locales reciben el 100% de su tarifa diaria establecida.
                </p>
              </div>

              <div className="lg:col-span-6 space-y-3.5">
                {[
                  {
                    icon: FileCheck,
                    title: 'Contrato mercantil digital',
                    desc: 'Firma electrónica válida desde tu teléfono antes de llegar por las llaves.',
                  },
                  {
                    icon: MapPin,
                    title: 'Punto físico controlado en Plaza 450',
                    desc: 'Entrega y recepción ordenada en Blvd. Guadiana, Durango, con checklist fotográfico.',
                  },
                  {
                    icon: Clock,
                    title: 'Validación y entregas en minutos',
                    desc: 'Sin filas en mostrador ni trámites repetitivos en cada renta.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-surface p-4 sm:p-5 flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-cta-50 text-cta flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" strokeWidth={1.6} />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-heading font-bold text-ink-900">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-sans text-ink-600 mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CÓMO FUNCIONAMOS PARA AMBOS LADOS (2 tarjetas lineales estilo Anfitriones) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl border border-edge bg-surface p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-lg sm:text-xl font-heading font-bold text-ink-900">
                  Para quienes rentan un auto
                </h2>
                <p className="text-xs sm:text-sm font-sans text-ink-500 mt-1">
                  Viaja por Durango y México con tarifa clara desde el primer clic.
                </p>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm font-sans text-ink-700">
                {[
                  'Kilometraje libre en todas nuestras unidades verificadas',
                  'Seguro de cobertura amplia y depósito 100% reembolsable',
                  'Reserva en línea con entrega rápida en Sucursal Plaza 450',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-cta-50 text-cta flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-edge bg-surface p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-lg sm:text-xl font-heading font-bold text-ink-900">
                  Para anfitriones GALSA
                </h2>
                <p className="text-xs sm:text-sm font-sans text-ink-500 mt-1">
                  Genera ingresos con tu vehículo sin ocuparte de la operación diaria.
                </p>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm font-sans text-ink-700">
                {[
                  'Recibes el 100% de la tarifa diaria que tú defines',
                  'Clientes 100% validados con INE, licencia y método de pago',
                  'Revisión de solicitud en 24-48 horas y depósitos directos a tu cuenta',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-cta-50 text-cta flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BANNER FINAL SÓLIDO bg-cta-50 (Mismo estilo limpio de Anfitriones) */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-cta-50 rounded-[28px] sm:rounded-[36px] py-12 sm:py-16 px-6 sm:px-12 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-ink-900 tracking-tight">
              ¿Listo para tu próximo viaje en Durango?
            </h2>
            <p className="text-sm sm:text-base font-sans text-ink-700 max-w-xl mx-auto">
              Explora nuestros autos disponibles o visítanos en Blvd. Guadiana, Sucursal Plaza 450.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/catalogo"
                onClick={(e) => handleLink(e, '/catalogo')}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-sm transition-colors active:scale-95"
              >
                Explorar catálogo
              </a>
              <a
                href="/anfitriones"
                onClick={(e) => handleLink(e, '/anfitriones')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-edge bg-surface hover:bg-subtle text-ink-900 font-heading font-semibold text-sm transition-colors"
              >
                Pon tu auto a trabajar
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
