"use client";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-slate-900 text-center"
        >
          Professional Cleaning Services Across London
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-3 text-sm text-slate-600 text-center max-w-2xl mx-auto"
        >
          We provide reliable, high‑quality cleaning services for homes, landlords, Airbnb hosts,
          offices and commercial spaces across all London zones. Every service is delivered by
          vetted, trusted cleaners with a commitment to excellence.
        </motion.p>

        {/* SERVICES GRID */}
        <div className="mt-16 grid md:grid-cols-2 gap-12">

          {/* Domestic Cleaning */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-slate-900">Domestic Cleaning</h3>
            <p className="mt-3 text-sm text-slate-600">
              Weekly or bi‑weekly home cleaning tailored to your lifestyle. Perfect for busy
              professionals, families and shared households across London.
            </p>
            <ul className="mt-4 text-xs text-slate-500 list-disc list-inside space-y-1">
              <li>Kitchens, bathrooms & living areas</li>
              <li>Dusting, vacuuming & mopping</li>
              <li>Bed making & general tidying</li>
            </ul>
            <a
              href="/pricing"
              className="inline-block mt-4 text-sm font-semibold text-slate-900 underline"
            >
              View Domestic Cleaning Pricing
            </a>
          </motion.div>

          {/* Airbnb / Short-Let Cleaning */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-slate-900">Airbnb / Short‑Let Cleaning</h3>
            <p className="mt-3 text-sm text-slate-600">
              Fast, reliable turnover cleans for hosts across London. We prepare your property
              for the next guest with a spotless finish and optional linen service.
            </p>
            <ul className="mt-4 text-xs text-slate-500 list-disc list-inside space-y-1">
              <li>Guest‑ready presentation</li>
              <li>Linen change & laundry options</li>
              <li>Inventory & restocking checks</li>
            </ul>
            <a
              href="/pricing"
              className="inline-block mt-4 text-sm font-semibold text-slate-900 underline"
            >
              View Airbnb Cleaning Pricing
            </a>
          </motion.div>

          {/* Office Cleaning */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-slate-900">Office Cleaning</h3>
            <p className="mt-3 text-sm text-slate-600">
              Professional office cleaning for businesses across London. Available early mornings,
              evenings or weekends to suit your schedule.
            </p>
            <ul className="mt-4 text-xs text-slate-500 list-disc list-inside space-y-1">
              <li>Desks, meeting rooms & communal areas</li>
              <li>Kitchenettes & washrooms</li>
              <li>Bins, recycling & sanitisation</li>
            </ul>
            <a
              href="/pricing"
              className="inline-block mt-4 text-sm font-semibold text-slate-900 underline"
            >
              View Office Cleaning Pricing
            </a>
          </motion.div>

          {/* Deep Cleaning */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-slate-900">Deep Cleaning</h3>
            <p className="mt-3 text-sm text-slate-600">
              Intensive top‑to‑bottom cleaning ideal for moving in/out, post‑renovation or
              seasonal refresh. We clean areas standard cleaning doesn’t reach.
            </p>
            <ul className="mt-4 text-xs text-slate-500 list-disc list-inside space-y-1">
              <li>Inside cupboards & appliances</li>
              <li>Skirting boards, tiles & limescale removal</li>
              <li>Full property sanitisation</li>
            </ul>
            <a
              href="/pricing"
              className="inline-block mt-4 text-sm font-semibold text-slate-900 underline"
            >
              View Deep Cleaning Pricing
            </a>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900">Ready to book a clean?</h2>
          <p className="mt-3 text-sm text-slate-600">
            We cover all London zones. Send us your preferred date, location and property details.
          </p>

          <a
            href="https://wa.me/+447735541705"
            className="inline-block mt-6 bg-slate-900 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-slate-800 shadow-md"
          >
            Book on WhatsApp
          </a>
        </motion.div>

      </div>
    </div>
  );
}
