import db from "../config/db.js";
import bcrypt from "bcrypt";

 export const registerUser = async (userData) =>{
    const{
        NID_cliente,
        nombre_cliente,
        apellido_cliente,
        correo_cliente,
        telefono_cliente,
        direccion_cliente,
        password,
        rol
    } = userData;

    const [existe] = await db.query(
        "select id_cliente from user where correo_cliente = ?",
        [correo_cliente]
    );

    if (existe.length > 0) {
        throw new Error("EMAIL_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const rolFinal = rol === "admin" ? "admin" : "cliente";

    await db.query(
        `INSERT INTO user 
        (NID_cliente, nombre_cliente, apellido_cliente, correo_cliente, telefono_cliente, direccion_cliente, password, rol)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
        NID_cliente,
        nombre_cliente,
        apellido_cliente,
        correo_cliente,
        telefono_cliente,
        direccion_cliente,
        hashedPassword,
        rolFinal
        ]
    );
};

//login 

export const loginUser = async (correo_cliente) =>{
    const [rows] = await db.query(
        "select * from user where correo_cliente = ?",
        [correo_cliente]
    );

    if (rows.length === 0) {
        throw new Error("USER_NOT_FOUND");
    }

    return rows[0];
};

