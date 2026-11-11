import React, { useState } from 'react';
import { ArrowRight, Check, TrendingUp } from 'lucide-react';

interface HostsFullPageProps {
  onNavigate?: (path: string) => void;
}

export const HostsFullPage: React.FC<HostsFullPageProps> = ({ onNavigate }) => {
  const [dailyRate, setDailyRate] = useState(1200);
  const [daysPerMonth, setDaysPerMonth] = useState(15);

  // Anfitrión receives 100% of the daily rate they set
  const monthlyEarnings = dailyRate * daysPerMonth;
  const clientDailyPrice = Math.round(dailyRate * 1.33);
  const totalClientMonth = clientDailyPrice * daysPerMonth;
  const serviceFeeMonth = totalClientMonth - monthlyEarnings;
  const annualProjection = monthlyEarnings * 12;

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const FAQItems = [
    {
      q: '¿Cuánto cobra GALSA a los anfitriones?',
      a: 'Nada de tu tarifa: recibes el 100% de la tarifa por día que fijes. GALSA suma una tarifa de servicio del 33% al precio de la renta y la paga el cliente, sin cargos ocultos.',
    },
    {
      q: '¿Mi auto está asegurado durante la renta?',
      a: 'Sí. Cada renta incluye cobertura durante el periodo de arrendamiento y solo rentan clientes con identidad verificada.',
    },
    {
      q: '¿Cuándo y cómo recibo mis pagos?',
      a: 'Al completarse cada renta, GALSA te deposita tu parte en la cuenta bancaria que registraste. Recibes el 100% de tu tarifa por día.',
    },
    {
      q: '¿Puedo decidir quién renta mi auto?',
      a: 'Sí. Tú apruebas cada solicitud y defines disponibilidad, precios y condiciones. Mantienes el control total.',
    },
    {
      q: '¿Cuánto tarda la aprobación de mi auto?',
      a: 'GALSA revisa tu solicitud y tu vehículo en 24-48 horas. El registro toma menos de 10 minutos.',
    },
    {
      q: '¿Cuánto puedo ganar con mi auto?',
      a: 'Depende de tu precio por día y de cuántos días lo rentes al mes. Por ejemplo, a $1,200 por día durante 15 días, tu ingreso neto estimado es de $18,000 al mes. Usa el simulador para calcular tu caso.',
    },
  ];

  const ProcessSteps = [
    { title: 'Regístrate', description: 'Crea tu cuenta de anfitrión con tus datos.' },
    { title: 'Valida tu identidad', description: 'Verificamos tu identidad y documentación.' },
    { title: 'Carga tu vehículo', description: 'Sube fotos, documentos y datos del auto.' },
    { title: 'Recibe aprobación', description: 'GALSA revisa tu vehículo en 24-48 horas.' },
    { title: 'Recibe reservas', description: 'Tu auto aparece en el catálogo y empieza a recibir solicitudes.' },
    { title: 'Cobra', description: 'Recibes tu parte de cada renta en la cuenta que registraste.' },
  ];

  const Benefits = [
    { title: 'Control total', description: 'Tú defines precios, disponibilidad y qué reservas aceptas.' },
    { title: 'Pagos a tu cuenta', description: 'Cobramos al cliente y te depositamos tu parte en la cuenta que registres.' },
    { title: 'Seguro y verificación', description: 'Cobertura durante la renta y clientes con identidad verificada.' },
    { title: 'Soporte 24/7', description: 'Equipo dedicado para anfitriones y asistencia en carretera.' },
    { title: 'Tarifa transparente', description: 'El 33% de servicio lo paga el cliente. Sin cargos ocultos.' },
    { title: 'Más ocupación', description: 'Recomendaciones de precio dinámico según la demanda de tu ciudad.' },
  ];

  const RequirementsList = [
    'Edad mínima de 21 años',
    'Licencia de conducir vigente',
    'Identidad verificada con INE',
    'Método de pago a nombre del cliente',
    'Comprobante de domicilio de máximo 3 meses',
  ];

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-4">
              Programa de anfitriones GALSA
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 leading-tight mb-6">
              Renta tu auto y genera ingresos con GALSA
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl">
              Publica tu vehículo en nuestro marketplace y recibe el 100% de la tarifa por día que fijes. Nosotros ponemos la verificación de clientes, el seguro durante la renta y los pagos claros. La tarifa de servicio del 33% la paga el cliente, no tú.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <button
                onClick={() => handleNavigate('/anfitriones/registro')}
                style={{ backgroundColor: '#3D63FF' }}
                className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all hover:brightness-95 active:scale-95"
              >
                <span>Quiero publicar mi auto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 text-neutral-900 font-bold text-sm px-7 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
              >
                <span>Calcular mis ingresos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-neutral-900 mb-1">33%</div>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium">Tarifa de servicio, la paga el cliente</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-neutral-900 mb-1">100%</div>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium">De tu tarifa, para ti</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-neutral-900 mb-1">24-48h</div>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium">Revisión de tu solicitud</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Cómo funciona
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
              Cómo ganar dinero con tu auto en GALSA
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Tú pones el auto. GALSA pone la tecnología, los clientes y la operación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Publica tu auto',
                description: 'Registra tu vehículo, define tu disponibilidad y elige tu precio con ayuda de nuestro motor de tarifas.',
              },
              {
                title: 'Aprueba reservas',
                description: 'Clientes verificados solicitan tu auto y tú decides a quién le dices que sí.',
              },
              {
                title: 'Cobra tu tarifa',
                description: 'GALSA cobra al cliente la renta más su tarifa de servicio y te deposita tu parte en la cuenta que registres.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Condiciones
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
              Condiciones del programa de anfitriones
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Lo que cuesta publicar tu auto y quién puede rentarlo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Fee Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Tarifa de servicio del marketplace</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Se suma al precio de cada renta y la paga el cliente. Sin cargos ocultos.
              </p>
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Tarifa GALSA (la paga el cliente)</span>
                  <span className="text-2xl font-black text-neutral-900">33%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">De tu tarifa, para ti</span>
                  <span className="text-2xl font-black text-neutral-900">100%</span>
                </div>
              </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Quién puede rentar tu auto</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Solo rentan clientes verificados que cumplen:
              </p>
              <ul className="space-y-3">
                {RequirementsList.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-neutral-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Beneficios
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
              Beneficios de ser anfitrión GALSA
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Más ingresos, menos complicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="simulador" className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Simulador
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
              Simulador de ingresos para anfitriones
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Ajusta los días y el precio para estimar cuánto puedes ganar al mes con tu auto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Sliders */}
            <div className="space-y-8">
              {/* Valor del auto */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-neutral-900">Valor del auto</label>
                  <span className="text-sm font-black text-neutral-900">$450,000 MXN</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>$150,000</span>
                  <span>$1,500,000</span>
                </div>
              </div>

              {/* Días rentados al mes */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-neutral-900">Días rentados al mes</label>
                  <span className="text-sm font-black text-neutral-900">{daysPerMonth} días</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>1 día</span>
                  <span>30 días</span>
                </div>
              </div>

              {/* Precio por día */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-neutral-900">Precio por día</label>
                  <span className="text-sm font-black text-neutral-900">${dailyRate.toLocaleString('es-MX')} MXN</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={3000}
                  step={50}
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>$500</span>
                  <span>$3,000</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8">
              <div className="pb-6 border-b border-neutral-200 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Tu ingreso neto mensual estimado
                </span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-black text-neutral-900">
                    ${monthlyEarnings.toLocaleString('es-MX')}
                  </span>
                  <span className="text-sm font-bold text-neutral-600">MXN</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Recibes el 100% de tu tarifa. La tarifa de servicio de GALSA (33%) la paga el cliente.
                </p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-700 font-medium">Tus rentas del mes (precio × días)</span>
                  <span className="font-black text-neutral-900">${monthlyEarnings.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-700 font-medium">Tarifa de servicio GALSA (33%), la paga el cliente</span>
                  <span className="font-black text-neutral-900">${serviceFeeMonth.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-700 font-medium">Lo que pagan tus clientes</span>
                  <span className="font-black text-neutral-900">${totalClientMonth.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-neutral-200">
                  <span className="text-neutral-700 font-bold">Tu ingreso neto</span>
                  <span className="font-black text-neutral-900">${monthlyEarnings.toLocaleString('es-MX')}</span>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  Proyección anual
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-neutral-900">
                    ${annualProjection.toLocaleString('es-MX')}
                  </span>
                  <span className="text-xs font-bold text-neutral-600">MXN / año</span>
                </div>
                <p className="text-xs text-neutral-500 mt-2">Neto × 12 meses</p>
              </div>

              <p className="text-xs text-neutral-500 text-center leading-relaxed">
                Estimación ilustrativa. Los ingresos reales dependen de la demanda, la temporada y la ocupación de tu auto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Proceso
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
              Publica tu auto en 6 pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ProcessSteps.map((step, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-black">
                  {idx + 1}
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2 mt-4">{step.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Dudas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
              Preguntas frecuentes de anfitriones
            </h2>
          </div>

          <div className="max-w-3xl space-y-4">
            {FAQItems.map((item, idx) => (
              <div key={idx} className="border border-neutral-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <h3 className="text-sm font-bold text-neutral-900 text-left">{item.q}</h3>
                  <span className={`text-neutral-900 transition-transform flex-shrink-0 ${expandedFAQ === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFAQ === idx && (
                  <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                    <p className="text-sm text-neutral-700 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-6">
            Empieza a ganar con tu auto hoy
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Registrarte toma menos de 10 minutos y revisamos tu solicitud en 24-48 horas.
          </p>
          <button
            onClick={() => handleNavigate('/anfitriones/registro')}
            style={{ backgroundColor: '#3D63FF' }}
            className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all hover:brightness-95 active:scale-95"
          >
            <span>Quiero publicar mi auto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
