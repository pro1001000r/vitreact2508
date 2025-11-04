import React, { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAxiosVit } from "../Components/useAxiosVit";
import { ICommand, IDataUrl, IGetTableById, IUsers } from "../inrefaces";

const CabinetScreen: FC = () => {

  let id = sessionStorage.userId;

  //консоль 04 Ноябрь 2025 (вторник)
  console.log(">>>> id из (CabinetScreen):", id); //консоль

  const dUser = useAxiosVit<IGetTableById>({
    command: ICommand.GetTableById,
    data: { tableName: "users", tableId: id },
  });

  //консоль 04 Ноябрь 2025 (вторник)
  console.log(">>>> dUser из кабинета:", dUser); //консоль

  let user: any = dUser.data;

  let status = "";

  if (user !== undefined) {
    console.log(">>>> user из статуса:", user); //консоль
    switch (user.status) {
      case "U":
        status = "Пользователь";
        break;
      case "W":
        status = "Сотрудник";
        break;
      case "A":
        status = "Администратор";
        break;
      case "S":
        status = "Программист";
        break;
      default:
        status = "неведомо как...";
        break;
    }
  }

  // if (user.status != null) {

  //   switch (user.data!.status) {
  //     case "U":
  //       status = "Пользователь";
  //       break;
  //     case "W":
  //       status = "Сотрудник";
  //       break;
  //     case "A":
  //       status = "Администратор";
  //       break;
  //     case "S":
  //       status = "Программист";
  //       break;
  //     default:
  //       status = "неведомо как...";
  //       break;
  //   }
  // }

  return (
    <Container>
      <Row>
        <Col className=" text-center">
          <h3>Кабинет пользователя</h3>
          {status}
        </Col>
      </Row>
    </Container>
  );
};
export default CabinetScreen;
