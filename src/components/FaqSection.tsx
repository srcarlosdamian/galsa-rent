import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, PhoneCall } from 'lucide-react';

export const FAQ_ITEMS = [
  {
    question: '¿En qué ciudades opera GALSA Rent?',
    answer:
      'Por ahora operamos en Durango, con entrega en Sucursal Plaza 450. Estamos preparando nuevas ciudades.',
  },
  {
    question: '¿Cuáles son los requisitos para rentar un auto en Durango?',
    answer:
      'Para rentar necesitas: licencia de conducir vigente con al menos 2 años de experiencia, identificación oficial (INE o pasaporte), comprobante de domicilio no mayor a 3 meses, tener 21 años o más, y un método de pago a nombre del cliente titular de la reserva. Todo se valida de forma 100% digital desde tu celular.',
  },
  {
    question: '¿Cuál es el costo real y qué cargos incluye?',
    answer:
      'El costo de la renta se compone del precio por día del vehículo + una tarifa de servicio de 33% (IVA incluido). El total a pagar y el importe del depósito en garantía 100% reembolsable se muestran con total transparencia antes de realizar cualquier pago.',
  },
  {
    question: '¿Cómo funciona la política de cancelación?',
    answer:
      'Las cancelaciones realizadas con más de 48 horas de anticipación a la fecha y hora de entrega reciben un reembolso completo. Para cancelaciones posteriores aplican cargos parciales calculados según el tiempo restante para el inicio de la renta.',
  },
  {
    question: '¿Cómo funciona el marketplace de anfitriones y cuánto gano?',
    answer:
      'El anfitrión recibe el 100% de la tarifa que fija por día; la tarifa de servicio del 33% la paga el cliente. GALSA no cobra comisión al anfitrión y se encarga de verificar a los clientes, generar el contrato digital y gestionar los pagos de forma segura.',
  },
  {
    question: '¿Dónde se entrega y devuelve el vehículo?',
    answer:
      'La entrega y recepción física de todos los vehículos se realiza en nuestra Sucursal Plaza 450 en Blvd. Guadiana, Durango, Dgo., mediante un checklist fotográfico digital rápido para comprobar el estado de la unidad.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título y descripción alineados a la izquierda */}
        <div className="text-left mb-10 sm:mb-12 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-slate-900 tracking-tight leading-tight">
            Preguntas frecuentes sobre renta de autos en Durango
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans text-slate-600 leading-relaxed">
            Todo lo que necesitas saber sobre requisitos, costos con tarifa de servicio, anfitriones y entrega en Plaza 450.
          </p>
        </div>

        {/* Accordion en Grid de 2 columnas llenando hasta max-w-7xl */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-heading font-semibold text-slate-900 tracking-tight leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm font-sans text-slate-600 leading-relaxed border-t border-neutral-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact banner en ancho completo hasta max-w-7xl */}
        <div className="mt-10 p-6 sm:p-7 rounded-2xl border border-neutral-200 bg-neutral-50/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-sm sm:text-base font-heading font-semibold text-slate-900">¿Tienes dudas adicionales sobre tu renta?</h3>
            <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">Atención local directa en Sucursal Plaza 450, Durango.</p>
          </div>
          <a
            href="https://wa.me/526181234567?text=Hola%20GALSA%20Rent%2C%20tengo%20dudas%20sobre%20la%20renta%20de%20un%20auto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white font-heading font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shrink-0 active:scale-95"
          >
            <PhoneCall className="w-4 h-4" strokeWidth={1.4} />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
