import Link from "next/link";
import { FiStar, FiShoppingCart, FiClock } from "react-icons/fi";
import { HiOutlineFire } from "react-icons/hi";

// ─── Book data with discount info ─────────────────────────────────────────────
const OFFER_BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    available_quantity: 15,
    rating: 4.5,
    image_url: "https://i.ibb.co.com/khHN7Pk/9780143454212.jpg",
    originalPrice: 24.0,
    discount: 50,
    accent: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-500",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    available_quantity: 8,
    rating: 4.8,
    image_url: "https://i.ibb.co.com/0cv102J/To-Kill-a-Mockingbird.webp",
    originalPrice: 28.0,
    discount: 30,
    accent: "bg-rose-50",
    border: "border-rose-200",
    badge: "bg-rose-500",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    available_quantity: 12,
    rating: 4.6,
    image_url: "https://i.ibb.co.com/nsc8CxP0/7222246-L.jpg",
    originalPrice: 36.0,
    discount: 20,
    accent: "bg-sky-50",
    border: "border-sky-200",
    badge: "bg-sky-500",
  },
  {
    id: 4,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    available_quantity: 5,
    rating: 4.3,
    image_url: "https://i.ibb.co.com/0jMs2y1Y/catcherrye-edited-1-800x.jpg",
    originalPrice: 22.0,
    discount: 35,
    accent: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-500",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classic",
    available_quantity: 20,
    rating: 4.7,
    image_url: "https://i.ibb.co.com/YdQDMpn/81me-ud-V63-L-AC-UF1000-1000-QL80.jpg",
    originalPrice: 26.0,
    discount: 40,
    accent: "bg-pink-50",
    border: "border-pink-200",
    badge: "bg-pink-500",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    available_quantity: 10,
    rating: 4.9,
    image_url: "https://i.ibb.co.com/xS8YvxL/81m-CE-uclx-L-UF1000-1000-QL80.jpg",
    originalPrice: 32.0,
    discount: 25,
    accent: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-500",
  },
];

// ─── Star display ─────────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <FiStar
        key={s}
        className={`text-[10px] ${s <= Math.round(rating)
          ? "fill-amber-400 text-amber-400"
          : "text-gray-200 fill-gray-200"
          }`}
      />
    ))}
    <span className="text-[10px] text-gray-400 ml-1">{rating}</span>
  </div>
);

// ─── Offer Card ───────────────────────────────────────────────────────────────
const OfferCard = ({ book }) => {
  const discountedPrice = (book.originalPrice * (1 - book.discount / 100)).toFixed(2);

  return (
    <div
      className={`group relative flex flex-col border-base-300 border-1 hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 overflow-hidden`}
    >
      {/* Discount badge */}
      <div className={`absolute top-3 right-3 z-10  text-[#1A1A1B] text-[15px] font-black px-2 py-1 tracking-wider`}
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        -{book.discount}%
      </div>

      {/* Cover */}
      <div className="relative flex justify-center pt-8 pb-4 px-6">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 80%, currentColor 0%, transparent 70%)`,
          }}
        />
        <div className="relative w-28 h-40 shadow-lg group-hover:shadow-2xl transition-shadow duration-400 group-hover:-translate-y-1 transition-transform">
          <img
            src={book.image_url}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-5 pb-5 gap-2">
        <p
          className="text-[9px] tracking-[0.25em] uppercase text-gray-400"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {book.category}
        </p>
        <h3
          className="text-sm font-black text-gray-900 leading-tight line-clamp-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {book.title}
        </h3>
        <p className="text-xs text-gray-500" style={{ fontFamily: "'Georgia', serif" }}>
          {book.author}
        </p>

        <Stars rating={book.rating} />

        {/* Stock warning */}
        {book.available_quantity <= 8 && (
          <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
            Only {book.available_quantity} left
          </p>
        )}

        {/* Price row */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-black/5">
          <div>
            <p className="text-[10px] text-gray-400 line-through">${book.originalPrice.toFixed(2)}</p>
            <p
              className="text-lg font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ${discountedPrice}
            </p>
          </div>
          <Link
            href={`/books/${book.id}`}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-2 hover:bg-rose-500 transition-colors duration-300"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            <FiShoppingCart className="text-xs" /> Add
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Featured large offer card (first book) ───────────────────────────────────
const HeroOfferCard = ({ book }) => {
  const discountedPrice = (book.originalPrice * (1 - book.discount / 100)).toFixed(2);
  return (
    <div className="relative bg-[#1A1A1B] text-white overflow-hidden flex flex-col justify-between p-8 min-h-[320px]">
      {/* BG cover blur */}
      <img
        src={book.image_url}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm scale-110"
      />
      <div className="absolute inset-0 bg-[#1A1A1B]" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineFire className="text-rose-400 text-base" />
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-rose-400 font-bold"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Deal of the month
          </span>
        </div>
        <h3
          className="text-3xl font-black text-white leading-tight mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {book.title}
        </h3>
        <p className="text-sm text-white/50 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
          by {book.author}
        </p>
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-4xl font-black text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            -{book.discount}%
          </span>
          <div>
            <p className="text-xs text-white/40 line-through">${book.originalPrice.toFixed(2)}</p>
            <p className="text-xl font-bold text-rose-400">${discountedPrice}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-3">
        <Link
          href={`/all-books/${book.id}`}
          className="flex items-center gap-2 bg-white text-gray-900 text-xs font-black tracking-wider uppercase px-6 py-3 hover:bg-rose-500 hover:text-white transition-all duration-300"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          <FiShoppingCart className="text-xs" /> Grab Deal
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <FiClock className="text-xs" />
          <span style={{ fontFamily: "'Courier New', monospace" }}>Limited time</span>
        </div>
      </div>

      {/* Cover image floating */}
      <div className="absolute right-6 bottom-6 w-24 h-36 shadow-2xl rotate-3 opacity-80 hover:opacity-100 hover:rotate-0 transition-all duration-500">
        <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const OffersSection = () => {
  const [hero, ...rest] = OFFER_BOOKS;

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
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors border-b border-gray-200 hover:border-gray-900 pb-0.5"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            See all →
          </Link>
        </div>

        {/* Layout: hero left + grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Hero card spans full height */}
          <div className="lg:col-span-1">
            <HeroOfferCard book={hero} />
          </div>

          {/* 5 offer cards in 2+3 layout */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {rest.map((book) => (
              <OfferCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F9F8F6] px-8 py-5">
          <div className="flex items-center gap-3">
            <HiOutlineFire className="text-amber-500 text-xl" />
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