const API_URL = "http://localhost:8080/api/notes";

export const getCategoriesByUser = async (userId: string | null) => {
  if (!userId) throw new Error("User ID is missing");

  const response = await fetch(`${API_URL}/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const getAllCategories = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch all categories");
  }

  return response.json();
};

export const createCategory = async (name: string, userId: number) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
};

export const updateCategory = async (id: number, name: string, userId: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
};
