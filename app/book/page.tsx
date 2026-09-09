"use client";

import { useState } from "react";

// ⭐ Booking type
type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: "new" | "contacted" | "converted" | "cancelled";
};

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);

  // ⭐ Save booking to admin dashboard
  const saveBookingToAdmin = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(e.currentTarget);

    const newBooking: Booking = {
      id: Date.now(),
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      service: String(formData.get("service") || ""),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      notes: String(formData.get("notes") || ""),
      status: "new",
    };

    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    saved.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(saved));
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        Book a Cleaning Service
      </h1>

      {!submitted ? (
        <form
          action="https://formspree.io/f/xbgjzzyl"
          method="POST"
          onSubmit={(e) => {
            saveBookingToAdmin(e);
            setSubmitted(true);
          }}
          className="max-w-xl mx-auto bg-slate-100 p-6 rounded-lg shadow space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />

          <select
            name="service"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          >
            <option value="">Select Service</option>
            <option value="Deep Cleaning">Deep Cleaning</option>
            <option value="End of Tenancy">End of Tenancy</option>
            <option value="Airbnb Cleaning">Airbnb Cleaning</option>
            <option value="Regular Cleaning">Regular Cleaning</option>
            <option value="Office Cleaning">Office Cleaning</option>
          </select>

          <input
            type="date"
            name="date"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />

          <input
            type="time"
            name="time"
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />

          <textarea
            name="notes"
            placeholder="Additional Notes (optional)"
            className="w-full border border-slate-300 rounded-md px-4 py-2"
          />

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-md font-semibold hover:bg-slate-700"
          >
            Submit Booking
          </button>

          <a
            href="https://wa.me/+447735541705"
            className="block text-center bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-500"
          >
            Book on WhatsApp Instead
          </a>
        </form>
      ) : (
        <div className="text-center max-w-xl mx-auto bg-slate-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Booking Submitted</h2>
          <p className="text-slate-700 mb-4">
            Thank you! We’ve received your booking and will contact you shortly.
          </p>

          <a
            href="/"
            className="inline-block bg-slate-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-700"
          >
            Back to Home
          </a>
        </div>
      )}
    </div>
  );
}
