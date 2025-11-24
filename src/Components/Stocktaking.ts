import {
  ICommand,
  ICreateTableItem,
  IStocktaking,
} from "../inrefaces";
import AxiosVit from "./AxiosVit";

const Stocktaking = (item: IStocktaking): void => {
 

  //удаление пустых значений
  const deleteNullVit = <T extends object>(obj: T): Partial<T> => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => Boolean(v)) // Boolean(v) отфильтровывает все falsy значения
    ) as Partial<T>;
  };

  const clearItem = deleteNullVit(item);

  const createStocktakindItem = () => {
    const dataUrl: ICreateTableItem = {
      command: ICommand.CreateTableItem,
      data: { tableName: "stocktaking", vp: clearItem },
    };

    //консоль 05 Июнь 2025 (четверг)
    console.log(">>>> dataUrl из (Stocktaking):", dataUrl); //консоль

    AxiosVit({ dataUrl });
  };

  createStocktakindItem();
};

export default Stocktaking;
