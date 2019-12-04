import React, { useState, useEffect } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
  } from 'reactstrap';
import axios from 'axios';
import EngagementGraph from '../components/EngagementGraph'
import '../App.css';

const MySessionHistory = props => {
  const [history, setHistory] = useState([]);
  const sessionHistoryApi = process.env.REACT_APP_SESSION_HISTORY_API;
  useEffect(() => {
    const jwt = localStorage.getItem("userToken");
    // debugger
    axios
      .get(sessionHistoryApi, {
        headers: { "Authorization": `Bearer ${jwt}` }
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
        {
        history.reverse().map((person,index) =>
            
            <Row key={index}>
                <Col className='no-padding'>
                  <EngagementGraph darkMode={true} session_id={person.id}></EngagementGraph>
                {/* <Card className='dark-card dark-card-border shadow dark-card-hover'>
                    <CardBody onClick={()=>{props.viewSessionHistory(person.id)}}>
                        <CardText>{person.date}</CardText>
                        <CardTitle>{person.title}</CardTitle>
                        
                        <CardText>{person.session_type}</CardText>
                        
                    </CardBody>
                </Card> */}
                </Col>
            </Row>
        )
        }
        </>
    )
}

export default MySessionHistory;