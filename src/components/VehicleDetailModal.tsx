import React from 'react';
import { Vehicle } from '../types/vehicle';
import { VehicleDetailView } from './VehicleDetailView';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ vehicle, onClose, onNavigate }) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="min-h-screen px-2 sm:px-4 py-6 md:py-10 flex items-center justify-center">
        <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-float overflow-hidden border border-neutral-200 text-neutral-900 animate-in zoom-in-95 duration-200 p-6 sm:p-8">
          <VehicleDetailView
            vehicle={vehicle}
            onClose={onClose}
            onNavigate={onNavigate}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};
