import React, { useRef, useState, useCallback } from 'react';

interface MinimalMobileSliderProps {
  children: React.ReactNode;
  itemCount: number;
  /** Clases de grid para tablet/desktop (md en adelante) */
  desktopGridClassName: string;
  /** Clases de ancho/snap para cada slide en mobile */
  mobileItemClassName?: string;
  ariaLabel?: string;
}

/**
 * Slider horizontal minimalista para mobile (< md) con snap-scroll suave
 * e indicadores de puntos discretos; en tablet/desktop vuelve al grid normal.
 */
export const MinimalMobileSlider: React.FC<MinimalMobileSliderProps> = ({
  children,
  itemCount,
  desktopGridClassName,
  mobileItemClassName = 'w-[84%] sm:w-[66%] shrink-0 snap-start md:w-auto',
  ariaLabel = 'Carrusel',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || itemCount <= 1) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    if (!firstChild) return;

    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || '16') || 16;
    const step = firstChild.offsetWidth + gap;
    if (step <= 0) return;

    const idx = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(itemCount - 1, idx)));
  }, [itemCount]);

  const scrollToSlide = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;

    const paddingLeft = parseFloat(window.getComputedStyle(el).paddingLeft || '0') || 0;
    el.scrollTo({
      left: Math.max(0, child.offsetLeft - paddingLeft),
      behavior: 'smooth',
    });
  };

  const items = React.Children.toArray(children);

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="region"
        aria-label={ariaLabel}
        className={`flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 scroll-pl-4 gap-4 md:mx-0 md:px-0 md:scroll-pl-0 md:overflow-visible ${desktopGridClassName}`}
      >
        {items.map((child, idx) => (
          <div key={idx} className={mobileItemClassName}>
            {child}
          </div>
        ))}
      </div>

      {itemCount > 1 && (
        <div
          className="md:hidden mt-5 flex items-center justify-center gap-1.5"
          aria-label="Indicador de diapositivas"
        >
          {Array.from({ length: itemCount }).map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Ir al elemento ${idx + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-4 bg-slate-900'
                    : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
