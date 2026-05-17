import { FC, useEffect, useState } from "react";
import { useAxiosVit } from "./useAxiosVit";
import { IStocktakingCount } from "../interfaces";
import AxiosVit from "./AxiosVit";

interface IProps {
  tableName: string;
  tableId?: number;
}

const StocktakingCount: FC<IProps> = ({ tableName, tableId = 0 }: IProps) => {
  //консоль 17 Май 2026 (воскресенье)
  // console.log('>>>> tableId из (StocktakingCount):', tableId); //консоль

  // const [data, setData] = useState<number>(0);
  
    const dataUrl: IStocktakingCount = {
      command: "GetStocktakingCount",
      data: {
        tableName: tableName,
        tableId: tableId,
      },
    };

    // useEffect(() => {
    //   AxiosVit({ dataUrl, setData});
    // }, []);

    const { data } = useAxiosVit<number>(dataUrl);

    if (data) {
      return <>{data}</>;
    }
  
};
export default StocktakingCount;
