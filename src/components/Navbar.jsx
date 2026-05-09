"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX, FiLogOut, FiUser, FiShoppingBag, FiHeart } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { PiBookOpenTextLight } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "All Books",  href: "/all-books" },
  { label: "My Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [prevTotal, setPrevTotal] = useState(0);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bump animation whenever cart count increases
  useEffect(() => {
    if (totalItems > prevTotal) {
      setCartBump(true);
      const t = setTimeout(() => {
        setCartBump(false);
        setPrevTotal(totalItems);
      }, 500);
      return () => clearTimeout(t);
    } else {
      setPrevTotal(totalItems);
    }
  }, [totalItems]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => window.location.replace("/signin") },
    });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim())
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  return (
    <>
      <style>{`
        @keyframes cartBump {
          0%   { transform: scale(1) rotate(0deg); }
          25%  { transform: scale(1.35) rotate(-15deg); }
          50%  { transform: scale(0.9) rotate(8deg); }
          75%  { transform: scale(1.1) rotate(-4deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .cart-bump { animation: cartBump 0.5s cubic-bezier(.36,.07,.19,.97) both; }

        @keyframes badgePop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          60%  { transform: scale(1.4) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .badge-pop { animation: badgePop 0.35s cubic-bezier(.36,.07,.19,.97) forwards; }
      `}</style>

      <div
        className={`fixed top-0 inset-x-0 z-50 bg-white/96 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${
          isScrolled ? "shadow-lg shadow-black/5" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Left: Hamburger + Brand ── */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <PiBookOpenTextLight className="text-2xl text-gray-900 group-hover:text-amber-600 transition-colors duration-200" />
                <span
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-xl font-bold text-gray-900 select-none"
                >
                  CurvBooks
                </span>
              </Link>
            </div>

            {/* ── Center: Desktop Nav Links ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const active =
                  pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      active
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-amber-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: Cart + Auth ── */}
            <div className="flex items-center gap-2">

              {/* ── Cart Icon ── */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-amber-50 transition-colors duration-200 group"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <HiOutlineShoppingCart
                  className={`text-[22px] text-gray-700 group-hover:text-amber-600 transition-colors duration-200 ${
                    cartBump ? "cart-bump" : ""
                  }`}
                />
                {totalItems > 0 && (
                  <span
                    key={totalItems}
                    className="badge-pop absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-amber-500 text-white text-[9px] font-black rounded-full px-1 leading-none shadow-sm select-none"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>

              {/* ── Auth ── */}
              {isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : user ? (
                <div className="flex items-center gap-2">
                  {/* Avatar + dropdown */}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="cursor-pointer">
                      <div className="w-8 h-8 rounded-full ring-2 ring-gray-800 ring-offset-1 bg-gray-800 text-white flex items-center justify-center overflow-hidden select-none">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-bold">
                            {user.name?.[0]?.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    <ul
                      tabIndex={0}
                      className="dropdown-content z-50 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden p-1.5"
                    >
                      {/* User info header */}
                      <li className="px-3 py-2.5 mb-1">
                        <p className="font-bold text-sm text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </li>
                      <div className="h-px bg-gray-100 mx-1 mb-1" />
                      <li>
                        <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                          <FiUser className="text-sm text-gray-400" /> My Profile
                        </Link>
                      </li>
                      <li>
                        <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                          <FiShoppingBag className="text-sm text-gray-400" /> My Orders
                        </Link>
                      </li>
                      <li>
                        <Link href="/wishlist" className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                          <FiHeart className="text-sm text-gray-400" /> Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link href="/cart" className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                          <HiOutlineShoppingCart className="text-sm text-gray-400" />
                          Cart
                          {totalItems > 0 && (
                            <span className="ml-auto bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                              {totalItems}
                            </span>
                          )}
                        </Link>
                      </li>
                      <div className="h-px bg-gray-100 mx-1 my-1" />
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <FiLogOut className="text-sm" /> Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Desktop: name */}
                  <span className="hidden lg:block text-sm font-semibold text-gray-900 truncate max-w-[100px]">
                    {user.name}
                  </span>

                  {/* Desktop: sign out button */}
                  <button
                    onClick={handleSignOut}
                    className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    <FiLogOut className="text-xs" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 pt-4 pb-5 space-y-1.5">

            {/* Mobile search */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 mb-3">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search books..."
                className="bg-transparent outline-none text-sm flex-1 text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Mobile user info */}
            {user && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl mb-2">
                <div className="w-10 h-10 rounded-full ring-2 ring-gray-800 ring-offset-1 bg-gray-800 text-white flex items-center justify-center overflow-hidden shrink-0">
                  {user.image ? (
                    <img src={user.image} alt={user.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold">{user.name?.[0]?.toUpperCase()}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            )}

            {/* Nav links */}
            {NAV_LINKS.map(({ label, href }) => {
              const active =
                pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-amber-50 text-amber-700 font-bold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {label}
                  {active && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                </Link>
              );
            })}

            {/* Cart link */}
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === "/cart"
                  ? "bg-amber-50 text-amber-700 font-bold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <HiOutlineShoppingCart className="text-base" />
                Cart
              </span>
              {totalItems > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Sign out / Sign in */}
            <div className="pt-2 border-t border-gray-100">
              {user ? (
                <button
                  onClick={() => { setIsMenuOpen(false); handleSignOut(); }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  <FiLogOut /> Sign Out
                </button>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import { FiSearch, FiMenu, FiX, FiLogOut, FiUser, FiShoppingBag, FiHeart } from "react-icons/fi";
// import { PiBookOpenTextLight } from "react-icons/pi";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { authClient } from "@/lib/auth-client";

// const NAV_LINKS = [
//   { label: "Home",      href: "/" },
//   { label: "All Books", href: "/all-books" },
//   { label: "Wishlist",   href: "/wishlist" },
//   { label: "Blog",       href: "/blog" },
//   { label: "About Us",   href: "/about" },
//    { label: "My Profile",   href: "/profile" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen]   = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isScrolled, setIsScrolled]   = useState(false);

//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 8);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // useEffect(() => { setIsMenuOpen(false); }, [pathname]);

//   const handleSignOut = async () => {
//     await authClient.signOut({
//       fetchOptions: { onSuccess: () => window.location.replace("/") },
//     });
//   };

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim())
//       window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
//   };

//   return (
//     <>
//       <div className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-base-200 transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
//         <div className="navbar max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16">

//           {/* ── Left: Hamburger (mobile) + Brand ── */}
//           <div className="navbar-start gap-2">
//             {/* Hamburger — mobile/tablet */}
//             <button
//               className="btn btn-ghost btn-sm lg:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
//             </button>

//             {/* Brand */}
//             <Link href="/" className="flex items-center gap-1.5">
//               <PiBookOpenTextLight className="text-2xl text-base-content" />
//               <span
//                 style={{ fontFamily: "'Playfair Display', serif" }}
//                 className="text-xl font-bold text-base-content select-none"
//               >
//                 CurvBooks
//               </span>
//             </Link>
//           </div>

//           {/* ── Center: Desktop Nav Links ── */}
//           <div className="navbar-center hidden lg:flex">
//             <ul className="menu menu-horizontal gap-1 p-0">
//               {NAV_LINKS.map(({ label, href }) => {
//                 const active = pathname === href || pathname.startsWith(href + "/");
//                 return (
//                   <li key={href}>
//                     <Link
//                       href={href}
//                       className={`relative text-sm font-medium rounded-md px-3 py-1.5 transition-colors ${
//                         active
//                           ? "text-base-content bg-transparent"
//                           : "text-base-content/60 hover:text-base-content hover:bg-base-200"
//                       }`}
//                     >
//                       {label}
//                       {active && (
//                         <span className="absolute bottom-0.5 inset-x-3 h-0.5 bg-amber-500 rounded-full" />
//                       )}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           {/* ── Right: Search + Auth ── */}
//           <div className="navbar-end gap-2">
//             {/* Search — desktop */}
//             <div className="hidden md:flex items-center border-b border-base-300 hover:border-base-content focus-within:border-base-content transition-colors pb-0.5 gap-1.5">
//               <FiSearch className="text-base-content/40 text-sm shrink-0" />
//               <input
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleSearch}
//                 placeholder="Search book..."
//                 className="bg-transparent outline-none text-sm w-36 lg:w-48 placeholder:text-base-content/40"
//               />
//             </div>

//             {/* Auth */}
//             {isPending ? (
//               <span className="loading loading-spinner loading-sm" />
//             ) : user ? (
//               <div className="dropdown dropdown-end">
//                 <div tabIndex={0} role="button" className="avatar placeholder cursor-pointer">
//                   <div className="w-8 rounded-full ring-2 ring-[#1A1A1B] ring-offset-1 bg-neutral text-neutral-content">
//                     {user.image ? (
//                       <img src={user?.image} alt={user.name} referrerPolicy="no-referrer" />
                      
//                     ) : (
//                       <span className="text-xs font-bold">{user.name?.[0]?.toUpperCase()}</span>
//                     )}
//                   </div>
//                 </div>
//                 <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg border border-base-200 mt-2">
//                   <li className="menu-title px-2 pb-2 border-b border-base-200 mb-1">
//                     <p className="font-semibold text-sm text-base-content truncate">{user.name}</p>
//                     <p className="text-xs text-base-content/50 truncate font-normal">{user.email}</p>
//                   </li>
//                   <li><Link href="/profile"><FiUser /> My Profile</Link></li>
//                   <li><Link href="/orders"><FiShoppingBag /> My Orders</Link></li>
//                   <li><Link href="/wishlist"><FiHeart /> Wishlist</Link></li>
//                   <li className="border-t border-base-200 mt-1 pt-1">
//                     <button onClick={handleSignOut} className="text-error">
//                       <FiLogOut /> Sign Out
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             ) : (
//               <Link
//                 href="/signin"
//                 className="btn btn-outline btn-sm rounded-md border-base-content text-base-content hover:bg-base-content hover:text-base-100 font-medium"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* ── Mobile/Tablet Dropdown Menu ── */}
//         {isMenuOpen && (
//           <div className="lg:hidden bg-white border-t border-base-200 shadow-lg">
//             <div className="max-w-screen-xl mx-auto px-4 py-3">
//               {/* Mobile Search */}
//               <div className="flex items-center gap-2 border-b border-base-300 pb-3 mb-2">
//                 <FiSearch className="text-base-content/40 shrink-0" />
//                 <input
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={handleSearch}
//                   placeholder="Search book..."
//                   className="bg-transparent outline-none text-sm flex-1 placeholder:text-base-content/40"
//                 />
//               </div>

//               {/* Mobile Nav Links */}
//               <ul className="menu p-0 gap-0.5">
//                 {NAV_LINKS.map(({ label, href }) => {
//                   const active = pathname === href || pathname.startsWith(href + "/");
//                   return (
//                     <li key={href}>
//                       <Link
//                         href={href}
//                         onClick={() => setIsMenuOpen(false)}
//                         className={`text-[15px] font-medium py-3 rounded-md ${
//                           active ? "text-amber-600 bg-amber-50" : "text-base-content/70"
//                         }`}
//                       >
//                         {label}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>

//               {/* Mobile Sign In/Out */}
//               <div className="pt-3 border-t border-base-200 mt-2">
//                 {user ? (
//                   <button
//                     onClick={() => { setIsMenuOpen(false); handleSignOut(); }}
//                     className="btn btn-error btn-outline btn-sm w-full gap-2"
//                   >
//                     <FiLogOut /> Sign Out
//                   </button>
//                 ) : (
//                   <Link
//                     href="/signin"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="btn btn-neutral btn-sm w-full"
//                   >
//                     Sign In
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Spacer */}
//       <div className="h-16" aria-hidden="true" />
//     </>
//   );
// }