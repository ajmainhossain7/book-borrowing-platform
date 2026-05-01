"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX, FiLogOut, FiUser, FiShoppingBag, FiHeart } from "react-icons/fi";
import { PiBookOpenTextLight } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "All Books", href: "/all-books" },
  { label: "Wishlist",   href: "/wishlist" },
  { label: "Blog",       href: "/blog" },
  { label: "About Us",   href: "/about" },
   { label: "My Profile",   href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled]   = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => window.location.replace("/") },
    });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim())
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  return (
    <>
      <div className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-base-200 transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
        <div className="navbar max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16">

          {/* ── Left: Hamburger (mobile) + Brand ── */}
          <div className="navbar-start gap-2">
            {/* Hamburger — mobile/tablet */}
            <button
              className="btn btn-ghost btn-sm lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>

            {/* Brand */}
            <Link href="/" className="flex items-center gap-1.5">
              <PiBookOpenTextLight className="text-2xl text-base-content" />
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-xl font-bold text-base-content select-none"
              >
                CurvBooks
              </span>
            </Link>
          </div>

          {/* ── Center: Desktop Nav Links ── */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 p-0">
              {NAV_LINKS.map(({ label, href }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative text-sm font-medium rounded-md px-3 py-1.5 transition-colors ${
                        active
                          ? "text-base-content bg-transparent"
                          : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                      }`}
                    >
                      {label}
                      {active && (
                        <span className="absolute bottom-0.5 inset-x-3 h-0.5 bg-amber-500 rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: Search + Auth ── */}
          <div className="navbar-end gap-2">
            {/* Search — desktop */}
            <div className="hidden md:flex items-center border-b border-base-300 hover:border-base-content focus-within:border-base-content transition-colors pb-0.5 gap-1.5">
              <FiSearch className="text-base-content/40 text-sm shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search book..."
                className="bg-transparent outline-none text-sm w-36 lg:w-48 placeholder:text-base-content/40"
              />
            </div>

            {/* Auth */}
            {isPending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar placeholder cursor-pointer">
                  <div className="w-8 rounded-full ring-2 ring-[#1A1A1B] ring-offset-1 bg-neutral text-neutral-content">
                    {user.image ? (
                      <img src={user?.image} alt={user.name} referrerPolicy="no-referrer" />
                      
                    ) : (
                      <span className="text-xs font-bold">{user.name?.[0]?.toUpperCase()}</span>
                    )}
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg border border-base-200 mt-2">
                  <li className="menu-title px-2 pb-2 border-b border-base-200 mb-1">
                    <p className="font-semibold text-sm text-base-content truncate">{user.name}</p>
                    <p className="text-xs text-base-content/50 truncate font-normal">{user.email}</p>
                  </li>
                  <li><Link href="/profile"><FiUser /> My Profile</Link></li>
                  <li><Link href="/orders"><FiShoppingBag /> My Orders</Link></li>
                  <li><Link href="/wishlist"><FiHeart /> Wishlist</Link></li>
                  <li className="border-t border-base-200 mt-1 pt-1">
                    <button onClick={handleSignOut} className="text-error">
                      <FiLogOut /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                href="/signin"
                className="btn btn-outline btn-sm rounded-md border-base-content text-base-content hover:bg-base-content hover:text-base-100 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* ── Mobile/Tablet Dropdown Menu ── */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-base-200 shadow-lg">
            <div className="max-w-screen-xl mx-auto px-4 py-3">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 border-b border-base-300 pb-3 mb-2">
                <FiSearch className="text-base-content/40 shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search book..."
                  className="bg-transparent outline-none text-sm flex-1 placeholder:text-base-content/40"
                />
              </div>

              {/* Mobile Nav Links */}
              <ul className="menu p-0 gap-0.5">
                {NAV_LINKS.map(({ label, href }) => {
                  const active = pathname === href || pathname.startsWith(href + "/");
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-[15px] font-medium py-3 rounded-md ${
                          active ? "text-amber-600 bg-amber-50" : "text-base-content/70"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile Sign In/Out */}
              <div className="pt-3 border-t border-base-200 mt-2">
                {user ? (
                  <button
                    onClick={() => { setIsMenuOpen(false); handleSignOut(); }}
                    className="btn btn-error btn-outline btn-sm w-full gap-2"
                  >
                    <FiLogOut /> Sign Out
                  </button>
                ) : (
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-neutral btn-sm w-full"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}