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
  propertyType: string;
  hours: number;
  rooms: number;
  bathrooms: number;
  toilets: number;
  extras: string[];
  notes: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  bookingDate: string;
  bookingTime: string;
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
    propertyType: "",
    hours: 1,
    rooms: 0,
    bathrooms: 0,
    toilets: 0,
    extras: [],
    notes: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    bookingDate: "",
    bookingTime: "",
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
    base += form.toilets * 5;

    form.extras.forEach((extra) => {
      const item = extraOptions.find((x) => x.name === extra);
      if (item) base += item.price;
    });

    return base;
  };

  const totalPrice = calculateTotal();

  const whatsappMessage = () => {
    const msg = `
📄 Cleaning Booking Request

👤 Name: ${form.name}
📞 Phone: ${form.phone}
📧 Email: ${form.email}

🏠 Address: ${form.address}
🔢 Postcode: ${form.postcode}
🏢 Property Type: ${form.propertyType}

🧹 Service Type: ${form.service}
⏱ Hours Needed: ${form.hours}

🛏 Rooms: ${form.rooms}
🚿 Bathrooms: ${form.bathrooms}
🚽 Toilets: ${form.toilets}

✨ Extras: ${form.extras.join(", ") || "None"}

📅 Booking Date: ${form.bookingDate}
⏰ Booking Time: ${form.bookingTime}

📝 Notes: ${form.notes || "None"}

💷 Total Estimated Price: £${totalPrice}

Please confirm availability.
    `;

    return `https://wa.me/447735541705?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900 text-center">
          Instant Cleaning Price & Booking
        </h1>

        <p className="text-center text-slate-600 mt-2">
          Fill in your details to get an instant quote and book your cleaning.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div>
            <label className="font-semibold">Service Type</label>
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

            <label className="font-semibold mt-6 block">Property Type</label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.propertyType}
              onChange={(e) =>
                setForm({ ...form, propertyType: e.target.value })
              }
            />

            <label className="font-semibold mt-6 block">Hours Needed</label>
            <input
              type="number"
              min={1}
              className="w-full mt-2 p-3 border rounded-md"
              value={form.hours}
              onChange={(e) =>
                setForm({ ...form, hours: Number(e.target.value) })
              }
            />

            <label className="font-semibold mt-6 block">Rooms</label>
            <input
              type="number"
              min={0}
              className="w-full mt-2 p-3 border rounded-md"
              value={form.rooms}
              onChange={(e) =>
                setForm({ ...form, rooms: Number(e.target.value) })
              }
            />

            <label className="font-semibold mt-6 block">Bathrooms</label>
            <input
              type="number"
              min={0}
              className="w-full mt-2 p-3 border rounded-md"
              value={form.bathrooms}
              onChange={(e) =>
                setForm({ ...form, bathrooms: Number(e.target.value) })
              }
            />

            <label className="font-semibold mt-6 block">Toilets</label>
            <input
              type="number"
              min={0}
              className="w-full mt-2 p-3 border rounded-md"
              value={form.toilets}
              onChange={(e) =>
                setForm({ ...form, toilets: Number(e.target.value) })
              }
            />

            <label className="font-semibold mt-6 block">Extras</label>
            <div className="grid gap-3 mt-3">
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
            <label className="font-semibold">Full Name</label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label className="font-semibold mt-6 block">Phone Number</label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <label className="font-semibold mt-6 block">Email</label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label className="font-semibold mt-6 block">Address</label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <label className="font-semibold mt-6 block">Postcode</label>
            <input
              className="w-full mt-2 p-3 border rounded-md"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
            />

            <label className="font-semibold mt-6 block">Booking Date</label>
            <input
              type="date"
              className="w-full mt-2 p-3 border rounded-md"
              value={form.bookingDate}
              onChange={(e) =>
                setForm({ ...form, bookingDate: e.target.value })
              }
            />

            <label className="font-semibold mt-6 block">Booking Time</label>
            <input
              type="time"
              className="w-full mt-2 p-3 border rounded-md"
              value={form.bookingTime}
              onChange={(e) =>
                setForm({ ...form, bookingTime: e.target.value })
              }
            />

            <label className="font-semibold mt-6 block">Notes</label>
            <textarea
              className="w-full mt-2 p-3 border rounded-md"
              rows={4}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* PRICE */}
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold">Estimated Price</h2>
          <p className="text-4xl font-bold text-green-600 mt-3">£{totalPrice}</p>
        </div>

        {/* BOOK NOW BUTTON */}
        <div className="text-center mt-10">
          <a
            href={whatsappMessage()}
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700"
          >
            BOOK NOW
          </a>
        </div>
      </div>
    </div>
  );
}
