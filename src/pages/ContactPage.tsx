import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Atención local en Durango
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900">
            Contacto y Sucursal Plaza 450
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Estamos ubicados en Blvd. Guadiana en Durango. Escríbenos o visítanos para resolver dudas sobre tu renta o registro de anfitrión.
          </p>
        </div>

        {/* NAP Block & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* NAP Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl border border-neutral-200 bg-neutral-50/50 space-y-5 text-xs text-neutral-700">
              
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Dirección oficial (Entrega y recepción)
                </span>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-neutral-900 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">GALSA Rent — Sucursal Plaza 450</p>
                    <p className="text-neutral-600 mt-0.5">Blvd. Guadiana, Plaza 450, Durango, Dgo., C.P. 34138, México</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Horario de atención y entrega
                </span>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-neutral-900 mt-0.5 shrink-0" />
                  <div>
                    {/* TODO: Confirmar horario de apertura y cierre oficial */}
                    <p className="font-semibold text-neutral-900">Lunes a Domingo</p>
                    <p className="text-neutral-600">08:00 a 20:00 hrs (Horario continuo)</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  WhatsApp y Teléfono
                </span>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-neutral-900 mt-0.5 shrink-0" />
                  <div>
                    {/* TODO: Reemplazar con el número de teléfono oficial */}
                    <p className="font-bold text-neutral-900">+52 618 000 0000</p>
                    <p className="text-neutral-500">Atención digital directa</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Correo electrónico
                </span>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-900 mt-0.5 shrink-0" />
                  <div>
                    {/* TODO: Reemplazar con la cuenta de correo oficial */}
                    <p className="font-semibold text-neutral-900">contacto@galsarent.com.mx</p>
                  </div>
                </div>
              </div>

              {/* Action WhatsApp */}
              <div className="pt-3">
                {/* TODO: Reemplazar con enlace real a WhatsApp de GALSA Rent */}
                <a
                  href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20tengo%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contactar por WhatsApp</span>
                </a>
              </div>

              {/* Google Business Profile link placeholder */}
              <div className="pt-1 text-center">
                {/* TODO: Agregar la URL oficial del perfil de Google Business Profile (Google Maps) de GALSA Rent */}
                <a
                  href="https://maps.google.com/?q=Plaza+450+Durango"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-black underline"
                >
                  <span>Ver en Google Maps (Google Business Profile)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-neutral-200 overflow-hidden shadow-sm aspect-[4/3] bg-neutral-100 relative">
              {/* Responsive Google Maps Embed centered on Plaza 450 Durango */}
              {/* TODO: Reemplazar con el iframe oficial del Google Business Profile verificado */}
              <iframe
                title="Ubicación de Sucursal Plaza 450 GALSA Rent Durango"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.204523959141!2d-104.6865239245136!3d24.023880378536838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb7ee4e5b3b07%3A0x6b2b4db239962a98!2sPlaza%20450!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
