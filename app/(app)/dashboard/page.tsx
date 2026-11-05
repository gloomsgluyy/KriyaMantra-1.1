"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Instagram,
  NavArrowRight,
  Plus,
  Shop,
  Sparks,
  User,
} from "iconoir-react";

import { useDashboard } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecentActivity } from "@/components/ui/recent-activity";

export default function DashboardPage() {
  const { summary, activities, isLoading } = useDashboard();

  if (isLoading || !summary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3 bg-[#fafaf9]">
        <div className="w-8 h-8 border-3 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#57534e]">Menyiapkan Dashboard Sanggar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#292524] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-[28px] bg-[#ffffff] border border-[#e7e5e4] shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#292524]">
                Om Swastyastu, Ibu Ketut!
              </h1>
              <Badge className="bg-[#fffbeb] text-[#b45309] border-[#fde68a] text-[11px]">
                Tenun Sekar Jepun
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#57534e]">
              Sentra Kriya Binaan <strong>Bali DigiFest 2026</strong> • Klungkung, Bali
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/demo">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 rounded-xl border-[#fde68a] bg-[#fffdfa] text-[#b45309] hover:bg-[#fef3c7] text-xs font-bold gap-1.5 shadow-xs"
              >
                <Sparks className="w-4 h-4 text-[#f59e0b]" />
                <span>Mode Juri Sandbox</span>
              </Button>
            </Link>
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

        {/* 4 Summary Metric Cards (F-DASH-01) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Published */}
          <div className="p-5 rounded-[24px] bg-[#ffffff] border border-[#e7e5e4] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#57534e]">Poster Terbit</span>
              <div className="w-8 h-8 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center text-[#059669]">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#292524]">
              {summary.totalPostsPublished}
            </p>
            <p className="text-[11px] text-[#059669] font-medium">
              Live di Instagram feed
            </p>
          </div>

          {/* Scheduled */}
          <div className="p-5 rounded-[24px] bg-[#ffffff] border border-[#e7e5e4] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#57534e]">Terjadwal Pekan Ini</span>
              <div className="w-8 h-8 rounded-xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center text-[#d97706]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#292524]">
              {summary.totalPostsScheduled}
            </p>
            <p className="text-[11px] text-[#b45309] font-medium">
              Siap auto-post otomatis
            </p>
          </div>

          {/* Catalog */}
          <div className="p-5 rounded-[24px] bg-[#ffffff] border border-[#e7e5e4] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#57534e]">Karya di Katalog</span>
              <div className="w-8 h-8 rounded-xl bg-[#fafaf9] border border-[#e7e5e4] flex items-center justify-center text-[#57534e]">
                <Shop className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#292524]">
              {summary.totalProductsCataloged}
            </p>
            <p className="text-[11px] text-[#78716c]">
              Wastra tenun terdata
            </p>
          </div>

          {/* Quota */}
          <div className="p-5 rounded-[24px] bg-[#ffffff] border border-[#e7e5e4] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#57534e]">Sisa Kuota AI</span>
              <div className="w-8 h-8 rounded-xl bg-[#fffdfa] border border-[#fde68a] flex items-center justify-center text-[#d97706]">
                <Sparks className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#292524]">
              {summary.quotaRemaining} / {summary.quotaTotal}
            </p>
            <p className="text-[11px] text-[#57534e]">
              Generasi poster bulan ini
            </p>
          </div>
        </div>

        {/* Main Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Fast Action & Upcoming Post (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Action Card: Chat AI CTA (F-DASH-02) */}
            <div className="p-6 rounded-[28px] bg-[#fffdfa] border border-[#fde68a] shadow-xs relative overflow-hidden space-y-4">
              <div className="max-w-md space-y-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#b45309] bg-[#fef3c7] border border-[#fde68a] px-2.5 py-0.5 rounded-full">
                  <Sparks className="w-3.5 h-3.5" />
                  Marketing Assistant
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#292524] tracking-tight">
                  Ada karya tenun baru yang ingin dipasarkan hari ini?
                </h2>
                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                  Diskusikan ide visual dengan asisten AI, pilih kain dari katalog, dan hasilkan poster promosi Instagram berkualitas tinggi dalam hitungan detik.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link href="/chat">
                  <Button className="h-10 px-5 bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-bold rounded-2xl gap-2 shadow-xs text-xs sm:text-sm">
                    <span>Mulai Percakapan di Chat</span>
                    <NavArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="h-10 px-4 rounded-2xl border-[#e7e5e4] text-[#57534e] text-xs">
                    Lihat Katalog
                  </Button>
                </Link>
              </div>
            </div>

            {/* Upcoming Post Card (F-DASH-04) */}
            {summary.upcomingPost && (
              <div className="p-5 rounded-[28px] bg-[#ffffff] border border-[#e7e5e4] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f4]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#f59e0b]" />
                    <h3 className="text-sm font-bold text-[#292524]">
                      Postingan Tayang Berikutnya
                    </h3>
                  </div>
                  <Link href="/schedule">
                    <span className="text-xs text-[#b45309] font-semibold hover:underline flex items-center gap-0.5">
                      Buka Kalender <NavArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-[#e7e5e4] shrink-0 border border-[#e7e5e4]">
                    <Image
                      src={summary.upcomingPost.imageUrl}
                      alt={summary.upcomingPost.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#b45309] bg-[#fef3c7] border border-[#fde68a] px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      Terjadwal Besok • 10:00 WITA
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#292524] truncate">
                      {summary.upcomingPost.title}
                    </h4>
                    <p className="text-[11px] text-[#57534e] line-clamp-2 leading-relaxed">
                      {summary.upcomingPost.caption}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Instagram Connection Status Card (F-DASH-03) */}
            <div className="p-4 rounded-[24px] bg-[#ffffff] border border-[#e7e5e4] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f59e0b] to-pink-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#292524]">
                      {summary.instagramHandle}
                    </p>
                    <CheckCircle className="w-3.5 h-3.5 text-[#059669]" />
                  </div>
                  <p className="text-[11px] text-[#57534e]">
                    Akun Instagram Bisnis Tersambung & Siap Auto-Post
                  </p>
                </div>
              </div>

              <Link href="/profile">
                <Button variant="outline" size="sm" className="h-8 text-xs rounded-xl border-[#e7e5e4]">
                  Kelola
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Recent Activity from Spectrum UI (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <RecentActivity
              title="Aktivitas Operasional Sanggar"
              items={activities}
            />

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/schedule"
                className="p-4 rounded-2xl bg-[#ffffff] border border-[#e7e5e4] hover:border-[#f59e0b] transition-all group block shadow-xs"
              >
                <Calendar className="w-5 h-5 text-[#f59e0b] mb-2" />
                <p className="text-xs font-bold text-[#292524] group-hover:text-[#b45309]">
                  Kalender Konten
                </p>
                <p className="text-[10px] text-[#78716c] mt-0.5">
                  Atur jadwal tayang
                </p>
              </Link>

              <Link
                href="/profile"
                className="p-4 rounded-2xl bg-[#ffffff] border border-[#e7e5e4] hover:border-[#f59e0b] transition-all group block shadow-xs"
              >
                <User className="w-5 h-5 text-[#f59e0b] mb-2" />
                <p className="text-xs font-bold text-[#292524] group-hover:text-[#b45309]">
                  Brand Memory
                </p>
                <p className="text-[10px] text-[#78716c] mt-0.5">
                  Kelola identitas sanggar
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

