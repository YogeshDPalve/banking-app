import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Home";
import Login from "./components/Home/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
