import { Link } from "react-router-dom";
import {
FiArrowUpRight,
FiShoppingBag,
FiCheckCircle,
FiAlertCircle,
} from "react-icons/fi";

const ProductCard = ({ product }) => {
const {
_id,
title,
description,
price,
stock,
category,
imageUrl,
} = product;

return ( <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/10">


  {/* Product Image */}
  <Link
    to={`/products/${_id}`}
    className="relative block overflow-hidden bg-gray-100"
  >
    <div className="flex h-44 items-center justify-center overflow-hidden sm:h-48">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <FiShoppingBag size={45} className="text-gray-300" />
      )}
    </div>

    {/* Category */}
    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold capitalize text-[#0F766E] shadow-sm">
      {category}
    </span>

    {/* Stock Badge */}
    <span
      className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-semibold ${
        stock > 0
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-600"
      }`}
    >
      {stock > 0 ? "In Stock" : "Out of Stock"}
    </span>
  </Link>

  {/* Product Details */}
  <div className="flex flex-1 flex-col p-4">

    <h2 className="line-clamp-1 text-base font-bold text-gray-900 transition group-hover:text-[#0F766E]">
      {title}
    </h2>

    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
      {description?.slice(0, 50) || "No description available."}
    </p>

    {/* Price */}
    <div className="mt-4 flex items-end justify-between gap-2">
      <div>
        <p className="text-xs font-medium text-gray-400">
          Price
        </p>

        <p className="mt-1 text-xl font-extrabold text-[#0F766E]">
          Rs. {Number(price).toLocaleString("en-PK")}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        {stock > 0 ? (
          <FiCheckCircle className="text-green-600" size={15} />
        ) : (
          <FiAlertCircle className="text-red-500" size={15} />
        )}

        <span>
          {stock > 0 ? `${stock} available` : "Unavailable"}
        </span>
      </div>
    </div>

    {/* Button */}
    <Link
      to={`/products/${_id}`}
      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
    >
      View Details
      <FiArrowUpRight size={18} />
    </Link>
  </div>
</article>


);
};

export default ProductCard;
