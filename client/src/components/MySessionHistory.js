import React, { useState, useEffect } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import axios from 'axios';
import '../App.css';

const MySessionHistory = (props) => {
    const jwt= localStorage.getItem('userToken')
    const [history, setHistory] = useState([])

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/api/v1/sessions/',{headers: {authorization: `Bearer ${jwt}`}})
        .then(result=> {
            setHistory(result.data.sessions);
            console.log(result.data.sessions)
        })
        .catch(error =>{
            console.log('Error:', error)
        })
    }, [])

    return (
        <>
                    {
                    history.reverse().map(person =>
                        <>
                        <div>
                            <Card>
                                <CardBody>
                                    <CardText>{person.date}</CardText>
                                    <CardTitle>{person.title}</CardTitle>
                                    <CardText>{person.description}</CardText>
                                    <CardText>{person.session_type}</CardText>
                                    <Button onClick={()=>{props.viewSessionHistory(person.id)}}>Graph</Button>
                                </CardBody>
                            </Card>
                        </div>
                        
                        </>
                    )
                    }
        </>
    )
}

export default MySessionHistory;