/**
 * Spectrum UI — TiltCard
 * 3D perspective tilt card for Kriya Mantra Poster Showcase
 */

"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  tiltReverse?: boolean;
  scale?: number;
  perspective?: number;
  glare?: boolean;
  glareColor?: string;
  containerClassName?: string;
  className?: string;
}

export interface TiltCardItemProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

const TRACK_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.6,
} as const;

const RESET_SPRING = {
  type: "spring",
  stiffness: 140,
  damping: 18,
  mass: 1,
} as const;

const REST_POINT = 0.5;
const PRESS_SCALE = 0.99;

const TiltCardContext = createContext<{ hovered: boolean }>({ hovered: false });

export function TiltCard({
  children,
  maxTilt = 10,
  tiltReverse = false,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  glareColor = "rgba(251, 191, 36, 0.25)",
  containerClassName,
  className,
}: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const tiltX = useMotionValue(REST_POINT);
  const tiltY = useMotionValue(REST_POINT);
  const cardScale = useSpring(1, TRACK_SPRING);

  const tiltSign = tiltReverse ? -1 : 1;
  const rotateX = useTransform(
    tiltY,
    [0, 1],
    [maxTilt * tiltSign, -maxTilt * tiltSign]
  );
  const rotateY = useTransform(
    tiltX,
    [0, 1],
    [-maxTilt * tiltSign, maxTilt * tiltSign]
  );
  const glarePosX = useTransform(tiltX, (value) => value * 100);
  const glarePosY = useTransform(tiltY, (value) => value * 100);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glarePosX}% ${glarePosY}%, ${glareColor}, transparent 65%)`;

  useEffect(
    () => () => {
      tiltX.stop();
      tiltY.stop();
    },
    [tiltX, tiltY]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || shouldReduceMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      animate(tiltX, (event.clientX - rect.left) / rect.width, TRACK_SPRING);
      animate(tiltY, (event.clientY - rect.top) / rect.height, TRACK_SPRING);
    },
    [tiltX, tiltY, shouldReduceMotion]
  );

  const handlePointerEnter = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || shouldReduceMotion) return;
      setHovered(true);
      cardScale.set(scale);
    },
    [cardScale, scale, shouldReduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    cardScale.set(1);
    animate(tiltX, REST_POINT, RESET_SPRING);
    animate(tiltY, REST_POINT, RESET_SPRING);
  }, [cardScale, tiltX, tiltY]);

  const handlePointerDown = useCallback(() => {
    if (shouldReduceMotion) return;
    cardScale.set(PRESS_SCALE);
  }, [cardScale, shouldReduceMotion]);

  const handlePointerUp = useCallback(() => {
    cardScale.set(hovered ? scale : 1);
  }, [cardScale, hovered, scale]);

  return (
    <div
      className={cn("relative", containerClassName)}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative rounded-2xl border border-[#e7e5e4] bg-[#ffffff] will-change-transform shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)]",
          className
        )}
      >
        <TiltCardContext.Provider value={{ hovered }}>
          <div style={{ transformStyle: "preserve-3d" }}>{children}</div>
        </TiltCardContext.Provider>

        {glare && !shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBackground, transform: "translateZ(1px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </div>
  );
}

export function TiltCardItem({
  children,
  depth = 0,
  className,
}: TiltCardItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const { hovered } = useContext(TiltCardContext);
  const lifted = hovered && !shouldReduceMotion;

  return (
    <div
      className={cn(
        "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none",
        className
      )}
      style={{
        transform: lifted ? `translateZ(${depth}px)` : "translateZ(0px)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

