import { useState } from "react";
import logoUrl from "/angel-logo.png";
import angelNetworkIcon from "/angel-network-icon.png";
import angelNetworkDetail from "/angel-network-detail.png";

const ANGEL_NETWORK_URL = "https://angelnetwork.app";

type Page = "store" | "angel_network_detail";
type NavTab = "today" | "apps" | "search";

// ─────────────────────────────────────────────────────────────────────
// Persistent bottom navigation (real component, not an image)
// ─────────────────────────────────────────────────────────────────────
function BottomNav({
  active,
  onChange,
}: {
  active: NavTab;
  onChange: (t: NavTab) => void;
}) {
  const tabs: { id: NavTab; label: string; icon: JSX.Element }[] = [
    {
      id: "today",
      label: "Aujourd'hui",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "apps",
      label: "Apps",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <rect x="3" y="3" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <rect x="14" y="3" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3" y="14" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <rect x="14" y="14" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      id: "search",
      label: "Recherche",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-gold/20 bg-black/85 backdrop-blur-xl"
      style={{ zIndex: 100 }}
      data-testid="bottom-nav"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-around px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-colors ${
                isActive ? "text-gold" : "text-amber-50/40 hover:text-amber-50/70"
              }`}
              data-testid={`nav-${t.id}`}
            >
              {t.icon}
              <span
                className={`text-[10px] tracking-[0.18em] uppercase ${
                  isActive ? "font-medium" : ""
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Real glass back button (top-left, fixed)
// ─────────────────────────────────────────────────────────────────────
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Retour aux apps"
      className="fixed top-5 left-5 flex items-center gap-1.5 pl-3 pr-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-gold/40 text-gold text-sm font-medium hover:bg-gold/15 hover:border-gold/80 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
      style={{ zIndex: 90 }}
      data-testid="button-back"
    >
      <span className="text-base leading-none">‹</span>
      Apps
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Store page
// ─────────────────────────────────────────────────────────────────────
function StorePage({ onOpenAngelNetwork }: { onOpenAngelNetwork: () => void }) {
  return (
    <div className="min-h-screen w-full bg-black text-amber-50 pb-32">
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

      <main className="w-full max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="font-display text-sm tracking-[0.35em] text-gold/80">
            APPLICATIONS
          </h2>
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-50/40">
            1 disponible
          </span>
        </div>

        <button
          onClick={onOpenAngelNetwork}
          className="w-full flex items-center gap-5 px-5 py-4 rounded-2xl bg-glass border border-white/5 hover:border-gold/40 transition-colors text-left"
          data-testid="row-angel-network"
        >
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-black">
            <img
              src={angelNetworkIcon}
              alt="Angel Network"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg text-amber-50 tracking-wider truncate">
              Angel Network
            </h3>
            <p className="text-xs text-amber-50/50 mt-0.5 truncate">
              Réseau Social Céleste
            </p>
          </div>
          <span className="shrink-0 px-5 py-2 rounded-full bg-gold/15 border border-gold/40 text-gold text-sm font-display tracking-[0.25em]">
            VOIR
          </span>
        </button>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Angel Network detail page
// Image is cropped to hide the iPhone status bar (top 8% of original).
// All hitbox % values are relative to the cropped container.
// ─────────────────────────────────────────────────────────────────────
function AngelNetworkDetailPage() {
  // Image dims: 853 × 1844. We crop top 8% (~147px) to remove status bar + notch.
  // Cropped container aspect ratio = 853 / (1844 * 0.92) ≈ 853 / 1696
  const openAngelNetwork = () =>
    window.open(ANGEL_NETWORK_URL, "_blank", "noopener,noreferrer");

  return (
    <div className="min-h-screen w-full bg-black flex items-start justify-center pb-32">
      <div
        className="relative w-full max-w-[480px] overflow-hidden"
        style={{ aspectRatio: "853 / 1696" }}
      >
        <img
          src={angelNetworkDetail}
          alt="Angel Network — fiche produit"
          className="w-full h-full select-none"
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          draggable={false}
        />

        {/* Invisible OBTENIR hitbox — over blue pill button */}
        <button
          onClick={openAngelNetwork}
          aria-label="Obtenir Angel Network"
          className="absolute cursor-pointer"
          style={{
            left: "30%",
            top: "20.5%",
            width: "27%",
            height: "5.6%",
            borderRadius: "9999px",
          }}
          data-testid="button-obtain-overlay"
        />

        {/* Invisible Share hitbox — over share icon (top right of OBTENIR row) */}
        <button
          onClick={openAngelNetwork}
          aria-label="Partager Angel Network"
          className="absolute cursor-pointer"
          style={{
            left: "85%",
            top: "20.5%",
            width: "10%",
            height: "5.6%",
            borderRadius: "8px",
          }}
          data-testid="button-share-overlay"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("store");
  const [navTab, setNavTab] = useState<NavTab>("apps");

  const handleNavChange = (tab: NavTab) => {
    setNavTab(tab);
    if (tab === "apps") setCurrentPage("store");
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500&display=swap"
      />

      {currentPage === "store" ? (
        <StorePage
          onOpenAngelNetwork={() => setCurrentPage("angel_network_detail")}
        />
      ) : (
        <>
          <BackButton onClick={() => setCurrentPage("store")} />
          <AngelNetworkDetailPage />
        </>
      )}

      <BottomNav active={navTab} onChange={handleNavChange} />
    </>
  );
}
