import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Construction,
  Gauge,
  HardHat,
  MapPin,
  Package,
  Search,
  SlidersHorizontal,
  User,
  UserPlus,
  Wrench,
  XCircle,
} from 'lucide-react';
import { CATEGORY_STATS_BASE, TECHNICIANS } from '../data/mockData';
import { FacilityReport, ScreenId, TechnicianTask, UserProfile } from '../types';
import { ImageWithFallback } from '../components/FasTrackLogo';
import { ReportStatusBadge, TaskStatusBadge } from '../components/StatusBadge';

/* =========================================================
   9. ADMIN HOME
   ========================================================= */
interface AdminHomeProps {
  profile: UserProfile;
  reports: FacilityReport[];
  onNavigate: (screen: ScreenId, opts?: { reportId?: string; filter?: string }) => void;
}

export const AdminHome: React.FC<AdminHomeProps> = ({
  profile,
  reports,
  onNavigate,
}) => {
  const newReports = reports.filter((r) => r.status === 'menunggu');
  const processReports = reports.filter(
    (r) => r.status === 'diproses' || r.status === 'diterima'
  );
  const doneReports = reports.filter((r) => r.status === 'selesai');

  const latestIncoming = newReports[0] || reports[0];

  return (
    <div className="flex flex-col max-w-5xl w-full mx-auto">
      {/* Minimal Light Top Bar */}
      <header className="px-4 md:px-8 pt-6 pb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ImageWithFallback
            src={profile.avatarUrl}
            alt={`Foto profil ${profile.name}`}
            fallbackType="avatar"
            className="w-11 h-11 rounded-full object-cover border border-outline"
          />
          <div className="flex flex-col">
            <span className="text-[13px] text-on-surface-variant">Halo, Admin</span>
            <h1 className="font-title text-lg font-bold text-on-surface">{profile.name}</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('admin-reports', { filter: 'baru' })}
          aria-label="Laporan baru masuk"
          className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-surface-container border border-outline/70 text-on-surface shadow-sm hover:bg-surface-subtle transition-colors"
        >
          <Bell className="w-5 h-5" />
          {newReports.length > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-danger text-on-danger text-[10px] font-semibold flex items-center justify-center tabular-nums">
              {newReports.length}
            </span>
          )}
        </button>
      </header>

      <main className="flex-1 px-4 md:px-8 py-4 flex flex-col gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Dark Midnight-Navy Hero Card */}
          <button
            type="button"
            onClick={() => onNavigate('admin-reports', { filter: 'baru' })}
            className="lg:col-span-7 text-left bg-primary-navy text-on-primary-navy rounded-3xl p-5 md:p-6 shadow-md flex items-center justify-between gap-4 relative overflow-hidden hover:opacity-95 transition-opacity"
          >
            <div className="flex flex-col gap-1.5 relative z-10">
              <span className="text-[11px] font-semibold text-light-blue">
                Laporan Masuk Baru
              </span>
              <span className="font-display text-[32px] leading-[38px] font-bold text-on-primary-navy tabular-nums">
                {String(newReports.length + 12).padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-primary-navy">
                  Menunggu Verifikasi Dinas
                </span>
                <span className="text-[13px] text-light-blue">
                  {newReports.length} laporan prioritas hari ini
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between self-stretch shrink-0 relative z-10">
              <span className="w-12 h-12 rounded-full bg-surface-container/10 flex items-center justify-center text-light-blue">
                <ClipboardCheck className="w-6 h-6" />
              </span>
              <span className="w-9 h-9 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shadow-sm">
                <ArrowRight className="w-[18px] h-[18px]" />
              </span>
            </div>
          </button>

          {/* Soft Ice-Blue Overview Card */}
          <section
            aria-labelledby="admin-stats-title"
            className="lg:col-span-5 bg-light-blue/50 border border-light-blue rounded-3xl p-5 flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <h2
                id="admin-stats-title"
                className="font-title text-base font-semibold text-on-surface"
              >
                Ringkasan Operasional
              </h2>
              <span className="text-[11px] font-semibold text-on-light-blue px-2.5 py-1 rounded-full bg-surface-container/70">
                Nov 2026
              </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-primary/15">
              <div className="pr-2 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">Total</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {124 + reports.length}
                  </span>
                  <Package className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="px-2.5 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">Diproses</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {26 + processReports.length}
                  </span>
                  <HardHat className="w-4 h-4 text-warning" />
                </div>
              </div>

              <div className="pl-2.5 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">Selesai</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {80 + doneReports.length}
                  </span>
                  <BadgeCheck className="w-4 h-4 text-success" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Quick Actions Circle Row */}
        <section
          aria-labelledby="quick-actions-title"
          className="bg-surface-container border border-outline/60 rounded-3xl p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-3.5"
        >
          <h2 id="quick-actions-title" className="font-title text-base font-semibold text-on-surface">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => onNavigate('admin-reports', { filter: 'semua' })}
              className="flex flex-col items-center text-center gap-1.5 group min-h-[44px]"
            >
              <span className="w-12 h-12 rounded-full bg-light-blue text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <ClipboardCheck className="w-[22px] h-[22px]" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Tinjau</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('admin-assign', { reportId: latestIncoming?.id })}
              className="flex flex-col items-center text-center gap-1.5 group min-h-[44px]"
            >
              <span className="w-12 h-12 rounded-full bg-surface-subtle text-on-surface-variant flex items-center justify-center group-hover:bg-light-blue group-hover:text-primary transition-colors">
                <UserPlus className="w-[22px] h-[22px]" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Tugaskan</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('admin-statistics')}
              className="flex flex-col items-center text-center gap-1.5 group min-h-[44px]"
            >
              <span className="w-12 h-12 rounded-full bg-surface-subtle text-on-surface-variant flex items-center justify-center group-hover:bg-light-blue group-hover:text-primary transition-colors">
                <BarChart3 className="w-[22px] h-[22px]" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Statistik</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center text-center gap-1.5 group min-h-[44px]"
            >
              <span className="w-12 h-12 rounded-full bg-surface-subtle text-on-surface-variant flex items-center justify-center group-hover:bg-light-blue group-hover:text-primary transition-colors">
                <User className="w-[22px] h-[22px]" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Profil</span>
            </button>
          </div>
        </section>

        {/* Recent Incoming Bento Card */}
        {latestIncoming && (
          <section aria-labelledby="incoming-title" className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 id="incoming-title" className="font-title text-base font-semibold text-on-surface">
                Laporan Masuk Terbaru
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('admin-reports')}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Kelola Semua
              </button>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('admin-review', { reportId: latestIncoming.id })}
              className="relative rounded-3xl overflow-hidden h-44 md:h-52 shadow-md block text-left w-full group"
            >
              <ImageWithFallback
                src={latestIncoming.photoUrl}
                alt={latestIncoming.title}
                fallbackType={latestIncoming.photoType}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 via-primary-navy/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs text-light-blue">
                    {latestIncoming.id} •{' '}
                    {latestIncoming.status === 'menunggu' ? 'Baru' : latestIncoming.status}
                  </span>
                  <h3 className="font-title text-base font-semibold text-on-primary-navy">
                    {latestIncoming.title}
                  </h3>
                  <span className="text-[13px] text-light-blue">
                    {latestIncoming.reporterName} • {latestIncoming.location.split(',')[0]}
                  </span>
                </div>
                <span className="w-9 h-9 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-[18px] h-[18px]" />
                </span>
              </div>
            </button>
          </section>
        )}
      </main>
    </div>
  );
};

/* =========================================================
   10. ADMIN REPORT MANAGEMENT
   ========================================================= */
interface AdminReportManagementProps {
  reports: FacilityReport[];
  initialFilter?: string;
  onNavigate: (screen: ScreenId, opts?: { reportId?: string }) => void;
}

export const AdminReportManagementScreen: React.FC<AdminReportManagementProps> = ({
  reports,
  initialFilter = 'semua',
  onNavigate,
}) => {
  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState('');

  const filtered = reports.filter((r) => {
    const matchStatus =
      filter === 'semua' ||
      (filter === 'baru'
        ? r.status === 'menunggu' || r.status === 'diterima'
        : r.status === filter);
    const q = search.trim().toLowerCase();
    const matchQuery =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.reporterName.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  return (
    <div className="flex flex-col min-h-full">
      <header className="bg-primary-navy text-on-primary-navy px-4 md:px-8 pt-5 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('admin-home')}
              aria-label="Kembali ke Beranda Admin"
              className="w-10 h-10 rounded-full bg-surface-container/15 text-on-primary-navy flex items-center justify-center hover:bg-surface-container/25 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 rounded-full bg-surface-container/15 text-on-primary-navy text-[11px] font-semibold">
              Admin Dinas
            </span>
          </div>

          <h1 className="font-headline text-2xl font-bold text-on-primary-navy">Kelola Laporan</h1>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-on-surface-variant absolute left-3.5 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari ID, pelapor, atau lokasi..."
                className="w-full min-h-[44px] pl-10 pr-4 rounded-full bg-surface-container border-0 text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setFilter('semua');
                setSearch('');
              }}
              aria-label="Reset filter"
              className="w-11 h-11 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shrink-0 shadow-sm hover:bg-light-blue transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="-mt-4 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-5 pb-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'semua', label: 'Semua' },
              { id: 'baru', label: 'Laporan Baru' },
              { id: 'diproses', label: 'Diproses' },
              { id: 'selesai', label: 'Selesai' },
              ...(reports.some((r) => r.status === 'ditolak')
                ? [{ id: 'ditolak', label: 'Ditolak' }]
                : []),
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  filter === chip.id
                    ? 'bg-primary-navy text-on-primary-navy'
                    : 'bg-surface-container border border-outline/70 text-on-surface-variant hover:bg-surface-subtle'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((rep) => (
              <article
                key={rep.id}
                className="bg-surface-container border border-outline/70 rounded-3xl p-4 md:p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between gap-3"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-primary">{rep.id}</span>
                    <ReportStatusBadge status={rep.status} variant="admin" />
                  </div>
                  <h2 className="font-title text-base font-semibold text-on-surface">
                    {rep.title}
                  </h2>
                  <div className="flex flex-col gap-1 text-[13px] text-on-surface-variant">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="w-4 h-4 shrink-0" /> {rep.reporterName} • {rep.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 shrink-0" /> {rep.location}
                    </span>
                  </div>
                </div>

                <footer className="pt-3 border-t border-outline/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-on-surface-variant tabular-nums">
                    {rep.dateLabel}
                  </span>
                  {rep.status === 'diproses' || rep.status === 'diterima' ? (
                    <button
                      type="button"
                      onClick={() => onNavigate('admin-assign', { reportId: rep.id })}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-light-blue text-on-light-blue text-xs font-semibold hover:bg-primary hover:text-on-primary transition-colors"
                    >
                      <span>Penugasan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate('admin-review', { reportId: rep.id })}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-navy text-on-primary-navy text-xs font-semibold hover:bg-primary transition-colors"
                    >
                      <span>Tinjau</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </footer>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

/* =========================================================
   11. ADMIN REVIEW REPORT
   ========================================================= */
interface AdminReviewReportProps {
  report: FacilityReport;
  onBack: () => void;
  onApprove: (reportId: string) => void;
  onReject: (reportId: string, reason: string) => void;
}

export const AdminReviewReportScreen: React.FC<AdminReviewReportProps> = ({
  report,
  onBack,
  onApprove,
  onReject,
}) => {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState('');

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onReject(report.id, reason.trim());
    setRejectOpen(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <ImageWithFallback
          src={report.photoUrl}
          alt={report.title}
          fallbackType={report.photoType}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-on-surface/35 via-transparent to-on-surface/25" />
        <div className="absolute top-4 inset-x-4 md:inset-x-8 flex items-center justify-between max-w-4xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            aria-label="Kembali ke Kelola Laporan"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container/95 text-on-surface shadow-md hover:bg-surface-container transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span
            className={`px-3 py-1 rounded-full shadow-md text-[11px] font-semibold ${
              report.status === 'ditolak'
                ? 'bg-danger-container text-on-danger-container'
                : report.status === 'selesai'
                ? 'bg-success-container text-on-success-container'
                : report.status === 'diproses'
                ? 'bg-light-blue text-on-light-blue'
                : 'bg-warning-container text-on-warning-container'
            }`}
          >
            {report.status === 'menunggu'
              ? 'Menunggu Tinjauan'
              : report.status === 'diterima'
              ? 'Diterima'
              : report.status === 'diproses'
              ? 'Diproses'
              : report.status === 'selesai'
              ? 'Selesai'
              : 'Ditolak'}
          </span>
        </div>
      </div>

      <main className="-mt-6 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-6 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <section className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-primary">{report.id}</span>
              <span className="text-[13px] text-on-surface-variant tabular-nums">
                {report.dateLabel}
              </span>
            </div>
            <h1 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
              {report.title}
            </h1>
            <div className="flex items-center gap-1.5 text-[13px] text-on-surface-variant pt-1">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{report.location}</span>
            </div>
          </section>

          {/* 4-Column Circular Attribute Row */}
          <section className="grid grid-cols-4 gap-2 text-center py-1">
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <Construction className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant line-clamp-1">
                {report.category.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <User className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant line-clamp-1">
                {report.reporterName.split(' ')[0]} {report.reporterName.split(' ')[1]?.[0] || ''}.
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant">
                {report.priority}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <Camera className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant">1 Foto</span>
            </div>
          </section>

          {/* Reporter Info Card */}
          <section className="bg-light-blue/50 border border-light-blue rounded-3xl p-4 flex items-center gap-3.5">
            <ImageWithFallback
              src={report.reporterAvatar}
              alt={`Foto pelapor ${report.reporterName}`}
              fallbackType="avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-surface-container shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-on-light-blue">
                Pelapor Terverifikasi
              </span>
              <span className="font-title text-base font-semibold text-primary-navy">
                {report.reporterName}
              </span>
              <span className="text-[13px] text-on-light-blue tabular-nums">
                {report.reporterPhone}
              </span>
            </div>
          </section>

          <section className="flex flex-col gap-1.5">
            <h2 className="font-title text-base font-semibold text-on-surface">
              Deskripsi Kerusakan
            </h2>
            <p className="text-sm text-on-surface-variant text-pretty leading-relaxed">
              {report.description}
            </p>
          </section>

          {report.rejectionReason && (
            <section className="rounded-2xl bg-danger-container border border-danger/20 p-4 flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-danger-container">
                Alasan Penolakan
              </span>
              <p className="text-sm text-on-danger-container">{report.rejectionReason}</p>
            </section>
          )}

          {/* Decision Actions */}
          {report.status !== 'ditolak' && report.status !== 'selesai' && (
            <section className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setRejectOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-4 rounded-[14px] bg-danger text-on-danger text-sm font-semibold hover:opacity-90 shadow-sm transition-opacity"
              >
                <XCircle className="w-5 h-5" />
                <span>Tolak Laporan</span>
              </button>

              <button
                type="button"
                onClick={() => onApprove(report.id)}
                className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-4 rounded-[14px] bg-success text-on-success text-sm font-semibold hover:opacity-90 shadow-sm transition-opacity"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Terima Laporan</span>
              </button>
            </section>
          )}
        </div>
      </main>

      {/* Rejection Bottom Sheet */}
      {rejectOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
          <form
            onSubmit={handleConfirmReject}
            className="bg-surface-container rounded-t-3xl md:rounded-3xl p-6 w-full max-w-md shadow-xl flex flex-col gap-3.5"
          >
            <div className="w-10 h-1 rounded-full bg-outline-strong mx-auto md:hidden" />
            <h3 className="font-title text-lg font-bold text-on-surface">
              Alasan Penolakan Laporan
            </h3>
            <p className="text-[13px] text-on-surface-variant">
              Berikan alasan yang jelas agar warga memahami keputusan penolakan.
            </p>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">
                Alasan Penolakan (Wajib)
              </span>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="Contoh: Lokasi berada di luar wilayah wewenang atau foto tidak jelas."
                className="w-full p-3 rounded-[14px] border border-outline text-sm focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </label>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setRejectOpen(false)}
                className="min-h-[48px] rounded-[14px] border border-outline text-xs font-semibold hover:bg-surface-subtle"
              >
                Batal
              </button>
              <button
                type="submit"
                className="min-h-[48px] rounded-[14px] bg-danger text-on-danger text-xs font-semibold hover:opacity-90"
              >
                Kirim Penolakan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   12. ADMIN ASSIGN TECHNICIAN
   ========================================================= */
interface AdminAssignProps {
  reports: FacilityReport[];
  tasks: TechnicianTask[];
  selectedReportId?: string;
  onBack: () => void;
  onAssignTechnician: (payload: {
    reportId: string;
    techId: string;
    note: string;
  }) => string;
}

export const AdminAssignTechnicianScreen: React.FC<AdminAssignProps> = ({
  reports,
  tasks,
  selectedReportId,
  onBack,
  onAssignTechnician,
}) => {
  const assignableReports = reports.filter((r) => r.status !== 'ditolak');
  const defaultReport =
    assignableReports.find((r) => r.id === selectedReportId) ||
    assignableReports[0] ||
    reports[0];

  const [reportId, setReportId] = useState(defaultReport?.id || '');
  const [techId, setTechId] = useState(TECHNICIANS[0].id);
  const [note, setNote] = useState(
    'Prioritaskan penambalan aspal sebelum jam pulang sekolah pukul 13.00 WIB.'
  );
  const [assignedSuccess, setAssignedSuccess] = useState<string | null>(null);

  const activeReport = reports.find((r) => r.id === reportId) || defaultReport;
  const activeTech = TECHNICIANS.find((t) => t.id === techId) || TECHNICIANS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReport) return;
    onAssignTechnician({
      reportId: activeReport.id,
      techId: activeTech.id,
      note: note.trim(),
    });
    setAssignedSuccess(`Tugas berhasil dikirim ke ${activeTech.name}!`);
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="bg-primary-navy text-on-primary-navy px-4 md:px-8 pt-5 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              aria-label="Kembali ke Beranda Admin"
              className="w-10 h-10 rounded-full bg-surface-container/15 text-on-primary-navy flex items-center justify-center hover:bg-surface-container/25 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 rounded-full bg-success-container text-on-success-container text-[11px] font-semibold">
              Diterima
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-xs text-light-blue">{activeReport?.id}</span>
            <h1 className="font-headline text-2xl font-bold text-on-primary-navy">
              Tugaskan Teknisi
            </h1>
          </div>
        </div>
      </header>

      <main className="-mt-4 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-5 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {/* Report Selector / Summary */}
          <section className="bg-surface-container border border-outline/70 rounded-3xl p-4 md:p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-on-surface-variant">
                Laporan Terpilih
              </span>
              {assignableReports.length > 1 && (
                <select
                  value={reportId}
                  onChange={(e) => {
                    setReportId(e.target.value);
                    setAssignedSuccess(null);
                  }}
                  aria-label="Pilih laporan"
                  className="text-xs font-mono font-semibold text-primary bg-light-blue/50 border border-light-blue rounded-full px-3 py-1 focus:outline-none"
                >
                  {assignableReports.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id} — {r.title.slice(0, 26)}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <h2 className="font-title text-base font-semibold text-on-surface">
              {activeReport?.title}
            </h2>
            <p className="text-[13px] text-on-surface-variant">
              {activeReport?.location} • {activeReport?.category}
            </p>
          </section>

          {/* Assign Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-surface-container border border-outline/70 rounded-3xl p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">
                Pilih Teknisi Lapangan
              </span>
              <select
                value={techId}
                onChange={(e) => {
                  setTechId(e.target.value);
                  setAssignedSuccess(null);
                }}
                className="w-full min-h-[48px] px-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              >
                {TECHNICIANS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.isBusy ? 'Sibuk' : 'Tersedia'}
                  </option>
                ))}
              </select>
            </label>

            {/* Technician Availability Card */}
            <div className="rounded-3xl bg-light-blue/50 border border-light-blue p-3.5 flex items-center gap-3">
              <ImageWithFallback
                src={activeTech.avatarUrl}
                alt={`Foto teknisi ${activeTech.name}`}
                fallbackType="avatar"
                className="w-11 h-11 rounded-full object-cover border-2 border-surface-container shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-primary-navy">
                  {activeTech.name}
                </span>
                <span className="text-[13px] text-on-light-blue">
                  {activeTech.availability}
                </span>
              </div>
            </div>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Catatan Penugasan</span>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Instruksi khusus untuk teknisi..."
                className="w-full p-3 rounded-[14px] border border-outline text-sm focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </label>

            {/* Pill CTA Bar */}
            <button
              type="submit"
              className="flex items-center justify-between w-full min-h-[52px] pl-6 pr-1.5 rounded-full bg-primary-navy text-on-primary-navy text-sm font-semibold hover:bg-primary shadow-md transition-colors"
            >
              <span>Tugaskan Sekarang</span>
              <span className="w-10 h-10 rounded-full bg-surface-container text-primary-navy flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>

            {assignedSuccess && (
              <div className="rounded-2xl bg-success-container text-on-success-container p-3.5 text-[13px] font-semibold">
                {assignedSuccess}
              </div>
            )}
          </form>

          {/* Previously Assigned Tasks */}
          <section className="flex flex-col gap-3">
            <h3 className="font-title text-base font-semibold text-on-surface">
              Riwayat Penugasan Sebelumnya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-surface-container border border-outline/70 rounded-3xl p-4 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-primary">
                      {task.id} • {task.reportId}
                    </span>
                    <TaskStatusBadge status={task.status} />
                  </div>
                  <p className="font-title text-base font-semibold text-on-surface">
                    {task.title}
                  </p>
                  <p className="text-[13px] text-on-surface-variant">
                    Teknisi: Andi Pratama • {task.dateLabel}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* =========================================================
   13. ADMIN STATISTICS
   ========================================================= */
interface AdminStatisticsProps {
  reports: FacilityReport[];
  onBack: () => void;
}

export const AdminStatisticsScreen: React.FC<AdminStatisticsProps> = ({
  reports,
  onBack,
}) => {
  const totalLive = 124 + reports.length;
  const doneLive = 80 + reports.filter((r) => r.status === 'selesai').length;
  const rejectedLive = 6 + reports.filter((r) => r.status === 'ditolak').length;
  const processLive = Math.max(0, totalLive - doneLive - rejectedLive);

  const categoryRows = CATEGORY_STATS_BASE.map((base) => {
    const extra = reports.filter((r) => {
      if (base.label === 'Fasilitas Pendidikan & Kesehatan') {
        return r.category === 'Fasilitas Pendidikan' || r.category === 'Fasilitas Kesehatan';
      }
      return r.category === base.label;
    }).length;
    const count = base.count + extra;
    const pct = Math.round((count / totalLive) * 100);
    return { ...base, count, pct };
  });

  return (
    <div className="flex flex-col min-h-full">
      <header className="bg-primary-navy text-on-primary-navy px-4 md:px-8 pt-5 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              aria-label="Kembali ke Beranda Admin"
              className="w-10 h-10 rounded-full bg-surface-container/15 text-on-primary-navy flex items-center justify-center hover:bg-surface-container/25 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 rounded-full bg-surface-container/15 text-on-primary-navy text-[11px] font-semibold">
              Nov 2026
            </span>
          </div>
          <h1 className="font-headline text-2xl font-bold text-on-primary-navy">
            Statistik Laporan
          </h1>
        </div>
      </header>

      <main className="-mt-4 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-5 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {/* KPI Summary */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
            <div className="bg-surface-container border border-outline/70 rounded-3xl p-4 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-light-blue text-on-light-blue flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xl font-bold text-primary-navy tabular-nums">
                  {totalLive}
                </span>
                <span className="text-[13px] text-on-surface-variant">Total</span>
              </div>
            </div>

            <div className="bg-surface-container border border-outline/70 rounded-3xl p-4 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success-container text-on-success-container flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xl font-bold text-success tabular-nums">
                  {doneLive}
                </span>
                <span className="text-[13px] text-on-surface-variant">Selesai</span>
              </div>
            </div>

            <div className="bg-surface-container border border-outline/70 rounded-3xl p-4 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning-container text-on-warning-container flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xl font-bold text-on-warning-container tabular-nums">
                  {processLive}
                </span>
                <span className="text-[13px] text-on-surface-variant">Diproses</span>
              </div>
            </div>

            <div className="bg-surface-container border border-outline/70 rounded-3xl p-4 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-danger-container text-on-danger-container flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xl font-bold text-danger tabular-nums">
                  {rejectedLive}
                </span>
                <span className="text-[13px] text-on-surface-variant">Ditolak</span>
              </div>
            </div>
          </section>

          {/* Average Resolution Time */}
          <section className="bg-light-blue/50 border border-light-blue rounded-3xl p-5 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] text-on-light-blue">
                Rata-rata Waktu Penyelesaian
              </span>
              <span className="font-headline text-2xl font-bold text-primary-navy tabular-nums">
                2,4 Hari
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shadow-sm">
              <Gauge className="w-[22px] h-[22px]" />
            </div>
          </section>

          {/* Reports by Category */}
          <section className="bg-surface-container border border-outline/70 rounded-3xl p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-4">
            <h2 className="font-title text-base font-semibold text-on-surface">
              Laporan Berdasarkan Kategori
            </h2>

            <div className="flex flex-col gap-3.5">
              {categoryRows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="font-semibold text-on-surface">{row.label}</span>
                    <span className="tabular-nums text-on-surface-variant">
                      {row.count} ({row.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-subtle overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${row.colorClass}`}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
