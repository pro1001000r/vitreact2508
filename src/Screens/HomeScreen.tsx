import React, { FC, useState } from "react";

// import CanvasVit from "../Components/CanvasVit";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

import Logo from "../Template/images/LogoPikclick512.png";
import ButtonVit from "../Components/ButtonVit";
import ModalVit from "../Components/ModalVit";
import ScanerVit from "../Components/ScanerVit";

const HometScreen: FC = () => {
  const [scan, setScan] = useState<string>("Просканируйте штрихкод...");
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
                Скоро инвентаризация?! <br />
                проверка
                <br />
                <small> - легко и просто</small>
              </p>
            </h1>

            <Row className="text-center">
              <Col>
                <p>{scan}</p>
                <ButtonVit
                  className=" btn-primary"
                  icon="UpcScan"
                  name="Сканер-то в руках держите уже"
                  onClick={() => setShow(true)}
                />

                <ModalVit show={show} setShow={setShow}>
                  <ScanerVit setScan={setScan} />
                </ModalVit>
              </Col>
            </Row>
            <Row>
              <h4>Для кого этот сервис:</h4>
              <p className="text-center vit-font-verdana">
                для кладовщиков, маркетологов и всем, кому нужно точное
                представление о состоянии товаров на складах
              </p>
            </Row>
            <Row>
              <h4>Для чего этот сервис:</h4>
              <p className="text-center vit-font-verdana">
                <b>Подсчёт товаров с мобильного</b>
                <br />
                (инвентаризация)
                <br />
                <b>Приведение в порядок карточек товаров</b>
                <br />
                (фото, описание, штрихкодирование, печать этикеток, ценовая
                политика)
                <br />
                Создание карточки товара при Внедрение новой какой-либо учетной
                системы (1С, Saby, Эватор) и первоначальных остатков
              </p>
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
