import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./paginas/login/Login";
import CadastroUsuario from "./paginas/cadastroUsuario/CadastroUsuario";
import Home from "./paginas/home/Home";

import "./App.css";
import ListaTema from "./components/temas/listatema/ListaTema";
import ListaPostagem from "./components/estaticos/postagens/listapostagem/ListaPostagem";
import CadastroPost from "./components/estaticos/postagens/cadastroPost/CadastroPost";
import CadastroTema from "./components/temas/cadastroTema/CadastroTema";
import DeletarPostagem from "./components/estaticos/postagens/deletarPostagem/DeletarPostagem";
import DeletarTema from "./components/temas/deletarTema/DeletarTema";
import { Provider } from "react-redux";
import store from "./store/store";
import Perfil from "./components/perfil/Perfil";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: "90vh" }}>
          <Routes>
            {" "}
            // Antigo Switch
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />
            <Route path="/temas" element={<ListaTema />} />
            <Route path="/posts" element={<ListaPostagem />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/formularioPostagem" element={<CadastroPost />} />
            <Route path="/formularioPostagem/:id" element={<CadastroPost />} />
            <Route path="/formularioTema" element={<CadastroTema />} />
            <Route path="/formularioTema/:id" element={<CadastroTema />} />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
