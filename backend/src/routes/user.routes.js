import { Router } from "express";
import {
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

// Ruta GET para obtener usuarios
router.get("/", getUser);

// Ruta PATCH para actualizar usuarios
router.patch("/", updateUser);

// Ruta DELETE para eliminar usuarios
router.delete("/", deleteUser);

// Ruta alternativa para DELETE con parámetros en la ruta
router.delete("/:id", deleteUser);

// Preflight para OPTIONS
router.options("/", (req, res) => {
  res.sendStatus(200);
});

router.options("/:id", (req, res) => {
  res.sendStatus(200);
});

export default router;