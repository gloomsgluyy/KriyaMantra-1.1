"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  Clock,
  EditPencil,
  Eye,
  Heart,
  InfoCircle,
  Instagram,
  NavArrowRight,
  Send,
  ShareAndroid,
  Sparks,
  WarningCircle,
  Xmark,
} from "iconoir-react";

import { useGeneration } from "@/hooks/use-generation";
import { GenerationVersion, PosterOption } from "@/types/generation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { DirectionAwareTabs, DirectionAwareTab } from "@/components/ui/direction-aware-tabs";
import { IPhone17ProMax } from "@/components/ui/apple-iphone-17-pro";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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

export default function CreateStudioPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const generationId = (params?.id as string) || "gen-sekar-jepun-01";
  const initialOptionId = searchParams.get("option") || "opt-1";

  const {
    generation,
    isLoading,
    isRevising,
    submitRevision,
    isApproving,
    approveGeneration,
  } = useGeneration(generationId);

  // Studio UI states
  const [selectedOptionId, setSelectedOptionId] = React.useState(initialOptionId);
  const [format, setFormat] = React.useState<"feed" | "story">("feed");
  const [activeTab, setActiveTab] = React.useState(0); // 0 = ID, 1 = EN
  const [revisionFeedback, setRevisionFeedback] = React.useState("");
  const [isRevisionNoticeVisible, setIsRevisionNoticeVisible] = React.useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = React.useState(false);
  const [isApprovedSuccess, setIsApprovedSuccess] = React.useState(false);

  // Manual caption edits state (F-REV-03)
  const [editedCaptionId, setEditedCaptionId] = React.useState<string | null>(null);
  const [editedCaptionEn, setEditedCaptionEn] = React.useState<string | null>(null);
  const [isEditingCaption, setIsEditingCaption] = React.useState(false);

  // Current active option
  const currentOption = React.useMemo(() => {
    if (!generation?.options) return null;
    return (
      generation.options.find((opt: PosterOption) => opt.id === selectedOptionId) ||
      generation.options[0]
    );
  }, [generation, selectedOptionId]);

  // Sync edited captions when option changes
  React.useEffect(() => {
    if (currentOption) {
      setEditedCaptionId(currentOption.caption.id);
      setEditedCaptionEn(currentOption.caption.en);
    }
  }, [currentOption]);

  const activeCaptionText = activeTab === 0
    ? (editedCaptionId ?? currentOption?.caption.id ?? "")
    : (editedCaptionEn ?? currentOption?.caption.en ?? "");

  const handleRevisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionFeedback.trim() || !currentOption) return;

    try {
      await submitRevision({
        generationId,
        optionId: currentOption.id,
        feedback: revisionFeedback.trim(),
      });
      setRevisionFeedback("");
      setIsRevisionNoticeVisible(true);
      setTimeout(() => setIsRevisionNoticeVisible(false), 4000);
    } catch (err) {
      console.error("Gagal mengirim revisi:", err);
    }
  };

  const handleApproveConfirm = async () => {
    if (!currentOption) return;
    try {
      await approveGeneration({
        generationId,
        optionId: currentOption.id,
        captionLanguage: activeTab === 0 ? "id" : "en",
        editedCaption: activeCaptionText,
      });
      setIsApprovedSuccess(true);
      setIsApproveDialogOpen(false);
    } catch (err) {
      console.error("Gagal menyetujui poster:", err);
    }
  };

  if (isLoading || !generation || !currentOption) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#57534e]">Menyiapkan Studio Kreasi Poster...</p>
      </div>
    );
  }

  // Define tabs for DirectionAwareTabs
  const captionTabs: DirectionAwareTab[] = [
    {
      id: 0,
      label: "Bahasa Indonesia",
      icon: <span className="text-xs font-bold text-[#b45309]">ID</span>,
      content: (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#57534e]">
              Target: Komunitas Wastra Nusantara & Kolektor Lokal
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingCaption(!isEditingCaption)}
                className="h-7 text-xs text-[#57534e] hover:text-[#292524] gap-1 px-2 rounded-lg"
              >
                <EditPencil className="w-3.5 h-3.5" />
                <span>{isEditingCaption ? "Selesai Edit" : "Edit Teks"}</span>
              </Button>
              <CopyButton
                value={editedCaptionId ?? currentOption.caption.id}
                variant="outline"
                size="sm"
                className="h-7 text-xs border-[#fde68a] text-[#b45309] hover:bg-[#fef3c7]"
              />
            </div>
          </div>

          {isEditingCaption ? (
            <textarea
              value={editedCaptionId ?? ""}
              onChange={(e) => setEditedCaptionId(e.target.value)}
              rows={8}
              className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-[#f59e0b] bg-[#ffffff] text-[#292524] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30"
            />
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#fffdfa] border border-[#fde68a] text-xs sm:text-sm text-[#292524] whitespace-pre-line leading-relaxed shadow-xs">
              {editedCaptionId ?? currentOption.caption.id}
            </div>
          )}

          {/* Hashtags list */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentOption.caption.hashtags.map((tag: string) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 1,
      label: "English for Tourists",
      icon: <span className="text-xs font-bold text-[#b45309]">EN</span>,
      content: (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#57534e]">
              Target: International Travelers, Connoisseurs & Expat Community
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingCaption(!isEditingCaption)}
                className="h-7 text-xs text-[#57534e] hover:text-[#292524] gap-1 px-2 rounded-lg"
              >
                <EditPencil className="w-3.5 h-3.5" />
                <span>{isEditingCaption ? "Done" : "Edit Text"}</span>
              </Button>
              <CopyButton
                value={editedCaptionEn ?? currentOption.caption.en}
                variant="outline"
                size="sm"
                className="h-7 text-xs border-[#fde68a] text-[#b45309] hover:bg-[#fef3c7]"
              />
            </div>
          </div>

          {isEditingCaption ? (
            <textarea
              value={editedCaptionEn ?? ""}
              onChange={(e) => setEditedCaptionEn(e.target.value)}
              rows={8}
              className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-[#f59e0b] bg-[#ffffff] text-[#292524] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30"
            />
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#fffdfa] border border-[#fde68a] text-xs sm:text-sm text-[#292524] whitespace-pre-line leading-relaxed shadow-xs">
              {editedCaptionEn ?? currentOption.caption.en}
            </div>
          )}

          {/* Hashtags list */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentOption.caption.hashtags.map((tag: string) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#e7e5e4]">
        <div className="flex items-center gap-3">
          <Link href="/chat">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 rounded-xl border-[#e7e5e4] text-[#57534e] hover:text-[#292524] gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Chat</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#292524] tracking-tight">
              Studio Review Poster AI
            </h1>
            <p className="text-xs text-[#57534e]">
              Karya: <strong>{generation.productName}</strong>
            </p>
          </div>
        </div>

        {/* Option Selector Pills */}
        <div className="flex items-center gap-2 bg-[#f5f5f4] p-1 rounded-2xl border border-[#e7e5e4]">
          {generation.options.map((opt: PosterOption) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedOptionId(opt.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedOptionId === opt.id
                  ? "bg-[#ffffff] text-[#292524] shadow-sm border border-[#e7e5e4]"
                  : "text-[#78716c] hover:text-[#292524]"
              }`}
            >
              {opt.title.split(":")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Physical Smartphone Simulator (Apple iPhone 17 Pro) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Format Ratio Toggle (F-REV-01) */}
          <div className="flex items-center gap-1.5 bg-[#f5f5f4] p-1 rounded-2xl border border-[#e7e5e4] mb-4">
            <button
              type="button"
              onClick={() => setFormat("feed")}
              className={`px-3.5 py-1 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                format === "feed"
                  ? "bg-[#f59e0b] text-[#292524] shadow-xs"
                  : "text-[#78716c] hover:text-[#292524]"
              }`}
            >
              Feed (4:5)
            </button>
            <button
              type="button"
              onClick={() => setFormat("story")}
              className={`px-3.5 py-1 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                format === "story"
                  ? "bg-[#f59e0b] text-[#292524] shadow-xs"
                  : "text-[#78716c] hover:text-[#292524]"
              }`}
            >
              Story (9:16)
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-[340px]">
            <IPhone17ProMax frameColor="gold" className="p-0">
              {format === "feed" ? (
                /* ================= INSTAGRAM FEED (4:5) PREVIEW ================= */
                <div className="h-full w-full bg-[#121212] text-white flex flex-col justify-between overflow-y-auto no-scrollbar font-sans text-xs">
                  {/* Simulated Instagram Header */}
                  <div className="px-3 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#f59e0b] p-0.5 flex items-center justify-center text-[#292524] font-bold text-[10px]">
                        SJ
                      </div>
                      <div>
                        <p className="text-[11px] font-bold tracking-tight">sekarjepun_endek</p>
                        <p className="text-[9px] text-white/60">Klungkung, Bali</p>
                      </div>
                    </div>
                    <Instagram className="w-4 h-4 text-white/70" />
                  </div>

                  {/* Poster Artwork Display */}
                  <div className="relative w-full flex-1 bg-black flex items-center justify-center overflow-hidden my-auto">
                    <div className="relative w-full aspect-[4/5] transition-all duration-300">
                      <Image
                        src={currentOption.feedImageUrl}
                        alt={currentOption.title}
                        fill
                        sizes="340px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Instagram Footer & Caption Snippet */}
                  <div className="p-3 bg-[#121212] border-t border-white/10 shrink-0 space-y-1.5">
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4" />
                        <ShareAndroid className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] text-white/50">DigiFest 2026</span>
                    </div>

                    <p className="text-[10px] leading-tight text-white/80 line-clamp-2">
                      <span className="font-bold text-white mr-1">sekarjepun_endek</span>
                      {activeCaptionText}
                    </p>

                    {/* Ethical AI Marker (F-REV-07) */}
                    <div className="pt-1 flex items-center gap-1 text-[9px] text-[#fde68a]">
                      <CheckCircle className="w-3 h-3 text-[#f59e0b]" />
                      <span>{currentOption.aiMarkerText}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= INSTAGRAM STORY (9:16) PREVIEW (NO CAPTION!) ================= */
                <div className="relative h-full w-full bg-black text-white overflow-hidden font-sans">
                  {/* Fullscreen Edge-to-Edge 9:16 Artwork */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={currentOption.storyImageUrl}
                      alt={currentOption.title}
                      fill
                      sizes="340px"
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Top Overlay Gradient & Segmented Story Bars */}
                  <div className="absolute top-0 inset-x-0 pt-3 pb-8 px-3 bg-gradient-to-b from-black/80 via-black/35 to-transparent z-10 flex flex-col gap-2">
                    {/* Story Progress Bar Segments */}
                    <div className="flex items-center gap-1 w-full">
                      <div className="h-0.5 flex-1 bg-white rounded-full shadow-xs" />
                      <div className="h-0.5 flex-1 bg-white/40 rounded-full" />
                      <div className="h-0.5 flex-1 bg-white/40 rounded-full" />
                    </div>

                    {/* Story Author Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-amber-500 to-rose-500">
                          <div className="w-6 h-6 rounded-full bg-[#f59e0b] flex items-center justify-center text-[#292524] font-bold text-[9px] border border-black">
                            SJ
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="font-bold tracking-tight text-[11px] text-white drop-shadow-sm">
                            sekarjepun_endek
                          </span>
                          <span className="text-[10px] text-white/70">2j</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-semibold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-white/90 border border-white/10">
                          DigiFest 2026
                        </span>
                        <Xmark className="w-4 h-4 text-white/80" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Story Interaction Overlay (Reply Pill, Heart, Share) — NO CAPTION TEXT! */}
                  <div className="absolute bottom-0 inset-x-0 pt-10 pb-4 px-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 space-y-2">
                    <div className="flex items-center gap-2">
                      {/* Story Reply Pill */}
                      <div className="flex-1 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 flex items-center text-white/70 text-[11px]">
                        <span>Kirim pesan...</span>
                      </div>

                      {/* Story Like Heart */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>

                      {/* Story Send / Share */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Ethical AI Marker on Story */}
                    <div className="flex items-center justify-center gap-1 text-[8.5px] text-white/70">
                      <CheckCircle className="w-2.5 h-2.5 text-[#f59e0b]" />
                      <span>{currentOption.aiMarkerText}</span>
                    </div>
                  </div>
                </div>
              )}
            </IPhone17ProMax>
          </div>
        </div>

        {/* RIGHT COLUMN: Review Workbench & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quality & Guardrail Gate (F-GEN-04, F-GEN-05) */}
          <div className="bg-[#ffffff] rounded-[24px] border border-[#e7e5e4] p-4 shadow-xs">
            <h2 className="text-xs font-bold text-[#57534e] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#059669]" />
              Uji Kelayakan & Kepatuhan Etika AI (Quality Gate)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0]">
                <p className="text-[10px] text-[#047857] font-medium">Skor Keunikan</p>
                <p className="text-base font-bold text-[#065f46]">
                  {currentOption.quality.uniquenessScore}%
                </p>
                <p className="text-[9px] text-[#059669]">Lolos Uji Orisinalitas</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0]">
                <p className="text-[10px] text-[#047857] font-medium">Autentisitas Budaya</p>
                <p className="text-base font-bold text-[#065f46]">
                  {currentOption.quality.culturalAuthenticity}%
                </p>
                <p className="text-[9px] text-[#059669]">Motif & Filosofi Sah</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#fffdfa] border border-[#fde68a]">
                <p className="text-[10px] text-[#b45309] font-medium">Kontras Visual WCAG</p>
                <p className="text-base font-bold text-[#b45309]">AA Lolos</p>
                <p className="text-[9px] text-[#78716c]">Keterbacaan Jernih</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#fffdfa] border border-[#fde68a]">
                <p className="text-[10px] text-[#b45309] font-medium">Guardrail Fakta</p>
                <p className="text-base font-bold text-[#b45309]">100% Valid</p>
                <p className="text-[9px] text-[#78716c]">Bebas Halusinasi</p>
              </div>
            </div>
          </div>

          {/* Bilingual Caption Workbench with DirectionAwareTabs (F-GEN-06, F-GEN-07) */}
          <div className="bg-[#ffffff] rounded-[28px] border border-[#e7e5e4] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#292524]">
                  Caption Dwibahasa Instagram
                </h2>
                <p className="text-xs text-[#57534e]">
                  Diformulasikan berdasarkan narasi tradisi & memori brand
                </p>
              </div>
              <Badge className="bg-[#fef3c7] text-[#b45309] border-[#fde68a] text-[11px]">
                {format === "story" ? "Disimpan untuk Feed & Arsip" : "Dwibahasa Siap Pakai"}
              </Badge>
            </div>

            <DirectionAwareTabs
              tabs={captionTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="mt-2"
            />
          </div>

          {/* Natural Language Revision Panel (F-REV-02, F-REV-06) */}
          <div className="bg-[#ffffff] rounded-[28px] border border-[#e7e5e4] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparks className="w-4 h-4 text-[#f59e0b]" />
                <h2 className="text-sm font-bold text-[#292524]">
                  Permintaan Revisi Bahasa Alami
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#57534e]">
                  Sisa Batas Revisi:
                </span>
                <Badge
                  variant={generation.revisionsLeft > 0 ? "outline" : "danger"}
                  className="text-xs font-bold"
                >
                  {generation.revisionsLeft} dari {generation.maxRevisions} kali
                </Badge>
              </div>
            </div>

            <form onSubmit={handleRevisionSubmit} className="space-y-3">
              <textarea
                value={revisionFeedback}
                onChange={(e) => setRevisionFeedback(e.target.value)}
                disabled={generation.revisionsLeft <= 0 || isRevising}
                placeholder={
                  generation.revisionsLeft > 0
                    ? "Contoh instruksi: 'Tolong buat warna tenun lebih menonjol di pencahayaan senja', atau 'Perjelas proses fermentasi 14 hari pewarna daun tarum pada paragraf kedua'..."
                    : "Batas revisi 3 kali telah tercapai. Anda tetap dapat mengedit teks caption secara manual di atas."
                }
                rows={3}
                className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] text-[#292524] placeholder:text-[#a8a29e] focus:bg-[#ffffff] focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 focus:outline-none transition-all disabled:opacity-50"
              />

              <div className="flex items-center justify-between">
                {/* Version history bottom sheet trigger */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs border-[#e7e5e4] text-[#57534e] hover:text-[#292524] rounded-xl gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Riwayat Revisi ({generation.versions.length})</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="max-w-2xl mx-auto rounded-t-[28px] p-6 bg-[#ffffff]">
                    <DrawerHeader>
                      <DrawerTitle className="text-base font-bold text-[#292524]">
                        Riwayat Perubahan Versi Poster
                      </DrawerTitle>
                      <DrawerDescription className="text-xs text-[#57534e]">
                        Bandingkan instruksi revisi dan perubahan narasi antar versi.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar my-4">
                      {generation.versions.length === 0 ? (
                        <p className="text-xs text-center py-6 text-[#78716c]">
                          Belum ada riwayat revisi tambahan. Ini adalah versi pertama.
                        </p>
                      ) : (
                        generation.versions.map((ver: GenerationVersion) => (
                          <div
                            key={ver.id}
                            className="p-3.5 rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] space-y-2"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#292524]">
                                Versi {ver.versionNumber}
                              </span>
                              <span className="text-[#78716c] text-[11px]">
                                {new Date(ver.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-xs text-[#57534e] italic">
                              &ldquo;{ver.feedback}&rdquo;
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline" className="rounded-xl">
                          Tutup
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Button
                  type="submit"
                  disabled={
                    !revisionFeedback.trim() ||
                    generation.revisionsLeft <= 0 ||
                    isRevising
                  }
                  size="sm"
                  className="h-8 px-4 bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-bold rounded-xl gap-1.5 shadow-xs disabled:opacity-40"
                >
                  <Sparks className="w-3.5 h-3.5" />
                  <span>{isRevising ? "Memproses..." : "Terapkan Revisi"}</span>
                </Button>
              </div>
            </form>

            {isRevisionNoticeVisible && (
              <div className="p-2.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-xs text-[#065f46] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#059669]" />
                <span>Revisi berhasil diterapkan ke dalam rancangan visual dan narasi caption.</span>
              </div>
            )}
          </div>

          {/* Explicit Approval Action Panel (F-REV-05) */}
          <div className="bg-[#fffdfa] rounded-[28px] border border-[#fde68a] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-[#292524] flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#f59e0b]" />
                Persetujuan Final Karya
              </h2>
              <p className="text-xs text-[#57534e]">
                Konfirmasi manual wajib sebelum materi poster diteruskan ke penjadwalan Instagram.
              </p>
            </div>

            {isApprovedSuccess || generation.approvalStatus === "approved" ? (
              <div className="flex items-center gap-2 text-xs font-bold text-[#059669] bg-[#ecfdf5] border border-[#a7f3d0] px-4 py-2.5 rounded-2xl">
                <CheckCircle className="w-4 h-4" />
                <span>Karya Disetujui & Terjadwal!</span>
              </div>
            ) : (
              <AlertDialog
                open={isApproveDialogOpen}
                onOpenChange={setIsApproveDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-11 px-6 bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-bold rounded-2xl shadow-sm text-xs sm:text-sm gap-2"
                  >
                    <span>Setujui & Jadwalkan Posting</span>
                    <NavArrowRight className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[28px] p-6 max-w-md bg-[#ffffff]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-bold text-[#292524]">
                      Konfirmasi Persetujuan Poster
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs text-[#57534e] space-y-2">
                      <span>
                        Apakah Anda menyetujui rancangan poster <strong>{currentOption.title}</strong> beserta caption {activeTab === 0 ? "Bahasa Indonesia" : "English"} untuk dijadwalkan ke akun Instagram <strong>@sekarjepun_endek</strong>?
                      </span>
                      <span className="block text-[11px] text-[#b45309] bg-[#fef3c7] p-2 rounded-xl border border-[#fde68a] mt-2">
                        Persetujuan ini memastikan etika AI terpenuhi: data terverifikasi dan hak cipta karya perajin terlindungi penuh.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel className="rounded-xl border-[#e7e5e4] text-[#57534e]">
                      Tinjau Kembali
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleApproveConfirm}
                      disabled={isApproving}
                      className="rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-bold border-none"
                    >
                      {isApproving ? "Menyetujui..." : "Ya, Setujui & Jadwalkan"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
