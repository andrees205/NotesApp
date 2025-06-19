import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
  
interface User {
  id: number;
  name: string;
  password: string;
}

const UsersScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error deleting user:", error.message);
    }
  };

    const handleSubmit = (userId: number) => {
    navigate(`/postuser`);
  };

  const handleUpdate = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">User Dashboard</h1>
          <Button variant="primary" onClick={() => navigate("/postuser")}>Create User</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleUpdate(user.id)}
                    >
                      Update
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(user.id)}
                      className="ml-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersScreen;
