import React, { FC, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useUserSession } from "../Components/useStoreZustandVit";
import ModalVit from "../Components/ModalVit";
import ScanerVit from "../Components/ScanerVit";
import ButtonVit from "../Components/ButtonVit";
import SelectVit from "../Components/SelectVit";
import Stocktaking from "../Components/Stocktaking";
import { IStocktaking } from "../inrefaces";
import TableStocktaking from "../Components/TableStocktaking";

const StocktakingScreen: FC = () => {
  const User = useUserSession();
  const [show, setShow] = useState(false);
   const [load, setLoad] = useState(0);
  const [scan, setScan] = useState<string>("Нет скана");

  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);
  const [prod, setProd] = useState(0);

  const UpdateStocktaking = (count:number) => {
    const item: IStocktaking = {
      products_id: prod,
      productsColor_id: color,
      productsSize_id: size,
      count: count,
      users_id: User.id,
      storage_id: User.storage_id,
      place_id: User.place_id,
    };
    
    //консоль 24 Ноябрь 2025 (понедельник)
    console.log('>>>> item из (StocktakingScreen):', item); //консоль
    
    Stocktaking(item);
  };

  return (
    <>
      <ModalVit show={show} setShow={setShow}>
        <ScanerVit setScan={setScan} />
      </ModalVit>
      <Container>
        <h3 className=" text-center">Инвентаризация ({User.name})</h3>

        <p>{scan}</p>
        <ButtonVit
          icon="UpcScan"
          name="Сканировать"
          onClick={() => setShow(true)}
        />
        <Accordion className="mb-1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Внести вручную...
              <br />
            </Accordion.Header>
            <Accordion.Body>
              <SelectVit
                className="mb-1"
                tableName={"products"}
                id={prod}
                setId={setProd}
                placeholder="Введите товар..."
              />

              <SelectVit
                className="mb-1"
                tableName={"productsColor"}
                id={color}
                setId={setColor}
                placeholder="Введите цвет..."
              />

              <SelectVit
                tableName={"productsSize"}
                id={size}
                setId={setSize}
                placeholder="Введите размер..."
              />
              <Row>
                <Col className="text-end">
                  {" "}
                  <ButtonVit
                    name={"+ добавить"}
                    onClick={() => {
                      UpdateStocktaking(1);
                    }}
                  ></ButtonVit>
                  <ButtonVit
                    name={"- не надо добавить"}
                    onClick={() => {
                      // UpdateStocktaking(-1);
                    }}
                  ></ButtonVit>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <TableStocktaking
                  tableName={"place_id"}
                  tableId={User.place_id}
                  invent={true}
                  counter={load}
                />
      </Container>
    </>
  );
};
export default StocktakingScreen;
