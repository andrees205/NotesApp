import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Spinner, Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getNotesByUser, deleteNote } from "../../services/NoteService.ts";
import { getCategoriesByUser } from "../../services/CategoryService.ts";
import { getUserId } from "../../services/StorageService.ts";

interface Note {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
}

const NoteTables: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [notesData, categoriesData] = await Promise.all([
          getNotesByUser(userId),
          getCategoriesByUser(userId)
        ]);
        setNotes(notesData);
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      alert("Failed to delete note");
    }
  };

  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.categoryId === selectedCategory)
    : notes;

  return (
    <Container className="mt-5">
      {loading && <Spinner animation="border" className="d-block mx-auto mt-5" />}
      {error && <Alert variant="danger" className="mt-4 text-center">{error}</Alert>}

      {!loading && !error && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">My Notes</h2>
            <Button variant="primary" onClick={() => navigate("/note/create")}>Create Note</Button>
          </div>

          <Form.Group controlId="categoryFilter" className="mb-4">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : "")}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredNotes.map((note) => (
              <Col key={note.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>{note.content}</Card.Text>
                    <Card.Text>
                      <small className="text-muted">
                        Category ID: {note.categoryId} <br />
                        Created: {new Date(note.createdAt).toLocaleString()} <br />
                        Updated: {new Date(note.updatedAt).toLocaleString()}
                      </small>
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="warning" size="sm" onClick={() => navigate(`/note/update/${note.id}`)}>Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(note.id)}>Delete</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default NoteTables;
