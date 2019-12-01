import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  Button,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import SignupModal from "./SignUp";
import LoginModal from "./Login";

const MyNavBar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">ENGAGE+</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto " navbar>
            <NavItem>
              <NavLink href="/chart">Chart</NavLink>
            </NavItem>

            <UncontrolledDropdown direction="down" nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {props.loggedIn ? (
              <Button color="primary" onClick={props.logoutUser}>
                LOG OUT
              </Button>
            ) : (
              <NavItem className={"d-flex flex-column"}>
                <LoginModal
                  loginUser={props.loginUser}
                  toggleLogin={props.toggleLogin}
                />
                <SignupModal
                  signUpUser={props.signUpUser}
                  toggleLogin={props.toggleLogin}
                />
              </NavItem>
            )}
            {/* <NavItem className={"d-flex flex-column"}>
              <LoginModal toggleLogin={props.toggleLogin} />
              <SignupModal
                signUpUser={props.signUpUser}
                toggleLogin={props.toggleLogin}
              />
            </NavItem> */}
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
