import React, { Component } from "react";
import { Segment, Input, Dropdown, Button, Icon } from "semantic-ui-react";
import api from "../services/api";

const options = [
  { key: "pc", text: "PC", value: "pc" },
  { key: "xbl", text: "Xbox", value: "xbl" },
  { key: "psn", text: "Playstation", value: "psn" }
];

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      platform: "pc",
      loading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleInputChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDropdownChange(e, { value }) {
    this.setState({ platform: value });
  }

  async fetchData() {
    this.setState({ loading: true });
    this.props.displaySegment();

    try {
      const response = await api.get("search.php", {
        params: {
          platform: this.state.platform,
          search: this.state.name
        }
      });
      this.props.sendData(response.data);
      console.log(this.state.data);
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { platform } = this.state;
    return (
      <div>
        <Segment
          inverted
          style={{
            marginTop: "4em"
          }}
        >
          <Input
            type="text"
            placeholder="Nome de jogador..."
            size="small"
            action
            fluid
          >
            <input
              onChange={e => {
                this.handleInputChange(e);
              }}
            />
            <Dropdown
              button
              options={options}
              value={platform}
              onChange={this.handleDropdownChange}
            />
            <Button
              animated="vertical"
              color="grey"
              onClick={this.fetchData}
              loading={this.state.loading}
            >
              <Button.Content hidden>Procurar</Button.Content>
              <Button.Content visible>
                <Icon name="search" />
              </Button.Content>
            </Button>
          </Input>
        </Segment>
      </div>
    );
  }
}

export default SearchBar;
