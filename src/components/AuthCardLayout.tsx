import React from 'react';

interface AuthCardLayoutProps {
  imageAlt: string;
  imageMinHeightClass?: string;
  children: React.ReactNode;
}

const DEFAULT_AUTH_IMAGE =
  'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605709248-0-gemini_generated_image_vkzt4nvkzt4nvkzt.webp';

/** Cascarón dividido de 2 columnas para vistas de autenticación (Login, Registro y Recuperar contraseña). */
export const AuthCardLayout: React.FC<AuthCardLayoutProps> = ({
  imageAlt,
  imageMinHeightClass = 'min-h-[480px]',
  children,
}) => {
  return (
    <div className="min-h-[85vh] bg-slate-100 py-8 sm:py-14 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[1020px] bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 lg:p-8 border-0 shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* Columna izquierda: ilustración 3D en contenedor redondeado */}
          <div className={`hidden md:block relative rounded-[22px] overflow-hidden bg-slate-50 ${imageMinHeightClass}`}>
            <img
              src={DEFAULT_AUTH_IMAGE}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Columna derecha: formulario */}
          <div className="flex flex-col justify-center p-2 sm:p-5 lg:p-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
