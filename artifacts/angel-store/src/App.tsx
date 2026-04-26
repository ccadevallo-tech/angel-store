import { useEffect, useState } from "react";
import logoUrl from "/angel-logo.png";
import angelNetworkIcon from "/angel-network-icon.png";

const ANGEL_NETWORK_URL = "https://angelnetwork.app";
const REVIEWS_STORAGE_KEY = "angel_network_reviews_v1";

type Page = "store" | "angel_network_detail";
type NavTab = "today" | "apps" | "search";

type Review = {
  id: string;
  stars: number;
  author: string;
  text: string;
  date: string;
};

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]) {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    /* ignore */
  }
}

function formatAverage(avg: number): string {
  if (!avg) return "—";
  return avg.toFixed(1).replace(".", ",");
}

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
// Angel Network detail page — fully coded, no background image
// ─────────────────────────────────────────────────────────────────────
function StarRow({
  value,
  size = 14,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = value >= i;
        const half = !filled && value >= i - 0.5;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={filled || half ? "text-gold" : "text-amber-50/15"}
          >
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="rgba(245,231,196,0.15)" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.7 6.1 20.8l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z"
              fill={half ? `url(#half-${i})` : "currentColor"}
            />
          </svg>
        );
      })}
    </div>
  );
}

function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews());
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState(0);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [hover, setHover] = useState(0);

  useEffect(() => {
    saveReviews(reviews);
  }, [reviews]);

  const total = reviews.length;
  const average = total
    ? reviews.reduce((s, r) => s + r.stars, 0) / total
    : 0;

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.stars === star).length;
    const pct = total ? (count / total) * 100 : 0;
    return { star, count, pct };
  });

  const submit = () => {
    if (!stars) return;
    const review: Review = {
      id: crypto.randomUUID(),
      stars,
      author: author.trim() || "Anonyme",
      text: text.trim(),
      date: new Date().toISOString(),
    };
    setReviews([review, ...reviews]);
    setStars(0);
    setHover(0);
    setAuthor("");
    setText("");
    setOpen(false);
  };

  return (
    <section className="mt-8 border-t border-white/10 pt-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white tracking-tight">
          Notes et avis
        </h2>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-sky-400 hover:text-sky-300 text-sm font-medium"
          data-testid="button-toggle-review-form"
        >
          {open ? "Annuler" : "Donner un avis"}
        </button>
      </div>

      {/* Summary */}
      <div className="flex items-stretch gap-5 mb-6">
        <div className="flex flex-col items-center justify-center min-w-[90px]">
          <div className="text-5xl font-bold text-white leading-none">
            {formatAverage(average)}
          </div>
          <div className="text-[10px] text-amber-50/45 uppercase tracking-[0.2em] mt-2">
            sur 5
          </div>
          <StarRow value={average} size={11} className="mt-2" />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-1">
          {breakdown.map(({ star, pct }) => (
            <div key={star} className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 w-[58px] justify-end text-amber-50/40">
                {Array.from({ length: star }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    width={9}
                    height={9}
                    fill="currentColor"
                  >
                    <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.7 6.1 20.8l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
                  </svg>
                ))}
              </div>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gold/80 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="w-10 text-right text-[10px] text-amber-50/45 tabular-nums">
                {pct.toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[11px] text-amber-50/45 mb-6">
        {total === 0
          ? "Aucun avis pour le moment · Soyez le premier"
          : `${total.toLocaleString("fr-FR")} ${total > 1 ? "avis" : "avis"}`}
      </div>

      {/* Form */}
      {open && (
        <div className="mb-6 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-amber-50/45 mb-2">
            Votre note
          </div>
          <div
            className="flex items-center gap-1 mb-4"
            onMouseLeave={() => setHover(0)}
          >
            {[1, 2, 3, 4, 5].map((n) => {
              const active = (hover || stars) >= n;
              return (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHover(n)}
                  onClick={() => setStars(n)}
                  className={`p-1 transition-colors ${
                    active ? "text-gold" : "text-amber-50/20 hover:text-amber-50/40"
                  }`}
                  aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                  data-testid={`star-${n}`}
                >
                  <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor">
                    <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.7 6.1 20.8l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
                  </svg>
                </button>
              );
            })}
          </div>

          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Votre nom (optionnel)"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-amber-50 placeholder:text-amber-50/30 mb-3 focus:border-gold/50 outline-none"
            data-testid="input-author"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Partagez votre expérience…"
            rows={3}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-amber-50 placeholder:text-amber-50/30 resize-none focus:border-gold/50 outline-none"
            data-testid="input-text"
          />

          <button
            onClick={submit}
            disabled={!stars}
            className="mt-3 w-full py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 disabled:bg-white/10 disabled:text-amber-50/30 text-white text-sm font-bold tracking-wide transition-colors"
            data-testid="button-submit-review"
          >
            Publier l'avis
          </button>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length > 0 && (
        <div className="space-y-5">
          {reviews.slice(0, 5).map((r) => (
            <div
              key={r.id}
              className="pb-4 border-b border-white/5 last:border-0"
              data-testid={`review-${r.id}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-sm font-medium text-amber-50">
                  {r.author}
                </div>
                <div className="text-[10px] text-amber-50/40 tabular-nums">
                  {new Date(r.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <StarRow value={r.stars} size={11} className="mb-2" />
              {r.text && (
                <p className="text-sm text-amber-50/70 leading-relaxed">
                  {r.text}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AngelNetworkDetailPage({ onBack }: { onBack: () => void }) {
  const [reviewStats, setReviewStats] = useState(() => {
    const r = loadReviews();
    return {
      total: r.length,
      avg: r.length ? r.reduce((s, x) => s + x.stars, 0) / r.length : 0,
    };
  });

  useEffect(() => {
    const update = () => {
      const r = loadReviews();
      setReviewStats({
        total: r.length,
        avg: r.length ? r.reduce((s, x) => s + x.stars, 0) / r.length : 0,
      });
    };
    window.addEventListener("storage", update);
    const t = setInterval(update, 800);
    return () => {
      window.removeEventListener("storage", update);
      clearInterval(t);
    };
  }, []);

  const openAngelNetwork = () =>
    window.open(ANGEL_NETWORK_URL, "_blank", "noopener,noreferrer");

  return (
    <div className="min-h-screen w-full bg-black text-amber-50 pb-32">
      {/* Top header bar */}
      <header className="sticky top-0 z-40 bg-black/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
            data-testid="button-back-header"
          >
            <span className="text-xl leading-none">‹</span>
            <span className="text-base font-medium">Apps</span>
          </button>
          <button
            onClick={openAngelNetwork}
            aria-label="Partager Angel Network"
            className="text-sky-400 hover:text-sky-300 transition-colors p-2 -mr-2"
            data-testid="button-share"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M12 3v12M12 3l-4 4M12 3l4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5">
        {/* Title section */}
        <section className="flex items-start gap-4 pt-6 pb-5">
          <div className="w-[112px] h-[112px] rounded-[26px] overflow-hidden shrink-0 border border-white/10 bg-black shadow-[0_6px_24px_rgba(0,0,0,0.5)]">
            <img
              src={angelNetworkIcon}
              alt="Angel Network"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-1">
            <div>
              <h1 className="text-[22px] leading-tight font-semibold text-white tracking-tight">
                Angel Network
              </h1>
              <p className="text-sm text-amber-50/55 mt-0.5">Angel</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={openAngelNetwork}
                className="px-7 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 transition-colors text-white text-sm font-bold tracking-wide"
                data-testid="button-obtain"
              >
                OBTENIR
              </button>
              <span className="text-[11px] text-amber-50/45 leading-tight">
                Achats
                <br />
                intégrés
              </span>
            </div>
          </div>
        </section>

        {/* Store info — 3 columns */}
        <section className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4 my-2">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-xl font-semibold text-amber-50/85">
              {formatAverage(reviewStats.avg)}{" "}
              <span className="text-gold">★</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber-50/40">
              {reviewStats.total === 0
                ? "Aucun avis"
                : `${reviewStats.total} ${
                    reviewStats.total > 1 ? "avis" : "avis"
                  }`}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-xl font-semibold text-amber-50/85">
              Tout âge
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber-50/40">
              Classification
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-xl font-semibold text-amber-50/85">#1</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber-50/40">
              Réseaux
            </div>
          </div>
        </section>

        {/* Screenshots — horizontal scroll */}
        <section className="mt-6 -mx-5">
          <div
            className="flex gap-4 overflow-x-auto px-5 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
            data-testid="screenshots-scroll"
          >
            {/* Card 1 — FLUX */}
            <div
              className="snap-start shrink-0 w-[78%] max-w-[340px] aspect-[9/16] rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 relative shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
              data-testid="screenshot-flux"
            >
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="flex items-center justify-between text-amber-50/70 text-xs">
                  <span className="font-mono">09:41</span>
                  <span className="font-display tracking-[0.3em] text-gold text-[10px]">
                    FLUX
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gold/30 mb-5">
                    <img
                      src={angelNetworkIcon}
                      alt=""
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <h3 className="font-display text-2xl text-white leading-tight tracking-wide">
                    Connecter,
                    <br />
                    Partager,
                    <br />
                    S'élever ensemble.
                  </h3>
                  <p className="text-[11px] text-amber-50/50 mt-4 tracking-[0.25em] uppercase">
                    #AngelNetwork
                  </p>
                </div>

                <div className="flex items-center justify-around pt-3 border-t border-white/5 text-amber-50/40">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path
                      d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path
                      d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path
                      d="M12 3v12M12 3l-4 4M12 3l4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2 — MESSAGERIE */}
            <div
              className="snap-start shrink-0 w-[78%] max-w-[340px] aspect-[9/16] rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 relative shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
              data-testid="screenshot-messagerie"
            >
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="flex items-center justify-between text-amber-50/70 text-xs">
                  <span className="font-mono">09:41</span>
                  <span className="font-display tracking-[0.3em] text-gold text-[10px]">
                    MESSAGERIE
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                  <img
                    src={logoUrl}
                    alt="Angel"
                    className="w-32 h-auto opacity-90 mb-6"
                    draggable={false}
                  />
                  <h3 className="font-display text-xl text-white tracking-[0.2em]">
                    MESSAGERIE
                  </h3>
                  <p className="text-xs text-amber-50/50 mt-3 text-center px-4">
                    Conversations protégées,
                    <br />
                    présence céleste.
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 shrink-0" />
                    <div className="flex-1 h-2 rounded bg-white/10" />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-amber-50/10 border border-white/10 shrink-0" />
                    <div className="flex-1 h-2 rounded bg-white/5" />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-amber-50/10 border border-white/10 shrink-0" />
                    <div className="flex-1 h-2 rounded bg-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────
function ComingSoonPage({ label }: { label: string }) {
  return (
    <div
      className="min-h-screen w-full bg-black text-amber-50 flex flex-col items-center justify-center px-8 pb-32"
      data-testid={`page-${label.toLowerCase()}`}
    >
      <div className="font-display text-xs tracking-[0.5em] text-gold/70 mb-4">
        {label.toUpperCase()}
      </div>
      <p className="text-center text-amber-50/70 text-base max-w-xs leading-relaxed">
        Arrivée prochaine dans l'écosystème Angel
      </p>
      <div className="mt-6 w-12 h-px bg-gold/40" />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("store");
  const [navTab, setNavTab] = useState<NavTab>("apps");

  const handleNavChange = (tab: NavTab) => {
    setNavTab(tab);
    if (tab === "apps") setCurrentPage("store");
  };

  const renderContent = () => {
    if (navTab === "today") return <ComingSoonPage label="Aujourd'hui" />;
    if (navTab === "search") return <ComingSoonPage label="Recherche" />;
    // navTab === "apps"
    return currentPage === "store" ? (
      <StorePage
        onOpenAngelNetwork={() => setCurrentPage("angel_network_detail")}
      />
    ) : (
      <AngelNetworkDetailPage onBack={() => setCurrentPage("store")} />
    );
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500&display=swap"
      />

      {renderContent()}

      <BottomNav active={navTab} onChange={handleNavChange} />
    </>
  );
}
