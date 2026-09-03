import React, { useEffect, useState, FC } from "react";
import ButtonVit from "../../Components/ButtonVit";
import axios from "axios";
import { IDataUrl } from "../../interfaces";

const WorkTimesScreen: FC = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiUrl = "https://pikclick.ru/v2/mobile";

  //console.log('>>>> dataUrl из (AxiosVit):', dataUrl); //консоль

  const dataUrl: IDataUrl = {
    command: "ListBarcodeProducts",
    data: {
      products_id: 1,
    },
  };

  async function fetchVit() {
    try {
      const response = await axios.post(apiUrl, dataUrl, config);
      if (setData) {
        setData(response.data);

        //консоль 04 Ноябрь 2025 (вторник)
        // console.log('>>>> response.data из (AxiosVit):', response.data); //консоль
      }
      if (setLoad) {
        setLoad(true);
      }
    } catch (e) {
      if (e) {
        // setData(e);
      }
    } finally {
      // if (setLoad) {
        setLoad(true);
      // }
    }
  }

  return (
    <>
      <ButtonVit href="/WorkTimes" name="Время работ" />
    </>
  );
};
export default WorkTimesScreen;
