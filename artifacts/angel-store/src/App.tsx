import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "/angel-logo.png";
import angelNetworkIcon from "/angel-network-icon.png";
import angelNetworkDetail from "/angel-network-detail.png";

const ANGEL_NETWORK_URL = "https://angelnetwork.app";

type Page = "store" | "angel_network_detail";

function StorePage({ onOpenAngelNetwork }: { onOpenAngelNetwork: () => void }) {
  return (
    <div className="min-h-screen w-full bg-black text-amber-50">
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
          <span
            className="shrink-0 px-5 py-2 rounded-full bg-gold/15 border border-gold/40 text-gold text-sm font-display tracking-[0.25em]"
          >
            VOIR
          </span>
        </button>
      </main>
    </div>
  );
}

function AngelNetworkDetailPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative min-h-screen w-full bg-black flex items-start justify-center">
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-gold/50 text-gold font-display text-sm tracking-[0.25em] hover:bg-gold/15 hover:border-gold transition-colors shadow-[0_0_20px_rgba(212,175,55,0.25)]"
        data-testid="button-back"
      >
        <span className="text-base leading-none">←</span>
        RETOUR
      </motion.button>

      {/* Detail preview image */}
      <div className="relative w-full max-w-[480px]">
        <img
          src={angelNetworkDetail}
          alt="Angel Network — fiche produit"
          className="w-full h-auto block select-none"
          draggable={false}
        />

        {/*
          Invisible click target placed exactly over the blue "OBTENIR" pill
          in the screenshot. Coordinates are expressed in % of the image so
          they scale with the responsive image.
        */}
        <a
          href={ANGEL_NETWORK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Obtenir Angel Network"
          className="absolute cursor-pointer"
          style={{
            left: "30.5%",
            top: "26.5%",
            width: "26%",
            height: "5.2%",
            borderRadius: "9999px",
          }}
          data-testid="button-obtain-overlay"
        />
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("store");

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500&display=swap"
      />

      <AnimatePresence mode="wait">
        {currentPage === "store" ? (
          <motion.div
            key="store"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <StorePage
              onOpenAngelNetwork={() => setCurrentPage("angel_network_detail")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AngelNetworkDetailPage onBack={() => setCurrentPage("store")} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
