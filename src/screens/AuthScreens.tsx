import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';
import { UserRole } from '../types';
import { FasTrackMark, ImageWithFallback } from '../components/FasTrackLogo';

/* =========================================================
   1. SPLASH SCREEN
   ========================================================= */
export const SplashScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <main className="min-h-screen bg-primary-navy text-on-primary-navy flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 relative overflow-hidden">
      <ImageWithFallback
        src={ASSET_IMAGES.splashCity}
        alt="Latar perkotaan modern Indonesia"
        fallbackType="city"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/90 via-primary-navy/75 to-primary-navy/95 pointer-events-none" />

      <div className="pt-4 flex justify-center relative z-10">
        <span className="font-label text-xs font-semibold px-3.5 py-1.5 rounded-full bg-surface-container/15 text-on-primary border border-on-primary/20 inline-flex items-center gap-1.5 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4" />
          Layanan Publik Digital
        </span>
      </div>

      <section className="flex flex-col items-center text-center gap-5 my-auto relative z-10 max-w-md mx-auto">
        <div className="w-24 h-24 rounded-3xl bg-surface-container shadow-lg ring-8 ring-on-primary/10 flex items-center justify-center">
          <FasTrackMark className="w-14 h-14" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[32px] md:text-[44px] leading-tight font-bold text-on-primary tracking-tight">
            FasTrack
          </h1>
          <p className="font-title text-base md:text-lg font-semibold text-light-blue">
            Lapor Mudah, Fasilitas Terjaga
          </p>
          <p className="font-body text-sm md:text-base text-on-primary/90 max-w-[300px] md:max-w-sm mx-auto text-pretty">
            Pantau dan laporkan kerusakan fasilitas umum di sekitar Anda secara cepat dan transparan.
          </p>
        </div>
      </section>

      <footer className="flex flex-col gap-3 pb-4 relative z-10 max-w-sm w-full mx-auto">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full px-6 rounded-[14px] bg-surface-container text-primary-navy font-semibold hover:bg-light-blue active:scale-[0.99] transition-all shadow-sm"
        >
          <span className="text-sm font-semibold">Mulai Sekarang</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center text-[11px] font-semibold text-on-primary/90">
          Versi 1.0 • Pemerintah Daerah Terintegrasi
        </p>
      </footer>
    </main>
  );
};

/* =========================================================
   2. LOGIN SCREEN
   ========================================================= */
interface LoginScreenProps {
  onLogin: (role: UserRole, email: string) => void;
  onGoRegister: () => void;
}

const ROLE_EMAILS: Record<UserRole, string> = {
  citizen: 'budi.santoso@warga.id',
  admin: 'admin@fastrack.go.id',
  tech: 'andi.teknisi@fastrack.go.id',
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGoRegister }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('citizen');
  const [email, setEmail] = useState(ROLE_EMAILS.citizen);
  const [password, setPassword] = useState('fastrack123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [resetSent, setResetSent] = useState(false);

  const selectRole = (role: UserRole) => {
    setActiveRole(role);
    setEmail(ROLE_EMAILS[role]);
    setResetSent(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lower = email.toLowerCase();
    let resolvedRole = activeRole;
    if (lower.includes('admin')) resolvedRole = 'admin';
    else if (lower.includes('teknisi') || lower.includes('petugas')) resolvedRole = 'tech';
    onLogin(resolvedRole, email);
  };

  return (
    <main className="min-h-screen bg-surface flex flex-col md:grid md:grid-cols-12">
      {/* Header / Desktop Left Panel */}
      <header className="md:col-span-5 lg:col-span-6 bg-gradient-to-br from-primary-navy via-primary-navy to-primary text-on-primary-navy px-5 pt-8 pb-10 md:p-12 rounded-b-3xl md:rounded-none flex flex-col justify-between gap-4 relative overflow-hidden shadow-md">
        <div className="absolute -top-12 -right-12 w-40 h-40 md:w-72 md:h-72 rounded-full bg-surface-container/10 pointer-events-none" />
        <div className="hidden md:block absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-surface-container/5 pointer-events-none" />

        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-[14px] bg-surface-container flex items-center justify-center text-primary-navy shadow-sm">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <span className="font-title text-lg font-bold text-on-primary-navy">FasTrack</span>
        </div>

        <div className="flex flex-col gap-1.5 mt-1 relative z-10 md:my-auto max-w-md">
          <h1 className="font-headline text-2xl md:text-4xl font-bold text-on-primary-navy text-balance">
            Selamat Datang di FasTrack
          </h1>
          <p className="font-body text-sm md:text-base text-light-blue text-pretty">
            Laporkan kerusakan fasilitas umum dengan mudah, pantau progres perbaikan secara transparan hingga tuntas.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs text-light-blue/90 relative z-10">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Terintegrasi dengan Dinas Pekerjaan Umum &amp; Petugas Lapangan</span>
        </div>
      </header>

      {/* Form Container */}
      <section className="md:col-span-7 lg:col-span-6 flex-1 flex flex-col justify-between px-4 py-6 md:p-12 max-w-lg w-full mx-auto">
        <div className="my-auto bg-surface-container border border-outline/70 rounded-[20px] p-5 md:p-7 shadow-[0_10px_30px_-8px_rgba(15,42,86,0.10)] flex flex-col gap-5">
          {/* Role selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-on-surface">
              Pilih Peran Akun (Demo)
            </span>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Pilih peran">
              {(
                [
                  { id: 'citizen', label: 'Warga' },
                  { id: 'admin', label: 'Admin' },
                  { id: 'tech', label: 'Petugas' },
                ] as { id: UserRole; label: string }[]
              ).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => selectRole(r.id)}
                  className={`min-h-[42px] rounded-[14px] border text-xs font-semibold transition-colors ${
                    activeRole === r.id
                      ? 'border-primary bg-light-blue text-on-light-blue'
                      : 'border-outline bg-surface text-on-surface-variant hover:bg-surface-subtle'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Email</span>
              <div className="relative flex items-center">
                <Mail className="w-5 h-5 text-on-surface-variant absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  inputMode="email"
                  required
                  className="w-full min-h-[48px] pl-10 pr-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Kata Sandi</span>
              <div className="relative flex items-center">
                <Lock className="w-5 h-5 text-on-surface-variant absolute left-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  autoComplete="current-password"
                  required
                  className="w-full min-h-[48px] pl-10 pr-12 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Tampilkan atau sembunyikan kata sandi"
                  className="absolute right-2 w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-subtle"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between gap-2">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-outline text-primary focus:ring-primary"
                />
                <span className="text-[13px] text-on-surface">Ingat saya</span>
              </label>
              <button
                type="button"
                onClick={() => setResetSent(true)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Lupa kata sandi?
              </button>
            </div>

            {resetSent && (
              <div className="rounded-[14px] bg-light-blue text-on-light-blue px-3 py-2 text-[13px]">
                Tautan atur ulang kata sandi telah dikirim ke email {email}.
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full px-6 py-3 rounded-[14px] bg-primary text-on-primary text-sm font-semibold hover:bg-primary-navy active:scale-[0.99] transition-all mt-1"
            >
              Masuk
            </button>
          </form>
        </div>

        <footer className="text-center pt-5">
          <p className="text-sm text-on-surface-variant">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={onGoRegister}
              className="font-semibold text-primary hover:underline"
            >
              Daftar di sini
            </button>
          </p>
        </footer>
      </section>
    </main>
  );
};

/* =========================================================
   3. REGISTER SCREEN
   ========================================================= */
interface RegisterScreenProps {
  onBackToLogin: () => void;
  onCompleteRegister: (data: { name: string; email: string; phone: string }) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBackToLogin,
  onCompleteRegister,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    setErrorMsg('');
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="bg-surface-container border-b border-outline px-4 md:px-8 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          type="button"
          onClick={onBackToLogin}
          aria-label="Kembali ke halaman masuk"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container border border-outline text-on-surface hover:bg-surface-subtle"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-title text-lg font-bold text-on-surface">Daftar Akun Warga</h1>
      </header>

      <main className="flex-1 px-4 py-6 flex flex-col justify-center gap-5 max-w-md w-full mx-auto">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="font-headline text-xl font-bold text-primary-navy">Buat Akun Baru</h2>
          <p className="text-sm text-on-surface-variant">
            Lengkapi data diri Anda untuk mulai melaporkan fasilitas umum.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-container border border-outline rounded-[20px] p-5 shadow-sm flex flex-col gap-3.5"
        >
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-on-surface">Nama Lengkap</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              required
              className="w-full min-h-[48px] px-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-on-surface">Email</span>
            <div className="relative flex items-center">
              <Mail className="w-5 h-5 text-on-surface-variant absolute left-3 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="budi.santoso@warga.id"
                inputMode="email"
                required
                className="w-full min-h-[48px] pl-10 pr-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-on-surface">Nomor Telepon</span>
            <div className="relative flex items-center">
              <Phone className="w-5 h-5 text-on-surface-variant absolute left-3 pointer-events-none" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812-3456-7890"
                inputMode="tel"
                required
                className="w-full min-h-[48px] pl-10 pr-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-on-surface">Kata Sandi</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              required
              className="w-full min-h-[48px] px-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-on-surface">Konfirmasi Kata Sandi</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi kata sandi"
              required
              className="w-full min-h-[48px] px-3 rounded-[14px] bg-surface-container border border-outline text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
            />
          </label>

          {errorMsg && (
            <p className="text-xs font-medium text-danger bg-danger-container px-3 py-2 rounded-lg">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center min-h-[48px] w-full px-6 py-3 rounded-[14px] bg-primary text-on-primary text-sm font-semibold hover:bg-primary-navy active:scale-[0.99] transition-all mt-1"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="text-center text-sm text-on-surface-variant">
          Sudah punya akun?{' '}
          <button
            type="button"
            onClick={onBackToLogin}
            className="font-semibold text-primary hover:underline"
          >
            Masuk di sini
          </button>
        </p>
      </main>

      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container rounded-3xl p-6 max-w-xs w-full shadow-lg flex flex-col items-center text-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-success-container text-on-success-container flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-title text-lg font-bold text-on-surface">Pendaftaran Berhasil</h3>
            <p className="text-sm text-on-surface-variant">
              Akun Anda telah terdaftar. Silakan masuk untuk mulai melapor.
            </p>
            <button
              type="button"
              onClick={() =>
                onCompleteRegister({
                  name: name.trim() || 'Warga Baru',
                  email: email.trim() || 'warga@fastrack.id',
                  phone: phone.trim() || '0812-0000-0000',
                })
              }
              className="inline-flex items-center justify-center min-h-[48px] w-full rounded-[14px] bg-primary text-on-primary font-semibold text-sm hover:bg-primary-navy transition-colors"
            >
              Lanjut ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
