"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiX,
  FiGrid,
  FiList,
  FiChevronRight,
  FiChevronDown,
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiSliders,
  FiTag,
  FiPackage,
  FiRefreshCw,
} from "react-icons/fi";
import { FaWhatsapp, FaFire } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { useApp } from "../../context/AppContext";
import styles from "./GroceryPage.module.scss";
import "../../styles/common.scss";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
interface Product {
  id: number;
  emoji: string;
  name: string;
  nameBn: string;
  category: string;
  categoryBn: string;
  unit: string;
  unitBn: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: "new" | "best" | "off";
  offPercent?: number;
  inStock: boolean;
}

type ViewMode = "grid" | "list";
type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "name";

// ─────────────────────────────────────────
// PRODUCT DATA
// ─────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    emoji: "🌾",
    name: "Minket Rice 5kg",
    nameBn: "মিনিকেট চাল ৫ কেজি",
    category: "Rice & Flour",
    categoryBn: "চাল ও আটা",
    unit: "5 kg",
    unitBn: "৫ কেজি",
    price: 320,
    oldPrice: 370,
    rating: 4.8,
    reviews: 124,
    badge: "best",
    offPercent: 14,
    inStock: true,
  },
  {
    id: 2,
    emoji: "🌾",
    name: "Atap Rice 5kg",
    nameBn: "আতপ চাল ৫ কেজি",
    category: "Rice & Flour",
    categoryBn: "চাল ও আটা",
    unit: "5 kg",
    unitBn: "৫ কেজি",
    price: 290,
    rating: 4.5,
    reviews: 88,
    inStock: true,
  },
  {
    id: 3,
    emoji: "🫙",
    name: "Wheat Flour 2kg",
    nameBn: "গমের আটা ২ কেজি",
    category: "Rice & Flour",
    categoryBn: "চাল ও আটা",
    unit: "2 kg",
    unitBn: "২ কেজি",
    price: 110,
    oldPrice: 130,
    rating: 4.6,
    reviews: 65,
    badge: "off",
    offPercent: 15,
    inStock: true,
  },
  {
    id: 4,
    emoji: "🧅",
    name: "Onion 1kg",
    nameBn: "পেঁয়াজ ১ কেজি",
    category: "Vegetables",
    categoryBn: "সবজি",
    unit: "1 kg",
    unitBn: "১ কেজি",
    price: 55,
    rating: 4.3,
    reviews: 210,
    badge: "new",
    inStock: true,
  },
  {
    id: 5,
    emoji: "🧄",
    name: "Garlic 250g",
    nameBn: "রসুন ২৫০ গ্রাম",
    category: "Vegetables",
    categoryBn: "সবজি",
    unit: "250 g",
    unitBn: "২৫০ গ্রাম",
    price: 40,
    rating: 4.4,
    reviews: 98,
    inStock: true,
  },
  {
    id: 6,
    emoji: "🥔",
    name: "Potato 2kg",
    nameBn: "আলু ২ কেজি",
    category: "Vegetables",
    categoryBn: "সবজি",
    unit: "2 kg",
    unitBn: "২ কেজি",
    price: 70,
    rating: 4.2,
    reviews: 176,
    inStock: true,
  },
  {
    id: 7,
    emoji: "🥛",
    name: "Fresh Milk 1L",
    nameBn: "তাজা দুধ ১ লিটার",
    category: "Dairy & Eggs",
    categoryBn: "দুগ্ধজাত ও ডিম",
    unit: "1 L",
    unitBn: "১ লিটার",
    price: 75,
    oldPrice: 85,
    rating: 4.9,
    reviews: 302,
    badge: "best",
    offPercent: 12,
    inStock: true,
  },
  {
    id: 8,
    emoji: "🥚",
    name: "Farm Eggs 12pcs",
    nameBn: "ফার্ম ডিম ১২ পিস",
    category: "Dairy & Eggs",
    categoryBn: "দুগ্ধজাত ও ডিম",
    unit: "12 pcs",
    unitBn: "১২ পিস",
    price: 130,
    oldPrice: 150,
    rating: 4.7,
    reviews: 189,
    badge: "off",
    offPercent: 13,
    inStock: true,
  },
  {
    id: 9,
    emoji: "🧈",
    name: "Fresh Butter 200g",
    nameBn: "তাজা মাখন ২০০ গ্রাম",
    category: "Dairy & Eggs",
    categoryBn: "দুগ্ধজাত ও ডিম",
    unit: "200 g",
    unitBn: "২০০ গ্রাম",
    price: 90,
    rating: 4.5,
    reviews: 54,
    badge: "new",
    inStock: true,
  },
  {
    id: 10,
    emoji: "🫒",
    name: "Soybean Oil 2L",
    nameBn: "সয়াবিন তেল ২ লিটার",
    category: "Oil & Spices",
    categoryBn: "তেল ও মশলা",
    unit: "2 L",
    unitBn: "২ লিটার",
    price: 280,
    oldPrice: 320,
    rating: 4.6,
    reviews: 145,
    badge: "off",
    offPercent: 13,
    inStock: true,
  },
  {
    id: 11,
    emoji: "🌶️",
    name: "Red Chili Powder 100g",
    nameBn: "লাল মরিচের গুঁড়া ১০০ গ্রাম",
    category: "Oil & Spices",
    categoryBn: "তেল ও মশলা",
    unit: "100 g",
    unitBn: "১০০ গ্রাম",
    price: 45,
    rating: 4.4,
    reviews: 77,
    inStock: true,
  },
  {
    id: 12,
    emoji: "🟡",
    name: "Turmeric Powder 100g",
    nameBn: "হলুদের গুঁড়া ১০০ গ্রাম",
    category: "Oil & Spices",
    categoryBn: "তেল ও মশলা",
    unit: "100 g",
    unitBn: "১০০ গ্রাম",
    price: 35,
    rating: 4.3,
    reviews: 61,
    inStock: false,
  },
  {
    id: 13,
    emoji: "🍬",
    name: "Sugar 1kg",
    nameBn: "চিনি ১ কেজি",
    category: "Sugar & Salt",
    categoryBn: "চিনি ও লবণ",
    unit: "1 kg",
    unitBn: "১ কেজি",
    price: 80,
    rating: 4.5,
    reviews: 95,
    inStock: true,
  },
  {
    id: 14,
    emoji: "🧂",
    name: "Iodized Salt 1kg",
    nameBn: "আয়োডাইজড লবণ ১ কেজি",
    category: "Sugar & Salt",
    categoryBn: "চিনি ও লবণ",
    unit: "1 kg",
    unitBn: "১ কেজি",
    price: 25,
    rating: 4.2,
    reviews: 112,
    inStock: true,
  },
  {
    id: 15,
    emoji: "🍅",
    name: "Tomato Ketchup 400g",
    nameBn: "টমেটো কেচাপ ৪০০ গ্রাম",
    category: "Sauces & Canned",
    categoryBn: "সস ও টিনজাত",
    unit: "400 g",
    unitBn: "৪০০ গ্রাম",
    price: 95,
    oldPrice: 110,
    rating: 4.6,
    reviews: 83,
    badge: "off",
    offPercent: 14,
    inStock: true,
  },
  {
    id: 16,
    emoji: "🥫",
    name: "Canned Tuna 185g",
    nameBn: "টুনা ফিশ ক্যান ১৮৫ গ্রাম",
    category: "Sauces & Canned",
    categoryBn: "সস ও টিনজাত",
    unit: "185 g",
    unitBn: "১৮৫ গ্রাম",
    price: 120,
    rating: 4.4,
    reviews: 48,
    badge: "new",
    inStock: true,
  },
  {
    id: 17,
    emoji: "🍵",
    name: "Tea Dust 200g",
    nameBn: "চা পাতা ২০০ গ্রাম",
    category: "Tea & Coffee",
    categoryBn: "চা ও কফি",
    unit: "200 g",
    unitBn: "২০০ গ্রাম",
    price: 85,
    oldPrice: 100,
    rating: 4.8,
    reviews: 230,
    badge: "best",
    offPercent: 15,
    inStock: true,
  },
  {
    id: 18,
    emoji: "☕",
    name: "Instant Coffee 100g",
    nameBn: "ইনস্ট্যান্ট কফি ১০০ গ্রাম",
    category: "Tea & Coffee",
    categoryBn: "চা ও কফি",
    unit: "100 g",
    unitBn: "১০০ গ্রাম",
    price: 150,
    rating: 4.5,
    reviews: 67,
    inStock: true,
  },
  {
    id: 19,
    emoji: "🍝",
    name: "Spaghetti 400g",
    nameBn: "স্প্যাগেটি ৪০০ গ্রাম",
    category: "Noodles & Pasta",
    categoryBn: "নুডলস ও পাস্তা",
    unit: "400 g",
    unitBn: "৪০০ গ্রাম",
    price: 60,
    rating: 4.3,
    reviews: 42,
    badge: "new",
    inStock: true,
  },
  {
    id: 20,
    emoji: "🍜",
    name: "Instant Noodles 5pk",
    nameBn: "ইনস্ট্যান্ট নুডলস ৫ প্যাক",
    category: "Noodles & Pasta",
    categoryBn: "নুডলস ও পাস্তা",
    unit: "5 pack",
    unitBn: "৫ প্যাক",
    price: 75,
    oldPrice: 90,
    rating: 4.6,
    reviews: 155,
    badge: "off",
    offPercent: 17,
    inStock: true,
  },
];

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const CATEGORIES = [
  {
    label: "All Products",
    labelBn: "সব পণ্য",
    emoji: "🛒",
    count: PRODUCTS.length,
  },
  {
    label: "Rice & Flour",
    labelBn: "চাল ও আটা",
    emoji: "🌾",
    count: PRODUCTS.filter((p) => p.category === "Rice & Flour").length,
  },
  {
    label: "Vegetables",
    labelBn: "সবজি",
    emoji: "🧅",
    count: PRODUCTS.filter((p) => p.category === "Vegetables").length,
  },
  {
    label: "Dairy & Eggs",
    labelBn: "দুগ্ধজাত ও ডিম",
    emoji: "🥛",
    count: PRODUCTS.filter((p) => p.category === "Dairy & Eggs").length,
  },
  {
    label: "Oil & Spices",
    labelBn: "তেল ও মশলা",
    emoji: "🫒",
    count: PRODUCTS.filter((p) => p.category === "Oil & Spices").length,
  },
  {
    label: "Sugar & Salt",
    labelBn: "চিনি ও লবণ",
    emoji: "🍬",
    count: PRODUCTS.filter((p) => p.category === "Sugar & Salt").length,
  },
  {
    label: "Sauces & Canned",
    labelBn: "সস ও টিনজাত",
    emoji: "🍅",
    count: PRODUCTS.filter((p) => p.category === "Sauces & Canned").length,
  },
  {
    label: "Tea & Coffee",
    labelBn: "চা ও কফি",
    emoji: "🍵",
    count: PRODUCTS.filter((p) => p.category === "Tea & Coffee").length,
  },
  {
    label: "Noodles & Pasta",
    labelBn: "নুডলস ও পাস্তা",
    emoji: "🍝",
    count: PRODUCTS.filter((p) => p.category === "Noodles & Pasta").length,
  },
];

const SORT_OPTIONS: { value: SortKey; label: string; labelBn: string }[] = [
  { value: "default", label: "Default", labelBn: "ডিফল্ট" },
  { value: "price-asc", label: "Price: Low → High", labelBn: "দাম: কম → বেশি" },
  {
    value: "price-desc",
    label: "Price: High → Low",
    labelBn: "দাম: বেশি → কম",
  },
  { value: "rating", label: "Top Rated", labelBn: "সেরা রেটিং" },
  { value: "name", label: "Name A → Z", labelBn: "নাম অ → জ" },
];

const WHATSAPP =
  "https://wa.me/+8801XXXXXXXXX?text=Hi%20BD-MART!%20I%20want%20to%20order%20grocery%20items.";

// ─────────────────────────────────────────
// STAR RENDERER
// ─────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <FiStar
          key={i}
          style={{ fill: i <= Math.round(rating) ? "currentColor" : "none" }}
        />
      ))}
    </span>
  );
}

// ─────────────────────────────────────────
// FILTER PANEL (reused in sidebar + drawer)
// ─────────────────────────────────────────
interface FilterPanelProps {
  t: (en: string, bn: string) => string;
  selectedCat: string;
  onCatChange: (cat: string) => void;
  maxPrice: number;
  onMaxPriceChange: (v: number) => void;
  onlyOffers: boolean;
  onOnlyOffersChange: (v: boolean) => void;
  onlyInStock: boolean;
  onOnlyInStockChange: (v: boolean) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

function FilterPanel({
  t,
  selectedCat,
  onCatChange,
  maxPrice,
  onMaxPriceChange,
  onlyOffers,
  onOnlyOffersChange,
  onlyInStock,
  onOnlyInStockChange,
  onClearAll,
  activeFilterCount,
}: FilterPanelProps) {
  const [catOpen, setCatOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [moreOpen, setMoreOpen] = useState(true);

  return (
    <>
      {/* Category */}
      <div className={styles.filterCard}>
        <div
          className={styles.filterCardHeader}
          onClick={() => setCatOpen((o) => !o)}
        >
          <span className={styles.filterCardTitle}>
            <FiPackage />
            {t("Category", "বিভাগ")}
          </span>
          <FiChevronDown
            className={`${styles.filterCardToggle} ${catOpen ? styles.open : ""}`}
          />
        </div>
        {catOpen && (
          <div className={styles.filterCardBody}>
            <div className={styles.categoryPills}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  className={`${styles.categoryPill} ${selectedCat === cat.label ? styles.active : ""}`}
                  onClick={() => onCatChange(cat.label)}
                >
                  <span className={styles.pillLeft}>
                    <span>{cat.emoji}</span>
                    <span>{t(cat.label, cat.labelBn)}</span>
                  </span>
                  <span className={styles.pillCount}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className={styles.filterCard}>
        <div
          className={styles.filterCardHeader}
          onClick={() => setPriceOpen((o) => !o)}
        >
          <span className={styles.filterCardTitle}>
            <FiTag />
            {t("Price Range", "মূল্য পরিসর")}
          </span>
          <FiChevronDown
            className={`${styles.filterCardToggle} ${priceOpen ? styles.open : ""}`}
          />
        </div>
        {priceOpen && (
          <div className={styles.filterCardBody}>
            <div className={styles.priceRange}>
              <input
                type="range"
                min={25}
                max={400}
                step={5}
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                className={styles.rangeSlider}
              />
              <div className={styles.rangeLabels}>
                <span>৳ 0</span>
                <span
                  style={{ color: "var(--color-primary)", fontWeight: 700 }}
                >
                  ৳ {maxPrice}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* More Filters */}
      <div className={styles.filterCard}>
        <div
          className={styles.filterCardHeader}
          onClick={() => setMoreOpen((o) => !o)}
        >
          <span className={styles.filterCardTitle}>
            <FiSliders />
            {t("More Filters", "আরও ফিল্টার")}
          </span>
          <FiChevronDown
            className={`${styles.filterCardToggle} ${moreOpen ? styles.open : ""}`}
          />
        </div>
        {moreOpen && (
          <div className={styles.filterCardBody}>
            <div className={styles.checkList}>
              <label className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={onlyOffers}
                  onChange={(e) => onOnlyOffersChange(e.target.checked)}
                />
                {t("On Sale / Offers Only", "শুধু অফার পণ্য")}
              </label>
              <label className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => onOnlyInStockChange(e.target.checked)}
                />
                {t("In Stock Only", "শুধু স্টকে আছে")}
              </label>
            </div>
          </div>
        )}
      </div>

      {activeFilterCount > 0 && (
        <button className={styles.filterClearBtn} onClick={onClearAll}>
          <FiRefreshCw style={{ marginRight: 6 }} />
          {t("Clear All Filters", "সব ফিল্টার মুছুন")} ({activeFilterCount})
        </button>
      )}
    </>
  );
}

// ─────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  view: ViewMode;
  t: (en: string, bn: string) => string;
}

function ProductCard({ product: p, view, t }: ProductCardProps) {
  const [qty, setQty] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = () => setQty(1);
  const handleInc = () => setQty((q) => q + 1);
  const handleDec = () => setQty((q) => Math.max(0, q - 1));

  return (
    <div className={styles.productCard}>
      {/* Image area */}
      <div className={styles.productCardImg}>
        <div className={styles.productEmoji}>{p.emoji}</div>

        {/* Badges */}
        <div className={styles.productBadges}>
          {p.badge === "off" && p.offPercent && (
            <span className={styles.badgeOff}>{p.offPercent}% OFF</span>
          )}
          {p.badge === "new" && (
            <span className={styles.badgeNew}>{t("NEW", "নতুন")}</span>
          )}
          {p.badge === "best" && (
            <span className={styles.badgeBest}>{t("BEST", "সেরা")}</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ""}`}
          onClick={() => setWishlisted((w) => !w)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart style={{ fill: wishlisted ? "currentColor" : "none" }} />
        </button>

        {/* Hover cart btn — only in grid & in stock */}
        {p.inStock && view === "grid" && qty === 0 && (
          <button className={styles.addToCartBtn} onClick={handleAdd}>
            <FiShoppingCart size={14} />
            {t("Add to Cart", "কার্টে যোগ করুন")}
          </button>
        )}
      </div>

      {/* Body */}
      <div className={styles.productCardBody}>
        <span className={styles.productCategory}>
          {t(p.category, p.categoryBn)}
        </span>
        <h3 className={styles.productName}>{t(p.name, p.nameBn)}</h3>
        <span className={styles.productUnit}>{t(p.unit, p.unitBn)}</span>

        <div className={styles.productRating}>
          <Stars rating={p.rating} />
          <span>{p.rating}</span>
          <span>({p.reviews})</span>
        </div>

        <div className={styles.productPriceRow}>
          <div className={styles.priceBlock}>
            <span className={styles.priceNew}>৳ {p.price}</span>
            {p.oldPrice && (
              <span className={styles.priceOld}>৳ {p.oldPrice}</span>
            )}
          </div>

          {!p.inStock ? (
            <span
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-error)",
                fontWeight: 600,
              }}
            >
              {t("Out of Stock", "স্টক নেই")}
            </span>
          ) : qty === 0 ? (
            view === "list" ? (
              <button
                className={`${styles.addToCartBtn}`}
                onClick={handleAdd}
                style={{
                  position: "static",
                  opacity: 1,
                  transform: "none",
                  borderRadius: "var(--radius-md)",
                  padding: "0.45rem 1rem",
                }}
              >
                <FiShoppingCart size={14} />
                {t("Add", "যোগ করুন")}
              </button>
            ) : null
          ) : (
            <div className={styles.qtyControl}>
              <button
                className={styles.qtyBtn}
                onClick={handleDec}
                disabled={qty === 0}
              >
                −
              </button>
              <span className={styles.qtyValue}>{qty}</span>
              <button className={styles.qtyBtn} onClick={handleInc}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────
const PAGE_SIZE = 12;

export default function GroceryPage() {
  const { t, lang } = useApp();

  // Filter / sort state
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All Products");
  const [maxPrice, setMaxPrice] = useState(400);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Active filter count (excluding search)
  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (selectedCat !== "All Products") n++;
    if (maxPrice < 400) n++;
    if (onlyOffers) n++;
    if (onlyInStock) n++;
    return n;
  }, [selectedCat, maxPrice, onlyOffers, onlyInStock]);

  const clearAll = () => {
    setSelectedCat("All Products");
    setMaxPrice(400);
    setOnlyOffers(false);
    setOnlyInStock(false);
    setSearch("");
  };

  // Filtered + sorted products
  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameBn.includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    if (selectedCat !== "All Products") {
      list = list.filter((p) => p.category === selectedCat);
    }
    if (maxPrice < 400) {
      list = list.filter((p) => p.price <= maxPrice);
    }
    if (onlyOffers) list = list.filter((p) => !!p.oldPrice);
    if (onlyInStock) list = list.filter((p) => p.inStock);

    switch (sortKey) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [search, selectedCat, maxPrice, onlyOffers, onlyInStock, sortKey]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count on filter change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, selectedCat, maxPrice, onlyOffers, onlyInStock, sortKey]);

  // Active filter tags for toolbar display
  const activeTagLabels: string[] = [];
  if (selectedCat !== "All Products")
    activeTagLabels.push(
      lang === "bn"
        ? (CATEGORIES.find((c) => c.label === selectedCat)?.labelBn ??
            selectedCat)
        : selectedCat,
    );
  if (maxPrice < 400) activeTagLabels.push(`৳ ≤ ${maxPrice}`);
  if (onlyOffers) activeTagLabels.push(t("On Sale", "অফার"));
  if (onlyInStock) activeTagLabels.push(t("In Stock", "স্টকে আছে"));

  const filterProps = {
    t,
    selectedCat,
    onCatChange: setSelectedCat,
    maxPrice,
    onMaxPriceChange: setMaxPrice,
    onlyOffers,
    onOnlyOffersChange: setOnlyOffers,
    onlyInStock,
    onOnlyInStockChange: setOnlyInStock,
    onClearAll: clearAll,
    activeFilterCount,
  };

  return (
    <main id="main-content">
      {/* ── PAGE HERO BANNER ── */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">{t("Home", "হোম")}</Link>
            <FiChevronRight />
            <Link href="/products">{t("Products", "পণ্য")}</Link>
            <FiChevronRight />
            <span>{t("Daily Grocery", "দৈনিক মুদিখানা")}</span>
          </nav>

          {/* <div className={styles.pageHeroContent}>
            <div className={styles.pageHeroLeft}>
              <div className={styles.pageHeroIcon}>🛒</div>
              <h1 className={styles.pageHeroTitle}>
                {t("Daily Grocery", "দৈনিক মুদিখানা")}
              </h1>
              <p className={styles.pageHeroSubtitle}>
                {t(
                  "Fresh rice, vegetables, dairy, oils, spices & more — everything your kitchen needs, every day.",
                  "তাজা চাল, সবজি, দুগ্ধজাত, তেল, মশলা ও আরও অনেক কিছু — আপনার রান্নাঘরের প্রতিদিনের সব প্রয়োজন।",
                )}
              </p>
            </div>

            <div className={styles.pageHeroStats}>
              <div className={styles.pageHeroStat}>
                <strong>{PRODUCTS.length}+</strong>
                <span>{t("Products", "পণ্য")}</span>
              </div>
              <div className={styles.pageHeroStat}>
                <strong>{PRODUCTS.filter((p) => p.inStock).length}</strong>
                <span>{t("In Stock", "স্টকে")}</span>
              </div>
              <div className={styles.pageHeroStat}>
                <strong>{PRODUCTS.filter((p) => p.oldPrice).length}</strong>
                <span>{t("On Offer", "অফারে")}</span>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* ── MAIN BODY ── */}
      <div className={styles.pageBody}>
        {/* ── DESKTOP SIDEBAR ── */}
        <aside className={styles.sidebar} aria-label="Product filters">
          <FilterPanel {...filterProps} />
        </aside>

        {/* ── CONTENT ── */}
        <div className={styles.content}>
          {/* Featured banner */}
          <div className={styles.featuredBanner}>
            <div className={styles.featuredBannerText}>
              <span className={styles.featuredBannerBadge}>
                <FaFire size={10} />
                {t("Today's Special", "আজকের স্পেশাল")}
              </span>
              <h2 className={styles.featuredBannerTitle}>
                {t(
                  "Daily Dairy Pack — Up to 15% Off 🥛",
                  "ডেইরি প্যাক — ১৫% পর্যন্ত ছাড় 🥛",
                )}
              </h2>
              <p className={styles.featuredBannerDesc}>
                {t(
                  "Fresh milk, eggs & butter combo. Limited stock.",
                  "তাজা দুধ, ডিম ও মাখনের কম্বো। সীমিত স্টক।",
                )}
              </p>
            </div>
            <div className={styles.featuredBannerCta}>
              <button
                className="btn btn--accent"
                onClick={() => {
                  setSelectedCat("Dairy & Eggs");
                  setOnlyOffers(true);
                }}
              >
                <MdLocalOffer />
                {t("Shop Deal", "ডিল দেখুন")}
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className={styles.toolbar}>
            {/* Mobile filter button */}
            <button
              className={styles.mobileFilterBtn}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open filters"
            >
              <FiSliders />
              {t("Filters", "ফিল্টার")}
              {activeFilterCount > 0 && (
                <span className={styles.filterBadge}>{activeFilterCount}</span>
              )}
            </button>

            {/* Search */}
            <div className={styles.searchWrap}>
              <FiSearch className={styles.searchIcon} />
              <input
                ref={searchRef}
                type="search"
                className={styles.searchInput}
                placeholder={t("Search grocery…", "মুদিখানা খুঁজুন…")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search products"
              />
              {search && (
                <button
                  className={styles.searchClear}
                  onClick={() => {
                    setSearch("");
                    searchRef.current?.focus();
                  }}
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className={styles.toolbarRight}>
              {/* Sort */}
              <select
                className={styles.sortSelect}
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.label, o.labelBn)}
                  </option>
                ))}
              </select>

              {/* View toggle */}
              <div
                className={styles.viewToggle}
                role="group"
                aria-label="View mode"
              >
                <button
                  className={`${styles.viewBtn} ${viewMode === "grid" ? styles.active : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <FiGrid />
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === "list" ? styles.active : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Results info + active filter tags */}
          <div className={styles.resultsInfo}>
            <span>
              {t(
                `Showing ${visible.length} of ${filtered.length} products`,
                `${filtered.length} পণ্যের মধ্যে ${visible.length}টি দেখাচ্ছে`,
              )}
            </span>
            {activeTagLabels.length > 0 && (
              <div className={styles.activeFilters}>
                {activeTagLabels.map((tag) => (
                  <span key={tag} className={styles.activeFilterTag}>
                    {tag} <FiX />
                  </span>
                ))}
                <button
                  className={styles.activeFilterTag}
                  onClick={clearAll}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "rgba(208,2,27,0.08)",
                  }}
                >
                  {t("Clear all", "সব মুছুন")}
                </button>
              </div>
            )}
          </div>

          {/* Product grid / list */}
          {filtered.length === 0 ? (
            <div className={styles.productGrid}>
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🔍</span>
                <h3 className={styles.emptyTitle}>
                  {t("No products found", "কোনো পণ্য পাওয়া যায়নি")}
                </h3>
                <p className={styles.emptyDesc}>
                  {t(
                    "Try changing your search or filters.",
                    "আপনার সার্চ বা ফিল্টার পরিবর্তন করে দেখুন।",
                  )}
                </p>
                <button className="btn btn--outline" onClick={clearAll}>
                  <FiRefreshCw />
                  {t("Reset Filters", "ফিল্টার রিসেট করুন")}
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`${styles.productGrid} ${viewMode === "list" ? styles.listView : ""}`}
            >
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} view={viewMode} t={t} />
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className={styles.pagination}>
              <button
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                {t(
                  `Load More (${filtered.length - visibleCount} left)`,
                  `আরও দেখুন (${filtered.length - visibleCount}টি বাকি)`,
                )}
              </button>
            </div>
          )}

          {/* WhatsApp order strip */}
          <div className={styles.waOrderStrip}>
            <div className={styles.waOrderText}>
              <strong>
                {t("Can't find what you need?", "যা খুঁজছেন পাচ্ছেন না?")}
              </strong>
              <span>
                {t(
                  "Message us on WhatsApp — we will arrange it from the nearest outlet.",
                  "হোয়াটসঅ্যাপে মেসেজ করুন — আমরা কাছের শাখা থেকে ব্যবস্থা করব।",
                )}
              </span>
            </div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp"
            >
              <FaWhatsapp />
              {t("Order on WhatsApp", "হোয়াটসঅ্যাপে অর্ডার করুন")}
            </a>
          </div>
        </div>
        {/* /content */}
      </div>
      {/* /pageBody */}

      {/* ── MOBILE FILTER DRAWER ── */}
      <div
        className={`${styles.filterDrawer} ${drawerOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={t("Filters", "ফিল্টার")}
        aria-hidden={!drawerOpen}
      >
        <div
          className={styles.filterDrawerBackdrop}
          onClick={() => setDrawerOpen(false)}
        />
        <div className={styles.filterDrawerPanel}>
          <div className={styles.filterDrawerHeader}>
            <span className={styles.filterDrawerTitle}>
              {t("Filters", "ফিল্টার")}
              {activeFilterCount > 0 && ` (${activeFilterCount})`}
            </span>
            <button
              className={styles.filterDrawerClose}
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
            >
              <FiX />
            </button>
          </div>

          <div className={styles.filterDrawerBody}>
            <FilterPanel {...filterProps} />
          </div>

          <div className={styles.filterDrawerFooter}>
            <button
              className="btn btn--ghost"
              style={{ flex: 1 }}
              onClick={clearAll}
            >
              {t("Clear", "মুছুন")}
            </button>
            <button
              className="btn btn--primary"
              style={{ flex: 2 }}
              onClick={() => setDrawerOpen(false)}
            >
              {t(
                `Show ${filtered.length} Results`,
                `${filtered.length}টি ফলাফল দেখুন`,
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
