import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import MyCreateSession from '../components/MyCreateSession';

const MyCreateSessionModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}Create a session</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create a new session</ModalHeader>
        <ModalBody>
            <MyCreateSession></MyCreateSession>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default MyCreateSessionModal;