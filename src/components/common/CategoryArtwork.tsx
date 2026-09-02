import React from 'react';
import { CategoryId } from '../../types';
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Sparkles, 
  BedDouble, 
  Wifi, 
  ShieldAlert, 
  FileText,
  Key,
  AlertTriangle,
  Radio,
  Gavel,
  Trash2,
  Tv
} from 'lucide-react';

interface CategoryArtworkProps {
  category: CategoryId;
  size?: 'sm' | 'md' | 'lg';
}

export const CategoryArtwork: React.FC<CategoryArtworkProps> = ({ category, size = 'md' }) => {
  switch (category) {
    case 'equipment':
      return (
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-lg bg-[#1B4D5C]/15 border border-[#1B4D5C]/30 text-[#1B4D5C] flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          {size !== 'sm' && (
            <div className="hidden sm:flex items-center gap-1.5 opacity-80 text-[#1B4D5C]">
              <Tv className="w-4 h-4" />
            </div>
          )}
        </div>
      );

    case 'power':
      return (
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-lg bg-[#8E281F]/15 border border-[#8E281F]/30 text-[#8E281F] flex items-center justify-center">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          {size !== 'sm' && (
            <div className="hidden sm:flex items-center gap-1.5 opacity-80 text-[#8E281F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
          )}
        </div>
      );

    case 'water':
      return (
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-lg bg-[#D4613B]/15 border border-[#D4613B]/30 text-[#D4613B] flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
        </div>
      );

    case 'sanitation':
      return (
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-lg bg-[#843C65]/15 border border-[#843C65]/30 text-[#843C65] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          {size !== 'sm' && (
            <div className="hidden sm:flex items-center gap-1.5 opacity-80 text-[#843C65]">
              <Trash2 className="w-4 h-4" />
            </div>
          )}
        </div>
      );

    case 'housing':
      return (
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-lg bg-[#7B4F8A]/15 border border-[#7B4F8A]/30 text-[#7B4F8A] flex items-center justify-center">
            <BedDouble className="w-5 h-5" />
          </div>
          {size !== 'sm' && (
            <div className="hidden sm:flex items-center gap-1.5 opacity-80 text-[#7B4F8A]">
              <Key className="w-4 h-4" />
            </div>
          )}
        </div>
      );

    case 'network':
      return (
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-lg bg-[#6F8046]/15 border border-[#6F8046]/30 text-[#6F8046] flex items-center justify-center">
            <Wifi className="w-5 h-5" />
          </div>
          {size !== 'sm' && (
            <div className="hidden sm:flex items-center gap-1.5 opacity-80 text-[#6F8046]">
              <Radio className="w-4 h-4" />
            </div>
          )}
        </div>
      );

    case 'security':
      return (
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-lg bg-[#24345C]/15 border border-[#24345C]/30 text-[#24345C] flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      );

    case 'admin':
      return (
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-lg bg-[#B88220]/15 border border-[#B88220]/30 text-[#B88220] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          {size !== 'sm' && (
            <div className="hidden sm:flex items-center gap-1.5 opacity-80 text-[#B88220]">
              <Gavel className="w-4 h-4" />
            </div>
          )}
        </div>
      );

    default:
      return <FileText className="w-5 h-5" />;
  }
};
