import React from "react";
import { Segment, Label, Item, Statistic } from "semantic-ui-react";

const styles = {
  statistic: {
    minWidth: "150px",
    flexGrow: "1",
    display: "flex",
    justifyContent: "center"
  }
};

const LegendCard = props => {
  return (
    <Segment>
      <Label attached="top">{props.name}</Label>
      <Item.Group>
        <Item>
          <Item.Image
            size="small"
            src={require(`../assets/${props.name}.png`)}
          />

          <Item.Content verticalAlign="middle">
            <Item.Description>
              <Statistic.Group
                horizontal
                size="mini"
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Statistic style={styles.statistic}>
                  <Statistic.Value>{props.kills}</Statistic.Value>
                  <Statistic.Label>Abates</Statistic.Label>
                </Statistic>
                <Statistic style={styles.statistic}>
                  <Statistic.Value>{props.headshots}</Statistic.Value>
                  <Statistic.Label>Headshots</Statistic.Label>
                </Statistic>
                <Statistic style={styles.statistic}>
                  <Statistic.Value>{props.damage}</Statistic.Value>
                  <Statistic.Label>Dano</Statistic.Label>
                </Statistic>
                <Statistic style={styles.statistic}>
                  <Statistic.Value>{props.matches}</Statistic.Value>
                  <Statistic.Label>Partidas</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default LegendCard;
