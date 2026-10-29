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
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Transparencia y respuestas
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Preguntas frecuentes sobre renta de autos en Durango
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Todo lo que necesitas saber sobre requisitos, costos con tarifa de servicio, anfitriones y entrega en Plaza 450.
          </p>
        </div>

        {/* Accordion container */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in-50 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact banner */}
        <div className="mt-12 p-6 rounded-2xl border border-neutral-200 bg-neutral-50/70 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-sm font-bold text-neutral-900">¿Tienes dudas adicionales sobre tu renta?</h3>
            <p className="text-xs text-neutral-500">Atención local directa en Sucursal Plaza 450, Durango.</p>
          </div>
          {/* TODO: Reemplazar con el enlace de WhatsApp oficial de atención a clientes */}
          <a
            href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20tengo%20una%20pregunta%20sobre%20mi%20renta"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
