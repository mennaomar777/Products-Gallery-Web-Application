import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Card({ product }) {
  return (
    <>
      <Link to={`/ProductDetails/${product.id}`}>
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-6 hover:border-indigo-100 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="object-contain h-48 w-full mx-auto mb-4 group-hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-md font-semibold text-[#343A40] truncate my-3 dark:text-gray-100">
            {product.title}
          </h2>
          <div className="flex gap-1 items-center">
            {Array.from({ length: 5 }, (_, i) => {
              return product.rating.rate >= i + 1 ? (
                <FaStar key={i} className="text-yellow-400" />
              ) : product.rating.rate > i && product.rating.rate < i + 1 ? (
                <FaStarHalfAlt className="text-yellow-400" key={i} />
              ) : (
                <FaRegStar className="text-yellow-400" key={i} />
              );
            })}
            <div className="text-sm text-gray-500 dark:text-gray-300 ms-2">
              {product.rating.rate}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
