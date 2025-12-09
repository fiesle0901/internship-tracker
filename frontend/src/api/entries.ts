const BASE_URL = import.meta.env.VITE_API_URL;

export async function getReportEntries(isGuest: boolean) {
  const url = isGuest ? `${BASE_URL}/entries/demo` : `${BASE_URL}/entries`;

  const res = await fetch(`${url}`, {
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
