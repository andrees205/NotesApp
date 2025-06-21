import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";
import { getCategoriesByUser } from "../../services/CategoryService.ts";
import { getNoteById, updateNote } from "../../services/NoteService.ts";
import { getUserId } from "../../services/StorageService.ts";

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

  const userId = getUserId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id || !userId) throw new Error("Missing note ID or user ID");
        const [noteData, catData] = await Promise.all([
          getNoteById(Number(id)),
          getCategoriesByUser(userId)
        ]);

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
      if (!id || !userId) throw new Error("Missing note ID or user ID");
      await updateNote(Number(id), { title, content, categoryId, userId: Number(userId) });
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
        <Button type="submit" variant="primary">Update Note</Button>
      </Form>
    </Container>
  );
};

export default UpdateNote;