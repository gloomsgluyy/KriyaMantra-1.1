"use client";

import * as React from "react";
import {
  CheckCircle,
  Clock,
  Instagram,
  Palette,
  Shop,
  Sparks,
} from "iconoir-react";
import { cn } from "@/lib/utils";
import { DashboardActivityItem } from "@/types/dashboard";

export interface RecentActivityProps {
  title?: string;
  items?: DashboardActivityItem[];
  className?: string;
}

export function RecentActivity({
  title = "Aktivitas Pemasaran Terbaru",
  items = [],
  className,
}: RecentActivityProps) {
  const getActivityIcon = (type: DashboardActivityItem["type"]) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="w-4 h-4 text-[#059669]" />;
      case "generation":
        return <Sparks className="w-4 h-4 text-[#d97706]" />;
      case "publish":
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case "catalog":
        return <Shop className="w-4 h-4 text-[#b45309]" />;
      case "memory":
        return <Palette className="w-4 h-4 text-[#4f46e5]" />;
      default:
        return <Clock className="w-4 h-4 text-[#78716c]" />;
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-[24px] border border-[#e7e5e4] bg-[#ffffff] p-5 shadow-xs flex flex-col",
        className
      )}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f4] mb-3">
        <h2 className="text-sm font-bold text-[#292524] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#f59e0b]" />
          <span>{title}</span>
        </h2>
        <span className="text-[11px] text-[#78716c] font-medium">Linimasa Sanggar</span>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-xs text-[#78716c] text-center py-6">
            Belum ada catatan aktivitas baru.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3 p-3 rounded-2xl hover:bg-[#fafaf9] border border-transparent hover:border-[#f5f5f4] transition-all"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-[#fffdfa] border border-[#fde68a] shrink-0 mt-0.5">
                  {getActivityIcon(item.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-xs font-bold text-[#292524] truncate">
                      {item.title}
                    </p>
                    {item.duration && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[#fef3c7] text-[#b45309]">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#57534e] mt-0.5 leading-snug line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-medium text-[#a8a29e] shrink-0 whitespace-nowrap mt-1">
                {item.timeAgo}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

