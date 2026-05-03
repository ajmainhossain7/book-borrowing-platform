"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiShoppingCart, FiCheck, FiX } from "react-icons/fi";

export default function BorrowButton({ isOutOfStock, bookTitle }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // null | "success" | "error"

  const handleBorrow = async () => {
    // ── logged out হলে signin এ পাঠাও ──
    if (!user) {
      router.push("/signin");
      return;
    }

    // ── logged in হলে borrow করো ──
    setLoading(true);
    try {
      // তোমার actual API call এখানে দাও
      await new Promise((r) => setTimeout(r, 800)); // simulate
      setToast("success");
    } catch {
      setToast("error");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <>
      <button
        onClick={handleBorrow}
        disabled={isOutOfStock || loading}
        className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-bold
          tracking-[0.12em] uppercase transition-all duration-200
          ${isOutOfStock
            ? "bg-[#E2E2E2] text-[#8B8B8B] cursor-not-allowed"
            : loading
              ? "bg-[#1A1A1B] text-white opacity-70 cursor-wait"
              : "bg-[#1A1A1B] text-white hover:bg-[#121217] active:scale-[0.98]"
          }`}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <FiShoppingCart className="text-sm" />
            {isOutOfStock ? "Unavailable" : "Borrow Now"}
          </>
        )}
      </button>

      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50
            flex items-center gap-3 px-5 py-3.5 shadow-xl
            animate__animated animate__fadeInUp
            ${toast === "success" ? "bg-[#1A1A1B]" : "bg-red-600"} text-white`}
          style={{ minWidth: "280px", fontFamily: "'Courier New', monospace" }}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs
            ${toast === "success" ? "bg-emerald-400 text-[#1A1A1B]" : "bg-red-300 text-white"}`}>
            {toast === "success" ? <FiCheck /> : <FiX />}
          </span>

          <div className="flex flex-col">
            <p className="text-xs font-bold tracking-widest uppercase">
              {toast === "success" ? "Borrow Confirmed!" : "Something went wrong"}
            </p>
            <p className="text-[10px] text-white/60 mt-0.5">
              {toast === "success"
                ? `"${bookTitle}" borrowed successfully.`
                : "Please try again later."}
            </p>
          </div>

          <button
            onClick={() => setToast(null)}
            className="ml-auto text-white/40 hover:text-white transition-colors"
          >
            <FiX className="text-sm" />
          </button>

          {toast === "success" && (
            <span
              className="absolute bottom-0 left-0 h-[2px] bg-emerald-400"
              style={{ animation: "shrink 4s linear forwards" }}
            />
          )}
        </div>
      )}

      <style>{`
        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
      `}</style>
    </>
  );
}