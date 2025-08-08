
import db from "../config.json";
import axios from "axios";
//import DbParams from "./DbParams";

const AxiosVit = (dataUrl, setData = undefined, setLoad = undefined) => {
  
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
      //setLoad(false);
      setData(apiUrl);
    } finally {
      // if (setLoad) {
      //   setLoad(true);
      // }
    }
  }

  fetchVit();
};

export default AxiosVit;
