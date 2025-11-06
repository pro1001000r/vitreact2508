import React, { FC, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useAxiosVit } from "../Components/useAxiosVit";
import { ICommand, IGetTableById, IUsers } from "../inrefaces";
import InputVit from "../Components/InputVit";
import GetName from "../Components/GetName";
import SelectVit from "../Components/SelectVit";
import ButtonVit from "../Components/ButtonVit";
import AxiosVit from "../Components/AxiosVit";

const CabinetScreen: FC = () => {
  let id = sessionStorage.userId;

  const [usersname, setUsersname] = useState("");
  const [storage, setStorage] = useState();
  const [place, setPlace] = useState();
  const [telefon, setTelefon] = useState();

  const dUser = useAxiosVit<IGetTableById>({
    command: ICommand.GetTableById,
    data: { tableName: "users", tableId: id },
  });

  let user: any = dUser.data;

  let status = "";

  //Сохраняем изменения и уходим со странички
  const UpdateUser = () => {
    const dataUrl1 = {
      UpdateTableById: {
        tableName: "users",
        tableId: id,
        vp: {
          name: usersname,
          storage_id: storage,
          place_id: place,
          telefon: telefon,
        },
      },
    };

    //консоль 12 Май 2025 (понедельник)
    console.log(">>>> dataUrl из (CabinetScreen):", dataUrl1); //консоль

    //AxiosVit(dataUrl1);

  };

  if (user != undefined) {
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

  return (
    <Container>
      <Row>
        <Col className=" text-center">
          <h3>Кабинет пользователя</h3>
          {status}
        </Col>
      </Row>
      <Accordion className="mb-1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <p>
              {/* <b>{user!.name} </b> */}
              {status}
              <br />
              место проведения инвентаризации:{" "}
              <b>
                {/* <GetName table="place" id={user.place_id} /> */}
              </b>
              <br />
              {/* склад: <GetName table="storage" id={user.storage_id} /> */}
              <br />
              {/* телефон: {user.telefon} */}
              <br />
              {/* логин: {user.login} */}
            </p>
          </Accordion.Header>
          <Accordion.Body>
            {/* className="d-flex small justify-content-end align-items-end" */}
            <Row>
              <InputVit
                value={usersname}
                onChange={setUsersname}
                placeholder="Имя..."
              />

              <InputVit
                value={telefon}
                onChange={setTelefon}
                placeholder="Телефон..."
              />

              {/* Вносим изменения по складу */}
              <SelectVit
                className="mb-3"
                tableName={"storage"}
                id={Number(storage)}
                setId={setStorage}
              />
              {/* Вносим изменения по месту инвентаризации */}
              <SelectVit
                className="mb-3"
                tableName={"place"}
                id={Number(place)}
                setId={setPlace}
              />
            </Row>
            <ButtonVit
              name="Сохранить"
              onClick={UpdateUser}
              className=" btn-primary"
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
export default CabinetScreen;
