import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  password: string;
} 

const PostUser: React.FC = () => {
  const [formdata, setFormData] = useState<FormData>({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formdata);

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();
      console.log("User created successfully:", data);
      navigate("/user");
    } catch (error: any) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Create user</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUserName">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your user name"
            value={formdata.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PostUser;