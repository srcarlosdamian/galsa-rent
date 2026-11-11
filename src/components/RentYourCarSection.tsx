import React, { useState } from 'react';
import { ChevronRight, Zap, Shield, Clock } from 'lucide-react';

interface RentYourCarSectionProps {
  onNavigate?: (path: string) => void;
}

export const RentYourCarSection: React.FC<RentYourCarSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'sedan-compacto' | 'suv-familiar' | 'pickup-trabajo' | 'premium-lujo'>('sedan-compacto');
  const [autoValue, setAutoValue] = useState<number>(450000);
  const [rentalDays, setRentalDays] = useState<number>(15);
  const [pricePerDay, setPricePerDay] = useState<number>(1200);

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

  const handleCategoryChange = (categoryId: 'sedan-compacto' | 'suv-familiar' | 'pickup-trabajo' | 'premium-lujo') => {
    setSelectedCategory(categoryId);
    const est = estimations[categoryId];
    setAutoValue(est.estimatedValue);
    setRentalDays(est.rentalDaysPerMonth);
    setPricePerDay(est.pricePerDay);
  };

  const serviceFeePct = 33;
  const monthlyEarnings = pricePerDay * rentalDays;
  const serviceCharge = Math.round(monthlyEarnings * (serviceFeePct / 100));
  const clientPays = monthlyEarnings + serviceCharge;
  const clientDailyPrice = Math.round(pricePerDay * (1 + serviceFeePct / 100));

  const handlePublish = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/anfitriones');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Content - 55% */}
          <div className="space-y-8">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Programa de afiliaciones GALSA
              </span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                Convierte tu auto en{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-neutral-900">ingresos</span>
                  <span className="absolute left-0 bottom-0 h-2.5 bg-cta-100 w-full -z-0" />
                </span>
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed">
                Publica tu vehículo en el marketplace de GALSA y genera ingresos con la seguridad de una operación profesional: verificación, seguro y pagos automatizados.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-cta-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cta-900 font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">33% comisión al cliente</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Tú recibes el 100% de la tarifa que fijas, el cliente cubre la comisión de servicio.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-cta-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cta-900 font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">100% de la tarifa para ti</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Sin descuentos, sin retenciones. Recibes íntegro lo que estableces por día.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-cta-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cta-900 font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">24-48h revisión de solicitud</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Respuesta rápida en la plataforma. Tú apruebas cada reserva con total control.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handlePublish}
                style={{ backgroundColor: '#3D63FF' }}
                className="inline-flex items-center justify-center text-white font-bold text-sm px-7 py-3 rounded-xl transition-all hover:brightness-95 active:scale-95"
              >
                <span>Quiero publicar mi auto</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Calculator - 45% */}
          <div className="space-y-6">
            {/* White Container - Simulator + Inputs */}
            <div className="bg-white rounded-2xl p-8 space-y-6 border border-neutral-200">
              <div className="bg-neutral-50 -mx-8 -mt-8 px-8 py-6">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Simulador interactivo
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-2">
                  Calcula tus ingresos estimados
                </h3>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Tipo de vehículo
                </p>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value as any)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-cta-500 appearance-none bg-no-repeat"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000000' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.2em 1.2em',
                    paddingRight: '2.5rem',
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                {/* Valor del Auto */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-bold text-neutral-900 whitespace-nowrap">Valor del auto</label>
                    <input
                      type="range"
                      min="150000"
                      max="1500000"
                      step="50000"
                      value={autoValue}
                      onChange={(e) => setAutoValue(Number(e.target.value))}
                      className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        accentColor: '#3D63FF',
                      }}
                    />
                    <span className="text-sm font-bold text-neutral-900 whitespace-nowrap">${autoValue.toLocaleString('es-MX')}</span>
                  </div>
                </div>

                {/* Días Rentados al Mes */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-bold text-neutral-900 whitespace-nowrap">Días rentados</label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={rentalDays}
                      onChange={(e) => setRentalDays(Number(e.target.value))}
                      className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        accentColor: '#3D63FF',
                      }}
                    />
                    <span className="text-sm font-bold text-neutral-900 whitespace-nowrap">{rentalDays} d</span>
                  </div>
                </div>

                {/* Precio por Día */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-bold text-neutral-900 whitespace-nowrap">Precio/día</label>
                    <input
                      type="range"
                      min="500"
                      max="3000"
                      step="100"
                      value={pricePerDay}
                      onChange={(e) => setPricePerDay(Number(e.target.value))}
                      className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        accentColor: '#3D63FF',
                      }}
                    />
                    <span className="text-sm font-bold text-neutral-900 whitespace-nowrap">${pricePerDay.toLocaleString('es-MX')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Container - Blue Background (Bottom) */}
            <div className="bg-cta-100 rounded-2xl p-6 space-y-4">
              
              {/* Main Income Display */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-3">
                  Tu ingreso neto mensual estimado
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-900">
                    ${monthlyEarnings.toLocaleString('es-MX')}
                  </span>
                  <span className="text-xs font-bold text-neutral-600">MXN</span>
                </div>
              </div>

              {/* Breakdown Section */}
              <div className="space-y-2 text-xs border-t border-cta-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Tus rentas del mes</span>
                  <span className="font-bold text-neutral-900">${monthlyEarnings.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Tarifa GALSA (33%)</span>
                  <span className="font-bold text-neutral-900">${serviceCharge.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Lo que pagan clientes</span>
                  <span className="font-bold text-neutral-900">${clientPays.toLocaleString('es-MX')}</span>
                </div>
              </div>

              {/* Annual Projection - Smaller */}
              <div className="border-t border-cta-200 pt-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2">
                  Proyección anual
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-neutral-900">
                    ${(monthlyEarnings * 12).toLocaleString('es-MX')}
                  </span>
                  <span className="text-xs font-bold text-neutral-600">MXN / año</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="border-t border-cta-200 pt-3">
                <p className="text-xs text-neutral-600 leading-relaxed text-center">
                  Estimación ilustrativa. Los ingresos reales dependen de la demanda, la temporada y la ocupación.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
