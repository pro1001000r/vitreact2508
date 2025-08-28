import { Table } from "react-bootstrap";
import { useAxiosVit } from "./useAxiosVit";
import { ICommand, IGetTable, IProducts } from "../inrefaces";

export default function TableVit() {
  const dataUrl: IGetTable = {
    command: ICommand.GetTable,
    data: { tableName: "products" },
  };
  const { data } = useAxiosVit<IProducts[]>(dataUrl);

  if (data === undefined) {
    return;
  }

  let listRow = data.map((elem) => {
    return (
      <tr key={elem.id}>
        <td>{elem.id}</td>
        <td>
          <b>{elem.name}</b>
        </td>
        <td>
          <div style={{ fontSize: "12px" }}>{elem.code1c}</div>
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
          <tr>{/* <td colSpan={2}>Larry the Bird</td> */}</tr>
        </tbody>
      </Table>
    </>
  );
}
