"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-white shadow-md fixed top-0 left-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-green-400 text-2xl font-bold">
          Cleanit
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <Link href="/services" className="hover:text-slate-900">Services</Link>
          <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
          <Link href="/gallery" className="hover:text-slate-900 hover:bg-green-400 rounded">Gallery</Link>
          <Link href="/contact" className="hover:text-slate-900">Contact</Link>
          <Link href="/about" className="hover:text-slate-600">About</Link>
          <Link href="/testimonials" className="hover:text-slate-600">Testimonials</Link>
          <Link href="/faq" className="hover:text-slate-600">FAQ</Link>
        </div>

        {/* BOOK NOW → Pricing */}
        <Link
          href="/pricing"
          className="bg-green-400 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-800"
        >
          Book Now
        </Link>

      </div>
    </motion.nav>
  );
}
