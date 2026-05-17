import { Nav, Spinner, Table } from "react-bootstrap";
import { useAxiosVit } from "./useAxiosVit";
import { ICommand, IGetTable, IProducts } from "../interfaces";
import ImageVit from "./ImageVit";
import GetName from "./GetName";
import StocktakingCount from "./StocktakingCount";

export default function TableVit() {
  const dataUrl: IGetTable = {
    command: ICommand.GetTable,
    data: { tableName: "products" },
  };
  const { data, loading } = useAxiosVit<IProducts[]>(dataUrl);

  if (data === undefined) {
    return;
  }

  interface IProps {
    table: string;
    id?: number;
  }
  // <pre>{JSON.stringify(data, null, 2)}</pre>;

  let listRow = data?.map((elem) => {
    //let count = StocktakingCount({tableName:"products_id",tableId: elem.id})
    return (
      <tr key={elem.id}>
        {/* <td>{elem.id}</td> */}
        <td>
          <ImageVit foto={elem?.foto} width={"50px"} />
        </td>
        <td>
          <Nav.Link href={"/ProductsEdit/" + elem.id}>
            <b>{elem.name}</b>
          </Nav.Link>
        </td>
        <td>
          <div style={{ fontSize: "12px" }}>
            <b>{elem.price} р.</b> <br />
            {/* <GetName table="compositions" id={elem.compositions_id} /> */}
            {/* <StocktakingCount tableName="products_id" tableId={elem.id} />  */}
          </div>
          <br />
        </td>
      </tr>
    );
  });

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
  
  //консоль 17 Май 2026 (воскресенье)
  console.log('>>>> loading из (TableVit):', loading); //консоль
  

  return (
    <>
      {!loading && (
        <div style={wrapperStyle}>
          <Spinner animation="border" variant="secondary" />
          <p>Загрузка...</p>
        </div>
      )}
      <Table striped hover size="sm">
        <thead>
          <tr>
            {/* <th>id</th> */}
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
