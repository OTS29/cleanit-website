"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ⭐ STRICT TYPES
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
  rooms: number;
  kitchens: number;
  bathrooms: number;
  chemicals: string;
  wasteRemoval: string;
  binBags: string;
  vacuuming: string;
  drainage: string;
  extras: string[];
  notes: string;
  customerName: string;
  businessName: string;
  address: string;
  postcode: string;
  phone: string;
  email: string;
  subscribe: boolean;
};

export default function PricingPage() {
  const [form, setForm] = useState<PricingForm>({
    service: "",
    propertyType: "",
    rooms: 0,
    kitchens: 0,
    bathrooms: 0,
    chemicals: "",
    wasteRemoval: "",
    binBags: "",
    vacuuming: "",
    drainage: "",
    extras: [],
    notes: "",
    customerName: "",
    businessName: "",
    address: "",
    postcode: "",
    phone: "",
    email: "",
    subscribe: false,
  });

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const extrasList: string[] = [
    "Inside Oven",
    "Inside Fridge",
    "Windows (Internal)",
    "Balcony Cleaning",
    "Carpet Vacuum",
    "Limescale Removal",
    "Stairs Cleaning",
    "Hallway Cleaning",
    "Living Room Cleaning",
    "Garden Cleaning",
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

  const extraFees: Record<string, number> = {
    "Inside Oven": 15,
    "Inside Fridge": 10,
    "Windows (Internal)": 20,
    "Balcony Cleaning": 15,
    "Carpet Vacuum": 10,
    "Limescale Removal": 25,
    "Stairs Cleaning": 10,
    "Hallway Cleaning": 10,
    "Living Room Cleaning": 15,
    "Garden Cleaning": 30,
  };

  // ⭐ FIXED handleChange (no more checked error)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    setForm((prev) => ({
      ...prev,
      [name]:
        target.type === "checkbox"
          ? target.checked
          : name === "rooms" ||
            name === "kitchens" ||
            name === "bathrooms"
          ? Number(value)
          : value,
    }));
  };

  const handleExtras = (extra: string) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((x) => x !== extra)
        : [...prev.extras, extra],
    }));
  };

  const calculatePrice = () => {
    let base = 0;

    if (form.service) {
      base = serviceRates[form.service];
    }

    base += form.rooms * 5;
    base += form.kitchens * 10;
    base += form.bathrooms * 12;

    if (form.chemicals === "We Provide") base += 10;
    if (form.wasteRemoval === "Yes") base += 8;
    if (form.binBags === "We Provide") base += 5;
    if (form.vacuuming === "Yes") base += 5;
    if (form.drainage === "Yes") base += 15;

    form.extras.forEach((extra) => {
      base += extraFees[extra] || 0;
    });

    setTotalPrice(base);
  };

  useEffect(() => {
    calculatePrice();
  }, [form]);

  const generateWhatsAppMessage = () => {
    const message = `
📄 *Cleaning Quote Request*

👤 *Customer Name:* ${form.customerName}
🏢 *Business / Shop / Hotel / Airbnb:* ${form.businessName}
📍 *Address:* ${form.address}
🔢 *Postcode:* ${form.postcode}
📞 *Phone:* ${form.phone}
📧 *Email:* ${form.email}

🧹 *Service Type:* ${form.service}
🏠 *Property Type:* ${form.propertyType}

📍 *Rooms:* ${form.rooms}
🍽️ *Kitchens:* ${form.kitchens}
🚿 *Bathrooms:* ${form.bathrooms}

🧴 *Cleaning Chemicals:* ${form.chemicals}
🗑️ *Waste Bin Removal:* ${form.wasteRemoval}
🛍️ *Bin Bags Provided:* ${form.binBags}
🧹 *Vacuuming:* ${form.vacuuming}
🚰 *Drainage Cleaning:* ${form.drainage}

✨ *Extras:* ${form.extras.length > 0 ? form.extras.join(", ") : "None"}

📝 *Notes:* ${form.notes || "None"}

💷 *Estimated Total Price:* £${totalPrice}
💷 *Hourly Rate:* £${form.service ? serviceRates[form.service] : "N/A"}/hr

🎁 *Subscribed to Newsletter & Rewards:* ${form.subscribe ? "Yes" : "No"}

📌 *Client Location:* London
    `;

    return `https://wa.me/447735541705?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      className="relative bg-slate-50 min-h-screen px-6 py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/pricing-bg.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-700/40 to-slate-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-slate-300/20 rounded-full blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto bg-white/90 p-10 rounded-xl shadow-xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-slate-900 text-center"
        >
          Transparent Pricing & Instant Quote Calculator
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-3 text-sm text-slate-600 text-center max-w-2xl mx-auto"
        >
          Fill out the form below to instantly calculate your cleaning cost.
          All prices include travel within London.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-20 bg-white border rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Get a Custom Price Estimate
          </h2>

          <form className="mt-10 grid md:grid-cols-2 gap-6">
            {/* FORM FIELDS */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Customer Full Name
              </label>
              <input
                name="customerName"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Business / Shop / Hotel / Airbnb Name
              </label>
              <input
                name="businessName"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Address
              </label>
              <input
                name="address"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Postcode
              </label>
              <input
                name="postcode"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                name="phone"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                name="email"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 mt-4">
              <input type="checkbox" name="subscribe" onChange={handleChange} />
              <label className="text-sm font-semibold text-slate-700">
                Subscribe to newsletter, rewards & promo offers
              </label>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Service Type
              </label>
              <select
                name="service"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              >
                <option value="">Select Service</option>
                <option value="Domestic Cleaning">Domestic Cleaning</option>
                <option value="Airbnb Cleaning">Airbnb Cleaning</option>
                <option value="Office Cleaning">Office Cleaning</option>
                <option value="Hotel Cleaning">Hotel Cleaning</option>
                <option value="Commercial Cleaning">Commercial Cleaning</option>
                <option value="Deep Cleaning">Deep Cleaning</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Property Type
              </label>
              <select
                name="propertyType"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              >
                <option value="">Select Property Type</option>
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedroom</option>
                <option>3 Bedroom</option>
                <option>House</option>
                <option>Office</option>
                <option>Hotel Room</option>
                <option>Commercial Space</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Number of Rooms
              </label>
              <input
                name="rooms"
                type="number"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Number of Kitchens
              </label>
              <input
                name="kitchens"
                type="number"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Number of Bathrooms
              </label>
              <input
                name="bathrooms"
                type="number"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Cleaning Chemicals
              </label>
              <select
                name="chemicals"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              >
                <option value="">Select Option</option>
                <option>Client Provides</option>
                <option>We Provide</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Waste Bin Removal
              </label>
              <select
                name="wasteRemoval"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              >
                <option value="">Select Option</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Bin Bags Provided
              </label>
              <select
                name="binBags"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              >
                <option value="">Select Option</option>
                <option>Client Provides</option>
                <option>We Provide</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Vacuuming
              </label>
              <select
                name="vacuuming"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              >
                <option value="">Select Option</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Drainage Cleaning
              </label>
              <select
                name="drainage"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
              >
                <option value="">Select Option</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Extras
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                {extrasList.map((extra) => (
                  <label key={extra} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.extras.includes(extra)}
                      onChange={() => handleExtras(extra)}
                    />
                    {extra}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Additional Notes
              </label>
              <textarea
                name="notes"
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md"
                rows={4}
                placeholder="Any special instructions?"
              ></textarea>
            </div>
          </form>

          <div className="text-center mt-10">
            <h3 className="text-xl font-bold text-slate-900">
              Estimated Total Price
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              (Includes hourly rate + extras + property details)
            </p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              £{totalPrice}
            </p>

            {form.service && (
              <p className="text-sm text-slate-500 mt-2">
                Hourly Rate for {form.service}: £{serviceRates[form.service]}/hr
              </p>
            )}
          </div>

          <div className="text-center mt-10">
            <a
              href={generateWhatsAppMessage()}
              className="bg-slate-900 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-slate-800 shadow-md"
            >
              Send Quote to WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
