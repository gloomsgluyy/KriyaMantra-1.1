"use client";

import { ReactNode, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

export type DirectionAwareTab = {
  id: number;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

interface DirectionAwareTabsProps {
  tabs: DirectionAwareTab[];
  activeTab?: number;
  onTabChange?: (tabId: number) => void;
  className?: string;
  rounded?: string;
  roundedInner?: string;
}

export function DirectionAwareTabs({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  className,
  rounded = "rounded-full",
  roundedInner = "rounded-full",
}: DirectionAwareTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    return tabs.find((t) => t.id === activeTab)?.content || null;
  }, [activeTab, tabs]);

  const handleTabClick = (newTabId: number) => {
    if (newTabId !== activeTab && !isAnimating) {
      const newDirection = newTabId > activeTab ? 1 : -1;
      setDirection(newDirection);
      if (controlledActiveTab === undefined) {
        setInternalActiveTab(newTabId);
      }
      onTabChange?.(newTabId);
    }
  };

  const variants = {
    initial: (dir: number) => ({
      x: 120 * dir,
      opacity: 0,
    }),
    active: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: -120 * dir,
      opacity: 0,
    }),
  };

  return (
    <div className="flex w-full flex-col items-center">
      {/* Tab Strip */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5 p-1.5 bg-[#f5f5f4] border border-[#e7e5e4] shadow-xs",
          rounded,
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-colors duration-150 outline-none select-none",
                isActive
                  ? "text-[#292524]"
                  : "text-[#57534e] hover:text-[#292524]",
                roundedInner
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="direction-aware-bubble"
                  className={cn(
                    "absolute inset-0 z-0 bg-[#ffffff] border border-[#e7e5e4] shadow-xs",
                    roundedInner
                  )}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Content View */}
      <MotionConfig transition={{ duration: 0.25, ease: "easeOut" }}>
        <div className="relative w-full overflow-hidden pt-6">
          <motion.div
            animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            <div ref={ref}>
              <AnimatePresence
                custom={direction}
                mode="popLayout"
                onExitComplete={() => setIsAnimating(false)}
              >
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={variants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={() => setIsAnimating(false)}
                  className="w-full"
                >
                  {content}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </MotionConfig>
    </div>
  );
}

