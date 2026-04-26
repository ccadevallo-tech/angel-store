import { motion } from "framer-motion";
import logoUrl from "/angel-logo.png";
import angelNetworkIcon from "/angel-network-icon.png";

type AppEntry = {
  id: string;
  name: string;
  category: string;
  url: string;
  icon: { type: "image"; src: string } | { type: "sigil"; char: string };
};

const APPS: AppEntry[] = [
  {
    id: "angel-network",
    name: "Angel Network",
    category: "Réseau Social Céleste",
    url: "https://angelnetwork.app",
    icon: { type: "image", src: angelNetworkIcon },
  },
  {
    id: "lumen",
    name: "Lumen",
    category: "Vision Augmentée",
    url: "https://angelnetwork.app",
    icon: { type: "sigil", char: "✦" },
  },
  {
    id: "seraph",
    name: "Seraph",
    category: "Communication Cryptée",
    url: "https://angelnetwork.app",
    icon: { type: "sigil", char: "✧" },
  },
  {
    id: "oraculus",
    name: "Oraculus",
    category: "Prédiction Quantique",
    url: "https://angelnetwork.app",
    icon: { type: "sigil", char: "☉" },
  },
  {
    id: "elevatio",
    name: "Elevatio",
    category: "Bio-Résonance",
    url: "https://angelnetwork.app",
    icon: { type: "sigil", char: "↟" },
  },
  {
    id: "aether",
    name: "Aether",
    category: "Stockage de l'Âme",
    url: "https://angelnetwork.app",
    icon: { type: "sigil", char: "◈" },
  },
  {
    id: "ignis",
    name: "Ignis",
    category: "Forge Créative",
    url: "https://angelnetwork.app",
    icon: { type: "sigil", char: "🜂" },
  },
];

function AppIcon({ icon, name }: { icon: AppEntry["icon"]; name: string }) {
  if (icon.type === "image") {
    return (
      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-black">
        <img
          src={icon.src}
          alt={name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black border border-gold/20">
      <span className="font-display text-3xl text-gold">{icon.char}</span>
    </div>
  );
}

function InstallButton({ url, testId }: { url: string; testId: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="shrink-0 px-5 py-2 rounded-full bg-gold/15 border border-gold/40 text-gold text-sm font-display tracking-[0.25em] hover:bg-gold/25 hover:border-gold/80 transition-colors"
      data-testid={testId}
    >
      INSTALLER
    </motion.a>
  );
}

function AppRow({ app }: { app: AppEntry }) {
  return (
    <div
      className="flex items-center gap-5 px-5 py-4 rounded-2xl bg-glass border border-white/5 hover:border-gold/30 transition-colors"
      data-testid={`row-${app.id}`}
    >
      <AppIcon icon={app.icon} name={app.name} />
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg text-amber-50 tracking-wider truncate">
          {app.name}
        </h3>
        <p className="text-xs text-amber-50/50 mt-0.5 truncate">
          {app.category}
        </p>
      </div>
      <InstallButton url={app.url} testId={`button-install-${app.id}`} />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-amber-50">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500&display=swap"
      />

      {/* Banner */}
      <header className="relative w-full flex flex-col items-center justify-center pt-16 pb-10 px-6">
        <img
          src={logoUrl}
          alt="Angel Store"
          className="w-[320px] max-w-[80vw] h-auto"
          draggable={false}
        />
        <h1 className="mt-4 font-display text-2xl tracking-[0.4em] text-gold">
          ANGEL · STORE
        </h1>
        <p className="mt-2 text-[11px] tracking-[0.4em] uppercase text-amber-50/40">
          Technologie · Âme · Élévation
        </p>
      </header>

      {/* Apps list */}
      <main className="w-full max-w-2xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="font-display text-sm tracking-[0.35em] text-gold/80">
            APPLICATIONS
          </h2>
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-50/40">
            {APPS.length} disponibles
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {APPS.map((app) => (
            <AppRow key={app.id} app={app} />
          ))}
        </div>
      </main>
    </div>
  );
}
