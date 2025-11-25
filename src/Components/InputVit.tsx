import React, { FC } from "react";
import { Form, InputGroup } from "react-bootstrap";

interface IProps {
  value: any; // Тип изменен на string, т.к. input работает со строками
  onChange(title: any): void; // Тип изменен на string
  placeholder?: string;
  type?: string;
  onPressVit?(value: string): void; // Тип изменен на string
}

const InputVit: FC<IProps> = ({
  value,
  onChange,
  placeholder = "Введите наименование...",
  type = "text",
  onPressVit,
}) => {
  // УДАЛЯЕМ ЛОКАЛЬНОЕ СОСТОЯНИЕ:
  // const [title, setTitle] = useState(value); 

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Просто вызываем onChange, чтобы обновить родительское состояние
    onChange(event.target.value); 
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (onPressVit) {
        // Передаем текущее значение пропса во внешнюю функцию
        onPressVit(value); 

        // Очищаем через родительский onChange
        onChange(""); 
      }
    }
  };
  
  // УДАЛЯЕМ ВСЕ useEffect, так как синхронизация больше не нужна

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          value={value} // Всегда используем пропс value
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