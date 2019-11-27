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
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameValid, setusernameValid] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const toggle = () => setModal(!modal);

  const handleInput = e => {
    let x = { ...e };
    console.log(x.target.name);
    if (x.target.name === "name") {
      let delay = setTimeout(() => handleUsernameCheck(x), 300);
      setName(x.target.value, delay);
    } else if (x.target.name === "username") {
      setUsername(x.target.value);
    } else if (x.target.name === "password") {
      setPassword(x.target.value);
    } else if (x.target.name ==="email"){
      setEmail(x.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      `Submitting name: ${name} username: ${username} password:${password} email:${email}`
    );
    toggle();
    props.toggleLogin();
  };

  const handleUsernameCheck = () => {
    //need to prevent duplicate before submit to db
    return null;
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
                name="name"
                placeholder="enter your name"
                value={name}
                onChange={handleInput}
                {...(name.length >= 6
                  ? usernameValid
                    ? { valid: true }
                    : { invalid: true }
                  : name.length > 0
                  ? { invalid: true }
                  : "")}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder="Choose a username min 6 characters"
                value={username}
                onChange={e => {
                  handleInput(e);
                }}
                {...(username.length >= 6
                  ? usernameValid
                    ? { valid: true }
                    : { invalid: true }
                  : username.length > 0
                  ? { invalid: true }
                  : "")}
              />
              <FormFeedback
                {...(username.length > 0 && username.length >= 6
                  ? usernameValid
                    ? { valid: true }
                    : { invalid: "true" }
                  : { invalid: "true" })}
              >
                {username.length >= 6
                  ? usernameValid
                    ? "Sweet, this username is available!"
                    : "Sorry, this username is taken!"
                  : "Must be minimum 6 characters"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="min 6 character"
                value={password}
                onChange={handleInput}
                {...(password.length >= 6
                  ? { valid: true }
                  : password.length > 0
                  ? { invalid: true }
                  : "")}
              />

              <FormFeedback></FormFeedback>
            </FormGroup>

            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="example@domain.com"
                value={email}
                onChange={handleInput}
                {...(validateEmail(email)
                  ? { valid: true }
                  : { invalid: true })}
              />
              <FormFeedback></FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Login</Button>
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

const validateEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@0"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\.))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
