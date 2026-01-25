import {body} from "express-validator";

export const registerValidator = [
    body("NID_cliente")
        .notEmpty().withMessage("NID requerido")
        .isNumeric().withMessage("NID deber ser numérico"),

    body("nombre_cliente")
        .notEmpty().withMessage("Nombre requerido"),

    body("apellido_cliente")
        .notEmpty().withMessage("Apellido requerido"),
    
    body("correo_cliente")
        .notEmpty().withMessage("Correo requerido")
        .isEmail().withMessage("Correo inválido"),

    body("telefono_cliente")
        .notEmpty().withMessage("Teléfono requerido"),

    body("direccion_cliente")
        .notEmpty().withMessage("Dirección requerida"),

    body("password")
        .notEmpty().withMessage("Contraseña requerida")
        .isLength({ min: 6 })
        .withMessage("Contraseña mínimo 6 caracteres")
];

export const loginValidator = [
    body("correo_cliente")
    .notEmpty().withMessage("Correo requerido")
    .isEmail().withMessage("Correo inválido"),

    body("password")
    .notEmpty().withMessage("Contraseña requerida")
];
