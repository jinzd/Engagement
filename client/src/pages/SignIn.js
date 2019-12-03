import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import {Container, Row, Col, Card, CardBody, Media, Form, FormGroup, Button, Input,} from 'reactstrap'

const SignIn = props => {
  const { buttonLabel, className } = props;
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

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
          // props.setloggedIn(true);
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
  return(
    <>
    <Container className='middle-screen dark body-pattern'>
      <Row className='no-margin no-padding'>
        <Col>
          <Card className='rounded-corner dark-form small-20px'>
          <Row>
            <Col className='logo'>
            </Col>
          </Row>
            <CardBody>
              <Form onSubmit={handleSubmit}>
              {/* <ModalHeader toggle={toggle}>Login</ModalHeader> */}
              {/* <ModalBody> */}
                {/* {" "} */}
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleInput}
                  />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleInput}
                    />
                </FormGroup>
                <Button className='dark-btn-full-width center' color='info'>
                  Login
                </Button>
                <Button onClick={()=>history.push('/signup')} color='link' className="center">
                  
                  No account? Sign up here
                </Button>
              {/* </ModalBody> */}
            </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default SignIn