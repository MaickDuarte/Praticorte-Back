import express from "express";
import { getAgendamentos } from "../controllers/agendamento.controller.js";

const router = express.Router();

router.get("/", getAgendamentos);

export default router;
