import React, { useState, FC } from "react";

import {
  ICommand,
  IDataUrl,
  IGetProperty,
  IGetTable,
  IUsers,
} from "../inrefaces";

// import CanvasVit from "../Components/CanvasVit";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import AxiosVit from "../Components/AxiosVit";
import ButtonVit from "../Components/ButtonVit";
import FirstVit from "../Components/FirstVit";

import Logo from "../Template/images/LogoPikclick512.png";
import NoImg from "../Template/images/no-image.png";
import MyFoto from "../Template/images/Fon12.png";
import GetProperty from "../Components/GetProperty";


const HometScreen: FC = () => {
  const [data, setData] = useState<IUsers[] | undefined>([]);
  const [user, setUser] = useState<string>("Нет данных");

  const login = GetProperty('users', 1, "login");
  
  //консоль 28 Август 2025 (четверг)
  console.log('>>>> login из (HomeScreen):', login); //консоль
  

  const vFunc = () => {
    const dataUrl: IGetTable = {
      command: ICommand.GetTable,
      data: {
        tableName: "users",
      },
    };
    AxiosVit({ dataUrl, setData });

    
    if (data && data[0]) {
      setUser(data[0].name);
    }
  };

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
            <Card className=" my-2">
              <Card.Body>
                <p>Чтение из Базы данных</p>
                <p>{user} логин: {login} </p>
                <ButtonVit
                  icon="Activity"
                  name="Тестовый запрос"
                  onClick={vFunc}
                />
              </Card.Body>
            </Card>

            <Card className=" mb-2">
              <Card.Body>
                <FirstVit />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default HometScreen;
