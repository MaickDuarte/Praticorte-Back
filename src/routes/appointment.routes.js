import express from "express";
import { getAppointmentsByDate, getAppointmentByProviderAndDate } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/getAppointmentsByDate", getAppointmentsByDate);
router.post("/getAppointmentByProviderAndDate", getAppointmentByProviderAndDate);

export default router;
