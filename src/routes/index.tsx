import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { HeadContent } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import {
  Search,
  ChevronRight,
  BookOpen,
  Play,
  FastForward,
  Settings2,
  Video,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-800/60 rounded-xl bg-zinc-900/30 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
      >
        <span className="font-medium text-zinc-100">{question}</span>
        <div
          className={`p-1.5 rounded-full bg-zinc-800/50 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          <Plus className="w-4 h-4 text-zinc-400" />
        </div>
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-zinc-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function SearchHero() {
  const [type, setType] = useState<"anime" | "manga">("anime");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const targetText = type === "anime" ? "Search for Anime..." : "Search for Manga...";
  const [placeholderText, setPlaceholderText] = useState("Search for Anime...");

  useEffect(() => {
    if (placeholderText === targetText) return;

    const timer = setTimeout(
      () => {
        if (!targetText.startsWith(placeholderText)) {
          // Erase character until common prefix is reached
          setPlaceholderText((prev) => prev.slice(0, -1));
        } else {
          // Type next character towards the new target text
          setPlaceholderText(targetText.slice(0, placeholderText.length + 1));
        }
      },
      !targetText.startsWith(placeholderText) ? 25 : 45,
    );

    return () => clearTimeout(timer);
  }, [placeholderText, targetText]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({
      to: type === "anime" ? "/anime/browse" : "/manga/browse",
      search: { q: query },
    });
  };

  return (
    <div className="w-full max-w-2xl relative mb-10 flex flex-col items-center">
      <div className="flex bg-zinc-900/80 border border-zinc-800 rounded-lg p-1 mb-4 shadow-md">
        <button
          type="button"
          onClick={() => setType("anime")}
          className={`px-6 py-1.5 text-sm font-semibold rounded-md transition-all ${
            type === "anime"
              ? "bg-white text-zinc-950 shadow-md"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          Anime
        </button>
        <button
          type="button"
          onClick={() => setType("manga")}
          className={`px-6 py-1.5 text-sm font-semibold rounded-md transition-all ${
            type === "manga"
              ? "bg-white text-zinc-950 shadow-md"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          Manga
        </button>
      </div>
      <form onSubmit={handleSearch} className="w-full relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholderText}
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-6 pr-16 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 w-12 bg-white hover:bg-zinc-200 rounded-xl flex items-center justify-center transition-colors shadow-lg"
        >
          <Search className="w-5 h-5 text-zinc-950" />
        </button>
      </form>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 overflow-x-hidden">
      <HeadContent>
        <title>AniKume - Explore Anime & Manga</title>
        <meta name="description" content="Watch, read and listen without losing your place." />
      </HeadContent>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--brand,#df7426)]/10 blur-[120px] rounded-full opacity-50"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 flex justify-center items-center p-6 max-w-7xl mx-auto">
        <img src="/logo.png" alt="AniKume" className="h-10 md:h-12 object-contain hidden" />
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center pt-4 pb-12 px-4">
        {/* Title */}
        <img src="/logo.png" alt="AniKume" className="h-28 md:h-40 mb-6 drop-shadow-xl" />
        <h2 className="text-xl md:text-3xl font-medium tracking-tight text-zinc-300 text-center mb-8 max-w-xl leading-relaxed">
          Your ultimate destination for{" "}
          <span className="text-[var(--brand,#df7426)] font-semibold">Anime</span> and{" "}
          <span className="text-[var(--brand,#df7426)] font-semibold">Manga</span>.
        </h2>

        {/* Categories Tab Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Link
            to="/anime"
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all bg-white text-zinc-950 hover:bg-zinc-200 flex items-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4" fill="currentColor" /> Browse Anime
          </Link>
          <Link
            to="/manga"
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all bg-white text-zinc-950 hover:bg-zinc-200 flex items-center gap-2 shadow-md"
          >
            <BookOpen className="w-4 h-4" /> Browse Manga
          </Link>
        </div>

        {/* Search */}
        <SearchHero />
      </main>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--brand,#df7426)] uppercase mb-4 block">
            Built around the player
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-6">
            Less friction, more focus.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Episode lists, provider choices, subtitles and playback controls stay together in one
            focused view.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: FastForward,
              title: "Quick Start",
              desc: "Cached episode lists appear immediately while fresh provider data updates quietly in the background.",
            },
            {
              icon: Settings2,
              title: "Audio Your Way",
              desc: "Move between supported subtitles and dubs while AniKume remembers what you watched.",
            },
            {
              icon: Video,
              title: "Every Screen",
              desc: "The same library and controls adapt across phones, tablets and desktops without compromise.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-8 hover:border-[var(--brand,#df7426)]/50 hover:bg-zinc-900/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--brand,#df7426)]/10 border border-[var(--brand,#df7426)]/20 flex items-center justify-center mb-6 shadow-sm group-hover:bg-[var(--brand,#df7426)]/20 transition-colors">
                <feat.icon className="w-6 h-6 text-[var(--brand,#df7426)]" />
              </div>
              <h4 className="text-xl font-bold text-zinc-100 mb-3">{feat.title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 py-16 border-t border-zinc-900">
        <div className="mb-10">
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--brand,#df7426)] uppercase mb-4 block">
            Help & Info
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400">A quick overview of how AniKume works.</p>
        </div>
        <div className="space-y-3">
          <FaqItem
            question="Can I start watching without signing up?"
            answer="Yes. Browsing and playback work entirely without an account. Everything is instantly accessible."
          />
          <FaqItem
            question="Does AniKume remember subtitles or dubs?"
            answer="Watch history records the episode and audio mode so supported Dub entries reopen in Dub and Sub entries reopen in Sub."
          />
          <FaqItem
            question="What else is available besides anime?"
            answer="AniKume includes a fully-featured manga reader, allowing you to seamlessly switch between watching anime and reading your favorite manga."
          />
          <FaqItem
            question="Does AniKume host videos or images?"
            answer="No. AniKume organizes metadata and links playback/reading from third-party providers. See the DMCA page for details."
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 pb-24 pt-8">
        <div className="relative rounded-3xl border border-[var(--brand,#df7426)]/30 bg-zinc-900/30 p-10 md:p-16 text-center overflow-hidden">
          <h2 className="text-2xl md:text-4xl font-bold text-zinc-100 tracking-tight mb-4 relative z-10">
            Ready to dive in?
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 relative z-10">
            Search a title, pick up where you left off, or discover something entirely new.
          </p>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              to="/anime"
              className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-3.5 rounded-full font-bold transition-all shadow-sm"
            >
              Watch Anime <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/manga"
              className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-3.5 rounded-full font-bold transition-all shadow-sm"
            >
              Read Manga <BookOpen className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
