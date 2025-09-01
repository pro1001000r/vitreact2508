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
import axios, { AxiosRequestConfig } from "axios";
import ImageVit from "../Components/ImageVit";
// import TableBarcode from "../Components/TableBarcode";

declare var confirm: (q: string) => boolean; //объявление типа confirm

const DevelopScreen: FC = () => {
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

  //Работа с фото ***************************************************************
  const UploadFiles = async (id: any, selectedImage: File) => {
    const formData = new FormData();

    formData.append("operation", "UploadImage");

    const filev = {
      // uri: files[0].uri, // e.g. 'file:///path/to/file/image123.jpg'
      name: "image123.jpg", // e.g. 'image123.jpg',
      type: "image/jpg", // e.g. 'image/jpg'
    };

    formData.append("file", selectedImage);
    formData.append("tableName", "products");
    formData.append("tableId", id);

    //console.log("id сообщения для привязки фото: ", messageId); //вывод
    //console.log("данные фото: ", file); //вывод
    // console.log("из функции", formData); //вывод
    // console.log('вывод',DbParams.pathFiles); //вывод

    const dataRequest = formData;
    const apiUrl = "https://pikclick.ru/vitphp/obmen/foto/";
    const config: AxiosRequestConfig<FormData> = {
      onUploadProgress: ({ progress }) => {
        //консоль 01 Сентябрь 2025 (понедельник)
        if (progress) {
          console.log(
            ">>>> progress из (AxiosVit):",
            (progress * 100).toFixed(2)
          ); //консоль
          const pr = Number((progress * 100).toFixed(2));
          setProgress(pr);
        }
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(apiUrl, dataRequest, config)
      .then(function (response) {
        //консоль 01 Сентябрь 2025 (понедельник)
        // console.log(
        //   ">>>> response.data из (ProductsEditScreen):",
        //   response.data
        // ); //консоль

        //setLoad(false);
        setProgress(0);
      })
      .catch(function (error) {
        //консоль 01 Сентябрь 2025 (понедельник)
        console.log(">>>> error из (ProductsEditScreen):", error); //консоль
      })
      .finally(() => {});
  };

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
    const file1 = e.currentTarget.files[0];
    // if(props.sizeLimit && file.size > props.sizeLimit)
    // {
    //     setStatusMessage("File is too large.");
    // }
    // else
    // {
    console.log(file1);

    //консоль 01 Сентябрь 2025 (понедельник)
    console.log(">>>> file1 из (ProductsEditScreen):", file1); //консоль

    setFileName(file1.name);

    UploadFiles(params.id, e.target.files[0]);
    //getBase64(file1);
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
    if (progress == 100) {
      getItem();
    }
  }, [progress]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCompositions(data.compositions_id || 0);
      setPrice(data.price || 0);
    }
    //console.log(">>>>data>>>>:", data); //консоль
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
                    handleFile(e);
                  }}
                />
                {progress && (
                  <>
                    {/* <Spinner animation="border" variant="secondary" /> */}
                    <ProgressBar variant="success" now={progress}  label={`${progress}%`}/>
                  </>
                )}
                <ImageVit foto={data?.foto} />
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* <ImageUpload setCroppedImage={setCroppedImage} setOriginalImage={setFullImage} round aspect={1} sizeLimit={150000}/> */}
      </Container>
    </>
  );
};

export default DevelopScreen;
