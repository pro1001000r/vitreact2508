import React, { FC } from "react";

interface IImageProps {
  foto?: string | undefined;
  className?: string | undefined;
}

const ImageVit: FC<IImageProps> = (props) => {
  let foto: string = "";
  let fotoFull: string = "";
  let fotolocal: string = "https://pikclick.ru/vitphp";
  let className = "img-responsive rounded ";
  if (typeof props.foto === "string") {
    foto = props.foto;
    fotoFull = foto.replace(".", "Full.");

    //если внешняя фотка
    if (props.foto.includes("https")) {
      fotolocal = "";
      foto = foto + '.jpg';
      fotoFull = foto;
    }

  }

  if (props.className === "string") {
    className = props.className;
  }

  return (
    <>
      {props.foto && (
        <a href={fotolocal + fotoFull} target="_blank">
          <img
            src={fotolocal + foto}
            alt="Основное фото"
            // width="50%"
            style={{
              objectFit: "contain",
              maxHeight: 100,
              alignItems: "center",
            }}
            className={className}
          />
        </a>
      )}
    </>
  );
};
export default ImageVit;
