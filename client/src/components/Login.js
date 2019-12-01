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
    props.loginUser({
      username: username,
      password: password
    });
    if (props.loginUser) {
      // alert(`username: ${username} password:${password}`);
      toggle();
      // props.toggleLogin();
    } else {
      alert("error");
    }
  };

  const handleInput = e => {
    let x = { ...e };
    if (x.target.name === "username") {
      setUsername(x.target.value);
    } else if (x.target.name === "password") {
      setPassword(x.target.value);
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
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
            <Button
              color="primary"
              // onClickCapture={props.toggleLogin}
              // onClick={toggle}
            >
              LOG IN
            </Button>{" "}
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
