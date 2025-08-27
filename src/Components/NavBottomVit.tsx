import React from "react";
import { Nav } from "react-bootstrap";
import { IconVit } from "./IconVit";

const NavBottomVit = () => {
 
  return (
    <>
      <nav className="navbar fixed-bottom d-lg-none navbar-light bg-light">
        <div className="container-fluid justify-content-around">
          {/* <a className="navbar-brand" href="#">
            Фиксированный внизу
          </a> */}
          <Nav.Link href="/">
            <IconVit name="House" size={32} />
          </Nav.Link>
          <Nav.Link href="/products">
            <IconVit name="Inboxes" size={32} />
          </Nav.Link>
          <Nav.Link href="/Cabinet">
            <IconVit name="PersonCircle" size={32} />
          </Nav.Link>
          <Nav.Link href="/Stocktaking">
            <IconVit name="UpcScan" size={32} />
          </Nav.Link>
        </div>
      </nav>
    </>
  );
};

export default NavBottomVit;
