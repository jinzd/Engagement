import axios from "axios";
import React from "react";
import { CardBody, Card, Container, Row, Col } from "reactstrap";
import WebcamView from "./WebcamView";
import EngagementGraph from "./EngagementGraph";

class LiveSessionGraph extends React.Component {
  constructor(props) {
    super(props);

    this.darkTheme = {
      backgroundColor: "#212121",
      backgroundColorLigher: "black",
      color: "#cccccc",
      spinner: "light"
    };

    this.lightTheme = {
      backgroundColor: "#ffffff",
      backgroundColorLigher: "#fcfcfc",
      color: "#1f1f1f",
      spinner: "dark"
    };

    this.state = {
      last_updated: "",
      activeTheme: props.darkMode ? this.darkTheme : this.lightTheme
    };
    this.subscriptionKey = process.env.REACT_APP_MICROSOFT_API_KEY;
    this.uriBaseFaceApi = process.env.REACT_APP_MICROSOFT_FACE_API;
    this.urlLiveDataEndpoint = process.env.REACT_APP_REST_LIVE_DATA;
    this.auth = localStorage.getItem("userToken");
    this.params = {
      returnFaceAttributes: "emotion"
    };
  }

  processScreenshot(buffer) {
    axios({
      url: this.uriBaseFaceApi,
      data: buffer,
      method: "post",
      params: this.params,
      headers: {
        "Content-Type": "application/octet-stream",
        "Ocp-Apim-Subscription-Key": this.subscriptionKey
      }
    }).then(res => {
      this.sendLiveData(res.data);
    });
  }

  sendLiveData = data => {
    this.setState({
      toggleCapture: false
    });
    axios({
      method: "post",
      url: this.urlLiveDataEndpoint,
      data: {
        data: data,
        timestamp: Date.now(),
        session_id: this.props.session_id
      },
      headers: { Authorization: "Bearer " + this.auth }
    }).then(res => {
      this.setState({
        last_updated: Date.now()
      });
      // const eng = res['data']['engagement']
      // const timestamp = parseInt(res['data']['timestamp'])
      // const time = new Date(timestamp)
      // const timecode = `${time.getMinutes()}:${time.getSeconds()}`
      // let tempLiveData = {...this.state.liveData, [this.timecodeFixed + 's']:eng}
      // this.timecodeFixed += 5
      // debugger
    });
  };

  render() {
    const { color, backgroundColorLigher } = this.darkTheme;
    return (
      <>
        <Container>
          <Row>
            <Col className="align-center dark-card-border" >
              <Card className='rounded-corner'
                style={{
                  backgroundColor: backgroundColorLigher,
                  color: color,
                  textAlign: "center"
                }}
              >
                <CardBody>
                  <WebcamView
                    afterScreenshot={buffer => this.processScreenshot(buffer)}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <EngagementGraph
                updated={this.state.last_updated}
                darkMode={true}
                session_id={this.props.session_id}
              ></EngagementGraph>
            </Col>
          </Row>
        </Container>
        {/* <button onClick={() => this.webCamButtonHandler()} value='Start'>Start</button> */}
        {/* <Row>
          <Col sm='4'> */}
        {/* <div> */}
        {/* <Card body style={{'padding':0}}>
              <CardBody>
                
              <LineChart library={{backgroundColor: "#eee"}} min={0} xtitle="Time" ytitle="Engagement" height={250} data={this.state.liveData}/>
                <CardTitle style={{'fontWeight':'bold'}}><h3>Session name</h3></CardTitle>
                <CardSubtitle><h5>Session short description</h5></CardSubtitle>
              </CardBody>
            </Card> */}
        {/* </div> */}
        {/* </Col>
        </Row> */}
      </>
    );
  }
}

export default LiveSessionGraph;
