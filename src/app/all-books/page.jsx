import Link from "next/link";
import { FiX } from "react-icons/fi";
import { BiBook } from "react-icons/bi";
import SearchBar from "@/hooks/SearchBar";
import CategorySidebar from "@/hooks/CategorySidebar";
import BookCard from "@/components/BookCard";

// ─── Active filter pill ───────────────────────────────────────────────────────
const FilterPill = ({ label, clearHref, muted = false }) => (
  <Link
    href={clearHref}
    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
      muted
        ? "bg-[#E2E2E2] text-[#1A1A1B] hover:bg-[#d0d0d0]"
        : "bg-[#1A1A1B] text-white hover:bg-[#121217]"
    }`}
  >
    {label} <FiX className="text-[10px]" />
  </Link>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const AllBooksPage = async ({ searchParams }) => {
  const { category, search } = await searchParams;

  let books = [];
  try {
    const res = await fetch("https://book-borrowing-platform.vercel.app/data.json", {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    books = await res.json();
  } catch (err) {
    console.error("Could not load books:", err);
  }

  const categories = [
    ...new Set(books.map((b) => b.category).filter(Boolean)),
  ].sort();

  let filtered = books;
  if (category) filtered = filtered.filter((b) => b.category === category);
  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((b) => b.title.toLowerCase().includes(q));
  }

  const clearCategoryHref = search
    ? `?search=${encodeURIComponent(search)}`
    : "?";
  const clearSearchHref = category
    ? `?category=${encodeURIComponent(category)}`
    : "?";

  return (
    <div
      className="min-h-screen bg-[#F9F8F6]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-[#E2E2E2] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-[#1A1A1B] whitespace-nowrap">
            All Books
          </h1>
          <SearchBar defaultValue={search ?? ""} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-8">

          {/* Desktop sidebar — hidden on mobile */}
          <div className="hidden lg:block">
            <CategorySidebar
              categories={categories}
              selectedCategory={category ?? null}
              isMobile={false}
            />
          </div>

          {/* Main grid */}
          <main className="flex-1 min-w-0">

            {/* Result count + mobile filter button + pills — all in one row */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">

              {/* Mobile filter button — left of result count, only on small screens */}
              <div className="block lg:hidden">
                <CategorySidebar
                  categories={categories}
                  selectedCategory={category ?? null}
                  isMobile={true}
                />
              </div>

              <p className="text-xs text-[#8B8B8B] font-medium">
                {filtered.length} book{filtered.length !== 1 ? "s" : ""}
              </p>

              {category && (
                <FilterPill label={category} clearHref={clearCategoryHref} />
              )}

              {search && (
                <Link
                  href={clearSearchHref}
                  className="flex items-center gap-1 text-xs font-semibold bg-[#E2E2E2] text-[#1A1A1B] px-2.5 py-1 rounded-full hover:bg-[#d0d0d0] transition-colors"
                >
                  &ldquo;{search}&rdquo; <FiX className="text-[10px]" />
                </Link>
              )}
            </div>

            {/* Book grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-[#8B8B8B]">
                <BiBook className="text-5xl mb-3 opacity-30" />
                <p className="text-sm font-medium">No books found</p>
                <p className="text-xs mt-1">Try a different search or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filtered.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllBooksPage;