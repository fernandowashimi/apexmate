import React from "react";
import { Card, Image } from "semantic-ui-react";

const PlayerCard = props => {
  return (
    <Card fluid>
      <Card.Content>
        <Image floated="left" size="tiny" src={props.avatar} />
        <Card.Header
          textAlign="center"
          style={{ margin: "5px 0px", fontSize: "2em" }}
        >
          {props.name}
        </Card.Header>
        <Card.Meta textAlign="center">{props.aid}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default PlayerCard;
