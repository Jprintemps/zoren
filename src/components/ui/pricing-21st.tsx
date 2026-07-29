"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/cn";

const CALENDLY_URL = "https://calendly.com/adasoftdesign/appel-strategique-de";

type OfferPlan21st = {
  id: string;
  name: string;
  price: string;
  marketNote?: string;
  soldResult: string;
  perceivedValue: string;
  delivery?: string;
  revisions?: string;
  resultBullets: string[];
  categories: Array<{ title: string; items: string[] }>;
  bonus: string[];
};

type Pricing21stProps = {
  offers: OfferPlan21st[];
  expandedOffer: string;
  onToggle: (offerId: string) => void;
  offerCardRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
};

export function Pricing21st({ offers, expandedOffer, onToggle, offerCardRefs }: Pricing21stProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
      {offers.map((offer, idx) => {
        const expanded = expandedOffer === offer.id;
        const isFeatured = offer.id === "growth";
        const isAuthority = offer.id === "authority";
        const tierLabel = idx === 0 ? "Niveau 1" : idx === 1 ? "Niveau 2" : "Niveau 3";
        const trackLabel = idx === 0 ? "START" : idx === 1 ? "BUILD" : "DOMINATE";

        return (
          <motion.article
            key={offer.id}
            whileHover={{ y: -6 }}
            data-rank={idx}
            ref={(el) => {
              offerCardRefs.current[offer.id] = el;
            }}
            className={cn(
              "offer-card relative flex h-full flex-col overflow-hidden rounded-[2.1rem] border p-6 shadow-[0_18px_48px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8",
              isAuthority ? "border-emerald/35 bg-[#11161d] text-white shadow-[0_32px_90px_rgba(15,138,108,0.2)]" : "border-black/10 bg-white/92 text-[#111317]",
              isFeatured && "lg:-translate-y-3",
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-32",
                isAuthority ? "bg-gradient-to-b from-emerald/20 via-[#f1c979]/10 to-transparent" : "bg-gradient-to-b from-[#f7f2e8] to-transparent",
              )}
            />

            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={cn("text-[10px] uppercase tracking-[0.22em]", isAuthority ? "text-emerald" : "text-[#6a7280]")}>{tierLabel}</p>
                  <h3 className={cn("mt-2 font-display text-3xl sm:text-4xl", isAuthority ? "text-white" : "text-[#111317]")}>{offer.name}</h3>
                  <p className={cn("mt-1 text-xs uppercase tracking-[0.18em]", isAuthority ? "text-white/45" : "text-[#8a6c3c]")}>{trackLabel}</p>
                </div>

                {isFeatured ? (
                  <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald">
                    Recommande
                  </span>
                ) : null}
              </div>

              <div
                className={cn(
                  "mt-5 rounded-[1.6rem] border px-5 py-5 shadow-[0_10px_26px_rgba(15,23,35,0.08)]",
                  isAuthority
                    ? "border-white/10 bg-white/6"
                    : "border-black/10 bg-gradient-to-r from-[#f4f6f9] via-white to-[#eef3f1]",
                )}
              >
                <p className={cn("text-[10px] uppercase tracking-[0.2em]", isAuthority ? "text-white/55" : "text-[#5b6370]")}>Investissement</p>
                <p className={cn("mt-2 font-display text-5xl leading-none", isAuthority ? "text-white" : "text-[#121419]")}>{offer.price}</p>
                <p
                  className={cn(
                    "mt-3 inline-flex rounded-full border px-3 py-1 text-sm",
                    isAuthority ? "border-emerald/30 bg-emerald/12 text-emerald" : "border-emerald/20 bg-emerald/10 text-[#1f5b4c]",
                  )}
                >
                  {offer.perceivedValue}
                </p>
              </div>

              <p className={cn("mt-5 text-lg", isAuthority ? "text-white/88" : "text-[#27303a]")}>{offer.soldResult}</p>
              {offer.delivery ? <p className={cn("mt-2 text-sm", isAuthority ? "text-white/60" : "text-[#5a626f]")}>{offer.delivery}</p> : null}
              {offer.revisions ? <p className={cn("mt-1 text-sm", isAuthority ? "text-white/60" : "text-[#5a626f]")}>{offer.revisions}</p> : null}
              {offer.marketNote ? <p className={cn("mt-2 text-xs", isAuthority ? "text-white/45" : "text-[#707887]")}>({offer.marketNote})</p> : null}

              <div className="mt-5 space-y-2">
                {offer.resultBullets.map((line) => (
                  <p key={line} className={cn("flex items-start gap-2 text-sm", isAuthority ? "text-white/82" : "text-[#202733]")}>
                    <Check size={15} className="mt-0.5 text-emerald" />
                    <span>{line}</span>
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onToggle(offer.id)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm transition",
                    isAuthority ? "border-white/15 text-white hover:bg-white/6" : "border-black/20 text-[#171b22] hover:bg-black/5",
                  )}
                >
                  {expanded ? "Reduire" : "Explorer l'offre"}
                </button>
                <MagneticButton href={CALENDLY_URL} className="text-white">
                  Demarrer
                </MagneticButton>
              </div>

              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    key={`${offer.id}-expanded`}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.2, 1, 0.3, 1] }}
                    className={cn(
                      "mt-6 rounded-[1.6rem] border p-4",
                      isAuthority ? "border-white/10 bg-white/6" : "border-black/10 bg-[#f8f5ee]",
                    )}
                  >
                    {offer.categories.map((group) => (
                      <div key={group.title} className="mb-4 last:mb-0">
                        <p className="text-xs uppercase tracking-[0.18em] text-emerald">{group.title}</p>
                        <div className={cn("mt-2 grid gap-1 text-sm", isAuthority ? "text-white/78" : "text-[#222a34]")}>
                          {group.items.map((item) => (
                            <p key={item} className="flex items-start gap-2">
                              <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-emerald/70" />
                              <span>{item}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className={cn("mt-4 rounded-xl border p-3", isAuthority ? "border-emerald/20 bg-[#0f141b]" : "border-emerald/25 bg-white")}>
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald">Bonus</p>
                      <div className={cn("mt-2 grid gap-1 text-sm", isAuthority ? "text-white/82" : "text-[#222a34]")}>
                        {offer.bonus.map((item) => (
                          <p key={item} className="flex items-start gap-2">
                            <Sparkles size={13} className="mt-0.5 text-emerald" />
                            <span>{item}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}