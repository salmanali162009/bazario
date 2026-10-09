import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeSlashThin } from "react-icons/pi";
import api from "../../services/api.js";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters and contain at least 1 number and 1 special character"
      );
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    api.post("/reset-password", { token, newPassword: password });

    setSuccess("Password reset successful!");
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
              Create a new password.
            </h2>

            <p className="mt-5 max-w-md text-teal-100 leading-7">
              Choose a strong password to keep your Bazario
              account secure.
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
              PASSWORD RESET
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
              Reset your password
            </h2>

            <p className="mt-2 text-[#64748B]">
              Enter your new password below.
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

            {/* New Password */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                New Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 pr-12 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />

              {showPassword ? (
                <RxEyeOpen
                  onClick={() => setShowPassword(false)}
                  className="text-[#94A3B8] text-lg absolute right-4 top-[52px] cursor-pointer"
                />
              ) : (
                <PiEyeSlashThin
                  onClick={() => setShowPassword(true)}
                  className="text-[#94A3B8] text-lg absolute right-4 top-[52px] cursor-pointer"
                />
              )}

              <p className="mt-2 text-xs text-[#64748B]">
                Minimum 6 characters, 1 number and 1 special character.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-[#0F172A]">
                Confirm Password
              </label>

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 pr-12 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
              />

              {showConfirmPassword ? (
                <RxEyeOpen
                  onClick={() => setShowConfirmPassword(false)}
                  className="text-[#94A3B8] text-lg absolute right-4 top-[52px] cursor-pointer"
                />
              ) : (
                <PiEyeSlashThin
                  onClick={() => setShowConfirmPassword(true)}
                  className="text-[#94A3B8] text-lg absolute right-4 top-[52px] cursor-pointer"
                />
              )}
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-xl bg-[#0F766E] py-3.5 font-semibold text-white shadow-md shadow-[#0F766E]/20 transition hover:bg-[#115E59] hover:shadow-lg"
            >
              Reset Password
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-7 text-center">
            <Link
              to="/login"
              className="font-semibold text-[#0F766E] hover:text-[#115E59]"
            >
              Back to Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;