import React from 'react';
import { ComplaintStatus } from '../../types';

interface StampBadgeProps {
  status?: ComplaintStatus;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  isAnimated?: boolean;
  className?: string;
  variant?: 'status' | 'category' | 'priority' | 'admit';
}

export const StampBadge: React.FC<StampBadgeProps> = ({
  status,
  label,
  size = 'md',
  isAnimated = false,
  className = '',
  variant = 'status',
}) => {
  let text = label;
  let colorClasses = 'border-amber-600 text-amber-700 bg-amber-500/10';

  if (status) {
    switch (status) {
      case 'pending':
        text = text || 'PENDING';
        colorClasses = 'border-[#C97C1F] text-[#C97C1F] bg-[#C97C1F]/10';
        break;
      case 'in_review':
        text = text || 'IN REVIEW';
        colorClasses = 'border-[#3E6E9E] text-[#3E6E9E] bg-[#3E6E9E]/10';
        break;
      case 'resolved':
        text = text || 'RESOLVED';
        colorClasses = 'border-[#4C7A4A] text-[#4C7A4A] bg-[#4C7A4A]/10';
        break;
      case 'escalated':
        text = text || 'ESCALATED';
        colorClasses = 'border-[#B3452F] text-[#B3452F] bg-[#B3452F]/15';
        break;
    }
  } else if (variant === 'priority') {
    colorClasses = 'border-red-700 text-red-700 bg-red-700/10';
  } else if (variant === 'admit') {
    colorClasses = 'border-navy text-navy bg-navy/5';
  } else {
    colorClasses = 'border-brass text-brass-dark bg-brass/10';
  }

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 border-[1.5px] tracking-wider',
    md: 'text-xs px-2.5 py-1 border-[2px] tracking-widest',
    lg: 'text-base md:text-lg px-4 py-1.5 border-[3px] tracking-widest font-bold',
  }[size];

  return (
    <span
      className={`
        inline-flex items-center justify-center font-ticket uppercase select-none
        border-dashed rounded transition-transform duration-200
        ${sizeClasses}
        ${colorClasses}
        ${isAnimated ? 'rubber-stamp-animation' : 'transform -rotate-2 hover:rotate-0'}
        ${className}
      `}
      style={{
        textShadow: '0 0 0.5px currentColor',
        boxShadow: 'inset 0 0 0 1px currentColor, 0 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      {text}
    </span>
  );
};
