import React, { Component } from "react";
import { Segment, Input, Dropdown, Button, Icon } from "semantic-ui-react";

const options = [
  { key: "pc", text: "PC", value: "pc" },
  { key: "xbl", text: "Xbox", value: "xbl" },
  { key: "psn", text: "Playstation", value: "psn" }
];

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // Send input value to parent
  handleInputChange(e) {
    this.props.sendInputParam(e.target.value);
  }

  // Send dropdown value to parent
  handleDropdownChange(e, { value }) {
    this.props.sendDropdownParam(value);
  }

  // Search for player when press enter
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.fetchData();
    }
  }

  render() {
    return (
      <div>
        <Segment
          inverted
          style={{
            marginTop: "4em",
            marginBottom: "1em"
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
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
            <Dropdown
              button
              options={options}
              defaultValue={"pc"}
              onChange={this.handleDropdownChange}
            />
            <Button
              animated="vertical"
              color="grey"
              onClick={this.props.fetchData}
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
