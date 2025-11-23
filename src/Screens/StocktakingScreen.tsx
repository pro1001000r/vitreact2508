import React, { FC, useState } from "react";
import { Container } from "react-bootstrap";
import { useUserSession } from "../Components/useStoreZustandVit";
import ModalVit from "../Components/ModalVit";
import ScanerVit from "../Components/ScanerVit";
import ButtonVit from "../Components/ButtonVit";

const StocktakingScreen: FC = () => {
  const User = useUserSession();
  const [show, setShow] = useState(false);
  const [scan, setScan] = useState<string>("Нет скана");
  return (
    <>
      <ModalVit show={show} setShow={setShow}>
        <ScanerVit setScan={setScan} />
      </ModalVit>
      <Container>
        <h3 className=" text-center">Инвентаризация ({User.name})</h3>

        <p>{scan}</p>
        <ButtonVit
                      icon="UpcScan"
                      name="Сканировать"
                      onClick={() => setShow(true)}
                    />
      </Container>
    </>
  );
};
export default StocktakingScreen;
