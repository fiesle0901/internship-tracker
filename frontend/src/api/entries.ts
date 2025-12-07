const BASE_URL = "http://localhost:5002/api";

export async function getReportEntries() {
  const res = await fetch(`${BASE_URL}/entries`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to get report entries");
  }

  return data;
}

export async function addEntry(entry: any) {
  const res = await fetch(`${BASE_URL}/entries`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add report entry");
  }

  return data;
}

export async function deleteEntry(id: number) {
  const res = await fetch(`${BASE_URL}/entries/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete entry");
  }
}
