import React, { FC } from "react";
import { useAxiosVit } from "../Components/useAxiosVit";
import { ICommand, IDataUrl } from "../inrefaces";

const ProductsScreen: FC = () => {
  const vFunc = () => {
    return <>arg</>;
  };

  const dataUrl: IDataUrl = {
    command: ICommand.GetTable,
    data: { tableName: "productsColor" },
  };
  const { load, data } = useAxiosVit(dataUrl);
  
  //консоль 27 Август 2025 (среда)
  console.log('>>>> data из (ProductsScreen):', data); //консоль
  

  return <>Каталог</>;
};
export default ProductsScreen;
