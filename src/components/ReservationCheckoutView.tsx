import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ChevronDown, Check, ArrowLeft, Calendar, 
  Clock, MapPin, FileSignature, X, ExternalLink, AlertCircle
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { DocumentUploadCard, DocUploadState } from './DocumentUploadCard';

interface ReservationCheckoutViewProps {
  vehicle: Vehicle;
  onNavigate?: (path: string) => void;
  onBackToVehicle?: () => void;
}

const TIME_OPTIONS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00'
];

export const ReservationCheckoutView: React.FC<ReservationCheckoutViewProps> = ({
  vehicle,
  onNavigate,
  onBackToVehicle,
}) => {
  const [startDate, setStartDate] = useState('2026-11-04');
  const [endDate, setEndDate] = useState('2026-11-07');
  const [pickupTime, setPickupTime] = useState('08:00');
  const [returnTime, setReturnTime] = useState('18:00');
  const [rentalDays, setRentalDays] = useState(3);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isContractSigned, setIsContractSigned] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>('dates');

  // Estados de carga de documentos
  const [licenseDoc, setLicenseDoc] = useState<DocUploadState>({
    name: 'Scann_158.pdf',
    sizeStr: '30 MB / 74 MB',
    progress: 79,
    status: 'uploading',
  });

  const [ineDoc, setIneDoc] = useState<DocUploadState>({
    name: '',
    sizeStr: '',
    progress: 0,
    status: 'idle',
  });

  const [proofDoc, setProofDoc] = useState<DocUploadState>({
    name: '',
    sizeStr: '',
    progress: 0,
    status: 'idle',
  });

  const [additionalDocNotes, setAdditionalDocNotes] = useState('');

  // Bloquear scroll al abrir modal de contrato
  useEffect(() => {
    if (contractModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [contractModalOpen]);

  // Cálculo de fechas
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 3;
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    if (val && endDate) {
      setRentalDays(calculateDays(val, endDate));
    }
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    if (startDate && val) {
      setRentalDays(calculateDays(startDate, val));
    }
  };

  const formatRangeSummary = (s: string, e: string) => {
    if (!s || !e) return '4 nov — 7 nov';
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const sDate = new Date(s + 'T00:00:00');
    const eDate = new Date(e + 'T00:00:00');
    return `${sDate.getDate()} ${months[sDate.getMonth()]} — ${eDate.getDate()} ${months[eDate.getMonth()]}`;
  };

  const EXTRAS_OPTIONS = [
    {
      id: 'extra-driver',
      title: 'Conductor adicional',
      description: 'Registra un segundo conductor autorizado.',
      price: 350,
    },
    {
      id: 'baby-seat',
      title: 'Silla para bebé',
      description: 'Sistema de retención infantil.',
      price: 200,
    },
    {
      id: 'gps',
      title: 'GPS / Navegador',
      description: 'Dispositivo de navegación.',
      price: 150,
    },
    {
      id: 'full-insurance',
      title: 'Cobertura total de daños',
      description: 'Protección adicional por daños al vehículo.',
      price: 450,
    },
    {
      id: 'unlimited-km',
      title: 'Kilometraje ilimitado',
      description: 'Sin tope de kilómetros por día.',
      price: 500,
    },
  ];

  const extrasTotal = selectedExtras.reduce((acc, id) => {
    const item = EXTRAS_OPTIONS.find((e) => e.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => (prev === id ? null : id));
  };

  const simulateDocUpload = (type: 'license' | 'ine' | 'proof', customName?: string, customSize?: string) => {
    const targetSetter = type === 'license' ? setLicenseDoc : type === 'ine' ? setIneDoc : setProofDoc;
    const fileName = customName || (type === 'license' ? 'Scann_158.pdf' : type === 'ine' ? 'INE_identificacion_oficial.pdf' : 'Comprobante_domicilio_reciente.pdf');
    const fileSize = customSize || (type === 'license' ? '30 MB / 74 MB' : type === 'ine' ? '2.4 MB / 2.4 MB' : '1.8 MB / 1.8 MB');

    targetSetter({
      name: fileName,
      sizeStr: fileSize,
      progress: 25,
      status: 'uploading'
    });

    let current = 25;
    const timer = setInterval(() => {
      current += 25;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        targetSetter({
          name: fileName,
          sizeStr: fileSize,
          progress: 100,
          status: 'completed'
        });
      } else {
        targetSetter(prev => ({
          ...prev,
          progress: current
        }));
      }
    }, 280);
  };

  const handleDocRemove = (type: 'license' | 'ine' | 'proof') => {
    const targetSetter = type === 'license' ? setLicenseDoc : type === 'ine' ? setIneDoc : setProofDoc;
    targetSetter({
      name: '',
      sizeStr: '',
      progress: 0,
      status: 'idle'
    });
  };

  // Cálculo de precios
  const baseSubtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round(baseSubtotal * 0.33);
  const total = baseSubtotal + serviceFee + extrasTotal;

  // Validación de condiciones y campos obligatorios
  const isFormComplete = Boolean(
    startDate && 
    endDate && 
    pickupTime && 
    returnTime && 
    acceptedTerms &&
    isContractSigned
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleCompleteBooking = () => {
    if (!isFormComplete) return;
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="w-full py-8 md:py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Barra superior de navegación para volver a la vista del automóvil */}
        <div className="mb-8 flex items-center justify-between text-left">
          <button
            type="button"
            onClick={() => {
              if (onBackToVehicle) {
                onBackToVehicle();
              } else if (onNavigate) {
                onNavigate(`/vehiculos/${vehicle.slug}`);
              }
            }}
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al vehículo</span>
          </button>

          <span className="text-xs font-heading font-medium text-slate-400">
            Paso 2 de 2 · Check-in y Contratación
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================
              COLUMNA IZQUIERDA: FLUJO DE CHECKOUT EN 6 ACORDEONES
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
                Completa tu reserva
              </h1>
              <p className="text-sm font-sans text-slate-500">
                Revisa fechas, complementos, documentación y firma tu contrato digital en minutos.
              </p>
            </div>

            {/* ACORDEÓN 1: Fechas y sucursal */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('dates')}
                className="w-full flex items-center justify-between py-2 text-left group cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      1. Fechas y sucursal
                    </h3>
                    <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      {formatRangeSummary(startDate, endDate)} ({rentalDays} {rentalDays === 1 ? 'día' : 'días'})
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                    Durango · Sucursal Plaza 450
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                  <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'dates' ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {openAccordion === 'dates' && (
                <div className="pt-5 pb-2 space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                        Ciudad
                      </label>
                      <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-heading font-semibold text-sm select-none">
                        Durango, Dgo.
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                        Sucursal oficial
                      </label>
                      <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-heading font-semibold text-sm select-none truncate">
                        Plaza 450 (Blvd. Guadiana)
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                        Fecha de recogida
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-sm outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                        Fecha de devolución
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACORDEÓN 2: Horarios */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('hours')}
                className="w-full flex items-center justify-between py-2 text-left group cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      2. Horarios
                    </h3>
                    <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      Entrega: {pickupTime} · Devolución: {returnTime}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                    Horario de atención en sucursal: 08:00 a 20:00 hrs
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                  <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'hours' ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {openAccordion === 'hours' && (
                <div className="pt-5 pb-2 grid grid-cols-2 gap-3 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                      Hora de entrega
                    </label>
                    <div className="relative">
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-sm outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t} hrs</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                      Hora de devolución
                    </label>
                    <div className="relative">
                      <select
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-sm outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t} hrs</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACORDEÓN 3: Extras */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('extras')}
                className="w-full flex items-center justify-between py-2 text-left group cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      3. Extras
                    </h3>
                    {selectedExtras.length > 0 && (
                      <span className="text-xs font-heading font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                        {selectedExtras.length} seleccionado{selectedExtras.length > 1 ? 's' : ''} (+${extrasTotal.toLocaleString('es-MX')})
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                    Conductor adicional, silla infantil, GPS o coberturas adicionales
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                  <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'extras' ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {openAccordion === 'extras' && (
                <div className="pt-5 pb-2 space-y-2.5 animate-in fade-in duration-200">
                  {EXTRAS_OPTIONS.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'border-slate-400 bg-slate-50/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                              isChecked
                                ? 'bg-slate-900 border-slate-900 text-white'
                                : 'bg-white border-slate-300 text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                          </div>
                          <div className="text-left min-w-0">
                            <span className="font-heading font-bold text-slate-900 text-sm block">
                              {extra.title}
                            </span>
                            <span className="text-xs font-sans text-slate-500 block truncate">
                              {extra.description}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs sm:text-sm font-heading font-bold text-slate-900 shrink-0 ml-3">
                          +${extra.price} por renta
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACORDEÓN 4: Documentación y validación */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('docs')}
                className="w-full flex items-center justify-between py-2 text-left group cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      4. Sube tus documentos
                    </h3>
                    <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      3 requeridos
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                    Licencia de conducir, identificación oficial y comprobante de domicilio
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                  <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'docs' ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {openAccordion === 'docs' && (
                <div className="pt-5 pb-2 space-y-4 animate-in fade-in duration-200 text-left">
                  {/* 1. Licencia de conducir */}
                  <DocumentUploadCard
                    title="Licencia de conducir"
                    badge="Vigente, ambos lados"
                    fileState={licenseDoc}
                    onFileSelect={(file) => {
                      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                      simulateDocUpload('license', file.name, `${sizeMb} MB / ${sizeMb} MB`);
                    }}
                    onSimulate={() => simulateDocUpload('license')}
                    onRemove={() => handleDocRemove('license')}
                  />

                  {/* 2. Identificación oficial */}
                  <DocumentUploadCard
                    title="Identificación oficial"
                    badge="INE, frente y reverso"
                    fileState={ineDoc}
                    onFileSelect={(file) => {
                      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                      simulateDocUpload('ine', file.name, `${sizeMb} MB / ${sizeMb} MB`);
                    }}
                    onSimulate={() => simulateDocUpload('ine')}
                    onRemove={() => handleDocRemove('ine')}
                  />

                  {/* 3. Comprobante de domicilio */}
                  <DocumentUploadCard
                    title="Comprobante de domicilio"
                    badge="No mayor a 3 meses"
                    fileState={proofDoc}
                    onFileSelect={(file) => {
                      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                      simulateDocUpload('proof', file.name, `${sizeMb} MB / ${sizeMb} MB`);
                    }}
                    onSimulate={() => simulateDocUpload('proof')}
                    onRemove={() => handleDocRemove('proof')}
                  />

                  {/* Información adicional */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-sm font-heading font-bold text-slate-900">
                      Información adicional (opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={additionalDocNotes}
                      onChange={(e) => setAdditionalDocNotes(e.target.value)}
                      placeholder="Notas para tu renta: horario de llegada de vuelo, requerimientos de entrega..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 text-xs sm:text-sm font-sans outline-none transition-colors resize-y"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ACORDEÓN 5: Condiciones de uso */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('terms')}
                className="w-full flex items-center justify-between py-2 text-left group cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      5. Condiciones de uso
                    </h3>
                    {acceptedTerms ? (
                      <span className="text-xs font-heading font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                        Aceptadas ✓
                      </span>
                    ) : (
                      <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                        Pendiente
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                    Kilometraje libre, combustible, depósitos y términos de renta
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                  <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'terms' ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {openAccordion === 'terms' && (
                <div className="pt-5 pb-2 space-y-4 animate-in fade-in duration-200 text-left">
                  {/* Contenedor gris claro 50 */}
                  <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 space-y-2.5">
                    <h4 className="text-sm font-heading font-bold text-slate-900 mb-2">
                      Condiciones de uso
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">·</span>
                        <span><strong>Kilometraje libre</strong> sin tope por día.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">·</span>
                        <span><strong>Combustible</strong>: se entrega y devuelve con el mismo nivel verificado.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">·</span>
                        <span><strong>Edad mínima del conductor</strong>: 21 años con licencia de conducir vigente.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">·</span>
                        <span><strong>Depósito en garantía</strong>: reembolsable al cierre del contrato sin incidencias.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400">·</span>
                        <span><strong>Prohibido fumar</strong> dentro de la unidad por normativa de higiene y seguridad.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Aceptación de términos y aviso de privacidad */}
                  <div
                    onClick={() => setAcceptedTerms(!acceptedTerms)}
                    className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                        acceptedTerms
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </div>
                    <label className="text-xs sm:text-sm font-sans text-slate-700 select-none cursor-pointer leading-relaxed">
                      Acepto los{' '}
                      <a
                        href="/terminos"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-slate-900 hover:underline"
                      >
                        términos y condiciones
                      </a>{' '}
                      de renta de GALSA y el{' '}
                      <a
                        href="/privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-slate-900 hover:underline"
                      >
                        aviso de privacidad
                      </a>.
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* ACORDEÓN 6: Firmar y contratar */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('contract')}
                className="w-full flex items-center justify-between py-2 text-left group cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      6. Firmar y contratar
                    </h3>
                    {isContractSigned ? (
                      <span className="text-xs font-heading font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                        Firmado digitalmente ✓
                      </span>
                    ) : (
                      <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                        Pendiente de firma
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                    Contrato digital mercantil con validez legal inmediata
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                  <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'contract' ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {openAccordion === 'contract' && (
                <div className="pt-5 pb-2 space-y-4 animate-in fade-in duration-200 text-left">
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileSignature className="w-5 h-5 text-slate-700" />
                        <h4 className="text-sm sm:text-base font-heading font-bold text-slate-900">
                          {isContractSigned ? 'Contrato digital firmado' : 'Contrato de adhesión para renta'}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-500">
                        {isContractSigned 
                          ? `Firma registrada por ${signatureName || 'el titular'} con folio digital #GLS-${vehicle.id.slice(0, 6)}`
                          : 'Revisa las cláusulas y confirma tu firma digital en un modal seguro.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setContractModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-heading font-semibold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
                    >
                      {isContractSigned ? 'Ver contrato firmado' : 'Ver contrato y confirmar'}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* ========================================================
              COLUMNA DERECHA: RESUMEN DE PAGO UNIFICADO Y BOTÓN FINAL
             ======================================================== */}
          <div className="lg:col-span-5 w-full">
            <div className="sticky top-24 bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-6 text-left">
              
              {/* Tarjeta de Vehículo en Resumen */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1">
                  <img
                    src={vehicle.images?.[0]?.url || 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793239505248-1-car.webp'}
                    alt={vehicle.model}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-bold text-slate-900 text-base leading-snug truncate">
                    {vehicle.make} {vehicle.model} {vehicle.year}
                  </h3>
                  <span className="text-xs font-sans text-slate-500 block">
                    {vehicle.category} · Durango (Plaza 450)
                  </span>
                </div>
              </div>

              {/* Resumen del pago unificado con detalles de precio */}
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-800">
                    Resumen del pago
                  </span>
                  <span className="text-xs font-heading font-medium text-slate-500">
                    Disponible del {formatRangeSummary(startDate, endDate)}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm font-sans text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} {rentalDays === 1 ? 'día' : 'días'}</span>
                    <span className="font-heading font-semibold text-slate-900">${baseSubtotal.toLocaleString('es-MX')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Tarifa de servicio GALSA (33%)</span>
                    <span className="font-heading font-semibold text-slate-900">${serviceFee.toLocaleString('es-MX')}</span>
                  </div>

                  {selectedExtras.length > 0 && (
                    <div className="flex items-center justify-between text-blue-700">
                      <span>Extras ({selectedExtras.length})</span>
                      <span className="font-heading font-semibold">+${extrasTotal.toLocaleString('es-MX')}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span>Depósito en garantía (reembolsable)</span>
                    <span className="font-heading font-semibold text-slate-900">${(vehicle.deposit || 15000).toLocaleString('es-MX')}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80">
                  <div className="flex items-center justify-between text-sm sm:text-base font-heading font-bold text-slate-900">
                    <span>Total de la renta</span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">${total.toLocaleString('es-MX')} MXN</span>
                  </div>
                </div>
              </div>

              {/* Botón CTA de Confirmación Final */}
              <button
                type="button"
                onClick={handleCompleteBooking}
                className={`w-full py-4 rounded-xl font-heading font-semibold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                  isFormComplete
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-500'
                }`}
              >
                <span>{isFormComplete ? 'Confirmar y reservar' : 'Completa los campos obligatorios'}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-heading font-medium text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Reserva protegida por GALSA · Sin cargos ocultos</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* MODAL DE CONTRATO Y FIRMA */}
      {contractModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-2xl w-full p-6 sm:p-8 space-y-6 text-left shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-heading font-bold text-slate-900">
                  Contrato de Renta Digital GALSA
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setContractModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
              <p>
                <strong>CONTRATO DE ARRENDAMIENTO VEHICULAR MERCANTIL</strong> celebrado entre <strong>GALSA RENT S.A. DE C.V.</strong> y el <strong>ARRENDATARIO</strong> titular.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div><strong>Unidad:</strong> {vehicle.make} {vehicle.model} ({vehicle.year})</div>
                <div><strong>Placas / Registro:</strong> En regla Durango, Dgo.</div>
                <div><strong>Periodo:</strong> Del {startDate} ({pickupTime} hrs) al {endDate} ({returnTime} hrs)</div>
                <div><strong>Monto Total:</strong> ${total.toLocaleString('es-MX')} MXN</div>
                <div><strong>Depósito en Garantía:</strong> ${(vehicle.deposit || 15000).toLocaleString('es-MX')} MXN</div>
              </div>
              <h5 className="font-heading font-bold text-slate-900 text-sm">Cláusulas esenciales:</h5>
              <p>
                <strong>PRIMERA. USO Y KILOMETRAJE:</strong> La unidad se entrega en óptimas condiciones mecánicas y estéticas para uso particular y turístico dentro de la República Mexicana, con kilometraje libre sin tope diario.
              </p>
              <p>
                <strong>SEGUNDA. COMBUSTIBLE:</strong> Se entrega con el nivel marcado en el checklist de salida y debe restituirse al mismo nivel para evitar cargos de reposición.
              </p>
              <p>
                <strong>TERCERA. DEPÓSITO Y DEVOLUCIÓN:</strong> El depósito en garantía se reembolsará íntegramente al término de la renta tras la inspección física en Sucursal Plaza 450.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3 shrink-0">
              <label className="block text-xs font-heading font-bold text-slate-900">
                Nombre completo del titular que firma:
              </label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder="Ingresa tu nombre completo conforme a tu INE"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 text-sm font-heading outline-none transition-colors"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setContractModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-heading font-semibold text-xs sm:text-sm cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsContractSigned(true);
                    setContractModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Confirmar firma digital
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN EXITOSA (SIN WHATSAPP) */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 space-y-6 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" strokeWidth={2.5} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
                ¡Reserva confirmada con éxito!
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-500 max-w-md mx-auto">
                Tu contrato mercantil digital ha sido formalizado y tu unidad <strong>{vehicle.make} {vehicle.model} {vehicle.year}</strong> está reservada para entrega en <strong>Sucursal Plaza 450, Durango</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs sm:text-sm space-y-2 font-sans text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Folio digital:</span>
                <span className="font-heading font-bold text-slate-900 font-mono">#GLS-{vehicle.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Titular del contrato:</span>
                <span className="font-heading font-semibold text-slate-900">{signatureName || 'Titular verificado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Periodo de entrega:</span>
                <span className="font-heading font-semibold text-slate-900">{startDate} ({pickupTime} hrs) — {endDate} ({returnTime} hrs)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200/80">
                <span className="font-heading font-bold text-slate-900">Total liquidado:</span>
                <span className="font-heading font-extrabold text-blue-600 text-base">${total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  if (onNavigate) onNavigate('/catalogo');
                }}
                className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-700 font-heading font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all cursor-pointer"
              >
                Explorar más vehículos
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  if (onNavigate) onNavigate('/');
                }}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
