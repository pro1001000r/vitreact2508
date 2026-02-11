import React, { useEffect, useState } from "react";
import { Nav, Spinner, Table } from "react-bootstrap";
import AxiosVit from "./AxiosVit";

import PopoverVit from "./PopoverVit";

import { IDataUrl } from "../inrefaces";

interface ITableStocktaking {
  id: number;
  date: number;
  count: number;
  barcode: number;
  products_id: number;
  article: number;
  price: number;
  productsname: number;
  code1c: number;
  compositions_id: number;
  compositionsname: number;
  productsColor_id: number;
  colorname: number;
  productsSize_id: number;
  sizename: number;
  users_id: number;
  usersname: number;
  place_id: string;
  placename: string;
  storage_id: string;
  storagename: string;
}

export default function TableStocktaking({
  tableName = "",
  tableId = 0,
  invent = false,
  counter = 0,
}) {
  const [data, setData] = useState<ITableStocktaking[]>([]);
  const [load, setLoad] = useState(false);
  const dataUrl: IDataUrl = {
    command: "GetStocktaking",
    data: { tableName: tableName, tableId: tableId },
  };

  useEffect(() => {
    AxiosVit({ dataUrl, setData, setLoad });
  }, [load]);

  useEffect(() => {
    AxiosVit({ dataUrl, setData, setLoad });
    
    //консоль 24 Ноябрь 2025 (понедельник)
    //console.log('>>>> counterUpdate из (TableStocktaking):', counterUpdate); //консоль
    
  }, [counter]);

  let listRowStocktaking: any;

  if (Array.isArray(data)) {
    listRowStocktaking = data?.map((elem) => {
      return (
        <tr key={elem.id}>
          <td style={{ fontSize: "12px" }}>
            {elem.date}
            <br />
            {elem.usersname}
            <br />
            {elem.storagename}
            <br />
            <b>{elem.placename}</b>
          </td>
          <td>
            <Nav.Link href={"/ProductsEdit/" + elem.products_id}>
              {elem.productsname}
              <br />
              <b>{elem.colorname}</b>
              <br />
              <b>{elem.sizename}</b>
            </Nav.Link>
          </td>
          <PopoverVit id={elem.id} invent={invent}>
            <td>
              <span style={{ fontSize: "12px" }}>Кол-во: </span>

              <b>{elem.count}</b>

              <br />
              {elem.price}
              <br />
              <div style={{ fontSize: "12px" }}>арт: {elem.article}</div>
              <div style={{ fontSize: "12px" }}>{elem.compositionsname}</div>
              <div style={{ fontSize: "12px" }}>{elem.barcode}</div>
            </td>
          </PopoverVit>
        </tr>
      );
    });
  } else listRowStocktaking = "";

  const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <>
      {!load && (
        <div style={wrapperStyle}>
          <Spinner animation="border" variant="secondary" />
          <p>Загрузка...</p>
        </div>
      )}
      {load && (
        <>
          <Table striped hover size="sm">
            <tbody>{listRowStocktaking}</tbody>
          </Table>
        </>
      )}
    </>
  );
}
