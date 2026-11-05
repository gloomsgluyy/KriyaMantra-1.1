"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  WarningCircle as AlertCircle,
  ArrowLeft,
  Lock,
  Mail,
  Sparks as Sparkles,
  ArrowRight,
  CheckCircle as CheckCircle2,
} from "iconoir-react";

export default function LoginPage() {
  const { signIn, isSigningIn, signInError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!email) {
      setValidationError("Silakan masukkan alamat email terdaftar.");
      return;
    }
    if (!password || password.length < 6) {
      setValidationError("Kata sandi minimal 6 karakter.");
      return;
    }

    try {
      await signIn({ email, password });
    } catch {
      // Error handled by mutation state
    }
  };

  const handleDemoJudgeLogin = async () => {
    setValidationError("");
    try {
      await signIn({
        email: "juri.digifest@balidigifest.id",
        password: "demojurybali2026",
        isDemo: true,
      });
    } catch {
      // Handled by mutation state
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbeb] text-[#292524] flex flex-col justify-between selection:bg-[#f59e0b] selection:text-[#292524]">
      {/* Top Header */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <Image
            src="/assets/brand/logo-nav.svg"
            alt="Kriya Mantra"
            width={160}
            height={50}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#57534e] hover:text-[#292524] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </header>

      {/* Main Split Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Visual Brand & Craft Heritage (Desktop) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-8 pr-4">
            <div className="space-y-4">
              <Badge variant="amber" className="text-xs px-3.5 py-1">
                Bali DigiFest 2026 Innovation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.08] text-[#292524]">
                Pendamping pemasaran cerdas untuk perajin Bali.
              </h1>
              <p className="text-base text-[#57534e] leading-relaxed max-w-lg">
                Masuk untuk melanjutkan kurasi poster kerajinan, menjadwalkan konten Instagram dua bahasa, dan menjalankan pendampingan marketing rutin.
              </p>
            </div>

            {/* Artisan Poster Showcase Card */}
            <div className="relative rounded-[28px] overflow-hidden border border-[#e7e5e4] bg-[#ffffff] p-5 shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.15)] flex items-center gap-5">
              <div className="relative w-36 h-48 rounded-[20px] overflow-hidden shrink-0 border border-[#e7e5e4]">
                <Image
                  src="/assets/content/poster-1.webp"
                  alt="Karya Poster Kriya Mantra"
                  fill
                  sizes="150px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#f59e0b]">
                  Contoh Hasil Poster AI
                </span>
                <h2 className="text-lg font-semibold tracking-tight text-[#292524] leading-snug">
                  Kain Endek Sekar Jepun Pewarna Indigo Alami
                </h2>
                <p className="text-xs text-[#57534e] leading-relaxed">
                  Dihasilkan otomatis dari foto kain mentah, lengkap dengan copy promosi Indonesia & English.
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-[#292524] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />
                  <span>100% Siap Tayang ke Instagram</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#57534e] pt-2">
              <span>Kejujuran Data Berlabel Sumber</span>
              <span>•</span>
              <span>Hak Cipta Sepenuhnya Milik Perajin</span>
              <span>•</span>
              <span>Persetujuan Eksplisit</span>
            </div>
          </div>

          {/* Right Column: Interactive Login Forms */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto space-y-6">
            
            {/* Competition Judge Instant Access (F-AUTH-04) */}
            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[24px] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-[#fde68a] text-[#292524]">
                    <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#292524]">
                    Akses Khusus Juri Lomba
                  </h3>
                </div>
                <Badge variant="amber" className="text-[10px] px-2 py-0.5">
                  Sandbox Demo
                </Badge>
              </div>
              <p className="text-xs text-[#57534e] leading-relaxed">
                Juri kompetisi dapat langsung menguji alur aplikasi dengan data perajin tenun Bali yang telah disiapkan.
              </p>
              <Button
                variant="amber"
                size="default"
                className="w-full text-xs font-semibold"
                onClick={handleDemoJudgeLogin}
                disabled={isSigningIn}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Masuk Instan Mode Juri
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </Button>
            </div>

            {/* Standard Crafter Account Login */}
            <Card variant="default" className="shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)] bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-semibold tracking-tight text-[#292524]">
                  Masuk ke Sanggar
                </CardTitle>
                <CardDescription className="text-xs text-[#57534e]">
                  Gunakan email terdaftar untuk mengelola materi promosi usaha Anda
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-1">
                  {(validationError || signInError) && (
                    <div
                      role="alert"
                      className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-[14px] p-3 flex items-start gap-2.5 animate-in fade-in"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <span className="leading-relaxed">
                        {validationError || (signInError as Error)?.message || "Kredensial tidak cocok. Silakan coba kembali."}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-[#292524]"
                    >
                      Alamat Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534e]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="perajin@sanggarbali.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-11"
                        disabled={isSigningIn}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-xs font-semibold text-[#292524]"
                      >
                        Kata Sandi
                      </label>
                      <span className="text-[11px] text-[#57534e]">Minimal 6 karakter</span>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534e]" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-11"
                        disabled={isSigningIn}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="dark"
                    size="lg"
                    className="w-full mt-2"
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? "Memverifikasi Akun..." : "Masuk ke Akun"}
                  </Button>
                </CardContent>

                <CardFooter className="pt-2 pb-6 border-t border-[#e7e5e4] flex flex-col gap-2 text-center text-xs text-[#57534e]">
                  <p>
                    Belum mendaftarkan sanggar Anda?{" "}
                    <Link href="/register" className="font-semibold text-[#f59e0b] hover:text-[#d97706] transition-colors">
                      Daftar akun baru
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-[#e7e5e4] bg-[#ffffff] text-xs text-[#57534e] text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Kriya Mantra — Inovasi AI untuk Bali DigiFest 2026</span>
          <span className="text-[11px] text-[#57534e]/80">Didampingi untuk perajin tradisional Bali</span>
        </div>
      </footer>
    </div>
  );
}
