import React, { useState } from 'react';
import { 
  Palette, Layers, Box, Sparkles, Copy, Check, ArrowRight, ArrowLeft,
  Search, Calendar, Car, ChevronDown, Star, ShieldCheck, Loader2,
  ExternalLink, MessageCircle, Heart, Filter, Grid, MapPin, 
  CheckCircle2, AlertCircle, Info, Fuel, Users, Gauge, Clock, SlidersHorizontal
} from 'lucide-react';

interface DesignSystemPageProps {
  onNavigate?: (path: string) => void;
}

type TabType = 'all' | 'tokens' | 'atoms' | 'molecules' | 'organisms';

export const DesignSystemPage: React.FC<DesignSystemPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [toggleState, setToggleState] = useState(true);
  const [likeState, setLikeState] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const matchesSearch = (title: string, desc: string) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  };

  const shouldShowSection = (section: TabType) => {
    return activeTab === 'all' || activeTab === section;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28">
      {/* Top Header Sticky */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('/')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0"
                  title="Volver a la app"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-pink-50 text-pink-700 border border-pink-200/60">
                      Atomic Design System
                    </span>
                    <span className="text-xs text-slate-400 font-mono">GALSA Rent v2.2</span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 leading-tight">
                    Sistema de Diseño & UI Kit
                  </h1>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'Todos', icon: Layers },
                { id: 'tokens', label: 'Tokens', icon: Sparkles },
                { id: 'atoms', label: 'Átomos', icon: Box },
                { id: 'molecules', label: 'Moléculas', icon: Box },
                { id: 'organisms', label: 'Organismos', icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar componente por nombre o estilo..."
                className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">
              Presiona <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-700">Copiar</span> para obtener las clases de Tailwind
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* ============================================================ */}
        {/* 1. TOKENS & FUNDAMENTOS */}
        {/* ============================================================ */}
        {shouldShowSection('tokens') && (
          <section id="tokens" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-pink-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Nivel 0 · Fundamentos
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Tokens de Diseño
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Variables elementales de color, tipografía, radios de curvatura y sombras utilizadas en toda la plataforma.
              </p>
            </div>

            {/* Colores */}
            {matchesSearch('color', 'paleta brand primario secundario') && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-sm font-heading font-bold text-slate-900 mb-4 flex items-center justify-between">
                  <span>Paleta de Colores Oficial</span>
                  <span className="text-xs text-slate-400 font-mono">Tailwind CSS + HEX</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[
                    { name: 'Brand Primary', hex: '#3D63FF', bgClass: 'bg-[#3D63FF]', text: 'text-white' },
                    { name: 'Brand Dark', hex: '#1D4ED8', bgClass: 'bg-blue-700', text: 'text-white' },
                    { name: 'Brand Light', hex: '#EFF6FF', bgClass: 'bg-blue-50', text: 'text-blue-900', border: true },
                    { name: 'Neutral Dark', hex: '#0F172A', bgClass: 'bg-slate-900', text: 'text-white' },
                    { name: 'Neutral Mid', hex: '#64748B', bgClass: 'bg-slate-500', text: 'text-white' },
                    { name: 'Neutral Surface', hex: '#F8FAFC', bgClass: 'bg-slate-50', text: 'text-slate-800', border: true },
                    { name: 'Success / Activo', hex: '#10B981', bgClass: 'bg-emerald-500', text: 'text-white' },
                    { name: 'Success Soft', hex: '#ECFDF5', bgClass: 'bg-emerald-50', text: 'text-emerald-800', border: true },
                    { name: 'Warning / Reserva', hex: '#F59E0B', bgClass: 'bg-amber-500', text: 'text-white' },
                    { name: 'Warning Soft', hex: '#FFFBEB', bgClass: 'bg-amber-50', text: 'text-amber-800', border: true },
                    { name: 'Error / Cancelación', hex: '#E11D48', bgClass: 'bg-rose-600', text: 'text-white' },
                    { name: 'WhatsApp Brand', hex: '#25D366', bgClass: 'bg-[#25D366]', text: 'text-white' },
                  ].map((color) => (
                    <div 
                      key={color.name}
                      onClick={() => copySnippet(color.hex, `color-${color.name}`)}
                      className="group cursor-pointer rounded-xl border border-slate-200/80 p-3 hover:border-blue-400 transition-all hover:shadow-sm"
                    >
                      <div className={`h-12 rounded-lg ${color.bgClass} ${color.border ? 'border border-slate-200' : ''} mb-2 flex items-center justify-center`}>
                        {copiedCode === `color-${color.name}` ? (
                          <Check className="w-4 h-4 text-white drop-shadow-sm" />
                        ) : null}
                      </div>
                      <div className="text-xs font-heading font-bold text-slate-800 truncate">{color.name}</div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between mt-0.5">
                        <span>{color.hex}</span>
                        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tipografías & Escalas */}
            {matchesSearch('tipografia', 'fuente texto scale heading') && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-sm font-heading font-bold text-slate-900 mb-4">
                  Escala Tipográfica (Google Sans + Inter)
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Display / Hero · font-heading font-black text-3xl sm:text-4xl</div>
                      <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                        Renta de autos sin complicaciones
                      </div>
                    </div>
                    <button 
                      onClick={() => copySnippet('font-heading font-extrabold text-3xl sm:text-4xl', 'typo-hero')}
                      className="px-2.5 py-1 text-xs rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 self-start shrink-0"
                    >
                      {copiedCode === 'typo-hero' ? 'Copiado ✓' : 'Copiar'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Section Heading · font-heading font-bold text-xl sm:text-2xl</div>
                      <div className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mt-1">
                        Autos verificados listos para entrega
                      </div>
                    </div>
                    <button 
                      onClick={() => copySnippet('font-heading font-bold text-xl sm:text-2xl', 'typo-h2')}
                      className="px-2.5 py-1 text-xs rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 self-start shrink-0"
                    >
                      {copiedCode === 'typo-h2' ? 'Copiado ✓' : 'Copiar'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Body / Descripción · font-sans text-sm text-slate-600 leading-relaxed</div>
                      <div className="text-sm font-sans text-slate-600 mt-1 max-w-2xl leading-relaxed">
                        Explora autos verificados en México: sedanes económicos, SUVs familiares y camionetas 4x4. Firma digital y kilometraje libre sin filas.
                      </div>
                    </div>
                    <button 
                      onClick={() => copySnippet('font-sans text-sm text-slate-600 leading-relaxed', 'typo-body')}
                      className="px-2.5 py-1 text-xs rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 self-start shrink-0"
                    >
                      {copiedCode === 'typo-body' ? 'Copiado ✓' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* 2. ÁTOMOS (ATOMS) */}
        {/* ============================================================ */}
        {shouldShowSection('atoms') && (
          <section id="atoms" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Box className="w-4 h-4" /> Nivel 1 · Átomos
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Colección Completa de Botones y Elementos Base
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Todos los estilos de botones, inputs, badges e iconos interactivos construidos para la aplicación.
              </p>
            </div>

            {/* BOTONES */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-heading font-bold text-slate-900">
                  Botones (Buttons & Actions)
                </h3>
                <span className="text-xs text-slate-400 font-mono">11 variantes implementadas</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Primario Brand */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">1. Botón Brand Azul (Hero & CTAs)</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Acción primaria de alta conversión</div>
                    <div className="mt-4">
                      <button className="w-full px-5 py-2.5 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-xs sm:text-sm shadow-xs transition-all hover:shadow-md active:scale-98 flex items-center justify-center gap-2">
                        <span>Explorar vehículos</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-5 py-2.5 rounded-xl bg-[#3D63FF] hover:bg-blue-700 text-white font-heading font-semibold text-sm shadow-xs transition-all hover:shadow-md active:scale-98 flex items-center justify-center gap-2', 'btn-1')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-1' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 2. Primario Dark */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">2. Botón Negro (Catálogo & Reserva)</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Acción decisiva / Finalizar renta</div>
                    <div className="mt-4">
                      <button className="w-full px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-heading font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 flex items-center justify-center gap-2">
                        <span>Reservar vehículo</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-heading font-bold text-sm shadow-xs transition-all active:scale-98', 'btn-2')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-2' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 3. Secundario Outline */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">3. Botón Secundario Outline</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Navegación secundaria o detalles</div>
                    <div className="mt-4">
                      <button className="w-full px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 font-heading font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2">
                        <span>Ver especificaciones</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 font-heading font-semibold text-sm transition-colors', 'btn-3')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-3' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 4. WhatsApp CTA */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">4. Botón WhatsApp Oficial</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Canal de soporte y contacto directo</div>
                    <div className="mt-4">
                      <button className="w-full px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-xs sm:text-sm shadow-2xs transition-transform active:scale-98 flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Chat en WhatsApp</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-sm shadow-2xs transition-transform active:scale-98 flex items-center justify-center gap-2', 'btn-4')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-4' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 5. Ghost / Text Button */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">5. Botón Ghost / Minimal</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Acciones terciarias o cancelar</div>
                    <div className="mt-4">
                      <button className="w-full px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-heading font-medium text-xs sm:text-sm hover:bg-slate-200/60 transition-colors flex items-center justify-center">
                        <span>Limpiar filtros</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-heading font-medium text-sm hover:bg-slate-200/60 transition-colors', 'btn-5')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-5' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 6. Destructive / Danger */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">6. Botón Alerta / Destructivo</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Cancelaciones o eliminación de datos</div>
                    <div className="mt-4">
                      <button className="w-full px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-heading font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Cancelar reserva</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-heading font-semibold text-sm transition-colors', 'btn-6')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-6' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 7. Loading / Spinner */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">7. Botón Estado de Carga (Loading)</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Para firmas y peticiones en curso</div>
                    <div className="mt-4">
                      <button disabled className="w-full px-5 py-2.5 rounded-xl bg-blue-600/90 text-white font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-wait">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verificando documentos...</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-5 py-2.5 rounded-xl bg-blue-600/90 text-white font-heading font-semibold text-sm flex items-center justify-center gap-2 cursor-wait', 'btn-7')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-7' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 8. Disabled State */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">8. Botón Deshabilitado (Disabled)</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Sin disponibilidad o datos pendientes</div>
                    <div className="mt-4">
                      <button disabled className="w-full px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 font-heading font-medium text-xs sm:text-sm cursor-not-allowed flex items-center justify-center">
                        <span>Vehículo reservado</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 font-heading font-medium text-sm cursor-not-allowed', 'btn-8')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-8' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 9. Botones de Icono / Microacciones */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">9. Botones de Icono / Acción Rápida</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Copiar, favorito, volver y filtros</div>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button 
                        onClick={() => setLikeState(!likeState)}
                        className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                        title="Favorito"
                      >
                        <Heart className={`w-4 h-4 ${likeState ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                      </button>
                      <button 
                        onClick={() => copySnippet('Ejemplo de texto', 'icon-copy')}
                        className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center shadow-2xs transition-colors"
                        title="Copiar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                        title="Abrir"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center shadow-2xs transition-colors', 'btn-9')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-9' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 10. Filter Chips / Category Tabs */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">10. Chips / Píldoras de Filtro</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Filtro de categorías de catálogo</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-heading font-medium shadow-xs">
                        Todos (Activo)
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 text-xs font-heading font-medium transition-colors">
                        SUVs & 4x4
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 text-xs font-heading font-medium transition-colors">
                        Económicos
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all (Active: bg-slate-900 text-white | Default: bg-white text-slate-600 border border-slate-200)', 'btn-10')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-10' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                {/* 11. View Toggle Pill */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-800">11. Toggle de Vista (Cuadrícula / Mapa)</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Control segmented de cambio de modo</div>
                    <div className="mt-4 flex justify-center">
                      <div className="bg-slate-200/70 p-1 rounded-xl inline-flex items-center">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading transition-all ${
                            viewMode === 'grid'
                              ? 'bg-white text-slate-900 font-bold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 font-medium'
                          }`}
                        >
                          <Grid className="w-3.5 h-3.5" />
                          <span>Cuadrícula</span>
                        </button>
                        <button
                          onClick={() => setViewMode('map')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading transition-all ${
                            viewMode === 'map'
                              ? 'bg-white text-slate-900 font-bold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 font-medium'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Mapa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => copySnippet('bg-slate-200/70 p-1 rounded-xl inline-flex items-center', 'btn-11')}
                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start"
                  >
                    <Copy className="w-3 h-3" /> {copiedCode === 'btn-11' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

              </div>
            </div>

            {/* INPUTS Y FORMULARIOS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-heading font-bold text-slate-900">
                  Inputs & Controles de Formulario
                </h3>
                <span className="text-xs text-slate-400 font-mono">Campos limpios y accesibles</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Search Input */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                  <div className="text-xs font-heading font-bold text-slate-800">Input con Icono de Búsqueda</div>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Buscar por marca o modelo..."
                      className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Datepicker Trigger Input */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                  <div className="text-xs font-heading font-bold text-slate-800">Selector de Fecha / Triggers</div>
                  <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 cursor-pointer hover:border-blue-400 transition-colors">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>06/11/2026</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">10:00 hrs</span>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                  <div className="text-xs font-heading font-bold text-slate-800">Switch Interactivo ON/OFF</div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 font-medium">Kilometraje ilimitado</span>
                    <button
                      onClick={() => setToggleState(!toggleState)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                        toggleState ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        toggleState ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* BADGES & CHIPS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-heading font-bold text-slate-900">
                  Badges, Tags & Indicadores de Estado
                </h3>
                <span className="text-xs text-slate-400 font-mono">Micro-indicadores visuales</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Auto Verificado
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Seguro Amplio
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Entrega Inmediata
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60 text-xs font-medium">
                  <Star className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
                  4.98 (29 reseñas)
                </span>

                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                  /catalogo
                </span>

                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-emerald-400 font-mono">
                  v2.2.70
                </span>
              </div>
            </div>

          </section>
        )}

        {/* ============================================================ */}
        {/* 3. MOLÉCULAS (MOLECULES) */}
        {/* ============================================================ */}
        {shouldShowSection('molecules') && (
          <section id="molecules" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-indigo-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Box className="w-4 h-4" /> Nivel 2 · Moléculas
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Combinaciones Moleculares de Componentes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Conjuntos de átomos combinados para realizar funciones concretas de búsqueda, calificación o información.
              </p>
            </div>

            {/* 1. Barra de Búsqueda Rápida Hero */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Barra de Búsqueda Flotante (Hero Search Pill Bar)
                  </h3>
                  <p className="text-xs text-slate-500">Componente central de reservación en Home y Catálogo</p>
                </div>
                <button 
                  onClick={() => copySnippet('<SearchContainer />', 'mol-search')}
                  className="text-xs font-mono text-blue-600 hover:text-blue-700"
                >
                  {copiedCode === 'mol-search' ? 'Copiado ✓' : 'Copiar'}
                </button>
              </div>

              {/* Render visual real */}
              <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/60">
                <div className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-md border border-slate-100 flex flex-col md:flex-row items-center gap-2">
                  <div className="flex-1 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200/80 cursor-pointer">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Entrega</div>
                      <div className="text-xs sm:text-sm font-heading font-semibold text-slate-800 truncate">Sucursal o Aeropuerto</div>
                    </div>
                  </div>

                  <div className="flex-1 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200/80 cursor-pointer">
                    <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Periodo</div>
                      <div className="text-xs sm:text-sm font-heading font-semibold text-slate-800 truncate">06 Nov — 09 Nov</div>
                    </div>
                  </div>

                  <div className="flex-1 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200/80 cursor-pointer">
                    <Car className="w-4 h-4 text-slate-500 shrink-0" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Tipo de auto</div>
                      <div className="text-xs sm:text-sm font-heading font-semibold text-slate-800 truncate">Todos los modelos</div>
                    </div>
                  </div>

                  <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-all shadow-xs">
                    <Search className="w-4 h-4" />
                    <span>Buscar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Specs Grid de Auto */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-heading font-bold text-slate-900">
                Parrilla de Especificaciones Técnicas (Vehicle Specs Molecule)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Pasajeros</div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-slate-800">5 Asientos</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Transmisión</div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-slate-800">Automática</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Kilometraje</div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-slate-800">Libre / Sin límite</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
                    <Fuel className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Combustible</div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-slate-800">Tanque Lleno</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Acordeón Interactivo de FAQ */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-heading font-bold text-slate-900">
                Item de Acordeón FAQ (Collapsible Molecule)
              </h3>
              <div className="rounded-xl border border-slate-200 overflow-hidden transition-all">
                <button
                  onClick={() => setIsFaqOpen(!isFaqOpen)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors bg-white"
                >
                  <span className="font-heading font-semibold text-slate-900 text-sm">
                    ¿Qué requisitos necesito para rentar un auto en GALSA Rent?
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isFaqOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFaqOpen && (
                  <div className="px-4 pb-4 pt-1 bg-white text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                    Solo requieres identificación oficial vigente (INE o pasaporte), licencia de conducir vigente y tarjeta de crédito o débito para el depósito reembolsable en garantía.
                  </div>
                )}
              </div>
            </div>

          </section>
        )}

        {/* ============================================================ */}
        {/* 4. ORGANISMOS (ORGANISMS) */}
        {/* ============================================================ */}
        {shouldShowSection('organisms') && (
          <section id="organisms" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" /> Nivel 3 · Organismos
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Estructuras UI Completas
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Módulos integrados de interfaz compuestos por múltiples moléculas y átomos funcionando al unísono.
              </p>
            </div>

            {/* Organismo 1: Tarjeta de Vehículo Oficial */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    VehicleCard Oficial
                  </h3>
                  <p className="text-xs text-slate-500">Unidad fundamental de visualización de flota</p>
                </div>
              </div>

              <div className="max-w-sm rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-md transition-shadow">
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80"
                    alt="Volkswagen Virtus 2026"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-heading font-bold text-slate-800 shadow-xs">
                      Sedán
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-heading font-bold shadow-xs">
                      Verificado
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h4 className="text-base font-heading font-extrabold text-slate-900">
                        Volkswagen Virtus
                      </h4>
                      <div className="text-xs text-slate-500">Trendline 2026 · Automático</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-heading font-extrabold text-blue-600">
                        $1,100 <span className="text-xs font-normal text-slate-400">/día</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Tarifa garantizada</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-slate-400" /> Km Libre
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> 5 Lugares
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.97
                    </span>
                  </div>

                  <div className="mt-4">
                    <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-heading font-semibold text-xs sm:text-sm transition-colors">
                      Ver auto y reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Organismo 2: Cinta QA & Footer */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-heading font-bold text-slate-900">
                Listón de Control QA & Botón de Sistema de Diseño
              </h3>
              <p className="text-xs text-slate-500">Ubicado en la parte inferior del Footer para auditorías y navegación rápida</p>

              <div className="bg-black text-white text-[11px] font-mono py-2.5 px-4 rounded-xl border border-neutral-800">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400">
                  <span className="text-amber-400 font-semibold">[ENTORNO DE PRUEBAS / QA]</span>
                  <div className="flex items-center gap-3 text-white">
                    <span>Última actualización: <strong>06 Nov 2026</strong></span>
                    <span className="bg-neutral-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">v2.2.70</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 text-pink-300 text-[11px] font-medium border border-neutral-700/60">
                      <Palette className="w-3.5 h-3.5 text-pink-400" />
                      <span>Sistema de Diseño</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </section>
        )}

      </main>
    </div>
  );
};
