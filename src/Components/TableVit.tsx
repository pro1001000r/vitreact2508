import { Nav, Table } from "react-bootstrap";
import { useAxiosVit } from "./useAxiosVit";
import { ICommand, IGetTable, IProducts } from "../inrefaces";
import ImageVit from "./ImageVit";
import GetName from "./GetName";

export default function TableVit() {
  const dataUrl: IGetTable = {
    command: ICommand.GetTable,
    data: { tableName: "products" },
  };
  const { data } = useAxiosVit<IProducts[]>(dataUrl);

  if (data === undefined) {
    return;
  }

  interface IProps {
    table: string;
    id?: number;
  }

  let listRow = data.map((elem) => {
    return (
      <tr key={elem.id}>
        <td>{elem.id}</td>
        <td>
          <ImageVit foto={elem?.foto} />
        </td>
        <td>
          <Nav.Link href={"/ProductsEdit/" + elem.id}>
            <b>{elem.name}</b>
          </Nav.Link>
        </td>
        <td>
          <div style={{ fontSize: "12px" }}>
            <b>{elem.price} р.</b> <br />
            <GetName table="compositions" id={elem.compositions_id} />
          </div>
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
            <th>Картинка</th>
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
