"use client";

import * as React from "react";
import { Check, Copy, Refresh, ThumbsDown, ThumbsUp } from "iconoir-react";
import { cn } from "@/lib/utils";

export interface MessageActionsProps {
  content?: string;
  onCopy?: (content: string) => void;
  onRegenerate?: () => void;
  onFeedback?: (rating: "up" | "down" | null) => void;
  className?: string;
}

export function MessageActions({
  content = "",
  onCopy,
  onRegenerate,
  onFeedback,
  className,
}: MessageActionsProps) {
  const [copied, setCopied] = React.useState(false);
  const [rating, setRating] = React.useState<"up" | "down" | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy?.(content);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Gagal menyalin pesan:", e);
    }
  };

  const handleRate = (next: "up" | "down") => {
    const newVal = rating === next ? null : next;
    setRating(newVal);
    onFeedback?.(newVal);
  };

  return (
    <div className={cn("flex items-center gap-1 text-[#78716c] pt-1", className)}>
      {/* Copy Button */}
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? "Tersalin!" : "Salin teks"}
        className="p-1.5 rounded-lg hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors cursor-pointer text-xs flex items-center gap-1"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-[#059669]" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Regenerate Button */}
      {onRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          title="Buat ulang respon ini"
          className="p-1.5 rounded-lg hover:bg-[#f5f5f4] hover:text-[#292524] transition-colors cursor-pointer text-xs"
        >
          <Refresh className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Thumbs Up */}
      <button
        type="button"
        onClick={() => handleRate("up")}
        title="Jawaban ini sangat membantu"
        className={cn(
          "p-1.5 rounded-lg hover:bg-[#f5f5f4] transition-colors cursor-pointer text-xs",
          rating === "up" ? "text-[#059669] bg-[#ecfdf5]" : "hover:text-[#292524]"
        )}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>

      {/* Thumbs Down */}
      <button
        type="button"
        onClick={() => handleRate("down")}
        title="Jawaban ini kurang tepat"
        className={cn(
          "p-1.5 rounded-lg hover:bg-[#f5f5f4] transition-colors cursor-pointer text-xs",
          rating === "down" ? "text-red-600 bg-red-50" : "hover:text-[#292524]"
        )}
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

