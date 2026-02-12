import React, { FC, useEffect, useState } from "react";
import Select, { FilterOptionOption } from "react-select";
import AxiosVit from "./AxiosVit";
import { ICommand, IGetTable } from "../inrefaces";

interface IProps {
  tableName: string;
  id: number;
  setId(id: any): void;

  placeholder?: string;
  className?: string;
}

// 1. Описываем интерфейс для опции
interface MyOption {
  value: string;
  label: string;
}

const SelectVit: FC<IProps> = ({
  tableName,
  id = 0,
  setId,
  placeholder = "Введите любые данные",
  className = "",
}) => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isClearable, setIsClearable] = useState(true);

  let items: any = [];

  function customFilterOption(
    option: FilterOptionOption<MyOption>,
    rawInput: string,
  ) {
    // Разбиваем ввод на отдельные слова и убираем лишние пробелы
    const words = rawInput
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0);

    // Проверяем, что КАЖДОЕ слово из поиска есть в лейбле опции
    return words.every((word) => option.label.toLowerCase().includes(word));
  }

  const Func = (arg: any) => {
    arg.map((elem: any) => {
      let key = elem.id;
      const newItem = {
        value: elem.id,
        label: elem.name,
      };
      //console.log(newItem); //консоль
      items = [...items, newItem];
    });
    items.sort((a: any, b: any) => (a.label > b.label ? 1 : -1));
    setData(items);
    //console.log(">>>>items>>>>:", items); //консоль
  };

  const styleVit = {
    color: "hsl(0, 0%, 40%)",
    display: "inline-block",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: "1em",
  };

  const getValue = (e: any) => {
    if (e) {
      setId(e.value);
    } else {
      setId(null);
    }
  };

  const getData = () => {
    const dataUrl: IGetTable = {
      command: ICommand.GetTable,
      data: {
        tableName: tableName,
      },
    };

    AxiosVit({ dataUrl, setData: Func, setLoad });
  };

  useEffect(() => {
    getData();
    //console.log(">>>>products>>>>:", data); //консоль
  }, []);
  return (
    <>
      {/* <Select options={products} value={products.filter(({value}) => value === id)} onChange={(e) => setId(e.value)} /> */}
      <Select
        className={className}
        options={data}
        filterOption={customFilterOption}
        isClearable
        value={data.filter(({ value }) => value === id)}
        onChange={getValue}
        placeholder={placeholder}
      />
    </>
  );
};

export default SelectVit;
