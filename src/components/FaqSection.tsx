import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cuáles son los requisitos para rentar un auto en GALSA Durango?',
      answer:
        'Para rentar un vehículo con GALSA solo necesitas: 1) Licencia de conducir vigente con al menos 2 años de experiencia, 2) Identificación oficial vigente (INE o Pasaporte mexicano/internacional), y 3) Comprobante de domicilio reciente o confirmación de estancia/hotel. Todo se valida de manera 100% digital desde tu smartphone sin necesidad de copias en papel.',
    },
    {
      question: '¿Cómo funciona el contrato digital y la entrega sin filas?',
      answer:
        'Una vez que seleccionas tu auto y fechas, se genera un contrato mercantil electrónico cifrado con sellado de tiempo. Lo firmas con el dedo en tu pantalla. Al llegar a la sucursal Plaza 450 o al Aeropuerto de Durango (DGO), tu auto ya está sanitizado, verificado e inspeccionado; realizamos un checklist fotográfico en 2 minutos y te entregamos las llaves.',
    },
    {
      question: '¿Cómo y cuándo se devuelve el depósito en garantía?',
      answer:
        'El depósito en garantía se retiene temporalmente durante el periodo de renta para cubrir eventuales multas o peajes no cubiertos. En el momento en que devuelves el vehículo y se valida el checklist digital de recepción, la liberación del depósito se procesa de forma inmediata sin demoras burocráticas.',
    },
    {
      question: '¿Puedo recoger o entregar el auto en el Aeropuerto de Durango (DGO)?',
      answer:
        'Sí. Contamos con servicio de entrega y recepción directamente en el Aeropuerto Internacional General Guadalupe Victoria de Durango (DGO). Un representante de GALSA te espera en la terminal a la hora de aterrizaje de tu vuelo para entregarte la unidad sin que hagas fila en ningún mostrador.',
    },
    {
      question: '¿Qué incluye la tarifa diaria publicada?',
      answer:
        'Todas las tarifas en GALSA son transparentes: incluyen IVA, seguro de cobertura amplia con asistencia en carretera 24/7 en Durango y carreteras estatales/federales, y kilometraje libre para circular. No añadimos seguros obligatorios sorpresa al momento de entrega.',
    },
    {
      question: '¿Cómo puedo poner mi propio auto a trabajar como anfitrión?',
      answer:
        'Si eres propietario de un vehículo particular en Durango (modelos recientes, buen estado mecánico y estético), puedes darlo de alta en nuestro Marketplace de Anfitriones. GALSA se encarga del filtrado riguroso de clientes, contratos digitales legales, entrega y cobros con dispersión bancaria directa a tu cuenta.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Resolución de dudas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Preguntas frecuentes sobre la renta de autos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Todo lo que necesitas saber sobre el proceso, requisitos, coberturas y contratos digitales con GALSA.
          </p>
        </div>

        {/* Accordion container */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
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
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in-50 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl border border-neutral-200 bg-neutral-50/60 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-base font-bold text-neutral-900">¿Tienes alguna duda específica?</h3>
            <p className="text-xs text-neutral-500">Nuestro equipo en Durango responde al instante vía WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/526181234567?text=Hola%20GALSA,%20tengo%20una%20pregunta%20sobre%20la%20renta%20de%20un%20auto"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
          >
            Hablar con un asesor
          </a>
        </div>

      </div>
    </section>
  );
};
