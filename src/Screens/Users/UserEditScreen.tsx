import { useEffect, useState } from "react";
import { ICommand, IDataUrl, IDeleteTableById, IGetTableById, IUsers } from "../../interfaces";
import { Accordion, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AxiosVit from "../../Components/AxiosVit";
import TableStocktaking from "../../Components/TableStocktaking";
import StatusUser from "../../Components/StatusUser";
import GetName from "../../Components/GetName";
import InputVit from "../../Components/InputVit";
import SelectVit from "../../Components/SelectVit";
import ButtonVit from "../../Components/ButtonVit";
import StocktakingCount from "../../Components/StocktakingCount";
import { useUserSession } from "../../Components/useStoreZustandVit";

declare var confirm: (q: string) => boolean; //объявление типа confirm

export default function UsersEditScreen() {
  
  const params = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState<number>(Number(params.id));

  const usersession = useUserSession();

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

  //
  const [notS, setNotS] = useState(false);

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
      AxiosVit({ dataUrl, setData:setUser});
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
          active: user.active,
          status: user.status,
          login: user.login,
          password: user.password,
          storage_id: user.storage_id,
          place_id: user.place_id,
          telefon: user.telefon,
        },
      },
    };

    AxiosVit({ dataUrl: dataUrl });
    navigate("/UserEdit/" + user.id);
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

    AxiosVit({ dataUrl: dataUrl , setData: setId });
  };

  useEffect(() => {
    if (id) {
      navigate("/UserEdit/" + id);
    }
    
    //консоль 22 Май 2026 (пятница)
    console.log('>>>> id из (UserEditScreen):', id); //консоль
    
  }, [id]);

  const DeleteUser = () => {
    const isrem = confirm("вы уверены что хотите удалить?"); //!!!!!!! confirm
    if (isrem) {
      const dataUrl: IDeleteTableById = {
        command: ICommand.DeleteTableById,
        data: {
          tableName: "users",
          tableId: Number(params.id),
        },
      };
      AxiosVit({ dataUrl });

      //Пока не уходим
      navigate("/Users/");
    }
  };
  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {
    // console.log(">>>> setUser из (UserEditScreen):", user); //консоль
    // console.log(">>>> id из (UserEditScreen):", user.id); //консоль
    
    // setNotS(true);
    // if (user?.status === "S") {
    //   setNotS(false);
    // }
    
    if (user?.id) {
      navigate("/UserEdit/" + user.id);
    }
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
         №<b>{id} </b>
        <h3>{user?.name} </h3>
        {user?.status}
        <br />
        <StatusUser status={user?.status} />
        <br />
        <ButtonVit
          name="Назад"
          onClick={() => navigate(-1)}
          className=" btn-primary"
        />
        <ButtonVit
          name="Пользователи"
          onClick={() => navigate("/Users/")}
          className=" btn-primary"
        />
         {/* <ButtonVit
          name="Удалить"
          onClick={DeleteUser}
          className=" btn-danger"
        /> */}
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
             {notS && ( 
            <Accordion.Body>
              <Row>
                <InputVit
                  value={user.name ?? ""}
                  onChange={(value) => handleChange("name", value)}
                  placeholder="Имя..."
                />
                {notS && (
                  <>
                    <Col>
                      <Form.Check // prettier-ignore
                        style={{ left: "1" }}
                        type="switch"
                        label="Активный"
                        checked={user.active}
                        onChange={(e) => {
                          // console.log("Новое состояние:", e.target.checked);
                          handleChange("active", e.target.checked);
                        }}
                      />
                    </Col>

                    <Form.Select
                      aria-label="Выберите статус"
                      value={user?.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                    >
                      <option value="A">Администратор</option>
                      <option value="W">Сотрудник</option>
                      <option value="U">Пользователь</option>
                    </Form.Select>
                  </>
                )}

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
              {id && (
                <ButtonVit
                  name="Сохранить"
                  onClick={UpdateUser}
                  className=" btn-primary"
                />
              )}
              {!id && (
                <ButtonVit
                  name="Создать"
                  onClick={CreateUser}
                  className=" btn-primary"
                />
              )}
            </Accordion.Body> )}
            
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
