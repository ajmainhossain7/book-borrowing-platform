"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiArrowLeft, FiBookOpen } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TbRosetteDiscount } from "react-icons/tb";

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-28 px-4 text-center">
    <div className="relative mb-6">
      <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
        <HiOutlineShoppingCart className="text-3xl text-gray-300" />
      </div>
      <div className="absolute -top-1 -right-1 w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xs font-bold border border-gray-200">
        0
      </div>
    </div>
    <h2
      className="text-2xl font-black text-gray-900 mb-2"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Your cart is empty
    </h2>
    <p className="text-sm text-gray-400 mb-8 max-w-xs leading-relaxed">
      Looks like you haven't added any books yet. Explore our collection and find your next great read.
    </p>
    <Link
      href="/all-books"
      className="inline-flex items-center gap-2 bg-gray-900 text-white text-xs font-bold tracking-[0.12em] uppercase px-7 py-3.5 hover:bg-gray-700 transition-colors duration-200 rounded-sm"
    >
      <FiBookOpen />
      Browse Library
    </Link>
  </div>
);

// ─── Cart Item Row ─────────────────────────────────────────────────────────────
const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="group flex gap-4 sm:gap-5 p-4 sm:p-5 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
      {/* Cover */}
      <Link href={`/all-books/${item.id}`} className="flex-shrink-0">
        <div className="relative w-16 h-[88px] sm:w-20 sm:h-[110px] overflow-hidden bg-gray-100">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between min-w-0 gap-1">
        <div>
          <Link href={`/all-books/${item.id}`}>
            <h3
              className="text-sm font-black text-gray-900 line-clamp-1 hover:text-gray-600 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {item.title}
            </h3>
          </Link>
          <p className="text-[11px] text-gray-400 mt-0.5">
            by <span className="font-semibold text-gray-600">{item.author}</span>
          </p>
          <span className="inline-block mt-1.5 text-[9px] font-bold tracking-[0.15em] uppercase text-gray-400 border border-gray-200 px-2 py-0.5">
            {item.category}
          </span>
        </div>

        {/* Bottom row: qty + price + remove */}
        <div className="flex items-center justify-between gap-3 mt-1">
          {/* Quantity control */}
          <div className="flex items-center border border-gray-200 divide-x divide-gray-200">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <FiMinus className="text-xs" />
            </button>
            <span className="w-8 h-7 flex items-center justify-center text-xs font-bold text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.available_quantity}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiPlus className="text-xs" />
            </button>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm font-black text-gray-900">
              {item.price ?? "Free"}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded transition-all duration-200"
              aria-label="Remove item"
            >
              <FiTrash2 className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Order Summary ────────────────────────────────────────────────────────────
const OrderSummary = ({ items, onClear }) => {
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const allFree    = items.every((i) => !i.price || i.price === "Free");

  return (
    <div className="bg-white border border-gray-100 p-6 flex flex-col gap-4 sticky top-24">
      <h2
        className="text-base font-black text-gray-900 border-b border-gray-100 pb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Order Summary
      </h2>

      {/* Stats */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Books ({totalItems})</span>
          <span className="font-semibold text-gray-900">{allFree ? "Free" : "—"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Borrow fee</span>
          <span className="font-semibold text-emerald-500">Waived</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Late fees</span>
          <span className="font-semibold text-emerald-500">None</span>
        </div>
      </div>

      {/* Promo banner */}
      <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 px-3 py-2.5 rounded-sm">
        <TbRosetteDiscount className="text-emerald-500 text-base flex-shrink-0" />
        <p className="text-[11px] text-emerald-700 font-medium leading-snug">
          Member perks applied — all books free for 14 days
        </p>
      </div>

      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">Total</span>
        <span className="text-xl font-black text-gray-900">Free</span>
      </div>

      {/* CTA */}
      <button className="w-full bg-gray-900 text-white text-xs font-bold tracking-[0.12em] uppercase py-3.5 hover:bg-gray-700 active:scale-[0.98] transition-all duration-200 rounded-sm">
        Confirm Borrow
      </button>
      <Link
        href="/all-books"
        className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-500 text-xs font-bold tracking-[0.1em] uppercase py-3 hover:border-gray-900 hover:text-gray-900 transition-all duration-200 rounded-sm"
      >
        <FiArrowLeft className="text-xs" />
        Continue Browsing
      </Link>

      {/* Clear cart */}
      <button
        onClick={onClear}
        className="text-[11px] text-gray-300 hover:text-red-400 transition-colors duration-200 text-center mt-1"
      >
        Clear entire cart
      </button>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const CartPage = () => {
  const { cartItems, clearCart } = useCart();

  return (
    <div
      className="min-h-screen bg-[#F9F8F6]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/all-books"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="text-sm" />
              Back
            </Link>
            <span className="text-gray-200">|</span>
            <div>
              <h1 className="text-lg font-black text-gray-900 leading-none">
                Your Cart
              </h1>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {cartItems.length === 0
                  ? "No items yet"
                  : `${cartItems.reduce((s, i) => s + i.quantity, 0)} book${cartItems.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""} selected`}
              </p>
            </div>
          </div>
          <HiOutlineShoppingCart className="text-xl text-gray-300" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
            {/* ── Items list ── */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
                  {cartItems.length} title{cartItems.length !== 1 ? "s" : ""} in cart
                </p>
              </div>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* ── Summary ── */}
            <div className="lg:col-span-1">
              <OrderSummary items={cartItems} onClear={clearCart} />
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom CTA strip ── */}
      {cartItems.length > 0 && (
        <div className="bg-[#1A1A1B] mt-16 py-10 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">
                Keep exploring
              </p>
              <h3 className="text-xl font-black text-white">
                Discover more books you'll love.
              </h3>
            </div>
            <Link
              href="/all-books"
              className="flex-shrink-0 border border-white/30 text-white text-xs font-bold tracking-[0.15em] uppercase px-7 py-3.5 hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Browse Library →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;