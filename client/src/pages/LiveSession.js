import React , { useState } from "react";
import {Link} from "react-router-dom";
import LiveSessionGraph from '../components/LiveSessionGraph'
const LiveSession = (props) => {
    console.log(props.location.state.session_id)
    return (
        <>
            <LiveSessionGraph darkMode={false} session_id={props.location.state.session_id}></LiveSessionGraph>
            {/* <Link to="/dashboard">End Session</Link> */}
        </>
    );
};

export default LiveSession;