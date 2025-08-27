import React, { FC } from "react";
import { useAxiosVit } from "../Components/useAxiosVit";
import { ICommand, IDataUrl } from "../inrefaces";
import TableVit from "../Components/TableVit";
import { Container } from "react-bootstrap";

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
  console.log(">>>> data из (ProductsScreen):", data); //консоль

  return (
    <>
      <Container>
        <TableVit />
      </Container>
    </>
  );
};
export default ProductsScreen;
