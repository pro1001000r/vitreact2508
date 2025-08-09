import React from "react";

export interface IVitProps {
  /** The user's name */
  name?: string;
  /** Should the name be rendered in bold */
  priority?: boolean;
  a?: number;
  b?: number;
}

const FirstVit = (i: IVitProps) => {
  if (i.name) {
    //консоль 09 Август 2025 (суббота)
    console.log(">>>> name из (FirstVit):", i.name); //консоль
  }
  return <>Новый модуль</>;
};
export default FirstVit;
