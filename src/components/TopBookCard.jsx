"use client";

import Image from "next/image";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import { TbTrophy, TbAward } from "react-icons/tb";

// ─── Category colors — identical to BookCard ──────────────────────────────────
const CATEGORY_COLORS = {
  Classic: "bg-amber-100 text-amber-800",
  Fiction: "bg-blue-100 text-blue-800",
  Fantasy: "bg-purple-100 text-purple-800",
  Mystery: "bg-rose-100 text-rose-800",
  Tech:    "bg-cyan-100 text-cyan-800",
  Science: "bg-green-100 text-green-800",
  Story:   "bg-orange-100 text-orange-800",
};

// ─── Rank badge ───────────────────────────────────────────────────────────────
const RankBadge = ({ rank }) => {
  const base = "absolute top-2 right-2 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-lg";
  if (rank === 1) return (
    <div className={`${base} bg-amber-400`}>
      <TbTrophy className="text-white text-lg" />
    </div>
  );
  if (rank === 2) return (
    <div className={`${base} bg-[#9CA3AF]`}>
      <TbAward className="text-white text-lg" />
    </div>
  );
  if (rank === 3) return (
    <div className={`${base} bg-amber-700`}>
      <TbAward className="text-white text-lg" />
    </div>
  );
  return (
    <div className={`${base} bg-[#1A1A1B]/75`}>
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
        className={`text-xs ${
          s <= Math.round(rating)
            ? "fill-amber-500 text-amber-500"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ))}
  </div>
);

// ─── Card ─────────────────────────────────────────────────────────────────────
const TopBookCard = ({ book, rank }) => {
//   const categoryStyle = CATEGORY_COLORS[book.category] ?? "bg-gray-100 text-gray-700";

  return (
    <div className="group flex flex-col bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">

      {/* Cover — same aspect ratio as BookCard */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category — top left, same as BookCard */}
        {/* <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 ${categoryStyle}`}>
          {book.category}
        </span> */}
        {/* Rank — top right */}
        <RankBadge rank={rank} />
      </div>

      {/* Content — same structure as BookCard */}
      <div className="flex flex-col gap-1.5 p-3">
        <h3
          className="text-sm font-bold text-gray-900 leading-snug line-clamp-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {book.title}
        </h3>

        <p className="text-xs text-gray-500">
          by: <span className="font-medium text-gray-700">{book.author}</span>
        </p>

        <div className="flex items-center gap-0.5">
          <Stars rating={book.rating} />
          <span className="text-[11px] text-gray-400 ml-1">({book.rating})</span>
        </div>

        <p className={`text-[11px] font-medium ${
          book.available_quantity > 10
            ? "text-green-600"
            : book.available_quantity > 0
            ? "text-orange-500"
            : "text-red-500"
        }`}>
          {book.available_quantity > 0
            ? `${book.available_quantity} in stock`
            : "Out of stock"}
        </p>

        <Link
          href={`/top-books/${book.id}`}
          className="mt-1 flex items-center justify-center gap-1.5 border border-gray-900 text-gray-900 text-xs font-semibold py-1.5 hover:bg-gray-900 hover:text-white transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TopBookCard;