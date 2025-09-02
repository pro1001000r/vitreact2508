import React, { createContext, FC, useState } from "react";
import { IChildrenVit } from "../inrefaces";

interface IContextVit {
  texttest?: string;
  load: boolean;
  modal: boolean;
  open: () => void;
  close: () => void;
}

export const ContextVit = createContext<IContextVit>({
  texttest: "",
  load: false,
  modal: false,
  open: () => {},
  close: () => {},
});

export const ContextVitProvider: FC<IChildrenVit> = ({
  children,
}: IChildrenVit) => {
  let texttest;
  let load = false;
  const [modal, setModal] = useState(false);
  const open = () => setModal(true);
  const close = () => setModal(false);
  return (
    <>
      <ContextVit.Provider value={{ texttest, load, modal, open, close }}>
        {children}
      </ContextVit.Provider>
    </>
  );
};
