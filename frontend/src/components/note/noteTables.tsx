// File: src/components/note/NoteTable.tsx
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Note {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const NoteTables: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/notes");
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data: Note[] = await response.json();
        const filtered = data.filter((note) => note.userId.toString() === userId);
        setNotes(filtered);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [userId]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Notes</h2>
        <Button variant="primary" onClick={() => navigate("/note/create")}>Create Note</Button>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => (
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NoteTables;
