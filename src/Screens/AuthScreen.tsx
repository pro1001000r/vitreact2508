import React, { FC, useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import InputVit from "../Components/InputVit";
import Logo from "../Template/images/LogoPikclick512.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonVit from "../Components/ButtonVit";

import db from "../config.json";
import { useAxiosVit } from "../Components/useAxiosVit";
import { IAuth, ICommand, IDataUrl, IUsers } from "../inrefaces";
import AxiosVit from "../Components/AxiosVit";

const AuthScreen: FC = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState<IUsers>();
  const navigate = useNavigate();

  const getLogin = () => {
    // const dataUrl: IGetTableById = {
    //   command: ICommand.GetTableById,
    //   data: {
    //     tableName: "products",
    //     tableId: Number(params.id),
    //   },
    // };
    // AxiosVit({ dataUrl, setData });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const dataUrl: IAuth = {
      command: ICommand.Auth,
      data: { login: login, pass: pass },
    };

    AxiosVit({ dataUrl: dataUrl, setData: setUser });
    console.log(">>>> dataUrl из (AuthScreen):", dataUrl); //консоль

    //консоль 04 Ноябрь 2025 (вторник)
    console.log(">>>> dUser из (AuthScreen):", user); //консоль
  };

  useEffect(() => {
    
    //консоль 04 Ноябрь 2025 (вторник)
    console.log('>>>> user из (AuthScreen):', user); //консоль
    
    if (user) {
      sessionStorage.setItem("userId", String(user.id));
      sessionStorage.setItem("userStorageId", String(user.storage_id));
      sessionStorage.setItem("userPlaceId", String(user.place_id));
      navigate("/Cabinet");
    } else {
      //sessionStorage.clear();
      //navigate("/");
    }
  }, [user]);

  return (
    <Container className="text-center align-content-center">
      <Row>
        <Col>
          <Image
            src={Logo}
            alt="Логотип"
            className="vitImageContain vShadowImg"
          />
          <br />
          <br />
          <InputVit value={login} onChange={setLogin} placeholder="Логин..." />
          <InputVit
            value={pass}
            onChange={setPass}
            placeholder="Пароль..."
            type="password"
          />
          <ButtonVit onClick={getLogin} name="Вход" />
        </Col>
      </Row>
    </Container>
  );
};
export default AuthScreen;
