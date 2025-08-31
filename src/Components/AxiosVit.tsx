import db from "../config.json";
import axios from "axios";
import { IDataUrl } from "../inrefaces";

type AxiosProps = {
  dataUrl: IDataUrl;
  setData?(data:any): void;
  setLoad?(i:boolean): void;
};

const AxiosVit = ({
  dataUrl,
  setData = undefined,
  setLoad = undefined,
}: AxiosProps):void => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiUrl = db.pathDB;

  async function fetchVit() {
    try {
      const response = await axios.post(apiUrl, dataUrl, config);
      if (setData) {
        setData(response.data);
      }
      if (setLoad) {
        setLoad(true);
      }
    } catch (e) {
      if (setData) {
        setData(apiUrl);
      }
    } finally {
      // if (setLoad) {
      //   setLoad(true);
      // }
    }
  }

  fetchVit();
};

export default AxiosVit;
