"use client";

import Image from "next/image";

export default function GalleryPage() {
  const images = [
    "/gallery2.png",
    "/gallery1.jpg",
    "/gallery7.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
    "/gallery3.jpg",
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 text-center mb-6">
        PrimeCleanUK Gallery
      </h1>

      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        See real before & after results from our professional cleaning services
        across London. Every image is from genuine PrimeCleanUK jobs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
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
