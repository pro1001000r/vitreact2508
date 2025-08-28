import React, { useState, FC, useRef, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";

interface IProps {
  // value: string;
  // onChange(): void;
  // onToggle(id: number): void;
  placeholder?: string;
  onAdd(title: string): void;
}

const InputVit: FC<IProps> = ({
  onAdd,
  placeholder = "Введите наименование...",
}) => {
  const [title, setTitle] = useState<string>("");
  // const ref = useRef<HTMLInputElement>(null); //2 способ

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    // console.log(">>>> changeHandler из (TodoForm):", title); //консоль
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // console.log(">>>> ref из (TodoForm):", ref.current!.value); //2 способ

      //передаем во внешку!!!!!
      onAdd(title);

      //очищаем
      // ref.current!.value = ""; //2 способ
      setTitle("");
      // console.log(">>>> после обнуления:", title); //консоль
    }
  };

  useEffect(() => {
    console.log(">>>> из юз:", title); //консоль
  }, [title]);

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          // ref={ref} //2 способ
          value={title}
          type="text"
          onChange={changeHandler}
          onKeyPress={keyPressHandler}
          placeholder={placeholder}
        />
      </InputGroup>
    </>
  );
};
export default InputVit;
