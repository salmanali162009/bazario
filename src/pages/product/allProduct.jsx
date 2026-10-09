import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiPackage,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
} from "react-icons/fi";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import api from "../../services/api.js";

const PRODUCTS_PER_PAGE = 30;

function AllProduct() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword")?.trim() || "";
  const page = Math.max(
    1,
    Number.parseInt(searchParams.get("page") || "1", 10) || 1
  );

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isSearching = Boolean(keyword);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let response;

        if (isSearching) {
          // Search products
          response = await api.get("/search", {
            params: { keyword },
          });
        } else {
          // All products with backend pagination
          response = await api.get("/all-products", {
            params: { page },
          });
        }

        if (cancelled) return;

        const results = response.data.products || [];
        const total = Number(
          response.data.totalProducts ?? results.length
        );

        setProducts(results);
        setTotalProducts(total);

        if (isSearching) {
          // Search API currently doesn't provide page/totalPages.
          // This assumes the API returns all matching products.
          setTotalPages(
            Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE))
          );
        } else {
          setTotalPages(
            Math.max(
              1,
              Number(response.data.totalPages) ||
                Math.ceil(total / PRODUCTS_PER_PAGE)
            )
          );
        }
      } catch (err) {
        if (cancelled) return;

        console.error("Products fetch error:", err);
        setError(
          err.response?.data?.message ||
            "Server error. Products load nahi ho sake."
        );
        setProducts([]);
        setTotalProducts(0);
        setTotalPages(1);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [keyword, page, isSearching]);

  // The normal API already returns the selected page.
  // Search results are divided into pages on the frontend.
  const visibleProducts = useMemo(() => {
    if (!isSearching) return products;

    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;

    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [products, isSearching, page]);

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    const nextParams = new URLSearchParams(searchParams);

    if (nextPage === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }

    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchParams({});
  };

  const firstItem =
    totalProducts === 0 ? 0 : (page - 1) * PRODUCTS_PER_PAGE + 1;

  const lastItem = Math.min(
    page * PRODUCTS_PER_PAGE,
    totalProducts
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#0F766E]">
            Discover your favorites
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {isSearching ? "Search Results" : "All Products"}
              </h1>

              <p className="mt-2 text-gray-500">
                {isSearching
                  ? `Search results for "${keyword}"`
                  : "Explore our collection of products."}
              </p>
            </div>

            {isSearching && (
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                <FiSearch size={16} />
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#0F766E]" />

            <p className="mt-4 text-sm text-gray-500">
              {isSearching ? "Searching products..." : "Loading products..."}
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center">
            <FiAlertCircle
              size={40}
              className="mx-auto text-red-500"
            />

            <p className="mt-4 font-semibold text-gray-800">
              Unable to load products
            </p>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => goToPage(page)}
              className="mt-5 rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results count */}
        {!loading && !error && totalProducts > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {firstItem}–{lastItem}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {totalProducts}
              </span>{" "}
              products
            </p>

            {totalPages > 1 && (
              <p className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </p>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && visibleProducts.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6">
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && visibleProducts.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <FiPackage
              size={45}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {isSearching ? "No Matching Products" : "No Products Available"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {isSearching
                ? `No products found for "${keyword}".`
                : "No products available right now."}
            </p>

            {isSearching && (
              <button
                type="button"
                onClick={clearSearch}
                className="mt-6 rounded-xl bg-[#0F766E] px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                View All Products
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalProducts > 0 && totalPages > 1 && (
          <nav
            aria-label="Product pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className="inline-flex h-10 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 hover:border-[#0F766E] hover:text-[#0F766E] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronLeft size={17} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => goToPage(pageNumber)}
                aria-current={pageNumber === page ? "page" : undefined}
                className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition ${
                  pageNumber === page
                    ? "border-[#0F766E] bg-[#0F766E] text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#0F766E] hover:text-[#0F766E]"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
              className="inline-flex h-10 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 hover:border-[#0F766E] hover:text-[#0F766E] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="hidden sm:inline">Next</span>
              <FiChevronRight size={17} />
            </button>
          </nav>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default AllProduct;