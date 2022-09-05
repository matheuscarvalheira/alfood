import { Routes, Route } from "react-router-dom";
import AdministracaoRestaurantes from "./pages/Administracao/Restaurantes/AdministracaoRestaurantes";
import Home from "./pages/Home";
import VitrineRestaurantes from "./pages/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route
        path="/admin/restaurantes"
        element={<AdministracaoRestaurantes />}
      />
    </Routes>
  );
}

export default App;
