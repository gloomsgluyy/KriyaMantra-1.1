"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparks,
  NavArrowRight,
  Eye,
  Download,
  Copy,
  Check,
  Trash,
  ShareAndroid,
  FilterList,
  CheckCircle,
  Clock,
} from "iconoir-react";
import { useGallery } from "@/hooks/use-gallery";
import { TiltCard, TiltCardItem } from "@/components/ui/tilt-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GalleryPoster, GalleryFilter } from "@/types/gallery";

export default function GalleryPage() {
  const [filter, setFilter] = React.useState<GalleryFilter>("all");
  const { posters, totalCount, publishedCount, isLoading, deletePoster } = useGallery(filter);
  const [selectedPoster, setSelectedPoster] = React.useState<GalleryPoster | null>(null);
  const [activeLang, setActiveLang] = React.useState<"id" | "en">("id");
  const [copiedType, setCopiedType] = React.useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
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
                Galeri Portofolio Poster
              </h1>
              <Badge variant="outline" className="bg-[#fffbeb] text-[#b45309] border-[#fde68a]">
                {totalCount} Karya Tersimpan
              </Badge>
            </div>
            <p className="text-xs text-[#78716c] hidden sm:block">
              Arsip materi visual hasil generasi AI dengan narasi dwibahasa siap unggah
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
              <span>Buat Poster Baru</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* Gallery Statistics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-5 shadow-xs">
            <p className="text-xs font-semibold text-[#78716c]">Total Poster Digital</p>
            <p className="text-2xl font-black text-[#292524] mt-1">{totalCount}</p>
            <p className="text-[11px] text-[#059669] mt-1 font-medium">Feed 4:5 & Story 9:16</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-5 shadow-xs">
            <p className="text-xs font-semibold text-[#78716c]">Terbit di Instagram</p>
            <p className="text-2xl font-black text-[#b45309] mt-1">{publishedCount}</p>
            <p className="text-[11px] text-[#78716c] mt-1 font-medium">Sinkron dengan jadwal sanggar</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-5 shadow-xs">
            <p className="text-xs font-semibold text-[#78716c]">Estimasi Jangkauan</p>
            <p className="text-2xl font-black text-[#059669] mt-1">4.7k+</p>
            <p className="text-[11px] text-[#78716c] mt-1 font-medium">Wisatawan domestik & mancanegara</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "Semua Format" },
              { id: "4:5", label: "Feed 4:5" },
              { id: "9:16", label: "Story 9:16" },
              { id: "published", label: "Sudah Terbit" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as GalleryFilter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  filter === f.id
                    ? "bg-[#292524] text-white shadow-xs"
                    : "bg-white border border-[#e7e5e4] text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#78716c]">
            Arahkan kursor pada kartu untuk efek 3D tilt
          </span>
        </div>

        {/* Posters Grid using Spectrum UI TiltCard */}
        {isLoading ? (
          <div className="p-16 text-center text-xs text-[#78716c] bg-white rounded-2xl border border-[#e7e5e4]">
            Memuat arsip galeri poster...
          </div>
        ) : posters.length === 0 ? (
          <div className="p-16 text-center text-xs text-[#78716c] bg-white rounded-2xl border border-[#e7e5e4] space-y-3">
            <p className="text-sm font-semibold text-[#292524]">Belum ada poster dalam kategori ini</p>
            <p>Mulai rancang materi promosi kriya pertama Anda bersama AI Asisten.</p>
            <Link href="/chat">
              <Button size="sm" className="bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] rounded-full">
                Buka Chat AI
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posters.map((poster) => (
              <TiltCard
                key={poster.id}
                className="overflow-hidden border border-[#e7e5e4] bg-white rounded-3xl group cursor-pointer"
              >
                <div onClick={() => setSelectedPoster(poster)}>
                  {/* Image Frame */}
                  <div
                    className={`relative w-full bg-[#f5f5f4] overflow-hidden ${
                      poster.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={poster.thumbnailUrl}
                      alt={poster.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wide uppercase">
                        {poster.aspectRatio === "9:16" ? "Story 9:16" : "Feed 4:5"}
                      </span>
                      {poster.isPublished ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#059669]/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Terbit</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#d97706]/90 backdrop-blur-md text-white text-[10px] font-bold">
                          Draf
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content & Parallax Item */}
                  <TiltCardItem depth={25} className="p-5 space-y-2.5">
                    <p className="text-[11px] font-medium text-[#78716c] truncate">
                      {poster.productName}
                    </p>
                    <h3 className="text-sm font-bold text-[#292524] truncate group-hover:text-[#d97706] transition-colors">
                      {poster.title}
                    </h3>
                    <p className="text-xs text-[#57534e] line-clamp-2 leading-relaxed">
                      {poster.captionId}
                    </p>

                    <div className="pt-3 border-t border-[#f5f5f4] flex items-center justify-between text-[11px] text-[#78716c]">
                      <span>{poster.engagementEst || "14 Unduhan"}</span>
                      <span className="text-[#f59e0b] font-semibold group-hover:underline flex items-center gap-1">
                        <span>Lihat Detail</span>
                        <NavArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </TiltCardItem>
                </div>
              </TiltCard>
            ))}
          </div>
        )}
      </main>

      {/* Poster Detail Modal Dialog */}
      <Dialog open={Boolean(selectedPoster)} onOpenChange={(open) => !open && setSelectedPoster(null)}>
        {selectedPoster && (
          <DialogContent className="max-w-3xl rounded-[28px] p-6 bg-white overflow-hidden max-h-[90vh] flex flex-col">
            <DialogHeader className="shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-[#fffbeb] text-[#b45309] border-[#fde68a]">
                  {selectedPoster.aspectRatio === "9:16" ? "Format Story 9:16" : "Format Feed 4:5"}
                </Badge>
                {selectedPoster.isPublished && (
                  <Badge variant="outline" className="bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]">
                    Terbit di Instagram
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-lg font-bold text-[#292524]">
                {selectedPoster.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#78716c]">
                Karya: {selectedPoster.productName} • Dibuat pada{" "}
                {new Date(selectedPoster.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 overflow-y-auto no-scrollbar flex-1 pr-1">
              {/* Visual Preview */}
              <div
                className={`relative rounded-2xl overflow-hidden bg-[#f5f5f4] border border-[#e7e5e4] ${
                  selectedPoster.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={selectedPoster.fullImageUrl}
                  alt={selectedPoster.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Captions and Actions */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Language Switcher */}
                  <div className="flex items-center gap-2 p-1 bg-[#f5f5f4] rounded-xl w-fit">
                    <button
                      type="button"
                      onClick={() => setActiveLang("id")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        activeLang === "id"
                          ? "bg-white text-[#292524] shadow-xs"
                          : "text-[#78716c] hover:text-[#292524]"
                      }`}
                    >
                      Bahasa Indonesia
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLang("en")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        activeLang === "en"
                          ? "bg-white text-[#292524] shadow-xs"
                          : "text-[#78716c] hover:text-[#292524]"
                      }`}
                    >
                      English (Wisatawan)
                    </button>
                  </div>

                  {/* Caption Box */}
                  <div className="p-3.5 bg-[#fafaf9] rounded-2xl border border-[#e7e5e4] relative group">
                    <p className="text-xs text-[#292524] leading-relaxed whitespace-pre-line">
                      {activeLang === "id" ? selectedPoster.captionId : selectedPoster.captionEn}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleCopy(
                          activeLang === "id"
                            ? selectedPoster.captionId
                            : selectedPoster.captionEn,
                          "caption"
                        )
                      }
                      className="absolute top-2 right-2 h-7 px-2 text-[11px] gap-1 text-[#57534e] hover:text-[#292524]"
                    >
                      {copiedType === "caption" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#059669]" />
                          <span className="text-[#059669]">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Hashtags */}
                  <div className="p-3 bg-[#fafaf9] rounded-2xl border border-[#e7e5e4] relative">
                    <p className="text-xs text-[#d97706] font-medium">
                      {selectedPoster.hashtags.join(" ")}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleCopy(selectedPoster.hashtags.join(" "), "hashtags")
                      }
                      className="absolute top-2 right-2 h-7 px-2 text-[11px] gap-1 text-[#57534e] hover:text-[#292524]"
                    >
                      {copiedType === "hashtags" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#059669]" />
                          <span className="text-[#059669]">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-[#f5f5f4]">
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    <Button
                      asChild
                      className="w-full sm:flex-1 h-10 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] text-xs font-semibold gap-1.5 shadow-xs"
                    >
                      <a
                        href={selectedPoster.fullImageUrl}
                        download={`${selectedPoster.title}.webp`}
                      >
                        <Download className="w-4 h-4 shrink-0" />
                        <span>Unduh Poster (HD)</span>
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:flex-1 h-10 rounded-full text-xs font-semibold border-[#e7e5e4] hover:bg-[#f5f5f4] gap-1.5"
                    >
                      <Link href={`/create/${selectedPoster.generationId}`}>
                        <Eye className="w-4 h-4 shrink-0" />
                        <span>Buka di Studio</span>
                      </Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#78716c]">
                      {selectedPoster.downloadsCount} kali diunduh
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        deletePoster(selectedPoster.id);
                        setSelectedPoster(null);
                      }}
                      className="text-xs text-[#dc2626] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash className="w-3.5 h-3.5" />
                      <span>Hapus dari Galeri</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

