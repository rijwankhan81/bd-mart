"use client";

import React from "react";
import Link from "next/link";

// Icons
import {
  FiMapPin,
  FiZap,
  FiShield,
  FiTruck,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaAppleAlt,
  FaBoxOpen,
  FaBaby,
  FaShower,
  FaHome,
  FaUtensils,
} from "react-icons/fa";
import { MdLocalOffer, MdDeliveryDining } from "react-icons/md";

import styles from "./HomePage.module.scss";
import "../../styles/common.scss";
import CtaBanner from "../CtaBanner/CtaBanner";

interface HomePageProps {
  lang: "en" | "bn";
}

const WHATSAPP_URL = `https://wa.me/+8801XXXXXXXXX?text=Hi%20BD-MART!%20I%27d%20like%20to%20place%20an%20order.`;

// ---- DATA ----
const categories = [
  {
    icon: <FaAppleAlt />,
    cls: "grocery",
    label: "Daily Grocery",
    labelBn: "দৈনিক মুদি",
    href: "/products/grocery",
  },
  {
    icon: <FaBoxOpen />,
    cls: "snacks",
    label: "Snacks & Drinks",
    labelBn: "স্ন্যাকস ও পানীয়",
    href: "/products/snacks",
  },
  {
    icon: <FaBaby />,
    cls: "baby",
    label: "Baby Care",
    labelBn: "শিশু যত্ন",
    href: "/products/baby-care",
  },
  {
    icon: <FaShower />,
    cls: "personal",
    label: "Personal Care",
    labelBn: "ব্যক্তিগত যত্ন",
    href: "/products/personal",
  },
  {
    icon: <FaHome />,
    cls: "household",
    label: "Household",
    labelBn: "গৃহস্থালি",
    href: "/products/household",
  },
  {
    icon: <FaUtensils />,
    cls: "cafe",
    label: "Cafe Corner",
    labelBn: "ক্যাফে কর্নার",
    href: "/products/cafe",
  },
];

const offers = [
  {
    image: "/images/offers/dairy-pack.jpg",
    badge: "20% OFF",
    title: "Daily Dairy Pack",
    titleBn: "দৈনিক ডেইরি প্যাক",
    desc: "Milk, curd & butter combo",
    descBn: "দুধ, দই ও মাখন কম্বো",
    priceNew: "৳ 149",
    priceOld: "৳ 185",
  },
  {
    image: "/images/offers/Cafe-Bundle.jpg",
    badge: "COMBO",
    title: "Morning Cafe Bundle",
    titleBn: "মর্নিং ক্যাফে বান্ডেল",
    desc: "Tea + Biscuits + Egg pack",
    descBn: "চা + বিস্কুট + ডিম প্যাক",
    priceNew: "৳ 99",
    priceOld: "৳ 130",
  },
  {
    image: "/images/offers/Care-Kit.jpg",
    badge: "NEW",
    title: "Personal Care Kit",
    titleBn: "পার্সোনাল কেয়ার কিট",
    desc: "Shampoo, soap & toothpaste",
    descBn: "শ্যাম্পু, সাবান ও টুথপেস্ট",
    priceNew: "৳ 299",
    priceOld: "৳ 370",
  },
  {
    image: "/images/offers/snack-combo.jpg",
    badge: "HOT",
    title: "Evening Snack Combo",
    titleBn: "সন্ধ্যার স্ন্যাকস কম্বো",
    desc: "Chips, soft drink & chocolate",
    descBn: "চিপস, সফট ড্রিংক ও চকলেট",
    priceNew: "৳ 179",
    priceOld: "৳ 220",
  },
];

const features = [
  {
    icon: <FiZap />,
    title: "Fast & Fresh",
    titleBn: "দ্রুত ও তাজা",
    desc: "Daily-restocked shelves with fresh products every morning.",
    descBn: "প্রতিদিন সকালে তাজা পণ্য দিয়ে সাজানো শেলফ।",
  },
  {
    icon: <FiTruck />,
    title: "Local Delivery",
    titleBn: "স্থানীয় ডেলিভারি",
    desc: "Quick home delivery within your nearby area.",
    descBn: "কাছের এলাকায় দ্রুত হোম ডেলিভারি।",
  },
  {
    icon: <FiShield />,
    title: "Trusted Quality",
    titleBn: "বিশ্বস্ত মান",
    desc: "Only verified brands and genuine products on our shelves.",
    descBn: "আমাদের শেলফে শুধু যাচাইকৃত ব্র্যান্ড ও আসল পণ্য।",
  },
  {
    icon: <MdLocalOffer />,
    title: "Daily Offers",
    titleBn: "দৈনিক অফার",
    desc: "New discounts and combo deals updated every day.",
    descBn: "প্রতিদিন নতুন ছাড় ও কম্বো অফার আপডেট হয়।",
  },
];

const stripItems = [
  "🛒 Daily Grocery",
  "☕ Cafe Corner",
  "🚚 Local Delivery",
  "🏪 Multiple Outlets",
  "💬 WhatsApp Order",
  "🍼 Baby Care",
  "🧴 Personal Care",
  "🏡 Household Items",
  "🎁 Daily Offers",
  "📦 Snacks & Drinks",
];

const franchiseLookingFor = [
  {
    en: "Commercial spaces in busy local areas",
    bn: "ব্যস্ত স্থানীয় এলাকায় বাণিজ্যিক স্থান",
  },
  {
    en: "Retail entrepreneurs",
    bn: "খুচরা ব্যবসায়ী উদ্যোক্তা",
  },
  {
    en: "Community-focused business partners",
    bn: "কমিউনিটি-কেন্দ্রিক ব্যবসায়িক অংশীদার",
  },
];

// ---- COMPONENT ----
export default function HomePage({ lang }: HomePageProps) {
  const t = (en: string, bn: string) => (lang === "bn" ? bn : en);

  // Franchise form state
  const [franchiseForm, setFranchiseForm] = React.useState({
    name: "",
    phone: "",
    area: "",
    propertySize: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleFranchiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFranchiseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFranchiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!franchiseForm.name || !franchiseForm.phone || !franchiseForm.area)
      return;
    setSubmitting(true);
    // TODO: wire up to actual API endpoint
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFranchiseForm({ name: "", phone: "", area: "", propertySize: "" });
    }, 800);
  };

  return (
    <main id="main-content">
      {/* ======== HERO ======== */}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroPattern} aria-hidden="true" />

        <div className={styles.heroGrid}>
          {/* Content */}
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              {t("Now Open Near You", "এখন আপনার কাছেই খোলা")}
            </div>

            <h1 className={styles.heroTitle}>
              {t(
                " Your Neighbourhood Convenience Shop",
                "আশেপাশের আপনার প্রয়োজনীয় দোকান",
              )}
            </h1>

            <p className={styles.heroSubtitle}>
              {t(
                "Grocery, snacks, cafe, baby care & daily essentials — all under one roof, anytime nearby.",
                "মুদিখানা, স্ন্যাকস, ক্যাফে, শিশু যত্ন ও দৈনন্দিন প্রয়োজনীয় পণ্য — এক ছাদের নিচে, সবসময় কাছে।",
              )}
            </p>

            <div className={styles.heroCtas}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp btn--lg"
              >
                <FaWhatsapp />
                {t("Order on WhatsApp", "হোয়াটসঅ্যাপে অর্ডার করুন")}
              </a>
              <Link href="/outlets" className="btn btn--outline-white btn--lg">
                <FiMapPin />
                {t("Find Nearest Outlet", "কাছের শাখা খুঁজুন")}
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStat__number}>50+</span>
                <span className={styles.heroStat__label}>
                  {t("Products", "পণ্য")}
                </span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStat__number}>7AM</span>
                <span className={styles.heroStat__label}>
                  {t("Opens Daily", "প্রতিদিন খোলে")}
                </span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStat__number}>2km</span>
                <span className={styles.heroStat__label}>
                  {t("Delivery Range", "ডেলিভারি রেঞ্জ")}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual — Swiper or Placeholder */}
          <div className={styles.heroVisual}>
            <div className={styles.storeWrap}>
              <img src="/images/bd-store.jpg" alt="" />
            </div>

            {/* Floating Cards */}
            <div className={`${styles.heroCard} ${styles["heroCard--offer"]}`}>
              <div
                className={`${styles.heroCardIcon} ${styles["heroCardIcon--red"]}`}
              >
                <MdLocalOffer />
              </div>
              <div className={styles.heroCardBody}>
                <strong>{t("Today's Offer", "আজকের অফার")}</strong>
                <span>{t("Up to 20% off", "সর্বোচ্চ ২০% ছাড়")}</span>
              </div>
            </div>

            <div
              className={`${styles.heroCard} ${styles["heroCard--delivery"]}`}
            >
              <div
                className={`${styles.heroCardIcon} ${styles["heroCardIcon--green"]}`}
              >
                <MdDeliveryDining />
              </div>
              <div className={styles.heroCardBody}>
                <strong>{t("Quick Delivery", "দ্রুত ডেলিভারি")}</strong>
                <span>{t("Nearby area", "কাছের এলাকায়")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== MARQUEE STRIP ======== */}
      <div className={styles.strip} aria-hidden="true">
        <div className={styles.stripTrack}>
          {[...stripItems, ...stripItems].map((item, i) => (
            <React.Fragment key={i}>
              <span className={styles.stripItem}>
                <FiStar size={12} /> {item}
              </span>
              <span className={styles.stripDot} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ======== CATEGORIES ======== */}
      <section className={styles.categories} aria-label="Product categories">
        <div
          className="sectionHeader"
          style={{ textAlign: "center", marginBottom: 0 }}
        >
          <span className="sectionHeader__eyebrow">
            {t("Explore", "অন্বেষণ করুন")}
          </span>
          <h2 className="sectionHeader__title">
            {t("Shop by Category", "বিভাগ অনুযায়ী কিনুন")}
          </h2>
          <p className="sectionHeader__subtitle">
            {t(
              "Everything you need daily — all in one place.",
              "প্রতিদিনের সব প্রয়োজন — এক জায়গায়।",
            )}
          </p>
        </div>

        <div className={styles.catGrid}>
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} className={styles.catCard}>
              <div
                className={`${styles.catIcon} ${styles[`catIcon--${cat.cls}`]}`}
              >
                {cat.icon}
              </div>
              <div>
                <div className={styles.catLabel}>
                  {t(cat.label, cat.labelBn)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======== DAILY OFFERS ======== */}
      <section className={styles.offers} aria-label="Daily offers">
        <div className={styles.offersInner}>
          <div className={styles.offersHeader}>
            <div>
              <span className="sectionHeader__eyebrow">
                {t("Updated Daily", "প্রতিদিন আপডেট")}
              </span>
              <h2
                className="sectionHeader__title"
                style={{ textAlign: "left", marginBottom: 0 }}
              >
                {t("Today's Best Deals", "আজকের সেরা ডিল")}
              </h2>
            </div>
            <Link href="/offers" className="btn btn--outline">
              {t("All Offers", "সব অফার")} <FiArrowRight />
            </Link>
          </div>

          <div className={styles.offerCards}>
            {offers.map((offer, i) => (
              <div key={i} className={styles.offerCard}>
                <div className={styles.offerImgWrap}>
                  <img src={offer.image} alt={offer.title} />
                  <span className={styles.offerBadge}>{offer.badge}</span>
                </div>
                <div className={styles.offerBody}>
                  <h3 className={styles.offerTitle}>
                    {t(offer.title, offer.titleBn)}
                  </h3>
                  <p className={styles.offerDesc}>
                    {t(offer.desc, offer.descBn)}
                  </p>
                  <div className={styles.offerPrice}>
                    <span className={styles.priceNew}>{offer.priceNew}</span>
                    <span className={styles.priceOld}>{offer.priceOld}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== WHY BD-MART ======== */}
      <section className={styles.features} aria-label="Why choose BD-MART">
        <div className={styles.featuresInner}>
          <div className="sectionHeader">
            <span className="sectionHeader__eyebrow">
              {t("Why BD-MART", "কেন BD-MART")}
            </span>
            <h2 className="sectionHeader__title">
              {t("Your Local, Your Way", "আপনার স্থানীয়, আপনার মতো")}
            </h2>
            <p className="sectionHeader__subtitle">
              {t(
                "We are not a big supermarket. We are your neighbourhood essential.",
                "আমরা কোনো বড় সুপারশপ নই। আমরা আপনার পাড়ার দোকান।",
              )}
            </p>
          </div>

          <div className={styles.featGrid}>
            {features.map((feat, i) => (
              <div key={i} className={styles.featCard}>
                <div className={styles.featIcon}>{feat.icon}</div>
                <h3 className={styles.featTitle}>
                  {t(feat.title, feat.titleBn)}
                </h3>
                <p className={styles.featDesc}>{t(feat.desc, feat.descBn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== OUTLET CTA ======== */}
      <CtaBanner id="franchise" override={{ variant: "light" }} />
      <CtaBanner id="outlet" />
    </main>
  );
}
