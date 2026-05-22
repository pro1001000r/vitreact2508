import { useNavigate, useParams } from "react-router";
import {
  IDataUrl,
  IGetTableById,
  IProducts,
  IUpdateTableById,
} from "../../interfaces";
import { useEffect, useState } from "react";
import AxiosVit from "../../Components/AxiosVit";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import ImageVit from "../../Components/ImageVit";
import InputVit from "../../Components/InputVit";
import ButtonVit from "../../Components/ButtonVit";
import SliderVit from "../../Components/SliderVit";
import UploadFilesVit from "../../Components/UploadFilesVit";

export default function ProductsEditScreen2() {
  const params = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState<number>(Number(params.id));

  //данные странички
  const [product, setProduct] = useState<IProducts>({
    id: 0,
    name: "",
    article: 0,
    unit: "",
    nameNew: "",
    price: 0,
    compositions_id: 0,
    foto: "",
    description: "",
    compositionsname: "",
    stocktakingcount: 0,
  });

  //Собираем данные из базы
  const GetItem = () => {
    const dataUrl: IGetTableById = {
      command: "GetTableById",
      data: {
        tableName: "products",
        tableId: Number(params.id),
      },
    };
    AxiosVit({ dataUrl, setData: setProduct });
  };
  //Сохраняем изменения и уходим со странички
  const CreateProduct = () => {
    const dataUrl: IDataUrl = {
      command: "CreateTableItem",
      data: {
        tableName: "products",
        vp: {
          name: product.name,
          unit: "шт",
          price: product.price,
        },
      },
    };

    AxiosVit({ dataUrl: dataUrl, setData: setId });
  };

  const UpdateProduct = () => {
    const dataUrl: IUpdateTableById = {
      command: "UpdateTableById",
      data: {
        tableName: "products",
        tableId: Number(params.id),
        vp: { name: product.name, price: product.price },
      },
    };
    AxiosVit({ dataUrl });

    //консоль 22 Май 2026 (пятница)
    console.log(">>>> dataUrl из (productsEditScreen2):", dataUrl); //консоль

    //Пока не уходим
    navigate(-1);
  };

  const HandleChangeVit = (
    field: keyof IProducts,
    value: string | number | boolean | null,
  ) => {
    setProduct((prev) => {
      if (!prev) {
        return {
          id: 0,
          [field]: value,
        };
      }
      return { ...prev, [field]: value };
    });
  };

  //Первый рендеринг
  useEffect(() => {
    GetItem();
  }, []);

  useEffect(() => {
    if (id) {
      navigate("/ProductsEdit/" + id);
    }

    //консоль 22 Май 2026 (пятница)
    console.log(">>>> id из (UserEditScreen):", id); //консоль
  }, [id]);

  return (
    <Container>
      <Accordion className="my-1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Row className="w-100">
              <Col>
                <h4>{product.name}</h4>
                артикул: {product?.article}
                <br />
                код1с: {product?.code1c}
                <br />
                описание: {product?.description}
                <br />
                цена: {product.price} {product?.unit}
                <br />
              </Col>
              <Col className="d-flex justify-content-end">
                <ImageVit foto={product.foto} />
              </Col>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            {" "}
            <InputVit
              value={product.name}
              onChange={(value) => HandleChangeVit("name", value)}
              placeholder="Наименование..."
            />
            <InputVit
              value={product.price}
              onChange={(value) => HandleChangeVit("price", value)}
              placeholder="Цена..."
              type="number"
            />
            <br />
            <ButtonVit
              name="Назад"
              onClick={() => navigate(-1)}
              className=" btn-primary"
            />
            {id && (
              <>
                <ButtonVit
                  name="Сохранить"
                  onClick={UpdateProduct}
                  className=" btn-primary"
                />
              </>
            )}
            {!id && (
              <ButtonVit
                name="Создать"
                onClick={CreateProduct}
                className=" btn-primary"
              />
            )}
          </Accordion.Body>
        </Accordion.Item>

        {id && (
          <>
            <Accordion.Item eventKey="1">
              <Accordion.Header></Accordion.Header>
              <Accordion.Body>
                <UploadFilesVit tableName={"products"} tableId={id} />
                <SliderVit tableName={"products"} tableId={id} />
              </Accordion.Body>
            </Accordion.Item>
          </>
        )}
      </Accordion>

      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}
