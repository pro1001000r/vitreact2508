import React, { useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosVit from "../../Components/AxiosVit";
import SelectVit from "../../Components/SelectVit";
import { ICommand, IGetTableById, IPlace, IUpdateTableById } from "../../inrefaces";
import { Container } from "react-bootstrap";
import InputVit from "../../Components/InputVit";
import ButtonVit from "../../Components/ButtonVit";
import TableStocktaking from "../../Components/TableStocktaking";

const PlaceEditScreen: FC = () => {
  const [data, setData] = useState<IPlace>();
  const [storage, setStorage] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  //Собираем данные из базы
  const getItem = () => {
    const dataUrl: IGetTableById = {
      command: ICommand.GetTableById,
      data: {
        tableName: "place",
        tableId: Number(params.id),
      },
    };
    AxiosVit({ dataUrl, setData });
  };

  //Сохраняем изменения и уходим со странички
  const UpdatePlace = () => {
    const dataUrl: IUpdateTableById = {
      command: ICommand.UpdateTableById,
      data: {
        tableName: "place",
        tableId: Number(params.id),
        vp: {
          storage_id: storage,
          name: name,
        },
      },
    };

    AxiosVit({ dataUrl });
    navigate(-1);
  };

  //Первый рендеринг
  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
      if (data) {
        setName(data.name);
        setStorage(data.storage_id!);
      }
  
      //console.log(">>>>place>>>>:", data); //консоль
    }, [data]);
  

  return (
    <>
      <Container>
        <h3>Место хранения</h3>
        <InputVit value={name} onChange={setName} />
        <SelectVit tableName={"storage"} id={storage} setId={setStorage} />
        <ButtonVit name="Назад" onClick={() => navigate(-1)} />
        <ButtonVit name="Сохранить" onClick={UpdatePlace} />
        <TableStocktaking
                        tableName={"place_id"}
                        tableId={Number(params.id)}
                      />
      </Container>
    </>
  );
};
export default PlaceEditScreen;
