import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiTag,
  FiBox,
} from "react-icons/fi";
import api from "../../services/api";

const MyProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get specific product
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/my-products/${id}`);

        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // Delete product
  const handleDelete = async () => {
    try {
      setDeleting(true);

      await api.delete(`/my-products/${id}`);

      navigate("/profile");
    } catch (error) {
      console.error("Delete product error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#0F766E]" />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-red-600">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 cursor-pointer rounded-xl bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#115E59]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#0F766E]"
          >
            <FiArrowLeft />
            Back to My Products
          </button>

          {/* Main Product Card */}
          <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">

            <div className="grid lg:grid-cols-2">

              {/* Product Image */}
              <div className="flex min-h-[420px] items-center justify-center bg-[#F8FAFC] p-6 sm:p-10">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="max-h-[450px] w-full rounded-2xl object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col p-6 sm:p-10">

                {/* Category + Stock */}
                <div className="flex items-center justify-between gap-4">

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#F0FDFA] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0F766E]">
                    <FiTag />
                    {product.category}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B]">
                    <FiBox />
                    {product.stock} in stock
                  </span>

                </div>

                {/* Title */}
                <h1 className="mt-6 text-3xl font-bold text-[#0F172A] sm:text-4xl">
                  {product.title}
                </h1>

                {/* Price */}
                <div className="mt-5">
                  <p className="text-sm font-medium text-[#64748B]">
                    Price
                  </p>

                  <p className="mt-1 text-3xl font-bold text-[#0F766E]">
                    Rs.{" "}
                    {Number(product.price).toLocaleString()}
                  </p>
                </div>

                {/* Description */}
                <div className="mt-7">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">
                    Description
                  </h2>

                  <p className="mt-2 leading-7 text-[#475569]">
                    {product.description}
                  </p>
                </div>

                {/* Product Information */}
                <div className="mt-7 grid grid-cols-2 gap-4">

                  {/* Stock */}
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <p className="text-xs text-[#64748B]">
                      Stock
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#0F172A]">
                      {product.stock}
                    </p>
                  </div>

                  {/* Category */}
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <p className="text-xs text-[#64748B]">
                      Category
                    </p>

                    <p className="mt-1 truncate text-lg font-bold capitalize text-[#0F172A]">
                      {product.category}
                    </p>
                  </div>

                </div>

                {/* Buttons */}
                <div className="mt-auto flex gap-3 pt-8">

                  {/* Update Product */}
                  <button
                    onClick={() =>
                      navigate(
                        `/my-products/${product._id}/edit`
                      )
                    }
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3 font-semibold text-white transition hover:bg-[#115E59]"
                  >
                    <FiEdit className="text-lg" />
                    Update Product
                  </button>

                  {/* Delete Product */}
                  <button
                    onClick={() =>
                      setShowDeleteModal(true)
                    }
                    disabled={deleting}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FiTrash2 className="text-lg" />
                    Delete
                  </button>

                </div>
              </div>
            </div>

            {/* Product Metadata */}
            <div className="border-t border-[#E2E8F0] px-6 py-5 sm:px-10">
              <div className="grid gap-4 sm:grid-cols-2">

                {/* Product ID */}
                <div>
                  <p className="text-xs font-medium text-[#64748B]">
                    Product ID
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-[#0F172A]">
                    {product._id}
                  </p>
                </div>

                {/* Created At */}
                <div>
                  <p className="text-xs font-medium text-[#64748B]">
                    Created At
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#0F172A]">
                    {new Date(
                      product.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!deleting) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Delete Icon */}
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <FiTrash2 className="text-2xl text-red-600" />
              </div>
            </div>

            {/* Modal Content */}
            <div className="mt-5 text-center">

              <h2 className="text-xl font-bold text-[#0F172A]">
                Delete Product?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#0F172A]">
                  "{product.title}"
                </span>
                ?
                <br />
                This action cannot be undone.
              </p>

            </div>

            {/* Modal Buttons */}
            <div className="mt-7 flex gap-3">

              {/* Cancel */}
              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(false)
                }
                disabled={deleting}
                className="flex-1 cursor-pointer rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm font-semibold text-[#64748B] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              {/* Confirm Delete */}
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 />
                    Delete Product
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProductDetails;