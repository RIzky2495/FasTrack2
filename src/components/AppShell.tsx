import React from 'react';
import {
  BarChart3,
  CheckSquare,
  ClipboardList,
  HardHat,
  History,
  Home,
  LogOut,
  PlusCircle,
  User,
} from 'lucide-react';
import { ScreenId, UserProfile, UserRole } from '../types';
import { FasTrackMark, ImageWithFallback } from './FasTrackLogo';

interface NavItem {
  id: ScreenId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  activeFor: ScreenId[];
  onNavigate?: () => void;
}

interface AppShellProps {
  role: UserRole;
  profile: UserProfile;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, opts?: { filter?: string }) => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  hideMobileNav?: boolean;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  role,
  profile,
  currentScreen,
  onNavigate,
  onSwitchRole,
  onLogout,
  hideMobileNav = false,
  children,
}) => {
  const navItemsByRole: Record<UserRole, NavItem[]> = {
    citizen: [
      {
        id: 'citizen-home',
        label: 'Beranda',
        shortLabel: 'Beranda',
        icon: Home,
        activeFor: ['citizen-home'],
      },
      {
        id: 'my-reports',
        label: 'Laporan Saya',
        shortLabel: 'Laporan',
        icon: ClipboardList,
        activeFor: ['my-reports', 'report-detail'],
      },
      {
        id: 'create-report',
        label: 'Buat Laporan',
        shortLabel: 'Buat',
        icon: PlusCircle,
        activeFor: ['create-report'],
      },
      {
        id: 'profile',
        label: 'Profil',
        shortLabel: 'Profil',
        icon: User,
        activeFor: ['profile'],
      },
    ],
    admin: [
      {
        id: 'admin-home',
        label: 'Beranda',
        shortLabel: 'Beranda',
        icon: Home,
        activeFor: ['admin-home'],
      },
      {
        id: 'admin-reports',
        label: 'Kelola Laporan',
        shortLabel: 'Laporan',
        icon: CheckSquare,
        activeFor: ['admin-reports', 'admin-review'],
      },
      {
        id: 'admin-assign',
        label: 'Penugasan',
        shortLabel: 'Penugasan',
        icon: HardHat,
        activeFor: ['admin-assign'],
      },
      {
        id: 'admin-statistics',
        label: 'Statistik',
        shortLabel: 'Statistik',
        icon: BarChart3,
        activeFor: ['admin-statistics'],
      },
      {
        id: 'profile',
        label: 'Profil',
        shortLabel: 'Profil',
        icon: User,
        activeFor: ['profile'],
      },
    ],
    tech: [
      {
        id: 'tech-home',
        label: 'Beranda',
        shortLabel: 'Beranda',
        icon: Home,
        activeFor: ['tech-home'],
      },
      {
        id: 'tech-tasks',
        label: 'Tugas Saya',
        shortLabel: 'Tugas Saya',
        icon: HardHat,
        activeFor: ['tech-tasks', 'tech-task-detail'],
      },
      {
        id: 'tech-tasks',
        label: 'Riwayat',
        shortLabel: 'Riwayat',
        icon: History,
        activeFor: [],
        onNavigate: () => onNavigate('tech-tasks', { filter: 'selesai' }),
      },
      {
        id: 'profile',
        label: 'Profil',
        shortLabel: 'Profil',
        icon: User,
        activeFor: ['profile'],
      },
    ],
  };

  const navItems = navItemsByRole[role];

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 md:flex-col md:fixed md:inset-y-0 md:left-0 bg-surface-container border-r border-outline z-30">
        <div className="px-6 py-5 border-b border-outline flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-light-blue/50 flex items-center justify-center shrink-0">
            <FasTrackMark className="w-8 h-8" />
          </div>
          <div className="min-w-0">
            <span className="font-display text-lg font-bold text-primary-navy block leading-tight">
              FasTrack
            </span>
            <span className="text-xs text-on-surface-variant block truncate">
              Layanan Publik Digital
            </span>
          </div>
        </div>

        <nav aria-label="Navigasi Utama" className="flex-1 p-4 flex flex-col gap-1.5 overflow-y-auto">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = item.activeFor.includes(currentScreen);
            return (
              <button
                key={`${item.label}-${idx}`}
                type="button"
                onClick={() => (item.onNavigate ? item.onNavigate() : onNavigate(item.id))}
                className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl flex items-center gap-3 text-sm font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-primary-navy text-on-primary-navy shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-subtle hover:text-on-surface'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}

          <div className="mt-6 pt-5 border-t border-outline">
            <span className="px-3 text-xs font-semibold text-on-surface-variant block mb-2">
              Ganti Peran Demo
            </span>
            <div className="grid grid-cols-3 gap-1.5 px-1">
              {(
                [
                  { key: 'citizen', label: 'Warga' },
                  { key: 'admin', label: 'Admin' },
                  { key: 'tech', label: 'Petugas' },
                ] as { key: UserRole; label: string }[]
              ).map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => onSwitchRole(r.key)}
                  className={`min-h-[36px] px-2 rounded-lg text-xs font-semibold border transition-colors ${
                    role === r.key
                      ? 'bg-light-blue text-on-light-blue border-primary/40'
                      : 'bg-surface text-on-surface-variant border-outline hover:bg-surface-subtle'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-outline flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-3 min-w-0 text-left hover:opacity-85 transition-opacity"
          >
            <ImageWithFallback
              src={profile.avatarUrl}
              alt={`Foto profil ${profile.name}`}
              fallbackType="avatar"
              className="w-10 h-10 rounded-full object-cover border border-outline shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-on-surface truncate">{profile.name}</p>
              <p className="text-xs text-on-surface-variant truncate">{profile.roleLabel}</p>
            </div>
          </button>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Keluar Akun"
            title="Keluar Akun"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-danger-container hover:text-on-danger-container transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 md:pl-64 lg:pl-72 min-h-screen flex flex-col ${
          hideMobileNav ? '' : 'pb-24 md:pb-8'
        }`}
      >
        {children}
      </div>

      {/* Floating Pill Mobile Bottom Navigation */}
      {!hideMobileNav && (
        <div className="md:hidden fixed bottom-4 inset-x-4 z-30">
          <nav
            aria-label={`Navigasi ${profile.roleLabel}`}
            className="bg-surface-container/95 backdrop-blur-md border border-outline/70 rounded-full shadow-lg px-2 py-1.5 flex items-center justify-between"
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = item.activeFor.includes(currentScreen);
              return (
                <button
                  key={`${item.shortLabel}-${idx}`}
                  type="button"
                  onClick={() => (item.onNavigate ? item.onNavigate() : onNavigate(item.id))}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    isActive
                      ? 'px-4 py-2 rounded-full bg-primary-navy text-on-primary-navy flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all'
                      : 'w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shrink-0'
                  }
                >
                  <Icon className={isActive ? 'w-[18px] h-[18px]' : 'w-[22px] h-[22px]'} />
                  {isActive && <span>{item.shortLabel}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};
