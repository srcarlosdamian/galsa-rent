import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Atención local y en línea
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-slate-900">
            Contacto y Sucursal Plaza 450
          </h1>
          <p className="mt-3 text-base font-sans text-slate-600">
            Estamos ubicados en Blvd. Guadiana, Durango. Llámanos, escríbenos por correo o visítanos para resolver dudas sobre tu renta o registro de anfitrión.
          </p>
        </div>

        {/* NAP Block & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Columna izquierda: gris claro sin línea */}
          <div className="lg:col-span-5">
            <div className="h-full p-6 sm:p-8 rounded-3xl bg-slate-50 space-y-6 text-xs text-ink-700 flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Dirección oficial (Entrega y recepción)
                  </span>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-ink-900 mt-0.5 shrink-0" strokeWidth={1.6} />
                    <div>
                      <p className="font-heading font-bold text-ink-900 text-sm">GALSA Rent — Sucursal Plaza 450</p>
                      <p className="text-ink-600 mt-0.5 leading-relaxed">
                        Blvd. Guadiana, Plaza 450, Durango, Dgo., C.P. 34138, México
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Horario de atención y entrega
                  </span>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-ink-900 mt-0.5 shrink-0" strokeWidth={1.6} />
                    <div>
                      <p className="font-heading font-semibold text-ink-900 text-sm">Lunes a Domingo</p>
                      <p className="text-ink-600 mt-0.5">08:00 a 20:00 hrs (Horario continuo)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Teléfono de atención
                  </span>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-ink-900 mt-0.5 shrink-0" strokeWidth={1.6} />
                    <div>
                      <p className="font-heading font-bold text-ink-900 text-sm">+52 618 000 0000</p>
                      <p className="text-ink-500 mt-0.5">Atención directa y soporte continuo</p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Correo electrónico
                  </span>
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-ink-900 mt-0.5 shrink-0" strokeWidth={1.6} />
                    <div>
                      <a
                        href="mailto:soporte@galsarent.com.mx?subject=Consulta%20GALSA%20Rent"
                        className="font-heading font-semibold text-sm text-ink-900 hover:text-cta transition-colors"
                      >
                        soporte@galsarent.com.mx
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones planos del Sistema de Diseño (CTA Azul + Soft Azul sin línea) */}
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href="tel:+526180000000"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-sm transition-colors active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.8} />
                  <span>Llamar a sucursal</span>
                </a>
                <a
                  href="mailto:soporte@galsarent.com.mx?subject=Consulta%20GALSA%20Rent"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cta-50 hover:bg-cta-100 text-cta font-heading font-semibold text-sm transition-colors active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" strokeWidth={1.8} />
                  <span>Enviar correo a soporte</span>
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Map: Plaza 450, Blvd. Guadiana, Durango */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[340px] rounded-3xl overflow-hidden aspect-[4/3] bg-slate-50 relative">
              <iframe
                title="Ubicación de Sucursal Plaza 450 GALSA Rent Durango"
                src="https://maps.google.com/maps?q=Plaza+450,+Blvd.+Guadiana,+Durango,+Dgo.,+Mexico&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
