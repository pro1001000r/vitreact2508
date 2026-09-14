import React, { useEffect, useState, FC } from "react";
import ButtonVit from "../../Components/ButtonVit";
import axios from "axios";
import { IDataUrl2 } from "../../interfaces";
import { Accordion, Container, Row, Table, Col } from "react-bootstrap";

const WorkTimesScreen: FC = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  async function fetchVit() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const apiUrl = "https://pikclick.ru/v2/";

    //console.log('>>>> dataUrl из (AxiosVit):', dataUrl); //консоль

    const dataUrl: IDataUrl2 = {
      basename: "vitbase",
      command: "WorkTimesTableView",
    };

    try {
      const response = await axios.post(apiUrl, dataUrl, config);
      if (setData) {
        setData(response.data.data);

        //консоль 04 Ноябрь 2025 (вторник)
        console.log(">>>> response.data из (AxiosVit):", response.data); //консоль
      }
      if (setLoad) {
        setLoad(true);
      }
    } catch (e) {
      if (e) {
        // setData(e);
      }
    } finally {
      // if (setLoad) {
      setLoad(true);
      // }
    }
  }

  //Алиса*******************************************************************************
  interface RowData {
    // * описание строки из которой берем данные 10 Сентябрь 2026 (четверг)
    idD: number; // ID документа
    idT?: number; // ID записи времени (может отсутствовать, если только документ)
    dateD?: string | null;
    dateDRus?: string | null;
    userName?: string | null;
    commentD?: string | null;
    srtD?: string | null;
    commentT?: string | null;
    StartT?: string | null;
    EndT?: string | null;
    srtT?: string | null;
  }
  type IDocsVit = Record<number, { doc: RowData; rows: RowData[] }>; // объект из документов

  //const doc0: IDocsVit = {}; //пустой имассив для начала перебора

  //превращаем массив в объект по доукуменгтавм
  function reduceVit(data: RowData[]): IDocsVit {
    return data.reduce((acc, row) => {
      if (!acc[row.idD]) {
        acc[row.idD] = { doc: row, rows: [] };
      }
      if (row.idT != null) {
        acc[row.idD].rows.push(row);
      }
      return acc;
    }, {} as IDocsVit);
  }

  // dataDoc = dataDoc.sort(
  //   (a, b) => safeDate(b.doc.dateD) - safeDate(a.doc.dateD),
  // );

  const safeDate = (d: string | null | undefined) => new Date(d ?? 0).getTime();
  const safeText = (value: any) => (value == null ? "" : String(value));

  const dataDoc = Object.values(reduceVit(data)).sort(
    (a, b) => safeDate(b.doc.dateD) - safeDate(a.doc.dateD),
  );

  //консоль 10 Сентябрь 2026 (четверг)
  console.log(">>>> dataDoc из (WorkTimesScreen):", dataDoc); //консоль

  function DocumentGroup({
    group,
  }: {
    group: { doc: RowData; rows: RowData[] };
  }) {
    return (
      <>
        <Accordion className="mb-1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <p>
                <b> {group.doc.dateDRus}</b> <br />
                Документ № {group.doc.idD}<br />
                {group.doc.commentD}
                <br />
                Время: <b>{group.doc.srtD}</b>{" "}
                <small>({group.rows.length} записей)</small>
              </p>
            </Accordion.Header>
            <Accordion.Body>
              <Table striped hover size="sm">
                <thead>
                  <tr>
                    <th>период</th>
                    <th>время</th>
                    <th>описание</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.idT}>
                      <td>
                        {safeText(row.StartT)} – {safeText(row.EndT)}
                      </td>
                      <td>
                        <b>{safeText(row.srtT)}</b>
                      </td>
                      <td>
                        <b>{safeText(row.commentT)}</b>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    );
  }

  const listRow = dataDoc.map((g) => (
    <DocumentGroup key={g.doc.idD} group={g} />
  ));

  //Алиса*******************************************************************************

  async function GetStatus() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const apiUrl = "https://pikclick.ru/v2/";
    const dataUrl = {
      basename: "vitbase",
      command: "WorkTimesGetStatus",
    };

    try {
      const response = await axios.post(apiUrl, dataUrl, config);

      //консоль 04 Ноябрь 2025 (вторник)
      console.log(">>>> WorkTimesGetStatus.data из (AxiosVit):", response.data); //консоль
    } catch (e) {
      if (e) {
        // setData(e);
      }
    }
  }

  async function StartStop() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const apiUrl = "https://pikclick.ru/v2/";
    const dataUrl = {
      basename: "vitbase",
      command: "WorkTimesStartStop",
    };

    try {
      const response = await axios.post(apiUrl, dataUrl, config);

      console.log(">>>> response.data из (AxiosVit):", response.data); //консоль
      fetchVit();
    } catch (e) {}
  }

  useEffect(() => {
    GetStatus();
    fetchVit();
  }, []);

  return (
    <Container>
      <Row className="my-1">
        <Col className=" text-center">
          <ButtonVit name="Старт/Стоп" onClick={StartStop} />
        </Col>
      </Row>

      <div>{listRow}</div>
    </Container>
  );
};
export default WorkTimesScreen;
