"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Instagram,
  NavArrowLeft,
  NavArrowRight,
  Plus,
  Refresh,
  Sparks,
  Trash,
  WarningCircle,
} from "iconoir-react";

import { useSchedule } from "@/hooks/use-schedule";
import { ScheduledPost } from "@/types/schedule";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DAYS_OF_WEEK = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

// Month of March 2026 (Day 1 starts on Sunday -> offset 6 for Monday start)
const MARCH_2026_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function SchedulePage() {
  const { posts, isLoading, cancelSchedule, isCancelling, retryPost } = useSchedule();

  const [selectedPostId, setSelectedPostId] = React.useState<string>("post-1");
  const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false);

  const selectedPost = React.useMemo(() => {
    return posts.find((p) => p.id === selectedPostId) || posts[0];
  }, [posts, selectedPostId]);

  const getStatusBadge = (status: ScheduledPost["status"]) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#059669] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Terbit di Instagram
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#b45309] bg-[#fef3c7] border border-[#fde68a] px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            Terjadwal Otomatis
          </span>
        );
      case "publishing":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full animate-pulse">
            <Sparks className="w-3 h-3" />
            Sedang Memposting...
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
            <WarningCircle className="w-3 h-3" />
            Gagal Terbit
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#292524] py-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-[28px] bg-[#ffffff] border border-[#e7e5e4] shadow-xs">
          <div className="flex items-center gap-3.5">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-2.5 rounded-xl border-[#e7e5e4] text-[#57534e]"
                title="Kembali ke Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#292524]">
                  Kalender Penjadwalan Instagram
                </h1>
                <Badge className="bg-[#fffbeb] text-[#b45309] border-[#fde68a] text-[11px]">
                  Maret 2026
                </Badge>
              </div>
              <p className="text-xs text-[#57534e] mt-0.5 flex items-center gap-2">
                <span>Akun Terhubung: <strong>@sekarjepun_endek</strong></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                <span className="text-[#059669] font-medium">Sinkronisasi Aktif</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link href="/chat">
              <Button
                size="sm"
                className="h-9 px-4 bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-bold rounded-xl gap-1.5 shadow-xs text-xs"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Buat Poster Baru</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Calendar Grid & Post Details Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Calendar Grid (8 Columns) */}
          <div className="lg:col-span-8 bg-[#ffffff] rounded-[28px] border border-[#e7e5e4] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f4]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-bold text-sm text-[#292524]">
                  Maret 2026 (Bali DigiFest 2026 Edition)
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#78716c]">
                <button
                  type="button"
                  className="p-1 rounded-lg hover:bg-[#f5f5f4]"
                  title="Bulan sebelumnya"
                >
                  <NavArrowLeft className="w-4 h-4" />
                </button>
                <span className="font-semibold px-2">Bulan Ini</span>
                <button
                  type="button"
                  className="p-1 rounded-lg hover:bg-[#f5f5f4]"
                  title="Bulan berikutnya"
                >
                  <NavArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-[#78716c] pb-2">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {/* Offset days for Sunday start in March 2026 (March 1 was Sunday -> 6 leading empties) */}
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="min-h-20 rounded-xl bg-[#fafaf9]/50 border border-transparent p-1.5 opacity-40 text-xs text-[#a8a29e]"
                />
              ))}

              {/* March 1 - 31 */}
              {MARCH_2026_DAYS.map((day) => {
                const dayPosts = posts.filter((p) => {
                  const d = new Date(p.scheduledAt).getUTCDate();
                  return d === day;
                });

                const isToday = day === 3; // Mock today = March 3, 2026

                return (
                  <div
                    key={day}
                    className={`min-h-24 rounded-2xl border p-2 flex flex-col justify-between transition-all ${
                      isToday
                        ? "bg-[#fffdfa] border-[#f59e0b] ring-1 ring-[#f59e0b]/40 shadow-xs"
                        : "bg-[#ffffff] border-[#e7e5e4] hover:border-[#fde68a]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isToday
                            ? "w-6 h-6 rounded-full bg-[#f59e0b] text-[#292524] flex items-center justify-center text-[11px]"
                            : "text-[#57534e]"
                        }`}
                      >
                        {day}
                      </span>
                      {day === 7 && (
                        <span className="text-[9px] font-bold text-[#b45309] bg-[#fef3c7] px-1 rounded-sm">
                          Pameran
                        </span>
                      )}
                    </div>

                    {/* Post badges for this day */}
                    <div className="space-y-1 my-1">
                      {dayPosts.map((post) => (
                        <button
                          key={post.id}
                          type="button"
                          onClick={() => setSelectedPostId(post.id)}
                          className={`w-full text-left p-1 rounded-lg text-[10px] font-semibold truncate transition-all cursor-pointer flex items-center gap-1 ${
                            selectedPostId === post.id
                              ? "bg-[#292524] text-white shadow-xs"
                              : post.status === "published"
                              ? "bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]"
                              : "bg-[#fffbeb] text-[#b45309] border border-[#fde68a]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              post.status === "published"
                                ? "bg-[#059669]"
                                : "bg-[#f59e0b]"
                            }`}
                          />
                          <span className="truncate">{post.title}</span>
                        </button>
                      ))}
                    </div>

                    <div className="text-[9px] text-[#a8a29e] text-right">
                      {dayPosts.length > 0 && `${dayPosts.length} post`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Post Detail Workbench (4 Columns) */}
          <div className="lg:col-span-4 bg-[#ffffff] rounded-[28px] border border-[#e7e5e4] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f4]">
              <h2 className="text-sm font-bold text-[#292524]">
                Detail Postingan Terjadwal
              </h2>
              {selectedPost && getStatusBadge(selectedPost.status)}
            </div>

            {isLoading || !selectedPost ? (
              <p className="text-xs text-[#78716c] py-8 text-center">
                Pilih salah satu jadwal di kalender untuk melihat detail.
              </p>
            ) : (
              <div className="space-y-4">
                {/* Artwork Thumbnail & Meta */}
                <div className="flex gap-3">
                  <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-[#e7e5e4] shrink-0 border border-[#e7e5e4]">
                    <Image
                      src={selectedPost.imageUrl || "/assets/content/poster-1.webp"}
                      alt={selectedPost.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-xs font-bold text-[#292524] leading-snug">
                      {selectedPost.title}
                    </p>
                    <p className="text-[11px] text-[#57534e]">
                      Karya: <strong>{selectedPost.productName}</strong>
                    </p>
                    <p className="text-[10px] text-[#78716c] uppercase tracking-wider">
                      Format: <strong>{selectedPost.format === "feed" ? "Instagram Feed (4:5)" : "Instagram Story (9:16)"}</strong>
                    </p>
                  </div>
                </div>

                {/* Best Posting Time Box (F-SCH-01) */}
                <div className="p-3 rounded-2xl bg-[#fffdfa] border border-[#fde68a] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b45309]">
                    <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>Waktu Tayang Terjadwal:</span>
                  </div>
                  <p className="text-sm font-bold text-[#292524]">
                    {new Date(selectedPost.scheduledAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} • {new Date(selectedPost.scheduledAt).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} WITA
                  </p>
                  <p className="text-[11px] text-[#57534e]">
                    💡 <em>Waktu Emas: Wisatawan mancanegara dan kolektor wastra paling aktif berselancar pada rentang jam ini.</em>
                  </p>
                </div>

                {/* Caption Snippet with CopyButton */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#57534e]">
                      Teks Caption & Tagar
                    </span>
                    <CopyButton
                      value={`${selectedPost.caption}\n\n${selectedPost.hashtags.join(" ")}`}
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs border-[#fde68a] text-[#b45309]"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#fafaf9] border border-[#e7e5e4] text-xs text-[#292524] whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto no-scrollbar">
                    {selectedPost.caption}
                    {"\n\n"}
                    <span className="text-[#b45309] font-medium">
                      {selectedPost.hashtags.join(" ")}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-[#f5f5f4]">
                  {/* Backup Download Package (F-SCH-08) */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="w-full h-9 rounded-xl border-[#e7e5e4] text-[#292524] text-xs font-bold gap-1.5 hover:bg-[#fffbeb]"
                  >
                    <Download className="w-4 h-4 text-[#f59e0b]" />
                    <span>Unduh Paket Siap-Upload (Cadangan)</span>
                  </Button>

                  {/* Cancel Schedule Button */}
                  {selectedPost.status === "scheduled" && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => cancelSchedule(selectedPost.id)}
                      disabled={isCancelling}
                      className="w-full h-8 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl gap-1"
                    >
                      <Trash className="w-3.5 h-3.5" />
                      <span>{isCancelling ? "Membatalkan..." : "Batalkan Jadwal Ini"}</span>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Package Modal (F-SCH-08) */}
      <Dialog open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen}>
        <DialogContent className="max-w-md rounded-[28px] p-6 bg-[#ffffff]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#292524] flex items-center gap-2">
              <Download className="w-4 h-4 text-[#f59e0b]" />
              Unduh Paket Siap-Upload (Manual Backup)
            </DialogTitle>
            <DialogDescription className="text-xs text-[#57534e]">
              Jika API Instagram mengalami pembatasan token, perajin tetap dapat memposting materi karya ini secara mandiri lewat aplikasi Instagram di HP.
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-3 mt-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#fffbeb] border border-[#fde68a] space-y-1">
                <p className="font-bold text-[#b45309]">Isi Paket Unduhan:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[#57534e] text-[11px]">
                  <li>File gambar poster resolusi tinggi (Format {selectedPost.format.toUpperCase()})</li>
                  <li>Teks caption bilingual yang telah disetujui</li>
                  <li>Daftar tagar kurasi relevan kriya Bali</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Tutup
                </Button>
                <a
                  href={selectedPost.imageUrl}
                  download={`poster-${selectedPost.id}.webp`}
                  onClick={() => setIsDownloadModalOpen(false)}
                >
                  <Button className="rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-bold text-xs gap-1.5 shadow-xs">
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Sekarang (.ZIP)</span>
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

