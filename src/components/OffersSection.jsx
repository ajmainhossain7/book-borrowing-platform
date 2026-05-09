"use client";

import { useState } from "react";
import Link from "next/link";
import { FiStar, FiShoppingCart, FiClock, FiCheck } from "react-icons/fi";
import { HiOutlineFire, HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "@/context/CartContext";       // ← your CartContext
import { useCartToast } from "@/hooks/useCartToast";   // ← reusable toast hook

// ─── Complete book data (all 9 books) ─────────────────────────────────────────
const BOOKS_DATA = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A timeless masterpiece that delves into the decadence and disillusionment of the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
    category: "Classic",
    available_quantity: 15,
    rating: 4.5,
    image_url: "https://i.ibb.co.com/khHN7Pk/9780143454212.jpg",
    borrow_duration: 14,
    pages: 180,
    language: "English",
    published_year: 1925,
    isbn: "978-0-7432-7356-5",
    quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
    quote_author: "F. Scott Fitzgerald",
    originalPrice: 370,
    discount: 50,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A profound novel set in the American South, exploring racial injustice and moral growth through the eyes of young Scout Finch as her father defends a Black man falsely accused of a crime.",
    category: "Fiction",
    available_quantity: 8,
    rating: 4.8,
    image_url: "https://i.ibb.co.com/0cv102J/To-Kill-a-Mockingbird.webp",
    borrow_duration: 14,
    pages: 281,
    language: "English",
    published_year: 1960,
    isbn: "978-0-06-112008-4",
    quote: "You never really understand a person until you consider things from his point of view.",
    quote_author: "Harper Lee",
    originalPrice: 520,
    discount: 30,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description: "A chilling dystopian novel set in a totalitarian society ruled by Big Brother, where independent thinking is a crime and the truth is whatever the Party says it is.",
    category: "Fiction",
    available_quantity: 12,
    rating: 4.6,
    image_url: "https://i.ibb.co.com/nsc8CxP0/7222246-L.jpg",
    borrow_duration: 14,
    pages: 328,
    language: "English",
    published_year: 1949,
    isbn: "978-0-452-28423-4",
    quote: "Big Brother is watching you.",
    quote_author: "George Orwell",
    originalPrice: 450,
    discount: 20,
  },
  {
    id: 4,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "Narrated by the rebellious teenager Holden Caulfield, this coming-of-age story explores themes of alienation, identity, and the loss of innocence in post-war America.",
    category: "Fiction",
    available_quantity: 5,
    rating: 4.3,
    image_url: "https://i.ibb.co.com/0jMs2y1Y/catcherrye-edited-1-800x.jpg",
    borrow_duration: 10,
    pages: 214,
    language: "English",
    published_year: 1951,
    isbn: "978-0-316-76948-0",
    quote: "Not everyone has what it takes to be nothing.",
    quote_author: "J.D. Salinger",
    originalPrice: 400,
    discount: 35,
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A witty and romantic novel following Elizabeth Bennet as she navigates issues of manners, marriage, and morality in Regency-era England.",
    category: "Classic",
    available_quantity: 20,
    rating: 4.7,
    image_url: "https://i.ibb.co.com/YdQDMpn/81me-ud-V63-L-AC-UF1000-1000-QL80.jpg",
    borrow_duration: 14,
    pages: 432,
    language: "English",
    published_year: 1813,
    isbn: "978-0-14-143951-8",
    quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    quote_author: "Jane Austen",
    originalPrice: 836,
    discount: 40,
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "The beloved prequel to The Lord of the Rings, following the reluctant hobbit Bilbo Baggins on a grand quest with a company of dwarves to reclaim their homeland from the fearsome dragon Smaug.",
    category: "Fantasy",
    available_quantity: 10,
    rating: 4.9,
    image_url: "https://i.ibb.co.com/xS8YvxL/81m-CE-uclx-L-UF1000-1000-QL80.jpg",
    borrow_duration: 21,
    pages: 310,
    language: "English",
    published_year: 1937,
    isbn: "978-0-618-00221-4",
    quote: "There is nothing like looking, if you want to find something.",
    quote_author: "J.R.R. Tolkien",
    originalPrice: 650,
    discount: 25,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const calcSalePrice = (original, discount) =>
  Math.round(original * (1 - discount / 100));

const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <FiStar
        key={s}
        className={`text-[10px] ${
          s <= Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "text-gray-200 fill-gray-200"
        }`}
      />
    ))}
    <span className="text-[10px] text-gray-400 ml-1">{rating}</span>
  </div>
);

// ─── Add to Cart Button ───────────────────────────────────────────────────────
// Reusable button — handles added state, out-of-stock, cart context & toast.
const AddToCartButton = ({ book, className = "" }) => {
  const { addToCart, cartItems } = useCart();
  const showCartToast = useCartToast();
  const [added, setAdded] = useState(false);

  const isOutOfStock = book.available_quantity === 0;
  const inCart = cartItems.some((i) => i.id === book.id);

  const handleAddToCart = () => {
    if (isOutOfStock || added) return;
    addToCart(book);
    showCartToast(book);
    setAdded(true);
    // Reset "added" flash after 2.5s so it matches toast duration
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className={`flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-wider uppercase transition-all duration-300
        ${isOutOfStock
          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
          : added || inCart
          ? "bg-emerald-500 text-white scale-[0.98]"
          : "bg-gray-900 text-white hover:bg-rose-500 active:scale-[0.97]"
        } ${className}`}
    >
      {added || inCart ? (
        <>
          <FiCheck className="text-xs" />
          Added
        </>
      ) : (
        <>
          <HiOutlineShoppingCart className="text-xs" />
          {isOutOfStock ? "Unavailable" : "Add"}
        </>
      )}
    </button>
  );
};

// ─── Offer Card ───────────────────────────────────────────────────────────────
const OfferCard = ({ book }) => {
  const salePrice = calcSalePrice(book.originalPrice, book.discount);

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Discount badge */}
      <span
        className="absolute top-2 right-2 z-10 text-[11px] font-black text-gray-900 tracking-wide"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        -{book.discount}%
      </span>

      {/* Book cover */}
      <div className="flex justify-center items-center pt-7 pb-3 px-4">
        <div className="w-[88px] h-[128px] shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0">
          <img
            src={book.image_url}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-3 pb-4 gap-1">
        <p
          className="text-[8px] tracking-[0.2em] uppercase text-gray-400"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {book.category}
        </p>
        <h3
          className="text-[13px] font-black text-gray-900 leading-tight line-clamp-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {book.title}
        </h3>
        <p
          className="text-[11px] text-gray-500 line-clamp-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {book.author}
        </p>

        <Stars rating={book.rating} />

        {book.available_quantity <= 8 && (
          <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
            Only {book.available_quantity} left
          </p>
        )}

        {/* Price + Add button */}
        <div className="flex items-end justify-between mt-auto pt-2 border-t border-black/5">
          <div>
            <p className="text-[10px] text-gray-400 line-through">Tk {book.originalPrice}</p>
            <p
              className="text-[15px] font-black text-gray-900 leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tk {salePrice}
            </p>
          </div>
          {/* ← AddToCartButton replaces the old <Link> Add button */}
          <AddToCartButton book={book} className="px-2.5 py-1.5 rounded-none" />
        </div>
      </div>
    </div>
  );
};

// ─── Hero Card ────────────────────────────────────────────────────────────────
const HeroOfferCard = ({ book }) => {
  const salePrice = calcSalePrice(book.originalPrice, book.discount);

  return (
    <div className="relative bg-[#1A1A1B] text-white overflow-hidden flex flex-col p-8">
      {/* Blurred BG */}
      <img
        src={book.image_url}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm scale-110 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1B]/60 via-[#1A1A1B]/80 to-[#1A1A1B] pointer-events-none" />

      {/* Floating book cover */}
      <div className="absolute top-6 right-6 w-20 h-[120px] shadow-2xl rotate-3 opacity-75 hover:opacity-100 hover:rotate-0 transition-all duration-500 z-10">
        <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-5">
          <HiOutlineFire className="text-rose-400 text-sm" />
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-rose-400 font-bold"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Deal of the month
          </span>
        </div>

        <h3
          className="text-2xl font-black text-white leading-tight mb-1 pr-24"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {book.title}
        </h3>
        <p className="text-sm text-white/50 mb-2 pr-24" style={{ fontFamily: "'Georgia', serif" }}>
          by {book.author}
        </p>

        <p
          className="text-[10px] text-white/25 mb-5"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {book.pages} pages &middot; {book.published_year} &middot; {book.category}
        </p>

        <div className="flex items-center gap-4 mb-3">
          <span
            className="text-4xl font-black text-white leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            -{book.discount}%
          </span>
          <div>
            <p className="text-xs text-white/40 line-through">Tk {book.originalPrice}</p>
            <p
              className="text-xl font-bold text-rose-400 leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tk {salePrice}
            </p>
          </div>
        </div>

        <p
          className="text-[10px] text-white/25 mb-6"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          Borrow for {book.borrow_duration} days
        </p>

        {/* CTA row — AddToCartButton + "Limited time" label */}
        <div className="flex items-center gap-3">
          {/* ← Hero uses the same AddToCartButton, styled for dark bg */}
          <AddToCartButton
            book={book}
            className="px-5 py-2.5 !bg-white !text-gray-900 hover:!bg-rose-500 hover:!text-white [&.bg-emerald-500]:!bg-emerald-500 [&.bg-emerald-500]:!text-white"
          />
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            <FiClock className="text-xs" />
            <span style={{ fontFamily: "'Courier New', monospace" }}>Limited time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
// Wrap your app/page with <CartProvider> and <Toaster> from react-hot-toast.
// Pass `books` prop for server/API data; falls back to BOOKS_DATA.
const OffersSection = ({ books = BOOKS_DATA }) => {
  const [hero, ...rest] = books;
  const offerBooks = rest.slice(0, 8);

  return (
    <section className="bg-[#faf9f6] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              This month only
            </p>
            <h2
              className="text-4xl font-black text-gray-900 leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Special Offers
              <span className="text-rose-500">.</span>
            </h2>
          </div>
          <Link
            href="/all-books"
            className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors border-b border-gray-200 hover:border-gray-900 pb-0.5"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            See all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          {hero && (
            <div className="lg:col-span-1">
              <HeroOfferCard book={hero} />
            </div>
          )}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {offerBooks.map((book) => (
              <OfferCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Member strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-8 py-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <HiOutlineFire className="text-amber-500 text-xl flex-shrink-0" />
            <p
              className="text-sm font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Member exclusive — extra 10% off all offers
            </p>
          </div>
          <Link
            href="/signup"
            className="flex-shrink-0 text-xs font-black tracking-widest uppercase bg-gray-900 text-white px-6 py-2.5 hover:bg-amber-500 transition-colors duration-300"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Join Now →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OffersSection;