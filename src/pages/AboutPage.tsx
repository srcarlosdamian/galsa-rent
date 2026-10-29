import React from 'react';
import { 
  Building2, Users, ShieldCheck, Award, 
  MapPin, CheckCircle2, ChevronRight, Car, HeartHandshake, Phone 
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
    <div className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500 flex items-center gap-1.5 mb-8">
          <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-black transition-colors">
            Inicio
          </a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-bold">Nosotros</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Sobre GALSA Rent
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1]">
            Transformando la movilidad y renta de autos en Durango y México
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Nacimos con el propósito de erradicar la burocracia de las arrendadoras tradicionales: eliminamos filas, cargos ocultos y contratos en papel para ofrecer una experiencia 100% digital, transparente y confiable.
          </p>
        </div>

        {/* 3 Pillars / Mission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              Transparencia total
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Lo que ves es lo que pagas. Todas las tarifas incluyen kilometraje libre, seguro de cobertura amplia y el desglose exacto de la tarifa de servicio antes de firmar.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
              <Car className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              Calidad y control riguroso
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Cada vehículo, ya sea de flota propia o de anfitriones del marketplace, pasa por una inspección mecánica, documental y estética antes de ser publicado y entregado.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              Comunidad y economía local
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Conectamos a personas que necesitan moverse con propietarios que desean generar ingresos seguros con sus autos, impulsando la economía en Durango.
            </p>
          </div>
        </div>

        {/* Narrative / History */}
        <div className="rounded-3xl border border-neutral-200 p-8 md:p-12 mb-20 bg-white grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
              Nuestra historia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              De una necesidad local a una plataforma moderna
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              En Durango, rentar un auto solía implicar requisitos excesivos, costos no informados y procesos lentos. Fundamos GALSA Rent para crear una alternativa tecnológica donde cualquier persona con identificación oficial y licencia pueda reservar en minutos y retirar su auto en nuestra sucursal de Plaza 450 con total tranquilidad.
            </p>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Hoy operamos tanto nuestra propia flota de autos ejecutivos, compactos y vehículos todoterreno, como un marketplace donde anfitriones locales obtienen el 100% de su tarifa diaria establecida.
            </p>
          </div>

          <div className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Datos clave
            </p>
            <div className="divide-y divide-neutral-800 space-y-3">
              <div className="pt-3">
                <span className="text-2xl font-black text-white">100%</span>
                <p className="text-xs text-neutral-400 mt-0.5">En línea: contrato digital y reserva desde el celular</p>
              </div>
              <div className="pt-3">
                <span className="text-2xl font-black text-white">Plaza 450</span>
                <p className="text-xs text-neutral-400 mt-0.5">Punto físico de entrega y checklist controlado en Durango</p>
              </div>
              <div className="pt-3">
                <span className="text-2xl font-black text-white">0 Filas</span>
                <p className="text-xs text-neutral-400 mt-0.5">Llega, coteja fotos, recibe tus llaves y arranca</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Contact CTA */}
        <div className="border-t border-neutral-200 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-neutral-900">
              ¿Quieres visitarnos o resolver una duda directamente?
            </h3>
            <p className="text-xs text-neutral-600">
              Estamos ubicados en Blvd. Guadiana, Plaza 450, Durango, Dgo. O escríbenos a nuestro WhatsApp oficial.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/contacto"
              onClick={(e) => handleLink(e, '/contacto')}
              className="py-3 px-5 rounded-xl border border-neutral-300 hover:border-black font-bold text-xs uppercase tracking-wider text-neutral-900 transition-all"
            >
              Ver sucursal
            </a>
            <a
              href="https://wa.me/526180000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: '#3D63FF' }}
              className="py-3 px-5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:brightness-105"
            >
              WhatsApp oficial
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
