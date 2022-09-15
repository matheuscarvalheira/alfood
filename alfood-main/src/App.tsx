import { Routes, Route } from "react-router-dom";
import PaginaBaseAdmin from "./pages/Administracao/PaginaBaseAdmin";
import AdministracaoRestaurantes from "./pages/Administracao/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurante from "./pages/Administracao/Restaurantes/FormularioRestaurante";
import Home from "./pages/Home";
import VitrineRestaurantes from "./pages/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />} >

        <Route path="restaurantes" element={<AdministracaoRestaurantes />}/>
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

      </Route>

    </Routes>
  );
}

export default App;
