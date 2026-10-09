import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiCalendar,
  FiHash,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTrash2,
} from "react-icons/fi";
import api from "../../services/api.js";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/orders/${id}`);

        setOrder(response.data.order);

        console.log(response.data.order);
      } catch (error) {
        console.error("Get order error:", error);
        if(error.message === 'Request failed with status code 401'){
                navigate("/login");
            }

        setError(
          error.response?.data?.message ||
            "Unable to load order details."
        );

        if (error.response?.status === 404) {
          setOrder(null);
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id, navigate]);

  // Cancel Order
  const handleCancelOrder = async () => {
    try {
      setCancelling(true);

      const response = await api.put(`/${id}/cancel`);

      console.log(response.data);

      setShowCancelModal(false);

      // Update order status locally
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: "cancelled",
      }));
    } catch (error) {
      console.error("Cancel order error:", error);
      if(error.message === 'Request failed with status code 401'){
                navigate("/login");
            }

      setError(
        error.response?.data?.message ||
          "Unable to cancel order."
      );

      setShowCancelModal(false);
    } finally {
      setCancelling(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FiCheckCircle size={18} />;

      case "cancelled":
        return <FiXCircle size={18} />;

      case "shipped":
        return <FiTruck size={18} />;

      default:
        return <FiClock size={18} />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "confirmed":
        return "bg-amber-50 text-amber-700 border-amber-200";

      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">

          <div className="w-10 h-10 border-4 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-500">
            Loading order details...
          </p>

        </div>
      </div>
    );
  }

  // Error
  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] px-4 py-10">

        <div className="max-w-3xl mx-auto">

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-[#0F766E] mb-6 hover:text-[#115E59]"
          >
            <FiArrowLeft />
            Back to My Orders
          </button>

          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">

            <FiXCircle
              size={42}
              className="text-red-500 mx-auto mb-4"
            />

            <h2 className="text-xl font-semibold text-slate-900">
              Order Not Found
            </h2>

            <p className="text-slate-500 mt-2">
              {error || "We couldn't find this order."}
            </p>

          </div>

        </div>
      </div>
    );
  }

  const product = order.productId;
  const delivery = order.CustomerData || order.orderData;

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 md:px-8">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-slate-600 hover:text-[#0F766E] transition mb-6"
        >
          <FiArrowLeft />
          Back to My Orders
        </button>

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 mb-6 shadow-sm">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <FiPackage />
                Order Details
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
                Your Order
              </h1>

              <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">

                <FiHash />

                <span className="break-all">
                  {order._id}
                </span>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              {/* Status */}
              <div
                className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full capitalize font-medium ${getStatusStyle(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status}
              </div>

              {/* Cancel Button */}
              {order.status === "pending" && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  disabled={cancelling}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition disabled:opacity-50"
                >
                  <FiTrash2 size={17} />
                  Cancel Order
                </button>
              )}

            </div>

          </div>

        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Product */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5">

                <FiPackage className="text-[#0F766E]" />

                <h2 className="text-lg font-semibold text-slate-900">
                  Product
                </h2>

              </div>

              <div className="flex flex-col sm:flex-row gap-5">

                {/* Image */}
                <div className="w-full sm:w-40 h-40 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">

                  {product?.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <FiPackage size={40} />
                    </div>
                  )}

                </div>

                {/* Product Info */}
                <div className="flex-1">

                  <h3 className="text-xl font-semibold text-slate-900">
                    {product?.title || "Product no longer available"}
                  </h3>

                  {product?.category && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-teal-50 text-[#0F766E] text-sm">
                      {product.category}
                    </span>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-5">

                    <div>

                      <p className="text-sm text-slate-500">
                        Price
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        Rs.{" "}
                        {product?.price?.toLocaleString() || "N/A"}
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-slate-500">
                        Quantity
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        {order.quantity}
                      </p>
                 

                    </div>
                         <div 
                      className="col-span-2  cursor-pointer rounded-xl border border-[#E2E8F0] bg-[#F0FDFA] px-4 py-3 text-center text-sm font-semibold text-[#0F766E] transition hover:bg-[#E6FFFA]"
                        // onClick={() => navigate(`/my/${product?._id}`)}    
                      >View Product</div>
                  </div>

                </div>

              </div>

            </div>

            {/* Delivery */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5">

                <FiMapPin className="text-[#0F766E]" />

                <h2 className="text-lg font-semibold text-slate-900">
                  Delivery Information
                </h2>

              </div>

              <div className="grid sm:grid-cols-2 gap-5">

                <InfoItem
                  icon={<FiPhone />}
                  label="Phone"
                  value={delivery?.userPhone}
                />

                <InfoItem
                  icon={<FiMapPin />}
                  label="Address"
                  value={delivery?.userAddress}
                />

                <InfoItem
                  icon={<FiMapPin />}
                  label="City"
                  value={delivery?.userCity}
                />

                <InfoItem
                  icon={<FiMapPin />}
                  label="State"
                  value={delivery?.userState}
                />

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Order Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">

              <h2 className="text-lg font-semibold text-slate-900 mb-5">
                Order Summary
              </h2>

              <div className="space-y-4">

                <SummaryRow
                  label="Quantity"
                  value={order.quantity}
                />

                <SummaryRow
                  label="Price"
                  value={`Rs. ${
                    product?.price?.toLocaleString() || "N/A"
                  }`}
                />

                <div className="border-t border-slate-200 pt-4">

                  <SummaryRow
                    label="Total"
                    value={`Rs. ${order.totalPrice?.toLocaleString()}`}
                    bold
                  />

                </div>

              </div>

            </div>

            {/* Payment */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5">

                <FiCreditCard className="text-[#0F766E]" />

                <h2 className="text-lg font-semibold text-slate-900">
                  Payment
                </h2>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Method
                </span>

                <span className="font-medium text-slate-900 uppercase">
                  {delivery?.userPaymentMethod || "N/A"}
                </span>

              </div>

            </div>

            {/* Order Date */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <FiCalendar size={20} />
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Order placed
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {formatDate(order.createdAt)}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <FiTrash2 size={22} />
            </div>

            <h2 className="text-xl font-bold text-slate-900 text-center mt-4">
              Cancel Order?
            </h2>

            <p className="text-slate-500 text-center mt-2">
              Are you sure you want to cancel this order?
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setShowCancelModal(false)}
                disabled={cancelling}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Keep Order
              </button>

              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex gap-3">

      <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="font-medium text-slate-900 mt-1">
          {value || "N/A"}
        </p>

      </div>

    </div>
  );
};

const SummaryRow = ({ label, value, bold = false }) => {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-slate-500">
        {label}
      </span>

      <span
        className={
          bold
            ? "text-lg font-bold text-[#0F766E]"
            : "font-medium text-slate-900"
        }
      >
        {value}
      </span>

    </div>
  );
};

export default OrderDetails;