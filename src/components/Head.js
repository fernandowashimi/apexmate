import React from "react";
import { Header, Icon } from "semantic-ui-react";

const Head = () => {
  return (
    <div>
      <Header as="h1" icon textAlign="center" color="grey" inverted>
        <Icon name="smile outline" />
        ApexMate
      </Header>
    </div>
  );
};

export default Head;
