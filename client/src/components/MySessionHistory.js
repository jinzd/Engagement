import React, { useState, useEffect } from "react";
import axios from 'axios';

const MySessionHistory = (props) => {
    const [history, setHistory] = useState()

    useEffect(()=>{
        axios.get('')
        .then(result=> {
            setHistory(result.data)
        })
        .catch(error =>{
            console.log('Error:', error)
        })
    }, [])

    return (
        <>
            <div>
                <ul>
                    {
                    history.map(person =>
                        <>
                        <p>{person.date}</p>
                        <p>{person.title}</p>
                        <p>{person.description}</p>
                        <p>{person.type}</p>
                        </>
                    )
                    }
                </ul>
            </div>
        </>
    )
}

export default MySessionHistory;