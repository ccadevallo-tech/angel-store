import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logoUrl from "/angel-logo.png";

type App = {
  id: string;
  name: string;
  sigil: string;
  domain: string;
  description: string;
  resonance: string;
};

const APPS: App[] = [
  {
    id: "lumen",
    name: "Lumen",
    sigil: "✦",
    domain: "Vision Augmentée",
    description:
      "Perçois au-delà du visible. Chaque pensée devient une lumière cartographiée.",
    resonance: "432 Hz",
  },
  {
    id: "seraph",
    name: "Seraph",
    sigil: "✧",
    domain: "Communication Céleste",
    description:
      "Messagerie cryptée entre âmes éveillées. Aucune trace, seulement l'intention.",
    resonance: "528 Hz",
  },
  {
    id: "oraculus",
    name: "Oraculus",
    sigil: "☉",
    domain: "Prédiction Quantique",
    description:
      "L'IA qui consulte les futurs probables. Elle ne se trompe jamais — elle te trompe parfois.",
    resonance: "639 Hz",
  },
  {
    id: "elevatio",
    name: "Elevatio",
    sigil: "↟",
    domain: "Élévation du Corps",
    description:
      "Programme de bio-résonance. Synchronise ton ADN avec la fréquence de ta plus haute version.",
    resonance: "741 Hz",
  },
  {
    id: "aether",
    name: "Aether",
    sigil: "◈",
    domain: "Stockage de l'Âme",
    description:
      "Archive immuable de tes mémoires conscientes. Un cloud qui survit à la mort.",
    resonance: "852 Hz",
  },
  {
    id: "ignis",
    name: "Ignis",
    sigil: "🜂",
    domain: "Forge Créative",
    description:
      "Co-création avec l'esprit. Génère matières, mondes et idées par pure intention.",
    resonance: "963 Hz",
  },
  {
    id: "nyx",
    name: "Nyx",
    sigil: "☽",
    domain: "Veille Nocturne",
    description:
      "Protège ton sommeil. Filtre les rêves toxiques, amplifie les visions prophétiques.",
    resonance: "396 Hz",
  },
  {
    id: "logos",
    name: "Logos",
    sigil: "Ψ",
    domain: "Verbe Créateur",
    description:
      "Transforme ta parole en commande de la réalité. À utiliser avec discernement.",
    resonance: "417 Hz",
  },
];

const RANKS = ["Initié", "Veilleur", "Séraphin", "Archange", "Trône", "Élu"];

// ─────────────────────────────────────────────────────────────────────
// Floating gold particles (canvas-free, GPU-friendly)
// ─────────────────────────────────────────────────────────────────────
function GoldParticles({ count = 60 }: { count?: number }) {
  const reduce = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 0.6,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count],
  );

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgba(245,215,110,0.95) 0%, rgba(212,175,55,0.4) 40%, rgba(0,0,0,0) 70%)",
            boxShadow: "0 0 8px rgba(212,175,55,0.6)",
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, p.drift, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Aura score (top-right rank indicator)
// ─────────────────────────────────────────────────────────────────────
function AuraScore({ rank, score }: { rank: string; score: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
      className="fixed top-6 right-6 z-30 flex items-center gap-4 px-5 py-3 rounded-full bg-glass gold-border"
      data-testid="aura-score"
    >
      <div className="relative flex items-center justify-center w-10 h-10">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(212,175,55,0.0), rgba(245,215,110,0.9), rgba(212,175,55,0.0))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[3px] rounded-full bg-black flex items-center justify-center">
          <span className="text-gold text-sm font-display">A</span>
        </div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
          Rang
        </span>
        <span className="font-display text-sm gold-text-shimmer">
          {rank}
        </span>
      </div>
      <div className="w-px h-8 bg-gold/20" />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
          Aura
        </span>
        <span className="font-display text-sm text-gold">{score}</span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Levitating central wing (logo)
// ─────────────────────────────────────────────────────────────────────
function CentralWing({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center select-none"
      animate={{
        scale: opened ? 0.55 : 1,
        y: opened ? -40 : 0,
      }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Halo ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.04) 40%, rgba(0,0,0,0) 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Levitating logo */}
      <motion.button
        onClick={onOpen}
        aria-label="Invoquer les applications"
        className="relative cursor-pointer group focus:outline-none"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        animate={{
          y: [0, -16, 0],
          rotate: [0, 0.6, 0, -0.6, 0],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        data-testid="central-wing"
      >
        <img
          src={logoUrl}
          alt="Angel Store"
          className="w-[420px] max-w-[80vw] h-auto drop-shadow-[0_0_60px_rgba(212,175,55,0.45)]"
          draggable={false}
        />
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,243,163,0.25), transparent 65%)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>

      <AnimatePresence>
        {!opened && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-10 text-center"
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold/60">
              Touche l'Aile pour Invoquer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// App card (glassmorphism with gold glow on hover)
// ─────────────────────────────────────────────────────────────────────
function AppCard({ app, index }: { app: App; index: number }) {
  const [invoked, setInvoked] = useState(false);

  return (
    <motion.article
      data-testid={`card-${app.id}`}
      initial={{ opacity: 0, y: 80, scale: 0.6, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{
        delay: 0.15 + index * 0.08,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="relative shrink-0 w-[320px] h-[460px] rounded-3xl bg-glass gold-border gold-border-hover p-7 flex flex-col justify-between overflow-hidden"
      style={{ scrollSnapAlign: "center" }}
    >
      {/* corner ornament */}
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <path
            d="M0 20 L0 0 L20 0"
            stroke="rgba(212,175,55,0.6)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none rotate-180">
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <path
            d="M0 20 L0 0 L20 0"
            stroke="rgba(212,175,55,0.6)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Sigil */}
      <div>
        <motion.div
          className="text-6xl font-display gold-text-shimmer mb-6"
          animate={{
            textShadow: [
              "0 0 20px rgba(212,175,55,0.3)",
              "0 0 40px rgba(212,175,55,0.7)",
              "0 0 20px rgba(212,175,55,0.3)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {app.sigil}
        </motion.div>
        <h3 className="font-display text-2xl text-gold tracking-[0.25em]">
          {app.name.toUpperCase()}
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-gold/60">
          {app.domain}
        </p>
        <p className="mt-6 text-sm text-amber-50/80 leading-relaxed font-body">
          {app.description}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-gold/50">
          <span>Résonance</span>
          <span className="text-gold/90">{app.resonance}</span>
        </div>

        <motion.button
          onClick={() => {
            setInvoked(true);
            setTimeout(() => setInvoked(false), 1800);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative w-full py-3 rounded-xl border border-gold/40 bg-black/40 overflow-hidden group"
          data-testid={`button-invoke-${app.id}`}
        >
          <motion.span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,215,110,0.25), transparent)",
            }}
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          <span className="relative font-display tracking-[0.4em] text-sm text-gold">
            {invoked ? "★ INVOQUÉ ★" : "INVOQUER"}
          </span>
        </motion.button>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Horizontal app rail
// ─────────────────────────────────────────────────────────────────────
function AppsRail({ apps }: { apps: App[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  // Smooth wheel → horizontal scroll
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = railRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !railRef.current) return;
    const dx = e.clientX - startX.current;
    railRef.current.scrollLeft = startScroll.current - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    railRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="relative w-full">
      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent" />

      <div
        ref={railRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="horizontal-scroll flex gap-6 overflow-x-auto px-[15vw] py-10 cursor-grab active:cursor-grabbing"
        data-testid="apps-rail"
      >
        {apps.map((app, i) => (
          <AppCard key={app.id} app={app} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Bottom hint
// ─────────────────────────────────────────────────────────────────────
function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold/50"
    >
      <motion.span
        animate={{ x: [-4, 4, -4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ◀
      </motion.span>
      Glisse · Élève-toi
      <motion.span
        animate={{ x: [4, -4, 4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ▶
      </motion.span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [opened, setOpened] = useState(false);

  // Mock user elevation — score grows over time, rank derived from it
  const [score, setScore] = useState(1247);
  useEffect(() => {
    const t = setInterval(() => setScore((s) => s + Math.floor(Math.random() * 3)), 4000);
    return () => clearInterval(t);
  }, []);
  const rank = RANKS[Math.min(Math.floor(score / 500), RANKS.length - 1)] ?? "Archange";

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap"
      />

      {/* Ambient layers */}
      <div className="absolute inset-0 radial-vignette pointer-events-none" />
      <GoldParticles count={70} />

      {/* Top brand mark */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="fixed top-6 left-6 z-30 flex flex-col leading-none"
      >
        <span className="font-display text-xs tracking-[0.5em] gold-text-shimmer">
          ANGEL · STORE
        </span>
        <span className="mt-1 text-[9px] tracking-[0.4em] uppercase text-gold/50">
          Technologie · Âme · Élévation
        </span>
      </motion.div>

      <AuraScore rank={rank} score={score} />

      {/* Stage */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <CentralWing opened={opened} onOpen={() => setOpened(true)} />

        <AnimatePresence>
          {opened && (
            <motion.div
              key="rail"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full mt-2"
            >
              <AppsRail apps={APPS} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {opened && <ScrollHint />}
    </div>
  );
}
