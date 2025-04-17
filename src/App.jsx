import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//HOOKS
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication.jsx";

//CONTEXT
import { AuthProvider } from "./context/AuthContext.jsx";

//ROUTER
import Home from "./router/Home/Home.jsx";
import About from "./router/About/About.jsx";
import Login from "./router/Login/Login.jsx";
import Register from "./router/Register/Register.jsx";
import CreatePost from "./router/CreatePost/CreatePost.jsx";
import Dashboard from "./router/Dashboard/Dashboard.jsx";

//COMPONENTES
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
