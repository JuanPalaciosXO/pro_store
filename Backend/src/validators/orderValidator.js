import {body} from "express-validator";

export const createOrderValidator = [
    body('productos')
        .isArray({min : 1}).withMessage("El pedido debe tener al menos un producto"),

    body('productos.*.id_producto')
        .notEmpty().withMessage("Cada producto debe tener id_producto")
        .isInt({min : 1}).withMessage("El id_producto debe ser positivo"),

    body('productos.*.cantidad')
        .notEmpty().withMessage('Cada producto debe tener cantidad')
        .isInt({min : 1}).withMessage('La cantidad al menos debe ser 1')
];