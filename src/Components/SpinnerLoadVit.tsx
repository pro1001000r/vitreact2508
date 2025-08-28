import React, { FC } from "react";
import { Spinner } from "react-bootstrap";

interface IProps {
  load: boolean;
}

const SpinnerLoadVit: FC<IProps> = ({load}) => {
  return (
    <>
      {!load && (
        <div className="vitcenter">
          <Spinner animation="border" variant="secondary" />
          <p>Загрузка...</p>
        </div>
      )}
    </>
  );
};
export default SpinnerLoadVit;
