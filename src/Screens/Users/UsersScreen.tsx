import React, { useEffect, useState, FC } from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import { ICommand, IGetTable, IUsers } from "../../inrefaces";
import TableVit from "../../Components/TableVit";
import AxiosVit from "../../Components/AxiosVit";
import StocktakingCount from "../../Components/StocktakingCount";
import ButtonVit from "../../Components/ButtonVit";
import StatusUser, { STATUS_DISPLAY } from "../../Components/StatusUser";

export default function UsersScreen() {
  const [users, setUsers] = useState<IUsers[]>([]);

  useEffect(() => {
    const GetUsers = () => {
      const dataUrl: IGetTable = {
        command: ICommand.GetTable,
        data: {
          tableName: "users",
        },
      };

      AxiosVit({ dataUrl, setData: setUsers });
    };

    GetUsers();
  }, []);

  //показ самой таблицы в отдельной компоненте
  let listUsers = users.map((item) => {
    // let status: string = item.status ?? "unknown";

    let status = StatusUser(item.status);
    //мапим массив
    return (
      <div key={item.id}>
        <Card className="m-2 vShadow">
          <Card.Body>
            <Card.Title>
              <Nav.Link href={"/UserEdit/" + item.id}>{item.name}</Nav.Link>
            </Card.Title>
            {status}
            <StatusUser status={item.status} />
            <Row>
              <Col>
                {" "}
                код: {item.id}
                <p>{item.active && "Активный"}</p>
              </Col>
              <Col>
                <ButtonVit name="ред." href={"/UserEdit/" + item.id} />
                <br />
                проинвентаризировано:{" "}
                <b>
                  <StocktakingCount tableName={"users_id"} tableId={item.id} />
                </b>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  });

  return (
    <>
      <Row>
        <Col>Пользователи</Col>
      </Row>{" "}
      <ButtonVit name="Создать +" href={"/UserEdit/0"} />
      <Row>{listUsers}</Row>
    </>
  );
}
