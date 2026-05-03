import ScrollReveal from "@/hooks/ScrollReveal";
import Link from "next/link";


// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED_AUTHORS = [
  {
    id: 1,
    name: "Humayun Ahmed",
    nationality: "Bangladeshi",
    birth: "1948",
    death: "2012",
    genre: "Fiction · Fantasy · Mystery",
    bio: "One of the most widely read Bangladeshi authors of the 20th century, Humayun Ahmed transformed Bengali popular fiction. His writing, known for its gentle humour and deep humanity, produced iconic characters like Himu and Misir Ali that became cultural touchstones across generations.",
    books: [
      { id: 1, title: "Nondito Noroke", year: "1972", cover: "https://i.ibb.co.com/DgH9xJz4/0008739161-L.jpg" },
      { id: 2, title: "Shonkhonil Karagar", year: "1973", cover: "https://i.ibb.co.com/HLnx8y0t/0008231856-L.jpg" },
      { id: 3, title: "Himu", year: "1990", cover: "https://i.ibb.co.com/RkWHwNJg/0008226192-L.jpg" },
      { id: 4, title: "Misir Ali", year: "1985", cover: "https://i.ibb.co.com/DPM1tsym/0010522647-L.jpg" },
    ],
    image: "https://i.ibb.co.com/mVydHmy7/Humayun-Ahmed-13-Nov2010.jpg",
    quoteEn: "I dream, therefore I live.",
    totalBooks: 200,
    awards: ["Bangla Academy Award", "Ekushey Padak"],
  },
  {
    id: 2,
    name: "Albert Camus",
    nationality: "French-Algerian",
    birth: "1913",
    death: "1960",
    genre: "Absurdism · Philosophy · Fiction",
    bio: "Nobel Prize-winning author whose philosophy of the absurd — the conflict between humanity's desire for meaning and the universe's silence — defined an entire intellectual era. His prose, spare and luminous, gave voice to the existential anxieties of the 20th century.",
    books: [
      { id: 1, title: "The Stranger", year: "1942", cover: "https://covers.openlibrary.org/b/id/8739161-L.jpg" },
      { id: 2, title: "The Plague", year: "1947", cover: "https://covers.openlibrary.org/b/id/8226192-L.jpg" },
      { id: 3, title: "The Rebel", year: "1951", cover: "https://i.ibb.co.com/PsXTwWWV/Screenshot-44.png" },
      { id: 4, title: "The Fall", year: "1956", cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
    ],
    image: "https://i.ibb.co.com/JRyWmLKn/Albert-Camus-gagnant-de-prix-Nobel-portrait-en-buste-pos-au-bureau-faisant-face-gauche-cigar.jpg",
    quoteEn: "In the depths of winter, I finally learned that within me there lay an invincible summer.",
    totalBooks: 14,
    awards: ["Nobel Prize in Literature 1957"],
  },
];

// ─── Marquee strip ────────────────────────────────────────────────────────────
const MarqueeStrip = ({ books }) => {
  const items = [...books, ...books, ...books, ...books];
  return (
    <div className="overflow-hidden whitespace-nowrap border-t border-b border-white/10 py-3 my-8">
      <div className="inline-flex animate-marquee gap-10">
        {items.map((b, i) => (
          <span key={i} className="text-xs tracking-[0.2em] uppercase text-white/40 font-light">
            {b.title}
            <span className="mx-5 text-white/20">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Single Author Card ───────────────────────────────────────────────────────
const AuthorCard = ({ author, reversed = false }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[600px] ${reversed ? "lg:grid-flow-dense" : ""}`}>

    {/* Portrait side */}
    <ScrollReveal
      animation={reversed ? "animate__fadeInRight" : "animate__fadeInLeft"}
      className={`relative overflow-hidden ${reversed ? "lg:col-start-2" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent z-10" />
      <div
        className="absolute inset-0 z-20 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "150px",
        }}
      />
      <img
        src={author.image}
        alt={author.name}
        className="w-full h-full object-cover object-top grayscale contrast-110 brightness-75"
        style={{ minHeight: "500px" }}
      />
      {/* Birth–Death badge */}
      <ScrollReveal
        animation="animate__fadeInUp"
        delay="0.3s"
        className="absolute bottom-6 left-6 z-30"
      >
        <span
          className="text-xs font-bold tracking-[0.25em] uppercase text-white/50 border border-white/20 px-3 py-1"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {author.birth} — {author.death}
        </span>
      </ScrollReveal>
    </ScrollReveal>

    {/* Content side */}
    <ScrollReveal
      animation={reversed ? "animate__fadeInLeft" : "animate__fadeInRight"}
      className={`bg-[#0e0e0e] flex flex-col justify-center px-10 lg:px-16 py-16 ${reversed ? "lg:col-start-1 lg:row-start-1" : ""}`}
    >
      {/* Genre */}
      <ScrollReveal animation="animate__fadeIn" delay="0.2s">
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {author.genre}
        </p>
      </ScrollReveal>

      {/* Name */}
      <ScrollReveal animation="animate__fadeInUp" delay="0.3s">
        <h2
          className="text-4xl lg:text-5xl font-black text-white leading-none mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {author.name}
        </h2>
        <p
          className="text-xs tracking-widest uppercase text-white/30 mb-8"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {author.nationality}
        </p>
      </ScrollReveal>

      {/* Quote */}
      <ScrollReveal animation="animate__fadeIn" delay="0.4s">
        <blockquote className="border-l-2 border-white/20 pl-5 mb-8">
          <p
            className="text-base italic text-white/50 leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "{author.quoteEn}"
          </p>
        </blockquote>
      </ScrollReveal>

      {/* Bio */}
      <ScrollReveal animation="animate__fadeIn" delay="0.5s">
        <p
          className="text-sm text-white/60 leading-7 mb-10"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {author.bio}
        </p>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal animation="animate__fadeInUp" delay="0.5s">
        <div className="flex gap-8 mb-10 border-t border-white/10 pt-6">
          <div>
            <p className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {author.totalBooks}+
            </p>
            <p className="text-[10px] tracking-widest uppercase text-white/30">Books</p>
          </div>
          <div className="border-l border-white/10 pl-8">
            <p className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {author.awards.length}
            </p>
            <p className="text-[10px] tracking-widest uppercase text-white/30">Awards</p>
          </div>
          <div className="border-l border-white/10 pl-8">
            <p className="text-sm font-semibold text-white/70" style={{ fontFamily: "'Courier New', monospace" }}>
              {author.awards[0]}
            </p>
            <p className="text-[10px] tracking-widest uppercase text-white/30">Top Award</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Book shelf */}
      <div className="flex gap-3 mb-10">
        {author.books.map((book, i) => (
          <ScrollReveal key={book.id} animation="animate__zoomIn" delay={`${0.3 + i * 0.1}s`} className="flex-shrink-0">
            <Link href={`/books/${book.id}`} className="group block">
              <div className="w-14 h-20 bg-white/5 border border-white/10 overflow-hidden group-hover:border-white/40 transition-all duration-300 group-hover:scale-105">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <p className="text-[9px] text-white/25 mt-1 leading-tight truncate w-14 group-hover:text-white/50 transition-colors">
                {book.year}
              </p>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal animation="animate__fadeInUp" delay="0.6s" className="self-start">
        <Link
          href={`/authors/${author.id}`}
          className="flex items-center gap-3 border border-white text-white text-xs font-bold
                     tracking-[0.2em] uppercase px-6 py-3
                     hover:bg-white hover:text-black transition-all duration-300 group"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          Explore Author
          <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
        </Link>
      </ScrollReveal>
    </ScrollReveal>

  </div>
);

// ─── Featured Authors Section ─────────────────────────────────────────────────
const FeaturedAuthors = () => (
  <section className="bg-[#0e0e0e]">

    {/* Section header */}
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-4 flex items-end justify-between">
      <div>
        <ScrollReveal animation="animate__fadeInDown">
          <p
            className="text-[10px] tracking-[0.35em] uppercase text-white/30 mb-2"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Get to know
          </p>
        </ScrollReveal>
        <ScrollReveal animation="animate__fadeInDown" delay="0.1s">
          <h2
            className="text-3xl font-black text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Authors
          </h2>
        </ScrollReveal>
      </div>
      <ScrollReveal animation="animate__fadeIn" delay="0.2s">
        <Link
          href="/authors"
          className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          See all
        </Link>
      </ScrollReveal>
    </div>

    {/* Divider */}
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-px bg-white/10" />
    </div>

    {/* Author cards */}
    <div className="divide-y divide-white/10">
      {FEATURED_AUTHORS.map((author, i) => (
        <div key={author.id}>
          <AuthorCard author={author} reversed={i % 2 !== 0} />
          {i < FEATURED_AUTHORS.length - 1 && <MarqueeStrip books={author.books} />}
        </div>
      ))}
    </div>

    {/* Bottom marquee */}
    <MarqueeStrip books={FEATURED_AUTHORS.flatMap((a) => a.books)} />
  </section>
);

export default FeaturedAuthors;