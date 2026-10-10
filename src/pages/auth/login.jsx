import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeSlashThin } from "react-icons/pi";
import { useState } from "react";
import api from "../../services/api.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');
    const [success , setSuccess] = useState('');
    const [loading , setLoading] = useState(false);

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

      if (!password.trim()) {
        setError("Password is required");
        return;
      }
      setLoading(true);
      await api.post("/login", { email, password })
      setSuccess("Login successful! Redirecting...");
      
        navigate("/");
      


    }
      catch(error){
        setError(error.message);
        if(error.message === 'Request failed with status code 500'){
            setError("Server error. Please try again later.");
        }
        if(error.message === 'Request failed with status code 401'){
            setError("Invalid email or password");
        }
        
      }finally{
        setLoading(false);
      }
    
  }
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSubmit();
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
              Welcome
              <br />
              back!
            </h2>

            <p className="mt-5 max-w-md text-teal-100 leading-7">
              Sign in to continue shopping, manage your orders,
              and discover something new.
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

        {/* Login Form */}
        <div className="p-7 sm:p-10 md:p-12">

          <div className="mb-8">
            <p className="text-sm font-semibold text-[#F59E0B]">
              WELCOME BACK
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
              Sign in to your account
            </h2>

            <p className="mt-2 text-[#64748B]">
              Enter your details to continue.
            </p>
          </div>
          {
            error && (
              <div className="mb-4 rounded-lg bg-red-100 px-6 py-5 text-base text-red-700" role="alert">
                {error}
              </div>
            )}
            {
              success && (
                <div className="mb-4 rounded-lg bg-green-100 px-6 py-5 text-base text-green-700" role="alert">
                  {success}
                </div>
              )
            }

          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Email Address
              </label>

              <div className="relative">
                <FiMail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />

                <input
                  type="email"
                  name="email"
                  onInput={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={email}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white py-3.5 pl-11 pr-4 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-[#0F172A]">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#0F766E] hover:text-[#115E59]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <FiLock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />

                <input
                  type={showPassword == true ? "text":'password'}
                  name="password"
                  placeholder="Enter your password"
                  onInput={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={password}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white py-3.5 pl-11 pr-4 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                />
                {
                    showPassword == true ? 
                     <RxEyeOpen onClick={() => setShowPassword(false)}  className="text-[#94A3B8] text-lg absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"/> :
                      <PiEyeSlashThin onClick={() => setShowPassword(true)} className="text-[#94A3B8] text-lg absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"/>
                   }
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#0F766E]"
              />

              <span className="text-sm text-[#64748B]">
                Remember me
              </span>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-xl bg-[#0F766E] py-3.5 font-semibold text-white shadow-md shadow-[#0F766E]/20 transition hover:bg-[#115E59] hover:shadow-lg"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Signup */}
          <p className="mt-7 text-center text-sm text-[#64748B]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#0F766E] hover:text-[#115E59]"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;