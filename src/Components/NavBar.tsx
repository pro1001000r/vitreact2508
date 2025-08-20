import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const NavBar: React.FC = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>
          <Nav.Link href="/" className="ms-2">
            PikClick.ru
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse-id" />
        <Navbar.Collapse id="navbar-collapse-id">
          <Nav className="me-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            <Nav.Link href="/about">О нас</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
export default NavBar;
