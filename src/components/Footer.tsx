import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-900 text-xs">
      
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline tracking-tighter">
              <span className="text-3xl font-black tracking-tight text-black">galsa</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-black ml-0.5 mb-0.5"></span>
              <span className="ml-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
                Rent
              </span>
            </div>
            
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              Plataforma tecnológica premium para la renta de autos en Durango y movilidad en México. Contratos 100% digitales, autos verificados y marketplace transparente para anfitriones.
            </p>

            <div className="space-y-2 pt-2 text-neutral-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Sucursal Plaza 450, Blvd. Guadiana, Durango, Dgo., México</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>+52 618 123 4567 · Atención 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>contacto@galsarent.com.mx</span>
              </div>
            </div>
          </div>

          {/* Column: Flota & Modelos */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Flota en Durango
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="#catalogo" className="hover:text-black transition-colors">Jeep Wrangler Rubicon 4x4</a></li>
              <li><a href="#catalogo" className="hover:text-black transition-colors">Jeep Wrangler Sport Unlimited</a></li>
              <li><a href="#catalogo" className="hover:text-black transition-colors">Volkswagen Virtus Trendline</a></li>
              <li><a href="#catalogo" className="hover:text-black transition-colors">Nissan Sentra Sense 2024</a></li>
              <li><a href="#catalogo" className="hover:text-black transition-colors">Honda Civic Coupé Sport</a></li>
              <li><a href="#catalogo" className="hover:text-black transition-colors">Renta con entrega en aeropuerto</a></li>
            </ul>
          </div>

          {/* Column: Anfitriones & Movilidad */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Marketplace
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="#anfitriones" className="hover:text-black transition-colors">Pon tu auto a trabajar</a></li>
              <li><a href="#anfitriones" className="hover:text-black transition-colors">Calculadora de ingresos</a></li>
              <li><a href="#anfitriones" className="hover:text-black transition-colors">Validación de conductores</a></li>
              <li><a href="#seguridad" className="hover:text-black transition-colors">Cobertura y seguro de renta</a></li>
              <li><a href="#catalogo" className="hover:text-black transition-colors">Autos para Uber y DiDi</a></li>
            </ul>
          </div>

          {/* Column: Legal & Ayuda */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Legal y Confianza
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="#seguridad" className="hover:text-black transition-colors">Términos del contrato digital</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">Aviso de privacidad</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">Política de combustible 1:1</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">Cancelación flexible 48h</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">Preguntas frecuentes (FAQ)</a></li>
            </ul>
          </div>

        </div>

        {/* SEO Breadcrumbs / Location Directory */}
        <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-wrap gap-2 text-[11px] text-neutral-400">
          <span className="font-semibold text-neutral-600">Destinos y servicios populares:</span>
          <span>Renta de autos Aeropuerto Durango</span> ·
          <span>Renta de camionetas 4x4 Mexiquillo</span> ·
          <span>Alquiler de autos ejecutivos Durango Centro</span> ·
          <span>Autos sin tarjeta de crédito en Durango</span> ·
          <span>Plataforma de anfitriones de movilidad en México</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500">
            © 2026 GALSA Movilidad S.A.P.I. de C.V. Todos los derechos reservados. Hecho en Durango, México.
          </p>

          <div className="flex items-center space-x-6 text-neutral-400">
            <span className="hover:text-black cursor-pointer transition-colors">Privacidad</span>
            <span className="hover:text-black cursor-pointer transition-colors">Términos</span>
            <span className="hover:text-black cursor-pointer transition-colors">Mapa del sitio</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
