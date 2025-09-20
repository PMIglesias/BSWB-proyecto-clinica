import { Router } from "express";
import { logger } from "../middlewares/logger.js";
import { validarPaciente } from "../middlewares/validarPaciente.js";
import { obtenerPacientes, obtenerPaciente, crearPaciente, actualizarPaciente, eliminarPaciente, eliminarTurno } from "../controllers/pacientes.controller.js";

const router = Router();

router.use(logger);

router.get("/", obtenerPacientes);
router.get("/:id", obtenerPaciente);
router.post("/", validarPaciente, crearPaciente);
router.put("/:id", validarPaciente, actualizarPaciente);
router.delete("/:id", eliminarPaciente);
router.delete("/:pacienteId/turno/:turnoIndex", eliminarTurno);

export default router;
