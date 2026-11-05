"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ColorPicker } from "@/components/ui/color-picker";
import { DirectionAwareTabs, DirectionAwareTab } from "@/components/ui/direction-aware-tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Shop as Building2,
  Sparks as Sparkles,
  ShieldCheck,
  CheckCircle as CheckCircle2,
  Trash as Trash2,
  Plus,
  FloppyDisk as Save,
  ArrowLeft,
  Palette,
  Brain,
  ShareAndroid as Share2,
  InfoCircle as Info,
  Pin as MapPin,
  Phone,
  User,
} from "iconoir-react";
import { SourceProvenance, VerifiedFact } from "@/types/memory";

export default function ProfilePage() {
  const {
    profile,
    isLoadingProfile,
    updateProfile,
    isUpdatingProfile,
    memoryFacts,
    isLoadingMemory,
    addMemory,
    isAddingMemory,
    deleteMemory,
    isDeletingMemory,
  } = useProfile();

  // Local Form State
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [storyPhilosophy, setStoryPhilosophy] = useState("");

  // Brand Kit State
  const [primaryColor, setPrimaryColor] = useState("#F59E0B");
  const [secondaryColor, setSecondaryColor] = useState("#292524");
  const [accentColor, setAccentColor] = useState("#831843");
  const [brandVoice, setBrandVoice] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [moodDescription, setMoodDescription] = useState("");

  // Memory Dialogs State
  const [newFactText, setNewFactText] = useState("");
  const [newFactSource, setNewFactSource] = useState<SourceProvenance>("USER_INPUT");
  const [factToDelete, setFactToDelete] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  useEffect(() => {
    if (profile) {
      setBusinessName(profile.businessName);
      setOwnerName(profile.ownerName);
      setLocation(profile.location);
      setPhoneWhatsapp(profile.phoneWhatsapp);
      setStoryPhilosophy(profile.storyPhilosophy);

      setPrimaryColor(profile.brandKit?.palette?.primary || "#F59E0B");
      setSecondaryColor(profile.brandKit?.palette?.secondary || "#292524");
      setAccentColor(profile.brandKit?.palette?.accent || "#831843");
      setBrandVoice(profile.brandKit?.brandVoice || "");
      setTargetAudience(profile.brandKit?.targetAudience || "");
      setMoodDescription(profile.brandKit?.moodDescription || "");
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        businessName,
        ownerName,
        location,
        phoneWhatsapp,
        storyPhilosophy,
        brandKit: {
          palette: {
            primary: primaryColor,
            secondary: secondaryColor,
            accent: accentColor,
          },
          brandVoice,
          targetAudience,
          moodDescription,
          typographyDescription: profile?.brandKit?.typographyDescription || "Host Grotesk",
        },
      });
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3500);
    } catch (err) {
      console.error("Gagal menyimpan profil", err);
    }
  };

  const handleAddFact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFactText.trim()) return;
    await addMemory({
      fact: newFactText.trim(),
      source: newFactSource,
    });
    setNewFactText("");
  };

  const handleConfirmDeleteFact = async () => {
    if (!factToDelete) return;
    await deleteMemory(factToDelete);
    setFactToDelete(null);
  };

  // Helper Provenance Badge
  const renderSourceBadge = (source: SourceProvenance) => {
    switch (source) {
      case "USER_INPUT":
        return (
          <Badge variant="amber" className="text-[10px] px-2 py-0.5">
            Diisi Perajin
          </Badge>
        );
      case "AI_INFERENCE":
        return (
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-[#f59e0b] text-[#d97706]">
            Disimpulkan AI
          </Badge>
        );
      case "IG_SYNC":
        return (
          <Badge variant="cream" className="text-[10px] px-2 py-0.5 text-blue-700 bg-blue-50 border-blue-200">
            Instagram Sync
          </Badge>
        );
    }
  };

  // 4 Direction-Aware Tabs
  const profileTabs: DirectionAwareTab[] = [
    {
      id: 0,
      label: "Identitas Sanggar",
      icon: <Building2 className="w-3.5 h-3.5" />,
      content: (
        <Card variant="default" className="border-[#e7e5e4] bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-[#292524]">
              Data Identitas Sanggar Kriya
            </CardTitle>
            <CardDescription className="text-xs text-[#57534e]">
              Informasi dasar sanggar yang digunakan sebagai kepala narasi pada materi promosi dan poster.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#57534e]" />
                  Nama Sanggar / Merek
                </label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Nama sanggar..."
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#57534e]" />
                  Nama Pemilik / Maestro
                </label>
                <Input
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Nama pemilik sanggar..."
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#57534e]" />
                  Lokasi Sentra Kriya
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Desa Gelgel, Klungkung, Bali"
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#57534e]" />
                  Kontak WhatsApp Pemesanan
                </label>
                <Input
                  value={phoneWhatsapp}
                  onChange={(e) => setPhoneWhatsapp(e.target.value)}
                  placeholder="+62 8..."
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-[#292524]">
                Filosofi Sejarah & Nilai Warisan Sanggar
              </label>
              <Textarea
                value={storyPhilosophy}
                onChange={(e) => setStoryPhilosophy(e.target.value)}
                rows={4}
                placeholder="Cerita asal-usul keahlian leluhur, tradisi menenun/mengukir..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-3 border-t border-[#e7e5e4]">
            <Button
              variant="amber"
              size="default"
              onClick={handleSaveProfile}
              disabled={isUpdatingProfile}
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isUpdatingProfile ? "Menyimpan..." : "Simpan Identitas"}
            </Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      id: 1,
      label: "Brand Kit & Palet",
      icon: <Palette className="w-3.5 h-3.5" />,
      content: (
        <Card variant="default" className="border-[#e7e5e4] bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-[#292524]">
              Brand Kit Visual & Karakter Nada
            </CardTitle>
            <CardDescription className="text-xs text-[#57534e]">
              Palet warna alami khas karya dan panduan nada bicara yang diacu AI dalam menyusun teks caption dan poster.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-2">
            {/* Visual Color Palette Editor using ColorPicker */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-[#292524] block">
                Palet Warna Kriya Alami (3 Warna Acuan Desain Poster)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <ColorPicker
                  label="Warna Utama (Primary)"
                  color={primaryColor}
                  onChange={setPrimaryColor}
                />
                <ColorPicker
                  label="Warna Latar Gelap (Secondary)"
                  color={secondaryColor}
                  onChange={setSecondaryColor}
                />
                <ColorPicker
                  label="Warna Aksen Motif (Accent)"
                  color={accentColor}
                  onChange={setAccentColor}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524]">
                  Gaya Bahasa & Nada Bicara (Brand Voice)
                </label>
                <Input
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  placeholder="Contoh: Hangat, puitis, menghargai tradisi leluhur..."
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524]">
                  Target Pembeli Utama
                </label>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Contoh: Kolektor wastra nusantara, wisatawan mancanegara..."
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#292524]">
                Kesan Visual / Mood Desain Poster
              </label>
              <Input
                value={moodDescription}
                onChange={(e) => setMoodDescription(e.target.value)}
                placeholder="Contoh: Bersahaja, tenang, kaya tekstur benang sutra..."
                className="h-11"
              />
            </div>

            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[16px] p-4 text-xs text-[#57534e] space-y-1">
              <div className="font-semibold text-[#292524] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#f59e0b]" />
                Tipografi Resmi Brand
              </div>
              <p>
                Aplikasi menggunakan tipografi <strong>Host Grotesk</strong> untuk memastikan keterbacaan tinggi di layar HP sekaligus memberikan karakter geometris yang bersih untuk poster kriya.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-3 border-t border-[#e7e5e4]">
            <Button
              variant="amber"
              size="default"
              onClick={handleSaveProfile}
              disabled={isUpdatingProfile}
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isUpdatingProfile ? "Menyimpan..." : "Simpan Brand Kit"}
            </Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      id: 2,
      label: "Memori & Fakta",
      icon: <Brain className="w-3.5 h-3.5" />,
      content: (
        <Card variant="default" className="border-[#e7e5e4] bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-[#292524]">
                  Daftar Fakta Terverifikasi (*Memory Provenance*)
                </CardTitle>
                <CardDescription className="text-xs text-[#57534e]">
                  Setiap klaim yang boleh ditulis AI harus berasal dari fakta terverifikasi di bawah ini.
                </CardDescription>
              </div>
              <Badge variant="amber" className="text-xs font-semibold">
                {memoryFacts.length} Fakta Aktif
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-2">
            {/* Form Tambah Fakta Baru */}
            <form onSubmit={handleAddFact} className="flex flex-col sm:flex-row gap-2.5">
              <Input
                value={newFactText}
                onChange={(e) => setNewFactText(e.target.value)}
                placeholder="Tulis fakta baru (misal: Menggunakan pewarna alami daun tarum)..."
                className="flex-1 h-11"
              />
              <Button variant="default" size="default" type="submit" disabled={isAddingMemory || !newFactText.trim()}>
                <Plus className="w-4 h-4 mr-1" />
                {isAddingMemory ? "Menambah..." : "Tambah Fakta"}
              </Button>
            </form>

            {/* List Kartu Fakta */}
            <div className="space-y-2.5">
              {memoryFacts.map((item: VerifiedFact) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-[16px] border border-[#e7e5e4] bg-[#fafaf9] hover:bg-white hover:border-[#f59e0b]/50 transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <p className="font-medium text-[#292524] leading-relaxed">{item.fact}</p>
                    <div className="flex items-center gap-2">
                      {renderSourceBadge(item.source)}
                      <span className="text-[10px] text-[#a8a29e]">
                        Ditambahkan: {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#a8a29e] hover:text-red-600 hover:bg-red-50 shrink-0"
                    onClick={() => setFactToDelete(item.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="sr-only">Hapus Fakta</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 3,
      label: "Konteks Etis AI",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      content: (
        <Card variant="cream" className="border-[#fde68a] bg-[#fffbeb] shadow-sm">
          <CardHeader className="pb-3">
            <Badge variant="amber" className="w-fit mb-1 text-[10px]">
              Transparansi Etika (Bounded Context)
            </Badge>
            <CardTitle className="text-lg font-bold text-[#292524]">
              Apa yang Boleh Diingat oleh Model AI?
            </CardTitle>
            <CardDescription className="text-xs text-[#57534e]">
              Berikut adalah batas konteks ketat (*bounded context*) yang disuntikkan ke prompt LLM agar tidak ada halusinasi harga, klaim medis, atau diskon palsu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="p-4 bg-white rounded-[16px] border border-[#e7e5e4] font-mono text-xs leading-relaxed text-[#292524] shadow-xs">
              {profile?.boundedAiContext || "Memuat batas konteks..."}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#57534e]">
              <div className="flex items-center gap-2 p-3 bg-white/80 rounded-[12px] border border-[#e7e5e4]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pencegahan klaim berlebihan</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white/80 rounded-[12px] border border-[#e7e5e4]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tanpa rahasia dagang/resep bahan</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-3 border-t border-[#fde68a] flex justify-between items-center text-xs text-[#57534e]">
            <span>Terakhir diselaraskan: {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleTimeString("id-ID") : "-"}</span>
            <Link href="/chat">
              <Button variant="amber" size="default">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Uji Coba di Chat
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffbeb] text-[#292524] selection:bg-[#f59e0b] selection:text-[#292524] py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 md:p-6 rounded-[28px] border border-[#e7e5e4] shadow-sm">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-[#fffbeb] text-[#57534e] transition-colors"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#292524]">
                  {businessName || "Sanggar Tenun Sekar Jepun"}
                </h1>
                <Badge variant="amber" className="text-[10px]">
                  Terverifikasi
                </Badge>
              </div>
              <p className="text-xs text-[#57534e] mt-0.5">
                {location || "Klungkung, Bali"} • Sentra Kriya Binaan Bali DigiFest 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/products">
              <Button variant="outline" size="sm">
                Lihat Katalog Produk
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="amber" size="sm">
                Buka Chat AI
              </Button>
            </Link>
          </div>
        </div>

        {/* Save Success Banner */}
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-[16px] text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Perubahan Profil & Brand Kit berhasil disimpan ke memori sanggar.</span>
          </div>
        )}

        {/* Direction-Aware Tabs Container */}
        <div className="w-full">
          <DirectionAwareTabs tabs={profileTabs} />
        </div>

        {/* Delete Confirmation Alert Dialog */}
        <AlertDialog open={!!factToDelete} onOpenChange={(open) => !open && setFactToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Fakta Memori?</AlertDialogTitle>
              <AlertDialogDescription>
                Fakta ini akan dihapus dari pengetahuan aktif asisten AI. Konten poster di masa depan tidak akan lagi menyertakan rujukan fakta ini.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setFactToDelete(null)}>
                Batal
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDeleteFact} disabled={isDeletingMemory}>
                {isDeletingMemory ? "Menghapus..." : "Ya, Hapus Fakta"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
}
