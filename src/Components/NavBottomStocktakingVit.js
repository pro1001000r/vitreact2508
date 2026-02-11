import React from "react";
import { Nav } from "react-bootstrap";
import { IconVit } from "./IconVit";

const NavBottomStocktakingVit = ({ setShow }) => {
  const handleScan = () => {
    setShow(true);
  };
  return (
    <>
      <nav className="navbar fixed-bottom d-lg-none navbar-light bg-light">
        <div className="container-fluid justify-content-around">
          {/* <a className="navbar-brand" href="#">
            Фиксированный внизу
          </a> */}
          {/* <Nav.Link href="/">
            <IconVit name="House" size={32} />
          </Nav.Link> */}
          <div onClick={handleScan}>
            <IconVit name="UpcScan" size={32} />
          </div>
          <Nav.Link href="/Products">
            <IconVit name="Inboxes" size={32} />
          </Nav.Link>
          <Nav.Link href="/Cabinet">
            <IconVit name="PersonCircle" size={32} />
          </Nav.Link>
          <div onClick={handleScan}>
            <IconVit name="UpcScan" size={32} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBottomStocktakingVit;
