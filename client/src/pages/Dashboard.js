import React, { useState } from "react";
import "../App.css";
import { Container, Row, Col } from "reactstrap";
import MySessionHistory from "../components/MySessionHistory";
import MyCreateSessionModal from "../components/MyCreateSessionModal";
import MyNavBar from "../components/MyNavBar"

const Dashboard = props => {
  const [sessionID, setSessionID] = useState(-1);
  return (
    <>
    <div style={{paddingBottom:45}}>
    <MyNavBar>

    </MyNavBar>
    </div>
      <Container className='dark padding-40px' style={{'top':20}} >
        <Row>
          <Col>
            <Row>
              <Col>
                {/* <Row style={{'display':'flex-start'}}>
                  <Col sm='2' xs='2' className='logo align-left'>
                  </Col>
                </Row> */}
              </Col>
            </Row>
            {/* <div>
              <h2>Dashboard</h2>
              <p>Audience engaged, visualised</p>
            </div> */}
            {/* <div>
              <img
              src="https://www.livelingua.com/img/profilesTeachers/103/Guillaume-Deneufbourg-Square_Profile_S.jpg"
              className="profilepic"
              alt="profile_pic"
              />
            </div> */}
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
              <MySessionHistory
                viewSessionHistory={id => {
                  setSessionID(id);
                }}
                ></MySessionHistory>
            </div>
          </Col>
          {/* <Col className="no-border" sm="8">
            {sessionID > 0 ? (
              <EngagementGraph darkMode={true} session_id={sessionID}></EngagementGraph>
              ) : (
                <p>Please choose a session</p>
                )}
              </Col> */}
        </Row>
      </Container>
    </>
              
  );
};

export default Dashboard;
