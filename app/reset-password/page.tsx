"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    if (!username || !newPassword) {
      setMessage("Please enter username and new password");
      return;
    }

    // Save new password for this cleaner
    localStorage.setItem(`cleaner-pass-${username}`, newPassword);

    setMessage("Password reset successfully!");

    // Redirect back to login after 1.5 seconds
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 mb-4 text-center">
          Reset Password
        </h1>

        <input
          type="text"
          placeholder="Enter username"
          className="w-full border border-slate-300 rounded-md px-4 py-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="New password"
          className="w-full border border-slate-300 rounded-md px-4 py-2 mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {message && (
          <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
        )}

        <button
          onClick={handleReset}
          className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-700"
        >
          Reset Password
        </button>

        <div className="text-center mt-4">
          <a href="/login" className="text-slate-700 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
