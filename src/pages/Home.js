import React, { Component } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import PlayerCard from "../components/PlayerCard";
import Head from "../components/Head";
import { Grid, Transition, Segment, Dimmer, Loader } from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchParams: {
        platform: "pc", // Default paltform
        name: ""
      },
      playerInfo: {
        playerfound: false
      },
      isDisplayingInfo: false,
      isDisplayingMessage: false,
      isLoading: false
    };

    // this.sendData = this.sendData.bind(this);
    // this.handleStatus = this.handleStatus.bind(this);
    // this.handleVisibility = this.handleVisibility.bind(this);
    // this.teste = this.teste.bind(this);
    this.getInputParam = this.getInputParam.bind(this);
    this.getDropdownParam = this.getDropdownParam.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
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

  toggleVisibility() {
    !this.state.isDisplayingInfo && this.setState({ isDisplayingInfo: true });
  }

  toggleLoading() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  // Start search proccess
  async fetchData() {
    this.toggleLoading();
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
        // Reset state if doesn't found a player
        this.setState({
          playerInfo: {
            playerfound: false
          }
        });
      }
    } catch (error) {
      console.warn(error);
    } finally {
      console.log(this.state);
      this.toggleLoading();
      this.toggleVisibility();
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
          <Grid.Column style={{ maxWidth: "600px", margin: "1em" }}>
            <Head />
            <SearchBar
              sendInputParam={this.getInputParam}
              sendDropdownParam={this.getDropdownParam}
              fetchData={this.fetchData}
            />
            <Transition
              animation={"slide down"}
              duration={500}
              visible={this.state.isDisplayingInfo}
              unmountOnHide
            >
              <div>
                {this.state.playerInfo.playerfound && (
                  <Segment>
                    <PlayerCard
                      name={this.state.playerInfo.name}
                      avatar={this.state.playerInfo.avatar}
                      aid={this.state.playerInfo.aid}
                    />
                  </Segment>
                )}
              </div>
            </Transition>
            <Footer />
            <Dimmer active={this.state.isLoading} page>
              <Loader>Carregando...</Loader>
            </Dimmer>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
