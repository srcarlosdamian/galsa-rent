import React, { useState, useMemo } from 'react';
import {
  STATIC_ROUTES_METADATA,
  getVehicleMetadata,
  getBlogPostMetadata,
  getCheckoutMetadata,
} from '../data/metadata';
import { VEHICLES } from '../data/vehicles';
import { BLOG_POSTS } from '../data/blog';
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Share2,
  MessageSquare,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

type SeoCategory = 'core' | 'vehicles' | 'blog' | 'legal' | 'auth' | 'checkout';

interface SeoItem {
  id: string;
  path: string;
  category: SeoCategory;
  title: string;
  description: string;
  focusKeyword?: string;
  canonical: string;
  image: string;
  imageAlt?: string;
  noIndex: boolean;
}

interface SeoPageProps {
  onNavigate?: (path: string) => void;
}

const CATEGORY_LABELS: Record<SeoCategory, string> = {
  core: 'Principal',
  vehicles: 'Vehículo',
  blog: 'Blog',
  legal: 'Legal',
  auth: 'Auth & Cuenta',
  checkout: 'Checkout / Sistema',
};

export const SeoPage: React.FC<SeoPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'serp' | 'og' | 'chat'>('serp');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [indexFilter, setIndexFilter] = useState<'all' | 'indexable' | 'noindex'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const baseUrl = ((import.meta as any).env?.BASE_URL || '/').replace(/\/$/, '');
  const faviconUrl = `${baseUrl}/favicon.png`;

  // Construye el inventario completo (100% de las rutas de la app)
  const allPages: SeoItem[] = useMemo(() => {
    const list: SeoItem[] = [];

    // 1. Rutas estáticas definidas en STATIC_ROUTES_METADATA
    Object.entries(STATIC_ROUTES_METADATA).forEach(([path, meta]) => {
      let category: SeoCategory = 'core';
      if (['/confianza', '/terminos', '/privacidad'].includes(path)) {
        category = 'legal';
      } else if (
        [
          '/login',
          '/registro',
          '/recuperar-password',
          '/recuperar-password/enviado',
          '/restablecer-password',
          '/cuenta',
          '/cuenta/completar',
          '/completar-perfil',
        ].includes(path)
      ) {
        category = 'auth';
      } else if (['/seo', '/design-system', '/404'].includes(path)) {
        category = 'checkout';
      }

      list.push({
        id: path,
        path,
        category,
        title: meta.title,
        description: meta.description,
        focusKeyword: meta.focusKeyword,
        canonical: meta.canonical,
        image: meta.ogImage.url,
        imageAlt: meta.ogImage.alt,
        noIndex: Boolean(meta.noIndex),
      });
    });

    // 2. Fichas de vehículos (/vehiculos/:slug)
    VEHICLES.forEach((v) => {
      const meta = getVehicleMetadata(v);
      list.push({
        id: `/vehiculos/${v.slug}`,
        path: `/vehiculos/${v.slug}`,
        category: 'vehicles',
        title: meta.title,
        description: meta.description,
        focusKeyword: meta.focusKeyword,
        canonical: meta.canonical,
        image: meta.ogImage.url,
        imageAlt: meta.ogImage.alt,
        noIndex: Boolean(meta.noIndex),
      });
    });

    // 3. Artículos del blog (/blog/:slug)
    BLOG_POSTS.forEach((post) => {
      const meta = getBlogPostMetadata(post);
      list.push({
        id: `/blog/${post.slug}`,
        path: `/blog/${post.slug}`,
        category: 'blog',
        title: meta.title,
        description: meta.description,
        focusKeyword: meta.focusKeyword,
        canonical: meta.canonical,
        image: meta.ogImage.url,
        imageAlt: meta.ogImage.alt,
        noIndex: Boolean(meta.noIndex),
      });
    });

    // 4. Vistas de checkout por vehículo (/reservar/:slug)
    VEHICLES.forEach((v) => {
      const meta = getCheckoutMetadata(v);
      list.push({
        id: `/reservar/${v.slug}`,
        path: `/reservar/${v.slug}`,
        category: 'checkout',
        title: meta.title,
        description: meta.description,
        focusKeyword: meta.focusKeyword,
        canonical: meta.canonical,
        image: meta.ogImage.url,
        imageAlt: meta.ogImage.alt,
        noIndex: Boolean(meta.noIndex),
      });
    });

    return list;
  }, []);

  const stats = useMemo(() => {
    const total = allPages.length;
    const indexable = allPages.filter((p) => !p.noIndex).length;
    const noindex = total - indexable;
    const optimalLength = allPages.filter(
      (p) => p.title.length <= 60 && p.description.length <= 155
    ).length;

    const counts: Record<string, number> = {
      all: total,
      core: allPages.filter((p) => p.category === 'core').length,
      vehicles: allPages.filter((p) => p.category === 'vehicles').length,
      blog: allPages.filter((p) => p.category === 'blog').length,
      legal: allPages.filter((p) => p.category === 'legal').length,
      auth: allPages.filter((p) => p.category === 'auth').length,
      checkout: allPages.filter((p) => p.category === 'checkout').length,
    };

    return { total, indexable, noindex, optimalLength, counts };
  }, [allPages]);

  const filteredPages = useMemo(() => {
    return allPages.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.path.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.focusKeyword || '').toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === 'all' || item.category === categoryFilter;

      const matchesIndex =
        indexFilter === 'all' ||
        (indexFilter === 'indexable' && !item.noIndex) ||
        (indexFilter === 'noindex' && item.noIndex);

      return matchesSearch && matchesCategory && matchesIndex;
    });
  }, [allPages, searchQuery, categoryFilter, indexFilter]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                  Auditor &amp; Previsualizador SEO
                </h1>
                <p className="text-xs font-sans text-slate-500">
                  {stats.total} rutas sincronizadas con metadatos, robots y Open Graph
                </p>
              </div>
            </div>

            {/* Tab switch */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-center border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('serp')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors cursor-pointer ${
                  activeTab === 'serp'
                    ? 'bg-white text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-cta" />
                Google
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('og')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors cursor-pointer ${
                  activeTab === 'og'
                    ? 'bg-white text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                Social
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-white text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                Mensajería
              </button>
            </div>
          </div>

          {/* Search, Index filter & Category tabs */}
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar ruta, título o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta transition-all"
                />
              </div>

              {/* Filtro rápido de indexación */}
              <div className="flex items-center gap-1.5 self-start md:self-auto">
                {[
                  { id: 'all', label: 'Todas' },
                  { id: 'indexable', label: 'Indexables' },
                  { id: 'noindex', label: 'NoIndex' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIndexFilter(opt.id as 'all' | 'indexable' | 'noindex')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors cursor-pointer ${
                      indexFilter === opt.id
                        ? 'bg-cta text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter tabs with counts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'core', label: 'Principales' },
                { id: 'vehicles', label: 'Vehículos' },
                { id: 'blog', label: 'Blog' },
                { id: 'legal', label: 'Legales' },
                { id: 'auth', label: 'Auth & Cuenta' },
                { id: 'checkout', label: 'Checkout & Sistema' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    categoryFilter === tab.id
                      ? 'bg-cta text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      categoryFilter === tab.id
                        ? 'bg-white/15 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {stats.counts[tab.id] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Resumen superior de métricas SEO (4 tarjetas lineales planas) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-left">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
              Rutas auditadas
            </span>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
              {stats.total}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Estáticas, autos, blog y checkout
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-left">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
              Indexables (SERP)
            </span>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-700 mt-1">
              {stats.indexable}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Con etiqueta index, follow
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-left">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
              Privadas / Sistema
            </span>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-700 mt-1">
              {stats.noindex}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Protegidas con noindex, nofollow
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-left">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
              Longitud óptima
            </span>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-cta mt-1">
              {stats.optimalLength} / {stats.total}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Title ≤ 60 y Meta ≤ 155 car.
            </p>
          </div>
        </div>

        {/* Lista de rutas filtradas */}
        {filteredPages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" strokeWidth={1.6} />
            <h2 className="text-base font-heading font-bold text-slate-900">
              No se encontraron rutas con esos filtros
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Ajusta el texto de búsqueda o restablece los filtros de categoría e indexación para ver todo el inventario SEO.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setIndexFilter('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-xs transition-colors cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPages.map((item) => {
              const cleanPath = item.path === '/' ? '' : item.path.replace(/^\//, '');
              const displayBreadcrumb = `galsarent.com.mx ${
                cleanPath ? '› ' + cleanPath.split('/').join(' › ') : ''
              }`;
              const titleLen = item.title.length;
              const descLen = item.description.length;
              const isTitleOk = titleLen <= 60;
              const isDescOk = descLen <= 155;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors overflow-hidden p-5 sm:p-6 text-left"
                >
                  {/* Item Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-600">
                        {item.path}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-semibold text-slate-700 bg-slate-100">
                        {CATEGORY_LABELS[item.category]}
                      </span>
                      {item.noIndex ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-heading font-semibold">
                          noindex
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-heading font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          index, follow
                        </span>
                      )}
                      {item.focusKeyword && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cta-50 text-cta text-xs font-heading font-semibold">
                          Frase clave: {item.focusKeyword}
                        </span>
                      )}
                    </div>

                    {/* Length counters + Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${
                          isTitleOk
                            ? 'bg-emerald-50/70 text-emerald-700 border-emerald-200/70'
                            : 'bg-amber-50 text-amber-800 border-amber-200/80'
                        }`}
                      >
                        Título: {titleLen}/60
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${
                          isDescOk
                            ? 'bg-emerald-50/70 text-emerald-700 border-emerald-200/70'
                            : 'bg-amber-50 text-amber-800 border-amber-200/80'
                        }`}
                      >
                        Meta: {descLen}/155
                      </span>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(item.canonical, `url-${item.id}`)}
                        className="text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
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
                          type="button"
                          onClick={() => onNavigate(item.path)}
                          className="text-xs text-cta hover:text-cta-700 p-1.5 rounded-lg hover:bg-cta-50 transition-colors cursor-pointer"
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
                      <div className="flex items-center gap-3 mb-1.5">
                        <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={faviconUrl}
                            alt="GALSA Favicon"
                            className="w-5 h-5 rounded-full object-contain"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/favicon.png';
                            }}
                          />
                        </div>
                        <div className="leading-tight min-w-0">
                          <div className="text-[13px] font-sans font-medium text-slate-800">
                            GALSA Rent
                          </div>
                          <div className="text-[11px] font-sans text-slate-600 truncate">
                            {displayBreadcrumb}
                          </div>
                        </div>
                      </div>

                      <h2
                        onClick={() => onNavigate && onNavigate(item.path)}
                        className="text-[19px] sm:text-[20px] font-sans text-cta-800 hover:underline cursor-pointer leading-[1.3] mb-1.5 font-normal"
                      >
                        {item.title}
                      </h2>

                      <p className="text-[13px] sm:text-[14px] font-sans text-ink-600 leading-[1.58]">
                        {item.description}
                      </p>
                    </div>
                  )}

                  {/* TAB 2: Social / Open Graph Preview */}
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

                  {/* TAB 3: Chat Link Preview */}
                  {activeTab === 'chat' && (
                    <div className="max-w-md bg-cta-50 p-4 rounded-2xl">
                      <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden text-left">
                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3 bg-subtle">
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
                          <span className="text-[10px] text-slate-400">
                            12:30 PM · Enlace verificado ✓✓
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick copy buttons (cero sombras) */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.title, `title-${item.id}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-medium transition-colors cursor-pointer"
                    >
                      {copiedKey === `title-${item.id}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      Copiar Título
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.description, `desc-${item.id}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-medium transition-colors cursor-pointer"
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
        )}
      </main>
    </div>
  );
};
