"use client";

import React from "react";
import { t as makeT, type Lang } from "@/i18n/translations";

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = React.createContext<I18nContextValue | undefined>(
  undefined
);

function isLang(value: unknown): value is Lang {
  return value === "en" || value === "zh-TW";
}

export function I18nProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang?: Lang; // from server (cookie / Accept-Language)
}) {
  const [lang, setLangState] = React.useState<Lang>(initialLang ?? "en");

  // First mount: hydrate from localStorage if no server-provided initial
  React.useEffect(() => {
    if (initialLang) return; // server already set a good default
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem("lang")) as Lang | null;
    if (isLang(stored)) setLangState(stored);
  }, [initialLang]);

  // Persist + reflect in <html lang>
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
      // also drop a cookie so SSR can read it on navigation
      document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }, [lang]);

  const setLang = React.useCallback((l: Lang) => setLangState(l), []);
  const value = React.useMemo(
    () => ({ lang, setLang, t: makeT(lang) }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
