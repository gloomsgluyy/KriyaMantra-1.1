import { GenerationDetail } from "@/types/generation";

export const mockGenerationsStore: Record<string, GenerationDetail> = {
  "gen-sekar-jepun-01": {
    id: "gen-sekar-jepun-01",
    businessId: "biz_sekar_jepun_01",
    productId: "prod-1",
    productName: "Kain Tenun Endek Sekar Jepun Sutra Alam",
    status: "completed",
    progressPercent: 100,
    statusMessage: "Rancangan visual selesai dan lolos uji keunikan 98%",
    selectedOptionId: "opt-1",
    revisionsLeft: 2,
    maxRevisions: 3,
    versions: [
      {
        id: "v-1",
        versionNumber: 1,
        feedback: "Generasi rancangan awal berdasarkan foto kain & memori brand",
        optionId: "opt-1",
        captionId:
          "Menyulam doa dalam setiap helai benang sutra alam. Kain Tenun Endek Sekar Jepun ini ditenun perlahan menggunakan pewarna alami fermentasi daun tarum dan kulit manggis. Mewujudkan keharmonisan Tri Hita Karana dalam selembar wastra pusaka Bali.\n\n✨ 100% Sutra Alam & Pewarna Organik\n📍 Klungkung, Bali\nDM kami untuk pemesanan khusus & katalog lengkap.",
        captionEn:
          "Weaving sacred prayers into every thread of pure natural silk. This Sekar Jepun Balinese Endek is handcrafted using wild indigo and mangosteen peel dyes. A living testament to Bali's Tri Hita Karana heritage.\n\n✨ 100% Pure Silk & Organic Botanical Dye\n📍 Handcrafted in Klungkung, Bali\nInquire via DM for international shipping & custom orders.",
        feedImageUrl: "/assets/content/poster-1.webp",
        createdAt: "2026-03-03T08:05:00Z",
      },
    ],
    options: [
      {
        id: "opt-1",
        generationId: "gen-sekar-jepun-01",
        title: "Opsi A: Warisan Leluhur & Alam",
        theme: "Tradisi Wastra Sutra & Pewarna Botani",
        feedImageUrl: "/assets/content/poster-1.webp",
        storyImageUrl: "/assets/illustrations/poster-story.webp",
        caption: {
          id: "Menyulam doa dalam setiap helai benang sutra alam. Kain Tenun Endek Sekar Jepun ini ditenun perlahan menggunakan pewarna alami fermentasi daun tarum dan kulit manggis. Mewujudkan keharmonisan Tri Hita Karana dalam selembar wastra pusaka Bali.\n\n✨ 100% Sutra Alam & Pewarna Organik\n📍 Klungkung, Bali\nDM kami untuk pemesanan khusus & katalog lengkap.",
          en: "Weaving sacred prayers into every thread of pure natural silk. This Sekar Jepun Balinese Endek is handcrafted using wild indigo and mangosteen peel dyes. A living testament to Bali's Tri Hita Karana heritage.\n\n✨ 100% Pure Silk & Organic Botanical Dye\n📍 Handcrafted in Klungkung, Bali\nInquire via DM for international shipping & custom orders.",
          hashtags: [
            "#TenunEndek",
            "#WastraBali",
            "#SutraAlam",
            "#PewarnaAlami",
            "#KriyaMantra",
            "#BaliDigiFest2026",
          ],
        },
        quality: {
          visualQuality: 96,
          uniquenessScore: 98,
          culturalAuthenticity: 100,
          wcagContrastPass: true,
          ethicalAiPass: true,
        },
        aiMarkerText: "Dibuat bersama Kriya Mantra AI • Fakta Terverifikasi",
        createdAt: "2026-03-03T08:05:00Z",
      },
      {
        id: "opt-2",
        generationId: "gen-sekar-jepun-01",
        title: "Opsi B: Kemewahan Berkelanjutan",
        theme: "Modern Sustainable Luxury for Global Artisans",
        feedImageUrl: "/assets/content/poster-2.webp",
        storyImageUrl: "/assets/illustrations/poster-promo.webp",
        caption: {
          id: "Keanggunan wastra Bali untuk panggung dunia. Dibuat dengan cinta dan dedikasi perajin lokal di Klungkung, menghadirkan sentuhan mewah sutra alam yang ramah bumi.\n\n🌿 Pewarna Daun Tarum Fermentasi 14 Hari\n🧵 Tenun ATBM Tradisional Asli\nKoleksi eksklusif untuk Bali DigiFest 2026.",
          en: "Where Sacred Heritage Meets Conscious Luxury. Each thread honors centuries-old Balinese tradition, hand-loomed with wild botanical dyes for collectors worldwide.\n\n🌿 14-Day Fermented Botanical Indigo\n🧵 Authentic Non-Machine Loom Weaving\nExclusive collection for Bali DigiFest 2026.",
          hashtags: [
            "#BalineseHeritage",
            "#SustainableFashion",
            "#ArtisanCraft",
            "#BaliLuxury",
            "#KriyaMantra",
          ],
        },
        quality: {
          visualQuality: 94,
          uniquenessScore: 95,
          culturalAuthenticity: 98,
          wcagContrastPass: true,
          ethicalAiPass: true,
        },
        aiMarkerText: "Dibuat bersama Kriya Mantra AI • Fakta Terverifikasi",
        createdAt: "2026-03-03T08:05:00Z",
      },
    ],
    createdAt: "2026-03-03T08:04:00Z",
    updatedAt: "2026-03-03T08:05:00Z",
  },
};

