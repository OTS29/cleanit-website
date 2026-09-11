"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-slate-50">

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section
        className="relative w-full h-[75vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/image3.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg"
          >
            We Clean Across London
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="mt-4 text-slate-200 text-sm md:text-base max-w-xl drop-shadow-md"
          >
            Professional domestic, Airbnb, office and deep cleaning delivered by trusted, vetted cleaners.
            Same‑day availability, flexible scheduling, and a spotless finish every time — wherever you are in London.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            

            <a
              href="/pricing"
              className="border border-white px-5 py-3 rounded-md text-sm hover:bg-white hover:text-slate-900 shadow-md"
            >
              Book Now
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES SECTION WITH ANIMATIONS */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-slate-900 text-center"
          >
            Professional Cleaning Services for Homes & Businesses Across London
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-2 text-sm text-slate-600 text-center"
          >
            Whether you're a busy professional, landlord, Airbnb host or business owner, we provide reliable,
            high‑quality cleaning services anywhere in London — tailored to your schedule and needs.
          </motion.p>

          <div className="mt-14 grid md:grid-cols-2 gap-10">

            {/* Domestic Cleaning */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
            >
              <img
                src="/domestic.jpg"
                alt="Domestic Cleaning"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-slate-900 mt-4">Domestic Cleaning</h3>
              <p className="mt-2 text-sm text-slate-600">
                Weekly or bi‑weekly cleaning for flats and houses.
              </p>
            </motion.div>

            {/* Airbnb Cleaning */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
            >
              <img
                src="/airbnb.jpg"
                alt="Airbnb Cleaning"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-slate-900 mt-4">Airbnb / Short‑Let Cleaning</h3>
              <p className="mt-2 text-sm text-slate-600">
                Fast turnover cleans with linen change and guest‑ready finishing.
              </p>
            </motion.div>

            {/* Office Cleaning */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
            >
              <img
                src="/office.jpg"
                alt="Office Cleaning"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-slate-900 mt-4">Office Cleaning</h3>
              <p className="mt-2 text-sm text-slate-600">
                Reliable early‑morning or evening cleaning for offices across London.
              </p>
            </motion.div>

            {/* Deep Cleaning */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
            >
              <img
                src="/deep.jpg"
                alt="Deep Cleaning"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-slate-900 mt-4">Deep Cleaning</h3>
              <p className="mt-2 text-sm text-slate-600">
                Intensive one‑off cleaning for moving in/out, renovations or seasonal refresh.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-slate-900 text-white px-6 py-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Ready to book your clean?</h2>
          <p className="mt-3 text-sm text-slate-300">
            Tell us your preferred date, location and property details — we cover all London zones and reply within hours.
          </p>

          <a
            href="https://wa.me/+447735541705"
            className="mt-6 inline-block bg-white text-slate-900 px-6 py-3 rounded-md font-semibold text-sm hover:bg-slate-200 shadow-md"
          >
            Book on WhatsApp
          </a>
        </div>
      </motion.section>

    </div>
  );
}
