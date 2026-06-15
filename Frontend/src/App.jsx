import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage";
import ProductosPage from "./pages/ProductosPage";
import RegisterPage from "./pages/RegisterPage";
import CarritoPage from "./pages/CarritoPage";
import AdminPage from "./pages/AdminPage";

function RutaPrivada({children}){
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

function App(){
  return(
    <BrowserRouter>
  <Routes>
    {}
    <Route path="/login" element={<LoginPage />}/>
    {}
    <Route path="/productos" element={
      <RutaPrivada>
        <ProductosPage />
      </RutaPrivada>
    } />
    {}
    <Route path="/" element={<Navigate to="/productos"/>}/>

    <Route path="/register" element={<RegisterPage/>}/>

    <Route path="/carrito" element={
      <RutaPrivada>
        <CarritoPage />
      </RutaPrivada>
    }/>

    <Route path="/admin" element={
      <RutaPrivada>
        <AdminPage />
      </RutaPrivada>
    }/>
  </Routes>
  </BrowserRouter>
  )
}

export default App;