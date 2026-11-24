import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Construction,
  Layers,
  MapPin,
  Play,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { ScreenId, TechnicianTask, UserProfile } from '../types';
import { ImageWithFallback } from '../components/FasTrackLogo';
import { TaskStatusBadge } from '../components/StatusBadge';

/* =========================================================
   14. TECHNICIAN HOME
   ========================================================= */
interface TechnicianHomeProps {
  profile: UserProfile;
  tasks: TechnicianTask[];
  onNavigate: (screen: ScreenId, opts?: { taskId?: string; filter?: string }) => void;
}

export const TechnicianHome: React.FC<TechnicianHomeProps> = ({
  profile,
  tasks,
  onNavigate,
}) => {
  const waitingCount = tasks.filter((t) => t.status === 'menunggu').length;
  const workingCount = tasks.filter((t) => t.status === 'dikerjakan').length;
  const doneCount = tasks.filter((t) => t.status === 'selesai').length;
  const activeTasksCount = waitingCount + workingCount;

  const priorityTask =
    tasks.find((t) => t.status === 'menunggu') ||
    tasks.find((t) => t.status === 'dikerjakan') ||
    tasks[0];

  const recentAssignment =
    tasks.find((t) => t.status === 'dikerjakan') || tasks[1] || tasks[0];

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
            <span className="text-[13px] text-on-surface-variant">Halo, Petugas</span>
            <h1 className="font-title text-lg font-bold text-on-surface">{profile.name}</h1>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-success-container text-on-success-container text-[11px] font-semibold">
          Aktif
        </span>
      </header>

      <main className="flex-1 px-4 md:px-8 py-4 flex flex-col gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Dark Midnight-Navy Hero Card */}
          {priorityTask && (
            <button
              type="button"
              onClick={() => onNavigate('tech-task-detail', { taskId: priorityTask.id })}
              className="lg:col-span-7 text-left bg-primary-navy text-on-primary-navy rounded-3xl p-5 md:p-6 shadow-md flex items-center justify-between gap-4 relative overflow-hidden hover:opacity-95 transition-opacity"
            >
              <div className="flex flex-col gap-1.5 relative z-10">
                <span className="text-[11px] font-semibold text-light-blue">
                  Tugas Aktif Anda
                </span>
                <span className="font-display text-[32px] leading-[38px] font-bold text-on-primary-navy tabular-nums">
                  {String(activeTasksCount + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-primary-navy">
                    {priorityTask.title}
                  </span>
                  <span className="text-[13px] text-light-blue">
                    {priorityTask.priority} • {priorityTask.location.split(',')[0]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between self-stretch shrink-0 relative z-10">
                <span className="w-12 h-12 rounded-full bg-surface-container/10 flex items-center justify-center text-light-blue">
                  <Wrench className="w-6 h-6" />
                </span>
                <span className="w-9 h-9 rounded-full bg-surface-container text-primary-navy flex items-center justify-center shadow-sm">
                  <ArrowRight className="w-[18px] h-[18px]" />
                </span>
              </div>
            </button>
          )}

          {/* Soft Ice-Blue Overview Card */}
          <section
            aria-labelledby="tech-overview-title"
            className="lg:col-span-5 bg-light-blue/50 border border-light-blue rounded-3xl p-5 flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <h2
                id="tech-overview-title"
                className="font-title text-base font-semibold text-on-surface"
              >
                Ringkasan Tugas
              </h2>
              <span className="text-[11px] font-semibold text-on-light-blue px-2.5 py-1 rounded-full bg-surface-container/70">
                Minggu Ini
              </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-primary/15">
              <div className="pr-2 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">Menunggu</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {waitingCount + 1}
                  </span>
                  <Clock className="w-4 h-4 text-warning" />
                </div>
              </div>

              <div className="px-2.5 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">
                  Dikerjakan
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {workingCount}
                  </span>
                  <Wrench className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="pl-2.5 flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-on-surface-variant">Selesai</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-2xl font-bold text-on-surface tabular-nums">
                    {doneCount + 14}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Recent Assignment Bento Card */}
        {recentAssignment && (
          <section aria-labelledby="tech-recent-title" className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2
                id="tech-recent-title"
                className="font-title text-base font-semibold text-on-surface"
              >
                Penugasan Terbaru
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('tech-tasks', { filter: 'semua' })}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Lihat Semua
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.slice(0, 2).map((task, idx) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => onNavigate('tech-task-detail', { taskId: task.id })}
                  className={`relative rounded-3xl overflow-hidden h-44 md:h-52 shadow-md block text-left w-full group ${
                    idx === 0 && tasks.length > 1 ? 'hidden md:block' : ''
                  }`}
                >
                  <ImageWithFallback
                    src={task.photoUrl}
                    alt={task.title}
                    fallbackType={task.photoType}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 via-primary-navy/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs text-light-blue">
                        {task.id} •{' '}
                        {task.status === 'menunggu'
                          ? 'Menunggu'
                          : task.status === 'dikerjakan'
                          ? 'Dikerjakan'
                          : 'Selesai'}
                      </span>
                      <h3 className="font-title text-base font-semibold text-on-primary-navy">
                        {task.title}
                      </h3>
                      <span className="text-[13px] text-light-blue tabular-nums">
                        {task.location.split(',')[0]} • {task.dateLabel}
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
        )}
      </main>
    </div>
  );
};

/* =========================================================
   15. TECHNICIAN TASKS
   ========================================================= */
interface TechnicianTasksProps {
  profile: UserProfile;
  tasks: TechnicianTask[];
  initialFilter?: string;
  onNavigate: (screen: ScreenId, opts?: { taskId?: string }) => void;
}

export const TechnicianTasksScreen: React.FC<TechnicianTasksProps> = ({
  profile,
  tasks,
  initialFilter = 'semua',
  onNavigate,
}) => {
  const [filter, setFilter] = useState(initialFilter);

  const filtered = tasks.filter(
    (t) => filter === 'semua' || t.status === filter
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="bg-primary-navy text-on-primary-navy px-4 md:px-8 pt-5 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('tech-home')}
              aria-label="Kembali ke Beranda Petugas"
              className="w-10 h-10 rounded-full bg-surface-container/15 text-on-primary-navy flex items-center justify-center hover:bg-surface-container/25 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 rounded-full bg-surface-container/15 text-on-primary-navy text-[11px] font-semibold">
              {profile.name}
            </span>
          </div>
          <h1 className="font-headline text-2xl font-bold text-on-primary-navy">Tugas Saya</h1>
        </div>
      </header>

      <main className="-mt-4 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-5 pb-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'semua', label: 'Semua' },
              { id: 'menunggu', label: 'Menunggu' },
              { id: 'dikerjakan', label: 'Dikerjakan' },
              { id: 'selesai', label: 'Selesai' },
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
            {filtered.map((task) => (
              <article
                key={task.id}
                className="bg-surface-container border border-outline/70 rounded-3xl p-4 md:p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between gap-3"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-primary">
                      {task.id} • {task.reportId}
                    </span>
                    <TaskStatusBadge status={task.status} />
                  </div>
                  <h2 className="font-title text-base font-semibold text-on-surface">
                    {task.title}
                  </h2>
                  <div className="flex flex-col gap-1 text-[13px] text-on-surface-variant">
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="w-4 h-4 shrink-0" /> {task.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 shrink-0" /> {task.location}
                    </span>
                  </div>
                </div>

                <footer className="pt-3 border-t border-outline/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-on-surface-variant tabular-nums">
                    {task.dateLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('tech-task-detail', { taskId: task.id })}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      task.status === 'selesai'
                        ? 'bg-light-blue text-on-light-blue hover:bg-primary hover:text-on-primary'
                        : 'bg-primary-navy text-on-primary-navy hover:bg-primary'
                    }`}
                  >
                    <span>{task.status === 'selesai' ? 'Lihat Detail' : 'Buka Tugas'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
   16. TECHNICIAN TASK DETAIL
   ========================================================= */
interface TechnicianTaskDetailProps {
  task: TechnicianTask;
  onBack: () => void;
  onStartWork: (taskId: string) => void;
  onCompleteWork: (taskId: string, note: string) => void;
}

export const TechnicianTaskDetailScreen: React.FC<TechnicianTaskDetailProps> = ({
  task,
  onBack,
  onStartWork,
  onCompleteWork,
}) => {
  const [completeOpen, setCompleteOpen] = useState(false);
  const [completionNote, setCompletionNote] = useState('');

  const handleConfirmComplete = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteWork(
      task.id,
      completionNote.trim() || 'Perbaikan selesai dilakukan dengan baik.'
    );
    setCompleteOpen(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <ImageWithFallback
          src={task.photoUrl}
          alt={task.title}
          fallbackType={task.photoType}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-on-surface/35 via-transparent to-on-surface/25" />
        <div className="absolute top-4 inset-x-4 md:inset-x-8 flex items-center justify-between max-w-4xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            aria-label="Kembali ke Tugas Saya"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container/95 text-on-surface shadow-md hover:bg-surface-container transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <TaskStatusBadge status={task.status} className="shadow-md" />
        </div>
      </div>

      <main className="-mt-6 relative z-10 flex-1 bg-surface rounded-t-3xl px-4 md:px-8 pt-6 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <section className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-primary">
                {task.id} • {task.reportId}
              </span>
              <span className="text-[13px] text-on-surface-variant tabular-nums">
                {task.dateLabel}
              </span>
            </div>
            <h1 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
              {task.title}
            </h1>
            <div className="flex items-center gap-1.5 text-[13px] text-on-surface-variant pt-1">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{task.location}</span>
            </div>
          </section>

          {/* 4-Column Circular Attribute Row */}
          <section className="grid grid-cols-4 gap-2 text-center py-1">
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <Construction className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant line-clamp-1">
                {task.category.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant">
                {task.priority}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <Clock className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant">
                {task.deadline}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-11 h-11 rounded-full bg-surface-container border border-outline/70 shadow-sm flex items-center justify-center text-primary-navy">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant">
                {task.adminName}
              </span>
            </div>
          </section>

          <section className="flex flex-col gap-1.5">
            <h2 className="font-title text-base font-semibold text-on-surface">Detail Lapangan</h2>
            <p className="text-sm text-on-surface-variant text-pretty leading-relaxed">
              {task.description}
            </p>
          </section>

          {/* Admin Notes */}
          <section className="rounded-3xl bg-light-blue/50 border border-light-blue p-4 md:p-5 flex flex-col gap-1">
            <span className="text-xs font-semibold text-primary-navy">
              Catatan Admin (Siti Aminah)
            </span>
            <p className="text-sm text-on-light-blue">{task.adminNote}</p>
          </section>

          {task.completionNote && (
            <section className="rounded-3xl bg-success-container border border-success/20 p-4 flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-success-container">
                Laporan Penyelesaian
              </span>
              <p className="text-sm text-on-success-container">{task.completionNote}</p>
            </section>
          )}

          {/* Actions */}
          {task.status !== 'selesai' && (
            <section className="flex flex-col sm:flex-row gap-3">
              {task.status === 'menunggu' && (
                <button
                  type="button"
                  onClick={() => onStartWork(task.id)}
                  className="flex items-center justify-between w-full min-h-[52px] pl-6 pr-1.5 rounded-full bg-primary-navy text-on-primary-navy text-sm font-semibold hover:bg-primary shadow-md transition-colors"
                >
                  <span>Mulai Pengerjaan</span>
                  <span className="w-10 h-10 rounded-full bg-surface-container text-primary-navy flex items-center justify-center">
                    <Play className="w-5 h-5 fill-current" />
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setCompleteOpen(true)}
                className="flex items-center justify-between w-full min-h-[52px] pl-6 pr-1.5 rounded-full bg-success text-on-success text-sm font-semibold hover:opacity-90 shadow-sm transition-opacity"
              >
                <span>Tandai Selesai</span>
                <span className="w-10 h-10 rounded-full bg-surface-container text-success flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
              </button>
            </section>
          )}
        </div>
      </main>

      {completeOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleConfirmComplete}
            className="bg-surface-container rounded-3xl p-6 max-w-xs w-full shadow-lg flex flex-col gap-3.5"
          >
            <h3 className="font-title text-lg font-bold text-on-surface">Selesaikan Tugas?</h3>
            <p className="text-[13px] text-on-surface-variant">
              Pastikan perbaikan telah selesai dilakukan sebelum menandai tugas ini selesai.
            </p>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">
                Catatan Perbaikan (Opsional)
              </span>
              <textarea
                rows={3}
                value={completionNote}
                onChange={(e) => setCompletionNote(e.target.value)}
                placeholder="Contoh: Lubang sudah ditambal aspal dingin dan diratakan."
                className="w-full p-3 rounded-[14px] border border-outline text-sm focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </label>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setCompleteOpen(false)}
                className="min-h-[44px] rounded-[14px] border border-outline text-xs font-semibold hover:bg-surface-subtle"
              >
                Batal
              </button>
              <button
                type="submit"
                className="min-h-[44px] rounded-[14px] bg-success text-on-success text-xs font-semibold hover:opacity-90"
              >
                Konfirmasi
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
