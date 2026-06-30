// ============================================
// ctaConfig.ts — BD-MART
// Central registry for all CTA Banner content.
// Add a new banner once here, reuse it anywhere with <CtaBanner id="..." />
// ============================================

import { FiMapPin, FiPhone, FiTrendingUp } from "react-icons/fi";
import { FaWhatsapp, FaHandshake } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

export type CtaVariant = "dark" | "light" | "brand";

export interface CtaButtonConfig {
  label: string;
  labelBn: string;
  href: string;
  icon?: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "outline-white"
    | "accent"
    | "whatsapp"
    | "ghost";
  external?: boolean;
}

export interface CtaStatConfig {
  value: string;
  label: string;
  labelBn: string;
}

export interface CtaConfig {
  variant?: CtaVariant;
  compact?: boolean;
  badge?: { label: string; labelBn: string; icon?: React.ReactNode };
  title: { en: React.ReactNode; bn: React.ReactNode };
  subtitle?: { en: React.ReactNode; bn: React.ReactNode };
  stats?: CtaStatConfig[];
  buttons?: CtaButtonConfig[];
}

// Shared constants
const WHATSAPP_URL =
  "https://wa.me/+8801XXXXXXXXX?text=Hi%20BD-MART!%20I%27d%20like%20to%20place%20an%20order.";

// ─────────────────────────────────────────
// REGISTRY — add new banners here
// ─────────────────────────────────────────
export const ctaConfig = {
  // Used on: Home page
  outlet: {
    variant: "dark",
    title: {
      en: (
        <>
          <em>Find</em> Your Nearest BD-MART Outlet
        </>
      ),
      bn: (
        <>
          কাছের <em>BD-MART</em> শাখা খুঁজে নিন
        </>
      ),
    },
    subtitle: {
      en: "Multiple outlets across your area. Walk in, pick up, or order online — we're always near.",
      bn: "আপনার এলাকায় একাধিক শাখা। হেঁটে আসুন, পিকআপ করুন অথবা অনলাইনে অর্ডার দিন — আমরা সবসময় কাছে।",
    },
    buttons: [
      {
        label: "Find Outlet",
        labelBn: "শাখা খুঁজুন",
        href: "/outlets",
        icon: <FiMapPin />,
        variant: "accent",
      },
      {
        label: "Order Now",
        labelBn: "অর্ডার করুন",
        href: WHATSAPP_URL,
        icon: <FaWhatsapp />,
        variant: "whatsapp",
        external: true,
      },
    ],
  } satisfies CtaConfig,

  // Used on: About page
  experience: {
    variant: "dark",
    title: {
      en: (
        <>
          Experience <em>BD-MART</em> Near You Today
        </>
      ),
      bn: (
        <>
          আজই <em>BD-MART</em> এর অভিজ্ঞতা নিন
        </>
      ),
    },
    subtitle: {
      en: "Find your nearest outlet or place an order on WhatsApp — we're always close by.",
      bn: "আপনার কাছের আউটলেট খুঁজুন অথবা হোয়াটসঅ্যাপে অর্ডার দিন — আমরা সবসময় কাছেই।",
    },
    buttons: [
      {
        label: "Find Nearest Outlet",
        labelBn: "কাছের আউটলেট খুঁজুন",
        href: "/outlets",
        icon: <FiMapPin />,
        variant: "accent",
      },
      {
        label: "Chat on WhatsApp",
        labelBn: "হোয়াটসঅ্যাপে কথা বলুন",
        href: WHATSAPP_URL,
        icon: <FaWhatsapp />,
        variant: "whatsapp",
        external: true,
      },
    ],
  } satisfies CtaConfig,

  // Used on: Grocery / any product listing page
  whatsappOrder: {
    variant: "brand",
    compact: true,
    badge: {
      label: "Quick Order",
      labelBn: "দ্রুত অর্ডার",
      icon: <MdLocalOffer size={12} />,
    },
    title: {
      en: <>Can't Find What You Need?</>,
      bn: <>যা খুঁজছেন পাচ্ছেন না?</>,
    },
    subtitle: {
      en: "Message us on WhatsApp — we'll arrange it from the nearest outlet.",
      bn: "হোয়াটসঅ্যাপে মেসেজ করুন — আমরা কাছের শাখা থেকে ব্যবস্থা করব।",
    },
    buttons: [
      {
        label: "Order on WhatsApp",
        labelBn: "হোয়াটসঅ্যাপে অর্ডার করুন",
        href: WHATSAPP_URL,
        icon: <FaWhatsapp />,
        variant: "whatsapp",
        external: true,
      },
    ],
  } satisfies CtaConfig,

  // Used on: Franchise page
  franchise: {
    variant: "light",
    badge: {
      label: "Grow With Us",
      labelBn: "আমাদের সাথে বেড়ে উঠুন",
      icon: <FiTrendingUp size={12} />,
    },
    title: {
      en: (
        <>
          Become a <em>Franchise Partner</em>
        </>
      ),
      bn: (
        <>
          <em>ফ্রেঞ্চাইজি</em> পার্টনার হন
        </>
      ),
    },
    subtitle: {
      en: "Have a great location in your area? Join the BD-MART network today.",
      bn: "আপনার এলাকায় কি একটি ভালো লোকেশন আছে? আজই BD-MART নেটওয়ার্কে যোগ দিন।",
    },
    buttons: [
      {
        label: "Apply Now",
        labelBn: "আবেদন করুন",
        href: "/franchise#franchise-form",
        icon: <FaHandshake />,
        variant: "primary",
      },
      {
        label: "Call Us",
        labelBn: "কল করুন",
        href: "tel:+8801XXXXXXXXX",
        icon: <FiPhone />,
        variant: "outline",
      },
    ],
  } satisfies CtaConfig,

  // Used on: Outlets page
  callUs: {
    variant: "brand",
    title: {
      en: <>Need Help Finding a Store?</>,
      bn: <>দোকান খুঁজতে সাহায্য দরকার?</>,
    },
    subtitle: {
      en: "Our team is happy to help you locate the nearest BD-MART outlet.",
      bn: "আমাদের টিম আপনাকে কাছের BD-MART আউটলেট খুঁজে দিতে সাহায্য করবে।",
    },
    stats: [
      { value: "10+", label: "Outlets", labelBn: "আউটলেট" },
      { value: "7AM–11PM", label: "Daily", labelBn: "প্রতিদিন" },
    ],
    buttons: [
      {
        label: "Call Now",
        labelBn: "এখনই কল করুন",
        href: "tel:+8801XXXXXXXXX",
        icon: <FiPhone />,
        variant: "outline-white",
      },
      {
        label: "WhatsApp",
        labelBn: "হোয়াটসঅ্যাপ",
        href: WHATSAPP_URL,
        icon: <FaWhatsapp />,
        variant: "whatsapp",
        external: true,
      },
    ],
  } satisfies CtaConfig,
} as const;

export type CtaId = keyof typeof ctaConfig;
