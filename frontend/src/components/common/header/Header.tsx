import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Header.css";
import { RoutesEnum } from '../../../constants/routes.ts';
import { getUserName } from '../../../services/StorageService.ts';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <strong>Bienvenido {getUserName()}</strong>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to={RoutesEnum.noteTables}>Notes</Nav.Link>
          <Nav.Link as={Link} to={RoutesEnum.Users}>Users</Nav.Link>
          <Nav.Link as={Link} to={RoutesEnum.CategoriesScreen}>Categories</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
