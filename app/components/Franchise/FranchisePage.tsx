"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiChevronRight,
  FiMapPin,
  FiUser,
  FiPhone,
  FiMaximize2,
  FiCheckCircle,
  FiTrendingUp,
  FiShield,
  FiDollarSign,
  FiHeadphones,
  FiFileText,
  FiCheckSquare,
  FiAlertCircle,
  FiChevronDown,
  FiMessageSquare,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaStore,
  FaUsers,
  FaBuilding,
  FaHandshake,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import { CtaBanner } from "../CtaBanner";
import styles from "./FranchisePage.module.scss";
import "../../styles/common.scss";

const WHATSAPP =
  "https://wa.me/+8801XXXXXXXXX?text=Hi%20BD-MART!%20I%27m%20interested%20in%20franchise%20partnership.";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const benefits = [
  {
    icon: <FaStore />,
    title: "Proven Business Model",
    titleBn: "প্রমাণিত ব্যবসায়িক মডেল",
    desc: "A neighbourhood convenience format already working across multiple outlets.",
    descBn:
      "একটি প্রতিবেশী কনভেনিয়েন্স ফরম্যাট যা ইতিমধ্যে একাধিক আউটলেটে কাজ করছে।",
  },
  {
    icon: <FiHeadphones />,
    title: "Full Operational Support",
    titleBn: "সম্পূর্ণ অপারেশনাল সহায়তা",
    desc: "Setup guidance, supply chain access, and ongoing operational training.",
    descBn:
      "সেটআপ গাইডেন্স, সরবরাহ চেইন অ্যাক্সেস এবং চলমান অপারেশনাল প্রশিক্ষণ।",
  },
  {
    icon: <FiDollarSign />,
    title: "Low Entry Investment",
    titleBn: "কম প্রাথমিক বিনিয়োগ",
    desc: "Flexible partnership models designed for local entrepreneurs.",
    descBn: "স্থানীয় উদ্যোক্তাদের জন্য ডিজাইন করা নমনীয় অংশীদারিত্ব মডেল।",
  },
  {
    icon: <FiShield />,
    title: "Trusted Brand Identity",
    titleBn: "বিশ্বস্ত ব্র্যান্ড পরিচয়",
    desc: "Operate under a recognized, customer-trusted BD-MART brand name.",
    descBn: "একটি স্বীকৃত, গ্রাহক-বিশ্বস্ত BD-MART ব্র্যান্ড নামে কাজ করুন।",
  },
];

const lookingFor = [
  {
    icon: <FaBuilding />,
    title: "Commercial Spaces",
    titleBn: "বাণিজ্যিক স্থান",
    desc: "In busy local areas with good foot traffic and visibility.",
    descBn: "ভালো ফুট ট্রাফিক ও দৃশ্যমানতা সহ ব্যস্ত স্থানীয় এলাকায়।",
  },
  {
    icon: <FaStore />,
    title: "Retail Entrepreneurs",
    titleBn: "খুচরা ব্যবসায়ী উদ্যোক্তা",
    desc: "People with retail experience or a strong interest in running a shop.",
    descBn: "খুচরা অভিজ্ঞতা বা দোকান চালানোর প্রবল আগ্রহ আছে এমন মানুষ।",
  },
  {
    icon: <FaUsers />,
    title: "Community-Focused Partners",
    titleBn: "কমিউনিটি-কেন্দ্রিক অংশীদার",
    desc: "People who care about serving their own neighbourhood well.",
    descBn: "যারা নিজেদের প্রতিবেশীকে ভালোভাবে সেবা দিতে আগ্রহী।",
  },
];

const processSteps = [
  {
    title: "Apply Online",
    titleBn: "অনলাইনে আবেদন",
    desc: "Fill out the short franchise form below.",
    descBn: "নিচের সংক্ষিপ্ত ফ্রেঞ্চাইজি ফর্মটি পূরণ করুন।",
  },
  {
    title: "Site Review",
    titleBn: "সাইট পর্যালোচনা",
    desc: "Our team evaluates your proposed location.",
    descBn: "আমাদের টিম আপনার প্রস্তাবিত লোকেশন মূল্যায়ন করে।",
  },
  {
    title: "Agreement & Setup",
    titleBn: "চুক্তি ও সেটআপ",
    desc: "Finalize terms and prepare the outlet.",
    descBn: "শর্তাবলী চূড়ান্ত করুন এবং আউটলেট প্রস্তুত করুন।",
  },
  {
    title: "Launch & Support",
    titleBn: "লঞ্চ ও সহায়তা",
    desc: "Open your BD-MART with our continued support.",
    descBn: "আমাদের ক্রমাগত সহায়তায় আপনার BD-MART চালু করুন।",
  },
];

const requirements = [
  { en: "Full Name", bn: "পুরো নাম" },
  { en: "Phone Number", bn: "ফোন নম্বর" },
  { en: "Area / Location", bn: "এলাকা / লোকেশন" },
  { en: "Property Size", bn: "সম্পত্তির আকার" },
];

const faqs = [
  {
    q: "How much investment is required to open a BD-MART franchise?",
    qBn: "একটি BD-MART ফ্রেঞ্চাইজি খুলতে কত বিনিয়োগ প্রয়োজন?",
    a: "Investment varies based on location size and outlet format. After you apply, our team will share a detailed breakdown specific to your property during the site review stage.",
    aBn: "বিনিয়োগ লোকেশনের আকার ও আউটলেট ফরম্যাটের উপর নির্ভর করে। আবেদনের পর, সাইট পর্যালোচনার সময় আমাদের টিম আপনার সম্পত্তি অনুযায়ী বিস্তারিত বিবরণ জানাবে।",
  },
  {
    q: "What property size is ideal for a BD-MART outlet?",
    qBn: "একটি BD-MART আউটলেটের জন্য আদর্শ সম্পত্তির আকার কত?",
    a: "We typically look for spaces between 300–1000 sqft in busy local areas, though we evaluate each location individually based on layout and visibility.",
    aBn: "আমরা সাধারণত ব্যস্ত স্থানীয় এলাকায় ৩০০–১০০০ বর্গফুটের মধ্যে স্থান খুঁজি, তবে আমরা লেআউট ও দৃশ্যমানতার ভিত্তিতে প্রতিটি লোকেশন আলাদাভাবে মূল্যায়ন করি।",
  },
  {
    q: "Do I need prior retail experience?",
    qBn: "আমার কি পূর্ববর্তী খুচরা অভিজ্ঞতা দরকার?",
    a: "No prior experience is required. We provide full operational training and ongoing support to help you run your outlet successfully.",
    aBn: "পূর্ববর্তী অভিজ্ঞতার প্রয়োজন নেই। আমরা আপনার আউটলেট সফলভাবে চালাতে সম্পূর্ণ অপারেশনাল প্রশিক্ষণ ও চলমান সহায়তা প্রদান করি।",
  },
  {
    q: "How long does the application process take?",
    qBn: "আবেদন প্রক্রিয়া কতদিন সময় নেয়?",
    a: "After submitting your application, our team typically reaches out within 48 hours to begin the site review and discussion process.",
    aBn: "আবেদন জমা দেওয়ার পর, আমাদের টিম সাধারণত ৪৮ ঘন্টার মধ্যে যোগাযোগ করে সাইট পর্যালোচনা ও আলোচনা প্রক্রিয়া শুরু করে।",
  },
];

// ─────────────────────────────────────────
// FAQ ITEM
// ─────────────────────────────────────────
function FaqItem({
  q,
  a,
  t,
}: {
  q: { en: string; bn: string };
  a: { en: string; bn: string };
  t: (en: string, bn: string) => string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.open : ""}`}>
      <button
        className={styles.faqQuestion}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.faqQuestionText}>{t(q.en, q.bn)}</span>
        <span className={styles.faqToggleIcon}>
          <FiChevronDown />
        </span>
      </button>
      {open && <div className={styles.faqAnswer}>{t(a.en, a.bn)}</div>}
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
interface FormState {
  name: string;
  phone: string;
  area: string;
  propertySize: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  area: "",
  propertySize: "",
  message: "",
};

export default function FranchisePage() {
  const { t } = useApp();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = t("Name is required", "নাম আবশ্যক");
    if (!form.phone.trim()) {
      newErrors.phone = t("Phone number is required", "ফোন নম্বর আবশ্যক");
    } else if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = t(
        "Enter a valid phone number",
        "একটি বৈধ ফোন নম্বর লিখুন",
      );
    }
    if (!form.area.trim())
      newErrors.area = t(
        "Area / location is required",
        "এলাকা / লোকেশন আবশ্যক",
      );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // TODO: replace with real API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
    }, 900);
  };

  return (
    <main id="main-content">
      {/* ════════════ HERO ════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">{t("Home", "হোম")}</Link>
            <FiChevronRight />
            <span>
              {t(
                "Franchise / Location Partner",
                "ফ্রেঞ্চাইজি / লোকেশন পার্টনার",
              )}
            </span>
          </nav>

          <span className={styles.heroBadge}>
            <FiTrendingUp size={12} />
            {t(
              "Become a Franchise or Location Partner",
              "ফ্রেঞ্চাইজি বা লোকেশন পার্টনার হন",
            )}
          </span>

          <h1 className={styles.heroTitle}>
            {t("Grow With BD-MART", "BD-MART এর সাথে বেড়ে উঠুন")}
          </h1>

          <p className={styles.heroSubtitle}>
            {t(
              "Have a great location in your area? Join the BD-MART network and become part of a growing neighbourhood convenience brand.",
              "আপনার এলাকায় কি একটি ভালো লোকেশন আছে? BD-MART নেটওয়ার্কে যোগ দিন এবং একটি ক্রমবর্ধমান প্রতিবেশী কনভেনিয়েন্স ব্র্যান্ডের অংশ হয়ে উঠুন।",
            )}
          </p>

          <div className={styles.heroCtas}>
            <a href="#apply-form" className="btn btn--primary btn--lg">
              <FaHandshake />
              {t("Apply Now", "আবেদন করুন")}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline-white btn--lg"
            >
              <FaWhatsapp />
              {t("Ask on WhatsApp", "হোয়াটসঅ্যাপে জিজ্ঞাসা করুন")}
            </a>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>10+</strong>
              <span>{t("Outlets", "আউটলেট")}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.heroStat}>
              <strong>48h</strong>
              <span>{t("Response Time", "প্রতিক্রিয়া সময়")}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.heroStat}>
              <strong>2026</strong>
              <span>{t("Expanding", "সম্প্রসারণ")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ BENEFITS ════════════ */}
      <section className={styles.benefits}>
        <div className={styles.benefitsInner}>
          <div className="sectionHeader">
            <span className="sectionHeader__eyebrow">
              {t("Why Partner With Us", "কেন আমাদের সাথে অংশীদারিত্ব")}
            </span>
            <h2 className="sectionHeader__title">
              {t(
                "Benefits of a BD-MART Partnership",
                "BD-MART পার্টনারশিপের সুবিধা",
              )}
            </h2>
            <p className="sectionHeader__subtitle">
              {t(
                "Everything you need to run a successful neighbourhood outlet.",
                "একটি সফল প্রতিবেশী আউটলেট চালানোর জন্য প্রয়োজনীয় সবকিছু।",
              )}
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h3 className={styles.benefitTitle}>{t(b.title, b.titleBn)}</h3>
                <p className={styles.benefitText}>{t(b.desc, b.descBn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ WHO WE'RE LOOKING FOR ════════════ */}
      <section className={styles.lookingFor}>
        <div className={styles.lookingForGrid}>
          <div className={styles.lookingForVisual}>
            <img src="/images/bd-mart-store1.jpg" alt="" />
          </div>

          <div className={styles.lookingForContent}>
            <span className="sectionHeader__eyebrow">
              {t("We Are Looking For", "আমরা খুঁজছি")}
            </span>
            <h2
              className="sectionHeader__title"
              style={{ textAlign: "left", marginBottom: 0 }}
            >
              {t(
                "Is This Opportunity Right For You?",
                "এই সুযোগটি কি আপনার জন্য উপযুক্ত?",
              )}
            </h2>

            <div
              className={styles.lookingForList}
              style={{ marginTop: "var(--space-4)" }}
            >
              {lookingFor.map((item, i) => (
                <div key={i} className={styles.lookingForItem}>
                  <div className={styles.lookingForItemIcon}>{item.icon}</div>
                  <div className={styles.lookingForItemText}>
                    <strong>{t(item.title, item.titleBn)}</strong>
                    <span>{t(item.desc, item.descBn)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ PROCESS / STEPS ════════════ */}
      <section className={styles.process}>
        <div className={styles.processInner}>
          <div className="sectionHeader">
            <span className="sectionHeader__eyebrow">
              {t("How It Works", "এটি কীভাবে কাজ করে")}
            </span>
            <h2 className="sectionHeader__title">
              {t("Simple 4-Step Process", "সহজ ৪-ধাপের প্রক্রিয়া")}
            </h2>
            <p className="sectionHeader__subtitle">
              {t(
                "From application to opening your doors.",
                "আবেদন থেকে আপনার দরজা খোলা পর্যন্ত।",
              )}
            </p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step, i) => (
              <div key={i} className={styles.processStep}>
                <div className={styles.processNumber}>{i + 1}</div>
                <h3 className={styles.processTitle}>
                  {t(step.title, step.titleBn)}
                </h3>
                <p className={styles.processText}>
                  {t(step.desc, step.descBn)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ APPLY: REQUIREMENTS + FORM ════════════ */}
      <section className={styles.applySection} id="apply-form">
        <div className={styles.applyGrid}>
          {/* Left: Info */}
          <div className={styles.applyContent}>
            <h2 className={styles.applyTitle}>
              {t("Ready to Apply?", "আবেদন করতে প্রস্তুত?")}
            </h2>
            <p className={styles.applyText}>
              {t(
                "Fill out the form and our team will review your location and reach out within 48 hours to discuss next steps.",
                "ফর্মটি পূরণ করুন এবং আমাদের টিম আপনার লোকেশন পর্যালোচনা করে ৪৮ ঘন্টার মধ্যে পরবর্তী পদক্ষেপ নিয়ে আলোচনা করতে যোগাযোগ করবে।",
              )}
            </p>

            <div className={styles.requirementsBox}>
              <div className={styles.requirementsTitle}>
                <FiFileText />
                {t("Required Information", "প্রয়োজনীয় তথ্য")}
              </div>
              <div className={styles.requirementsList}>
                {requirements.map((req, i) => (
                  <div key={i} className={styles.requirementsItem}>
                    <FiCheckSquare />
                    {t(req.en, req.bn)}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.contactNote}>
              <FiMessageSquare />
              <span>
                {t("Prefer to talk directly? ", "সরাসরি কথা বলতে চান? ")}
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  {t(
                    "Message us on WhatsApp",
                    "হোয়াটসঅ্যাপে আমাদের মেসেজ করুন",
                  )}
                </a>
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <div className={styles.formIcon}>
                <FaHandshake />
              </div>
              <div>
                <div className={styles.formHeading}>
                  {t("Franchise Application", "ফ্রেঞ্চাইজি আবেদন")}
                </div>
                <div className={styles.formSub}>
                  {t("Takes less than 2 minutes", "২ মিনিটেরও কম সময় লাগে")}
                </div>
              </div>
            </div>

            {submitted ? (
              <div className={styles.formSuccessMsg}>
                <div className={styles.successIcon}>
                  <FiCheckCircle />
                </div>
                <h3 className={styles.successTitle}>
                  {t("Application Received!", "আবেদন গৃহীত হয়েছে!")}
                </h3>
                <p className={styles.successText}>
                  {t(
                    "Thank you for your interest in BD-MART. Our team will contact you within 48 hours to discuss next steps.",
                    "BD-MART এর প্রতি আগ্রহের জন্য ধন্যবাদ। আমাদের টিম ৪৮ ঘন্টার মধ্যে পরবর্তী পদক্ষেপ নিয়ে আলোচনা করতে আপনার সাথে যোগাযোগ করবে।",
                  )}
                </p>
                <button
                  className="btn btn--outline"
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: "var(--space-3)" }}
                >
                  {t("Submit Another Application", "আরেকটি আবেদন জমা দিন")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="fr-name">
                    <FiUser />
                    {t("Name", "নাম")}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="fr-name"
                    name="name"
                    type="text"
                    className={`${styles.formInput} ${errors.name ? styles.error : ""}`}
                    placeholder={t("Your full name", "আপনার পুরো নাম")}
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={styles.errorMsg}>
                      <FiAlertCircle size={12} />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="fr-phone">
                    <FiPhone />
                    {t("Phone Number", "ফোন নম্বর")}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="fr-phone"
                    name="phone"
                    type="tel"
                    className={`${styles.formInput} ${errors.phone ? styles.error : ""}`}
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className={styles.errorMsg}>
                      <FiAlertCircle size={12} />
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Area + Property Size */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="fr-area">
                      <FiMapPin />
                      {t("Area / Location", "এলাকা / লোকেশন")}
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="fr-area"
                      name="area"
                      type="text"
                      className={`${styles.formInput} ${errors.area ? styles.error : ""}`}
                      placeholder={t("e.g. Mirpur, Dhaka", "যেমন মিরপুর, ঢাকা")}
                      value={form.area}
                      onChange={handleChange}
                    />
                    {errors.area && (
                      <span className={styles.errorMsg}>
                        <FiAlertCircle size={12} />
                        {errors.area}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="fr-size">
                      <FiMaximize2 />
                      {t("Property Size", "সম্পত্তির আকার")}
                    </label>
                    <input
                      id="fr-size"
                      name="propertySize"
                      type="text"
                      className={styles.formInput}
                      placeholder={t("e.g. 800 sqft", "যেমন ৮০০ বর্গফুট")}
                      value={form.propertySize}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Message (optional) */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="fr-message">
                    <FiFileText />
                    {t("Additional Notes", "অতিরিক্ত নোট")}{" "}
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        fontWeight: 400,
                      }}
                    >
                      ({t("optional", "ঐচ্ছিক")})
                    </span>
                  </label>
                  <textarea
                    id="fr-message"
                    name="message"
                    className={styles.formTextarea}
                    placeholder={t(
                      "Tell us a bit about your location or business background…",
                      "আপনার লোকেশন বা ব্যবসায়িক পটভূমি সম্পর্কে কিছু বলুন…",
                    )}
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn--primary btn--lg ${styles.formSubmitBtn}`}
                  disabled={submitting}
                >
                  {submitting ? (
                    t("Submitting…", "জমা হচ্ছে…")
                  ) : (
                    <>
                      <FaHandshake />
                      {t("Apply Now", "আবেদন করুন")}
                    </>
                  )}
                </button>

                <p className={styles.formNote}>
                  <FiShield size={12} />
                  {t(
                    "Your information is kept confidential.",
                    "আপনার তথ্য গোপন রাখা হয়।",
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section className={styles.faq}>
        <div className={styles.faqInner}>
          <div className="sectionHeader">
            <span className="sectionHeader__eyebrow">
              {t("Got Questions", "প্রশ্ন আছে")}
            </span>
            <h2 className="sectionHeader__title">
              {t("Frequently Asked Questions", "সচরাচর জিজ্ঞাসিত প্রশ্ন")}
            </h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={{ en: faq.q, bn: faq.qBn }}
                a={{ en: faq.a, bn: faq.aBn }}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CLOSING CTA ════════════ */}
      <CtaBanner id="franchise" override={{ variant: "dark" }} />
    </main>
  );
}
