import React, { useState, useEffect } from "react";
import { Card, CardText, CardBody, Col, Row } from "reactstrap";
import axios from "axios";
import EngagementGraph from "../components/EngagementGraph";
import "../App.css";

const MySessionHistory = props => {
  const [history, setHistory] = useState([]);
  const sessionHistoryApi = process.env.REACT_APP_SESSION_HISTORY_API;
  useEffect(() => {
    const jwt = localStorage.getItem("userToken");
    // debugger
    axios
      .get(sessionHistoryApi, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(result => {
        setHistory(result.data.sessions);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }, [sessionHistoryApi]);

  return (
    <>
      {history.length > 0 ? (
        history.reverse().map((person, index) => (
          <Row key={index}>
            <Col className="no-padding">
              <EngagementGraph
                darkMode={true}
                session_id={person.id}
              ></EngagementGraph>
            </Col>
          </Row>
        ))
      ) : (
        <Row>
          <Col className="align-center">
            <Card className="dark no-border padding-40px">
              <CardBody>
                <CardText style={{ fontSize: "3vh", fontWeight: "lighter" }}>
                  Start by creating a New Session
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default MySessionHistory;
