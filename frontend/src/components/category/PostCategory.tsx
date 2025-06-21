import React, { useState, FormEvent } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/CategoryService.ts";

const PostCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError("No user ID found. Please login.");
      return;
    }

    try {
      await createCategory(name, parseInt(userId));
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/categories"), 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setSuccess(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Create Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Category
        </Button>
      </Form>
      {success && <Alert variant="success" className="mt-3">Category created successfully!</Alert>}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
};

export default PostCategory;
