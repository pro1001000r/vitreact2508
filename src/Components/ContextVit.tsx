import React, { createContext, FC, useContext, useState } from "react";
import { IChildrenVit, IUsers } from "../inrefaces";

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
    storage_id: number | null;
    place_id: number | null;
  };
}

export const ContextVit = createContext<IContextVit>({
  texttest: "",
  load: false,
  modal: false,
  open: () => {},
  close: () => {},
  userClear: () => {},

  userSession: {
    id: 0,
    name: "",
    status: "U",
    active: false,
    storage_id: null,
    place_id: null,
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
    storage_id: null,
    place_id: null,
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
