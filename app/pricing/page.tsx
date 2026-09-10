"use client";

import { useState } from "react";

type ServiceType =
  | "Domestic Cleaning"
  | "Airbnb Cleaning"
  | "Office Cleaning"
  | "Hotel Cleaning"
  | "Commercial Cleaning"
  | "Deep Cleaning"
  | "";

type PricingForm = {
  service: ServiceType;
  hours: number;
  rooms: number;
  bathrooms: number;
  extras: string[];
  notes: string;
  name: string;
  phone: string;
  email: string;
};

const extraOptions = [
  { name: "Inside Oven", price: 15 },
  { name: "Inside Fridge", price: 10 },
  { name: "Windows (Internal)", price: 20 },
  { name: "Balcony Cleaning", price: 15 },
  { name: "Carpet Vacuum", price: 10 },
];

const serviceRates: Record<ServiceType, number> = {
  "Domestic Cleaning": 18,
  "Airbnb Cleaning": 45,
  "Office Cleaning": 22,
  "Hotel Cleaning": 25,
  "Commercial Cleaning": 28,
  "Deep Cleaning": 160,
  "": 0,
};

export default function PricingPage() {
  const [form, setForm] = useState<PricingForm>({
    service: "",
    hours: 1,
    rooms: 0,
    bathrooms: 0,
    extras: [],
    notes: "",
    name: "",
    phone: "",
    email: "",
  });

  const toggleExtra = (extra: string) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }));
  };

  const calculateTotal = () => {
    let base = form.service ? serviceRates[form.service] * form.hours : 0;
    base += form.rooms * 5;
    base += form.bathrooms * 10;

    form.extras.forEach((extra) => {
      const item = extraOptions.find((x) => x.name === extra);
      if (item) base += item.price;
    });

    return base;
  };

  const totalPrice = calculateTotal();

  const whatsappMessage = () => {
    const msg = `
Cleaning Quote Request

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}

Service: ${form.service}
Hours: ${form.hours}
Rooms: ${form.rooms}
Bathrooms: ${form.bathrooms}

Extras: ${form.extras.join(", ") || "None"}

Notes: ${form.notes || "None"}

Total Estimated Price: £${totalPrice}
    `;

    return `https://wa.me/447735541705?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900 text-center">
          Instant Cleaning Price Calculator
        </h1>

        <p className="text-center text-slate-600 mt-2">
          Choose your service and get an instant price estimate.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div>
            <label className="font-semibold text-slate-700">Service Type</label>
            <select
              className="w-full mt-2 p-3 border rounded-md"
              value={form.service}
              onChange={(e) =>
                setForm({ ...form, service: e.target.value as ServiceType })
              }
            >
              <option value="">Select Service</option>
              {Object.keys(serviceRates).map((service) =>
                service ? (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ) : null
              )}
            </select>

            <label className="font-semibold text-slate-700 mt-6 block">
              Hours Needed
            </label>
            <input
              type="number"
              min={1}
              className="w-full mt-2 p-3 border rounded-md"
              value={form.hours}
              onChange={(e) =>
                setForm({ ...form, hours: Number(e.target.value) })
              }
            />

            <label className="font-semibold text-slate-700 mt-6 block">
              Number of Rooms
            </label>
            <input
              type="number"
              min={0}
              className="w-full mt-2 p-3 border rounded-md"
              value={form.rooms}
              onChange={(e) =>
                setForm({ ...form, rooms: Number(e.target.value) })
              }
            />

            <label className="font-semibold text-slate-700 mt-6 block">
              Number of Bathrooms
            </label>
            <input
              type="number"
              min={0}
              className="w-full mt-2 p-3 border rounded-md"
              value={form.bathrooms}
              onChange={(e) =>
                setForm({ ...form, bathrooms: Number(e.target.value) })
              }
            />

            <label className="font-semibold text-slate-700 mt-6 block">
              Extras
            </label>
            <div className="grid grid-cols-1 gap-3 mt-3">
              {extraOptions.map((extra) => (
                <label key={extra.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.extras.includes(extra.name)}
                    onChange={() => toggleExtra(extra.name)}
                  />
                  {extra.name} (+£{extra.price})
                </label>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <label className="font-semibold text-slate-700">Your Name</label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label className="font-semibold text-slate-700 mt-6 block">
              Phone Number
            </label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <label className="font-semibold text-slate-700 mt-6 block">
              Email Address
            </label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label className="font-semibold text-slate-700 mt-6 block">
              Additional Notes
            </label>
            <textarea
              className="w-full mt-2 p-3 border rounded-md"
              rows={4}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* TOTAL PRICE */}
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Estimated Price</h2>
          <p className="text-4xl font-bold text-green-600 mt-3">£{totalPrice}</p>
        </div>

        {/* WHATSAPP BUTTON */}
        <div className="text-center mt-10">
          <a
            href={whatsappMessage()}
            className="bg-slate-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-800"
          >
            Send Quote to WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
