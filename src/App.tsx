import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//мои css в корне проекта
import "./Template/css/VitCSS.css";

import NavBar from "./Components/NavBar";
import NavBottomVit from "./Components/NavBottomVit";

import HomeScreen from "./Screens/HomeScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import ProductsEditScreen from "./Screens/ProductsEditScreen";
import { ContextVit, ContextVitProvider } from "./Components/ContextVit";
import AuthScreen from "./Screens/AuthScreen";
import CabinetScreen from "./Screens/CabinetScreen";

const App: React.FC = () => {
  return (
    <>
      <ContextVitProvider>
        <Router>
          <NavBar />
          <NavBottomVit />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/products" element={<ProductsScreen />} />
            <Route path="/ProductsEdit/:id" element={<ProductsEditScreen />} />
            <Route path="/Auth" element={<AuthScreen />} />
            <Route path="/Cabinet" element={<CabinetScreen />} />
          </Routes>
        </Router>
      </ContextVitProvider>
    </>
  );
};

export default App;
