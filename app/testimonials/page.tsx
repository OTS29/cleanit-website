"use client";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "Lewisham, London",
      rating: 5,
      text: "PrimeCleanUK did an amazing job with my end of tenancy cleaning. The flat looked brand new and I got my full deposit back.",
    },
    {
      name: "James T.",
      location: "Greenwich",
      rating: 5,
      text: "Very professional cleaners. They arrived on time, worked fast, and left my home spotless. Highly recommended!",
    },
    {
      name: "Aisha K.",
      location: "Catford",
      rating: 4,
      text: "Great service! The deep cleaning was thorough and the team was friendly. Will definitely book again.",
    },
    {
      name: "Daniel R.",
      location: "Bromley",
      rating: 5,
      text: "Booked Airbnb cleaning for my property. Guests always compliment how clean the place is. Reliable and consistent.",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 text-center mb-4">
        Customer Testimonials
      </h1>

      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        Real reviews from customers across London who trust PrimeCleanUK for
        professional cleaning services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center mb-3">
              <div className="text-yellow-500 text-lg">
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </div>
            </div>

            <p className="text-slate-700 mb-4">“{t.text}”</p>

            <p className="text-sm font-semibold text-slate-900">
              {t.name} — <span className="text-slate-600">{t.location}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://wa.me/+447735541705"
          className="inline-block bg-slate-900 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-slate-700 shadow-md"
        >
          Book on WhatsApp
        </a>
      </div>
    </div>
  );
}
