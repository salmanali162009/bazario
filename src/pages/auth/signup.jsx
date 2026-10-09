import { Link } from "react-router-dom";
import {useState} from 'react'
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeSlashThin } from "react-icons/pi";
import api from "../../services/api.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState('');
  const [success , setSuccess] = useState('');
  const [loading , setLoading] = useState(false);
  const[agreeTerms , setAgreeTerms] = useState(false);

 async function handleSubmit(){
    try{
      setError("");
      setSuccess("");


      if (!name.trim()) {
         setError("Name is required");
         return;
      }
      if (name.trim().length < 3) {
    setError("Name must be at least 3 characters");
    return;
  }
  if (!email.trim()) {
    setError("Email is required");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    setError("Please enter a valid email address");
    return;
  }
   if (!password) {
    setError("Password is required");
    return;
  }
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{6,}$/;
  if (!passwordRegex.test(password)) {
  setError(
    "Password must be at least 6 characters and contain at least 1 number and 1 special character"
  );
  return;
}
if (!agreeTerms) {
  setError("You must agree to the Terms & Conditions and Privacy Policy");
  return;
}

      setLoading(true);

      await api.post('/register', {
        name,
        email,
        password
      });

      setSuccess("Registration successful!");
      
      
        navigate('/profile');
      

    }catch (error) {

  const message =
    error.response?.data?.message || "Something went wrong";
  setError(message);
  
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
              Everything you need,
              <br />
              all in one place.
            </h2>

            <p className="mt-5 max-w-md text-teal-100 leading-7">
              Discover products, shop with ease and enjoy a simple
              shopping experience with Bazario.
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

      {/* right */}

        <div className="p-7 sm:p-10 md:p-12">

          <div className="mb-8">
            <p className="text-sm font-semibold text-[#F59E0B]">
              GET STARTED
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
              Create your account
            </h2>

            <p className="mt-2 text-[#64748B]">
              Join Bazario and start shopping today.
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-b-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          <form className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={name}
                onKeyDown={handleKeyDown}
                onInput={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
            </div>

          
            <div>
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={email}
                onKeyDown={handleKeyDown}
                onInput={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
            </div>

         
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Password
              </label>

              <input
                type={showPassword == true ? "text":'password'}
                name="password"
                value={password}
                onKeyDown={handleKeyDown}
                onInput={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />
              {
                showPassword == true ? 
                <RxEyeOpen onClick={() => setShowPassword(false)}  className="text-[#94A3B8] text-lg absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"/> :
                <PiEyeSlashThin onClick={() => setShowPassword(true)} className="text-[#94A3B8] text-lg absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"/>
              }
              
              
              <p className="mt-2 text-xs text-[#64748B]">
                Use at least 6 characters.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#0F766E]"
              />

              <p className="text-sm leading-5 text-[#64748B]">
                I agree to the{" "}
                <span className="font-medium text-[#0F766E] cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="font-medium text-[#0F766E] cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              className="w-full rounded-xl bg-[#0F766E] py-3.5 font-semibold text-white shadow-md shadow-[#0F766E]/20 transition hover:bg-[#115E59] hover:shadow-lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-[#64748B]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#0F766E] hover:text-[#115E59]"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;