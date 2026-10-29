import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { GalsaLogo } from './GalsaLogo';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-900 text-xs">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <GalsaLogo className="h-6 w-auto text-neutral-900" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-200 px-1.5 py-0.5 rounded">
                Rent
              </span>
            </div>
            
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              GALSA Rent: renta de autos en Durango, marketplace de anfitriones y unidades para conductores de apps de movilidad.
            </p>

            {/* NAP Local Data (Idéntico a JSON-LD y Contacto) */}
            <div className="space-y-2 pt-1 text-neutral-700 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <span>Sucursal Plaza 450, Blvd. Guadiana, Durango, Dgo., C.P. 34138, México</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                {/* TODO: Confirmar horario oficial de atención en Sucursal Plaza 450 */}
                <span>Lunes a Domingo: 08:00 - 20:00 hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                {/* TODO: Reemplazar con el número de teléfono oficial de GALSA Rent */}
                <span>+52 618 000 0000 · WhatsApp & Atención</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                {/* TODO: Reemplazar con el correo oficial de atención al cliente */}
                <span>contacto@galsarent.com.mx</span>
              </div>
            </div>
          </div>

          {/* Navigation Column 1: Flota */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Autos en Durango
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="/catalogo" onClick={(e) => handleLink(e, '/catalogo')} className="hover:text-black transition-colors">Catálogo de autos</a></li>
              <li><a href="/vehiculos/jeep-wrangler-rubicon-2018-durango" onClick={(e) => handleLink(e, '/vehiculos/jeep-wrangler-rubicon-2018-durango')} className="hover:text-black transition-colors">Jeep Wrangler Rubicon 2018</a></li>
              <li><a href="/vehiculos/jeep-wrangler-2011-durango" onClick={(e) => handleLink(e, '/vehiculos/jeep-wrangler-2011-durango')} className="hover:text-black transition-colors">Jeep Wrangler 2011</a></li>
              <li><a href="/vehiculos/nissan-sentra-sense-2026-durango" onClick={(e) => handleLink(e, '/vehiculos/nissan-sentra-sense-2026-durango')} className="hover:text-black transition-colors">Nissan Sentra Sense 2026</a></li>
              <li><a href="/vehiculos/honda-civic-coupe-2019-durango" onClick={(e) => handleLink(e, '/vehiculos/honda-civic-coupe-2019-durango')} className="hover:text-black transition-colors">Honda Civic Coupé 2019</a></li>
              <li><a href="/vehiculos/volkswagen-virtus-trendline-2026-durango" onClick={(e) => handleLink(e, '/vehiculos/volkswagen-virtus-trendline-2026-durango')} className="hover:text-black transition-colors">Volkswagen Virtus Trendline 2026</a></li>
            </ul>
          </div>

          {/* Navigation Column 2: Marketplace */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Anfitriones
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="/anfitriones" onClick={(e) => handleLink(e, '/anfitriones')} className="hover:text-black transition-colors">Gana dinero con tu auto</a></li>
              <li><a href="/anfitriones#simulador" onClick={(e) => handleLink(e, '/anfitriones')} className="hover:text-black transition-colors">Simulador de ingresos</a></li>
              <li><a href="/confianza" onClick={(e) => handleLink(e, '/confianza')} className="hover:text-black transition-colors">Seguridad y validación</a></li>
              <li><a href="/#como-rentar" onClick={(e) => handleLink(e, '/#como-rentar')} className="hover:text-black transition-colors">Cómo funciona la entrega</a></li>
              <li><a href="/catalogo" onClick={(e) => handleLink(e, '/catalogo')} className="hover:text-black transition-colors">Autos para apps de movilidad</a></li>
            </ul>
          </div>

          {/* Navigation Column 3: Legal & Ayuda */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Legal y Contacto
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="/contacto" onClick={(e) => handleLink(e, '/contacto')} className="hover:text-black transition-colors font-medium text-neutral-900">Contacto y Sucursal</a></li>
              <li><a href="/faq" onClick={(e) => handleLink(e, '/faq')} className="hover:text-black transition-colors">Preguntas frecuentes</a></li>
              <li><a href="/confianza" onClick={(e) => handleLink(e, '/confianza')} className="hover:text-black transition-colors">Contrato digital y seguro</a></li>
              <li><a href="/terminos" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Términos y condiciones</a></li>
              <li><a href="/privacidad" onClick={(e) => handleLink(e, '/privacidad')} className="hover:text-black transition-colors">Aviso de privacidad</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500">
          <p>© 2026 GALSA Rent. Operando en Durango, México.</p>

          <div className="flex items-center space-x-5">
            <a href="/privacidad" onClick={(e) => handleLink(e, '/privacidad')} className="hover:text-black transition-colors">Aviso de privacidad</a>
            <a href="/terminos" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Términos del contrato</a>
            <a href="/contacto" onClick={(e) => handleLink(e, '/contacto')} className="hover:text-black transition-colors">Contacto</a>
          </div>
        </div>
      </div>

      {/* Listón de control interno de despliegue / QA (No forma parte del diseño final) */}
      <div className="bg-black text-white text-[11px] font-mono py-2 px-4 border-t border-neutral-800 text-center tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-neutral-400">
          <span className="text-amber-400 font-semibold">[ENTORNO DE PRUEBAS / QA — Este listón no va en el diseño final]</span>
          <div className="flex items-center gap-3 text-white">
            <span>Última actualización: <strong>28 Oct 2026, 19:55 hrs</strong></span>
            <span className="bg-neutral-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">v1.1.4</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
