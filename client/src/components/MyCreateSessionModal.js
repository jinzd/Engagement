import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Col, Row} from 'reactstrap';
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
      <Row>
      <Col className='align-right'>
       <Button style={{'paddingRight':20, 'paddingLeft':20}} className='rounded-corner-50' color="primary" onClick={toggle}>{buttonLabel}New Session</Button>
      </Col>
      </Row>
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