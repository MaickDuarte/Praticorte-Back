import express from "express";
import { addAppointment, getAppointmentsByDate, getAppointmentByProviderAndDate } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/addAppointment", addAppointment);
router.post("/getAppointmentsByDate", getAppointmentsByDate);
router.post("/getAppointmentByProviderAndDate", getAppointmentByProviderAndDate);

export default router;
