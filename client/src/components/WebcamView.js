import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button, Col, Row } from "reactstrap";
import { useHistory, withRouter } from "react-router-dom";

const WebcamView = props => {
  const [toggle, setToggle] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [buttonColor, setButtonColor] = useState("success");
  const [timerHandler, setTimerHandler] = useState(null);
  const webcamRef = useRef(null);
  const afterScreenshot = props.afterScreenshot;
  const intervalMiliSeconds = 5000;
  const camWidth = Math.max(Math.min((window.innerWidth * 7) / 10, 700), 250);
  let history = useHistory();
  const route = history.location.pathname

  useEffect(() =>{
    history.listen((location, action)=>{
      if (history.location.pathname != route){
        stopTimer()
      }
    })
  })

  const startCaptureTimer = () => {
    if (!toggle) {
      setToggle(true);
      setButtonText("Pause");
      setButtonColor("info");
      setTimerHandler(setInterval(capture, intervalMiliSeconds));
    } else {
      stopTimer();
    }
  };

  const stopTimer = () => {
    setToggle(false);
    setButtonText("Start");
    setButtonColor("success");
    clearInterval(timerHandler);
  };
  var dataURItoBuffer = function(dataURL, callback) {
    var buff = new Buffer(
      dataURL.replace(/^data:image\/(png|gif|jpeg);base64,/, ""),
      "base64"
    );
    callback(buff);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dataURItoBuffer(imageSrc, function(buffer) {
      afterScreenshot(buffer);
    });
  }, [webcamRef, afterScreenshot]);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: { exact: "user" }
  };

  const endLiveSession = () => {
    stopTimer();
    history.push("./dashboard");
  };

  return (
    <>
      <Row>
        <Col>
          <Webcam
            videoConstraints={videoConstraints}
            audio={false}
            imageSmoothing={true}
            mirrored={true}
            screenshotFormat="image/jpeg"
            width={camWidth}
            ref={webcamRef}
          ></Webcam>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button style={{'padding':'10px 20px'}} color={buttonColor} onClick={() => startCaptureTimer()}>
            {buttonText}
          </Button>
          <Button style={{'padding':'10px 20px'}} color="danger" onClick={() => endLiveSession()}>
            End
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(WebcamView);
