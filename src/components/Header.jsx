import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/me");
        setUser(response.data.data);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const searchProduct = () => {
    const keyword = search.trim();

    if (!keyword) return;

    navigate(`/?keyword=${encodeURIComponent(keyword)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchProduct();
    }
  };

  return (
    <header className="w-full border-b border-teal-700 bg-[#0F766E]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= TOP ROW ================= */}
        <div className="flex min-h-16 items-center justify-between gap-3">

          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Bazario
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 justify-center px-6 sm:flex">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                className="h-11 w-full rounded-full bg-white px-5 pr-12 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-300"
              />

              <button
                type="button"
                onClick={searchProduct}
                aria-label="Search products"
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[#0F766E]"
              >
                <FaSearch size={14} />
              </button>
            </div>
          </div>

          {/* Login / Profile */}
          {!user ? (
            <Link
              to="/login"
              className="shrink-0 rounded-lg px-2 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-4 sm:text-base"
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/profile")}
              aria-label="Open profile"
              className="h-10 cursor-pointer w-10 shrink-0 overflow-hidden rounded-full border-2 border-white transition hover:scale-105"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS69J421fAmzYWwgcZQE9FmSz5tsinxEi46uwPZwiB4Q&s=10"
                alt="User profile"
                className="h-full w-full object-cover"
              />
            </button>
          )}
        </div>

        {/* ================= MOBILE SEARCH ================= */}
        <div className="pb-4 sm:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="h-11 w-full rounded-full bg-white px-5 pr-12 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-300"
            />

            <button
              type="button"
              onClick={searchProduct}
              aria-label="Search products"
              className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[#0F766E]"
            >
              <FaSearch size={14} />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;