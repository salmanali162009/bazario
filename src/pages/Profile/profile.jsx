import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPackage,
  FiShoppingBag,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiChevronRight,
   FiLogOut 
} from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile =  () => {
    const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
  name: "",
  email: "",
  status: "Active",
});

  useEffect(() => {
    async function getUserData() {
        try {
            const response = await api.get("/me");
            const userData = response.data.data;
            setUser({
                name: userData.name,
                email: userData.email,
                status: "Active",
            });
           
        } catch (error) {
            if(error.message === 'Request failed with status code 401'){
                navigate("/login");
            }
                
            console.error("Error fetching user data:", error.message);
        }
    
    }
    getUserData();
    return () => {
        // Cleanup function if needed
    }
    
  }, []);

  async function handleLogout() {
    try {
        setLoading(true);
      await api.post("/logout");
      
        navigate("/login");
     
    } catch (error) {
      console.error("Error logging out:", error);
    }
    finally {
        setLoading(false);
        
    }
}


 

  const [myProducts, setMyProducts] = useState([]);

   async function getMyProducts() {
    try {
      const response = await api.get("/my-products");
      const products = await response.data.products;
      setMyProducts(products);
      
    } catch (error) {
      console.error("Error fetching my products:", error);
      if(error.message === 'Request failed with status code 401'){
                navigate("/login");
            }

    }
  }



  const [myOrders, setMyOrders] = useState([]);

  async function getMyOrders() {
    try {
      const response = await api.get("/recent-orders");
      const orders = await response.data.orders;
      setMyOrders(orders);
      
    } catch (error) {
      console.error("Error fetching my orders:", error);
      if(error.message === 'Request failed with status code 401'){
                navigate("/login");
            }
    } 
  }

  

  const [receivedOrders, setReceivedOrders] = useState([]);

  async function getReceivedOrders() {
    try {
      const response = await api.get("/seller-orders");
      const orders = await response.data.orders;
      setReceivedOrders(orders);
    } catch (error) {
      console.error("Error fetching received orders:", error);
      if(error.message === 'Request failed with status code 401'){
                navigate("/login");
            }
    }
  }

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: FiUser,
    },
    {
      id: "products",
      label: "My Products",
      action: getMyProducts,
      icon: FiPackage,
    },
    {
      id: "orders",
      label: "My Orders",
      action: getMyOrders,
      icon: FiShoppingBag,
    },
    {
      id: "received",
      label: "Orders Received",
      action: getReceivedOrders,
      icon: FiTruck,
    },
  ];

  return (


    <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div 
        onClick={()=> navigate('/')}
        className= "flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#0F766E] p-3" 
         ><FaArrowLeft /> back to home</div>

        {/* Profile Header */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-[#E2E8F0]">

          <div className="bg-[#0F766E] px-6 py-8 sm:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white text-[#0F766E] shadow-lg">
                <FiUser className="text-5xl" />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <h1 className="text-3xl font-bold text-white">
                    {user.name}
                  </h1>

                  {/* Active */}
                  <span className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                    {user.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-teal-100">
                  <FiMail />
                  {user.email}
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-teal-100">
                  <FiMapPin />
                  Bazario Account
                </div>
              </div>

            
              {/* logout */}
              <button
                 onClick={() => handleLogout()}
                 className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                   >
                 <FiLogOut className="text-lg" />
                 {loading ? "Logging out..." : "Logout"}
                </button>

            </div>
          </div>

          {/* Tabs */}
          <div className="overflow-x-auto border-b border-[#E2E8F0]">
            <div className="flex min-w-max px-4 sm:px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                  
                    key={tab.id}
                    onClick={() => {
                        
                        setActiveTab(tab.id)
                        tab.action && tab.action()
                        
                    }}

                    className={`relative cursor-pointer flex items-center gap-2 px-5 py-4 text-sm font-semibold transition ${
                      isActive
                        ? "text-[#0F766E]"
                        : "text-[#64748B] hover:text-[#0F766E]"
                    }`}
                  >
                    <Icon className="text-lg" />
                    {tab.label}

                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F766E]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              <StatCard
                icon={<FiPackage />}
                title="My Products"
                
                onClick={() => {
                    setActiveTab("products")
                    getMyProducts()
                }}
              />

              <StatCard
                icon={<FiShoppingBag />}
                title="My Orders"
                
                onClick={() => {
                  setActiveTab("orders")
                  getMyOrders()
                }}
              />

              <StatCard
                icon={<FiTruck />}
                title="Orders Received"
              
                onClick={() =>{ 
                  setActiveTab("received")
                  getReceivedOrders()
                }}
              />

            </div>
          )}

          {/* MY PRODUCTS */}
          {/* MY PRODUCTS */}
{activeTab === "products" && (
  <section>
    <SectionHeader
      title="My Products"
      description="Products you have listed on Bazario"
    />

    {/* Add Product Button */}
    <div className="mb-5 flex justify-end">
      <button
        type="button"
        onClick={() => navigate("/add-product")}
        className="inline-flex items-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md"
      >
        <FiPackage size={18} />
        Add Product
      </button>
    </div>

    {myProducts.length === 0 ? (
      <EmptyState text="You haven't added any products yet." />
    ) : (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {myProducts.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <p className="text-xs font-semibold uppercase text-[#F59E0B]">
                {product.category}
              </p>

              <h3 className="mt-1 text-lg font-bold text-[#0F172A]">
                {product.title}
              </h3>

              <div className="mt-4 flex items-center justify-between">
                <p className="font-bold text-[#0F766E]">
                  PKR {product.price}
                </p>

                <span className="text-xs text-[#64748B]">
                  Stock: {product.stock}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(`/my-products/${product._id}`)
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#0F766E] py-2.5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#F0FDFA]"
              >
                View Product
                <FiChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
)}

          {/* MY ORDERS */}
          {activeTab === "orders" && (
            <section>
              <SectionHeader
                title="My Orders"
                description="Orders you have placed"
              />

              <div className="space-y-4">
                {
                  myOrders.length === 0 ?
                  <EmptyState text="You haven't placed any orders yet." />
                  :
                myOrders?.map((order,index) => (
                  <div
                    key={order._id}
                    onClick={() => navigate(`/my-orders/${order._id}`)}
                    className="rounded-2xl border border-[#E2E8F0] bg-white cursor-pointer p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <p className="text-xs font-semibold text-[#64748B]">
                          {index + 1}
                        </p>

                        <h3 className="mt-1 font-bold text-[#0F172A]">
                          {order.productId?.title || "Product no longer available"}
                        </h3>

                        <p className="mt-1 text-sm text-[#64748B]">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                        </p>
                      </div>

                      <div className="flex items-center gap-5">
                        <p className="font-bold text-[#0F766E]">
                          PKR {String(order.totalPrice)}
                        </p>

                        <OrderStatus status={order.status} />
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* RECEIVED ORDERS */}
          {activeTab === "received" &&
          
           (
            <section>
              <SectionHeader
                title="Orders Received"
                description="Orders placed for your products"
              />

              <div className="space-y-4">

                {
                  receivedOrders.length === 0 ?
                  <EmptyState text="You haven't received any orders yet." />
                  :
                receivedOrders.map((order,index) => (
                  <div
                    key={order._id}
                    onClick={() => navigate(`/seller-orders/${order._id}`)}
                    className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm cursor-pointer transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div>
                        <p className="text-xs font-semibold text-[#64748B]">
                          #{index + 1}
                        </p>

                        <h3 className="mt-1 font-bold text-[#0F172A]">
                          {order.productId?.title || "Product no longer available"}
                        </h3>

                        <p className="mt-1 text-sm text-[#64748B]">
                          Customer: {order.userId.name}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-5">
                        <div>
                          <p className="text-xs text-[#64748B]">
                            Quantity
                          </p>
                          <p className="font-semibold text-[#0F172A]">
                            {order.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#64748B]">
                            Total
                          </p>
                          <p className="font-bold text-[#0F766E]">
                            PKR {String(order.totalPrice)}
                          </p>
                        </div>

                        <OrderStatus status={order.status} />
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};








/* =========================
   STAT CARD
========================= */

const StatCard = ({ icon, title, value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-[#E2E8F0] bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDFA] text-xl text-[#0F766E]">
          {icon}
        </div>

        <FiChevronRight className="text-[#94A3B8] transition group-hover:translate-x-1 group-hover:text-[#0F766E]" />
      </div>

      <p className="mt-5 text-sm text-[#64748B]">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-[#0F172A]">
        {value}
      </p>
    </button>
  );
};







/* =========================
   SECTION HEADER
========================= */

const SectionHeader = ({ title, description }) => {
  return (
    <div className="mb-5 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h2 className="text-2xl font-bold text-[#0F172A]">
        {title}
      </h2>

      <p className="mt-1 text-sm text-[#64748B]">
        {description}
      </p>
    </div>
  );
};





/* =========================
   EMPTY STATE
========================= */

const EmptyState = ({ text }) => {
  return (
    <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white py-16 text-center">
      <FiPackage className="mx-auto text-4xl text-[#94A3B8]" />

      <p className="mt-4 text-sm text-[#64748B]">
        {text}
      </p>
    </div>
  );
};


/* =========================
   ORDER STATUS
========================= */






const OrderStatus = ({ status }) => {
  const statusConfig = {
    Pending: {
      icon: <FiClock />,
      className: "bg-amber-50 text-amber-600",
    },

    Confirmed: {
      icon: <FiCheckCircle />,
      className: "bg-blue-50 text-blue-600",
    },

    Shipped: {
      icon: <FiTruck />,
      className: "bg-purple-50 text-purple-600",
    },

    Delivered: {
      icon: <FiCheckCircle />,
      className: "bg-green-50 text-green-600",
    },
  };

  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <span
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
    >
      {config.icon}
      {status}
    </span>
  );
};

export default Profile;