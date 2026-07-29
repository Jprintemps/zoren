"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type TestimonialItem = {
  author: string;
  role: string;
  quote: string;
};

type Testimonials21stProps = {
  items: TestimonialItem[];
};

export function Testimonials21st({ items }: Testimonials21stProps) {
  const [currentIndex, setCurrentIndex] = useState(items.length > 1 ? 1 : 0);

  const visibleItems = useMemo(() => {
    if (items.length === 0) return [];

    return [-1, 0, 1].map((offset) => {
      const index = (currentIndex + offset + items.length) % items.length;
      return {
        index,
        position: offset,
        item: items[index],
      };
    });
  }, [currentIndex, items]);

  if (items.length === 0) return null;

  const step = (direction: -1 | 1) => {
    setCurrentIndex((prev) => (prev + direction + items.length) % items.length);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-3">
        {visibleItems.map(({ index, position, item }) => {
          const isCenter = position === 0;

          return (
            <motion.article
              key={`${item.author}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, ease: [0.2, 1, 0.3, 1] }}
              animate={{
                y: isCenter ? -10 : 0,
                scale: isCenter ? 1 : 0.97,
                opacity: isCenter ? 1 : 0.82,
              }}
              className={cn(
                "relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition lg:p-7",
                isCenter
                  ? "border-emerald/35 bg-[#11161d] text-white shadow-[0_28px_80px_rgba(15,138,108,0.18)]"
                  : "border-black/10 bg-white text-[#111317]",
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-24",
                  isCenter ? "bg-gradient-to-b from-emerald/18 to-transparent" : "bg-gradient-to-b from-[#f7f3ea] to-transparent",
                )}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border text-sm",
                        isCenter ? "border-white/15 bg-white/8 text-white" : "border-black/15 bg-[#f5f1e8] text-[#111317]",
                      )}
                    >
                      {item.role.replace("Client ", "C")}
                    </div>
                    <div>
                      <p className={cn("text-sm", isCenter ? "text-white/80" : "text-[#5a616d]")}>{item.author}</p>
                      <p className={cn("text-xs uppercase tracking-[0.18em]", isCenter ? "text-white/50" : "text-[#7a818d]")}>{item.role}</p>
                    </div>
                  </div>
                  <Quote className={cn("h-5 w-5", isCenter ? "text-emerald" : "text-[#b4aa96]")} />
                </div>

                <div className="mt-5 flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      fill="currentColor"
                      className={isCenter ? "text-emerald" : "text-[#c89d49]"}
                    />
                  ))}
                </div>

                <p className={cn("mt-5 font-display text-2xl leading-snug", isCenter ? "text-white" : "text-[#121419]")}>
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-black/10 bg-white/75 px-5 py-4 backdrop-blur">
        <p className="text-sm text-[#5a616d]">Des retours clients qui confirment l&apos;impact percu des transformations livrees.</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-[#111317] transition hover:-translate-y-0.5 hover:border-emerald/35 hover:text-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            aria-label="Temoignage precedent"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-[#111317] transition hover:-translate-y-0.5 hover:border-emerald/35 hover:text-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            aria-label="Temoignage suivant"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}