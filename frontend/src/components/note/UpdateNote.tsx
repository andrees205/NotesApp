// File: src/components/note/UpdateNote.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";

const UpdateNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noteRes, catRes] = await Promise.all([
          fetch(`http://localhost:8080/api/notes/${id}`),
          fetch(`http://localhost:8080/api/categories/user/${userId}`),
        ]);

        if (!noteRes.ok || !catRes.ok) throw new Error("Fetch failed");

        const noteData = await noteRes.json();
        const catData = await catRes.json();

        setTitle(noteData.title);
        setContent(noteData.content);
        setCategoryId(noteData.categoryId);
        setCategories(catData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, categoryId, userId: Number(userId) }),
      });
      if (!res.ok) throw new Error("Update failed");
      setSuccess(true);
      setTimeout(() => navigate("/notes"), 1000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Update Note</h2>
      {success && <Alert variant="success">Note updated successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value={0}>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          Update Note
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateNote;
