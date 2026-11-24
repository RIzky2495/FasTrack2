/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  DEFAULT_PROFILES,
  INITIAL_REPORTS,
  INITIAL_TASKS,
  TECHNICIANS,
} from './data/mockData';
import {
  FacilityReport,
  ScreenId,
  TechnicianTask,
  UserProfile,
  UserRole,
} from './types';
import { AppShell } from './components/AppShell';
import { LoginScreen, RegisterScreen, SplashScreen } from './screens/AuthScreens';
import {
  CitizenHome,
  CreateReportScreen,
  MyReportsScreen,
  ReportDetailScreen,
} from './screens/CitizenScreens';
import {
  AdminAssignTechnicianScreen,
  AdminHome,
  AdminReportManagementScreen,
  AdminReviewReportScreen,
  AdminStatisticsScreen,
} from './screens/AdminScreens';
import {
  TechnicianHome,
  TechnicianTaskDetailScreen,
  TechnicianTasksScreen,
} from './screens/TechnicianScreens';
import { ProfileScreen } from './screens/ProfileScreen';

const STORAGE_KEY = 'fastrack_state_v1';

interface PersistedState {
  role: UserRole;
  profiles: Record<UserRole, UserProfile>;
  reports: FacilityReport[];
  tasks: TechnicianTask[];
}

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      if (parsed.reports && parsed.tasks && parsed.profiles && parsed.role) {
        return {
          role: parsed.role,
          profiles: parsed.profiles,
          reports: parsed.reports,
          tasks: parsed.tasks,
        };
      }
    }
  } catch {
    // Ignore storage errors and fall back to seed data
  }
  return {
    role: 'citizen',
    profiles: DEFAULT_PROFILES,
    reports: INITIAL_REPORTS,
    tasks: INITIAL_TASKS,
  };
}

export default function App() {
  const [initial] = useState<PersistedState>(() => loadInitialState());
  const [screen, setScreen] = useState<ScreenId>('splash');
  const [role, setRole] = useState<UserRole>(initial.role);
  const [profiles, setProfiles] = useState<Record<UserRole, UserProfile>>(initial.profiles);
  const [reports, setReports] = useState<FacilityReport[]>(initial.reports);
  const [tasks, setTasks] = useState<TechnicianTask[]>(initial.tasks);

  const [selectedReportId, setSelectedReportId] = useState<string>('FT-2026-011');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('TGS-043');
  const [listFilter, setListFilter] = useState<string>('semua');

  useEffect(() => {
    try {
      const payload: PersistedState = { role, profiles, reports, tasks };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore quota/storage errors
    }
  }, [role, profiles, reports, tasks]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [screen, selectedReportId, selectedTaskId]);

  const navigate = (
    nextScreen: ScreenId,
    opts?: { reportId?: string; taskId?: string; filter?: string }
  ) => {
    if (opts?.reportId) setSelectedReportId(opts.reportId);
    if (opts?.taskId) setSelectedTaskId(opts.taskId);
    setListFilter(opts?.filter ?? 'semua');
    setScreen(nextScreen);
  };

  const handleLogin = (selectedRole: UserRole, email: string) => {
    setRole(selectedRole);
    setProfiles((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        email: email || prev[selectedRole].email,
      },
    }));
    if (selectedRole === 'admin') setScreen('admin-home');
    else if (selectedRole === 'tech') setScreen('tech-home');
    else setScreen('citizen-home');
  };

  const handleRegisterComplete = (data: { name: string; email: string; phone: string }) => {
    setRole('citizen');
    setProfiles((prev) => ({
      ...prev,
      citizen: {
        ...prev.citizen,
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    }));
    setScreen('citizen-home');
  };

  const handleSwitchRole = (nextRole: UserRole) => {
    setRole(nextRole);
    setListFilter('semua');
    if (nextRole === 'admin') setScreen('admin-home');
    else if (nextRole === 'tech') setScreen('tech-home');
    else setScreen('citizen-home');
  };

  const handleUpdateProfile = (name: string, phone: string) => {
    setProfiles((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        name,
        phone,
      },
    }));
  };

  const handleCreateReport = (payload: {
    category: string;
    title: string;
    description: string;
    location: string;
    additionalInfo: string;
    photoUrl: string;
    photoType: 'road' | 'lamp' | 'drain' | 'shelter';
  }): string => {
    const nextNum = 16 + Math.max(0, reports.length - INITIAL_REPORTS.length);
    const newId = `FT-2026-0${nextNum}`;
    const citizen = profiles.citizen;

    const newReport: FacilityReport = {
      id: newId,
      title: payload.title,
      category: payload.category,
      description: payload.description,
      location: payload.location,
      additionalInfo: payload.additionalInfo || undefined,
      dateLabel: '25 Nov 2026',
      shortDate: '25 Nov',
      status: 'menunggu',
      priority: 'Tinggi',
      reporterName: citizen.name,
      reporterPhone: citizen.phone,
      reporterAvatar: citizen.avatarUrl,
      photoUrl: payload.photoUrl,
      photoType: payload.photoType,
      estimatedTime: 'Menunggu',
      timeline: [
        {
          title: 'Laporan Dikirim',
          timestamp: '25 Nov, 00:17',
          description: `Dikirim oleh ${citizen.name} beserta foto lokasi.`,
          state: 'done',
        },
        {
          title: 'Sedang Ditinjau',
          timestamp: '25 Nov, 00:18',
          description: 'Menunggu verifikasi kelengkapan data oleh Admin Dinas.',
          state: 'active',
        },
        {
          title: 'Laporan Diterima',
          description: 'Persetujuan tindak lanjut oleh tim teknis.',
          state: 'pending',
        },
        {
          title: 'Teknisi Ditugaskan',
          description: 'Penunjukan petugas lapangan terdekat.',
          state: 'pending',
        },
        {
          title: 'Sedang Dikerjakan',
          description: 'Perbaikan fisik fasilitas di lokasi.',
          state: 'pending',
        },
        {
          title: 'Perbaikan Selesai',
          description: 'Konfirmasi penyelesaian dari petugas.',
          state: 'pending',
        },
      ],
    };

    setReports((prev) => [newReport, ...prev]);
    return newId;
  };

  const handleApproveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const timeline = r.timeline.map((step, idx) => {
          if (idx <= 2) {
            return {
              ...step,
              state: 'done' as const,
              timestamp: step.timestamp || '25 Nov, 09:00',
            };
          }
          if (idx === 3) {
            return { ...step, state: 'active' as const };
          }
          return step;
        });
        return { ...r, status: 'diterima', timeline };
      })
    );
    navigate('admin-assign', { reportId });
  };

  const handleRejectReport = (reportId: string, reason: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        return {
          ...r,
          status: 'ditolak',
          rejectionReason: reason,
          estimatedTime: 'Ditolak',
          timeline: [
            r.timeline[0],
            {
              title: 'Sedang Ditinjau',
              timestamp: '25 Nov, 09:00',
              description: 'Admin meninjau laporan dan bukti foto.',
              state: 'done',
            },
            {
              title: 'Laporan Ditolak',
              timestamp: '25 Nov, 09:05',
              description: reason,
              state: 'rejected',
            },
          ],
        };
      })
    );
  };

  const handleAssignTechnician = ({
    reportId,
    techId,
    note,
  }: {
    reportId: string;
    techId: string;
    note: string;
  }): string => {
    const tech = TECHNICIANS.find((t) => t.id === techId) || TECHNICIANS[0];
    const targetReport = reports.find((r) => r.id === reportId);
    const existingTask = tasks.find((t) => t.reportId === reportId);
    const taskId = existingTask?.id || `TGS-0${44 + tasks.length}`;

    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const timeline = r.timeline.map((step, idx) => {
          if (idx <= 3) {
            return {
              ...step,
              state: 'done' as const,
              timestamp: step.timestamp || '25 Nov, 09:30',
              description:
                idx === 3
                  ? `${tech.name} ditugaskan menuju lokasi.`
                  : step.description,
            };
          }
          if (idx === 4) {
            return {
              ...step,
              state: 'active' as const,
              timestamp: '25 Nov, 10:00',
            };
          }
          return step;
        });
        return {
          ...r,
          status: 'diproses',
          assignedTechId: tech.id,
          assignedTechName: tech.name,
          estimatedTime: 'Est. 16:00',
          adminNote: note,
          taskId,
          timeline,
        };
      })
    );

    if (targetReport) {
      setTasks((prev) => {
        const exists = prev.some((t) => t.reportId === reportId);
        if (exists) {
          return prev.map((t) =>
            t.reportId === reportId
              ? { ...t, adminNote: note || t.adminNote }
              : t
          );
        }
        const newTask: TechnicianTask = {
          id: taskId,
          reportId: targetReport.id,
          title: targetReport.title,
          category: targetReport.category,
          location: targetReport.location,
          dateLabel: targetReport.dateLabel,
          status: 'menunggu',
          priority: targetReport.priority,
          deadline: '16:00 WIB',
          adminName: 'Siti A.',
          adminNote: note || 'Segera tindak lanjuti laporan di lapangan.',
          description: targetReport.description,
          photoUrl: targetReport.photoUrl,
          photoType: targetReport.photoType,
        };
        return [newTask, ...prev];
      });
    }

    return taskId;
  };

  const handleStartTask = (taskId: string) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'dikerjakan' } : t))
    );
    if (targetTask) {
      setReports((prev) =>
        prev.map((r) => {
          if (r.id !== targetTask.reportId) return r;
          const timeline = r.timeline.map((step, idx) => {
            if (idx <= 3) return { ...step, state: 'done' as const };
            if (idx === 4) {
              return {
                ...step,
                state: 'active' as const,
                timestamp: '25 Nov, 10:15',
                description: 'Petugas sedang melakukan perbaikan di lokasi.',
              };
            }
            return step;
          });
          return { ...r, status: 'diproses', timeline };
        })
      );
    }
  };

  const handleCompleteTask = (taskId: string, note: string) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: 'selesai', completionNote: note } : t
      )
    );
    if (targetTask) {
      setReports((prev) =>
        prev.map((r) => {
          if (r.id !== targetTask.reportId) return r;
          const timeline = r.timeline.map((step, idx) => ({
            ...step,
            state: 'done' as const,
            timestamp: step.timestamp || '25 Nov, 14:30',
            description: idx === 5 ? note : step.description,
          }));
          return {
            ...r,
            status: 'selesai',
            estimatedTime: 'Selesai',
            completionNote: note,
            timeline,
          };
        })
      );
    }
  };

  /* Auth Screens (no AppShell) */
  if (screen === 'splash') {
    return <SplashScreen onStart={() => setScreen('login')} />;
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onGoRegister={() => setScreen('register')}
      />
    );
  }

  if (screen === 'register') {
    return (
      <RegisterScreen
        onBackToLogin={() => setScreen('login')}
        onCompleteRegister={handleRegisterComplete}
      />
    );
  }

  const activeProfile = profiles[role];
  const activeReport =
    reports.find((r) => r.id === selectedReportId) || reports[0];
  const activeTask =
    tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  const hideMobileNav = screen === 'create-report';

  return (
    <AppShell
      role={role}
      profile={activeProfile}
      currentScreen={screen}
      onNavigate={(s, opts) => navigate(s, opts)}
      onSwitchRole={handleSwitchRole}
      onLogout={() => setScreen('login')}
      hideMobileNav={hideMobileNav}
    >
      {screen === 'citizen-home' && (
        <CitizenHome
          profile={profiles.citizen}
          reports={reports}
          onNavigate={navigate}
        />
      )}

      {screen === 'create-report' && (
        <CreateReportScreen
          profile={profiles.citizen}
          onBack={() => navigate('citizen-home')}
          onCreateReport={handleCreateReport}
          onGoMyReports={() => navigate('my-reports', { filter: 'semua' })}
        />
      )}

      {screen === 'my-reports' && (
        <MyReportsScreen
          key={listFilter}
          reports={reports}
          initialFilter={listFilter}
          onNavigate={navigate}
        />
      )}

      {screen === 'report-detail' && activeReport && (
        <ReportDetailScreen
          report={activeReport}
          onBack={() => navigate('my-reports', { filter: 'semua' })}
        />
      )}

      {screen === 'profile' && (
        <ProfileScreen
          profile={activeProfile}
          onUpdateProfile={handleUpdateProfile}
          onSwitchRole={handleSwitchRole}
          onLogout={() => setScreen('login')}
        />
      )}

      {screen === 'admin-home' && (
        <AdminHome
          profile={profiles.admin}
          reports={reports}
          onNavigate={navigate}
        />
      )}

      {screen === 'admin-reports' && (
        <AdminReportManagementScreen
          key={listFilter}
          reports={reports}
          initialFilter={listFilter}
          onNavigate={navigate}
        />
      )}

      {screen === 'admin-review' && activeReport && (
        <AdminReviewReportScreen
          report={activeReport}
          onBack={() => navigate('admin-reports')}
          onApprove={handleApproveReport}
          onReject={handleRejectReport}
        />
      )}

      {screen === 'admin-assign' && (
        <AdminAssignTechnicianScreen
          reports={reports}
          tasks={tasks}
          selectedReportId={selectedReportId}
          onBack={() => navigate('admin-home')}
          onAssignTechnician={handleAssignTechnician}
        />
      )}

      {screen === 'admin-statistics' && (
        <AdminStatisticsScreen
          reports={reports}
          onBack={() => navigate('admin-home')}
        />
      )}

      {screen === 'tech-home' && (
        <TechnicianHome
          profile={profiles.tech}
          tasks={tasks}
          onNavigate={navigate}
        />
      )}

      {screen === 'tech-tasks' && (
        <TechnicianTasksScreen
          key={listFilter}
          profile={profiles.tech}
          tasks={tasks}
          initialFilter={listFilter}
          onNavigate={navigate}
        />
      )}

      {screen === 'tech-task-detail' && activeTask && (
        <TechnicianTaskDetailScreen
          task={activeTask}
          onBack={() => navigate('tech-tasks')}
          onStartWork={handleStartTask}
          onCompleteWork={handleCompleteTask}
        />
      )}
    </AppShell>
  );
}
