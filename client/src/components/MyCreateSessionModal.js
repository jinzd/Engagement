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
       <Button style={{'paddingRight':20, 'paddingLeft':20}} className='rounded-corner' color="info" onClick={toggle}>{buttonLabel}New Session</Button>
      </Col>
      </Row>
      <Modal backdropClassName='dark-form no-border no-padding' contentClassName="dark-form no-border no-padding" isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader className='dark-form' toggle={toggle}>Create New Session</ModalHeader>
        <ModalBody className='dark-form'>
            <MyCreateSession></MyCreateSession>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default MyCreateSessionModal;