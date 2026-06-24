"use client";

import React from "react";
import Link from "next/link";
import {
  FiPhone,
  FiMapPin,
  FiMail,
  FiClock,
  FiArrowRight,
  FiInstagram,
  FiFacebook,
  FiYoutube,
} from "react-icons/fi";
import { FaWhatsapp, FaMobileAlt } from "react-icons/fa";
import styles from "./Footer.module.scss";

interface FooterProps {
  lang: "en" | "bn";
}

const WHATSAPP_URL = `https://wa.me/+8801XXXXXXXXX?text=Hi%20BD-MART!`;

export default function Footer({ lang }: FooterProps) {
  const t = (en: string, bn: string) => (lang === "bn" ? bn : en);
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", labelBn: "হোম", href: "/" },
    { label: "Products", labelBn: "পণ্য", href: "/products" },
    { label: "Daily Offers", labelBn: "দৈনিক অফার", href: "/offers" },
    { label: "Our Outlets", labelBn: "আমাদের শাখা", href: "/outlets" },
    { label: "Order / Pickup", labelBn: "অর্ডার / পিকআপ", href: "/order" },
    { label: "Franchise", labelBn: "ফ্রেঞ্চাইজি", href: "/franchise" },
  ];

  const productLinks = [
    {
      label: "Daily Grocery",
      labelBn: "দৈনিক মুদিখানা",
      href: "/products/grocery",
    },
    {
      label: "Snacks & Drinks",
      labelBn: "স্ন্যাকস ও পানীয়",
      href: "/products/snacks",
    },
    { label: "Baby Care", labelBn: "শিশু যত্ন", href: "/products/baby-care" },
    {
      label: "Personal Care",
      labelBn: "ব্যক্তিগত যত্ন",
      href: "/products/personal",
    },
    {
      label: "Household Items",
      labelBn: "গৃহস্থালি",
      href: "/products/household",
    },
    {
      label: "Cafe / Tea Corner",
      labelBn: "ক্যাফে কর্নার",
      href: "/products/cafe",
    },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerMain}>
        <div className={styles.footerGrid}>
          {/* ---- BRAND COLUMN ---- */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.footerLogo} aria-label="BD-MART">
              <img
                src="/images/logo-wht.png"
                alt="BD-MART"
                className={styles.footerLogoImg}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </Link>

            <p className={styles.footerDesc}>
              {t(
                "BD-MART is your trusted neighbourhood convenience shop for daily essentials — fast, clean, affordable, and always nearby.",
                "BD-MART আপনার বিশ্বস্ত প্রতিবেশী কনভেনিয়েন্স শপ — দৈনন্দিন প্রয়োজনীয় পণ্যের জন্য, দ্রুত, পরিষ্কার এবং সাশ্রয়ী।",
              )}
            </p>

            <div className={styles.footerSocials}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <FiYoutube />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} ${styles.wa}`}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* ---- QUICK LINKS ---- */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>
              {t("Quick Links", "দ্রুত লিঙ্ক")}
            </h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    <FiArrowRight />
                    {t(link.label, link.labelBn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- PRODUCTS ---- */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>
              {t("Our Products", "আমাদের পণ্য")}
            </h3>
            <ul className={styles.linkList}>
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    <FiArrowRight />
                    {t(link.label, link.labelBn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- CONTACT ---- */}
          <div className={styles.contactCol}>
            <h3 className={styles.colTitle}>{t("Contact Us", "যোগাযোগ")}</h3>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FiPhone />
              </div>
              <div className={styles.contactText}>
                <strong>{t("Phone / WhatsApp", "ফোন / হোয়াটসঅ্যাপ")}</strong>
                <span>01XXXXXXXXX</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FiMail />
              </div>
              <div className={styles.contactText}>
                <strong>{t("Email", "ইমেইল")}</strong>
                <span>hello@bdmart.com.bd</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FiMapPin />
              </div>
              <div className={styles.contactText}>
                <strong>{t("Head Office", "প্রধান কার্যালয়")}</strong>
                <span>{t("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ")}</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FiClock />
              </div>
              <div className={styles.contactText}>
                <strong>{t("Opening Hours", "খোলার সময়")}</strong>
                <span>
                  {t("7AM – 11PM Daily", "প্রতিদিন সকাল ৭টা – রাত ১১টা")}
                </span>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappCta}
            >
              <FaWhatsapp size={18} />
              {t("Quick Order on WhatsApp", "হোয়াটসঅ্যাপে অর্ডার করুন")}
            </a>
          </div>
        </div>
      </div>

      {/* ---- BOTTOM BAR ---- */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <p className={styles.copyright}>
            © {year} <span>BD-MART</span>.{" "}
            {t(
              "All rights reserved. Neighbourhood Essentials, Anytime Nearby.",
              "সর্বস্বত্ব সংরক্ষিত। আশেপাশের প্রয়োজন, যেকোনো সময়।",
            )}
          </p>

          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>
              {t("Privacy Policy", "গোপনীয়তা নীতি")}
            </Link>
            <Link href="/terms" className={styles.bottomLink}>
              {t("Terms", "শর্তাবলী")}
            </Link>
            <span className={styles.appBadge}>
              <FaMobileAlt />
              {t("BD-ONE App — Coming Soon", "BD-ONE অ্যাপ — শীঘ্রই")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
