"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ defaultValue = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Controlled so the X pill in AllBooksPage also clears the input
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
          isPending ? "text-[#E2E2E2]" : "text-[#8B8B8B]"
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search books by title…"
        className="w-full pl-11 pr-10 py-3 border-2 border-[#E2E2E2] focus:border-[#1A1A1B] outline-none text-sm text-[#1A1A1B] placeholder-[#8B8B8B] bg-white transition-colors rounded-sm"
        style={{ fontFamily: "'Playfair Display', serif" }}
      />
      {value && (
        <button
          onClick={() => handleChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8B8B] hover:text-[#1A1A1B] transition-colors"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchBar;