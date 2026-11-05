"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { HaloDropzone } from "@/components/ui/halo-dropzone";
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
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Sparks as Sparkles,
  ArrowRight,
  ArrowLeft,
  Trash as Trash2,
  Calendar,
  CheckCircle as CheckCircle2,
  Label as Tag,
  Package,
  MediaImage as ImageIcon,
} from "iconoir-react";;
import { Product, PromotionStatus } from "@/types/product";

export default function ProductsPage() {
  const [activeStatus, setActiveStatus] = useState<PromotionStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    products,
    counts,
    isLoading,
    createProduct,
    isCreating,
    deleteProduct,
    isDeleting,
  } = useProducts({ status: activeStatus, q: searchQuery });

  // Drawer Form State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("tenun_endek");
  const [newPrice, setNewPrice] = useState("850000");
  const [newDescription, setNewDescription] = useState("");
  const [newPhilosophy, setNewPhilosophy] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string>("/assets/poster-1.webp");

  // Delete Alert State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) return;

    try {
      await createProduct({
        name: newTitle.trim(),
        category: newCategory,
        price: Number(newPrice),
        images: [selectedPhoto],
        description: newDescription.trim(),
        materialPhilosophy: newPhilosophy.trim(),
      });

      // Reset form
      setNewTitle("");
      setNewPrice("850000");
      setNewDescription("");
      setNewPhilosophy("");
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Gagal menambahkan karya", err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id);
      setProductToDelete(null);
    } catch (err) {
      console.error("Gagal menghapus produk", err);
    }
  };

  const renderStatusBadge = (status: PromotionStatus) => {
    switch (status) {
      case "published":
        return (
          <Badge variant="success" className="text-[10px] px-2 py-0.5">
            Sudah Diposting
          </Badge>
        );
      case "scheduled":
        return (
          <Badge variant="warning" className="text-[10px] px-2 py-0.5">
            Terjadwal
          </Badge>
        );
      case "never_promoted":
        return (
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-[#e7e5e4] text-[#78716c]">
            Belum Dipromosikan
          </Badge>
        );
    }
  };

  const filterTabs: Array<{ id: PromotionStatus | "all"; label: string; count: number }> = [
    { id: "all", label: "Semua Karya", count: counts.all },
    { id: "never_promoted", label: "Belum Promosi", count: counts.never_promoted },
    { id: "scheduled", label: "Terjadwal", count: counts.scheduled },
    { id: "published", label: "Sudah Diposting", count: counts.published },
  ];

  return (
    <div className="min-h-screen bg-[#fffbeb] text-[#292524] selection:bg-[#f59e0b] selection:text-[#292524] py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-[#e7e5e4] shadow-sm">
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
                  Katalog Karya Kriya
                </h1>
                <Badge variant="amber" className="text-[10px]">
                  {products.length} Karya Terdaftar
                </Badge>
              </div>
              <p className="text-xs text-[#57534e] mt-0.5">
                Kelola foto produk, harga, dan filosofi karya untuk materi poster Instagram siap cetak & posting.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/profile">
              <Button variant="outline" size="default">
                Profil & Brand Kit
              </Button>
            </Link>

            {/* Trigger Drawer Tambah Karya */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="amber" size="default">
                  <Plus className="w-4 h-4 mr-1" />
                  Tambah Karya Baru
                </Button>
              </DrawerTrigger>

              <DrawerContent className="max-w-xl mx-auto rounded-t-[32px] p-6 bg-white border-t border-[#e7e5e4] shadow-2xl">
                <DrawerHeader className="text-left px-0 pb-4">
                  <DrawerTitle className="text-xl font-bold tracking-tight text-[#292524]">
                    Tambah Karya Kriya ke Katalog
                  </DrawerTitle>
                  <DrawerDescription className="text-xs text-[#57534e]">
                    Unggah foto produk dan ceritakan filosofinya agar AI dapat menyusun narasi poster yang memikat wisatawan.
                  </DrawerDescription>
                </DrawerHeader>

                <form onSubmit={handleCreateProduct} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 pr-2">
                  {/* Photo Uploader */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#292524] flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#57534e]" />
                      Foto Karya Kriya (Resolusi Tinggi)
                    </label>
                    <HaloDropzone
                      emptyLabel="Tarik atau pilih foto produk kriya"
                      formatHint="JPG, PNG, atau WEBP hingga 10MB"
                      onFiles={(files) => {
                        if (files.length > 0) {
                          setSelectedPhoto("/assets/poster-1.webp");
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#292524]">
                      Nama Karya Kriya
                    </label>
                    <Input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Contoh: Kain Tenun Endek Sekar Jepun Sutra Alam"
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#292524]">
                        Kategori Kerajinan
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full h-11 px-3 text-xs bg-white rounded-[14px] border border-[#e7e5e4] text-[#292524] outline-none focus:ring-2 focus:ring-[#f59e0b]/20"
                      >
                        <option value="tenun_endek">Tenun Ikat & Endek Bali</option>
                        <option value="ukiran_kayu">Ukiran Kayu Tradisional</option>
                        <option value="kerajinan_perak">Kerajinan Perak Celuk</option>
                        <option value="anyaman_bambu">Anyaman Bambu & Rotan</option>
                        <option value="lukisan_kamasan">Lukisan Wayang Kamasan</option>
                        <option value="lainnya">Kerajinan Seni Lainnya</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#292524]">
                        Harga Karya (Rupiah)
                      </label>
                      <Input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="850000"
                        className="h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#292524]">
                      Deskripsi Fisik & Spesifikasi
                    </label>
                    <Textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Contoh: Panjang 220 cm x lebar 105 cm, serat sutra alam, pewarna nabati..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#292524]">
                      Filosofi Motif & Makna Budaya Tradisi
                    </label>
                    <Textarea
                      value={newPhilosophy}
                      onChange={(e) => setNewPhilosophy(e.target.value)}
                      placeholder="Contoh: Motif melambangkan ketulusan doa dan perlindungan spiritual..."
                      rows={2}
                    />
                  </div>

                  <DrawerFooter className="px-0 pt-4 flex flex-row justify-end gap-2">
                    <DrawerClose asChild>
                      <Button variant="outline" size="default" type="button">
                        Batal
                      </Button>
                    </DrawerClose>
                    <Button variant="amber" size="default" type="submit" disabled={isCreating}>
                      {isCreating ? "Menyimpan..." : "Simpan Karya ke Katalog"}
                    </Button>
                  </DrawerFooter>
                </form>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-full border border-[#e7e5e4] shadow-xs">
            {filterTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveStatus(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeStatus === t.id
                    ? "bg-[#f59e0b] text-[#292524] shadow-xs"
                    : "text-[#57534e] hover:text-[#292524] hover:bg-[#fffbeb]"
                }`}
              >
                <span>{t.label}</span>
                <span className="text-[10px] opacity-75 font-mono">({t.count})</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716c]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari karya kriya..."
              className="pl-9 h-10 bg-white rounded-full"
            />
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-[28px] border border-[#e7e5e4] p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#fffbeb] text-[#f59e0b] flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <div className="max-w-sm mx-auto space-y-1">
              <h3 className="text-base font-bold text-[#292524]">
                Tidak Ada Karya yang Cocok
              </h3>
              <p className="text-xs text-[#57534e] leading-relaxed">
                Belum ada produk kriya yang sesuai dengan filter atau kata kunci pencarian Anda.
              </p>
            </div>
            <Button variant="outline" size="default" onClick={() => { setActiveStatus("all"); setSearchQuery(""); }}>
              Reset Filter Pencarian
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <Card
                key={product.id}
                variant="default"
                className="overflow-hidden border-[#e7e5e4] bg-white hover:border-[#f59e0b]/50 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Photo with status badge */}
                  <div className="relative h-48 w-full bg-[#f5f5f4] overflow-hidden">
                    <Image
                      src={product.images[0] || "/assets/poster-1.webp"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      {renderStatusBadge(product.promotionStatus)}
                    </div>
                  </div>

                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center justify-between text-[11px] text-[#78716c] mb-1">
                      <span className="uppercase tracking-wider font-semibold text-[#f59e0b]">
                        {product.category.replace("_", " ")}
                      </span>
                      <span className="font-bold text-sm text-[#292524]">
                        {formatRupiah(product.price)}
                      </span>
                    </div>

                    <CardTitle className="text-base font-bold text-[#292524] line-clamp-1">
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 text-xs text-[#57534e]">
                    <p className="line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {product.materialPhilosophy && (
                      <div className="p-2.5 bg-[#fffbeb] rounded-[12px] border border-[#fde68a] text-[11px] text-[#78350f] italic line-clamp-2">
                        "{product.materialPhilosophy}"
                      </div>
                    )}
                  </CardContent>
                </div>

                <CardFooter className="pt-3 pb-4 border-t border-[#e7e5e4] flex items-center justify-between gap-2">
                  <Link href={`/chat?productId=${product.id}`} className="flex-1">
                    <Button variant="amber" size="sm" className="w-full text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      Buat Poster di Chat
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#a8a29e] hover:text-red-600 hover:bg-red-50 shrink-0"
                    onClick={() => setProductToDelete(product)}
                    title="Hapus Karya"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Hapus</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Alert Dialog */}
        <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Karya dari Katalog?</AlertDialogTitle>
              <AlertDialogDescription>
                Karya <strong>"{productToDelete?.name}"</strong> akan dihapus dari katalog sanggar. Seluruh riwayat foto dan status promosi karya ini akan dibersihkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setProductToDelete(null)}>
                Batal
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting}>
                {isDeleting ? "Menghapus..." : "Ya, Hapus Karya"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
}
