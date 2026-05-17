import React, { createContext, FC, useContext, useState } from "react";
import { IChildrenVit, IUsers } from "../interfaces";

interface IContextVit {
  texttest?: string;
  load: boolean;
  modal: boolean;
  open: () => void;
  close: () => void;
  userClear?: () => void;
  userSession: {
    id: Number;
    name: string;
    status: string;
    active: boolean;
    storage_id: number | undefined;
    place_id: number | undefined;
  };
}

export const ContextVit = createContext<IContextVit>({
  texttest: "",
  load: false,
  modal: false,
  open: () => {},
  close: () => {},
  
  userSession: {
    id: 0,
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
  let texttest;
  let load = false;
  const [modal, setModal] = useState(false);
  const open = () => setModal(true);
  const close = () => setModal(false);

  const userSession = {
    id: 0,
    name: "",
    status: "U",
    active: false,
    storage_id: undefined,
    place_id: undefined,
  };

  return (
    <>
      <ContextVit.Provider
        value={{ texttest, load, modal, open, close, userSession }}
      >
        {children}
      </ContextVit.Provider>
    </>
  );
};
