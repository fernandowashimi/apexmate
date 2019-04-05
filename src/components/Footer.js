import React from "react";
import { Header, Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <div>
      <Header
        as="h5"
        textAlign="center"
        style={{ color: "#777777", marginTop: "4em", marginBottom: 0 }}
      >
        <div>
          Feito com <Icon fitted name="heart" /> por Fernando Shinji utilizando{" "}
          <a
            href={"https://github.com/Tabwire/ApexTab-API"}
            target="_blank"
            rel="noopener noreferrer"
          >
            ApexTab API
          </a>
          .
        </div>
      </Header>
      <Header
        as="h5"
        textAlign="center"
        style={{ color: "#777777", marginTop: 0 }}
      >
        <a href={"/"}>ApexMate</a> não é afiliado a EA e/ou Respawn.
      </Header>
    </div>
  );
};

export default Footer;
