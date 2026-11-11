"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "./en.json";
import hi from "./hi.json";

export type Locale = "en" | "hi";

type TranslationSchema = typeof en;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (keypath: string) => string;
}

const dictionaries: Record<Locale, any> = { en, hi };

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (keypath: string) => keypath,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("zarf_locale") as Locale;
    if (saved && (saved === "en" || saved === "hi")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("zarf_locale", newLocale);
  };

  const t = (keypath: string): string => {
    const parts = keypath.split(".");
    let current = dictionaries[locale] || dictionaries.en;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        // Fallback to english
        let fallback = dictionaries.en;
        for (const fbPart of parts) {
          if (fallback && typeof fbPart in fallback) {
            fallback = fallback[fbPart];
          } else {
            return keypath;
          }
        }
        return typeof fallback === "string" ? fallback : keypath;
      }
    }
    return typeof current === "string" ? current : keypath;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

