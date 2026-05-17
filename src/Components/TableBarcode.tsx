import React, { useEffect, useState, FC } from "react";
import { IBarcode, IListBarcodeProducts } from "../interfaces";
import AxiosVit from "./AxiosVit";
import { Table } from "react-bootstrap";

function TableBarcode({products_id = 0}) {
  const dataUrl: IListBarcodeProducts = {
    command: "ListBarcodeProducts",
    data: {
      products_id: products_id,
    },
  };
  const [data, setData] = useState<IBarcode[]>([]);

  useEffect(() => {
    AxiosVit({ dataUrl, setData });
  }, []);

  let listRow = data.map((elem) => {
    return (
      <tr key={elem.id}>
        <td>
          <b>{elem.barcode}</b>
        </td>
        <td>
          <b>{elem.colorname}</b>
        </td>
        <td>
          <b>{elem.sizename}</b>
        </td>
      </tr>
    );
  });

  return (
    <>
      {" "}
      <Table striped hover size="sm">
        {/* <thead>
          <tr>
            <th>Штрихкод</th>
            <th>Цвет</th>
            <th>Размер</th>
          </tr>
        </thead> */}
        <tbody>{listRow}</tbody>
      </Table>
    </>
  );
}
export default TableBarcode;
