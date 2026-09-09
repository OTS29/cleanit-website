"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ⭐ Types
type BookingStatus = "new" | "contacted" | "converted" | "cancelled";

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
  status: BookingStatus;
};

type Cleaner = {
  username: string;
  password: string;
  role: "cleaner" | "admin" | "customer";
};

type Job = {
  id: number;
  customer: string;
  cleaner: string;
  date: string;
  time: string;
  status: "pending" | "in-progress" | "completed";
};

export default function AdminAnalytics() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin-auth");

    if (loggedIn !== "true") {
      router.push("/admin/login");
    } else {
      setAuthChecked(true);
    }

    // ⭐ Load bookings
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const sanitizedBookings: Booking[] = savedBookings.map((b: any) => ({
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
    setBookings(sanitizedBookings);

    // ⭐ Load cleaners
    const savedCleaners = JSON.parse(localStorage.getItem("cleaners") || "[]");
    const sanitizedCleaners: Cleaner[] = savedCleaners.map((c: any) => ({
      username: c.username || "",
      password: c.password || "",
      role:
        c.role === "cleaner" ||
        c.role === "admin" ||
        c.role === "customer"
          ? c.role
          : "cleaner",
    }));
    setCleaners(sanitizedCleaners);

    // ⭐ Load jobs
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const sanitizedJobs: Job[] = savedJobs.map((j: any) => ({
      id: Number(j.id) || Date.now(),
      customer: j.customer || "",
      cleaner: j.cleaner || "",
      date: j.date || "",
      time: j.time || "",
      status:
        j.status === "pending" ||
        j.status === "in-progress" ||
        j.status === "completed"
          ? j.status
          : "pending",
    }));
    setJobs(sanitizedJobs);
  }, [router]);

  if (!authChecked) return null;

  // ⭐ Analytics calculations
  const totalBookings = bookings.length;
  const totalCleaners = cleaners.length;
  const totalJobs = jobs.length;

  const contacted = bookings.filter((b) => b.status === "contacted").length;
  const converted = bookings.filter((b) => b.status === "converted").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const newBookings = bookings.filter((b) => b.status === "new").length;

  const conversionRate =
    totalBookings > 0 ? Math.round((converted / totalBookings) * 100) : 0;

  const estimatedRevenue = converted * 50; // simple estimate

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Admin Analytics Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-6 bg-slate-100 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold">Total Bookings</h2>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {totalBookings}
          </p>
        </div>

        <div className="p-6 bg-slate-100 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold">Total Cleaners</h2>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {totalCleaners}
          </p>
        </div>

        <div className="p-6 bg-slate-100 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold">Total Jobs</h2>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {totalJobs}
          </p>
        </div>
      </div>

      {/* STATUS BREAKDOWN */}
      <div className="max-w-5xl mx-auto mt-12 bg-slate-100 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Booking Status Breakdown</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-sm text-slate-600">New</p>
            <p className="text-2xl font-bold">{newBookings}</p>
          </div>

          <div>
            <p className="text-sm text-slate-600">Contacted</p>
            <p className="text-2xl font-bold">{contacted}</p>
          </div>

          <div>
            <p className="text-sm text-slate-600">Converted</p>
            <p className="text-2xl font-bold">{converted}</p>
          </div>

          <div>
            <p className="text-sm text-slate-600">Cancelled</p>
            <p className="text-2xl font-bold">{cancelled}</p>
          </div>
        </div>
      </div>

      {/* CONVERSION RATE */}
      <div className="max-w-5xl mx-auto mt-12 bg-slate-100 p-8 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Conversion Rate</h2>
        <p className="text-5xl font-bold text-green-600">{conversionRate}%</p>
      </div>

      {/* REVENUE ESTIMATE */}
      <div className="max-w-5xl mx-auto mt-12 bg-slate-100 p-8 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Estimated Revenue</h2>
        <p className="text-5xl font-bold text-slate-900">£{estimatedRevenue}</p>
      </div>
    </div>
  );
}
