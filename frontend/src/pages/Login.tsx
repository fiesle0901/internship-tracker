import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      await loginUser(credentials);

      window.location.href = "/homepage";
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-[faf8f3] flex items-center justify-center ">
      <div className="bg-white p-6 rounded-sm min-w-md  border-2 border-gray-200 shadow-lg">
        <div className="space-y-3 mb-8">
          <div className="text-4xl font-mono font-bold text-primary ">🧱</div>
          <p className="font-mono text-2xl">INTERNSHIP TRACKER.</p>
          <p className="font-mono text-sm -mt-1  text-gray-400">
            Enter your credentials to continue
          </p>
        </div>
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 rounded text-red-700 text-sm my-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className=" text-xs font-bold uppercase">Email</label>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={credentials.email}
                onChange={(a) =>
                  setCredentials((prev) => ({ ...prev, email: a.target.value }))
                }
                className="w-full border-2 p-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className=" text-xs font-bold uppercase">Password</label>
              <input
                type="password"
                placeholder="********"
                value={credentials.password}
                onChange={(p) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: p.target.value,
                  }))
                }
                className="w-full border-2 p-2"
              />
            </div>
          </div>

          <button
            className="w-full bg-[#540000] h-10 mt-8 font-bold rounded-sm  text-white text-sm hover:bg-[#540000]/90 mb-6 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "LOGGING IN" : "LOG IN"}
          </button>
        </form>
        <div className="flex flex-col gap-2 py-4">
          <a
            onClick={(e) => {
              e.preventDefault();

              loginAsGuest();
              navigate("/homepage");
            }}
            className="text-right text-sm text-cyan-600 cursor-pointer hover:text-amber-600"
          >
            View as guest.
          </a>
          <a
            href="/signup"
            className="text-right text-sm text-emerald-600 cursor-pointer hover:text-amber-600"
          >
            No account? Sign up.
          </a>
        </div>
      </div>
    </div>
  );
}
