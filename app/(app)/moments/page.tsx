"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparks,
  NavArrowRight,
  Calendar,
  Clock,
  Shop,
  CheckCircle,
  Eye,
  InfoCircle,
} from "iconoir-react";
import { useMoments } from "@/hooks/use-moments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CulturalMoment, MomentCategory } from "@/types/moment";

export default function MomentsPage() {
  const router = useRouter();
  const { moments, totalCount, isLoading } = useMoments();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const filteredMoments = React.useMemo(() => {
    if (selectedCategory === "all") return moments;
    return moments.filter((m) => m.category === selectedCategory);
  }, [moments, selectedCategory]);

  const handleCreateForMoment = (moment: CulturalMoment) => {
    // Navigate to chat with prefilled prompt
    const encodedPrompt = encodeURIComponent(moment.suggestedPrompt);
    router.push(`/chat?prompt=${encodedPrompt}`);
  };

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
                Kalender Momen Budaya Bali
              </h1>
              <Badge variant="outline" className="bg-[#fffbeb] text-[#b45309] border-[#fde68a]">
                Maret - April 2026
              </Badge>
            </div>
            <p className="text-xs text-[#78716c] hidden sm:block">
              Inspirasi tema promosi berkala yang selaras dengan kalender adat Bali & Bali DigiFest
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/schedule">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-semibold border-[#e7e5e4] hover:bg-[#f5f5f4] gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Jadwal Terbit</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* Cultural Inspiration Hero Card */}
        <div className="rounded-[28px] border border-[#fde68a] bg-gradient-to-br from-[#fffdfa] via-[#fffbeb] to-[#fef3c7]/60 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef3c7] border border-[#fde68a] text-xs font-bold text-[#b45309]">
              <Sparks className="w-4 h-4 text-[#d97706]" />
              <span>Pusat Inspirasi Pemasaran Sanggar</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#292524] leading-tight">
              Pemasaran Berbasis Budaya, Bukan Sekadar Jualan
            </h2>
            <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
              Masyarakat dan wisatawan menghargai kain tenun karena nilai spiritual dan filosofinya.
              Pilih momen perayaan di bawah ini untuk membuat konten edukasi dan penawaran karya
              yang relevan hanya dengan satu klik.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "all", label: "Semua Momen (4)" },
            { id: "keagamaan", label: "Upacara Adat & Rahina (2)" },
            { id: "pameran", label: "Pameran & Kompetisi (1)" },
            { id: "seni_budaya", label: "Festival Seni (1)" },
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

        {/* Moments Cards List */}
        {isLoading ? (
          <div className="p-16 text-center text-xs text-[#78716c] bg-white rounded-2xl border border-[#e7e5e4]">
            Memuat kalender momen budaya...
          </div>
        ) : filteredMoments.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#78716c] bg-white rounded-2xl border border-[#e7e5e4]">
            Tidak ada momen budaya dalam kategori ini.
          </div>
        ) : (
          <div className="space-y-5">
            {filteredMoments.map((moment) => (
              <div
                key={moment.id}
                className="bg-white rounded-[24px] border border-[#e7e5e4] p-6 shadow-xs hover:border-[#f59e0b]/60 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${moment.badgeColor}`}
                      >
                        {moment.badgeLabel}
                      </span>
                      <span className="text-xs text-[#78716c] font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                        <span>{moment.date}</span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#292524]">
                      {moment.name}
                    </h3>
                    <p className="text-xs font-medium text-[#d97706] italic">
                      {moment.balineseName}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="inline-block bg-[#fafaf9] border border-[#e7e5e4] px-3 py-1 rounded-xl text-xs font-bold text-[#292524]">
                      ⏳ {moment.dayRemaining} Hari Lagi
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                  {moment.description}
                </p>

                {/* Practical Tip Callout */}
                <div className="p-3.5 bg-[#fffdfa] rounded-2xl border border-[#fde68a] flex items-start gap-3">
                  <InfoCircle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider">
                      Strategi Promosi Perajin
                    </p>
                    <p className="text-xs text-[#57534e] mt-0.5 leading-relaxed">
                      {moment.marketingTip}
                    </p>
                  </div>
                </div>

                {/* Bottom 1-Click AI CTA */}
                <div className="pt-3 border-t border-[#f5f5f4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs text-[#78716c] truncate max-w-md">
                    Prompt AI: &quot;{moment.suggestedPrompt}&quot;
                  </p>

                  <Button
                    onClick={() => handleCreateForMoment(moment)}
                    className="h-9 px-4 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] text-xs font-bold gap-1.5 shadow-xs shrink-0 cursor-pointer"
                  >
                    <Sparks className="w-3.5 h-3.5" />
                    <span>Buat Materi Promosi Momen Ini</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
