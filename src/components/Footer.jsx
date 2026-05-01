import Link from "next/link";
import { PiBookOpenTextLight } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-[#F9F8F6] border-t border-base-200 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* Company */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/about" className="text-sm text-base-content/60 hover:text-base-content transition">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-base-content/60 hover:text-base-content transition">Contact Us</Link></li>
              <li><Link href="/vacancy" className="text-sm text-base-content/60 hover:text-base-content transition">Vacancy</Link></li>
              <li><Link href="/company" className="text-sm text-base-content/60 hover:text-base-content transition">Company</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Help</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/subscription" className="text-sm text-base-content/60 hover:text-base-content transition">Subscription instructions</Link></li>
              <li><Link href="/help" className="text-sm text-base-content/60 hover:text-base-content transition">Help Center</Link></li>
              <li><Link href="/problem" className="text-sm text-base-content/60 hover:text-base-content transition">Problem with the site</Link></li>
            </ul>
          </div>

          {/* User */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">User</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/signup" className="text-sm text-base-content/60 hover:text-base-content transition">Registration</Link></li>
              <li><Link href="/orders" className="text-sm text-base-content/60 hover:text-base-content transition">My Orders</Link></li>
              <li><Link href="/wishlist" className="text-sm text-base-content/60 hover:text-base-content transition">Wish list</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Follow Us</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="https://instagram.com" target="_blank" className="text-sm text-base-content/60 hover:text-base-content transition">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" className="text-sm text-base-content/60 hover:text-base-content transition">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" className="text-sm text-base-content/60 hover:text-base-content transition">Twitter</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-base-content mb-4">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter email here"
                className="border border-base-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-base-content bg-white w-full"
              />
              <button className="w-full bg-[#1A1A1B] text-white text-sm font-medium py-2 rounded-lg hover:bg-black/80 transition">
                Send Email
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-base-200 mt-10 pt-6 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <PiBookOpenTextLight className="text-xl text-base-content" />
            <span
              style={{ fontFamily: "var(--font-playfair), serif" }}
              className="text-lg font-bold text-base-content"
            >
              CurvBooks
            </span>
          </div>
          <p className="text-xs text-base-content/50">
            ©{new Date().getFullYear()} . All rights reserved.{" "}
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </p>
        </div>

      </div>
    </footer>
  );
}