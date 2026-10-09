import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiUpload,
  FiSave,
  FiImage,
} from "react-icons/fi";
import api from "../../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Get existing product
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/my-products/${id}`
        );

        const product = response.data.product;

        setFormData({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          stock: product.stock || "",
          category: product.category || "",
        });

        setImagePreview(product.imageUrl || "");
      } catch (error) {
        console.error("Get product error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.title.trim()) {
      setError("Product title is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Product description is required");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      setError("Please enter a valid price");
      return;
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      setError("Please enter a valid stock");
      return;
    }

    if (!formData.category.trim()) {
      setError("Product category is required");
      return;
    }

    try {
      setUpdating(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category.trim());

      // Image only if user selected a new one
      if (image) {
        data.append("image", image);
      }

      const response = await api.put(
        `/${id}`,
        data
      );

      console.log("Updated product:", response.data);

      setSuccess("Product updated successfully!");

      setTimeout(() => {
        navigate(`/my-products/${id}`);
      }, 1000);
    } catch (error) {
      if(error.message === 'Request failed with status code 401'){
                navigate("/login");
            }
      console.error("Update product error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update product"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#0F766E]" />
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center">
          <p className="font-semibold text-red-600">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 cursor-pointer rounded-xl bg-[#0F766E] px-5 py-2.5 font-semibold text-white hover:bg-[#115E59]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#0F766E]"
        >
          <FiArrowLeft />
          Back to Product
        </button>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-[#E2E8F0] px-6 py-6 sm:px-8">
            <h1 className="text-2xl font-bold text-[#0F172A]">
              Update Product
            </h1>

            <p className="mt-1 text-sm text-[#64748B]">
              Update your product information and save changes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                {success}
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2">

              {/* Left */}
              <div className="space-y-5">

                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                    Product Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter product title"
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter product description"
                    className="w-full resize-none rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                  />
                </div>

                {/* Price + Stock */}
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="3000"
                      className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="100"
                      className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />
                  </div>

                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Electronic"
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                  />
                </div>
              </div>

              {/* Right - Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  Product Image
                </label>

                <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">

                  {imagePreview ? (
                    <div className="relative flex h-[350px] items-center justify-center p-5">
                      <img
                        src={imagePreview}
                        alt={formData.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-[350px] flex-col items-center justify-center text-[#64748B]">
                      <FiImage className="text-5xl" />
                      <p className="mt-3 text-sm">
                        No image selected
                      </p>
                    </div>
                  )}

                  <div className="border-t border-[#E2E8F0] p-4">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#0F766E] transition hover:bg-[#F0FDFA]">
                      <FiUpload />
                      Choose New Image

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    <p className="mt-2 text-center text-xs text-[#64748B]">
                      Leave unchanged to keep the current image.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#E2E8F0] pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={updating}
                className="cursor-pointer rounded-xl border border-[#E2E8F0] px-6 py-3 text-sm font-semibold text-[#64748B] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Update Product
                  </>
                )}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;