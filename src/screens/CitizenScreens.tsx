import React, { useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Camera,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  Construction,
  Droplets,
  Flag,
  HardHat,
  History,
  Image as ImageIcon,
  Lightbulb,
  MapPin,
  Plus,
  Search,
  SlidersHorizontal,
  Upload,
  Wrench,
  XCircle,
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';
import { FacilityReport, ScreenId, UserProfile } from '../types';
import { ImageWithFallback } from '../components/FasTrackLogo';
import { ReportStatusBadge } from '../components/StatusBadge';

/* =========================================================
   4. CITIZEN HOME
   ========================================================= */
interface CitizenHomeProps {
  profile: UserProfile;
  reports: FacilityReport[];
  onNavigate: (screen: ScreenId, opts?: { reportId?: string; filter?: string }) => void;
}

export const CitizenHome: React.FC<CitizenHomeProps> = ({
  profile,
  reports,
  onNavigate,
}) => {
  const [notifOpen, setNotifOpen] = useState(false);

  const waitingCount = reports.filter((r) => r.status === 'menunggu').length;
  const processCount = reports.filter(
    (r) => r.status === 'diproses' || r.status === 'diterima'
  ).length;
  const doneCount = reports.filter((r) => r.status === 'selesai').length;
  const activeCount = waitingCount + processCount;

  const featuredActive =
    reports.find((r) => r.status === 'diproses') ||
    reports.find((r) => r.status === 'menunggu') ||
    reports[0];

  const latestReport = reports[0];

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
            <span className="text-[13px] text-on-surface-variant">Selamat Pagi,</span>
            <h1 className="font-title text-lg font-bold text-on-surface">{profile.name}</h1>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((prev) => !prev)}
            aria-label="Notifikasi"
            className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-surface-container border border-outline/70 text-on-surface shadow-sm hover:bg-surface-subtle transition-colors"
          >
            <Bell className="w-5 h-5" />
            {activeCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-surface-container border border-outline rounded-2xl shadow-xl p-4 z-40 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-title text-sm font-bold text-on-surface">
                  Pembaruan Laporan
                </span>
                <button
                  type="button"
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Tutup
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {reports.slice(0, 3).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setNotifOpen(false);
                      onNavigate('report-detail', { reportId: r.id });
                    }}
                    className="text-left p-2.5 rounded-xl bg-surface hover:bg-surface-subtle transition-colors flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-primary">{r.id}</span>
                      <ReportStatusBadge status={r.status} />
                    </div>
                    <span className="text-xs font-semibold text-on-surface line-clamp-1">
                      {r.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-4 flex flex-col gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Dark Midnight-Navy Hero Card */}
          {featuredActive && (
            <button
              type="button"
              onClick={() => onNavigate('report-detail', { reportId: featuredActive.id })}
              className="lg:col-span-7 text-left bg-primary-navy text-on-primary-navy rounded-3xl p-5 md:p-6 shadow-md flex items-center justify-between gap-4 relative overflow-hidden hover:opacity-95 transition-opacity"
            >
              <div className="flex flex-col gap-1.5 relative z-10">
                <span className="text-[11px] font-semibold text-light-blue">
                  Laporan Aktif Anda
                </span>
                <span className="font-display text-[32px] leading-[38px] font-bold text-on-primary-navy tabular-nums">
                  {String(activeCount).padStart(2, '0')}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-primary-navy">
                    {featuredActive.title}
                  </span>
                  <span className="text-[13px] text-light-blue tabular-nums">
                    {featuredActive.assignedTechName
                      ? `Ditangani ${featuredActive.assignedTechName.split(' ')[0]} • ${
                          featuredActive.estimatedTime || 'Aktif'
                        }`
                      : `${featuredActive.location} • ${featuredActive.shortDate}`}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between self-stretch shrink-0 relative z-10">
                <span className="w-12 h-12 rounded-full bg-surface-container/10 flex items-center justify-center text-light-blue">
                  <HardHat className="w-6 h-6" />
                </span>
                <span className="w-9 h-9 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shadow-sm">
                  <ArrowRight className="w-[18px] h-[18px]" />
                </span>
              </div>
            </button>
          )}

          {/* Soft Ice-Blue Overview Card */}
          <section
            aria-labelledby="overview-title"
            className="lg:col-span-5 bg-light-blue/50 border border-light-blue rounded-3xl p-5 flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <h2 id="overview-title" className="font-title text-base font-semibold text-on-surface">
                Ringkasan Laporan
              </h2>
              <span className="text-[11px] font-semibold text-on-light-blue px-2.5 py-1 rounded-full bg-surface-container/70">
                Bulan Ini
              </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-primary/15">
              <div className="pr-2 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">Menunggu</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {waitingCount}
                  </span>
                  <Clock className="w-4 h-4 text-warning" />
                </div>
              </div>

              <div className="px-2.5 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">Diproses</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {processCount}
                  </span>
                  <Wrench className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="pl-2.5 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">Selesai</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {doneCount + 2}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Quick Access White Card */}
        <section
          aria-labelledby="quick-title"
          className="bg-surface-container border border-outline/60 rounded-3xl p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-3.5"
        >
          <h2 id="quick-title" className="font-title text-base font-semibold text-on-surface">
            Akses Cepat
          </h2>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => onNavigate('create-report')}
              className="flex flex-col items-center text-center gap-1.5 group min-h-[44px]"
            >
              <span className="w-12 h-12 rounded-full bg-light-blue text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <Camera className="w-[22px] h-[22px]" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Buat</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('my-reports', { filter: 'semua' })}
              className="flex flex-col items-center text-center gap-1.5 group min-h-[44px]"
            >
              <span className="w-12 h-12 rounded-full bg-surface-subtle text-on-surface-variant flex items-center justify-center group-hover:bg-light-blue group-hover:text-primary transition-colors">
                <ClipboardList className="w-[22px] h-[22px]" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Laporan</span>
            </button>

            <button
              type="button"
              onClick={() =>
                latestReport && onNavigate('report-detail', { reportId: latestReport.id })
              }
              className="flex flex-col items-center text-center gap-1.5 group min-h-[44px]"
            >
              <span className="w-12 h-12 rounded-full bg-surface-subtle text-on-surface-variant flex items-center justify-center group-hover:bg-light-blue group-hover:text-primary transition-colors">
                <MapPin className="w-[22px] h-[22px]" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Lacak</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('my-reports', { filter: 'selesai' })}
              className="flex flex-col items-center text-center gap-1.5 group min-h-[44px]"
            >
              <span className="w-12 h-12 rounded-full bg-surface-subtle text-on-surface-variant flex items-center justify-center group-hover:bg-light-blue group-hover:text-primary transition-colors">
                <History className="w-[22px] h-[22px]" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface">Riwayat</span>
            </button>
          </div>
        </section>

        {/* Visual Bento Card(s) */}
        <section aria-labelledby="latest-title" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 id="latest-title" className="font-title text-base font-semibold text-on-surface">
              Laporan Terbaru
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('my-reports', { filter: 'semua' })}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.slice(0, 2).map((rep, index) => (
              <button
                key={rep.id}
                type="button"
                onClick={() => onNavigate('report-detail', { reportId: rep.id })}
                className={`relative rounded-3xl overflow-hidden h-44 md:h-52 shadow-md group block text-left w-full ${
                  index === 1 ? 'hidden md:block' : ''
                }`}
              >
                <ImageWithFallback
                  src={rep.photoUrl}
                  alt={rep.title}
                  fallbackType={rep.photoType}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 via-primary-navy/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold text-light-blue">
                      {rep.category} •{' '}
                      {rep.status === 'menunggu'
                        ? 'Menunggu'
                        : rep.status === 'diproses'
                        ? 'Diproses'
                        : rep.status === 'selesai'
                        ? 'Selesai'
                        : rep.status === 'diterima'
                        ? 'Diterima'
                        : 'Ditolak'}
                    </span>
                    <h3 className="font-title text-base font-semibold text-on-primary-navy">
                      {rep.title}
                    </h3>
                    <span className="text-[13px] text-light-blue tabular-nums">
                      {rep.location.split(',')[0]} • {rep.dateLabel}
                    </span>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-[18px] h-[18px]" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

/* =========================================================
   5. CREATE REPORT
   ========================================================= */
interface CreateReportProps {
  profile: UserProfile;
  onBack: () => void;
  onCreateReport: (payload: {
    category: string;
    title: string;
    description: string;
    location: string;
    additionalInfo: string;
    photoUrl: string;
    photoType: 'road' | 'lamp' | 'drain' | 'shelter';
  }) => string;
  onGoMyReports: () => void;
}

export const CreateReportScreen: React.FC<CreateReportProps> = ({
  onBack,
  onCreateReport,
  onGoMyReports,
}) => {
  const [category, setCategory] = useState('Jalan Rusak');
  const [title, setTitle] = useState('Jalan Berlubang di Depan SDN 03');
  const [description, setDescription] = useState(
    'Lubang berdiameter sekitar 60 cm di lajur kiri jalan tepat di depan gerbang sekolah, membahayakan pengendara motor saat hujan.'
  );
  const [location, setLocation] = useState('Jl. Ahmad Yani No. 45, Bekasi');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [previewType, setPreviewType] = useState<'road' | 'drain'>('road');
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrl =
    customPhoto ||
    (previewType === 'drain' ? ASSET_IMAGES.damageDrain : ASSET_IMAGES.damageRoad);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photoType: 'road' | 'lamp' | 'drain' | 'shelter' =
      category.includes('Lampu')
        ? 'lamp'
        : category.includes('Drainase')
        ? 'drain'
        : category.includes('Umum')
        ? 'shelter'
        : 'road';

    const newId = onCreateReport({
      category,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      additionalInfo: additionalInfo.trim(),
      photoUrl: previewUrl,
      photoType,
    });
    setCreatedId(newId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="bg-primary-navy text-on-primary-navy px-4 md:px-8 pt-5 pb-8 flex flex-col gap-3">
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              aria-label="Kembali ke Beranda"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container/15 text-on-primary-navy hover:bg-surface-container/25 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 rounded-full bg-surface-container/15 text-on-primary-navy text-[11px] font-semibold">
              Warga
            </span>
          </div>
          <h1 className="font-headline text-2xl font-bold text-on-primary-navy">
            Buat Laporan Baru
          </h1>
        </div>
      </header>

      <main className="-mt-4 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-5 pb-8">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-4">
          <div className="bg-surface-container border border-outline/70 rounded-3xl p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Kategori Kerusakan</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full min-h-[48px] px-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              >
                <option value="Jalan Rusak">Jalan Rusak</option>
                <option value="Lampu Jalan Mati">Lampu Jalan Mati</option>
                <option value="Drainase Tersumbat">Drainase Tersumbat</option>
                <option value="Fasilitas Pendidikan">Fasilitas Pendidikan</option>
                <option value="Fasilitas Kesehatan">Fasilitas Kesehatan</option>
                <option value="Fasilitas Umum Lainnya">Fasilitas Umum Lainnya</option>
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Judul Laporan</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ringkas masalah yang ditemukan"
                required
                className="w-full min-h-[48px] px-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Deskripsi Kerusakan</span>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Jelaskan kondisi kerusakan secara singkat"
                className="w-full p-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Lokasi Kejadian</span>
              <div className="relative flex items-center">
                <MapPin className="w-5 h-5 text-primary absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Nama jalan, patokan, atau kelurahan"
                  required
                  className="w-full min-h-[48px] pl-10 pr-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
                />
              </div>
            </label>
          </div>

          {/* Photo Evidence Card */}
          <div className="bg-surface-container border border-outline rounded-[20px] p-5 shadow-sm flex flex-col gap-3.5">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-on-surface">Unggah Foto Bukti</span>
              <span className="text-[13px] text-on-surface-variant">
                Sertakan foto jelas untuk mempercepat verifikasi petugas.
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setCustomPhoto(null);
                  setPreviewType('road');
                }}
                className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-[14px] border text-xs font-semibold transition-colors ${
                  !customPhoto && previewType === 'road'
                    ? 'border-primary bg-light-blue text-on-light-blue'
                    : 'border-outline bg-surface text-on-surface hover:bg-surface-subtle'
                }`}
              >
                <Camera className="w-[18px] h-[18px]" />
                <span>Kamera</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCustomPhoto(null);
                  setPreviewType('drain');
                }}
                className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-[14px] border text-xs font-semibold transition-colors ${
                  !customPhoto && previewType === 'drain'
                    ? 'border-primary bg-light-blue text-on-light-blue'
                    : 'border-outline bg-surface text-on-surface hover:bg-surface-subtle'
                }`}
              >
                <ImageIcon className="w-[18px] h-[18px]" />
                <span>Galeri</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-[14px] border text-xs font-semibold transition-colors ${
                  customPhoto
                    ? 'border-primary bg-light-blue text-on-light-blue'
                    : 'border-outline bg-surface text-on-surface hover:bg-surface-subtle'
                }`}
              >
                <Upload className="w-[18px] h-[18px]" />
                <span>Unggah</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="relative rounded-[14px] overflow-hidden border border-outline">
              <ImageWithFallback
                src={previewUrl}
                alt="Pratinjau foto bukti kerusakan"
                fallbackType={previewType}
                className="w-full h-44 md:h-56 object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-on-surface/75 text-on-primary text-[11px] font-semibold">
                Pratinjau Foto Bukti
              </span>
            </div>
          </div>

          {/* Optional Info */}
          <div className="bg-surface-container border border-outline rounded-[20px] p-5 shadow-sm">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">
                Informasi Tambahan (Opsional)
              </span>
              <input
                type="text"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Contoh: Rawan macet saat jam pulang sekolah"
                className="w-full min-h-[48px] px-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 pb-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center min-h-[48px] px-4 rounded-[14px] bg-surface-container border border-outline text-on-surface text-sm font-semibold hover:bg-surface-subtle transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center min-h-[48px] px-4 rounded-[14px] bg-primary text-on-primary text-sm font-semibold hover:bg-primary-navy transition-colors"
            >
              Kirim Laporan
            </button>
          </div>
        </form>
      </main>

      {createdId && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container rounded-3xl p-6 max-w-xs w-full shadow-lg flex flex-col items-center text-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-success-container text-on-success-container flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="font-title text-lg font-bold text-on-surface">Laporan Terkirim!</h2>
            <p className="text-sm text-on-surface-variant">
              Laporan Anda dengan ID{' '}
              <span className="font-mono font-medium text-primary">{createdId}</span> telah
              diterima sistem dan menunggu peninjauan admin.
            </p>
            <button
              type="button"
              onClick={onGoMyReports}
              className="inline-flex items-center justify-center min-h-[48px] w-full rounded-[14px] bg-primary text-on-primary text-sm font-semibold hover:bg-primary-navy transition-colors"
            >
              Lihat Laporan Saya
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   6. MY REPORTS
   ========================================================= */
interface MyReportsProps {
  reports: FacilityReport[];
  initialFilter?: string;
  onNavigate: (screen: ScreenId, opts?: { reportId?: string }) => void;
}

export const MyReportsScreen: React.FC<MyReportsProps> = ({
  reports,
  initialFilter = 'semua',
  onNavigate,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = reports.filter((r) => {
    const matchesStatus =
      statusFilter === 'semua' ||
      (statusFilter === 'diproses'
        ? r.status === 'diproses' || r.status === 'diterima'
        : r.status === statusFilter);
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const firstReport = filtered[0];
  const gridReports = filtered.slice(1);

  return (
    <div className="flex flex-col min-h-full">
      {/* Dark Midnight Navy Header */}
      <header className="bg-primary-navy text-on-primary-navy px-4 md:px-8 pt-5 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('citizen-home')}
              aria-label="Kembali ke Beranda"
              className="w-10 h-10 rounded-full bg-surface-container/15 text-on-primary-navy flex items-center justify-center hover:bg-surface-container/25 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('create-report')}
              className="px-3.5 py-2 rounded-full bg-surface-container/15 text-on-primary-navy text-xs font-semibold inline-flex items-center gap-1 hover:bg-surface-container/25 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Baru</span>
            </button>
          </div>

          <h1 className="font-headline text-2xl font-bold text-on-primary-navy">Laporan Saya</h1>

          {/* White Pill Search Bar + Filter Reset */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-on-surface-variant absolute left-3.5 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul, ID, atau lokasi..."
                className="w-full min-h-[44px] pl-10 pr-4 rounded-full bg-surface-container border-0 text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('semua');
                setSearchQuery('');
              }}
              aria-label="Reset filter"
              title="Reset filter"
              className="w-11 h-11 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shrink-0 shadow-sm hover:bg-light-blue transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlapping Rounded Light Sheet */}
      <main className="-mt-4 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-5 pb-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'semua', label: 'Semua' },
              { id: 'menunggu', label: 'Menunggu' },
              { id: 'diproses', label: 'Diproses' },
              { id: 'selesai', label: 'Selesai' },
              ...(reports.some((r) => r.status === 'ditolak')
                ? [{ id: 'ditolak', label: 'Ditolak' }]
                : []),
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setStatusFilter(chip.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  statusFilter === chip.id
                    ? 'bg-primary-navy text-on-primary-navy'
                    : 'bg-surface-container border border-outline/70 text-on-surface-variant hover:bg-surface-subtle'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-surface-container border border-outline/70 rounded-3xl p-8 text-center flex flex-col items-center gap-2">
              <ClipboardList className="w-8 h-8 text-on-surface-variant/60" />
              <p className="font-title text-base font-semibold text-on-surface">
                Tidak ada laporan ditemukan
              </p>
              <p className="text-sm text-on-surface-variant">
                Coba ubah filter status atau kata kunci pencarian Anda.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Top Photo Bento Card */}
              {firstReport && (
                <button
                  type="button"
                  onClick={() => onNavigate('report-detail', { reportId: firstReport.id })}
                  className="relative rounded-3xl overflow-hidden shadow-md block group text-left w-full"
                >
                  <ImageWithFallback
                    src={firstReport.photoUrl}
                    alt={firstReport.title}
                    fallbackType={firstReport.photoType}
                    className="w-full h-44 md:h-56 object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/95 via-primary-navy/45 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <ReportStatusBadge status={firstReport.status} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-0.5 text-on-primary-navy">
                      <span className="font-mono text-xs text-light-blue">
                        {firstReport.id} • {firstReport.category}
                      </span>
                      <h2 className="font-title text-base font-semibold">{firstReport.title}</h2>
                      <span className="text-[13px] text-light-blue/90 tabular-nums">
                        {firstReport.location.split(',')[0]} • {firstReport.dateLabel}
                      </span>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shrink-0 shadow-sm">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </button>
              )}

              {/* 2-Column / 3-Column Photo Bento Grid */}
              {gridReports.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gridReports.map((rep) => (
                    <button
                      key={rep.id}
                      type="button"
                      onClick={() => onNavigate('report-detail', { reportId: rep.id })}
                      className="relative rounded-3xl overflow-hidden shadow-md block h-44 text-left w-full group"
                    >
                      <ImageWithFallback
                        src={rep.photoUrl}
                        alt={rep.title}
                        fallbackType={rep.photoType}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/95 via-primary-navy/40 to-transparent" />
                      <div className="absolute top-2.5 left-2.5">
                        <ReportStatusBadge status={rep.status} />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between gap-1">
                        <div className="flex flex-col text-on-primary-navy min-w-0">
                          <span className="font-title text-sm font-semibold leading-tight line-clamp-2">
                            {rep.title}
                          </span>
                          <span className="font-mono text-[11px] text-light-blue mt-0.5">
                            {rep.shortDate}
                          </span>
                        </div>
                        <span className="w-8 h-8 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shrink-0">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Soft Ice-Blue Quick CTA Banner */}
          <button
            type="button"
            onClick={() => onNavigate('create-report')}
            className="bg-light-blue/50 border border-light-blue rounded-3xl p-4 flex items-center justify-between gap-3 text-left hover:bg-light-blue/70 transition-colors"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-title text-base font-semibold text-primary-navy">
                Temukan Kerusakan Baru?
              </span>
              <span className="text-[13px] text-on-light-blue">
                Laporkan cepat agar segera ditangani petugas.
              </span>
            </div>
            <span className="w-10 h-10 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shrink-0 shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

/* =========================================================
   7. REPORT DETAIL & TRACKING TIMELINE
   ========================================================= */
interface ReportDetailProps {
  report: FacilityReport;
  onBack: () => void;
}

export const ReportDetailScreen: React.FC<ReportDetailProps> = ({ report, onBack }) => {
  const CategoryIcon =
    report.category.includes('Lampu')
      ? Lightbulb
      : report.category.includes('Drainase')
      ? Droplets
      : Construction;

  return (
    <div className="flex flex-col min-h-full">
      {/* Full-Bleed Hero Photo Header */}
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
            aria-label="Kembali ke Laporan Saya"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container text-on-surface shadow-md hover:bg-surface-subtle transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <ReportStatusBadge status={report.status} className="shadow-md" />
        </div>
      </div>

      {/* Overlapping Light Detail Sheet */}
      <main className="-mt-6 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-6 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {/* Title & Meta */}
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
                <CategoryIcon className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant line-clamp-1">
                {report.category.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <HardHat className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant line-clamp-1">
                {report.assignedTechName
                  ? report.assignedTechName.split(' ')[0] +
                    ' ' +
                    (report.assignedTechName.split(' ')[1]?.[0] || '') +
                    '.'
                  : 'Belum Ada'}
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
                <Clock className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant">
                {report.estimatedTime || 'Menunggu'}
              </span>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Description & Notes */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <section className="flex flex-col gap-1.5">
                <h2 className="font-title text-base font-semibold text-on-surface">
                  Ringkasan Laporan
                </h2>
                <p className="text-sm text-on-surface-variant text-pretty leading-relaxed">
                  {report.description}
                </p>
                {report.additionalInfo && (
                  <p className="text-xs text-on-surface-variant mt-1">
                    Catatan pelapor: {report.additionalInfo}
                  </p>
                )}
              </section>

              {report.rejectionReason && (
                <section className="rounded-2xl bg-danger-container border border-danger/20 p-4 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-on-danger-container">
                    Alasan Penolakan Admin
                  </span>
                  <p className="text-sm text-on-danger-container">{report.rejectionReason}</p>
                </section>
              )}

              {report.completionNote && (
                <section className="rounded-2xl bg-success-container border border-success/20 p-4 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-on-success-container">
                    Catatan Penyelesaian Petugas
                  </span>
                  <p className="text-sm text-on-success-container">{report.completionNote}</p>
                </section>
              )}
            </div>

            {/* Vertical Progress Timeline */}
            <section className="lg:col-span-7 bg-surface-container border border-outline/70 rounded-3xl p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-4">
              <h3 className="font-title text-base font-semibold text-on-surface">
                Linimasa Progres
              </h3>

              <ol className="flex flex-col">
                {report.timeline.map((step, idx) => {
                  const isLast = idx === report.timeline.length - 1;
                  return (
                    <li key={`${step.title}-${idx}`} className={`flex gap-3 relative ${isLast ? '' : 'pb-4'}`}>
                      <div className="flex flex-col items-center">
                        {step.state === 'done' && (
                          <span className="w-7 h-7 rounded-full bg-success text-on-primary flex items-center justify-center shrink-0 z-10">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                        {step.state === 'active' && (
                          <span className="w-7 h-7 rounded-full bg-primary-navy text-on-primary-navy flex items-center justify-center shrink-0 z-10 ring-4 ring-light-blue">
                            <Wrench className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {step.state === 'pending' && (
                          <span className="w-7 h-7 rounded-full bg-surface-subtle border border-outline text-on-surface-variant flex items-center justify-center shrink-0 z-10">
                            <Flag className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {step.state === 'rejected' && (
                          <span className="w-7 h-7 rounded-full bg-danger text-on-danger flex items-center justify-center shrink-0 z-10">
                            <XCircle className="w-4 h-4" />
                          </span>
                        )}
                        {!isLast && (
                          <span
                            className={`w-0.5 flex-1 mt-1 ${
                              step.state === 'done'
                                ? 'bg-success'
                                : step.state === 'active'
                                ? 'bg-outline'
                                : 'bg-outline'
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex flex-col gap-0.5 pb-0.5 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-sm font-semibold ${
                              step.state === 'active'
                                ? 'text-primary-navy'
                                : step.state === 'pending'
                                ? 'text-on-surface-variant'
                                : step.state === 'rejected'
                                ? 'text-danger'
                                : 'text-on-surface'
                            }`}
                          >
                            {step.title}
                          </span>
                          {step.timestamp && (
                            <span className="font-mono text-xs text-primary/80 tabular-nums">
                              {step.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-on-surface-variant">{step.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
