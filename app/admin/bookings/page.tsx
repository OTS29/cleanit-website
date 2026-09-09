"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ⭐ Correct Booking type
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

export default function ManageBookings() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  // ⭐ Correctly typed bookings array
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin-auth");

    if (loggedIn !== "true") {
      router.push("/admin/login");
    } else {
      setAuthChecked(true);
    }

    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");

    // ⭐ Sanitize localStorage data
    const sanitized: Booking[] = saved.map((b: any) => ({
      id: Number(b.id) || Date.now(),
      name: b.name || "",
      email: b.email || "",
      phone: b.phone || "",
      address: b.address || "",
      service: b.service || "",
      date: b.date || "",
      time: b.time || "",
      notes: b.notes || "",
      status:
        b.status === "new" ||
        b.status === "contacted" ||
        b.status === "converted" ||
        b.status === "cancelled"
          ? b.status
          : "new",
    }));

    setBookings(sanitized);
  }, [router]);

  if (!authChecked) return null;

  // ⭐ Update booking status
  const updateStatus = (id: number, status: Booking["status"]) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  // ⭐ Delete booking
  const deleteBooking = (id: number) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        Manage Bookings
      </h1>

      {bookings.length === 0 && (
        <p className="text-center text-slate-600">
          No bookings yet.
        </p>
      )}

      <div className="space-y-4 max-w-3xl mx-auto">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="border border-slate-300 p-4 rounded-lg shadow"
          >
            <p><strong>Name:</strong> {b.name}</p>
            <p><strong>Email:</strong> {b.email}</p>
            <p><strong>Phone:</strong> {b.phone}</p>
            <p><strong>Address:</strong> {b.address}</p>
            <p><strong>Service:</strong> {b.service}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.time}</p>
            <p><strong>Notes:</strong> {b.notes || "None"}</p>
            <p><strong>Status:</strong> {b.status}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => updateStatus(b.id, "contacted")}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
              >
                Mark Contacted
              </button>

              <button
                onClick={() => updateStatus(b.id, "converted")}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
              >
                Convert to Job
              </button>

              <button
                onClick={() => updateStatus(b.id, "cancelled")}
                className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteBooking(b.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
