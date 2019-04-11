import React, { Component } from "react";
import api from "../services/api";
import format from "../services/formatJSON";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import PlayerCard from "../components/PlayerCard";
import LegendCard from "../components/LegendCard";
import Head from "../components/Head";
import { Grid, Transition, Segment, Dimmer, Loader } from "semantic-ui-react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchParams: {
        platform: "pc", // Default paltform
        name: ""
      },
      result: {
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
    this.dismissAll();
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
          this.setState({ result: format(full_info.data) });
        } catch (error) {
          console.warn(error);
        }
      } else {
        // Reset state if doesn't found a player
        this.setState({
          result: {
            playerfound: false
          }
        });
        this.notify();
      }
    } catch (error) {
      console.warn(error);
    } finally {
      this.toggleLoading();
      this.toggleVisibility();
    }
  }

  // Toastify
  notify = () => toast.error("Oops! Não foi possível encontrar esse jogador.");
  dismissAll = () => toast.dismiss();

  render() {
    const result = this.state.result;

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
                {this.state.result.playerfound && (
                  <Segment inverted>
                    <PlayerCard {...result.player} />
                    {result.legends.map((legend, index) => {
                      return <LegendCard key={index} {...legend} />;
                    })}
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
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
          transition={Slide}
        />
      </div>
    );
  }
}

export default Home;
