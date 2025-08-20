import db from "../config.json";
import axios from "axios";

type AxiosProps = {
  dataUrl: {};
  setData?: any|undefined;
  setLoad?(): void|null;
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
      // if (setLoad) {
      //   setLoad(true);
      // }
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
