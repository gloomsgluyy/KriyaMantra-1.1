"use client";

import * as React from "react";
import { NavArrowDown, Sparks } from "iconoir-react";
import { cn } from "@/lib/utils";

export interface ReasoningStep {
  id: string;
  label: string;
  detail?: string;
}

export interface ReasoningTraceProps {
  steps?: ReasoningStep[];
  durationSeconds?: number;
  defaultOpen?: boolean;
  className?: string;
}

const DEFAULT_STEPS: ReasoningStep[] = [
  {
    id: "step-1",
    label: "Membaca memori brand Tenun Sekar Jepun",
    detail: "Bahan: 100% Sutra Alam Klungkung, Pewarna Alami: Daun Tarum Fermentasi 14 Hari",
  },
  {
    id: "step-2",
    label: "Menyesuaikan tone of voice & target pasar",
    detail: "Brand Voice: Hangat, berakar budaya, ramah wisatawan nusantara & mancanegara",
  },
  {
    id: "step-3",
    label: "Pengecekan batas etis (Bounded Context)",
    detail: "100% Fakta terverifikasi, bebas halusinasi harga, lolos uji keunikan",
  },
];

export function ReasoningTrace({
  steps = DEFAULT_STEPS,
  durationSeconds = 1.4,
  defaultOpen = false,
  className,
}: ReasoningTraceProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div
      className={cn(
        "w-full max-w-xl text-xs rounded-2xl border border-[#fde68a] bg-[#fffdfa] overflow-hidden shadow-xs",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-3.5 py-2 text-left hover:bg-[#fef3c7]/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2 text-[#b45309]">
          <Sparks className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
          <span className="font-semibold text-xs">
            Proses Penalaran AI & Verifikasi Memori
          </span>
          <span className="text-[10px] text-[#78716c] font-normal">
            ({durationSeconds} detik)
          </span>
        </div>

        <NavArrowDown
          className={cn(
            "w-3.5 h-3.5 text-[#b45309] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="px-3.5 pb-3 pt-1 border-t border-[#fde68a]/60 space-y-2 text-[11px] text-[#57534e]">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-[#fef3c7] text-[#b45309] flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#292524]">{step.label}</p>
                {step.detail && (
                  <p className="text-[#78716c] text-[10px] mt-0.5">{step.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

