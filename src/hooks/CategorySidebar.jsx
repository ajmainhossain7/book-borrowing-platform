"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { BiBook, BiFilterAlt } from "react-icons/bi";
import { FiX, FiChevronRight } from "react-icons/fi";

// ─── Category color dots ──────────────────────────────────────────────────────
const CATEGORY_META = {
  Classic: { dot: "bg-amber-400" },
  Fiction: { dot: "bg-blue-400" },
  Fantasy: { dot: "bg-purple-400" },
  Mystery: { dot: "bg-rose-400" },
  Tech:    { dot: "bg-cyan-400" },
  Science: { dot: "bg-green-400" },
  Story:   { dot: "bg-orange-400" },
};
const defaultMeta = { dot: "bg-[#8B8B8B]" };

// ─── Shared select logic ──────────────────────────────────────────────────────
function useCategorySelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return { handleSelect, isPending };
}

// ─── Category List (shared between drawer & desktop sidebar) ─────────────────
const CategoryList = ({ categories, selectedCategory, onSelect }) => (
  <ul className="flex flex-col gap-1">
    <li>
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
          !selectedCategory
            ? "bg-[#1A1A1B] text-white"
            : "text-[#1A1A1B] hover:bg-[#F9F8F6]"
        }`}
      >
        <BiBook className="text-base opacity-70 flex-shrink-0" />
        All Books
      </button>
    </li>
    {categories.map((cat) => {
      const meta = CATEGORY_META[cat] ?? defaultMeta;
      const isActive = selectedCategory === cat;
      return (
        <li key={cat}>
          <button
            onClick={() => onSelect(cat)}
            className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#1A1A1B] text-white"
                : "text-[#1A1A1B] hover:bg-[#F9F8F6]"
            }`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                isActive ? "bg-white" : meta.dot
              }`}
            />
            {cat}
            {isActive && (
              <FiChevronRight className="ml-auto text-white opacity-70 text-xs" />
            )}
          </button>
        </li>
      );
    })}
  </ul>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const CategorySidebar = ({ categories, selectedCategory, isMobile = false }) => {
  const { handleSelect, isPending } = useCategorySelect();
  const [isOpen, setIsOpen] = useState(false);

  // ── Mobile: Right-side slide panel (DaisyUI drawer pattern) ─────────────
  if (isMobile) {
    return (
      <>
        {/* Filter trigger button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white border border-[#E2E2E2] px-4 py-2.5 rounded-sm text-sm font-semibold text-[#1A1A1B] shadow-sm hover:bg-[#F9F8F6] transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <BiFilterAlt className="text-base text-[#8B8B8B]" />
          Filter
          {selectedCategory && (
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#1A1A1B] text-white text-[9px] font-bold">
              1
            </span>
          )}
        </button>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Right-side slide panel */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E2E2]">
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8B8B8B]">
                Browse
              </p>
              <h2 className="text-lg font-bold text-[#1A1A1B]">Categories</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F9F8F6] text-[#8B8B8B] hover:text-[#1A1A1B] transition-colors"
            >
              <FiX className="text-base" />
            </button>
          </div>

          {/* Panel Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={(cat) => {
                handleSelect(cat);
                setIsOpen(false);
              }}
            />
          </div>

          {/* Panel Footer */}
          {selectedCategory && (
            <div className="px-4 py-3 border-t border-[#E2E2E2]">
              <button
                onClick={() => {
                  handleSelect(null);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 border border-[#E2E2E2] text-[#8B8B8B] text-xs font-semibold py-2.5 rounded-sm hover:bg-[#F9F8F6] hover:text-[#1A1A1B] transition-colors"
              >
                <FiX className="text-xs" />
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  // ── Desktop: Static left sidebar ─────────────────────────────────────────
  return (
    <aside className="w-56 flex-shrink-0">
      <div
        className={`bg-white border border-[#E2E2E2] rounded-sm shadow-sm transition-opacity ${
          isPending ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="px-4 py-3 border-b border-[#E2E2E2]">
          <h2
            className="text-xs font-bold tracking-[0.12em] uppercase text-[#8B8B8B]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Categories
          </h2>
        </div>
        <div className="p-2">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;