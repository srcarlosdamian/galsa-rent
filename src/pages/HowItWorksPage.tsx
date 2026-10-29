import React from 'react';
import { 
  Smartphone, FileCheck, Key, ShieldCheck, 
  MapPin, Clock, ArrowRight, CheckCircle2, ChevronRight, HelpCircle 
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate?: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Elige tu auto y fechas',
      desc: 'Explora nuestro catálogo verificado con fotos reales. Elige los días de tu renta con kilometraje libre y tarifa transparente sin sorpresas.',
      icon: Smartphone,
      details: [
        'Precios claros con IVA incluido y tarifa de servicio del 33%',
        'Disponibilidad garantizada y confirmación instantánea',
        'Flota propia y autos de anfitriones evaluados uno por uno'
      ]
    },
    {
      num: '02',
      title: 'Valida tu documentación en línea',
      desc: 'Sube tu identificación oficial (INE o pasaporte), licencia de conducir vigente y comprobante de domicilio. Todo desde tu celular en 3 minutos.',
      icon: ShieldCheck,
      details: [
        'Edad mínima: 21 años cumplidos',
        'Método de pago a nombre del titular',
        'Validación biométrica y de identidad segura'
      ]
    },
    {
      num: '03',
      title: 'Firma tu contrato digital',
      desc: 'Sin acudir a oficinas previas ni papeleos engorrosos. Firmas un contrato digital con plena validez jurídica mercantil respaldado con sellado de tiempo.',
      icon: FileCheck,
      details: [
        'Certeza legal total para ambas partes',
        'Depósito en garantía 100% reembolsable al cierre',
        'Seguro con cobertura amplia durante todo el periodo'
      ]
    },
    {
      num: '04',
      title: 'Recibe tu auto en Plaza 450',
      desc: 'Acude a Sucursal Plaza 450 en Durango. Realizamos una inspección fotográfica conjunta, cotejo de combustible y te entregamos las llaves.',
      icon: Key,
      details: [
        'Checklist controlado: fotos de carrocería e interiores',
        'Mismo nivel de gasolina a la entrega y devolución',
        'Asistencia y soporte directo vía WhatsApp en todo momento'
      ]
    }
  ];

  return (
    <div className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500 flex items-center gap-1.5 mb-8">
          <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-black transition-colors">
            Inicio
          </a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-bold">Cómo funciona</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Proceso 100% en línea
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1]">
            Cómo rentar un auto en GALSA Rent
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Diseñamos un proceso rápido, transparente y seguro. Olvídate de los mostradores tradicionales y las filas: reserva, valida y firma tu contrato digital desde tu celular antes de recoger la unidad en Sucursal Plaza 450.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm hover:border-black transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-neutral-300">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100 space-y-2">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Point Box */}
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 md:p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-bold text-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>Punto oficial de entrega y devolución</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Sucursal Plaza 450 en Durango
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Todas nuestras unidades se entregan físicamente en nuestro punto controlado en Blvd. Guadiana, Plaza 450, Durango. Nuestro equipo te entrega el auto lavado, con tanque lleno y con el checklist fotográfico verificado.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-neutral-700 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-500" />
                Lunes a Domingo: 08:00 - 20:00 hrs
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Checklist fotográfico de salida y retorno
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a
              href="/catalogo"
              onClick={(e) => handleLink(e, '/catalogo')}
              style={{ backgroundColor: '#3D63FF' }}
              className="py-3.5 px-6 rounded-2xl text-white font-bold text-xs uppercase tracking-wider text-center transition-all shadow-sm hover:brightness-105 active:scale-[0.98]"
            >
              Ver autos disponibles
            </a>
            <a
              href="/contacto"
              onClick={(e) => handleLink(e, '/contacto')}
              className="py-3.5 px-6 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-bold text-xs uppercase tracking-wider text-center hover:border-black transition-all"
            >
              Ver ubicación
            </a>
          </div>
        </div>

        {/* FAQs Link Section */}
        <div className="border-t border-neutral-200 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-neutral-900">
              ¿Tienes dudas sobre los requisitos o el depósito?
            </h3>
            <p className="text-xs text-neutral-600">
              Consulta nuestra sección de preguntas frecuentes con todos los detalles de tarifas, cancelaciones y seguro.
            </p>
          </div>
          <a
            href="/faq"
            onClick={(e) => handleLink(e, '/faq')}
            className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-neutral-900 border border-neutral-300 px-5 py-3 rounded-xl hover:border-black transition-all shrink-0"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Ir a Preguntas frecuentes</span>
          </a>
        </div>

      </div>
    </div>
  );
};
