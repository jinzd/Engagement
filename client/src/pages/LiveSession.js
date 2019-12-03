import React from "react";
import LiveSessionGraph from "../components/LiveSessionGraph";
const LiveSession = props => {
  return (
    <>
      <LiveSessionGraph
        darkMode={false}
        session_id={props.location.state.session_id}
      ></LiveSessionGraph>
    </>
  );
};

export default LiveSession;
