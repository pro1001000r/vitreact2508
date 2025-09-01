import React, { FC, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import vitimg1 from "../Template/images/Fon12.png";
import vitimg2 from "../Template/images/no-image.png";
import {
  ICommand,
  IDataUrl,
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

  const removeFoto = (elem: IFotos) => {
    const isrem = confirm("вы уверены что хотите удалить фото?"); //!!!!!!! confirm
    if (isrem) {
      const dataURL: IGetFotos = {
        command: ICommand.GetFotos,
        data: {
          tableName: props.tableName,
          tableId: props.tableId,
        },
      };

      //консоль 01 Сентябрь 2025 (понедельник)
      console.log(">>>> elem на удаление из (SliderVit):", elem); //консоль

      // AxiosVit({ dataUrl: dataURL, setData: setData});
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
          <h3>фото с сервера № {elem.id}</h3>
          <p>здесь нужно добавить описание</p>
          <ButtonVit />
          <ButtonVit
            icon="Fullscreen"
            name="На весь экран"
            className="text-light"
            href={
              "https://pikclick.ru/vitphp" + elem.foto.replace(".", "Full.")
            }
          />
          <ButtonVit name="Удалить фото" onClick={() => removeFoto(elem)} />
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

  return (
    <>
      <SpinnerLoadVit load={load} />
      {data.length > 0 && (
        <Carousel
          style={{ maxWidth: "1500px" }}
          data-bs-theme="dark"
          interval={null}
          // controls={false}
        >
          {CarouselItem}
        </Carousel>
      )}
    </>
  );
};

export default SliderVit;
