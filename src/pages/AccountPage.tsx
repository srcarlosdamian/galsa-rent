import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Car,
  X,
  Edit3,
  FileText,
  LogOut,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Heart,
  Lock,
  Shield,
  Calendar,
} from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { DocumentUploadCard, DocUploadState } from '../components/DocumentUploadCard';

interface AccountPageProps {
  onNavigate: (path: string) => void;
  initialOpenCompleteModal?: boolean;
}

type AccountSection = 'datos' | 'reservas' | 'documentos' | 'favoritos' | 'seguridad';
type EditableFieldKey = 'fullName' | 'email' | 'phone' | 'city' | 'birthDate' | 'licenseNumber';

export const AccountPage: React.FC<AccountPageProps> = ({
  onNavigate,
  initialOpenCompleteModal = false,
}) => {
  // Datos pre-cargados con ejemplos de GALSA (sincronizados con sessionStorage)
  const [email, setEmail] = useState('contact@carlosdamian.com');
  const [fullName, setFullName] = useState('Carlos Damián');
  const [phone, setPhone] = useState('2281381278');
  const [city, setCity] = useState('Durango, Dgo.');
  const [birthDate, setBirthDate] = useState('14 may 1994');
  const [licenseNumber, setLicenseNumber] = useState('DGO-984321-A');

  // Estado de confirmación de correo electrónico y tarjeta lateral
  const [showEmailConfirmCard, setShowEmailConfirmCard] = useState(true);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [emailCodeSent, setEmailCodeSent] = useState(false);

  // Control de edición inline en Datos personales
  const [editingField, setEditingField] = useState<EditableFieldKey | null>(null);
  const [tempFieldValue, setTempFieldValue] = useState('');

  // Control del modal flotante "Completar información" y banner de perfil (70% completado)
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileCompletedBannerDismissed, setProfileCompletedBannerDismissed] = useState(false);

  // Sección activa en el menú lateral de Configuración de la cuenta
  const [activeTab, setActiveTab] = useState<AccountSection>('datos');

  // Estados de carga de documentos solicitados (con ejemplos cargados)
  const [licenseDoc, setLicenseDoc] = useState<DocUploadState>({
    name: 'Scann_158.pdf',
    sizeStr: '30 MB / 74 MB',
    progress: 79,
    status: 'uploading',
  });

  const [ineDoc, setIneDoc] = useState<DocUploadState>({
    name: 'INE_frente_y_reverso.pdf',
    sizeStr: '2.4 MB / 2.4 MB',
    progress: 100,
    status: 'completed',
  });

  const [proofDoc, setProofDoc] = useState<DocUploadState>({
    name: 'Comprobante_CFE_Durango.pdf',
    sizeStr: '1.6 MB / 1.6 MB',
    progress: 100,
    status: 'completed',
  });

  const [additionalInfo, setAdditionalInfo] = useState('');
  const [docsSavedSuccess, setDocsSavedSuccess] = useState(false);

  // Autos favoritos (con ejemplos y opción para ver el estado vacío de la captura)
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>(() =>
    VEHICLES.slice(0, 2).map((v) => v.slug)
  );

  // Simular subida con progreso animado
  const simulateUpload = (
    type: 'license' | 'ine' | 'proof',
    customName?: string,
    customSize?: string
  ) => {
    const targetSetter =
      type === 'license' ? setLicenseDoc : type === 'ine' ? setIneDoc : setProofDoc;
    const fileName =
      customName ||
      (type === 'license'
        ? 'Licencia_conducir_frente_reverso.pdf'
        : type === 'ine'
        ? 'INE_identificacion_oficial.pdf'
        : 'Comprobante_domicilio_reciente.pdf');
    const fileSize =
      customSize ||
      (type === 'license'
        ? '30 MB / 74 MB'
        : type === 'ine'
        ? '2.4 MB / 2.4 MB'
        : '1.8 MB / 1.8 MB');

    targetSetter({
      name: fileName,
      sizeStr: fileSize,
      progress: 25,
      status: 'uploading',
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
          status: 'completed',
        });
      } else {
        targetSetter((prev) => ({
          ...prev,
          progress: current,
        }));
      }
    }, 280);
  };

  const handleRemoveDoc = (type: 'license' | 'ine' | 'proof') => {
    const targetSetter =
      type === 'license' ? setLicenseDoc : type === 'ine' ? setIneDoc : setProofDoc;
    targetSetter({
      name: '',
      sizeStr: '',
      progress: 0,
      status: 'idle',
    });
  };

  // Inicializar estado desde sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail =
        sessionStorage.getItem('galsa_user_email') ||
        sessionStorage.getItem('galsa_recovery_email');
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

      const isFirstLogin = sessionStorage.getItem('galsa_first_login') === 'true';
      const urlHasParam =
        window.location.search.includes('completar') ||
        window.location.pathname.includes('completar');

      if (isFirstLogin || urlHasParam || initialOpenCompleteModal) {
        setShowCompleteModal(true);
      }

      if (
        window.location.search.includes('documentos') ||
        window.location.pathname.includes('documentos')
      ) {
        setActiveTab('documentos');
      } else if (window.location.search.includes('reservas')) {
        setActiveTab('reservas');
      }
    }
  }, [initialOpenCompleteModal]);

  const startInlineEdit = (field: EditableFieldKey, currentValue: string) => {
    setEditingField(field);
    setTempFieldValue(currentValue);
  };

  const saveInlineEdit = (field: EditableFieldKey) => {
    const val = tempFieldValue.trim();
    if (field === 'fullName' && val) {
      setFullName(val);
      if (typeof window !== 'undefined') sessionStorage.setItem('galsa_user_name', val);
    } else if (field === 'email' && val) {
      setEmail(val);
      if (typeof window !== 'undefined') sessionStorage.setItem('galsa_user_email', val);
    } else if (field === 'phone' && val) {
      setPhone(val);
      if (typeof window !== 'undefined') sessionStorage.setItem('galsa_user_phone', val);
    } else if (field === 'city' && val) {
      setCity(val);
      if (typeof window !== 'undefined') sessionStorage.setItem('galsa_user_city', val);
    } else if (field === 'birthDate' && val) {
      setBirthDate(val);
      if (typeof window !== 'undefined') sessionStorage.setItem('galsa_user_birth', val);
    } else if (field === 'licenseNumber' && val) {
      setLicenseNumber(val);
      if (typeof window !== 'undefined') sessionStorage.setItem('galsa_user_license', val);
    }
    setEditingField(null);
  };

  const handleConfirmEmail = () => {
    setEmailCodeSent(true);
    setTimeout(() => {
      setEmailConfirmed(true);
    }, 900);
  };

  // Guardar datos desde el modal flotante
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('galsa_user_name', fullName || 'Carlos Damián');
      sessionStorage.setItem('galsa_user_phone', phone || '2281381278');
      if (birthDate) sessionStorage.setItem('galsa_user_birth', birthDate);
      if (licenseNumber)
        sessionStorage.setItem('galsa_user_license', licenseNumber || 'DGO-984321-A');
      if (city) sessionStorage.setItem('galsa_user_city', city || 'Durango, Dgo.');
      sessionStorage.removeItem('galsa_first_login');
    }
    if (!fullName) setFullName('Carlos Damián');
    if (!phone) setPhone('2281381278');
    if (!licenseNumber) setLicenseNumber('DGO-984321-A');
    if (!city) setCity('Durango, Dgo.');

    setModalSubmitted(true);
    setProfileCompletedBannerDismissed(true);
    setTimeout(() => {
      setShowCompleteModal(false);
      setModalSubmitted(false);
    }, 1500);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('galsa_user_email');
      sessionStorage.removeItem('galsa_first_login');
      sessionStorage.removeItem('galsa_logged_in');
    }
    onNavigate('/login');
  };

  // Vehículos de las reservaciones de GALSA mostradas en las capturas
  const virtusVehicle =
    VEHICLES.find((v) => v.model.toLowerCase().includes('virtus')) || VEHICLES[0];
  const wranglerVehicle =
    VEHICLES.find((v) => v.model.toLowerCase().includes('wrangler')) || VEHICLES[1] || VEHICLES[0];

  const reservationsList = [
    {
      id: 'res-virtus-2026',
      statusBadge: 'Pendiente · Pago pendiente',
      title: 'Volkswagen Virtus Trendline 2026',
      branch: 'Plaza 450, Durango',
      dates: '19 Nov – 23 Nov 2026 (4 días)',
      slug: virtusVehicle?.slug || 'volkswagen-virtus-2026',
      image: virtusVehicle?.images?.[0]?.url || '',
    },
    {
      id: 'res-wrangler-2018',
      statusBadge: 'Pendiente · Pago pendiente',
      title: 'Jeep Wrangler Rubicon 2018',
      branch: 'Plaza 450, Durango',
      dates: '18 Nov – 21 Nov 2026 (3 días)',
      slug: wranglerVehicle?.slug || 'jeep-wrangler-rubicon',
      image: wranglerVehicle?.images?.[0]?.url || '',
    },
  ];

  const favoriteVehicles = VEHICLES.filter((v) => favoriteSlugs.includes(v.slug));

  const sidebarNavItems: {
    id: AccountSection;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'datos', label: 'Datos personales', icon: User },
    {
      id: 'reservas',
      label: 'Mis reservaciones',
      icon: Calendar,
      badge: `${reservationsList.length}`,
    },
    { id: 'documentos', label: 'Documentos & Licencia', icon: FileText },
    { id: 'favoritos', label: 'Autos favoritos', icon: Heart },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
  ];

  const personalDataRows: {
    key: EditableFieldKey;
    label: string;
    value: string;
    actionLabel: string;
    showConfirmPill?: boolean;
  }[] = [
    {
      key: 'fullName',
      label: 'Nombre completo',
      value: fullName || 'Carlos Damián',
      actionLabel: 'Editar',
    },
    {
      key: 'email',
      label: 'Correo electrónico',
      value: email || 'contact@carlosdamian.com',
      actionLabel: 'Editar',
      showConfirmPill: true,
    },
    {
      key: 'phone',
      label: 'Número de teléfono',
      value: `${phone || '2281381278'} · Para notificaciones de entrega y soporte en Durango.`,
      actionLabel: 'Editar',
    },
    {
      key: 'licenseNumber',
      label: 'Licencia de conducir',
      value: `${licenseNumber || 'DGO-984321-A'} · Vigente para contrato digital`,
      actionLabel: 'Editar',
    },
    {
      key: 'city',
      label: 'Ciudad y sucursal preferida',
      value: `${city || 'Durango, Dgo.'} · Sucursal Plaza 450`,
      actionLabel: 'Editar',
    },
    {
      key: 'birthDate',
      label: 'Fecha de nacimiento',
      value: birthDate || '14 may 1994',
      actionLabel: 'Editar',
    },
  ];

  const firstNameDisplay = fullName.includes('Damián')
    ? 'Damián'
    : fullName.split(' ')[0] || 'Damián';

  return (
    <div className="min-h-[85vh] bg-surface py-8 sm:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
        {/* 1. Banner Completa tu perfil (70% completado) de GALSA */}
        {!profileCompletedBannerDismissed && (
          <div className="bg-cta-50/60 border border-cta-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/galsa-rent/images/cuenta/completa-perfil-lapiz.png"
                alt="Completa tu perfil"
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0"
              />
              <div>
                <h2 className="text-sm font-heading font-bold text-ink-900">
                  Completa tu perfil (70% completado)
                </h2>
                <p className="text-xs font-sans text-ink-600 mt-0.5 leading-relaxed">
                  Falta tu nombre, teléfono y licencia de conducir para activar tus contratos digitales y entregas express sin esperas.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCompleteModal(true)}
              className="self-start sm:self-auto px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-ink-900 text-xs font-heading font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Completar ahora
            </button>
          </div>
        )}

        {/* 2. Layout de 2 Columnas: Barra lateral izquierda + Panel de contenido derecho */}
        <div className="pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* COLUMNA IZQUIERDA: Configuración de la cuenta + Menú */}
          <aside className="lg:col-span-4 xl:col-span-4 space-y-5 pb-6 border-b border-edge lg:pb-0 lg:border-b-0 lg:border-r lg:border-edge lg:pr-8">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-900 tracking-tight">
              Configuración de la cuenta
            </h2>

            {/* Navegación Vertical */}
            <nav className="space-y-1" aria-label="Secciones de cuenta">
              {sidebarNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`group w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs sm:text-sm font-heading transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-subtle text-ink-900 font-bold'
                        : 'text-ink-600 hover:bg-subtle/60 hover:text-ink-900 font-medium'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-ink-900' : 'text-ink-600 group-hover:text-ink-900'
                        }`}
                      />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-heading font-bold ${
                          isActive ? 'bg-slate-200/80 text-ink-900' : 'bg-subtle text-ink-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-2 mt-2 border-t border-edge">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-xs sm:text-sm font-heading font-medium text-ink-600 hover:bg-subtle/60 hover:text-ink-900 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 shrink-0 text-ink-600" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* COLUMNA DERECHA: Contenido de la sección activa */}
          <main className="lg:col-span-8 xl:col-span-8">
            {/* SECCIÓN 1: DATOS PERSONALES (Estilo lista con divisores horizontales y variables GALSA) */}
            {activeTab === 'datos' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-900 tracking-tight">
                    Datos personales
                  </h2>
                  <p className="text-xs sm:text-sm font-sans text-ink-600 mt-1">
                    Información registrada para tus contratos digitales y entregas express en GALSA.
                  </p>
                </div>

                {/* Lista de filas divididas por línea */}
                <div className="divide-y divide-edge border-t border-b border-edge">
                  {personalDataRows.map((row) => {
                    const isEditing = editingField === row.key;
                    const rawValue =
                      row.key === 'fullName'
                        ? fullName
                        : row.key === 'email'
                        ? email
                        : row.key === 'phone'
                        ? phone
                        : row.key === 'city'
                        ? city
                        : row.key === 'birthDate'
                        ? birthDate
                        : licenseNumber;

                    return (
                      <div key={row.key} className="py-5 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="text-sm font-heading font-bold text-ink-900">
                              {row.label}
                            </h3>
                            {!isEditing && (
                              <p className="text-xs sm:text-sm font-sans text-ink-600 leading-relaxed">
                                {row.value}
                              </p>
                            )}
                          </div>

                          {!isEditing ? (
                            <button
                              type="button"
                              onClick={() => startInlineEdit(row.key, rawValue)}
                              className="text-xs sm:text-sm font-heading font-semibold text-ink-900 hover:text-cta shrink-0 cursor-pointer transition-colors"
                            >
                              {row.actionLabel}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditingField(null)}
                              className="text-xs sm:text-sm font-heading font-semibold text-ink-600 hover:text-ink-900 shrink-0 cursor-pointer"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>

                        {/* Botón píldora Confirmar debajo del correo electrónico */}
                        {row.showConfirmPill && !isEditing && (
                          <div>
                            <button
                              type="button"
                              onClick={handleConfirmEmail}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-heading font-semibold transition-colors cursor-pointer ${
                                emailConfirmed
                                  ? 'border-cta-200 bg-cta-50 text-cta'
                                  : 'border-edge bg-surface hover:bg-subtle text-ink-900'
                              }`}
                            >
                              {emailConfirmed ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-cta" />
                                  <span>Confirmado</span>
                                </>
                              ) : (
                                <span>Confirmar</span>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Formulario inline al pulsar Editar */}
                        {isEditing && (
                          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-lg">
                            <input
                              type="text"
                              value={tempFieldValue}
                              onChange={(e) => setTempFieldValue(e.target.value)}
                              className="flex-1 px-3.5 py-2 rounded-xl border border-edge focus:border-cta focus:ring-1 focus:ring-cta bg-surface text-ink-900 text-xs sm:text-sm font-heading outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => saveInlineEdit(row.key)}
                              className="px-4 py-2 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs font-heading font-semibold transition-colors cursor-pointer"
                            >
                              Guardar
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Contenedor informativo inferior con iconos en color oficial CTA de GALSA */}
                <div className="rounded-2xl border border-edge bg-surface p-5 sm:p-6 divide-y divide-edge">
                  <div className="pb-5 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-cta-50 text-cta flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-bold text-ink-900">
                        ¿Por qué validamos tus datos de conductor en GALSA?
                      </h4>
                      <p className="text-xs font-sans text-ink-600 mt-1 leading-relaxed">
                        Protegemos tu identidad y pre-llenamos tu contrato digital para que recojas las llaves de tu auto en Plaza 450 o el Aeropuerto de Durango sin hacer filas.
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-cta-50 text-cta flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-bold text-ink-900">
                        ¿Qué datos se pueden editar?
                      </h4>
                      <p className="text-xs font-sans text-ink-600 mt-1 leading-relaxed">
                        Puedes actualizar tus datos de contacto y número de licencia en cualquier momento. Si tienes una reservación activa, los cambios se reflejarán automáticamente en tu contrato de renta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN 2: MIS RESERVACIONES (Volkswagen Virtus Trendline 2026 y Jeep Wrangler Rubicon 2018) */}
            {activeTab === 'reservas' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-900 tracking-tight">
                      Historial de reservaciones
                    </h2>
                    <p className="text-xs sm:text-sm text-ink-600 font-sans mt-0.5">
                      Tus rentas activas y pasadas en Durango
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('/catalogo')}
                    className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs font-heading font-bold transition-colors cursor-pointer"
                  >
                    Rentar otro auto
                  </button>
                </div>

                <div className="space-y-4">
                  {reservationsList.map((res) => (
                    <div
                      key={res.id}
                      className="border border-edge rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-colors bg-surface"
                    >
                      <div className="flex items-center gap-4">
                        {res.image ? (
                          <img
                            src={res.image}
                            alt={res.title}
                            className="w-20 h-16 sm:w-28 sm:h-20 object-cover rounded-xl bg-subtle shrink-0"
                          />
                        ) : (
                          <div className="w-20 h-16 sm:w-28 sm:h-20 rounded-xl bg-subtle flex items-center justify-center text-ink-400 shrink-0">
                            <Car className="w-7 h-7" />
                          </div>
                        )}
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-heading font-bold bg-cta-50 text-cta mb-1.5">
                            {res.statusBadge}
                          </span>
                          <h3 className="text-sm sm:text-base font-heading font-bold text-ink-900">
                            {res.title}
                          </h3>
                          <p className="text-xs text-ink-600 font-sans mt-0.5 flex flex-wrap items-center gap-1.5">
                            <span>{res.branch}</span>
                            <span>·</span>
                            <span>{res.dates}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onNavigate(`/vehiculos/${res.slug}`)}
                          className="px-3.5 py-2 rounded-xl border border-edge hover:bg-subtle text-xs font-heading font-semibold text-ink-900 transition-colors cursor-pointer"
                        >
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN 3: DOCUMENTOS & LICENCIA (Tarjetas de estado + Subida minimalista) */}
            {activeTab === 'documentos' && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-900 tracking-tight">
                    Documentación para validación de contrato
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-600 font-sans mt-1">
                    Documentos necesarios para entrega express sin filas en sucursal
                  </p>
                </div>

                {docsSavedSuccess && (
                  <div className="p-3.5 rounded-xl bg-cta-50 border border-cta-200 text-ink-900 text-xs sm:text-sm font-sans flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cta shrink-0" />
                      <span>
                        ¡Documentos actualizados con éxito! Quedaron listos para validación de tu reserva.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDocsSavedSuccess(false)}
                      className="text-ink-600 hover:text-ink-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Controles minimalistas de carga de archivos */}
                <div className="space-y-3.5 pt-1">
                  <DocumentUploadCard
                    title="Licencia de conducir"
                    badge="Vigente, ambos lados"
                    fileState={licenseDoc}
                    onFileSelect={(file) => {
                      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                      simulateUpload('license', file.name, `${sizeMb} MB / ${sizeMb} MB`);
                    }}
                    onSimulate={() => simulateUpload('license')}
                    onRemove={() => handleRemoveDoc('license')}
                  />

                  <DocumentUploadCard
                    title="Identificación oficial"
                    badge="INE, frente y reverso"
                    fileState={ineDoc}
                    onFileSelect={(file) => {
                      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                      simulateUpload('ine', file.name, `${sizeMb} MB / ${sizeMb} MB`);
                    }}
                    onSimulate={() => simulateUpload('ine')}
                    onRemove={() => handleRemoveDoc('ine')}
                  />

                  <DocumentUploadCard
                    title="Comprobante de domicilio"
                    badge="No mayor a 3 meses"
                    fileState={proofDoc}
                    onFileSelect={(file) => {
                      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                      simulateUpload('proof', file.name, `${sizeMb} MB / ${sizeMb} MB`);
                    }}
                    onSimulate={() => simulateUpload('proof')}
                    onRemove={() => handleRemoveDoc('proof')}
                  />

                  <div className="space-y-1.5 pt-2">
                    <label className="block text-xs font-heading font-bold text-ink-900">
                      Información adicional (opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Notas relevantes para tu renta: conductor adicional, requerimientos de facturación o entrega especial en sucursal..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-edge hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta bg-surface text-ink-900 text-xs sm:text-sm font-sans outline-none transition-colors resize-y"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setDocsSavedSuccess(true);
                        setTimeout(() => setDocsSavedSuccess(false), 4000);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-xs sm:text-sm transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Guardar documentos
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (licenseDoc.status === 'uploading') {
                          setLicenseDoc((prev) => ({
                            ...prev,
                            progress: 100,
                            status: 'completed',
                          }));
                        } else {
                          simulateUpload('license', 'Scann_158.pdf', '30 MB / 74 MB');
                        }
                        if (proofDoc.status === 'idle') {
                          simulateUpload('proof', 'Comprobante_CFE_octubre.pdf', '1.6 MB / 1.6 MB');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl border border-edge hover:bg-subtle text-ink-900 font-heading font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-ink-600" />
                      <span>Probar simulación de subida</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN 4: AUTOS FAVORITOS */}
            {activeTab === 'favoritos' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-900 tracking-tight">
                      Tus autos guardados
                    </h2>
                    <p className="text-xs sm:text-sm text-ink-600 font-sans mt-0.5">
                      Vehículos que te gustaron para tus próximos viajes en Durango
                    </p>
                  </div>

                  {favoriteVehicles.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setFavoriteSlugs([])}
                      className="self-start sm:self-auto text-xs font-heading font-semibold text-ink-600 hover:text-ink-900 underline underline-offset-4 cursor-pointer"
                    >
                      Limpiar guardados
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setFavoriteSlugs(VEHICLES.slice(0, 2).map((v) => v.slug))
                      }
                      className="self-start sm:self-auto text-xs font-heading font-semibold text-cta hover:text-cta-600 underline underline-offset-4 cursor-pointer"
                    >
                      Cargar ejemplos guardados
                    </button>
                  )}
                </div>

                {favoriteVehicles.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-edge bg-surface p-8 text-center">
                    <p className="text-xs sm:text-sm font-sans text-ink-600">
                      Todavía no guardas autos. Toca el corazón de cualquier auto del catálogo para tenerlo a la mano aquí.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteVehicles.map((v) => (
                      <div
                        key={v.id}
                        className="border border-edge rounded-2xl p-4 bg-surface flex flex-col justify-between gap-3"
                      >
                        <div>
                          <img
                            src={v.images[0].url}
                            alt={v.model}
                            className="w-full h-36 object-cover rounded-xl bg-subtle mb-3"
                          />
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-heading font-bold text-ink-900 text-sm">
                                {v.make} {v.model} {v.year}
                              </h3>
                              <p className="text-xs text-ink-600">
                                {v.category} · {v.transmission}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setFavoriteSlugs((prev) =>
                                  prev.filter((s) => s !== v.slug)
                                )
                              }
                              className="p-1.5 rounded-full bg-cta-50 text-cta hover:bg-cta-100 transition-colors cursor-pointer"
                              aria-label="Quitar de favoritos"
                            >
                              <Heart className="w-4 h-4 fill-cta text-cta" />
                            </button>
                          </div>
                          <div className="mt-2 text-sm font-heading font-extrabold text-ink-900">
                            ${v.pricePerDay.toLocaleString('es-MX')} MXN{' '}
                            <span className="text-[11px] font-normal text-ink-600">
                              / día
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onNavigate(`/vehiculos/${v.slug}`)}
                          className="w-full py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs font-heading font-semibold transition-colors text-center cursor-pointer"
                        >
                          Reservar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SECCIÓN 5: SEGURIDAD */}
            {activeTab === 'seguridad' && (
              <div className="space-y-6 max-w-lg">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-900 tracking-tight">
                    Seguridad y Contraseña
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-600 font-sans mt-0.5">
                    Administra el acceso a tu cuenta GALSA Rent
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading font-semibold text-ink-600 mb-1.5">
                      Correo electrónico registrado
                    </label>
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-edge bg-subtle text-ink-600 text-sm font-heading cursor-not-allowed"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate('/recuperar-password')}
                      className="text-xs sm:text-sm font-heading font-semibold text-cta hover:text-cta-600 hover:underline cursor-pointer"
                    >
                      Cambiar o recuperar mi contraseña
                    </button>

                    {!emailConfirmed && (
                      <button
                        type="button"
                        onClick={handleConfirmEmail}
                        className="px-3.5 py-1.5 rounded-lg border border-edge hover:bg-subtle text-xs font-heading font-semibold text-ink-900 transition-colors cursor-pointer"
                      >
                        Confirmar correo ahora
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* =========================================================================
          MODAL DE CONFIRMACIÓN PARA CERRAR SESIÓN
         ========================================================================= */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowLogoutModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-modal-title"
        >
          <div
            className="w-full max-w-[420px] bg-surface rounded-[24px] p-6 sm:p-7 border border-edge relative text-left space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-subtle hover:bg-slate-200 flex items-center justify-center text-ink-600 hover:text-ink-900 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            <div className="space-y-1.5 pr-6">
              <h2
                id="logout-modal-title"
                className="text-lg sm:text-xl font-heading font-extrabold text-ink-900 tracking-tight"
              >
                ¿Cerrar sesión?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-ink-600 leading-relaxed">
                Tendrás que volver a iniciar sesión para ver tus reservaciones, documentos y contratos digitales.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-ink-900 text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cta hover:bg-cta-600 active:scale-[0.98] text-white text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE COMPLETAR INFORMACIÓN (Primer inicio o botón Completar información)
         ========================================================================= */}
      {showCompleteModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setShowCompleteModal(false)}
        >
          <div
            className="w-full max-w-[500px] bg-surface rounded-[24px] p-6 sm:p-8 border border-edge relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowCompleteModal(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-subtle hover:bg-slate-200 flex items-center justify-center text-ink-600 hover:text-ink-900 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            {!modalSubmitted ? (
              <>
                <div className="text-left mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cta-50 text-cta text-[11px] font-heading font-bold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Completa tu información</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink-900 tracking-tight leading-tight">
                    Activa tu cuenta al 100%
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm font-sans text-ink-600 leading-relaxed">
                    Ingresa tus datos faltantes para que tus contratos digitales queden listos y recojas tu auto sin filas en Durango.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-3.5">
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-ink-900">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Carlos Damián"
                        className="w-full px-4 py-2.5 rounded-[10px] border border-edge hover:border-slate-400 focus:border-cta focus:ring-1 focus:ring-cta bg-surface text-ink-900 text-sm font-heading outline-none transition-colors pr-10"
                      />
                      <User className="w-4 h-4 text-ink-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-ink-900">
                      Teléfono celular / WhatsApp
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="2281381278"
                        className="w-full px-4 py-2.5 rounded-[10px] border border-edge hover:border-slate-400 focus:border-cta focus:ring-1 focus:ring-cta bg-surface text-ink-900 text-sm font-heading outline-none transition-colors pr-10"
                      />
                      <Phone className="w-4 h-4 text-ink-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 text-left">
                      <label className="block text-xs font-heading font-semibold text-ink-900">
                        Fecha de nacimiento
                      </label>
                      <input
                        type="text"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="14 may 1994"
                        className="w-full px-3 py-2.5 rounded-[10px] border border-edge hover:border-slate-400 focus:border-cta focus:ring-1 focus:ring-cta bg-surface text-ink-900 text-xs sm:text-sm font-heading outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-xs font-heading font-semibold text-ink-900">
                        No. de licencia de conducir
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                          placeholder="DGO-984321-A"
                          className="w-full px-3 py-2.5 rounded-[10px] border border-edge hover:border-slate-400 focus:border-cta focus:ring-1 focus:ring-cta bg-surface text-ink-900 text-xs sm:text-sm font-heading outline-none transition-colors pr-8"
                        />
                        <CreditCard className="w-3.5 h-3.5 text-ink-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-heading font-semibold text-ink-900">
                      Ciudad de residencia
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Durango, Dgo."
                        className="w-full px-4 py-2.5 rounded-[10px] border border-edge hover:border-slate-400 focus:border-cta focus:ring-1 focus:ring-cta bg-surface text-ink-900 text-sm font-heading outline-none transition-colors pr-10"
                      />
                      <MapPin className="w-4 h-4 text-ink-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-[10px] bg-cta hover:bg-cta-600 text-white font-heading font-bold text-sm transition-all active:scale-[0.99] cursor-pointer"
                    >
                      Guardar y verificar perfil
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCompleteModal(false)}
                      className="w-full py-2.5 rounded-[10px] text-xs font-heading font-medium text-ink-600 hover:text-ink-900 transition-colors cursor-pointer"
                    >
                      Completar más tarde
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-cta-50 text-cta rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-heading font-bold text-ink-900">
                  ¡Información guardada!
                </h3>
                <p className="text-xs sm:text-sm font-sans text-ink-600 max-w-sm mx-auto">
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
