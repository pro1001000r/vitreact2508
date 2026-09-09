import React, { useEffect, useState, FC } from "react";
import ButtonVit from "../../Components/ButtonVit";
import axios from "axios";
import { IDataUrl2 } from "../../interfaces";
import { Table } from "react-bootstrap";

const WorkTimesScreen: FC = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

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

  async function fetchVit() {
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

  let listRow = data.map((elem: any) => (
    <tr key={elem.idT}>
      <td>
        <b>{elem.dateD}</b>
        <br />

        <b>{elem.userName}</b>
        <br />

        <b>{elem.commentD}</b>
      </td>
      <td>
        <b>{elem.srtD}</b>
      </td>
      <td>
        <b>{elem.commentT}</b>
      </td>
      <td>
        <b>{elem.StartT}</b>
        <br />
        <b>{elem.EndT}</b>
        <br />
        <b>{elem.srtT}</b>
      </td>
    </tr>
  ));
  useEffect(() => {
    fetchVit();
  }, []);

  return (
    <>
      {/* <ButtonVit href="/WorkTimes" name="Время работ" /> */}
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>Номер документа</th>
            <th>Время начала</th>
            <th>Время окончания</th>
            <th>Длительность</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>{listRow}</tbody>
      </Table>
    </>
  );
};
export default WorkTimesScreen;
