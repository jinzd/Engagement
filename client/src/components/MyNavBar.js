import React, { useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

const MyNavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky shadow">
      <Navbar className="dark-navbar" dark expand="md">
        <NavbarBrand href="/dashboard">
          <div className="logo"></div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className="align-center" isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <button
                className="btn btn-outline-dark rounder-corner"
                onClick={props.logoutUser}
              >
                Log out
              </button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavBar;
