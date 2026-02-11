import React, { FC, useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import {
  useCounterUpdate,
  useUserSession,
} from "../Components/useStoreZustandVit";
import ModalVit from "../Components/ModalVit";
import ScanerVit from "../Components/ScanerVit";
import ButtonVit from "../Components/ButtonVit";
import SelectVit from "../Components/SelectVit";
import Stocktaking from "../Components/Stocktaking";
import { ICommand, IDataUrl, IStocktaking } from "../inrefaces";
import TableStocktaking from "../Components/TableStocktaking";
import AxiosVit from "../Components/AxiosVit";
import NavBottomStocktakingVit from "../Components/NavBottomStocktakingVit";
import { UpdatePlaceId } from "../Components/UpdatePlaceId";
import InputVit from "../Components/InputVit";
import { SpeakVit } from "../Components/SpeakVit";
interface IScan {
  products_id: number;
  productsColor_id: number;
  productsSize_id: number;
  errorScan: boolean;
}
const StocktakingScreen: FC = () => {
  const User = useUserSession();
  const counterUpdate = useCounterUpdate();
  const [show, setShow] = useState<boolean>(false);
  const [scan, setScan] = useState<string>("");

  const [color, setColor] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [prod, setProd] = useState<number>(0);

  const [data, setData] = useState<IScan>();

  const GetProductByBarcode = (scan: string) => {
    if (scan) {
      const dataUrl: IDataUrl = {
        command: "GetProductByBarcode",
        data: scan,
      };

      AxiosVit({ dataUrl, setData });
    }
  };

  useEffect(() => {
    // Эта логика сработает только после того, как состояние 'data' будет успешно обновлено
    console.log(">>>> data обновлено в useEffect:", data);

    if (data?.products_id) {
      //console.log("работает, данные актуальны:", data); //консоль

      // Обновляем связанные состояния
      setProd(Number(data.products_id));
      setColor(Number(data.productsColor_id));
      setSize(Number(data.productsSize_id));

      const item: IStocktaking = {
        products_id: data.products_id,
        productsColor_id: data.productsColor_id,
        productsSize_id: data.productsSize_id,
        count: 1,
        users_id: User.id,
        storage_id: User.storage_id,
        place_id: User.place_id,
        barcode: scan,
      };

      Stocktaking(item);
      setScan(""); // Очистка скана должна происходить здесь, если это нужно
    }
  }, [data, User]); // Зависимость: от data и User

  const UpdateStocktaking = (count: number) => {
    const item: IStocktaking = {
      products_id: prod,
      productsColor_id: color,
      productsSize_id: size,
      count: count,
      users_id: User.id,
      storage_id: User.storage_id,
      place_id: User.place_id,
      barcode: scan,
    };

    Stocktaking(item);
  };

  useEffect(() => {
    if (scan) {
      GetProductByBarcode(scan);
    }
  }, [scan]);

  const setPlace = (i: number) => {
    if (i) {
      UpdatePlaceId(i);

      setData({
        ...data,
        products_id: 0,
        productsColor_id: 0,
        productsSize_id: 0,
        errorScan: false,
      });

      const dataUrl2: IDataUrl = {
        command: ICommand.UpdateTableById,
        data: {
          tableName: "users",
          tableId: User.id,
          vp: {
            place_id: i,
          },
        },
      };

      AxiosVit({ dataUrl: dataUrl2 });
    }
  };

  return (
    <>
      <ModalVit show={show} setShow={setShow}>
        <ScanerVit setScan={setScan} setShow={setShow} />
      </ModalVit>
      <NavBottomStocktakingVit setShow={setShow} />
      <Container>
        <h3 className=" text-center">Инвентаризация ({User.name})</h3>
        <SelectVit
          tableName={"place"}
          id={User.place_id!}
          setId={setPlace}
          placeholder="Место проведения инвентаризации..."
        />
        <Row>
          <b>{counterUpdate}</b>
          {data?.errorScan && (
            <span style={{color: 'red'}}>
              <b>Штрихкод не найден {scan}</b>
              <SpeakVit text={'Штрихкод не найден. скан ' + counterUpdate} />
            </span>
            
          )}
          {/* <InputVit value={scan} onChange={setScan} placeholder="штрихкод..." /> */}
          <ButtonVit
            icon="UpcScan"
            name="Сканировать"
            onClick={() => setShow(true)}
          />
        </Row>

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
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <TableStocktaking
          tableName={"place_id"}
          tableId={User.place_id}
          invent={true}
          counter={counterUpdate}
        />
      </Container>
    </>
  );
};
export default StocktakingScreen;
