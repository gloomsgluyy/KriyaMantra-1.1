"use client";

import React, { useEffect, useState } from "react";
import { Check, NavArrowDown } from "iconoir-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Helper functions for color conversion
const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

const hexToHsl = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const normalizeColor = (color: string): string => {
  if (color.startsWith("#")) {
    return color.toUpperCase();
  } else if (color.startsWith("hsl")) {
    const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0];
    return hslToHex(h, s, l);
  }
  return color;
};

// Palet warna alami khas kriya tradisional Bali
const BALI_CRAFT_PRESETS = [
  { hex: "#F59E0B", label: "Kuning Kunyit / Amber" },
  { hex: "#292524", label: "Hitam Arang Pejaten" },
  { hex: "#831843", label: "Merah Marun Mengkudu" },
  { hex: "#78350F", label: "Cokelat Kayu Jati" },
  { hex: "#065F46", label: "Hijau Daun Pandan" },
  { hex: "#1E3A8A", label: "Biru Indigo Tarum" },
  { hex: "#94A3B8", label: "Abu Perak Celuk" },
  { hex: "#FFFBEB", label: "Krem Wastra Katun" },
];

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
}

export function ColorPicker({
  color,
  onChange,
  label,
  className,
}: ColorPickerProps) {
  const [hsl, setHsl] = useState<[number, number, number]>([38, 92, 50]);
  const [colorInput, setColorInput] = useState(color);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const normalized = normalizeColor(color);
    setColorInput(normalized);
    if (normalized.startsWith("#")) {
      const [h, s, l] = hexToHsl(normalized);
      setHsl([h, s, l]);
    }
  }, [color]);

  const handleColorChange = (newColor: string) => {
    const normalized = normalizeColor(newColor);
    setColorInput(normalized);
    if (normalized.startsWith("#")) {
      const [h, s, l] = hexToHsl(normalized);
      setHsl([h, s, l]);
    }
    onChange(normalized);
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = Number(e.target.value);
    const newHsl: [number, number, number] = [hue, hsl[1], hsl[2]];
    setHsl(newHsl);
    const hex = hslToHex(newHsl[0], newHsl[1], newHsl[2]);
    setColorInput(hex);
    onChange(hex);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setColorInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      handleColorChange(val);
    }
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <Label>{label}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-11 w-full items-center justify-between rounded-[14px] border border-[#e7e5e4] bg-white px-3.5 text-xs text-[#292524] transition-all hover:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 outline-none"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-5 w-5 rounded-full border border-black/10 shrink-0 shadow-xs"
                style={{ backgroundColor: colorInput }}
              />
              <span className="font-mono font-medium text-xs uppercase">{colorInput}</span>
            </div>
            <NavArrowDown className="h-4 w-4 text-[#78716c]" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-3.5 space-y-3 bg-white rounded-[20px] shadow-lg border border-[#e7e5e4]">
          <div className="space-y-2">
            <div
              className="h-20 w-full rounded-[14px] border border-black/10 shadow-inner"
              style={{ backgroundColor: colorInput }}
            />

            {/* Slider Hue */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-[#57534e]">
                <span>Spektrum Warna</span>
                <span className="font-mono">{hsl[0]}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hsl[0]}
                onChange={handleHueChange}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background:
                    "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                }}
              />
            </div>

            {/* Hex input */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-[#57534e]">Hex</span>
              <Input
                value={colorInput}
                onChange={handleInputChange}
                className="h-8 font-mono text-xs uppercase"
                maxLength={7}
              />
            </div>
          </div>

          {/* Preset Palet Tradisional Bali */}
          <div className="space-y-1.5 pt-2 border-t border-[#e7e5e4]">
            <span className="text-[11px] font-semibold text-[#57534e] block">
              Palet Alami Kriya Bali
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {BALI_CRAFT_PRESETS.map((preset) => (
                <button
                  key={preset.hex}
                  type="button"
                  title={preset.label}
                  onClick={() => handleColorChange(preset.hex)}
                  className="group relative flex h-7 w-full items-center justify-center rounded-[8px] border border-black/10 transition-transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: preset.hex }}
                >
                  {colorInput.toUpperCase() === preset.hex && (
                    <Check
                      className={cn(
                        "h-3.5 w-3.5 stroke-[3]",
                        preset.hex === "#FFFBEB" ? "text-[#292524]" : "text-white"
                      )}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

