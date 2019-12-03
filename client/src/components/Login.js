import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  FormFeedback
} from "reactstrap";

const LoginModal = props => {
  const { buttonLabel, className } = props;
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.loginUser(
      {
        username: username,
        password: password
      },
      success => {
        if (success) {
          // toggle();
        }
      }
    );
  };

  const handleInput = e => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <Button color="dark" onClick={toggle}>
        LOG IN
        {buttonLabel}
      </Button>
      <Modal
        style={{
          transform: "scale(0.9)"
        }}
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Login</ModalHeader>
          <ModalBody>
            {" "}
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={handleInput}
              />

              <FormFeedback></FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleInput}
              />

              <FormFeedback></FormFeedback>
            </FormGroup>
            <button className="btn btn-link">
              Haven't Signup? Stop dreamingg!!!
            </button>
          </ModalBody>
          <ModalFooter>
            <Button color="dark">LOG IN</Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;
