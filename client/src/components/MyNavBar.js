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
  // UncontrolledDropdown,
  // DropdownToggle,
  Button
  // ,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";
import SignupModal from "./SignUp";
import LoginModal from "./Login";

const MyNavBar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setloggedIn] = useState(false)
  const toggle = () => {

    setIsOpen(!isOpen)
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
    <div className='sticky shadow'>
      <Navbar className="dark-navbar" dark expand="md">
        <NavbarBrand href="/">
          <div className="logo"></div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className='align-center' isOpen={isOpen} navbar>
          <Nav navbar>
            {loggedIn && (
              <>
                {/* <NavItem  style={{'color':'white'}}>
                  <NavLink href="/users">UserProfile</NavLink>
                </NavItem> */}
                {/* <NavItem>
                  <NavLink style={{'color':'white'}} href="/dashboard">Dashboard</NavLink>
                </NavItem> */}

              </>
            )}

            {/* <UncontrolledDropdown direction="down" nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            {loggedIn ? (
              <NavItem>
                <NavLink style={{'color':'white'}} onClick={props.logoutUser}>Log out</NavLink>
              </NavItem>
              // <Row>
              //   <Col className='align-right'>
              //   <Button color="link" onClick={props.logoutUser}>
              //   LOG OUT
              //   </Button>
              //   </Col>
              // </Row>
            ) : (
              <NavItem className={"d-flex flex-column"}>
                <LoginModal
                  actToggle={props.actToggle}
                  loginUser={props.loginUser}
                  toggleLogin={props.toggleLogin}
                />
                <SignupModal
                  signUpUser={props.signUpUser}
                  toggleLogin={props.toggleLogin}
                />
              </NavItem>
            )}
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
