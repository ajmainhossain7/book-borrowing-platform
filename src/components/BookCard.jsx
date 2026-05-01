"use client";

import Image from "next/image";
import Link from "next/link";
import { FiStar } from "react-icons/fi";

const CATEGORY_COLORS = {
  Classic: "bg-amber-100 text-amber-800",
  Fiction: "bg-blue-100 text-blue-800",
  Fantasy: "bg-purple-100 text-purple-800",
  Mystery: "bg-rose-100 text-rose-800",
};

const BookCard = ({ book }) => {
  const {
    id,
    title,
    author,
    category,
    available_quantity,
    rating,
    image_url,
  } = book;

  const categoryStyle = CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-700";

  return (
    <div className="group flex flex-col bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
      
      {/* Book Cover */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category top-left */}
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 ${categoryStyle}`}>
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-3">

        {/* Title */}
        <h3
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-sm font-bold text-gray-900 leading-snug line-clamp-1"
        >
          {title}
        </h3>

        {/* Author */}
        <p className="text-xs text-gray-500">
          by: <span className="font-medium text-gray-700">{author}</span>
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              className={`text-xs ${
                star <= Math.round(rating)
                  ? "text-amber-500 fill-amber-500"
                  : "text-gray-300 fill-gray-200"
              }`}
            />
          ))}
          <span className="text-[11px] text-gray-400 ml-1">({rating})</span>
        </div>

        {/* Stock */}
        <p className={`text-[11px] font-medium ${
          available_quantity > 10
            ? "text-green-600"
            : available_quantity > 0
            ? "text-orange-500"
            : "text-red-500"
        }`}>
          {available_quantity > 0 ? `${available_quantity} in stock` : "Out of stock"}
        </p>

        {/* View Details Button */}
        <Link
          href={`/books/${id}`}
          className="mt-1 flex items-center justify-center gap-1.5 border border-gray-900 text-gray-900 text-xs font-semibold py-1.5 hover:bg-gray-900 hover:text-white transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;