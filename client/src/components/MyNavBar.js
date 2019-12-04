import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Col,
  Row,
  Button
} from "reactstrap";

const MyNavBar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("userToken");
    if (jwt) {
      setloggedIn(true);
    }
    return () => {
      setloggedIn();
    };
  }, [setloggedIn]);

  return (
    <div className="sticky shadow">
      <Navbar className="dark-navbar" dark expand="md">
        <NavbarBrand href="/">
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

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
};

NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
};
