"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-slate-900 text-white py-12 mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* COMPANY */}
        <div>
          <h3 className="text-xl font-bold">London Sparkle Cleaning</h3>
          <p className="text-sm text-slate-300 mt-3">
            Professional domestic, Airbnb, office and commercial cleaning across all London zones.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/services" className="hover:text-white">Services</a></li>
            <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="/gallery" className="hover:text-white">Gallery</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p className="text-sm text-slate-300">Phone: 07735541705</p>
          <p className="text-sm text-slate-300">Email: bookings@londonsparklecleaning.co.uk</p>

          <a
            href="https://wa.me/447735541705"
            className="inline-block mt-4 bg-white text-slate-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-200"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>

      <p className="text-center text-xs text-slate-400 mt-10">
        © {new Date().getFullYear()} London Sparkle Cleaning — All Rights Reserved
      </p>
    </motion.footer>
  );
}
