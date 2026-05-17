import { useEffect, useState } from "react";
import { ICommand, IDataUrl, IGetTableById, IUsers } from "../../inrefaces";
import { Accordion, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AxiosVit from "../../Components/AxiosVit";
import TableStocktaking from "../../Components/TableStocktaking";
import StatusUser from "../../Components/StatusUser";
import GetName from "../../Components/GetName";
import InputVit from "../../Components/InputVit";
import SelectVit from "../../Components/SelectVit";
import { useUserSession } from "../../Components/useStoreZustandVit";
import ButtonVit from "../../Components/ButtonVit";
import { Prev } from "react-bootstrap/cjs/PageItem";
import StocktakingCount from "../../Components/StocktakingCount";

export default function UsersEditScreen() {
  // const [data, setData] = useState<IUsers>();
  const params = useParams();

  // пустые значения
  const [user, setUser] = useState<IUsers>({
    id: 0,
    name: "",
    login: "",
    password: "",
    active: false,
    status: "U",
    storage_id: undefined,
    place_id: undefined,
    telefon: undefined,
  });

  // function setUser1(data1) {
  //   setUser((prev) =>{...prev, data1})
  // }

  // const [usersname, setUsersname] = useState(user.name);
  // const [storage, setStorage] = useState(user.storage_id);
  // const [place, setPlace] = useState(user.place_id);
  // const [telefon, setTelefon] = useState(user.telefon);

  //Собираем данные из базы
  const GetUser = () => {
    if (params.id) {
      const dataUrl: IGetTableById = {
        command: ICommand.GetTableById,
        data: {
          tableName: "users",
          tableId: Number(params.id),
        },
      };
      AxiosVit({ dataUrl, setData: setUser });
    }
  };

  //Сохраняем изменения и уходим со странички
  const UpdateUser = () => {
    const dataUrl: IDataUrl = {
      command: ICommand.UpdateTableById,
      data: {
        tableName: "users",
        tableId: user.id,
        vp: {
          name: user.name,
          login: user.login,
          password: user.password,
          storage_id: user.storage_id,
          place_id: user.place_id,
          telefon: user.telefon,
        },
      },
    };

    AxiosVit({ dataUrl: dataUrl });
  };

  //Сохраняем изменения и уходим со странички
  const CreateUser = () => {
    const dataUrl: IDataUrl = {
      command: ICommand.CreateTableItem,
      data: {
        tableName: "users",
        vp: {
          name: user.name,
          login: user.login,
          password: user.password,
          status: "U",
          active: true,
          storage_id: user.storage_id,
          place_id: user.place_id,
          telefon: user.telefon,
        },
      },
    };

    AxiosVit({ dataUrl: dataUrl });
  };

  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {
    // console.log(">>>> setUser из (UserEditScreen):", user); //консоль
    // console.log(">>>> id из (UserEditScreen):", user.id); //консоль
  }, [user]);

  const handleChange = (
    field: keyof IUsers,
    value: string | number | boolean | null,
  ) => {
    setUser((prev) => {
      if (!prev) {
        return {
          id: 0,
          name: "",
          login: "",
          password: "",
          active: false,
          status: "U",
          storage_id: undefined,
          place_id: undefined,
          telefon: undefined,
          [field]: value,
        };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <>
      <Container>
        <h3>{user?.name} </h3>
        {user?.status}
        <br />
        <StatusUser status={user?.status} />
        <br />
        {/* <TableStocktaking tableName={"users_id"} tableId={Number(data?.id)} /> */}
        <Accordion className="mb-1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <p>
                <b>{user.name} </b>
                <br />
                место проведения инвентаризации:
                <b>
                  <GetName table="place" id={user.place_id} />
                </b>
                <br />
                склад: <GetName table="storage" id={user.storage_id} />
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
                  value={user.name ?? ""}
                  onChange={(value) => handleChange("name", value)}
                  placeholder="Имя..."
                />
                <p>login:</p>
                <InputVit
                  value={user.login ?? ""}
                  onChange={(value) => handleChange("login", value)}
                  placeholder="login..."
                />
                <p>password:</p>
                <InputVit
                  value={user.password ?? ""}
                  onChange={(value) => handleChange("password", value)}
                  placeholder="password..."
                />
                <p>телефон:</p>
                <InputVit
                  value={user.telefon ?? ""}
                  onChange={(value) => handleChange("telefon", value)}
                  placeholder="Телефон..."
                />
                <p>склад:</p>
                {/* Вносим изменения по складу */}
                <SelectVit
                  className="mb-3"
                  tableName={"storage"}
                  id={Number(user.storage_id)}
                  setId={(value) => handleChange("storage_id", value)}
                />
                <p>место инвентаризации:</p>
                {/* Вносим изменения по месту инвентаризации */}
                <SelectVit
                  className="mb-3"
                  tableName={"place"}
                  id={Number(user.place_id)}
                  setId={(value) => handleChange("place_id", value)}
                />
              </Row>
              {user.id && (
                <ButtonVit
                  name="Сохранить"
                  onClick={UpdateUser}
                  className=" btn-primary"
                />
              )}
              {!user.id && (
                <ButtonVit
                  name="Создать"
                  onClick={CreateUser}
                  className=" btn-primary"
                />
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {user?.id && (
          <Accordion className="mb-1">
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <p>
                  проинвентаризировано:{" "}
                  <b>
                    <StocktakingCount
                      tableName={"users_id"}
                      tableId={user.id}
                    />
                  </b>
                </p>
              </Accordion.Header>
              <Accordion.Body>
                <TableStocktaking tableName={"users_id"} tableId={user.id} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Container>
    </>
  );
}
