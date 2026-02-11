import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Accordion,
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";

import AxiosVit from "../../Components/AxiosVit";
import SelectVit from "../../Components/SelectVit";
// import TableStocktaking from "../Components/TableStocktaking";
import InputVit from "../../Components/InputVit";
import ButtonVit from "../../Components/ButtonVit";
import {
  ICommand,
  IDeleteTableById,
  IGetTableById,
  IProducts,
  IUpdateTableById,
} from "../../inrefaces";
import ImageUpload from "../../Components/ImageUpload";
import axios, { AxiosRequestConfig } from "axios";
import ImageVit from "../../Components/ImageVit";
import UploadFilesVit from "../../Components/UploadFilesVit";
import SliderVit from "../../Components/SliderVit";
import TableStocktaking from "../../Components/TableStocktaking";
import TableBarcode from "../../Components/TableBarcode";


declare var confirm: (q: string) => boolean; //объявление типа confirm

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

  // console.log(">>>>params1 >>>>:", params); //консоль

  const [croppedImage, setCroppedImage] = useState<string>();
  const [fullImage, setFullImage] = useState<string>();
  const [fileName, setFileName] = useState<string>("");
  const [fileInput, setFileInput] = useState<any>();

  const [selectedImage, setSelectedImage] = useState<File>();
  const [progress, setProgress] = useState<number>(0);

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
    const output: IProducts = {
      name: name,
      compositions_id: compositions,
      price: price,
    };
    const dataUrl: IUpdateTableById = {
      command: ICommand.UpdateTableById,
      data: {
        tableName: "products",
        tableId: Number(params.id),
        vp: output,
      },
    };
    AxiosVit({ dataUrl });

    //Пока не уходим
    navigate(-1);
  };

  const DeleteProducts = () => {
    const isrem = confirm("вы уверены что хотите удалить?"); //!!!!!!! confirm
    if (isrem) {
      const dataUrl: IDeleteTableById = {
        command: ICommand.DeleteTableById,
        data: {
          tableName: "products",
          tableId: Number(params.id),
        },
      };
      AxiosVit({ dataUrl });

      //Пока не уходим
      navigate(-1);
    }
  };
  //Первый рендеринг
  useEffect(() => {
    getItem();
    //консоль 31 Август 2025 (воскресенье)
    // console.log(">>>> data из (ProductsEditScreen):", data); //консоль
  }, []);

  useEffect(() => {
    if (load) {
      getItem();
    }
  }, [load]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCompositions(data.compositions_id || 0);
      setPrice(data.price || 0);
    }
  }, [data]);

  return (
    <>
      <Container>
        <Row>
          <Col className=" text-center">
            <h4>Товар (редактирование)</h4>
          </Col>
        </Row>
        <Row className="text-end mb-3">
          <ImageVit foto={data?.foto} />
        </Row>
        <InputVit
          value={name}
          onChange={setName}
          placeholder="Наименование..."
        />

        <InputVit
          value={price}
          onChange={setPrice}
          placeholder="Цена..."
          type="number"
        />
        {/* <SelectVit
          tableName={"compositions"}
          id={compositions}
          setId={setCompositions}
          placeholder="Выберите состав..."
        /> */}

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

        {/* <ButtonVit
          name="Удалить"
          onClick={DeleteProducts}
          className=" btn-danger"
        /> */}

        <Accordion className="my-1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <b>Штрихкоды...</b>
            </Accordion.Header>
            <Accordion.Body>
              <Row> <TableBarcode products_id={Number(params.id)} /> </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion className="my-1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <b>Подробнее о картинках...</b>
            </Accordion.Header>
            <Accordion.Body>
              <UploadFilesVit
                tableName={"products"}
                tableId={Number(params.id)}
                setLoad={setLoad}
              />
              <br />
              <SliderVit tableName={"products"} tableId={Number(params.id)} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion className="my-1">
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <b>Подробнее об инвентаризации...</b>
            </Accordion.Header>
            <Accordion.Body>
              <TableStocktaking
                tableName={"products_id"}
                tableId={Number(params.id)}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default ProductsEditScreen;
