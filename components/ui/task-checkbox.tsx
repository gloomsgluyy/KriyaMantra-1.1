/**
 * Spectrum UI — TaskCheckbox
 * Adapted for Kriya Mantra with Warm Amber Balinese Craft Aesthetics
 */

"use client";

import React, { useCallback, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TaskCheckboxProps {
  /** Controlled checked state. Leave undefined for uncontrolled usage */
  checked?: boolean;
  /** Initial checked state when uncontrolled. Default false */
  defaultChecked?: boolean;
  /** Fires with the next checked state on every toggle */
  onCheckedChange?: (checked: boolean) => void;
  /** Task text next to the box; struck through while checked */
  label: React.ReactNode;
  /** Optional secondary line rendered under the label */
  description?: React.ReactNode;
  /** Visual size of the row. Default "md" */
  size?: "sm" | "md" | "lg";
  /** Disables pointer and keyboard interaction */
  disabled?: boolean;
  /** Additional classes merged onto the row wrapper */
  className?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MICRO_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const;
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

const CHECK_DRAW_DELAY = 0.06;
const CHECK_DRAW_DURATION = 0.2;

const STRIKE_DURATION = 0.25;
const UNSTRIKE_DURATION = 0.15;
const STRIKE_HEIGHT = 1.5;

const POP_KEYFRAMES = [1, 0.9, 1.05, 1];
const POP_DURATION = 0.4;
const POP_TIMES = [0, 0.3, 0.7, 1];

const CONFETTI_COUNT = 6;
const CONFETTI_DURATION = 0.5;
const CONFETTI_DISTANCE_FAR = 1.6;
const CONFETTI_DISTANCE_NEAR = 1.25;
const CONFETTI_COLORS = ["#d97706", "#f59e0b", "#10b981"];

const CHECK_PATH = "M5 12.5L10 17.5L19 7.5";

const SIZES = {
  sm: {
    gap: "gap-2.5",
    hit: "-m-1 -mt-0.5 h-6 w-6",
    box: "h-4 w-4",
    radius: "rounded",
    boxPx: 16,
    label: "text-sm leading-5",
    description: "text-xs leading-4",
  },
  md: {
    gap: "gap-3",
    hit: "-m-1 h-7 w-7",
    box: "h-5 w-5",
    radius: "rounded-md",
    boxPx: 20,
    label: "text-sm leading-5",
    description: "text-xs leading-4",
  },
  lg: {
    gap: "gap-3",
    hit: "-m-1 h-8 w-8",
    box: "h-6 w-6",
    radius: "rounded-md",
    boxPx: 24,
    label: "text-base leading-6",
    description: "text-sm leading-5",
  },
} as const;

// ─── Component ───────────────────────────────────────────────────────────────

export function TaskCheckbox({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  size = "md",
  disabled = false,
  className,
}: TaskCheckboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [burstKey, setBurstKey] = useState(0);
  const labelId = useId();
  const descriptionId = useId();

  const checked = checkedProp ?? internalChecked;
  const sizes = SIZES[size];
  const confettiDotSize = Math.max(3, Math.round(sizes.boxPx * 0.2));

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !checked;
    if (checkedProp === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
    if (next && !shouldReduceMotion) setBurstKey((key) => key + 1);
  }, [checked, checkedProp, disabled, onCheckedChange, shouldReduceMotion]);

  return (
    <div
      className={cn(
        "group flex select-none touch-manipulation items-start",
        sizes.gap,
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled}
        onClick={toggle}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
        transition={MICRO_SPRING}
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-md cursor-pointer",
          "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#f59e0b]",
          sizes.hit
        )}
      >
        <motion.span
          className={cn(
            "relative flex items-center justify-center border bg-white transition-colors duration-200",
            checked
              ? "border-[#f59e0b] bg-[#f59e0b]"
              : "border-[#d6d3d1] group-hover:border-[#f59e0b]",
            sizes.box,
            sizes.radius
          )}
          initial={false}
          animate={
            checked && !shouldReduceMotion
              ? { scale: POP_KEYFRAMES }
              : { scale: 1 }
          }
          transition={
            checked && !shouldReduceMotion
              ? { duration: POP_DURATION, times: POP_TIMES, ease: "easeOut" }
              : { duration: 0.15 }
          }
        >
          <motion.span
            aria-hidden="true"
            className={cn("absolute inset-0 bg-[#f59e0b]", sizes.radius)}
            initial={false}
            animate={{ scale: checked ? 1 : 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : checked
                ? MICRO_SPRING
                : { duration: 0.15, ease: "easeOut" }
            }
          />

          <svg
            viewBox="0 0 24 24"
            className="relative h-full w-full p-[15%] text-[#292524]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <motion.path
              d={CHECK_PATH}
              initial={false}
              animate={{
                pathLength: checked ? 1 : 0,
                opacity: checked ? 1 : 0,
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : checked
                  ? {
                      pathLength: {
                        delay: CHECK_DRAW_DELAY,
                        duration: CHECK_DRAW_DURATION,
                        ease: "easeOut",
                      },
                      opacity: { delay: CHECK_DRAW_DELAY, duration: 0.01 },
                    }
                  : { duration: 0.1 }
              }
            />
          </svg>

          {burstKey > 0 && !shouldReduceMotion && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {Array.from({ length: CONFETTI_COUNT }).map((_, index) => {
                const angle =
                  (index / CONFETTI_COUNT) * Math.PI * 2 - Math.PI / 2;
                const distance =
                  sizes.boxPx *
                  (index % 2 === 0
                    ? CONFETTI_DISTANCE_FAR
                    : CONFETTI_DISTANCE_NEAR);
                return (
                  <motion.span
                    key={`confetti-${burstKey}-${index}`}
                    className="absolute rounded-full"
                    style={{
                      width: confettiDotSize,
                      height: confettiDotSize,
                      backgroundColor:
                        CONFETTI_COLORS[index % CONFETTI_COLORS.length],
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      scale: [0, 1, 0.3],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: CONFETTI_DURATION,
                      ease: "easeOut",
                    }}
                    onAnimationComplete={
                      index === CONFETTI_COUNT - 1
                        ? () => setBurstKey(0)
                        : undefined
                    }
                  />
                );
              })}
            </span>
          )}
        </motion.span>
      </motion.button>

      <div
        onClick={toggle}
        className={cn("flex min-w-0 flex-col", !disabled && "cursor-pointer")}
      >
        <span
          id={labelId}
          className={cn(
            "relative w-fit transition-colors",
            checked
              ? "text-[#a8a29e] duration-200 line-through"
              : "text-[#292524] duration-150 font-medium",
            sizes.label
          )}
        >
          {label}
        </span>
        {description && (
          <span
            id={descriptionId}
            className={cn(
              "mt-0.5 transition-colors duration-200",
              checked ? "text-[#a8a29e]" : "text-[#78716c]",
              sizes.description
            )}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

