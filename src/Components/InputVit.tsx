import React, { FC, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

interface IProps {
  value: any;
  onChange(title: any): void;
  placeholder?: string;
  type?:string;
  onPressVit?(value: any): void;
}

const InputVit: FC<IProps> = ({
  value,
  onChange,
  placeholder = "Введите наименование...",
  type = "text",
  onPressVit,
}) => {
  //const [title, setTitle] = useState(value);
  // const ref = useRef<HTMLInputElement>(null); //2 способ

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    //console.log(">>>> changeHandler из (TodoForm):", title); //консоль
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // console.log(">>>> ref из (TodoForm):", ref.current!.value); //2 способ

      if (onPressVit) {
        //передаем во внешку!!!!!
        onPressVit(value);

        //очищаем
        // ref.current!.value = ""; //2 способ
        onChange("");
        // console.log(">>>> после обнуления:", title); //консоль
      }
    }
  };

  // useEffect(() => {
  //   console.log(">>>> из value:", value); //консоль
  //   setTitle(value)
  //   console.log(">>>> из value:", value); //консоль
  // }, []);

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          // ref={ref} //2 способ
          value={value}
          type={type}
          onChange={changeHandler}
          onKeyPress={keyPressHandler}
          placeholder={placeholder}
        />
      </InputGroup>
    </>
  );
};
export default InputVit;
