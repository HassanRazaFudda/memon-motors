"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const THEME_KEY = "theme";
const THEME_EVENT = "theme-change";

function applyTheme(theme: Theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private browsing / storage disabled — theme still applies for this view.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-11 w-11 cursor-pointer items-center justify-center text-ink/75 transition-colors duration-[var(--duration-fast)] hover:text-gold-light"
    >
      {isLight ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <path
            d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
