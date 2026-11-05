"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { HaloDropzone } from "@/components/ui/halo-dropzone";
import {
  Sparks as Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle as CheckCircle2,
  Globe,
  Upload,
  ChatBubble as MessageSquare,
  Shop as Building2,
  Pin as MapPin,
  Label as Tag,
  Check,
} from "iconoir-react";;
import { CraftCategory, BusinessSourceType } from "@/types/onboarding";

export default function OnboardingPage() {
  const router = useRouter();
  const { state, isLoading, saveStep, completeOnboarding } = useOnboarding();

  const [step, setStep] = useState(1);

  // Form states
  const [businessName, setBusinessName] = useState("Tenun Ikat Sekar Jepun");
  const [category, setCategory] = useState<CraftCategory>("tenun_endek");
  const [location, setLocation] = useState("Klungkung, Bali");
  const [description, setDescription] = useState(
    "Pembuatan kain tenun ikat endek tradisional Bali dengan pewarna alami tanaman lokal."
  );

  const [consentAccepted, setConsentAccepted] = useState(true);
  const [selectedSource, setSelectedSource] = useState<BusinessSourceType>("catalog_upload");
  const [webUrl, setWebUrl] = useState("");

  const [brandVoice, setBrandVoice] = useState(
    "Hangat, menghargai tradisi leluhur, autentik, dan ramah wisatawan"
  );
  const [targetAudience, setTargetAudience] = useState(
    "Pencinta wastra nusantara, kolektor seni, dan wisatawan mancanegara"
  );

  const categories: Array<{ id: CraftCategory; label: string; desc: string }> = [
    { id: "tenun_endek", label: "Tenun Ikat & Endek", desc: "Wastra sutra & katun pewarna alami" },
    { id: "ukiran_kayu", label: "Ukiran Kayu", desc: "Patung, relief pewayangan, hiasan" },
    { id: "kerajinan_perak", label: "Perak Celuk", desc: "Perhiasan filigree khas Gianyar" },
    { id: "anyaman_bambu", label: "Anyaman Bambu", desc: "Keben upacara, keranjang rotan" },
    { id: "lukisan_kamasan", label: "Lukisan Kamasan", desc: "Seni lukis wayang klasik Klungkung" },
    { id: "jamu_herbal", label: "Usadha Herbal", desc: "Minyak boreh, loloh, lulur rempah" },
    { id: "kuliner_bali", label: "Kopi & Kuliner Bali", desc: "Kopi Kintamani, suvenir pangan" },
    { id: "lainnya", label: "Kerajinan Lainnya", desc: "Kriya logam, kulit, batu padas" },
  ];

  const handleNext = async () => {
    if (step === 1) {
      await saveStep({
        businessInfo: { businessName, category, location, description },
        currentStep: 2,
      });
      setStep(2);
    } else if (step === 2) {
      if (!consentAccepted) return;
      await saveStep({
        aiConsent: { accepted: true, acceptedAt: new Date().toISOString() },
        currentStep: 3,
      });
      setStep(3);
    } else if (step === 3) {
      await saveStep({
        sourceSelection: { selectedSource, sourceDetails: webUrl },
        currentStep: 4,
      });
      setStep(4);
    } else if (step === 4) {
      await saveStep({
        profileDraft: {
          brandVoice,
          targetAudience,
          speciality: `${businessName} - ${category}`,
          verifiedFacts: [
            { fact: "Didirikan oleh keluarga perajin generasi ketiga", source: "USER_INPUT" },
            { fact: `Sentra kerajinan berlokasi di ${location}`, source: "USER_INPUT" },
            { fact: "Memakai teknik motif tradisional ramah lingkungan", source: "AI_INFERENCE" },
          ],
        },
        currentStep: 5,
      });
      setStep(5);
    } else if (step === 5) {
      await completeOnboarding({
        currentStep: 5,
        businessInfo: { businessName, category, location, description },
        aiConsent: { accepted: true, acceptedAt: new Date().toISOString() },
        sourceSelection: { selectedSource, sourceDetails: webUrl },
        profileDraft: {
          brandVoice,
          targetAudience,
          speciality: `${businessName} - ${category}`,
          verifiedFacts: [
            { fact: "Didirikan oleh keluarga perajin generasi ketiga", source: "USER_INPUT" },
            { fact: `Sentra kerajinan berlokasi di ${location}`, source: "USER_INPUT" },
          ],
        },
        isCompleted: true,
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#fffbeb] text-[#292524] flex flex-col justify-center items-center px-4 py-10 md:py-16 selection:bg-[#f59e0b] selection:text-[#292524]">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Progress Header without Navbar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-medium text-[#57534e]">
            <span className="font-semibold uppercase tracking-wider text-[#f59e0b]">
              Langkah {step} dari 5
            </span>
            <span className="text-[#57534e]">
              {step === 1 && "Identitas Sanggar"}
              {step === 2 && "Etika & Izin AI"}
              {step === 3 && "Sumber Pengetahuan"}
              {step === 4 && "Review Memori Brand"}
              {step === 5 && "Siap Berkarya"}
            </span>
          </div>

          <div className="bg-[#ffffff] rounded-full p-1.5 border border-[#e7e5e4] shadow-sm flex items-center justify-between gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-[#f59e0b]" : "bg-[#f5f5f4]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Info Sanggar / Usaha (F-ONB-02) */}
        {step === 1 && (
          <Card variant="default" className="shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)] bg-white border-[#e7e5e4]">
            <CardHeader className="pb-3">
              <Badge variant="amber" className="w-fit mb-1 text-[11px] font-semibold">
                Langkah 1: Identitas Sanggar
              </Badge>
              <CardTitle className="text-2xl font-bold tracking-tight text-[#292524]">
                Kenalkan Usaha Kerajinan Anda
              </CardTitle>
              <CardDescription className="text-xs text-[#57534e] leading-relaxed">
                Informasi ini akan dipelajari oleh asisten AI agar dapat menulis materi promosi yang autentik sesuai jati diri karya Anda.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#57534e]" />
                  Nama Usaha / Merk Dagang
                </label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Contoh: Sanggar Tenun Sekar Jepun"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524] flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#57534e]" />
                  Kategori Kerajinan Bali
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`text-left p-3 rounded-[14px] border text-xs transition-all ${
                        category === c.id
                          ? "bg-[#fffbeb] border-[#f59e0b] ring-2 ring-[#f59e0b]/30 text-[#292524] font-semibold"
                          : "bg-white border-[#e7e5e4] text-[#57534e] hover:bg-[#fafaf9]"
                      }`}
                    >
                      <div className="font-medium text-[#292524]">{c.label}</div>
                      <div className="text-[10px] text-[#78716c] truncate mt-0.5">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#57534e]" />
                  Lokasi Sentra / Desa di Bali
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Desa Gelgel, Klungkung, Bali"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524]">
                  Cerita Singkat / Nilai Keunikan Karya
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan keistimewaan bahan, motif khas warisan leluhur, atau filosofi tradisi..."
                  rows={3}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end pt-4 border-t border-[#e7e5e4]">
              <Button variant="amber" size="lg" onClick={handleNext}>
                Lanjut ke Persetujuan AI
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* STEP 2: Persetujuan Penggunaan AI (F-ONB-03) */}
        {step === 2 && (
          <Card variant="default" className="shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)] bg-white border-[#e7e5e4]">
            <CardHeader className="pb-3">
              <Badge variant="amber" className="w-fit mb-1 text-[11px] font-semibold">
                Langkah 2: Transparansi & Etika
              </Badge>
              <CardTitle className="text-2xl font-bold tracking-tight text-[#292524]">
                Persetujuan Penggunaan Asisten AI
              </CardTitle>
              <CardDescription className="text-xs text-[#57534e] leading-relaxed">
                Kami menjunjung tinggi etika dan kejujuran data. Mohon pahami bagaimana asisten Kriya Mantra bekerja untuk usaha Anda.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[20px] p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#292524]">
                  <ShieldCheck className="w-5 h-5 text-[#f59e0b]" />
                  Bagaimana Data Anda Dikelola:
                </div>
                <ul className="text-xs text-[#57534e] space-y-2 leading-relaxed list-disc list-inside">
                  <li>Foto produk dan cerita Anda diproses AI hanya untuk pembuatan poster, caption promosi, dan jadwal Instagram sanggar Anda.</li>
                  <li>Kriya Mantra <strong>tidak akan memposting konten apa pun</strong> ke media sosial tanpa konfirmasi manual eksplisit dari Anda.</li>
                  <li>Data hak cipta motif, rahasia resep, dan foto produk tetap 100% milik perajin.</li>
                  <li>Setiap klaim produk akan diberi label asal fakta guna mencegah klaim berlebihan atau keliru.</li>
                </ul>
              </div>

              <div
                onClick={() => setConsentAccepted(!consentAccepted)}
                className={`flex items-start gap-3 p-4 rounded-[14px] border cursor-pointer transition-all ${
                  consentAccepted
                    ? "bg-white border-[#f59e0b] ring-2 ring-[#f59e0b]/20"
                    : "bg-white border-[#e7e5e4]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    consentAccepted ? "bg-[#f59e0b] border-[#f59e0b] text-[#292524]" : "border-[#57534e]"
                  }`}
                >
                  {consentAccepted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="text-xs leading-relaxed text-[#292524]">
                  <strong>Saya menyetujui dan memahami</strong> bahwa Kriya Mantra menggunakan kecerdasan buatan untuk membantu mendampingi pemasaran digital sanggar saya sesuai prinsip kejujuran dan privasi.
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-4 border-t border-[#e7e5e4]">
              <Button variant="outline" size="lg" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali
              </Button>
              <Button variant="amber" size="lg" onClick={handleNext} disabled={!consentAccepted}>
                Lanjut ke Pilihan Sumber
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* STEP 3: Pilihan Sumber Usaha (F-ONB-04) */}
        {step === 3 && (
          <Card variant="default" className="shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)] bg-white border-[#e7e5e4]">
            <CardHeader className="pb-3">
              <Badge variant="amber" className="w-fit mb-1 text-[11px] font-semibold">
                Langkah 3: Sumber Pengetahuan Usaha
              </Badge>
              <CardTitle className="text-2xl font-bold tracking-tight text-[#292524]">
                Dari Mana AI Mengenali Karya Anda?
              </CardTitle>
              <CardDescription className="text-xs text-[#57534e] leading-relaxed">
                Pilih jalur tercepat agar AI memahami produk Anda. Anda bebas mengunggah foto brosur atau melewatinya.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Opsi 1: Upload Brosur / Foto Produk via HaloDropzone */}
                <div
                  onClick={() => setSelectedSource("catalog_upload")}
                  className={`p-4 rounded-[18px] border cursor-pointer transition-all ${
                    selectedSource === "catalog_upload"
                      ? "bg-[#fffbeb] border-[#f59e0b] ring-2 ring-[#f59e0b]/30"
                      : "bg-white border-[#e7e5e4] hover:bg-[#fafaf9]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-full bg-[#fde68a] text-[#292524]">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#292524]">Unggah Foto Brosur / Katalog</h4>
                      <Badge variant="amber" className="text-[9px] px-1.5 py-0">
                        Disarankan untuk Lomba
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#57534e] leading-relaxed">
                    AI Vision membaca teks motif, foto produk, dan harga langsung dari brosur sanggar.
                  </p>
                </div>

                {/* Opsi 2: Hubungkan Instagram */}
                <div
                  onClick={() => setSelectedSource("instagram")}
                  className={`p-4 rounded-[18px] border cursor-pointer transition-all ${
                    selectedSource === "instagram"
                      ? "bg-[#fffbeb] border-[#f59e0b] ring-2 ring-[#f59e0b]/30"
                      : "bg-white border-[#e7e5e4] hover:bg-[#fafaf9]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-full bg-[#fde68a] text-[#292524]">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#292524]">Hubungkan Instagram</h4>
                      <span className="text-[10px] text-[#78716c]">OAuth Resmi</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#57534e] leading-relaxed">
                    Mempelajari gaya caption dan arsip foto produk dari postingan akun sanggar Anda.
                  </p>
                </div>

                {/* Opsi 3: Wawancara Chat */}
                <div
                  onClick={() => setSelectedSource("chat_interview")}
                  className={`p-4 rounded-[18px] border cursor-pointer transition-all ${
                    selectedSource === "chat_interview"
                      ? "bg-[#fffbeb] border-[#f59e0b] ring-2 ring-[#f59e0b]/30"
                      : "bg-white border-[#e7e5e4] hover:bg-[#fafaf9]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-full bg-[#fde68a] text-[#292524]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#292524]">Ceritakan Lewat Chat</h4>
                      <span className="text-[10px] text-[#78716c]">Panduan Santai</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#57534e] leading-relaxed">
                    Asisten akan mengajukan 5 pertanyaan singkat layaknya mengobrol langsung.
                  </p>
                </div>

                {/* Opsi 4: Lewati */}
                <div
                  onClick={() => setSelectedSource("skip")}
                  className={`p-4 rounded-[18px] border cursor-pointer transition-all ${
                    selectedSource === "skip"
                      ? "bg-[#fffbeb] border-[#f59e0b] ring-2 ring-[#f59e0b]/30"
                      : "bg-white border-[#e7e5e4] hover:bg-[#fafaf9]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-full bg-[#f5f5f4] text-[#57534e]">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#292524]">Lewati untuk Sekarang</h4>
                      <span className="text-[10px] text-[#78716c]">Profil Dasar Saja</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#57534e] leading-relaxed">
                    Lanjut langsung membuat poster pertama dengan mengandalkan profil sanggar.
                  </p>
                </div>
              </div>

              {/* HaloDropzone uploader when catalog_upload is selected */}
              {selectedSource === "catalog_upload" && (
                <div className="pt-2">
                  <HaloDropzone
                    emptyLabel="Tarik atau pilih foto brosur & katalog sanggar"
                    formatHint="Format JPG, PNG, atau WEBP hingga 10MB per file"
                    multiple
                  />
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between pt-4 border-t border-[#e7e5e4]">
              <Button variant="outline" size="lg" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali
              </Button>
              <Button variant="amber" size="lg" onClick={handleNext}>
                Lanjut ke Review Profil
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* STEP 4: Review Draft Profil (F-ONB-05) */}
        {step === 4 && (
          <Card variant="default" className="shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)] bg-white border-[#e7e5e4]">
            <CardHeader className="pb-3">
              <Badge variant="amber" className="w-fit mb-1 text-[11px] font-semibold">
                Langkah 4: Konfirmasi Pemahaman AI
              </Badge>
              <CardTitle className="text-2xl font-bold tracking-tight text-[#292524]">
                Review Memori & Gaya Bahasa Usaha
              </CardTitle>
              <CardDescription className="text-xs text-[#57534e] leading-relaxed">
                Berikut adalah cara AI memahami karakter sanggar Anda. Anda dapat mengeditnya kapan saja agar nada tulisan selalu pas.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524]">Gaya Bahasa & Nada Bicara (Brand Voice)</label>
                <Input
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  placeholder="Gaya bahasa promosi..."
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#292524]">Target Pembeli Utama</label>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Target wisatawan / pasar lokal..."
                  className="h-11"
                />
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-[#292524]">Fakta Terverifikasi Berlabel Sumber</span>
                <div className="space-y-2">
                  <div className="p-3 bg-[#fffbeb] rounded-[14px] border border-[#fde68a] flex items-center justify-between text-xs">
                    <span className="font-medium text-[#292524]">Perajin tenun endek pewarna alami di {location}</span>
                    <Badge variant="amber" className="text-[10px]">
                      Diisi Pengguna
                    </Badge>
                  </div>
                  <div className="p-3 bg-[#fffbeb] rounded-[14px] border border-[#fde68a] flex items-center justify-between text-xs">
                    <span className="font-medium text-[#292524]">Didirikan turun-temurun sejak generasi ketiga</span>
                    <Badge variant="amber" className="text-[10px]">
                      Diisi Pengguna
                    </Badge>
                  </div>
                  <div className="p-3 bg-white rounded-[14px] border border-[#e7e5e4] flex items-center justify-between text-xs">
                    <span className="font-medium text-[#292524]">Fokus motif Sekar Jepun sutra untuk busana upacara & suvenir</span>
                    <Badge variant="outline" className="text-[10px]">
                      Tebakan AI
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-4 border-t border-[#e7e5e4]">
              <Button variant="outline" size="lg" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali
              </Button>
              <Button variant="amber" size="lg" onClick={handleNext}>
                Konfirmasi & Selesaikan
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* STEP 5: Selesai & Ajakan Poster Pertama (F-ONB-06) */}
        {step === 5 && (
          <Card variant="cream" className="text-center p-8 space-y-6 shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)] border-[#e7e5e4]">
            <div className="w-16 h-16 rounded-full bg-[#f59e0b] text-[#292524] flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#292524]">
                Onboarding Selesai! Asisten Siap Bekerja
              </h2>
              <p className="text-xs md:text-sm text-[#57534e] leading-relaxed">
                Kriya Mantra kini telah mengingat jati diri <strong>{businessName}</strong>. Sekarang saatnya membuat poster pertama untuk mempromosikan keunikan karya Anda!
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-5 max-w-sm mx-auto border border-[#e7e5e4] shadow-sm text-left text-xs space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-[#292524]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Memori Usaha Aktif</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#292524]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Persetujuan AI Tercatat Aman</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#292524]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Format Poster Instagram (Feed & Story) Siap</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="amber"
                size="lg"
                className="w-full max-w-xs mx-auto"
                onClick={handleNext}
              >
                Buat Poster Pertama di Chat
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
