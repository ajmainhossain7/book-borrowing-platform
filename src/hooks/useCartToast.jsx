"use client";

import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";

// ─── Reusable cart toast ───────────────────────────────────────────────────────
// Usage:
//   const showCartToast = useCartToast();
//   showCartToast(book);
// ─────────────────────────────────────────────────────────────────────────────

export const useCartToast = () => {
  const showCartToast = (book) => {
    toast.custom(
      (t) => (
        <div
          className={`flex items-center gap-3 bg-white border border-gray-100 shadow-xl rounded-2xl px-4 py-3 max-w-sm w-full transition-all duration-300 ${
            t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {/* Book thumbnail */}
          <div className="relative w-10 h-14 shrink-0 overflow-hidden rounded-md bg-gray-100">
            <img
              src={book.image_url}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">
              Added to cart
            </p>
            <p className="text-sm font-black text-gray-900 truncate leading-snug">
              {book.title}
            </p>
            <p className="text-[11px] text-gray-400 truncate">by {book.author}</p>
          </div>

          {/* Check icon */}
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <FiCheck className="text-emerald-500 text-sm" />
          </div>
        </div>
      ),
      {
        duration: 2500,
        position: "top-right",
      }
    );
  };

  return showCartToast;
};