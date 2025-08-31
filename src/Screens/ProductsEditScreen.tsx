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
  IDeleteTableById,
  IGetTableById,
  IProducts,
  IUpdateTableById,
} from "../inrefaces";
import ImageUpload from "../Components/ImageUpload";
// import TableBarcode from "../Components/TableBarcode";

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

  function getBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setFileInput(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };

    return reader.result;
  }

  const handleFile = async (e: any) => {
    const file = e.currentTarget.files[0];
    // if(props.sizeLimit && file.size > props.sizeLimit)
    // {
    //     setStatusMessage("File is too large.");
    // }
    // else
    // {
    console.log(file);
    setFileName(file.name);
    getBase64(file);
    // }
  };
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
    if (data) {
      setName(data.name);
      setCompositions(data.compositions_id || 0);
      setPrice(data.price || 0);
    }
    // console.log(">>>>data>>>>:", data); //консоль
    // console.log(">>>>name>>>>:", name); //консоль
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

        <InputVit
          value={price}
          onChange={setPrice}
          placeholder="Цена..."
          type="number"
        />
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

        <ButtonVit
          name="Удалить"
          onClick={DeleteProducts}
          className=" btn-danger"
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
              <b>Подробнее о картинке...</b>
            </Accordion.Header>
            <Accordion.Body>
              {/* style={{ width: 200 }} */}
              <Row>
                <input
                  id="image-input"
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif"
                  onInput={(e) => {
                    //консоль 31 Август 2025 (воскресенье)
                    console.log(">>>> e из (ProductsEditScreen):", e); //консоль
                    handleFile(e)
                  }}
                />
                <img src={fileInput} alt="Logo" width="50"/>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* <ImageUpload setCroppedImage={setCroppedImage} setOriginalImage={setFullImage} round aspect={1} sizeLimit={150000}/> */}
      </Container>
    </>
  );
};

export default ProductsEditScreen;
