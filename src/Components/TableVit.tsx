import { Dropdown, Form, Nav, Spinner, Table } from "react-bootstrap";
import { useAxiosVit } from "./useAxiosVit";
import { ICommand, IDataUrl, IGetTable, IProducts } from "../interfaces";
import ImageVit from "./ImageVit";
import { useState } from "react";

export default function TableVit() {
  const dataUrl: IDataUrl = {
    command: "GetProducts",
    data: { tableName: "products" },
  };

  const { data, loading, error } = useAxiosVit<IProducts[]>(dataUrl);

  // Состояния для поиска и сортировки
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof IProducts>("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Фильтрация данных по поисковому запросу
  const filteredData =
    data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase())),
    ) || [];

  // Сортировка данных
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortBy] && b[sortBy]) {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Обработка изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Обработка выбора сортировки по полю
  const handleSortByChange = (field: keyof IProducts) => {
    setSortBy(field);
  };

  // Обработка смены порядка сортировки
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //консоль 17 Май 2026 (воскресенье)
  //console.log('>>>> data из (TableVit):', data); //консоль

  //консоль 17 Май 2026 (воскресенье)
  console.log(">>>> loading из (TableVit):", loading); //консоль

  // Стили вынесены за пределы рендера
  const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  const errorStyle: React.CSSProperties = {
    padding: "20px",
    color: "red",
    textAlign: "center",
  };

  // Обработка состояний
  // if (loading) {
  //   return (
  //     <div style={wrapperStyle}>
  //       <Spinner animation="border" variant="secondary" />
  //       <p>Загрузка...</p>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div style={errorStyle}>
        <p>Ошибка загрузки данных: {error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  let listRow = sortedData.map((elem) => (
    <tr key={elem.id}>
      <td>
        <ImageVit foto={elem?.foto} width="50px" />
      </td>
      <td>
        <Nav.Link href={`/ProductsEdit/${elem.id}`}>
          <b>{elem.name}</b>
        </Nav.Link>
      </td>
      <td>
        <div style={{ fontSize: "12px" }}>
          <b>{elem.price} р.</b> <br />
          {elem.description ? (
            <>{elem.description}</>
          ) : (
            <>{elem.compositionsname}</>
          )}
          <br />
          {elem.stocktakingcount && <b>{elem.stocktakingcount}</b>}
        </div>
        <br />
      </td>
    </tr>
  ));

  return (
    <div>
      {/* Панель поиска и сортировки */}
      {/* <div className="d-flex justify-content-between align-items-center mb-3"> */}
      <div className="mb-1">
        <div className="mb-1">
        {/* Строка поиска */}
        <Form.Control
          type="text"
          placeholder="Поиск по названию или описанию..."
          value={searchTerm}
          onChange={handleSearchChange}
          
        /></div>

        {/* Выбор сортировки */}
        <div className="d-flex gap-1">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              Сортировка: {sortBy}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortByChange("name")}>
                По названию
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortByChange("price")}>
                По цене
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortByChange("id")}>
                По ID
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Кнопка смены порядка сортировки */}
          <button
            className="btn btn-outline-secondary"
            onClick={handleSortOrderChange}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>Картинка</th>
            <th>Товар</th>
            <th>Данные</th>
          </tr>
        </thead>
        <tbody>{listRow}</tbody>
      </Table>
    </div>
  );
}
