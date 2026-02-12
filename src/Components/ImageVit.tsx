import React, { FC, useState } from "react";
import ModalVit from "./ModalVit";

interface IImageProps {
  foto?: string | undefined;
  className?: string | undefined;
  width?:string | undefined
}

const ImageVit: FC<IImageProps> = (props) => {
  const [show, setShow] = useState(false);

  let foto: string = "";
  let fotoFull: string = "";
  let fotolocal: string = "https://pikclick.ru/vitphp";
  let className = "img-responsive rounded ";
  let widthV: string = '100px'
  if (typeof props.foto === "string") {
    foto = props.foto;
    fotoFull = foto.replace(".", "Full.");

    //если внешняя фотка
    if (props.foto.includes("https")) {
      fotolocal = "";
      foto = foto + ".jpg";
      fotoFull = foto;
    }
  }

  if (props.className === "string") {
    className = props.className;
  }

  if (props.width) {
    widthV = props.width;
  }

  return (
    <>
      {props.foto && (
        <>
          <ModalVit show={show} setShow={setShow}>
            <img
              src={fotolocal + foto}
              alt="Основное фото"
              // width="50%"
              style={{
                objectFit: "contain",
                maxHeight: "100%",
                maxWidth: "100%" /* Отступ от краев экрана */,
                alignItems: "center",
              }}
              className={className}
            />
          </ModalVit>
          <a onClick={() => setShow(true)}>
            <img
              src={fotolocal + foto}
              alt="Основное фото"
              // width="50%"
              style={{
                objectFit: "cover",
                maxWidth: widthV,
                alignItems: "center",
              }}
              className={className}
            />
          </a>
        </>
      )}
    </>
  );
};
export default ImageVit;
