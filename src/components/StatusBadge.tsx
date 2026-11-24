import React from 'react';
import { ReportStatus, TaskStatus } from '../types';

export function ReportStatusBadge({
  status,
  variant = 'default',
  className = '',
}: {
  status: ReportStatus;
  variant?: 'default' | 'admin';
  className?: string;
}) {
  const styles: Record<ReportStatus, { bg: string; label: string }> = {
    menunggu: {
      bg: 'bg-warning-container text-on-warning-container',
      label: variant === 'admin' ? 'Laporan Baru' : 'Menunggu',
    },
    diterima: {
      bg: 'bg-success-container text-on-success-container',
      label: 'Diterima',
    },
    diproses: {
      bg: 'bg-light-blue text-on-light-blue',
      label: 'Diproses',
    },
    selesai: {
      bg: 'bg-success-container text-on-success-container',
      label: 'Selesai',
    },
    ditolak: {
      bg: 'bg-danger-container text-on-danger-container',
      label: 'Ditolak',
    },
  };

  const config = styles[status];
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold leading-none whitespace-nowrap ${config.bg} ${className}`}
    >
      {config.label}
    </span>
  );
}

export function TaskStatusBadge({
  status,
  className = '',
}: {
  status: TaskStatus;
  className?: string;
}) {
  const styles: Record<TaskStatus, { bg: string; label: string }> = {
    menunggu: {
      bg: 'bg-warning-container text-on-warning-container',
      label: 'Menunggu',
    },
    dikerjakan: {
      bg: 'bg-light-blue text-on-light-blue',
      label: 'Dikerjakan',
    },
    selesai: {
      bg: 'bg-success-container text-on-success-container',
      label: 'Selesai',
    },
  };

  const config = styles[status];
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold leading-none whitespace-nowrap ${config.bg} ${className}`}
    >
      {config.label}
    </span>
  );
}
