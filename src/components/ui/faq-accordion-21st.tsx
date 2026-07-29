"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

const CALENDLY_URL = "https://calendly.com/adasoftdesign/appel-strategique-de";

type FaqItem = {
  q: string;
  a: string;
};

type FaqAccordion21stProps = {
  items: FaqItem[];
};

export function FaqAccordion21st({ items }: FaqAccordion21stProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={faq.q}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ delay: index * 0.08, duration: 0.42 }}
            className="overflow-hidden rounded-[1.8rem] border border-black/10 bg-white/90 shadow-[0_16px_44px_rgba(0,0,0,0.08)]"
          >
            <motion.button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              whileHover={{ backgroundColor: "rgba(15, 138, 108, 0.04)" }}
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3 pr-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald/20 bg-emerald/8 text-emerald">
                  <HelpCircle size={18} />
                </span>
                <span className="font-display text-xl text-[#111317] sm:text-2xl">{faq.q}</span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
                className={cn(
                  "inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border",
                  isOpen ? "border-emerald/30 bg-emerald/10 text-emerald" : "border-black/10 bg-[#f7f3ea] text-[#6b7280]",
                )}
              >
                <ChevronDown size={18} />
              </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-black/8 px-6 pb-6 pt-1 text-[#525965]">
                    <p>{faq.a}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.25, duration: 0.45 }}
        className="rounded-[2rem] border border-black/10 bg-gradient-to-br from-[#11161d] via-[#18212b] to-[#0f1319] p-7 text-white shadow-[0_22px_70px_rgba(0,0,0,0.2)]"
      >
        <MessageCircle className="h-10 w-10 text-emerald" />
        <h3 className="mt-4 font-display text-3xl">Vous voulez une reponse adaptee a votre marque ?</h3>
        <p className="mt-2 max-w-2xl text-white/70">Si votre question est plus specifique, on vous repond directement pendant l&apos;appel strategique.</p>
        <div className="mt-6">
          <a
            href={CALENDLY_URL}
            className="inline-flex items-center justify-center rounded-full border border-emerald/30 bg-emerald px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-emerald/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
          >
            Reserver un appel
          </a>
        </div>
      </motion.div>
    </div>
  );
}