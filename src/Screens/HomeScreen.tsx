import React, { useState, FC } from "react";

import { IUsers } from "../inrefaces";

// import CanvasVit from "../Components/CanvasVit";
import { Card, Col, Container, Row } from "react-bootstrap";
import AxiosVit from "../Components/AxiosVit";
import ButtonVit from "../Components/ButtonVit";
import FirstVit from "../Components/FirstVit";

const HometScreen: FC = () => {
  const [data, setData] = useState<IUsers[] | undefined>([]);
  const [user, setUser] = useState<string>("Нет данных");

  const vFunc = (i: string) => {
    const dataUrl = { GetTable: "users" };
    AxiosVit({ dataUrl, setData });

    //консоль 03 Июнь 2025 (вторник)
    console.log(">>>> data из (DevelopmentScreen):", data); //консоль
    console.log(">>>> i из (DevelopmentScreen):", i); //консоль
    if (data && data[0]) {
      setUser(data[0].name);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className=" my-2">
              <Card.Body>
                <p>Чтение из Базы данных</p>
                <p>{user}</p>
                <ButtonVit
                  icon="Activity"
                  name="Тестовый запрос"
                  onClick={() => vFunc("123")}
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
      </Container>
    </>
  );
};

export default HometScreen;
