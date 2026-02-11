import React, { FC, useContext, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useAxiosVit } from "../Components/useAxiosVit";
import {
  ICommand,
  IDataUrl,
  IGetTableById,
  IUpdateTableById,
  IUsers,
} from "../inrefaces";
import InputVit from "../Components/InputVit";

import SelectVit from "../Components/SelectVit";
import ButtonVit from "../Components/ButtonVit";
// import { ContextVit } from "../Components/ContextVit";
import GetName from "../Components/GetName";
import AxiosVit from "../Components/AxiosVit";
import {
  useStoreZustandVit,
  useUserSession,
} from "../Components/useStoreZustandVit";
import { UpdatePlaceId } from "../Components/UpdatePlaceId";
import TableStocktaking from "../Components/TableStocktaking";

const CabinetScreen: FC = () => {
  //let id = sessionStorage.userId;

  const user = useUserSession();
  //const { userSession } = useContext(ContextVit);
  //консоль 14 Ноябрь 2025 (пятница)
  // console.log(">>>> userSession из (CabinetScreen):", userSession); //консоль

  // const {setUserSession} = useStoreZustandVit();
  const [usersname, setUsersname] = useState(user.name);
  const [storage, setStorage] = useState(user.storage_id);
  const [place, setPlace] = useState(user.place_id);
  const [telefon, setTelefon] = useState(user.telefon);

  // const dUser = useAxiosVit<IGetTableById>({
  //   command: ICommand.GetTableById,
  //   data: { tableName: "users", tableId: userSession.id },
  // });

  // let user: any = dUser.data;

  let status = "";

  //Сохраняем изменения и уходим со странички
  const UpdateUser = () => {
    const dataUrl1 = {
      UpdateTableById: {
        tableName: "users",
        tableId: user.id,
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

    const dataUrl2: IDataUrl = {
      command: ICommand.UpdateTableById,
      data: {
        tableName: "users",
        tableId: user.id,
        vp: {
          name: usersname,
          storage_id: storage,
          place_id: place,
          telefon: telefon,
        },
      },
    };

    //консоль 14 Ноябрь 2025 (пятница)
    console.log(">>>> dataUrl2 из (CabinetScreen):", dataUrl2); //консоль

    AxiosVit({ dataUrl: dataUrl2 });

    if (place) {
      UpdatePlaceId(place);
    }
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
              <b>{user.name} </b>
              {status}
              <br />
              место проведения инвентаризации:{" "}
              <b>
                <GetName table="place" id={user.place_id} />
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
      <ButtonVit
        className="m-2"
        icon="CardChecklist"
        name="Инвентаризация"
        href="/Stocktaking"
      />
      <ButtonVit
        className="m-2"
        icon="Inboxes"
        name="Каталог"
        href="/Products"
      />
      <ButtonVit
        className="m-2"
        icon="BoxSeam"
        name="Места хранения"
        href="/Place"
      />

      <TableStocktaking tableName={"users_id"} tableId={user.id} />
    </Container>
  );
};
export default CabinetScreen;
