import React, { FC, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import InputVit from "../Components/InputVit";
import Logo from "../Template/images/LogoPikclick512.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonVit from "../Components/ButtonVit";

import db from "../config.json";

const AuthScreen: FC = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const getLogin = () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const apiUrl = db.pathDB;
      const data = { Auth: { login: login, pass: pass } };
  
      axios
        .post(apiUrl, data, config)
        .then(function (response) {
          //console.log(">>>>", new Date(), " >>>>:", response.data); //консоль
  
          //setProducts(response.data);
          if (response.data) {
            sessionStorage.setItem("userId", response.data.id);
            sessionStorage.setItem("userStorageId", response.data.storage_id);
            sessionStorage.setItem("userPlaceId", response.data.place_id);
            navigate("/Cabinet");
          } else {
            sessionStorage.clear();
            navigate("/");
          }
  
          //setLoad(true);
        })
        .catch(function (error) {
          navigate("/");
          //console.log(error);
        })
        .finally(() => {
          //setLoad(true);
        });
    };

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
