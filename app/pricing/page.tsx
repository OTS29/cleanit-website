"use client";

import { useState, useEffect } from "react";

type ServiceType =
  | "Domestic Cleaning"
  | "Airbnb Cleaning"
  | "Office Cleaning"
  | "Hotel Cleaning"
  | "Commercial Cleaning"
  | "Deep Cleaning"
  | "";

type PropertyCondition = "Existing" | "New Build" | "Renovated";
type SuppliesOption = "Customer Provides" | "We Provide";

type PricingForm = {
  service: ServiceType;
  propertyType: string;
  condition: PropertyCondition;
  supplies: SuppliesOption;
  hours: number;
  rooms: number;
  bathrooms: number;
  toilets: number;
  drainage: boolean;
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
  "Domestic Cleaning": 20,
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
    condition: "Existing",
    supplies: "Customer Provides",
    hours: 1,
    rooms: 0,
    bathrooms: 0,
    toilets: 0,
    drainage: false,
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

  const inputStyle =
    "w-full mt-2 p-3 border border-blue-300 rounded-md bg-slate-50 text-gray-600 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  // ⭐ Auto-set minimum hours based on rooms, bathrooms, toilets, condition, drainage
  const calculateMinimumHours = () => {
    let hours = 1;

    // Rooms
    if (form.rooms <= 1) hours = 1;
    else if (form.rooms <= 2) hours = 2;
    else if (form.rooms <= 3) hours = 3;
    else if (form.rooms <= 4) hours = 3.5;
    else if (form.rooms <= 6) hours = 4;
    else hours = 5;

    // Bathrooms
    hours += form.bathrooms * 0.5;

    // Toilets
    hours += form.toilets * 0.25;

    // Property condition
    if (form.condition === "New Build") hours += 1;
    if (form.condition === "Renovated") hours += 2;

    // Drainage cleaning
    if (form.drainage) hours += 1;

    return hours;
  };

  useEffect(() => {
    const minHours = calculateMinimumHours();
    if (form.hours < minHours) {
      setForm((prev) => ({ ...prev, hours: minHours }));
    }
  }, [form.rooms, form.bathrooms, form.toilets, form.condition, form.drainage]);

  const toggleExtra = (extra: string) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }));
  };

  // ⭐ Corrected pricing logic
  const calculateTotal = () => {
    if (
      form.service === "Hotel Cleaning" ||
      form.service === "Commercial Cleaning" ||
      form.service === "Office Cleaning"
    ) {
      return "Contact us for a quote";
    }

    let base = form.service ? serviceRates[form.service] * form.hours : 0;

    const rooms = Math.min(form.rooms, 10);
    const bathrooms = Math.min(form.bathrooms, 5);
    const toilets = Math.min(form.toilets, 5);

    base += rooms * 5;
    base += bathrooms * 10;
    base += toilets * 5;

    // Drainage cleaning
    if (form.drainage) base += 20;

    // Supplies
    if (form.supplies === "We Provide") base += 15;

    // Extras
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
🏗 Condition: ${form.condition}
🧴 Supplies: ${form.supplies}

🧹 Service Type: ${form.service}
⏱ Hours Needed: ${form.hours}

🛏 Rooms: ${form.rooms}
🚿 Bathrooms: ${form.bathrooms}
🚽 Toilets: ${form.toilets}
🕳 Drainage Cleaning: ${form.drainage ? "Yes" : "No"}

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
            <label className="font-semibold text-gray-900">Service Type</label>
            <select
              className={inputStyle}
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

            <label className="font-semibold mt-6 block text-gray-900">Property Type</label>
            <input
              className={inputStyle}
              placeholder="e.g. Flat, House, Studio"
              value={form.propertyType}
              onChange={(e) =>
                setForm({ ...form, propertyType: e.target.value })
              }
            />

            <label className="font-semibold mt-6 block text-gray-900">Property Condition</label>
            <select
              className={inputStyle}
              value={form.condition}
              onChange={(e) =>
                setForm({ ...form, condition: e.target.value as PropertyCondition })
              }
            >
              <option>Existing</option>
              <option>New Build</option>
              <option>Renovated</option>
            </select>

            <label className="font-semibold mt-6 block text-gray-900">Supplies</label>
            <select
              className={inputStyle}
              value={form.supplies}
              onChange={(e) =>
                setForm({ ...form, supplies: e.target.value as SuppliesOption })
              }
            >
              <option>Customer Provides</option>
              <option>We Provide</option>
            </select>

            <label className="font-semibold mt-6 block text-gray-900">Hours Needed</label>
            <input
              type="number"
              min={calculateMinimumHours()}
              className={inputStyle}
              value={form.hours}
              onChange={(e) =>
                setForm({ ...form, hours: Number(e.target.value) })
              }
            />

            <label className="font-semibold mt-6 block text-gray-900">Rooms</label>
            <input
              type="number"
              min={0}
              max={10}
              className={inputStyle}
              placeholder="e.g. 2"
              value={form.rooms}
              onChange={(e) =>
                setForm({ ...form, rooms: Number(e.target.value) })
              }
            />

            <label className="font-semibold mt-6 block text-gray-900">Bathrooms</label>
            <input
              type="number"
              min={0}
              max={5}
              className={inputStyle}
              placeholder="e.g. 1"
              value={form.bathrooms}
              onChange={(e) =>
                setForm({ ...form, bathrooms: Number(e.target.value) })
              }
            />

            <label className="font-semibold mt-6 block text-gray-900">Toilets</label>
            <input
              type="number"
              min={0}
              max={5}
              className={inputStyle}
              placeholder="e.g. 1"
              value={form.toilets}
              onChange={(e) =>
                setForm({ ...form, toilets: Number(e.target.value) })
              }
            />

            <label className="font-semibold mt-6 block text-gray-900">Drainage Cleaning</label>
            <label className="flex items-center gap-2 mt-2 text-gray-800">
              <input
                type="checkbox"
                checked={form.drainage}
                onChange={(e) =>
                  setForm({ ...form, drainage: e.target.checked })
                }
              />
              Drainage Cleaning (+£20)
            </label>

            <label className="font-semibold mt-6 block text-gray-900">Extras</label>
            <div className="grid gap-3 mt-3 text-gray-900">
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
            <label className="font-semibold text-gray-900">Full Name</label>
            <input
              className={inputStyle}
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label className="font-semibold mt-6 block text-gray-900">Phone Number</label>
            <input
              className={inputStyle}
              placeholder="e.g. 07712 345678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <label className="font-semibold mt-6 block text-gray-900">Email</label>
            <input
              className={inputStyle}
              placeholder="e.g. name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label className="font-semibold mt-6 block text-gray-900">Address</label>
            <input
              className={inputStyle}
              placeholder="Enter your full address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <label className="font-semibold mt-6 block text-gray-900">Postcode</label>
            <input
              className={inputStyle}
              placeholder="e.g. SE13 5XX"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
            />

            <label className="font-semibold mt-6 block text-gray-900">Booking Date</label>
            <input
              type="date"
              className={inputStyle}
              value={form.bookingDate}
              onChange={(e) =>
                setForm({ ...form, bookingDate: e.target.value })
              }
            />

            <label className="font-semibold mt-6 block text-gray-900">Booking Time</label>
            <input
              type="time"
              className={inputStyle}
              value={form.bookingTime}
              onChange={(e) =>
                setForm({ ...form, bookingTime: e.target.value })
              }
            />

            <label className="font-semibold mt-6 block text-gray-900">Notes</label>
            <textarea
              className={inputStyle}
              placeholder="Any special instructions?"
              rows={4}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* PRICE */}
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-gray-900">Estimated Price</h2>

          {typeof totalPrice === "string" ? (
            <p className="text-xl font-bold text-red-600 mt-3">
              {totalPrice}
            </p>
          ) : (
            <p className="text-4xl font-bold text-green-600 mt-3">
              £{totalPrice}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="text-center mt-10 flex justify-center gap-4">
          <a
            href={whatsappMessage()}
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700"
          >
            BOOK NOW
          </a>

          <a
            href="YOUR_PAYPAL_LINK_HERE"
            target="_blank"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Pay Now
          </a>
        </div>
      </div>
    </div>
  );
}
