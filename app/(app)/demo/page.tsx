"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Eye,
  NavArrowRight,
  Refresh,
  ShieldCheck,
  Shop,
  Sparks,
  User,
  WarningCircle,
} from "iconoir-react";

import { useDemo } from "@/hooks/use-demo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DemoSandboxPage() {
  const { demoStatus, isLoading, resetDemo, isResetting } = useDemo();
  const [resetSuccessMessage, setResetSuccessMessage] = React.useState<string | null>(null);

  const handleResetConfirm = async () => {
    try {
      const res = await resetDemo();
      setResetSuccessMessage(res.message);
      setTimeout(() => setResetSuccessMessage(null), 5000);
    } catch (err) {
      console.error("Gagal mereset demo:", err);
    }
  };

  const testingSteps = [
    {
      number: "1",
      title: "Pemeriksaan Memori Brand & Batas Etika",
      route: "/profile",
      icon: <User className="w-5 h-5 text-[#f59e0b]" />,
      desc: "Lihat profil sanggar Tenun Sekar Jepun, ColorPicker palet warna kriya, fakta terverifikasi, dan batas konteks etis (Bounded Context) bebas halusinasi.",
      badge: "Modul MEM",
    },
    {
      number: "2",
      title: "Katalog Karya Tenun Ikat Bali",
      route: "/products",
      icon: <Shop className="w-5 h-5 text-[#f59e0b]" />,
      desc: "Uji filter status promosi (Belum Promosi, Terjadwal, Terbit), pencarian produk, uploader foto HaloDropzone, dan drawer tambah karya baru.",
      badge: "Modul CAT",
    },
    {
      number: "3",
      title: "Obrolan Interaktif dengan Asisten AI",
      route: "/chat",
      icon: <Sparks className="w-5 h-5 text-[#f59e0b]" />,
      desc: "Uji antarmuka Full-Screen App Shell, pilih karya wastra, kirim instruksi, amati akordeon penalaran ReasoningTrace, dan terima kartu opsi poster.",
      badge: "Modul CHAT",
    },
    {
      number: "4",
      title: "Studio Review & Simulasi iPhone 17 Pro",
      route: "/create/gen-sekar-jepun-01",
      icon: <Eye className="w-5 h-5 text-[#f59e0b]" />,
      desc: "Uji frame fisik iPhone 17 Pro (Feed 4:5 vs Story 9:16), DirectionAwareTabs caption dwibahasa, batas kuota revisi 3x, dan persetujuan eksplisit AlertDialog.",
      badge: "Modul GEN & REV",
    },
  ];

  if (isLoading || !demoStatus) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3 bg-[#fafaf9]">
        <div className="w-8 h-8 border-3 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#57534e]">Menyiapkan Ruang Demo Juri...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#292524] py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 rounded-xl border-[#e7e5e4] text-[#57534e] hover:text-[#292524] gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Dashboard</span>
            </Button>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] border border-[#fde68a] text-xs font-bold text-[#b45309]">
            <ShieldCheck className="w-4 h-4" />
            <span>Sandbox Penjurian Aktif</span>
          </span>
        </div>

        {/* Akses Khusus Juri Lomba Card (Sesuai Referensi Pengguna) */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-[#ffffff] border border-[#fde68a] shadow-sm relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center text-[#d97706] shadow-xs shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#292524]">
                  Akses Khusus Juri Lomba
                </h1>
                <p className="text-xs sm:text-sm text-[#57534e] mt-0.5">
                  Dewan Juri Bali DigiFest 2026
                </p>
              </div>
            </div>

            <Badge className="bg-[#fef3c7] text-[#b45309] border-[#fde68a] text-xs font-bold px-3 py-1">
              Sandbox Demo
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed max-w-2xl">
            Juri kompetisi dapat langsung menguji alur aplikasi secara menyeluruh dengan data perajin tenun Bali yang telah disiapkan secara realistis (Sanggar <strong>Tenun Sekar Jepun</strong>, Klungkung).
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link href="/chat" className="flex-1">
              <Button
                size="lg"
                className="w-full h-12 px-6 bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-bold rounded-2xl shadow-sm text-sm gap-2"
              >
                <Sparks className="w-4 h-4" />
                <span>Masuk Instan Mode Juri (Mulai dari Chat)</span>
                <NavArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            {/* Clean-Start Reset Dialog (F-DEMO-03) */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-4 rounded-2xl border-[#e7e5e4] text-[#57534e] hover:text-[#292524] text-xs font-semibold gap-2"
                >
                  <Refresh className="w-4 h-4" />
                  <span>Reset ke Kondisi Bersih</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[28px] p-6 max-w-md bg-[#ffffff]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-base font-bold text-[#292524]">
                    Reset Data Simulasi Penjurian
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-xs text-[#57534e] space-y-2">
                    <span>
                      Tindakan ini akan mengembalikan seluruh draft obrolan, rancangan poster, dan status katalog ke kondisi awal bersih (*clean-start*) untuk pengujian juri berikutnya.
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                  <AlertDialogCancel className="rounded-xl border-[#e7e5e4] text-[#57534e]">
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleResetConfirm}
                    disabled={isResetting}
                    className="rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-bold border-none"
                  >
                    {isResetting ? "Mereset..." : "Ya, Reset ke Clean-Start"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {resetSuccessMessage && (
            <div className="p-3 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] text-xs text-[#065f46] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" />
              <span>{resetSuccessMessage}</span>
            </div>
          )}
        </div>

        {/* Guided Testing Journey for Judges (4 Steps) */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#292524] tracking-tight">
              Panduan Uji Alur Aplikasi (Guided Testing Journey)
            </h2>
            <p className="text-xs text-[#57534e]">
              Ikuti 4 tahapan alur utama di bawah ini untuk menilai kelayakan teknis dan kepatuhan standar Kriya Mantra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testingSteps.map((step) => (
              <Link
                key={step.number}
                href={step.route}
                className="p-5 rounded-[24px] bg-[#ffffff] border border-[#e7e5e4] hover:border-[#f59e0b] hover:shadow-xs transition-all flex flex-col justify-between group block"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-[#fffdfa] border border-[#fde68a]">
                      {step.icon}
                    </div>
                    <Badge variant="outline" className="text-[10px] text-[#78716c]">
                      {step.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#292524] group-hover:text-[#b45309] transition-colors">
                    Tahap {step.number}: {step.title}
                  </h3>
                  <p className="text-[11px] text-[#57534e] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#f5f5f4] flex items-center justify-between text-xs font-semibold text-[#b45309]">
                  <span>Buka Modul</span>
                  <NavArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

