import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCategoriesByUser } from "../../services/CategoryService.ts";
import { createNote } from "../../services/NoteService.ts";
import { getUserId } from "../../services/StorageService.ts";

const PostNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = getUserId();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!userId) throw new Error("User ID not found");
        const data = await getCategoriesByUser(userId);
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return setError("No user in session");
    try {
      await createNote({ title, content, categoryId, userId: Number(userId) });
      setSuccess(true);
      setTitle("");
      setContent("");
      setCategoryId(0);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Create Note</h2>
      {success && <Alert variant="success">Note created successfully!</Alert>}
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
        <Button type="submit" variant="primary">Create Note</Button>
      </Form>
    </Container>
  );
};

export default PostNote;
