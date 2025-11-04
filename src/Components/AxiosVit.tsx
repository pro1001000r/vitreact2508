import db from "../config.json";
import axios from "axios";
import {IDataUrl } from "../inrefaces";

type AxiosProps = {
  dataUrl: IDataUrl;
  setData?(data: any): void;
  setLoad?(i: boolean): void;
  setProgress?(i: number): void;
};

const AxiosVit = ({
  dataUrl, setData = undefined, setLoad = undefined, setProgress = undefined,
}: AxiosProps): void => {
  const config = {
    // onUploadProgress: (progressEvent: { loaded: number; total: number }) => {
    //   const progress = Math.round(
    //     (100 * progressEvent.loaded) / progressEvent.total
    //   );
    //   if (setProgress) {
    //     setProgress(progress);
    //   }
    // },
    // onDownloadProgress: (progress: number) => {
    //   let percentCompleted = Number((progress * 100).toFixed(2));
    //   if (setProgress) {
    //     setProgress(percentCompleted);
    //   }
    // },

    // onUploadProgress: ({ progress }) => {
            
    //   //консоль 01 Сентябрь 2025 (понедельник)
    //   console.log('>>>> progress из (AxiosVit):', (progress * 100).toFixed(2)); //консоль
      
    // },

    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiUrl = db.pathDB;

  //console.log('>>>> dataUrl из (AxiosVit):', dataUrl); //консоль

  async function fetchVit() {
    try {
      const response = await axios.post(apiUrl, dataUrl, config);
      if (setData) {
        setData(response.data);
        
        //консоль 04 Ноябрь 2025 (вторник)
        //console.log('>>>> response.data из (AxiosVit):', response.data); //консоль
        
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
