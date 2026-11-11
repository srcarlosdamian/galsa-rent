import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, HelpCircle, Phone, Mail, Check, Calendar } from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { TimeSelect } from '../components/TimeSelect';
import { DateRangePicker } from '../components/DateRangePicker';

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
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
  const startDateObj = new Date(localStartDate + 'T00:00:00');
  const endDateObj = new Date(localEndDate + 'T00:00:00');
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
    <div className="min-h-screen bg-white">
      {/* Top Header - Only Protected Reserve and Help */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-end gap-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-cta-500 rounded-full"></div>
            <span className="text-neutral-700">Reserva protegida</span>
          </div>
          <button className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900">
            <HelpCircle className="w-4 h-4" />
            <span>¿Necesitas ayuda?</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Back Button - Icon Only */}
        <div className="lg:col-span-2 -mt-6 mb-4">
          <button
            onClick={() => onNavigate?.('/catalogo')}
            className="p-2 hover:bg-neutral-50 rounded-lg transition-colors"
            title="Atrás"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Left Side - Steps 1-4 and 6 */}
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
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${completedSteps.has('dates') ? 'bg-cta-500 text-white' : 'bg-cta-50 text-cta-900'}`}>
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
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">SUCURSAL</label>
                    <input
                      type="text"
                      value="Plaza 450"
                      disabled
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">FECHA DE RECOGIDA</label>
                    <button
                      onClick={() => setShowDatePicker(true)}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm text-left flex items-center gap-2 hover:bg-neutral-50 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-neutral-600" />
                      {localStartDate}
                    </button>
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
                    <button
                      onClick={() => setShowDatePicker(true)}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm text-left flex items-center gap-2 hover:bg-neutral-50 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-neutral-600" />
                      {localEndDate}
                    </button>
                  </div>
                  <TimeSelect
                    value={returnTime}
                    onChange={() => {}}
                    label="HORA DE DEVOLUCIÓN"
                  />
                </div>
                <div className="text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-cta-500 inline-block mr-2" />
                  Disponible del {localStartDate} – {localEndDate}
                </div>
                <button
                  onClick={() => {
                    setExpandedSteps(prev => prev.includes('dates') ? prev.filter(s => s !== 'dates') : prev);
                    setExpandedSteps(prev => prev.includes('client') ? prev : [...prev, 'client']);
                  }}
                  className="ml-auto py-3 px-6 bg-cta-500 hover:bg-cta-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Client Data */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('client')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${completedSteps.has('client') ? 'bg-cta-500 text-white' : 'bg-cta-50 text-cta-900'}`}>
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
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Apellidos"
                    value={clientData.surname}
                    onChange={(e) => setClientData({ ...clientData, surname: e.target.value })}
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Dirección"
                  value={clientData.address}
                  onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm"
                />
                <button
                  onClick={() => {
                    setExpandedSteps(prev => prev.includes('client') ? prev.filter(s => s !== 'client') : prev);
                    setExpandedSteps(prev => prev.includes('documents') ? prev : [...prev, 'documents']);
                  }}
                  className="ml-auto py-3 px-6 bg-cta-500 hover:bg-cta-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>

          {/* Step 3: Documents */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('documents')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold bg-cta-50 text-cta-900">
                  3
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Documentos requeridos</div>
                  <div className="text-xs text-neutral-600 mt-1">Sube tus documentos para verificación</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('documents') ? 'rotate-90' : ''}`} />
            </button>

            {expandedSteps.includes('documents') && (
              <div className="px-6 py-4 border-t border-neutral-200 space-y-4">
                <p className="text-sm text-neutral-600">Sube tus documentos de identificación y comprobante de domicilio</p>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700">Identificación</label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-xl p-4 text-center cursor-pointer hover:border-cta-500 transition-colors">
                    <p className="text-sm text-neutral-600">Haz clic para seleccionar archivo</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700">Comprobante de domicilio</label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-xl p-4 text-center cursor-pointer hover:border-cta-500 transition-colors">
                    <p className="text-sm text-neutral-600">Haz clic para seleccionar archivo</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setExpandedSteps(prev => prev.includes('documents') ? prev.filter(s => s !== 'documents') : prev);
                    setExpandedSteps(prev => prev.includes('extras') ? prev : [...prev, 'extras']);
                  }}
                  className="ml-auto py-3 px-6 bg-cta-500 hover:bg-cta-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>

          {/* Step 4: Extras */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('extras')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold bg-cta-50 text-cta-900">
                  4
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Extras, seguro y condiciones</div>
                  <div className="text-xs text-neutral-600 mt-1">Personaliza tu cobertura y complementos</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('extras') ? 'rotate-90' : ''}`} />
            </button>

            {expandedSteps.includes('extras') && (
              <div className="px-6 py-4 border-t border-neutral-200 space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-cta-500 rounded" />
                    <span className="text-sm text-neutral-700"><strong>Seguro Amplio</strong> - Protección completa</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 accent-cta-500 rounded" />
                    <span className="text-sm text-neutral-700"><strong>GPS</strong> - Rastreo del vehículo</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 accent-cta-500 rounded" />
                    <span className="text-sm text-neutral-700"><strong>Conductor adicional</strong> - Un conductor más</span>
                  </label>
                </div>
                <button
                  onClick={() => {
                    setExpandedSteps(prev => prev.includes('extras') ? prev.filter(s => s !== 'extras') : prev);
                    setExpandedSteps(prev => prev.includes('summary') ? prev : [...prev, 'summary']);
                  }}
                  className="ml-auto py-3 px-6 bg-cta-500 hover:bg-cta-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>


          {/* Step 6: Contract */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleStep('contract')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold bg-cta-50 text-cta-900">
                  6
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900">Contrato digital y firma</div>
                  <div className="text-xs text-neutral-600 mt-1">Lee y firma el contrato digital</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('contract') ? 'rotate-90' : ''}`} />
            </button>

            {expandedSteps.includes('contract') && (
              <div className="px-6 py-4 border-t border-neutral-200 space-y-4">
                <div className="bg-cta-50 p-4 rounded-lg">
                  <p className="text-sm text-neutral-700 mb-3">Lee los términos y condiciones del contrato digital</p>
                  <div className="border border-neutral-200 rounded-lg p-3 h-32 bg-white overflow-y-auto text-xs text-neutral-600">
                    <p>CONTRATO DE ALQUILER DE VEHÍCULO<br/><br/>
                    Términos y condiciones principales:<br/>
                    1. El cliente se compromete a usar el vehículo únicamente para propósitos legales.<br/>
                    2. El cliente es responsable de cualquier daño al vehículo durante el período de alquiler.<br/>
                    3. Se requiere un depósito de seguridad reembolsable.<br/>
                    4. El cliente debe devolver el vehículo en las condiciones en que lo recibió...</p>
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-cta-500 rounded" />
                  <span className="text-sm text-neutral-700">Acepto los términos y condiciones</span>
                </label>
                <button className="ml-auto py-3 px-6 bg-cta-500 hover:bg-cta-600 text-white font-semibold rounded-xl transition-colors">
                  Confirmar y completar reserva
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Step 5 (Summary) + Vehicle */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Step 5: Summary */}
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleStep('summary')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold bg-cta-50 text-cta-900">
                    5
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-neutral-900">Resumen y pago</div>
                    <div className="text-xs text-neutral-600 mt-1">Revisa el total de la renta y el depósito</div>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${expandedSteps.includes('summary') ? 'rotate-90' : ''}`} />
              </button>

              {expandedSteps.includes('summary') && (
                <div className="px-6 py-4 border-t border-neutral-200 space-y-4">
                  <div className="bg-cta-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Renta diaria</span>
                      <span className="font-semibold text-neutral-900">${(vehicle.pricePerDay).toLocaleString('es-MX')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Días rentados</span>
                      <span className="font-semibold text-neutral-900">{rentalDays} días</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Tarifa de servicio GALSA</span>
                      <span className="font-semibold text-neutral-900">${(serviceFee).toLocaleString('es-MX')}</span>
                    </div>
                    <div className="border-t border-cta-200 pt-2 flex justify-between">
                      <span className="font-semibold text-neutral-900">Total de la renta</span>
                      <span className="font-bold text-cta-700">${(baseSubtotal).toLocaleString('es-MX')}</span>
                    </div>
                    <div className="border-t border-cta-200 pt-2 flex justify-between">
                      <span className="font-semibold text-neutral-900">Depósito reembolsable</span>
                      <span className="font-bold text-cta-700">${(3000).toLocaleString('es-MX')}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setExpandedSteps(prev => prev.includes('summary') ? prev.filter(s => s !== 'summary') : prev);
                      setExpandedSteps(prev => prev.includes('contract') ? prev : [...prev, 'contract']);
                    }}
                    className="ml-auto py-3 px-6 bg-cta-500 hover:bg-cta-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Continuar
                  </button>
                </div>
              )}
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
                  <span className="text-cta-600 text-xs font-semibold ml-auto">Verificado GALSA</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-3">
              <h4 className="font-semibold text-neutral-900 text-sm">Detalles del precio</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>{rentalDays} día(s) de renta x ${vehicle.pricePerDay.toLocaleString('es-MX')}</span>
                  <span className="text-neutral-900 font-semibold">${baseSubtotal.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Cobertura básica incluida</span>
                  <span className="text-cta-600 font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Impuestos y tarifa de servicio</span>
                  <span className="text-neutral-900 font-semibold">${serviceFee.toLocaleString('es-MX')}</span>
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

      {/* Date Range Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Selecciona fechas de renta</h2>
              <DateRangePicker
                startDate={localStartDate}
                endDate={localEndDate}
                onChange={(start, end) => {
                  setLocalStartDate(start);
                  setLocalEndDate(end);
                }}
                onClose={() => setShowDatePicker(false)}
              />
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-6 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 font-bold text-sm hover:bg-neutral-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-6 py-2.5 rounded-xl bg-cta-500 text-white font-bold text-sm hover:bg-cta-600 transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
