
import { Link } from "react-router-dom";
import { FiHome, FiSearch } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 py-12">
      <div className="w-full max-w-xl text-center">

        {/* Logo */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-2xl font-extrabold text-[#0F766E]"
        >
          <FiShoppingBag size={27} />
          Bazario
        </Link>

        {/* 404 */}
        <div className="relative mt-12">
          <h1 className="select-none text-8xl font-black tracking-tight text-[#0F766E]/15 sm:text-9xl">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-teal-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-[#0F766E]">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Message */}
        <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Oops! You’re lost.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          The page you are looking for doesn't exist, may have
          been moved, or the URL might be incorrect.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            <FiHome size={18} />
            Back to Home
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            <FiSearch size={18} />
            Explore Products
          </Link>
        </div>

        {/* Bottom Note */}
        <p className="mt-10 text-sm text-gray-400">
          Error Code: 404 · Page Not Found
        </p>
      </div>
    </div>
  );
};

export default NotFound;