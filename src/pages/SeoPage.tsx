import React, { useState, useMemo } from 'react';
import { STATIC_ROUTES_METADATA, getVehicleMetadata } from '../data/metadata';
import { VEHICLES } from '../data/vehicles';
import { 
  Search, Copy, Check, ExternalLink, Globe, Share2, MessageSquare, ArrowLeft
} from 'lucide-react';

interface SeoItem {
  id: string;
  path: string;
  category: 'core' | 'vehicles' | 'auth' | 'legal';
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt?: string;
}

interface SeoPageProps {
  onNavigate?: (path: string) => void;
}

export const SeoPage: React.FC<SeoPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'serp' | 'og' | 'chat'>('serp');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const baseUrl = ((import.meta as any).env?.BASE_URL || '/').replace(/\/$/, '');
  const faviconUrl = `${baseUrl}/favicon.png`;

  // Build the complete list of SEO pages from STATIC_ROUTES_METADATA + sample vehicles
  const allPages: SeoItem[] = useMemo(() => {
    const list: SeoItem[] = [];

    // Static pages
    Object.entries(STATIC_ROUTES_METADATA).forEach(([path, meta]) => {
      let category: 'core' | 'vehicles' | 'auth' | 'legal' = 'core';
      if (['/terminos', '/privacidad', '/confianza'].includes(path)) {
        category = 'legal';
      } else if (['/login', '/registro', '/recuperar-password', '/recuperar-password/enviado', '/restablecer-password', '/cuenta'].includes(path)) {
        category = 'auth';
      }

      list.push({
        id: path,
        path,
        category,
        title: meta.title,
        description: meta.description,
        canonical: meta.canonical,
        image: meta.ogImage.url,
        imageAlt: meta.ogImage.alt,
      });
    });

    // Vehicle pages
    VEHICLES.forEach((v) => {
      const meta = getVehicleMetadata(v);
      list.push({
        id: `/vehiculos/${v.slug}`,
        path: `/vehiculos/${v.slug}`,
        category: 'vehicles',
        title: meta.title,
        description: meta.description,
        canonical: meta.canonical,
        image: meta.ogImage.url,
        imageAlt: meta.ogImage.alt,
      });
    });

    return list;
  }, []);

  const filteredPages = useMemo(() => {
    return allPages.filter((item) => {
      const matchesSearch = 
        item.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'all' || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [allPages, searchQuery, categoryFilter]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('/')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0"
                  title="Volver al inicio"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  Previsualizador SEO
                </h1>
              </div>
            </div>

            {/* Tab switch */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-center border border-slate-200">
              <button
                onClick={() => setActiveTab('serp')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                  activeTab === 'serp'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                Google
              </button>
              <button
                onClick={() => setActiveTab('og')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                  activeTab === 'og'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                Social
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                  activeTab === 'chat'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp
              </button>
            </div>
          </div>

          {/* Search and filters bar */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar ruta o título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'core', label: 'Principales' },
                { id: 'vehicles', label: 'Vehículos' },
                { id: 'auth', label: 'Auth' },
                { id: 'legal', label: 'Legales' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium whitespace-nowrap transition-all ${
                    categoryFilter === tab.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {filteredPages.map((item) => {
            const cleanPath = item.path === '/' ? '' : item.path.replace(/^\//, '');
            const displayBreadcrumb = `galsarent.com.mx ${cleanPath ? '› ' + cleanPath.split('/').join(' › ') : ''}`;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-5 sm:p-6"
              >
                {/* Item Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {item.path}
                    </span>
                    <span className="text-xs text-slate-400 capitalize">
                      {item.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => copyToClipboard(item.canonical, `url-${item.id}`)}
                      className="text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Copiar URL canónica"
                    >
                      {copiedKey === `url-${item.id}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate(item.path)}
                        className="text-xs text-blue-600 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Abrir página en la app"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* TAB 1: Google SERP Preview */}
                {activeTab === 'serp' && (
                  <div className="max-w-2xl bg-white">
                    {/* Google SERP Header */}
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                        <img 
                          src={faviconUrl} 
                          alt="GALSA Favicon" 
                          className="w-5 h-5 rounded-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/favicon.png';
                          }}
                        />
                      </div>
                      <div className="leading-tight">
                        <div className="text-[13px] font-sans font-medium text-slate-800">
                          GALSA Rent
                        </div>
                        <div className="text-[11px] font-sans text-slate-600 truncate">
                          {displayBreadcrumb}
                        </div>
                      </div>
                    </div>

                    {/* Google Blue Title */}
                    <h2 className="text-[19px] sm:text-[20px] font-sans text-[#1a0dab] hover:underline cursor-pointer leading-[1.3] mb-1.5 font-normal">
                      {item.title}
                    </h2>

                    {/* Google Snippet */}
                    <p className="text-[13px] sm:text-[14px] font-sans text-[#4d5156] leading-[1.58]">
                      {item.description}
                    </p>
                  </div>
                )}

                {/* TAB 2: Social / Open Graph Preview (Facebook / LinkedIn / Twitter) */}
                {activeTab === 'og' && (
                  <div className="max-w-xl border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <div className="relative aspect-[1200/630] bg-slate-200 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.imageAlt || item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 bg-white border-t border-slate-100">
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
                        galsarent.com.mx
                      </div>
                      <h3 className="text-sm sm:text-base font-heading font-bold text-slate-900 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 3: WhatsApp / Chat Link Preview */}
                {activeTab === 'chat' && (
                  <div className="max-w-md bg-[#eef3f6] p-4 rounded-2xl">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden text-left">
                      <div className="relative h-44 bg-slate-100 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3 bg-[#f8fafc]">
                        <h4 className="text-xs font-heading font-bold text-slate-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] font-sans text-slate-500 line-clamp-2 mt-0.5 leading-normal">
                          {item.description}
                        </p>
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          galsarent.com.mx
                        </div>
                      </div>
                      <div className="px-3 py-1.5 bg-white border-t border-slate-100 text-right">
                        <span className="text-[10px] text-slate-400">12:30 PM · Enviado ✓✓</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick copy buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => copyToClipboard(item.title, `title-${item.id}`)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {copiedKey === `title-${item.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    Copiar Título
                  </button>
                  <button
                    onClick={() => copyToClipboard(item.description, `desc-${item.id}`)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {copiedKey === `desc-${item.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    Copiar Descripción
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
