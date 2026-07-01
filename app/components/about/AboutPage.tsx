"use client";

import Link from "next/link";
import {
  FiChevronRight,
  FiUsers,
  FiZap,
  FiShield,
  FiTruck,
  FiHeart,
  FiTarget,
  FiEye,
  FiCheckCircle,
  FiAward,
  FiTrendingUp,
  FiHome,
} from "react-icons/fi";
import { FaStore, FaLeaf, FaHandshake } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import styles from "./AboutPage.module.scss";
import "../../styles/common.scss";
import { useApp } from "../../context/AppContext";
import CtaBanner from "../CtaBanner/CtaBanner";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const whyFeatures = [
  {
    icon: <FiZap />,
    title: "Fast & Fresh",
    titleBn: "দ্রুত ও তাজা",
    desc: "Daily-restocked shelves so you always get fresh products, never stale ones.",
    descBn: "প্রতিদিন রিস্টক করা শেলফ, তাই আপনি সবসময় তাজা পণ্য পান।",
  },
  {
    icon: <FiShield />,
    title: "Trusted Quality",
    titleBn: "বিশ্বস্ত মান",
    desc: "Only verified brands and genuine products — no compromises on quality.",
    descBn:
      "শুধুমাত্র যাচাইকৃত ব্র্যান্ড ও আসল পণ্য — মানের সাথে কোনো আপস নয়।",
  },
  {
    icon: <FiTruck />,
    title: "Nearby & Fast Delivery",
    titleBn: "কাছে ও দ্রুত ডেলিভারি",
    desc: "We deliver within your local area quickly, so you never have to wait long.",
    descBn:
      "আমরা আপনার স্থানীয় এলাকায় দ্রুত ডেলিভারি করি, তাই বেশি অপেক্ষা করতে হয় না।",
  },
  {
    icon: <MdLocalOffer />,
    title: "Affordable Pricing",
    titleBn: "সাশ্রয়ী মূল্য",
    desc: "Fair, transparent prices with daily offers — quality doesn't need to be expensive.",
    descBn:
      "ন্যায্য, স্বচ্ছ মূল্য ও প্রতিদিনের অফার — মানসম্পন্ন পণ্য ব্যয়বহুল হতে হয় না।",
  },
];

const values = [
  { en: "Customer-first mindset", bn: "গ্রাহক-কেন্দ্রিক মানসিকতা" },
  { en: "Honesty in every transaction", bn: "প্রতিটি লেনদেনে সততা" },
  { en: "Community over competition", bn: "প্রতিযোগিতার চেয়ে কমিউনিটি" },
  { en: "Consistency you can rely on", bn: "নির্ভরযোগ্য ধারাবাহিকতা" },
];

const teamMembers = [
  {
    image: "/images/user.jpg",
    icon: <FiAward />,
    name: "Rafiq Ahmed",
    nameBn: "রফিক আহমেদ",
    role: "Founder & CEO",
    roleBn: "প্রতিষ্ঠাতা ও সিইও",
  },
  {
    image: "images/user.jpg",
    icon: <FiUsers />,
    name: "Nusrat Jahan",
    nameBn: "নুসরাত জাহান",
    role: "Operations Head",
    roleBn: "অপারেশন প্রধান",
  },
  {
    image: "images/user.jpg",
    icon: <FaStore />,
    name: "Kamal Hossain",
    nameBn: "কামাল হোসেন",
    role: "Outlet Manager",
    roleBn: "আউটলেট ম্যানেজার",
  },
  {
    image: "images/user.jpg",
    icon: <FiTrendingUp />,
    name: "Sumaiya Akter",
    nameBn: "সুমাইয়া আক্তার",
    role: "Marketing Lead",
    roleBn: "মার্কেটিং প্রধান",
  },
];

const timeline = [
  {
    year: "2023",
    icon: <FiHome />,
    title: "The Idea Was Born",
    titleBn: "ধারণার জন্ম",
    desc: "BD-MART started as a simple idea — bring trusted daily essentials closer to every neighbourhood.",
    descBn:
      "BD-MART শুরু হয় একটি সহজ ধারণা থেকে — প্রতিটি প্রতিবেশীর কাছে বিশ্বস্ত দৈনন্দিন প্রয়োজনীয় পণ্য পৌঁছে দেওয়া।",
  },
  {
    year: "2024",
    icon: <FaStore />,
    title: "First Outlet Opens",
    titleBn: "প্রথম আউটলেট চালু",
    desc: "Our very first BD-MART outlet opened its doors, serving the local community with daily groceries.",
    descBn:
      "আমাদের প্রথম BD-MART আউটলেট খোলা হয়, স্থানীয় কমিউনিটিকে দৈনন্দিন মুদিখানা সেবা দিতে শুরু করে।",
  },
  {
    year: "2025",
    icon: <FiTrendingUp />,
    title: "Expanding Across Areas",
    titleBn: "এলাকাজুড়ে সম্প্রসারণ",
    desc: "Multiple outlets opened across different neighbourhoods, each tailored to local needs.",
    descBn:
      "বিভিন্ন এলাকায় একাধিক আউটলেট খোলা হয়, প্রতিটি স্থানীয় চাহিদা অনুযায়ী তৈরি।",
  },
  {
    year: "2026",
    icon: <FiZap />,
    title: "BD-ONE App & Digital Growth",
    titleBn: "BD-ONE অ্যাপ ও ডিজিটাল বৃদ্ধি",
    desc: "Launching WhatsApp ordering, online presence, and our upcoming BD-ONE delivery app.",
    descBn:
      "হোয়াটসঅ্যাপ অর্ডারিং, অনলাইন উপস্থিতি এবং আসন্ন BD-ONE ডেলিভারি অ্যাপ চালু।",
  },
];

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────
export default function AboutPage() {
  const { t } = useApp();

  return (
    <main id="main-content">
      {/* ════════════ HERO ════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">{t("Home", "হোম")}</Link>
            <FiChevronRight />
            <span>{t("About Us", "আমাদের সম্পর্কে")}</span>
          </nav>

          <span className={styles.heroBadge}>
            <FaHandshake size={12} />
            {t("Our Story", "আমাদের গল্প")}
          </span>

          <h1 className={styles.heroTitle}>
            {t(
              "BD-MART is your modern neighbourhood convenience shop",
              "BD-MART আপনার আধুনিক প্রতিবেশী কনভেনিয়েন্স শপ",
            )}
          </h1>

          <p className={styles.heroSubtitle}>
            {t(
              "Built for Bangladesh — fast, clean, affordable, and trusted for all your daily needs, anytime nearby.",
              "বাংলাদেশের জন্য তৈরি — দ্রুত, পরিষ্কার, সাশ্রয়ী এবং আপনার সব দৈনন্দিন প্রয়োজনের জন্য বিশ্বস্ত, সবসময় কাছে।",
            )}
          </p>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>10+</strong>
              <span>{t("Outlets", "আউটলেট")}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.heroStat}>
              <strong>50+</strong>
              <span>{t("Products", "পণ্য")}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.heroStat}>
              <strong>5K+</strong>
              <span>{t("Happy Customers", "খুশি গ্রাহক")}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.heroStat}>
              <strong>2026</strong>
              <span>{t("Since", "থেকে")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ OUR STORY ════════════ */}
      <section className={styles.story}>
        <div className={styles.storyGrid}>
          {/* Visual */}
          <div className={styles.storyVisual}>
            <div className={styles.storyImgStack}>
              <div className={styles.yearBadge}>
                <strong>2023</strong>
                <span>{t("Founded", "প্রতিষ্ঠিত")}</span>
              </div>

              <div className={styles.storyImgMain}>
                <img src="/images/bd-mart-store1.jpg" alt="" />
              </div>

              <div className={styles.storyImgFloat}>
                <span className={styles.floatTitle}>{t("Today", "আজ")}</span>
                <span className={styles.floatRow}>
                  <FaStore /> {t("10+ Outlets", "১০+ আউটলেট")}
                </span>
                <span className={styles.floatRow}>
                  <FiUsers /> {t("5,000+ Customers", "৫,০০০+ গ্রাহক")}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={styles.storyContent}>
            <span className="sectionHeader__eyebrow">
              {t("Our Story", "আমাদের গল্প")}
            </span>
            <h2
              className="sectionHeader__title"
              style={{ textAlign: "left", marginBottom: 0 }}
            >
              {t(
                "Built for the Neighbourhood, Not the Crowd",
                "প্রতিবেশীর জন্য তৈরি, ভিড়ের জন্য নয়",
              )}
            </h2>

            <p className={styles.storyText}>
              {t(
                "BD-MART began with a simple observation: people in Bangladesh deserve a convenience shop that actually understands their daily life — not a giant supermarket that takes 30 minutes to navigate, but a clean, fast, friendly store that's always just around the corner.",
                "BD-MART শুরু হয়েছিল একটি সহজ পর্যবেক্ষণ থেকে: বাংলাদেশের মানুষ এমন একটি কনভেনিয়েন্স শপ পাওয়ার যোগ্য যা তাদের দৈনন্দিন জীবন বোঝে — কোনো বিশাল সুপারমার্কেট নয় যেখানে ঘুরতে ৩০ মিনিট লাগে, বরং একটি পরিষ্কার, দ্রুত, বন্ধুত্বপূর্ণ দোকান যা সবসময় কাছেই থাকে।",
              )}
            </p>

            <p className={styles.storyText}>
              {t(
                "From grocery and snacks to a small cafe corner for your morning tea, we built BD-MART around what neighbourhoods actually need — every single day.",
                "মুদিখানা ও স্ন্যাকস থেকে শুরু করে সকালের চায়ের জন্য একটি ছোট ক্যাফে কর্নার পর্যন্ত, আমরা BD-MART তৈরি করেছি প্রতিবেশীদের প্রকৃত প্রয়োজন অনুযায়ী — প্রতিদিন।",
              )}
            </p>

            <div className={styles.storyHighlight}>
              <FiHeart />
              <p>
                {t(
                  "\"We're not a big supermarket. We're your neighbourhood essential — anytime nearby.\"",
                  '"আমরা কোনো বড় সুপারশপ নই। আমরা আপনার প্রতিবেশী প্রয়োজন — সবসময় কাছে।"',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ MISSION / VISION / VALUES ════════════ */}
      <section className={styles.mvv}>
        <div className={styles.mvvInner}>
          <div className="sectionHeader">
            <span className="sectionHeader__eyebrow">
              {t("What Drives Us", "আমাদের চালিকাশক্তি")}
            </span>
            <h2 className="sectionHeader__title">
              {t("Mission, Vision & Values", "লক্ষ্য, দৃষ্টিভঙ্গি ও মূল্যবোধ")}
            </h2>
            <p className="sectionHeader__subtitle">
              {t(
                "The principles that guide every BD-MART outlet, every single day.",
                "যে নীতিগুলো প্রতিটি BD-MART আউটলেটকে প্রতিদিন পরিচালিত করে।",
              )}
            </p>
          </div>

          <div className={styles.mvvGrid}>
            {/* Mission */}
            <div className={`${styles.mvvCard} ${styles.mission}`}>
              <div className={styles.mvvIcon}>
                <FiTarget />
              </div>
              <span className={styles.mvvLabel}>{t("Mission", "লক্ষ্য")}</span>
              <h3 className={styles.mvvTitle}>
                {t(
                  "Essentials, Anytime Nearby",
                  "প্রয়োজনীয় পণ্য, সবসময় কাছে",
                )}
              </h3>
              <p className={styles.mvvText}>
                {t(
                  "To make daily essentials accessible, affordable, and fast for every neighbourhood across Bangladesh.",
                  "বাংলাদেশের প্রতিটি প্রতিবেশীর জন্য দৈনন্দিন প্রয়োজনীয় পণ্য সহজলভ্য, সাশ্রয়ী ও দ্রুত করে তোলা।",
                )}
              </p>
            </div>

            {/* Vision */}
            <div className={`${styles.mvvCard} ${styles.vision}`}>
              <div className={styles.mvvIcon}>
                <FiEye />
              </div>
              <span className={styles.mvvLabel}>
                {t("Vision", "দৃষ্টিভঙ্গি")}
              </span>
              <h3 className={styles.mvvTitle}>
                {t(
                  "A BD-MART in Every Neighbourhood",
                  "প্রতিটি প্রতিবেশীতে একটি BD-MART",
                )}
              </h3>
              <p className={styles.mvvText}>
                {t(
                  "To become Bangladesh's most trusted local convenience brand — powered by community and technology like the BD-ONE app.",
                  "বাংলাদেশের সবচেয়ে বিশ্বস্ত স্থানীয় কনভেনিয়েন্স ব্র্যান্ড হয়ে ওঠা — কমিউনিটি ও BD-ONE অ্যাপের মতো প্রযুক্তির মাধ্যমে।",
                )}
              </p>
            </div>

            {/* Values */}
            <div className={`${styles.mvvCard} ${styles.values}`}>
              <div className={styles.mvvIcon}>
                <FaLeaf />
              </div>
              <span className={styles.mvvLabel}>{t("Values", "মূল্যবোধ")}</span>
              <h3 className={styles.mvvTitle}>
                {t("What We Stand For", "আমরা যা বিশ্বাস করি")}
              </h3>
              <div className={styles.valuesList}>
                {values.map((v, i) => (
                  <div key={i} className={styles.valuesItem}>
                    <FiCheckCircle />
                    {t(v.en, v.bn)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ WHY CHOOSE BD-MART ════════════ */}
      <section className={styles.why}>
        <div className={styles.whyInner}>
          <div className="sectionHeader">
            <span className="sectionHeader__eyebrow">
              {t("Why Choose Us", "কেন আমাদের বেছে নেবেন")}
            </span>
            <h2 className="sectionHeader__title">
              {t("Why People Trust BD-MART", "কেন মানুষ BD-MART বিশ্বাস করে")}
            </h2>
            <p className="sectionHeader__subtitle">
              {t(
                "Simple reasons that make a real difference, every day.",
                "সহজ কারণগুলো যা প্রতিদিন প্রকৃত পার্থক্য তৈরি করে।",
              )}
            </p>
          </div>

          <div className={styles.whyGrid}>
            {whyFeatures.map((f, i) => (
              <div key={i} className={styles.whyCard}>
                <div className={styles.whyIcon}>{f.icon}</div>
                <div className={styles.whyBody}>
                  <h3 className={styles.whyTitle}>{t(f.title, f.titleBn)}</h3>
                  <p className={styles.whyText}>{t(f.desc, f.descBn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TIMELINE / JOURNEY ════════════ */}
      <section className={styles.timeline}>
        <div className={styles.timelineInner}>
          <div className="sectionHeader">
            <span className="sectionHeader__eyebrow">
              {t("Our Journey", "আমাদের যাত্রা")}
            </span>
            <h2 className="sectionHeader__title">
              {t("How We Got Here", "আমরা কীভাবে এখানে এলাম")}
            </h2>
            <p className="sectionHeader__subtitle">
              {t(
                "From one idea to a growing neighbourhood brand.",
                "একটি ধারণা থেকে একটি ক্রমবর্ধমান প্রতিবেশী ব্র্যান্ড।",
              )}
            </p>
          </div>

          <div className={styles.timelineTrack}>
            {timeline.map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3 className={styles.timelineTitle}>
                    {t(item.title, item.titleBn)}
                  </h3>
                  <p className={styles.timelineDesc}>
                    {t(item.desc, item.descBn)}
                  </p>
                </div>
                <div className={styles.timelineDot}>{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TEAM ════════════ */}
      <section className={styles.team}>
        <div className={styles.teamInner}>
          <div className="sectionHeader">
            <span className="sectionHeader__eyebrow">
              {t("Meet The Team", "টিমের সাথে পরিচিত হন")}
            </span>
            <h2 className="sectionHeader__title">
              {t("The People Behind BD-MART", "BD-MART এর পেছনের মানুষ")}
            </h2>
            <p className="sectionHeader__subtitle">
              {t(
                "A small, dedicated team working to bring essentials closer to you.",
                "একটি ছোট, নিবেদিত টিম যারা আপনার কাছে প্রয়োজনীয় পণ্য পৌঁছে দিতে কাজ করছে।",
              )}
            </p>
          </div>

          <div className={styles.teamGrid}>
            {teamMembers.map((m, i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  <img src={m.image} alt="" />
                  <span className={styles.teamAvatarRing}>{m.icon}</span>
                </div>
                <div className={styles.teamBody}>
                  <h3 className={styles.teamName}>{t(m.name, m.nameBn)}</h3>
                  <span className={styles.teamRole}>{t(m.role, m.roleBn)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA BANNER ════════════ */}
      <CtaBanner id="experience" />
    </main>
  );
}
