import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, ChevronDown, Check, ArrowLeft, ArrowRight, Calendar, 
  Clock, MapPin, FileSignature, X, User, CreditCard
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { DocumentUploadCard, DocUploadState } from './DocumentUploadCard';
import { DateRangePicker } from './DateRangePicker';
import { CustomDropdown, TIME_DROPDOWN_OPTIONS } from './CustomDropdown';

interface ReservationCheckoutViewProps {
  vehicle: Vehicle;
  onNavigate?: (path: string) => void;
  onBackToVehicle?: () => void;
}

export const ReservationCheckoutView: React.FC<ReservationCheckoutViewProps> = ({
  vehicle,
  onNavigate,
  onBackToVehicle,
}) => {
  const [startDate, setStartDate] = useState('2026-11-04');
  const [endDate, setEndDate] = useState('2026-11-07');
  const [pickupTime, setPickupTime] = useState('08:00');
  const [returnTime, setReturnTime] = useState('18:00');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [rentalDays, setRentalDays] = useState(3);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isContractSigned, setIsContractSigned] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>('dates');
  const [isReservationCreated, setIsReservationCreated] = useState(false);
  const [isCardPaid, setIsCardPaid] = useState(false);

  // Datos del cliente (Paso 2)
  const [firstName, setFirstName] = useState('Damián');
  const [lastName, setLastName] = useState('');
  const [clientEmail, setClientEmail] = useState('contact@carlosdamian.com');
  const [clientPhone, setClientPhone] = useState('2281381278');
  const [clientAddress, setClientAddress] = useState('');
  const [clientRfc, setClientRfc] = useState('');

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

  // Bloquear scroll y cerrar modal de contrato con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContractModalOpen(false);
      }
    };
    if (contractModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contractModalOpen]);

  // Cerrar selector de fechas al hacer clic fuera
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    if (calendarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [calendarOpen]);

  // Cálculo de fechas
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 3;
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setRentalDays(calculateDays(start, end));
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Seleccionar fecha';
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const d = new Date(dateStr + 'T00:00:00');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
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

  // Cálculo de precios y resúmenes vivos
  const baseSubtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round(baseSubtotal * 0.33);
  const total = baseSubtotal + serviceFee + extrasTotal;

  const uploadedDocsCount = [licenseDoc, ineDoc, proofDoc].filter((d) => d.status === 'completed').length;
  const clientFullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ') || 'Titular de la reserva';
  const selectedExtraItems = EXTRAS_OPTIONS.filter((extra) => selectedExtras.includes(extra.id));
  const depositAmount = vehicle.deposit || 15000;
  const totalDueNow = total + depositAmount;
  const reservationCode = `GAL-${vehicle.id.replace(/[^0-9]/g, '').slice(0, 6).padEnd(6, '7')}`;

  // En este prototipo siempre se permite pasar a la vista de reserva creada
  const handleCompleteBooking = () => {
    setIsReservationCreated(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isReservationCreated) {
    return (
      <div className="w-full py-8 md:py-12 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-left space-y-6">
          <button
            type="button"
            onClick={() => setIsReservationCreated(false)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Editar mi reserva</span>
          </button>

          {/* Encabezado minimalista de confirmación */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              ¡Reserva creada!
            </h1>
            <p className="text-sm sm:text-base font-sans text-slate-600 leading-relaxed">
              Registramos tu solicitud y apartamos el auto por 48 horas. Te enviaremos la confirmación a{' '}
              <span className="font-semibold text-slate-900">{clientEmail || 'tu correo'}</span>.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-[#3D63FF] text-xs font-heading font-semibold">
                Código: {reservationCode}
              </span>
              {isCardPaid ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-heading font-semibold">
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  Pago de prueba registrado
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-heading font-semibold">
                  Pendiente de confirmación
                </span>
              )}
            </div>
          </div>

          {/* Contenedor único minimalista con detalles, pago y nota de contrato */}
          <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
            {/* Bloque 1: Detalles esenciales de la reserva */}
            <div className="p-5 sm:p-6 space-y-3">
              <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500">
                Detalles de tu reserva
              </h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Vehículo</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {vehicle.make} {vehicle.model} {vehicle.year}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Fechas</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {formatRangeSummary(startDate, endDate)} · {rentalDays} {rentalDays === 1 ? 'día' : 'días'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Horario</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {pickupTime} → {returnTime} hrs
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Sucursal</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    Durango · Plaza 450
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-500">Titular</span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {signatureName || clientFullName}
                  </span>
                </div>
                {selectedExtraItems.length > 0 && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-sans text-slate-500 shrink-0">Extras</span>
                    <span className="font-heading font-semibold text-[#3D63FF] text-right">
                      {selectedExtraItems.map((e) => e.title).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bloque 2: Pago con tarjeta y resumen único (sin duplicar totales) */}
            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#3D63FF] shrink-0" />
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Paga ahora con tarjeta
                  </h2>
                </div>
                <p className="text-xs sm:text-sm font-sans text-slate-500 mt-1">
                  Pago seguro con Stripe (modo de prueba, sin cargo real). También puedes pagar en sucursal al recoger.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50/80 p-4 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-600">
                    Renta ({rentalDays} {rentalDays === 1 ? 'día' : 'días'}{selectedExtraItems.length > 0 ? ' + extras' : ''})
                  </span>
                  <span className="font-heading font-semibold text-slate-900">
                    ${total.toLocaleString('es-MX')} MXN
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-slate-600">
                    Depósito en garantía (reembolsable)
                  </span>
                  <span className="font-heading font-semibold text-slate-900">
                    ${depositAmount.toLocaleString('es-MX')} MXN
                  </span>
                </div>
                <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-4">
                  <span className="font-heading font-bold text-slate-900">Total a cubrir ahora</span>
                  <span className="font-heading font-extrabold text-[#3D63FF] text-base">
                    ${totalDueNow.toLocaleString('es-MX')} MXN
                  </span>
                </div>
              </div>

              {!isCardPaid ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsCardPaid(true)}
                    className="px-6 py-3 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Pagar con tarjeta
                  </button>
                  <span className="text-xs font-sans text-slate-500">
                    O paga en sucursal al recoger tu vehículo.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-heading font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 rounded-xl px-4 py-3">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Pago de prueba completado. Presenta tu código {reservationCode} en Plaza 450.</span>
                </div>
              )}
            </div>

            {/* Bloque 3: Nota minimalista sobre contrato PROFECO */}
            <div className="px-5 py-4 sm:px-6 bg-slate-50/50 rounded-b-2xl flex items-start gap-3">
              <FileSignature className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-heading font-bold text-slate-800">
                  {isContractSigned ? 'Contrato digital registrado' : 'Tu contrato se firma al confirmar'}
                </p>
                <p className="text-xs font-sans text-slate-500 mt-0.5 leading-relaxed">
                  {isContractSigned
                    ? 'Tu contrato registrado ante PROFECO ya quedó vinculado a esta reserva. Kilometraje, gasolina e inventario se registran al entregar la unidad (Anexo A).'
                    : 'Al confirmar tu reserva te enviamos el contrato registrado ante PROFECO por correo para firmarlo desde tu cuenta o en sucursal (Anexo A en la entrega).'}
                </p>
              </div>
            </div>
          </div>

          {/* Botones finales de navegación */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('/catalogo')}
              className="px-6 py-3 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-all cursor-pointer"
            >
              Explorar más autos
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('/')}
              className="px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 font-heading font-semibold text-sm transition-colors cursor-pointer"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

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

            {/* CONTENEDORES LINEALES DE LOS 5 PASOS DE CHECKOUT */}
            <div className="space-y-3.5">

              {/* PASO 1: Fechas y sucursal de entrega */}
              <div
                className={`relative rounded-2xl border bg-white overflow-visible transition-colors ${
                  openAccordion === 'dates'
                    ? 'border-slate-300 z-20'
                    : 'border-slate-200 hover:border-slate-300 z-10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion('dates')}
                  className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left group cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Fechas y sucursal de entrega
                        </h3>
                        <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                          {formatRangeSummary(startDate, endDate)} ({rentalDays} {rentalDays === 1 ? 'día' : 'días'})
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                        Plaza 450, Durango · {formatRangeSummary(startDate, endDate)} · {pickupTime} a {returnTime} hrs
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                    <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'dates' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {openAccordion === 'dates' && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Ciudad
                        </label>
                        <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-heading font-semibold text-sm select-none">
                          Durango, Dgo.
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Sucursal
                        </label>
                        <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-heading font-semibold text-sm select-none truncate">
                          Plaza 450 (Blvd. Guadiana)
                        </div>
                      </div>
                    </div>

                    <div ref={calendarRef} className="relative space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Fecha de recogida
                          </label>
                          <button
                            type="button"
                            onClick={() => setCalendarOpen((prev) => !prev)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white flex items-center justify-between gap-2 text-sm font-heading font-semibold text-left transition-all cursor-pointer ${
                              calendarOpen
                                ? 'border-blue-500 ring-2 ring-blue-500/15 text-slate-900'
                                : 'border-slate-300 hover:border-slate-400 text-slate-900'
                            }`}
                          >
                            <span className="truncate">{formatDisplayDate(startDate)}</span>
                            <Calendar className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={1.5} />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Hora de recogida
                          </label>
                          <CustomDropdown
                            options={TIME_DROPDOWN_OPTIONS}
                            value={pickupTime}
                            onChange={setPickupTime}
                            triggerIcon={Clock}
                            align="right"
                            footer="Horario de sucursal: 08:00 a 20:00 hrs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Fecha de devolución
                          </label>
                          <button
                            type="button"
                            onClick={() => setCalendarOpen((prev) => !prev)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white flex items-center justify-between gap-2 text-sm font-heading font-semibold text-left transition-all cursor-pointer ${
                              calendarOpen
                                ? 'border-blue-500 ring-2 ring-blue-500/15 text-slate-900'
                                : 'border-slate-300 hover:border-slate-400 text-slate-900'
                            }`}
                          >
                            <span className="truncate">{formatDisplayDate(endDate)}</span>
                            <Calendar className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={1.5} />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Hora de devolución
                          </label>
                          <CustomDropdown
                            options={TIME_DROPDOWN_OPTIONS}
                            value={returnTime}
                            onChange={setReturnTime}
                            triggerIcon={Clock}
                            align="right"
                            footer="Horario de sucursal: 08:00 a 20:00 hrs"
                          />
                        </div>
                      </div>

                      {calendarOpen && (
                        <div className="absolute top-full left-0 mt-2 z-[70]">
                          <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleDateRangeChange}
                            onClose={() => setCalendarOpen(false)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-sans text-slate-500 pt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#3D63FF] shrink-0" strokeWidth={2.5} />
                      <span>
                        Disponible del {formatDisplayDate(startDate)} — {formatDisplayDate(endDate)} ({rentalDays} {rentalDays === 1 ? 'día' : 'días'})
                      </span>
                    </div>

                    <div className="pt-2 flex justify-start">
                      <button
                        type="button"
                        onClick={() => {
                          setCalendarOpen(false);
                          setOpenAccordion('client');
                        }}
                        className="px-7 py-3 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* PASO 2: Datos del cliente */}
              <div
                className={`relative rounded-2xl border bg-white overflow-visible transition-colors ${
                  openAccordion === 'client'
                    ? 'border-slate-300 z-20'
                    : 'border-slate-200 hover:border-slate-300 z-10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion('client')}
                  className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left group cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Datos del cliente
                        </h3>
                        {(firstName.trim() || lastName.trim()) && (
                          <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                            {clientFullName}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                        Información del titular de la reserva
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                    <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'client' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {openAccordion === 'client' && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Nombre(s)
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Nombre(s)"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Apellidos"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="correo@ejemplo.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="10 dígitos"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <p className="text-xs font-sans text-slate-500">
                      Es el correo de tu cuenta de GALSA: ahí te llega la confirmación. ¿No eres tú?{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate && onNavigate('/login')}
                        className="font-semibold text-[#3D63FF] hover:underline cursor-pointer"
                      >
                        Cambiar de cuenta
                      </button>
                    </p>

                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Dirección
                      </label>
                      <input
                        type="text"
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        placeholder="Dirección"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        RFC (Opcional)
                      </label>
                      <input
                        type="text"
                        value={clientRfc}
                        onChange={(e) => setClientRfc(e.target.value)}
                        placeholder="RFC (opcional)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                      />
                    </div>

                    <p className="text-xs font-sans text-slate-500">
                      Usamos tus datos sólo para gestionar tu reserva y verificar tu identidad. Consulta nuestro{' '}
                      <a
                        href="/privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#3D63FF] hover:underline"
                      >
                        aviso de privacidad
                      </a>.
                    </p>

                    <div className="pt-2 flex justify-start">
                      <button
                        type="button"
                        onClick={() => setOpenAccordion('docs')}
                        className="px-7 py-3 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* PASO 3: Documentos requeridos */}
              <div
                className={`relative rounded-2xl border bg-white overflow-visible transition-colors ${
                  openAccordion === 'docs'
                    ? 'border-slate-300 z-20'
                    : 'border-slate-200 hover:border-slate-300 z-10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion('docs')}
                  className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left group cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Documentos requeridos
                        </h3>
                        <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                          {uploadedDocsCount}/3 cargados
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                        Sube tus documentos para verificación
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                    <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'docs' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {openAccordion === 'docs' && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200 text-left">
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

                    <div className="pt-2 flex justify-start">
                      <button
                        type="button"
                        onClick={() => setOpenAccordion('extras')}
                        className="px-7 py-3 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* PASO 4: Extras, seguro y condiciones */}
              <div
                className={`relative rounded-2xl border bg-white overflow-visible transition-colors ${
                  openAccordion === 'extras'
                    ? 'border-slate-300 z-20'
                    : 'border-slate-200 hover:border-slate-300 z-10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion('extras')}
                  className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left group cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Extras, seguro y condiciones
                        </h3>
                        {selectedExtras.length > 0 && (
                          <span className="text-xs font-heading font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200/70">
                            {selectedExtras.length} extra{selectedExtras.length > 1 ? 's' : ''} · +${extrasTotal.toLocaleString('es-MX')}
                          </span>
                        )}
                        {acceptedTerms && (
                          <span className="text-xs font-heading font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                            Condiciones aceptadas ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                        Personaliza tu cobertura y complementos
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                    <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'extras' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {openAccordion === 'extras' && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200 text-left">
                    <div className="space-y-2.5">
                      {EXTRAS_OPTIONS.map((extra) => {
                        const isChecked = selectedExtras.includes(extra.id);
                        return (
                          <div
                            key={extra.id}
                            onClick={() => toggleExtra(extra.id)}
                            className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                              isChecked
                                ? 'border-blue-400 bg-blue-50/40'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div
                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                                  isChecked
                                    ? 'bg-[#3D63FF] border-[#3D63FF] text-white'
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
                              +${extra.price.toLocaleString('es-MX')} por renta
                            </span>
                          </div>
                        );
                      })}
                    </div>

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

                    <div
                      onClick={() => setAcceptedTerms(!acceptedTerms)}
                      className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                          acceptedTerms
                            ? 'bg-[#3D63FF] border-[#3D63FF] text-white'
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

                    <div className="pt-2 flex justify-start">
                      <button
                        type="button"
                        onClick={() => setOpenAccordion('contract')}
                        className="px-7 py-3 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* PASO 5: Contrato digital y firma */}
              <div
                className={`relative rounded-2xl border bg-white overflow-visible transition-colors ${
                  openAccordion === 'contract'
                    ? 'border-slate-300 z-20'
                    : 'border-slate-200 hover:border-slate-300 z-10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion('contract')}
                  className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left group cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                      5
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Contrato digital y firma
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
                        Lee y firma el contrato digital
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                    <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${openAccordion === 'contract' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {openAccordion === 'contract' && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200 text-left">
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
                            ? `Firma registrada por ${signatureName || clientFullName} con folio digital #GLS-${vehicle.id.slice(0, 6).toUpperCase()}`
                            : 'Abre el contrato en una ventana modal para leer las cláusulas y registrar tu firma digital.'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setContractModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-heading font-semibold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
                      >
                        {isContractSigned ? 'Ver contrato firmado' : 'Leer y firmar contrato'}
                      </button>
                    </div>

                    <div className="pt-2 space-y-2 flex flex-col items-start">
                      <button
                        type="button"
                        onClick={handleCompleteBooking}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <span>Continuar al pago y confirmación</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-xs font-sans text-slate-500">
                        Al continuar pasarás a la siguiente parte para confirmar y cerrar tu reserva.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* ========================================================
              COLUMNA DERECHA: RESUMEN DE PAGO AMIGABLE (SIN BOTÓN CTA)
             ======================================================== */}
          <div className="lg:col-span-5 w-full">
            <div className="sticky top-24 bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5 text-left">
              
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
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-xs font-sans text-slate-500">
                      {vehicle.category}
                    </span>
                    <span className="text-[11px] font-heading font-semibold text-[#3D63FF] bg-blue-50 px-2 py-0.5 rounded-md">
                      Verificado GALSA
                    </span>
                  </div>
                </div>
              </div>

              {/* Detalles amigables de tu viaje en vivo */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-800">
                    Detalles de tu viaje
                  </span>
                  <span className="text-xs font-heading font-semibold text-blue-600">
                    {rentalDays} {rentalDays === 1 ? 'día' : 'días'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Sucursal</span>
                  </span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    Plaza 450, Durango
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Recogida</span>
                  </span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {formatDisplayDate(startDate)} · {pickupTime} hrs
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-sans">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Devolución</span>
                  </span>
                  <span className="font-heading font-semibold text-slate-900 text-right">
                    {formatDisplayDate(endDate)} · {returnTime} hrs
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-sans">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Titular</span>
                  </span>
                  <span className="font-heading font-semibold text-slate-900 text-right truncate max-w-[180px]">
                    {clientFullName}
                  </span>
                </div>
              </div>

              {/* Resumen del pago amigable con extras en vivo */}
              <div className="rounded-2xl border border-slate-200/90 bg-transparent p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-800">
                    Resumen del pago
                  </span>
                  <span className="text-xs font-heading font-medium text-slate-500">
                    {formatRangeSummary(startDate, endDate)}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm font-sans text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Renta (${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} {rentalDays === 1 ? 'día' : 'días'})</span>
                    <span className="font-heading font-semibold text-slate-900">${baseSubtotal.toLocaleString('es-MX')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Cobertura básica incluida</span>
                    <span className="font-heading font-semibold text-emerald-600">Incluida</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Tarifa de servicio GALSA (33%)</span>
                    <span className="font-heading font-semibold text-slate-900">${serviceFee.toLocaleString('es-MX')}</span>
                  </div>

                  {selectedExtraItems.length > 0 ? (
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-blue-700 block">
                        Extras agregados ({selectedExtraItems.length})
                      </span>
                      {selectedExtraItems.map((extra) => (
                        <div key={extra.id} className="flex items-center justify-between gap-2 text-blue-700">
                          <span className="truncate">{extra.title}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="font-heading font-semibold">+${extra.price.toLocaleString('es-MX')}</span>
                            <button
                              type="button"
                              onClick={() => toggleExtra(extra.id)}
                              aria-label="Quitar extra"
                              className="w-5 h-5 rounded-full hover:bg-blue-100 text-blue-500 hover:text-blue-700 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Extras adicionales</span>
                      <span className="font-heading font-medium">$0</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200/80">
                  <div className="flex items-center justify-between text-sm sm:text-base font-heading font-bold text-slate-900">
                    <span>Total de la renta</span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">${total.toLocaleString('es-MX')} MXN</span>
                  </div>
                </div>
              </div>

              {/* Depósito en garantía reembolsable separado con contorno lineal */}
              <div className="flex justify-between items-center px-4 py-3 rounded-xl border border-slate-200/90 bg-transparent gap-2 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-700 font-heading font-semibold block">Depósito en garantía</span>
                  <span className="text-[11px] font-sans text-slate-400 block">100% reembolsable al devolver la unidad</span>
                </div>
                <span className="font-heading font-bold text-slate-900 shrink-0">${(vehicle.deposit || 15000).toLocaleString('es-MX')} MXN</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-heading font-medium text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reserva protegida por GALSA · Sin cargos ocultos</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* MODAL DE CONTRATO Y FIRMA */}
      {contractModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setContractModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Contrato de Renta Digital GALSA"
        >
          <div
            className="bg-white rounded-[24px] max-w-2xl w-full p-6 sm:p-8 space-y-6 text-left shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
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
                aria-label="Cerrar contrato"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
              <p>
                <strong>CONTRATO DE ARRENDAMIENTO VEHICULAR MERCANTIL</strong> celebrado entre <strong>GALSA RENT S.A. DE C.V.</strong> y el <strong>ARRENDATARIO</strong> titular.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div><strong>Titular:</strong> {clientFullName}</div>
                <div><strong>Unidad:</strong> {vehicle.make} {vehicle.model} ({vehicle.year})</div>
                <div><strong>Sucursal:</strong> Plaza 450, Durango, Dgo.</div>
                <div><strong>Periodo:</strong> Del {formatDisplayDate(startDate)} ({pickupTime} hrs) al {formatDisplayDate(endDate)} ({returnTime} hrs)</div>
                {selectedExtraItems.length > 0 && (
                  <div><strong>Extras incluidos:</strong> {selectedExtraItems.map((e) => e.title).join(', ')}</div>
                )}
                <div><strong>Monto Total:</strong> ${total.toLocaleString('es-MX')} MXN</div>
                <div><strong>Depósito en Garantía:</strong> ${(vehicle.deposit || 15000).toLocaleString('es-MX')} MXN (reembolsable)</div>
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
                    if (!signatureName.trim()) {
                      setSignatureName(clientFullName);
                    }
                    setIsContractSigned(true);
                    setContractModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Confirmar firma digital
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
