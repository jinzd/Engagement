import React, { useState, useEffect } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
  } from 'reactstrap';
import axios from 'axios';
import '../App.css';

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

    const getMinutes = seconds => {
        var minutes = Math.floor(seconds / 60);
        var remaining_sec = seconds - minutes * 60;
        return `${minutes} minutes and ${remaining_sec} seconds`;
    };

    return (
        <>
        {
        history.reverse().map(person =>
            <>   
            <Row>
                <Col className='padding-10px'>
                <Card className='dark-card dark-card-border'>
                    <CardBody>
                        <CardText>{person.date}</CardText>
                        <CardTitle>{person.title}</CardTitle>
                        {/* <CardText>{person.description}</CardText> */}
                        <CardText>{person.session_type}</CardText>
                        <Button onClick={()=>{props.viewSessionHistory(person.id)}}>Graph</Button>
                    </CardBody>
                </Card>
                </Col>
            </Row>
            </>
        )
        }
        </>
    )
}
