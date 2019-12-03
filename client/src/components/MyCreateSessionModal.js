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
      <Button color="primary" onClick={toggle}>{buttonLabel}New Session</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>New Session</ModalHeader>
        <ModalBody>
            <MyCreateSession></MyCreateSession>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default MyCreateSessionModal;