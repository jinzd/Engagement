import React , { useState } from "react";
import '../App.css';
import { Container, Row, Col } from 'reactstrap';


const Dashboard = (props) => {
    return (
      <>
        <Container>
            <Row>
                <Col className="dashboard-col-top">
                    <div>
                        <h2>Dashboard</h2>
                        <p>Audience engaged, visualised</p>
                    </div>
                    <div>
                        <img src="https://www.livelingua.com/img/profilesTeachers/103/Guillaume-Deneufbourg-Square_Profile_S.jpg" className="profilepic"/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="dashboard-col-bottom">
                    One of three columns
                </Col>
                <Col className="dashboard-col-bottom">
                    One of three columns
                </Col>
            </Row>
        </Container>
      </>
    );
  };
  
export default Dashboard;
