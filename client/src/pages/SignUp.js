import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Media,
  Form,
  FormGroup,
  Button,
  Input,
  FormFeedback
} from "reactstrap";
import { useHistory } from "react-router-dom";

const SignUp = props => {
  const { buttonLabel, className } = props;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameValid /*, setusernameValid*/] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formReady, setFormReady] = useState(false);
  const history = useHistory();

  const handleInput = e => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signUpUser(
      {
        name: name,
        username: username,
        password: password,
        email: email
      },
      success => {
        if (success) {
          alert("loggin success");
        }
      }
    );
  };

  return (
    <>
      <Container className="middle-screen dark body-pattern">
        <Row className="no-margin no-padding">
          <Col>
            <Card className="rounded-corner dark-form small-20px">
              <Row>
                <Col className="logo"></Col>
              </Row>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
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
                      placeholder="Username (min 6 characters)"
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
                      placeholder="Password (min 6 character)"
                      value={password}
                      onChange={handleInput}
                      {...(password.length >= 6
                        ? { valid: true }
                        : password.length > 0
                        ? { invalid: true }
                        : "")}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleInput}
                      {...(email.length === 0
                        ? ""
                        : validateEmail(email)
                        ? { valid: true }
                        : { invalid: true })}
                    />
                  </FormGroup>
                  <Button
                    disabled={
                      name && username && email && password ? false : true
                    }
                    className="dark-btn-full-width"
                    color="info"
                  >
                    {" "}
                    Create{" "}
                  </Button>
                </Form>
                <Button
                  onClick={() => history.push("/signin")}
                  color="link"
                  className="center"
                >
                  Have an account? Sign in here
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;

const validateEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@0"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\.))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
