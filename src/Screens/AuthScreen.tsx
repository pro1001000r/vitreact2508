import React, { FC, useContext, useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import InputVit from "../Components/InputVit";
import Logo from "../Template/images/LogoPikclick512.png";
import { useNavigate } from "react-router-dom";

import ButtonVit from "../Components/ButtonVit";

import { IAuth, ICommand, IUsers } from "../inrefaces";
import AxiosVit from "../Components/AxiosVit";
import { ContextVit } from "../Components/ContextVit";

const AuthScreen: FC = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState<IUsers>();
  const {userSession} = useContext(ContextVit);
  const navigate = useNavigate();

  const getLogin = () => {
    const dataUrl: IAuth = {
      command: ICommand.Auth,
      data: { login: login, pass: pass },
    };

    AxiosVit({ dataUrl: dataUrl, setData: setUser });
  };

  useEffect(() => {
    if (user?.id != undefined) {
      sessionStorage.setItem("userId", String(user.id));
      userSession.id = user.id;
      userSession.name= user.name;
      sessionStorage.setItem("userStorageId", String(user.storage_id));
      userSession.storage_id = Number(user.storage_id);
      sessionStorage.setItem("userPlaceId", String(user.place_id));
      userSession.storage_id = Number(user.storage_id);
      navigate("/Cabinet");
    }
    if (user === null) {
      sessionStorage.clear();
      navigate("/");
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
