// components/LoadingSpinner.jsx
"use client";

const LoadingSpinner = () => {
  return (
    <div
      className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* ── Spinner ── */}
      <div className="relative w-16 h-16 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#E2E2E2]" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#1A1A1B] animate-spin" />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#1A1A1B] animate-pulse" />
        </div>
      </div>

      {/* ── Text ── */}
      <p className="text-sm font-bold text-[#1A1A1B] tracking-[0.2em] uppercase mb-1">
        Loading
      </p>
      <p className="text-[11px] text-[#8B8B8B] tracking-widest uppercase">
        Finding your books…
      </p>

      {/* ── Animated dots ── */}
      <div className="flex items-center gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#1A1A1B] animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;