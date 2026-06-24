"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiSun,
  FiMoon,
  FiChevronDown,
  FiX,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaStore,
  FaBoxOpen,
  FaUtensils,
  FaBaby,
  FaAppleAlt,
  FaShower,
} from "react-icons/fa";
import styles from "./Header.module.scss";

// ---- TYPES ----
interface NavItem {
  label: string;
  labelBn: string;
  href?: string;
  children?: {
    label: string;
    labelBn: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

// ---- NAV DATA ----
const navItems: NavItem[] = [
  { label: "Home", labelBn: "হোম", href: "/" },
  {
    label: "Products",
    labelBn: "পণ্য",
    children: [
      {
        label: "Daily Grocery",
        labelBn: "দৈনিক মুদিখানা",
        href: "/products/grocery",
        icon: <FaAppleAlt />,
      },
      {
        label: "Snacks & Drinks",
        labelBn: "স্ন্যাকস ও পানীয়",
        href: "/products/snacks",
        icon: <FaBoxOpen />,
      },
      {
        label: "Baby Care",
        labelBn: "শিশু যত্ন",
        href: "/products/baby-care",
        icon: <FaBaby />,
      },
      {
        label: "Personal Care",
        labelBn: "ব্যক্তিগত যত্ন",
        href: "/products/personal",
        icon: <FaShower />,
      },
      {
        label: "Household Items",
        labelBn: "গৃহস্থালি",
        href: "/products/household",
        icon: <FaStore />,
      },
      {
        label: "Cafe / Tea Corner",
        labelBn: "ক্যাফে কর্নার",
        href: "/products/cafe",
        icon: <FaUtensils />,
      },
    ],
  },
  { label: "Daily Offers", labelBn: "দৈনিক অফার", href: "/offers" },
  { label: "Outlets", labelBn: "শাখাসমূহ", href: "/outlets" },
  { label: "Order", labelBn: "অর্ডার", href: "/order" },
  { label: "About", labelBn: "আমাদের সম্পর্কে", href: "/about" },
  { label: "Franchise", labelBn: "ফ্রেঞ্চাইজি", href: "/franchise" },
  { label: "Contact", labelBn: "যোগাযোগ", href: "/contact" },
];

const WHATSAPP_NUMBER = "+8801XXXXXXXXX";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20BD-MART!%20I%27d%20like%20to%20place%20an%20order.`;

// ---- COMPONENT ----
interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  lang: "en" | "bn";
  onToggleLang: () => void;
}

export default function Header({
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
}: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenSubMenu(null);
  }, [pathname]);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  const t = (en: string, bn: string) => (lang === "bn" ? bn : en);

  const isActive = (href?: string) =>
    href
      ? href === "/"
        ? pathname === "/"
        : pathname.startsWith(href)
      : false;

  return (
    <>
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>

      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        role="banner"
      >
        {/* ---- TOP BAR ---- */}
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <div className={styles.topBarLeft}>
              <span className={styles.topBarItem}>
                <FiPhone />
                {t("Call / WhatsApp", "কল / হোয়াটসঅ্যাপ")}: 01XXXXXXXX
              </span>
              <span className={styles.topBarItem}>
                <FiClock />
                {t("Open: 7AM – 11PM", "খোলা: সকাল ৭টা – রাত ১১টা")}
              </span>
              <span className={styles.topBarItem}>
                <FiMapPin />
                {t("Find Nearest Outlet", "কাছের শাখা খুঁজুন")}
              </span>
            </div>
            <div className={styles.topBarRight}>
              <button
                className={styles.langToggle}
                onClick={onToggleLang}
                aria-label="Toggle language"
              >
                <span className={lang === "en" ? styles.active : ""}>EN</span>
                <span>/</span>
                <span className={lang === "bn" ? styles.active : ""}>বাং</span>
              </button>
            </div>
          </div>
        </div>

        {/* ---- MAIN NAV ---- */}
        <nav className={styles.navMain} aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="BD-MART Home">
            {/* Replace src with actual logo path: /logo.png or import */}
            {theme === "light" ? (
              <img
                src="/images/bd-mart-logo.jpg"
                alt="BD-MART Logo"
                className={styles.logo__img}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <img
                src="/images/logo-wht.png"
                alt="BD-MART Logo"
                className={styles.logo__img}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </Link>

          {/* Desktop Links */}
          <ul className={styles.navLinks} role="list">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label} className={styles.dropdown}>
                  <button
                    className={`${styles.navLink} ${
                      item.children.some((c) => isActive(c.href))
                        ? styles.active
                        : ""
                    }`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {t(item.label, item.labelBn)}
                    <FiChevronDown className={styles.navLink__arrow} />
                  </button>
                  <ul className={styles.dropdownMenu} role="menu">
                    {item.children.map((child) => (
                      <li key={child.href} role="none">
                        <Link
                          href={child.href}
                          className={styles.dropdownItem}
                          role="menuitem"
                        >
                          {child.icon}
                          {t(child.label, child.labelBn)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
                  >
                    {t(item.label, item.labelBn)}
                  </Link>
                </li>
              ),
            )}
          </ul>

          {/* Actions */}
          <div className={styles.navActions}>
            {/* Theme Toggle */}
            <button
              className={styles.themeToggle}
              onClick={onToggleTheme}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
              aria-label="Order on WhatsApp"
            >
              <FaWhatsapp />
              <span>{t("Order Now", "অর্ডার করুন")}</span>
            </a>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      {/* ---- OVERLAY ---- */}
      <div
        className={`overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ---- MOBILE DRAWER ---- */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.mobileMenuHeader}>
          <span className={styles.mobileMenuLogo}>BD-MART</span>
          <button
            className={styles.mobileMenuClose}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <div className={styles.mobileNavLinks}>
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className={`${styles.mobileNavLink} ${
                    item.children.some((c) => isActive(c.href))
                      ? styles.active
                      : ""
                  }`}
                  onClick={() =>
                    setOpenSubMenu(
                      openSubMenu === item.label ? null : item.label,
                    )
                  }
                  aria-expanded={openSubMenu === item.label}
                >
                  {t(item.label, item.labelBn)}
                  <FiChevronDown
                    style={{
                      transform:
                        openSubMenu === item.label ? "rotate(180deg)" : "",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>
                {openSubMenu === item.label && (
                  <div className={styles.mobileSubLinks}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.mobileSubLink}
                      >
                        {t(child.label, child.labelBn)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.active : ""}`}
              >
                {t(item.label, item.labelBn)}
              </Link>
            ),
          )}
        </div>

        <div className={styles.mobileMenuFooter}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileWhatsapp}
          >
            <FaWhatsapp size={20} />
            {t("Order on WhatsApp", "হোয়াটসঅ্যাপে অর্ডার করুন")}
          </a>
        </div>
      </div>
    </>
  );
}
