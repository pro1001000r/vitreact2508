import React, { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import SpinnerLoadVit from "./SpinnerLoadVit";
import ButtonVit from "./ButtonVit";
import { ICommand, IGetTable, IUsers } from "../inrefaces";
import GetProperty from "./GetProperty";
import AxiosVit from "./AxiosVit";
import { ContextVit } from "./ContextVit";

const TestVit: FC = () => {
  const [data, setData] = useState<IUsers[] | undefined>([]);
  const [user, setUser] = useState<string>("Нет данных");
  const [load, setLoad] = useState<boolean>(true);
  const cont = useContext(ContextVit);

  const login = GetProperty("users", 1, "login");
  const vFunc = () => {
    setLoad(false);
    const dataUrl: IGetTable = {
      command: ICommand.GetTable,
      data: {
        tableName: "users",
      },
    };
    AxiosVit({ dataUrl, setData, setLoad });
    //cont.texttest = "Сработал клик";
    
    //консоль 02 Сентябрь 2025 (вторник)
    console.log('>>>> cont из (TestVit):', cont); //консоль
    

    if (data && data[0]) {
      setUser(data[0].name);
    }
  };

  return (
    <>
      <Card className=" my-2">
        <Card.Body>
          <p>Чтение из Базы данных</p>
          <SpinnerLoadVit load={load} />
          <p>
            {user} логин: {login}{" "}
          </p>
          <ButtonVit icon="Activity" name="Тестовый запрос" onClick={vFunc} />
        </Card.Body>
      </Card>
      <Card className=" mb-2">
        {/* <Card.Body>Контекст = {cont.texttest} </Card.Body> */}
      </Card>
    </>
  );
};
export default TestVit;
