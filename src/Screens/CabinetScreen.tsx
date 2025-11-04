import React, { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

const CabinetScreen: FC = () => {
  return (
    <Container>
      <Row>
        <Col className=" text-center">
          <h3>Кабинет пользователя</h3>
        </Col>
      </Row>
    </Container>
  );
};
export default CabinetScreen;
