import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//мои css в корне проекта
import "./Template/css/VitCSS.css";

import NavBar from "./Components/NavBar";
import NavBottomVit from "./Components/NavBottomVit";

import HomeScreen from "./Screens/HomeScreen";
import ProductsScreen from "./Screens/Products/ProductsScreen";
import ProductsEditScreen from "./Screens/Products/ProductsEditScreen";
import { ContextVit, ContextVitProvider } from "./Components/ContextVit";
import AuthScreen from "./Screens/AuthScreen";
import CabinetScreen from "./Screens/CabinetScreen";
import StocktakingScreen from "./Screens/StocktakingScreen";
import PlaceScreen from "./Screens/Place/PlaceScreen";
import PlaceNewScreen from "./Screens/Place/PlaceNewScreen";
import PlaceEditScreen from "./Screens/Place/PlaceEditScreen";
import UsersScreen from "./Screens/Users/UsersScreen";
import UserEditScreen from "./Screens/Users/UserEditScreen";


const App: React.FC = () => {
  return (
    <>
      {/* <ContextVitProvider> */}
     
      <Router>
        <NavBar />
        <NavBottomVit />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/Products" element={<ProductsScreen />} />
          <Route path="/ProductsEdit/:id" element={<ProductsEditScreen />} />
          <Route path="/Auth" element={<AuthScreen />} />
          <Route path="/Cabinet" element={<CabinetScreen />} />
          <Route path="/Stocktaking" element={<StocktakingScreen />} />
          <Route path="/Place" element={<PlaceScreen />} />
          <Route path="/PlaceNew" element={<PlaceNewScreen />} />
          <Route path="/PlaceEdit/:id" element={<PlaceEditScreen />} />
          <Route path="/Users" element={<UsersScreen />} />
          <Route path="/UserEdit/:id" element={<UserEditScreen />} />
        </Routes>
      </Router>
      {/* </ContextVitProvider> */}
    </>
  );
};

export default App;
