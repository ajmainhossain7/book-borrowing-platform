import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FiStar, FiArrowLeft,
  FiPackage, FiShoppingCart, FiChevronRight
} from "react-icons/fi";
import ProtectedRoute from "@/hooks/ProtectedRoute";


// ─── Data fetch ───────────────────────────────────────────────────────────────
async function getBooks() {
  const res = await fetch("https://book-borrowing-platform.vercel.app/data.json", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

// ─── Star rating ──────────────────────────────────────────────────────────────
const Stars = ({ rating, size = "sm" }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <FiStar
        key={s}
        className={`${size === "sm" ? "text-xs" : "text-sm"} ${s <= Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
          }`}
      />
    ))}
  </div>
);

// ─── Related book card ────────────────────────────────────────────────────────
const RelatedCard = ({ book }) => (
  <Link
    href={`/books/${book.id}`}
    className="group flex gap-3 p-3 bg-[#F9F8F6] hover:bg-white border border-[#E2E2E2] hover:border-[#1A1A1B] hover:shadow-sm transition-all duration-200"
  >
    <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden bg-gray-100">
      <Image
        src={book.image_url}
        alt={book.title}
        fill
        sizes="48px"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="flex flex-col justify-center gap-0.5 min-w-0">
      <p className="text-[9px] tracking-widest uppercase text-[#8B8B8B]"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {book.category}
      </p>
      <h4 className="text-xs font-bold text-[#1A1A1B] line-clamp-2 leading-snug"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {book.title}
      </h4>
      <p className="text-[10px] text-[#8B8B8B]">{book.author}</p>
      <Stars rating={book.rating} size="xs" />
    </div>
    <FiChevronRight className="ml-auto self-center text-[#8B8B8B] group-hover:text-[#1A1A1B] flex-shrink-0 transition-colors" />
  </Link>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const BookDetailsPage = async ({ params }) => {
  const { id } = await params;
  const books = await getBooks();
  const book = books.find((b) => String(b.id) === String(id));

  if (!book) notFound();

  const related = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 3);

  const isOutOfStock = book.available_quantity === 0;
  const isLowStock = book.available_quantity > 0 && book.available_quantity <= 8;

  return (
    <ProtectedRoute>
      <div
        className="min-h-screen bg-[#F9F8F6]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {/* ── Breadcrumb ── */}
        <div className="bg-white border-b border-[#E2E2E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[11px] text-[#8B8B8B] flex-wrap">
            <Link href="/" className="hover:text-[#1A1A1B] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/all-books" className="hover:text-[#1A1A1B] transition-colors">All Books</Link>
            <span>/</span>
            <Link href={`/all-books?category=${book.category}`} className="hover:text-[#1A1A1B] transition-colors">{book.category}</Link>
            <span>/</span>
            <span className="text-[#1A1A1B] font-medium line-clamp-1">{book.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

          <Link
            href="/all-books"
            className="inline-flex items-center gap-1.5 text-xs text-[#8B8B8B] hover:text-[#1A1A1B] transition-colors mb-8"
          >
            <FiArrowLeft className="text-sm" />
            Back to All Books
          </Link>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">

            {/* ── LEFT: Book Cover ── */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start gap-5">
              <div className="relative w-56 sm:w-64 lg:w-full max-w-[260px] aspect-[2/3] shadow-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={book.image_url}
                  alt={book.title}
                  fill
                  sizes="(max-width: 1024px) 256px, 260px"
                  className="object-cover"
                  priority
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[#1A1A1B] text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1">
                  {book.category}
                </span>
              </div>

              <div className={`w-56 sm:w-64 lg:w-full max-w-[260px] flex items-center gap-3 px-4 py-3 border ${isOutOfStock
                  ? "bg-red-50 border-red-200"
                  : isLowStock
                    ? "bg-orange-50 border-orange-200"
                    : "bg-emerald-50 border-emerald-200"
                }`}>
                <FiPackage className={`text-sm flex-shrink-0 ${isOutOfStock ? "text-red-400" : isLowStock ? "text-orange-400" : "text-emerald-500"
                  }`} />
                <div>
                  <p className={`text-xs font-bold ${isOutOfStock ? "text-red-600" : isLowStock ? "text-orange-600" : "text-emerald-600"
                    }`}>
                    {isOutOfStock ? "Out of Stock" : isLowStock ? `Only ${book.available_quantity} left!` : "In Stock"}
                  </p>
                  {!isOutOfStock && (
                    <p className="text-[10px] text-[#8B8B8B]">
                      {book.available_quantity} copies available
                    </p>
                  )}
                </div>
                {isLowStock && (
                  <span className="ml-auto w-2 h-2 bg-orange-400 rounded-full animate-pulse flex-shrink-0" />
                )}
              </div>
            </div>

            {/* ── CENTER: Book Info ── */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8B8B8B]">
                {book.category}
              </p>

              <div className="flex flex-col gap-2">
                <h1
                  className="text-3xl sm:text-4xl font-black text-[#1A1A1B] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {book.title}
                </h1>
                <p className="text-sm text-[#8B8B8B]">
                  by <span className="text-[#1A1A1B] font-semibold">{book.author}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 py-4 border-y border-[#E2E2E2]">
                <Stars rating={book.rating} size="sm" />
                <span className="text-sm font-semibold text-[#1A1A1B]">{book.rating}</span>
                <span className="text-[#E2E2E2]">|</span>
                <span className="text-xs text-[#8B8B8B]">
                  {book.rating >= 4.8 ? "Outstanding" : book.rating >= 4.5 ? "Excellent" : "Very Good"}
                </span>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B8B8B] mb-3">
                  About this book
                </p>
                <p className="text-sm text-[#1A1A1B] leading-7 opacity-80">
                  {book.description ?? "No description available for this title."}
                </p>
              </div>

              <div className="bg-white border border-[#E2E2E2] divide-y divide-[#E2E2E2] pt-2">
                {[
                  { label: "Category", value: book.category },
                  { label: "Author", value: book.author },
                  { label: "Available", value: `${book.available_quantity} copies` },
                  { label: "Rating", value: `${book.rating} / 5.0` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-[11px] tracking-widest uppercase text-[#8B8B8B]">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-[#1A1A1B] text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-[#E2E2E2] pl-5 py-1 mt-2">
                <p className="text-sm italic text-[#8B8B8B] leading-relaxed">
                  "A reader lives a thousand lives before he dies."
                </p>
                <cite className="text-[10px] text-[#8B8B8B] not-italic tracking-widest uppercase mt-2 block">
                  — George R.R. Martin
                </cite>
              </blockquote>
            </div>

            {/* ── RIGHT: Action + Related ── */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="bg-white border border-[#E2E2E2] p-5 shadow-sm">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#8B8B8B] mb-1">
                  Borrow this book
                </p>
                <p
                  className="text-3xl font-black text-[#1A1A1B] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Free
                </p>
                <p className="text-[10px] text-[#8B8B8B] mb-5">
                  For registered members
                </p>

                <div className="flex flex-col gap-2.5">
                  <button
                    disabled={isOutOfStock}
                    className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200 ${isOutOfStock
                        ? "bg-[#E2E2E2] text-[#8B8B8B] cursor-not-allowed"
                        : "bg-[#1A1A1B] text-white hover:bg-[#121217] active:scale-[0.98]"
                      }`}
                  >
                    <FiShoppingCart className="text-sm" />
                    {isOutOfStock ? "Unavailable" : "Borrow Now"}
                  </button>

                  <Link
                    href="/all-books"
                    className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-[0.12em] uppercase border border-[#E2E2E2] text-[#8B8B8B] hover:border-[#1A1A1B] hover:text-[#1A1A1B] transition-all duration-200"
                  >
                    Browse More
                  </Link>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E2E2E2] flex flex-col gap-2">
                  {["Free 14-day borrow", "Instant availability", "No late fees"].map((perk) => (
                    <div key={perk} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                      <p className="text-[11px] text-[#8B8B8B]">{perk}</p>
                    </div>
                  ))}
                </div>
              </div>

              {related.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B8B8B]">
                      More in {book.category}
                    </p>
                    <Link
                      href={`/all-books?category=${book.category}`}
                      className="text-[10px] text-[#8B8B8B] hover:text-[#1A1A1B] border-b border-[#E2E2E2] hover:border-[#1A1A1B] transition-all"
                    >
                      See all
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    {related.map((r) => (
                      <RelatedCard key={r.id} book={r} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="bg-[#1A1A1B] mt-12 py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">
                Never stop reading
              </p>
              <h3
                className="text-xl sm:text-2xl font-black text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Discover thousands of books in our collection.
              </h3>
            </div>
            <Link
              href="/all-books"
              className="flex-shrink-0 flex items-center gap-2 border border-white/30 text-white text-xs font-bold tracking-[0.15em] uppercase px-7 py-3.5 hover:bg-white hover:text-[#1A1A1B] transition-all duration-300"
            >
              Browse Library →
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BookDetailsPage;