import React, { FC, useEffect, useState } from "react";

import { ICommand, ICreateTableItem, IProducts } from "../inrefaces";
import TableVit from "../Components/TableVit";
import { Container } from "react-bootstrap";
import InputVit from "../Components/InputVit";
import AxiosVit from "../Components/AxiosVit";

const ProductsScreen: FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  const[newprod,setNewprod] = useState<string>('')

  const addHandler = (title: string) => {
    const newProducts: IProducts = {
      name: title,
    };

    const dataUrl: ICreateTableItem = {
      command: ICommand.CreateTableItem,
      data: {
        tableName: "products",
        vp: newProducts,
      },
    };
    AxiosVit({ dataUrl });

    setProducts((prev) => [newProducts, ...prev]);
  };

  useEffect(() => {
    //консоль 10 Август 2025 (воскресенье)
    console.log("products после:", products); //консоль
  }, [products]);

  return (
    <>
      <InputVit value={newprod} onChange={setNewprod} onPressVit={addHandler}/>
      <Container>
        <TableVit />
      </Container>
    </>
  );
};
export default ProductsScreen;
