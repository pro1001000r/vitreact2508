import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//мои css в корне проекта
import "./Template/css/VitCSS.css";

import HomeScreen from "./Screens/HomeScreen";

const App:React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
