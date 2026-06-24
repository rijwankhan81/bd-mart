"use client";

import HomePage from "./components/Home/HomePage";
import { useApp } from "./context/AppContext";

export default function Page() {
  const { lang } = useApp();
  return <HomePage lang={lang} />;
}
