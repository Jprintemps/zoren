"use client";

import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Crown,
  Gem,
  Layers3,
  Menu,
  MousePointerClick,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FaqAccordion21st } from "@/components/ui/faq-accordion-21st";
import { Marketplace21st } from "@/components/ui/marketplace-21st";
import { Pricing21st } from "@/components/ui/pricing-21st";
import { Testimonials21st } from "@/components/ui/testimonials-21st";
import { cn } from "@/lib/cn";

type Scene = {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  stat: string;
  statLabel: string;
  cue: string;
  bgFrom: string;
  bgTo: string;
  panel: string;
  accent: string;
  visualA?: string;
  visualB?: string;
  tags: string[];
};

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#offers", label: "Offres" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

const conversionHooks = [
  {
    title: "Presence premium immediate",
    text: "Vos prospects vous percoivent plus serieux en quelques secondes.",
  },
  {
    title: "Message compris instantanement",
    text: "Moins de friction, plus de clarte, plus de prises de contact.",
  },
  {
    title: "Parcours concu pour convertir",
    text: "Chaque section conduit naturellement vers l&apos;appel strategique.",
  },
];

const conversionOffer = [
  "Audit de perception offert au premier call",
  "Strategie de marque + execution premium",
  "Livraison rapide orientee ROI",
];

type OfferPlan = {
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

type PortfolioProject = {
  id: string;
  name: string;
  category: string;
  impact: string;
  image: string;
  alt: string;
  gallery: Array<{ src: string; alt: string }>;
};

const brandJourney = [
  "Entreprise inconnue",
  "Entreprise credible",
  "Entreprise premium",
  "Entreprise memorable",
  "Entreprise leader",
];

const CALENDLY_URL = "https://calendly.com/adasoftdesign/appel-strategique-de";

const offerPlans: OfferPlan[] = [
  {
    id: "start",
    name: "ZOREN START",
    price: "690 €",
    marketNote: "Le marche francais facture souvent entre 900 € et 2 000 € pour un travail comparable.",
    soldResult: "Pour les entrepreneurs qui lancent leur marque.",
    perceivedValue: "Valeur percue : 2 500 €+",
    delivery: "Livraison: 10 jours",
    revisions: "Revisions: 2",
    resultBullets: [
      "Poser des bases strategiques solides",
      "Construire une identite professionnelle coherente",
      "Lancer une marque qui inspire confiance",
    ],
    categories: [
      {
        title: "Strategie",
        items: [
          "Session strategique (90 min)",
          "Audit de ton marche",
          "Positionnement de marque",
          "Proposition de valeur",
          "Avatar client",
          "Naming (si necessaire)",
        ],
      },
      {
        title: "Identite",
        items: [
          "Direction creative",
          "Logo principal",
          "Logo secondaire",
          "Version icone",
          "Palette couleurs",
          "Typographies",
        ],
      },
      {
        title: "Livrables",
        items: [
          "Mini Brand Guidelines (25 pages)",
          "Kit reseaux sociaux",
          "Carte de visite",
          "Signature mail",
          "Fichiers source (AI, SVG, PDF, PNG)",
        ],
      },
    ],
    bonus: [
      "Audit Instagram",
      "Prompt IA personnalise pour creer des visuels coherents",
      "30 idees de contenus adaptees a la marque",
    ],
  },
  {
    id: "growth",
    name: "ZOREN GROWTH",
    price: "1 490 €",
    marketNote: "Des studios premium facturent frequemment entre 2 500 € et 5 000 €.",
    soldResult: "Pour les entreprises qui veulent devenir une reference.",
    perceivedValue: "Valeur percue : 6 000 €+",
    resultBullets: [
      "Tout ce qui est inclus dans START",
      "Plateforme de marque complete",
      "Support prive pendant 30 jours",
    ],
    categories: [
      {
        title: "Plateforme",
        items: [
          "Atelier strategique complet",
          "Plateforme de marque",
          "Mission",
          "Vision",
          "Valeurs",
          "Ton de voix",
          "Personnalite",
          "Messages cles",
          "Architecture de marque",
          "Univers photographique",
          "Direction artistique",
        ],
      },
      {
        title: "Assets premium",
        items: [
          "Grille Instagram",
          "20 templates premium",
          "Brand Book (60 a 80 pages)",
          "Kit LinkedIn",
          "Kit Instagram",
          "Kit Facebook",
          "Presentation commerciale",
          "Signature PowerPoint",
          "Landing page UI (maquette Figma)",
          "30 jours de support prive",
        ],
      },
    ],
    bonus: [
      "Analyse de 5 concurrents",
      "Rapport d'opportunites de differenciation",
      "Banque de plus de 100 hooks marketing",
      "Bibliotheque d'assets IA pour accelerer la creation de contenu",
    ],
  },
  {
    id: "authority",
    name: "ZOREN AUTHORITY",
    price: "2 990 €",
    marketNote: "En France, ce type d'accompagnement est souvent vendu entre 6 000 € et 15 000 €.",
    soldResult: "Pour les entreprises qui veulent dominer leur marche.",
    perceivedValue: "Valeur percue : 12 000 €+",
    resultBullets: [
      "Tout ce qui est inclus dans GROWTH",
      "Accompagnement 60 jours",
      "Pilotage strategique + execution",
    ],
    categories: [
      {
        title: "Strategie",
        items: [
          "Repositionnement complet",
          "Audit business",
          "Audit marketing",
          "Audit de communication",
          "Strategie de lancement",
          "Strategie reseaux sociaux",
          "Direction editoriale complete",
          "Systeme de storytelling",
          "Banque de hooks",
          "Banque de CTA",
        ],
      },
      {
        title: "Execution premium",
        items: [
          "Landing page premium (maquette complete)",
          "Design de site vitrine (Figma)",
          "Pack de 50 visuels reseaux sociaux",
          "Pitch deck investisseurs",
          "Kit commercial",
          "Charte editoriale",
          "Systeme de contenu",
          "Scripts pour 30 Reels",
          "Dashboard Notion de gestion de marque",
          "Reunion hebdomadaire pendant 8 semaines",
        ],
      },
    ],
    bonus: [
      "3 miniatures YouTube",
      "5 couvertures LinkedIn",
      "Kit Meta Ads",
      "Pack IA avec prompts pour ChatGPT et generateurs d'images",
      "Acces prioritaire pendant 3 mois",
    ],
  },
];

const addOns = [
  {
    name: "Landing Page",
    price: "790€",
    image: "/images/LUNAR%20MACBOOK%20FOND.webp",
    alt: "Apercu landing page premium",
  },
  {
    name: "Site Web",
    price: "1490€",
    image: "/images/KAYA%20MOCKUP%20MACBOOK.webp",
    alt: "Apercu site web premium",
  },
  {
    name: "Abonnement Design",
    price: "299€/mois",
    image: "/images/SENSE%20BRANDING.webp",
    alt: "Apercu abonnement design",
  },
  {
    name: "Unlimited Design",
    price: "499€/mois",
    image: "/images/volt%20branding%20image.webp",
    alt: "Apercu unlimited design",
  },
  {
    name: "Audit",
    price: "190€",
    image: "/images/logo%20de%20la%20place%20avant.webp",
    alt: "Apercu audit de marque",
  },
  {
    name: "Brand Sprint",
    price: "590€",
    image: "/images/logo%20de%20la%20place%20apres.webp",
    alt: "Apercu brand sprint",
  },
];

const testimonials = [
  {
    author: "Mardi Boy",
    role: "Client 01",
    quote: "Depuis la refonte, notre image est plus forte et nos prospects sont plus decisifs.",
  },
  {
    author: "Orion's CEO",
    role: "Client 02",
    quote: "Le site nous positionne clairement premium et augmente la qualite des prises de contact.",
  },
  {
    author: "Safaridew's CEO",
    role: "Client 03",
    quote: "Une execution nette, memorable et surtout orientee business du debut a la fin.",
  },
];

const portfolioProjects: PortfolioProject[] = [
  {
    id: "kaya",
    name: "Kaya",
    category: "Cosmetique naturelle",
    impact: "+320% de valeur percue",
    image: "/images/KAYA%20BRANDING.webp",
    alt: "Univers visuel Kaya",
    gallery: [
      { src: "/images/KAYA%20BRANDING.webp", alt: "Branding Kaya" },
      { src: "/images/KAYA%20LOGO.webp", alt: "Logo Kaya" },
      { src: "/images/KAYA%20MOCKUP.webp", alt: "Mockup Kaya" },
      { src: "/images/KAYA%20MOCKUP%20MACBOOK.webp", alt: "MacBook Kaya" },
      { src: "/images/KAYA%20TSHIRT%20MOCKUP.webp", alt: "T-shirt Kaya" },
    ],
  },
  {
    id: "lunar",
    name: "Lunar",
    category: "Fintech",
    impact: "+280% de credibilite",
    image: "/images/LUNAR%20BRANDING.webp",
    alt: "Interface mobile Lunar",
    gallery: [
      { src: "/images/LUNAR%20BRANDING.webp", alt: "Branding Lunar" },
      { src: "/images/LUNAR%20LOGO.webp", alt: "Logo Lunar" },
      { src: "/images/LUNAR%20MOCKUP.webp", alt: "Mockup Lunar" },
      { src: "/images/LUNAR%20MOCKUP%2002.webp", alt: "Mockup Lunar 02" },
      { src: "/images/LUNAR%20MACBOOK%20FOND.webp", alt: "MacBook Lunar" },
    ],
  },
  {
    id: "sense",
    name: "Sense",
    category: "Interieur premium",
    impact: "+180% de ventes",
    image: "/images/SENSE%20BRANDING.webp",
    alt: "Direction visuelle Sense",
    gallery: [
      { src: "/images/SENSE%20BRANDING.webp", alt: "Branding Sense" },
      { src: "/images/SENSE%20LOGO.webp", alt: "Logo Sense" },
      { src: "/images/SENSE%20LOGO%20TSHIRT.webp", alt: "Logo Sense sur textile" },
      { src: "/images/SENSE%20MACKBOOK%20MOCKUP.webp", alt: "MacBook Sense" },
      { src: "/images/SENSE%20TSHIRT%20MOCKUP.webp", alt: "T-shirt Sense" },
    ],
  },
  {
    id: "volt",
    name: "Volt",
    category: "Tech",
    impact: "+240% de leads qualifies",
    image: "/images/volt%20branding%20image.webp",
    alt: "Hero branding Volt",
    gallery: [
      { src: "/images/volt%20branding%20image.webp", alt: "Branding Volt" },
      { src: "/images/LOGO%20VOLT.webp", alt: "Logo Volt" },
      { src: "/images/logo%20volt%20mockup.webp", alt: "Mockup logo Volt" },
      { src: "/images/volt%20mockup%20tshirt.webp", alt: "T-shirt Volt" },
      { src: "/images/volt%20mokup%20macbook.webp", alt: "MacBook Volt" },
    ],
  },
];

const scenes: Scene[] = [
  {
    id: "diagnostic",
    kicker: "Curiosity Gap",
    title: "Votre image decide avant votre discours.",
    subtitle: "En moins de 3 secondes, le cerveau choisit de rester ou partir.",
    stat: "3s",
    statLabel: "pour capter l'attention",
    cue: "Prochaine scene: pourquoi certaines marques paraissent plus cheres sans dire un mot.",
    bgFrom: "#f7f4ee",
    bgTo: "#e9e3d8",
    panel: "#ffffff",
    accent: "#0f8a6c",
    visualA: "/images/image%20de%20la%20place%20Votreimagedecideavantvotrediscours..webp",
    visualB: "/images/logo%20de%20la%20place%20avant.webp",
    tags: ["Perception", "Autorite", "Confiance"],
  },
  {
    id: "authority",
    kicker: "Pattern Interrupt",
    title: "On passe d'amateur a premium.",
    subtitle: "Le visiteur sent la qualite avant meme de lire votre offre.",
    stat: "+180%",
    statLabel: "de demandes qualifiees",
    cue: "Prochaine scene: immersion visuelle avant/apres pour mesurer l'ecart.",
    bgFrom: "#eef5f3",
    bgTo: "#ddebe7",
    panel: "#fdfefd",
    accent: "#0f8a6c",
    visualA: "/images/zoren%20branding.webp",
    visualB: "/images/logo%20de%20la%20place%20apres.webp",
    tags: ["Premium", "Difference", "Business"],
  },
  {
    id: "before-after",
    kicker: "Avant / Apres",
    title: "Vous voyez la difference. Votre client aussi.",
    subtitle: "On efface le bruit. On reconstruit une image qui vend.",
    stat: "2.7x",
    statLabel: "plus de memorisation",
    cue: "Prochaine scene: passage a un univers de preuves concretes.",
    bgFrom: "#f6f2e9",
    bgTo: "#ebe5d8",
    panel: "#ffffff",
    accent: "#0f8a6c",
    visualA: "/images/logo%20de%20la%20place%20avant.webp",
    visualB: "/images/logo%20de%20la%20place%20apres.webp",
    tags: ["Avant", "Apres", "Impact"],
  },
  {
    id: "proof",
    kicker: "Halo Effect",
    title: "Chaque detail respire la maitrise.",
    subtitle: "Le design devient une preuve de competence.",
    stat: "+300%",
    statLabel: "de visibilite percue",
    cue: "Prochaine scene: on enchaine vers la transformation globale de la marque.",
    bgFrom: "#eff2f6",
    bgTo: "#e2e7ee",
    panel: "#ffffff",
    accent: "#0f8a6c",
    visualA: "/images/IMAGE%20DE%20Chaquedetailrespirelamaitrise.webp",
    visualB: "/images/LOGO%20VOLT.webp",
    tags: ["Credibilite", "Precision", "Valeur"],
  },
  {
    id: "emotion-peak",
    kicker: "Peak Moment",
    title: "Vous ne defilez plus. Vous traversez des univers.",
    subtitle: "Le scroll devient une experience cinematographique.",
    stat: "5/5",
    statLabel: "sensation premium",
    cue: "Prochaine scene: final de conversion et appel a l'action.",
    bgFrom: "#f4efe5",
    bgTo: "#e5decf",
    panel: "#fffdf9",
    accent: "#0f8a6c",
    visualA: "/images/image%20de%20la%20place%20Vousnedefilezplus.Voustraversezdesunivers..webp",
    visualB: "/images/volt%20branding%20image.webp",
    tags: ["Motion", "Narration", "Surprise"],
  },
  {
    id: "finale",
    kicker: "Peak-End Rule",
    title: "Vous voulez ce niveau pour votre marque ?",
    subtitle: "On demarre votre transformation strategique maintenant.",
    stat: "Now",
    statLabel: "prochaine etape",
    cue: "Fin de l'experience: place a la conversion.",
    bgFrom: "#f6f4ef",
    bgTo: "#e6dfd1",
    panel: "#ffffff",
    accent: "#0f8a6c",
    visualA: "/images/zoren%20branding.webp",
    visualB: "/images/KAYA%20MOCKUP.webp",
    tags: ["Action", "Call", "Growth"],
  },
];

const faqs = [
  {
    q: "Combien de temps dure un projet ?",
    a: "En moyenne 2 a 6 semaines selon le niveau choisi et la rapidite de validation.",
  },
  {
    q: "Travaillez-vous a distance ?",
    a: "Oui. Nos process sont penses pour collaborer efficacement a distance, avec un pilotage clair.",
  },
  {
    q: "Est-ce que je possede les fichiers ?",
    a: "Oui. Tous les livrables et fichiers sources vous appartiennent a la livraison.",
  },
  {
    q: "Comment savoir quelle offre choisir ?",
    a: "On vous recommande le palier le plus rentable pour votre etape business pendant l&apos;appel strategique.",
  },
];

function SplitHeadline({ text, sceneKey }: { text: string; sceneKey: string }) {
  const words = text.split(" ");
  const insightLexicon = new Set(["image", "premium", "difference", "client", "univers", "marque", "niveau"]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        key={`wipe-${sceneKey}`}
        initial={{ x: "-105%" }}
        animate={{ x: "105%" }}
        transition={{ duration: 0.82, ease: [0.24, 1, 0.34, 1] }}
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-emerald/25 to-transparent"
      />
      <h2 className="font-display text-4xl leading-[1.02] text-[#121419] sm:text-6xl">
        {words.map((word, wIdx) => (
          <span
            key={`${sceneKey}-${word}-${wIdx}`}
            className={cn(
              "mr-[0.28em] inline-block whitespace-nowrap",
              insightLexicon.has(word.toLowerCase().replace(/[^a-z]/g, "")) ? "insight-word" : "",
            )}
          >
            {word.split("").map((char, cIdx) => (
              <motion.span
                key={`${sceneKey}-${word}-${wIdx}-${cIdx}`}
                initial={{ y: 24, opacity: 0, rotateX: -65, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, rotateX: 42, filter: "blur(4px)" }}
                transition={{ duration: 0.5, delay: wIdx * 0.045 + cIdx * 0.011, ease: [0.2, 1, 0.3, 1] }}
                className="inline-block will-change-transform"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </h2>
    </div>
  );
}

function ParticleTransition({ seed }: { seed: number }) {
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((i) => {
        const angle = ((seed * 19 + i * 31) % 360) * (Math.PI / 180);
        const distance = 55 + ((seed * 7 + i * 13) % 90);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = 2 + ((i + seed) % 5);

        return (
          <motion.span
            key={`${seed}-${i}`}
            className="absolute left-1/2 top-1/2 rounded-full bg-emerald/70"
            style={{ width: size, height: size }}
            initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.15 }}
            transition={{ duration: 0.92, ease: [0.2, 1, 0.28, 1] }}
          />
        );
      })}
    </div>
  );
}

function SceneVisual({ scene }: { scene: Scene }) {
  if (scene.id === "before-after") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-3">
          <Image src={scene.visualA!} alt="Avant" width={700} height={520} className="h-full w-full rounded-xl object-cover" />
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#707782]">Avant</p>
        </div>
        <div className="rounded-2xl border border-emerald/30 bg-emerald/10 p-3">
          <Image src={scene.visualB!} alt="Apres" width={700} height={520} className="h-full w-full rounded-xl object-cover" />
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-emerald">Apres</p>
        </div>
      </div>
    );
  }

  if (scene.id === "finale") {
    return (
      <div className="rounded-2xl border border-black/10 bg-white/90 p-5">
        <Image src={scene.visualA!} alt="Final" width={1200} height={700} className="rounded-xl object-cover" />
        <div className="mt-4 flex flex-wrap gap-2">
          {scene.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-[#4f5560]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid gap-3">
      <div className="rounded-2xl border border-black/10 bg-white p-3">
        <Image src={scene.visualA!} alt={scene.title} width={1200} height={700} className="rounded-xl object-cover" />
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="rounded-2xl border border-black/10 bg-white p-3 shadow-[0_20px_45px_rgba(0,0,0,0.16)] sm:absolute sm:-bottom-6 sm:-right-6 sm:w-52"
      >
        <Image src={scene.visualB!} alt="Secondaire" width={420} height={320} className="rounded-lg object-cover" />
      </motion.div>
    </div>
  );
}

function Counter({ value, label }: { value: number; label: string }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration: 0.7,
      ease: [0.2, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  return (
    <div ref={ref} className="rounded-3xl border border-black/10 bg-white p-8 text-center shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
      <p className="font-display text-5xl text-[#121419] sm:text-6xl">+{prefersReducedMotion ? value : displayValue}%</p>
      <p className="mt-2 text-[#5a616d]">{label}</p>
    </div>
  );
}

export function LandingPage() {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [burstSeed, setBurstSeed] = useState(1);
  const [expandedOffer, setExpandedOffer] = useState<string>("authority");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedProjectImageIndex, setSelectedProjectImageIndex] = useState(0);
  const [introPhase, setIntroPhase] = useState<"intro" | "warmup" | "ready">("intro");
  const [warmupCount, setWarmupCount] = useState(0);
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const sceneIndexRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const lastIntentAtRef = useRef(0);
  const previousBodyOverflowRef = useRef<string>("");
  const previousHtmlOverflowRef = useRef<string>("");
  const previousBodyPositionRef = useRef<string>("");
  const previousBodyWidthRef = useRef<string>("");
  const previousBodyTopRef = useRef<string>("");
  const previousBodyTouchActionRef = useRef<string>("");
  const previousHtmlOverscrollRef = useRef<string>("");
  const lenisRef = useRef<Lenis | null>(null);
  const offersSectionRef = useRef<HTMLElement | null>(null);
  const offerCardRefs = useRef<Record<string, HTMLElement | null>>({});

  const experienceRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress, scrollY } = useScroll();
  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ["start start", "end end"],
  });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.35 });
  const heroMouseXSmooth = useSpring(heroMouseX, { stiffness: 120, damping: 20, mass: 0.4 });
  const heroMouseYSmooth = useSpring(heroMouseY, { stiffness: 120, damping: 20, mass: 0.4 });
  const heroVisualY = useTransform(scrollY, [0, 900], [0, -42]);
  const heroVisualRotate = useTransform(scrollY, [0, 900], [0, -1.6]);
  const heroCardY = useTransform(scrollY, [0, 900], [0, -20]);
  const heroRotateY = useTransform(heroMouseXSmooth, [-70, 70], [-7, 7]);
  const heroRotateX = useTransform(heroMouseYSmooth, [-70, 70], [7, -7]);
  const heroGlowX = useTransform(heroMouseXSmooth, [-70, 70], [35, 70]);
  const heroGlowY = useTransform(heroMouseYSmooth, [-70, 70], [35, 70]);
  const heroGlow = useMotionTemplate`radial-gradient(circle at ${heroGlowX}% ${heroGlowY}%, rgba(15,138,108,0.22), rgba(20,24,31,0.2) 40%, rgba(20,24,31,0.95) 80%)`;

  const introDone = introPhase !== "intro";
  const remainingUnlock = Math.max(0, 2 - warmupCount);

  useEffect(() => {
    previousBodyOverflowRef.current = document.body.style.overflow;
    previousHtmlOverflowRef.current = document.documentElement.style.overflow;
    previousBodyPositionRef.current = document.body.style.position;
    previousBodyWidthRef.current = document.body.style.width;
    previousBodyTopRef.current = document.body.style.top;
    previousBodyTouchActionRef.current = document.body.style.touchAction;
    previousHtmlOverscrollRef.current = document.documentElement.style.overscrollBehavior;
  }, []);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    if (introPhase === "ready") {
      body.style.overflow = previousBodyOverflowRef.current;
      html.style.overflow = previousHtmlOverflowRef.current;
      body.style.position = previousBodyPositionRef.current;
      body.style.width = previousBodyWidthRef.current;
      body.style.top = previousBodyTopRef.current;
      body.style.touchAction = previousBodyTouchActionRef.current;
      html.style.overscrollBehavior = previousHtmlOverscrollRef.current;
      return;
    }

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = "0px";
    body.style.touchAction = "none";
    html.style.overscrollBehavior = "none";
  }, [introPhase]);

  useEffect(() => {
    if (introPhase === "ready") return;

    const block = (event: Event) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (["Space", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.code)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [introPhase]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const body = document.body;
    const html = document.documentElement;
    const timer = window.setTimeout(() => {
      setIntroPhase("warmup");
    }, 2150);

    return () => {
      window.clearTimeout(timer);
      body.style.overflow = previousBodyOverflowRef.current;
      html.style.overflow = previousHtmlOverflowRef.current;
    };
  }, []);

  useEffect(() => {
    if (introPhase !== "warmup") return;

    const registerIntent = () => {
      const now = Date.now();
      if (now - lastIntentAtRef.current < 340) return;
      lastIntentAtRef.current = now;

      setWarmupCount((prev) => {
        const next = Math.min(2, prev + 1);
        if (next >= 2) {
          setIntroPhase("ready");
        }
        return next;
      });
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 10) return;
      event.preventDefault();
      registerIntent();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const endY = event.changedTouches[0]?.clientY;
      touchStartYRef.current = null;
      if (startY == null || endY == null) return;
      if (startY - endY > 14) {
        registerIntent();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "PageDown" || event.code === "ArrowDown") {
        event.preventDefault();
        registerIntent();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [introPhase]);

  useMotionValueEvent(experienceProgress, "change", (latest) => {
    const max = scenes.length;
    const idx = Math.min(max - 1, Math.max(0, Math.floor(latest * max)));

    if (idx !== sceneIndexRef.current) {
      sceneIndexRef.current = idx;
      setSceneIndex(idx);
      setBurstSeed((prev) => prev + 1);
    }
  });

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => setScrolled(y > 8));
    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      lerp: 0.08,
      wheelMultiplier: 0.84,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.stop();

    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (introPhase === "ready") {
      lenisRef.current.start();
      return;
    }
    lenisRef.current.stop();
  }, [introPhase]);

  useEffect(() => {
    if (!offersSectionRef.current) return;
    if (prefersReducedMotion) {
      gsap.set(".offer-stage-title", { opacity: 1, y: 0 });
      gsap.set(".offer-card", { opacity: 1, y: 0, x: 0, rotateX: 0, scale: 1, filter: "blur(0px)" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".offer-card[data-rank='0']", { opacity: 0, y: 110, x: -42, rotateX: 11, scale: 0.95, filter: "blur(14px)" });
      gsap.set(".offer-card[data-rank='1']", { opacity: 0, y: 118, x: 0, rotateX: 11, scale: 0.94, filter: "blur(14px)" });
      gsap.set(".offer-card[data-rank='2']", { opacity: 0, y: 126, x: 42, rotateX: 11, scale: 0.93, filter: "blur(14px)" });
      gsap.set(".offer-stage-title", { opacity: 0, y: 26 });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: offersSectionRef.current,
          start: "top 76%",
          once: true,
        },
      });

      introTl
        .to(".offer-stage-title", {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        })
        .to(
          ".offer-card[data-rank='0']",
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.08,
            ease: "expo.out",
          },
          "-=0.28",
        )
        .to(
          ".offer-card[data-rank='1']",
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.12,
            ease: "expo.out",
          },
          "-=0.54",
        )
        .to(
          ".offer-card[data-rank='2']",
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out",
          },
          "-=0.58",
        );

      gsap.to(".offer-card[data-rank='0']", {
        y: -10,
        scrollTrigger: {
          trigger: offersSectionRef.current,
          start: "top 64%",
          end: "bottom 34%",
          scrub: 1,
        },
      });

      gsap.to(".offer-card[data-rank='1']", {
        y: -22,
        scrollTrigger: {
          trigger: offersSectionRef.current,
          start: "top 64%",
          end: "bottom 34%",
          scrub: 1,
        },
      });

      gsap.to(".offer-card[data-rank='2']", {
        y: -36,
        scrollTrigger: {
          trigger: offersSectionRef.current,
          start: "top 64%",
          end: "bottom 34%",
          scrub: 1,
        },
      });
    }, offersSectionRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const scene = scenes[sceneIndex];
  const transitionModes = [
    {
      enter: { scale: 0.93, rotate: -1.5, y: 22, opacity: 0 },
      center: { scale: 1, rotate: 0, y: 0, opacity: 1 },
      exit: { scale: 1.07, rotate: 1.5, y: -20, opacity: 0 },
    },
    {
      enter: { scale: 1.04, rotate: 3, x: 28, opacity: 0 },
      center: { scale: 1, rotate: 0, x: 0, opacity: 1 },
      exit: { scale: 0.9, rotate: -3, x: -34, opacity: 0 },
    },
    {
      enter: { scale: 0.98, rotateX: -24, y: 18, opacity: 0 },
      center: { scale: 1, rotateX: 0, y: 0, opacity: 1 },
      exit: { scale: 1.02, rotateX: 19, y: -22, opacity: 0 },
    },
  ];
  const mode = transitionModes[sceneIndex % transitionModes.length];

  const handleOfferToggle = (offerId: string) => {
    setExpandedOffer((prev) => {
      const next = prev === offerId ? "" : offerId;
      if (next && typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
        requestAnimationFrame(() => {
          offerCardRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return next;
    });
  };

  const handleHeroPointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    heroMouseX.set(Math.max(-70, Math.min(70, x / 6.4)));
    heroMouseY.set(Math.max(-70, Math.min(70, y / 6.4)));
  };

  const handleHeroPointerLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  const handleProjectImageStep = (direction: -1 | 1) => {
    if (!selectedProject) return;
    const total = selectedProject.gallery.length;
    setSelectedProjectImageIndex((prev) => (prev + direction + total) % total);
  };

  const handleProjectOpen = (project: PortfolioProject) => {
    setSelectedProjectImageIndex(0);
    setSelectedProject(project);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const logos = useMemo(
    () =>
      [
        ...[
          "CONSISTANCE CONCEPT",
          "AVENCIA",
          "SAFARIDEW",
          "NEVLEPPS",
          "POG+",
          "NUBIA HOLDING",
          "GOSPEL SHOW CASE",
          "ABA BUSINESS",
          "ATHEMISE",
          "FROM MEDICAL",
        ],
        ...[
          "CONSISTANCE CONCEPT",
          "AVENCIA",
          "SAFARIDEW",
          "NEVLEPPS",
          "POG+",
          "NUBIA HOLDING",
          "GOSPEL SHOW CASE",
          "ABA BUSINESS",
          "ATHEMISE",
          "FROM MEDICAL",
        ],
      ],
    [],
  );

  return (
    <div className="relative min-h-screen bg-[#f3efe8] text-[#111317]">
      <a
        href="#main-content"
        className="sr-only z-[120] rounded-md bg-[#0f8a6c] px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu principal
      </a>
      <motion.div
        initial={{ opacity: 0.92 }}
        animate={{ opacity: introDone ? 0 : 0.92 }}
        transition={{ duration: 0.8, delay: introDone ? 0.18 : 0, ease: [0.2, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-0 z-[80] bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.85),rgba(247,243,233,0.95)_52%,rgba(239,232,219,0.98)_100%)]"
      />
      <div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center">
        <motion.div
          initial={{ x: "0vw", y: "0vh", scale: 1, opacity: 1 }}
          animate={introDone ? { x: "-43vw", y: "-42vh", scale: 0.38, opacity: 0 } : { x: "0vw", y: "0vh", scale: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.2, 1, 0.3, 1] }}
          className="will-change-transform"
        >
          <Image src="/logo-noire.png" alt="ZOREN" width={520} height={152} className="h-14 w-auto object-contain sm:h-20" priority />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: introPhase === "ready" ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none fixed inset-x-0 bottom-8 z-[90] flex justify-center"
      >
        <motion.p
          initial={{ y: 0, opacity: 0.75 }}
          animate={
            introPhase === "ready"
              ? { y: 10, opacity: 0 }
              : prefersReducedMotion
                ? { y: 0, opacity: 1 }
                : { y: [0, 8, 0], opacity: [0.75, 1, 0.75] }
          }
          transition={
            introPhase === "ready"
              ? { duration: 0.35 }
              : prefersReducedMotion
                ? { duration: 0.25 }
                : { duration: 1.8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }
          }
          className="rounded-full border border-black/15 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#15191f] backdrop-blur sm:px-5 sm:text-xs sm:tracking-[0.26em]"
        >
          {introPhase === "warmup" ? `Scrollez encore ${remainingUnlock} fois` : "Scrollez"}
        </motion.p>
      </motion.div>

      <motion.div style={{ scaleX: bar }} className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-emerald" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.7),transparent_34%),radial-gradient(circle_at_95%_8%,rgba(15,138,108,0.14),transparent_30%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 noise-overlay" />

      <motion.div
        initial={{ opacity: 0, filter: "blur(18px)" }}
        animate={{ opacity: introDone ? 1 : 0, filter: introDone ? "blur(0px)" : "blur(18px)" }}
        transition={{ duration: 1, delay: introDone ? 0.2 : 0, ease: [0.2, 1, 0.3, 1] }}
      >
      <header
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-all duration-500",
          scrolled ? "border-b border-black/10 bg-[#f6f3ee]/88 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#" className="inline-flex items-center" aria-label="ZOREN">
            <Image
              src="/logo-noire.png"
              alt="ZOREN"
              width={220}
              height={64}
              className="h-8 w-auto object-contain sm:h-9"
              priority
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-[#4e545d] transition-colors hover:text-[#111317]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <MagneticButton href={CALENDLY_URL} className="text-white">
              Reserver un appel
            </MagneticButton>
          </div>

          <button className="rounded-full border border-black/15 p-2 text-[#4e545d] lg:hidden" aria-label="Ouvrir le menu" onClick={() => setMenuOpen((prev) => !prev)}>
            <Menu size={20} />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-black/10 bg-[#f6f3ee] px-6 py-6 backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="text-[#4e545d]" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                ))}
                <MagneticButton href={CALENDLY_URL} className="mt-2 w-full text-white">
                  Reserver un appel
                </MagneticButton>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="main-content" className="relative z-10">
        <section className="px-6 pb-16 pt-24 lg:px-10 lg:pt-28">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.2, 1, 0.3, 1] }}
              style={{ y: heroCardY }}
              className="relative overflow-hidden rounded-[2.2rem] border border-black/10 bg-white/88 p-8 shadow-[0_28px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-10"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f4ead4]/80 via-white/30 to-transparent" />
              <h1 className="relative mt-5 font-display text-4xl leading-[0.97] text-[#121419] sm:text-6xl xl:text-7xl">
                Votre <span className="insight-word">marque</span> cesse d&apos;etre vue.
                <br />
                Elle commence a <span className="tracking-[0.02em]">s&apos;imposer.</span>
              </h1>
              <p className="relative mt-5 max-w-2xl text-lg text-[#4f5560]">Vos prospects comprennent instantanement votre niveau, votre valeur et pourquoi vous etes le bon choix.</p>

              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton href={CALENDLY_URL} className="text-white">
                  Reserver un appel
                </MagneticButton>
                <motion.a
                  href={CALENDLY_URL}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white/70 px-6 py-3 text-sm font-medium text-[#171b22] transition-colors hover:bg-black/5"
                >
                  Reserver votre session <ArrowRight size={16} />
                </motion.a>
              </div>

              <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { value: "+300%", label: "visibilite percue" },
                  { value: "+180%", label: "intention de contact" },
                  { value: "95%", label: "satisfaction client" },
                ].map((metric, idx) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.42, delay: idx * 0.06, ease: [0.2, 1, 0.3, 1] }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className="rounded-[1.4rem] border border-black/10 bg-[#fbf8f2] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.04)]"
                  >
                    <p className="font-display text-3xl text-[#121419]">{metric.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#6b7280]">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-6 rounded-[1.8rem] border border-black/10 bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-emerald">Pourquoi ca convertit mieux</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#7a818d]">Clarte immediate</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {conversionHooks.map((item, idx) => (
                    <motion.article
                      key={item.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.2, 1, 0.3, 1] }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="rounded-2xl border border-black/10 bg-[#f8f5ee] p-4"
                    >
                      <p className="font-display text-xl text-[#121419]">{item.title}</p>
                      <p className="mt-1 text-sm text-[#555c67]">{item.text}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 1.3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.2, 1, 0.3, 1] }}
              style={{ y: heroVisualY, rotate: heroVisualRotate }}
              onMouseMove={handleHeroPointerMove}
              onMouseLeave={handleHeroPointerLeave}
              className="relative grid grid-cols-2 gap-4 [perspective:1200px]"
            >
              <motion.div
                style={prefersReducedMotion ? undefined : { rotateX: heroRotateX, rotateY: heroRotateY }}
                className="col-span-2 relative overflow-hidden rounded-[1.9rem] border border-black/10 bg-[#14181f] p-6 text-white shadow-[0_30px_70px_rgba(0,0,0,0.28)]"
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={prefersReducedMotion ? undefined : { background: heroGlow }}
                />
                <div className="relative z-[1] flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Scene 01</p>
                    <p className="mt-2 font-display text-2xl text-white sm:text-3xl">Perception avant argument.</p>
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-emerald">
                    Premium Entry
                  </div>
                </div>
                <motion.div
                  aria-hidden
                  animate={prefersReducedMotion ? undefined : { y: [0, -6, 0], scale: [1, 1.015, 1] }}
                  transition={prefersReducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                  className="relative z-[1] mx-auto mt-6 h-56 w-56 [transform-style:preserve-3d] sm:h-64 sm:w-64"
                >
                  <div className="absolute inset-0 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-transparent to-black/40 shadow-[inset_0_0_50px_rgba(255,255,255,0.08)]" />
                  <div className="absolute inset-3 overflow-hidden rounded-xl border border-emerald/35 bg-[#0f1117]">
                    <Image
                      src="/images/zoren%20branding.webp"
                      alt="Apercu branding Zoren"
                      fill
                      sizes="256px"
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_32%,rgba(15,138,108,0.18))]" />
                    <div className="absolute inset-x-6 top-5 h-px bg-white/30" />
                  </div>
                  <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-emerald/40 bg-emerald/15 backdrop-blur-sm" />
                  <div className="absolute inset-x-8 -bottom-4 h-8 rounded-full bg-emerald/35 blur-2xl" />
                </motion.div>
                <div className="relative z-[1] mt-5 grid grid-cols-[1.1fr_0.9fr] gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                  <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5 p-2">
                    <Image
                      src="/images/LOGO%20VOLT.webp"
                      alt="Signal de marque premium"
                      width={220}
                      height={120}
                      className="h-16 w-full rounded-lg object-cover"
                    />
                    <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-lg bg-black/20 px-2 py-1 text-[10px] tracking-[0.18em] text-white/88">
                      Signal premium
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <motion.p whileHover={{ x: 4 }} className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                      Perception
                    </motion.p>
                    <motion.p whileHover={{ x: 4 }} className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                      Confiance
                    </motion.p>
                  </div>
                </div>
                <div className="relative z-[1] mt-4 grid gap-3 sm:grid-cols-2">
                  <motion.div whileHover={{ y: -4 }} className="rounded-[1.2rem] border border-white/12 bg-white/6 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Impact visuel</p>
                    <p className="mt-2 font-display text-2xl text-white">Compris en 3 secondes.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="rounded-[1.2rem] border border-emerald/25 bg-emerald/10 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-emerald">CTA prioritaire</p>
                    <p className="mt-2 text-sm text-white/82">Tout est aligne pour guider naturellement vers votre prochain appel.</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -6, rotate: -0.4 }} className="relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_18px_36px_rgba(0,0,0,0.1)]">
                <Image
                  src="/images/LUNAR%20MOCKUP.webp"
                  alt="Mockup premium"
                  width={600}
                  height={420}
                  className="h-full rounded-2xl object-cover object-[50%_42%] transition duration-700 hover:scale-[1.03]"
                  priority
                />
                <div className="pointer-events-none absolute inset-x-4 top-4 inline-flex w-fit rounded-full border border-white/20 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
                  Brand page
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -6, rotate: 0.4 }} className="relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_18px_36px_rgba(0,0,0,0.1)]">
                <Image
                  src="/images/KAYA%20MOCKUP.webp"
                  alt="Mobile showcase"
                  width={600}
                  height={420}
                  className="h-full rounded-2xl object-cover object-center transition duration-700 hover:scale-[1.03]"
                  priority
                />
                <div className="pointer-events-none absolute inset-x-4 top-4 inline-flex w-fit rounded-full border border-white/20 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
                  Conversion layer
                </div>
              </motion.div>
              <div className="col-span-2 rounded-[1.8rem] border border-black/10 bg-white p-5 shadow-[0_16px_42px_rgba(0,0,0,0.08)]">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#606875]">Ce que vous obtenez</p>
                  <p className="mt-2 max-w-xl text-[#4f5560]">Une offre claire, des benefices concrets et un prochain pas simple a prendre.</p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {conversionOffer.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.2, 1, 0.3, 1] }}
                      className="rounded-xl border border-black/10 bg-[#f7f5f0] p-3"
                    >
                      <p className="flex items-start gap-2 text-sm text-[#151921]">
                        <Check size={16} className="mt-0.5 text-emerald" />
                        <span>{item}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-3 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#5d6470]">Places limitees chaque mois pour garder un niveau d&apos;execution premium.</p>
                  <a href={CALENDLY_URL} className="text-sm uppercase tracking-[0.16em] text-emerald transition hover:opacity-75">
                    Voir le prochain slot
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="experience" ref={experienceRef} className="relative h-[760vh] px-4 sm:px-6 lg:px-10">
          <div className="sticky top-[88px] mx-auto h-[calc(100vh-112px)] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.14)]">
            <motion.div
              animate={{ background: `linear-gradient(132deg, ${scene.bgFrom} 0%, ${scene.bgTo} 100%)` }}
              transition={{ duration: 0.75, ease: [0.2, 1, 0.3, 1] }}
              className="relative h-full w-full"
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={scene.id}
                  initial={mode.enter}
                  animate={mode.center}
                  exit={mode.exit}
                  transition={{ duration: 0.72, ease: [0.2, 1, 0.3, 1] }}
                  className="absolute inset-0 grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10"
                >
                  <div className="relative rounded-3xl border border-black/10 bg-white/84 p-6 backdrop-blur-xl sm:p-8">
                    <ParticleTransition seed={burstSeed} />
                    <p className="text-xs uppercase tracking-[0.2em]" style={{ color: scene.accent }}>
                      {scene.kicker}
                    </p>
                    <AnimatePresence mode="wait">
                      <SplitHeadline text={scene.title} sceneKey={scene.id} />
                    </AnimatePresence>
                    <motion.p
                      key={`sub-${scene.id}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.12 }}
                      className="mt-4 max-w-lg text-lg text-[#515965]"
                    >
                      {scene.subtitle}
                    </motion.p>

                    <div className="mt-8 grid grid-cols-[auto_1fr] items-end gap-4 rounded-2xl border border-black/10 bg-white px-4 py-3">
                      <p className="font-display text-4xl leading-none text-[#111317]">{scene.stat}</p>
                      <p className="text-sm text-[#5a626f]">{scene.statLabel}</p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {scene.tags.map((tag) => (
                        <span key={`${scene.id}-${tag}`} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs uppercase tracking-[0.13em] text-[#565e6a]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 text-sm text-[#525a66]">{scene.cue}</p>

                    <div className="mt-5 flex items-center gap-2">
                      {scenes.map((_, i) => (
                        <span
                          key={`dot-${i}`}
                          className={cn(
                            "h-1.5 rounded-full transition-all",
                            i === sceneIndex ? "w-12 bg-emerald" : "w-5 bg-black/18",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <SceneVisual scene={scene} />
                    <motion.div
                      key={`light-${scene.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55 }}
                      className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full blur-3xl"
                      style={{ backgroundColor: `${scene.accent}3a` }}
                    />
                  </div>
                </motion.article>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
          <div className="relative min-h-[88vh] overflow-hidden rounded-[2.6rem] border border-black/10 bg-[#12161d] px-6 py-16 sm:px-10 sm:py-20">
            <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_36%,rgba(15,138,108,0.14))]" />

            <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center">
              <p className="mb-8 text-center text-xs uppercase tracking-[0.26em] text-emerald">Positionnement strategique</p>
              <div className="space-y-6 text-center sm:space-y-8">
                {[
                  "Nous ne creons pas des logos.",
                  "Nous construisons des marques qui inspirent confiance.",
                  "Qui justifient des prix plus eleves.",
                  "Qui attirent de meilleurs clients.",
                ].map((line, idx) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.2, 1, 0.3, 1] }}
                    className={cn(
                      "font-display leading-[1.08] text-[#ecf0f6]",
                      idx === 0 ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl",
                    )}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.24em] text-emerald">Pourquoi investir dans le branding</p>
              <div className="space-y-6 border-l border-black/15 pl-5">
                {brandJourney.map((stage, idx) => (
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.2, 1, 0.3, 1] }}
                    className="relative"
                  >
                    <span className="absolute -left-[1.66rem] top-2 h-2.5 w-2.5 rounded-full bg-emerald shadow-[0_0_0_6px_rgba(15,138,108,0.12)]" />
                    <p className="font-display text-2xl text-[#111317] sm:text-3xl">{stage}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: [0.2, 1, 0.3, 1] }}
              className="relative rounded-[2rem] border border-black/10 bg-white/85 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-emerald/15 blur-3xl" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Building2, title: "Autorite", text: "Presence plus credible sur chaque point de contact." },
                  { icon: Gem, title: "Valeur", text: "Perception premium qui legitime des tarifs plus hauts." },
                  { icon: Layers3, title: "Coherence", text: "Systeme de marque consistant, clair et memorisable." },
                  { icon: Crown, title: "Leadership", text: "Positionnement de reference dans votre categorie." },
                ].map((item, idx) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.2, 1, 0.3, 1] }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="rounded-2xl border border-black/10 bg-[#f8f5ee] p-4"
                  >
                    <item.icon className="text-emerald" size={20} />
                    <p className="mt-3 font-display text-2xl text-[#111317]">{item.title}</p>
                    <p className="mt-1 text-sm text-[#515965]">{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald">Preuves</p>
            <h3 className="mt-2 font-display text-4xl leading-[1.04] text-[#111317] sm:text-5xl">Des signaux qui rassurent avant le premier appel.</h3>
            <p className="mt-3 text-[#515965]">Resultats visibles, temoignages reels et promesse tenue: tout pointe vers la confiance.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Strategie avant design", "Execution rapide", "Conversion orientee business"].map((point) => (
              <article key={point} className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="flex items-center gap-3 text-[#111317]">
                  <Check size={18} className="text-emerald" /> {point}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Counter value={300} label="visibilite" />
            <Counter value={180} label="devis" />
            <Counter value={95} label="satisfaction" />
          </div>
          <div className="mt-8">
            <Testimonials21st items={testimonials} />
          </div>
        </section>

        <section id="offers" ref={offersSectionRef} className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c89d49]/50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-24 h-52 bg-gradient-to-r from-[#f1dfb8]/22 via-[#f7f1e2]/36 to-[#d7af66]/22 blur-3xl" />
          <div className="offer-stage-title mb-10">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald">Offres</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.03] text-[#111317] sm:text-6xl">
              Choisissez votre niveau d&apos;ascension.
            </h2>
            <p className="mt-3 max-w-3xl text-[#515965]">
              Chaque palier augmente votre valeur percue, votre autorite et votre capacite a attirer de meilleurs clients.
            </p>
          </div>

          <Pricing21st offers={offerPlans} expandedOffer={expandedOffer} onToggle={handleOfferToggle} offerCardRefs={offerCardRefs} />
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="rounded-[2rem] border border-black/10 bg-white p-10 shadow-[0_22px_70px_rgba(0,0,0,0.1)] sm:p-14">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald/35 bg-emerald/10 text-emerald">
                <ShieldCheck size={30} />
              </span>
              <h3 className="mt-5 font-display text-4xl text-[#111317] sm:text-5xl">Notre garantie</h3>
              <p className="mt-4 text-[#4f5560]">
                Si l&apos;identite livree ne correspond pas a la strategie validee ensemble, nous retravaillons gratuitement jusqu&apos;a ce qu&apos;elle soit parfaitement alignee avec le brief strategique.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald">Options additionnelles</p>
            <h3 className="mt-2 font-display text-4xl leading-[1.03] text-[#111317] sm:text-5xl">Marketplace premium</h3>
            <p className="mt-3 max-w-2xl text-[#515965]">Chaque option devient un module editoriale de croissance, presente comme une extension de votre systeme de marque.</p>
          </div>
          <Marketplace21st items={addOns} />
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald">Realisations</p>
              <h3 className="mt-2 font-display text-4xl leading-[1.03] text-[#111317] sm:text-5xl">Des preuves qui se vivent.</h3>
              <p className="mt-2 max-w-2xl text-[#515965]">Chaque projet montre un changement de perception, de valeur et de traction business.</p>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#66707e]">Glissez ou cliquez pour explorer</p>
          </div>

          <div className="scrollbar-none -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
            {portfolioProjects.map((project, idx) => (
              <motion.button
                key={project.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.52, delay: idx * 0.06, ease: [0.2, 1, 0.3, 1] }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }}
                onClick={() => handleProjectOpen(project)}
                className="group relative min-w-[82%] snap-start overflow-hidden rounded-[1.8rem] border border-black/10 bg-white text-left shadow-[0_22px_60px_rgba(0,0,0,0.12)] sm:min-w-[55%] lg:min-w-[38%]"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={1000}
                    height={700}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/75">{project.category}</p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <p className="font-display text-3xl">{project.name}</p>
                  </div>
                  <p className="mt-2 text-sm text-emerald/95">{project.impact}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[2.6rem] border border-black/10 bg-[#101317] px-8 py-16 text-[#f2f4f7] sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute -right-8 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-emerald/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald">Decision strategique</p>
              <h3 className="mt-4 font-display text-4xl leading-[1.03] text-white sm:text-6xl">
                Votre entreprise merite mieux qu&apos;un simple logo.
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-[#d4d9e2]">
                Construisons une marque dont les gens se souviennent.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <MagneticButton href={CALENDLY_URL} className="text-white">
                  Planifier un appel strategique
                </MagneticButton>
                <a href={CALENDLY_URL} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm text-white/95 transition hover:bg-white/10">
                  Demarrer maintenant <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-10">
          <section className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white p-10 shadow-[0_28px_90px_rgba(0,0,0,0.14)] sm:p-14">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-emerald/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-black/5 blur-3xl" />
            <div className="relative z-10 text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-emerald">Derniere etape</p>
              <h2 className="font-display text-4xl leading-[1.02] text-[#111317] sm:text-6xl">
                Votre <span className="insight-word insight-line">marque</span> peut changer en quelques semaines.
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-[#4f5560]">Si vous voulez etre percu comme le meilleur choix, on commence maintenant.</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <MagneticButton href={CALENDLY_URL} className="text-white">
                  Reserver mon appel strategique
                </MagneticButton>
                <a href={CALENDLY_URL} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm text-[#111317] hover:bg-black/5">
                  Ouvrir Calendly <MousePointerClick size={15} />
                </a>
              </div>
              <div className="mt-10 overflow-hidden rounded-[1.8rem] border border-black/10 bg-white">
                <div
                  className="calendly-inline-widget"
                  data-url={CALENDLY_URL}
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </div>
          </section>
        </section>

        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

        <section id="faq" className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-emerald">FAQ</p>
            <h2 className="font-display text-3xl font-medium leading-[1.04] text-[#111317] sm:text-4xl lg:text-5xl">Questions rapides, reponses nettes.</h2>
          </div>
          <FaqAccordion21st items={faqs} />
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#5a616d]">Ils nous ont fait confiance, voici les marques</p>
          </div>
          <div className="logo-marquee">
            <div className="logo-track">
              {logos.map((logo, idx) => (
                <span key={`${logo}-${idx}`} className="logo-pill-light">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Apercu du projet ${selectedProject.name}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.42, ease: [0.2, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative mt-16 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 bg-[#0f1319] text-white shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-black/30 p-2 text-white transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                aria-label="Fermer l&apos;apercu projet"
              >
                <X size={18} />
              </button>
              <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
                <div className="flex max-h-[80vh] flex-col overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
                  <div className="relative min-h-[280px]">
                    <Image
                      src={selectedProject.gallery[selectedProjectImageIndex]?.src ?? selectedProject.image}
                      alt={selectedProject.gallery[selectedProjectImageIndex]?.alt ?? selectedProject.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    {selectedProject.gallery.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleProjectImageStep(-1)}
                          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2 text-white transition hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                          aria-label="Image precedente"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleProjectImageStep(1)}
                          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2 text-white transition hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                          aria-label="Image suivante"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    ) : null}
                  </div>
                  <div className="scrollbar-none grid max-h-[46vh] gap-3 overflow-y-auto p-4 sm:grid-cols-2">
                    {selectedProject.gallery.map((item, idx) => (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setSelectedProjectImageIndex(idx)}
                        className={cn(
                          "relative overflow-hidden rounded-2xl border bg-white/5 text-left transition",
                          idx === selectedProjectImageIndex ? "border-emerald/45 ring-1 ring-emerald/35" : "border-white/10",
                        )}
                        aria-label={`Afficher ${item.alt}`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={900}
                          height={700}
                          className="h-40 w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between p-7">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald">{selectedProject.category}</p>
                    <h4 className="mt-3 font-display text-4xl leading-[1.05]">{selectedProject.name}</h4>
                    <p className="mt-3 text-sm text-white/80">{selectedProject.impact}</p>
                    <p className="mt-5 text-sm text-white/75">
                      Positionnement clarifie, perception rehaussee et parcours oriente conversion pour attirer de meilleurs clients.
                    </p>
                    <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/55">
                      Carousel de la marque {selectedProject.name} : {selectedProjectImageIndex + 1}/{selectedProject.gallery.length}
                    </p>
                  </div>
                  <div className="mt-8">
                    <MagneticButton href={CALENDLY_URL} className="w-full text-white">
                      Demarrer ce niveau
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <footer className="border-t border-black/10 bg-white/70 px-6 py-12 backdrop-blur-xl lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image
              src="/logo-noire.png"
              alt="ZOREN"
              width={240}
              height={70}
              className="h-9 w-auto object-contain"
            />
            <p className="mt-4 max-w-xl text-[#4f5560]">
              Nous aidons les entreprises ambitieuses a devenir la premiere option dans l&apos;esprit de leurs clients.
            </p>
            <p className="mt-3 max-w-xl text-[#4f5560]">Une experience visuelle qui surprend, rassure et pousse a agir.</p>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#5a616d]">Navigation</p>
            <div className="flex flex-col gap-2 text-[#1d2128]">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-emerald">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#5a616d]">Contact</p>
            <div className="space-y-2 text-[#1d2128]">
              <p>contact@zoren.agency</p>
              <p>+243 995 342 102</p>
              <p>Lubumbashi, RDCongo</p>
            </div>
          </div>
        </div>
      </footer>
      </motion.div>
    </div>
  );
}
