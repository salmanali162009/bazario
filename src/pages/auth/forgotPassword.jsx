import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import api from "../../services/api.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try{
      
      setError("");
      setSuccess("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);

    await api.post("/forgot-password", { email });

    setSuccess("Password reset link has been sent to your email.");
    }catch(error){
        if(error.message === 'Request failed with status code 500'){
            setError("Server error. Please try again later.");
        }
      setError(error.message);
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex bg-[#0F766E] p-10 text-white flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Bazario
            </h1>

            <p className="mt-2 text-teal-100">
              Your trusted online marketplace
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Forgot your password?
            </h2>

            <p className="mt-5 max-w-md text-teal-100 leading-7">
              Don't worry. Enter your registered email address and
              we'll help you get back into your Bazario account.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-2 w-10 rounded-full bg-[#F59E0B]" />
              <div className="h-2 w-2 rounded-full bg-white/50" />
              <div className="h-2 w-2 rounded-full bg-white/50" />
            </div>
          </div>

          <p className="text-sm text-teal-100">
            © 2026 Bazario
          </p>
        </div>

        {/* Right Side */}
        <div className="p-7 sm:p-10 md:p-12">

          <div className="mb-8">
            <p className="text-sm font-semibold text-[#F59E0B]">
              PASSWORD RECOVERY
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
              Forgot password?
            </h2>

            <p className="mt-2 text-[#64748B]">
              Enter your email address and we'll send you a
              password reset link.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <span>{error}</span>
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <span>{success}</span>
            </div>
          )}

          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-lg" />

                <input
                  type="email"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 py-3.5 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-xl bg-[#0F766E] py-3.5 font-semibold text-white shadow-md shadow-[#0F766E]/20 transition hover:bg-[#115E59] hover:shadow-lg"
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-7 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] hover:text-[#115E59]"
            >
              <FiArrowLeft />
              Back to Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;