"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * User-controlled view adjustments. Each setting toggles an `a11y-*` class on
 * <html>; the CSS that reacts to those classes lives at the bottom of
 * `app/globals.css`. Preferences persist to localStorage on this device only.
 *
 * The widget opts out of its own effects via `.a11y-widget-root` so the panel
 * stays usable in every mode (see the widget exemptions in globals.css).
 */

type Settings = {
  textSize: 0 | 1 | 2 | 3;
  highContrast: boolean;
  invert: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  pauseAnimations: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  textSize: 0,
  highContrast: false,
  invert: false,
  highlightLinks: false,
  readableFont: false,
  bigCursor: false,
  pauseAnimations: false,
};

const STORAGE_KEY = "gallagher-a11y-settings";

const TEXT_SIZE_LABELS = ["Default", "Large", "X-Large", "Max"] as const;

function applyToDocument(s: Settings) {
  const root = document.documentElement;
  root.classList.toggle("a11y-text-1", s.textSize === 1);
  root.classList.toggle("a11y-text-2", s.textSize === 2);
  root.classList.toggle("a11y-text-3", s.textSize === 3);
  root.classList.toggle("a11y-high-contrast", s.highContrast);
  root.classList.toggle("a11y-invert", s.invert);
  root.classList.toggle("a11y-highlight-links", s.highlightLinks);
  root.classList.toggle("a11y-readable-font", s.readableFont);
  root.classList.toggle("a11y-big-cursor", s.bigCursor);
  root.classList.toggle("a11y-pause-anim", s.pauseAnimations);
}

/* --- Icons: inline so the site keeps zero icon dependencies --------------- */

const ICO = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function IconAccessibility({ size = 22 }: { size?: number }) {
  return (
    <svg {...ICO} width={size} height={size}>
      <circle cx="12" cy="4.4" r="2" />
      <path d="M12 6.8v5.2" />
      <path d="M7.5 8.6h9" />
      <path d="M9 21.5 12 13l3 8.5" />
    </svg>
  );
}

function IconType() {
  return (
    <svg {...ICO} width={18} height={18}>
      <polyline points="5 7 5 4.5 19 4.5 19 7" />
      <line x1="12" y1="4.5" x2="12" y2="19.5" />
      <line x1="9" y1="19.5" x2="15" y2="19.5" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg {...ICO} width={18} height={18}>
      <path d="M12 7.5C10.4 6 8.4 5.5 4 5.5v12c4.4 0 6.4.5 8 2 1.6-1.5 3.6-2 8-2v-12c-4.4 0-6.4.5-8 2z" />
      <path d="M12 7.5v12" />
    </svg>
  );
}

function IconContrast() {
  return (
    <svg {...ICO} width={18} height={18}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconInvert() {
  return (
    <svg {...ICO} width={18} height={18}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 7h5" />
      <path d="M12 11h7" />
      <path d="M12 15h7" />
      <path d="M12 19h5" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg {...ICO} width={18} height={18}>
      <circle cx="12" cy="12" r="9" />
      <line x1="10" y1="9" x2="10" y2="15" />
      <line x1="14" y1="9" x2="14" y2="15" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg {...ICO} width={18} height={18}>
      <path d="M9.5 14.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1 1" />
      <path d="M14.5 9.5a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5l1-1" />
    </svg>
  );
}

function IconCursor() {
  return (
    <svg {...ICO} width={18} height={18}>
      <path d="M5 3.5 5 19l4.2-4.2L12 21l2.4-1-2.8-6.1H18z" />
    </svg>
  );
}

function IconReset() {
  return (
    <svg {...ICO} width={15} height={15}>
      <polyline points="2 4 2 9.5 7.5 9.5" />
      <path d="M4.2 14.5a8 8 0 1 0 1.9-8.3L2 9.5" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg {...ICO} width={17} height={17}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function AccessibilityWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Hydration-safe mount flag — the server cannot read localStorage, so saved
    // settings are applied only after the client mounts.
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Settings>;
        const merged = { ...DEFAULT_SETTINGS, ...parsed };
        setSettings(merged);
        applyToDocument(merged);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyToDocument(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock the page behind the drawer so scrolling stays inside the panel. The
  // padding replaces the width the scrollbar gives up, otherwise the whole page
  // jumps sideways as the drawer opens.
  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  const toggle = useCallback((key: Exclude<keyof Settings, "textSize">) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const cycleTextSize = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      textSize: ((prev.textSize + 1) % 4) as Settings["textSize"],
    }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  const activeCount =
    (settings.textSize > 0 ? 1 : 0) +
    Number(settings.highContrast) +
    Number(settings.invert) +
    Number(settings.highlightLinks) +
    Number(settings.readableFont) +
    Number(settings.bigCursor) +
    Number(settings.pauseAnimations);

  return (
    <>
      {/* Trigger — clears the mobile call bar, bottom-right from 980px up. */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open accessibility options"
        aria-expanded={open}
        aria-controls="gr-a11y-panel"
        className={[
          "a11y-widget-root fixed right-4 bottom-[88px] z-[75] nav:right-6 nav:bottom-6",
          "flex h-[50px] w-[50px] items-center justify-center rounded-[2px] nav:h-[54px] nav:w-[54px]",
          "border border-[rgba(255,255,255,0.18)] bg-[rgba(18,20,19,0.92)] text-[#8ECE34] backdrop-blur-[14px]",
          "shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
          "transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]",
          "hover:-translate-y-[2px] hover:border-[#8ECE34] hover:bg-[rgba(142,206,52,0.09)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ECE34] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C0B]",
        ].join(" ")}
      >
        <IconAccessibility size={24} />
        {mounted && activeCount > 0 ? (
          <span className="absolute -top-[6px] -right-[6px] flex h-[18px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#8ECE34] px-[4px] font-mono text-[10px] font-medium text-[#0B0C0B]">
            {activeCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="a11y-widget-root fixed inset-0 z-[90] flex justify-end">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close accessibility options"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
          />

          <div
            id="gr-a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gr-a11y-title"
            className="relative flex h-full w-full max-w-[390px] flex-col border-l border-[rgba(255,255,255,0.09)] bg-[#0B0C0B]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.09)] bg-[#0E100E] px-[24px] py-[22px]">
              <div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
                  <span className="block h-2 w-2 shrink-0 bg-[#8ECE34]" />
                  Accessibility
                </div>
                <h2
                  id="gr-a11y-title"
                  className="mt-[10px] text-[20px] font-bold leading-[1.15] tracking-[-0.02em] text-[#F4F5F1]"
                >
                  Adjust this site
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close accessibility options"
                className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[2px] border border-[rgba(255,255,255,0.09)] text-[#9CA098] transition-colors duration-[250ms] hover:border-[#8ECE34] hover:text-[#8ECE34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ECE34]"
              >
                <IconClose />
              </button>
            </div>

            {/* Options */}
            <div className="flex-1 overflow-y-auto px-[24px] py-[24px]">
              <Section index="01" title="Text">
                <Row
                  icon={<IconType />}
                  label="Text size"
                  state={TEXT_SIZE_LABELS[settings.textSize]}
                  active={settings.textSize > 0}
                  onClick={cycleTextSize}
                />
                <Row
                  icon={<IconBook />}
                  label="Readable font"
                  state={settings.readableFont ? "On" : "Off"}
                  active={settings.readableFont}
                  pressed={settings.readableFont}
                  onClick={() => toggle("readableFont")}
                />
              </Section>

              <Section index="02" title="Display">
                <Row
                  icon={<IconContrast />}
                  label="High contrast"
                  state={settings.highContrast ? "On" : "Off"}
                  active={settings.highContrast}
                  pressed={settings.highContrast}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      highContrast: !prev.highContrast,
                      // The two display modes fight each other — keep one.
                      invert: prev.highContrast ? prev.invert : false,
                    }))
                  }
                />
                <Row
                  icon={<IconInvert />}
                  label="Invert colors"
                  state={settings.invert ? "On" : "Off"}
                  active={settings.invert}
                  pressed={settings.invert}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      invert: !prev.invert,
                      highContrast: prev.invert ? prev.highContrast : false,
                    }))
                  }
                />
                <Row
                  icon={<IconPause />}
                  label="Pause animations"
                  state={settings.pauseAnimations ? "On" : "Off"}
                  active={settings.pauseAnimations}
                  pressed={settings.pauseAnimations}
                  onClick={() => toggle("pauseAnimations")}
                />
              </Section>

              <Section index="03" title="Navigation" last>
                <Row
                  icon={<IconLink />}
                  label="Highlight links"
                  state={settings.highlightLinks ? "On" : "Off"}
                  active={settings.highlightLinks}
                  pressed={settings.highlightLinks}
                  onClick={() => toggle("highlightLinks")}
                />
                <Row
                  icon={<IconCursor />}
                  label="Large cursor"
                  state={settings.bigCursor ? "On" : "Off"}
                  active={settings.bigCursor}
                  pressed={settings.bigCursor}
                  onClick={() => toggle("bigCursor")}
                />
              </Section>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-[rgba(255,255,255,0.09)] bg-[#0E100E] px-[24px] py-[20px]">
              <button
                type="button"
                onClick={reset}
                className="flex w-full items-center justify-center gap-[10px] rounded-[2px] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.04)] py-[15px] font-mono text-[11px] uppercase tracking-[0.16em] text-[#F4F5F1] transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:border-[#8ECE34] hover:bg-[rgba(142,206,52,0.07)] hover:text-[#8ECE34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ECE34]"
              >
                <IconReset />
                Reset all
              </button>
              <p className="mt-[14px] text-center text-[12px] leading-[1.6] text-[#7E837A]">
                Your preferences are saved on this device.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Section({
  index,
  title,
  children,
  last = false,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={
        last ? "" : "mb-[26px] border-b border-[rgba(255,255,255,0.07)] pb-[26px]"
      }
    >
      <div className="mb-[14px] flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
        <span className="text-[#2C302B]">{index}</span>
        <span className="text-[#8F948A]">{title}</span>
      </div>
      <div className="flex flex-col gap-[10px]">{children}</div>
    </div>
  );
}

function Row({
  icon,
  label,
  state,
  active,
  pressed,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  state: string;
  active: boolean;
  pressed?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...(pressed === undefined ? {} : { "aria-pressed": pressed })}
      className={[
        "flex w-full items-center gap-[14px] rounded-[2px] border px-[14px] py-[13px] text-left",
        "transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ECE34]",
        active
          ? "border-[#8ECE34] bg-[rgba(142,206,52,0.07)]"
          : "border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.05)]",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[2px] transition-colors duration-[350ms]",
          active
            ? "bg-[#8ECE34] text-[#0B0C0B]"
            : "bg-[rgba(255,255,255,0.05)] text-[#9CA098]",
        ].join(" ")}
      >
        {icon}
      </span>
      <span
        className={[
          "flex-1 text-[15px] font-semibold tracking-[-0.01em]",
          active ? "text-[#F4F5F1]" : "text-[#C2C6BC]",
        ].join(" ")}
      >
        {label}
      </span>
      <span
        className={[
          "shrink-0 rounded-[2px] px-[8px] py-[4px] font-mono text-[10px] uppercase tracking-[0.12em] whitespace-nowrap",
          active
            ? "bg-[#8ECE34] text-[#0B0C0B]"
            : "bg-[rgba(255,255,255,0.05)] text-[#7E837A]",
        ].join(" ")}
      >
        {state}
      </span>
    </button>
  );
}
