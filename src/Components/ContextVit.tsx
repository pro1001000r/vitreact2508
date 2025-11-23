import React, { createContext, FC, useState } from "react";
import { IChildrenVit } from "../inrefaces";

interface IContextVit {
  userSession: {
    id: number | undefined;
    name: string;
    status: string;
    active: boolean;
    storage_id: number | undefined;
    place_id: number | undefined;
  };
}

export const ContextVit = createContext<IContextVit>({
  userSession: {
    id: undefined,
    name: "",
    status: "U",
    active: false,
    storage_id: undefined,
    place_id: undefined,
  },
});

export const ContextVitProvider: FC<IChildrenVit> = ({
  children,
}: IChildrenVit) => {
  const conVit: IContextVit = {
    userSession: {
      id: undefined,
      name: "",
      status: "",
      active: false,
      storage_id: undefined,
      place_id: undefined,
    },
  };

  return (
    <>
      <ContextVit.Provider value={conVit}>{children}</ContextVit.Provider>
    </>
  );
};
