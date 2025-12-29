import bcrypt from "bcrypt";
import db from "../config/db.js"

const register = async (req, res) => {
  const {
    NID_cliente, nombre_cliente, apellido_cliente, correo_cliente,
    telefono_cliente, direccion_cliente, password,
  } = req.body;

  try {
    const [existe] = await db.query(
      "SELECT * FROM user WHERE correo_cliente = ?",
      [correo_cliente]
    );

    if (existe.length > 0) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO user 
      (NID_cliente, nombre_cliente, apellido_cliente, correo_cliente, telefono_cliente, direccion_cliente, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        NID_cliente, nombre_cliente, apellido_cliente, correo_cliente,
        telefono_cliente, direccion_cliente, hashed,
      ]
    );

    res.json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const login = async (req, res) => {
  const { correo_cliente, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM user WHERE correo_cliente = ?",
      [correo_cliente]
    );

    if (rows.length === 0) {
      return res.status(400).json({ msg: "Correo no encontrado" });
    }

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    res.json({
      msg: "Login exitoso",
      usuario: {
        id_cliente: user.id_cliente,
        nombre: user.nombre_cliente,
        apellido: user.apellido_cliente,
        correo: user.correo_cliente,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export default{
    register,
    login
}