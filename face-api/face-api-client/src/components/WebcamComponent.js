import React, {useRef} from 'react'
import Webcam from 'react-webcam'
import webcamRef from 'react-webcam'
import axios from 'axios'


const WebcamComponent = (props) => 
{
    const {width, height, facingMode} = props;
    const webcamRef = useRef(null);

    var subscriptionKey = 'b8f31dac63f24151a64c3fe17a6339fb'
    var uriBase = 'https://classroom-engagement.cognitiveservices.azure.com/face/v1.0/detect'
    var params = {
      "returnFaceAttributes":"emotion"
    }

    var dataURItoBuffer = function (dataURL, callback) {
      var buff = new Buffer(dataURL.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
      callback(buff);
    };

    const capture = React.useCallback(
      () => {
        
        const imageSrc = webcamRef.current.getScreenshot();
        dataURItoBuffer(imageSrc, function(buffer){
          axios({
            url:uriBase,
            data:buffer,
            method: 'post',
            params: params,
            headers: {'Content-Type': 'application/octet-stream',
                      'Ocp-Apim-Subscription-Key': subscriptionKey}
          })
            .then(res=>{
              postLiveData(res.data)
            })
        })
      },
      [webcamRef],

    );

    const postLiveData = (data)=>{
      axios({
        method:'post',
        url:'http://localhost:5000/api/v1/engagement/live',
        data:{'data':data, 'timestamp': Date.now(), 'session_id': 1}
      }).then(res=>{
        console.log(res)
      })
    }

    const videoConstraints = {
      width,
      height,
      facingMode
    }
    
    return(
    <>
      <Webcam screenshotFormat="image/jpeg" videoConstraints ref={webcamRef}></Webcam>
      <button onClick={capture}>Capture photo</button>
    </>
    )
};

export default WebcamComponent;