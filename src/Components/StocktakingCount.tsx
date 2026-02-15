import React, { useEffect, useState, FC } from "react";
import { useAxiosVit } from "./useAxiosVit";
import { IStocktakingCount } from "../inrefaces";
import AxiosVit from "./AxiosVit";

const StocktakingCount = ({ tableName = "", tableId = 0 }) => {
  const [data, setData] = useState<number>(0);
  const dataUrl: IStocktakingCount = {
    command: "GetStocktakingCount",
    data: {
      tableName: tableName,
      tableId: tableId,
    },
  };

  useEffect(() => {
    AxiosVit({ dataUrl, setData});
  }, []);
  
  return (<>{data}</>  );
};
export default StocktakingCount;
