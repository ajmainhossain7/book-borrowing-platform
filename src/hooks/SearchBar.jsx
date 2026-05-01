"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ defaultValue = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // FIX: Use controlled input instead of `defaultValue` (uncontrolled).
  // With uncontrolled input, clicking the X FilterPill in AllBooksPage navigates
  // to a URL without `?search=`, but the input keeps showing the old text because
  // React never re-mounts it. Controlled input + useEffect keeps them in sync.
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (val) => {
    setValue(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    params.delete("page");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <FiSearch
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none transition-colors ${
          isPending ? "text-gray-300" : "text-gray-400"
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search books by title…"
        className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 focus:border-gray-900 outline-none text-sm text-gray-800 placeholder-gray-400 bg-white transition-colors rounded-sm"
        style={{ fontFamily: "'Playfair Display', serif" }}
      />
      {value && (
        <button
          onClick={() => handleChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchBar;