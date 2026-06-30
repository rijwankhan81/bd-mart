"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import { ctaConfig, CtaId, CtaConfig } from "./ctaConfig";
import styles from "./CtaBanner.module.scss";

// ─────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────
interface CtaBannerProps {
  /** Pick a pre-built banner from ctaConfig.ts — e.g. "outlet", "franchise", "whatsappOrder" */
  id: CtaId;
  /** Optional: override any field from the config for this one instance */
  override?: Partial<CtaConfig>;
}

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────
export default function CtaBanner({ id, override }: CtaBannerProps) {
  const { lang } = useApp();
  const base = ctaConfig[id];
  const cfg: CtaConfig = { ...base, ...override };

  const text = (field?: { en: React.ReactNode; bn: React.ReactNode }) =>
    field ? (lang === "bn" ? field.bn : field.en) : null;

  const variant = cfg.variant ?? "dark";

  return (
    <section
      className={`${styles.ctaBanner} ${styles[variant]} ${cfg.compact ? styles.compact : ""}`}
      aria-label="Call to action"
    >
      <div className={styles.inner}>
        {cfg.badge && (
          <span className={styles.badge}>
            {cfg.badge.icon}
            {lang === "bn" ? cfg.badge.labelBn : cfg.badge.label}
          </span>
        )}

        <h2 className={styles.title}>{text(cfg.title)}</h2>

        {cfg.subtitle && (
          <p className={styles.subtitle}>{text(cfg.subtitle)}</p>
        )}

        {cfg.stats && cfg.stats.length > 0 && (
          <div className={styles.statsRow}>
            {cfg.stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <strong>{s.value}</strong>
                <span>{lang === "bn" ? s.labelBn : s.label}</span>
              </div>
            ))}
          </div>
        )}

        {cfg.buttons && cfg.buttons.length > 0 && (
          <div className={styles.btnRow}>
            {cfg.buttons.map((btn, i) => {
              const btnClass = `btn btn--${btn.variant || "primary"} btn--lg`;
              const label = lang === "bn" ? btn.labelBn : btn.label;
              return btn.external ? (
                <a
                  key={i}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                >
                  {btn.icon}
                  {label}
                </a>
              ) : (
                <a key={i} href={btn.href} className={btnClass}>
                  {btn.icon}
                  {label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
