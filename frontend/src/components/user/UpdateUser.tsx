import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Form } from 'react-bootstrap';
import './UpdateUser.css';
import Button from 'react-bootstrap/Button';        
import { useParams } from 'react-router-dom';

interface FormData {
  name: string;
  password: string;
}

interface RouteParams {
  id: string;
}

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [formdata, setFormData] = useState<FormData>({
    name: "",
    password: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${id}`);
        const data = await response.json();
        setFormData({
          name: data.name || "",
          password: ""
        });
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formdata);

    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User updated successfully:", data);
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Edit user</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUserName">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your user name"
            value={formdata.name || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="Enter your password"
            value={formdata.password || ""}
            onChange={handleInputChange}
          />
        </Form.Group>    

        <Button variant="primary" type="submit">
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
