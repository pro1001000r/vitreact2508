import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//мои css в корне проекта
import "./Template/css/VitCSS.css";

import HomeScreen from "./Screens/HomeScreen";
import NavBar from "./Components/NavBar";
import NavBottomVit from "./Components/NavBottomVit";
import ProductsScreen from "./Screens/ProductsScreen";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <NavBar />
        <NavBottomVit/>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<ProductsScreen />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
