import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {registerUser, loginUser} from "../services/userServices.js"


export const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({msg: "Usuario registrado correctamente"});

  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(400).json({msg:"Correo ya registrado"})
    }

    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  const { correo_cliente, password } = req.body;

  try {
    const user = await loginUser(correo_cliente);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({msg: "Contraseña incorrecta"})
    }

    const token = jwt.sign(
    {
      id_cliente: user.id_cliente,
      correo: user.correo_cliente,
      rol: user.rol,
    },
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  );

    res.json({
      msg: "Login exitoso",
      token,
      usuario: {
        id_cliente: user.id_cliente,
        nombre: user.nombre_cliente,
        apellido: user.apellido_cliente,
        correo: user.correo_cliente,
        rol: user.rol
      }
    });

  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({msg: "Correo no encontrado"})
    }

    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export default{
    register,
    login
}