"use client";

import * as React from "react";
import Image from "next/image";
import {
  Attachment,
  Camera,
  Microphone,
  Send,
  Shop,
  Xmark,
} from "iconoir-react";
import { cn } from "@/lib/utils";

export interface ComposerAttachment {
  id: string;
  type: "image" | "product" | "voice";
  name: string;
  url: string;
  productId?: string;
}

export interface PromptComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  isSending?: boolean;
  attachment?: ComposerAttachment | null;
  onRemoveAttachment?: () => void;
  onOpenProductPicker?: () => void;
  onSimulateVoice?: () => void;
  isVoiceRecording?: boolean;
  placeholder?: string;
  className?: string;
}

export function PromptComposer({
  value,
  onChange,
  onSend,
  isSending = false,
  attachment,
  onRemoveAttachment,
  onOpenProductPicker,
  onSimulateVoice,
  isVoiceRecording = false,
  placeholder = "Tanyakan ide pemasaran atau ketik: 'Buatkan poster untuk kain tenun terbaru...'",
  className,
}: PromptComposerProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const canSend = (value.trim().length > 0 || !!attachment) && !isSending;

  // Auto-resize textarea height
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) {
        onSend(value.trim());
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSend) {
      onSend(value.trim());
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full rounded-2xl border border-[#e7e5e4] bg-[#ffffff] shadow-sm transition-all focus-within:border-[#f59e0b] focus-within:ring-2 focus-within:ring-[#f59e0b]/20 flex flex-col p-2",
        className
      )}
    >
      {/* Attached Karya Chip if any */}
      {attachment && (
        <div className="mb-2 flex items-center justify-between p-2 rounded-xl bg-[#fffbeb] border border-[#fde68a]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-[#e7e5e4] shrink-0 border border-[#e7e5e4]">
              <Image
                src={attachment.url || "/assets/content/raw-fabric.jpg"}
                alt={attachment.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#292524] truncate">
                {attachment.name}
              </p>
              <p className="text-[10px] text-[#78716c]">
                Karya Terlampir Siap Dipromosikan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onRemoveAttachment}
            className="p-1 rounded-lg text-[#78716c] hover:text-[#292524] hover:bg-black/5 transition-colors"
            title="Hapus Lampiran"
          >
            <Xmark className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Auto-growing Textarea */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent px-3 py-2 text-xs sm:text-sm text-[#292524] placeholder:text-[#a8a29e] outline-none border-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 max-h-40 leading-relaxed shadow-none"
      />

      {/* Actions Toolbar */}
      <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#f5f5f4]">
        <div className="flex items-center gap-1">
          {/* Pick from catalog button */}
          <button
            type="button"
            onClick={onOpenProductPicker}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#57534e] hover:text-[#292524] hover:bg-[#fffbeb] transition-colors cursor-pointer"
            title="Pilih Karya dari Katalog"
          >
            <Shop className="w-4 h-4 text-[#f59e0b]" />
            <span className="hidden sm:inline">Pilih Karya</span>
          </button>

          {/* Photo attach button */}
          <button
            type="button"
            onClick={onOpenProductPicker}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#57534e] hover:text-[#292524] hover:bg-[#fffbeb] transition-colors cursor-pointer"
            title="Unggah Foto Karya"
          >
            <Camera className="w-4 h-4 text-[#57534e]" />
            <span className="hidden sm:inline">Foto</span>
          </button>

          {/* Voice input simulator */}
          <button
            type="button"
            onClick={onSimulateVoice}
            disabled={isVoiceRecording}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
              isVoiceRecording
                ? "bg-red-50 text-red-600 animate-pulse"
                : "text-[#57534e] hover:text-[#292524] hover:bg-[#fffbeb]"
            )}
            title="Rekam Catatan Suara"
          >
            <Microphone className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isVoiceRecording ? "Mendengarkan..." : "Suara"}
            </span>
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!canSend}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] text-xs font-bold shadow-xs transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
        >
          <span>Kirim</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}

