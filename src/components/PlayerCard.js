import React from "react";
import { Icon, Label, Segment, Item, Statistic } from "semantic-ui-react";

const getPlatformIcon = platform => {
  if (platform === "PC") return "windows";
  else if (platform === "XBL") return "xbox";
  else if (platform === "PSN") return "playstation";
};

const styles = {
  statistic: {
    minWidth: "100px",
    flexGrow: "1"
  }
};

const PlayerCard = props => {
  return (
    <div>
      <Segment>
        <Label attached="top">Informações do jogador</Label>
        <Item.Group>
          <Item>
            <Item.Image size="small" src={props.avatar} />

            <Item.Content verticalAlign="middle">
              <Item.Header as="h1" style={{ fontSize: "2em" }}>
                {props.name}
              </Item.Header>
              <Item.Description>
                <Label.Group color="black">
                  <Label>
                    Plataforma
                    <Label.Detail>
                      <Icon name={getPlatformIcon(props.platform)} />
                      {props.platform}
                    </Label.Detail>
                  </Label>
                  <Label>
                    Classificação
                    <Label.Detail>
                      <Icon name="hashtag" />
                      {props.globalrank}
                    </Label.Detail>
                  </Label>
                  <Label>
                    Nível
                    <Label.Detail>
                      <Icon name="star" />
                      {props.level}
                    </Label.Detail>
                  </Label>
                  <Label
                    as="a"
                    href={`https://apextab.com/${props.aid}`}
                    target="_blank"
                  >
                    ApexTab
                    <Label.Detail>
                      <Icon name="desktop" />
                      Visitar
                    </Label.Detail>
                  </Label>
                </Label.Group>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Label attached="top">Estatísticas gerais</Label>
        <Statistic.Group widths="four" size="tiny">
          <Statistic style={styles.statistic}>
            <Statistic.Label>Abates</Statistic.Label>
            <Statistic.Value>{props.kills}</Statistic.Value>
          </Statistic>
          <Statistic style={styles.statistic}>
            <Statistic.Label>Headshots</Statistic.Label>
            <Statistic.Value>{props.headshots}</Statistic.Value>
          </Statistic>
          <Statistic style={styles.statistic}>
            <Statistic.Label>Dano</Statistic.Label>
            <Statistic.Value>{props.damage}</Statistic.Value>
          </Statistic>
          <Statistic style={styles.statistic}>
            <Statistic.Label>Partidas</Statistic.Label>
            <Statistic.Value>{props.matches}</Statistic.Value>
          </Statistic>
        </Statistic.Group>
      </Segment>
    </div>
  );
};

export default PlayerCard;
