import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage";
import ProductosPage from "./pages/ProductosPage";

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
  </Routes>
  </BrowserRouter>
  )
}

export default App;