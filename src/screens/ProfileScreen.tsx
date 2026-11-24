import React, { useState } from 'react';
import { Edit3, LogOut, Mail, Phone, User } from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { ImageWithFallback } from '../components/FasTrackLogo';

/* =========================================================
   8. PROFILE SCREEN
   ========================================================= */
interface ProfileScreenProps {
  profile: UserProfile;
  onUpdateProfile: (name: string, phone: string) => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  onSwitchRole,
  onLogout,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [draftName, setDraftName] = useState(profile.name);
  const [draftPhone, setDraftPhone] = useState(profile.phone);

  const openEdit = () => {
    setDraftName(profile.name);
    setDraftPhone(profile.phone);
    setEditOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(draftName.trim() || profile.name, draftPhone.trim() || profile.phone);
    setEditOpen(false);
  };

  return (
    <div className="flex flex-col max-w-3xl w-full mx-auto">
      <header className="px-4 md:px-8 pt-6 pb-4 flex flex-col items-center text-center">
        <div className="w-full bg-light-blue/50 border border-light-blue rounded-3xl p-6 flex flex-col items-center text-center gap-2.5">
          <ImageWithFallback
            src={profile.avatarUrl}
            alt={`Foto profil ${profile.name}`}
            fallbackType="avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-surface-container shadow-sm"
          />
          <div className="flex flex-col items-center gap-1.5">
            <h1 className="font-headline text-xl font-bold text-on-surface">{profile.name}</h1>
            <span className="px-3 py-1 rounded-full bg-primary-navy text-on-primary-navy text-[11px] font-semibold">
              {profile.roleLabel}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-2 flex flex-col gap-5">
        <section className="bg-surface-container border border-outline/70 rounded-3xl p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] flex flex-col gap-3.5">
          <h2 className="font-title text-base font-semibold text-on-surface">Informasi Akun</h2>

          <div className="flex items-center gap-3 py-2 border-b border-outline">
            <User className="w-5 h-5 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-on-surface-variant">Nama Lengkap</span>
              <span className="text-sm text-on-surface">{profile.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2 border-b border-outline">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-on-surface-variant">Email</span>
              <span className="text-sm text-on-surface">{profile.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1">
            <Phone className="w-5 h-5 text-primary shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-on-surface-variant">Nomor Telepon</span>
              <span className="text-sm text-on-surface tabular-nums">{profile.phone}</span>
            </div>
          </div>
        </section>

        {/* Mobile Demo Role Switcher for quick switching */}
        <section className="md:hidden bg-surface-container border border-outline/70 rounded-3xl p-4 flex flex-col gap-2.5">
          <span className="text-xs font-semibold text-on-surface-variant">
            Ganti Peran Demo Cepat
          </span>
          <div className="grid grid-cols-3 gap-2">
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
                onClick={() => onSwitchRole(r.id)}
                className={`min-h-[40px] rounded-[14px] border text-xs font-semibold transition-colors ${
                  profile.role === r.id
                    ? 'border-primary bg-light-blue text-on-light-blue'
                    : 'border-outline bg-surface text-on-surface-variant hover:bg-surface-subtle'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={openEdit}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full px-6 rounded-[14px] bg-surface-container border border-outline text-on-surface text-sm font-semibold hover:bg-surface-subtle shadow-sm transition-colors"
          >
            <Edit3 className="w-5 h-5" />
            <span>Ubah Profil</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full px-6 rounded-[14px] bg-danger text-on-danger text-sm font-semibold hover:opacity-90 shadow-sm transition-opacity"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </main>

      {editOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-surface-container rounded-3xl p-6 max-w-xs w-full shadow-lg flex flex-col gap-3.5"
          >
            <h3 className="font-title text-lg font-bold text-on-surface">Ubah Profil</h3>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Nama Lengkap</span>
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                required
                className="w-full min-h-[44px] px-3 rounded-[14px] border border-outline text-sm focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface">Nomor Telepon</span>
              <input
                type="tel"
                value={draftPhone}
                onChange={(e) => setDraftPhone(e.target.value)}
                required
                className="w-full min-h-[44px] px-3 rounded-[14px] border border-outline text-sm focus:border-primary focus:ring-2 focus:ring-light-blue focus:outline-none"
              />
            </label>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="min-h-[44px] rounded-[14px] border border-outline text-xs font-semibold hover:bg-surface-subtle"
              >
                Batal
              </button>
              <button
                type="submit"
                className="min-h-[44px] rounded-[14px] bg-primary text-on-primary text-xs font-semibold hover:bg-primary-navy"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
