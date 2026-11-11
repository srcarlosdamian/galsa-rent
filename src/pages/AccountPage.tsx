import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Calendar, CreditCard, MapPin, 
  CheckCircle2, ShieldCheck, Car, Clock, X, Edit3, 
  ArrowRight, FileText, ChevronRight, LogOut, Sparkles, AlertCircle
} from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { Vehicle } from '../types/vehicle';

interface AccountPageProps {
  onNavigate: (path: string) => void;
  initialOpenCompleteModal?: boolean;
}

export const AccountPage: React.FC<AccountPageProps> = ({ 
  onNavigate,
  initialOpenCompleteModal = false
}) => {
  // Datos del usuario (con valores persistentes en sessionStorage)
  const [email, setEmail] = useState('cliente@galsa.com');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [city, setCity] = useState('');

  // Control del modal flotante "Completar información"
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'reservas' | 'documentos' | 'favoritos' | 'seguridad'>('reservas');

  // Inicializar estado desde sessionStorage y checar si es primer login o si viene por enlace modal
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('galsa_user_email') || sessionStorage.getItem('galsa_recovery_email');
      if (storedEmail) setEmail(storedEmail);

      const storedName = sessionStorage.getItem('galsa_user_name');
      if (storedName) setFullName(storedName);

      const storedPhone = sessionStorage.getItem('galsa_user_phone');
      if (storedPhone) setPhone(storedPhone);

      const storedBirth = sessionStorage.getItem('galsa_user_birth');
      if (storedBirth) setBirthDate(storedBirth);

      const storedLicense = sessionStorage.getItem('galsa_user_license');
      if (storedLicense) setLicenseNumber(storedLicense);

      const storedCity = sessionStorage.getItem('galsa_user_city');
      if (storedCity) setCity(storedCity);

      // Comprobar si es primer inicio de sesión o si viene por enlace directo con parámetro ?completar=1
      const isFirstLogin = sessionStorage.getItem('galsa_first_login') === 'true';
      const urlHasParam = window.location.search.includes('completar') || window.location.pathname.includes('completar');

      if (isFirstLogin || urlHasParam || initialOpenCompleteModal) {
        setShowCompleteModal(true);
      }
    }
  }, [initialOpenCompleteModal]);

  // Cálculo de porcentaje de completado
  const isProfileComplete = Boolean(fullName && phone && licenseNumber);
  const completionPercentage = isProfileComplete ? 100 : fullName ? 70 : 40;

  // Guardar datos desde el modal flotante
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('galsa_user_name', fullName || 'Carlos Damián');
      sessionStorage.setItem('galsa_user_phone', phone || '+52 618 123 4567');
      if (birthDate) sessionStorage.setItem('galsa_user_birth', birthDate);
      if (licenseNumber) sessionStorage.setItem('galsa_user_license', licenseNumber || 'DGO-984321-A');
      if (city) sessionStorage.setItem('galsa_user_city', city || 'Durango, Dgo.');
      sessionStorage.removeItem('galsa_first_login');
    }
    if (!fullName) setFullName('Carlos Damián');
    if (!phone) setPhone('+52 618 123 4567');
    if (!licenseNumber) setLicenseNumber('DGO-984321-A');
    if (!city) setCity('Durango, Dgo.');

    setModalSubmitted(true);
    setTimeout(() => {
      setShowCompleteModal(false);
      setModalSubmitted(false);
    }, 1800);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('galsa_user_email');
      sessionStorage.removeItem('galsa_first_login');
      sessionStorage.removeItem('galsa_logged_in');
    }
    onNavigate('/login');
  };

  // Vehículos de ejemplo para favoritos y reservación
  const sampleVehicle = VEHICLES[0] || null;

  return (
    <div className="min-h-[85vh] bg-slate-50/60 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 1. Header de Perfil y Bienvenida Minimalista */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cta-600 text-white flex items-center justify-center font-heading font-extrabold text-2xl sm:text-3xl shadow-sm shrink-0">
              {fullName ? fullName.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                  {fullName ? `¡Hola, ${fullName}!` : '¡Bienvenido a tu cuenta!'}
                </h1>
                {isProfileComplete && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-heading font-bold border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verificado
                  </span>
                )}
              </div>
              <p className="text-sm font-sans text-slate-500 mt-0.5">{email}</p>
              {phone && <p className="text-xs font-sans text-slate-400 mt-0.5">{phone} · {city || 'Durango, México'}</p>}
            </div>
          </div>

          {/* Botón flotante para abrir el modal de completar información */}
          <div className="flex flex-wrap items-center gap-3">
            {!isProfileComplete ? (
              <button
                type="button"
                onClick={() => setShowCompleteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cta-600 hover:bg-cta-700 active:scale-95 text-white text-xs sm:text-sm font-heading font-semibold shadow-xs transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Completar información</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowCompleteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs sm:text-sm font-heading font-semibold shadow-xs transition-all"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                <span>Editar información</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-heading font-medium transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* 2. Banner de Estado de Perfil */}
        {!isProfileComplete && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-bold text-amber-900">
                  Completa tu perfil ({completionPercentage}% completado)
                </h3>
                <p className="text-xs font-sans text-amber-700 mt-0.5">
                  Falta tu nombre, teléfono y licencia de conducir para activar tus contratos digitales y entregas express sin esperas.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCompleteModal(true)}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-heading font-bold shadow-xs transition-all whitespace-nowrap"
            >
              Completar ahora
            </button>
          </div>
        )}

        {/* 3. Navegación por pestañas de cuenta */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
          {[
            { id: 'reservas', label: 'Mis reservaciones' },
            { id: 'documentos', label: 'Documentos & Licencia' },
            { id: 'favoritos', label: 'Autos favoritos' },
            { id: 'seguridad', label: 'Seguridad' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs sm:text-sm font-heading transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-cta-600 text-cta-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. Contenido de las pestañas */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          
          {/* TAB 1: RESERVAS */}
          {activeTab === 'reservas' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-heading font-extrabold text-slate-900">
                    Historial de reservaciones
                  </h2>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Tus rentas activas y pasadas en Durango
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/catalogo')}
                  className="px-4 py-2 rounded-xl bg-cta-600 hover:bg-cta-700 text-white text-xs font-heading font-bold transition-all shadow-xs"
                >
                  Rentar otro auto
                </button>
              </div>

              {/* Tarjeta de reservación de muestra */}
              <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-4">
                  {sampleVehicle && (
                    <img
                      src={sampleVehicle.images[0].url}
                      alt={sampleVehicle.model}
                      className="w-20 h-16 sm:w-28 sm:h-20 object-cover rounded-xl bg-slate-100 shrink-0"
                    />
                  )}
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-heading font-bold bg-cta-50 text-cta-700 mb-1">
                      Programada · Contrato digital listo
                    </span>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      {sampleVehicle ? `${sampleVehicle.make} ${sampleVehicle.model} ${sampleVehicle.year}` : 'Audi A4 S-Line 2024'}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-0.5 flex items-center gap-2">
                      <span>Sucursal Plaza 450, Durango</span>
                      <span>·</span>
                      <span>10 Nov – 13 Nov 2026 (3 días)</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(sampleVehicle ? `/vehiculos/${sampleVehicle.slug}` : '/catalogo')}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-heading font-semibold text-slate-700 transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENTOS */}
          {activeTab === 'documentos' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-heading font-extrabold text-slate-900">
                  Documentación para validación de contrato
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Documentos necesarios para entrega express sin filas en sucursal
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Licencia */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-5 h-5 text-cta-600" />
                      <h3 className="font-heading font-bold text-slate-900 text-sm">
                        Licencia de conducir vigente
                      </h3>
                    </div>
                    <span className={`text-[11px] font-heading font-bold px-2 py-0.5 rounded-full ${licenseNumber ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {licenseNumber ? 'Registrada' : 'Pendiente'}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-slate-500">
                    {licenseNumber ? `Folio: ${licenseNumber}` : 'Indispensable para el seguro de cobertura amplia y entrega de llaves.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCompleteModal(true)}
                    className="text-xs font-heading font-semibold text-cta-600 hover:underline"
                  >
                    {licenseNumber ? 'Actualizar licencia' : 'Registrar licencia ahora'}
                  </button>
                </div>

                {/* Identificación INE */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-cta-600" />
                      <h3 className="font-heading font-bold text-slate-900 text-sm">
                        Identificación oficial (INE / Pasaporte)
                      </h3>
                    </div>
                    <span className={`text-[11px] font-heading font-bold px-2 py-0.5 rounded-full ${fullName ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {fullName ? 'Validada' : 'Pendiente'}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-slate-500">
                    {fullName ? `A nombre de: ${fullName}` : 'Requerida para la firma electrónica del contrato de renta digital.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCompleteModal(true)}
                    className="text-xs font-heading font-semibold text-cta-600 hover:underline"
                  >
                    {fullName ? 'Ver datos registrados' : 'Registrar identificación'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAVORITOS */}
          {activeTab === 'favoritos' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-heading font-extrabold text-slate-900">
                  Tus autos guardados
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Vehículos que te gustaron para tus próximos viajes en Durango
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {VEHICLES.slice(0, 3).map((v) => (
                  <div key={v.id} className="border border-slate-200 rounded-2xl p-3.5 hover:shadow-sm transition-all flex flex-col justify-between">
                    <img src={v.images[0].url} alt={v.model} className="w-full h-36 object-cover rounded-xl bg-slate-100 mb-3" />
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-sm">{v.make} {v.model} {v.year}</h3>
                      <p className="text-xs text-slate-500">{v.category} · {v.transmission}</p>
                      <div className="mt-2 text-sm font-heading font-extrabold text-slate-900">
                        ${v.pricePerDay.toLocaleString('es-MX')} MXN <span className="text-[11px] font-normal text-slate-500">/ día</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/vehiculos/${v.slug}`)}
                      className="mt-3 w-full py-2 rounded-xl bg-slate-100 hover:bg-cta-600 hover:text-white text-slate-800 text-xs font-heading font-semibold transition-colors text-center"
                    >
                      Reservar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SEGURIDAD */}
          {activeTab === 'seguridad' && (
            <div className="space-y-6 max-w-md">
              <div>
                <h2 className="text-lg font-heading font-extrabold text-slate-900">
                  Seguridad y Contraseña
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Administra el acceso a tu cuenta GALSA Rent
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                    Correo electrónico registrado
                  </label>
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-heading cursor-not-allowed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('/recuperar-password')}
                    className="text-xs font-heading font-semibold text-cta-600 hover:underline"
                  >
                    Cambiar o recuperar mi contraseña
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* =========================================================================
          MENÚ FLOTANTE / MODAL DE COMPLETAR INFORMACIÓN (Primer inicio o directo)
         ========================================================================= */}
      {showCompleteModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setShowCompleteModal(false)}
        >
          <div 
            className="w-full max-w-[500px] bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar X en esquina */}
            <button
              type="button"
              onClick={() => setShowCompleteModal(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            {!modalSubmitted ? (
              <>
                {/* Header del Modal */}
                <div className="text-left mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cta-50 text-cta-700 text-[11px] font-heading font-bold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Completa tu información</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                    Activa tu cuenta al 100%
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                    Ingresa tus datos faltantes para que tus contratos digitales queden listos y recojas tu auto sin filas en Durango.
                  </p>
                </div>

                {/* Formulario de completar datos */}
                <form onSubmit={handleSaveProfile} className="space-y-3.5">
                  
                  {/* Nombre completo */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-slate-800">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Carlos Damián Sierra"
                        className="w-full px-4 py-2.5 rounded-[10px] border border-slate-300 hover:border-slate-400 focus:border-cta-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 text-sm font-heading outline-none transition-colors pr-10"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-slate-800">
                      Teléfono celular / WhatsApp
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+52 618 123 4567"
                        className="w-full px-4 py-2.5 rounded-[10px] border border-slate-300 hover:border-slate-400 focus:border-cta-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 text-sm font-heading outline-none transition-colors pr-10"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Fila doble: Fecha de Nacimiento y Licencia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 text-left">
                      <label className="block text-xs font-heading font-semibold text-slate-800">
                        Fecha de nacimiento
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 hover:border-slate-400 focus:border-cta-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 text-xs sm:text-sm font-heading outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-xs font-heading font-semibold text-slate-800">
                        No. de licencia de conducir
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                          placeholder="DGO-123456"
                          className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 hover:border-slate-400 focus:border-cta-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 text-xs sm:text-sm font-heading outline-none transition-colors pr-8"
                        />
                        <CreditCard className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Ciudad */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-slate-800">
                      Ciudad de residencia
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Durango, Dgo."
                        className="w-full px-4 py-2.5 rounded-[10px] border border-slate-300 hover:border-slate-400 focus:border-cta-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 text-sm font-heading outline-none transition-colors pr-10"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="pt-3 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-[10px] bg-cta-600 hover:bg-cta-700 text-white font-heading font-bold text-sm transition-all shadow-xs active:scale-[0.99] cursor-pointer"
                    >
                      Guardar y verificar perfil
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCompleteModal(false)}
                      className="w-full py-2.5 rounded-[10px] text-xs font-heading font-medium text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Completar más tarde
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  ¡Información guardada!
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-sm mx-auto">
                  Tus datos han sido registrados con éxito. Ahora estás listo para reservar cualquier vehículo sin trámites adicionales.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
