const API_URL = "http://localhost:8080/api/notes";

export const getNotesByUser = async (userId: string | null) => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch notes");
  const data = await response.json();
  return data.filter((note: any) => note.userId.toString() === userId);
};

export const createNote = async (note: object) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!response.ok) throw new Error("Error creating note");
};

export const deleteNote = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
};

export const updateNote = async (id: number, note: object) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Update failed");
};

export const getNoteById = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Note not found");
  return res.json();
};

