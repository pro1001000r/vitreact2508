import axios from "axios";
import { IDataUrl, IStocktaking } from "../interfaces";
import { useStoreZustandVit } from "./useStoreZustandVit";
import db from "../config.json";

const Stocktaking = (item: IStocktaking): void => {

  // !!! ИСПРАВЛЕНИЕ ОШИБКИ !!!
  // Получаем функцию обновления состояния через getState()
  const setUpdate = useStoreZustandVit.getState().setUpdate;

  
  //удаление пустых значений
  const deleteNullVit = <T extends object>(obj: T): Partial<T> => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => Boolean(v)) // Boolean(v) отфильтровывает все falsy значения
    ) as Partial<T>;
  };

  const clearItem = deleteNullVit(item);

  const createStocktakindItem = () => {
    const dataUrl: IDataUrl = {
      command: "SetStocktaking",
      data: clearItem,
    };

    //консоль 05 Июнь 2025 (четверг)
    //console.log(">>>> dataUrl из (Stocktaking):", dataUrl); //консоль

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiUrl = db.pathDB;

    async function fetchVit() {
      try {
        const response = await axios.post(apiUrl, dataUrl, config);
        setUpdate();
      } catch (e) {
      } finally {
      }
    }

    fetchVit();
  };

  createStocktakindItem();
  setUpdate();

};

export default Stocktaking;
