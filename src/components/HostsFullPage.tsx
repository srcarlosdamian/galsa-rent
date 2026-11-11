import React, { useState } from 'react';
import { ArrowRight, Check, TrendingUp, Plus, Minus } from 'lucide-react';
import { RentYourCarSection } from './RentYourCarSection';

interface HostsFullPageProps {
  onNavigate?: (path: string) => void;
}

export const HostsFullPage: React.FC<HostsFullPageProps> = ({ onNavigate }) => {
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
    { 
      title: 'Control total', 
      description: 'Tú defines precios, disponibilidad y qué reservas aceptas.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    },
    { 
      title: 'Pagos a tu cuenta', 
      description: 'Cobramos al cliente y te depositamos tu parte en la cuenta que registres.',
      image: 'https://images.unsplash.com/photo-1556821552-5f7e29fc4de0?w=400&h=300&fit=crop'
    },
    { 
      title: 'Seguro y verificación', 
      description: 'Cobertura durante la renta y clientes con identidad verificada.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
    },
    { 
      title: 'Soporte 24/7', 
      description: 'Equipo dedicado para anfitriones y asistencia en carretera.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    },
    { 
      title: 'Tarifa transparente', 
      description: 'El 33% de servicio lo paga el cliente. Sin cargos ocultos.',
      image: 'https://images.unsplash.com/photo-1556821552-5f7e29fc4de0?w=400&h=300&fit=crop'
    },
    { 
      title: 'Más ocupación', 
      description: 'Recomendaciones de precio dinámico según la demanda de tu ciudad.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
    },
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
      {/* HERO SECTION: Renta tu auto y genera ingresos */}
      <RentYourCarSection onNavigate={handleNavigate} />


      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Cómo funciona
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
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
                image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1794388656934-2-gemini_generated_image_s8fcyrs8fcyrs8fc.webp',
              },
              {
                title: 'Aprueba reservas',
                description: 'Clientes verificados solicitan tu auto y tú decides a quién le dices que sí.',
                image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1794388656485-1-gemini_generated_image_jmm2n3jmm2n3jmm2.webp',
              },
              {
                title: 'Cobra tu tarifa',
                description: 'GALSA cobra al cliente la renta más su tarifa de servicio y te deposita tu parte en la cuenta que registres.',
                image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1794388655725-0-gemini_generated_image_6uloc56uloc56ulo.webp',
              },
            ].map((item, idx) => (
              <div key={idx}>
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="py-16 md:py-24 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full Width Blue Section with Background Image */}
          <div className="mb-8 lg:mb-12">
            <div className="bg-cta-100 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
              {/* Background Image - Right side */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-100">
                <img 
                  src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1794389847378-0-349394.webp"
                  alt="Background decoration"
                  className="w-full h-full object-cover object-right"
                />
              </div>
              
              {/* Content */}
              <div className="space-y-4 relative z-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                    Cómo funciona
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
                    Cómo ganar dinero con tu auto en{' '}
                    <span className="block">GALSA</span>
                  </h2>
                </div>
                <p className="text-base text-neutral-700 leading-relaxed font-medium max-w-md">
                  Lo que cuesta publicar tu auto y quién puede rentarlo.
                </p>
              </div>
            </div>
          </div>

          {/* Two Columns - 50/50 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Service Fee Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Tarifa de servicio del marketplace</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Se suma al precio de cada renta y la paga el cliente. Sin cargos ocultos.
              </p>
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Tarifa GALSA (la paga el cliente)</span>
                  <span className="text-2xl font-black text-neutral-900">33%</span>
                </div>
                <div className="border-t border-neutral-300"></div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm font-medium text-neutral-700">De tu tarifa, para ti</span>
                  <span className="text-2xl font-black text-neutral-900">100%</span>
                </div>
              </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Quién puede rentar tu auto</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Solo rentan clientes verificados que cumplen:
              </p>
              <ul className="space-y-3 flex-1">
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
      <section className="py-16 md:py-24 bg-white ">
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
              <div key={idx} className="bg-white rounded-2xl overflow-hidden flex h-full">
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-32 h-32 object-cover flex-shrink-0"
                />
                <div className="p-6 flex flex-col justify-center flex-1">
                  <h3 className="text-base font-bold text-neutral-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULATOR */}

      {/* PROCESS */}
      <section className="py-16 md:py-24 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Proceso
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
              Publica tu auto en 6 pasos
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Diseñamos un flujo simple y transparente para que no pierdas tiempo en filas ni papeleo tradicional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ProcessSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Number Badge */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cta-400 text-white flex items-center justify-center font-black text-lg">
                    {idx + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Dudas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
              Preguntas frecuentes de anfitriones
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl">
            {FAQItems.map((item, idx) => {
              const isOpen = expandedFAQ === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-heading font-semibold text-neutral-900 tracking-tight leading-snug">
                      {item.q}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm font-sans text-neutral-600 leading-relaxed border-t border-neutral-100">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-cta-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-6">
            Empieza a ganar con tu auto hoy
          </h2>
          <p className="text-base text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Registrarte toma menos de 10 minutos y revisamos tu solicitud en 24-48 horas.
          </p>
          <button
            onClick={() => handleNavigate('/anfitriones/registro')}
            className="inline-flex items-center justify-center gap-2 bg-white text-cta-300 font-bold text-sm px-7 py-3 rounded-xl transition-all hover:bg-neutral-50 active:scale-95"
          >
            <span>Quiero publicar mi auto</span>
          </button>
        </div>
      </section>
    </div>
  );
};
