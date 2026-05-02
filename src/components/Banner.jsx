import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

// ─── Floating book covers (matching the reference image style) ────────────────
const BOOKS = [
  {
    src: "https://i.ibb.co.com/khHN7Pk/9780143454212.jpg",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rotate: "-rotate-6",
    translate: "-translate-y-4",
    z: "z-10",
    scale: "scale-90",
  },
  {
    src: "https://i.ibb.co.com/nsc8CxP0/7222246-L.jpg",
    title: "1984",
    author: "George Orwell",
    rotate: "rotate-0",
    translate: "-translate-y-8",
    z: "z-20",
    scale: "scale-110",
  },
  {
    src: "https://i.ibb.co.com/989qMRW/42844155.jpg",
    title: "Harry Potter",
    author: "J.K. Rowling",
    rotate: "rotate-6",
    translate: "-translate-y-4",
    z: "z-10",
    scale: "scale-90",
  },
];

const Banner = () => {
  return (
    <section
      className="relative min-h-[70vh] md:min-h-[85vh] w-full flex items-center overflow-hidden"
      style={{ backgroundColor: "#F9F8F6" }}
    >
      {/* ── Subtle grain texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Background image (blurred, very faint) ── */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/nM2W08xP/banner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px)",
        }}
      />

      {/* ── Decorative large serif number bg ── */}
      <span
        className="absolute -left-8 top-1/2 -translate-y-1/2 text-[320px] font-black text-gray-100 leading-none select-none pointer-events-none hidden lg:block"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        B
      </span>

      {/* ── Main content ── */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Left: Text content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">

            {/* Eyebrow tag */}
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-6 border border-gray-200 px-4 py-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Curated for every reader
            </p>

            {/* Main heading */}
            <h1
              className="font-[family:var(--font-playfair)]
                         text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                         text-[#1A1A1B] tracking-tighter leading-[1.05]
                         mb-6"
            >
              Find Your
              <br />
              <span className="relative inline-block">
                Next Read
                {/* Underline accent */}
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#1A1A1B]" />
              </span>
              <span className="text-rose-500">.</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-sm text-gray-500 leading-7 mb-10 max-w-sm"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Our most popular and trending books, curated perfectly.
              Not sure what to read? Start reading now.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/all-books">
                <button
                  className="font-[family:var(--font-inter)]
                             text-[10px] sm:text-xs
                             uppercase tracking-[0.2em] font-bold
                             text-white bg-[#1A1A1B]
                             py-4 px-8
                             flex gap-3 items-center
                             hover:bg-rose-500 transition-all duration-300
                             active:scale-95"
                >
                  Browse Now
                  <FaArrowRight className="text-[10px]" />
                </button>
              </Link>
              <Link href="/all-books?category=Classic">
                <button
                  className="font-[family:var(--font-inter)]
                             text-[10px] sm:text-xs
                             uppercase tracking-[0.2em] font-bold
                             text-[#1A1A1B] bg-transparent border border-[#1A1A1B]
                             py-4 px-8
                             flex gap-3 items-center
                             hover:bg-[#1A1A1B] hover:text-white transition-all duration-300
                             active:scale-95"
                >
                  Classics
                  <FaArrowRight className="text-[10px]" />
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200 w-full justify-center lg:justify-start">
              {[
                { n: "3.2K+", label: "Books" },
                { n: "12K+", label: "Readers" },
                { n: "4.8★", label: "Avg Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-xl font-black text-[#1A1A1B]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.n}
                  </p>
                  <p
                    className="text-[10px] tracking-widest uppercase text-gray-400"
                    style={{ fontFamily: "'Courier New', monospace" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating book covers */}
          <div className="relative flex items-end justify-center gap-3 sm:gap-5 pb-8 lg:pb-0 flex-shrink-0">

            {/* Soft shadow on floor */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-6 bg-black/10 blur-2xl rounded-full" />

            {BOOKS.map((book, i) => (
              <div
                key={i}
                className={`relative group flex flex-col items-center ${book.z}`}
              >
                {/* Label above (dimmed, like reference) */}
                <div className="mb-3 text-center opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                  <p
                    className="text-xs font-semibold text-gray-700 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {book.title}
                  </p>
                  <p
                    className="text-[10px] text-gray-400"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {book.author}
                  </p>
                </div>

                {/* Book cover */}
                <div
                  className={`
                    ${book.rotate} ${book.translate} ${book.scale}
                    w-28 sm:w-36 md:w-44
                    shadow-xl group-hover:shadow-2xl
                    group-hover:rotate-0 group-hover:-translate-y-3
                    transition-all duration-500 ease-out
                    cursor-pointer
                  `}
                >
                  <img
                    src={book.src}
                    alt={book.title}
                    className="w-full aspect-[2/3] object-cover"
                    style={{
                      boxShadow: "8px 8px 24px rgba(0,0,0,0.18), -2px 0 8px rgba(0,0,0,0.08)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white/60 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {[...Array(4)].flatMap(() =>
            ["New Arrivals", "◆", "Bestsellers", "◆", "Special Offers", "◆", "Classic Collection", "◆", "Fantasy Picks", "◆"]
          ).map((t, i) => (
            <span
              key={i}
              className="text-[10px] tracking-[0.25em] uppercase text-gray-400"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div> */}

    </section>
  );
};

export default Banner;