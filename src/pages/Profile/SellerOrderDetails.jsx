import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiPackage,
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCreditCard,
  FiHash,
  FiCalendar,
  FiTrash2,
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";
import api from "../../services/api.js";

const SellerOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // GET SINGLE SELLER ORDER
  // =========================

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/seller-orders/${id}`
        );

        setOrder(response.data.order);
        
        
        setSelectedStatus(response.data.order.status);
      } catch (error) {
        console.error("Get order error:", error);
        if (error.response?.status === 401) {
        navigate("/login");
      }

        setError(
          error.response?.data?.message ||
            "Failed to fetch order"
        );
      } finally {
        setLoading(false);
      }
    };

    getOrder();

    return () => {
      setOrder(null);
      setSelectedStatus("");
      setError("");
    }
  }, [id]);

  // =========================
  // CHANGE ORDER STATUS
  // =========================

  const handleStatusUpdate = async () => {
    try {
      setUpdatingStatus(true);

      const response = await api.put(
        `/${id}/status`,
        {
          status: selectedStatus,
        }
      );

      setOrder(response.data.order);

      setShowStatusModal(false);
    } catch (error) {
      console.error("Update status error:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }

      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  // =========================
  // DELETE ORDER
  // =========================

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await api.delete(`/order/${id}`);

      navigate("/profile");
    } catch (error) {
      console.error("Delete order error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete order"
      );
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#0F766E]" />
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <FiXCircle className="text-2xl text-red-600" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-[#0F172A]">
            Order Not Found
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 cursor-pointer rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#115E59]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const product = order.productId;
  const customer = order.userId;

  const orderStatuses = [
    {
      value: "pending",
      label: "Pending",
      icon: FiClock,
    },
    {
      value: "confirmed",
      label: "Confirmed",
      icon: FiCheckCircle,
    },
    {
      value: "shipped",
      label: "Shipped",
      icon: FiTruck,
    },
    {
      value: "delivered",
      label: "Delivered",
      icon: FiCheckCircle,
    },
    {
      value: "cancelled",
      label: "Cancelled",
      icon: FiXCircle,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* =========================
              TOP
          ========================= */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <button
              onClick={() => navigate(-1)}
              className="flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#0F766E]"
            >
              <FiArrowLeft />
              Back to Orders
            </button>

            <div className="flex flex-wrap gap-3">

              {/* Change Status */}
              <button
                onClick={() => {
                  setSelectedStatus(order.status);
                  setShowStatusModal(true);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#115E59]"
              >
                <FiRefreshCw />
                Change Status
              </button>

              {/* Delete */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <FiTrash2 />
                Delete Order
              </button>

            </div>
          </div>

          {/* =========================
              ORDER HEADER
          ========================= */}

          <div className="mb-6 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">

            <div className="bg-[#0F766E] p-6 sm:p-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm font-medium text-teal-100">
                    Order Details
                  </p>

                  <h1 className="mt-1 break-all text-2xl font-bold text-white sm:text-3xl">
                    #{order._id}
                  </h1>

                  <p className="mt-2 flex items-center gap-2 text-sm text-teal-100">
                    <FiCalendar />
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                <OrderStatus status={order.status} />

              </div>

            </div>

            {/* Order Summary */}
            <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">

              <SummaryCard
                title="Quantity"
                value={order.quantity}
                icon={<FiPackage />}
              />

              <SummaryCard
                title="Total Price"
                value={`PKR ${Number(
                  order.totalPrice
                ).toLocaleString()}`}
                icon={<FiCreditCard />}
              />

              <SummaryCard
                title="Payment"
                value={
                  order.CustomerData?.userPaymentMethod ===
                  "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"
                }
                icon={<FiCreditCard />}
              />

            </div>
          </div>

          {/* =========================
              PRODUCT + CUSTOMER
          ========================= */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* PRODUCT */}
            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FDFA] text-xl text-[#0F766E]">
                  <FiPackage />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    Product
                  </h2>

                  <p className="text-sm text-[#64748B]">
                    Ordered product information
                  </p>
                </div>
              </div>

              {product ? (
                <div className="overflow-hidden rounded-2xl border border-[#E2E8F0]">

                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">

                    <p className="text-xs font-bold uppercase text-[#F59E0B]">
                      {product.category}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-[#0F172A]">
                      {product.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#64748B]">
                      {product.description ||
                        "No description available."}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-4">

                      <InfoBox
                        label="Price"
                        value={`PKR ${Number(
                          product.price
                        ).toLocaleString()}`}
                      />

                      <InfoBox
                        label="Quantity"
                        value={order.quantity}
                      />
                      <div
                      className="col-span-2  cursor-pointer rounded-xl border border-[#E2E8F0] bg-[#F0FDFA] px-4 py-3 text-center text-sm font-semibold text-[#0F766E] transition hover:bg-[#E6FFFA]"
                      onClick={() => navigate(`/my-products/${order.productId._id}`)}
                      >
                         View Product
                      </div>

                    </div>

                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#CBD5E1] p-10 text-center">
                  <FiPackage className="mx-auto text-4xl text-[#94A3B8]" />

                  <p className="mt-3 font-semibold text-[#64748B]">
                    Product no longer available
                  </p>
                </div>
              )}

            </div>

            {/* CUSTOMER */}
            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FDFA] text-xl text-[#0F766E]">
                  <FiUser />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    Customer
                  </h2>

                  <p className="text-sm text-[#64748B]">
                    Customer information
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <CustomerInfo
                  icon={<FiUser />}
                  label="Name"
                  value={
                    customer?.name ||
                    "Customer unavailable"
                  }
                />

                <CustomerInfo
                  icon={<FiMail />}
                  label="Email"
                  value={
                    customer?.email ||
                    "Not available"
                  }
                />

                <CustomerInfo
                  icon={<FiPhone />}
                  label="Phone"
                  value={
                    order.CustomerData?.userPhone ||
                    customer?.phone ||
                    "Not available"
                  }
                />

              </div>

            </div>
          </div>

          {/* =========================
              DELIVERY INFORMATION
          ========================= */}

          <div className="mt-6 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FDFA] text-xl text-[#0F766E]">
                <FiMapPin />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">
                  Delivery Information
                </h2>

                <p className="text-sm text-[#64748B]">
                  Customer delivery address
                </p>
              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <InfoBox
                label="Address"
                value={
                  order.CustomerData?.userAddress ||
                  "Not available"
                }
              />

              <InfoBox
                label="City"
                value={
                  order.CustomerData?.userCity ||
                  "Not available"
                }
              />

              <InfoBox
                label="State"
                value={
                  order.CustomerData?.userState ||
                  "Not available"
                }
              />

              <InfoBox
                label="Payment"
                value={
                  order.CustomerData
                    ?.userPaymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"
                }
              />

            </div>

          </div>

          {/* =========================
              ORDER ID
          ========================= */}

          <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">

            <div className="flex items-start gap-3">

              <FiHash className="mt-1 text-[#64748B]" />

              <div>
                <p className="text-xs font-medium text-[#64748B]">
                  Order ID
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-[#0F172A]">
                  {order._id}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          CHANGE STATUS MODAL
      ===================================================== */}

      {showStatusModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!updatingStatus) {
              setShowStatusModal(false);
            }
          }}
        >

          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0FDFA]">
              <FiRefreshCw className="text-2xl text-[#0F766E]" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#0F172A]">
              Change Order Status
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Select the new status for this order.
            </p>

            <div className="mt-5 space-y-2">

              {orderStatuses.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setSelectedStatus(item.value)
                    }
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                      selectedStatus === item.value
                        ? "border-[#0F766E] bg-[#F0FDFA] text-[#0F766E]"
                        : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <Icon />

                    <span className="font-semibold">
                      {item.label}
                    </span>

                    {selectedStatus === item.value && (
                      <FiCheckCircle className="ml-auto" />
                    )}
                  </button>
                );
              })}

            </div>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowStatusModal(false)
                }
                disabled={updatingStatus}
                className="flex-1 cursor-pointer rounded-xl border border-[#E2E8F0] px-4 py-3 font-semibold text-[#64748B] transition hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleStatusUpdate}
                disabled={updatingStatus}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3 font-semibold text-white transition hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingStatus ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiCheckCircle />
                    Update Status
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

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

            <div className="flex justify-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <FiTrash2 className="text-2xl text-red-600" />
              </div>

            </div>

            <div className="mt-5 text-center">

              <h2 className="text-xl font-bold text-[#0F172A]">
                Delete Order?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Are you sure you want to delete this order?
                This action cannot be undone.
              </p>

            </div>

            <div className="mt-7 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(false)
                }
                disabled={deleting}
                className="flex-1 cursor-pointer rounded-xl border border-[#E2E8F0] px-4 py-3 font-semibold text-[#64748B] transition hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 />
                    Delete Order
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

/* =========================
   SUMMARY CARD
========================= */

const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg text-[#0F766E] shadow-sm">
        {icon}
      </div>

      <p className="mt-4 text-xs font-medium text-[#64748B]">
        {title}
      </p>

      <p className="mt-1 font-bold text-[#0F172A]">
        {value}
      </p>

    </div>
  );
};

/* =========================
   INFO BOX
========================= */

const InfoBox = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">

      <p className="text-xs font-medium text-[#64748B]">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-[#0F172A]">
        {value}
      </p>

    </div>
  );
};

/* =========================
   CUSTOMER INFO
========================= */

const CustomerInfo = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#E2E8F0] p-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0FDFA] text-[#0F766E]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[#64748B]">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-[#0F172A]">
          {value}
        </p>
      </div>

    </div>
  );
};

/* =========================
   ORDER STATUS
========================= */

const OrderStatus = ({ status }) => {
  const statusConfig = {
    pending: {
      icon: <FiClock />,
      className: "bg-amber-50 text-amber-600",
      label: "Pending",
    },

    confirmed: {
      icon: <FiCheckCircle />,
      className: "bg-blue-50 text-blue-600",
      label: "Confirmed",
    },

    shipped: {
      icon: <FiTruck />,
      className: "bg-purple-50 text-purple-600",
      label: "Shipped",
    },

    delivered: {
      icon: <FiCheckCircle />,
      className: "bg-green-50 text-green-600",
      label: "Delivered",
    },

    cancelled: {
      icon: <FiXCircle />,
      className: "bg-red-50 text-red-600",
      label: "Cancelled",
    },
  };

  const config =
    statusConfig[status] ||
    statusConfig.pending;

  return (
    <span
      className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export default SellerOrderDetails;