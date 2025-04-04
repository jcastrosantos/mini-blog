import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//ROUTER
import Home from "./router/Home/Home.jsx";
import About from "./router/About/About.jsx";
import Login from "./router/Login/Login.jsx";
import Register from "./router/Register/Register.jsx";

//COMPONENTES
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
