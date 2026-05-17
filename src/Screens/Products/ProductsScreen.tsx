import React, { FC, useContext, useEffect, useState } from "react";

import { ICommand, ICreateTableItem, IProducts } from "../../interfaces";
import TableVit from "../../Components/TableVit";
import { Container } from "react-bootstrap";
import InputVit from "../../Components/InputVit";
import AxiosVit from "../../Components/AxiosVit";
import ScanerVit from "../../Components/ScanerVit";
import ModalVit from "../../Components/ModalVit";
import ButtonVit from "../../Components/ButtonVit";
import { ContextVit } from "../../Components/ContextVit";
import { useUserSession } from "../../Components/useStoreZustandVit";

const ProductsScreen: FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [scan, setScan] = useState<string>("Нет скана");
  const [show, setShow] = useState(false);

  const [newprod, setNewprod] = useState<string>("");

  const userSession = useUserSession()
  //консоль 22 Ноябрь 2025 (суббота)
  // console.log('>>>> userSession из (ProductsScreen):', userSession); //консоль
  
  
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
    // console.log("products после:", products); //консоль
  }, [products]);

  return (
    <>
      <Container>
        {/* <p>{scan}</p>
        <ButtonVit
                      icon="UpcScan"
                      name="Сканировать"
                      onClick={() => setShow(true)}
                    />
        <InputVit
          value={newprod}
          onChange={setNewprod}
          onPressVit={addHandler}
        />
        <ModalVit show={show} setShow={setShow}>
          <ScanerVit setScan={setScan} setShow={undefined} />
        </ModalVit> */}

        <TableVit />
      </Container>
    </>
  );
};
export default ProductsScreen;
