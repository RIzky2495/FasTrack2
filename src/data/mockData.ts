import { FacilityReport, Technician, TechnicianTask, UserProfile, UserRole } from '../types';

export const ASSET_IMAGES = {
  splashCity:
    'https://lh3.googleusercontent.com/aida/ALJJyrBSQ_Wex4SQMEV47WP4AJ9NytQsLvxzDqzly0tA3cKJA1mLvzh4_1wSvir-ZWG1hb8LRytDHmQsCbMCwn-qwREhsXslkue8P-THdSncInL-XOFlbJMxV48Pj4FAnvNy4GTB54hU9ZVhrdRPGLmySZ1GT9QGp8V6gKvkunrxNhb8nd3PHB1WVQRqZg4jCjhwjAUZxwAu_W4bxTjowMUyGZGayqp6Su3s4yr_6wmQA0YDt5VVzpa0tdxzdA',
  citizenAvatar:
    'https://lh3.googleusercontent.com/aida/ALJJyrAzQYanjJEdRiE0l59fT8O-2iepMhapS-jtblL0A15tXTw-LvYkrCYUuSp6efv_Sjv6GQKzbaT7kAwnL2XEOMbV3zThsECctUbGxksvHfqv03IuqCqtV7LJfgJIUh4qGPqLFaWCDDi0PXMT1y10n25jw-QWUudFUs29e6zwKGNeeNWloIDbuSQNpmEKOHQMykXqLFQgRS9-9XRts6qK-A8PM1oEOQTWB7lV3lTPv8VvBgkGKyRR11rt',
  profileAvatar:
    'https://lh3.googleusercontent.com/aida/ALJJyrCbpbryq1mI_Ii3YBlIlsrzP-TZY7PNfmbD82Dst4jAZEYRjZG3fdDnWnpV4f2OAWDxuriXog3LTZre4vucrhcU9FVL1Px_u_fAPOfPxKqbOUnTPwoWwmZJn_1Y3O4s2MgHS0AT-nE2IOK45JPkMJ7BoZdCx7W3BYvj0C9QnhKaC3_fXkJNnXly98KA4CjI4MdXmgdk9olf4urhILzx-6T2uCE4RuvQdpqr14U_BnrBaIS2fM1ob0ck',
  adminAvatar:
    'https://lh3.googleusercontent.com/aida/ALJJyrAYxAxqDQ_5qQ_vdFKxCd0kZdNxZz5WStEk-7RL14-9ZYLPzGNoHoAc5AO0Su6PMpWVywP1-UjRThKvBVQsDHHz7T-KOLlFTRDtFJXEagM-pjv467rH_IGbfwAjfcK3HcaszqPCABD32iV4lxFQb8iDFA5KRLYcG4ucdZjK-RVsKK9AFjCt0Nsqzgrr-WRDeFGDPOmVwihjDSHINw3U3XirC-fbAcF3UhQLIMpoVWXVA4ACJc4ygA',
  techAvatar:
    'https://lh3.googleusercontent.com/aida/ALJJyrClyhRF6bpJT_v7yQv_pYjTEi4BZ4rAC1aAIkuBYoVh5Q30WVWL1BSjAJlueZD2OOZcapplmRwEk1UgbZluTXjIV44g8aQBK_UjFqPhLrY4nu1e4tjiqYfamBxLFAC4YgF7CIlO6kEBeyAYHkXl5OnAPyulq4iF0FUwUlZNeqvFeW9IOB0gvYz2A6ECAQlhtv9YCBTRT-PAA5ARvWpldRBVaTze0Hn0skuJ0ihcrNSaPZhXM1I',
  damageRoad:
    'https://lh3.googleusercontent.com/aida/ALJJyrC1hsXQMPtV2ljZs22TzsQeydBXUevI9Rs0dcAdyuN1N6iYUS0kL_SD6CfgVp7PSJyDDvzXGhZtGFjuj-iZe49KO4En8cBT9eIR4-Ip9wUq_EOgv8YyZoZSSNnNOMxcYMCZOAAW-RUDWLjRuzEgUl-CKzIKqrDwwEmoV_UHv4oadr8M6vk6_9bFfcaTIOnZpi16KolocBe8GGrId36w5uqmVYSVV25seDUW4etISNJwcdnw2OWI',
  damageLamp:
    'https://lh3.googleusercontent.com/aida/ALJJyrCowJ2VhBIjecsFtBIVLFccXujvqTeCPaMU-11ZTPpEbTK-TOMzAHqoFdWVAsHXhzdrr_S_bSV24Oo4GfGMMS7OdGGpmMMi63RZ6naGY037csPTOBqKP7GGva6ZHDr5Ohe3mDjl1aHkaWzEHMTuZCufgcLm_3RC7IABAwcbJB7zD50SWmhSsaEsx3RQOENI9Qk0Xo80_DsPPtbwd8MU0BFZYEnqg6DxvqaCJd82JqWgcXbsSixmUBltH_RWCnE',
  damageDrain:
    'https://lh3.googleusercontent.com/aida/ALJJyrDnu6NZ1BToEMOLot1rxNGVNKqQgrZANqoqBEcZ7NPfFKHp_cyq4fQuhY9wTP3NEfUcasqiN1fRYgau4H4LWpvyfkd_GClHB50Wx-UZqoKKyu_zCEl8ZRej_-ZgjuVFa-6hin4aBWr8KIFlTbZiaicYNXFwpTTTyGkzNucwWThQMMDxFmtHK4q3kF9832B1jZCuvx8lqvePNP8D1-hlNXZ8JBlx_wV2koDb8dsrwKwCuzqefJHqPg',
};

export const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  citizen: {
    role: 'citizen',
    name: 'Budi Santoso',
    email: 'budi.santoso@warga.id',
    phone: '0812-3456-7890',
    roleLabel: 'Warga Terdaftar',
    avatarUrl: ASSET_IMAGES.citizenAvatar,
  },
  admin: {
    role: 'admin',
    name: 'Siti Aminah',
    email: 'admin@fastrack.go.id',
    phone: '0811-2233-4455',
    roleLabel: 'Admin Dinas',
    avatarUrl: ASSET_IMAGES.adminAvatar,
  },
  tech: {
    role: 'tech',
    name: 'Andi Pratama',
    email: 'andi.teknisi@fastrack.go.id',
    phone: '0813-9876-5432',
    roleLabel: 'Petugas Lapangan',
    avatarUrl: ASSET_IMAGES.techAvatar,
  },
};

export const TECHNICIANS: Technician[] = [
  {
    id: 'tech-andi',
    name: 'Andi Pratama',
    email: 'andi.teknisi@fastrack.go.id',
    phone: '0813-9876-5432',
    availability: 'Tersedia • Spesialis Jalan & Drainase',
    isBusy: false,
    avatarUrl: ASSET_IMAGES.techAvatar,
  },
  {
    id: 'tech-dedi',
    name: 'Dedi Kurniawan',
    email: 'dedi.teknisi@fastrack.go.id',
    phone: '0815-4433-2211',
    availability: 'Tersedia • Spesialis PJU & Kelistrikan',
    isBusy: false,
    avatarUrl: ASSET_IMAGES.techAvatar,
  },
  {
    id: 'tech-hendra',
    name: 'Hendra Wijaya',
    email: 'hendra.teknisi@fastrack.go.id',
    phone: '0817-7788-9900',
    availability: 'Sedang Bertugas (2 tugas aktif)',
    isBusy: true,
    avatarUrl: ASSET_IMAGES.techAvatar,
  },
];

export const INITIAL_REPORTS: FacilityReport[] = [
  {
    id: 'FT-2026-014',
    title: 'Jalan Berlubang Depan SDN 03',
    category: 'Jalan Rusak',
    description:
      'Lubang berdiameter sekitar 60 cm di lajur kiri jalan tepat di depan gerbang sekolah, membahayakan pengendara motor saat hujan.',
    location: 'Jl. Ahmad Yani No. 45, Bekasi',
    additionalInfo: 'Rawan macet saat jam pulang sekolah',
    dateLabel: '24 Nov 2026',
    shortDate: '24 Nov',
    status: 'menunggu',
    priority: 'Tinggi',
    reporterName: 'Budi Santoso',
    reporterPhone: '0812-3456-7890',
    reporterAvatar: ASSET_IMAGES.citizenAvatar,
    photoUrl: ASSET_IMAGES.damageRoad,
    photoType: 'road',
    estimatedTime: 'Menunggu',
    timeline: [
      {
        title: 'Laporan Dikirim',
        timestamp: '24 Nov, 07:45',
        description: 'Dikirim oleh Budi Santoso beserta foto lokasi.',
        state: 'done',
      },
      {
        title: 'Sedang Ditinjau',
        timestamp: '24 Nov, 08:00',
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
  },
  {
    id: 'FT-2026-015',
    title: 'Atap Halte Transjakarta Bocor',
    category: 'Fasilitas Umum Lainnya',
    description:
      'Atap seng halte bagian timur lepas sebagian sehingga air hujan menggenangi area tunggu penumpang.',
    location: 'Halte Dukuh Atas, Jakarta Pusat',
    dateLabel: '24 Nov 2026',
    shortDate: '24 Nov',
    status: 'menunggu',
    priority: 'Sedang',
    reporterName: 'Rina Kusuma',
    reporterPhone: '0819-3344-5566',
    reporterAvatar: ASSET_IMAGES.profileAvatar,
    photoUrl: ASSET_IMAGES.damageLamp,
    photoType: 'shelter',
    estimatedTime: 'Menunggu',
    timeline: [
      {
        title: 'Laporan Dikirim',
        timestamp: '24 Nov, 08:20',
        description: 'Dikirim oleh Rina Kusuma beserta foto kondisi halte.',
        state: 'done',
      },
      {
        title: 'Sedang Ditinjau',
        timestamp: '24 Nov, 08:30',
        description: 'Admin memverifikasi titik lokasi halte dan urgensi.',
        state: 'active',
      },
      {
        title: 'Laporan Diterima',
        description: 'Persetujuan tindak lanjut oleh tim teknis.',
        state: 'pending',
      },
      {
        title: 'Teknisi Ditugaskan',
        description: 'Penunjukan petugas lapangan.',
        state: 'pending',
      },
      {
        title: 'Sedang Dikerjakan',
        description: 'Perbaikan atap halte.',
        state: 'pending',
      },
      {
        title: 'Perbaikan Selesai',
        description: 'Menunggu konfirmasi penyelesaian.',
        state: 'pending',
      },
    ],
  },
  {
    id: 'FT-2026-011',
    title: 'Lampu PJU Simpang Menteng',
    category: 'Lampu Jalan Mati',
    description:
      'Tiga tiang lampu penerangan jalan umum di sisi utara simpang padam total sejak pukul 18.30 WIB sehingga jalanan gelap dan rawan kecelakaan.',
    location: 'Jl. HOS Cokroaminoto, Jakarta Pusat',
    dateLabel: '22 Nov 2026',
    shortDate: '22 Nov',
    status: 'diproses',
    priority: 'Tinggi',
    reporterName: 'Budi Santoso',
    reporterPhone: '0812-3456-7890',
    reporterAvatar: ASSET_IMAGES.citizenAvatar,
    photoUrl: ASSET_IMAGES.damageLamp,
    photoType: 'lamp',
    assignedTechId: 'tech-andi',
    assignedTechName: 'Andi Pratama',
    estimatedTime: 'Est. 16:00',
    taskId: 'TGS-042',
    adminNote: 'Bawa unit lampu LED 90W dan periksa panel saklar otomatis.',
    timeline: [
      {
        title: 'Laporan Dikirim',
        timestamp: '22 Nov, 08:15',
        description: 'Dikirim oleh Budi Santoso beserta foto lokasi.',
        state: 'done',
      },
      {
        title: 'Sedang Ditinjau',
        timestamp: '22 Nov, 09:40',
        description: 'Admin memverifikasi kelengkapan data dan titik lokasi.',
        state: 'done',
      },
      {
        title: 'Laporan Diterima',
        timestamp: '22 Nov, 10:05',
        description: 'Disetujui untuk ditindaklanjuti oleh tim teknis.',
        state: 'done',
      },
      {
        title: 'Teknisi Ditugaskan',
        timestamp: '23 Nov, 08:30',
        description: 'Andi Pratama membawa peralatan pengganti lampu.',
        state: 'done',
      },
      {
        title: 'Sedang Dikerjakan',
        timestamp: '24 Nov, 09:15',
        description: 'Pengecekan jaringan kabel dan penggantian unit LED.',
        state: 'active',
      },
      {
        title: 'Perbaikan Selesai',
        description: 'Menunggu konfirmasi penyelesaian dari petugas.',
        state: 'pending',
      },
    ],
  },
  {
    id: 'FT-2026-008',
    title: 'Saluran Drainase Tersumbat Sampah',
    category: 'Drainase Tersumbat',
    description:
      'Saluran air di tepi jalan penuh endapan lumpur dan sampah plastik sehingga meluap ke badan jalan setiap kali turun hujan.',
    location: 'Jl. Kemang Raya No. 18, Jakarta Selatan',
    dateLabel: '19 Nov 2026',
    shortDate: '19 Nov',
    status: 'selesai',
    priority: 'Sedang',
    reporterName: 'Budi Santoso',
    reporterPhone: '0812-3456-7890',
    reporterAvatar: ASSET_IMAGES.citizenAvatar,
    photoUrl: ASSET_IMAGES.damageDrain,
    photoType: 'drain',
    assignedTechId: 'tech-andi',
    assignedTechName: 'Andi Pratama',
    estimatedTime: 'Selesai',
    taskId: 'TGS-039',
    completionNote: 'Saluran sudah dibersihkan dan aliran air kembali lancar.',
    timeline: [
      {
        title: 'Laporan Dikirim',
        timestamp: '19 Nov, 07:30',
        description: 'Dikirim oleh Budi Santoso beserta foto lokasi.',
        state: 'done',
      },
      {
        title: 'Sedang Ditinjau',
        timestamp: '19 Nov, 08:45',
        description: 'Admin memverifikasi lokasi saluran drainase.',
        state: 'done',
      },
      {
        title: 'Laporan Diterima',
        timestamp: '19 Nov, 09:10',
        description: 'Disetujui untuk pembersihan saluran.',
        state: 'done',
      },
      {
        title: 'Teknisi Ditugaskan',
        timestamp: '19 Nov, 11:00',
        description: 'Andi Pratama menuju titik Kemang Raya.',
        state: 'done',
      },
      {
        title: 'Sedang Dikerjakan',
        timestamp: '20 Nov, 08:15',
        description: 'Pengangkatan endapan lumpur dan sampah plastik.',
        state: 'done',
      },
      {
        title: 'Perbaikan Selesai',
        timestamp: '20 Nov, 14:20',
        description: 'Saluran sudah dibersihkan dan aliran air kembali lancar.',
        state: 'done',
      },
    ],
  },
];

export const INITIAL_TASKS: TechnicianTask[] = [
  {
    id: 'TGS-043',
    reportId: 'FT-2026-014',
    title: 'Jalan Berlubang di Depan SDN 03',
    category: 'Jalan Rusak',
    location: 'Jl. Ahmad Yani No. 45, Bekasi',
    dateLabel: '24 Nov 2026',
    status: 'menunggu',
    priority: 'Prioritas',
    deadline: '13:00 WIB',
    adminName: 'Siti A.',
    adminNote: 'Prioritaskan penambalan aspal sebelum jam pulang sekolah pukul 13.00 WIB.',
    description:
      'Lubang berdiameter sekitar 60 cm di lajur kiri jalan tepat di depan gerbang sekolah, membahayakan pengendara motor saat hujan.',
    photoUrl: ASSET_IMAGES.damageRoad,
    photoType: 'road',
  },
  {
    id: 'TGS-042',
    reportId: 'FT-2026-011',
    title: 'Lampu PJU Mati di Simpang Menteng',
    category: 'Lampu Jalan Mati',
    location: 'Jl. HOS Cokroaminoto, Jakarta Pusat',
    dateLabel: '23 Nov 2026',
    status: 'dikerjakan',
    priority: 'Tinggi',
    deadline: '16:00 WIB',
    adminName: 'Siti A.',
    adminNote: 'Bawa unit lampu LED 90W dan periksa panel saklar otomatis di tiang utara.',
    description:
      'Tiga tiang lampu penerangan jalan umum di sisi utara simpang padam total sejak pukul 18.30 WIB sehingga jalanan gelap.',
    photoUrl: ASSET_IMAGES.damageLamp,
    photoType: 'lamp',
  },
  {
    id: 'TGS-039',
    reportId: 'FT-2026-008',
    title: 'Saluran Drainase Tersumbat Sampah',
    category: 'Drainase Tersumbat',
    location: 'Jl. Kemang Raya No. 18, Jakarta Selatan',
    dateLabel: '20 Nov 2026',
    status: 'selesai',
    priority: 'Sedang',
    deadline: '15:00 WIB',
    adminName: 'Siti A.',
    adminNote: 'Bersihkan saringan got dan angkut sedimentasi lumpur.',
    description:
      'Saluran air di tepi jalan penuh endapan lumpur dan sampah plastik sehingga meluap ke badan jalan.',
    photoUrl: ASSET_IMAGES.damageDrain,
    photoType: 'drain',
    completionNote: 'Saluran sudah dibersihkan dan aliran air kembali lancar.',
  },
];

export const CATEGORY_STATS_BASE = [
  { label: 'Jalan Rusak', count: 47, colorClass: 'bg-primary' },
  { label: 'Lampu Jalan Mati', count: 31, colorClass: 'bg-primary-navy' },
  { label: 'Drainase Tersumbat', count: 23, colorClass: 'bg-warning' },
  { label: 'Fasilitas Pendidikan & Kesehatan', count: 14, colorClass: 'bg-success' },
  { label: 'Fasilitas Umum Lainnya', count: 9, colorClass: 'bg-outline-strong' },
];
