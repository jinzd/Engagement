import React, {useRef, useState} from 'react'
import Webcam from 'react-webcam'
import webcamRef from 'react-webcam'
import {Button, Col, Row} from 'reactstrap'
import {useHistory} from "react-router-dom";

const WebcamView = (props) => 
{
    const [toggle, setToggle] = useState(false)
    const [buttonText, setButtonText] = useState('Start')
    const [buttonColor, setButtonColor] = useState('success')
    const [timerHandler, setTimerHandler] = useState(null)
    const webcamRef = useRef(null);
    const afterScreenshot = props.afterScreenshot;
    const intervalMiliSeconds = 5000
    const camWidth = Math.max(Math.min(window.innerWidth * 7/10, 500), 250)
    let history = useHistory()

    const startCaptureTimer = () => {
      if(!toggle){
        setToggle(true)
        setButtonText('Pause')
        setButtonColor('danger')
        setTimerHandler(setInterval(capture,intervalMiliSeconds))
      } else {
        stopTimer()
      }
    }
    
    const stopTimer = () =>{
      setToggle(false)
      setButtonText('Start')
      setButtonColor('success')
      clearInterval(timerHandler)
    }
    var dataURItoBuffer = function (dataURL, callback) {
      var buff = new Buffer(dataURL.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
      callback(buff);
    };

    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        dataURItoBuffer(imageSrc, function(buffer){
          afterScreenshot(buffer)
        })
      },
      [webcamRef],
    );

    const videoConstraints = {
      width:300,
      height:300,
      facingMode:'user'
    }

    const endLiveSession = () =>{
      stopTimer();
      history.push("./dashboard")
    }

    return(
    <>
      <Row>
        <Col>
        <Webcam audio={false} imageSmoothing={true} mirrored={true} screenshotFormat="image/jpeg" width={camWidth} ref={webcamRef}></Webcam>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button color={buttonColor} onClick={() => startCaptureTimer()}>{buttonText}</Button>
        <Button color='info' onClick={() => endLiveSession()}>End</Button>
        </Col>
      </Row>
    </>
    )
};

export default WebcamView;