"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Example cleaner accounts (default passwords)
  const cleaners = [
    { username: "cleaner1", password: "PrimeClean2026" },
    { username: "cleaner2", password: "PrimeClean2026" },
    { username: "supervisor", password: "PrimeCleanAdmin" },
  ];

  // If already logged in → redirect
  useEffect(() => {
    const loggedIn = localStorage.getItem("cleaner-auth");
    if (loggedIn === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = () => {
    // Check if cleaner has a reset password saved
    const savedPassword = localStorage.getItem(`cleaner-pass-${username}`);

    // Match default OR reset password
    const match = cleaners.find(
      (c) =>
        c.username === username &&
        (c.password === password || savedPassword === password)
    );

    if (match) {
      localStorage.setItem("cleaner-auth", "true");
      localStorage.setItem("cleaner-user", username);
      router.push("/dashboard");
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 mb-4 text-center">
          Cleaner Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border border-slate-300 rounded-md px-4 py-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-slate-300 rounded-md px-4 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-700"
        >
          Login
        </button>

        {/* ⭐ Reset Password Link */}
        <div className="text-center mt-4">
          <a href="/reset-password" className="text-slate-700 hover:underline">
            Reset Password
          </a>
        </div>
      </div>
    </div>
  );
}
