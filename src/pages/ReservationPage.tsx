import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, HelpCircle, Phone, Mail, Check } from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { TimeSelect } from '../components/TimeSelect';

interface ReservationPageProps {
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  pickupTime: string;
  returnTime: string;
  onNavigate?: (path: string) => void;
}

type ReservationStep = 'dates' | 'client' | 'documents' | 'extras' | 'summary' | 'contract';

export const ReservationPage: React.FC<ReservationPageProps> = ({
  vehicle,
  startDate,
  endDate,
  pickupTime,
  returnTime,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState<ReservationStep>('dates');
  const [clientData, setClientData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    rfc: '',
  });
  const [expandedSteps, setExpandedSteps] = useState<ReservationStep[]>(['dates']);
  
  // Cálculos
  const startDateObj = new Date(startDate + 'T00:00:00');
  const endDateObj = new Date(endDate + 'T00:00:00');
  const rentalDays = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) || 1;
  const baseSubtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round(baseSubtotal * 0.1);
  const total = baseSubtotal + serviceFee + 3000;

  const toggleStep = (step: ReservationStep) => {
    setExpandedSteps(prev => 
      prev.includes(step) 
        ? prev.filter(s => s !== step)
        : [...prev, step]
    );
  };

  const stepTitles: Record<ReservationStep, string> = {
    dates: '1. Fechas y sucursal de entrega',
    client: '2. Datos del cliente',
    documents: '3. Documentos requeridos',
    extras: '4. Extras, seguro y condiciones',
    summary: '5. Resumen y pago',
    contract: '6. Contrato digital y firma',
  };

  const completedSteps = new Set<ReservationStep>();
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate?.('/catalogo')}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-900 rounded text-white font-bold flex items-center justify-center text-sm">
                G
              </div>
              <span className="font-bold text-neutral-900">GALSA</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-neutral-700">Reserva protegida</span>
            </div>
            <button className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900">
              <HelpCircle className="w-4 h-4" />
              <span>¿Necesitas ayuda?</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Steps */}
        <div className="lg:col-span-2 space-y-4">
          <div className="mb-6">
            <div className="text-sm text-neutral-600 mb-1">RESERVA</div>
            <h1 className="text-3xl font-bold text-neutral-900">Completa tu reserva</h1>
            <p className="text-sm text-neutral-600 mt-2">Sigue los pasos para confirmar tu renta con contrato digital y depósito reembolsable.</p>
          </div>

          {/* Step 1: Dates */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('dates')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${completedSteps.has('dates') ? 'bg-green-500 text-white' : 'bg-neutral-200 text-neutral-700'}`}>
                  {completedSteps.has('dates') ? '✓' : '1'}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Fechas y sucursal de entrega</div>
                  <div className="text-xs text-neutral-600 mt-1">Plaza 450, Durango · {startDate} - {endDate}</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('dates') ? 'rotate-90' : ''}`} />
            </button>

            {expandedSteps.includes('dates') && (
              <div className="px-6 py-4 border-t border-neutral-200 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">CIUDAD</label>
                    <input
                      type="text"
                      value="Durango"
                      disabled
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">SUCURSAL</label>
                    <input
                      type="text"
                      value="Plaza 450"
                      disabled
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">FECHA DE RECOGIDA</label>
                    <input
                      type="date"
                      value={startDate}
                      disabled
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 text-sm"
                    />
                  </div>
                  <TimeSelect
                    value={pickupTime}
                    onChange={() => {}}
                    label="HORA DE RECOGIDA"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">FECHA DE DEVOLUCIÓN</label>
                    <input
                      type="date"
                      value={endDate}
                      disabled
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 text-sm"
                    />
                  </div>
                  <TimeSelect
                    value={returnTime}
                    onChange={() => {}}
                    label="HORA DE DEVOLUCIÓN"
                  />
                </div>
                <div className="text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-green-500 inline-block mr-2" />
                  Disponible del {startDate} – {endDate}
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Client Data */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('client')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${completedSteps.has('client') ? 'bg-green-500 text-white' : 'bg-neutral-200 text-neutral-700'}`}>
                  2
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Datos del cliente</div>
                  <div className="text-xs text-neutral-600 mt-1">Información del titular de la reserva</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('client') ? 'rotate-90' : ''}`} />
            </button>

            {expandedSteps.includes('client') && (
              <div className="px-6 py-4 border-t border-neutral-200 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre(s)"
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Apellidos"
                    value={clientData.surname}
                    onChange={(e) => setClientData({ ...clientData, surname: e.target.value })}
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 text-sm"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={clientData.email}
                  onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={clientData.phone}
                  onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm"
                />
                <input
                  type="text"
                  placeholder="Dirección"
                  value={clientData.address}
                  onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm"
                />
              </div>
            )}
          </div>

          {/* Step 3: Documents */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('documents')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold bg-neutral-200 text-neutral-700">
                  3
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Documentos requeridos</div>
                  <div className="text-xs text-neutral-600 mt-1">Sube tus documentos para verificación</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('documents') ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Step 4: Extras */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('extras')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold bg-neutral-200 text-neutral-700">
                  4
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Extras, seguro y condiciones</div>
                  <div className="text-xs text-neutral-600 mt-1">Personaliza tu cobertura y complementos</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('extras') ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Step 5: Summary */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('summary')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold bg-neutral-200 text-neutral-700">
                  5
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Resumen y pago</div>
                  <div className="text-xs text-neutral-600 mt-1">Revisa el total de la renta y el depósito</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('summary') ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Step 6: Contract */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('contract')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold bg-neutral-200 text-neutral-700">
                  6
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Contrato digital y firma</div>
                  <div className="text-xs text-neutral-600 mt-1">Lee y firma el contrato digital</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('contract') ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="lg:col-span-1">
          {/* Special Discount */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
              <span>✨</span>
              Descuento especial de bienvenida aplicado
            </div>
          </div>

          {/* Vehicle Card */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <div className="aspect-video bg-neutral-200 flex items-center justify-center">
              <img 
                src={vehicle.images[0]?.url} 
                alt={vehicle.images[0]?.alt || `${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-neutral-900">{vehicle.make} {vehicle.model} {vehicle.year}</h3>
              <div className="text-xs text-neutral-600 mt-1">
                {vehicle.category} · Automática · 5 plazas
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <span className="text-neutral-900 font-semibold">★ {vehicle.rating}</span>
                <span className="text-neutral-600">({vehicle.reviewCount} reseñas)</span>
                <span className="text-green-600 text-xs font-semibold ml-auto">Verificado GALSA</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-4 mt-4 space-y-3">
            <h4 className="font-semibold text-neutral-900 text-sm">Detalles del precio</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>1 día de renta x ${vehicle.pricePerDay.toLocaleString('es-MX')}</span>
                <span className="text-neutral-900 font-semibold">${baseSubtotal.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Cobertura básica incluida</span>
                <span className="text-green-600 font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Impuestos y tarifa de servicio</span>
                <span className="text-neutral-900 font-semibold">${serviceFee.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Descuento de bienvenida</span>
                <span className="font-semibold">-${serviceFee.toLocaleString('es-MX')}</span>
              </div>
              <div className="border-t border-neutral-200 pt-2 flex justify-between">
                <span className="font-semibold text-neutral-900">Total</span>
                <span className="font-bold text-neutral-900">${total.toLocaleString('es-MX')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
