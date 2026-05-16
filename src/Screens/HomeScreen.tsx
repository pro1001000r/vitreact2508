import React, { FC, useState } from "react";

// import CanvasVit from "../Components/CanvasVit";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";

import Logo from "../Template/images/LogoPikclick512.png";
import ButtonVit from "../Components/ButtonVit";
import ModalVit from "../Components/ModalVit";
import ScanerVit from "../Components/ScanerVit";
import { Helmet } from 'react-helmet';

const HometScreen: FC = () => {
  const [scan, setScan] = useState<string>("");
  const [show, setShow] = useState(false);

  return (
    <div>
      <Helmet>
       {/* Основные теги для поисковиков */}
      
      </Helmet>
      <Container>
        {/* //<div className="vit-background-image"></div> */}
        <Row>
          {/* <Col className="vit-background-image"> */}
         <Col>
            <br />
            <h1 className="text-center">
              <Image src={Logo} alt="Логотип" className="vitImageContain " />

              <p className="vit-font-propis">
                <b>
                  Инвентаризация
                  <br />
                  <small> - быстро и просто</small>
                </b>
              </p>
            </h1>
            <h2 className="text-center">
              <p>Сканируй. <br />     Считай. <br />    Управляй.</p>
            </h2>

            <Row className="text-center">
              <Col>
                {/* <p>{scan}</p> */}
                {/* <ButtonVit
                  className=" btn-primary"
                  icon="UpcScan"
                  name="Сканер"
                  onClick={() => setShow(true)}
                /> */}

                <ButtonVit href="/Auth" name="Войти в систему" />

                <ModalVit show={show} setShow={setShow}>
                  <ScanerVit setScan={setScan} setShow={undefined} />
                </ModalVit>
              </Col>
            </Row>

            <br />
          </Col>
        </Row>

        <br />
        <Row>
          <h3>Автоматизируйте учет товаров с PikClick.ru</h3>
          <br />
          <p>
            Сократите время инвентаризации с недель до часов и исключите
            человеческий фактор.
          </p>
        </Row>
        <Row>
          <h3>Ваша инвентаризация похожа на хаос?</h3>
          <br />
          <p>
            Пересчет остатков занимает дни и останавливает работу склада?
            Итоговые цифры в отчетах не сходятся с реальностью? Сотрудники
            допускают ошибки при ручном вводе данных? Потеря товаров и
            пересортица съедают вашу прибыль?
          </p>
        </Row>
        <br />
        <Row>
          <h3>
            PikClick превращает инвентаризацию в понятный и быстрый процесс.
          </h3>
          <br />
          <p>
            Наш облачный сервис работает на любом устройстве: смартфоне,
            планшете или профессиональном терминале сбора данных. Вам не нужно
            покупать дорогое ПО или серверы.
          </p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              <b>Скорость:</b> Сканирование штрихкодов в реальном времени.
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <b>Точность:</b> Исключение ошибок ручного ввода.
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <b>Контроль:</b> Мгновенное формирование отчетов о расхождениях.
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <br />
        <Row>
          <h3>Как это работает?</h3>
          <br />
          <p>3 простых шага к идеальному учету:</p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              <b>Подготовка:</b> Загрузите остатки из вашей учетной системы (1С,
              МойСклад, Saby, Excel) или создайте список товаров вручную.
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <b>Сканирование:</b> Раздайте сотрудникам смартфоны с приложением
              PikClick.ru Они просто сканируют штрихкоды, проходя по складу.
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <b>Результат:</b> Сверка происходит автоматически. Вы получаете
              готовый отчет с расхождениями в режиме реального времени.
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <br />
        <Row>
          <h3>Кому подходит сервис?</h3>
          <br />
          <p>Для бизнеса, который ценит точность и время</p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              <b>🏪 Розничные магазины:</b> Быстрая приемка товара и контроль
              остатков на полках.
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <b>📦 Склады и логистика:</b> Учет паллет, коробок,
              характеристик(Цвет, Размер) и единиц хранения.
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <br />
        <Row>
          <h3>Преимущества PikClick.ru</h3>
          <br />
          <p>Почему выбирают нас?</p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              <b>📱 Мобильность:</b> Работает на Android и iOS. Не требует
              дорогого оборудования.
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <b>🔗 Интеграция:</b> Легко связывается с популярными программами
              учета (1С, МойСклад, Saby, Excel).
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <b>💰 Экономия:</b> Платите только за фактическое использование.
              Нет скрытых платежей.
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <b>🛡️ Надежность:</b> Данные хранятся в защищенном облаке, доступ
              24/7 из любой точки мира.
            </ListGroup.Item>
          </ListGroup>
        </Row>

        <br />
        <Row>
          <Card className=" mb-2">
            <Card.Body>Здесь будет обратная связь</Card.Body>
          </Card>
        </Row>

        <br />
        <br />
      </Container>
    </div>
  );
};

export default HometScreen;
