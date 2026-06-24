"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";
type Lang = "en" | "bn";

interface AppContextValue {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
  t: (en: string, bn: string) => string;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Lang>("en");

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("bdmart-theme") as Theme | null;
    const savedLang = localStorage.getItem("bdmart-lang") as Lang | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLang(savedLang);
  }, []);

  // Apply theme to <html data-theme="...">
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bdmart-theme", theme);
  }, [theme]);

  // Apply lang to <html lang="...">
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang === "bn" ? "bn" : "en");
    localStorage.setItem("bdmart-lang", lang);
  }, [lang]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleLang = () => setLang((prev) => (prev === "en" ? "bn" : "en"));

  // Shared translation helper — same pattern used everywhere
  const t = (en: string, bn: string) => (lang === "bn" ? bn : en);

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
}
