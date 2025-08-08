import React, { useEffect, useState } from "react";

// import CanvasVit from "../Components/CanvasVit";
import { Col, Container, Row } from "react-bootstrap";
import AxiosVit from "../Components/AxiosVit";
import ButtonVit from "../Components/ButtonVit";
// import { useAxiosVit } from "../Components/useAxiosVit";



export default function HometScreen() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState('нет данных');
  const vFunc = () => {
    const dataUrl = { GetTable: 'users' };
    AxiosVit(dataUrl,setData);
    
    //консоль 03 Июнь 2025 (вторник)
    console.log('>>>> data из (DevelopmentScreen):', data); //консоль
     if (data){
        setUser(data[0].name)
      } 
    
  };

 
  return (
    <>
      <Container>
        <Row>
          <Col>
            <p >Работает новая</p>
            <p >{user}</p>
          </Col>
        </Row>
        <ButtonVit name="Тестовый запрос" onClick={vFunc}/>
      </Container>
    </>
  );
}
