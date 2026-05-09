"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiStar, FiBookOpen, FiPackage, FiCheck } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TbTrophy, TbAward } from "react-icons/tb";
import { useCartToast } from "@/hooks/useCartToast";
import { useCart } from "@/context/CartContext";

// ─── Category colors ──────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  Classic: { badge: "bg-amber-100 text-amber-800 border-amber-200", accent: "bg-amber-500" },
  Fiction: { badge: "bg-blue-100 text-blue-800 border-blue-200", accent: "bg-blue-500" },
  Fantasy: { badge: "bg-purple-100 text-purple-800 border-purple-200", accent: "bg-purple-500" },
  Mystery: { badge: "bg-rose-100 text-rose-800 border-rose-200", accent: "bg-rose-500" },
  Tech: { badge: "bg-cyan-100 text-cyan-800 border-cyan-200", accent: "bg-cyan-500" },
  Science: { badge: "bg-green-100 text-green-800 border-green-200", accent: "bg-green-500" },
  Story: { badge: "bg-orange-100 text-orange-800 border-orange-200", accent: "bg-orange-500" },
};

// ─── Rank badge ───────────────────────────────────────────────────────────────
const RankBadge = ({ rank }) => {
  const base =
    "absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/40";
  if (rank === 1)
    return (
      <div className={`${base} bg-amber-400`}>
        <TbTrophy className="text-white text-lg" />
      </div>
    );
  if (rank === 2)
    return (
      <div className={`${base} bg-[#9CA3AF]`}>
        <TbAward className="text-white text-lg" />
      </div>
    );
  if (rank === 3)
    return (
      <div className={`${base} bg-amber-700`}>
        <TbAward className="text-white text-lg" />
      </div>
    );
  return (
    <div className={`${base} bg-[#1A1A1B]/80`}>
      <span className="text-white text-xs font-bold" style={{ fontFamily: "sans-serif" }}>
        #{rank}
      </span>
    </div>
  );
};

// ─── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <FiStar
        key={s}
        className={`text-[11px] transition-colors duration-200 ${s <= Math.round(rating)
          ? "fill-amber-400 text-amber-400"
          : "fill-gray-200 text-gray-200"
          }`}
      />
    ))}
    <span className="text-[11px] text-gray-400 ml-1 font-medium">{rating}</span>
  </div>
);

// ─── Card ─────────────────────────────────────────────────────────────────────
const TopBookCard = ({ book, rank }) => {
  const {
    id, title, author, category,
    available_quantity, rating,
    image_url, price, pages, borrow_duration,
  } = book;

  const colors = CATEGORY_COLORS[category] ?? {
    badge: "bg-gray-100 text-gray-700 border-gray-200",
    accent: "bg-gray-500",
  };

  const { addToCart, cartItems } = useCart();
  const showCartToast = useCartToast(); // ← add this
  const isOutOfStock = available_quantity === 0;
  const isLowStock = available_quantity > 0 && available_quantity <= 8;
  const inCart = cartItems?.some((item) => item.id === id);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || added) return;

    addToCart(book);
    setAdded(true);
    showCartToast(book); // ← now calls the hook version
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    // ── পুরো card-ই একটা Link — যেকোনো জায়গায় click করলে details page-এ যাবে ──
    <Link
      href={`/top-books/${id}`}
      className="group relative flex flex-col bg-white border border-[#E2E2E2] hover:border-[#1A1A1B] hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* ── Hover accent line (top) ── */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 ${colors.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10`}
      />

      {/* ── Cover ── */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={image_url}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

        {/* Category badge */}
        <span className={`absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 border tracking-widest uppercase ${colors.badge}`}>
          {category}
        </span>

        {/* Rank badge */}
        <RankBadge rank={rank} />

        {/* Stock badge */}
        {isOutOfStock ? (
          <span className="absolute bottom-10 left-2.5 text-[9px] font-bold px-2 py-0.5 bg-red-500 text-white uppercase tracking-wider">
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="absolute bottom-10 left-2.5 flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 bg-orange-400 text-white uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Low Stock
          </span>
        ) : null}

        {/* Hover quick-info overlay (bottom of image) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#1A1A1B]/90 px-3 py-2.5 flex items-center justify-between">
          {pages && (
            <div className="flex items-center gap-1.5 text-white/80">
              <FiBookOpen className="text-xs" />
              <span className="text-[10px] tracking-widest uppercase">{pages} pages</span>
            </div>
          )}
          {borrow_duration && (
            <div className="flex items-center gap-1.5 text-white/80">
              <FiPackage className="text-xs" />
              <span className="text-[10px] tracking-widest uppercase">{borrow_duration}-day borrow</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-2 p-3.5">

        <h3 className="text-sm font-black text-[#1A1A1B] leading-snug line-clamp-1 group-hover:text-gray-600 transition-colors">
          {title}
        </h3>

        <p className="text-[11px] text-[#8B8B8B]">
          by <span className="font-semibold text-[#1A1A1B]">{author}</span>
        </p>

        <Stars rating={rating} />

        <div className="border-t border-[#E2E2E2] my-0.5" />

        {/* Price + Stock */}
        <div className="flex items-center justify-between">
          <span className="text-base font-black text-[#1A1A1B]">
            {book.price ? `Tk ${book.price}` : "Free"}
          </span>
          <span className={`text-[10px] font-semibold tracking-wide ${isOutOfStock ? "text-red-500" : isLowStock ? "text-orange-500" : "text-emerald-600"
            }`}>
            {isOutOfStock ? "Unavailable" : isLowStock ? `Only ${available_quantity} left` : `${available_quantity} in stock`}
          </span>
        </div>

        {/* Add to Cart — e.preventDefault + e.stopPropagation দিয়ে navigation আটকানো */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-300
            ${isOutOfStock
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : added || inCart
                ? "bg-emerald-500 text-white scale-[0.98]"
                : "bg-[#1A1A1B] text-white hover:bg-gray-700 active:scale-[0.97]"
            }`}
        >
          {added || inCart ? (
            <><FiCheck className="text-sm" /> Added to Cart</>
          ) : (
            <><HiOutlineShoppingCart className="text-sm" /> {isOutOfStock ? "Unavailable" : "Add to Cart"}</>
          )}
        </button>
      </div>
    </Link>
  );
};

export default TopBookCard;