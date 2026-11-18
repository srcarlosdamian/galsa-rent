import React from 'react';
import { UploadCloud, X } from 'lucide-react';

export interface DocUploadState {
  name: string;
  sizeStr: string;
  progress: number;
  status: 'idle' | 'uploading' | 'completed';
}

interface DocumentUploadCardProps {
  title: string;
  badge: string;
  fileState: DocUploadState;
  onFileSelect?: (file: File) => void;
  onRemove: () => void;
}

export const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
  title,
  badge,
  fileState,
  onFileSelect,
  onRemove,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2 text-left">
      {/* Encabezado con título y etiqueta */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-heading font-bold text-slate-900">
          {title}
        </label>
        <span className="text-[11px] font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
          {badge}
        </span>
      </div>

      {/* Tarjeta de estado: Subiendo / Completado vs Vacío (Idle) */}
      {fileState.status !== 'idle' ? (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 shadow-none">
          {/* Icono: contenedor gris claro 100 sin línea */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="currentColor" />
              <path d="M14 2v6h6" fill="#bfdbfe" />
            </svg>
          </div>

          {/* Información del archivo y barra de progreso */}
          <div className="flex-1 min-w-0">
            {/* Fila superior: Nombre de archivo + Botón X alineado arriba a la derecha */}
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base font-heading font-bold text-slate-800 truncate">
                {fileState.name}
              </h4>
              <button
                type="button"
                onClick={onRemove}
                className="w-7 h-7 -mr-1 -mt-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Eliminar o cancelar archivo"
                title="Eliminar archivo"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Fila intermedia: Tamaño en MB */}
            <p className="text-xs sm:text-sm font-sans text-slate-400 mt-0.5 mb-2.5">
              {fileState.sizeStr}
            </p>

            {/* Fila inferior: Barra horizontal de progreso + porcentaje 79% */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${fileState.progress}%` }}
                />
              </div>
              <span className="text-xs font-sans font-medium text-slate-400 shrink-0">
                {fileState.progress}%
              </span>
            </div>
          </div>
        </div>
      ) : (
        <label className="rounded-2xl border border-dashed border-slate-200 hover:border-slate-400 bg-white p-5 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group shadow-none">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center mb-2.5 group-hover:bg-slate-200 transition-colors">
            <UploadCloud className="w-5 h-5 text-slate-600" />
          </div>
          <span className="text-sm font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Haz clic para seleccionar archivo
          </span>
          <span className="text-xs font-sans text-slate-500 mt-0.5">
            Imagen (máx. 10MB) o PDF (máx. 3MB)
          </span>
        </label>
      )}
    </div>
  );
};
