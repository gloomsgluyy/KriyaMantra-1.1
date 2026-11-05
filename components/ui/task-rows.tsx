"use client";

import { useState } from "react";
import { Check, NavArrowDown, Clock, Refresh, Xmark } from "iconoir-react";
import { cn } from "@/lib/utils";

const KEYFRAMES = `
@keyframes su-pop { 0% { opacity: 0; transform: scale(0.85) } 100% { opacity: 1; transform: none } }
`;

export type TaskStatus = "queued" | "running" | "completed" | "failed";

export interface TaskRow {
  id: string;
  title: string;
  detail?: string;
  status: TaskStatus;
  note?: string;
  category?: string;
}

export interface TaskRowsProps {
  tasks: TaskRow[];
  variant?: "Default" | "Compact";
  className?: string;
  onToggleStatus?: (id: string) => void;
}

function StatusIcon({ status }: { status: TaskStatus }) {
  if (status === "completed") {
    return (
      <span className="grid w-5 h-5 place-items-center rounded-full bg-[#ecfdf5] text-[#059669] motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both]">
        <Check className="w-3 h-3 stroke-[3]" />
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="grid w-5 h-5 place-items-center rounded-full bg-[#fef2f2] text-[#dc2626] motion-safe:animate-[su-pop_200ms_cubic-bezier(0.23,1,0.32,1)_both]">
        <Xmark className="w-3 h-3 stroke-[3]" />
      </span>
    );
  }
  if (status === "running") {
    return (
      <Refresh className="w-4 h-4 animate-spin text-[#d97706] [animation-duration:900ms]" />
    );
  }
  return <Clock className="w-4 h-4 text-[#a8a29e]" />;
}

export function TaskRows({
  tasks,
  variant = "Default",
  className,
}: TaskRowsProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const compact = variant === "Compact";

  return (
    <ul
      className={cn(
        "w-full divide-y divide-[#f5f5f4] overflow-hidden rounded-2xl border border-[#e7e5e4] bg-[#ffffff] shadow-xs",
        className
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      {tasks.map((task) => {
        const open = task.id === openId;
        const expandable = !compact && Boolean(task.note);
        return (
          <li key={task.id}>
            <button
              type="button"
              disabled={!expandable}
              aria-expanded={expandable ? open : undefined}
              onClick={() => setOpenId(open ? null : task.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 text-left transition-colors",
                compact ? "py-2.5" : "py-3.5",
                expandable && "hover:bg-[#fafaf9] cursor-pointer"
              )}
            >
              <StatusIcon status={task.status} />
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "font-medium truncate",
                    task.status === "completed"
                      ? "text-[#a8a29e] line-through"
                      : "text-[#292524]",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  {task.title}
                </p>
                {task.category && (
                  <span className="text-[10px] text-[#78716c] uppercase tracking-wider font-semibold">
                    {task.category}
                  </span>
                )}
              </div>
              {task.detail && (
                <span className="shrink-0 text-xs text-[#78716c] font-medium">
                  {task.detail}
                </span>
              )}
              {expandable && (
                <NavArrowDown
                  className={cn(
                    "w-4 h-4 text-[#a8a29e] transition-transform duration-200 shrink-0",
                    open && "rotate-180 text-[#292524]"
                  )}
                />
              )}
            </button>
            {open && task.note && (
              <div className="bg-[#fafaf9] px-4 py-2.5 text-xs text-[#57534e] border-t border-[#f5f5f4] leading-relaxed">
                {task.note}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

