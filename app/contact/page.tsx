"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ⭐ Proper type for your contact form
type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // ⭐ FIX: Proper event typing
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ⭐ WhatsApp message generator
  const generateWhatsAppMessage = () => {
    const msg = `
📩 *New Contact Message*

👤 *Name:* ${form.name}
📧 *Email:* ${form.email}
📞 *Phone:* ${form.phone}
📝 *Subject:* ${form.subject}

💬 *Message:* ${form.message}

📌 *Location:* London
    `;

    return `https://wa.me/447735541705?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-slate-900"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center text-slate-600 mt-3 max-w-xl mx-auto"
      >
        Send us a message and we’ll get back to you shortly.
      </motion.p>

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-lg mt-12">
        {!submitted ? (
          <form
            action="https://formspree.io/f/xbgjzzyl"
            method="POST"
            onSubmit={() => setSubmitted(true)}
            className="grid grid-cols-1 gap-6"
          >
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                name="name"
                required
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                name="phone"
                required
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Subject
              </label>
              <input
                name="subject"
                required
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-slate-900 text-white py-3 rounded-md font-semibold hover:bg-slate-800"
            >
              Send Message
            </button>

            {/* WhatsApp */}
            <a
              href={generateWhatsAppMessage()}
              className="block text-center bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-500"
            >
              Send via WhatsApp
            </a>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Message Sent Successfully
            </h2>
            <p className="text-slate-600 mt-3">
              Thank you! We’ll get back to you shortly.
            </p>

            <a
              href="/"
              className="inline-block mt-6 bg-slate-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-800"
            >
              Back to Home
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
