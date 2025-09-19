import { Router } from "express";
import { logger } from "../middlewares/logger.js";
import { validarPaciente } from "../middlewares/validarPaciente.js";
import { obtenerPacientes, obtenerPaciente, crearPaciente, actualizarPaciente, eliminarPaciente, vistaAsignarTurno, asignarTurno } from "../controllers/pacientes.controller.js";

const router = Router();

router.use(logger);

router.get("/", obtenerPacientes);
router.get("/:id", obtenerPaciente);
router.post("/", validarPaciente, crearPaciente);
router.put("/:id", validarPaciente, actualizarPaciente);
router.delete("/:id", eliminarPaciente);
router.get("/asignar-turno", vistaAsignarTurno);
router.post("/asignar-turno", asignarTurno);

export default router;
