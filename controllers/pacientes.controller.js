import Paciente from "../models/paciente.model.js";
import { leerPacientes, guardarPacientes } from "../utils/fileManager.js";

export async function obtenerPacientes(req, res) {
  const pacientes = await leerPacientes();
  res.render("pacientes", { pacientes, titulo: "Lista de Pacientes" });
}

export async function obtenerPaciente(req, res) {
  const pacientes = await leerPacientes();
  const paciente = pacientes.find(p => p.id === Number(req.params.id));
  if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
  res.json(paciente);
}

export async function crearPaciente(req, res) {
  const pacientes = await leerPacientes();
  const nuevo = new Paciente(Date.now(), req.body.nombre, req.body.edad, req.body.diagnostico);
  pacientes.push(nuevo);
  await guardarPacientes(pacientes);
  res.status(201).json(nuevo);
}

export async function actualizarPaciente(req, res) {
  let pacientes = await leerPacientes();
  const index = pacientes.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Paciente no encontrado" });

  pacientes[index] = { ...pacientes[index], ...req.body };
  await guardarPacientes(pacientes);
  res.json(pacientes[index]);
}

export async function eliminarPaciente(req, res) {
  let pacientes = await leerPacientes();
  pacientes = pacientes.filter(p => p.id !== Number(req.params.id));
  await guardarPacientes(pacientes);
  res.status(204).end();
}

export async function vistaAsignarTurno(req, res) {
  const pacientes = await leerPacientes();
  res.render("asignarTurno", { pacientes });
}

export async function asignarTurno(req, res) {
  const { pacienteId, fecha } = req.body;
  const pacientes = await leerPacientes();

  const paciente = pacientes.find(p => p.id === parseInt(pacienteId));
  if (!paciente) return res.status(404).send("Paciente no encontrado");

  paciente.turnos.push(fecha);

  await guardarPacientes(pacientes);
  res.redirect("/pacientes");
}