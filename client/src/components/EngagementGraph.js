import { AreaChart, ColumnChart } from "react-chartkick";
import "chart.js";
import axios from "axios";
import React from "react";
import {
  // Container,
  Spinner,
  Button,
  Collapse,
  Row,
  Col,
  Card,
  CardBody,
  CardText
} from "reactstrap";

class EngagementGraph extends React.Component {
  constructor(props) {
    super(props);
    this.darkTheme = {
      backgroundColor: "#1b162e",
      backgroundColorLigher: "#261e42",
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
      mainGraphData: {},
      faceCountGraphData: [],
      highestEmotionsPieChartData: [],
      title: "",
      type: "",
      description: "",
      duration: "",
      date: "",
      time: "",
      isOpen: false,
      isLoading: true,
      activeTheme: props.darkMode ? this.darkTheme : this.lightTheme,
      updated: ""
    };
    this.urlGetEngagementGraphs = process.env.REACT_APP_REST_HISTORIC_DATA;
    this.auth = localStorage.getItem("userToken");
    this.timecodeFixed = 0;
  }

  componentDidMount() {
    this.updateComponent();
  }

  componentWillReceiveProps() {
    this.updateComponent();
  }

  updateComponent() {
    this.getGraphData(success => {
      if (success) {
        this.setState({
          isLoading: false
        });
      }
    });
  }

  getGraphData = callback => {
    axios({
      method: "POST",
      url: this.urlGetEngagementGraphs,
      data: { session_id: this.props.session_id },
      headers: { Authorization: "Bearer " + this.auth }
    })
      .then(res => {
        const mainGraph = res["data"]["main"];
        const faceCountGraph = res["data"]["face_count"];
        const highest_emotions = res["data"]["raw_emotions"];
        const title = res["data"]["session"]["title"];
        const session_type = res["data"]["session"]["session_type"];
        const description = res["data"]["session"]["description"];
        const date = new Date(res["data"]["session"]["date"]);
        // Engagement chart
        let tempGraphDataMain = {};
        mainGraph.forEach(point => {
          tempGraphDataMain[this.timecodeFixed + "s"] = Math.floor(
            point["eng"] * 100
          );
          this.timecodeFixed += 5;
        });

        // Attendance chart
        this.timecodeFixed = 0;
        let tempGraphDataFaceCount = [];
        faceCountGraph.forEach(point => {
          let temp = [];
          temp.push(this.timecodeFixed + "s");
          temp.push(point["face_count"]);
          tempGraphDataFaceCount.push(temp);
          this.timecodeFixed += 5;
        });

        // Expression Chart
        // Create items array
        var items = Object.keys(highest_emotions).map(function(key) {
          return [key, highest_emotions[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        const sum = items[0][1] + items[1][1] + items[2][1];
        items[0][1] = Math.floor((items[0][1] / sum) * 100);
        items[1][1] = Math.floor((items[1][1] / sum) * 100);
        items[2][1] = Math.floor((items[2][1] / sum) * 100);

        let tempHighestThree = [];
        tempHighestThree.push(items[0]);
        tempHighestThree.push(items[1]);
        tempHighestThree.push(items[2]);

        this.setState({
          mainGraphData: tempGraphDataMain,
          faceCountGraphData: tempGraphDataFaceCount,
          highestEmotionsPieChartData: tempHighestThree,
          title: title,
          type: session_type,
          description: description,
          date: date.toDateString(),
          time: date.getUTCHours() + ":" + date.getUTCMinutes(),
          duration: this.getMinutes(this.timecodeFixed)
        });

        callback(res.status === 200 ? true : false);
      })
      .catch(error => {
        console.log(error);
        callback(false);
      });
  };

  getMinutes = seconds => {
    var minutes = Math.floor(seconds / 60);
    var remaining_sec = seconds - minutes * 60;
    return `${minutes} minutes and ${remaining_sec} seconds`;
  };

  render() {
    const {
      backgroundColor,
      backgroundColorLigher,
      color,
      spinner
    } = this.state.activeTheme;
    return (
      <>
        {/* <Container > */}
        <Row>
          <Col style={{ padding: 10 }}>
            <Card
              body
              style={{
                display: this.state.isLoading ? "block" : "none",
                backgroundColor: backgroundColor,
                color: color,
              }}
            >
              <CardBody className="justify-content-center">
                <Spinner color={spinner}></Spinner>
              </CardBody>
            </Card>
            <Card
              body
              onClick={() => {
                        this.setState({ isOpen: !this.state.isOpen });
                      }}
              className='rounded-corner dark-card-border'
              style={{
                display: this.state.isLoading ? "none" : "block",
                backgroundColor: backgroundColor,
                color: color,
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 0
              }}
            >
              <CardBody>
                <Row>
                  <Col>
                  <Row>
                    <Col>
                    <CardText
                      style={{ fontWeight: "lighter", textAlign: "left" }}
                      >
                      {this.state.type} | {this.state.duration} (
                      {this.state.date}, {this.state.time})
                    </CardText>
                    <CardText style={{fontWeight: "bold", float:'left'}}>
                    <h2>  
                    {this.state.title}
                    </h2>
                    </CardText>
                    {/* <Card
                      className='rounded-corner'
                      color="info"
                      onClick={() => {
                        this.setState({ isOpen: !this.state.isOpen });
                      }}
                      style={{ fontWeight: "bold", float:'left'}}
                      >
                      <CardBody>
                      </CardBody>
                    </Card> */}
                      </Col>
                    </Row>
                    <Row>

                      <Col style={{paddingTop:'10px', paddingBottom:'10px'}}>
                        {/* <Collapse isOpen={this.state.isOpen}> */}
                          <Card
                            className='rounded-corner'
                            style={{
                              backgroundColor: backgroundColorLigher,
                              color: color,
                              borderWidth: 0,
                              padding: 0,
                              // float:"left"
                            }}
                            body
                          >
                            <CardBody style={{ paddingLeft: 20 }}>
                              <CardText>{this.state.description}</CardText>
                            </CardBody>
                          </Card>
                        {/* </Collapse> */}
                      </Col>
                    </Row>
                    </Col>
                    {/* </Row>
                    <Row style={{ paddingTop: 20, paddingBottom: 20 }}> */}
                  {/* </Col> */}
                  <Col lg="4">
                    <Card className='rounded-corner' style={{ backgroundColor: backgroundColorLigher }}>
                      <CardBody>
                        <CardText
                          style={{ fontWeight: "bold", textAlign: "left" }}
                          >
                          Expressions %
                        </CardText>
                        <ColumnChart
                          colors={["#ffb700"]}
                          height={80}
                          data={this.state.highestEmotionsPieChartData}
                          ></ColumnChart>
                      </CardBody>
                    </Card>
                  </Col>
                          </Row>
                {/* </Row> */}
                <Collapse isOpen={this.state.isOpen}>

                <Row>
                  <Col>
                    <CardText style={{ fontWeight: "bold", textAlign: "left" }}>
                      Engagement Index
                    </CardText>
                    <AreaChart
                      dataset={{ borderWidth: 3 }}
                      colors={["#6840ed"]}
                      height={100}
                      data={this.state.mainGraphData}
                      />
                    <Row>
                      <Col>
                        <CardText
                          style={{ fontWeight: "bold", textAlign: "left" }}
                          >
                          Attendance
                        </CardText>
                        <ColumnChart
                          colors={["#40edae"]}
                          height={100}
                          data={this.state.faceCountGraphData}
                          ></ColumnChart>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                </Collapse>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* </Container> */}
      </>
    );
  }
}

export default EngagementGraph;
