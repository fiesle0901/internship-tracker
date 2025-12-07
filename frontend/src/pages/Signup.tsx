import { useState } from "react";
import { registeruser } from "../api/auth";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      await registeruser(form);

      setSuccess("Account created! Redirecting to login...");
      setIsLoading(false);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[faf8f3] flex items-center justify-center">
      <div className="bg-white p-6 rounded-sm min-w-md border-2 border-gray-200 shadow-lg">
        <div className="space-y-3 mb-8">
          <div className="text-4xl font-mono font-bold text-primary">🧱</div>
          <p className="font-mono text-2xl">CREATE ACCOUNT.</p>
          <p className="font-mono text-sm -mt-1 text-gray-400">
            Sign up to start tracking your internship
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 rounded text-red-700 text-sm mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-100 border border-green-400 rounded text-green-700 text-sm mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase">Email</label>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full border-2 p-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase">Password</label>
              <input
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(p) =>
                  setForm((prev) => ({ ...prev, password: p.target.value }))
                }
                className="w-full border-2 p-2"
              />
            </div>
          </div>

          <button
            className="w-full bg-[#540000] h-10 mt-8 font-bold rounded-sm text-white text-sm hover:bg-[#540000]/90 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "CREATING ACCOUNT..." : "SIGN UP"}
          </button>
        </form>

        <div className="text-right mt-4 py-4">
          <a
            href="/login"
            className="text-sm text-cyan-600 hover:text-amber-600"
          >
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
}
