"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  // ⭐ Typed boolean state
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin-auth");

    if (loggedIn !== "true") {
      router.push("/admin/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        PrimeCleanUK Admin Panel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/cleaners"
          className="p-6 bg-slate-100 rounded-lg shadow hover:bg-slate-200"
        >
          Manage Cleaners
        </a>

        <a
          href="/admin/jobs"
          className="p-6 bg-slate-100 rounded-lg shadow hover:bg-slate-200"
        >
          Manage Jobs
        </a>

        <a
          href="/admin/bookings"
          className="p-6 bg-slate-100 rounded-lg shadow hover:bg-slate-200"
        >
          Manage Bookings
        </a>

        <a
          href="/admin/performance"
          className="p-6 bg-slate-100 rounded-lg shadow hover:bg-slate-200"
        >
          Cleaner Performance
        </a>

        <button
          onClick={() => {
            localStorage.removeItem("admin-auth");
            router.push("/admin/login");
          }}
          className="p-6 bg-red-600 text-white rounded-lg shadow hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
