import React from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, User } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blog';

interface BlogPageProps {
  onNavigate?: (path: string) => void;
  selectedSlug?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, selectedSlug }) => {
  const currentPost = selectedSlug ? BLOG_POSTS.find((p) => p.slug === selectedSlug) : null;

  const handleLink = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // VISTA ARTÍCULO INDIVIDUAL
  if (currentPost) {
    return (
      <div className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-heading font-medium text-slate-500 mb-6">
            <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-black transition-colors">
              Inicio
            </a>
            <span>/</span>
            <a href="/blog" onClick={(e) => handleLink(e, '/blog')} className="hover:text-black transition-colors">
              Blog
            </a>
            <span>/</span>
            <span className="text-slate-900 truncate">{currentPost.category}</span>
          </div>

          {/* Post Header */}
          <header className="mb-8 text-left space-y-4">
            <span className="inline-block text-xs font-heading font-semibold text-[#3D63FF] bg-[#3D63FF]/10 px-3 py-1 rounded-full">
              {currentPost.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
              {currentPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-slate-500 pt-2 border-b border-neutral-100 pb-6">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.4} />
                <span>{currentPost.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.4} />
                <span>{currentPost.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.4} />
                <span>{currentPost.readTime}</span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="w-full aspect-[16/9] rounded-[24px] overflow-hidden mb-10 shadow-sm bg-slate-100">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Article Body */}
          <article className="prose max-w-none text-left space-y-6 text-slate-700 font-sans text-base sm:text-lg leading-relaxed">
            {currentPost.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </article>

          {/* CTA Box */}
          <div className="mt-12 p-8 rounded-[24px] bg-[#94BDC9]/25 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div>
              <h3 className="text-xl font-heading font-semibold text-slate-900 mb-1">
                ¿Planeando tu próximo viaje en México?
              </h3>
              <p className="text-sm font-sans text-slate-600">
                Reserva tu vehículo en línea en 4 minutos con kilometraje libre y contrato digital respaldado.
              </p>
            </div>
            <a
              href="/catalogo"
              onClick={(e) => handleLink(e, '/catalogo')}
              style={{ backgroundColor: '#3D63FF' }}
              className="inline-flex items-center justify-center text-white font-heading font-semibold text-sm px-6 py-3.5 rounded-xl hover:opacity-95 transition-all shrink-0 active:scale-95"
            >
              <span>Ver catálogo</span>
            </a>
          </div>

          {/* Volver al blog */}
          <div className="mt-8 text-left">
            <a
              href="/blog"
              onClick={(e) => handleLink(e, '/blog')}
              className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-slate-900 hover:text-[#3D63FF] transition-colors"
            >
              <span>← Volver a todos los artículos</span>
            </a>
          </div>

        </div>
      </div>
    );
  }

  // VISTA LISTADO DE BLOG
  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-[#3D63FF] mb-2 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" strokeWidth={1.4} />
            <span>Blog GALSA Rent</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Consejos de movilidad, rutas y anfitriones
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Guías prácticas, destinos en México y novedades para sacar el máximo provecho a tu experiencia de renta.
          </p>
        </div>

        {/* Grid de Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col bg-white rounded-[24px] overflow-hidden border border-neutral-200/80 hover:border-neutral-300 transition-all duration-300 group"
            >
              <a
                href={`/blog/${post.slug}`}
                onClick={(e) => handleLink(e, `/blog/${post.slug}`)}
                className="block relative aspect-[16/10] overflow-hidden bg-slate-100"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 text-[11px] font-heading font-semibold text-slate-900 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
                  {post.category}
                </span>
              </a>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-heading font-semibold text-slate-900 group-hover:text-[#3D63FF] transition-colors leading-snug">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => handleLink(e, `/blog/${post.slug}`)}
                    >
                      {post.title}
                    </a>
                  </h2>

                  <p className="text-sm font-sans text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => handleLink(e, `/blog/${post.slug}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-slate-900 group-hover:text-[#3D63FF] transition-colors"
                  >
                    <span>Leer artículo completo</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.4} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
