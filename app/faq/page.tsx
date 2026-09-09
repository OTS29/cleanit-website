export default function FAQPage() {
  const faqs = [
    {
      q: "Do you bring your own cleaning supplies?",
      a: "Yes. Our cleaners arrive fully equipped with professional cleaning products and tools. You don't need to provide anything.",
    },
    {
      q: "Are your cleaners insured and DBS‑checked?",
      a: "Absolutely. All PrimeCleanUK cleaners are DBS‑checked and fully insured for your peace of mind.",
    },
    {
      q: "Do I need to be home during the cleaning?",
      a: "No. As long as we can access the property, you do not need to be present. Many customers prefer to return once the cleaning is complete.",
    },
    {
      q: "How do I pay for the service?",
      a: "We accept bank transfer, card payment, and cash. Payment details will be provided after booking.",
    },
    {
      q: "Do you offer Airbnb cleaning?",
      a: "Yes. We provide full Airbnb turnaround cleaning including linen change, restocking essentials, and staging the property.",
    },
    {
      q: "Do you offer end‑of‑tenancy cleaning?",
      a: "Yes. Our end‑of‑tenancy cleaning is designed to meet landlord and agency standards, helping you secure your full deposit.",
    },
    {
      q: "Can I book on WhatsApp?",
      a: "Yes. WhatsApp is the fastest way to book. You can send photos, ask questions, and get instant replies.",
    },
    {
      q: "Which areas do you cover?",
      a: "We cover Lewisham, Catford, Greenwich, Bromley, Deptford, Blackheath, and surrounding London areas.",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 text-center mb-4">
        Frequently Asked Questions
      </h1>

      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        Everything you need to know about PrimeCleanUK’s professional cleaning
        services across London.
      </p>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {item.q}
            </h3>
            <p className="text-slate-700">{item.a}</p>
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
