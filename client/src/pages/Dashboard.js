import React from "react";
import "../App.css";
import { Container, Row, Col } from "reactstrap";
import MySessionHistory from "../components/MySessionHistory";
import MyCreateSessionModal from "../components/MyCreateSessionModal";
import MyNavBar from "../components/MyNavBar";

const Dashboard = props => {
  return (
    <>
      <div style={{ paddingBottom: 45 }}>
        <MyNavBar logoutUser={props.logoutUser} />
      </div>
      <Container className="dark padding-40px" style={{ paddingTop: 40 }}>
        <Row>
          <Col>
            <Row>
              <Col></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="no-border">
            <MyCreateSessionModal></MyCreateSessionModal>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div>
              <MySessionHistory></MySessionHistory>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
