const BASE_URL = "http://localhost:5000";

export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to login");
  }

  return res.json();
}
