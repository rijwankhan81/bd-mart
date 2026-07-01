"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiChevronRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronDown,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiNavigation,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import styles from "./ContactPage.module.scss";
import "../../styles/common.scss";

const WHATSAPP =
  "https://wa.me/+8801XXXXXXXXX?text=Hi%20BD-MART!%20I%20have%20a%20question.";
const PHONE = "+8801XXXXXXXXX";
const EMAIL = "hello@bdmart.com.bd";
const MAP_URL = "https://maps.google.com/?q=BD-MART+Dhaka+Bangladesh";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const quickCards = [
  {
    icon: <FiPhone />,
    cls: "phone",
    label: "Call Us",
    labelBn: "কল করুন",
    value: PHONE,
    sub: "Mon–Sun, 7AM–11PM",
    subBn: "সোম–রবি, সকাল ৭টা–রাত ১১টা",
    href: `tel:${PHONE}`,
  },
  {
    icon: <FaWhatsapp />,
    cls: "whatsapp",
    label: "WhatsApp",
    labelBn: "হোয়াটসঅ্যাপ",
    value: PHONE,
    sub: "Fastest response",
    subBn: "দ্রুততম প্রতিক্রিয়া",
    href: WHATSAPP,
    external: true,
  },
  {
    icon: <FiMail />,
    cls: "email",
    label: "Email",
    labelBn: "ইমেইল",
    value: EMAIL,
    sub: "We reply within 24h",
    subBn: "২৪ ঘন্টার মধ্যে উত্তর দিই",
    href: `mailto:${EMAIL}`,
  },
  {
    icon: <FiMapPin />,
    cls: "location",
    label: "Head Office",
    labelBn: "প্রধান কার্যালয়",
    value: "Dhaka, Bangladesh",
    sub: "Find on map below",
    subBn: "নিচে মানচিত্রে দেখুন",
    href: "#map",
  },
];

const subjects = [
  { value: "general", label: "General Inquiry", labelBn: "সাধারণ জিজ্ঞাসা" },
  {
    value: "order",
    label: "Order / Delivery Issue",
    labelBn: "অর্ডার / ডেলিভারি সমস্যা",
  },
  {
    value: "product",
    label: "Product Question",
    labelBn: "পণ্য সম্পর্কিত প্রশ্ন",
  },
  {
    value: "franchise",
    label: "Franchise Inquiry",
    labelBn: "ফ্রেঞ্চাইজি জিজ্ঞাসা",
  },
  {
    value: "feedback",
    label: "Feedback / Complaint",
    labelBn: "মতামত / অভিযোগ",
  },
  { value: "other", label: "Other", labelBn: "অন্যান্য" },
];

const faqs = [
  {
    q: "What are BD-MART's operating hours?",
    qBn: "BD-MART এর কার্যক্রমের সময় কী?",
    a: "Most BD-MART outlets are open daily from 7AM to 11PM, including weekends and most holidays. Hours may vary slightly by location.",
    aBn: "বেশিরভাগ BD-MART আউটলেট সপ্তাহান্ত ও বেশিরভাগ ছুটির দিন সহ প্রতিদিন সকাল ৭টা থেকে রাত ১১টা পর্যন্ত খোলা থাকে। লোকেশন অনুযায়ী সময় কিছুটা ভিন্ন হতে পারে।",
  },
  {
    q: "How do I place an order for home delivery?",
    qBn: "হোম ডেলিভারির জন্য কীভাবে অর্ডার দেব?",
    a: "Simply message us on WhatsApp with your order list and address. We deliver within nearby areas around each outlet.",
    aBn: "শুধু হোয়াটসঅ্যাপে আপনার অর্ডার তালিকা ও ঠিকানা মেসেজ করুন। আমরা প্রতিটি আউটলেটের আশেপাশের এলাকায় ডেলিভারি করি।",
  },
  {
    q: "Can I track my order?",
    qBn: "আমি কি আমার অর্ডার ট্র্যাক করতে পারি?",
    a: "Currently orders are coordinated directly through WhatsApp. Our upcoming BD-ONE app will include full order tracking.",
    aBn: "বর্তমানে অর্ডারগুলো সরাসরি হোয়াটসঅ্যাপের মাধ্যমে সমন্বিত হয়। আমাদের আসন্ন BD-ONE অ্যাপে সম্পূর্ণ অর্ডার ট্র্যাকিং থাকবে।",
  },
  {
    q: "How can I report an issue with my order?",
    qBn: "আমার অর্ডারে সমস্যা হলে কীভাবে রিপোর্ট করব?",
    a: 'Use the contact form on this page and select "Order / Delivery Issue", or message us directly on WhatsApp for the fastest help.',
    aBn: 'এই পেজের যোগাযোগ ফর্ম ব্যবহার করুন এবং "অর্ডার / ডেলিভারি সমস্যা" নির্বাচন করুন, অথবা দ্রুততম সাহায্যের জন্য সরাসরি হোয়াটসঅ্যাপে মেসেজ করুন।',
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
// FORM STATE
// ─────────────────────────────────────────
interface FormState {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  subject: "general",
  message: "",
};

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
export default function ContactPage() {
  const { t } = useApp();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = t(
        "Enter a valid email address",
        "একটি বৈধ ইমেইল ঠিকানা লিখুন",
      );
    }

    if (!form.message.trim()) {
      newErrors.message = t("Message is required", "বার্তা আবশ্যক");
    } else if (form.message.trim().length < 10) {
      newErrors.message = t(
        "Message should be at least 10 characters",
        "বার্তা অন্তত ১০ অক্ষরের হতে হবে",
      );
    }

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
            <span>{t("Contact", "যোগাযোগ")}</span>
          </nav>

          <span className={styles.heroBadge}>
            <FiMessageSquare size={12} />
            {t("Get In Touch", "যোগাযোগ করুন")}
          </span>

          <h1 className={styles.heroTitle}>
            {t("We are Here to Help", "আমরা সাহায্য করতে আছি")}
          </h1>

          <p className={styles.heroSubtitle}>
            {t(
              "Questions, feedback, or need support? Reach out and our team will respond quickly.",
              "প্রশ্ন, মতামত, বা সহায়তা দরকার? যোগাযোগ করুন এবং আমাদের টিম দ্রুত উত্তর দেবে।",
            )}
          </p>
        </div>
      </section>

      {/* ════════════ QUICK CONTACT CARDS ════════════ */}
      <section className={styles.quickStrip}>
        <div className={styles.quickGrid}>
          {quickCards.map((card, i) => (
            <a
              key={i}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              className={styles.quickCard}
            >
              <div className={`${styles.quickIcon} ${styles[card.cls]}`}>
                {card.icon}
              </div>
              <span className={styles.quickLabel}>
                {t(card.label, card.labelBn)}
              </span>
              <span className={styles.quickValue}>{card.value}</span>
              <span className={styles.quickSub}>{t(card.sub, card.subBn)}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ════════════ FORM + INFO ════════════ */}
      <section className={styles.main}>
        <div className={styles.mainGrid}>
          {/* ---- FORM ---- */}
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.formSuccessMsg}>
                <div className={styles.successIcon}>
                  <FiCheckCircle />
                </div>
                <h3 className={styles.successTitle}>
                  {t("Message Sent!", "বার্তা পাঠানো হয়েছে!")}
                </h3>
                <p className={styles.successText}>
                  {t(
                    "Thank you for reaching out. Our team will get back to you within 24 hours.",
                    "যোগাযোগ করার জন্য ধন্যবাদ। আমাদের টিম ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে।",
                  )}
                </p>
                <button
                  className="btn btn--outline"
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: "var(--space-3)" }}
                >
                  {t("Send Another Message", "আরেকটি বার্তা পাঠান")}
                </button>
              </div>
            ) : (
              <>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>
                    {t("Send Us a Message", "আমাদের বার্তা পাঠান")}
                  </h2>
                  <p className={styles.formSubtitle}>
                    {t(
                      "Fill out the form below and we'll respond as soon as possible.",
                      "নিচের ফর্মটি পূরণ করুন এবং আমরা যত দ্রুত সম্ভব উত্তর দেব।",
                    )}
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Name + Phone */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="ct-name">
                        <FiUser />
                        {t("Name", "নাম")}
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="ct-name"
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

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="ct-phone">
                        <FiPhone />
                        {t("Phone Number", "ফোন নম্বর")}
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="ct-phone"
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
                  </div>

                  {/* Email */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="ct-email">
                      <FiMail />
                      {t("Email", "ইমেইল")}{" "}
                      <span
                        style={{
                          color: "var(--color-text-muted)",
                          fontWeight: 400,
                        }}
                      >
                        ({t("optional", "ঐচ্ছিক")})
                      </span>
                    </label>
                    <input
                      id="ct-email"
                      name="email"
                      type="email"
                      className={`${styles.formInput} ${errors.email ? styles.error : ""}`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className={styles.errorMsg}>
                        <FiAlertCircle size={12} />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Subject */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="ct-subject">
                      <FiMessageSquare />
                      {t("Subject", "বিষয়")}
                    </label>
                    <select
                      id="ct-subject"
                      name="subject"
                      className={styles.formSelect}
                      value={form.subject}
                      onChange={handleChange}
                    >
                      {subjects.map((s) => (
                        <option key={s.value} value={s.value}>
                          {t(s.label, s.labelBn)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="ct-message">
                      <FiMessageSquare />
                      {t("Message", "বার্তা")}
                      <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="ct-message"
                      name="message"
                      className={`${styles.formTextarea} ${errors.message ? styles.error : ""}`}
                      placeholder={t(
                        "How can we help you?",
                        "আমরা আপনাকে কীভাবে সাহায্য করতে পারি?",
                      )}
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <span className={styles.errorMsg}>
                        <FiAlertCircle size={12} />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`btn btn--primary btn--lg ${styles.formSubmitBtn}`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      t("Sending…", "পাঠানো হচ্ছে…")
                    ) : (
                      <>
                        <FiSend />
                        {t("Send Message", "বার্তা পাঠান")}
                      </>
                    )}
                  </button>

                  <p className={styles.formNote}>
                    <FiCheckCircle size={12} />
                    {t(
                      "We typically respond within 24 hours.",
                      "আমরা সাধারণত ২৪ ঘন্টার মধ্যে উত্তর দিই।",
                    )}
                  </p>
                </form>
              </>
            )}
          </div>

          {/* ---- INFO COLUMN ---- */}
          <div className={styles.infoCol}>
            {/* Contact Info Card */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardTitle}>
                <FiPhone />
                {t("Contact Information", "যোগাযোগের তথ্য")}
              </div>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FiPhone />
                  </div>
                  <div className={styles.infoText}>
                    <strong>{t("Phone", "ফোন")}</strong>
                    <a href={`tel:${PHONE}`}>{PHONE}</a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FiMail />
                  </div>
                  <div className={styles.infoText}>
                    <strong>{t("Email", "ইমেইল")}</strong>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FiMapPin />
                  </div>
                  <div className={styles.infoText}>
                    <strong>{t("Head Office", "প্রধান কার্যালয়")}</strong>
                    <span>{t("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ")}</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FiClock />
                  </div>
                  <div className={styles.infoText}>
                    <strong>{t("Opening Hours", "খোলার সময়")}</strong>
                    <span>
                      {t("7AM – 11PM Daily", "প্রতিদিন সকাল ৭টা – রাত ১১টা")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Highlight */}
            <div className={styles.whatsappCard}>
              <div className={styles.whatsappIcon}>
                <FaWhatsapp />
              </div>
              <h3 className={styles.whatsappTitle}>
                {t("Prefer WhatsApp?", "হোয়াটসঅ্যাপ পছন্দ করেন?")}
              </h3>
              <p className={styles.whatsappText}>
                {t(
                  "Get the fastest response by messaging us directly.",
                  "সরাসরি মেসেজ করে দ্রুততম উত্তর পান।",
                )}
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
              >
                <FaWhatsapp />
                {t("Chat Now", "এখনই চ্যাট করুন")}
              </a>
            </div>

            {/* Social */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardTitle}>
                {t("Follow Us", "আমাদের অনুসরণ করুন")}
              </div>
              <div className={styles.socialRow}>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ MAP ════════════ */}
      <section className={styles.mapSection} id="map">
        <div className={styles.mapInner}>
          <div
            className="sectionHeader"
            style={{ marginBottom: "var(--space-8)" }}
          >
            <span className="sectionHeader__eyebrow">
              {t("Visit Us", "আমাদের সাথে দেখা করুন")}
            </span>
            <h2 className="sectionHeader__title">
              {t(
                "Our Head Office Location",
                "আমাদের প্রধান কার্যালয়ের অবস্থান",
              )}
            </h2>
          </div>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapFrame}
          >
            <FiNavigation className={styles.mapPlaceholderIcon} />
            <p className={styles.mapPlaceholderText}>
              {t(
                "Click to open in Google Maps",
                "গুগল ম্যাপে খুলতে ক্লিক করুন",
              )}
            </p>

            <div className={styles.mapOverlay}>
              <div className={styles.mapOverlayIcon}>
                <FiMapPin />
              </div>
              <div className={styles.mapOverlayText}>
                <strong>
                  {t("BD-MART Head Office", "BD-MART প্রধান কার্যালয়")}
                </strong>
                <span>{t("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ")}</span>
              </div>
            </div>
          </a>
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
    </main>
  );
}
