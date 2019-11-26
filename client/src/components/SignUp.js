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

const SignupModal = props => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const toggle = () => setModal(!modal);

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      `Submitting username: ${username}password:${password} email:${email}`
    );
    toggle();
  };
  const handleInput = e => {
    let x = { ...e };
    console.log(x.target.name);
    if (x.target.name === "username") {
      setUsername(x.target.value);
    } else if (x.target.name === "password") {
      setPassword(x.target.value);
    } else if (x.target.name ==="email"){
      setEmail(x.target.value);
    }

    // setUsername(e.target.value);
    // setPassword(e.target.value);
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        SignUp
        {buttonLabel}
      </Button>
      <Modal
        // style={{
        //   transform: "scale(0.8)",
        //   opacity: "0.8"
        // }}
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>SignUp</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder="Choose a username min 6 characters"
                value={username}
                onChange={handleInput}
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="min 6 character"
                value={password}
                onChange={handleInput}
              />

              <FormFeedback></FormFeedback>
            </FormGroup>

            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="example@domain.com"
              />
              <FormFeedback></FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Login</Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default SignupModal;
