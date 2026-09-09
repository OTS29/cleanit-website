export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 text-center mb-4">
        About PrimeCleanUK
      </h1>

      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        PrimeCleanUK is a professional cleaning company based in London,
        delivering high‑quality cleaning services with reliability, honesty,
        and exceptional attention to detail. We proudly serve homes, landlords,
        Airbnb hosts, and businesses across London.
      </p>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Our Mission
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Our mission is simple: to provide London residents with a cleaning
          service they can trust. We believe a clean home creates peace of mind,
          comfort, and a healthier environment. Every member of our team is
          trained to deliver exceptional results with professionalism and care.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Why Choose PrimeCleanUK?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">
              ✔ Professional & Experienced
            </h3>
            <p className="text-slate-700">
              Our cleaners are trained, DBS‑checked, and committed to delivering
              outstanding results every time.
            </p>
          </div>

          <div className="border border-slate-200 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">
              ✔ Fully Insured
            </h3>
            <p className="text-slate-700">
              We provide full insurance coverage for your peace of mind.
            </p>
          </div>

          <div className="border border-slate-200 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">
              ✔ 100% Satisfaction Guarantee
            </h3>
            <p className="text-slate-700">
              If you're not happy, we’ll return and make it right — no questions
              asked.
            </p>
          </div>

          <div className="border border-slate-200 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">
              ✔ London‑Wide Coverage
            </h3>
            <p className="text-slate-700">
              We proudly serve Lewisham, Greenwich, Catford, Bromley, and
              surrounding areas.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Our Story
        </h2>
        <p className="text-slate-700 leading-relaxed">
          PrimeCleanUK was founded with a simple goal: to raise the standard of
          cleaning services in London. We noticed that many companies lacked
          consistency, transparency, and genuine care for customers. So we built
          a service that focuses on quality, trust, and customer satisfaction.
        </p>
      </section>

      {/* CTA */}
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
