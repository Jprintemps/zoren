"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export function MagneticButton({ children, className, href = "https://calendly.com/adasoftdesign/appel-strategique-de" }: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { damping: 18, stiffness: 160, mass: 0.3 });
  const sy = useSpring(y, { damping: 18, stiffness: 160, mass: 0.3 });

  const glowX = useTransform(sx, [-18, 18], [20, 80]);
  const glowY = useTransform(sy, [-18, 18], [20, 80]);

  return (
    <motion.a
      href={href}
      ref={ref}
      style={prefersReducedMotion ? undefined : { x: sx, y: sy }}
      onMouseMove={(event) => {
        if (prefersReducedMotion) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mx = event.clientX - rect.left - rect.width / 2;
        const my = event.clientY - rect.top - rect.height / 2;
        x.set(mx * 0.12);
        y.set(my * 0.12);
      }}
      onMouseLeave={() => {
        if (prefersReducedMotion) return;
        x.set(0);
        y.set(0);
      }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-bone shadow-glow transition-colors duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1015]",
        "bg-gradient-to-r from-emerald/90 to-emerald hover:from-emerald hover:to-emerald/80",
        className,
      )}
    >
      {prefersReducedMotion ? null : (
        <motion.span
          className="pointer-events-none absolute h-20 w-20 rounded-full bg-white/25 blur-2xl"
          style={{ left: glowX, top: glowY }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}
