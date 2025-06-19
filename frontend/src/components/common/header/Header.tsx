import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <strong>Bienvenido {localStorage.getItem("userName")}</strong>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/notes" className="nav-link">Notes</Nav.Link>
          <Nav.Link as={Link} to="/user" className="nav-link">Users</Nav.Link>
          <Nav.Link as={Link} to="/categories" className="nav-link">Categories</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
