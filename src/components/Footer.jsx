import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import {
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-16 w-full overflow-hidden bg-[#0F766E] text-white">
      {/* Main Footer */}
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div className="min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
            >
              <FiShoppingBag size={28} />
              Bazario
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-teal-50">
              Discover products you'll love. Shop your favorites
              with a simple, convenient, and reliable experience.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#0F766E]"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#0F766E]"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#0F766E]"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#0F766E]"
              >
                <FaXTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="min-w-0">
            <h3 className="text-base font-bold sm:text-lg">
              Explore
            </h3>

            <ul className="mt-5 space-y-4">
              <li>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-teal-50 transition hover:translate-x-1 hover:text-white"
                >
                  <FiArrowUpRight size={16} />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm text-teal-50 transition hover:translate-x-1 hover:text-white"
                >
                  <FiArrowUpRight size={16} />
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="inline-flex items-center gap-2 text-sm text-teal-50 transition hover:translate-x-1 hover:text-white"
                >
                  <FiArrowUpRight size={16} />
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="min-w-0">
            <h3 className="text-base font-bold sm:text-lg">
              Customer Service
            </h3>

            <ul className="mt-5 space-y-4">
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm text-teal-50 transition hover:text-white"
                >
                  <FiMail size={17} />
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping"
                  className="inline-flex items-center gap-2 text-sm text-teal-50 transition hover:text-white"
                >
                  <FiTruck size={17} />
                  Shipping Information
                </Link>
              </li>

              <li>
                <Link
                  to="/returns"
                  className="inline-flex items-center gap-2 text-sm text-teal-50 transition hover:text-white"
                >
                  <FiShoppingBag size={17} />
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-2 text-sm text-teal-50 transition hover:text-white"
                >
                  <FiShield size={17} />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className="text-base font-bold sm:text-lg">
              Get In Touch
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-6 text-teal-50">
              Have a question about an order or product? Get in
              touch with our team.
            </p>

            <div className="mt-5 space-y-4">

              {/* Email */}
              <a
                href="mailto:support@bazario.com"
                className="flex min-w-0 items-start gap-3 text-sm text-teal-50 transition hover:text-white"
              >
                <FiMail
                  className="mt-0.5 shrink-0"
                  size={18}
                />

                <span className="min-w-0 break-all">
                  support@bazario.com
                </span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3 text-sm text-teal-50">
                <FiMapPin
                  className="mt-0.5 shrink-0"
                  size={18}
                />

                <span>Karachi, Pakistan</span>
              </div>

              {/* Phone */}
              <a
                href="tel:+923000000000"
                className="flex items-start gap-3 text-sm text-teal-50 transition hover:text-white"
              >
                <FiPhone
                  className="mt-0.5 shrink-0"
                  size={18}
                />

                <span>+92 300 0000000</span>
              </a>
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0F766E] transition hover:bg-teal-50 sm:w-auto"
            >
              Contact Support
              <FiArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/20 pt-8 sm:mt-14 sm:grid-cols-3">

          {/* Benefit 1 */}
          <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 sm:bg-transparent sm:p-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
              <FiTruck size={22} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold">
                Delivery Information
              </p>

              <p className="mt-1 text-xs leading-5 text-teal-100">
                Check available shipping options
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 sm:bg-transparent sm:p-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
              <FiShield size={22} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold">
                Secure Shopping
              </p>

              <p className="mt-1 text-xs leading-5 text-teal-100">
                Shop with confidence
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 sm:bg-transparent sm:p-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
              <FiShoppingBag size={22} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold">
                Order Management
              </p>

              <p className="mt-1 text-xs leading-5 text-teal-100">
                Keep track of your purchases
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-5 py-5 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">

          <p className="text-xs leading-5 text-teal-100 sm:text-sm">
            © {new Date().getFullYear()} Bazario. All rights reserved.
          </p>

          <Link
            to="/terms"
            className="text-xs text-teal-100 transition hover:text-white sm:text-sm"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;