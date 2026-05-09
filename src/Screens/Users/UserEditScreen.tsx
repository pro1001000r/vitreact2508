import { useEffect, useState } from "react";
import { ICommand, IGetTableById, IUsers } from "../../inrefaces";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AxiosVit from "../../Components/AxiosVit";
import TableStocktaking from "../../Components/TableStocktaking";

export default function UsersScreen() {
  const [data, setData] = useState<IUsers>();
  const params = useParams();

//консоль 09 Май 2026 (суббота)
console.log('>>>> params из (UserEditScreen):', params); //консоль

  //Собираем данные из базы
  const GetUser = () => {
    const dataUrl: IGetTableById = {
      command: ICommand.GetTableById,
      data: {
        tableName: "users",
        tableId: Number(params.id),
      },
    };
    AxiosVit({ dataUrl, setData });
  };

  useEffect(() => {
    GetUser();
  }, []);

   //консоль 09 Май 2026 (суббота)
  console.log(">>>> users из (UsersScreen):", data); //консоль

  return (
    <>
      <Container>
        <h3>Пользователь</h3>
        {data?.name} {data?.status} {data?.name} {data?.name}
        <TableStocktaking
                                tableName={"users_id"}
                                tableId={Number(data?.id)}
                              />
      </Container>
    </>
  );
}
