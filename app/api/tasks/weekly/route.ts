import { NextRequest, NextResponse } from "next/server";
import { MarketingTask, WeeklyTaskProgress } from "@/types/task";

let tasksStore: MarketingTask[] = [
  {
    id: "tsk-1",
    title: "Buat poster Instagram tema Pewarna Alami Daun Tarum",
    description: "Gunakan foto kain tenun sutra alam terbaru untuk menarik minat wisatawan ramah lingkungan.",
    category: "konten",
    priority: "tinggi",
    isCompleted: true,
    dueDate: "2026-03-04",
    rewardPoints: 50,
    estimatedMinutes: 3,
    actionUrl: "/chat",
    actionLabel: "Buka Chat AI",
  },
  {
    id: "tsk-2",
    title: "Jadwalkan postingan ucapan Rahina Tilem Kesanga",
    description: "Tilem Kesanga jatuh pada 18 Maret. Siapkan caption bahasa Bali dan doa ketenteraman semesta.",
    category: "konten",
    priority: "tinggi",
    isCompleted: true,
    dueDate: "2026-03-05",
    rewardPoints: 40,
    estimatedMinutes: 5,
    actionUrl: "/schedule",
    actionLabel: "Lihat Jadwal",
  },
  {
    id: "tsk-3",
    title: "Balas 3 komentar & DM wisatawan tentang Kain Endek Mastuli",
    description: "Pelanggan dari Australia dan Jakarta menanyakan ketersediaan ukuran dan estimasi pengiriman.",
    category: "interaksi",
    priority: "sedang",
    isCompleted: false,
    dueDate: "2026-03-06",
    rewardPoints: 30,
    estimatedMinutes: 5,
  },
  {
    id: "tsk-4",
    title: "Unggah 2 foto detail motif tenun ke katalog sanggar",
    description: "Foto makro anyaman benang sutra ATBM membantu AI menuliskan narasi filosofi yang lebih tajam.",
    category: "katalog",
    priority: "sedang",
    isCompleted: false,
    dueDate: "2026-03-07",
    rewardPoints: 35,
    estimatedMinutes: 8,
    actionUrl: "/products",
    actionLabel: "Buka Katalog",
  },
  {
    id: "tsk-5",
    title: "Kurasi 3 poster unggulan untuk booth Bali DigiFest 2026",
    description: "Pilih poster terbaik beresolusi cetak untuk etalase digital stan pameran Klungkung.",
    category: "pameran",
    priority: "tinggi",
    isCompleted: false,
    dueDate: "2026-03-08",
    rewardPoints: 60,
    estimatedMinutes: 10,
    actionUrl: "/gallery",
    actionLabel: "Buka Galeri",
  },
  {
    id: "tsk-6",
    title: "Perbarui Brand Kit dengan narasi pewarnaan ramah lingkungan",
    description: "Pastikan klaim 100% pewarna alam terverifikasi di dokumen memori sanggar.",
    category: "katalog",
    priority: "rutin",
    isCompleted: false,
    dueDate: "2026-03-09",
    rewardPoints: 25,
    estimatedMinutes: 4,
    actionUrl: "/profile",
    actionLabel: "Buka Profil",
  },
];

export async function GET(request: NextRequest) {
  const completedCount = tasksStore.filter((t) => t.isCompleted).length;
  const totalCount = tasksStore.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);
  const totalPointsEarned = tasksStore
    .filter((t) => t.isCompleted)
    .reduce((acc, curr) => acc + curr.rewardPoints, 0);

  const progress: WeeklyTaskProgress = {
    totalTasks: totalCount,
    completedTasks: completedCount,
    progressPercentage,
    totalPointsEarned,
    streakDays: 4,
  };

  return NextResponse.json({
    tasks: tasksStore,
    progress,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, isCompleted } = body;

    const task = tasksStore.find((t) => t.id === taskId);
    if (!task) {
      return NextResponse.json({ error: "Tugas tidak ditemukan" }, { status: 404 });
    }

    task.isCompleted = isCompleted !== undefined ? isCompleted : !task.isCompleted;

    const completedCount = tasksStore.filter((t) => t.isCompleted).length;
    const totalCount = tasksStore.length;
    const progressPercentage = Math.round((completedCount / totalCount) * 100);
    const totalPointsEarned = tasksStore
      .filter((t) => t.isCompleted)
      .reduce((acc, curr) => acc + curr.rewardPoints, 0);

    return NextResponse.json({
      success: true,
      task,
      progress: {
        totalTasks: totalCount,
        completedTasks: completedCount,
        progressPercentage,
        totalPointsEarned,
        streakDays: 4,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Gagal memperbarui status tugas" }, { status: 500 });
  }
}

