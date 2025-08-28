import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAxiosVit } from "./useAxiosVit";
import { ICommand, IDataUrl, IProductsColor } from "../inrefaces";

export default function TableVit() {
  const dataUrl: IDataUrl = {
      command: ICommand.GetTable,
      data: { tableName: "productsColor" },
    };
  const { data } = useAxiosVit<IProductsColor[]>(dataUrl);

  //консоль 09 Май 2025 (пятница)
  console.log(">>>> data из (TableVit):", data); //консоль

  if (data === undefined){
    return
  }

  let listRow = data.map((elem) => {
    return (
      <tr key={elem.id}>
        <td>
          {elem.id}
          
        </td>
        <td>
          
          <b>{elem.name}</b>
        </td>
        <td>
          
          
          <div style={{'fontSize': '12px'}}>{elem.code1c}</div>
          <br />
          
        </td>
      </tr>
    );
  });

  return (
    <>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>Товар</th>
            <th>Данные</th>
          </tr>
        </thead>
        <tbody>
          {listRow}
          <tr>
            {/* <td colSpan={2}>Larry the Bird</td> */}
          </tr>
        </tbody>
      </Table>
    </>
  );
}
