import axios from "axios";
import { IDataUrl, IStocktaking } from "../inrefaces";
import { useSetCounterUpdate } from "./useStoreZustandVit";
import db from "../config.json";

const Stocktaking = (item: IStocktaking): void => {
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
    console.log(">>>> dataUrl из (Stocktaking):", dataUrl); //консоль

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiUrl = db.pathDB;

    async function fetchVit() {
      try {
        const response = await axios.post(apiUrl, dataUrl, config);
      } catch (e) {
      } finally {
      }
    }

    fetchVit();
  };

  createStocktakindItem();
  useSetCounterUpdate();

};

export default Stocktaking;
