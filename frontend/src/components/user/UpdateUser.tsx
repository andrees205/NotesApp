import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../services/UserService";

interface FormData {
  name: string;
  password: string;
}

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
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

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const user = await getUserById(id);
        setFormData({ name: user.name || "", password: "" });
      } catch (error: any) {
        setError(error.message || "Failed to fetch user");
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!id) throw new Error("User ID is missing");
      await updateUser(id, formdata);
      navigate("/user");
    } catch (error: any) {
      setError(error.message || "Error updating user");
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
          Update User
        </Button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </div>
  );
};

export default UpdateUser;
