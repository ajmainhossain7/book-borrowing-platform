"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { BiBook } from "react-icons/bi";

const CATEGORY_META = {
  Classic: { dot: "bg-amber-400" },
  Fiction: { dot: "bg-blue-400" },
  Fantasy: { dot: "bg-purple-400" },
  Mystery: { dot: "bg-rose-400" },
  Tech:    { dot: "bg-cyan-400" },
  Science: { dot: "bg-green-400" },
  Story:   { dot: "bg-orange-400" },
};

const defaultMeta = { dot: "bg-gray-400" };

const CategorySidebar = ({ categories, selectedCategory }) => {
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

  return (
    <aside className="w-56 flex-shrink-0">
      <div
        className={`bg-white border border-gray-200 rounded-sm shadow-sm transition-opacity ${
          isPending ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-100">
          <h2
            className="text-xs font-bold tracking-[0.12em] uppercase text-gray-400"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Categories
          </h2>
        </div>
        <ul className="menu p-2 gap-0.5">
          <li>
            <button
              onClick={() => handleSelect(null)}
              className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                !selectedCategory
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <BiBook className="text-base opacity-70" />
              All Books
            </button>
          </li>
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] ?? defaultMeta;
            const isActive = selectedCategory === cat;
            return (
              <li key={cat}>
                <button
                  onClick={() => handleSelect(cat)}
                  className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                      isActive ? "bg-white" : meta.dot
                    }`}
                  />
                  {cat}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default CategorySidebar;