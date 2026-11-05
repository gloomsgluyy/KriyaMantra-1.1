"use client";

import * as React from "react";
import { ChatBubble, Pin, Plus } from "iconoir-react";
import { cn } from "@/lib/utils";

export interface ConversationEntry {
  id: string;
  title: string;
  group: string;
  pinned?: boolean;
  snippet?: string;
}

export interface ConversationListProps {
  conversations: ConversationEntry[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onNewChat?: () => void;
  onTogglePin?: (id: string) => void;
  className?: string;
}

export function ConversationList({
  conversations,
  activeId: activeProp,
  onSelect,
  onNewChat,
  onTogglePin,
  className,
}: ConversationListProps) {
  const [activeState, setActiveState] = React.useState(conversations[0]?.id);
  const [pins, setPins] = React.useState<Set<string>>(
    new Set(conversations.filter((c) => c.pinned).map((c) => c.id))
  );

  const active = activeProp !== undefined ? activeProp : activeState;

  function select(id: string) {
    setActiveState(id);
    onSelect?.(id);
  }

  function togglePin(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setPins((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    onTogglePin?.(id);
  }

  const groups: string[] = [];
  for (const c of conversations) {
    if (!groups.includes(c.group)) groups.push(c.group);
  }

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      {/* New Chat Button */}
      <div className="p-3">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#292524] px-3.5 py-2.5 text-xs font-bold shadow-xs transition-all active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Obrolan Baru</span>
        </button>
      </div>

      {/* Conversations scroll area */}
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-4 no-scrollbar">
        {groups.map((group) => (
          <div key={group} className="space-y-1">
            <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#78716c]">
              {group}
            </p>
            <ul className="space-y-0.5">
              {conversations
                .filter((c) => c.group === group)
                .map((c) => {
                  const isActive = c.id === active;
                  const pinned = pins.has(c.id);

                  return (
                    <li key={c.id} className="relative group flex items-center">
                      <button
                        type="button"
                        onClick={() => select(c.id)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all cursor-pointer text-xs pr-8",
                          isActive
                            ? "bg-[#fffbeb] text-[#292524] font-semibold border border-[#fde68a] shadow-xs"
                            : "text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#292524]"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <ChatBubble
                            className={cn(
                              "w-3.5 h-3.5 shrink-0",
                              isActive ? "text-[#d97706]" : "text-[#a8a29e]"
                            )}
                          />
                          <span className="truncate">{c.title}</span>
                        </div>
                      </button>

                      {/* Pin button as sibling, NOT inside button */}
                      <button
                        type="button"
                        onClick={(e) => togglePin(c.id, e)}
                        title={pinned ? "Lepas sematan" : "Sematkan obrolan"}
                        className={cn(
                          "absolute right-2 p-1 rounded-md transition-opacity hover:bg-black/5 shrink-0 cursor-pointer",
                          pinned
                            ? "opacity-100 text-[#d97706]"
                            : "opacity-0 group-hover:opacity-100 text-[#a8a29e]"
                        )}
                      >
                        <Pin className="w-3 h-3" />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

