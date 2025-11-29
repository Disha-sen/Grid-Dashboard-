import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  isActive: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ isActive }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        'transition-all duration-200',
        isActive
          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
          : 'bg-slate-100 text-slate-600 ring-1 ring-slate-300/50'
      )}
    >
      <span
        className={clsx(
          'w-1.5 h-1.5 rounded-full',
          isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
        )}
      />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

export default StatusBadge;