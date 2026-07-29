"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type AddOnItem = {
  name: string;
  price: string;
  image: string;
  alt: string;
};

type Marketplace21stProps = {
  items: AddOnItem[];
};

export function Marketplace21st({ items }: Marketplace21stProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {items.map((item, idx) => {
        const isLead = idx === 0;
        const isSecondary = idx === 1 || idx === 2;

        return (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.48, delay: idx * 0.05, ease: [0.2, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.01 }}
            className={cn(
              "group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_44px_rgba(0,0,0,0.08)]",
              isLead && "lg:col-span-7 lg:row-span-2",
              isSecondary ? "lg:col-span-5" : !isLead ? "lg:col-span-4" : "",
            )}
          >
            <div className={cn("relative overflow-hidden", isLead ? "h-[420px]" : "h-64")}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition duration-700 group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1319]/80 via-[#0f1319]/12 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/12 to-transparent" />

              {isLead ? (
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
                  <Sparkles size={12} className="text-emerald" /> Offre editoriale
                </div>
              ) : null}

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className={cn("max-w-xl rounded-[1.5rem] border border-white/12 bg-black/28 p-4 text-white backdrop-blur-md", isLead && "sm:p-5")}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">Option complementaire</p>
                      <h3 className={cn("mt-2 font-display", isLead ? "text-4xl" : "text-2xl")}>{item.name}</h3>
                    </div>
                    <span className="rounded-full border border-emerald/30 bg-emerald/12 px-3 py-1 text-sm text-emerald">{item.price}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/74">Un renfort strategique pour accelerer votre presence, votre clarte et votre conversion.</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-white/92">
                    Ajouter au systeme <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}