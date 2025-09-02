import React, { FC, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import vitimg1 from "../Template/images/Fon12.png";
import vitimg2 from "../Template/images/no-image.png";
import {
  ICommand,
  IDataUrl,
  IDeleteFotosById,
  IFotos,
  IGetFotos,
  IGetTableById,
} from "../inrefaces";
import AxiosVit from "./AxiosVit";
import SpinnerLoadVit from "./SpinnerLoadVit";
import ButtonVit from "./ButtonVit";

declare var confirm: (q: string) => boolean; //объявление типа confirm

interface IProps {
  tableName: string;
  tableId: number;
}

const SliderVit: FC<IProps> = (props) => {
  const [data, setData] = useState<IFotos[]>([]);
  const [load, setLoad] = useState(false);

  const removeFoto = (id: number | undefined) => {
    const isrem = confirm("вы уверены что хотите удалить фото?"); //!!!!!!! confirm
    if (isrem && id) {
      const dataURL: IDeleteFotosById = {
        command: ICommand.DeleteFotosById,
        data: {
          tableId: id,
        },
      };

      //консоль 02 Сентябрь 2025 (вторник)
      console.log(">>>> dataURL из (SliderVit):", dataURL); //консоль

      AxiosVit({ dataUrl: dataURL });
    }
  };

  let CarouselItem = data.map((elem) => {
    return (
      <Carousel.Item key={elem.id}>
        <Image
          src={"https://pikclick.ru/vitphp" + elem.foto}
          alt="Slide image alt"
          className="d-block w-100"
        />

        <Carousel.Caption>
          {/* <h3>фото с сервера № {elem.id}</h3>
          <p>здесь нужно добавить описание</p> */}
          <ButtonVit
            icon="Fullscreen"
            name="На весь экран"
            className=" btn-info"
            href={
              "https://pikclick.ru/vitphp" + elem.foto.replace(".", "Full.")
            }
          />
          <ButtonVit name="Удалить фото" className="btn-danger" onClick={() => removeFoto(elem.id)} />
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  useEffect(() => {
    const dataURL: IGetFotos = {
      command: ICommand.GetFotos,
      data: {
        tableName: props.tableName,
        tableId: props.tableId,
      },
    };
    AxiosVit({ dataUrl: dataURL, setData: setData, setLoad: setLoad });
    return () => {};
  }, []);
  const controlsview = data.length !== 1;
  return (
    <>
      <SpinnerLoadVit load={load} />
      {data.length > 0 && (
        <Carousel
          style={{ maxWidth: "1500px" }}
          data-bs-theme="dark"
          interval={null}
          controls={controlsview}
        >
          {CarouselItem}
        </Carousel>
      )}
    </>
  );
};

export default SliderVit;
