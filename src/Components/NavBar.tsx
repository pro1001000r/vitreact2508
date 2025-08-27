import React from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import Logo from "../Template/images/LogoPikclick512.png";

const NavBar: React.FC = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>
          <Nav.Link href="/" className="ms-2">
          <Image src={Logo} alt="Logo" width="50" rounded />
            PikClick.ru
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse-id" />
        <Navbar.Collapse id="navbar-collapse-id">
          <Nav className="me-auto">
            <Nav.Link href="/products">Каталог</Nav.Link>
            <Nav.Link href="/about">О нас</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
export default NavBar;
