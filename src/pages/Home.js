import React, { Component } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Head from "../components/Head";
import { Grid } from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchParams: {
        platform: "pc", // Default paltform
        name: ""
      }
    };

    // this.sendData = this.sendData.bind(this);
    // this.handleStatus = this.handleStatus.bind(this);
    // this.handleVisibility = this.handleVisibility.bind(this);
    // this.teste = this.teste.bind(this);
    this.getInputParam = this.getInputParam.bind(this);
    this.getDropdownParam = this.getDropdownParam.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  // Get input value from SearchBar component
  getInputParam(name) {
    this.setState({
      searchParams: {
        name,
        platform: this.state.searchParams.platform
      }
    });
  }

  // Get dropdown value from SearchBar component
  getDropdownParam(platform) {
    this.setState({
      searchParams: {
        platform,
        name: this.state.searchParams.name
      }
    });
  }

  // Start search proccess
  async fetchData() {
    try {
      // Get the basic info using the player name (the plyer aid is necessary to get the full stats)
      const basic_info = await api.get("search.php", {
        params: {
          platform: this.state.searchParams.platform,
          search: this.state.searchParams.name
        }
      });

      // Check if the request has a result
      if (basic_info.data.totalresults) {
        try {
          // Get the full info using the aid received from the first request
          const full_info = await api.get("player.php", {
            params: {
              aid: basic_info.data.results[0].aid
            }
          });

          // Update state with the result
          this.setState({ playerInfo: full_info.data });
        } catch (error) {
          console.warn(error);
        }
      } else {
        this.setState({
          playerInfo: undefined
        });
      }
    } catch (error) {
      console.warn(error);
    } finally {
      console.log(this.state);
    }
  }

  // sendData(data) {
  //   this.setState({ data });
  // }

  // handleStatus(loading) {
  //   this.setState({ loading });
  // }

  // handleVisibility() {
  //   if (!this.state.visible) {
  //     this.setState({ visible: !this.state.visible });
  //   }
  // }

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
              sendInputParam={this.getInputParam}
              sendDropdownParam={this.getDropdownParam}
              fetchData={this.fetchData}
            />
            <Footer />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
