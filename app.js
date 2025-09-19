import express from "express";
import path from "path";
import pacientesRoutes from "./routes/pacientes.routes.js";
import { vistaAsignarTurno, asignarTurno } from "./controllers/pacientes.controller.js";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <--- NECESARIO para procesar formularios

// Rutas principales
app.use("/pacientes", pacientesRoutes);

// Nueva ruta global para asignar turno
app.get("/asignar-turno", vistaAsignarTurno);
app.post("/asignar-turno", asignarTurno);

// Ruta raíz
app.get("/", (req, res) => {
  res.render("index", { titulo: "Clínica - Inicio" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
