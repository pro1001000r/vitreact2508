import React, { FC, useState } from "react";
import AxiosVit from "../../Components/AxiosVit";
import { ICommand, ICreateTableItem, IPlace } from "../../interfaces";
import { useUserSession } from "../../Components/useStoreZustandVit";
import InputVit from "../../Components/InputVit";
import ButtonVit from "../../Components/ButtonVit";
import { useNavigate } from "react-router-dom";
import GetName from "../../Components/GetName";
import { Container } from "react-bootstrap";

const PlaceNewScreen: FC = () => {
  const User = useUserSession();

  const [name, setName] = useState("");
  const navigate = useNavigate();
  //Сохраняем изменения и уходим со странички

  const CreatePlace = () => {
    const dataUrl: ICreateTableItem = {
      command: ICommand.CreateTableItem,
      data: {
        tableName: "place",
        vp: { name: name, storage_id: User.storage_id },
      },
    };
    AxiosVit({ dataUrl });
    navigate(-1);
  };
  return (
    <Container>
      <h3>Место хранения(Создание)</h3>
      <InputVit value={name} onChange={setName} />
      <GetName table={"storage"} id={User.storage_id} />
      <ButtonVit name="Назад" onClick={() => navigate(-1)} />
      <ButtonVit name="Сохранить" onClick={CreatePlace} />
    </Container>
  );
};

export default PlaceNewScreen;
