import React, { useEffect, useState } from "react";

import { ICommand, IGetProperty } from "../inrefaces";
import { useAxiosVit } from "./useAxiosVit";

const GetProperty = (table: string, id: number, property: string) => {
  const dataUrl: IGetProperty = {
    command: ICommand.GetProperty,
    data: {
      tableName: table,
      tableId: id,
      property: property,
    },
  };

  const { data } = useAxiosVit<string>(dataUrl);

  return data;
};

export default GetProperty;
