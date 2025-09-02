import React, { FC } from "react";

// import CanvasVit from "../Components/CanvasVit";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

import Logo from "../Template/images/LogoPikclick512.png";
import NoImg from "../Template/images/no-image.png";
import MyFoto from "../Template/images/Fon12.png";
import TestVit from "../Components/TestVit";

const HometScreen: FC = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <br />
            <h1 className="text-center vShadowT">
              <Image
                src={Logo}
                alt="Логотип"
                className="vitImageContain vShadowImg"
              />
              <Image
                src={MyFoto}
                alt="Логотип"
                className="vitImageContain vShadowImg"
              />

              <Image
                src={NoImg}
                alt="Логотип"
                className="vitImageContain vShadowImg"
              />
              <p className="vit-font-propis">
                Инвентаризация?!
                <br />
                <small> - легко и просто</small>
              </p>
            </h1>
            <p className="text-center vit-font-verdana">
              Сайт предназначен для руководителей, бизнесменов и всех, кому
              нужно точное представление о состоянии товаров на складах
            </p>
            <br />
          </Col>
        </Row>
        <Row>
          <Card className=" mb-2">
            <Card.Body>Здесь будет обратная связь</Card.Body>
          </Card>
        </Row>
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default HometScreen;
