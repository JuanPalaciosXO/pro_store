import { createContext, useState, useContext } from "react";

const AuthContext = createContext()

export function AuthProvider({children}){
    const [usuario, setUsuario] = useState(null)
    const [token, setToken] = useState(null)

    const login = (datos) =>{
        setToken(datos.token)
        setUsuario(datos.usuario)

        localStorage.setItem("token", datos.token)
        localStorage.setItem("usuario", JSON.stringify(datos.usuario))
    }

    const logout = () =>{
        setToken(null)
        setUsuario(null)
        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
    }

    return(
        <AuthContext.Provider value ={{usuario, token, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}