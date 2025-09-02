import axios, { AxiosRequestConfig } from "axios";
import React, { FC, useRef, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import ImageVit from "./ImageVit";
import ButtonVit from "./ButtonVit";

interface IProps {
  tableName: string;
  tableId: number;
  setLoad?(i: boolean): void;
}

const UploadFilesVit: FC<IProps> = (props) => {
  const inputFoto = useRef<HTMLInputElement>(null);
  const inputFile = useRef<HTMLInputElement>(null);

  const [progress, setProgress] = useState<number | false>(false);
  const [progress1, setProgress1] = useState<number | false>(false);

  const UploadFiles = async (id: any, selectedImage: File) => {
    const formData = new FormData();

    formData.append("operation", "UploadImage");
    formData.append("file", selectedImage);
    formData.append("tableName", "products");
    formData.append("tableId", id);

    const dataRequest = formData;
    const apiUrl = "https://pikclick.ru/vitphp/obmen/foto/";
    const config: AxiosRequestConfig<FormData> = {
      onUploadProgress: ({ progress }) => {
        //консоль 01 Сентябрь 2025 (понедельник)
        if (progress) {
          console.log(
            ">>>> выгрузка из (AxiosVit):",
            (progress * 100).toFixed(2)
          ); //консоль
          const pr = Number((progress * 100).toFixed(2))-1;

          setProgress(pr);
          {
            props.setLoad && props.setLoad(false);
          }
        }
      },
      onDownloadProgress: ({ progress }) => {
        //консоль 01 Сентябрь 2025 (понедельник)
        if (progress) {
          console.log(
            ">>>> закрузка из (AxiosVit):",
            (progress * 100).toFixed(2)
          ); //консоль
          const pr = Number((progress * 100).toFixed(2));
          setProgress1(pr);
        }
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(apiUrl, dataRequest, config)
      .then(function (response) {
        //setLoad(false);

        //консоль 01 Сентябрь 2025 (понедельник)
        console.log(">>>> response из (UploadFilesVit):", response); //консоль

        setProgress(false);
        setProgress1(100);
        {
          props.setLoad && props.setLoad(true);
        }
      })
      .catch(function (error) {
        //консоль 01 Сентябрь 2025 (понедельник)
        console.log(">>>> error из (ProductsEditScreen):", error); //консоль
      })
      .finally(() => {});
  };

  const handleFile = async (e: any) => {
    UploadFiles(props.tableId, e.target.files[0]);
  };

  const hendlerFoto = () => {
    inputFoto.current!.click();
    // inputFile.current!.capture
  };

    const hendlerFile = () => {
    // inputFile.current!.capture = "false"
    inputFile.current!.click();
    
  };

  {
    /* <input type="file" ref="inputFile" className="hidden" /> */
  }

  return (
    <>
      <input
        hidden={true}
        ref={inputFile}
        id="image-input"
        className="hidden"
        type="file"
        // accept=".png,.jpg,.jpeg,.gif"
        accept="image/*"
        // capture
        onInput={(e) => {
          handleFile(e);
        }}
      />
      <input
        hidden={true}
        ref={inputFoto}
        id="image-input"
        className="hidden"
        type="file"
        // accept=".png,.jpg,.jpeg,.gif"
        accept="image/*"
        capture
        onInput={(e) => {
          handleFile(e);
        }}
      />
      <ButtonVit onClick={hendlerFoto} name="+ фото" />
      <ButtonVit onClick={hendlerFile} name="+ картинку" />
      {progress && (
        <>
          {/* <Spinner animation="border" variant="secondary" /> */}
          <ProgressBar
            variant="success"
            now={progress}
            label={`выгрузка ${progress}%`}
          />
        </>
      )}

      {progress1 && (
        <>
          <ProgressBar
            variant="info"
            now={progress1}
            label={`загрузка ${progress1}%`}
          />
        </>
      )}
      {/* <ImageVit foto={data?.foto} /> */}
    </>
  );
};

export default UploadFilesVit;
