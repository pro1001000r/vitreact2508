import React, { FC, useState } from "react";

// import CanvasVit from "../Components/CanvasVit";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

import Logo from "../Template/images/LogoPikclick512.png";
import ButtonVit from "../Components/ButtonVit";
import ModalVit from "../Components/ModalVit";
import ScanerVit from "../Components/ScanerVit";

const HometScreen: FC = () => {
  const [scan, setScan] = useState<string>("");
  const [show, setShow] = useState(false);

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

              <p className="vit-font-propis">
                Инвентаризация <br />
                <br />
                <small> - легко и просто</small>
              </p>
            </h1>

            <Row className="text-center">
              <Col>
                {/* <p>{scan}</p> */}
                {/* <ButtonVit
                  className=" btn-primary"
                  icon="UpcScan"
                  name="Сканер"
                  onClick={() => setShow(true)}
                /> */}

                <ButtonVit href="/Auth" name='Войти в систему'/>

                <ModalVit show={show} setShow={setShow}>
                  <ScanerVit setScan={setScan} setShow={undefined} />
                </ModalVit>
              </Col>
            </Row>

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
