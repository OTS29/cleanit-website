"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ⭐ Correct Cleaner type
type Cleaner = {
  username: string;
  password: string;
  role: "cleaner" | "admin" | "customer";
};

export default function ManageCleaners() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  // ⭐ Correctly typed cleaners array
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"cleaner" | "admin" | "customer">("cleaner");

  // ⭐ Load cleaners from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin-auth");

    if (loggedIn !== "true") {
      router.push("/admin/login");
    } else {
      setAuthChecked(true);
    }

    const savedCleaners = JSON.parse(localStorage.getItem("cleaners") || "[]");

    // ⭐ FIX: Ensure saved cleaners have valid roles
    const sanitized = savedCleaners.map((c: any) => ({
      username: c.username || "",
      password: c.password || "",
      role:
        c.role === "admin" ||
        c.role === "cleaner" ||
        c.role === "customer"
          ? c.role
          : "cleaner",
    }));

    setCleaners(sanitized);
  }, [router]);

  if (!authChecked) return null;

  // ⭐ Add new cleaner
  const addCleaner = () => {
    if (!newUsername || !newPassword) return;

    const newCleaner: Cleaner = {
      username: newUsername,
      password: newPassword,
      role: newRole,
    };

    const updated = [...cleaners, newCleaner];
    setCleaners(updated);
    localStorage.setItem("cleaners", JSON.stringify(updated));

    setNewUsername("");
    setNewPassword("");
    setNewRole("cleaner");
  };

  // ⭐ Delete cleaner
  const deleteCleaner = (username: string) => {
    const updated = cleaners.filter((c) => c.username !== username);
    setCleaners(updated);
    localStorage.setItem("cleaners", JSON.stringify(updated));

    localStorage.removeItem(`cleaner-pass-${username}`);
  };

  // ⭐ Reset password
  const resetPassword = (username: string) => {
    const newPass = prompt(`Enter new password for ${username}`);
    if (!newPass) return;

    localStorage.setItem(`cleaner-pass-${username}`, newPass);
    alert(`Password for ${username} has been reset.`);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Cleaners</h1>

      {/* Add Cleaner */}
      <div className="bg-slate-100 p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Add New Cleaner</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border border-slate-300 rounded-md px-4 py-2 mb-4"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-slate-300 rounded-md px-4 py-2 mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Role Selector */}
        <select
          value={newRole}
          onChange={(e) =>
            setNewRole(e.target.value as "cleaner" | "admin" | "customer")
          }
          className="w-full border border-slate-300 rounded-md px-4 py-2 mb-4"
        >
          <option value="cleaner">Cleaner</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>

        <button
          onClick={addCleaner}
          className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700"
        >
          Add Cleaner
        </button>
      </div>

      {/* Cleaner List */}
      <div className="bg-slate-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">All Cleaners</h2>

        {cleaners.length === 0 && (
          <p className="text-slate-600">No cleaners added yet.</p>
        )}

        <div className="space-y-4">
          {cleaners.map((cleaner) => (
            <div
              key={cleaner.username}
              className="border border-slate-300 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{cleaner.username}</p>
                <p className="text-sm text-slate-600">Role: {cleaner.role}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => resetPassword(cleaner.username)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
                >
                  Reset Password
                </button>

                <button
                  onClick={() => deleteCleaner(cleaner.username)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
