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

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <Button color="primary" onClick={toggle}>
        Login
        {buttonLabel}
      </Button>
      <Modal
        style={{
          transform: "scale(0.8)",
          opacity: "0.8"
        }}
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {" "}
          <Form>
            <FormGroup>
              <Input type="text" name="username" placeholder="username" />

              <FormFeedback></FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" placeholder="password" />

              <FormFeedback></FormFeedback>
            </FormGroup>

            <button className="btn btn-link">
              Haven't Signup? Stop dreamingg!!!
            </button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Login
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LoginModal;
