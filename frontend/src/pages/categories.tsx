import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCategoriesByUser } from "../services/CategoryService.ts";
interface Category {
  id: number;
  name: string;
}

const CategoriesScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!userId) throw new Error("User ID not found");
        const data = await getCategoriesByUser(userId);
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [userId]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Categories</h2>
      <Button variant="primary" onClick={() => navigate("/categories/create")}>Create Category</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CategoriesScreen;
