import React, { useState } from 'react';
import { 
  ArrowLeft, Copy, Check, ArrowRight, Calendar, Clock, MapPin,
  ChevronDown, Star, ShieldCheck, Heart, Filter, Palette, 
  AlertCircle, Info, Users, Fuel, Gauge, CheckCircle2, X,
  Building2, Plane, Hotel, Train, Globe, Navigation, Compass,
  Briefcase, Zap, Sparkles, TrendingUp
} from 'lucide-react';
import { TimeSelect } from '../components/TimeSelect';
import { DateRangePicker } from '../components/DateRangePicker';

interface DesignSystemPageProps {
  onNavigate?: (path: string) => void;
}

type TabType = 'colors' | 'typography' | 'buttons' | 'inputs' | 'cards' | 'modals' | 'examples';

interface ComponentPreview {
  id: string;
  title: string;
  description: string;
  category: TabType;
  code: string;
  render: () => React.ReactNode;
}

export const DesignSystemPage: React.FC<DesignSystemPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('colors');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [timeValue, setTimeValue] = useState('10:00');
  const [startDate, setStartDate] = useState('2026-11-04');
  const [endDate, setEndDate] = useState('2026-11-07');
  const [favorited, setFavorited] = useState(false);

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const buttonComponents: ComponentPreview[] = [
    {
      id: 'btn-primary',
      title: 'Primary Button',
      description: 'Botón principal para acciones principales con fondo azul GALSA',
      category: 'buttons',
      code: `<button style={{ backgroundColor: '#3D63FF' }} className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all hover:brightness-95 active:scale-95">
  <span>Acción Principal</span>
</button>`,
      render: () => (
        <button 
          style={{ backgroundColor: '#3D63FF' }} 
          className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all hover:brightness-95 active:scale-95"
        >
          <span>Acción Principal</span>
        </button>
      ),
    },
    {
      id: 'btn-secondary',
      title: 'Secondary Button',
      description: 'Botón secundario con borde, usado para acciones secundarias',
      category: 'buttons',
      code: `<button className="inline-flex items-center justify-center gap-2 text-neutral-900 font-bold text-sm px-7 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
  <span>Acción Secundaria</span>
</button>`,
      render: () => (
        <button className="inline-flex items-center justify-center gap-2 text-neutral-900 font-bold text-sm px-7 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
          <span>Acción Secundaria</span>
        </button>
      ),
    },
    {
      id: 'btn-small',
      title: 'Small Button',
      description: 'Botón pequeño para acciones secundarias dentro de componentes',
      category: 'buttons',
      code: `<button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors">
  Pequeño
</button>`,
      render: () => (
        <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors">
          Pequeño
        </button>
      ),
    },
    {
      id: 'btn-ghost',
      title: 'Ghost Button',
      description: 'Botón transparente sin fondo',
      category: 'buttons',
      code: `<button className="text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors">
  Enlace simple
</button>`,
      render: () => (
        <button className="text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors">
          Enlace simple
        </button>
      ),
    },
  ];

  const inputComponents: ComponentPreview[] = [
    {
      id: 'input-text',
      title: 'Text Input',
      description: 'Campo de texto estándar con borde neutral',
      category: 'inputs',
      code: `<input 
  type="text"
  placeholder="Escribe aquí..."
  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 focus:border-cta-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors text-neutral-900"
/>`,
      render: () => (
        <input 
          type="text"
          placeholder="Escribe aquí..."
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 focus:border-cta-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors text-neutral-900"
        />
      ),
    },
    {
      id: 'input-date',
      title: 'Date Input',
      description: 'Campo de fecha nativo del navegador',
      category: 'inputs',
      code: `<input 
  type="date"
  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 focus:border-cta-600 outline-none transition-colors"
/>`,
      render: () => (
        <input 
          type="date"
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 focus:border-cta-600 outline-none transition-colors"
        />
      ),
    },
  ];

  const cardComponents: ComponentPreview[] = [
    {
      id: 'card-basic',
      title: 'Basic Card',
      description: 'Tarjeta básica con borde y espaciado',
      category: 'cards',
      code: `<div className="bg-white border border-neutral-200 rounded-2xl p-6">
  <h3 className="text-lg font-bold text-neutral-900 mb-2">Título</h3>
  <p className="text-sm text-neutral-600">Contenido de la tarjeta</p>
</div>`,
      render: () => (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Título</h3>
          <p className="text-sm text-neutral-600">Contenido de la tarjeta</p>
        </div>
      ),
    },
    {
      id: 'card-with-icon',
      title: 'Card with Icon',
      description: 'Tarjeta con icono destacado',
      category: 'cards',
      code: `<div className="bg-white border border-neutral-200 rounded-2xl p-6 flex gap-4">
  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
    <Check className="w-6 h-6 text-neutral-900" />
  </div>
  <div>
    <h3 className="text-base font-bold text-neutral-900 mb-1">Beneficio</h3>
    <p className="text-sm text-neutral-600">Descripción del beneficio</p>
  </div>
</div>`,
      render: () => (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-neutral-900" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 mb-1">Beneficio</h3>
            <p className="text-sm text-neutral-600">Descripción del beneficio</p>
          </div>
        </div>
      ),
    },
    {
      id: 'card-hover',
      title: 'Hoverable Card',
      description: 'Tarjeta con efecto hover interactivo',
      category: 'cards',
      code: `<div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-400 hover:shadow-lg transition-all cursor-pointer">
  <h3 className="text-lg font-bold text-neutral-900">Interactivo</h3>
</div>`,
      render: () => (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-400 hover:shadow-lg transition-all cursor-pointer">
          <h3 className="text-lg font-bold text-neutral-900">Interactivo</h3>
        </div>
      ),
    },
  ];

  const componentsByTab: Record<TabType, ComponentPreview[]> = {
    colors: [],
    typography: [],
    buttons: buttonComponents,
    inputs: inputComponents,
    cards: cardComponents,
    modals: [],
    examples: [],
  };

  const currentComponents = componentsByTab[activeTab];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('/')}
                  className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
                  title="Volver a la app"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-cta-50 text-cta-700 block mb-1" style={{ backgroundColor: 'rgba(61, 99, 255, 0.1)', color: '#3D63FF' }}>
                  Design System
                </span>
                <h1 className="text-2xl font-black text-neutral-900">GALSA Rent Components</h1>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            {[
              { id: 'colors', label: 'Colores' },
              { id: 'typography', label: 'Tipografía' },
              { id: 'buttons', label: 'Botones' },
              { id: 'inputs', label: 'Inputs' },
              { id: 'cards', label: 'Tarjetas' },
              { id: 'modals', label: 'Modales' },
              { id: 'examples', label: 'Ejemplos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* COLORS TAB */}
        {activeTab === 'colors' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-neutral-900 mb-6">Paleta de Colores</h2>
              
              <div className="space-y-8">
                {/* Primary */}
                <div>
                  <h3 className="text-sm font-bold text-neutral-600 mb-3 uppercase tracking-wider">Primario</h3>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="w-full h-24 rounded-xl" style={{ backgroundColor: '#3D63FF' }}></div>
                      <p className="text-xs font-mono text-neutral-600 mt-2">#3D63FF</p>
                      <p className="text-xs text-neutral-500">Usado solo en CTAs principales</p>
                    </div>
                  </div>
                </div>

                {/* Neutrals */}
                <div>
                  <h3 className="text-sm font-bold text-neutral-600 mb-3 uppercase tracking-wider">Neutrales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Neutral 900', color: '#1a1a1a' },
                      { name: 'Neutral 600', color: '#525252' },
                      { name: 'Neutral 400', color: '#a3a3a3' },
                      { name: 'Neutral 200', color: '#e5e5e5' },
                    ].map((item) => (
                      <div key={item.name}>
                        <div className="w-full h-20 rounded-xl border border-neutral-200" style={{ backgroundColor: item.color }}></div>
                        <p className="text-xs font-mono text-neutral-600 mt-2">{item.color}</p>
                        <p className="text-xs text-neutral-500">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TYPOGRAPHY TAB */}
        {activeTab === 'typography' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-neutral-900 mb-6">Tipografía</h2>
              
              <div className="space-y-8 bg-white border border-neutral-200 rounded-2xl p-8">
                <div>
                  <h1 className="text-6xl font-black text-neutral-900 mb-2">Heading (Google Sans)</h1>
                  <p className="text-sm text-neutral-600">font-heading font-black • 6xl / 3.75rem</p>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <h2 className="text-4xl font-black text-neutral-900 mb-2">Subheading Large</h2>
                  <p className="text-sm text-neutral-600">font-heading font-black • 4xl / 2.25rem</p>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">Subheading Medium</h3>
                  <p className="text-sm text-neutral-600">font-heading font-bold • 2xl / 1.5rem</p>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <p className="text-base text-neutral-900 mb-2">Body Regular (Inter)</p>
                  <p className="text-sm text-neutral-600">font-sans • base / 1rem</p>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <p className="text-sm text-neutral-900 mb-2">Body Small</p>
                  <p className="text-xs text-neutral-600">font-sans • sm / 0.875rem</p>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <p className="text-xs text-neutral-900 mb-2">Body Extra Small</p>
                  <p className="text-xs text-neutral-600">font-sans • xs / 0.75rem</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BUTTONS TAB */}
        {activeTab === 'buttons' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-neutral-900">Botones</h2>
            
            <div className="grid gap-8">
              {buttonComponents.map((comp) => (
                <div key={comp.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-neutral-200">
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">{comp.title}</h3>
                    <p className="text-sm text-neutral-600 mb-6">{comp.description}</p>
                    <div className="bg-neutral-50 p-6 rounded-xl flex items-center justify-center min-h-[80px]">
                      {comp.render()}
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-4 flex items-center justify-between">
                    <code className="text-xs font-mono text-neutral-600 truncate">{comp.id}</code>
                    <button
                      onClick={() => copySnippet(comp.code, comp.id)}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
                    >
                      {copiedCode === comp.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copiar código
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INPUTS TAB */}
        {activeTab === 'inputs' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-neutral-900 mb-6">Campos de Entrada</h2>

            {/* Text and Date Inputs */}
            <div className="grid gap-8">
              {inputComponents.map((comp) => (
                <div key={comp.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-neutral-200">
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">{comp.title}</h3>
                    <p className="text-sm text-neutral-600 mb-6">{comp.description}</p>
                    <div className="max-w-md">
                      {comp.render()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TimeSelect Component */}
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">TimeSelect (Custom Dropdown)</h3>
                <p className="text-sm text-neutral-600 mb-6">Dropdown reutilizable para seleccionar horas con estilo GALSA</p>
                <div className="max-w-md">
                  <TimeSelect
                    value={timeValue}
                    onChange={setTimeValue}
                    label="Hora"
                  />
                </div>
              </div>
            </div>

            {/* DateRangePicker Component */}
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">DateRangePicker (Custom Component)</h3>
                <p className="text-sm text-neutral-600 mb-6">Selector de rango de fechas interactivo</p>
                <div className="max-w-md">
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                      setStartDate(start);
                      setEndDate(end);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARDS TAB */}
        {activeTab === 'cards' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-neutral-900 mb-6">Tarjetas</h2>

            <div className="grid gap-8">
              {cardComponents.map((comp) => (
                <div key={comp.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-neutral-200">
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">{comp.title}</h3>
                    <p className="text-sm text-neutral-600 mb-6">{comp.description}</p>
                    <div className="bg-neutral-50 p-6 rounded-xl">
                      {comp.render()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODALS TAB */}
        {activeTab === 'modals' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-neutral-900 mb-6">Modales & Dialogs</h2>
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center">
              <p className="text-neutral-600">Los modales se implementan según el contexto de cada página.</p>
              <p className="text-sm text-neutral-500 mt-2">Ver VehicleDetailView.tsx para referencia de implementación.</p>
            </div>
          </div>
        )}

        {/* EXAMPLES TAB */}
        {activeTab === 'examples' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-neutral-900 mb-6">Ejemplos de Uso</h2>
            
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Sección con Beneficios</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Fácil de usar', icon: <Sparkles className="w-6 h-6" /> },
                    { title: 'Seguro', icon: <ShieldCheck className="w-6 h-6" /> },
                    { title: 'Rápido', icon: <Zap className="w-6 h-6" /> },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4 text-neutral-900">
                        {item.icon}
                      </div>
                      <h4 className="font-bold text-neutral-900">{item.title}</h4>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Formulario de Reserva</h3>
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-2">Fecha de Inicio</label>
                    <input type="date" className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-2">Hora de Inicio</label>
                    <TimeSelect value="10:00" onChange={() => {}} label="" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-2">Fecha de Fin</label>
                    <input type="date" className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-2">Hora de Fin</label>
                    <TimeSelect value="18:00" onChange={() => {}} label="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
