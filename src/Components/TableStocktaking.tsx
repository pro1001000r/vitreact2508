import { useEffect, useState } from "react";
import {
  Nav,
  OverlayTrigger,
  Popover,
  Spinner,
  Table,
  Tooltip,
} from "react-bootstrap";
import AxiosVit from "./AxiosVit";
import ButtonVit from "./ButtonVit";
import Stocktaking from "./Stocktaking";
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
    command: "GetStocktaking2025",
    data: { tableName: tableName, tableId: tableId },
  };

  useEffect(() => {
    AxiosVit({ dataUrl, setData, setLoad });
  }, [tableId]);

  useEffect(() => {
    AxiosVit({ dataUrl, setData, setLoad });
  }, [load]);

  useEffect(() => {
    AxiosVit({ dataUrl, setData, setLoad });
  }, [counter]);

  const UpdateStocktaking = (id: number, count: number) => {
    Stocktaking({ id: id, count: count });
    setLoad(false);
  };

  // const PopoverV = ({ id, children }) => {
  //   return (
  //     <>
  //       {invent && (
  //         <OverlayTrigger
  //           placement="left"
  //           delay={{ show: 250, hide: 400 }}
  //           trigger={["click"]}
  //           overlay={
  //             <Popover id={id}>
  //               <Popover.Header>Инв. запись № {id}</Popover.Header>
  //               <Popover.Body>
  //                 <ButtonVit
  //                   name="+"
  //                   onClick={() => UpdateStocktaking(id, 1)}
  //                 />{" "}
  //                 <ButtonVit
  //                   name="-"
  //                   onClick={() => UpdateStocktaking(id, -1)}
  //                 />
  //               </Popover.Body>
  //             </Popover>
  //           }
  //         >
  //           {children}
  //         </OverlayTrigger>
  //       )}
  //       {!invent && <>{children}</>}
  //     </>
  //   );
  // };

  // let listRowStocktaking = data?.map((elem) => {
  //   return (
  //     <tr key={elem.id}>
  //       <td style={{ fontSize: "12px" }}>
  //         {elem.date}
  //         <br />
  //         {elem.usersname}
  //         <br />
  //         {elem.storagename}
  //         <br />
  //         <b>{elem.placename}</b>
  //       </td>
  //       <td>
  //         <Nav.Link href={"/ProductsEdit/" + elem.products_id}>
  //           {elem.productsname}
  //           <br />
  //           <b>{elem.colorname}</b>
  //           <br />
  //           <b>{elem.sizename}</b>
  //         </Nav.Link>
  //       </td>
  //       {/* <PopoverV id={elem.id} count={elem.count}>
  //         <td>
  //           <span style={{ fontSize: "12px" }}>Кол-во: </span>

  //           <b>{elem.count}</b>

  //           <br />
  //           {elem.price}
  //           <br />
  //           <div style={{ fontSize: "12px" }}>арт: {elem.article}</div>
  //           <div style={{ fontSize: "12px" }}>{elem.compositionsname}</div>
  //           <div style={{ fontSize: "12px" }}>{elem.barcode}</div>
  //         </td>
  //       </PopoverV> */}
  //     </tr>
  //   );
  // });

  
  //консоль 24 Ноябрь 2025 (понедельник)
  console.log('>>>> data из (TableStocktaking):', data); //консоль
  

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
          {/* <PopoverV id={elem.id} count={elem.count}>
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
        </PopoverV> */}
        </tr>
      );
    });
  } else listRowStocktaking ="Нет данных";

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
