import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/UserService.ts";

interface FormData {
  name: string;
  password: string;
}

const PostUser: React.FC = () => {
  const [formdata, setFormData] = useState<FormData>({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(formdata);
      navigate("/user");
    } catch (error: any) {
      setError(error.message || "Error creating user");
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
        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </div>
  );
};

export default PostUser;
