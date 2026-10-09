import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiCheckCircle,
  FiAlertCircle,
  FiMinus,
  FiPlus,
  FiZap,
  FiTruck,
  FiShield,
} from "react-icons/fi";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../services/api.js";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/products/${id}`);

        setProduct(response.data.product);
      } catch (err) {
        console.error("Product fetch error:", err);

        setError(
          err.response?.data?.message ||
            "Product load nahi ho saka."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantity = (value) => {
    setQuantity((current) => {
      const next = current + value;

      if (next < 1) {
        return 1;
      }

      if (product?.stock && next > product.stock) {
        return product.stock;
      }

      return next;
    });
  };

  const totalPrice = product
    ? Number(product.price) * quantity
    : 0;

  const handleBuyNow = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    navigate("/checkout", {
      state: {
        productId: product._id,
        title: product.title,
        price: Number(product.price),
        quantity,
        totalPrice,
        imageUrl: product.imageUrl,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#0F766E]"
        >
          <FiArrowLeft size={18} />
          Back to Products
        </Link>

        {/* Loading */}
        {loading && (
          <div className="py-24 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#0F766E]" />

            <p className="mt-4 text-gray-500">
              Loading product details...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
            <FiAlertCircle
              className="mx-auto text-red-500"
              size={42}
            />

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Product Not Found
            </h2>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-[#0F766E] px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Product */}
        {!loading && !error && product && (
          <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">

            {/* Product Image */}
            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-gray-100 sm:min-h-[420px]">

              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full max-h-[520px] w-full object-contain p-4 transition duration-500 hover:scale-105 sm:p-8"
                />
              ) : (
                <FiShoppingBag
                  size={100}
                  className="text-gray-300"
                />
              )}

              {/* Category */}
              <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold capitalize text-[#0F766E] shadow-sm">
                {product.category || "General"}
              </span>

              {/* Stock */}
              <span
                className={`absolute right-4 top-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${
                  product.stock > 0
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {product.stock > 0 ? (
                  <>
                    <FiCheckCircle size={16} />
                    In Stock
                  </>
                ) : (
                  <>
                    <FiAlertCircle size={16} />
                    Out of Stock
                  </>
                )}
              </span>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center py-2 sm:py-4">

              <p className="text-sm font-bold uppercase tracking-widest text-[#0F766E]">
                Bazario Collection
              </p>

              <h1 className="mt-3 break-words text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>

              {/* Stock + Category */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
                    product.stock > 0
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {product.stock > 0 ? (
                    <FiCheckCircle size={16} />
                  ) : (
                    <FiAlertCircle size={16} />
                  )}

                  {product.stock > 0
                    ? `${product.stock} available`
                    : "Out of Stock"}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-2 text-sm capitalize text-gray-600">
                  {product.category || "General"}
                </span>
              </div>

              <div className="my-7 border-t border-gray-100" />

              {/* Price */}
              <p className="text-sm font-medium text-gray-400">
                Price
              </p>

              <p className="mt-1 text-4xl font-extrabold text-[#0F766E]">
                Rs.{" "}
                {Number(product.price).toLocaleString("en-PK")}
              </p>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-900">
                  Product Description
                </h2>

                <p className="mt-3 whitespace-pre-line break-words text-base leading-7 text-gray-600">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-sm font-semibold text-gray-700">
                    Quantity
                  </p>

                  <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-200">

                    <button
                      type="button"
                      onClick={() => handleQuantity(-1)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FiMinus size={17} />
                    </button>

                    <span className="flex h-11 min-w-14 items-center justify-center border-x border-gray-200 font-bold text-gray-900">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleQuantity(1)}
                      disabled={quantity >= product.stock}
                      aria-label="Increase quantity"
                      className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FiPlus size={17} />
                    </button>

                  </div>
                </div>
              )}

              {/* Total */}
              <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="font-medium text-gray-600">
                  Total Price
                </span>

                <span className="text-xl font-extrabold text-gray-900">
                  Rs.{" "}
                  {totalPrice.toLocaleString("en-PK")}
                </span>
              </div>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="mt-6 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#0F766E] px-6 font-bold text-white transition duration-300 hover:bg-teal-800 hover:shadow-lg hover:shadow-teal-900/10 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <FiZap size={21} />

                {product.stock > 0
                  ? "Buy Now"
                  : "Out of Stock"}
              </button>

              {/* Benefits */}
              <div className="mt-7 grid grid-cols-1 gap-3 border-t border-gray-100 pt-6 sm:grid-cols-3">

                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 sm:block sm:text-center">
                  <FiTruck
                    size={20}
                    className="shrink-0 text-[#0F766E] sm:mx-auto"
                  />

                  <p className="text-xs font-semibold text-gray-700 sm:mt-2">
                    Fast Delivery
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 sm:block sm:text-center">
                  <FiShield
                    size={20}
                    className="shrink-0 text-[#0F766E] sm:mx-auto"
                  />

                  <p className="text-xs font-semibold text-gray-700 sm:mt-2">
                    Secure Order
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 sm:block sm:text-center">
                  <FiCheckCircle
                    size={20}
                    className="shrink-0 text-[#0F766E] sm:mx-auto"
                  />

                  <p className="text-xs font-semibold text-gray-700 sm:mt-2">
                    Quality Product
                  </p>
                </div>

              </div>

              {/* Product ID */}
              <p className="mt-5 break-all text-center text-xs text-gray-400">
                Product ID: {product._id}
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;