import { NextRequest, NextResponse } from "next/server";
import { CulturalMoment } from "@/types/moment";

const momentsStore: CulturalMoment[] = [
  {
    id: "evt-1",
    name: "Tawur Agung & Hari Raya Nyepi Saka 1948",
    balineseName: "Rahina Tilem Kesanga & Sipeng Nyepi",
    date: "19 Maret 2026",
    dayRemaining: 16,
    category: "keagamaan",
    description: "Momen penyucian diri dan semesta (Bhuana Alit & Bhuana Agung) dengan keheningan total selama 24 jam.",
    marketingTip: "Posting ucapan damai dan keheningan 1-2 hari sebelum Nyepi. Jangan memposting promosi komersial saat hari H sipeng.",
    suggestedPrompt: "Tolong buatkan poster Instagram ucapan Selamat Hari Raya Nyepi Saka 1948 yang bernuansa hening, damai, dan elegan untuk pelanggan sanggar.",
    badgeLabel: "Momen Sakral Utama",
    badgeColor: "bg-[#fef3c7] text-[#b45309] border-[#fde68a]",
  },
  {
    id: "evt-2",
    name: "Pameran Bali DigiFest 2026 (Stan UMKM Kriya)",
    balineseName: "Festival Transformasi Digital Bali",
    date: "20 - 22 Maret 2026",
    dayRemaining: 17,
    category: "pameran",
    description: "Ajang bergengsi teknologi dan ekonomi kreatif digital provinsi Bali yang dihadiri ribuan delegasi dan kurator seni.",
    marketingTip: "Tonjolkan proses pembuatan kain ATBM dan QR Code katalog digital untuk menarik pengunjung stan pameran DigiFest.",
    suggestedPrompt: "Buatkan poster pengumuman stan Tenun Sekar Jepun di Bali DigiFest 2026: ajak pengunjung merasakan pengalaman meraba wastra sutra alam secara langsung.",
    badgeLabel: "Target Kompetisi & Pameran",
    badgeColor: "bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]",
  },
  {
    id: "evt-3",
    name: "Rahina Purnama Kadasa (Bulan Purnama Ke-10)",
    balineseName: "Purnama Kadasa - Puncak Kesucian",
    date: "2 April 2026",
    dayRemaining: 30,
    category: "keagamaan",
    description: "Purnama paling utama dalam kalender Bali di mana pura-pura besar di seluruh Bali menggelar upacara piodalan agung.",
    marketingTip: "Wisatawan dan warga lokal membutuhkan wastra kamen putih-kuning dan selendang sutra untuk upacara persembahyangan.",
    suggestedPrompt: "Buatkan materi promosi Instagram untuk koleksi Kamen Putih Kuning Tenun Sutra Alam menyambut Rahina Purnama Kadasa.",
    badgeLabel: "Permintaan Busana Adat Tinggi",
    badgeColor: "bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]",
  },
  {
    id: "evt-4",
    name: "Festival Seni Budaya Klungkung 2026",
    balineseName: "Pentas Budaya Bumi Semarapura",
    date: "28 April 2026",
    dayRemaining: 56,
    category: "seni_budaya",
    description: "Perayaan tahunan seni lukis wayang Kamasan dan tenun songket/endek Klungkung.",
    marketingTip: "Bagus untuk menceritakan kisah para penenun sepuh dan filosofi motif leluhur yang hampir punah.",
    suggestedPrompt: "Tolong susun narasi apresiasi maestro penenun Klungkung untuk poster story peringatan Festival Seni Klungkung.",
    badgeLabel: "Edukasi Budaya",
    badgeColor: "bg-[#faf5ff] text-[#7e22ce] border-[#e9d5ff]",
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json({
    moments: momentsStore,
    totalCount: momentsStore.length,
  });
}

