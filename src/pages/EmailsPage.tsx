import React, { useState } from 'react';
import {
  Mail,
  Smartphone,
  Monitor,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { GalsaLogo } from '../components/GalsaLogo';

interface EmailsPageProps {
  onNavigate?: (path: string) => void;
}

interface EmailScenario {
  id: string;
  label: string;
  trigger: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  preheader: string;
  title: string;
  description: string;
  details?: { label: string; value: string }[];
  stepsTitle?: string;
  steps?: string[];
  primaryCta: { label: string; path: string };
  secondaryCta?: { label: string; path: string };
  footnote: string;
}

const EMAIL_SCENARIOS: EmailScenario[] = [
  {
    id: 'welcome-verify',
    label: 'Confirmar cuenta',
    trigger: 'Al registrarse en /registro',
    fromName: 'GALSA Rent',
    fromEmail: 'no-reply@galsarent.com.mx',
    subject: 'Confirma tu correo y activa tu cuenta en GALSA Rent',
    preheader: 'Falta un paso para reservar en línea y firmar tu contrato digital sin filas.',
    title: 'Bienvenido a GALSA Rent, activa tu cuenta',
    description:
      'Gracias por registrarte. Confirma tu correo electrónico para habilitar tus reservaciones en línea, guardar tus autos favoritos y preparar tus contratos digitales.',
    stepsTitle: '¿Qué sigue después de confirmar?',
    steps: [
      'Completa tus datos de conductor (licencia vigente e INE).',
      'Elige tu vehículo y fechas en el catálogo con tarifa transparente.',
      'Firma tu contrato digital desde tu celular y recoge las llaves sin filas.',
    ],
    primaryCta: { label: 'Confirmar correo y completar perfil', path: '/cuenta/completar' },
    secondaryCta: { label: 'Explorar catálogo', path: '/catalogo' },
    footnote: 'Si no creaste esta cuenta, puedes ignorar este mensaje de forma segura.',
  },
  {
    id: 'password-recovery',
    label: 'Recuperar contraseña',
    trigger: 'Al solicitar cambio en /recuperar-password',
    fromName: 'Seguridad GALSA',
    fromEmail: 'no-reply@galsarent.com.mx',
    subject: 'Restablece tu contraseña de GALSA Rent',
    preheader: 'Recibimos una solicitud para crear una nueva contraseña para tu cuenta.',
    title: 'Restablece tu contraseña',
    description:
      'Recibimos una solicitud para cambiar la contraseña asociada a tu cuenta de GALSA Rent. Haz clic en el botón de abajo para elegir una nueva contraseña segura.',
    details: [
      { label: 'Vigencia del enlace', value: '30 minutos' },
      { label: 'Cuenta', value: 'usuario@ejemplo.com' },
    ],
    primaryCta: { label: 'Crear nueva contraseña', path: '/restablecer-password' },
    secondaryCta: { label: 'Ir a iniciar sesión', path: '/login' },
    footnote: 'Por tu seguridad, nunca compartas este enlace. Si no solicitaste el cambio, ignora este correo.',
  },
  {
    id: 'reservation-pending',
    label: 'Reserva creada (Pendiente)',
    trigger: 'Al enviar solicitud en /reservar/:slug',
    fromName: 'Reservaciones GALSA',
    fromEmail: 'reservas@galsarent.com.mx',
    subject: 'Solicitud recibida · Código GAL-201177',
    preheader: 'Apartamos tu Jeep Wrangler Rubicon 2018 por 48 horas en Sucursal Plaza 450.',
    title: '¡Recibimos tu solicitud de reserva!',
    description:
      'Tu solicitud quedó registrada y apartamos la unidad por 48 horas mientras validamos tu documentación y confirmamos el pago.',
    details: [
      { label: 'Código de reserva', value: 'GAL-201177' },
      { label: 'Vehículo', value: 'Jeep Wrangler Rubicon 2018' },
      { label: 'Fechas', value: '4 nov — 7 nov 2026 (3 días)' },
      { label: 'Entrega y devolución', value: 'Sucursal Plaza 450, Durango' },
      { label: 'Estado', value: 'Pendiente de confirmación' },
    ],
    primaryCta: { label: 'Ver mi reservación', path: '/cuenta' },
    secondaryCta: { label: 'Ver ubicación de sucursal', path: '/contacto' },
    footnote: 'El depósito en garantía es 100% reembolsable al devolver la unidad conforme al checklist.',
  },
  {
    id: 'reservation-confirmed',
    label: 'Reserva confirmada',
    trigger: 'Al aprobar reserva y firmar contrato digital',
    fromName: 'Reservaciones GALSA',
    fromEmail: 'reservas@galsarent.com.mx',
    subject: '¡Reserva confirmada! Tu contrato digital está listo (GAL-201177)',
    preheader: 'Presenta tu código en Plaza 450, Blvd. Guadiana para entrega express sin filas.',
    title: 'Tu auto te espera en Durango',
    description:
      'Tu reservación y contrato mercantil digital han sido confirmados. Al llegar a Sucursal Plaza 450 realizaremos una breve inspección fotográfica de 3 minutos para entregarte las llaves.',
    details: [
      { label: 'Código de reserva', value: 'GAL-201177' },
      { label: 'Contrato digital', value: 'Firmado y certificado' },
      { label: 'Punto de entrega', value: 'Blvd. Guadiana, Plaza 450 · 10:00 hrs' },
    ],
    stepsTitle: 'Recuerda llevar el día de tu entrega',
    steps: [
      'Licencia de conducir física vigente.',
      'Identificación oficial (INE o pasaporte) del titular.',
    ],
    primaryCta: { label: 'Ver detalles y contrato', path: '/cuenta' },
    secondaryCta: { label: 'Cómo llegar a Plaza 450', path: '/contacto' },
    footnote: 'Cancelación gratuita con más de 48 horas de anticipación.',
  },
  {
    id: 'host-received',
    label: 'Anfitrión en revisión',
    trigger: 'Al enviar registro en /anfitriones/registro',
    fromName: 'Anfitriones GALSA',
    fromEmail: 'anfitriones@galsarent.com.mx',
    subject: 'Solicitud de anfitrión recibida · Folio ANF-842910',
    preheader: 'Validaremos la documentación de tu vehículo en un plazo de 24 a 48 horas.',
    title: 'Recibimos tu solicitud de anfitrión',
    description:
      'Gracias por postular tu auto en GALSA Rent. Nuestro equipo revisará tus documentos, póliza y fotografías para aprobar la publicación en el marketplace.',
    details: [
      { label: 'Folio de seguimiento', value: 'ANF-842910' },
      { label: 'Tiempo estimado', value: '24 a 48 horas hábiles' },
      { label: 'Tu ganancia', value: '100% de la tarifa diaria que fijes' },
    ],
    primaryCta: { label: 'Ver estado en mi cuenta', path: '/cuenta' },
    secondaryCta: { label: 'Conocer programa de anfitriones', path: '/anfitriones' },
    footnote: 'Te notificaremos por este medio en cuanto tu vehículo quede aprobado.',
  },
  {
    id: 'host-approved',
    label: 'Vehículo aprobado',
    trigger: 'Al aprobar unidad de anfitrión',
    fromName: 'Anfitriones GALSA',
    fromEmail: 'anfitriones@galsarent.com.mx',
    subject: '¡Tu auto ya está publicado en GALSA Rent!',
    preheader: 'Empieza a recibir solicitudes de conductores verificados en Durango y México.',
    title: '¡Felicidades! Tu vehículo fue aprobado',
    description:
      'Tu auto ya aparece activo en el catálogo de GALSA Rent. Cada conductor pasa por verificación biométrica, contrato digital y depósito en garantía antes de recibir las llaves.',
    details: [
      { label: 'Folio', value: 'ANF-842910' },
      { label: 'Estado', value: 'Publicado y visible en catálogo' },
    ],
    primaryCta: { label: 'Ver catálogo publicado', path: '/catalogo' },
    secondaryCta: { label: 'Administrar mi cuenta', path: '/cuenta' },
    footnote: 'Recibirás una alerta cada vez que un conductor solicite fechas para tu unidad.',
  },
  {
    id: 'checkin-reminder',
    label: 'Recordatorio de entrega',
    trigger: '24 horas antes de la fecha de entrega',
    fromName: 'Operaciones GALSA',
    fromEmail: 'sucursal@galsarent.com.mx',
    subject: 'Mañana recoges tu auto en Plaza 450 · GAL-201177',
    preheader: 'Tu unidad está lista. Revisa horario, dirección y documentos para entrega en 3 min.',
    title: 'Todo listo para tu viaje de mañana',
    description:
      'Tu vehículo ya pasó por limpieza e inspección previa en Sucursal Plaza 450. Te esperamos en el horario acordado para entregarte las llaves sin filas.',
    details: [
      { label: 'Horario de entrega', value: 'Mañana · 10:00 hrs' },
      { label: 'Dirección', value: 'Blvd. Guadiana, Plaza 450, Durango, Dgo.' },
    ],
    primaryCta: { label: 'Ver mi reserva', path: '/cuenta' },
    secondaryCta: { label: 'Ver mapa de la sucursal', path: '/contacto' },
    footnote: '¿Necesitas ajustar tu hora de llegada? Escríbenos a soporte@galsarent.com.mx.',
  },
];

export const EmailsPage: React.FC<EmailsPageProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>(EMAIL_SCENARIOS[0].id);
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const current = EMAIL_SCENARIOS.find((s) => s.id === selectedId) || EMAIL_SCENARIOS[0];

  const handleLink = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyMeta = () => {
    const text = `Asunto: ${current.subject}\nRemitente: ${current.fromName} <${current.fromEmail}>\nSubtítulo (Preheader): ${current.preheader}\nCTA Principal: ${current.primaryCta.label} -> ${current.primaryCta.path}`;
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-16">
      {/* Barra superior de desarrolladores para cambiar de escenario de email */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  title="Volver al inicio"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <h1 className="text-lg sm:text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cta" />
                  <span>Sistema de Emails Transaccionales (Plantilla 590px)</span>
                </h1>
                <p className="text-xs text-slate-500">
                  {EMAIL_SCENARIOS.length} escenarios del flujo GALSA Rent · Disparador: <span className="font-mono text-slate-700">{current.trigger}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={handleCopyMeta}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-heading font-semibold transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copiado' : 'Copiar metadatos'}</span>
              </button>

              <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewport('desktop')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-heading font-semibold transition-colors cursor-pointer ${
                    viewport === 'desktop' ? 'bg-white text-slate-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>590px</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('mobile')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-heading font-semibold transition-colors cursor-pointer ${
                    viewport === 'mobile' ? 'bg-white text-slate-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Switcher de escenarios */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {EMAIL_SCENARIOS.map((item) => {
              const isSelected = item.id === current.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-cta text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simulador de Cliente de Correo + Plantilla de Email */}
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 pt-8">
        <div
          className={`mx-auto transition-all duration-200 bg-white rounded-2xl overflow-hidden border border-slate-200 ${
            viewport === 'mobile' ? 'max-w-[375px]' : 'max-w-[760px]'
          }`}
        >
          {/* Cabecera simulada del cliente de correo (Asunto, Remitente, Subtítulo/Preheader) */}
          <div className="px-5 sm:px-7 py-5 border-b border-slate-100 space-y-3 text-left bg-white">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-heading font-semibold text-slate-900 leading-snug">
                {current.subject}
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-heading font-semibold">
                Recibidos
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-cta text-white flex items-center justify-center font-heading font-extrabold text-sm shrink-0">
                  G
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="font-heading font-bold text-slate-900">{current.fromName}</span>
                    <span className="text-slate-500 font-mono text-[11px] truncate">
                      &lt;{current.fromEmail}&gt;
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    Subtítulo (preheader): <span className="text-slate-700">{current.preheader}</span>
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0 hidden sm:inline">hoy, 09:30</span>
            </div>
          </div>

          {/* Lienzo real del Email: Fondo azul claro (bg-cta-50) + Logo arriba + Contenedor blanco 590px */}
          <div className="bg-cta-50 px-4 sm:px-8 py-8 sm:py-10">
            <div className="w-full max-w-[590px] mx-auto space-y-5">
              {/* Logo GALSA arriba del contenedor blanco */}
              <div className="flex justify-center">
                <GalsaLogo className="h-6 w-auto text-cta" />
              </div>

              {/* Contenedor blanco minimalista del email */}
              <div className="bg-white rounded-2xl p-6 sm:p-9 text-left space-y-5">
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-[28px] font-heading font-bold text-slate-900 leading-tight tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] font-sans text-slate-600 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Tabla de datos clave si aplica */}
                {current.details && current.details.length > 0 && (
                  <div className="rounded-xl bg-slate-50 p-4 space-y-2.5">
                    {current.details.map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 text-xs sm:text-sm"
                      >
                        <span className="text-slate-500 font-sans">{row.label}</span>
                        <span className="font-heading font-semibold text-slate-900">{row.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pasos si aplica */}
                {current.steps && current.steps.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    {current.stepsTitle && (
                      <p className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500">
                        {current.stepsTitle}
                      </p>
                    )}
                    <ul className="space-y-2">
                      {current.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-cta shrink-0 mt-0.5" strokeWidth={1.8} />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTAs del Sistema de Diseño (CTA Azul + Soft Azul sin borde) */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <a
                    href={current.primaryCta.path}
                    onClick={(e) => handleLink(e, current.primaryCta.path)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cta hover:bg-cta-600 text-white text-sm font-heading font-semibold transition-colors text-center"
                  >
                    <span>{current.primaryCta.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-85" />
                  </a>
                  {current.secondaryCta && (
                    <a
                      href={current.secondaryCta.path}
                      onClick={(e) => handleLink(e, current.secondaryCta?.path || '/')}
                      className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-cta-50 hover:bg-cta-100 text-cta text-sm font-heading font-semibold transition-colors text-center"
                    >
                      {current.secondaryCta.label}
                    </a>
                  )}
                </div>

                {/* Nota al pie dentro de la tarjeta blanca */}
                <p className="text-[11px] font-sans text-slate-400 leading-relaxed pt-3 border-t border-slate-100">
                  {current.footnote}
                </p>
              </div>

              {/* Pie legal discreto del email */}
              <div className="text-center space-y-1 text-[11px] font-sans text-slate-500 px-2">
                <p>GALSA Rent · Sucursal Plaza 450, Blvd. Guadiana, Durango, Dgo., México</p>
                <p>
                  Soporte:{' '}
                  <a
                    href="mailto:soporte@galsarent.com.mx"
                    className="text-cta font-medium hover:underline"
                  >
                    soporte@galsarent.com.mx
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
