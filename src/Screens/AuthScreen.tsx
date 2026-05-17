import React, { FC, useContext, useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import InputVit from "../Components/InputVit";
import Logo from "../Template/images/LogoPikclick512.png";
import { useNavigate } from "react-router-dom";

import ButtonVit from "../Components/ButtonVit";

import { IAuth, ICommand, IUsers, IUserSession } from "../interfaces";
import AxiosVit from "../Components/AxiosVit";
import { ContextVit } from "../Components/ContextVit";
import {
  
  useStoreZustandVit,
  useUserSession,
} from "../Components/useStoreZustandVit";

const AuthScreen: FC = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState<IUsers>();
  //const { userSession } = useContext(ContextVit);
  const userSession = useUserSession();
  const navigate = useNavigate();

  const {setUserSession} = useStoreZustandVit();

  const getLogin = () => {
    const dataUrl: IAuth = {
      command: ICommand.Auth,
      data: { login: login, pass: pass },
    };

    AxiosVit({ dataUrl, setData: setUser });
  };

  const SetUser = (user: IUsers) => {
    let iu: IUserSession ={
      id: user.id,
      name: user.name,
      status: user.status,
      telefon: user.telefon,
      active: user.active,
      storage_id: user.storage_id,
      place_id: user.place_id
    }
   

    //консоль 22 Ноябрь 2025 (суббота)
    console.log(">>>> iu из (AuthScreen):", iu); //консоль

    setUserSession(iu);
  };

  useEffect(() => {
    if (user?.id != undefined) {
      //sessionStorage.setItem("userId", String(user.id));
      //sessionStorage.setItem("userStorageId", String(user.storage_id));
      //sessionStorage.setItem("userPlaceId", String(user.place_id));
      SetUser(user);
      userSession.id = user.id;
      userSession.name = user.name;
      userSession.telefon = user.telefon;
      userSession.status = user.status;
      userSession.active = user.active;
      userSession.storage_id = Number(user.storage_id);
      userSession.place_id = Number(user.place_id);

      //консоль 22 Ноябрь 2025 (суббота)
      //console.log(">>>> userSession из (AuthScreen):", userSession); //консоль

      navigate("/Cabinet");
    }
    if (user === null) {
      //консоль 22 Ноябрь 2025 (суббота)
      //console.log(">>>> userSession из (AuthScreen):", userSession); //консоль

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
