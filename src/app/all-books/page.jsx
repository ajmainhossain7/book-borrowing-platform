import Link from "next/link";
import { FiX } from "react-icons/fi";
import { BiBook } from "react-icons/bi";
import SearchBar from "@/hooks/SearchBar";
import CategorySidebar from "@/hooks/CategorySidebar";
import BookCard from "@/components/BookCard";
// ─── Active filter pill (server-rendered link) ────────────────────────────────
const FilterPill = ({ label, clearHref, muted = false }) => (
  <Link
    href={clearHref}
    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
      muted
        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
        : "bg-gray-900 text-white hover:bg-gray-700"
    }`}
  >
    {label} <FiX className="text-[10px]" />
  </Link>
);

// Page 
const AllBooksPage = async ({ searchParams }) => {
  const { category, search } = await searchParams;

  // Fetch on the server — Next.js caches this automatically
  const res = await fetch('https://book-borrowing-platform.vercel.app//data.json')
  const books = await res.json();

  // Derive unique categories for sidebar
  const categories = [...new Set(books.map((b) => b.category).filter(Boolean))].sort();

  // Filter on the server
  let filtered = books;
  if (category) filtered = filtered.filter((b) => b.category === category);
  if (search?.trim())
    filtered = filtered.filter((b) =>
      b.title.toLowerCase().includes(search.trim().toLowerCase())
    );

  // Build clear-filter hrefs
  const clearCategoryHref = search ? `?search=${search}` : "?";
  const clearSearchHref = category ? `?category=${category}` : "?";

  return (
    <div
      className="min-h-screen bg-[#f8f7f4]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* ── Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
            All Books
          </h1>
          {/* SearchBar is a client component — needs interactivity */}
          <SearchBar defaultValue={search ?? ""} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* CategorySidebar is a client component — uses router.replace */}
        <CategorySidebar
          categories={categories}
          selectedCategory={category ?? null}
        />

        {/* Grid — fully server-rendered */}
        <main className="flex-1 min-w-0">
          {/* Result count + active filter pills */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <p className="text-xs text-gray-500 font-medium">
              {filtered.length} book{filtered.length !== 1 ? "s" : ""}
            </p>
            {category && (
              <FilterPill label={category} clearHref={clearCategoryHref} />
            )}
            {search && (
              <Link
                href={clearSearchHref}
                className="flex items-center gap-1 text-xs font-semibold bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full hover:bg-gray-300 transition-colors"
              >
                &ldquo;{search}&rdquo; <FiX className="text-[10px]" />
              </Link>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <BiBook className="text-5xl mb-3 opacity-30" />
              <p className="text-sm font-medium">No books found</p>
              <p className="text-xs mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllBooksPage;