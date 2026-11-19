import React from 'react';
import { FileText, UploadCloud, X } from 'lucide-react';

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
  onSimulate?: () => void;
  onRemove: () => void;
}

export const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
  title,
  badge,
  fileState,
  onFileSelect,
  onSimulate,
  onRemove,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-1.5 text-left">
      {/* Encabezado con título y etiqueta */}
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-heading font-bold text-ink-900">
          {title}
        </label>
        <span className="text-[11px] font-heading font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
          {badge}
        </span>
      </div>

      {/* Tarjeta compacta: Subiendo / Completado vs Vacío (Idle) */}
      {fileState.status !== 'idle' ? (
        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-slate-500" strokeWidth={1.6} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2 min-w-0">
                <h4 className="text-sm font-heading font-semibold text-ink-800 truncate">
                  {fileState.name}
                </h4>
                <span className="text-[11px] font-sans text-slate-400 shrink-0">
                  {fileState.sizeStr}
                </span>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="w-6 h-6 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Eliminar o cancelar archivo"
                title="Eliminar archivo"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex items-center gap-2.5 mt-1.5">
              <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cta rounded-full transition-all duration-300"
                  style={{ width: `${fileState.progress}%` }}
                />
              </div>
              <span className="text-[11px] font-sans font-medium text-slate-400 shrink-0 select-none tabular-nums">
                {fileState.progress}%
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl border border-dashed border-slate-200 hover:border-slate-400 bg-white px-3 py-3 flex items-center gap-3 transition-colors group">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors pointer-events-none">
            <UploadCloud className="w-4 h-4 text-slate-500" strokeWidth={1.6} />
          </div>
          <div className="flex-1 min-w-0 pointer-events-none">
            <span className="block text-sm font-heading font-semibold text-ink-900 group-hover:text-cta transition-colors">
              Haz clic para seleccionar archivo
            </span>
            <span className="block text-[11px] font-sans text-slate-500">
              Imagen (máx. 10MB) o PDF (máx. 3MB)
            </span>
          </div>
          {onSimulate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSimulate();
              }}
              className="text-[11px] font-heading font-semibold text-cta hover:text-cta-700 bg-cta-50 hover:bg-cta-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer relative z-10 shrink-0"
            >
              Simular carga
            </button>
          )}
        </div>
      )}
    </div>
  );
};
