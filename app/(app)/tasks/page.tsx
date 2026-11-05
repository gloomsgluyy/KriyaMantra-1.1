"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  Sparks,
  Calendar,
  Clock,
  NavArrowRight,
  Shop,
  Eye,
  User,
  FilterList,
  FireFlame,
  Star,
  Refresh,
} from "iconoir-react";
import { useTasks } from "@/hooks/use-tasks";
import { TaskCheckbox } from "@/components/ui/task-checkbox";
import { TaskRows, TaskRow } from "@/components/ui/task-rows";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TaskCategory } from "@/types/task";

const AI_AUTOMATION_TASKS: TaskRow[] = [
  {
    id: "auto-1",
    title: "Sinkronisasi Kalender Upacara Bali Maret 2026",
    detail: "Selesai",
    status: "completed",
    note: "Menyinkronkan Tilem Kesanga dan perayaan Nyepi 1948 dengan basis data sanggar.",
    category: "Otomasi AI",
  },
  {
    id: "auto-2",
    title: "Pemeriksaan Konsistensi Memori Brand Tenun",
    detail: "Aktif",
    status: "running",
    note: "Memastikan klaim 100% pewarna alam daun tarum konsisten di seluruh draf caption.",
    category: "Memori",
  },
  {
    id: "auto-3",
    title: "Pemantauan Kuota Harian Pameran DigiFest",
    detail: "Dalam Antrean",
    status: "queued",
    note: "Menjaga ketersediaan 8/10 generasi poster siap pakai untuk juri dan pengunjung stan.",
    category: "Sistem",
  },
];

export default function TasksPage() {
  const { tasks, progress, isLoading, toggleTask } = useTasks();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const filteredTasks = React.useMemo(() => {
    if (selectedCategory === "all") return tasks;
    return tasks.filter((t) => t.category === selectedCategory);
  }, [tasks, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#292524] pb-24">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-[#e7e5e4] bg-[#ffffff]/90 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl border border-[#e7e5e4] text-[#57534e] hover:text-[#292524] hover:bg-[#f5f5f4] transition-colors"
            title="Kembali ke Dashboard"
          >
            <NavArrowRight className="w-4 h-4 rotate-180" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-[#292524] tracking-tight">
                Tugas Mingguan Pemasaran
              </h1>
              <Badge variant="outline" className="bg-[#fffbeb] text-[#b45309] border-[#fde68a]">
                Maret 2026
              </Badge>
            </div>
            <p className="text-xs text-[#78716c] hidden sm:block">
              Panduan langkah praktis perajin untuk menjaga konsistensi promosi digital
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/chat">
            <Button
              size="sm"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-semibold rounded-full px-4 gap-1.5 shadow-xs"
            >
              <Sparks className="w-3.5 h-3.5" />
              <span>Chat AI Asisten</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* Progress & Habit Summary Banner */}
        <div className="rounded-[28px] border border-[#fde68a] bg-gradient-to-br from-[#fffdfa] via-[#fffbeb] to-[#fef3c7]/60 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef3c7] border border-[#fde68a] text-xs font-bold text-[#b45309]">
                <FireFlame className="w-4 h-4 text-[#d97706]" />
                <span>{progress.streakDays} Hari Beruntun Aktif Berpromosi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#292524]">
                Target Pemasaran Minggu Ini
              </h2>
              <p className="text-xs sm:text-sm text-[#57534e] max-w-xl leading-relaxed">
                Menyelesaikan tugas harian membantu karya tenun Anda menjangkau lebih banyak wisatawan
                dan kurator di Bali DigiFest 2026.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#fde68a]">
              <div className="text-center px-2">
                <p className="text-2xl font-extrabold text-[#292524]">
                  {progress.completedTasks}/{progress.totalTasks}
                </p>
                <p className="text-[11px] text-[#78716c] font-medium">Tugas Selesai</p>
              </div>
              <div className="h-10 w-[1px] bg-[#e7e5e4]" />
              <div className="text-center px-2">
                <p className="text-2xl font-extrabold text-[#b45309] flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
                  <span>{progress.totalPointsEarned}</span>
                </p>
                <p className="text-[11px] text-[#78716c] font-medium">Poin Kriya</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#57534e]">
              <span>Kemajuan Mingguan</span>
              <span>{progress.progressPercentage}% Tercapai</span>
            </div>
            <div className="w-full h-3 bg-[#e7e5e4] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-full transition-all duration-500"
                style={{ width: `${progress.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Task Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: "all", label: "Semua Tugas" },
            { id: "konten", label: "Pembuatan Konten" },
            { id: "interaksi", label: "Interaksi Wisatawan" },
            { id: "katalog", label: "Kelola Karya" },
            { id: "pameran", label: "Persiapan DigiFest" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#292524] text-white shadow-xs"
                  : "bg-white border border-[#e7e5e4] text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Task List Section using Spectrum UI TaskCheckbox */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#292524] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#f59e0b]" />
              <span>Daftar Tugas Perajin ({filteredTasks.length})</span>
            </h3>
            <span className="text-xs text-[#78716c]">Centang untuk mendapatkan poin</span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-xs text-[#78716c] bg-white rounded-2xl border border-[#e7e5e4]">
              <Refresh className="w-5 h-5 animate-spin mx-auto mb-2 text-[#f59e0b]" />
              Memuat daftar tugas sanggar...
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#78716c] bg-white rounded-2xl border border-[#e7e5e4]">
              Tidak ada tugas untuk kategori ini.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    task.isCompleted
                      ? "bg-[#fafaf9] border-[#e7e5e4] opacity-80"
                      : "bg-white border-[#e7e5e4] hover:border-[#f59e0b]/60 shadow-xs"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <TaskCheckbox
                      checked={task.isCompleted}
                      onCheckedChange={(checked) => toggleTask(task.id, checked)}
                      label={task.title}
                      description={task.description}
                      size="md"
                    />

                    <div className="mt-3 flex flex-wrap items-center gap-2 pl-8">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          task.priority === "tinggi"
                            ? "bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]"
                            : task.priority === "sedang"
                            ? "bg-[#fffbeb] text-[#b45309] border border-[#fde68a]"
                            : "bg-[#f5f5f4] text-[#57534e]"
                        }`}
                      >
                        Prioritas {task.priority}
                      </span>

                      {task.estimatedMinutes && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#78716c]">
                          <Clock className="w-3 h-3" />
                          <span>~{task.estimatedMinutes} Menit</span>
                        </span>
                      )}

                      <span className="text-[11px] font-semibold text-[#059669] bg-[#ecfdf5] px-2 py-0.5 rounded-md">
                        +{task.rewardPoints} Poin
                      </span>
                    </div>
                  </div>

                  {task.actionUrl && (
                    <div className="sm:shrink-0 pl-8 sm:pl-0">
                      <Link href={task.actionUrl}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-full text-xs font-semibold border-[#e7e5e4] hover:border-[#f59e0b] hover:bg-[#fffbeb] text-[#292524] gap-1"
                        >
                          <span>{task.actionLabel || "Jalankan"}</span>
                          <NavArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Background Assistance Tasks from Spectrum UI TaskRows */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#292524] flex items-center gap-2">
              <Sparks className="w-4 h-4 text-[#f59e0b]" />
              <span>Otomasi AI di Balik Layar</span>
            </h3>
            <span className="text-xs text-[#78716c]">Diproses otomatis oleh Kriya Mantra</span>
          </div>

          <TaskRows tasks={AI_AUTOMATION_TASKS} variant="Default" />
        </div>
      </main>
    </div>
  );
}

