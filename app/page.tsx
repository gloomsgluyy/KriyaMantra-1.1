import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SpeechBubble } from "@/components/ui/speech-bubble";
import { CopyButton } from "@/components/ui/copy-button";
import {
  Sparks as Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle as CheckCircle2,
} from "iconoir-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#292524] flex flex-col">
      {/* Floating Pill Navbar per DESIGN.md */}
      <header className="sticky top-3 z-50 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <nav
          aria-label="Main navigation"
          className="bg-white/95 backdrop-blur-md border border-[#e7e5e4] rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.15)]"
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/assets/brand/logo-nav.svg"
              alt="Kriya Mantra"
              width={160}
              height={52}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57534e]">
            <Link href="#cara-kerja" className="hover:text-[#292524] transition-colors">
              Cara Kerja
            </Link>
            <Link href="/chat" className="hover:text-[#292524] transition-colors">
              Chat AI
            </Link>
            <Link href="/create" className="hover:text-[#292524] transition-colors">
              Sudut Poster
            </Link>
            <Link href="/schedule" className="hover:text-[#292524] transition-colors">
              Jadwal
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="amber" size="sm">
                Coba Demo
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="px-4 md:px-8 pt-12 md:pt-20 pb-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Badge variant="amber" className="text-xs px-3 py-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                  Bali DigiFest 2026 Innovation
                </Badge>
                <span className="text-xs text-[#57534e]">Khusus Perajin Bali</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-[#292524]">
                Foto produkmu, jadi poster siap posting.
              </h1>

              <p className="text-lg md:text-xl text-[#57534e] leading-relaxed max-w-xl">
                Satu foto produk kerajinan menjadi poster feed & story, caption bilingual (Indonesia & Inggris), dan jadwal posting Instagram terpandu.
              </p>

              {/* Value Proposition Ticks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm font-medium text-[#292524]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span>Poster unik setiap kali</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span>Caption ID & EN</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span>Persetujuan eksplisit</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link href="/onboarding">
                  <Button variant="amber" size="lg">
                    Buat Poster Pertama
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg">
                    Mode Juri / Sandbox
                  </Button>
                </Link>
              </div>
            </div>

            {/* Interactive Preview Mockup */}
            <div className="lg:col-span-5">
              <Card variant="cream" className="p-4 md:p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-[#e7e5e4]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#57534e]">
                      Live AI Chat Preview
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[11px]">
                    Kriya Companion
                  </Badge>
                </div>

                <div className="py-4 space-y-3">
                  <SpeechBubble role="system">
                    Om Swastyastu Bli Wayan! Ada kain tenun endek baru yang siap dipromosikan hari ini? Kirim fotonya yuk.
                  </SpeechBubble>

                  <SpeechBubble role="user">
                    Ada Bli, baru selesai tenun motif Sekar Jepun warna indigo alami.
                  </SpeechBubble>

                  <SpeechBubble role="system">
                    Matur suksma! Sedang merancang poster Feed (4:5) dan caption dua bahasa untuk wisatawan...
                  </SpeechBubble>
                </div>

                <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between text-xs text-[#57534e]">
                  <span>Caption bilingual siap salin</span>
                  <CopyButton value="Tenun Ikat Endek Sekar Jepun pewarna alami indigo khas Klungkung. #KriyaMantra #EndekBali" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid (Cream Sheets with 56px top corners) */}
        <section id="cara-kerja" className="bg-[#fffbeb] rounded-t-[56px] px-4 md:px-8 py-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="max-w-2xl">
              <Badge variant="amber" className="mb-3">
                Alur Mudah 4 Langkah
              </Badge>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-[#292524]">
                Mengerjakan bersama perajin, bukan cuma memberi tutorial.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-[#fffbeb] flex items-center justify-center text-sm font-bold text-[#f59e0b] mb-2">
                    01
                  </div>
                  <CardTitle>Kirim Foto & Cerita</CardTitle>
                  <CardDescription>
                    Kirim foto kain, ukiran, atau perak langsung lewat chat web atau unggah katalog.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-[#57534e]">
                  AI mengenali detail bahan, motif tradisional, dan cerita budaya di balik karyamu.
                </CardContent>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-[#fffbeb] flex items-center justify-center text-sm font-bold text-[#f59e0b] mb-2">
                    02
                  </div>
                  <CardTitle>Poster & Dua Bahasa</CardTitle>
                  <CardDescription>
                    AI Creative Engine membuat poster feed, story, caption Indonesia dan Inggris.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-[#57534e]">
                  Setiap poster unik dan tidak pernah kembar, dengan kualitas typography yang rapi.
                </CardContent>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-[#fffbeb] flex items-center justify-center text-sm font-bold text-[#f59e0b] mb-2">
                    03
                  </div>
                  <CardTitle>Persetujuan & Jadwal</CardTitle>
                  <CardDescription>
                    Periksa hasil, revisi jika perlu, dan setujui jadwal auto-post ke Instagram.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-[#57534e]">
                  Tidak ada postingan yang meluncur tanpa persetujuan eksplisit dari perajin.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer per DESIGN.md */}
      <footer className="bg-[#292524] text-[#ffffff] px-4 md:px-8 py-12 border-t border-[#3f3b39]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-3">
            <Image src="/assets/brand/logo-footer.svg" alt="Kriya Mantra" width={140} height={45} className="h-7 w-auto object-contain" />
            <span className="text-[#e7e5e4]/50">|</span>
            <span className="text-[#e7e5e4]/70">Bali DigiFest 2026 AI Innovation Challenge</span>
          </div>

          <p className="text-xs text-[#e7e5e4]/60">
            Dibuat untuk memberdayakan UMKM kerajinan tradisional Bali.
          </p>
        </div>
      </footer>
    </div>
  );
}
