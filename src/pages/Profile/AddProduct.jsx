import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUploadCloud,
  FiPackage,
  FiDollarSign,
  FiBox,
  FiTag,
  FiFileText,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

import api from "../../services/api.js";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((current) => ({
      ...current,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const removeImage = () => {
    setFormData((current) => ({
      ...current,
      image: null,
    }));

    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.stock ||
      !formData.category.trim() ||
      !formData.image
    ) {
      setError("Please fill all fields and select a product image.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (Number(formData.stock) < 0) {
      setError("Stock cannot be negative.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category.trim());
      data.append("image", formData.image);

      // console.log("Product data:", {
      //   title: formData.title,
      //   description: formData.description,
      //   price: formData.price,
      //   stock: formData.stock,
      //   category: formData.category,
      //   image: formData.image,
      // });

      const response = await api.post(
        "/create-product",
        data
      );

      console.log("Create Product Response:", response.data);

      setSuccess(
        response.data?.message ||
          "Product created successfully!"
      );

      // Form reset
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });

      setPreview("");

      // 2 seconds baad My Products par
      setTimeout(() => {
        navigate("/profile");
      }, 2000);

    } catch (err) {
      console.error("Create product error:", err);

      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
          "Product create nahi ho saka. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ================= HEADER ================= */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#64748B] transition hover:bg-[#F0FDFA] hover:text-[#0F766E]"
          >
            <FiArrowLeft size={18} />
            Back to Profile
          </button>

        </div>
      </div>

      {/* ================= SUCCESS POPUP ================= */}
      {success && (
        <div className="fixed left-1/2 top-5 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">

          <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-white p-4 shadow-xl shadow-green-900/10">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50">
              <FiCheckCircle
                size={22}
                className="text-green-600"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900">
                Product Created
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {success}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close notification"
            >
              <FiX size={17} />
            </button>

          </div>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-[#0F766E]">
            Bazario
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
            Add Product
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Add a new product to your Bazario store.
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

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm"
        >

          {/* Form Header */}
          <div className="border-b border-[#E2E8F0] px-5 py-5 sm:px-8">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#0F766E]">
                <FiPackage size={22} />
              </div>

              <div>
                <h2 className="font-bold text-[#0F172A]">
                  Product Information
                </h2>

                <p className="text-xs text-[#64748B]">
                  Enter the details of your product below.
                </p>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-7 p-5 sm:p-8 lg:grid-cols-2">

            {/* ================= LEFT ================= */}
            <div className="space-y-6">

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-[#334155]"
                >
                  Product Title
                </label>

                <div className="relative">

                  <FiPackage
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. iPhone 15"
                    className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#CCFBF1]"
                    required
                  />

                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-[#334155]"
                >
                  Description
                </label>

                <div className="relative">

                  <FiFileText
                    size={18}
                    className="absolute left-4 top-4 text-[#94A3B8]"
                  />

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product..."
                    rows={6}
                    className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-white py-3 pl-11 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#CCFBF1]"
                    required
                  />

                </div>
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-semibold text-[#334155]"
                  >
                    Price
                  </label>

                  <div className="relative">

                    <FiDollarSign
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    />

                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="1"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="3000"
                      className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#CCFBF1]"
                      required
                    />

                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label
                    htmlFor="stock"
                    className="mb-2 block text-sm font-semibold text-[#334155]"
                  >
                    Stock
                  </label>

                  <div className="relative">

                    <FiBox
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    />

                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="50"
                      className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#CCFBF1]"
                      required
                    />

                  </div>
                </div>

              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-[#334155]"
                >
                  Category
                </label>

                <div className="relative">

                  <FiTag
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />

                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Electronics"
                    className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#CCFBF1]"
                    required
                  />

                </div>
              </div>

            </div>

            {/* ================= RIGHT ================= */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-[#334155]">
                Product Image
              </label>

              {/* Image Upload */}
              {!preview ? (
                <label
                  htmlFor="image"
                  className="flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 text-center transition hover:border-[#0F766E] hover:bg-[#F0FDFA]"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6FFFB] text-[#0F766E]">
                    <FiUploadCloud size={30} />
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-[#0F172A]">
                    Upload Product Image
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#64748B]">
                    Click here to select an image
                  </p>

                  <p className="mt-1 text-xs text-[#94A3B8]">
                    PNG, JPG or JPEG
                  </p>

                  <span className="mt-5 rounded-xl bg-[#0F766E] px-5 py-2.5 text-xs font-semibold text-white">
                    Choose Image
                  </span>

                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>
              ) : (
                <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">

                  <img
                    src={preview}
                    alt="Product preview"
                    className="h-[330px] w-full object-contain p-4"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-50"
                    aria-label="Remove image"
                  >
                    <FiX size={18} />
                  </button>

                  <div className="border-t border-[#E2E8F0] bg-white px-4 py-3">

                    <p className="truncate text-xs font-medium text-[#64748B]">
                      {formData.image?.name}
                    </p>

                  </div>

                </div>
              )}

            </div>

          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#E2E8F0] bg-[#F8FAFC] px-5 py-5 sm:flex-row sm:justify-end sm:px-8">

            <button
              type="button"
              onClick={() => navigate("/profile")}
              disabled={loading}
              className="rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#475569] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-300"
            >

              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating Product...
                </>
              ) : (
                <>
                  <FiCheckCircle size={18} />
                  Create Product
                </>
              )}

            </button>

          </div>

        </form>

      </main>
    </div>
  );
};

export default AddProduct;