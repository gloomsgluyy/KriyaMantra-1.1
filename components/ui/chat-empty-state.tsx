"use client";

import * as React from "react";
import { Sparks } from "iconoir-react";
import { cn } from "@/lib/utils";

export interface SuggestedPrompt {
  id: string;
  label: string;
  promptText: string;
}

export interface ChatEmptyStateProps {
  title?: string;
  subtitle?: string;
  prompts?: SuggestedPrompt[];
  onSelectPrompt?: (text: string) => void;
  className?: string;
}

const DEFAULT_PROMPTS: SuggestedPrompt[] = [
  {
    id: "p-1",
    label: "✨ Buatkan Poster Pewarna Alami",
    promptText:
      "Tolong buatkan poster Instagram untuk kain tenun berpewarna alami daun tarum, tekankan proses fermentasi 14 hari.",
  },
  {
    id: "p-2",
    label: "🌏 Target Wisatawan Mancanegara",
    promptText:
      "Buatkan materi promosi dwibahasa Inggris untuk turis asing yang berkunjung ke Bali DigiFest 2026.",
  },
  {
    id: "p-3",
    label: "🧵 Kisah Filosofi Motif Sekar Jepun",
    promptText:
      "Tolong jelaskan filosofi motif Sekar Jepun sebagai lambang kesucian doa dan integrasikan ke dalam caption promosi.",
  },
  {
    id: "p-4",
    label: "📢 Promosi Pameran Akhir Pekan",
    promptText:
      "Susun pesan promosi eksklusif untuk koleksi tenun sutra alam yang akan dipamerkan di Sanur.",
  },
];

export function ChatEmptyState({
  title = "Om Swastyastu! Apa yang ingin kita pasarkan hari ini?",
  subtitle = "Pilih ide cepat di bawah ini atau lampirkan foto kain tenun terbaru Anda untuk dibuatkan poster otomatis.",
  prompts = DEFAULT_PROMPTS,
  onSelectPrompt,
  className,
}: ChatEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center max-w-xl mx-auto py-10 px-4",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center text-[#d97706] shadow-sm mb-4">
        <Sparks className="w-6 h-6" />
      </div>

      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#292524]">
        {title}
      </h2>
      <p className="mt-1.5 text-xs sm:text-sm text-[#57534e] max-w-md leading-relaxed">
        {subtitle}
      </p>

      {/* Suggested Prompts Cards Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
        {prompts.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelectPrompt?.(p.promptText)}
            className="flex items-center text-left p-3 rounded-2xl border border-[#e7e5e4] bg-[#ffffff] hover:border-[#f59e0b] hover:bg-[#fffdfa] hover:shadow-xs transition-all cursor-pointer group text-xs font-medium text-[#292524]"
          >
            <span className="group-hover:text-[#b45309] transition-colors line-clamp-2">
              {p.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

