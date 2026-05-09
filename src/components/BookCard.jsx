"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiStar, FiShoppingCart, FiCheck } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCartToast } from "@/hooks/useCartToast";

// ─── Category config ──────────────────────────────────────────────────────────
const CATEGORY = {
  Classic: { badge: "bg-amber-50 text-amber-700 border-amber-200",     accent: "#f59e0b", bar: "bg-amber-400"   },
  Fiction: { badge: "bg-sky-50 text-sky-700 border-sky-200",           accent: "#0ea5e9", bar: "bg-sky-400"     },
  Fantasy: { badge: "bg-violet-50 text-violet-700 border-violet-200",  accent: "#8b5cf6", bar: "bg-violet-400" },
  Mystery: { badge: "bg-rose-50 text-rose-700 border-rose-200",        accent: "#f43f5e", bar: "bg-rose-400"    },
  Tech:    { badge: "bg-cyan-50 text-cyan-700 border-cyan-200",        accent: "#06b6d4", bar: "bg-cyan-400"    },
  Science: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", accent: "#10b981", bar: "bg-emerald-400" },
  Story:   { badge: "bg-orange-50 text-orange-700 border-orange-200",  accent: "#f97316", bar: "bg-orange-400" },
};

const DEFAULT = { badge: "bg-gray-100 text-gray-600 border-gray-200", accent: "#6b7280", bar: "bg-gray-400" };

// ─── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <FiStar
        key={s}
        className={`text-[10px] ${
          s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-100"
        }`}
      />
    ))}
    <span className="ml-1.5 text-[11px] font-semibold text-gray-400">{rating}</span>
  </div>
);

// ─── BookCard ─────────────────────────────────────────────────────────────────
const BookCard = ({ book }) => {
  const { id, title, author, category, available_quantity,
          rating, image_url, price, pages, borrow_duration } = book;

  const cfg = CATEGORY[category] ?? DEFAULT;
  const { addToCart, cartItems } = useCart();
  const router = useRouter();
  const showCartToast = useCartToast(); // ← hook replaces the standalone function

  const isOutOfStock = available_quantity === 0;
  const isLowStock   = available_quantity > 0 && available_quantity <= 8;
  const inCart       = cartItems?.some((item) => item.id === id);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || added) return;

    addToCart(book);
    setAdded(true);
    showCartToast(book); // ← same call, now uses the hook's version

    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <Link
      href={`/all-books/${id}`}
      className="group relative flex flex-col bg-white overflow-hidden cursor-pointer
                 border border-gray-100 hover:border-gray-200
                 shadow-sm hover:shadow-2xl
                 transition-all duration-500 ease-out rounded-sm"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* ── Category accent bar ── */}
      <div className={`absolute top-0 inset-x-0 h-[3px] ${cfg.bar} z-10`} />

      {/* ── Cover ── */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50">
        <Image
          src={image_url}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Category badge */}
        <span className={`absolute top-4 left-3.5 text-[9px] font-bold px-2.5 py-1 border tracking-[0.15em] uppercase rounded-sm ${cfg.badge}`}>
          {category}
        </span>

        {/* Stock pill */}
        {isOutOfStock ? (
          <span className="absolute top-4 right-3.5 text-[9px] font-bold px-2.5 py-1 bg-red-500/90 text-white uppercase tracking-wider rounded-sm backdrop-blur-sm">
            Sold Out
          </span>
        ) : isLowStock ? (
          <span className="absolute top-4 right-3.5 flex items-center gap-1.5 text-[9px] font-bold px-2.5 py-1 bg-orange-500/90 text-white uppercase tracking-wider rounded-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {available_quantity} left
          </span>
        ) : null}

        {/* Hover quick-stats */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            {pages && (
              <span className="text-[10px] text-white/80 tracking-widest uppercase font-medium">
                {pages} pages
              </span>
            )}
            {borrow_duration && (
              <span className="text-[10px] text-white/80 tracking-widest uppercase font-medium">
                {borrow_duration}-day borrow
              </span>
            )}
          </div>
          <span className="text-white/60 text-[10px] tracking-widest uppercase font-medium">
            Tap to view →
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">

        {/* Title */}
        <h3 className="text-[13px] font-black text-gray-900 leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
          {title}
        </h3>

        {/* Author */}
        <p className="text-[11px] text-gray-400 -mt-1">
          by <span className="font-semibold text-gray-600">{author}</span>
        </p>

        {/* Stars */}
        <Stars rating={rating} />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="w-full h-px bg-gray-100" />

        {/* Price + stock row */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-gray-900 tracking-tight">
            {price ?? "Free"}
          </span>
          <span className={`text-[10px] font-bold tracking-wide uppercase ${
            isOutOfStock ? "text-red-400" : isLowStock ? "text-orange-500" : "text-emerald-500"
          }`}>
            {isOutOfStock ? "Unavailable" : isLowStock ? `${available_quantity} left` : "In Stock"}
          </span>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase rounded-sm transition-all duration-300
            ${isOutOfStock
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : added || inCart
              ? "bg-emerald-500 text-white scale-[0.98]"
              : "bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.97]"
            }`}
        >
          {added || inCart ? (
            <>
              <FiCheck className="text-sm" />
              Added to Cart
            </>
          ) : (
            <>
              <HiOutlineShoppingCart className="text-sm" />
              {isOutOfStock ? "Unavailable" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default BookCard;