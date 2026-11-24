export type UserRole = 'citizen' | 'admin' | 'tech';

export type ScreenId =
  | 'splash'
  | 'login'
  | 'register'
  | 'citizen-home'
  | 'create-report'
  | 'my-reports'
  | 'report-detail'
  | 'profile'
  | 'admin-home'
  | 'admin-reports'
  | 'admin-review'
  | 'admin-assign'
  | 'admin-statistics'
  | 'tech-home'
  | 'tech-tasks'
  | 'tech-task-detail';

export type ReportStatus =
  | 'menunggu'
  | 'diterima'
  | 'diproses'
  | 'selesai'
  | 'ditolak';

export type TaskStatus = 'menunggu' | 'dikerjakan' | 'selesai';

export interface UserProfile {
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  roleLabel: string;
  avatarUrl: string;
}

export interface TimelineEvent {
  title: string;
  timestamp?: string;
  description: string;
  state: 'done' | 'active' | 'pending' | 'rejected';
}

export interface FacilityReport {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  additionalInfo?: string;
  dateLabel: string;
  shortDate: string;
  status: ReportStatus;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  reporterName: string;
  reporterPhone: string;
  reporterAvatar: string;
  photoUrl: string;
  photoType: 'road' | 'lamp' | 'drain' | 'shelter';
  assignedTechId?: string;
  assignedTechName?: string;
  estimatedTime?: string;
  adminNote?: string;
  rejectionReason?: string;
  completionNote?: string;
  taskId?: string;
  timeline: TimelineEvent[];
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  availability: string;
  isBusy: boolean;
  avatarUrl: string;
}

export interface TechnicianTask {
  id: string;
  reportId: string;
  title: string;
  category: string;
  location: string;
  dateLabel: string;
  status: TaskStatus;
  priority: string;
  deadline: string;
  adminName: string;
  adminNote: string;
  description: string;
  photoUrl: string;
  photoType: 'road' | 'lamp' | 'drain' | 'shelter';
  completionNote?: string;
}
