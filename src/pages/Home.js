import React, { Component } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Head from "../components/Head";
import { Grid, Transition, Segment } from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        totalresults: 0
      },
      visible: false
    };

    this.sendData = this.sendData.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  sendData(data) {
    this.setState({ data: data });
  }

  handleVisibility() {
    if (!this.state.visible) {
      this.setState({ visible: !this.state.visible });
    }
  }

  render() {
    return (
      <div className="login-form">
        <style>
          {`
                body {
                  background-color: #333333;
                }
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
            `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: "800px", margin: "1em" }}>
            <Head />
            <SearchBar
              sendData={this.sendData}
              displaySegment={this.handleVisibility}
            />
            <Transition.Group animation={"slide down"} duration={500}>
              {this.state.visible && (
                <Segment>
                  {this.state.data.totalresults
                    ? JSON.stringify(this.state.data.results, null, 2)
                    : "loading"}
                </Segment>
              )}
            </Transition.Group>
            <Footer />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
