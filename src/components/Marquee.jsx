// MarqueeWrapper.jsx (Server Component)

import MarqueeClient from "@/hooks/MarqueeClient";


const MarqueeWrapper = async () => {
  const res = await fetch('https://book-borrowing-platform.vercel.app/data.json', {
    cache: "no-store",
  });
  const books = await res.json();

  return <MarqueeClient books={books} />;
};

export default MarqueeWrapper;