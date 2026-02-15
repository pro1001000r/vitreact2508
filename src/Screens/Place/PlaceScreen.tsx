import React, { useEffect, useState } from "react";
import AxiosVit from "../../Components/AxiosVit";
import { ICommand, IGetTable, IPlace } from "../../inrefaces";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import GetName from "../../Components/GetName";
import { useNavigate } from "react-router-dom";
import StocktakingCount from "../../Components/StocktakingCount";

const PlaceScreen = () => {
  const [data, setData] = useState<IPlace[]>([]);

  const navigate = useNavigate();

  const PlaceList = () => {
    const dataUrl: IGetTable = {
      command: ICommand.GetTable,
      data: {
        tableName: "place",
      },
    };

    AxiosVit({ dataUrl, setData });
  };

  //показ самой таблицы в отдельной компоненте
  let listCardsPlace = data.map((item) => {
    //мапим массив
    return (
      <div key={item.id}>
        <Card className="m-2 vShadow">
          <Card.Body>
            <Nav.Link href={"/PlaceEdit/" + item.id}>
              <Card.Title>{item.name}</Card.Title>
            </Nav.Link>

            <GetName table={"storage"} id={item.storage_id} />

            <Card.Text className="small">
              <Row>
                {" "}
                <Col> код: {item.id} </Col>
                <Col>
                  позиций: <b><StocktakingCount tableName={"place_id"} tableId={item.id} /></b>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });

  //сбор данных в первый раз при инциализации
  useEffect(() => {
    PlaceList();
  }, []);

  useEffect(() => {
    console.log(">>>> места хранения >>>>:", data); //консоль
  }, [data]);

  if (data.length === 0) {
    return;
  }

  return (
    <Container>
      <Button variant="primary" onClick={() => navigate("/PlaceNew")}>
        Добавить место хранения (+)
      </Button>
      {data && <Row>{listCardsPlace}</Row>}
    </Container>
  );
};

export default PlaceScreen;
