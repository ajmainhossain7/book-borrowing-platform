import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineFire } from "react-icons/hi";
import { TbTrophy } from "react-icons/tb";
import TopBookCard from "@/components/TopBookCard";

// ─── Data fetch ───────────────────────────────────────────────────────────────
async function getTopRatedBooks() {
  const res = await fetch("https://book-borrowing-platform.vercel.app/data.json", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  const books = await res.json();
  return [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);
}

// ─── Section ──────────────────────────────────────────────────────────────────
const TopRated = async () => {
  const topBooks = await getTopRatedBooks();

  return (
    <section
      className="bg-[#F9F8F6] py-12 sm:py-16"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">

          <div className="flex flex-col gap-2">
            {/* Label */}
            <div className="flex items-center gap-2">
              <HiOutlineFire className="text-amber-500 text-lg" />
              <span
                className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#8B8B8B]"
                style={{ fontFamily: "sans-serif" }}
              >
                Community Favourites
              </span>
            </div>
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1B] leading-tight">
              Top Rated Books
            </h2>
            {/* Subtitle */}
            <p
              className="text-sm text-[#8B8B8B] max-w-md leading-relaxed"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Handpicked by ratings — the books our readers love the most.
            </p>
          </div>

          {/* View all */}
          <Link
            href="/all-books"
            className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-bold tracking-[0.15em] uppercase text-[#1A1A1B] border-b-2 border-[#1A1A1B] pb-0.5 hover:opacity-60 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "sans-serif" }}
          >
            View All Books <FiArrowRight />
          </Link>
        </div>

        {/* ── Chips bar ── */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { label: "All Ratings", active: true },
            { label: "4.9 ★",       active: false },
            { label: "4.7+ ★",      active: false },
            { label: "4.5+ ★",      active: false },
          ].map((chip) => (
            <span
              key={chip.label}
              className={`shrink-0 px-3.5 py-1.5 text-[11px] font-semibold border ${
                chip.active
                  ? "bg-[#1A1A1B] text-white border-[#1A1A1B]"
                  : "bg-white text-[#8B8B8B] border-[#E2E2E2]"
              }`}
              style={{ fontFamily: "sans-serif" }}
            >
              {chip.label}
            </span>
          ))}
          <div
            className="ml-auto shrink-0 flex items-center gap-1.5 text-[11px] text-[#8B8B8B]"
            style={{ fontFamily: "sans-serif" }}
          >
            <TbTrophy className="text-amber-400 text-sm" />
            Top {topBooks.length} books
          </div>
        </div>

        {/* ── 4-column grid — each card same width ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {topBooks.map((book, i) => (
            <TopBookCard key={book.id} book={book} rank={i + 1} />
          ))}
        </div>

        {/* ── Footer strip ── */}
        <div className="mt-10 pt-8 border-t border-[#E2E2E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#8B8B8B] text-center sm:text-left"
            style={{ fontFamily: "sans-serif" }}
          >
            Rankings are based on average reader ratings across our full collection.
          </p>
          <Link
            href="/all-books"
            className="shrink-0 inline-flex items-center gap-2 bg-[#1A1A1B] text-white text-xs font-bold tracking-[0.15em] uppercase px-6 py-3 hover:bg-[#121217] transition-colors"
            style={{ fontFamily: "sans-serif" }}
          >
            Explore Full Library <FiArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TopRated;