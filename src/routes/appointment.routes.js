import express from "express";
import { getAppointmentsByDate } from "../controllers/appointment.controller.js";

const router = express.Router();

router.get("/getAppointmentsByDate", getAppointmentsByDate);

export default router;
