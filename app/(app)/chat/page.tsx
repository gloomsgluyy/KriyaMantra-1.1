"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  CheckCircle,
  Clock,
  Dashboard,
  Eye,
  MediaImage,
  Menu,
  NavArrowRight,
  Shop,
  SidebarCollapse,
  Sparks,
  TaskList,
  User,
} from "iconoir-react";

import { useChat } from "@/hooks/use-chat";
import { useProducts } from "@/hooks/use-products";
import { ChatMessage, PosterOptionPayload } from "@/types/chat";
import { Product } from "@/types/product";
import { SpeechBubble } from "@/components/ui/speech-bubble";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Suggestions, Suggestion } from "@/components/ui/suggestions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Spectrum-adapted components
import { ConversationList, ConversationEntry } from "@/components/ui/conversation-list";
import { PromptComposer, ComposerAttachment } from "@/components/ui/prompt-composer";
import { ThinkingDots } from "@/components/ui/thinking-dots";
import { ReasoningTrace } from "@/components/ui/reasoning-trace";
import { MessageActions } from "@/components/ui/message-actions";
import { ChatEmptyState } from "@/components/ui/chat-empty-state";

const INITIAL_CONVERSATIONS: ConversationEntry[] = [
  {
    id: "conv-1",
    title: "Kreasi Poster Tenun Sutra Alam",
    group: "Hari Ini",
    pinned: true,
  },
  {
    id: "conv-2",
    title: "Ide Pameran Kerajinan Sanur",
    group: "Hari Ini",
    pinned: false,
  },
  {
    id: "conv-3",
    title: "Caption Wisatawan Asing Songket",
    group: "Kemarin",
    pinned: false,
  },
  {
    id: "conv-4",
    title: "Filosofi Pewarna Indigo Tarum",
    group: "Pekan Lalu",
    pinned: false,
  },
];

export default function ChatPage() {
  const { messages, isLoading, sendMessage, isSending } = useChat();
  const { products } = useProducts();

  // Layout & Sidebar States
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [conversations, setConversations] = React.useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = React.useState("conv-1");

  // Chat Input States
  const [inputMessage, setInputMessage] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isProductPickerOpen, setIsProductPickerOpen] = React.useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = React.useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  React.useEffect(() => {
    scrollToBottom("auto");
    const timer = setTimeout(() => scrollToBottom("smooth"), 150);
    return () => clearTimeout(timer);
  }, [messages, isSending, scrollToBottom]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const promptParam = params.get("prompt");
      if (promptParam) {
        setInputMessage(decodeURIComponent(promptParam));
      }
    }
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() && !selectedProduct) return;

    const content = text.trim();
    const attachment = selectedProduct
      ? {
          type: "image" as const,
          url: selectedProduct.images[0] || "/assets/content/raw-fabric.jpg",
          name: selectedProduct.name,
          productId: selectedProduct.id,
        }
      : undefined;

    setInputMessage("");
    setSelectedProduct(null);

    try {
      await sendMessage({
        content: content || `Tolong buatkan materi promosi untuk karya ${selectedProduct?.name}`,
        attachment,
      });
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    }
  };

  const handleSelectSuggestion = (text: string) => {
    setInputMessage(text);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductPickerOpen(false);
    if (!inputMessage) {
      setInputMessage(
        `Tolong buatkan poster Instagram untuk ${product.name}, tekankan keunggulan pewarna alami dan filosofi motifnya.`
      );
    }
  };

  const handleSimulateVoice = () => {
    setIsVoiceRecording(true);
    setTimeout(() => {
      setIsVoiceRecording(false);
      setInputMessage(
        "Tolong buatkan poster dengan nuansa tenang untuk pameran kerajinan tenun di Sanur minggu depan."
      );
    }, 1500);
  };

  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newEntry: ConversationEntry = {
      id: newId,
      title: "Obrolan Pemasaran Baru",
      group: "Hari Ini",
      pinned: false,
    };
    setConversations([newEntry, ...conversations]);
    setActiveConvId(newId);
    setInputMessage("");
    setSelectedProduct(null);
  };

  const composerAttachment: ComposerAttachment | null = selectedProduct
    ? {
        id: selectedProduct.id,
        type: "product",
        name: selectedProduct.name,
        url: selectedProduct.images[0] || "/assets/content/raw-fabric.jpg",
        productId: selectedProduct.id,
      }
    : null;

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#fafaf9] text-[#292524]">
      {/* ======================================================================
          LEFT SIDEBAR: Conversation List & App Navigation (Collapsible, 280px)
          ====================================================================== */}
      <aside
        className={`h-full border-r border-[#e7e5e4] bg-[#ffffff] transition-all duration-300 flex flex-col shrink-0 z-30 ${
          isSidebarOpen ? "w-72" : "w-0 -translate-x-full lg:w-0 lg:translate-x-0"
        } overflow-hidden`}
      >
        {/* App Logo & Header */}
        <div className="p-4 border-b border-[#f5f5f4] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/brand/logo-nav.svg"
              alt="Kriya Mantra"
              width={140}
              height={44}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-lg text-[#78716c] hover:text-[#292524] hover:bg-[#f5f5f4] transition-colors"
            title="Tutup Panel Samping"
          >
            <SidebarCollapse className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Quick Links */}
        <div className="px-3 pt-3 pb-1 border-b border-[#f5f5f4] space-y-0.5">
          <Link
            href="/chat"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#fffbeb] text-[#b45309] border border-[#fde68a]"
          >
            <Sparks className="w-4 h-4 text-[#f59e0b]" />
            <span>Chat Pemasaran</span>
          </Link>
          <Link
            href="/create/gen-sekar-jepun-01"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Studio Kreasi Poster</span>
          </Link>
          <Link
            href="/gallery"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors"
          >
            <MediaImage className="w-4 h-4" />
            <span>Galeri Poster</span>
          </Link>
          <Link
            href="/tasks"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors"
          >
            <TaskList className="w-4 h-4" />
            <span>Tugas Mingguan</span>
          </Link>
          <Link
            href="/moments"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Momen Budaya Bali</span>
          </Link>
          <Link
            href="/schedule"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors"
          >
            <Clock className="w-4 h-4" />
            <span>Jadwal Terbit</span>
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors"
          >
            <Shop className="w-4 h-4" />
            <span>Katalog Karya</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors"
          >
            <Dashboard className="w-4 h-4" />
            <span>Dashboard Sanggar</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Profil & Brand Kit</span>
          </Link>
        </div>

        {/* Conversation List from Spectrum UI */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ConversationList
            conversations={conversations}
            activeId={activeConvId}
            onSelect={(id) => setActiveConvId(id)}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Tenant Profile Footer Card */}
        <div className="p-3 border-t border-[#f5f5f4] bg-[#fafaf9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f59e0b] text-[#292524] font-bold text-xs flex items-center justify-center shrink-0">
              SJ
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#292524] truncate leading-tight">
                Tenun Sekar Jepun
              </p>
              <p className="text-[10px] text-[#78716c] truncate">
                Klungkung, Bali • Terverifikasi
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ======================================================================
          MAIN CHAT PANE: Full Height Edge-to-Edge
          ====================================================================== */}
      <main className="flex-1 h-full flex flex-col min-w-0 bg-[#ffffff] relative">
        {/* Top Header Bar */}
        <header className="h-14 border-b border-[#e7e5e4] px-4 sm:px-6 flex items-center justify-between shrink-0 bg-[#ffffff]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 rounded-xl border border-[#e7e5e4] text-[#57534e] hover:text-[#292524] hover:bg-[#f5f5f4] transition-colors"
                title="Buka Panel Samping"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-[#292524] tracking-tight">
                  Asisten Pemasaran Kriya AI
                </h1>
                <span className="w-2 h-2 rounded-full bg-[#059669]" />
                <span className="hidden sm:inline text-[11px] text-[#059669] font-medium">
                  Terhubung Memori Sanggar
                </span>
              </div>
              <p className="text-[11px] text-[#78716c] hidden md:block">
                Konsisten dengan palet warna, filosofi motif, dan etika kriya Bali
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quota Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fffbeb] border border-[#fde68a] text-[11px] font-semibold text-[#b45309]">
              <Sparks className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Sisa Kuota: 8/10</span>
            </div>

            <Link href="/products">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 rounded-full border-[#e7e5e4] text-[#57534e]"
              >
                <Shop className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Katalog</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 rounded-full border-[#e7e5e4] text-[#57534e]"
              >
                <span className="hidden sm:inline">Brand Kit</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Scrollable Chat Thread Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-3 text-[#57534e]">
                <div className="w-7 h-7 border-3 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs">Menyiapkan memori obrolan sanggar...</p>
              </div>
            ) : messages.length === 0 ? (
              /* Spectrum Empty State */
              <ChatEmptyState
                onSelectPrompt={(text) => {
                  setInputMessage(text);
                }}
              />
            ) : (
              messages.map((msg: ChatMessage) => (
                <div key={msg.id} className="space-y-3">
                  <SpeechBubble role={msg.role === "user" ? "user" : "system"}>
                    <div className="space-y-2.5">
                      {/* Attachment Card if present */}
                      {msg.attachment && (
                        <div className="p-2 rounded-xl bg-black/5 border border-black/10 flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#e7e5e4] shrink-0 border border-black/10">
                            <Image
                              src={msg.attachment.url}
                              alt={msg.attachment.name || "Lampiran karya"}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold truncate text-inherit">
                              {msg.attachment.name || "Foto Karya Terlampir"}
                            </p>
                            <p className="text-[11px] opacity-75">
                              Lampiran Wastra Terverifikasi
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Text Content */}
                      <p className="whitespace-pre-line text-sm leading-relaxed">
                        {msg.content}
                      </p>

                      {/* Spectrum Reasoning Trace for AI messages */}
                      {msg.role === "assistant" && (
                        <ReasoningTrace
                          durationSeconds={1.4}
                          className="mt-3"
                        />
                      )}

                      {/* Poster Option Cards inside Assistant Message */}
                      {msg.posterOptions && msg.posterOptions.length > 0 && (
                        <div className="pt-3 border-t border-[#e7e5e4] mt-3">
                          <p className="text-xs font-semibold text-[#57534e] mb-2 flex items-center gap-1.5">
                            <Sparks className="w-3.5 h-3.5 text-[#f59e0b]" />
                            Rancangan Visual Poster Siap Uji:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {msg.posterOptions.map((opt: PosterOptionPayload) => (
                              <div
                                key={opt.id}
                                className="bg-[#fffdfa] rounded-2xl border border-[#fde68a] p-3 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-[#e7e5e4] shrink-0 border border-[#e7e5e4]">
                                    <Image
                                      src={opt.thumbnailUrl}
                                      alt={opt.title}
                                      fill
                                      sizes="64px"
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded-full mb-1">
                                      <CheckCircle className="w-3 h-3" />
                                      Keunikan {opt.uniquenessScore}%
                                    </span>
                                    <h2 className="text-xs font-bold text-[#292524] truncate">
                                      {opt.title}
                                    </h2>
                                    <p className="text-[11px] text-[#57534e] line-clamp-2 mt-0.5 leading-snug">
                                      {opt.captionPreview}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-3 pt-2 border-t border-[#f5f5f4] flex items-center justify-between">
                                  <span className="text-[11px] text-[#78716c]">
                                    Feed 4:5 • Story 9:16
                                  </span>
                                  <Link
                                    href={`/create/${opt.generationId}?option=${opt.id}`}
                                  >
                                    <Button
                                      size="sm"
                                      className="h-7 text-xs bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] font-semibold rounded-full px-3 gap-1 shadow-xs"
                                    >
                                      <span>Buka Studio</span>
                                      <Eye className="w-3.5 h-3.5" />
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className="text-[10px] opacity-60 text-right mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </SpeechBubble>

                  {/* Spectrum Message Actions for Assistant */}
                  {msg.role === "assistant" && (
                    <div className="pl-2">
                      <MessageActions
                        content={msg.content}
                        onRegenerate={() => {
                          handleSend("Tolong susun ulang rancangan poster dengan sudut pandang berbeda.");
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Spectrum Thinking Dots for Asynchronous Processing */}
            {isSending && (
              <div className="py-2">
                <ThinkingDots label="Asisten Kriya Mantra sedang meracik rancangan visual & menyusun narasi dwibahasa..." />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ======================================================================
            BOTTOM DOCKED COMPOSER AREA: Docked to Bottom, Clean & Polished
            ====================================================================== */}
        <div className="border-t border-[#e7e5e4] bg-[#ffffff]/95 backdrop-blur-md px-4 sm:px-8 py-3 space-y-2 shrink-0">
          <div className="max-w-5xl mx-auto space-y-2">
            {/* Quick Suggestions Chips */}
            <Suggestions className="no-scrollbar">
              <Suggestion
                suggestion="Promosikan Pewarna Daun Tarum"
                icon={<Sparks className="w-3.5 h-3.5" />}
                onClick={handleSelectSuggestion}
              />
              <Suggestion
                suggestion="Target Wisatawan Mancanegara (English)"
                icon={<Sparks className="w-3.5 h-3.5" />}
                onClick={handleSelectSuggestion}
              />
              <Suggestion
                suggestion="Tekankan Keaslian Sutra & Tenun ATBM"
                icon={<CheckCircle className="w-3.5 h-3.5" />}
                onClick={handleSelectSuggestion}
              />
              <Suggestion
                suggestion="Koleksi Pameran Bali DigiFest 2026"
                onClick={handleSelectSuggestion}
              />
            </Suggestions>

            {/* Prompt Composer from Spectrum UI */}
            <PromptComposer
              value={inputMessage}
              onChange={setInputMessage}
              onSend={handleSend}
              isSending={isSending}
              attachment={composerAttachment}
              onRemoveAttachment={() => setSelectedProduct(null)}
              onOpenProductPicker={() => setIsProductPickerOpen(true)}
              onSimulateVoice={handleSimulateVoice}
              isVoiceRecording={isVoiceRecording}
            />
          </div>
        </div>
      </main>

      {/* Product Picker Modal Dialog */}
      <Dialog open={isProductPickerOpen} onOpenChange={setIsProductPickerOpen}>
        <DialogContent className="max-w-lg rounded-[28px] p-6 bg-[#ffffff]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#292524]">
              Pilih Karya dari Katalog
            </DialogTitle>
            <DialogDescription className="text-xs text-[#57534e]">
              Pilih karya wastra tenun yang ingin Anda promosikan dengan poster AI.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 mt-4 max-h-72 overflow-y-auto no-scrollbar">
            {products.length === 0 ? (
              <p className="text-xs text-center py-6 text-[#78716c]">
                Belum ada produk di katalog.
              </p>
            ) : (
              products.map((prod: Product) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-[#e7e5e4] hover:border-[#f59e0b] hover:bg-[#fffdfa] cursor-pointer transition-all"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#e7e5e4] shrink-0">
                    <Image
                      src={prod.images[0] || "/assets/content/raw-fabric.jpg"}
                      alt={prod.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xs font-bold text-[#292524] truncate">
                      {prod.name}
                    </h2>
                    <p className="text-[11px] text-[#78716c] truncate">
                      {prod.materialPhilosophy}
                    </p>
                  </div>
                  <NavArrowRight className="w-4 h-4 text-[#a8a29e]" />
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
