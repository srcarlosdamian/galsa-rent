import React from 'react';

interface StepFeatureCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: string | number }>;
  aspectClassName?: string;
  className?: string;
}

/** Tarjeta de paso con imagen 16:10 / 4:3 y badge cuadrado flotante azul en esquina inferior izquierda. */
export const StepFeatureCard: React.FC<StepFeatureCardProps> = ({
  title,
  description,
  image,
  icon: Icon,
  aspectClassName = 'aspect-[16/10] sm:aspect-[4/3]',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className={`relative w-full ${aspectClassName} rounded-2xl overflow-visible bg-slate-100 mb-6`}>
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Badge cuadrado flotante con fondo azul 100 e icono azul 900 */}
        <div className="absolute -bottom-3 left-3 w-12 h-12 bg-cta-100 rounded-xl flex items-center justify-center z-10">
          <Icon className="w-5 h-5 text-cta-900" strokeWidth={1.4} />
        </div>
      </div>

      <div className="pt-2 flex flex-col items-start text-left">
        <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 mb-1.5 leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
