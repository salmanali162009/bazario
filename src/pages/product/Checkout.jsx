import { useState } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCreditCard,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiTruck,
  FiX,
} from "react-icons/fi";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../services/api.js";

function Checkout() {
  const location = useLocation();

  const navigate = useNavigate()

  const product = location.state;

  const [formData, setFormData] = useState({
    userPhone: "",
    userAddress: "",
    userCity: "",
    userState: "",
    userPaymentMethod: "cod",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // If user directly opens /checkout
  if (!product?.productId) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />

        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FiShoppingBag
                size={30}
                className="text-gray-400"
              />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Checkout Not Available
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Please select a product first before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0F766E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              Browse Products
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.userPhone.trim() ||
      !formData.userAddress.trim() ||
      !formData.userCity.trim() ||
      !formData.userState.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        productId: product.productId,
        quantity: product.quantity,
        userPhone: formData.userPhone.trim(),
        userAddress: formData.userAddress.trim(),
        userCity: formData.userCity.trim(),
        userState: formData.userState.trim(),
        userPaymentMethod: formData.userPaymentMethod,
      };

      console.log("Order Data:", orderData);

      const response = await api.post(
        "/create-order",
        orderData
      );

      console.log("Order Response:", response.data);

      setSuccess(
        response.data?.message ||
          "Your order has been placed successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 4000);

    } catch (err) {
        if (err.response?.status === 401) {
        navigate("/login");
      }
        if(err)
      console.error("Create order error:", err);

      setError(
        err.response?.data?.message ||
          " Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      <Header />

      {/* ================= SUCCESS POPUP ================= */}
      {success && (
        <div className="fixed left-1/2 top-5 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
          <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-white p-4 shadow-xl shadow-green-900/10">

            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50">
              <FiCheckCircle
                size={22}
                className="text-green-600"
              />
            </div>

            {/* Message */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900">
                Order Successful
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {success}
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setSuccess("")}
              aria-label="Close notification"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <FiX size={17} />
            </button>

          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= BACK ================= */}
        <Link
          to={`/products/${product.productId}`}
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#0F766E]"
        >
          <FiArrowLeft size={18} />
          Back to Product
        </Link>

        {/* ================= HEADING ================= */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-[#0F766E]">
            Bazario
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your delivery information to place your order.
          </p>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <FiX
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

          {/* =====================================================
              LEFT SIDE - CUSTOMER FORM
          ===================================================== */}
          <div className="lg:col-span-3">

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
            >

              {/* Delivery Heading */}
              <div className="flex items-center gap-3 border-b border-gray-100 pb-5">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50">
                  <FiTruck
                    size={20}
                    className="text-[#0F766E]"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Delivery Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-5">

                {/* ================= PHONE ================= */}
                <div>
                  <label
                    htmlFor="userPhone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>

                  <div className="relative">

                    <FiPhone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="userPhone"
                      name="userPhone"
                      type="tel"
                      value={formData.userPhone}
                      onChange={handleChange}
                      placeholder="03001234567"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100"
                      required
                    />

                  </div>
                </div>

                {/* ================= ADDRESS ================= */}
                <div>
                  <label
                    htmlFor="userAddress"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Complete Address
                  </label>

                  <div className="relative">

                    <FiMapPin
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />

                    <textarea
                      id="userAddress"
                      name="userAddress"
                      value={formData.userAddress}
                      onChange={handleChange}
                      placeholder="House 123, Street 5, Gulshan-e-Iqbal"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100"
                      required
                    />

                  </div>
                </div>

                {/* ================= CITY + STATE ================= */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* City */}
                  <div>
                    <label
                      htmlFor="userCity"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      City
                    </label>

                    <input
                      id="userCity"
                      name="userCity"
                      type="text"
                      value={formData.userCity}
                      onChange={handleChange}
                      placeholder="Karachi"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100"
                      required
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="userState"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      State / Province
                    </label>

                    <input
                      id="userState"
                      name="userState"
                      type="text"
                      value={formData.userState}
                      onChange={handleChange}
                      placeholder="Sindh"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100"
                      required
                    />
                  </div>

                </div>

                {/* ================= PAYMENT ================= */}
                <div>
                  <label
                    htmlFor="userPaymentMethod"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Payment Method
                  </label>

                  <div className="relative">

                    <FiCreditCard
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                      id="userPaymentMethod"
                      name="userPaymentMethod"
                      value={formData.userPaymentMethod}
                      onChange={handleChange}
                      className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="cod">
                        Cash on Delivery
                      </option>
                    </select>

                  </div>
                </div>

              </div>

              {/* ================= PLACE ORDER ================= */}
              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 text-sm font-bold text-white transition hover:bg-teal-800 hover:shadow-lg hover:shadow-teal-900/10 disabled:cursor-not-allowed disabled:bg-gray-300"
              >

                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={19} />
                    Place Order
                  </>
                )}

              </button>

            </form>
          </div>

          {/* =====================================================
              RIGHT SIDE - ORDER SUMMARY
          ===================================================== */}
          <div className="lg:col-span-2">

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-6">

              {/* Summary Heading */}
              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">

                <h2 className="text-lg font-bold text-gray-900">
                  Order Summary
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Review your product before placing the order.
                </p>

              </div>

              {/* Product */}
              <div className="p-5 sm:p-6">

                <div className="flex gap-4">

                  {/* Product Image */}
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">

                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <FiShoppingBag
                        size={35}
                        className="text-gray-300"
                      />
                    )}

                  </div>

                  {/* Product Info */}
                  <div className="min-w-0 flex-1">

                    <h3 className="line-clamp-2 text-sm font-bold text-gray-900">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      Quantity:{" "}
                      <span className="font-semibold text-gray-700">
                        {product.quantity}
                      </span>
                    </p>

                    <p className="mt-2 text-sm font-bold text-[#0F766E]">
                      Rs.{" "}
                      {Number(product.price).toLocaleString(
                        "en-PK"
                      )}
                    </p>

                  </div>

                </div>

                {/* ================= PRICE SUMMARY ================= */}
                <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Price
                    </span>

                    <span className="font-medium text-gray-800">
                      Rs.{" "}
                      {Number(product.price).toLocaleString(
                        "en-PK"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Quantity
                    </span>

                    <span className="font-medium text-gray-800">
                      × {product.quantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">

                    <span className="font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-extrabold text-[#0F766E]">
                      Rs.{" "}
                      {Number(
                        product.totalPrice
                      ).toLocaleString("en-PK")}
                    </span>

                  </div>

                </div>

                {/* ================= COD INFO ================= */}
                <div className="mt-6 rounded-xl bg-gray-50 p-4">

                  <div className="flex items-start gap-3">

                    <FiCheckCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <div>

                      <p className="text-xs font-semibold text-gray-800">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Pay when your order is delivered to your
                        address.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default Checkout;