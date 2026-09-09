"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CleanerDashboard() {

  // 🔐 AUTH CHECK
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("cleaner-auth");
    if (loggedIn !== "true") {
      router.push("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return null; // Prevent flashing
  }

  // ⭐ GET CLEANER USERNAME
  const cleanerName = localStorage.getItem("cleaner-user");

  // ⭐ DASHBOARD LOGIC
  const [jobs, setJobs] = useState([
    {
      id: 1,
      customer: "Sarah M.",
      address: "12 Lewisham High Road, SE13",
      service: "Deep Cleaning",
      date: "2026-09-07",
      time: "10:00 AM",
      notes: "Focus on kitchen & bathroom",
      status: "Pending",
    },
  ]);

  const markComplete = (id: number) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "Completed" } : job
      )
    );
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 text-center mb-4">
        Welcome, {cleanerName}
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("cleaner-auth");
          localStorage.removeItem("cleaner-user");
          router.push("/login");
        }}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 mb-8"
      >
        Logout
      </button>

      {/* Dashboard UI */}
    </div>
  );
}
