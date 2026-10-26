import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import RutaProtegida from "./auth/RutaProtegida";
import IlliMascota from "./components/IlliMascota";
import BotonIngresar from "./components/BotonIngresar";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          }
        />
      </Routes>

      <IlliMascota />
      <BotonIngresar />

      <Footer />
    </>
  );
}