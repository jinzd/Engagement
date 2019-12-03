import React, { useState, useEffect } from "react";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";
import axios from "axios";
import "../App.css";

const MySessionHistory = props => {
  const [history, setHistory] = useState([]);
  const sessionHistoryApi = process.env.REACT_APP_SESSION_HISTORY_API;
  useEffect(() => {
    const jwt = localStorage.getItem("userToken");
    axios
      .get(sessionHistoryApi, {
        headers: { authorization: `Bearer ${jwt}` }
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
      {history.reverse().map(person => (
        <div key={person.id}>
          <Card>
            <CardBody>
              <CardText>{person.date}</CardText>
              <CardTitle>{person.title}</CardTitle>
              <CardText>{person.description}</CardText>
              <CardText>{person.session_type}</CardText>
              <Button
                onClick={() => {
                  props.viewSessionHistory(person.id);
                }}
              >
                Graph
              </Button>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
};

export default MySessionHistory;
