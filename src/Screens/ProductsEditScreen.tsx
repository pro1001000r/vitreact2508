import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";

import AxiosVit from "../Components/AxiosVit";
import SelectVit from "../Components/SelectVit";
// import TableStocktaking from "../Components/TableStocktaking";
import InputVit from "../Components/InputVit";
import ButtonVit from "../Components/ButtonVit";
import {
  ICommand,
  IGetTableById,
  IProducts,
  IUpdateTableById,
} from "../inrefaces";
// import TableBarcode from "../Components/TableBarcode";

const ProductsEditScreen: FC = () => {
  //1.Безопасность странички
  // Security();

  //Параметры и навигация
  const params = useParams();
  const navigate = useNavigate();

  //2. Тупая Проверка на параметры:
  if (params.id == undefined) {
    navigate(-1);
  }

  console.log(">>>>params1 >>>>:", params); //консоль

  //данные странички
  const [data, setData] = useState<IProducts>();
  const [load, setLoad] = useState(false);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [compositions, setCompositions] = useState<number>(0);

  //Собираем данные из базы
  const getItem = () => {
    const dataUrl: IGetTableById = {
      command: ICommand.GetTableById,
      data: {
        tableName: "products",
        tableId: Number(params.id),
      },
    };
    AxiosVit({ dataUrl, setData });
  };

  //Сохраняем изменения и уходим со странички
  const UpdateProducts = () => {
    const dataUrl: IUpdateTableById = {
      command: ICommand.UpdateTableById,
      data: {
        tableName: "products",
        tableId: Number(params.id),
        vp: data,
      },
    };
    AxiosVit({ dataUrl });

    //Пока не уходим
    //navigate(-1);
  };
  //Первый рендеринг
  useEffect(() => {
    getItem();
    //консоль 31 Август 2025 (воскресенье)
    console.log(">>>> data из (ProductsEditScreen):", data); //консоль
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCompositions(data.compositions_id || 0);
      setPrice(data.price || 0);
    }
    console.log(">>>>data>>>>:", data); //консоль
    console.log(">>>>name>>>>:", name); //консоль
  }, [data]);

  return (
    <>
      <Container>
        <Row>
          <Col className=" text-center">
            <h3>Товар (редактирование)</h3>
          </Col>
        </Row>

        <InputVit
          value={name}
          onChange={setName}
          placeholder="Наименование..."
        />

        <InputVit value={price} onChange={setPrice} placeholder="Цена..." type="number" />
        <SelectVit
          tableName={"compositions"}
          id={compositions}
          setId={setCompositions}
          placeholder="Выберите состав..."
        />
        <br />
        <ButtonVit
          name="Назад"
          onClick={() => navigate(-1)}
          className=" btn-primary"
        />
        <ButtonVit
          name="Сохранить"
          onClick={UpdateProducts}
          className=" btn-primary"
        />

        <Accordion className="my-1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <b>Штрихкоды...</b>
            </Accordion.Header>
            <Accordion.Body>
              <Row>{/* <TableBarcode productsId={params.id} /> */}</Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion className="my-1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <b>Подробнее об инвентаризации...</b>
            </Accordion.Header>
            <Accordion.Body>
              {/* style={{ width: 200 }} */}
              <Row>
                {/* <TableStocktaking
                  tableName={"products_id"}
                  tableId={params.id}
                /> */}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

export default ProductsEditScreen;
