import React, { FC } from "react";

interface IImageProps {
  foto?: string | undefined;
  className?: string | undefined;
}

const ImageVit: FC<IImageProps> = (props) => {
  let foto: string = "";
  let fotoFull: string = "";
  let className = 'img-responsive rounded ';
  if (typeof props.foto === "string") {
    foto = props.foto;
    fotoFull = foto.replace(".", "Full.");
  }

  if (props.className === "string") {
    className = props.className;
  }

  return (
    <>
      {props.foto && (
        <a href={"https://pikclick.ru/vitphp" + fotoFull}>
          <img
            src={"https://pikclick.ru/vitphp" + foto}
            alt="Основное фото"
            // width="50%"
            style={{objectFit:"contain",maxHeight:100, alignItems:"center"}}
            className = {className}
          />
        </a>
      )}
    </>
  );
};
export default ImageVit;
