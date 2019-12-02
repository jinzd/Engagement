import React, {useState, useEffect} from "react";
import axios from 'axios';
import {
    Button, Input, Label, Form, FormGroup
  } from 'reactstrap';
import { useHistory} from "react-router-dom";
// import LiveSession from '../pages/LiveSession';

const MyCreateSession = (props) => {
    const jwt= localStorage.getItem('userToken')
    // const [title, setTitle] = useState([])
    // const [session_type, setSession_type] = useState([])
    // const [description, setDescription] = useState([])
    const [sessionData, setSessionData] = useState({title:[], session_type:[], description:[]})
    const [responseId, setResponseId] = useState(-1)
    const [isSessionCreated, setIsSessionCreated] = useState(false)
    let history = useHistory();

    let formData= {
        title: sessionData.title[0],
        session_type: sessionData.session_type[0],
        description: sessionData.description[0]
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(sessionData);

        axios.post("http://127.0.0.1:5000/api/v1/sessions/new", formData, {
        headers: { Authorization: `Bearer ${jwt}` }
    })
    .then(response => {
        console.log(response['data']['session']['id'])
        setResponseId(response['data']['session']['id']);
        setIsSessionCreated(true);
        
    })
    .catch(error => {
        console.log(error);
    });
}

useEffect (()=> {
        if(responseId > 0){
            history.push({
                pathname:"/livesession",
                state: {session_id: responseId}
            });
        }
    })
    
    const handleInput = (e) => setSessionData({
        ...sessionData,
        [e.target.name]: [e.target.value],
      }); 

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="title">Title:</Label>
                    <Input type="text" name="title" id="title" placeholder="Include a title." value={sessionData.title} onChange={handleInput}/>
                </FormGroup>
                <FormGroup>
                    <Label for="session_type">Session Type:</Label>
                    <Input type="select" name="session_type" id="session_type" value={sessionData.session_type} onChange={handleInput}>
                        <option>Options</option>
                        <option>Lecture</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description:</Label>
                    <Input type="text" name="description" id="description" placeholder="Include a description."value={sessionData.description} onChange={handleInput}/>
                </FormGroup>
                <Button>Create</Button>
                {/* {isSessionCreated 
                    // ? <Link to="/livesession" params={{session_id:responseId}}></Link>       
                    ? console.log('Life is slighly less difficult') 
                    : console.log("life is hard")
                } */}
            </Form>
        </>
    )
}

export default MyCreateSession;