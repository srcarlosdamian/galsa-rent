import React, { useState } from 'react';
import { ChevronRight, Zap, Shield, Clock } from 'lucide-react';

interface RentYourCarSectionProps {
  onNavigate?: (path: string) => void;
}

export const RentYourCarSection: React.FC<RentYourCarSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'sedan-compacto' | 'suv-familiar' | 'pickup-trabajo' | 'premium-lujo'>('sedan-compacto');

  const categories = [
    { id: 'sedan-compacto', label: 'Sedán compacto', value: 'Sedán compacto' },
    { id: 'suv-familiar', label: 'SUV familiar', value: 'SUV familiar' },
    { id: 'pickup-trabajo', label: 'Pickup / Trabajo', value: 'Pickup / Trabajo' },
    { id: 'premium-lujo', label: 'Premium / Lujo', value: 'Premium / Lujo' },
  ];

  const estimations = {
    'sedan-compacto': {
      estimatedValue: 450000,
      rentalDaysPerMonth: 15,
      pricePerDay: 1200,
      monthlyEarnings: 18000,
    },
    'suv-familiar': {
      estimatedValue: 650000,
      rentalDaysPerMonth: 15,
      pricePerDay: 1800,
      monthlyEarnings: 27000,
    },
    'pickup-trabajo': {
      estimatedValue: 550000,
      rentalDaysPerMonth: 15,
      pricePerDay: 1500,
      monthlyEarnings: 22500,
    },
    'premium-lujo': {
      estimatedValue: 1200000,
      rentalDaysPerMonth: 15,
      pricePerDay: 3500,
      monthlyEarnings: 52500,
    },
  };

  const currentEstimation = estimations[selectedCategory];
  const serviceFeePct = 33;
  const clientDailyPrice = Math.round(currentEstimation.pricePerDay * (1 + serviceFeePct / 100));

  const handlePublish = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/anfitriones');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Programa de afiliaciones GALSA
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                Convierte tu auto en{' '}
                <span className="relative inline-block pb-2">
                  <span className="text-neutral-900">ingresos</span>
                  <div className="absolute -bottom-1 left-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-300 w-32" />
                </span>
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed">
                Publica tu vehículo en el marketplace de GALSA y genera ingresos con la seguridad de una operación profesional: verificación, seguro y pagos automatizados.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">33% comisión al cliente</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Tú recibes el 100% de la tarifa que fijas, el cliente cubre la comisión de servicio.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">100% de la tarifa para ti</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Sin descuentos, sin retenciones. Recibes íntegro lo que estableces por día.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">24-48h revisión de solicitud</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Respuesta rápida en la plataforma. Tú apruebas cada reserva con total control.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handlePublish}
                style={{ backgroundColor: '#3D63FF' }}
                className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all hover:brightness-95 active:scale-95"
              >
                <span>Quiero publicar mi auto</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/anfitriones');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 text-neutral-900 font-bold text-sm px-7 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
              >
                <span>Calcular mis ingresos</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Calculator */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-5 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Simulador interactivo
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mt-1">
                  Calcula tus ingresos estimados
                </h3>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="space-y-4 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Tipo de vehículo
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimation Breakdown */}
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-600 font-medium">Valor estimado del auto</span>
                  <span className="text-sm font-bold text-neutral-900">
                    ${currentEstimation.estimatedValue.toLocaleString('es-MX')} MXN
                  </span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-600 font-medium">Tu tarifa por día</span>
                  <span className="text-sm font-bold text-neutral-900">
                    ${currentEstimation.pricePerDay.toLocaleString('es-MX')} MXN
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-neutral-600 font-medium">Cliente paga por día (+33%)</span>
                  <span className="text-sm font-bold text-neutral-900">
                    ${clientDailyPrice.toLocaleString('es-MX')} MXN
                  </span>
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Tu ingreso neto mensual estimado
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-900">
                    ${currentEstimation.monthlyEarnings.toLocaleString('es-MX')}
                  </span>
                  <span className="text-xs font-bold text-neutral-600">MXN / mes</span>
                </div>
                <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                  Basado en {currentEstimation.rentalDaysPerMonth} días al mes. Tú estableces disponibilidad y apruebas cada solicitud.
                </p>
              </div>

              <p className="text-xs text-neutral-500 text-center pt-2">
                *Estimación con fines ilustrativos. Los ingresos dependen de demanda, temporada y disponibilidad del vehículo.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
