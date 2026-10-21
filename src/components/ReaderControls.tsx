import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  MessageSquare,
  SlidersHorizontal,
  Maximize,
  Minimize,
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  BookOpen,
  AlignJustify,
  ChevronDown,
  Info,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SharedSelect } from "@/components/SharedSelect";

function ScrollableDropdownContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 5);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 5);
  };

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full">
      {canScrollUp && (
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center py-0.5 bg-gradient-to-b from-black/90 to-transparent pointer-events-none animate-bounce">
          <ChevronUp className="size-3.5 text-[var(--brand,#df7426)]" />
        </div>
      )}
      <div ref={scrollRef} onScroll={checkScroll} className={className}>
        {children}
      </div>
      {canScrollDown && (
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center py-0.5 bg-gradient-to-t from-black/90 to-transparent pointer-events-none animate-bounce">
          <ChevronDown className="size-3.5 text-[var(--brand,#df7426)]" />
        </div>
      )}
    </div>
  );
}

export function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: React.ReactNode; value: string; desc?: string }[];
  placeholder?: string;
}) {
  return (
    <SharedSelect
      value={value}
      onChange={onChange}
      options={options.map((o) => ({
        value: o.value,
        display: typeof o.label === "string" ? o.label : String(o.label),
        sub: o.desc,
      }))}
      className="w-full"
    />
  );
}

export function ChapterPill({
  chapters,
  currentChapter,
  onChapterChange,
  activePanel,
  setActivePanel,
  className,
}: {
  chapters: any[];
  currentChapter: number;
  onChapterChange: (ch: number) => void;
  activePanel?: "settings" | "comments" | "shortcuts" | null;
  setActivePanel?: (panel: "settings" | "comments" | "shortcuts" | null) => void;
  className?: string;
}) {
  const currentChIndex = chapters.findIndex((c) => Number(c.chapter) === currentChapter);
  const prevCh = currentChIndex > 0 ? chapters[currentChIndex - 1] : null;
  const nextCh =
    currentChIndex < chapters.length - 1 && currentChIndex >= 0
      ? chapters[currentChIndex + 1]
      : null;

  return (
    <div
      className={
        className ||
        "fixed top-2 right-2 md:top-3.5 md:right-4 z-[60] flex items-center bg-black/80 ring-1 ring-white/10 backdrop-blur-md rounded-full shadow-2xl p-1 animate-in fade-in slide-in-from-top-4"
      }
    >
      {prevCh && (
        <button
          onClick={() => onChapterChange(prevCh.chapter)}
          className="grid place-items-center size-8 md:size-10 rounded-full hover:bg-white/10 text-white transition shrink-0"
        >
          <ChevronLeft className="size-4 md:size-5" />
        </button>
      )}

      <div className="w-[100px] md:w-[130px] shrink-0 relative">
        <SharedSelect
          value={String(currentChapter)}
          options={chapters.map((c) => ({
            value: String(c.chapter),
            display: `Chapter ${c.chapter}`,
            displayTrigger: `Ch. ${c.chapter}`,
          }))}
          onChange={(v) => {
            if (setActivePanel) setActivePanel(null);
            onChapterChange(Number(v));
          }}
          align="center"
          triggerClassName="h-8 md:h-10 text-xs md:text-[13px] font-bold bg-transparent ring-0 border-0 hover:bg-white/10 px-2 md:px-3 text-center"
          contentClassName="w-[180px] md:w-[220px] max-h-[60vh] top-[calc(100%+10px)]"
        />
      </div>

      {nextCh ? (
        <button
          onClick={() => onChapterChange(nextCh.chapter)}
          className="grid place-items-center size-8 md:size-10 rounded-full hover:bg-white/10 text-white transition shrink-0"
        >
          <ChevronRight className="size-4 md:size-5" />
        </button>
      ) : null}
    </div>
  );
}

export function ZoomControl({
  pageWidth,
  setPageWidth,
}: {
  pageWidth: number;
  setPageWidth: (w: number) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 group hidden md:flex items-center bg-black/80 ring-1 ring-white/10 backdrop-blur-md rounded-full shadow-2xl p-1 animate-in fade-in slide-in-from-bottom-4">
      <button
        onClick={() => setPageWidth(Math.max(10, pageWidth - 5))}
        className="grid place-items-center size-10 rounded-full hover:bg-white/10 text-white transition"
      >
        <div className="w-3 h-0.5 bg-current rounded-full" />
      </button>

      <div className="flex items-center overflow-hidden transition-all duration-300 w-12 group-hover:w-40">
        <div className="w-12 shrink-0 text-center font-bold text-sm text-white">{pageWidth}%</div>
        <div className="w-0 shrink-0 flex items-center opacity-0 group-hover:w-28 group-hover:opacity-100 group-hover:px-2 transition-all duration-300">
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={pageWidth}
            onChange={(e) => setPageWidth(Number(e.target.value))}
            className="w-full accent-[var(--brand,#df7426)] cursor-pointer"
          />
        </div>
      </div>

      <button
        onClick={() => setPageWidth(Math.min(100, pageWidth + 5))}
        className="grid place-items-center size-10 rounded-full hover:bg-white/10 text-white transition"
      >
        <div className="relative size-3">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-current rounded-full" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-current rounded-full" />
        </div>
      </button>
    </div>
  );
}

export function FloatingNavigator({
  isVisible,
  onShow,
  activePanel,
  setActivePanel,
  isFullscreen,
  toggleFullscreen,
  homeUrl,
  autoScrollPref,
  isAutoScrolling,
  setIsAutoScrolling,
  autoScrollKey,
  autoScrollDuration,
}: {
  isVisible: boolean;
  onShow: () => void;
  activePanel: "settings" | "comments" | "shortcuts" | null;
  setActivePanel: (p: "settings" | "comments" | "shortcuts" | null) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  homeUrl: string;
  autoScrollPref: boolean;
  isAutoScrolling: boolean;
  setIsAutoScrolling: (v: boolean) => void;
  autoScrollKey: number;
  autoScrollDuration: number;
}) {
  return (
    <nav className="fixed right-2 top-13 md:top-1/2 z-50 md:-translate-y-1/2 duration-300 animate-in fade-in slide-in-from-right-4 md:right-4 shadow-2xl">
      <div className="flex flex-col items-center gap-1 rounded-full bg-black/80 p-1 ring-1 ring-white/10 backdrop-blur-md">
        <button
          onClick={() => setActivePanel(activePanel === "settings" ? null : "settings")}
          className={`grid place-items-center size-10 rounded-full transition text-white ${activePanel === "settings" ? "bg-white/15" : "hover:bg-white/10"}`}
          title="Settings"
        >
          <SlidersHorizontal className="size-5" />
        </button>

        <button
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className={`relative grid place-items-center size-10 rounded-full transition text-white ${isAutoScrolling ? "bg-white/15" : "hover:bg-white/10"}`}
          title="Toggle Auto-scroll (K)"
        >
          {isAutoScrolling ? (
            <>
              <Pause className="size-5" />
              <svg
                className="absolute inset-0 size-full -rotate-90 pointer-events-none"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  key={autoScrollKey}
                  style={{
                    animation: isAutoScrolling
                      ? `circular-fill ${autoScrollDuration}s linear forwards`
                      : "none",
                  }}
                />
              </svg>
            </>
          ) : (
            <Play className="size-5" />
          )}
        </button>

        <button
          onClick={() => setActivePanel(activePanel === "comments" ? null : "comments")}
          className={`grid place-items-center size-10 rounded-full transition text-white ${activePanel === "comments" ? "bg-white/15" : "hover:bg-white/10"}`}
          title="Comments"
        >
          <MessageSquare className="size-5" />
        </button>

        <button
          onClick={() => setActivePanel(activePanel === "shortcuts" ? null : "shortcuts")}
          className={`grid place-items-center size-10 rounded-full transition text-white ${activePanel === "shortcuts" ? "bg-white/15" : "hover:bg-white/10"}`}
          title="Shortcuts"
        >
          <Info className="size-5" />
        </button>

        <div className="h-px w-5 md:w-6 bg-white/10 my-0.5 md:my-1" />

        <button
          onClick={toggleFullscreen}
          className="grid place-items-center size-10 rounded-full hover:bg-white/10 transition text-white"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
        </button>
      </div>
    </nav>
  );
}

export function SettingsBox({
  isOpen,
  onClose,
  sources,
  currentSourceId,
  onSourceChange,
  chapters,
  currentChapter,
  onChapterChange,
  readStyle,
  setReadStyle,
  pageWidth,
  setPageWidth,
  autoScroll,
  setAutoScroll,
  autoScrollDuration,
  setAutoScrollDuration,
  availableLangs = [],
  selectedLang = "English",
  setSelectedLang,
}: {
  isOpen: boolean;
  onClose: () => void;
  sources: { id: string; source: string }[];
  currentSourceId: string;
  onSourceChange: (id: string) => void;
  chapters: any[];
  currentChapter: number;
  onChapterChange: (ch: number) => void;
  readStyle: "vertical" | "horizontal";
  setReadStyle: (s: "vertical" | "horizontal") => void;
  pageWidth: number;
  setPageWidth: (w: number) => void;
  autoScroll: boolean;
  setAutoScroll: (v: boolean) => void;
  autoScrollDuration: number;
  setAutoScrollDuration: (d: number) => void;
  availableLangs?: string[];
  selectedLang?: string;
  setSelectedLang?: (l: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-[5px] bottom-[5px] md:top-[80px] md:bottom-[80px] md:right-[86px] left-[5px] right-[5px] md:left-auto md:w-[350px] overflow-y-auto no-scrollbar z-[80] bg-black/80 ring-1 ring-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-right-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
          Settings
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition">
          <X className="size-4" />
        </button>
      </div>

      {sources.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Source</span>
          <CustomDropdown
            value={currentSourceId}
            onChange={onSourceChange}
            options={sources.map((s) => ({ label: s.source, value: s.id }))}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase">Read Style</span>
        <div className="flex p-1 bg-[#1d1e20] rounded-xl border border-white/5">
          <button
            onClick={() => setReadStyle("vertical")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${readStyle === "vertical" ? "bg-[#2a2b2f] text-white shadow" : "text-muted-foreground hover:text-white"}`}
          >
            <AlignJustify className="size-4" /> Vertical
          </button>
          <button
            onClick={() => setReadStyle("horizontal")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${readStyle === "horizontal" ? "bg-[#2a2b2f] text-white shadow" : "text-muted-foreground hover:text-white"}`}
          >
            <BookOpen className="size-4" /> Horizontal
          </button>
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Page Width</span>
          <span className="text-xs font-bold bg-[#1d1e20] px-2 py-0.5 rounded-md">
            {pageWidth}%
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={pageWidth}
          onChange={(e) => setPageWidth(Number(e.target.value))}
          className="w-full accent-[var(--brand,#df7426)]"
        />
      </div>

      <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
        <span className="text-[11px] font-bold text-muted-foreground uppercase">
          Auto Scroll / Swipe
        </span>
        <div className="flex items-center justify-between bg-[#1d1e20] rounded-xl px-3 py-2 border border-white/5">
          <span className="text-xs font-semibold text-muted-foreground">Duration (seconds)</span>
          <input
            type="number"
            min="1"
            max="60"
            value={autoScrollDuration}
            onChange={(e) => setAutoScrollDuration(Number(e.target.value))}
            className="w-16 bg-transparent text-right outline-none text-sm font-bold text-white"
          />
        </div>
      </div>
    </div>
  );
}

export function CommentsBox({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed top-[5px] bottom-[5px] md:top-[80px] md:bottom-[80px] md:right-[86px] left-[5px] right-[5px] md:left-auto md:w-[350px] overflow-y-auto no-scrollbar z-[80] bg-black/80 ring-1 ring-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-right-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <MessageSquare className="size-4 text-[var(--brand,#df7426)]" />
          Comments
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition">
          <X className="size-4" />
        </button>
      </div>

      <p className="text-left text-xs text-muted-foreground">Comments coming soon.</p>
      <div className="pointer-events-none opacity-40">
        <div className="flex items-center gap-3">
          <div className="size-8 shrink-0 rounded-full bg-white/10" />
          <div className="flex-1 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 text-xs text-muted-foreground text-left">
            Write a comment…
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShortcutsBox({
  isOpen,
  onClose,
  readStyle,
}: {
  isOpen: boolean;
  onClose: () => void;
  readStyle: "horizontal" | "vertical";
}) {
  if (!isOpen) return null;

  const NavHorizontal = (
    <div className="flex flex-col gap-2 pt-2">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        Navigation (Horizontal)
      </span>
      <div className="flex items-center justify-between text-sm text-white">
        <span>Next Page</span>
        <div className="flex gap-2">
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">&rarr;</kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">D</kbd>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-white">
        <span>Previous Page</span>
        <div className="flex gap-2">
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">&larr;</kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">A</kbd>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-white">
        <span>Next Chapter</span>
        <div className="flex gap-2 items-center">
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">
            Shift+&rarr;
          </kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">Shift+D</kbd>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-white">
        <span>Prev Chapter</span>
        <div className="flex gap-2 items-center">
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">
            Shift+&larr;
          </kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">Shift+A</kbd>
        </div>
      </div>
    </div>
  );

  const NavVertical = (
    <div className="flex flex-col gap-2 pt-2">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        Navigation (Vertical)
      </span>
      <div className="flex items-center justify-between text-sm text-white">
        <span>Scroll Up</span>
        <div className="flex gap-2 items-center">
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">&uarr;</kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">W</kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">
            Shift+Space
          </kbd>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-white">
        <span>Scroll Down</span>
        <div className="flex gap-2 items-center">
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">&darr;</kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">S</kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">Space</kbd>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-white">
        <span>Next Chapter</span>
        <div className="flex gap-2">
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">&rarr;</kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">D</kbd>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-white">
        <span>Prev Chapter</span>
        <div className="flex gap-2">
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">&larr;</kbd>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">A</kbd>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed top-[5px] bottom-[5px] md:top-[80px] md:bottom-[80px] md:right-[86px] left-[5px] right-[5px] md:left-auto md:w-[350px] overflow-y-auto no-scrollbar z-[80] bg-black/80 ring-1 ring-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-right-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
          <Info className="size-4" /> Shortcuts
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center justify-between text-sm text-white">
          <span>Toggle UI Visibility</span>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">E</kbd>
        </div>
        <div className="flex items-center justify-between text-sm text-white">
          <span>Toggle Settings</span>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">X</kbd>
        </div>
        <div className="flex items-center justify-between text-sm text-white">
          <span>Toggle Comments</span>
          <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">C</kbd>
        </div>
        <div className="flex items-center justify-between text-sm text-white">
          <span>Adjust Zoom</span>
          <div className="flex gap-2">
            <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">Alt +</kbd>
            <kbd className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">Alt -</kbd>
          </div>
        </div>
      </div>

      {readStyle === "horizontal" ? (
        <>
          {NavHorizontal}
          {NavVertical}
        </>
      ) : (
        <>
          {NavVertical}
          {NavHorizontal}
        </>
      )}
    </div>
  );
}
