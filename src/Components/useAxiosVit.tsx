import { useEffect, useState } from "react";
import db from "../config.json";
import { IDataUrl } from "../inrefaces";
import axios from "axios";

export function useAxiosVit<T>(dataUrl: IDataUrl) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [dataU, setDataU] = useState({});

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiUrl = db.pathDB;

  async function fetchVit() {
    try {
      //setLoad(true);
      const response = await axios.post(apiUrl, dataUrl, config);
      setData(response.data);
      setLoad(true);
    } catch (e) {
      setLoad(false);
    } finally {
      setLoad(true);
    }
  }

  useEffect(() => {
    fetchVit();
    setDataU(dataUrl);
  }, []);

  useEffect(() => {
    fetchVit();
  }, [load, dataU]);

  return { load, data };
}
