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
  ArrowRight,
  ArrowLeft,
  CheckCircle as CheckCircle2,
  Shop as Building2,
  User,
  Mail,
  Lock,
  Sparks as Sparkles,
  WarningCircle as AlertCircle,
} from "iconoir-react";

export default function RegisterPage() {
  const { signUp, isSigningUp, signUpError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!fullName || !businessName || !email || !password) {
      setValidationError("Semua kolom formulir wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setValidationError("Kata sandi minimal 6 karakter.");
      return;
    }

    try {
      await signUp({
        fullName,
        businessName,
        email,
        password,
      });
    } catch {
      // Error handled by mutation
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
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#57534e] hover:text-[#292524] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sudah Punya Akun? Masuk</span>
        </Link>
      </header>

      {/* Main Split Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Visual Heritage (Desktop) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-8 pr-4">
            <div className="space-y-4">
              <Badge variant="amber" className="text-xs px-3.5 py-1">
                Langkah Awal Digitalisasi Kerajinan
              </Badge>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.08] text-[#292524]">
                Promosikan karya warisan leluhur ke kancah dunia.
              </h1>
              <p className="text-base text-[#57534e] leading-relaxed max-w-lg">
                Daftarkan sanggar kerajinan Anda dalam waktu kurang dari dua menit. Dapatkan poster unik berkualitas galeri dan caption bilingual secara rutin.
              </p>
            </div>

            {/* Balinese Craft Heritage Visual */}
            <div className="relative rounded-[28px] overflow-hidden border border-[#e7e5e4] bg-[#ffffff] p-5 shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.15)] flex items-center gap-5">
              <div className="relative w-36 h-48 rounded-[20px] overflow-hidden shrink-0 border border-[#e7e5e4]">
                <Image
                  src="/assets/content/raw-fabric.jpg"
                  alt="Kain Tenun Tradisional Bali"
                  fill
                  sizes="150px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#f59e0b]">
                  Dari Foto Mentah ke Poster
                </span>
                <h2 className="text-lg font-semibold tracking-tight text-[#292524] leading-snug">
                  Cukup Kirim Foto Kain atau Ukiran
                </h2>
                <p className="text-xs text-[#57534e] leading-relaxed">
                  Asisten AI langsung meracik poster berdesain profesional, caption Indonesia & Inggris, serta jadwal tayang Instagram.
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-[#292524] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />
                  <span>Didesain khusus untuk perajin tanpa tim marketing</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#57534e] pt-2">
              <span>Kejujuran Data Berlabel Sumber</span>
              <span>•</span>
              <span>Persetujuan Manual</span>
              <span>•</span>
              <span>Dua Bahasa Otomatis</span>
            </div>
          </div>

          {/* Right Column: Register Form */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto space-y-6">
            <Card variant="default" className="shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)] bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-semibold tracking-tight text-[#292524]">
                  Daftar Akun Sanggar
                </CardTitle>
                <CardDescription className="text-xs text-[#57534e]">
                  Mulai otomatisasi promosi karya kerajinan Anda dengan pendamping AI
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-1">
                  {(validationError || signUpError) && (
                    <div
                      role="alert"
                      className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-[14px] p-3 flex items-start gap-2.5 animate-in fade-in"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <span className="leading-relaxed">
                        {validationError || (signUpError as Error)?.message || "Gagal mendaftar. Periksa kembali isian formulir."}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullname"
                      className="block text-xs font-semibold text-[#292524]"
                    >
                      Nama Lengkap Pemilik / Perajin
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534e]" />
                      <Input
                        id="fullname"
                        type="text"
                        placeholder="Contoh: Ni Ketut Murniati"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-11"
                        disabled={isSigningUp}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="businessName"
                      className="block text-xs font-semibold text-[#292524]"
                    >
                      Nama Usaha / Merk Dagang / Sanggar
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534e]" />
                      <Input
                        id="businessName"
                        type="text"
                        placeholder="Contoh: Tenun Sutra Alam Gelgel"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="pl-11"
                        disabled={isSigningUp}
                        required
                      />
                    </div>
                  </div>

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
                        disabled={isSigningUp}
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
                        disabled={isSigningUp}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="amber"
                    size="lg"
                    className="w-full mt-2 font-semibold"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? "Mendaftarkan Sanggar..." : "Daftar & Masuk ke Onboarding"}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>

                <CardFooter className="pt-2 pb-6 border-t border-[#e7e5e4] flex flex-col gap-2 text-center text-xs text-[#57534e]">
                  <p>
                    Sudah memiliki akun?{" "}
                    <Link href="/login" className="font-semibold text-[#f59e0b] hover:text-[#d97706] transition-colors">
                      Masuk ke sanggar Anda
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
